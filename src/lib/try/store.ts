import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { TryPlatform, TryRecipe, TrySource, TryStatus } from "./types";

/**
 * Storage for /try: the run log (web_try_events) and the result cache
 * (web_try_cache). Supabase through the service role in production, an
 * in-memory store when the service role env is missing (local dev).
 */

/** "running" marks a reserved slot whose run has not finished yet. */
/** "refunded": a run that failed on our side or at the source; it does not use one of the visitor's 3 tries. */
export type EventStatus = TryStatus | "running" | "refunded";

export interface TryEvent {
    ip_hash: string;
    platform: TryPlatform | null;
    status: EventStatus;
    ms: number | null;
    cached: boolean;
}

export interface CachedResult {
    status: "recipe" | "no_recipe";
    recipe?: TryRecipe;
    source: TrySource;
}

export interface TryStore {
    /** Insert an event and return its id. */
    insertEvent(ev: TryEvent): Promise<string>;
    updateEvent(id: string, patch: { status: EventStatus; ms: number | null }): Promise<void>;
    /**
     * Runs since `since` that count against a limit: not cached, not limited.
     * With includeRefunded false (the default), refunded runs are left out too.
     * Optionally for one visitor.
     */
    countRuns(since: Date, ipHash?: string, includeRefunded?: boolean): Promise<number>;
    getCache(key: string, maxAgeMs: number): Promise<CachedResult | null>;
    setCache(key: string, result: CachedResult): Promise<void>;
}

type MemEvent = TryEvent & { id: string; created_at: number };

export class MemoryTryStore implements TryStore {
    events: MemEvent[] = [];
    cache = new Map<string, { result: CachedResult; created_at: number }>();
    private seq = 0;
    constructor(private now: () => number = Date.now) {}

    async insertEvent(ev: TryEvent): Promise<string> {
        const id = String(++this.seq);
        this.events.push({ ...ev, id, created_at: this.now() });
        if (this.events.length > 5000) this.events.splice(0, this.events.length - 5000);
        return id;
    }
    async updateEvent(id: string, patch: { status: EventStatus; ms: number | null }): Promise<void> {
        const ev = this.events.find((e) => e.id === id);
        if (ev) Object.assign(ev, patch);
    }
    async countRuns(since: Date, ipHash?: string, includeRefunded = false): Promise<number> {
        const t = since.getTime();
        return this.events.filter(
            (e) =>
                e.created_at >= t &&
                !e.cached &&
                e.status !== "limited" &&
                (includeRefunded || e.status !== "refunded") &&
                (!ipHash || e.ip_hash === ipHash),
        ).length;
    }
    async getCache(key: string, maxAgeMs: number): Promise<CachedResult | null> {
        const hit = this.cache.get(key);
        if (!hit || this.now() - hit.created_at > maxAgeMs) return null;
        return hit.result;
    }
    async setCache(key: string, result: CachedResult): Promise<void> {
        this.cache.set(key, { result, created_at: this.now() });
    }
}

export class SupabaseTryStore implements TryStore {
    constructor(private db: SupabaseClient) {}

    async insertEvent(ev: TryEvent): Promise<string> {
        const { data, error } = await this.db.from("web_try_events").insert(ev).select("id").single();
        if (error) throw new Error(`web_try_events insert: ${error.message}`);
        return String((data as { id: string | number }).id);
    }
    async updateEvent(id: string, patch: { status: EventStatus; ms: number | null }): Promise<void> {
        const { error } = await this.db.from("web_try_events").update(patch).eq("id", id);
        if (error) throw new Error(`web_try_events update: ${error.message}`);
    }
    async countRuns(since: Date, ipHash?: string, includeRefunded = false): Promise<number> {
        let q = this.db
            .from("web_try_events")
            .select("id", { count: "exact", head: true })
            .gte("created_at", since.toISOString())
            .eq("cached", false)
            .neq("status", "limited");
        if (!includeRefunded) q = q.neq("status", "refunded");
        if (ipHash) q = q.eq("ip_hash", ipHash);
        const { count, error } = await q;
        if (error) throw new Error(`web_try_events count: ${error.message}`);
        return count ?? 0;
    }
    async getCache(key: string, maxAgeMs: number): Promise<CachedResult | null> {
        const since = new Date(Date.now() - maxAgeMs).toISOString();
        const { data, error } = await this.db
            .from("web_try_cache")
            .select("result")
            .eq("url_key", key)
            .gte("created_at", since)
            .maybeSingle();
        if (error) throw new Error(`web_try_cache read: ${error.message}`);
        return (data?.result as CachedResult | undefined) ?? null;
    }
    async setCache(key: string, result: CachedResult): Promise<void> {
        const { error } = await this.db
            .from("web_try_cache")
            .upsert({ url_key: key, result, created_at: new Date().toISOString() }, { onConflict: "url_key" });
        if (error) throw new Error(`web_try_cache write: ${error.message}`);
    }
}

let shared: TryStore | null = null;

export function getTryStore(): TryStore {
    if (shared) return shared;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (url && key) {
        shared = new SupabaseTryStore(createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }));
    } else {
        console.warn(
            "[try] SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL is missing: using an in-memory store. Limits and cache reset on restart.",
        );
        shared = new MemoryTryStore();
    }
    return shared;
}
