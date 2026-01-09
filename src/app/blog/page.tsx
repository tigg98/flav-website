import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Blog",
    description: "Tips, recipes, and insights for food creators. Learn how to grow your audience and monetize your cooking content.",
};

const blogPosts = [
    {
        slug: "best-high-protein-meal-prep-recipes-2026",
        title: "Best High-Protein Meal Prep Recipes for 2026",
        excerpt: "Looking to build muscle or just stay full longer? Here are our top picks for high-protein meal prep that tastes amazing and saves you time.",
        category: "Recipes",
        date: "January 5, 2026",
        readTime: "5 min read",
        image: "🥗",
    },
    {
        slug: "how-to-monetize-recipes-food-creator",
        title: "How to Monetize Your Recipes as a Food Creator",
        excerpt: "From tips to premium content to brand deals, here's everything you need to know about turning your cooking passion into income.",
        category: "Creator Tips",
        date: "January 2, 2026",
        readTime: "8 min read",
        image: "💰",
    },
    {
        slug: "grow-as-food-creator-2026",
        title: "10 Tips to Grow as a Food Creator in 2026",
        excerpt: "The creator economy is booming. Here are proven strategies to stand out, build your audience, and create content that converts.",
        category: "Growth",
        date: "December 28, 2025",
        readTime: "7 min read",
        image: "🚀",
    },
];

export default function BlogPage() {
    return (
        <>
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
                                    <p className="text-xs text-[var(--color-neutral-500)]">{post.date}</p>
                                </div>
                            </article>
                        ))}
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
