export interface RecipeCategory {
    slug: string;
    title: string;
    description: string;
    heroDescription: string;
    keywords: string[];
    relatedCategories: string[];
    faq: { question: string; answer: string }[];
}

export const recipeCategories: Record<string, RecipeCategory> = {
    "high-protein": {
        slug: "high-protein",
        title: "High Protein Recipes",
        description: "Discover high protein recipes on Flav — from meal prep bowls to protein-packed dinners. Import any recipe from TikTok or Instagram and cook with AI guidance.",
        heroDescription: "Build muscle and stay full with protein-rich meals. Browse high protein recipes from top food creators, import them in seconds, and cook step-by-step with Flav.",
        keywords: ["high protein recipes", "high protein meal prep", "protein rich meals", "high protein dinner ideas"],
        relatedCategories: ["meal-prep", "keto", "healthy", "fitness-meals"],
        faq: [
            { question: "How much protein should I eat per day?", answer: "Most nutritionists recommend 0.7–1g of protein per pound of body weight for active individuals. Flav's AI can help you find recipes that hit your daily protein targets." },
            { question: "What are the best high protein foods for meal prep?", answer: "Chicken breast, ground turkey, eggs, Greek yogurt, tofu, lentils, and salmon are meal prep staples. On Flav, you can filter recipes by protein content and save your favorites into meal prep collections." },
        ],
    },
    "keto": {
        slug: "keto",
        title: "Keto Recipes",
        description: "Browse keto and low-carb recipes on Flav. Import keto recipes from TikTok, get macro breakdowns with AI, and cook hands-free with step-by-step mode.",
        heroDescription: "Stay in ketosis without sacrificing flavor. Find creator-made keto recipes with full macro breakdowns, import them from social media, and cook with Flav's AI assistant.",
        keywords: ["keto recipes", "low carb recipes", "keto meal prep", "keto dinner ideas", "ketogenic diet recipes"],
        relatedCategories: ["low-carb", "high-protein", "meal-prep", "healthy"],
        faq: [
            { question: "How many carbs can I eat on keto?", answer: "Most keto diets limit net carbs to 20-50g per day. Flav's AI automatically calculates macro breakdowns for imported recipes so you can track your carb intake easily." },
            { question: "What are easy keto meals to make?", answer: "Popular easy keto meals include cauliflower fried rice, zucchini noodle pasta, sheet pan chicken with vegetables, and avocado egg bowls. Browse hundreds of creator-made keto recipes on Flav." },
        ],
    },
    "meal-prep": {
        slug: "meal-prep",
        title: "Meal Prep Recipes",
        description: "Plan your week with easy meal prep recipes on Flav. Import meal prep ideas from TikTok, scale portions with AI, and generate grocery lists automatically.",
        heroDescription: "Save time and eat better with batch-friendly meal prep recipes. Import ideas from your favorite creators, scale portions, and let Flav's AI generate your grocery list.",
        keywords: ["meal prep recipes", "meal prep ideas", "weekly meal prep", "batch cooking recipes", "meal prep for beginners"],
        relatedCategories: ["high-protein", "healthy", "budget-meals", "under-30-minutes"],
        faq: [
            { question: "How long do meal prepped meals last?", answer: "Most meal prepped dishes last 3-5 days in the fridge and up to 3 months in the freezer. Flav recipes include storage tips and reheating instructions when available." },
            { question: "What containers are best for meal prep?", answer: "Glass containers with snap-lock lids are the gold standard — they're microwave-safe, leak-proof, and dishwasher-friendly. Flav's AI can help you plan portions based on your container sizes." },
        ],
    },
    "under-30-minutes": {
        slug: "under-30-minutes",
        title: "Quick Recipes Under 30 Minutes",
        description: "Find fast, easy recipes you can make in under 30 minutes on Flav. Import quick dinner ideas from TikTok and cook step-by-step with built-in timers.",
        heroDescription: "No time? No problem. Browse recipes that go from kitchen to table in 30 minutes or less. Import from social media and cook with Flav's built-in timers.",
        keywords: ["30 minute meals", "quick dinner recipes", "easy fast recipes", "weeknight dinner ideas", "quick healthy meals"],
        relatedCategories: ["under-15-minutes", "one-pot", "healthy", "budget-meals"],
        faq: [
            { question: "What's the fastest healthy meal I can make?", answer: "Stir-fries, sheet pan dinners, and grain bowls can all be ready in 15-20 minutes. Flav's cooking mode includes timers for each step so you never overcook or waste time." },
            { question: "How can I speed up my cooking?", answer: "Prep ingredients before you start (mise en place), use a sharp knife, and read through the full recipe first. Flav's step-by-step cooking mode walks you through each step so you always know what's next." },
        ],
    },
    "under-15-minutes": {
        slug: "under-15-minutes",
        title: "15-Minute Recipes",
        description: "Ultra-fast 15-minute recipes on Flav. Perfect for busy weeknights — import quick recipes from TikTok and cook with AI-guided step-by-step instructions.",
        heroDescription: "Dinner in 15 minutes flat. Find lightning-fast recipes from food creators, import them instantly, and follow along with Flav's timed cooking mode.",
        keywords: ["15 minute meals", "quick easy recipes", "fast dinner recipes", "5 ingredient recipes"],
        relatedCategories: ["under-30-minutes", "one-pot", "budget-meals"],
        faq: [
            { question: "Can you really make a full meal in 15 minutes?", answer: "Absolutely. Pastas, wraps, salads, stir-fries, and omelets can all be done in under 15 minutes. Flav creators share hundreds of time-tested quick recipes with step-by-step guidance." },
        ],
    },
    "healthy": {
        slug: "healthy",
        title: "Healthy Recipes",
        description: "Explore nutritious, healthy recipes on Flav. Get AI-generated nutrition info for any recipe, import from TikTok, and cook with step-by-step guidance.",
        heroDescription: "Eat well without the guesswork. Browse creator-made healthy recipes with full nutrition breakdowns, import them from social media, and cook with Flav's AI assistant.",
        keywords: ["healthy recipes", "healthy dinner ideas", "nutritious meals", "clean eating recipes", "healthy meal ideas"],
        relatedCategories: ["high-protein", "keto", "meal-prep", "vegan"],
        faq: [
            { question: "How do I know if a recipe is actually healthy?", answer: "Flav's AI automatically extracts nutrition information including calories, macros, and key nutrients for every imported recipe. You can make informed choices without doing the math yourself." },
            { question: "What makes a meal balanced?", answer: "A balanced meal includes a protein source, complex carbs, healthy fats, and vegetables. Flav's AI meal planner can help you build balanced weekly meal plans based on your dietary goals." },
        ],
    },
    "vegan": {
        slug: "vegan",
        title: "Vegan Recipes",
        description: "Discover delicious plant-based vegan recipes on Flav. Import vegan recipes from TikTok, get ingredient substitution tips from AI, and cook hands-free.",
        heroDescription: "Plant-based eating made easy and delicious. Find vegan recipes from top creators, import them in seconds, and use Flav's AI for ingredient substitutions.",
        keywords: ["vegan recipes", "plant based recipes", "vegan dinner ideas", "easy vegan meals", "vegan meal prep"],
        relatedCategories: ["vegetarian", "healthy", "meal-prep", "gluten-free"],
        faq: [
            { question: "How do I get enough protein on a vegan diet?", answer: "Lentils, chickpeas, tofu, tempeh, quinoa, and seitan are all excellent protein sources. Flav's AI can suggest vegan protein swaps for any recipe you import." },
            { question: "Can I convert non-vegan recipes to vegan?", answer: "Yes! Flav's AI assistant can suggest plant-based substitutions for any ingredient — like cashew cream for dairy, flax eggs for eggs, and jackfruit for pulled meat." },
        ],
    },
    "vegetarian": {
        slug: "vegetarian",
        title: "Vegetarian Recipes",
        description: "Browse vegetarian recipes on Flav — from hearty mains to creative sides. Import vegetarian recipes from TikTok and cook with AI-guided instructions.",
        heroDescription: "Meat-free meals that don't compromise on flavor. Explore vegetarian recipes from food creators worldwide, import them instantly, and cook with Flav.",
        keywords: ["vegetarian recipes", "vegetarian dinner ideas", "meatless meals", "vegetarian meal prep"],
        relatedCategories: ["vegan", "healthy", "meal-prep", "italian"],
        faq: [
            { question: "What are the best vegetarian protein sources?", answer: "Eggs, cheese, Greek yogurt, lentils, beans, tofu, and tempeh are all great options. Flav shows protein content for every recipe so you can stay on track." },
        ],
    },
    "gluten-free": {
        slug: "gluten-free",
        title: "Gluten-Free Recipes",
        description: "Find gluten-free recipes on Flav that taste amazing. Import gluten-free ideas from TikTok, get AI-powered ingredient checks, and cook step-by-step.",
        heroDescription: "Gluten-free cooking without limits. Browse recipes from creators who specialize in GF cooking, import them from social media, and cook confidently with Flav.",
        keywords: ["gluten free recipes", "gluten free dinner ideas", "celiac friendly recipes", "gluten free meal prep"],
        relatedCategories: ["healthy", "keto", "vegan", "meal-prep"],
        faq: [
            { question: "What flours can I use instead of wheat flour?", answer: "Almond flour, coconut flour, rice flour, oat flour, and cassava flour are popular gluten-free alternatives. Flav's AI can suggest the best substitution based on the recipe type." },
        ],
    },
    "italian": {
        slug: "italian",
        title: "Italian Recipes",
        description: "Cook authentic Italian recipes on Flav — from homemade pasta to classic risotto. Import Italian recipes from TikTok and cook with step-by-step guidance.",
        heroDescription: "From nonna's kitchen to yours. Discover authentic Italian recipes from food creators, import them in seconds, and master classic techniques with Flav's cooking mode.",
        keywords: ["italian recipes", "pasta recipes", "italian dinner ideas", "homemade pasta", "risotto recipes"],
        relatedCategories: ["mediterranean", "under-30-minutes", "vegetarian"],
        faq: [
            { question: "What are the essential Italian pantry staples?", answer: "Olive oil, San Marzano tomatoes, Parmigiano-Reggiano, dried pasta, garlic, and fresh basil. Flav auto-generates grocery lists from any recipe you save." },
        ],
    },
    "mexican": {
        slug: "mexican",
        title: "Mexican Recipes",
        description: "Explore authentic Mexican recipes on Flav — tacos, enchiladas, salsas and more. Import recipes from TikTok and cook step-by-step with Flav's AI.",
        heroDescription: "Bring the bold flavors of Mexico to your kitchen. Find authentic Mexican recipes from food creators, import them from social media, and cook with Flav.",
        keywords: ["mexican recipes", "taco recipes", "authentic mexican food", "enchilada recipes", "mexican dinner ideas"],
        relatedCategories: ["under-30-minutes", "meal-prep", "budget-meals"],
        faq: [
            { question: "What are the most popular Mexican dishes?", answer: "Tacos, enchiladas, tamales, pozole, chilaquiles, and mole are staples. Flav has hundreds of authentic Mexican recipes from creators who specialize in Latin cuisine." },
        ],
    },
    "asian": {
        slug: "asian",
        title: "Asian Recipes",
        description: "Discover Asian recipes on Flav — from stir-fries to ramen to curries. Import Asian cooking videos from TikTok and cook with AI-guided step-by-step mode.",
        heroDescription: "Master Asian cooking at home. Browse recipes spanning Chinese, Japanese, Korean, Thai, and Indian cuisine from food creators, import them instantly, and cook with Flav.",
        keywords: ["asian recipes", "stir fry recipes", "ramen recipes", "curry recipes", "asian dinner ideas"],
        relatedCategories: ["under-30-minutes", "healthy", "meal-prep"],
        faq: [
            { question: "What are essential Asian cooking ingredients?", answer: "Soy sauce, sesame oil, rice vinegar, ginger, garlic, and chili paste are foundational. Flav's grocery list feature ensures you never forget a key ingredient." },
        ],
    },
    "mediterranean": {
        slug: "mediterranean",
        title: "Mediterranean Recipes",
        description: "Cook Mediterranean diet recipes on Flav — fresh, healthy, and full of flavor. Import Mediterranean recipes from TikTok and cook with AI assistance.",
        heroDescription: "The Mediterranean diet made simple. Find heart-healthy recipes rich in olive oil, fresh vegetables, and whole grains from food creators on Flav.",
        keywords: ["mediterranean recipes", "mediterranean diet recipes", "greek recipes", "healthy mediterranean meals"],
        relatedCategories: ["italian", "healthy", "vegetarian", "meal-prep"],
        faq: [
            { question: "What is the Mediterranean diet?", answer: "The Mediterranean diet emphasizes fruits, vegetables, whole grains, legumes, olive oil, fish, and moderate amounts of dairy and wine. It's consistently ranked as one of the healthiest diets worldwide." },
        ],
    },
    "one-pot": {
        slug: "one-pot",
        title: "One-Pot Recipes",
        description: "Minimal cleanup, maximum flavor. Find one-pot and one-pan recipes on Flav. Import easy one-pot meals from TikTok and cook with built-in timers.",
        heroDescription: "Cook entire meals in a single pot or pan. Less cleanup, more flavor. Browse one-pot recipes from creators, import them instantly, and cook with Flav's timed cooking mode.",
        keywords: ["one pot meals", "one pan recipes", "easy one pot dinner", "one pot pasta", "sheet pan dinners"],
        relatedCategories: ["under-30-minutes", "meal-prep", "budget-meals"],
        faq: [
            { question: "What equipment do I need for one-pot cooking?", answer: "A Dutch oven, large skillet, or sheet pan is all you need. One-pot recipes minimize dishes while maximizing flavor through layered cooking techniques." },
        ],
    },
    "budget-meals": {
        slug: "budget-meals",
        title: "Budget-Friendly Recipes",
        description: "Eat well on a budget with affordable recipes on Flav. Import cheap meal ideas from TikTok, generate smart grocery lists, and cook step-by-step.",
        heroDescription: "Delicious meals that won't break the bank. Find budget-friendly recipes from creators, import them from social media, and let Flav's AI optimize your grocery list.",
        keywords: ["budget meals", "cheap dinner ideas", "affordable recipes", "cooking on a budget", "cheap meal prep"],
        relatedCategories: ["meal-prep", "one-pot", "under-30-minutes"],
        faq: [
            { question: "How can I eat healthy on a tight budget?", answer: "Buy in bulk, cook with dried beans and lentils, use seasonal produce, and meal prep to reduce waste. Flav's AI grocery list helps you plan efficiently and avoid impulse buys." },
        ],
    },
    "desserts": {
        slug: "desserts",
        title: "Dessert Recipes",
        description: "Satisfy your sweet tooth with dessert recipes on Flav — from cookies to cakes to no-bake treats. Import dessert ideas from TikTok and bake step-by-step.",
        heroDescription: "From show-stopping cakes to quick no-bake treats. Find dessert recipes from baking creators, import them instantly, and follow precise step-by-step baking instructions on Flav.",
        keywords: ["dessert recipes", "easy desserts", "cookie recipes", "cake recipes", "no bake desserts"],
        relatedCategories: ["gluten-free", "vegan"],
        faq: [
            { question: "What are easy desserts for beginners?", answer: "Brownies, chocolate chip cookies, mug cakes, and no-bake cheesecake are great starting points. Flav's cooking mode includes timers and temperatures so you get perfect results every time." },
        ],
    },
    "breakfast": {
        slug: "breakfast",
        title: "Breakfast Recipes",
        description: "Start your day right with breakfast recipes on Flav — from overnight oats to egg dishes to smoothie bowls. Import breakfast ideas from TikTok and cook with AI.",
        heroDescription: "Morning meals worth waking up for. Browse breakfast recipes from food creators, import them from TikTok or Instagram, and cook hands-free with Flav.",
        keywords: ["breakfast recipes", "healthy breakfast ideas", "easy breakfast", "breakfast meal prep", "brunch recipes"],
        relatedCategories: ["under-15-minutes", "meal-prep", "healthy", "high-protein"],
        faq: [
            { question: "What are high protein breakfast ideas?", answer: "Greek yogurt parfaits, egg white scrambles, protein pancakes, overnight oats with protein powder, and breakfast burritos are all great options. Flav shows macro breakdowns for every recipe." },
        ],
    },
    "air-fryer": {
        slug: "air-fryer",
        title: "Air Fryer Recipes",
        description: "Get the best air fryer recipes on Flav — crispy, quick, and healthier. Import air fryer ideas from TikTok and cook with precise temperature and time guidance.",
        heroDescription: "Crispy perfection without the oil. Find air fryer recipes from creators who've mastered the technique, import them instantly, and cook with Flav's timed instructions.",
        keywords: ["air fryer recipes", "easy air fryer meals", "healthy air fryer recipes", "air fryer chicken", "air fryer vegetables"],
        relatedCategories: ["under-30-minutes", "healthy", "keto"],
        faq: [
            { question: "What can you cook in an air fryer?", answer: "Almost anything — chicken wings, vegetables, fish, tofu, fries, and even baked goods. Air fryers use convection heat to create crispy results with minimal oil. Flav includes precise temperatures and times for every air fryer recipe." },
        ],
    },
    "slow-cooker": {
        slug: "slow-cooker",
        title: "Slow Cooker & Crockpot Recipes",
        description: "Set it and forget it with slow cooker recipes on Flav. Import crockpot ideas from TikTok and let Flav's timers remind you when your meal is ready.",
        heroDescription: "Dump it in, walk away, come back to a perfect meal. Browse slow cooker recipes from food creators, import them from social media, and let Flav handle the timing.",
        keywords: ["slow cooker recipes", "crockpot recipes", "easy slow cooker meals", "dump and go crockpot recipes"],
        relatedCategories: ["meal-prep", "one-pot", "budget-meals"],
        faq: [
            { question: "How long should I cook in a slow cooker?", answer: "Most recipes take 4-6 hours on high or 8-10 hours on low. Flav's cooking mode sets automatic timers so you never overcook your meal." },
        ],
    },
    "fitness-meals": {
        slug: "fitness-meals",
        title: "Fitness & Gym Recipes",
        description: "Fuel your workouts with fitness-focused recipes on Flav. Track macros with AI, import gym meal ideas from TikTok, and meal prep like a pro.",
        heroDescription: "Eat to perform. Find macro-friendly recipes designed for muscle building, fat loss, and athletic performance. Import from social media and track nutrition with Flav's AI.",
        keywords: ["fitness recipes", "gym meal prep", "macro friendly recipes", "bodybuilding meals", "post workout meals"],
        relatedCategories: ["high-protein", "meal-prep", "healthy", "keto"],
        faq: [
            { question: "What should I eat after a workout?", answer: "A mix of protein and carbs within 30-60 minutes post-workout is ideal — think chicken and rice, protein shake with banana, or Greek yogurt with granola. Flav shows full macro breakdowns for every recipe." },
        ],
    },
};

export function getRecipeCategory(slug: string): RecipeCategory | undefined {
    return recipeCategories[slug];
}

export function getAllCategorySlugs(): string[] {
    return Object.keys(recipeCategories);
}
