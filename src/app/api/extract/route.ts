import { NextResponse } from "next/server";

const BROWSER_UA =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/** Decode HTML entities (&#064; &quot; &#x2728; &amp; etc.) */
function decodeEntities(s: string): string {
    return s
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, h) =>
            String.fromCharCode(parseInt(h, 16))
        )
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
}

function getMetaTag(html: string, name: string): string | null {
    // property/name THEN content
    const r1 = new RegExp(
        `<meta\\s+(?:name|property)=["']${name}["']\\s+content=["']([^"']*)["']`,
        "i"
    );
    const m1 = html.match(r1);
    if (m1) return decodeEntities(m1[1]);

    // content THEN property/name (Instagram order)
    const r2 = new RegExp(
        `<meta\\s+content=["']([^"']*)["']\\s+(?:name|property)=["']${name}["']`,
        "i"
    );
    const m2 = html.match(r2);
    if (m2) return decodeEntities(m2[1]);

    return null;
}

// ── Instagram ────────────────────────────────────────────────────────
async function extractInstagram(url: string) {
    const shortcodeMatch = url.match(
        /\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/
    );
    if (!shortcodeMatch) return null;

    const shortcode = shortcodeMatch[2];
    let title: string | null = null;
    let description: string | null = null;
    let image: string | null = null;
    let author: string | null = null;

    // 1) Embed endpoint — most reliable for public posts
    try {
        const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
        const embedRes = await fetch(embedUrl, {
            headers: { "User-Agent": BROWSER_UA },
            signal: AbortSignal.timeout(8000),
        });
        if (embedRes.ok) {
            const html = await embedRes.text();

            // Image — try multiple patterns Instagram has used
            const imgPatterns = [
                /class="[^"]*EmbeddedMediaImage[^"]*"[^>]*src="([^"]+)"/,
                /src="(https:\/\/[^"]*(?:cdninstagram|fbcdn)[^"]*\.jpg[^"]*)"/,
                /style="background-image:\s*url\('([^']+)'\)/,
            ];
            for (const pat of imgPatterns) {
                const m = html.match(pat);
                if (m) {
                    image = decodeEntities(m[1]);
                    break;
                }
            }

            // Caption — the full text, not limited to 80 chars
            // Try the CaptionText span first, then any Caption container
            const captionPatterns = [
                /class="[^"]*CaptionText[^"]*"[^>]*>([\s\S]*?)<\/span>/,
                /class="[^"]*Caption[^"]*"[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/,
                /class="[^"]*Caption[^"]*"[^>]*>([\s\S]*?)<\/div>/,
            ];
            for (const pat of captionPatterns) {
                const m = html.match(pat);
                if (m) {
                    // Strip inner HTML tags, keep text
                    const raw = m[1].replace(/<[^>]+>/g, " ").trim();
                    if (raw.length > 5) {
                        description = decodeEntities(raw);
                        break;
                    }
                }
            }

            // Author from embed header
            const authorMatch = html.match(
                /class="[^"]*Username[^"]*"[^>]*>([^<]+)</
            );
            if (authorMatch) {
                author = authorMatch[1].trim();
            }

            // Title = first line of caption (up to first newline or period)
            if (description) {
                const firstLine = description.split(/[\n.!]/)[0].trim();
                if (firstLine.length > 3) title = firstLine;
            }
        }
    } catch {
        /* embed fetch failed */
    }

    // 2) Fallback: direct page meta tags (sometimes works)
    if (!image || !description) {
        try {
            const pageRes = await fetch(url, {
                headers: {
                    "User-Agent": BROWSER_UA,
                    Accept: "text/html",
                },
                signal: AbortSignal.timeout(5000),
            });
            if (pageRes.ok) {
                const html = await pageRes.text();
                if (!image) {
                    image =
                        getMetaTag(html, "og:image:secure_url") ||
                        getMetaTag(html, "og:image") ||
                        getMetaTag(html, "twitter:image");
                }
                if (!description) {
                    const ogDesc = getMetaTag(html, "og:description");
                    if (ogDesc && ogDesc !== "No description found") {
                        description = ogDesc;
                    }
                }
                if (!title || title === "Instagram") {
                    const ogTitle = getMetaTag(html, "og:title");
                    if (ogTitle && ogTitle !== "Instagram") {
                        title = ogTitle.split("|")[0].trim();
                    }
                }
                // Author from meta if not found in embed
                if (!author) {
                    const metaAuthor =
                        getMetaTag(html, "article:author") ||
                        getMetaTag(html, "og:site_name");
                    if (metaAuthor && metaAuthor !== "Instagram")
                        author = metaAuthor;
                }
            }
        } catch {
            /* page fetch failed */
        }
    }

    // 3) Author from URL as last resort
    if (!author) {
        const igUserMatch = url.match(
            /instagram\.com\/(?!p\/|reel\/|reels\/|tv\/|stories\/)([A-Za-z0-9._]+)/
        );
        if (igUserMatch) author = igUserMatch[1];
    }

    return { title, description, image, video: null as string | null, author };
}

// ── TikTok ───────────────────────────────────────────────────────────
async function extractTikTok(url: string) {
    let title: string | null = null;
    let description: string | null = null;
    let image: string | null = null;
    let author: string | null = null;

    // 1) oEmbed API — very reliable for TikTok
    try {
        const oEmbedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
        const oEmbedRes = await fetch(oEmbedUrl, {
            signal: AbortSignal.timeout(5000),
        });
        if (oEmbedRes.ok) {
            const data = await oEmbedRes.json();
            title = data.title || null;
            description = data.title || null; // TikTok oEmbed puts caption in title
            image = data.thumbnail_url || null;
            author = data.author_unique_id || data.author_name || null;
        }
    } catch {
        /* oEmbed failed */
    }

    // 2) Fallback: page meta tags
    if (!image || !title) {
        try {
            const pageRes = await fetch(url, {
                headers: { "User-Agent": BROWSER_UA, Accept: "text/html" },
                signal: AbortSignal.timeout(5000),
            });
            if (pageRes.ok) {
                const html = await pageRes.text();
                if (!image)
                    image =
                        getMetaTag(html, "og:image") ||
                        getMetaTag(html, "twitter:image");
                if (!title) {
                    const ogTitle = getMetaTag(html, "og:title");
                    if (ogTitle) title = ogTitle;
                }
                if (!description) {
                    description =
                        getMetaTag(html, "og:description") ||
                        getMetaTag(html, "description");
                }
            }
        } catch {
            /* page fetch failed */
        }
    }

    // Author from URL
    if (!author) {
        const tkUserMatch = url.match(/tiktok\.com\/@([A-Za-z0-9._]+)/);
        if (tkUserMatch) author = tkUserMatch[1];
    }

    return { title, description, image, video: null as string | null, author };
}

// ── YouTube ──────────────────────────────────────────────────────────
async function extractYouTube(url: string) {
    let title: string | null = null;
    let description: string | null = null;
    let image: string | null = null;
    let author: string | null = null;

    // 1) oEmbed API — reliable for YouTube
    try {
        const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
        const oEmbedRes = await fetch(oEmbedUrl, {
            signal: AbortSignal.timeout(5000),
        });
        if (oEmbedRes.ok) {
            const data = await oEmbedRes.json();
            title = data.title || null;
            author = data.author_name || null;
            image = data.thumbnail_url || null;
        }
    } catch {
        /* oEmbed failed */
    }

    // 2) Page meta tags for description (oEmbed doesn't include it)
    try {
        const pageRes = await fetch(url, {
            headers: { "User-Agent": BROWSER_UA, Accept: "text/html" },
            signal: AbortSignal.timeout(5000),
        });
        if (pageRes.ok) {
            const html = await pageRes.text();
            if (!description)
                description =
                    getMetaTag(html, "og:description") ||
                    getMetaTag(html, "description");
            if (!image)
                image =
                    getMetaTag(html, "og:image") ||
                    getMetaTag(html, "twitter:image");
            if (!title) {
                const ogTitle = getMetaTag(html, "og:title");
                if (ogTitle) title = ogTitle;
            }
        }
    } catch {
        /* page fetch failed */
    }

    return { title, description, image, video: null as string | null, author };
}

// ── Generic (any URL) ────────────────────────────────────────────────
async function extractGeneric(url: string) {
    const response = await fetch(url, {
        headers: {
            "User-Agent": BROWSER_UA,
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        },
        signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;
    const html = await response.text();

    const ogTitle = getMetaTag(html, "og:title");
    const titleTag = html.match(/<title>([^<]*)<\/title>/i);
    const title =
        ogTitle || (titleTag ? decodeEntities(titleTag[1]) : null);

    const description =
        getMetaTag(html, "og:description") || getMetaTag(html, "description");

    const image =
        getMetaTag(html, "og:image:secure_url") ||
        getMetaTag(html, "og:image") ||
        getMetaTag(html, "twitter:image");

    const video =
        getMetaTag(html, "og:video:secure_url") ||
        getMetaTag(html, "og:video");

    const author =
        getMetaTag(html, "article:author") ||
        getMetaTag(html, "og:site_name");

    // JSON-LD fallback
    let ldImage = image;
    let ldTitle = title;
    let ldDescription = description;
    const jsonLdRegex =
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let jsonLdMatch;
    while ((jsonLdMatch = jsonLdRegex.exec(html)) !== null) {
        try {
            const ld = JSON.parse(jsonLdMatch[1]);
            if (!ldImage && (ld.image || ld.thumbnailUrl)) {
                const img = ld.image || ld.thumbnailUrl;
                ldImage = Array.isArray(img)
                    ? img[0]
                    : typeof img === "string"
                      ? img
                      : (img?.url || null);
            }
            if (!ldTitle && ld.name) ldTitle = decodeEntities(ld.name);
            if (!ldDescription && (ld.description || ld.caption))
                ldDescription = decodeEntities(ld.description || ld.caption);
        } catch {
            /* malformed JSON-LD */
        }
    }

    return {
        title: ldTitle,
        description: ldDescription,
        image: ldImage,
        video,
        author,
    };
}

// ── Main handler ─────────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json(
                { error: "URL is required" },
                { status: 400 }
            );
        }

        try {
            new URL(url);
        } catch {
            return NextResponse.json(
                { error: "Invalid URL format" },
                { status: 400 }
            );
        }

        const isInstagram = url.includes("instagram.com");
        const isTikTok = url.includes("tiktok.com");
        const isYouTube =
            url.includes("youtube.com") || url.includes("youtu.be");

        let result;

        if (isInstagram) {
            result = await extractInstagram(url);
        } else if (isTikTok) {
            result = await extractTikTok(url);
        } else if (isYouTube) {
            result = await extractYouTube(url);
        }

        // Fall back to generic extraction if platform-specific failed or returned nothing useful
        if (
            !result ||
            (!result.title && !result.image && !result.description)
        ) {
            result = await extractGeneric(url);
        }

        if (!result) {
            return NextResponse.json(
                { error: "Could not extract content from URL" },
                { status: 422 }
            );
        }

        return NextResponse.json({
            title: result.title || "Untitled Recipe",
            description: result.description || "",
            image: result.image || null,
            video: result.video || null,
            author: result.author || null,
            url,
        });
    } catch (error) {
        console.error("Extraction error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
