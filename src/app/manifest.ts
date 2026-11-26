import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Flav: TikTok Recipe Saver",
        short_name: "Flav",
        description:
            "Flav turns TikTok cooking videos and recipe pages into an AI-organized cookbook with hands-free Cook Mode, meal planning, and grocery lists.",
        start_url: "/",
        display: "browser",
        background_color: "#ffffff",
        theme_color: "#F5F5F7",
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
