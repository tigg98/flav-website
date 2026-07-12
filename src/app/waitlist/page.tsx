import type { Metadata } from "next";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";

export const metadata: Metadata = {
    title: "Android Waitlist",
    description:
        "Flav is live on iOS. Android is next — join the waitlist to be first in line when Flav lands on Google Play.",
    alternates: {
        canonical: "https://flav.app/waitlist",
    },
    openGraph: {
        title: "Flav for Android — Join the Waitlist",
        description:
            "Flav is live on iOS. Join the Android waitlist to be first in line on Google Play.",
    },
};

export default function AndroidWaitlistPage() {
    return (
        <section className="relative overflow-hidden min-h-[85vh] flex items-center py-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-primary-100)]/40 via-background to-background dark:from-[var(--color-primary-900)]/20" />

            <div className="container-main relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-100)] dark:bg-[#E07A5F]/10 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] text-sm font-medium mb-8 border border-[var(--color-primary-200)] dark:border-[#E07A5F]/20">
                            Android is next
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
                            Flav for Android is{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">
                                on the way.
                            </span>
                        </h1>

                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
                            Save any TikTok or Instagram recipe in seconds, then cook it hands-free.
                            Join the waitlist and we&apos;ll email you the moment Flav lands on
                            Google Play.
                        </p>

                        <div className="mb-10">
                            <WaitlistForm />
                        </div>

                        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
                            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">
                                On iPhone? Flav is live now — no waiting.
                            </p>
                            <div className="flex justify-center lg:justify-start">
                                <AppStoreButtons showAndroid={false} />
                            </div>
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative z-20">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-[#E07A5F]/20 to-[#e8967d]/20 rounded-[3rem] blur-2xl" />
                            <IPhoneMockup
                                src="/screenshots/home-feed-v5.webp"
                                alt="Flav home feed showing recipe discovery"
                                size="lg"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
