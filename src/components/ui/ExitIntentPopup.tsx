"use client";

import * as React from "react";
import { X } from "lucide-react";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export function ExitIntentPopup() {
    const [show, setShow] = React.useState(false);
    const hasShown = React.useRef(false);

    React.useEffect(() => {
        // Only trigger on desktop (mouseleave-based)
        if (window.innerWidth < 768) return;

        // Don't show if already on waitlist (check localStorage)
        if (localStorage.getItem("flav_waitlist_joined")) return;

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown.current) {
                hasShown.current = true;
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
                        Wait — don&apos;t miss out
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        Join the waitlist and be first to import recipes from TikTok with AI. Free forever, no credit card required.
                    </p>
                </div>

                <WaitlistForm
                    onSuccess={() => {
                        localStorage.setItem("flav_waitlist_joined", "true");
                    }}
                />

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
