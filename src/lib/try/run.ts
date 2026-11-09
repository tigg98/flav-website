import { extractWithModel } from "./model";
import { clientIp, dailyCap, hashIp, remainingToday, reserveRun } from "./ratelimit";
import { fetchSource, SourceError, type SourceText } from "./sources";
import { getTryStore, type TryStore } from "./store";
import { isThinCaption } from "./text";
import { TRY_DISABLED_MESSAGE, TRY_PER_VISITOR_PER_DAY, type TryPlatform, type TryResponse, type TrySource } from "./types";
import { cacheKeyFor, validateTryUrl } from "./validate";

/** One /try run, from the raw request body to the response JSON. The route is a thin wrapper. */

const CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export interface RunDeps {
    store?: TryStore;
    fetchSource?: (platform: TryPlatform, url: URL) => Promise<SourceText>;
    extract?: typeof extractWithModel;
    env?: Record<string, string | undefined>;
    now?: () => number;
}

function emptySource(platform: TryPlatform | null = null, url: string | null = null): TrySource {
    return { platform, creator: null, thumbnail: null, url };
}

export async function runTry(body: unknown, headers: Headers, deps: RunDeps = {}): Promise<TryResponse> {
    const env = deps.env ?? process.env;
    const now = deps.now ?? Date.now;
    const started = now();
    const elapsed = () => now() - started;

    if (env.TRY_ENABLED === "false") {
        return { status: "error", source: emptySource(), ms: 0, cached: false, remainingToday: 0, message: TRY_DISABLED_MESSAGE };
    }

    const store = deps.store ?? getTryStore();
    const ipHash = hashIp(clientIp(headers), env.TRY_IP_SALT ?? "");

    const rawUrl = body && typeof body === "object" ? (body as { url?: unknown }).url : undefined;
    const valid = validateTryUrl(rawUrl);
    if (!valid.ok) {
        // Not a run: nothing is fetched, so it is not logged and does not count.
        const left = await remainingToday(store, ipHash, TRY_PER_VISITOR_PER_DAY).catch(() => 0);
        return { status: "error", source: emptySource(), ms: elapsed(), cached: false, remainingToday: left, message: valid.message };
    }

    const { url, platform } = valid;
    const key = cacheKeyFor(url, platform);
    const sourceUrl = url.href;

    const log = (status: TryResponse["status"], cached: boolean, ms: number) =>
        store.insertEvent({ ip_hash: ipHash, platform, status, ms, cached }).catch((e) => console.error("[try] log failed", e));

    // 1. Cache. A cached result does not count against any limit.
    try {
        const hit = await store.getCache(key, CACHE_MAX_AGE_MS);
        if (hit) {
            const ms = elapsed();
            await log(hit.status, true, ms);
            const left = await remainingToday(store, ipHash, TRY_PER_VISITOR_PER_DAY).catch(() => 0);
            return { status: hit.status, recipe: hit.recipe, source: { ...hit.source, url: sourceUrl }, ms, cached: true, remainingToday: left };
        }
    } catch (e) {
        console.error("[try] cache read failed, treating as a miss", e);
    }

    // 2. Limits, before any fetch. If the store is down we refuse rather than spend.
    let reservation;
    try {
        reservation = await reserveRun(store, {
            ipHash,
            platform,
            perVisitor: TRY_PER_VISITOR_PER_DAY,
            globalCap: dailyCap(env.TRY_DAILY_CAP),
            now: new Date(now()),
        });
    } catch (e) {
        console.error("[try] rate limit store failed", e);
        return { status: "error", source: emptySource(platform, sourceUrl), ms: elapsed(), cached: false, remainingToday: 0, message: "Something went wrong on our side. Try again in a moment." };
    }
    if (!reservation.allowed) {
        return {
            status: "limited",
            source: emptySource(platform, sourceUrl),
            ms: elapsed(),
            cached: false,
            remainingToday: 0,
            limit: reservation.reason,
            message:
                reservation.reason === "visitor"
                    ? "You have used today's 3 free tries on the web."
                    : "The web tries are used up for today.",
        };
    }

    const finish = async (res: Omit<TryResponse, "ms" | "cached" | "remainingToday">): Promise<TryResponse> => {
        const ms = elapsed();
        // A failure on our side or at the source gives the try back.
        const refunded = res.status === "error";
        await store
            .updateEvent(reservation.eventId, { status: refunded ? "refunded" : res.status, ms })
            .catch((e) => console.error("[try] log update failed", e));
        return { ...res, ms, cached: false, remainingToday: refunded ? reservation.remaining + 1 : reservation.remaining };
    };

    // 3. Source text.
    let src: SourceText;
    try {
        src = await (deps.fetchSource ?? fetchSource)(platform, url);
    } catch (e) {
        const visitor = e instanceof SourceError ? e.visitorMessage : "We could not open that link. Try again in a moment.";
        console.error(`[try] source failed (${platform}):`, (e as Error)?.message ?? e);
        return finish({ status: "error", source: emptySource(platform, sourceUrl), message: visitor });
    }
    const source: TrySource = { platform, creator: src.creator, thumbnail: src.thumbnail, url: sourceUrl };

    const cacheAndFinish = async (res: { status: "recipe" | "no_recipe"; recipe?: TryResponse["recipe"] }) => {
        await store
            .setCache(key, { status: res.status, recipe: res.recipe, source: { ...source, url: null } })
            .catch((e) => console.error("[try] cache write failed", e));
        return finish({ ...res, source });
    };

    if (src.structured) return cacheAndFinish({ status: "recipe", recipe: src.structured });
    if (!src.text.trim() || (src.kind === "caption" && isThinCaption(src.text))) {
        return cacheAndFinish({ status: "no_recipe" });
    }

    // 4. Model, only when there is text and no structured recipe.
    const apiKey = env.FLAV_TRY_ANTHROPIC_API_KEY;
    if (!apiKey) {
        console.error("[try] FLAV_TRY_ANTHROPIC_API_KEY is not set: cannot read captions or pages without structured data.");
        return finish({ status: "error", source, message: "We could not read that one right now. Try it in the app instead." });
    }
    try {
        const result = await (deps.extract ?? extractWithModel)({
            text: src.text,
            kind: src.kind,
            apiKey,
            model: env.FLAV_TRY_MODEL,
        });
        return cacheAndFinish(result.found ? { status: "recipe", recipe: result.recipe } : { status: "no_recipe" });
    } catch (e) {
        console.error("[try] model failed:", (e as Error)?.message ?? e);
        return finish({ status: "error", source, message: "We could not read that one right now. Try again in a moment." });
    }
}
