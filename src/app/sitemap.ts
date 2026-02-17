import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://flav.app';

    const pages: {
        route: string;
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        priority: number;
    }[] = [
        { route: '', changeFrequency: 'weekly', priority: 1.0 },
        { route: '/creators', changeFrequency: 'weekly', priority: 0.9 },
        { route: '/verified', changeFrequency: 'weekly', priority: 0.9 },
        { route: '/advertise', changeFrequency: 'monthly', priority: 0.8 },
        { route: '/blog', changeFrequency: 'weekly', priority: 0.8 },
        { route: '/support', changeFrequency: 'monthly', priority: 0.7 },
        { route: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
        { route: '/terms', changeFrequency: 'yearly', priority: 0.3 },
    ];

    return pages.map((page) => ({
        url: `${baseUrl}${page.route}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
    }));
}
