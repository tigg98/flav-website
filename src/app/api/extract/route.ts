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

        // Fetch the page content
        const response = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (compatible; FlavBot/1.0; +https://flav.app)",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to fetch URL" },
                { status: response.status }
            );
        }

        const html = await response.text();

        // specific parsers for known problematic sites could go here
        // but for now we use a generic meta tag parser

        const getMetaTag = (html: string, name: string) => {
            const regex = new RegExp(
                `<meta\\s+(?:name|property)=["']${name}["']\\s+content=["']([^"']*)["']`,
                "i"
            );
            const match = html.match(regex);
            return match ? match[1] : null;
        };

        const getTitle = (html: string) => {
            const ogTitle = getMetaTag(html, "og:title");
            if (ogTitle) return ogTitle;

            const titleRegex = /<title>([^<]*)<\/title>/i;
            const match = html.match(titleRegex);
            return match ? match[1] : null;
        };

        const getDescription = (html: string) => {
            return (
                getMetaTag(html, "og:description") ||
                getMetaTag(html, "description")
            );
        };

        const getImage = (html: string) => {
            return (
                getMetaTag(html, "og:image") ||
                getMetaTag(html, "twitter:image")
            );
        };

        const data = {
            title: getTitle(html) || "No title found",
            description: getDescription(html) || "No description found",
            image: getImage(html) || null,
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
