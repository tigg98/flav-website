"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import {
    BadgeCheck,
    Crown,
    CreditCard,
    Calendar,
    ExternalLink,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
} from "lucide-react";

interface Entitlements {
    tier: "free" | "verified" | "pro";
    source: "stripe" | "apple_iap" | null;
    status: "active" | "canceled" | "past_due" | "trialing" | "expired" | null;
    current_period_end: string | null;
    cancel_at_period_end: boolean;
    features: {
        can_monetize: boolean;
        payout_rate: number;
        verified_badge: boolean;
        pro_badge: boolean;
        advanced_analytics: boolean;
        priority_support: boolean;
    };
}

export default function BillingPage() {
    const [entitlements, setEntitlements] = useState<Entitlements | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Check for success/canceled query params
    const [showSuccess, setShowSuccess] = useState(false);
    const [showCanceled, setShowCanceled] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("success") === "true") {
            setShowSuccess(true);
            window.history.replaceState({}, "", "/account/billing");
        }
        if (params.get("canceled") === "true") {
            setShowCanceled(true);
            window.history.replaceState({}, "", "/account/billing");
        }
    }, []);

    const fetchEntitlements = useCallback(async () => {
        try {
            const res = await fetch("/api/me/entitlements");
            if (!res.ok) throw new Error("Failed to fetch entitlements");
            const data = await res.json();
            setEntitlements(data);
        } catch (err) {
            console.error("Error fetching entitlements:", err);
            setError("Failed to load subscription information");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEntitlements();
    }, [fetchEntitlements]);

    const handleCheckout = async (tier: "verified" | "pro", interval: "month" | "year" = "month") => {
        setIsProcessing(true);
        setError("");

        try {
            const res = await fetch("/api/billing/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tier, interval }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to create checkout");

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err: any) {
            setError(err.message || "Failed to start checkout");
            setIsProcessing(false);
        }
    };

    const handleManageSubscription = async () => {
        setIsProcessing(true);
        setError("");

        try {
            const res = await fetch("/api/billing/portal", {
                method: "POST",
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to open portal");

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err: any) {
            setError(err.message || "Failed to open billing portal");
            setIsProcessing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-neutral-500" />
            </div>
        );
    }

    const isPaid = entitlements?.tier === "verified" || entitlements?.tier === "pro";
    const isStripe = entitlements?.source === "stripe";
    const isApple = entitlements?.source === "apple_iap";

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Subscription</h1>
                <p className="text-neutral-500 mt-2">
                    Manage your Flav subscription and billing
                </p>
            </div>

            {/* Success/Canceled Messages */}
            {showSuccess && (
                <div className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                        <p className="font-medium text-green-600 dark:text-green-400">
                            Subscription activated!
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-400/70">
                            Welcome to Flav {entitlements?.tier === "pro" ? "Pro" : "Verified"}. Your new features are now active.
                        </p>
                    </div>
                </div>
            )}

            {showCanceled && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <p className="text-yellow-700 dark:text-yellow-400">
                        Checkout was canceled. No charges were made.
                    </p>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <p className="text-red-700 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Current Plan Card */}
            <div className="bg-background-elevated rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${entitlements?.tier === "pro"
                                    ? "bg-gradient-to-br from-purple-500 to-pink-500"
                                    : entitlements?.tier === "verified"
                                        ? "bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)]"
                                        : "bg-neutral-200 dark:bg-neutral-800"
                                }`}>
                                {entitlements?.tier === "pro" ? (
                                    <Crown className="w-7 h-7 text-white" />
                                ) : entitlements?.tier === "verified" ? (
                                    <BadgeCheck className="w-7 h-7 text-white" />
                                ) : (
                                    <BadgeCheck className="w-7 h-7 text-neutral-500" />
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-2xl font-bold capitalize">
                                        {entitlements?.tier || "Free"}
                                    </h2>
                                    {isPaid && <Badge variant={entitlements?.tier === "pro" ? "pro" : "verified"} />}
                                </div>
                                <p className="text-neutral-500">
                                    {entitlements?.tier === "pro"
                                        ? "Full-time creator tier with 97% payouts"
                                        : entitlements?.tier === "verified"
                                            ? "Monetization enabled with 90% payouts"
                                            : "Free tier — upgrade to start earning"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Details */}
                {isPaid && (
                    <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50">
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-neutral-500 mb-1">Status</p>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${entitlements?.status === "active" ? "bg-green-500" :
                                            entitlements?.status === "past_due" ? "bg-yellow-500" :
                                                "bg-neutral-400"
                                        }`} />
                                    <span className="font-medium capitalize">
                                        {entitlements?.cancel_at_period_end ? "Cancels at period end" : entitlements?.status}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 mb-1">
                                    {entitlements?.cancel_at_period_end ? "Access until" : "Renews on"}
                                </p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-neutral-400" />
                                    <span className="font-medium">
                                        {formatDate(entitlements?.current_period_end)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 mb-1">Billing via</p>
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-neutral-400" />
                                    <span className="font-medium">
                                        {isApple ? "App Store" : isStripe ? "Stripe" : "—"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="p-6 border-t border-neutral-200 dark:border-neutral-800">
                    {isApple ? (
                        // Apple IAP subscription
                        <div className="space-y-4">
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Your subscription is managed through the App Store. To make changes, please manage it from your Apple device.
                            </p>
                            <Button
                                variant="outline"
                                asChild
                                className="gap-2"
                            >
                                <a
                                    href="https://apps.apple.com/account/subscriptions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Manage in App Store
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </Button>
                        </div>
                    ) : isPaid && isStripe ? (
                        // Stripe subscription
                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={handleManageSubscription}
                                disabled={isProcessing}
                                variant="outline"
                                className="gap-2"
                            >
                                {isProcessing ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <CreditCard className="w-4 h-4" />
                                )}
                                Manage Subscription
                            </Button>
                            {entitlements?.tier === "verified" && (
                                <Button
                                    onClick={() => handleCheckout("pro")}
                                    disabled={isProcessing}
                                    className="gap-2"
                                >
                                    <Crown className="w-4 h-4" />
                                    Upgrade to Pro
                                </Button>
                            )}
                        </div>
                    ) : (
                        // Free tier - show upgrade options
                        <div className="space-y-4">
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Upgrade to start monetizing your recipes and grow your audience.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    onClick={() => handleCheckout("verified")}
                                    disabled={isProcessing}
                                    variant="outline"
                                    className="gap-2"
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <BadgeCheck className="w-4 h-4" />
                                            Get Verified — $7.99/mo
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onClick={() => handleCheckout("pro")}
                                    disabled={isProcessing}
                                    className="gap-2"
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Crown className="w-4 h-4" />
                                            Go Pro — $19.99/mo
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Features Breakdown */}
            {entitlements && (
                <div className="bg-background-elevated rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                    <h3 className="font-semibold mb-4">Your Features</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {[
                            { label: "Monetization", enabled: entitlements.features.can_monetize },
                            { label: "Verified Badge", enabled: entitlements.features.verified_badge },
                            { label: "Pro Badge", enabled: entitlements.features.pro_badge },
                            { label: "Advanced Analytics", enabled: entitlements.features.advanced_analytics },
                            { label: "Priority Support", enabled: entitlements.features.priority_support },
                            {
                                label: `Payout Rate: ${entitlements.features.payout_rate > 0 ? `${(entitlements.features.payout_rate * 100).toFixed(0)}%` : "—"}`,
                                enabled: entitlements.features.payout_rate > 0
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-2 ${feature.enabled ? "text-foreground" : "text-neutral-400"
                                    }`}
                            >
                                {feature.enabled ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-neutral-300 dark:border-neutral-700" />
                                )}
                                <span>{feature.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Compare Plans Link */}
            {!isPaid && (
                <div className="text-center">
                    <Link
                        href="/verified"
                        className="inline-flex items-center gap-2 text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] font-medium"
                    >
                        Compare all plans
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}
        </div>
    );
}
