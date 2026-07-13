import type { MetadataRoute } from 'next';
import { blogPosts } from './blog/blog-data';
import { competitors } from './compare/competitor-data';
import { getAllCategorySlugs } from './recipes/recipe-categories';
import { SHOW_FLAV_PLUS } from '@/lib/flags';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://flav.app';

    // Note: static/compare/recipe pages intentionally omit `lastModified` —
    // we don't track real modification dates for them, and stamping a fresh
    // date on every build fakes freshness to crawlers.
    const staticPages: {
        route: string;
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        priority: number;
    }[] = [
        { route: '', changeFrequency: 'weekly', priority: 1.0 },
        { route: '/creators', changeFrequency: 'weekly', priority: 0.9 },
        { route: '/verified', changeFrequency: 'weekly', priority: 0.9 },
        ...(SHOW_FLAV_PLUS
            ? [{ route: '/pricing', changeFrequency: 'weekly' as const, priority: 0.9 }]
            : []),
        { route: '/waitlist', changeFrequency: 'monthly', priority: 0.6 },
        { route: '/features/meal-plan', changeFrequency: 'monthly', priority: 0.7 },
        { route: '/advertise', changeFrequency: 'monthly', priority: 0.8 },
        { route: '/blog', changeFrequency: 'weekly', priority: 0.8 },
        { route: '/recipes', changeFrequency: 'weekly', priority: 0.8 },
        { route: '/support', changeFrequency: 'monthly', priority: 0.7 },
        { route: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
        { route: '/terms', changeFrequency: 'yearly', priority: 0.3 },
    ];

    const blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(`${post.dateModified}T00:00:00Z`),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const comparePages = Object.keys(competitors).map((slug) => ({
        url: `${baseUrl}/compare/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const recipePages = getAllCategorySlugs().map((slug) => ({
        url: `${baseUrl}/recipes/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        ...staticPages.map((page) => ({
            url: `${baseUrl}${page.route}`,
            changeFrequency: page.changeFrequency,
            priority: page.priority,
        })),
        ...blogPages,
        ...comparePages,
        ...recipePages,
    ];
}
