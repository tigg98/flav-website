"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface AppStoreButtonsProps {
    className?: string;
    iosUrl?: string;
    androidUrl?: string;
    utmSource?: string;
    size?: "sm" | "md" | "lg";
}

export function AppStoreButtons({
    className,
    iosUrl = "#",
    androidUrl = "#",
    utmSource = "website",
    size = "md",
}: AppStoreButtonsProps) {
    const buildUrl = (baseUrl: string, platform: string) => {
        if (baseUrl === "#") return "#";
        const separator = baseUrl.includes("?") ? "&" : "?";
        return `${baseUrl}${separator}utm_source=${utmSource}&utm_medium=website&utm_campaign=${platform}_download`;
    };

    const sizeClasses = {
        sm: "h-10",
        md: "h-12",
        lg: "h-14",
    };

    return (
        <div className={cn("flex flex-wrap gap-3", className)}>
            <Link
                href={buildUrl(iosUrl, "ios")}
                className={cn(
                    "inline-flex items-center gap-2 bg-[var(--color-neutral-900)] text-white rounded-xl px-5 transition-all duration-200 hover:bg-[var(--color-neutral-800)] hover:scale-[1.02]",
                    sizeClasses[size]
                )}
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-tight opacity-80">Download on the</span>
                    <span className="text-sm font-semibold leading-tight">App Store</span>
                </div>
            </Link>

            <Link
                href={buildUrl(androidUrl, "android")}
                className={cn(
                    "inline-flex items-center gap-2 bg-[var(--color-neutral-900)] text-white rounded-xl px-5 transition-all duration-200 hover:bg-[var(--color-neutral-800)] hover:scale-[1.02]",
                    sizeClasses[size]
                )}
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.635z" />
                </svg>
                <div className="flex flex-col items-start">
                    <span className="text-[10px] leading-tight opacity-80">Get it on</span>
                    <span className="text-sm font-semibold leading-tight">Google Play</span>
                </div>
            </Link>
        </div>
    );
}
