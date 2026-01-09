import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Badge } from "@/components/ui/Badge";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Short-Form Video Discovery",
    description:
      "Swipe through endless cooking inspiration. Every video is a complete recipe you can actually make.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Save-First Personalization",
    description:
      "Your taste graph learns what you love. The more you save, the better your feed becomes.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Creator Monetization",
    description:
      "Earn tips from fans, sell premium recipes, and unlock brand partnerships. Your content, your income.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Verified & Pro Tiers",
    description:
      "Stand out with a verified badge, access advanced analytics, and enjoy lower fees on earnings.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Download Flav",
    description: "Get the app free on iOS and Android. Create your account in seconds.",
  },
  {
    step: "02",
    title: "Create or Discover",
    description: "Share your recipes or explore millions of cooking videos tailored to your taste.",
  },
  {
    step: "03",
    title: "Grow & Earn",
    description: "Build your audience, receive tips, and unlock premium monetization features.",
  },
];

const testimonials = [
  {
    quote: "Flav helped me turn my passion for cooking into a real income stream. The community is amazing!",
    author: "Maria Rodriguez",
    role: "Food Creator, 50K followers",
    avatar: "👩‍🍳",
  },
  {
    quote: "Finally, an app that understands food content. The saves-based algorithm actually rewards quality recipes.",
    author: "James Chen",
    role: "Home Chef & Recipe Developer",
    avatar: "👨‍🍳",
  },
  {
    quote: "I've tried every food app out there. Flav is the only one where I feel like my content matters.",
    author: "Sarah Thompson",
    role: "Verified Creator",
    avatar: "🧑‍🍳",
  },
];

const faqItems = [
  {
    question: "What is Flav?",
    answer:
      "Flav is a short-form video app built specifically for food lovers. Discover recipes through swipeable videos, save your favorites, and if you're a creator, earn money from tips and premium recipe content.",
  },
  {
    question: "How is Flav different from other video apps?",
    answer:
      "Flav is built around saves, not likes. When you save a recipe, it signals real intent to cook it—and that trains your personal taste graph for better recommendations. For creators, this means your content reaches people who actually want to use your recipes.",
  },
  {
    question: "How do creators make money on Flav?",
    answer:
      "Creators earn through tips from fans, premium recipe content (followers pay a small fee to access exclusive recipes), and brand partnerships. Verified and Pro creators enjoy lower platform fees and priority discovery.",
  },
  {
    question: "What is Flav Verified?",
    answer:
      "Flav Verified is a subscription badge for serious creators. You get a verified checkmark, access to advanced analytics, highlighted replies in comments, and reduced fees on tips and premium content sales.",
  },
  {
    question: "Is Flav free to use?",
    answer:
      "Yes! Flav is free to download and use. Creators can upgrade to Verified or Pro tiers for enhanced features and lower fees, and viewers can optionally tip creators or purchase premium recipes.",
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
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--background)] to-[var(--color-secondary-50)] opacity-50" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--color-primary-200)] rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--color-secondary-200)] rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="container-main relative z-10 py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="new" className="mb-6" />

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your recipes, your audience,{" "}
              <span className="gradient-text">your income.</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-neutral-600)] mb-8 max-w-2xl mx-auto">
              The short-form video app for food creators who want to grow and earn.
              Discover recipes, build your following, and monetize your passion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <AppStoreButtons size="lg" utmSource="homepage_hero" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-neutral-500)]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-secondary-500)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free to download</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-secondary-500)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Creator monetization</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-secondary-500)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>iOS & Android</span>
              </div>
            </div>
          </div>

          {/* App mockup placeholder */}
          <div className="mt-16 flex justify-center">
            <div className="relative w-64 md:w-80 aspect-[9/19] bg-gradient-to-br from-[var(--color-neutral-800)] to-[var(--color-neutral-900)] rounded-[2.5rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] rounded-[2rem] flex items-center justify-center">
                <span className="text-6xl">🍳</span>
              </div>
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-[var(--color-neutral-900)] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 border-y border-[var(--color-neutral-200)] bg-[var(--background-subtle)]">
        <div className="container-main">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            <p className="text-sm font-medium text-[var(--color-neutral-500)] uppercase tracking-wider">
              As featured in
            </p>
            {["TechCrunch", "Forbes", "Food Network", "Eater"].map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-bold text-[var(--color-neutral-400)]">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="features">
        <div className="container-main">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for food lovers,{" "}
              <span className="gradient-text">powered by creators</span>
            </h2>
            <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              Flav isn't just another video app. It's a platform designed from the ground up for recipes that matter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-[var(--background-subtle)]">
        <div className="container-main">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              Getting started with Flav takes less than a minute.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] text-white text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-[var(--color-neutral-600)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container-main">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by creators
            </h2>
            <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              Join thousands of food creators who are building their audience on Flav.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 md:p-8 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{testimonial.avatar}</span>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-[var(--color-neutral-500)]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[var(--color-neutral-600)] italic">"{testimonial.quote}"</p>
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
                Advertise on Flav to connect with an audience that's actively looking for their next meal.
                Our intent-based targeting means your brand reaches people who are ready to cook.
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
              <div className="relative w-80 h-80 bg-gradient-to-br from-[var(--color-primary-500)]/20 to-[var(--color-secondary-500)]/20 rounded-3xl flex items-center justify-center">
                <span className="text-8xl">📊</span>
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
        <div className="container-main text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to start cooking?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Download Flav for free and discover your next favorite recipe.
          </p>
          <AppStoreButtons size="lg" utmSource="homepage_cta" className="justify-center" />
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
              "The short-form video app for food lovers. Discover recipes, grow your audience, and monetize your cooking content.",
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
