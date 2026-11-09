import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/flav/JsonLd";
import { appStoreUrl } from "@/lib/flav-config";
import { getAllGuides } from "@/lib/guides";

const BASE = "https://flav.app";
const TITLE = "Guides: saving recipes from TikTok, Reels and Shorts";
const DESCRIPTION =
    "Short answers to the questions people ask when a recipe lives inside a video: saving it, finding it when it isn't in the caption, cooking from it and shopping for it.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${BASE}/guides` },
    openGraph: {
        type: "website",
        url: `${BASE}/guides`,
        siteName: "Flav",
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
};

export default function GuidesIndexPage() {
    const guides = getAllGuides();

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": `${BASE}/guides#page`,
                name: "Flav guides",
                description: DESCRIPTION,
                url: `${BASE}/guides`,
                inLanguage: "en",
                publisher: { "@type": "Organization", name: "Flav", url: `${BASE}/` },
                mainEntity: {
                    "@type": "ItemList",
                    itemListElement: guides.map((g, i) => ({
                        "@type": "ListItem",
                        position: i + 1,
                        name: g.title,
                        url: `${BASE}/guides/${g.slug}`,
                    })),
                },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
                    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` },
                ],
            },
        ],
    };

    return (
        <div className="fl-page">
            <JsonLd data={jsonLd} />
            <div className="fl-narrow flex flex-col gap-10 pt-[88px] pb-24">
                <div className="flex max-w-[680px] flex-col gap-4">
                    <h1 className="fl-h1">Guides</h1>
                    <p className="fl-lead">
                        Short answers to the questions people ask when a recipe lives inside a video.
                    </p>
                </div>

                {guides.length > 0 ? (
                    <ul className="fl-card fl-rows m-0 flex list-none flex-col rounded-[var(--fl-radius-xl)] px-7 py-2" aria-label="All guides">
                        {guides.map((g) => (
                            <li key={g.slug}>
                                <Link
                                    href={`/guides/${g.slug}`}
                                    className="flex items-center justify-between gap-6 py-[22px] text-[var(--fl-ink)] no-underline hover:text-[var(--fl-ink-2)]"
                                >
                                    <span className="flex min-w-0 flex-col gap-1.5">
                                        <span className="text-[19px] leading-6 font-extrabold tracking-[-0.035em]">
                                            {g.title}
                                        </span>
                                        <span className="text-sm leading-5 font-medium text-[var(--fl-muted)]">
                                            {g.description}
                                        </span>
                                    </span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        fill="none"
                                        stroke="var(--fl-muted)"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="flex-none"
                                    >
                                        <path d="M9 6l6 6-6 6" />
                                    </svg>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : null}

                <section
                    aria-labelledby="g-cta"
                    className="fl-card-hero flex flex-wrap items-center justify-between gap-5 p-8"
                >
                    <div className="flex max-w-[560px] flex-col gap-1.5">
                        <h2 id="g-cta" className="fl-heading">
                            Flav writes the recipe down for you.
                        </h2>
                        <p className="fl-body">
                            Share a TikTok or a Reel to Flav and get the ingredients, steps and timers in your
                            cookbook.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/try" className="fl-btn fl-btn-ink">
                            Try it on a link
                        </Link>
                        <a href={appStoreUrl("web-guides")} className="fl-btn fl-btn-soft">
                            Get the app
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
