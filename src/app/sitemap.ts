import type { MetadataRoute } from 'next';
import { blogPosts } from './blog/blog-data';
import { competitors } from './compare/competitor-data';
import { getAllCategorySlugs } from './recipes/recipe-categories';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://flav.app';

    const staticPages: {
        route: string;
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        priority: number;
    }[] = [
        { route: '', changeFrequency: 'weekly', priority: 1.0 },
        { route: '/creators', changeFrequency: 'weekly', priority: 0.9 },
        { route: '/verified', changeFrequency: 'weekly', priority: 0.9 },
        { route: '/advertise', changeFrequency: 'monthly', priority: 0.8 },
        { route: '/blog', changeFrequency: 'weekly', priority: 0.8 },
        { route: '/recipes', changeFrequency: 'weekly', priority: 0.8 },
        { route: '/support', changeFrequency: 'monthly', priority: 0.7 },
        { route: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
        { route: '/terms', changeFrequency: 'yearly', priority: 0.3 },
    ];

    const blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const comparePages = Object.keys(competitors).map((slug) => ({
        url: `${baseUrl}/compare/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const recipePages = getAllCategorySlugs().map((slug) => ({
        url: `${baseUrl}/recipes/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        ...staticPages.map((page) => ({
            url: `${baseUrl}${page.route}`,
            lastModified: new Date(),
            changeFrequency: page.changeFrequency,
            priority: page.priority,
        })),
        ...blogPages,
        ...comparePages,
        ...recipePages,
    ];
}
