import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";
import { recipeCategories, getAllCategorySlugs, getRecipeCategory } from "../recipe-categories";

interface Props {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const data = getRecipeCategory(category);
    if (!data) return {};

    return {
        title: `${data.title} — Discover & Cook on Flav`,
        description: data.description,
        keywords: data.keywords,
        openGraph: {
            title: `${data.title} | Flav`,
            description: data.description,
        },
        alternates: {
            canonical: `https://flav.app/recipes/${data.slug}`,
        },
    };
}

export default async function RecipeCategoryPage({ params }: Props) {
    const { category } = await params;
    const data = getRecipeCategory(category);

    if (!data) notFound();

    const relatedCategories = data.relatedCategories
        .map((slug) => {
            const cat = recipeCategories[slug];
            return cat ? { slug, title: cat.title } : null;
        })
        .filter(Boolean) as { slug: string; title: string }[];

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden py-20 md:py-28">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--background)] to-[var(--color-secondary-50)] opacity-50" />

                <div className="container-main relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                            {/* Breadcrumbs */}
                            <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6 justify-center lg:justify-start">
                                <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/recipes" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Recipes</Link>
                                <span>/</span>
                                <span className="text-neutral-900 dark:text-white font-medium">{data.title}</span>
                            </nav>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                                {data.title.split(" ").slice(0, -1).join(" ")}{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">
                                    {data.title.split(" ").slice(-1)[0]}
                                </span>
                            </h1>

                            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                                {data.heroDescription}
                            </p>

                            <div className="flex justify-center lg:justify-start">
                                <AppStoreButtons utmSource="recipes_category" />
                            </div>

                            <p className="text-sm text-neutral-500 mt-4 text-center lg:text-left">
                                Free to download on iOS. Import recipes from TikTok &amp; Instagram.
                            </p>
                        </div>

                        <div className="flex justify-center lg:justify-end">
                            <IPhoneMockup
                                src="/screenshots/home-feed-v5.webp"
                                alt={`Flav app showing ${data.title.toLowerCase()}`}
                                size="md"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* How Flav helps */}
            <section className="py-16 md:py-24 bg-white dark:bg-neutral-950 border-y border-neutral-100 dark:border-neutral-800">
                <div className="container-main">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            How Flav makes {data.title.toLowerCase()} easy
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900">
                            <div className="text-3xl mb-4">📲</div>
                            <h3 className="font-bold mb-2">Import Instantly</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Paste any TikTok or Instagram link. Flav's AI extracts the full recipe in under 10 seconds.
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900">
                            <div className="text-3xl mb-4">🤖</div>
                            <h3 className="font-bold mb-2">AI Nutrition Info</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Get automatic calorie counts, macro breakdowns, and nutrition facts for every recipe.
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900">
                            <div className="text-3xl mb-4">👨‍🍳</div>
                            <h3 className="font-bold mb-2">Cook Step-by-Step</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Follow hands-free cooking mode with built-in timers, ingredient checklists, and AI tips.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            {data.faq.length > 0 && (
                <section className="py-16 md:py-24">
                    <div className="container-main max-w-3xl">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            {data.title} FAQ
                        </h2>
                        <FAQAccordion items={data.faq} />
                    </div>
                </section>
            )}

            {/* Related Categories */}
            {relatedCategories.length > 0 && (
                <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="container-main">
                        <h2 className="text-2xl font-bold text-center mb-8">
                            Explore more recipe collections
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {relatedCategories.map((cat) => (
                                <Link
                                    key={cat.slug}
                                    href={`/recipes/${cat.slug}`}
                                    className="px-5 py-2.5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-medium hover:border-[var(--color-primary-300)] hover:text-[var(--color-primary-600)] transition-colors"
                                >
                                    {cat.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Bottom CTA */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-[#E07A5F] to-[#e8967d] text-white">
                <div className="container-main text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to cook {data.title.toLowerCase().replace(" recipes", "")}?
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                        Download Flav to import, save, and cook {data.title.toLowerCase()} — free on iOS.
                    </p>
                    <div className="flex justify-center max-w-md mx-auto">
                        <AppStoreButtons size="lg" utmSource="recipes_category" />
                    </div>
                </div>
            </section>

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": data.title,
                        "description": data.description,
                        "url": `https://flav.app/recipes/${data.slug}`,
                        "isPartOf": {
                            "@type": "WebSite",
                            "name": "Flav",
                            "url": "https://flav.app"
                        },
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flav.app" },
                                { "@type": "ListItem", "position": 2, "name": "Recipes", "item": "https://flav.app/recipes" },
                                { "@type": "ListItem", "position": 3, "name": data.title, "item": `https://flav.app/recipes/${data.slug}` },
                            ]
                        },
                        ...(data.faq.length > 0 ? {
                            "mainEntity": data.faq.map((item) => ({
                                "@type": "Question",
                                "name": item.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": item.answer,
                                },
                            })),
                        } : {}),
                    }),
                }}
            />
        </>
    );
}
