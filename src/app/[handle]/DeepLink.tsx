"use client";

import * as React from "react";

interface DeepLinkProps {
    /** flav:// custom-scheme URL that opens the app if installed. */
    deepLink: string;
    /** Where to send the visitor when the app isn't installed (App Store URL with UTMs). */
    fallbackUrl: string;
    className?: string;
    children: React.ReactNode;
}

/**
 * Anchor that attempts to open the Flav app via its custom scheme and
 * falls back to the App Store if the app doesn't take over the page.
 * Renders a real <a href> to the fallback so crawlers and no-JS visitors
 * always get a valid destination.
 */
export function DeepLink({ deepLink, fallbackUrl, className, children }: DeepLinkProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        let appOpened = false;
        const onVisibilityChange = () => {
            if (document.hidden) appOpened = true;
        };
        document.addEventListener("visibilitychange", onVisibilityChange);

        window.location.href = deepLink;

        window.setTimeout(() => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
            if (!appOpened && !document.hidden) {
                window.location.href = fallbackUrl;
            }
        }, 1400);
    };

    return (
        <a href={fallbackUrl} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
