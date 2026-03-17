import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";
import { ScrollToButton } from "@/components/ui/ScrollToButton";
import { ImportDemo } from "@/components/marketing/ImportDemo";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Badge } from "@/components/ui/Badge";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";
import {
  UtensilsCrossed,
  Clock,
  Sparkles,
  DollarSign,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

const features = [
  {
    title: "Discover Recipes",
    description: "Swipe through endless cooking inspiration. Every video is a complete recipe you can actually make.",
    screenshot: "/screenshots/home-feed-v5.webp",
    badge: "For You Feed",
  },
  {
    title: "Cook Step-by-Step",
    description: "Follow along with timers, ingredient lists, and clear instructions. Cooking mode guides you through every dish.",
    screenshot: "/screenshots/recipe-detail-v2.webp",
    badge: "Cooking Mode",
  },
  {
    title: "Ask Flav AI",
    description: "Stuck on a step? Get instant tips, substitutions, and answers from our AI cooking assistant.",
    screenshot: "/screenshots/ask-flav.webp",
    badge: "AI Assistant",
  },
];

const howItWorks: { step: string; title: string; description: string; icon: LucideIcon }[] = [
  {
    step: "01",
    title: "Discover",
    description: "Swipe through personalized recipe videos tailored to your taste",
    icon: UtensilsCrossed,
  },
  {
    step: "02",
    title: "Save & Cook",
    description: "Save recipes and cook with step-by-step guidance and timers",
    icon: Clock,
  },
  {
    step: "03",
    title: "Create & Share",
    description: "Upload your own recipes and grow your following",
    icon: Sparkles,
  },
];

const faqItems = [
  {
    question: "What is Flav?",
    answer:
      "Flav is a short-form video app and recipe manager that combines swipeable cooking videos with practical AI tools. Unlike general-purpose social platforms, Flav features a structured cooking mode with built-in timers, ingredient checklists, and an AI cooking assistant — purpose-built for food content.",
  },
  {
    question: "How does the cooking mode work?",
    answer:
      "Flav's cooking mode is an interactive, step-by-step guide generated from any recipe video. When you tap 'Start Cooking', each step is displayed with integrated timers, a real-time ingredient checklist, and portion scaling. You can also ask Flav AI — our built-in cooking assistant — for instant substitutions, technique tips, and nutritional information without leaving the recipe.",
  },
  {
    question: "Can I import recipes from Instagram or TikTok?",
    answer:
      "Yes, you can import recipes using Flav's AI-powered recipe import tool, which converts any public Instagram Reel, TikTok video, or web recipe into a structured format in under 10 seconds. The AI automatically extracts ingredients, cooking steps, estimated times, and nutritional data without requiring any manual data entry.",
  },
  {
    question: "Is Flav free to use?",
    answer:
      "Yes, Flav is completely free to download and use on iOS and Android. The free tier includes unlimited recipe discovery, the interactive cooking mode, and access to the AI assistant. For creators, optional Verified ($7.99/month) and Pro ($19.99/month) subscriptions unlock monetization features with industry-leading 90–97% payout rates, a verified badge, and advanced analytics.",
  },
  {
    question: "How do creators earn money on Flav?",
    answer:
      "Food creators on Flav earn money through three primary revenue channels: direct viewer tips, premium locked recipes, and brand partnerships. Flav uses a creator-first payout structure, giving creators 90–97% of revenue — significantly higher than the estimated 50% industry average on competing platforms. Monetization can be enabled after reaching 100 followers, with weekly automatic payouts via direct deposit or PayPal.",
  },
  {
    question: "When does Flav launch?",
    answer:
      "Flav is launching soon. Join the waitlist to get early access before the public launch. Waitlist members who refer friends get priority access and can unlock rewards like a creator badge and free premium features.",
  },
  {
    question: "How is Flav different from saving recipes on TikTok?",
    answer:
      "TikTok is for watching. Flav is for cooking. We turn any video into a structured recipe with ingredients, steps, timers, and nutrition info — then help you actually cook it with a hands-free cooking mode. No more pausing videos or writing things down.",
  },
  {
    question: "Do I need followers to join as a creator?",
    answer:
      "Nope. Anyone can create and share recipes on Flav. Monetization features unlock at 100 followers — which most active creators reach within their first month on the platform.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center pt-20 pb-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-primary-100)]/40 via-background to-background dark:from-[var(--color-primary-900)]/20" />

        {/* Decorative blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] animate-pulse-subtle" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[100px] animate-pulse-subtle" style={{ animationDelay: '2s' }} />

        <div className="container-main relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-100)] dark:bg-[#E07A5F]/10 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] text-sm font-medium mb-8 border border-[var(--color-primary-200)] dark:border-[#E07A5F]/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary-400)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary-500)]"></span>
                </span>
                Launching Soon — Join the Waitlist
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                Import Any Recipe <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">
                  in 10 Seconds.
                </span>
              </h1>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
                Paste a TikTok or Instagram link. Get a full recipe — ingredients, steps, nutrition, and timers. Then cook it hands-free with Flav's AI cooking mode.
              </p>

              <div id="waitlist" className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8 scroll-mt-24">
                <WaitlistForm />
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">✓</div>
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">✓</div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs">✓</div>
                  <span>iOS & Android</span>
                </div>
              </div>

              <ScrollToButton
                targetId="features"
                className="mt-8 flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-[var(--color-primary-500)] transition-colors mx-auto lg:mx-0 cursor-pointer"
              >
                See how it works
                <span className="animate-bounce inline-block">↓</span>
              </ScrollToButton>
            </div>

            {/* Right: Phone Mockups */}
            <div className="relative flex justify-center lg:justify-end animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {/* Main phone */}
              <div className="relative z-20 transform hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#E07A5F]/20 to-[#e8967d]/20 rounded-[3rem] blur-2xl" />
                <IPhoneMockup
                  src="/screenshots/home-feed-v5.webp"
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

      {/* Social Proof / Trust Bar */}
      <section className="py-8 border-y border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="container-main">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-neutral-400 dark:text-neutral-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[var(--color-primary-500)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Loved by beta testers</span>
            </div>
            <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block" />
            <span className="text-sm font-medium">90-97% creator payouts</span>
            <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block" />
            <span className="text-sm font-medium">AI-powered recipe import</span>
            <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block" />
            <span className="text-sm font-medium">iOS & Android</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-28 bg-white dark:bg-neutral-950">
        <div className="container-main">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-500)] mb-4">The Problem</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Your favorite recipes are <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">trapped in your feed</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
              <div className="text-4xl mb-5">📱</div>
              <h3 className="text-xl font-bold mb-3">Lost in the Scroll</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                You saved that amazing pasta recipe on TikTok. Good luck finding it in 3,000 saved videos.
              </p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
              <div className="text-4xl mb-5">📝</div>
              <h3 className="text-xl font-bold mb-3">Manual Ingredient Lists</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Pausing a video 47 times to write down ingredients is not a grocery list.
              </p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
              <div className="text-4xl mb-5">🍳</div>
              <h3 className="text-xl font-bold mb-3">No Way to Actually Cook</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Social media shows you what to cook. It never helps you actually cook it.
              </p>
            </div>
          </div>

          <p className="text-center mt-12 text-lg font-medium text-neutral-500 dark:text-neutral-400">
            Flav fixes all three. Here&apos;s how &darr;
          </p>
        </div>
      </section>

      {/* Import Demo Section */}
      <section className="py-12 md:py-24 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              The magic is in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Import.</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Stop manually writing down ingredients. Use our AI to instantly convert any social media video into a structured, cookable recipe.
            </p>
          </div>
          <ImportDemo />
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="section bg-neutral-50 dark:bg-neutral-900/50" id="features">
        <div className="container-main">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Everything you need to <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">cook confidently</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              From the first spark of inspiration to the final garnish—Flav is your sous-chef for every step of the journey.
            </p>
          </div>

          <div className="space-y-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white dark:bg-neutral-900 rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-neutral-100 dark:border-neutral-800 transition-all duration-500 hover:shadow-xl hover:border-[var(--color-primary-100)] dark:hover:border-[#E07A5F]/20 overflow-hidden relative`}
              >
                <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  {/* Phone mockup */}
                  <div className={`flex justify-center relative ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    {/* Blob behind phone */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${index === 0 ? 'bg-[var(--color-primary-200)] dark:bg-[#E07A5F]/25' :
                      index === 1 ? 'bg-green-200 dark:bg-green-900/40' :
                        'bg-blue-200 dark:bg-blue-900/40'
                      }`} />

                    <div className="relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500">
                      <IPhoneMockup
                        src={feature.screenshot}
                        alt={`Flav app ${feature.title.toLowerCase()} screenshot showing ${feature.description.split('.')[0].toLowerCase()}`}
                        size="md"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`text-center md:text-left ${index % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className={`inline-flex px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ${index === 0 ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)] dark:bg-[#E07A5F]/15 dark:text-[var(--color-primary-300)]' :
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
                      <Button variant="ghost" className="group/btn text-lg px-0 hover:bg-transparent hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-primary-400)]">
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

      {/* Meal Plan Section */}
      <section className="section bg-white dark:bg-black overflow-hidden relative border-b border-neutral-100 dark:border-neutral-800" id="meal-plan">
        <div className="container-main relative z-10">
          <div className="text-center mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-50)] dark:bg-[#E07A5F]/15 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] text-sm font-semibold mb-6">
              ✨ AI Meal Planning
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Plan your week in <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">seconds.</span>
            </h2>
            <p className="text-xl text-[var(--color-neutral-600)] max-w-2xl mx-auto leading-relaxed">
              Let Flav AI generate the perfect meal plan based on your dietary needs, macros, and preferences. Or simply drag-and-drop your favorite saved recipes.
            </p>
            <p className="text-sm text-[var(--color-neutral-500)] mt-3 flex items-center justify-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--color-primary-50)] dark:bg-[#E07A5F]/15 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] text-xs font-semibold">★ Premium</span>
              Available on Verified & Pro plans
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
            {/* Left Mockup: AI Generation */}
            <div className="flex justify-center md:justify-end relative group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[var(--color-primary-200)] dark:bg-[#E07A5F]/25 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 transform group-hover:scale-[1.02] group-hover:-rotate-2 transition-all duration-500">
                <IPhoneMockup
                  src="/screenshots/meal-plan-generation.webp"
                  alt="Flav AI generating a personalized weekly meal plan based on dietary preferences"
                  size="lg"
                />
              </div>
            </div>

            {/* Right Mockup: Calendar View */}
            <div className="flex justify-center md:justify-start relative group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[var(--color-primary-300)] dark:bg-[#E07A5F]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 transform group-hover:scale-[1.02] group-hover:rotate-2 transition-all duration-500 md:-mt-20">
                <IPhoneMockup
                  src="/screenshots/meal-plan-calendar.webp"
                  alt="Flav weekly meal plan calendar view with scheduled breakfast, lunch, and dinner recipes"
                  size="lg"
                  showBackdrop
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Economy Section - Distinct Dark Glassy Look */}
      <section className="section bg-neutral-900 text-white overflow-hidden relative" id="creators">
        {/* Background gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#E07A5F]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#e8967d]/20 rounded-full blur-[120px]" />
        </div>

        <div className="container-main relative z-10">
          {/* Top: Content + Phone side by side */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-24">
            {/* Left: Phone Mockup */}
            <div className="flex justify-center perspective-1000 order-2 md:order-1">
              <div className="relative transform hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute -inset-8 bg-gradient-to-tr from-[#E07A5F]/30 to-[#e8967d]/20 rounded-[4rem] blur-3xl" />
                <div className="relative drop-shadow-2xl">
                  <IPhoneMockup
                    src="/screenshots/earnings-v3.webp"
                    alt="Flav creator earnings dashboard showing revenue analytics"
                    size="lg"
                    priority={false}
                  />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[var(--color-primary-300)] text-sm font-semibold mb-6 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary-500)] animate-pulse"></span>
                For Creators
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                The only platform where food creators{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-primary-200)]">keep 93%.</span>
              </h2>

              <p className="text-xl text-neutral-300 mb-10 leading-relaxed">
                Instagram pays you nothing. TikTok&apos;s Creator Fund pays pennies. Flav was built to make food creators real money — from day one.
              </p>

              <ul className="space-y-5 mb-10">
                {([
                  { icon: DollarSign, title: "Tips & Premium Recipes", desc: "Fans pay you directly. You keep 90-97%. No middleman." },
                  { icon: Sparkles, title: "Built-in Audience Growth", desc: "Flav's food-first algorithm reaches people who actually cook your recipes." },
                  { icon: BarChart3, title: "Brand Partnerships", desc: "Get matched with food brands for sponsored content. Set your own rates." },
                ] as { icon: LucideIcon; title: string; desc: string }[]).map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <li key={i} className="group flex gap-4 items-start p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-[#E07A5F]/30">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform shrink-0 shadow-lg">
                        <IconComponent className="w-6 h-6 text-[var(--color-primary-400)]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1 text-white">{item.title}</h4>
                        <p className="text-neutral-400 text-base">{item.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/creators">
                  <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-200 border-none w-full sm:w-auto shadow-lg shadow-white/5">
                    Apply as Creator
                  </Button>
                </Link>
                <Link href="/verified">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                    View Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom: Platform Comparison Table */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">How Flav compares</h3>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 text-sm font-semibold text-neutral-400"></th>
                    <th className="p-4 text-sm font-semibold text-neutral-400">Instagram</th>
                    <th className="p-4 text-sm font-semibold text-neutral-400">TikTok</th>
                    <th className="p-4 text-sm font-semibold text-neutral-400">YouTube</th>
                    <th className="p-4 text-sm font-semibold text-[var(--color-primary-400)]">Flav</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-white/5">
                    <td className="p-4 font-medium text-neutral-300">Creator payout</td>
                    <td className="p-4 text-neutral-500">0%</td>
                    <td className="p-4 text-neutral-500">~2-4%</td>
                    <td className="p-4 text-neutral-500">~45%</td>
                    <td className="p-4 font-bold text-[var(--color-primary-400)]">90-97%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 font-medium text-neutral-300">Food-specific algorithm</td>
                    <td className="p-4 text-neutral-500">&#x2717;</td>
                    <td className="p-4 text-neutral-500">&#x2717;</td>
                    <td className="p-4 text-neutral-500">&#x2717;</td>
                    <td className="p-4 font-bold text-[var(--color-primary-400)]">&#x2713;</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 font-medium text-neutral-300">Recipe monetization</td>
                    <td className="p-4 text-neutral-500">&#x2717;</td>
                    <td className="p-4 text-neutral-500">&#x2717;</td>
                    <td className="p-4 text-neutral-500">&#x2717;</td>
                    <td className="p-4 font-bold text-[var(--color-primary-400)]">&#x2713;</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-neutral-300">Built-in cooking tools</td>
                    <td className="p-4 text-neutral-500">&#x2717;</td>
                    <td className="p-4 text-neutral-500">&#x2717;</td>
                    <td className="p-4 text-neutral-500">&#x2717;</td>
                    <td className="p-4 font-bold text-[var(--color-primary-400)]">&#x2713;</td>
                  </tr>
                </tbody>
              </table>
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
            {howItWorks.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="text-center group p-6 rounded-3xl hover:bg-white dark:hover:bg-neutral-800/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E07A5F]/10 to-[#e8967d]/10 rounded-2xl" />
                    <IconComponent className="w-10 h-10 text-[var(--color-primary-500)] relative z-10" />
                  </div>
                  <div className="text-sm font-bold text-[var(--color-primary-500)] mb-2 uppercase tracking-wide">Step {item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-[var(--color-neutral-600)] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
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
                  src="/images/advertiser-dashboard.webp"
                  alt="Flav advertiser analytics dashboard showing impressions, clicks, and campaign performance"
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
      <section className="section bg-gradient-to-br from-[#E07A5F] to-[#e8967d] text-white overflow-hidden py-32 md:py-40 relative" id="download">
        <div className="container-main relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Ready to cook?
          </h2>
          <p className="text-xl md:text-2xl text-[var(--color-primary-50)] mb-12 max-w-2xl mx-auto font-medium">
            Join the waitlist and be first in line when we launch.
          </p>
          <div className="flex justify-center max-w-md mx-auto">
            <WaitlistForm className="w-full [&_form_.absolute]:!bg-gradient-to-r [&_form_.absolute]:!from-white/30 [&_form_.absolute]:!via-white/20 [&_form_.absolute]:!to-white/30" />
          </div>
          <p className="text-sm text-white/70 mt-6 font-medium">
            Free to join. No credit card required.
          </p>
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
              "alternateName": "Flav — Cook Anything. Ask Anything.",
              "applicationCategory": "LifestyleApplication",
              "applicationSubCategory": "CookingApplication",
              "operatingSystem": "iOS, Android",
              "description": "Flav is the #1 short-form video cooking app. Discover recipes through swipeable videos, cook with an AI sous-chef, import recipes from TikTok and Instagram in under 10 seconds, and earn 90–97% of revenue as a food creator.",
              "offers": [
                {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "description": "Free tier with unlimited recipe discovery, cooking mode, and AI assistant"
                },
                {
                  "@type": "Offer",
                  "price": "7.99",
                  "priceCurrency": "USD",
                  "description": "Verified tier with monetization, verified badge, and 90% payout rate",
                  "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "7.99",
                    "priceCurrency": "USD",
                    "billingDuration": "P1M"
                  }
                },
                {
                  "@type": "Offer",
                  "price": "19.99",
                  "priceCurrency": "USD",
                  "description": "Pro tier with 97% payout rate, priority support, and all Verified benefits",
                  "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "19.99",
                    "priceCurrency": "USD",
                    "billingDuration": "P1M"
                  }
                }
              ],
              "featureList": [
                "AI Cooking Assistant (Flav AI)",
                "Step-by-step Cooking Mode with Timers",
                "AI Recipe Import from TikTok and Instagram",
                "Creator Monetization (90–97% payout)",
                "Personalized Recipe Discovery Feed",
                "Ingredient Checklists and Portion Scaling"
              ],
              "screenshot": "https://flav.app/screenshots/home-feed-v5.webp",
              "downloadUrl": "https://flav.app/download"
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Flav",
              "legalName": "Tig Tech LLC",
              "url": "https://flav.app",
              "logo": "https://flav.app/logo.png",
              "foundingDate": "2025",
              "description": "Flav is the short-form video platform purpose-built for food lovers and food creators, combining recipe discovery, AI cooking assistance, and direct-to-creator monetization.",
              "sameAs": [
                "https://twitter.com/cookwithflav",
                "https://instagram.com/cookwithflav",
                "https://tiktok.com/@cookwithflav",
                "https://linkedin.com/company/flav-app"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@flav.app",
                "contactType": "customer service",
                "availableLanguage": "English"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Flav",
              "url": "https://flav.app",
              "description": "The #1 short-form video app for food lovers. Discover recipes, cook with AI assistance, and earn money as a food creator.",
              "publisher": {
                "@type": "Organization",
                "name": "Tig Tech LLC"
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

      {/* Sticky mobile CTA bar */}
      <StickyMobileCTA />
    </>
  );
}
