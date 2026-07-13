import type { MetadataRoute } from 'next';

const DISALLOWED_PATHS = [
    '/ads/',
    '/api/',
    '/account/',
    '/creators/dashboard',
    '/creators/earnings',
    '/creators/settings',
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: DISALLOWED_PATHS,
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: DISALLOWED_PATHS,
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
                disallow: DISALLOWED_PATHS,
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: DISALLOWED_PATHS,
            },
            {
                userAgent: 'ClaudeBot',
                allow: '/',
                disallow: DISALLOWED_PATHS,
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: DISALLOWED_PATHS,
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: DISALLOWED_PATHS,
            },
        ],
        sitemap: 'https://flav.app/sitemap.xml',
    };
}
