"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LinkForm } from "@/components/flav/LinkForm";
import { appStoreUrl, FLAV } from "@/lib/flav-config";
import {
    TRY_DISABLED_MESSAGE,
    TRY_PER_VISITOR_PER_DAY,
    type TryRecipe,
    type TryResponse,
    type TrySource,
} from "@/lib/try/types";

/**
 * The /try tool. Results are rendered here in the browser only, never on the
 * server, so the recipes visitors pull are not indexed.
 */

type View =
    | { kind: "idle" }
    | { kind: "reading"; isVideo: boolean }
    | { kind: "done"; res: TryResponse }
    | { kind: "offline" };

const APP_URL = appStoreUrl("web-try");
const CLIENT_TIMEOUT_MS = 65_000;

const WORDS = [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];

function tookLine(ms: number): string {
    if (ms < 1000) return "That took under a second";
    const s = Math.round(ms / 1000);
    return `That took ${WORDS[s] ?? s} second${s === 1 ? "" : "s"}`;
}

function isVideoLink(url: string): boolean {
    try {
        const host = new URL(url).hostname.toLowerCase();
        return /(^|\.)(tiktok|instagram)\.com$/.test(host);
    } catch {
        return true;
    }
}

function hostOf(url: string | null): string | null {
    if (!url) return null;
    try {
        return new URL(url).hostname.replace(/^www\./, "");
    } catch {
        return null;
    }
}

function fromLine(source: TrySource): string {
    const where =
        source.platform === "tiktok"
            ? "TikTok"
            : source.platform === "instagram"
              ? "Instagram"
              : hostOf(source.url) ?? "the web";
    const parts = [`From ${where}`];
    if (source.creator && source.creator.toLowerCase() !== where.toLowerCase()) parts.push(source.creator);
    return parts.join(" · ");
}

function countsLine(r: TryRecipe): string {
    const parts = [
        `${r.ingredients.length} ingredient${r.ingredients.length === 1 ? "" : "s"}`,
        `${r.steps.length} step${r.steps.length === 1 ? "" : "s"}`,
    ];
    if (r.minutes) parts.push(`${r.minutes} min`);
    return parts.join(" · ");
}

function safeHttps(url: string | null): string | null {
    return url && url.startsWith("https://") ? url : null;
}

const cardPad = { padding: "clamp(20px, 4vw, 36px)" } as const;
const ink2 = { color: "var(--fl-ink-2)" } as const;

function Thumbnail({ src }: { src: string | null }) {
    const [broken, setBroken] = useState(false);
    const box = {
        width: 88,
        height: 120,
        borderRadius: "var(--fl-radius-md)",
        background: "var(--fl-track)",
        flex: "0 0 auto",
        objectFit: "cover",
    } as const;
    if (!src || broken) return <div aria-hidden="true" style={box} />;
    return (
        // Remote CDN thumbnails expire and are not in next.config images, so a plain img.
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt=""
            width={88}
            height={120}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setBroken(true)}
            style={box}
        />
    );
}

function AppButton({ label }: { label: string }) {
    return (
        <a href={APP_URL} className="fl-btn fl-btn-ink self-start">
            {label}
        </a>
    );
}

function RecipeCard({ res }: { res: TryResponse }) {
    const recipe = res.recipe!;
    const original = safeHttps(res.source.url);
    const isVideo = res.source.platform === "tiktok" || res.source.platform === "instagram";
    return (
        <article className="fl-card-hero fl-write flex flex-col gap-[22px]" style={cardPad}>
            <div className="flex flex-wrap items-center gap-5">
                <Thumbnail src={safeHttps(res.source.thumbnail)} />
                <div className="flex min-w-0 flex-col gap-1.5" style={{ flex: "1 1 300px" }}>
                    <span className="fl-micro">{fromLine(res.source)}</span>
                    <h2 className="fl-title">{recipe.title}</h2>
                    <span className="fl-micro fl-num" style={{ fontSize: 12, letterSpacing: "0.04em" }}>
                        {countsLine(recipe)}
                    </span>
                </div>
                <span className="inline-flex items-center gap-2 text-[13px] font-bold" style={ink2}>
                    <span className="fl-dot-inline" style={{ animation: "none" }} aria-hidden="true" />
                    {tookLine(res.ms)}
                </span>
            </div>

            <div className="flex flex-wrap gap-8">
                <section className="min-w-0" style={{ flex: "1 1 280px" }} aria-labelledby="try-ingredients">
                    <h3 id="try-ingredients" className="fl-micro" style={{ margin: "0 0 8px" }}>
                        Ingredients
                    </h3>
                    {recipe.ingredients.length ? (
                        <ul className="m-0 list-none p-0">
                            {recipe.ingredients.map((ing, i) => (
                                <li
                                    key={i}
                                    className="flex justify-between gap-4 py-[11px] text-sm font-medium"
                                    style={{ ...ink2, borderBottom: "1px solid var(--fl-hairline)" }}
                                >
                                    <span>{ing.name}</span>
                                    {ing.qty ? (
                                        <b className="fl-num shrink-0 text-right" style={{ fontWeight: 800, color: "var(--fl-ink)", letterSpacing: "-0.02em" }}>
                                            {ing.qty}
                                        </b>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="fl-body">No ingredients are written down for this one.</p>
                    )}
                </section>
                <section className="min-w-0" style={{ flex: "1.3 1 340px" }} aria-labelledby="try-steps">
                    <h3 id="try-steps" className="fl-micro" style={{ margin: "0 0 8px" }}>
                        Steps
                    </h3>
                    {recipe.steps.length ? (
                        <ol className="m-0 list-none p-0">
                            {recipe.steps.map((step, i) => (
                                <li key={i} className="flex gap-3.5 py-[11px]" style={{ borderBottom: "1px solid var(--fl-hairline)" }}>
                                    <span className="fl-num shrink-0 text-sm" style={{ width: 18, fontWeight: 800, color: "var(--fl-ink)" }}>
                                        {i + 1}
                                    </span>
                                    <span className="text-sm font-medium leading-5" style={ink2}>
                                        {step}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="fl-body">The steps are not written down, only the ingredients. The video shows the method.</p>
                    )}
                </section>
            </div>

            {original ? (
                <a href={original} className="fl-link self-start text-[15px]" target="_blank" rel="noopener noreferrer nofollow">
                    {isVideo ? "Watch the original" : "See the original page"}
                </a>
            ) : null}

            <div
                className="flex flex-wrap items-center justify-between gap-4 p-5"
                style={{ background: "var(--fl-ground)", borderRadius: "var(--fl-radius-lg)" }}
            >
                <span className="text-[17px] font-extrabold" style={{ letterSpacing: "-0.03em" }}>
                    Keep it, and cook it step by step.
                </span>
                <a href={APP_URL} className="fl-btn fl-btn-ink">
                    Save it in Flav
                </a>
            </div>
        </article>
    );
}

function NoRecipeCard({ res }: { res: TryResponse }) {
    const isVideo = res.source.platform === "tiktok" || res.source.platform === "instagram";
    return (
        <article className="fl-card-hero fl-write flex flex-col gap-4" style={cardPad}>
            <span className="fl-micro">{fromLine(res.source)}</span>
            {isVideo ? (
                <>
                    <h2 className="fl-title">This one says the recipe out loud.</h2>
                    <p className="fl-body" style={{ maxWidth: 620 }}>
                        {"The caption only has a title and hashtags, so there's nothing written for Flav to read yet. Check the creator's pinned comment or the link in their bio for the written version."}
                    </p>
                    <Link href="/guides/tiktok-recipe-not-in-caption" className="fl-link self-start text-[15px]">
                        {"What to do when the recipe isn't in the caption"}
                    </Link>
                </>
            ) : (
                <>
                    <h2 className="fl-title">There is no recipe written on this page.</h2>
                    <p className="fl-body" style={{ maxWidth: 620 }}>
                        Flav reads the ingredients and steps written on a page, and this one does not have them. If the page has a video, paste the video link here instead.
                    </p>
                </>
            )}
        </article>
    );
}

function LimitedCard({ res }: { res: TryResponse }) {
    return (
        <article className="fl-card-hero fl-write flex flex-col gap-4" style={cardPad}>
            <h2 className="fl-title">
                {res.limit === "global" ? "The web tries are used up for today." : `That's today's ${TRY_PER_VISITOR_PER_DAY} free tries.`}
            </h2>
            <p className="fl-body" style={{ maxWidth: 620 }}>
                The Flav app gives you {FLAV.freeImportsPerMonth} recipes a month free. Share a TikTok or a Reel straight to it and the recipe lands in your cookbook. The web tries reset at midnight UTC.
            </p>
            <AppButton label="Get Flav on the App Store" />
        </article>
    );
}

function ErrorCard({ message, onRetry }: { message: string; onRetry?: () => void }) {
    const disabled = message === TRY_DISABLED_MESSAGE;
    return (
        <article className="fl-card fl-write flex flex-col gap-4" style={cardPad}>
            <p className="m-0 text-[17px] font-bold" style={{ letterSpacing: "-0.02em" }}>
                {message}
            </p>
            {disabled ? (
                <AppButton label="Get Flav on the App Store" />
            ) : onRetry ? (
                <button type="button" className="fl-btn fl-btn-soft fl-btn-sm self-start" onClick={onRetry}>
                    Try again
                </button>
            ) : null}
        </article>
    );
}

function ReadingCard({ isVideo }: { isVideo: boolean }) {
    return (
        <div className="fl-card-hero flex flex-col gap-[18px] p-7">
            <span className="fl-eyebrow inline-flex items-center gap-2.5" style={{ ...ink2, letterSpacing: "0.06em" }}>
                <span className="fl-dot-inline" aria-hidden="true" />
                {isVideo ? "Reading the video" : "Reading the page"}
            </span>
            <div className="fl-line fl-line-run" aria-hidden="true">
                <div className="fl-line-track" />
                <div className="fl-line-fill" />
            </div>
            <p className="fl-body">Usually a few seconds. Long captions can take about fifteen.</p>
        </div>
    );
}

/** One short line for screen readers, so the whole recipe is not read out as it appears. */
function liveText(view: View): string {
    if (view.kind === "reading") return "Reading the link.";
    if (view.kind === "offline") return "Could not reach Flav.";
    if (view.kind !== "done") return "";
    const r = view.res;
    if (r.status === "recipe" && r.recipe) return `Recipe ready: ${r.recipe.title}.`;
    if (r.status === "no_recipe") return "No written recipe found.";
    if (r.status === "limited") return "Daily web limit reached.";
    return r.message ?? "Something went wrong.";
}

export function TryClient({ enabled }: { enabled: boolean }) {
    const params = useSearchParams();
    const paramUrl = (params.get("url") ?? "").trim();
    const [view, setView] = useState<View>({ kind: "idle" });
    const [remaining, setRemaining] = useState<number | null>(null);
    const [lastRun, setLastRun] = useState<string | null>(null);
    const lastUrl = useRef<string | null>(null);
    const inflight = useRef<AbortController | null>(null);

    const run = useCallback(async (url: string) => {
        lastUrl.current = url;
        inflight.current?.abort();
        const ac = new AbortController();
        inflight.current = ac;
        const timer = setTimeout(() => ac.abort(), CLIENT_TIMEOUT_MS);

        // Keep the address bar shareable. Next keeps useSearchParams in step with this.
        const next = `/try?url=${encodeURIComponent(url)}`;
        if (`${window.location.pathname}${window.location.search}` !== next) {
            window.history.replaceState(null, "", next);
        }

        setLastRun(url);
        setView({ kind: "reading", isVideo: isVideoLink(url) });
        try {
            const r = await fetch("/api/try", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ url }),
                signal: ac.signal,
            });
            const data = (await r.json()) as TryResponse;
            if (inflight.current !== ac) return;
            setView({ kind: "done", res: data });
            if (data.status !== "error" && typeof data.remainingToday === "number") setRemaining(data.remainingToday);
        } catch {
            if (inflight.current !== ac) return;
            setView({ kind: "offline" });
        } finally {
            clearTimeout(timer);
        }
    }, []);

    // /try?url=... runs the import on load (links from home and guides land here).
    useEffect(() => {
        if (!enabled || !paramUrl || paramUrl === lastUrl.current) return;
        const t = setTimeout(() => void run(paramUrl), 0);
        return () => clearTimeout(t);
    }, [enabled, paramUrl, run]);

    useEffect(() => () => inflight.current?.abort(), []);

    if (!enabled) {
        return <ErrorCard message={TRY_DISABLED_MESSAGE} />;
    }

    const busy = view.kind === "reading";
    const retry = lastRun ? () => void run(lastRun) : undefined;

    return (
        <>
            <LinkForm
                id="try-link"
                placeholder="Paste a TikTok or Instagram link"
                initial={paramUrl}
                onSubmitUrl={(url) => void run(url)}
                busy={busy}
            />
            <p className="m-0 text-[13px] font-medium" style={{ color: "var(--fl-muted)" }}>
                3 free tries a day on the web. Nothing here is saved to an account or published; the recipe stays credited to the video.
                {remaining !== null ? ` You have ${remaining} left today.` : null}
            </p>

            <p className="fl-sr" aria-live="polite">
                {liveText(view)}
            </p>
            <div aria-busy={busy} className="flex flex-col">
                {view.kind === "reading" ? <ReadingCard isVideo={view.isVideo} /> : null}
                {view.kind === "offline" ? (
                    <ErrorCard message="We could not reach Flav. Check your connection and try again." onRetry={retry} />
                ) : null}
                {view.kind === "done" && view.res.status === "recipe" && view.res.recipe ? <RecipeCard res={view.res} /> : null}
                {view.kind === "done" && view.res.status === "no_recipe" ? <NoRecipeCard res={view.res} /> : null}
                {view.kind === "done" && view.res.status === "limited" ? <LimitedCard res={view.res} /> : null}
                {view.kind === "done" && (view.res.status === "error" || (view.res.status === "recipe" && !view.res.recipe)) ? (
                    <ErrorCard
                        message={view.res.message ?? "We could not read that link. Check it opens in your browser and try again."}
                        onRetry={retry}
                    />
                ) : null}
            </div>
        </>
    );
}
