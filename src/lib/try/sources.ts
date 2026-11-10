import dns from "node:dns";
import https from "node:https";
import type { IncomingMessage } from "node:http";
import type { LookupFunction } from "node:net";
import zlib from "node:zlib";
import { extractJsonLdRecipe, metaImage, metaSiteName } from "./jsonld";
import { cleanLine, htmlToText } from "./text";
import type { TryPlatform, TryRecipe } from "./types";
import { isBlockedHostname, isPrivateAddress } from "./validate";

/** Fetches the text a recipe can come from: a caption from the scrape functions, or a web page. */

export interface SourceText {
    kind: "caption" | "page";
    text: string;
    creator: string | null;
    thumbnail: string | null;
    /** Set when the page carried a schema.org Recipe, so no model call is needed. */
    structured?: TryRecipe;
}

/** A failure we can explain to the visitor in one plain sentence. */
export class SourceError extends Error {
    constructor(public visitorMessage: string, detail: string) {
        super(detail);
    }
}

const SCRAPE_TIMEOUT_MS = 20_000;
const WEB_TIMEOUT_MS = 10_000;
const WEB_MAX_BYTES = 2 * 1024 * 1024;
const MAX_REDIRECTS = 5;
const BROWSER_UA =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function httpsOnly(v: unknown): string | null {
    return typeof v === "string" && v.startsWith("https://") ? v : null;
}

function firstString(o: Record<string, unknown>, keys: string[]): string | null {
    for (const k of keys) {
        const v = o[k];
        if (typeof v === "string" && v.trim()) return v;
    }
    return null;
}

function handle(v: string | null): string | null {
    if (!v) return null;
    const s = cleanLine(v);
    if (!s) return null;
    return /^[\w.]+$/.test(s) ? `@${s}` : s;
}

async function postScrape(fn: "scrape-tiktok" | "scrape-instagram", url: string, auth: boolean): Promise<Record<string, unknown>> {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!base) throw new SourceError("Reading videos is not set up here yet.", "NEXT_PUBLIC_SUPABASE_URL is missing");
    const headers: Record<string, string> = { "content-type": "application/json" };
    if (auth) {
        const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!anon) throw new SourceError("Reading Reels is not set up here yet.", "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing");
        headers.authorization = `Bearer ${anon}`;
        headers.apikey = anon;
    }
    let res: Response;
    try {
        res = await fetch(`${base.replace(/\/+$/, "")}/functions/v1/${fn}`, {
            method: "POST",
            headers,
            body: JSON.stringify({ url }),
            signal: AbortSignal.timeout(SCRAPE_TIMEOUT_MS),
            cache: "no-store",
        });
    } catch (e) {
        throw new SourceError("That took too long to open. Try again in a moment.", `${fn} fetch failed: ${String(e)}`);
    }
    const body = (await res.json().catch(() => null)) as Record<string, unknown> | null;
    if (!res.ok || !body || typeof body !== "object") {
        throw new SourceError(
            "We could not open that video. It may be private, removed or not available in the US.",
            `${fn} ${res.status}: ${JSON.stringify(body).slice(0, 300)}`,
        );
    }
    return body;
}

export async function fetchTikTok(url: string): Promise<SourceText> {
    const body = await postScrape("scrape-tiktok", url, false);
    return {
        kind: "caption",
        text: typeof body.rawCaption === "string" ? body.rawCaption : "",
        creator: handle(firstString(body, ["creator"])),
        thumbnail: httpsOnly(body.imageUrl),
    };
}

/** The scrape-instagram response shape is not verified, so read the likely field names in order. */
export function readInstagramBody(body: Record<string, unknown>): SourceText {
    return {
        kind: "caption",
        text: firstString(body, ["rawCaption", "caption", "description", "text"]) ?? "",
        creator: handle(firstString(body, ["creator", "author", "username"])),
        thumbnail: httpsOnly(firstString(body, ["imageUrl", "image", "thumbnail"])),
    };
}

export async function fetchInstagram(url: string): Promise<SourceText> {
    return readInstagramBody(await postScrape("scrape-instagram", url, true));
}

/** DNS lookup that refuses private, loopback and link local answers, so redirects and rebinding cannot reach them. */
const safeLookup: LookupFunction = (hostname, options, callback) => {
    dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
        if (err) return callback(err, "", 0);
        const list = addresses as dns.LookupAddress[];
        if (!list.length || list.some((a) => isPrivateAddress(a.address))) {
            const blocked = Object.assign(new Error(`blocked address for ${hostname}`), { code: "EBLOCKED" });
            return callback(blocked, "", 0);
        }
        if (options.all) return callback(null, list);
        return callback(null, list[0].address, list[0].family);
    });
};

function decodeBody(res: IncomingMessage): NodeJS.ReadableStream {
    const enc = String(res.headers["content-encoding"] ?? "").toLowerCase();
    if (enc === "gzip" || enc === "x-gzip") return res.pipe(zlib.createGunzip());
    if (enc === "deflate") return res.pipe(zlib.createInflate());
    if (enc === "br") return res.pipe(zlib.createBrotliDecompress());
    return res;
}

function getOnce(url: URL, deadline: number): Promise<{ status: number; location?: string; contentType: string; body: Buffer }> {
    return new Promise((resolve, reject) => {
        const left = deadline - Date.now();
        if (left <= 0) return reject(new Error("timeout"));
        const req = https.request(
            url,
            {
                method: "GET",
                lookup: safeLookup,
                headers: {
                    "user-agent": BROWSER_UA,
                    accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5",
                    "accept-language": "en-US,en;q=0.9",
                    "accept-encoding": "gzip, deflate, br",
                },
            },
            (res) => {
                const status = res.statusCode ?? 0;
                const contentType = String(res.headers["content-type"] ?? "");
                if (status >= 300 && status < 400) {
                    res.resume();
                    clearTimeout(timer);
                    return resolve({ status, location: res.headers.location, contentType, body: Buffer.alloc(0) });
                }
                const chunks: Buffer[] = [];
                let size = 0;
                const stream = decodeBody(res);
                const done = () => {
                    clearTimeout(timer);
                    resolve({ status, contentType, body: Buffer.concat(chunks) });
                };
                stream.on("data", (c: Buffer) => {
                    size += c.length;
                    chunks.push(c);
                    // Past the cap, keep what we have: the recipe JSON-LD is usually near the top.
                    if (size >= WEB_MAX_BYTES) {
                        stream.removeAllListeners("data");
                        req.destroy();
                        done();
                    }
                });
                stream.on("end", done);
                stream.on("error", (e) => {
                    clearTimeout(timer);
                    reject(e);
                });
            },
        );
        const timer = setTimeout(() => req.destroy(new Error("timeout")), left);
        req.on("error", (e) => {
            clearTimeout(timer);
            reject(e);
        });
        req.end();
    });
}

function decodeText(body: Buffer, contentType: string): string {
    const charset = contentType.match(/charset=["']?([\w-]+)/i)?.[1];
    try {
        return new TextDecoder(charset || "utf-8").decode(body);
    } catch {
        return new TextDecoder("utf-8").decode(body);
    }
}

/** GET a public https page with redirects checked hop by hop. */
export async function fetchPublicHtml(start: URL): Promise<{ html: string; finalUrl: URL }> {
    const deadline = Date.now() + WEB_TIMEOUT_MS;
    let url = start;
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
        if (url.protocol !== "https:" || isBlockedHostname(url.hostname) || (url.port && url.port !== "443")) {
            throw new SourceError("That page cannot be read here.", `refused hop to ${url.href}`);
        }
        let res;
        try {
            res = await getOnce(url, deadline);
        } catch (e) {
            const msg = String((e as Error)?.message ?? e);
            if (msg.includes("blocked address")) throw new SourceError("That page cannot be read here.", msg);
            if (msg.includes("timeout")) throw new SourceError("That page took too long to open. Try again in a moment.", msg);
            throw new SourceError("We could not open that page. Check the link opens in your browser.", msg);
        }
        if (res.location) {
            url = new URL(res.location, url);
            continue;
        }
        if (res.status < 200 || res.status >= 300) {
            // Most recipe sites answer 401 to 404 or 429 to datacenter traffic (seen from Vercel on 2026-11-09).
            throw new SourceError("That site doesn't let us read it from the web. TikTok and Instagram links work here.", `web ${res.status} ${url.href}`);
        }
        if (res.contentType && !/html|xml/i.test(res.contentType)) {
            throw new SourceError("That link is not a web page we can read.", `content-type ${res.contentType}`);
        }
        return { html: decodeText(res.body, res.contentType), finalUrl: url };
    }
    throw new SourceError("That link redirects too many times.", `too many redirects from ${start.href}`);
}

/** Pure: what a fetched page gives us. Structured recipe when JSON-LD has one, visible text otherwise. */
export function readWebPage(html: string, pageUrl: URL): SourceText {
    const ld = extractJsonLdRecipe(html);
    const host = pageUrl.hostname.replace(/^www\./, "");
    const thumbnail = ld?.image ?? metaImage(html);
    const creator = ld?.author ?? metaSiteName(html) ?? host;
    if (ld) return { kind: "page", text: "", creator, thumbnail, structured: ld.recipe };
    return { kind: "page", text: htmlToText(html, 12000), creator, thumbnail };
}

export async function fetchWeb(url: URL): Promise<SourceText> {
    const { html, finalUrl } = await fetchPublicHtml(url);
    return readWebPage(html, finalUrl);
}

export async function fetchSource(platform: TryPlatform, url: URL): Promise<SourceText> {
    if (platform === "tiktok") return fetchTikTok(url.href);
    if (platform === "instagram") return fetchInstagram(url.href);
    return fetchWeb(url);
}
