import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve blocking (non-streamed) metadata to crawlers so notFound()/redirects
  // thrown in generateMetadata return real HTTP status codes (404 for unknown
  // /@handle pages) instead of a streamed 200 + noindex meta tag.
  htmlLimitedBots:
    /Googlebot|Google-InspectionTool|Bingbot|DuckDuckBot|Applebot|Baiduspider|YandexBot|GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|Bytespider|Amazonbot|cohere-ai|Mediapartners-Google|facebookexternalhit|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|Pinterestbot|redditbot/i,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 't3.gstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // Legacy creator-profile path → canonical flav.app/@handle bio-link page.
      // The negative lookahead keeps the creator-portal routes (dashboard,
      // earnings, settings) untouched. A route-level permanentRedirect in
      // src/app/creators/[handle]/page.tsx backstops anything this misses.
      {
        source: '/creators/:handle((?!dashboard$|earnings$|settings$)[^/]+)',
        destination: '/@:handle',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
