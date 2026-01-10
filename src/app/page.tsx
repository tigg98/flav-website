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
      <section className="relative overflow-hidden min-h-screen flex items-center pt-20 pb-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/40 via-background to-background dark:from-orange-900/20" />

        {/* Decorative blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] animate-pulse-subtle" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[100px] animate-pulse-subtle" style={{ animationDelay: '2s' }} />

        <div className="container-main relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-medium mb-8 border border-orange-200 dark:border-orange-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                The #1 Food App for 2026
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                Cook anything. <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                  Taste everything.
                </span>
              </h1>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
                Discover viral recipes, cook with confidence using step-by-step video guides, and get instant answers from your AI sous-chef.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-12">
                <AppStoreButtons size="lg" utmSource="homepage_hero" />
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">✓</div>
                  <span>Free to download</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">✓</div>
                  <span>AI Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs">✓</div>
                  <span>Creator Economy</span>
                </div>
              </div>
            </div>

            {/* Right: Phone Mockups */}
            <div className="relative flex justify-center lg:justify-end animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {/* Main phone */}
              <div className="relative z-20 transform hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/20 to-amber-500/20 rounded-[3rem] blur-2xl" />
                <IPhoneMockup
                  src="/screenshots/home-feed.png"
                  alt="Flav home feed showing recipe discovery"
                  size="lg"
                  priority
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-12 top-20 z-10 hidden xl:block animate-float">
                <div className="glass-panel p-4 rounded-2xl shadow-xl max-w-[200px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold">JD</div>
                    <div>
                      <div className="font-bold text-sm">Chef John</div>
                      <div className="text-xs text-neutral-500">Just now</div>
                    </div>
                  </div>
                  <p className="text-xs font-medium">"This pasta recipe is absolutely incredible! 🍝"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="section bg-neutral-50 dark:bg-neutral-900/50" id="features">
        <div className="container-main">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Everything you need to <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">cook confidently</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              From the first spark of inspiration to the final garnish—Flav is your sous-chef for every step of the journey.
            </p>
          </div>

          <div className="space-y-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-neutral-900 rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-neutral-100 dark:border-neutral-800 transition-all duration-500 hover:shadow-xl hover:border-orange-100 dark:hover:border-orange-900/30 overflow-hidden relative`}
              >
                <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  {/* Phone mockup */}
                  <div className={`flex justify-center relative ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    {/* Blob behind phone */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${index === 0 ? 'bg-orange-200 dark:bg-orange-900/40' :
                      index === 1 ? 'bg-green-200 dark:bg-green-900/40' :
                        'bg-blue-200 dark:bg-blue-900/40'
                      }`} />

                    <div className="relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500">
                      <IPhoneMockup
                        src={feature.screenshot}
                        alt={feature.title}
                        size="md"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`text-center md:text-left ${index % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className={`inline-flex px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ${index === 0 ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300' :
                      index === 1 ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                      {feature.badge}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">{feature.title}</h3>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md mx-auto md:mx-0">
                      {feature.description}
                    </p>

                    <div className="mt-8">
                      <Button variant="ghost" className="group/btn text-lg px-0 hover:bg-transparent hover:text-orange-600 dark:hover:text-orange-400">
                        Learn more
                        <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Economy Section - Dark Mode Contrast */}
      <section className="section bg-neutral-900 text-white overflow-hidden relative">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-main relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 text-orange-400 text-sm font-medium mb-6 border border-neutral-700">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                For Creators
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Turn your passion into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">a career.</span>
              </h2>

              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                Flav isn't just for sharing—it's for earning. Build your brand with professional tools designed for food creators.
              </p>

              <ul className="space-y-6 mb-10">
                {[
                  { icon: "💰", title: "Monetize Directly", desc: "Earn from tips and premium recipe subscriptions." },
                  { icon: "✨", title: " AI-Powered Creation", desc: "Turn a video into a structured recipe in seconds." },
                  { icon: "📈", title: "Detailed Analytics", desc: "Understand your audience with pro-level insights." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-2xl border border-neutral-700 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-neutral-400">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100 border-none">
                  Join as Creator
                </Button>
                <Button size="lg" variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 hover:text-white">
                  View Creator Tools
                </Button>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center perspective-1000">
              <div className="relative transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700">
                <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/30 to-purple-500/30 rounded-[3rem] blur-xl" />
                <div className="relative w-72 md:w-80 bg-neutral-900 rounded-[2.5rem] border-8 border-neutral-800 shadow-2xl overflow-hidden">
                  <IPhoneMockup
                    src="/screenshots/create-recipe.png"
                    alt="Creator tools interface"
                    size="lg"
                  />
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
      <section className="section bg-gradient-to-br from-orange-600 to-rose-600 text-white overflow-hidden py-32 md:py-40" id="download">
        <div className="container-main relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Ready to cook?
          </h2>
          <p className="text-xl md:text-2xl text-orange-50 mb-12 max-w-2xl mx-auto font-medium">
            Join millions of food lovers and start your journey today.
          </p>
          <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
            <AppStoreButtons size="lg" utmSource="homepage_cta_bottom" />
          </div>
        </div>

        {/* Background decorative circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/10 rounded-full opacity-30" />
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Flav",
              "applicationCategory": "LifestyleApplication",
              "applicationSubCategory": "CookingApplication",
              "operatingSystem": "iOS, Android",
              "description": "The viral short-form video app for food lovers. Watch authentic recipes, cook with AI assistance, and earn money as a creator.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "15420"
              },
              "featureList": [
                "AI Cooking Assistant",
                "Step-by-step Timers",
                "Recipe Import Tool",
                "Creator Monetization"
              ],
              "screenshot": "https://flav.app/screenshots/home-feed.png",
              "downloadUrl": "https://flav.app/download"
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Flav",
              "url": "https://flav.app",
              "logo": "https://flav.app/logo.png",
              "sameAs": [
                "https://twitter.com/flavapp",
                "https://instagram.com/flavapp",
                "https://tiktok.com/@flavapp",
                "https://linkedin.com/company/flav-app"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@flav.app",
                "contactType": "customer service"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map((item) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            }
          ]),
        }}
      />
    </>
  );
}
