import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles } from "lucide-react";

const APP_STORE_URL = "https://apps.apple.com/us/app/flav/id6759994122";

const consumerTiers = [
    {
        name: "Free",
        price: "$0",
        period: "",
        tagline: "Everything you need to start cooking.",
        features: [
            "10 AI recipe imports every month",
            "Unlimited cookbook & collections",
            "Hands-free Cook Mode with timers",
            "Grocery lists from any recipe",
        ],
        cta: "Download Free",
        href: APP_STORE_URL,
        highlight: false,
        footnote: "Free to download. No credit card.",
    },
    {
        name: "Flav+",
        price: "$4.99",
        period: "/month",
        tagline: "For people who cook from their feed every week.",
        features: [
            "Unlimited AI recipe imports",
            "AI meal planning for your week",
            "Photo-scan handwritten recipe cards",
            "Everything in Free",
        ],
        cta: "Get Flav+",
        href: APP_STORE_URL,
        highlight: true,
        footnote: "or $29.99 a year. Buy and manage it in the app.",
    },
    {
        name: "Lifetime",
        price: "$59.99",
        period: " once",
        tagline: "Every Flav+ feature. One payment, forever.",
        features: [
            "All Flav+ features, forever",
            "Every future Flav+ feature included",
            "No subscription, no renewals",
                    ],
        cta: "Get Lifetime",
        href: APP_STORE_URL,
        highlight: false,
        footnote: "One-time purchase in the app.",
    },
];

interface FlavPlusPricingProps {
    /** Renders the section heading block. Turn off when the parent page provides its own. */
    showHeading?: boolean;
}

export function FlavPlusPricing({ showHeading = true }: FlavPlusPricingProps) {
    return (
        <section className="section bg-[var(--background-subtle)]" id="pricing">
            <div className="container-main">
                {showHeading && (
                    <div className="text-center mb-12 md:mb-16">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-500)] mb-4">
                            Pricing
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                            Free to cook. <span className="gradient-text">Flav+ to cook more.</span>
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            Start free with 10 AI imports a month. Upgrade when your saved-videos
                            folder outgrows it.
                        </p>
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {consumerTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative flex flex-col p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
                                tier.highlight
                                    ? "border-[var(--color-primary-500)] bg-[var(--background-elevated)] shadow-xl md:-translate-y-2"
                                    : "border-neutral-200 dark:border-neutral-800 bg-[var(--background-elevated)] hover:shadow-lg"
                            }`}
                        >
                            {tier.highlight && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-full shadow-md">
                                    <Sparkles className="w-3 h-3" />
                                    Most popular
                                </span>
                            )}

                            <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                                <span className="text-neutral-500 dark:text-neutral-400">{tier.period}</span>
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">{tier.tagline}</p>

                            <ul className="space-y-3 mb-8 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm">
                                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-secondary-500)]" />
                                        <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button variant={tier.highlight ? "primary" : "outline"} className="w-full" asChild>
                                <Link href={tier.href}>{tier.cta}</Link>
                            </Button>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center mt-3">
                                {tier.footnote}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
