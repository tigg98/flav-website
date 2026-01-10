import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Badge } from "@/components/ui/Badge";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";

const features = [
  {
    title: "Discover Recipes",
    description: "Swipe through endless cooking inspiration. Every video is a complete recipe you can actually make.",
    screenshot: "/screenshots/home-feed.png",
    badge: "For You Feed",
  },
  {
    title: "Cook Step-by-Step",
    description: "Follow along with timers, ingredient lists, and clear instructions. Cooking mode guides you through every dish.",
    screenshot: "/screenshots/cooking-mode.png",
    badge: "Cooking Mode",
  },
  {
    title: "Ask Flav AI",
    description: "Stuck on a step? Get instant tips, substitutions, and answers from our AI cooking assistant.",
    screenshot: "/screenshots/ask-flav.png",
    badge: "AI Assistant",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Discover",
    description: "Swipe through personalized recipe videos tailored to your taste",
    icon: "🍝",
  },
  {
    step: "02",
    title: "Save & Cook",
    description: "Save recipes and cook with step-by-step guidance and timers",
    icon: "⏱️",
  },
  {
    step: "03",
    title: "Create & Share",
    description: "Upload your own recipes and grow your following",
    icon: "✨",
  },
];

const faqItems = [
  {
    question: "What is Flav?",
    answer:
      "Flav is a short-form video app built specifically for food lovers. Discover recipes through swipeable videos, cook with step-by-step guidance, and create your own recipes to share with the world.",
  },
  {
    question: "How does the cooking mode work?",
    answer:
      "When you tap 'Start Cooking', Flav guides you through each step with timers, ingredient checklists, and clear instructions. You can even ask Flav AI for tips mid-recipe!",
  },
  {
    question: "Can I import recipes from Instagram or TikTok?",
    answer:
      "Yes! Flav lets you import recipes from your favorite social platforms. Just paste a link and we'll help you turn it into a structured recipe.",
  },
  {
    question: "Is Flav free to use?",
    answer:
      "Yes! Flav is free to download and use. Creators can earn money through tips and premium recipes, and we offer optional Pro features for power users.",
  },
  {
    question: "What platforms is Flav available on?",
    answer:
      "Flav is available on both iOS and Android. Download it from the App Store or Google Play to get started.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--background)] to-[var(--color-secondary-50)] opacity-50" />

        {/* Decorative blurs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--color-primary-200)] rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--color-secondary-200)] rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="container-main relative z-10 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <Badge variant="new" className="mb-6" />

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Cook anything.{" "}
                <span className="gradient-text">Ask anything.</span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--color-neutral-600)] mb-8 max-w-xl">
                Discover recipes, follow along step-by-step with timers, and get instant help from AI—all in one beautiful app.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8">
                <AppStoreButtons size="lg" utmSource="homepage_hero" />
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-[var(--color-neutral-500)]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Free to download</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>AI cooking assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Step-by-step timers</span>
                </div>
              </div>
            </div>

            {/* Right: Phone Mockups */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Main phone - Realistic iPhone */}
              <div className="relative z-20">
                <IPhoneMockup
                  src="/screenshots/home-feed.png"
                  alt="Flav home feed showing recipe discovery"
                  size="lg"
                  priority
                />
              </div>

              {/* Background phone - Recipe Detail */}
              <div className="absolute right-0 md:right-4 top-16 z-10 opacity-70 hidden sm:block scale-[0.85]">
                <IPhoneMockup
                  src="/screenshots/recipe-detail.png"
                  alt="Recipe detail view"
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="section bg-[var(--background-subtle)]" id="features">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="gradient-text">cook confidently</span>
            </h2>
            <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              From discovery to plating—Flav guides you through every step of your cooking journey.
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Phone mockup */}
                <div className={`flex justify-center ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <IPhoneMockup
                    src={feature.screenshot}
                    alt={feature.title}
                    size="md"
                  />
                </div>

                {/* Content */}
                <div className={`text-center md:text-left ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="inline-flex px-4 py-1 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-sm font-medium mb-4">
                    {feature.badge}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg text-[var(--color-neutral-600)] max-w-md">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create Your Own Section */}
      <section className="section">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <Badge variant="beta" className="mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Create & share your recipes
              </h2>
              <p className="text-lg text-[var(--color-neutral-600)] mb-6">
                Turn your culinary creations into step-by-step recipes anyone can follow. Import from Instagram or TikTok, or create from scratch.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Import recipes from social media",
                  "AI-powered recipe generation",
                  "Add photos, timers, and tips",
                  "Share and grow your audience",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-secondary-100)] text-[var(--color-secondary-600)] flex items-center justify-center text-sm">✓</span>
                    <span className="text-[var(--color-neutral-700)]">{item}</span>
                  </li>
                ))}
              </ul>
              <AppStoreButtons utmSource="homepage_create" />
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-56 md:w-64">
                <div className="relative bg-[var(--color-neutral-900)] rounded-[3rem] p-2 shadow-2xl">
                  <div className="relative w-full aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-black">
                    <Image
                      src="/screenshots/create-recipe.png"
                      alt="Create new recipe screen"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-[var(--background-subtle)]">
        <div className="container-main">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              From hungry to cooking in under a minute.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg mb-4 text-4xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-[var(--color-primary-500)] mb-2">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-[var(--color-neutral-600)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Brands Section */}
      <section className="section bg-gradient-to-br from-[var(--color-neutral-900)] to-[var(--color-neutral-950)] text-white">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="beta" className="mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Reach food lovers where they're hungry to discover
              </h2>
              <p className="text-lg text-[var(--color-neutral-300)] mb-6">
                Advertise on Flav to connect with an audience actively looking for their next meal.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "In-feed promoted recipes",
                  "Creator partnership campaigns",
                  "Dietary & flavor-based targeting",
                  "Brand-safe environment",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--color-primary-500)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[var(--color-neutral-200)]">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link href="/advertise">Advertise on Flav</Link>
              </Button>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-96 h-80 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/advertiser-dashboard.png"
                  alt="Flav advertiser analytics dashboard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" id="faq">
        <div className="container-main">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              Everything you need to know about Flav.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)]" id="download">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to cook something amazing?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                Download Flav for free and discover your next favorite recipe—with AI assistance and step-by-step guidance.
              </p>
              <AppStoreButtons size="lg" utmSource="homepage_cta" />
            </div>

            <div className="hidden md:flex justify-center">
              <IPhoneMockup
                src="/screenshots/home-feed.png"
                alt="Flav app"
                size="sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            name: "Flav",
            operatingSystem: "iOS, Android",
            applicationCategory: "FoodApplication",
            description:
              "The recipe app with AI assistance. Discover recipes, cook step-by-step with timers, and get instant help from your AI cooking assistant.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "1200",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Flav",
            url: "https://flav.app",
            logo: "https://flav.app/logo.png",
            sameAs: [
              "https://twitter.com/flavapp",
              "https://instagram.com/flavapp",
              "https://tiktok.com/@flavapp",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
