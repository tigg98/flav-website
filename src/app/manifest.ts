import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Flav — Save Any TikTok Recipe in 10 Seconds",
        short_name: "Flav",
        description:
            "Flav turns TikTok, Instagram, and web recipe videos into an AI-organized cookbook with hands-free Cook Mode, meal planning, and grocery lists.",
        start_url: "/",
        display: "browser",
        background_color: "#ffffff",
        theme_color: "#E07A5F",
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
