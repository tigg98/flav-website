import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CreatorWaitlistForm } from "@/components/ui/CreatorWaitlistForm";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { Badge } from "@/components/ui/Badge";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";
import {
    DollarSign,
    Lock,
    Handshake,
    BadgeCheck,
    Smartphone,
    User,
    ChefHat,
    Wallet,
    type LucideIcon,
} from "lucide-react";

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

const monetizationMethods: { icon: LucideIcon; title: string; description: string }[] = [
    {
        icon: DollarSign,
        title: "Tips from Fans",
        description: "Receive tips directly on your videos. Minimal platform fees, maximum earnings.",
    },
    {
        icon: Lock,
        title: "Premium Recipes",
        description: "Lock your best recipes behind a paywall. Fans pay to access your exclusive content.",
    },
    {
        icon: Handshake,
        title: "Brand Partnerships",
        description: "Get discovered by brands for sponsored content that fits your authentic style.",
    },
    {
        icon: BadgeCheck,
        title: "Verified Benefits",
        description: "Lower fees, verified badge, and advanced analytics with Flav Pro.",
    },
];



export default function CreatorsPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden min-h-screen flex items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--background)] to-[var(--color-secondary-50)] opacity-50" />

                <div className="container-main relative z-10 py-12 md:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Text Content */}
                        <div className="text-center lg:text-left">
                            <Badge variant="verified" className="mb-6" />

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Turn your recipes into{" "}
                                <span className="gradient-text">real income</span>
                            </h1>

                            <p className="text-lg md:text-xl text-[var(--color-neutral-600)] mb-8 max-w-xl">
                                Join thousands of food creators building their audience and earning money on Flav.
                                Your passion for cooking can become your career.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8">
                                <CreatorWaitlistForm />
                            </div>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-[var(--color-neutral-500)]">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">✓</span>
                                    <span>Keep 93% of earnings</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">✓</span>
                                    <span>Tips + Premium recipes</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Phone Mockups */}
                        <div className="relative flex justify-center lg:justify-end">
                            {/* Main phone - Creator Profile */}
                            <div className="relative z-20">
                                <IPhoneMockup
                                    src="/screenshots/creator-profile-v3.webp"
                                    alt="Flav creator profile page showing follower count, recipe videos, and verified badge"
                                    size="md"
                                    priority
                                />
                            </div>

                            {/* Background phone - Earnings */}
                            <div className="absolute -left-12 top-12 z-10 opacity-60 hidden sm:block transform scale-90">
                                <IPhoneMockup
                                    src="/screenshots/earnings-v3.webp"
                                    alt="Flav creator earnings dashboard with real-time revenue and payout tracking"
                                    size="md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Multiple Ways to Earn */}
            <section className="section">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Multiple ways to{" "}
                            <span className="gradient-text">earn</span>
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                            Flav gives you real tools to turn your cooking content into sustainable income.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {monetizationMethods.map((method, index) => {
                            const IconComponent = method.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-6 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] flex items-center justify-center mb-4">
                                        <IconComponent className="w-6 h-6 text-[var(--color-primary-600)]" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                                    <p className="text-sm text-[var(--color-neutral-600)]">{method.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Earnings Dashboard Showcase */}
            <section className="section bg-[var(--color-neutral-950)] text-white">
                <div className="container-main">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Track your earnings in real time
                            </h2>
                            <p className="text-lg text-[var(--color-neutral-300)] mb-6">
                                See exactly how much you're making. Net earnings, pending payouts, and fee savings—all in one beautiful dashboard.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Real-time revenue tracking",
                                    "53% savings with Flav Pro",
                                    "Weekly automatic payouts",
                                    "Transaction history",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-[var(--color-primary-500)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[var(--color-neutral-200)]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/verified">
                                <Button>Learn about Flav Pro →</Button>
                            </Link>
                        </div>

                        <div className="order-1 md:order-2 flex justify-center">
                            <IPhoneMockup
                                src="/screenshots/earnings-v3.webp"
                                alt="Flav earnings dashboard displaying net earnings, weekly payouts, and fee savings"
                                size="md"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Recipe Creation */}
            <section className="section">
                <div className="container-main">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center">
                            <IPhoneMockup
                                src="/screenshots/create-recipe-v2.webp"
                                alt="Flav create recipe screen with AI-powered ingredient and step extraction"
                                size="md"
                            />
                        </div>

                        <div>
                            <Badge variant="beta" className="mb-4" />
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Create recipes effortlessly
                            </h2>
                            <p className="text-lg text-[var(--color-neutral-600)] mb-6">
                                Upload from scratch or import from Instagram and TikTok. Our AI helps you structure your recipe in seconds.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Import from social media",
                                    "AI-powered recipe generation",
                                    "Step-by-step editor",
                                    "Add timers and tips",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-[var(--color-secondary-100)] text-[var(--color-secondary-600)] flex items-center justify-center text-sm">✓</span>
                                        <span className="text-[var(--color-neutral-700)]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <WaitlistForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Get Started */}
            <section className="section bg-[var(--background-subtle)]">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            How to get started
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                            From download to earning, here's your path to becoming a Flav creator.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {([
                            { step: "01", title: "Download", description: "Get Flav free on iOS or Android", icon: Smartphone },
                            { step: "02", title: "Create Profile", description: "Set up your creator bio and photo", icon: User },
                            { step: "03", title: "Upload Recipes", description: "Share your first recipe video", icon: ChefHat },
                            { step: "04", title: "Start Earning", description: "Enable tips once you hit 100 followers", icon: Wallet },
                        ] as { step: string; title: string; description: string; icon: LucideIcon }[]).map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-4">
                                        <IconComponent className="w-8 h-8 text-[var(--color-primary-500)]" />
                                    </div>
                                    <div className="text-sm font-bold text-[var(--color-primary-500)] mb-2">{item.step}</div>
                                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                    <p className="text-sm text-[var(--color-neutral-600)]">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": "Flav for Creators — Monetize Your Cooking Content",
                            "description": "Turn your recipes into real income. Flav creators retain 90–97% of earnings through tips, premium recipes, and brand partnerships.",
                            "url": "https://flav.app/creators",
                            "isPartOf": {
                                "@type": "WebSite",
                                "name": "Flav",
                                "url": "https://flav.app"
                            },
                            "breadcrumb": {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flav.app" },
                                    { "@type": "ListItem", "position": 2, "name": "For Creators", "item": "https://flav.app/creators" }
                                ]
                            }
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "How do food creators earn money on Flav?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Flav creators earn through three revenue channels: direct viewer tips, premium locked recipes, and brand partnership deals. Creators retain 90% of earnings on the Verified plan ($7.99/month) and 97% on the Pro plan ($19.99/month) — the highest payout rates in the food creator economy."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "What tools does Flav provide for food creators?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Flav provides AI-powered recipe generation that converts video content into structured recipes in under 10 seconds, a step-by-step recipe editor with timers and tips, real-time earnings dashboard, advanced audience analytics, and the ability to import recipes from Instagram and TikTok."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How do I get started as a creator on Flav?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Getting started is simple: download Flav for free on iOS or Android, create your creator profile, upload your first recipe video, and enable monetization once you reach 100 followers. Upgrade to Verified ($7.99/month) or Pro ($19.99/month) to unlock tips, premium recipes, and brand partnerships."
                                    }
                                }
                            ]
                        }
                    ]),
                }}
            />

            {/* CTA */}
            <section className="section bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)]" id="download">
                <div className="container-main">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Start your creator journey today
                            </h2>
                            <p className="text-lg text-white/80 mb-8 max-w-xl">
                                Join the waitlist and be first to access creator tools when we launch.
                            </p>
                            <CreatorWaitlistForm />
                            <p className="mt-6 text-white/60 text-sm">
                                Want to learn about plans?{" "}
                                <Link href="/verified" className="underline hover:text-white">
                                    View Verified & Pro →
                                </Link>
                            </p>
                        </div>

                        <div className="hidden md:flex justify-center">
                            <div className="scale-90 origin-center">
                                <IPhoneMockup
                                    src="/screenshots/creator-profile-v3.webp"
                                    alt="Flav verified creator profile with recipe library and follower engagement"
                                    size="md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
