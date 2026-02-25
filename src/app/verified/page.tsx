import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Badge } from "@/components/ui/Badge";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";
import {
    DollarSign,
    BadgeCheck,
    BarChart3,
    TrendingUp,
    Rocket,
    Headphones,
    type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Verified & Pro",
    description:
        "Stand out, grow faster, and earn more with Flav Verified and Pro. Get a verified badge, lower fees, and advanced analytics.",
    openGraph: {
        title: "Verified & Pro | Flav",
        description:
            "Stand out, grow faster, and earn more with Flav Verified and Pro tiers.",
    },
};

const tiers = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "For casual users who want to discover and save recipes.",
        features: [
            { label: "Unlimited video uploads", included: true },
            { label: "Basic analytics", included: true },
            { label: "Community features", included: true },
            { label: "Tips & monetization", included: false },
            { label: "Premium recipe sales", included: false },
            { label: "Verified badge", included: false },
            { label: "Advanced analytics", included: false },
            { label: "Priority support", included: false },
        ],
        cta: "Get Started Free",
        href: "#download",
        highlight: false,
    },
    {
        name: "Verified",
        price: "$7.99",
        period: "/month",
        annualPrice: "$69.99/year",
        description: "For creators ready to start earning.",
        features: [
            { label: "Unlimited video uploads", included: true },
            { label: "Basic analytics", included: true },
            { label: "Community features", included: true },
            { label: "Tips (90% payout)", included: true },
            { label: "Premium recipe sales (90%)", included: true },
            { label: "Verified badge", included: true },
            { label: "Advanced analytics", included: true },
            { label: "Priority support", included: false },
        ],
        cta: "Subscribe on Web",
        href: "/account/billing",
        highlight: true,
    },
    {
        name: "Pro",
        price: "$19.99",
        period: "/month",
        annualPrice: "$179.99/year",
        description: "For full-time creators and businesses.",
        features: [
            { label: "Unlimited video uploads", included: true },
            { label: "Basic analytics", included: true },
            { label: "Community features", included: true },
            { label: "Tips (97% payout)", included: true },
            { label: "Premium recipe sales (97%)", included: true },
            { label: "Pro badge", included: true },
            { label: "Advanced analytics", included: true },
            { label: "Priority support", included: true },
        ],
        cta: "Subscribe on Web",
        href: "/account/billing",
        highlight: false,
    },
];

const faqItems = [
    {
        question: "What does 'Verified' mean on Flav?",
        answer:
            "Flav Verified is a creator subscription at $7.99/month that unlocks full monetization capabilities, a visible verified badge, advanced audience analytics, and priority placement in Flav's recommendation algorithm. Verified creators retain 90% of all earnings — nearly double the industry standard payout rate of approximately 50% on competing platforms.",
    },
    {
        question: "Can I earn money on the Free tier?",
        answer:
            "No. Monetization features — including viewer tips, premium locked recipes, and brand partnership eligibility — are exclusively available to Verified ($7.99/month) and Pro ($19.99/month) subscribers. Free users can upload unlimited content and build an audience, but must upgrade to a paid tier to start earning revenue.",
    },
    {
        question: "What's the difference between Verified and Pro?",
        answer:
            "Both tiers unlock monetization, but Pro ($19.99/month) offers a 97% payout rate compared to Verified's 90%, plus priority support with faster response times, early access to new features, and a distinct Pro badge. The 7% payout difference means Pro creators earning $1,000/month keep an additional $70 compared to Verified. Pro is designed for full-time creators and food businesses.",
    },
    {
        question: "Is there annual pricing?",
        answer:
            "Yes. Annual plans save approximately 27% compared to monthly billing: Verified is $69.99/year (equivalent to $5.83/month, saving $25.89 annually) and Pro is $179.99/year (equivalent to $15.00/month, saving $59.89 annually). Annual pricing is available in the app settings.",
    },
    {
        question: "Can I cancel anytime?",
        answer:
            "Yes. Both Verified and Pro subscriptions can be cancelled at any time with no cancellation fees. Your benefits remain active until the end of your current billing period. After expiration, monetization features are disabled, but your content and audience data remain intact.",
    },
    {
        question: "How do payouts work?",
        answer:
            "Creator earnings from tips and premium recipe sales are paid out weekly via direct deposit or PayPal. Verified creators receive 90% of gross revenue and Pro creators receive 97%. All transactions are tracked in real-time through the Flav earnings dashboard, which displays net earnings, pending payouts, and historical fee savings.",
    },
];

export default function VerifiedPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden min-h-[80vh] flex items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--background)] to-purple-50 opacity-50" />

                <div className="container-main relative z-10 py-12 md:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Text Content */}
                        <div className="text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                                <Badge variant="verified" />
                                <Badge variant="pro" />
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Stand out. Grow faster.{" "}
                                <span className="gradient-text">Earn more.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-[var(--color-neutral-600)] mb-8 max-w-xl">
                                Upgrade to Flav Verified or Pro for a badge, lower fees, advanced analytics, and tools to accelerate your growth.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                                <Button size="lg" asChild>
                                    <Link href="#pricing">See Pricing</Link>
                                </Button>
                                <Button variant="outline" size="lg" asChild>
                                    <Link href="/creators">For Creators</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right: Phone with Verified Profile */}
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="relative">
                                <IPhoneMockup
                                    src="/screenshots/creator-profile-v3.png"
                                    alt="Verified creator profile"
                                    size="md"
                                    priority
                                    className="drop-shadow-2xl"
                                />
                                {/* Verified badge floating */}
                                <div className="absolute top-10 -right-4 w-16 h-16 bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-full flex items-center justify-center text-white text-2xl shadow-lg z-20 animate-scale-in">
                                    ✓
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Visual */}
            <section className="section bg-[var(--color-neutral-950)] text-white">
                <div className="container-main">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center">
                            <IPhoneMockup
                                src="/screenshots/earnings-v3.png"
                                alt="Earnings with Flav Pro"
                                size="md"
                                showBackdrop
                            />
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Keep more of what you earn
                            </h2>
                            <p className="text-lg text-[var(--color-neutral-300)] mb-6">
                                With Flav Pro, you keep 97% of your earnings—the highest payout rate in the industry. Free users need to upgrade to unlock monetization.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 rounded-xl bg-white/10">
                                    <p className="text-sm text-[var(--color-neutral-400)]">Free User</p>
                                    <p className="text-2xl font-bold text-[var(--color-neutral-500)]">—</p>
                                    <p className="text-xs text-[var(--color-neutral-500)]">no monetization</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)]/30 to-[var(--color-primary-600)]/30 border border-[var(--color-primary-500)]/50">
                                    <p className="text-sm text-[var(--color-primary-300)]">Pro Creator</p>
                                    <p className="text-2xl font-bold">97%</p>
                                    <p className="text-xs text-[var(--color-primary-400)]">payout rate</p>
                                </div>
                            </div>
                            <Link href="#pricing">
                                <Button>Compare All Tiers →</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="section">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What you get with{" "}
                            <span className="gradient-text">Verified & Pro</span>
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                            Premium tools and benefits designed to help serious creators succeed.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {([
                            { icon: DollarSign, title: "Unlock Monetization", description: "Start earning from tips and premium recipe sales—only available to Verified and Pro subscribers." },
                            { icon: BadgeCheck, title: "Verified Badge", description: "A visible checkmark that signals authenticity and trust to your audience." },
                            { icon: BarChart3, title: "Advanced Analytics", description: "Deep insights into audience demographics, best posting times, and revenue trends." },
                            { icon: TrendingUp, title: "Industry-Leading Payouts", description: "Keep 90% (Verified) or 97% (Pro) of your earnings—the best rates available." },
                            { icon: Rocket, title: "Discovery Boost", description: "Priority placement in recommendations to help you reach new audiences faster." },
                            { icon: Headphones, title: "Priority Support", description: "Pro creators get dedicated support with faster response times." },
                        ] as { icon: LucideIcon; title: string; description: string }[]).map((benefit, index) => {
                            const IconComponent = benefit.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-6 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] dark:from-[var(--color-primary-900)] dark:to-[var(--color-primary-800)] flex items-center justify-center mb-4">
                                        <IconComponent className="w-6 h-6 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)]" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-[var(--color-neutral-600)]">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section bg-[var(--background-subtle)]" id="pricing">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Choose your tier
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                            Start free and upgrade when you're ready to take your creator journey to the next level.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {tiers.map((tier, index) => (
                            <div
                                key={index}
                                className={`p-6 md:p-8 rounded-2xl border ${tier.highlight
                                    ? "border-[var(--color-primary-500)] bg-gradient-to-b from-[var(--color-primary-50)] to-[var(--background-elevated)] shadow-lg scale-105"
                                    : "border-[var(--color-neutral-200)] bg-[var(--background-elevated)]"
                                    }`}
                            >
                                {tier.highlight && (
                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-full mb-4">
                                        Most Popular
                                    </span>
                                )}
                                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-4xl font-bold">{tier.price}</span>
                                    <span className="text-[var(--color-neutral-500)]">{tier.period}</span>
                                </div>
                                <p className="text-[var(--color-neutral-600)] mb-6">{tier.description}</p>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            {feature.included ? (
                                                <svg className="w-5 h-5 text-[var(--color-secondary-500)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-[var(--color-neutral-300)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            <span className={feature.included ? "" : "text-[var(--color-neutral-400)]"}>
                                                {feature.label}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={tier.highlight ? "primary" : "outline"}
                                    className="w-full"
                                    asChild
                                >
                                    <Link href={tier.href}>{tier.cta}</Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section" id="faq">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Frequently asked questions
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <FAQAccordion items={faqItems} />
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
                            "name": "Flav Verified & Pro — Creator Subscription Plans",
                            "description": "Compare Flav's Free, Verified ($7.99/mo), and Pro ($19.99/mo) tiers. Unlock monetization, verified badges, advanced analytics, and industry-leading 90–97% payout rates.",
                            "url": "https://flav.app/verified",
                            "isPartOf": {
                                "@type": "WebSite",
                                "name": "Flav",
                                "url": "https://flav.app"
                            },
                            "breadcrumb": {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flav.app" },
                                    { "@type": "ListItem", "position": 2, "name": "Verified & Pro", "item": "https://flav.app/verified" }
                                ]
                            }
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "Product",
                            "name": "Flav Verified",
                            "description": "Creator subscription that unlocks monetization, verified badge, and advanced analytics with 90% payout rate.",
                            "brand": { "@type": "Brand", "name": "Flav" },
                            "offers": {
                                "@type": "Offer",
                                "price": "7.99",
                                "priceCurrency": "USD",
                                "priceSpecification": {
                                    "@type": "UnitPriceSpecification",
                                    "price": "7.99",
                                    "priceCurrency": "USD",
                                    "billingDuration": "P1M"
                                }
                            }
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "Product",
                            "name": "Flav Pro",
                            "description": "Premium creator subscription with 97% payout rate, priority support, and all Verified benefits for full-time food creators.",
                            "brand": { "@type": "Brand", "name": "Flav" },
                            "offers": {
                                "@type": "Offer",
                                "price": "19.99",
                                "priceCurrency": "USD",
                                "priceSpecification": {
                                    "@type": "UnitPriceSpecification",
                                    "price": "19.99",
                                    "priceCurrency": "USD",
                                    "billingDuration": "P1M"
                                }
                            }
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faqItems.map((item) => ({
                                "@type": "Question",
                                "name": item.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": item.answer
                                }
                            }))
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
                                Ready to level up?
                            </h2>
                            <p className="text-lg text-white/80 mb-8 max-w-xl">
                                Download Flav and upgrade to Verified or Pro in the app.
                            </p>
                            <AppStoreButtons size="lg" utmSource="verified_cta" />
                        </div>

                        <div className="hidden md:flex justify-center">
                            <IPhoneMockup
                                src="/screenshots/creator-profile-v3.png"
                                alt="Verified profile"
                                size="md"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
