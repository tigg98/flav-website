import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/flav/JsonLd";
import { LinkForm } from "@/components/flav/LinkForm";
import { FLAV, appStoreUrl } from "@/lib/flav-config";
import { formatMonthYear, getAllGuides, getGuide, getNextGuides } from "@/lib/guides";
import "../../../styles/flav-prose.css";

const BASE = "https://flav.app";
const PLAIN_APP_STORE_HREF = `href="https://apps.apple.com/us/app/flav/id${FLAV.appStoreId}"`;

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const guide = getGuide(slug);
    if (!guide) return {};
    const url = `${BASE}/guides/${guide.slug}`;
    return {
        title: guide.title,
        description: guide.description,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            siteName: "Flav",
            title: guide.title,
            description: guide.description,
            publishedTime: guide.date,
            modifiedTime: guide.dateModified,
            images: [{ url: "/og-image.png", width: 1200, height: 630 }],
        },
        // Guides with an open CONFIRM note stay out of search until the founder clears it.
        robots: guide.unconfirmed ? { index: false, follow: true } : undefined,
    };
}

function escapeAttr(value: string): string {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/** Splits rendered HTML just before its second <h2>, so the try card sits after the first section. */
function splitAtSecondH2(html: string): [string, string] {
    const first = html.indexOf("<h2");
    const second = first < 0 ? -1 : html.indexOf("<h2", first + 3);
    if (second < 0) return [html, ""];
    return [html.slice(0, second), html.slice(second)];
}

export default async function GuidePage({ params }: Props) {
    const { slug } = await params;
    const guide = getGuide(slug);
    if (!guide) notFound();

    const url = `${BASE}/guides/${guide.slug}`;
    const campaign = `web-guide-${guide.slug}`;
    const storeUrl = appStoreUrl(campaign);
    // Plain App Store links in the copy get this page's campaign token.
    const body = guide.bodyHtml.split(PLAIN_APP_STORE_HREF).join(`href="${escapeAttr(storeUrl)}"`);
    const [beforeTry, afterTry] = splitAtSecondH2(body);
    const next = getNextGuides(guide.slug, 3);
    const updated = formatMonthYear(guide.dateModified);

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": `${url}#article`,
                headline: guide.title,
                description: guide.description,
                url,
                mainEntityOfPage: url,
                image: `${BASE}/og-image.png`,
                datePublished: guide.date,
                dateModified: guide.dateModified,
                inLanguage: "en",
                author: { "@type": "Organization", name: "Flav", url: `${BASE}/` },
                publisher: {
                    "@type": "Organization",
                    name: "Flav",
                    url: `${BASE}/`,
                    logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
                },
            },
            {
                "@type": "FAQPage",
                "@id": `${url}#faq`,
                mainEntity: guide.faq.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.aText },
                })),
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${url}#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
                    { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` },
                    { "@type": "ListItem", position: 3, name: guide.title, item: url },
                ],
            },
        ],
    };

    return (
        <div className="fl-page">
            <JsonLd data={jsonLd} />
            <article className="fl-article flex flex-col gap-7 pt-[72px] pb-24">
                <Link href="/guides" className="fl-guide-back">
                    Guides
                </Link>
                <h1 className="fl-h1 fl-guide-h1">{guide.title}</h1>
                <span className="fl-guide-meta">
                    {updated ? `Updated ${updated} · ` : ""}
                    {guide.readMinutes} minute read
                </span>

                {guide.shortAnswerHtml ? (
                    <section aria-labelledby="short-h" className="fl-card flex flex-col gap-2.5 p-6">
                        <h2 id="short-h" className="fl-micro m-0">
                            The short answer
                        </h2>
                        <p className="fl-guide-short" dangerouslySetInnerHTML={{ __html: guide.shortAnswerHtml }} />
                    </section>
                ) : null}

                <div className="fl-prose" dangerouslySetInnerHTML={{ __html: beforeTry }} />

                <aside aria-label="Try Flav" className="fl-card-hero fl-guide-try flex flex-col gap-3.5 p-6">
                    <span className="text-[17px] font-extrabold tracking-[-0.03em]">
                        Try it with the video you&apos;re thinking of
                    </span>
                    <LinkForm id="guide-link" placeholder="Paste a TikTok link" />
                </aside>

                {afterTry ? <div className="fl-prose" dangerouslySetInnerHTML={{ __html: afterTry }} /> : null}

                {guide.faq.length > 0 ? (
                    <section aria-labelledby="gfaq-h" className="mt-4 flex flex-col gap-4">
                        <h2 id="gfaq-h" className="fl-title">
                            Questions
                        </h2>
                        <div className="fl-card fl-faq px-6 py-1">
                            {guide.faq.map((f) => (
                                <details key={f.q}>
                                    <summary>{f.q}</summary>
                                    <p dangerouslySetInnerHTML={{ __html: f.aHtml }} />
                                </details>
                            ))}
                        </div>
                    </section>
                ) : null}

                {next.length > 0 ? (
                    <section aria-labelledby="rel-h" className="mt-4 flex flex-col gap-3">
                        <h2 id="rel-h" className="fl-micro m-0">
                            Next questions
                        </h2>
                        {next.map((g) => (
                            <Link key={g.slug} href={`/guides/${g.slug}`} className="fl-link self-start text-[17px]">
                                {g.title}
                            </Link>
                        ))}
                    </section>
                ) : null}

                <section
                    aria-labelledby="app-cta-h"
                    className="fl-card-hero mt-4 flex flex-wrap items-center justify-between gap-5 p-8"
                >
                    <div className="flex max-w-[560px] flex-col gap-1.5">
                        <h2 id="app-cta-h" className="fl-heading">
                            Keep the recipe, not just the video.
                        </h2>
                        <p className="fl-body">
                            Flav is free on iPhone for {FLAV.freeImportsPerMonth} imports a month. Share a TikTok or a
                            Reel and get the ingredients, steps and timers in your cookbook.
                        </p>
                    </div>
                    <a href={storeUrl} className="fl-btn fl-btn-ink">
                        Get the app
                    </a>
                </section>
            </article>
        </div>
    );
}
