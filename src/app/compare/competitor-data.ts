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
        heroImage: "/screenshots/home-feed-v5.webp",
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
        heroImage: "/screenshots/home-feed-v5.webp",
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
    "allrecipes": {
        id: "allrecipes",
        name: "AllRecipes",
        website: "allrecipes.com",
        title: "Flav vs AllRecipes: Modern Cooking App Comparison 2026",
        description: "Compare Flav and AllRecipes. See why home cooks are switching from text-based recipes to Flav's AI-powered video cooking experience.",
        heroImage: "/screenshots/recipe-detail-v2.webp",
        vsText: "AllRecipes is a legacy recipe database with text-heavy pages. Flav is built for the video-first generation — swipeable recipes, AI cooking assistance, and hands-free cooking mode.",
        pros: ["Huge recipe database", "User reviews and ratings", "Community-submitted recipes"],
        cons: ["Heavy ads on every page", "No video content", "Dated interface and experience"],
        flavAdvantages: [
            "Video-first recipe discovery — swipe through cooking content",
            "AI-powered hands-free cooking mode with timers",
            "Import any recipe from social media in seconds",
            "Clean, ad-free cooking experience",
        ],
        faq: [
            {
                question: "Is Flav better than AllRecipes?",
                answer: "Flav offers a modern, video-first cooking experience with AI assistance and interactive cooking mode, while AllRecipes is a traditional text-based recipe database. Flav is designed for how people actually discover recipes today — through video.",
            },
            {
                question: "Can I find the same recipes on Flav as AllRecipes?",
                answer: "Flav's recipe library is growing through its creator community. You can also import any recipe from AllRecipes or any other website using Flav's AI recipe importer.",
            },
        ],
    },
    "yummly": {
        id: "yummly",
        name: "Yummly",
        website: "yummly.com",
        title: "Flav vs Yummly: Which Recipe App Should You Use in 2026?",
        description: "Compare Flav and Yummly. Discover why food lovers prefer Flav's video recipes and AI cooking assistant over Yummly's recommendation engine.",
        heroImage: "/screenshots/home-feed-v5.webp",
        vsText: "Yummly aggregates recipes from around the web. Flav creates a complete cooking experience — from video discovery to hands-free cooking with AI guidance.",
        pros: ["Smart recipe recommendations", "Integration with smart appliances", "Grocery delivery partnerships"],
        cons: ["No original video content", "Recipes sourced from other sites", "Limited creator features"],
        flavAdvantages: [
            "Original short-form video recipes from real creators",
            "AI sous-chef answers questions while you cook",
            "Step-by-step cooking mode with built-in timers",
            "Creator monetization with 90-97% payouts",
        ],
        faq: [
            {
                question: "How does Flav compare to Yummly?",
                answer: "Yummly is a recipe aggregator that pulls content from other websites. Flav is a creator-driven platform with original video recipes, an AI cooking assistant, and interactive cooking mode — built for the short-form video generation.",
            },
            {
                question: "Does Flav have recipe recommendations like Yummly?",
                answer: "Yes, Flav's personalized For You feed uses AI to recommend recipes based on your preferences, dietary needs, and cooking history — all through engaging short-form video.",
            },
        ],
    },
    "paprika": {
        id: "paprika",
        name: "Paprika",
        website: "paprikaapp.com",
        title: "Flav vs Paprika: Recipe Manager Comparison 2026",
        description: "Compare Flav and Paprika Recipe Manager. See why home cooks prefer Flav's AI import, video recipes, and social features over Paprika's manual approach.",
        heroImage: "/screenshots/import-recipe-v3.webp",
        vsText: "Paprika is a solid recipe manager for manual organization. Flav takes it further with AI-powered import, video recipes, a social community, and hands-free cooking mode.",
        pros: ["Good recipe organization", "Meal planning features", "Grocery list generation"],
        cons: ["No social features", "Manual recipe entry", "No video content or community"],
        flavAdvantages: [
            "AI imports recipes from any URL in under 10 seconds",
            "Discover new recipes through video — not just organize old ones",
            "Social features: follow creators, share recipes, build community",
            "Hands-free cooking mode with voice and timers",
        ],
        faq: [
            {
                question: "Is Flav a good alternative to Paprika?",
                answer: "Yes. Flav offers everything Paprika does (recipe saving, meal planning, grocery lists) plus AI-powered recipe import, video-based discovery, social features, and an interactive cooking mode. Flav is free to use.",
            },
            {
                question: "Can I import my Paprika recipes into Flav?",
                answer: "You can use Flav's AI importer to re-import recipes from their original URLs. Direct Paprika export import is on our roadmap.",
            },
        ],
    },
    "mealime": {
        id: "mealime",
        name: "Mealime",
        website: "mealime.com",
        title: "Flav vs Mealime: Meal Planning App Comparison 2026",
        description: "Compare Flav and Mealime for meal planning. Discover why Flav's AI meal planner and video recipes offer a better cooking experience.",
        heroImage: "/screenshots/meal-plan-calendar.webp",
        vsText: "Mealime focuses on simple meal planning with grocery lists. Flav combines AI meal planning with video recipes, cooking mode, and a creator community — the complete cooking experience.",
        pros: ["Simple meal planning workflow", "Auto-generated grocery lists", "Good for beginners"],
        cons: ["Limited recipe variety", "No video content", "No social or creator features"],
        flavAdvantages: [
            "AI generates personalized meal plans based on your macros and preferences",
            "Thousands of video recipes from real food creators",
            "Interactive cooking mode guides you through every step",
            "Import recipes from TikTok, Instagram, or any website",
        ],
        faq: [
            {
                question: "Is Flav better than Mealime for meal planning?",
                answer: "Flav's AI meal planner goes beyond Mealime by considering your macros, dietary preferences, and existing saved recipes. Plus, every recipe includes video content and an interactive cooking mode — not just a list of ingredients.",
            },
            {
                question: "Does Flav generate grocery lists like Mealime?",
                answer: "Yes, Flav automatically generates grocery lists from your meal plan or any individual recipe, organized by category for easy shopping.",
            },
        ],
    },
    "epicurious": {
        id: "epicurious",
        name: "Epicurious",
        website: "epicurious.com",
        title: "Flav vs Epicurious: Recipe App Comparison 2026",
        description: "Compare Flav and Epicurious. See why modern home cooks prefer Flav's video-first approach and AI cooking assistant.",
        heroImage: "/screenshots/home-feed-v5.webp",
        vsText: "Epicurious offers editorial recipes from Bon Appetit and Gourmet. Flav democratizes food content — anyone can be a creator, and AI makes every recipe interactive and cookable.",
        pros: ["High-quality editorial recipes", "Professional food photography", "Trusted brand"],
        cons: ["Paywall for premium content", "No user-generated content", "No interactive cooking features"],
        flavAdvantages: [
            "Free access to thousands of video recipes",
            "AI cooking assistant answers questions in real-time",
            "Interactive cooking mode with step-by-step guidance",
            "Creator-driven content means endless variety and freshness",
        ],
        faq: [
            {
                question: "How does Flav compare to Epicurious?",
                answer: "Epicurious offers curated editorial recipes behind a paywall. Flav is free and creator-driven, with video recipes, AI cooking assistance, and interactive cooking mode. Flav is built for how people discover and cook recipes today.",
            },
            {
                question: "Is Flav free unlike Epicurious?",
                answer: "Yes, Flav is completely free to use. All recipes, the AI cooking assistant, and cooking mode are available on the free tier. Optional paid plans unlock creator monetization features.",
            },
        ],
    },
    "nytcooking": {
        id: "nytcooking",
        name: "NYT Cooking",
        website: "cooking.nytimes.com",
        title: "Flav vs NYT Cooking: Which Recipe App is Better in 2026?",
        description: "Compare Flav and NYT Cooking. Discover why home cooks prefer Flav's free video recipes and AI features over NYT Cooking's subscription model.",
        heroImage: "/screenshots/recipe-detail-v2.webp",
        vsText: "NYT Cooking offers premium editorial recipes at $5/month. Flav is free, video-first, and AI-powered — with a growing creator community producing fresh content daily.",
        pros: ["Expertly tested recipes", "Beautiful photography", "Strong editorial voice"],
        cons: ["Requires $5/month subscription", "No video content", "No interactive cooking features"],
        flavAdvantages: [
            "Completely free — no subscription required",
            "Video recipes you can watch and follow along with",
            "AI cooking mode with timers, checklists, and voice guidance",
            "Fresh creator content added daily — not just editorial recipes",
        ],
        faq: [
            {
                question: "Is Flav a free alternative to NYT Cooking?",
                answer: "Yes. Flav offers a free tier with unlimited recipe discovery, AI cooking assistance, and interactive cooking mode. Unlike NYT Cooking's $5/month subscription, you can use Flav without paying anything.",
            },
            {
                question: "Are Flav recipes as good as NYT Cooking?",
                answer: "Flav recipes come from a diverse community of food creators — from professional chefs to passionate home cooks. The variety is broader than any single editorial publication, and every recipe includes video content.",
            },
        ],
    },
    "sidechef": {
        id: "sidechef",
        name: "SideChef",
        website: "sidechef.com",
        title: "Flav vs SideChef: Cooking App Comparison 2026",
        description: "Compare Flav and SideChef. See why Flav's AI-powered video recipes and creator economy offer a better cooking experience.",
        heroImage: "/screenshots/home-feed-v5.webp",
        vsText: "SideChef offers step-by-step cooking instructions with smart appliance integration. Flav goes further with video-first discovery, AI assistance, and a creator monetization platform.",
        pros: ["Step-by-step instructions", "Smart appliance integration", "Meal planning features"],
        cons: ["Limited video content", "Small creator community", "Less engaging discovery experience"],
        flavAdvantages: [
            "TikTok-style video discovery that makes browsing recipes fun",
            "AI sous-chef provides real-time cooking help",
            "Import recipes from any social media platform instantly",
            "Creator monetization with the highest payouts in the industry",
        ],
        faq: [
            {
                question: "How does Flav compare to SideChef?",
                answer: "Both apps offer step-by-step cooking guidance, but Flav adds video-first recipe discovery, AI-powered cooking assistance, social media recipe import, and a creator monetization platform with 90-97% payouts.",
            },
            {
                question: "Does Flav work with smart appliances like SideChef?",
                answer: "Smart appliance integration is on Flav's roadmap. Currently, Flav focuses on AI-powered cooking assistance, timers, and voice-guided step-by-step instructions.",
            },
        ],
    },
    "cookpad": {
        id: "cookpad",
        name: "Cookpad",
        website: "cookpad.com",
        title: "Flav vs Cookpad: Community Cooking App Comparison 2026",
        description: "Compare Flav and Cookpad. See why food creators prefer Flav's video platform, AI tools, and 90-97% monetization payouts.",
        heroImage: "/screenshots/home-feed-v5.webp",
        vsText: "Cookpad is a community recipe sharing platform popular internationally. Flav is the video-first evolution — combining community recipes with AI tools, cooking mode, and real creator monetization.",
        pros: ["Large global community", "User-submitted recipes", "Available in many languages"],
        cons: ["Text and photo only — no video", "No AI features", "No creator monetization"],
        flavAdvantages: [
            "Video-first recipes that are easier to follow",
            "AI cooking assistant for real-time help",
            "Creators earn 90-97% of tips and premium recipe revenue",
            "Import recipes from any platform with AI",
        ],
        faq: [
            {
                question: "Is Flav better than Cookpad?",
                answer: "Flav is designed for the video generation. While Cookpad offers community text recipes, Flav provides video recipes, AI cooking assistance, interactive cooking mode, and lets creators monetize their content with 90-97% payouts.",
            },
            {
                question: "Can I share recipes on Flav like Cookpad?",
                answer: "Yes, anyone can create and share recipes on Flav. Unlike Cookpad, Flav recipes are video-based and creators can earn money through tips, premium recipes, and brand partnerships.",
            },
        ],
    },
    "samsung-food": {
        id: "samsung-food",
        name: "Samsung Food",
        website: "samsungfood.com",
        title: "Flav vs Samsung Food: Recipe App Comparison 2026",
        description: "Compare Flav and Samsung Food (formerly Whisk). Discover why home cooks prefer Flav's video recipes, AI assistant, and creator community.",
        heroImage: "/screenshots/home-feed-v5.webp",
        vsText: "Samsung Food (formerly Whisk) focuses on recipe saving and meal planning with Samsung ecosystem integration. Flav is platform-agnostic and built for the creator economy.",
        pros: ["Samsung ecosystem integration", "Recipe saving from web", "Meal planning and grocery lists"],
        cons: ["Limited to Samsung ecosystem benefits", "No original video content", "No creator monetization"],
        flavAdvantages: [
            "Works on any device — iOS, Android, no ecosystem lock-in",
            "AI-powered video recipe discovery and import",
            "Interactive cooking mode with timers and voice guidance",
            "Creator monetization platform with 90-97% payouts",
        ],
        faq: [
            {
                question: "How does Flav compare to Samsung Food?",
                answer: "Samsung Food is primarily a recipe organizer with Samsung device integration. Flav is a video-first cooking platform with AI assistance, interactive cooking mode, social features, and creator monetization — available on any device.",
            },
            {
                question: "Can I import recipes from Samsung Food to Flav?",
                answer: "You can use Flav's AI importer to import recipes from their original source URLs. Flav works independently of any device ecosystem.",
            },
        ],
    },
    "bigoven": {
        id: "bigoven",
        name: "BigOven",
        website: "bigoven.com",
        title: "Flav vs BigOven: Recipe App Comparison 2026",
        description: "Compare Flav and BigOven. See why modern home cooks prefer Flav's video recipes and AI cooking features over BigOven's traditional approach.",
        heroImage: "/screenshots/home-feed-v5.webp",
        vsText: "BigOven is a traditional recipe manager with a large database. Flav reimagines cooking for the video era with AI-powered features, creator content, and interactive cooking mode.",
        pros: ["Large recipe database", "Leftover recipe finder", "Grocery list features"],
        cons: ["Dated interface", "No video content", "Limited AI features"],
        flavAdvantages: [
            "Modern video-first interface with swipeable recipe discovery",
            "AI cooking assistant provides real-time help and substitutions",
            "Import recipes from TikTok, Instagram, or any URL instantly",
            "Creator community producing fresh content daily",
        ],
        faq: [
            {
                question: "Is Flav a good alternative to BigOven?",
                answer: "Yes. Flav offers a modern, video-first cooking experience with AI assistance, interactive cooking mode, and a creator community. It's built for how people discover recipes today — through video, not text databases.",
            },
            {
                question: "Does Flav have as many recipes as BigOven?",
                answer: "Flav's recipe library is growing rapidly through its creator community. You can also import any recipe from BigOven or any other website using Flav's AI recipe importer in under 10 seconds.",
            },
        ],
    },
};
