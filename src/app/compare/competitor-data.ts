export interface CompetitorData {
    id: string;
    name: string;
    website: string;
    title: string;
    description: string;
    heroImage: string;
    vsText: string;
    pros: string[];
    cons: string[];
    flavAdvantages: string[];
    faq: { question: string; answer: string }[];
}

export const competitors: Record<string, CompetitorData> = {
    "mob-kitchen": {
        id: "mob-kitchen",
        name: "MOB Kitchen",
        website: "mob.co.uk",
        title: "Flav vs MOB Kitchen: Which Cooking App is Better in 2026?",
        description:
            "Compare Flav and MOB Kitchen. See why food lovers are switching to Flav for interactive cooking modes, AI meal planning, and an incredible creator community.",
        heroImage: "/screenshots/home-feed-v5.png", // Can be replaced later with specific vs images
        vsText: "MOB Kitchen is great for static utilitarian meal planning, but Flav brings recipes to life with swipeable video, AI integration, and a creator-centric ecosystem.",
        pros: ["Good for budget meals", "Simple meal planning structure", "Strong UK presence"],
        cons: ["Static recipe formats", "No AI assistance", "Limited creator monetization"],
        flavAdvantages: [
            "Interactive Step-by-Step Cooking Mode with Timers",
            "Instant Recipe Import from any TikTok or Instagram URL",
            "Flav AI: Your personal sous-chef for substitutions and questions",
            "Robust Creator Economy paying out 90-97%",
        ],
        faq: [
            {
                question: "Is Flav better than MOB Kitchen?",
                answer: "Flav offers a more interactive experience compared to MOB Kitchen by converting recipe videos into step-by-step guides with integrated timers and an AI assistant.",
            },
            {
                question: "Can I import MOB Kitchen recipes into Flav?",
                answer: "Yes, you can use Flav's AI recipe importer to instantly convert any public recipe from MOB Kitchen into an interactive Flav cooking guide.",
            },
        ],
    },
    "tasty": {
        id: "tasty",
        name: "Tasty",
        website: "tasty.co",
        title: "Flav vs Tasty: The Ultimate Recipe App Comparison",
        description:
            "Choosing between Flav and Tasty? Discover why modern home cooks prefer Flav's AI assistant and creator monetization over traditional Tasty videos.",
        heroImage: "/screenshots/home-feed-v5.png",
        vsText: "While Tasty revolutionized top-down cooking videos, Flav is the next evolution: turning every video into a fully interactive, cookable utility powered by AI.",
        pros: ["Massive recipe library", "Entertaining short videos", "High brand recognition"],
        cons: ["Videos lack integrated step-by-step cooking modes", "Ads interrupt the cooking experience", "Not friendly for independent creators to monetize"],
        flavAdvantages: [
            "No invasive ads during the cooking experience",
            "AI Sous-Chef to answer questions while cooking",
            "Support independent creators directly",
            "Auto-generate grocery lists from any video",
        ],
        faq: [
            {
                question: "What is the difference between Flav and Tasty?",
                answer: "Tasty is primarily a media publisher of food videos, whereas Flav is an interactive platform that lets you cook step-by-step from videos and allows independent creators to monetize their content.",
            },
            {
                question: "Does Flav have videos like Tasty?",
                answer: "Yes, Flav features a swipeable feed of short-form recipe videos similar to Tasty, but with the added ability to instantly convert those videos into structured cooking guides.",
            },
        ],
    },
};
