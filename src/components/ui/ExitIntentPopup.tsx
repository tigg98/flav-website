"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";

export function ExitIntentPopup() {
    const [show, setShow] = React.useState(false);
    const hasShown = React.useRef(false);

    React.useEffect(() => {
        // Only trigger on desktop (mouseleave-based)
        if (window.innerWidth < 768) return;

        // Don't nag repeat visitors
        if (localStorage.getItem("flav_exit_intent_shown")) return;

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown.current) {
                hasShown.current = true;
                localStorage.setItem("flav_exit_intent_shown", "true");
                setShow(true);
            }
        };

        // Delay adding the listener so it doesn't trigger immediately
        const timeout = setTimeout(() => {
            document.addEventListener("mouseleave", handleMouseLeave);
        }, 5000);

        return () => {
            clearTimeout(timeout);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={() => setShow(false)}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-300">
                <button
                    onClick={() => setShow(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5 text-neutral-500" />
                </button>

                <div className="text-center mb-6">
                    <div className="text-4xl mb-4">👋</div>
                    <h2 className="text-2xl font-bold mb-2">
                        That recipe you saved last week?
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        Flav can find it, organize it, and walk you through cooking it.
                        Free on iOS — 10 AI recipe imports a month, no credit card.
                    </p>
                </div>

                <div className="flex justify-center">
                    <AppStoreButtons showAndroid={false} utmSource="exit_intent" />
                </div>

                <p className="text-center text-xs text-neutral-400 mt-4">
                    On Android?{" "}
                    <Link
                        href="/waitlist"
                        onClick={() => setShow(false)}
                        className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] font-medium underline underline-offset-2"
                    >
                        Join the waitlist
                    </Link>
                </p>

                <button
                    onClick={() => setShow(false)}
                    className="w-full text-center text-xs text-neutral-400 hover:text-neutral-600 mt-4 cursor-pointer"
                >
                    No thanks, I&apos;ll pass
                </button>
            </div>
        </div>
    );
}
