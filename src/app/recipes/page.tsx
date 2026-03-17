import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { recipeCategories } from "./recipe-categories";

export const metadata: Metadata = {
    title: "Recipes — Browse by Category",
    description:
        "Browse recipe collections on Flav by category — high protein, keto, meal prep, quick meals, and more. Import any recipe from TikTok or Instagram and cook with AI.",
    openGraph: {
        title: "Recipes | Flav",
        description: "Browse recipe collections by category. Import from TikTok, cook with AI.",
    },
};

const categoryGroups = [
    {
        label: "By Diet",
        slugs: ["high-protein", "keto", "healthy", "vegan", "vegetarian", "gluten-free", "fitness-meals"],
    },
    {
        label: "By Cuisine",
        slugs: ["italian", "mexican", "asian", "mediterranean"],
    },
    {
        label: "By Time",
        slugs: ["under-15-minutes", "under-30-minutes"],
    },
    {
        label: "By Style",
        slugs: ["meal-prep", "one-pot", "budget-meals", "air-fryer", "slow-cooker", "breakfast", "desserts"],
    },
];

export default function RecipesIndexPage() {
    return (
        <>
            {/* Hero */}
            <section className="py-20 md:py-28">
                <div className="container-main text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        Browse{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">
                            Recipe Collections
                        </span>
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10">
                        Explore recipes by diet, cuisine, cooking time, or style. Import any recipe from TikTok or Instagram and cook step-by-step with Flav.
                    </p>
                </div>
            </section>

            {/* Category Groups */}
            <section className="pb-20 md:pb-28">
                <div className="container-main">
                    <div className="space-y-12">
                        {categoryGroups.map((group) => (
                            <div key={group.label}>
                                <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                                    {group.label}
                                </h2>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {group.slugs.map((slug) => {
                                        const cat = recipeCategories[slug];
                                        if (!cat) return null;
                                        return (
                                            <Link
                                                key={slug}
                                                href={`/recipes/${slug}`}
                                                className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-[var(--color-primary-300)] dark:hover:border-[#E07A5F]/30 hover:shadow-lg transition-all"
                                            >
                                                <h3 className="font-bold mb-1 group-hover:text-[var(--color-primary-600)] dark:group-hover:text-[var(--color-primary-400)] transition-colors">
                                                    {cat.title}
                                                </h3>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                                                    {cat.heroDescription.split(".")[0]}.
                                                </p>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-[#E07A5F] to-[#e8967d] text-white">
                <div className="container-main text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Import any recipe in 10 seconds
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                        Join the waitlist for Flav — the cooking app that turns TikTok videos into real meals.
                    </p>
                    <div className="flex justify-center max-w-md mx-auto">
                        <WaitlistForm />
                    </div>
                </div>
            </section>
        </>
    );
}
