import { createHash } from "node:crypto";
import type { TryStore } from "./store";
import type { TryPlatform } from "./types";

/**
 * Daily limits for /try, per visitor and site wide, counted per UTC day.
 * A run reserves its slot by writing a "running" event first and then counting,
 * so two requests at once cannot both slip under the limit. A reserved slot
 * that ends up over the limit is marked "limited" and stops counting.
 */

export const DEFAULT_DAILY_CAP = 200;

/** Attempts per visitor per day including refunded ones, so failed links cannot be retried forever. */
export const ATTEMPTS_PER_VISITOR_PER_DAY = 10;

let warnedSalt = false;

export function hashIp(ip: string, salt = process.env.TRY_IP_SALT ?? ""): string {
    if (!salt && !warnedSalt) {
        warnedSalt = true;
        console.warn("[try] TRY_IP_SALT is not set: visitor hashes are unsalted. Set it in production.");
    }
    return createHash("sha256").update(`${ip}${salt}`).digest("hex");
}

/** First entry of x-forwarded-for, else x-real-ip, else "unknown". */
export function clientIp(headers: Headers): string {
    const fwd = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    return fwd || headers.get("x-real-ip")?.trim() || "unknown";
}

export function startOfUtcDay(now = new Date()): Date {
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export function dailyCap(raw = process.env.TRY_DAILY_CAP): number {
    if (raw === undefined || raw.trim() === "") return DEFAULT_DAILY_CAP;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : DEFAULT_DAILY_CAP;
}

export type Reservation =
    | { allowed: true; eventId: string; remaining: number }
    | { allowed: false; eventId: string; remaining: number; reason: "visitor" | "global" };

export async function reserveRun(
    store: TryStore,
    opts: { ipHash: string; platform: TryPlatform; perVisitor: number; globalCap: number; now?: Date },
): Promise<Reservation> {
    const since = startOfUtcDay(opts.now);
    const eventId = await store.insertEvent({
        ip_hash: opts.ipHash,
        platform: opts.platform,
        status: "running",
        ms: null,
        cached: false,
    });
    const [mine, attempts, all] = await Promise.all([
        store.countRuns(since, opts.ipHash),
        store.countRuns(since, opts.ipHash, true),
        store.countRuns(since, undefined, true),
    ]);

    const overVisitor = mine > opts.perVisitor || attempts > ATTEMPTS_PER_VISITOR_PER_DAY;
    if (overVisitor || all > opts.globalCap) {
        await store.updateEvent(eventId, { status: "limited", ms: 0 });
        const reason: "visitor" | "global" = overVisitor ? "visitor" : "global";
        return { allowed: false, eventId, reason, remaining: 0 };
    }
    return { allowed: true, eventId, remaining: Math.max(0, opts.perVisitor - mine) };
}

export async function remainingToday(store: TryStore, ipHash: string, perVisitor: number, now?: Date): Promise<number> {
    const used = await store.countRuns(startOfUtcDay(now), ipHash);
    return Math.max(0, perVisitor - used);
}
