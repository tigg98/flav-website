import { NextResponse } from "next/server";
import { runTry } from "@/lib/try/run";
import type { TryResponse } from "@/lib/try/types";

/** POST /api/try { url } -> TryResponse. See docs/TRY.md. */

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function statusCode(res: TryResponse): number {
    if (res.status === "limited") return 429;
    return 200;
}

export async function POST(request: Request) {
    let body: unknown = null;
    try {
        body = await request.json();
    } catch {
        body = null;
    }

    let res: TryResponse;
    try {
        res = await runTry(body, request.headers);
    } catch (e) {
        console.error("[try] unexpected failure", e);
        res = {
            status: "error",
            source: { platform: null, creator: null, thumbnail: null, url: null },
            ms: 0,
            cached: false,
            remainingToday: 0,
            message: "Something went wrong on our side. Try again in a moment.",
        };
    }

    console.info(`[try] ${res.source.platform ?? "invalid"} ${res.status} ${res.ms}ms cached=${res.cached}`);
    return NextResponse.json(res, { status: statusCode(res), headers: { "cache-control": "no-store" } });
}
