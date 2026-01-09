import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://flav.app';

    const staticPages = [
        '',
        '/creators',
        '/verified',
        '/advertise',
        '/support',
        '/privacy',
        '/terms',
        '/blog',
    ];

    return staticPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === '/creators' || route === '/verified' ? 0.9 : 0.7,
    }));
}
