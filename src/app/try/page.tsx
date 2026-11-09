import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JsonLd } from "@/components/flav/JsonLd";
import { LinkForm } from "@/components/flav/LinkForm";
import { FLAV } from "@/lib/flav-config";
import { TryClient } from "./TryClient";

const TITLE = "Try Flav on any cooking video";
const DESCRIPTION =
    "Paste a TikTok, Instagram Reel or recipe page link and see the ingredients and steps Flav pulls from it. Free on the web, 3 tries a day, nothing saved to an account.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: "https://flav.app/try" },
    openGraph: {
        type: "website",
        url: "https://flav.app/try",
        siteName: "Flav",
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Flav turns cooking videos into recipes" }],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.png"] },
};

const FAQ = [
    {
        q: "Does this save anything?",
        a: "Nothing is saved to an account or published. The recipe shows in your browser and stays credited to the video. To answer repeat links quickly we keep the pulled recipe for that link for seven days, and to count your daily tries we keep a one-way hash of your connection, never the address itself.",
    },
    {
        q: "Why only 3 a day?",
        a: `Each try opens the video or page and sometimes runs an AI model, which costs us money, so the web version is kept small. The Flav app gives you ${FLAV.freeImportsPerMonth} recipes a month free, and you can share a video straight to it.`,
    },
    {
        q: "What if the recipe is spoken, not written?",
        a: "The web version reads the caption or the page, so it cannot pull a recipe that is only said out loud. Check the creator's pinned comment or the link in their bio, and paste that link instead.",
    },
];

export default function TryPage() {
    const enabled = process.env.TRY_ENABLED !== "false";
    return (
        <div className="fl-page">
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: FAQ.map((f) => ({
                        "@type": "Question",
                        name: f.q,
                        acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                }}
            />
            <div className="fl-narrow flex flex-col gap-7 pt-18 pb-24">
                <h1 className="fl-h1">Try it on any cooking video.</h1>
                <Suspense
                    fallback={
                        <>
                            <LinkForm id="try-link" placeholder="Paste a TikTok, Reel or recipe link" />
                            <p className="m-0 text-[13px] font-medium" style={{ color: "var(--fl-muted)" }}>
                                3 free tries a day on the web. Nothing here is saved to an account or published; the recipe stays credited to the video.
                            </p>
                        </>
                    }
                >
                    <TryClient enabled={enabled} />
                </Suspense>

                <section aria-labelledby="try-faq" className="mt-12 flex flex-col gap-4">
                    <h2 id="try-faq" className="fl-heading">
                        Questions
                    </h2>
                    <div className="fl-card fl-faq" style={{ padding: "4px 24px" }}>
                        {FAQ.map((f) => (
                            <details key={f.q}>
                                <summary>{f.q}</summary>
                                <p>
                                    {f.a}
                                    {f.q.startsWith("What if") ? (
                                        <>
                                            {" "}
                                            <Link href="/guides/tiktok-recipe-not-in-caption" className="fl-link">
                                                {"What to do when the recipe isn't in the caption"}
                                            </Link>
                                        </>
                                    ) : null}
                                </p>
                            </details>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
