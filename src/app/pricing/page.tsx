import type { Metadata } from "next";
import { JsonLd } from "@/components/flav/JsonLd";
import { FLAV, appStoreUrl } from "@/lib/flav-config";

export const metadata: Metadata = {
    title: "Pricing",
    description: `Flav is free on iPhone for ${FLAV.freeImportsPerMonth} recipes a month. Flav+ is ${FLAV.prices.monthly} a month, ${FLAV.prices.yearly} a year or ${FLAV.prices.lifetime} once, with no monthly limit.`,
    alternates: { canonical: "https://flav.app/pricing" },
    openGraph: {
        title: "Flav pricing",
        description: `Free for ${FLAV.freeImportsPerMonth} recipes a month. Flav+ when you want more.`,
    },
};

const free = [
    `${FLAV.freeImportsPerMonth} recipe imports a month`,
    "Cookbook, private by default",
    "Cook Mode, timers, Lock Screen and Watch",
    "Grocery list",
];

const plus = [
    "Everything in Free",
    "No monthly import limit",
    "Plan the week from your cookbook",
    "More questions to Ask Flav while you cook",
];

const faqs = [
    { q: "What counts as an import?", a: "Each video or recipe link Flav reads for you." },
    { q: "What happens at ten?", a: "Everything you saved stays. New imports open up again next month, or straight away with Flav+." },
    { q: "How do I cancel?", a: "Flav+ is billed by Apple. On your iPhone open Settings, tap your name, then Subscriptions, then Flav. You keep Flav+ until the end of the period you paid for." },
];

function List({ items }: { items: string[] }) {
    return (
        <ul className="fl-rows" style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column" }}>
            {items.map((i) => (
                <li key={i} style={{ padding: "12px 0", fontSize: 15, fontWeight: 500, color: "var(--fl-ink-2)" }}>
                    {i}
                </li>
            ))}
        </ul>
    );
}

export default function PricingPage() {
    return (
        <div className="fl-page">
            <div className="fl-narrow" style={{ paddingTop: 88, paddingBottom: 96, display: "flex", flexDirection: "column", gap: 48 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 640 }}>
                    <h1 className="fl-h1">Cook from your feed for free.</h1>
                    <p className="fl-lead">
                        The cookbook, Cook Mode and grocery list cost nothing. Flav+ is for when {FLAV.freeImportsPerMonth} recipes a month isn&apos;t enough.
                    </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "stretch" }}>
                    <section aria-labelledby="free-h" className="fl-card-hero" style={{ flex: "1 1 300px", minWidth: 0, padding: 32, display: "flex", flexDirection: "column", gap: 20, boxShadow: "var(--fl-shadow-card)" }}>
                        <h2 id="free-h" className="fl-heading">Free</h2>
                        <span className="fl-num" style={{ fontSize: 44, lineHeight: 1, fontWeight: 800, letterSpacing: "-.05em" }}>$0</span>
                        <List items={free} />
                        <a href={appStoreUrl("web-pricing-free")} className="fl-btn fl-btn-soft" style={{ marginTop: "auto" }}>
                            Download free
                        </a>
                    </section>

                    <section aria-labelledby="plus-h" className="fl-card-hero" style={{ flex: "1.3 1 380px", minWidth: 0, padding: 32, display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <h2 id="plus-h" className="fl-heading">Flav+</h2>
                            <span className="fl-badge">FLAV+</span>
                        </div>
                        <div className="fl-rows" style={{ display: "flex", flexDirection: "column" }}>
                            {[
                                ["Monthly", FLAV.prices.monthly],
                                ["Yearly", FLAV.prices.yearly],
                                ["Once, for good", FLAV.prices.lifetime],
                            ].map(([label, price]) => (
                                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "12px 0" }}>
                                    <span style={{ fontSize: 15, fontWeight: 700 }}>{label}</span>
                                    <span className="fl-num" style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.05em" }}>{price}</span>
                                </div>
                            ))}
                        </div>
                        <List items={plus} />
                        <a href={appStoreUrl("web-pricing-plus")} className="fl-btn fl-btn-ink" style={{ marginTop: "auto" }}>
                            Get Flav+ in the app
                        </a>
                    </section>
                </div>

                <p className="fl-body" style={{ fontSize: 13, lineHeight: "20px", maxWidth: 680 }}>
                    US prices; other countries see local prices in the App Store. Flav+ is bought and managed through Apple.
                </p>

                <section aria-labelledby="pfaq-h" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <h2 id="pfaq-h" className="fl-title">About the limit</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                        {faqs.map((f) => (
                            <div key={f.q} className="fl-card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                                <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-.03em" }}>{f.q}</span>
                                <span className="fl-body">{f.a}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
                }}
            />
        </div>
    );
}
