import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { DeepLink } from "./DeepLink";
import { BadgeCheck, Clock, Lock, UtensilsCrossed } from "lucide-react";

// Creator data lives in Supabase and changes as they post — always render fresh.
export const dynamic = "force-dynamic";

const APP_STORE_URL = "https://apps.apple.com/us/app/flav/id6759994122";

interface Creator {
    id: string;
    name: string | null;
    handle: string;
    avatar_url: string | null;
    bio: string | null;
    is_verified: boolean | null;
    follower_count: number | null;
    recipe_count: number | null;
}

interface CreatorRecipe {
    id: string;
    slug: string | null;
    title: string;
    image_url: string | null;
    cook_time_minutes: number | null;
    is_premium: boolean | null;
}

interface Props {
    params: Promise<{ handle: string }>;
}

/**
 * This root-level dynamic route serves ONLY flav.app/@handle bio-link pages.
 * The segment must start with "@" (raw or percent-encoded as %40);
 * anything else 404s so ordinary unknown paths behave normally.
 */
function parseHandle(param: string): string | null {
    let decoded: string;
    try {
        decoded = decodeURIComponent(param);
    } catch {
        return null;
    }
    if (!decoded.startsWith("@")) return null;
    const handle = decoded.slice(1);
    if (!/^[a-zA-Z0-9_.-]{2,32}$/.test(handle)) return null;
    return handle;
}

// cache() dedupes the fetch between generateMetadata and the page render.
const getCreator = cache(async function getCreator(handle: string): Promise<Creator | null> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("creators")
            .select("id,name,handle,avatar_url,bio,is_verified,follower_count,recipe_count")
            .ilike("handle", handle)
            .maybeSingle();
        if (error) return null;
        return data as Creator | null;
    } catch {
        return null;
    }
});

async function getCreatorRecipes(creatorId: string): Promise<CreatorRecipe[]> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("recipes")
            .select("id,slug,title,image_url,cook_time_minutes,is_premium")
            .eq("creator_id", creatorId)
            .or("is_hidden.is.null,is_hidden.eq.false")
            .order("created_at", { ascending: false })
            .limit(24);
        if (error) return [];
        return (data ?? []) as CreatorRecipe[];
    } catch {
        return [];
    }
}

function formatCount(n: number | null | undefined): string {
    const count = n ?? 0;
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
    return count.toString();
}

function followUrl(handle: string): string {
    return `${APP_STORE_URL}?utm_source=biolink&utm_medium=creator_page&utm_campaign=follow_creator&utm_content=${encodeURIComponent(handle)}`;
}

function recipeFallbackUrl(handle: string): string {
    return `${APP_STORE_URL}?utm_source=biolink&utm_medium=creator_page&utm_campaign=open_recipe&utm_content=${encodeURIComponent(handle)}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { handle: raw } = await params;
    const handle = parseHandle(raw);
    // notFound() here (before streaming starts) so unknown handles return a real
    // HTTP 404 — thrown from the page body it would stream a 200 (root loading.tsx).
    if (!handle) notFound();

    const creator = await getCreator(handle);
    if (!creator) notFound();

    const displayName = creator.name || `@${creator.handle}`;
    const description =
        creator.bio ||
        `${displayName}'s recipes on Flav — ${formatCount(creator.recipe_count)} recipes, ${formatCount(creator.follower_count)} followers. Save any recipe to your cookbook and cook it hands-free with the Flav app.`;

    return {
        title: { absolute: `@${creator.handle} — Recipes on Flav` },
        description,
        alternates: {
            canonical: `https://flav.app/@${creator.handle}`,
        },
        openGraph: {
            title: `@${creator.handle} — Recipes on Flav`,
            description,
            url: `https://flav.app/@${creator.handle}`,
            type: "profile",
            ...(creator.avatar_url ? { images: [{ url: creator.avatar_url }] } : {}),
        },
        twitter: {
            card: "summary",
            title: `@${creator.handle} — Recipes on Flav`,
            description,
        },
    };
}

export default async function CreatorBioLinkPage({ params }: Props) {
    const { handle: raw } = await params;
    const handle = parseHandle(raw);
    if (!handle) notFound();

    const creator = await getCreator(handle);
    if (!creator) notFound();

    const recipes = await getCreatorRecipes(creator.id);
    const displayName = creator.name || `@${creator.handle}`;
    const canonicalUrl = `https://flav.app/@${creator.handle}`;

    return (
        <div className="min-h-screen bg-[var(--color-neutral-950)] text-white">
            {/* Ambient glow, matching the homepage creator section */}
            <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E07A5F]/15 rounded-full blur-[120px]" />

                <div className="container-main relative z-10 pt-12 pb-16 md:pt-16 md:pb-20">
                    {/* Profile header */}
                    <div className="max-w-2xl mx-auto text-center">
                        {creator.avatar_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={creator.avatar_url}
                                alt={`${displayName} on Flav`}
                                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mx-auto mb-5 border-2 border-white/15 shadow-2xl bg-neutral-800"
                            />
                        ) : (
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto mb-5 border-2 border-white/15 shadow-2xl bg-gradient-to-br from-[#E07A5F] to-[#e8967d] flex items-center justify-center text-4xl font-bold">
                                {(displayName[0] || "F").toUpperCase()}
                            </div>
                        )}

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
                            {displayName}
                            {creator.is_verified && (
                                <BadgeCheck
                                    className="w-7 h-7 text-[var(--color-primary-400)] shrink-0"
                                    aria-label="Verified creator"
                                />
                            )}
                        </h1>
                        <p className="font-mono text-[var(--color-primary-300)] mt-1 mb-4">
                            flav.app/@{creator.handle}
                        </p>

                        {creator.bio && (
                            <p className="text-neutral-300 leading-relaxed max-w-md mx-auto mb-6">
                                {creator.bio}
                            </p>
                        )}

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-8 mb-8">
                            <div>
                                <div className="text-2xl font-bold">{formatCount(creator.follower_count)}</div>
                                <div className="text-xs uppercase tracking-widest text-neutral-400">Followers</div>
                            </div>
                            <div className="h-8 w-px bg-white/15" />
                            <div>
                                <div className="text-2xl font-bold">{formatCount(creator.recipe_count ?? recipes.length)}</div>
                                <div className="text-xs uppercase tracking-widest text-neutral-400">
                                    {(creator.recipe_count ?? recipes.length) === 1 ? "Recipe" : "Recipes"}
                                </div>
                            </div>
                        </div>

                        {/* Follow CTA */}
                        <DeepLink
                            deepLink={`flav://creator/${creator.handle}`}
                            fallbackUrl={followUrl(creator.handle)}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#E07A5F] to-[#e8967d] text-white text-lg font-semibold shadow-xl shadow-[#E07A5F]/25 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                        >
                            Follow @{creator.handle} on Flav
                        </DeepLink>
                        <p className="text-xs text-neutral-500 mt-3">
                            Opens the Flav app — free on the App Store
                        </p>
                    </div>

                    {/* Recipe grid */}
                    <div className="max-w-4xl mx-auto mt-14">
                        {recipes.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                                {recipes.map((recipe) => (
                                    <DeepLink
                                        key={recipe.id}
                                        deepLink={`flav://recipe/${recipe.id}`}
                                        fallbackUrl={recipeFallbackUrl(creator.handle)}
                                        className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-[#E07A5F]/50 transition-colors"
                                    >
                                        <div className="relative aspect-square bg-neutral-800">
                                            {recipe.image_url ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={recipe.image_url}
                                                    alt={recipe.title}
                                                    loading="lazy"
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                                                    <UtensilsCrossed className="w-10 h-10" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                                            {recipe.is_premium && (
                                                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
                                                    <Lock className="w-3.5 h-3.5 text-[#e8967d]" aria-label="Premium recipe" />
                                                </div>
                                            )}

                                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                                <h2 className="text-sm font-semibold leading-snug line-clamp-2">
                                                    {recipe.title}
                                                </h2>
                                                {recipe.cook_time_minutes != null && (
                                                    <div className="flex items-center gap-1 mt-1 text-[11px] text-neutral-300">
                                                        <Clock className="w-3 h-3" />
                                                        {recipe.cook_time_minutes} min
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </DeepLink>
                                ))}
                            </div>
                        ) : (
                            /* Empty state — never a blank grid */
                            <div className="max-w-md mx-auto text-center rounded-3xl border border-white/10 bg-white/5 p-10">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E07A5F]/20 to-[#e8967d]/20 flex items-center justify-center mx-auto mb-5">
                                    <UtensilsCrossed className="w-8 h-8 text-[var(--color-primary-400)]" />
                                </div>
                                <h2 className="text-xl font-bold mb-2">
                                    @{creator.handle} is cooking something up
                                </h2>
                                <p className="text-neutral-400 mb-6 leading-relaxed">
                                    No public recipes here yet. Follow {displayName} in the Flav app to
                                    be first in line when they post — and start saving TikTok recipes to
                                    your own cookbook in the meantime.
                                </p>
                                <div className="flex justify-center">
                                    <AppStoreButtons showAndroid={false} utmSource="biolink_empty" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Made with Flav footer */}
                    <div className="text-center mt-16">
                        <Link
                            href="/creators"
                            className="text-sm text-neutral-500 hover:text-[var(--color-primary-400)] transition-colors"
                        >
                            Made with <span className="font-semibold">Flav</span> — claim your own @handle &rarr;
                        </Link>
                    </div>
                </div>
            </div>

            {/* ProfilePage + Person JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfilePage",
                        "url": canonicalUrl,
                        "name": `@${creator.handle} — Recipes on Flav`,
                        "isPartOf": {
                            "@type": "WebSite",
                            "name": "Flav",
                            "url": "https://flav.app",
                        },
                        "mainEntity": {
                            "@type": "Person",
                            "name": displayName,
                            "alternateName": `@${creator.handle}`,
                            "identifier": creator.handle,
                            "url": canonicalUrl,
                            ...(creator.avatar_url ? { "image": creator.avatar_url } : {}),
                            ...(creator.bio ? { "description": creator.bio } : {}),
                            "interactionStatistic": [
                                {
                                    "@type": "InteractionCounter",
                                    "interactionType": "https://schema.org/FollowAction",
                                    "userInteractionCount": creator.follower_count ?? 0,
                                },
                            ],
                        },
                    }),
                }}
            />
        </div>
    );
}
