import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { competitors, flavFeatures, type FeatureGrid } from "../competitor-data";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Check, X, ArrowRight } from "lucide-react";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";

interface Props {
    params: Promise<{ competitor: string }>;
}

const FEATURE_ROWS: { key: keyof FeatureGrid; label: string }[] = [
    { key: "videoImport", label: "Video recipe import" },
    { key: "cookMode", label: "Hands-free Cook Mode" },
    { key: "aiAssistant", label: "AI cooking assistant" },
    { key: "mealPlanning", label: "Meal planning & grocery lists" },
    { key: "creatorMonetization", label: "Creator monetization" },
    { key: "price", label: "Price" },
];

function FeatureCell({ value }: { value: boolean | string }) {
    if (value === true) {
        return (
            <span className="inline-flex items-center gap-1.5 font-medium text-green-600 dark:text-green-400">
                <Check className="w-4 h-4 shrink-0" aria-hidden />
                Yes
            </span>
        );
    }
    if (value === false) {
        return (
            <span className="inline-flex items-center gap-1.5 text-neutral-400">
                <X className="w-4 h-4 shrink-0" aria-hidden />
                No
            </span>
        );
    }
    return <span>{value}</span>;
}

export async function generateStaticParams() {
    return Object.keys(competitors).map((competitor) => ({ competitor }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { competitor } = await params;
    const data = competitors[competitor];
    if (!data) return {};

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
        },
        alternates: {
            canonical: `https://flav.app/compare/${data.id}`,
        },
    };
}

export default async function ComparePage({ params }: Props) {
    const { competitor } = await params;
    const data = competitors[competitor];

    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pb-20">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E07A5F]/5 to-[#e8967d]/5" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] mb-8 hover:underline">
                        ← Back to Flav
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Flav vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-800 dark:from-neutral-300 dark:to-neutral-500">{data.name}</span>
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                        {data.vsText}
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800 max-w-xl mx-auto">
                        <h3 className="font-bold text-lg mb-2">Ready to make the switch?</h3>
                        <div className="flex justify-center">
                            <AppStoreButtons utmSource="compare" />
                        </div>
                        <p className="text-sm text-neutral-500 mt-2">Free on iOS. Android coming soon.</p>
                    </div>
                </div>
            </section>

            {/* Feature-by-feature table */}
            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                        Flav vs {data.name} at a glance
                    </h2>
                    <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                        <table className="w-full text-sm text-left border-collapse">
                            <caption className="sr-only">
                                Feature comparison between Flav and {data.name}
                            </caption>
                            <thead>
                                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                                    <th scope="col" className="px-4 py-3.5 font-semibold text-neutral-500 dark:text-neutral-400 w-1/4">
                                        Feature
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 font-bold text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)]">
                                        Flav
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 font-semibold">
                                        {data.name}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {FEATURE_ROWS.map((row, i) => (
                                    <tr
                                        key={row.key}
                                        className={
                                            i < FEATURE_ROWS.length - 1
                                                ? "border-b border-neutral-100 dark:border-neutral-800/60"
                                                : ""
                                        }
                                    >
                                        <th scope="row" className="px-4 py-3.5 font-medium align-top">
                                            {row.label}
                                        </th>
                                        <td className="px-4 py-3.5 align-top text-neutral-700 dark:text-neutral-300 bg-[var(--color-primary-50)]/40 dark:bg-[#E07A5F]/5">
                                            <FeatureCell value={flavFeatures[row.key]} />
                                        </td>
                                        <td className="px-4 py-3.5 align-top text-neutral-600 dark:text-neutral-400">
                                            <FeatureCell value={data.features[row.key]} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Comparison Grid */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Competitor Card */}
                        <div className="bg-white dark:bg-neutral-900 rounded-[2.5rem] p-8 border border-neutral-200 dark:border-neutral-800 opacity-80">
                            <h2 className="text-2xl font-bold mb-6 text-neutral-500">{data.name}</h2>
                            <div className="mb-6">
                                <h4 className="font-semibold text-sm uppercase tracking-wider text-green-600 mb-3">Pros</h4>
                                <ul className="space-y-3">
                                    {data.pros.map((pro, i) => (
                                        <li key={i} className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
                                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                            <span>{pro}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm uppercase tracking-wider text-red-500 mb-3">Cons</h4>
                                <ul className="space-y-3">
                                    {data.cons.map((con, i) => (
                                        <li key={i} className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
                                            <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                            <span>{con}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Flav Card */}
                        <div className="bg-gradient-to-br from-[#E07A5F] to-[#e8967d] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden transform md:-translate-y-4">
                            {/* Decorative background */}
                            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                            <h2 className="text-3xl font-bold mb-2">Flav</h2>
                            <p className="text-[var(--color-primary-50)] mb-6 font-medium">The modern alternative</p>

                            <ul className="space-y-5">
                                {data.flavAdvantages.map((adv, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="font-medium text-lg leading-snug">{adv}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10">
                                <IPhoneMockup src={data.heroImage} alt="Flav app screenshot" size="sm" className="mx-auto shadow-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO FAQ Section */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                    <FAQAccordion items={data.faq} />
                </div>
            </section>

            {/* Cross-links */}
            <section className="py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <h3 className="font-bold text-lg mb-4 text-center">More Comparisons</h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {Object.entries(competitors)
                            .filter(([slug]) => slug !== competitor)
                            .slice(0, 6)
                            .map(([slug, comp]) => (
                                <Link
                                    key={slug}
                                    href={`/compare/${slug}`}
                                    className="px-4 py-2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm font-medium hover:border-[var(--color-primary-300)] transition-colors"
                                >
                                    Flav vs {comp.name}
                                </Link>
                            ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                        <Link href="/recipes" className="text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] hover:underline">Browse Recipes</Link>
                        <span className="text-neutral-300">|</span>
                        <Link href="/creators" className="text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] hover:underline">For Creators</Link>
                        <span className="text-neutral-300">|</span>
                        <Link href="/blog" className="text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] hover:underline">Blog</Link>
                    </div>
                </div>
            </section>

            {/* Structured Data for Generative AI / SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": data.title,
                            "description": data.description,
                            "url": `https://flav.app/compare/${data.id}`,
                            "breadcrumb": {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flav.app" },
                                    { "@type": "ListItem", "position": 2, "name": `Flav vs ${data.name}`, "item": `https://flav.app/compare/${data.id}` }
                                ]
                            },
                            "mainEntity": {
                                "@type": "ItemList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "item": {
                                            "@type": "SoftwareApplication",
                                            "name": "Flav",
                                            "applicationCategory": "LifestyleApplication"
                                        }
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "item": {
                                            "@type": "SoftwareApplication",
                                            "name": data.name,
                                            "applicationCategory": "LifestyleApplication"
                                        }
                                    }
                                ]
                            }
                        },
                        ...(data.faq.length > 0 ? [{
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": data.faq.map((item) => ({
                                "@type": "Question",
                                "name": item.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": item.answer,
                                },
                            })),
                        }] : []),
                    ]),
                }}
            />
        </div>
    );
}
