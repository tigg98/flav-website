"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Check, Loader2 } from "lucide-react";

interface CreatorWaitlistFormProps {
    className?: string;
}

export function CreatorWaitlistForm({ className }: CreatorWaitlistFormProps) {
    const [step, setStep] = React.useState<"email" | "details" | "success">("email");
    const [email, setEmail] = React.useState("");
    const [platform, setPlatform] = React.useState("");
    const [followers, setFollowers] = React.useState("");
    const [contentType, setContentType] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [referralCode, setReferralCode] = React.useState("");

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStep("details");
    };

    const handleDetailsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            if (data.referral_code) {
                setReferralCode(data.referral_code);
            }

            setStep("success");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (step === "success") {
        const referralLink = referralCode ? `https://flav.app/join/${referralCode}` : "";

        return (
            <div className={cn("p-6 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-2xl text-center", className)}>
                <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/20">
                    <Check className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-1">
                    You&apos;re on the creator waitlist!
                </h3>
                <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                    {followers === "10k-50k" || followers === "50k-100k" || followers === "100k+"
                        ? "Based on your audience size, you qualify for priority access. We'll be in touch soon."
                        : "We'll notify you when creator tools are available. Share your link to move up!"}
                </p>
                {referralLink && (
                    <div className="bg-white dark:bg-neutral-900 rounded-lg px-3 py-2 text-sm font-mono text-neutral-600 dark:text-neutral-300 border border-green-200 dark:border-green-800">
                        {referralLink}
                    </div>
                )}
            </div>
        );
    }

    if (step === "details") {
        return (
            <div className={cn("w-full max-w-md", className)}>
                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 shadow-xl border border-neutral-200 dark:border-neutral-800">
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">
                            Tell us about your content — this helps us prioritize your access.
                        </p>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Primary platform</label>
                                <select
                                    value={platform}
                                    onChange={(e) => setPlatform(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none"
                                    required
                                >
                                    <option value="">Select platform</option>
                                    <option value="tiktok">TikTok</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="youtube">YouTube</option>
                                    <option value="blog">Food Blog</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Follower count</label>
                                <select
                                    value={followers}
                                    onChange={(e) => setFollowers(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none"
                                    required
                                >
                                    <option value="">Select range</option>
                                    <option value="<1k">Less than 1,000</option>
                                    <option value="1k-10k">1,000 - 10,000</option>
                                    <option value="10k-50k">10,000 - 50,000</option>
                                    <option value="50k-100k">50,000 - 100,000</option>
                                    <option value="100k+">100,000+</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Content type</label>
                                <select
                                    value={contentType}
                                    onChange={(e) => setContentType(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none"
                                    required
                                >
                                    <option value="">Select type</option>
                                    <option value="recipes">Recipes</option>
                                    <option value="meal-prep">Meal Prep</option>
                                    <option value="baking">Baking</option>
                                    <option value="restaurant">Restaurant Reviews</option>
                                    <option value="fitness">Fitness / Nutrition</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Apply as Creator"
                            )}
                        </Button>

                        {error && (
                            <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => setStep("email")}
                        className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 w-full text-center"
                    >
                        &larr; Back
                    </button>
                </form>
            </div>
        );
    }

    // Step 1: Email
    return (
        <div className={cn("w-full max-w-md", className)}>
            <form onSubmit={handleEmailSubmit} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E07A5F] via-[#e8967d] to-[#E07A5F] rounded-xl opacity-70 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                <div className="relative flex items-center bg-white dark:bg-neutral-900 rounded-xl p-1.5 shadow-xl ring-1 ring-neutral-900/5 dark:ring-white/10">
                    <div className="relative flex-1">
                        <Input
                            type="email"
                            placeholder="Enter your email..."
                            className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-base shadow-none px-4 placeholder:text-neutral-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="h-10 px-6 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-semibold shadow-lg transition-all active:scale-95"
                    >
                        Apply as Creator
                    </Button>
                </div>
            </form>
        </div>
    );
}
