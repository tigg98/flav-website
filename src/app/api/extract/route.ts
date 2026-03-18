import { NextResponse } from "next/server";

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
            new URL(url); // Validate URL format
        } catch {
            return NextResponse.json(
                { error: "Invalid URL format" },
                { status: 400 }
            );
        }

        // Fetch the page content — use a real browser UA so Instagram/TikTok serve full metadata
        const response = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch URL" },
                { status: response.status }
            );
        }

        const html = await response.text();

        // Decode HTML entities (&#064; &quot; &#x2728; &amp; etc.)
        const decodeEntities = (s: string): string => {
            return s
                .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
                .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
                .replace(/&quot;/g, '"')
                .replace(/&apos;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');
        };

        const getMetaTag = (html: string, name: string) => {
            // Try property/name THEN content (standard order)
            const regex1 = new RegExp(
                `<meta\\s+(?:name|property)=["']${name}["']\\s+content=["']([^"']*)["']`,
                "i"
            );
            const match1 = html.match(regex1);
            if (match1) return decodeEntities(match1[1]);

            // Try content THEN property/name (Instagram order)
            const regex2 = new RegExp(
                `<meta\\s+content=["']([^"']*)["']\\s+(?:name|property)=["']${name}["']`,
                "i"
            );
            const match2 = html.match(regex2);
            if (match2) return decodeEntities(match2[1]);

            return null;
        };

        const getTitle = (html: string) => {
            const ogTitle = getMetaTag(html, "og:title");
            if (ogTitle) return ogTitle;

            const titleRegex = /<title>([^<]*)<\/title>/i;
            const match = html.match(titleRegex);
            return match ? decodeEntities(match[1]) : null;
        };

        const getDescription = (html: string) => {
            return (
                getMetaTag(html, "og:description") ||
                getMetaTag(html, "description")
            );
        };

        const getImage = (html: string) => {
            return (
                getMetaTag(html, "og:image:secure_url") ||
                getMetaTag(html, "og:image") ||
                getMetaTag(html, "twitter:image")
            );
        };

        const getVideo = (html: string) => {
            return (
                getMetaTag(html, "og:video:secure_url") ||
                getMetaTag(html, "og:video")
            );
        };

        let title = getTitle(html) || "No title found";
        let description = getDescription(html) || "No description found";
        let image = getImage(html) || null;
        const video = getVideo(html) || null;

        // JSON-LD fallback — some sites embed structured data this way
        if (!image || title === "Instagram" || title === "No title found") {
            const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
            let jsonLdMatch;
            while ((jsonLdMatch = jsonLdRegex.exec(html)) !== null) {
                try {
                    const ld = JSON.parse(jsonLdMatch[1]);
                    if (!image && (ld.image || ld.thumbnailUrl)) {
                        const img = ld.image || ld.thumbnailUrl;
                        image = Array.isArray(img) ? img[0] : (typeof img === 'string' ? img : img?.url || null);
                    }
                    if ((title === "Instagram" || title === "No title found") && ld.name) {
                        title = decodeEntities(ld.name);
                    }
                    if (description === "No description found" && (ld.description || ld.caption)) {
                        description = decodeEntities(ld.description || ld.caption);
                    }
                } catch { /* malformed JSON-LD, skip */ }
            }
        }

        // Platform-specific fallbacks when meta tags fail
        const isInstagram = url.includes("instagram.com");
        const isTikTok = url.includes("tiktok.com");

        if (isInstagram && (!image || title === "Instagram" || title === "No title found")) {
            try {
                // Instagram's /embed/ endpoint is publicly accessible and contains post images
                const shortcodeMatch = url.match(/\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
                if (shortcodeMatch) {
                    const embedUrl = `https://www.instagram.com/p/${shortcodeMatch[2]}/embed/`;
                    const embedRes = await fetch(embedUrl, {
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                        },
                        signal: AbortSignal.timeout(8000),
                    });
                    if (embedRes.ok) {
                        const embedHtml = await embedRes.text();
                        // Extract image from embed page
                        if (!image) {
                            const imgMatch = embedHtml.match(/class="[^"]*EmbeddedMediaImage[^"]*"[^>]*src="([^"]+)"/);
                            if (imgMatch) image = decodeEntities(imgMatch[1]);
                            // Fallback: any instagram CDN image in the embed
                            if (!image) {
                                const cdnMatch = embedHtml.match(/src="(https:\/\/[^"]*(?:cdninstagram|fbcdn)[^"]*\.jpg[^"]*)"/);
                                if (cdnMatch) image = decodeEntities(cdnMatch[1]);
                            }
                        }
                        // Extract caption/title from embed
                        if (title === "Instagram" || title === "No title found") {
                            const captionMatch = embedHtml.match(/class="[^"]*Caption[^"]*"[^>]*>[\s\S]*?<[^>]*>([^<]{5,80})/);
                            if (captionMatch) {
                                title = decodeEntities(captionMatch[1].trim());
                            }
                        }
                    }
                }
            } catch { /* embed fetch failed */ }
        }

        if (isTikTok && (!image || title === "No title found")) {
            try {
                const oEmbedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
                const oEmbedRes = await fetch(oEmbedUrl, { signal: AbortSignal.timeout(5000) });
                if (oEmbedRes.ok) {
                    const oEmbed = await oEmbedRes.json();
                    if (!image && oEmbed.thumbnail_url) image = oEmbed.thumbnail_url;
                    if (title === "No title found" && oEmbed.title) title = oEmbed.title;
                    if (description === "No description found" && oEmbed.title) description = oEmbed.title;
                }
            } catch { /* TikTok oEmbed failed */ }
        }

        // Extract author/creator from URL or meta tags
        let author: string | null = null;
        if (isInstagram) {
            // Extract username from Instagram URL patterns like /username/ or /p/shortcode/
            const igUserMatch = url.match(/instagram\.com\/(?!p\/|reel\/|reels\/|tv\/|stories\/)([A-Za-z0-9._]+)/);
            if (igUserMatch) author = igUserMatch[1];
        }
        if (isTikTok) {
            const tkUserMatch = url.match(/tiktok\.com\/@([A-Za-z0-9._]+)/);
            if (tkUserMatch) author = tkUserMatch[1];
        }
        // Fallback: try og:site_name or article:author
        if (!author) {
            author = getMetaTag(html, "article:author") || getMetaTag(html, "og:site_name") || null;
        }

        const data = {
            title,
            description,
            image,
            video,
            author,
            url: url,
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error("Extraction error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
