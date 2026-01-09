import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Badge } from "@/components/ui/Badge";

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
        description: "For casual creators just getting started.",
        features: [
            { label: "Unlimited video uploads", included: true },
            { label: "Basic analytics", included: true },
            { label: "Tips (85% payout)", included: true },
            { label: "Premium recipes (85% payout)", included: true },
            { label: "Verified badge", included: false },
            { label: "Reply highlighting", included: false },
            { label: "Advanced analytics", included: false },
            { label: "Priority support", included: false },
        ],
        cta: "Get Started Free",
        href: "#download",
        highlight: false,
    },
    {
        name: "Verified",
        price: "$9.99",
        period: "/month",
        description: "For serious creators ready to grow.",
        features: [
            { label: "Unlimited video uploads", included: true },
            { label: "Basic analytics", included: true },
            { label: "Tips (92% payout)", included: true },
            { label: "Premium recipes (92% payout)", included: true },
            { label: "Verified badge", included: true },
            { label: "Reply highlighting", included: true },
            { label: "Advanced analytics", included: true },
            { label: "Priority support", included: false },
        ],
        cta: "Get Verified",
        href: "#download",
        highlight: true,
    },
    {
        name: "Pro",
        price: "$29.99",
        period: "/month",
        description: "For professional creators and businesses.",
        features: [
            { label: "Unlimited video uploads", included: true },
            { label: "Basic analytics", included: true },
            { label: "Tips (95% payout)", included: true },
            { label: "Premium recipes (95% payout)", included: true },
            { label: "Pro badge", included: true },
            { label: "Reply highlighting", included: true },
            { label: "Advanced analytics", included: true },
            { label: "Priority support", included: true },
        ],
        cta: "Go Pro",
        href: "#download",
        highlight: false,
    },
];

const benefits = [
    {
        icon: "✓",
        title: "Verified Badge",
        description: "A visible checkmark that signals authenticity and trust to your audience and potential brand partners.",
    },
    {
        icon: "📊",
        title: "Advanced Analytics",
        description: "Deep insights into your audience demographics, best posting times, content performance, and revenue trends.",
    },
    {
        icon: "💬",
        title: "Highlighted Replies",
        description: "Your comments stand out in threads, making it easier to engage with your community and grow your following.",
    },
    {
        icon: "💰",
        title: "Lower Platform Fees",
        description: "Keep more of what you earn. Verified creators get 92% payout, Pro creators get 95% (vs 85% for free).",
    },
    {
        icon: "🚀",
        title: "Discovery Boost",
        description: "Verified and Pro content may receive subtle prioritization in recommendations, helping you reach new audiences.",
    },
    {
        icon: "🎯",
        title: "Priority Support",
        description: "Pro creators get dedicated support with faster response times and direct access to the creator success team.",
    },
];

const faqItems = [
    {
        question: "What does 'Verified' mean on Flav?",
        answer:
            "Verified is a paid subscription that gives you a verified badge, lower fees on earnings, highlighted replies, and advanced analytics. It's designed for creators who are serious about growing on Flav.",
    },
    {
        question: "Who is eligible for Verified?",
        answer:
            "Any creator with at least 10 published recipes can subscribe to Verified. There's no follower minimum—it's about commitment, not clout.",
    },
    {
        question: "What's the difference between Verified and Pro?",
        answer:
            "Pro includes everything in Verified plus even lower platform fees (95% vs 92%), priority support, and early access to new creator features. Pro is ideal for full-time creators and food businesses.",
    },
    {
        question: "Can I cancel anytime?",
        answer:
            "Yes, you can cancel your Verified or Pro subscription at any time. You'll retain your benefits until the end of your current billing period.",
    },
    {
        question: "Do Verified creators get more views?",
        answer:
            "Verified and Pro content may receive a subtle boost in recommendations, but quality always comes first. The algorithm primarily rewards content that people save and engage with.",
    },
    {
        question: "How do payouts work?",
        answer:
            "Tips and premium recipe sales are paid out monthly via direct deposit or PayPal. Free creators receive 85% of earnings, Verified creators receive 92%, and Pro creators receive 95%.",
    },
];

export default function VerifiedPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--background)] to-purple-50 opacity-50" />

                <div className="container-main relative z-10 py-16 md:py-24">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Badge variant="verified" />
                            <Badge variant="pro" />
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Stand out. Grow faster.{" "}
                            <span className="gradient-text">Earn more.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-[var(--color-neutral-600)] mb-8 max-w-2xl mx-auto">
                            Upgrade to Flav Verified or Pro for a badge, lower fees, advanced analytics, and tools to accelerate your growth.
                        </p>

                        <Button size="lg" asChild>
                            <Link href="#pricing">See Pricing</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="section bg-[var(--background-subtle)]">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What you get with Verified & Pro
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                            Premium tools and benefits designed to help serious creators succeed.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)]"
                            >
                                <span className="text-3xl mb-4 block">{benefit.icon}</span>
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-[var(--color-neutral-600)]">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section" id="pricing">
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
            <section className="section bg-[var(--background-subtle)]" id="faq">
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

            {/* CTA */}
            <section className="section bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)]" id="download">
                <div className="container-main text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to level up?
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                        Download Flav and upgrade to Verified or Pro in the app.
                    </p>
                    <AppStoreButtons size="lg" utmSource="verified_cta" className="justify-center" />
                </div>
            </section>
        </>
    );
}
