import type { Metadata } from "next";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";

interface Props {
    params: Promise<{ code: string }>;
}

export const metadata: Metadata = {
    title: "Join Flav — Your Friend Invited You",
    description:
        "Your friend invited you to Flav — the cooking app that turns TikTok recipes into actual meals. Join the waitlist and get early access.",
    openGraph: {
        title: "You've Been Invited to Flav",
        description:
            "Import any recipe from TikTok in 10 seconds. Cook hands-free with AI. Join the waitlist!",
    },
};

export default async function JoinReferralPage({ params }: Props) {
    const { code } = await params;

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center py-20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-primary-100)]/40 via-background to-background dark:from-[var(--color-primary-900)]/20" />

            <div className="container-main relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Content */}
                    <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-100)] dark:bg-[#E07A5F]/10 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] text-sm font-medium mb-8 border border-[var(--color-primary-200)] dark:border-[#E07A5F]/20">
                            🎉 Your friend invited you
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
                            Import Any Recipe{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">
                                in 10 Seconds.
                            </span>
                        </h1>

                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
                            Flav turns TikTok and Instagram cooking videos into step-by-step
                            recipes with AI — then helps you actually cook them. Your friend
                            is already on the waitlist.
                        </p>

                        <div className="mb-8">
                            <WaitlistForm referralCode={code} />
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">
                                    ✓
                                </div>
                                <span>Free forever</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">
                                    ✓
                                </div>
                                <span>No credit card required</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Phone Mockup */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative z-20">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-[#E07A5F]/20 to-[#e8967d]/20 rounded-[3rem] blur-2xl" />
                            <IPhoneMockup
                                src="/screenshots/home-feed-v5.webp"
                                alt="Flav home feed showing recipe discovery"
                                size="lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
