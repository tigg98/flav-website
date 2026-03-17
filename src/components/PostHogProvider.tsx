"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initPostHog, trackPageView } from "@/lib/analytics/posthog";

function PostHogPageTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    React.useEffect(() => {
        initPostHog();
    }, []);

    React.useEffect(() => {
        if (pathname) {
            const url = searchParams?.toString()
                ? `${pathname}?${searchParams.toString()}`
                : pathname;
            trackPageView(url);
        }
    }, [pathname, searchParams]);

    return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <React.Suspense fallback={null}>
                <PostHogPageTracker />
            </React.Suspense>
            {children}
        </>
    );
}
