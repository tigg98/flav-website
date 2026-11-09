import type { Metadata } from "next";
import Link from "next/link";
import { LinkForm } from "@/components/flav/LinkForm";
import { PhoneRecipe } from "@/components/flav/PhoneRecipe";
import { JsonLd } from "@/components/flav/JsonLd";
import { FLAV, appStoreUrl } from "@/lib/flav-config";

export const metadata: Metadata = {
    title: { absolute: "Flav: any cooking video, written down" },
    description:
        "Share a TikTok or an Instagram Reel to Flav and get the ingredients, steps and timers in your own cookbook, then cook it hands free. Free on iPhone for 10 recipes a month.",
    alternates: { canonical: "https://flav.app" },
};

const steps = [
    {
        label: "1 · Share",
        title: "Tap Share on TikTok, then Flav.",
        body: "Or paste the link. Instagram Reels and recipe websites work the same way.",
    },
    {
        label: "2 · Read",
        title: "The recipe writes itself out.",
        body: "Ingredients with amounts, steps in order, timers where the video says how long. Usually a few seconds.",
    },
    {
        label: "3 · Cook",
        title: "One step at a time, hands free.",
        body: "Big type, a timer that follows you to the Lock Screen, and no pausing a video with flour on your hands.",
    },
];

const keepers = [
    ["Cookbook", "Every recipe you save, newest first, searchable."],
    ["Grocery list", "Add a recipe's ingredients in one tap."],
    ["Plan the week", "Drop saved recipes onto days. Flav+ can fill the week for you."],
    ["Household", "Share the cookbook and the list with the people you cook for."],
];

const faqs = [
    {
        q: "Does it work if the recipe isn't written in the caption?",
        a: "Flav reads the caption and the video's page. If the creator only says the recipe out loud, you may get a partial recipe that you can finish by hand. Reading the video itself is coming next.",
    },
    {
        q: "Is my cookbook public?",
        a: "No. Everything you save is private to you and anyone you share your household with.",
    },
    {
        q: "Which links work?",
        a: "Public TikTok videos, Instagram Reels and posts, and recipe websites.",
    },
    {
        q: "Is there an Android app?",
        a: "Not yet. Flav is iPhone only for now.",
    },
    {
        q: "How do I cancel Flav+?",
        a: "On your iPhone open Settings, tap your name, then Subscriptions, then Flav. You keep Flav+ until the end of the period you paid for.",
    },
];

const guides = [
    {
        href: "/guides/how-to-save-a-recipe-from-tiktok",
        title: "How do I save a recipe from TikTok?",
        sum: "Favorites, screenshots, and the way that keeps the ingredients.",
    },
    {
        href: "/guides/tiktok-recipe-not-in-caption",
        title: "The recipe isn't in the caption. Now what?",
        sum: "Where creators usually put it, and what Flav can and can't read.",
    },
    {
        href: "/guides/what-app-saves-recipes-from-tiktok",
        title: "What app saves recipes from TikTok?",
        sum: "The options compared side by side. Checked November 2026.",
    },
];

export default function HomePage() {
    return (
        <div className="fl-page">
            {/* Hero */}
            <section aria-labelledby="hero-h" className="fl-wrap" style={{ paddingTop: 88, paddingBottom: 112, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 64 }}>
                <div style={{ flex: "1 1 520px", minWidth: 0, display: "flex", flexDirection: "column", gap: 28 }}>
                    <span className="fl-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--fl-ink-2)" }}>
                        <span className="fl-dot-inline" aria-hidden="true" />
                        TikTok and Instagram, to recipe
                    </span>
                    <h1 id="hero-h" className="fl-display">Any cooking video, written down.</h1>
                    <p className="fl-lead" style={{ maxWidth: 520, fontSize: 19, lineHeight: "28px" }}>
                        Share a TikTok or a Reel to Flav. It writes the ingredients, the steps and the timers, keeps them in your cookbook, and walks you through them while you cook.
                    </p>
                    <div style={{ maxWidth: 540 }}>
                        <LinkForm id="hero-link" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", fontSize: 13, fontWeight: 600, color: "var(--fl-muted)" }}>
                        <span>Try it here, no app needed</span>
                        <span aria-hidden="true" className="fl-hide-sm">·</span>
                        <span>Free for {FLAV.freeImportsPerMonth} recipes a month</span>
                        <span aria-hidden="true" className="fl-hide-sm">·</span>
                        <span>iPhone, Watch and Lock Screen</span>
                    </div>
                </div>
                <div style={{ flex: "0 1 400px", minWidth: 0, display: "flex", justifyContent: "center" }}>
                    <PhoneRecipe />
                </div>
            </section>

            {/* How it works */}
            <section id="how" aria-labelledby="how-h" className="fl-wrap" style={{ paddingTop: 24, paddingBottom: 112, scrollMarginTop: 24 }}>
                <span className="fl-eyebrow">How it works</span>
                <h2 id="how-h" className="fl-h2" style={{ margin: "14px 0 48px", maxWidth: 720 }}>
                    Share it, read it, cook it.
                </h2>
                <div className="fl-line" aria-hidden="true" style={{ marginBottom: 28 }}>
                    <div className="fl-line-track" />
                    <div className="fl-line-fill" style={{ width: "50%" }} />
                    <div className="fl-tick fl-tick-done" style={{ left: 4 }} />
                    <div className="fl-dot" style={{ left: "50%" }} />
                    <div className="fl-tick" style={{ left: "calc(100% - 4px)" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
                    {steps.map((s) => (
                        <div key={s.label} className="fl-card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                            <span className="fl-micro">{s.label}</span>
                            <h3 className="fl-heading">{s.title}</h3>
                            <p className="fl-body">{s.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Cookbook */}
            <section aria-labelledby="keep-h" className="fl-wrap" style={{ paddingBottom: 112, display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
                <div style={{ flex: "1 1 360px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                    <span className="fl-eyebrow">Your cookbook</span>
                    <h2 id="keep-h" className="fl-h2">Keep it forever. Private by default.</h2>
                    <p className="fl-lead" style={{ maxWidth: 440, fontSize: 17, lineHeight: "26px" }}>
                        Videos get deleted and Favorites get buried. A recipe in Flav stays where you put it, credited to the video it came from.
                    </p>
                </div>
                <div style={{ flex: "2 1 560px", minWidth: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                    {keepers.map(([t, b]) => (
                        <div key={t} className="fl-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                            <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-.03em" }}>{t}</span>
                            <span className="fl-body">{b}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Kitchen: Cook Mode */}
            <section aria-labelledby="kitchen-h" className="fl-kitchen">
                <div className="fl-wrap" style={{ paddingTop: 112, paddingBottom: 112, display: "flex", flexWrap: "wrap", gap: 64, alignItems: "center" }}>
                    <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                        <span className="fl-eyebrow">Cook Mode</span>
                        <h2 id="kitchen-h" className="fl-h2">Made for the counter, not the couch.</h2>
                        <p className="fl-lead" style={{ maxWidth: 460, fontSize: 17, lineHeight: "26px", color: "var(--fl-ink-2)" }}>
                            Say &ldquo;next&rdquo;, &ldquo;back&rdquo; or &ldquo;repeat&rdquo;. Timers start from the step and keep running on your Lock Screen and Apple Watch, so the phone can stay where it is.
                        </p>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                            {["Voice steps", "Live Activity", "Apple Watch", "Screen stays on"].map((c) => (
                                <span key={c} className="fl-chip">{c}</span>
                            ))}
                        </div>
                    </div>
                    <div aria-hidden="true" style={{ flex: "1 1 420px", minWidth: 0, maxWidth: 460, display: "flex", flexDirection: "column", gap: 18 }}>
                        <div className="fl-micro" style={{ display: "flex", justifyContent: "space-between", color: "var(--fl-muted-2)" }}>
                            <span>Step 3 of 7</span>
                            <span>Mixing</span>
                        </div>
                        <div className="fl-line">
                            <div className="fl-line-track" />
                            <div className="fl-line-fill" style={{ width: "33%" }} />
                            <div className="fl-dot" style={{ left: "33%" }} />
                        </div>
                        <span style={{ fontSize: 30, lineHeight: "36px", fontWeight: 800, letterSpacing: "-.045em" }}>
                            Beat the butter and sugar until pale and fluffy, <span style={{ color: "var(--fl-ember)" }}>about 3 minutes.</span>
                        </span>
                        <div className="fl-card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 18 }}>
                            <div style={{ position: "relative", width: 104, height: 104, flex: "0 0 auto" }}>
                                <svg width="104" height="104" viewBox="0 0 104 104" style={{ transform: "rotate(-90deg)" }}>
                                    <circle cx="52" cy="52" r="45" fill="none" stroke="var(--fl-track)" strokeWidth="7" />
                                    <circle cx="52" cy="52" r="45" fill="none" stroke="var(--fl-ember)" strokeWidth="7" strokeLinecap="round" pathLength={100} strokeDasharray="100" style={{ animation: "fl-ring 180s linear infinite" }} />
                                </svg>
                                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                    <span className="fl-num" style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.05em" }}>2:41</span>
                                    <span className="fl-micro" style={{ fontSize: 10 }}>Left</span>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-.03em" }}>Mixer timer</span>
                                <span className="fl-body" style={{ fontSize: 13 }}>On your Lock Screen and Watch</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flav+ */}
            <section aria-labelledby="plus-h" className="fl-wrap" style={{ paddingTop: 112, paddingBottom: 112, display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
                <div style={{ flex: "1 1 380px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                    <span className="fl-badge" style={{ alignSelf: "flex-start" }}>FLAV+</span>
                    <h2 id="plus-h" className="fl-h2">Free for {FLAV.freeImportsPerMonth} recipes a month. Flav+ when you want more.</h2>
                    <p className="fl-lead" style={{ maxWidth: 460, fontSize: 17, lineHeight: "26px" }}>
                        Your cookbook, Cook Mode and grocery list are free. Flav+ removes the monthly limit and plans your week.
                    </p>
                    <Link href="/pricing" className="fl-link" style={{ alignSelf: "flex-start", fontSize: 15 }}>
                        Compare plans
                    </Link>
                </div>
                <div className="fl-card-hero fl-rows" style={{ flex: "1 1 460px", minWidth: 0, padding: "12px 28px 20px", display: "flex", flexDirection: "column" }}>
                    {[
                        ["Monthly", FLAV.prices.monthly],
                        ["Yearly", FLAV.prices.yearly],
                        ["Once, for good", FLAV.prices.lifetime],
                    ].map(([label, price]) => (
                        <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0" }}>
                            <span style={{ fontSize: 17, fontWeight: 700 }}>{label}</span>
                            <span className="fl-num" style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.04em" }}>{price}</span>
                        </div>
                    ))}
                    <span className="fl-body" style={{ fontSize: 13, paddingTop: 12 }}>
                        US prices. Bought and managed in the app through Apple.
                    </span>
                </div>
            </section>

            {/* Guides */}
            <section aria-labelledby="guides-h" className="fl-wrap" style={{ paddingBottom: 112 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
                    <h2 id="guides-h" className="fl-title">Questions people ask us</h2>
                    <Link href="/guides" className="fl-link" style={{ fontSize: 15 }}>
                        All guides
                    </Link>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                    {guides.map((g) => (
                        <Link key={g.href} href={g.href} className="fl-card" style={{ textDecoration: "none", color: "var(--fl-ink)", padding: 24, display: "flex", flexDirection: "column", gap: 10, minHeight: 150 }}>
                            <span style={{ fontSize: 19, lineHeight: "24px", fontWeight: 800, letterSpacing: "-.035em" }}>{g.title}</span>
                            <span className="fl-body" style={{ fontSize: 14, lineHeight: "20px" }}>{g.sum}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" aria-labelledby="faq-h" style={{ maxWidth: 880, margin: "0 auto", padding: "0 32px 112px" }}>
                <h2 id="faq-h" className="fl-title" style={{ marginBottom: 24 }}>
                    Good questions
                </h2>
                <div className="fl-card fl-faq" style={{ padding: "4px 24px" }}>
                    {faqs.map((f) => (
                        <details key={f.q}>
                            <summary>{f.q}</summary>
                            <p>{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section aria-labelledby="get-h" className="fl-wrap" style={{ paddingBottom: 96 }}>
                <div className="fl-card-hero" style={{ padding: "clamp(32px, 6vw, 72px)", display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between" }}>
                    <h2 id="get-h" className="fl-h2" style={{ maxWidth: 620, fontSize: "clamp(32px, 4vw, 52px)" }}>
                        That video you saved last week. Cook it tonight.
                    </h2>
                    <a href={appStoreUrl("web-home-cta")} className="fl-btn fl-btn-ink">
                        Download on the App Store
                    </a>
                </div>
            </section>

            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "SoftwareApplication",
                            name: "Flav",
                            applicationCategory: "LifestyleApplication",
                            operatingSystem: "iOS",
                            description:
                                "Flav turns TikTok, Instagram and web cooking videos into recipes: ingredients, steps and timers in your own cookbook, then hands-free Cook Mode.",
                            url: "https://flav.app",
                            installUrl: appStoreUrl(),
                            offers: [
                                { "@type": "Offer", price: "0", priceCurrency: "USD", description: `Free: ${FLAV.freeImportsPerMonth} recipe imports a month, cookbook, grocery list and Cook Mode` },
                                { "@type": "Offer", price: FLAV.priceNumbers.monthly, priceCurrency: "USD", description: "Flav+ monthly" },
                                { "@type": "Offer", price: FLAV.priceNumbers.yearly, priceCurrency: "USD", description: "Flav+ yearly" },
                                { "@type": "Offer", price: FLAV.priceNumbers.lifetime, priceCurrency: "USD", description: "Flav+ lifetime, one purchase" },
                            ],
                        },
                        {
                            "@type": "Organization",
                            name: "Flav",
                            legalName: "Tig Tech LLC",
                            url: "https://flav.app",
                            logo: "https://flav.app/logo.png",
                            sameAs: ["https://instagram.com/cookwithflav", "https://tiktok.com/@cookwithflav"],
                            contactPoint: { "@type": "ContactPoint", email: FLAV.supportEmail, contactType: "customer service" },
                        },
                        { "@type": "WebSite", name: "Flav", url: "https://flav.app" },
                        {
                            "@type": "FAQPage",
                            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
                        },
                    ],
                }}
            />
        </div>
    );
}
