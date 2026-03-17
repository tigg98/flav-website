"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Check, Copy, Share2, Loader2, ArrowLeft } from "lucide-react";
import { trackReferralDashboardView, trackReferralLinkCopy, trackReferralShare } from "@/lib/analytics/posthog";

const REWARD_TIERS = [
    { count: 3, label: "Early access", icon: "🚀", description: "Be first to download when Flav launches" },
    { count: 10, label: "Creator badge", icon: "✨", description: "Verified-style badge on your profile" },
    { count: 25, label: "3 months Premium free", icon: "💎", description: "Verified plan free for 3 months ($24 value)" },
    { count: 50, label: "Lifetime Verified", icon: "👑", description: "Verified membership forever ($96/year value)" },
];

interface WaitlistData {
    referral_code: string;
    position: number;
    referral_count: number;
    tier: string;
}

export default function WaitlistDashboardPage() {
    const params = useParams();
    const code = params.code as string;

    const [data, setData] = React.useState<WaitlistData | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`/api/waitlist?code=${code}`);
                if (!res.ok) throw new Error("Not found");
                const json = await res.json();
                setData(json);
                trackReferralDashboardView(code);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [code]);

    const referralLink = `https://flav.app/join/${code}`;

    const copyLink = async () => {
        trackReferralLinkCopy();
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const input = document.createElement("input");
            input.value = referralLink;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shareOnTwitter = () => {
        trackReferralShare("twitter");
        const text = encodeURIComponent(
            "Just joined the @cookwithflav waitlist — it turns TikTok recipes into actual cookable meals with AI. Get in line 👇"
        );
        const url = encodeURIComponent(referralLink);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    };

    const shareViaText = () => {
        trackReferralShare("text");
        const text = encodeURIComponent(
            `Check out Flav — it imports recipes from TikTok/IG and helps you actually cook them. Join the waitlist: ${referralLink}`
        );
        window.open(`sms:?&body=${text}`, "_self");
    };

    const shareNative = async () => {
        trackReferralShare("native");
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Join Flav — The Cooking App",
                    text: "Flav turns TikTok recipes into actual cookable meals. Join the waitlist!",
                    url: referralLink,
                });
            } catch {
                // User cancelled
            }
        } else {
            copyLink();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary-500)]" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold mb-4">Referral code not found</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                        This referral code doesn&apos;t exist or may have expired. Join the waitlist to get your own referral link.
                    </p>
                    <Button asChild>
                        <Link href="/#waitlist">Join the Waitlist</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const nextTier = REWARD_TIERS.find((t) => data.referral_count < t.count);
    const progressPercent = nextTier
        ? Math.min(100, (data.referral_count / nextTier.count) * 100)
        : 100;

    return (
        <section className="min-h-screen flex items-center py-20">
            <div className="container-main max-w-2xl">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to home
                </Link>

                {/* Position card */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl p-8 md:p-10 mb-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium mb-4">
                            <Check className="w-4 h-4" />
                            You&apos;re on the waitlist
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-2">
                            #{data.position?.toLocaleString() || "—"}
                        </h1>
                        <p className="text-neutral-500 dark:text-neutral-400">
                            Your position in line
                        </p>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="text-center p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
                            <div className="text-3xl font-bold text-[var(--color-primary-500)]">
                                {data.referral_count}
                            </div>
                            <div className="text-sm text-neutral-500 mt-1">
                                Friends referred
                            </div>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
                            <div className="text-3xl font-bold capitalize">
                                {data.tier === "standard" ? "—" : data.tier.replace("_", " ")}
                            </div>
                            <div className="text-sm text-neutral-500 mt-1">
                                Current tier
                            </div>
                        </div>
                    </div>

                    {/* Referral link */}
                    <div className="mb-6">
                        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                            Your referral link
                        </label>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-3 font-mono text-sm text-neutral-600 dark:text-neutral-300 truncate">
                                flav.app/join/{data.referral_code}
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={copyLink}
                                className="shrink-0 h-11 px-4 rounded-xl"
                            >
                                {copied ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Share buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" onClick={shareOnTwitter} className="rounded-xl">
                            𝕏 Post
                        </Button>
                        <Button variant="outline" onClick={shareViaText} className="rounded-xl">
                            💬 Text
                        </Button>
                        <Button variant="outline" onClick={shareNative} className="rounded-xl">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </div>

                {/* Reward tiers */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl p-8 md:p-10">
                    <h2 className="text-xl font-bold mb-2">Referral Rewards</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                        Invite friends to move up the waitlist and unlock rewards
                    </p>

                    {/* Progress bar */}
                    {nextTier && (
                        <div className="mb-8">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                                    {data.referral_count} / {nextTier.count} referrals
                                </span>
                                <span className="font-medium text-[var(--color-primary-500)]">
                                    Next: {nextTier.label}
                                </span>
                            </div>
                            <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#E07A5F] to-[#e8967d] rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            {data.referral_count > 0 && nextTier.count - data.referral_count <= 3 && (
                                <p className="text-sm text-[var(--color-primary-500)] font-medium mt-2">
                                    Only {nextTier.count - data.referral_count} more to unlock {nextTier.label}!
                                </p>
                            )}
                        </div>
                    )}

                    {/* Tier list */}
                    <div className="space-y-3">
                        {REWARD_TIERS.map((tier, index) => {
                            const isUnlocked = data.referral_count >= tier.count;
                            const prevUnlocked = index === 0 || data.referral_count >= REWARD_TIERS[index - 1].count;
                            const isNext = !isUnlocked && prevUnlocked;

                            return (
                                <div
                                    key={tier.count}
                                    className={cn(
                                        "flex items-center gap-4 p-4 rounded-2xl transition-all",
                                        isUnlocked
                                            ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                            : isNext
                                              ? "bg-[var(--color-primary-50)] dark:bg-[#E07A5F]/10 border-2 border-[var(--color-primary-300)] dark:border-[#E07A5F]/30"
                                              : "bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800"
                                    )}
                                >
                                    <span className="text-2xl">{tier.icon}</span>
                                    <div className="flex-1">
                                        <div className={cn(
                                            "font-semibold",
                                            isUnlocked ? "text-green-700 dark:text-green-300" : ""
                                        )}>
                                            {tier.label}
                                        </div>
                                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                            {tier.description}
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        {isUnlocked ? (
                                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        ) : (
                                            <span className="text-sm font-semibold text-neutral-400">
                                                {data.referral_count}/{tier.count}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
