import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { blogPosts, formatPostDate } from "./blog-data";

export const metadata: Metadata = {
    title: "Blog",
    description: "Tips, recipes, and insights for food creators. Learn how to grow your audience and monetize your cooking content.",
    openGraph: {
        title: "The Flav Blog | Tips & Insights for Food Creators",
        description: "Tips, recipes, and insights for food creators. Learn how to grow your audience and monetize your cooking content.",
    },
    alternates: {
        canonical: "https://flav.app/blog",
    },
};

export default function BlogPage() {
    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "Blog",
                            "name": "The Flav Blog",
                            "description": "Tips, recipes, and insights for food creators building their audience and monetizing cooking content on Flav.",
                            "url": "https://flav.app/blog",
                            "publisher": {
                                "@type": "Organization",
                                "name": "Flav",
                                "url": "https://flav.app",
                                "logo": "https://flav.app/logo.png"
                            },
                            "blogPost": blogPosts.map((post) => ({
                                "@type": "BlogPosting",
                                "headline": post.title,
                                "description": post.excerpt,
                                "datePublished": post.date,
                                "dateModified": post.dateModified,
                                "url": `https://flav.app/blog/${post.slug}`,
                                "author": {
                                    "@type": "Organization",
                                    "name": "Flav Team"
                                }
                            }))
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flav.app" },
                                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://flav.app/blog" }
                            ]
                        }
                    ]),
                }}
            />

            {/* Hero */}
            <section className="section bg-[var(--background-subtle)]">
                <div className="container-main">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            The Flav Blog
                        </h1>
                        <p className="text-lg text-[var(--color-neutral-600)]">
                            Tips, recipes, and insights for food creators building their audience.
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="section">
                <div className="container-main">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <article
                                key={post.slug}
                                className="group rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="aspect-video bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] flex items-center justify-center">
                                    <span className="text-6xl">{post.image}</span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-semibold text-[var(--color-primary-600)] bg-[var(--color-primary-50)] px-2 py-1 rounded-full">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-[var(--color-neutral-500)]">{post.readTime}</span>
                                    </div>
                                    <h2 className="text-xl font-bold mb-2 group-hover:text-[var(--color-primary-600)] transition-colors">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h2>
                                    <p className="text-[var(--color-neutral-600)] text-sm mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <p className="text-xs text-[var(--color-neutral-500)]">
                                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore More */}
            <section className="py-12">
                <div className="container-main">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-xl font-bold mb-4 text-center">Explore More on Flav</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/recipes/high-protein" className="px-4 py-2 rounded-full bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] text-sm font-medium hover:border-[var(--color-primary-300)] transition-colors">High Protein Recipes</Link>
                            <Link href="/recipes/meal-prep" className="px-4 py-2 rounded-full bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] text-sm font-medium hover:border-[var(--color-primary-300)] transition-colors">Meal Prep Recipes</Link>
                            <Link href="/recipes/keto" className="px-4 py-2 rounded-full bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] text-sm font-medium hover:border-[var(--color-primary-300)] transition-colors">Keto Recipes</Link>
                            <Link href="/creators" className="px-4 py-2 rounded-full bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] text-sm font-medium hover:border-[var(--color-primary-300)] transition-colors">For Creators</Link>
                            <Link href="/compare/allrecipes" className="px-4 py-2 rounded-full bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] text-sm font-medium hover:border-[var(--color-primary-300)] transition-colors">Flav vs AllRecipes</Link>
                            <Link href="/compare/yummly" className="px-4 py-2 rounded-full bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] text-sm font-medium hover:border-[var(--color-primary-300)] transition-colors">Flav vs Yummly</Link>
                            <Link href="/recipes" className="px-4 py-2 rounded-full bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] text-sm font-medium hover:border-[var(--color-primary-300)] transition-colors">All Recipe Collections &rarr;</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="section bg-[var(--background-subtle)]">
                <div className="container-main">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Get creator tips in your inbox
                        </h2>
                        <p className="text-[var(--color-neutral-600)] mb-6">
                            Weekly insights on growing as a food creator. No spam, unsubscribe anytime.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                            />
                            <Button type="submit">Subscribe</Button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
