import type { TryPlatform } from "./types";

/**
 * URL checks for /try. Pure functions with no Node imports so they can be
 * unit tested and reused. The network layer (sources.ts) repeats the private
 * address check on every resolved IP, so a public hostname that points at a
 * private address is refused too.
 */

export const MAX_URL_LENGTH = 500;

export type ValidUrl = { ok: true; url: URL; platform: TryPlatform };
export type InvalidUrl = { ok: false; message: string };

const BLOCKED_SUFFIXES = [".localhost", ".local", ".internal", ".lan", ".home.arpa", ".intranet", ".corp", ".onion"];

function hostIs(host: string, domain: string): boolean {
    return host === domain || host.endsWith(`.${domain}`);
}

export function isIpLiteral(hostname: string): boolean {
    if (hostname.startsWith("[") || hostname.includes(":")) return true;
    // The WHATWG parser rewrites decimal, octal and hex IPv4 forms to dotted quads.
    return /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname);
}

/** True for loopback, private, link local, carrier NAT, multicast, documentation and reserved ranges. */
export function isPrivateAddress(address: string): boolean {
    const ip = address.trim().toLowerCase().replace(/^\[|\]$/g, "");
    const v4 = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (v4) {
        const [a, b, c] = v4.slice(1, 4).map(Number);
        if (a === 0 || a === 10 || a === 127) return true;
        if (a === 100 && b >= 64 && b <= 127) return true;
        if (a === 169 && b === 254) return true;
        if (a === 172 && b >= 16 && b <= 31) return true;
        if (a === 192 && b === 168) return true;
        if (a === 192 && b === 0 && (c === 0 || c === 2)) return true;
        if (a === 198 && (b === 18 || b === 19)) return true;
        if (a === 198 && b === 51 && c === 100) return true;
        if (a === 203 && b === 0 && c === 113) return true;
        if (a >= 224) return true;
        return false;
    }
    if (!ip.includes(":")) return true; // not an address we understand: refuse
    if (ip === "::" || ip === "::1") return true;
    const mapped = ip.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/);
    if (mapped) return isPrivateAddress(mapped[1]);
    if (/^::ffff:/.test(ip) || /^::(\d|[a-f])/.test(ip)) return true; // mapped or compatible forms in hex
    if (/^f[cd]/.test(ip)) return true; // fc00::/7 unique local
    if (/^fe[89ab]/.test(ip)) return true; // fe80::/10 link local
    if (/^fe[c-f]/.test(ip)) return true; // fec0::/10 site local (deprecated)
    if (/^ff/.test(ip)) return true; // multicast
    if (/^64:ff9b:/.test(ip)) return true; // NAT64 can reach private IPv4
    if (/^2001:0?db8:/.test(ip)) return true; // documentation
    if (/^2002:/.test(ip)) return true; // 6to4 can embed private IPv4
    return false;
}

/** A hostname we will never fetch, before any DNS lookup. */
export function isBlockedHostname(hostname: string): boolean {
    const host = hostname.toLowerCase().replace(/\.$/, "");
    if (!host || host === "localhost") return true;
    if (isIpLiteral(host)) return true;
    if (!host.includes(".")) return true;
    return BLOCKED_SUFFIXES.some((s) => host.endsWith(s));
}

export function platformFor(url: URL): TryPlatform | null {
    const host = url.hostname.toLowerCase();
    if (hostIs(host, "tiktok.com")) return "tiktok";
    if (hostIs(host, "instagram.com")) {
        return /\/(p|reel|reels|tv)\/[A-Za-z0-9_-]+/.test(url.pathname) ? "instagram" : null;
    }
    return "web";
}

export function validateTryUrl(raw: unknown): ValidUrl | InvalidUrl {
    if (typeof raw !== "string" || !raw.trim()) {
        return { ok: false, message: "Paste a link to a TikTok, an Instagram Reel or a recipe page." };
    }
    const input = raw.trim();
    if (input.length > MAX_URL_LENGTH) {
        return { ok: false, message: "That link is too long. Copy the share link and try again." };
    }
    let url: URL;
    try {
        url = new URL(input);
    } catch {
        return { ok: false, message: "That does not look like a link. Copy the share link and try again." };
    }
    if (url.protocol !== "https:") {
        return { ok: false, message: "Use a link that starts with https://." };
    }
    if (url.username || url.password || (url.port && url.port !== "443")) {
        return { ok: false, message: "That link cannot be read here." };
    }
    if (isBlockedHostname(url.hostname)) {
        return { ok: false, message: "That link cannot be read here." };
    }
    const platform = platformFor(url);
    if (!platform) {
        return { ok: false, message: "That Instagram link is not a post or a Reel. Open the Reel, tap Share, then Copy link." };
    }
    url.hash = "";
    return { ok: true, url, platform };
}

const TRACKING_PARAMS = /^(utm_.+|fbclid|gclid|dclid|msclkid|mc_cid|mc_eid|igsh|igshid|ref|ref_src|_ga|_gl|yclid|si)$/i;

/**
 * Cache key for a link. Host lowercased without "www.", no hash, no trailing
 * slash. Query strings are dropped for TikTok and Instagram (they only carry
 * share tracking), kept for TikTok short links (vt., vm.), and for other web
 * pages only tracking parameters are dropped, because sites like WordPress put
 * the page id in the query (?p=123).
 */
export function cacheKeyFor(url: URL, platform: TryPlatform): string {
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    let path = url.pathname.replace(/\/+$/, "") || "/";
    let search = "";

    if (platform === "instagram") {
        const m = url.pathname.match(/\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
        if (m) path = `/p/${m[1]}`;
        return `instagram.com${path}`;
    }
    if (platform === "tiktok") {
        if (host === "vt.tiktok.com" || host === "vm.tiktok.com") search = url.search;
        return `${host.replace(/^m\./, "")}${path}${search}`;
    }
    const params = new URLSearchParams(url.search);
    const kept = [...params.entries()].filter(([k]) => !TRACKING_PARAMS.test(k));
    kept.sort(([a], [b]) => a.localeCompare(b));
    if (kept.length) search = `?${new URLSearchParams(kept).toString()}`;
    return `${host}${path}${search}`;
}
