import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FlavPlusPricing } from "@/components/marketing/FlavPlusPricing";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { SHOW_FLAV_PLUS } from "@/lib/flags";

export const metadata: Metadata = {
    title: "Pricing",
    description:
        "Flav is free to download on iOS with 10 AI recipe imports every month. Upgrade to Flav+ for unlimited imports, AI meal planning, and photo-scanned recipe cards.",
    alternates: {
        canonical: "https://flav.app/pricing",
    },
    openGraph: {
        title: "Pricing | Flav",
        description:
            "Free to download. 10 AI recipe imports a month. Flav+ unlocks unlimited imports and AI meal planning.",
    },
    // Keep the page out of the index until the flag flips on.
    robots: SHOW_FLAV_PLUS ? undefined : { index: false, follow: false },
};

export default function PricingPage() {
    if (!SHOW_FLAV_PLUS) notFound();

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden pt-20 pb-4 md:pt-28 md:pb-8">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-primary-100)]/40 via-background to-background dark:from-[var(--color-primary-900)]/20" />
                <div className="container-main relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Simple pricing for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">
                            serious cooks
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Every plan includes your full cookbook, grocery lists, and hands-free Cook
                        Mode. Flav+ removes the import limit and plans your week.
                    </p>
                </div>
            </section>

            <FlavPlusPricing showHeading={false} />

            {/* Bottom CTA */}
            <section className="section">
                <div className="container-main text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Start free today</h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
                        Download Flav on the App Store and import your first recipe in under a
                        minute.
                    </p>
                    <div className="flex justify-center">
                        <AppStoreButtons size="lg" />
                    </div>
                </div>
            </section>
        </>
    );
}
