"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowRight, Check, Loader2, Copy, Share2 } from "lucide-react";
import {
    trackWaitlistFormFocus,
    trackWaitlistSignup,
    trackWaitlistError,
    trackReferralLinkCopy,
    trackReferralShare,
} from "@/lib/analytics/posthog";

const REWARD_TIERS = [
    { count: 3, label: "Early access", icon: "🚀" },
    { count: 10, label: "Creator badge", icon: "✨" },
    { count: 25, label: "3 months Premium free", icon: "💎" },
    { count: 50, label: "Lifetime Verified", icon: "👑" },
];

interface WaitlistData {
    referral_code: string;
    position: number;
    referral_count: number;
    tier: string;
}

interface WaitlistFormProps {
    className?: string;
    onSuccess?: () => void;
    referralCode?: string;
}

export function WaitlistForm({ className, onSuccess, referralCode }: WaitlistFormProps) {
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [waitlistData, setWaitlistData] = React.useState<WaitlistData | null>(null);
    const [error, setError] = React.useState("");
    const [copied, setCopied] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    ref: referralCode || null,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            if (data.referral_code) {
                setWaitlistData({
                    referral_code: data.referral_code,
                    position: data.position,
                    referral_count: data.referral_count || 0,
                    tier: data.tier || "standard",
                });
                trackWaitlistSignup({
                    referral_code: data.referral_code,
                    position: data.position,
                    referred_by: referralCode || null,
                });
            }
            setEmail("");
            if (onSuccess) onSuccess();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            setError(message);
            trackWaitlistError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const referralLink = waitlistData
        ? `https://flav.app/join/${waitlistData.referral_code}`
        : "";

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
                // User cancelled share
            }
        } else {
            copyLink();
        }
    };

    // Post-signup: Referral dashboard
    if (waitlistData) {
        return (
            <div
                className={cn(
                    "w-full max-w-md p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl animate-in fade-in zoom-in duration-300",
                    className
                )}
            >
                <div className="text-center mb-5">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/20">
                        <Check className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                        You&apos;re #{waitlistData.position?.toLocaleString() || "—"} on the waitlist!
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        Share your link to move up and unlock rewards
                    </p>
                </div>

                {/* Referral link */}
                <div className="flex items-center gap-2 mb-5">
                    <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2.5 text-sm font-mono text-neutral-600 dark:text-neutral-300 truncate">
                        flav.app/join/{waitlistData.referral_code}
                    </div>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={copyLink}
                        className="shrink-0 h-10 px-3"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </Button>
                </div>

                {/* Share buttons */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                    <Button size="sm" variant="outline" onClick={shareOnTwitter} className="text-xs font-medium">
                        𝕏 Post
                    </Button>
                    <Button size="sm" variant="outline" onClick={shareViaText} className="text-xs font-medium">
                        💬 Text
                    </Button>
                    <Button size="sm" variant="outline" onClick={shareNative} className="text-xs font-medium">
                        <Share2 className="w-3.5 h-3.5 mr-1" />
                        Share
                    </Button>
                </div>

                {/* Reward tiers */}
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                        Referral Rewards
                    </p>
                    {REWARD_TIERS.map((tier, index) => {
                        const isUnlocked = waitlistData.referral_count >= tier.count;
                        const prevUnlocked = index === 0 || waitlistData.referral_count >= REWARD_TIERS[index - 1].count;
                        const isNext = !isUnlocked && prevUnlocked;

                        return (
                            <div
                                key={tier.count}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl text-sm transition-all",
                                    isUnlocked
                                        ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                        : isNext
                                          ? "bg-[var(--color-primary-50)] dark:bg-[#E07A5F]/10 border border-[var(--color-primary-200)] dark:border-[#E07A5F]/20"
                                          : "bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800"
                                )}
                            >
                                <span className="text-lg">{tier.icon}</span>
                                <div className="flex-1">
                                    <span
                                        className={cn(
                                            "font-medium",
                                            isUnlocked
                                                ? "text-green-700 dark:text-green-300"
                                                : "text-neutral-700 dark:text-neutral-300"
                                        )}
                                    >
                                        {tier.label}
                                    </span>
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-semibold",
                                        isUnlocked
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-neutral-400"
                                    )}
                                >
                                    {isUnlocked ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        `${waitlistData.referral_count}/${tier.count}`
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <p className="text-center text-xs text-neutral-400 mt-4">
                    {waitlistData.referral_count === 0
                        ? "Share your link to start earning rewards"
                        : `You've referred ${waitlistData.referral_count} friend${waitlistData.referral_count !== 1 ? "s" : ""}`}
                </p>

                <a
                    href={`/waitlist/${waitlistData.referral_code}`}
                    className="block text-center text-xs text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] font-medium mt-3 underline underline-offset-2"
                >
                    View full referral dashboard &rarr;
                </a>
            </div>
        );
    }

    // Pre-signup: Email form
    return (
        <div className={cn("w-full max-w-md", className)}>
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E07A5F] via-[#e8967d] to-[#E07A5F] rounded-xl opacity-70 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                <div className="relative flex items-center bg-white dark:bg-neutral-900 rounded-xl p-1.5 shadow-xl ring-1 ring-neutral-900/5 dark:ring-white/10">
                    <div className="relative flex-1">
                        <Input
                            type="email"
                            placeholder="Enter your email to join..."
                            className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-base shadow-none px-4 placeholder:text-neutral-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            required
                            onFocus={() => trackWaitlistFormFocus()}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-10 px-6 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-semibold shadow-lg transition-all active:scale-95"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <span className="flex items-center gap-2">
                                Join Waitlist
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </div>
            </form>

            {error && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400 text-center animate-fade-in">
                    {error}
                </p>
            )}
        </div>
    );
}
