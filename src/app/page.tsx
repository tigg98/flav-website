import Link from "next/link";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";
import { ScrollToButton } from "@/components/ui/ScrollToButton";
import { ImportDemo } from "@/components/marketing/ImportDemo";
import { FlavPlusPricing } from "@/components/marketing/FlavPlusPricing";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";
import { SHOW_FLAV_PLUS } from "@/lib/flags";
import {
  Link2,
  Sparkles,
  ChefHat,
  Timer,
  CalendarRange,
  ShoppingCart,
  ScanLine,
  BadgeCheck,
  BarChart3,
  HandCoins,
  type LucideIcon,
} from "lucide-react";

const APP_STORE_URL = "https://apps.apple.com/us/app/flav/id6759994122";

const howItWorks: { step: string; title: string; description: string; icon: LucideIcon }[] = [
  {
    step: "01",
    title: "Paste a link",
    description:
      "Copy any TikTok, Instagram, or web recipe link and drop it into Flav.",
    icon: Link2,
  },
  {
    step: "02",
    title: "AI extracts the recipe",
    description:
      "Ingredients, steps, times, and nutrition — structured in about 10 seconds.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Cook hands-free",
    description:
      "Step-by-step Cook Mode with built-in timers, so your phone stays clean.",
    icon: ChefHat,
  },
];

const features: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Cook Mode",
    description:
      "Hands-free, step-by-step guidance with built-in timers and ingredient checklists. Never scrub a video with flour on your hands again.",
    icon: Timer,
  },
  {
    title: "AI Meal Planning",
    description:
      "Turn your saved recipes into a weekly plan. Flav balances your week around your tastes, macros, and schedule.",
    icon: CalendarRange,
  },
  {
    title: "Grocery Lists",
    description:
      "One tap turns any recipe — or your whole week — into an organized grocery list, sorted by aisle.",
    icon: ShoppingCart,
  },
  {
    title: "Scan Grandma's Recipe Card",
    description:
      "Snap a photo of a handwritten card or cookbook page and Flav digitizes it into your cookbook, forever.",
    icon: ScanLine,
  },
];

const faqItems = [
  {
    question: "What is Flav?",
    answer:
      "Flav is the recipe layer on top of TikTok and Instagram. It turns the recipe videos you save into a real, organized cookbook — with structured ingredients, steps, timers, grocery lists, and a hands-free Cook Mode. Flav is free to download on iOS, with Android coming soon.",
  },
  {
    question: "Can I import recipes from Instagram or TikTok?",
    answer:
      "Yes. Paste any public TikTok video, Instagram Reel, or web recipe link and Flav's AI converts it into a structured recipe — ingredients, steps, estimated times, and nutrition — in about 10 seconds. The free plan includes 10 AI recipe imports every month.",
  },
  {
    question: "Is Flav free to use?",
    answer:
      "Flav is free to download on iOS. The free plan includes 10 AI recipe imports per month, plus your full cookbook, grocery lists, and the hands-free Cook Mode. Creators can optionally subscribe to Verified ($7.99/month) or Pro ($19.99/month) to unlock monetization, a verified badge, and advanced analytics.",
  },
  {
    question: "How does Cook Mode work?",
    answer:
      "Tap 'Start Cooking' on any recipe and Flav walks you through it one step at a time, with integrated timers, a live ingredient checklist, and portion scaling. You can also ask Flav AI for substitutions, technique tips, or nutrition info without leaving the recipe.",
  },
  {
    question: "Is Flav available on Android?",
    answer:
      "Not yet. Flav is live on iOS today, and Android is next. Join the Android waitlist at flav.app/waitlist and we'll email you the moment it lands on Google Play.",
  },
  {
    question: "How is Flav different from saving recipes on TikTok?",
    answer:
      "TikTok is for watching. Flav is for cooking. We turn any video into a structured recipe with ingredients, steps, timers, and nutrition info — then help you actually cook it with a hands-free cooking mode. No more pausing videos or writing things down.",
  },
  {
    question: "How do creators earn money on Flav?",
    answer:
      "Food creators on Flav earn through direct viewer tips, premium locked recipes, and brand partnerships — keeping up to 93% of revenue, well above the industry average. Every creator also gets a flav.app/@handle page: all their recipes behind one link for their TikTok or Instagram bio. Monetization unlocks at 100 followers, with weekly payouts.",
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
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary-500)]"></span>
                </span>
                Now on the App Store
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                Save any TikTok recipe <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">
                  in 10 seconds.
                </span>
              </h1>

              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
                Paste a link. Get the full recipe — ingredients, steps, timers — in a
                cookbook that&apos;s actually yours. Then cook it hands-free.
              </p>

              <div id="download" className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8 scroll-mt-24">
                <AppStoreButtons size="lg" />
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">✓</div>
                  <span>Free to download</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">✓</div>
                  <span>10 AI imports/month free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs">✓</div>
                  <span>Android coming soon</span>
                </div>
              </div>

              <ScrollToButton
                targetId="how-it-works"
                className="mt-8 flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-[var(--color-primary-500)] transition-colors mx-auto lg:mx-0 cursor-pointer"
              >
                See how it works
                <span className="animate-bounce inline-block">↓</span>
              </ScrollToButton>
            </div>

            {/* Right: Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-20 transform hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#E07A5F]/20 to-[#e8967d]/20 rounded-[3rem] blur-2xl" />
                <IPhoneMockup
                  src="/screenshots/import-recipe-v3.webp"
                  alt="Flav importing a TikTok recipe into a structured, cookable format"
                  size="lg"
                  priority
                />
              </div>

              {/* Floating import chip */}
              <div className="absolute -right-8 top-16 z-30 hidden xl:block animate-float">
                <div className="glass-panel bg-white/90 dark:bg-neutral-900/90 backdrop-blur border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl shadow-xl max-w-[220px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E07A5F] to-[#e8967d] flex items-center justify-center text-white shrink-0">
                      <Link2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Link pasted</div>
                      <div className="text-xs text-neutral-500">Recipe ready in 10s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-y border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="container-main">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-neutral-500 dark:text-neutral-400">
            <span className="text-sm font-medium">TikTok, Instagram &amp; web import</span>
            <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block" />
            <span className="text-sm font-medium">Hands-free Cook Mode</span>
            <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block" />
            <span className="text-sm font-medium">AI meal planning &amp; grocery lists</span>
            <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block" />
            <span className="text-sm font-medium">Free on iOS · Android coming soon</span>
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
            <div className="text-center p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-4xl mb-5">📱</div>
              <h3 className="text-xl font-bold mb-3">Lost in the Scroll</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                You saved that amazing pasta recipe on TikTok. Good luck finding it in 3,000 saved videos.
              </p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-4xl mb-5">📝</div>
              <h3 className="text-xl font-bold mb-3">Manual Ingredient Lists</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Pausing a video 47 times to write down ingredients is not a grocery list.
              </p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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

      {/* How It Works + Import Demo */}
      <section className="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800 scroll-mt-16" id="how-it-works">
        <div className="container-main">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-500)] mb-4">How It Works</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              From feed to fork in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">three steps</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Stop screenshotting recipes. Flav turns any cooking video into something you can actually cook.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 max-w-5xl mx-auto">
            {howItWorks.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative text-center p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E07A5F]/10 to-[#e8967d]/10 mb-6">
                    <IconComponent className="w-8 h-8 text-[var(--color-primary-500)]" />
                  </div>
                  <div className="text-xs font-bold text-[var(--color-primary-500)] mb-2 uppercase tracking-widest">Step {item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Try the import yourself</h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              This is the exact flow inside the app — link in, recipe out.
            </p>
          </div>
          <ImportDemo />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="section" id="features">
        <div className="container-main">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-500)] mb-4">The App</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Everything you need to <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">cook confidently</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              A cookbook that plans your week, writes your grocery list, and coaches you through dinner.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-8 rounded-3xl bg-[var(--background-elevated)] border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:shadow-xl hover:border-[var(--color-primary-200)] dark:hover:border-[#E07A5F]/30 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E07A5F]/10 to-[#e8967d]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-[var(--color-primary-500)]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Cook Mode + Meal Plan showcase */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-8 pb-0 text-center transition-all duration-500 hover:shadow-xl">
              <h3 className="text-lg font-bold mb-1">Cook Mode</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Step-by-step, timers built in</p>
              <div className="flex justify-center transform group-hover:scale-[1.02] transition-transform duration-500">
                <IPhoneMockup
                  src="/screenshots/cooking-mode.webp"
                  alt="Flav Cook Mode guiding a recipe step-by-step with a built-in timer"
                  size="md"
                />
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-8 pb-0 text-center transition-all duration-500 hover:shadow-xl">
              <h3 className="text-lg font-bold mb-1">
                <Link href="/features/meal-plan" className="hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-primary-400)] transition-colors">
                  AI Meal Planning &rarr;
                </Link>
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Your saved recipes, planned for the week</p>
              <div className="flex justify-center transform group-hover:scale-[1.02] transition-transform duration-500">
                <IPhoneMockup
                  src="/screenshots/meal-plan-calendar.webp"
                  alt="Flav AI meal planning calendar built from saved recipes"
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="section bg-[var(--color-neutral-950)] text-white overflow-hidden" id="creators">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-400)] mb-4">For Creators</p>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Your recipes. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">One link.</span>
              </h2>
              <p className="text-lg text-neutral-300 mb-4 leading-relaxed">
                Every Flav creator gets a premium{" "}
                <span className="font-mono text-[var(--color-primary-300)]">flav.app/@handle</span>{" "}
                page — all your recipes behind one link, built for your TikTok and Instagram bio.
              </p>
              <p className="text-neutral-400 mb-8 leading-relaxed">
                Your followers tap once and land on every recipe you&apos;ve ever posted —
                cookable, saveable, and yours.
              </p>

              <ul className="space-y-4 mb-10 text-left max-w-md mx-auto lg:mx-0">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <BadgeCheck className="w-4 h-4 text-[var(--color-primary-400)]" />
                  </div>
                  <div>
                    <span className="font-semibold">Verified badge</span>
                    <span className="text-neutral-400"> — stand out on your profile and bio-link page</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <BarChart3 className="w-4 h-4 text-[var(--color-primary-400)]" />
                  </div>
                  <div>
                    <span className="font-semibold">Audience analytics</span>
                    <span className="text-neutral-400"> — see which recipes people actually cook</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <HandCoins className="w-4 h-4 text-[var(--color-primary-400)]" />
                  </div>
                  <div>
                    <span className="font-semibold">Tips &amp; premium recipes</span>
                    <span className="text-neutral-400"> — keep up to 93% of what you earn</span>
                  </div>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <Button size="lg" asChild>
                  <Link href="/creators">Claim your @handle</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:border-white hover:text-white" asChild>
                  <Link href="/verified">Explore Verified</Link>
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative z-20">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#E07A5F]/25 to-[#e8967d]/15 rounded-[3rem] blur-3xl" />
                <IPhoneMockup
                  src="/screenshots/creator-profile-v3.webp"
                  alt="Flav creator profile page with recipe grid and verified badge"
                  size="md"
                />
              </div>
              {/* Bio-link chip */}
              <div className="absolute -left-4 bottom-16 z-30 hidden xl:block">
                <div className="bg-white/10 backdrop-blur border border-white/15 px-4 py-3 rounded-2xl shadow-xl">
                  <div className="text-xs text-neutral-400 mb-0.5">In your bio</div>
                  <div className="font-mono text-sm font-semibold text-white">flav.app/@yourhandle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flav+ Pricing (behind flag — flips on with v1.1) */}
      {SHOW_FLAV_PLUS && <FlavPlusPricing />}

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
      <section className="section bg-gradient-to-br from-[#E07A5F] to-[#e8967d] text-white overflow-hidden py-32 md:py-40 relative">
        <div className="container-main relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Tonight&apos;s dinner is <br className="hidden md:block" />already in your feed.
          </h2>
          <p className="text-xl md:text-2xl text-[var(--color-primary-50)] mb-12 max-w-2xl mx-auto font-medium">
            Download Flav and turn it into a recipe you&apos;ll actually cook.
          </p>
          <div className="flex justify-center max-w-md mx-auto">
            <AppStoreButtons size="lg" />
          </div>
          <p className="text-sm text-white/70 mt-6 font-medium">
            Free to download · 10 AI imports/month free · Android coming soon
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
              "alternateName": "Flav — Save Any TikTok Recipe in 10 Seconds",
              "applicationCategory": "LifestyleApplication",
              "applicationSubCategory": "CookingApplication",
              "operatingSystem": "iOS",
              "description": "Flav turns TikTok, Instagram, and web recipe videos into an AI-organized cookbook. Paste a link, get the full recipe — ingredients, steps, and timers — then cook hands-free with Cook Mode. Free on iOS with 10 AI recipe imports per month.",
              "offers": [
                {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "description": "Free to download — 10 AI recipe imports per month, full cookbook, grocery lists, and Cook Mode"
                },
                {
                  "@type": "Offer",
                  "price": "7.99",
                  "priceCurrency": "USD",
                  "description": "Verified creator subscription with monetization, verified badge, and analytics",
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
                  "description": "Pro creator subscription with 93% payout rate, priority support, and all Verified benefits",
                  "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "19.99",
                    "priceCurrency": "USD",
                    "billingDuration": "P1M"
                  }
                }
              ],
              "featureList": [
                "AI Recipe Import from TikTok, Instagram, and the web",
                "Step-by-step Cook Mode with Timers",
                "AI Meal Planning",
                "Automatic Grocery Lists",
                "Photo-Scan Handwritten Recipe Cards",
                "Creator Monetization (up to 93% payout)"
              ],
              "screenshot": "https://flav.app/screenshots/home-feed-v5.webp",
              "installUrl": "https://apps.apple.com/us/app/flav/id6759994122",
              "downloadUrl": "https://apps.apple.com/us/app/flav/id6759994122"
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Flav",
              "legalName": "Tig Tech LLC",
              "url": "https://flav.app",
              "logo": "https://flav.app/logo.png",
              "foundingDate": "2025",
              "description": "Flav is the recipe layer on top of social video — turning TikTok and Instagram recipe videos into an organized, cookable cookbook, with monetization tools for food creators.",
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
              "description": "Save any TikTok recipe in 10 seconds. Flav turns recipe videos into an AI-organized cookbook with Cook Mode, meal planning, and grocery lists.",
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
