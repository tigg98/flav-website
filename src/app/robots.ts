import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/ads/', '/api/'],
            },
        ],
        sitemap: 'https://flav.app/sitemap.xml',
    };
}
