import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "For Creators",
    description:
        "Turn your recipes into real income. Join Flav and monetize your cooking content with tips, premium recipes, and brand partnerships.",
    openGraph: {
        title: "For Creators | Flav",
        description:
            "Turn your recipes into real income. Monetize your cooking content with tips, premium recipes, and brand partnerships.",
    },
};

const monetizationMethods = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "Tips from Fans",
        description:
            "Your followers can send you tips directly on your videos. Each tip goes straight to your wallet with minimal platform fees.",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        title: "Premium Recipes",
        description:
            "Lock your best recipes behind a paywall. Fans pay a one-time fee to access exclusive content you've created.",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: "Brand Partnerships",
        description:
            "Get discovered by brands looking for authentic food creators. Collaborate on sponsored content that fits your style.",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        title: "Verified Benefits",
        description:
            "Upgrade to Verified for a badge, lower fees, highlighted replies, and advanced analytics to grow faster.",
    },
];

const steps = [
    {
        number: "1",
        title: "Download & Create Your Profile",
        description: "Get the app, sign up, and set up your creator profile. Add a bio, profile photo, and links to your other socials.",
    },
    {
        number: "2",
        title: "Upload Your First Recipe",
        description: "Record a short video of your recipe in action. Add ingredients, cooking steps, and tags so people can find it.",
    },
    {
        number: "3",
        title: "Enable Monetization",
        description: "Once you hit 100 followers, unlock tips and premium recipes. Connect your payment method and start earning.",
    },
    {
        number: "4",
        title: "Go Verified (Optional)",
        description: "Ready to go pro? Subscribe to Verified for lower fees, a badge, and access to advanced creator tools.",
    },
];

const stats = [
    { value: "50K+", label: "Active Creators" },
    { value: "$1M+", label: "Paid to Creators" },
    { value: "10M+", label: "Recipes Saved" },
    { value: "4.8★", label: "App Store Rating" },
];

export default function CreatorsPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--background)] to-[var(--color-secondary-50)] opacity-50" />

                <div className="container-main relative z-10 py-16 md:py-24">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge variant="verified" className="mb-6" />

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Turn your recipes into{" "}
                            <span className="gradient-text">real income</span>
                        </h1>

                        <p className="text-lg md:text-xl text-[var(--color-neutral-600)] mb-8 max-w-2xl mx-auto">
                            Join thousands of food creators who are building their audience and earning money on Flav.
                            Your passion for cooking can become your career.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <AppStoreButtons size="lg" utmSource="creators_hero" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 border-y border-[var(--color-neutral-200)] bg-[var(--background-subtle)]">
                <div className="container-main">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                                <p className="text-sm text-[var(--color-neutral-500)] mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Monetization Methods */}
            <section className="section">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Multiple ways to earn
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                            Flav gives you real tools to turn your cooking content into sustainable income.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {monetizationMethods.map((method, index) => (
                            <FeatureCard
                                key={index}
                                icon={method.icon}
                                title={method.title}
                                description={method.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Analytics Preview */}
            <section className="section bg-[var(--color-neutral-950)] text-white">
                <div className="container-main">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Analytics that actually help you grow
                            </h2>
                            <p className="text-lg text-[var(--color-neutral-300)] mb-6">
                                Understand what's working and what's not. Track saves, views, engagement, and revenue in real time.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Real-time save and view tracking",
                                    "Audience demographics & preferences",
                                    "Revenue breakdowns by content",
                                    "Best posting times for your audience",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-[var(--color-primary-500)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[var(--color-neutral-200)]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-full max-w-sm p-6 rounded-2xl bg-[var(--color-neutral-800)] border border-[var(--color-neutral-700)]">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-sm text-[var(--color-neutral-400)]">Last 30 days</span>
                                    <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-secondary-500)]/20 text-[var(--color-secondary-400)]">+24%</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--color-neutral-400)]">Views</span>
                                        <span className="font-semibold">124,892</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--color-neutral-400)]">Saves</span>
                                        <span className="font-semibold">8,432</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--color-neutral-400)]">Tips Received</span>
                                        <span className="font-semibold text-[var(--color-secondary-400)]">$847</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--color-neutral-400)]">Premium Sales</span>
                                        <span className="font-semibold text-[var(--color-secondary-400)]">$1,234</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Getting Started Steps */}
            <section className="section">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            How to get started
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                            From download to earning, here's your path to becoming a Flav creator.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-6 mb-8 last:mb-0">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] text-white flex items-center justify-center font-bold">
                                    {step.number}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-[var(--color-neutral-600)]">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)]" id="download">
                <div className="container-main text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Start your creator journey today
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                        Download Flav and join thousands of creators earning from their recipes.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <AppStoreButtons size="lg" utmSource="creators_cta" />
                    </div>
                    <p className="mt-6 text-white/60 text-sm">
                        Already a creator?{" "}
                        <Link href="/verified" className="underline hover:text-white">
                            Upgrade to Verified →
                        </Link>
                    </p>
                </div>
            </section>
        </>
    );
}
