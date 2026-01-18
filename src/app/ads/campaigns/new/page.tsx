"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdsNav } from "@/components/ads/AdsNav";
import { Button } from "@/components/ui/Button";

const targetingCategories = [
    {
        name: "Dietary Preferences",
        options: ["Vegetarian", "Vegan", "Keto", "Gluten-Free", "High-Protein", "Low-Carb", "Dairy-Free"],
    },
    {
        name: "Cuisines",
        options: ["Italian", "Mexican", "Asian", "Mediterranean", "American", "Indian", "French", "Japanese"],
    },
    {
        name: "Meal Types",
        options: ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts", "Drinks", "Meal Prep"],
    },
    {
        name: "Cooking Level",
        options: ["Beginner-Friendly", "Quick & Easy", "Intermediate", "Advanced", "Gourmet"],
    },
];

export default function NewCampaignPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);
    const [availableBalance, setAvailableBalance] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        budget_total: "",
        budget_daily: "",
        start_date: "",
        end_date: "",
    });
    const [selectedTargeting, setSelectedTargeting] = useState<string[]>([]);

    // Fetch available balance on load
    useEffect(() => {
        async function fetchBalance() {
            try {
                const res = await fetch("/api/billing");
                if (res.ok) {
                    const data = await res.json();
                    setAvailableBalance(data.balance || 0);
                }
            } catch (e) {
                console.error("Failed to fetch balance:", e);
            }
        }
        fetchBalance();
    }, []);

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleTargeting = (option: string) => {
        setSelectedTargeting((prev) =>
            prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
    };

    const getStep1Validation = () => {
        if (!formData.name || !formData.budget_total || !formData.budget_daily || !formData.start_date || !formData.end_date) {
            return { valid: false, error: "Please fill in all required fields" };
        }

        const start = new Date(formData.start_date);
        const end = new Date(formData.end_date);

        if (end < start) {
            return { valid: false, error: "End date must be after start date" };
        }

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        const minTotal = parseFloat(formData.budget_daily) * diffDays;
        const currentTotal = parseFloat(formData.budget_total);

        if (currentTotal < minTotal) {
            return { valid: false, error: `Total budget is too low. Minimum $${minTotal.toFixed(2)} required for ${diffDays} days.` };
        }

        return { valid: true, error: "" };
    };

    const handleContinueToTargeting = () => {
        const validation = getStep1Validation();
        if (validation.valid) {
            setError("");
            setStep(2);
        } else {
            setError(validation.error);
        }
    };

    async function handleSubmit() {
        const validation = getStep1Validation();
        if (!validation.valid) {
            setStep(1);
            setError(validation.error);
            return;
        }

        setLoading(true);
        setError("");

        const data = {
            name: formData.name,
            budget_total: parseFloat(formData.budget_total),
            budget_daily: parseFloat(formData.budget_daily),
            start_date: formData.start_date,
            end_date: formData.end_date,
            targeting: selectedTargeting,
        };

        try {
            const res = await fetch("/api/campaigns", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || "Failed to create campaign");
            }

            router.push("/ads/campaigns");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const isStep1Valid = true; // Button disabled state is now handled by validation on click, or we can use getStep1Validation().valid if we want to disable it. Let's keep it enabled to show errors.

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
            <AdsNav />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
                    <Link href="/ads/campaigns" className="hover:text-foreground">
                        Campaigns
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">New Campaign</span>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Create New Campaign</h1>
                    <p className="text-neutral-500">
                        Set up your campaign details, budget, and targeting
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-4 mb-8">
                    {["Details", "Targeting", "Review"].map((s, i) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => {
                                if (i === 0) setStep(1);
                                else if (i === 1 && isStep1Valid) setStep(2);
                                else if (i === 2 && isStep1Valid) setStep(3);
                            }}
                            disabled={i > 0 && !isStep1Valid}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${step === i + 1
                                ? "bg-primary-500 text-white"
                                : step > i + 1
                                    ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400"
                                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                                } ${i > 0 && !isStep1Valid ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                                {step > i + 1 ? "✓" : i + 1}
                            </span>
                            {s}
                        </button>
                    ))}
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/20">
                        {error}
                    </div>
                )}

                {/* Step 1: Details */}
                {step === 1 && (
                    <div className="space-y-6 bg-background-elevated p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                        <h2 className="text-lg font-semibold">Campaign Details</h2>

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-neutral-500">
                                Campaign Name *
                            </label>
                            <input
                                id="name"
                                value={formData.name}
                                onChange={(e) => updateFormData("name", e.target.value)}
                                placeholder="e.g. Summer Grilling Promo"
                                className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="budget_total" className="text-sm font-medium text-neutral-500">
                                        Total Budget ($) *
                                    </label>
                                    {availableBalance !== null && (
                                        <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/10 px-2 py-0.5 rounded-full">
                                            Available: ${availableBalance.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <input
                                    id="budget_total"
                                    type="number"
                                    min="50"
                                    max={availableBalance || undefined}
                                    step="0.01"
                                    value={formData.budget_total}
                                    onChange={(e) => updateFormData("budget_total", e.target.value)}
                                    placeholder="1000.00"
                                    className={`w-full px-4 py-3 rounded-xl bg-background border placeholder-neutral-400 focus:ring-2 outline-none transition-colors ${availableBalance !== null && parseFloat(formData.budget_total) > availableBalance
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                            : "border-neutral-200 dark:border-neutral-800 focus:border-primary-500 focus:ring-primary-500/20"
                                        }`}
                                />
                                {availableBalance !== null && parseFloat(formData.budget_total) > availableBalance ? (
                                    <p className="text-xs text-red-600 dark:text-red-400">
                                        Exceeds available balance. <Link href="/ads/billing" className="underline">Add funds →</Link>
                                    </p>
                                ) : (
                                    <p className="text-xs text-neutral-500">Minimum $50</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="budget_daily" className="text-sm font-medium text-neutral-500">
                                    Daily Budget ($) *
                                </label>
                                <input
                                    id="budget_daily"
                                    type="number"
                                    min="10"
                                    step="0.01"
                                    value={formData.budget_daily}
                                    onChange={(e) => updateFormData("budget_daily", e.target.value)}
                                    placeholder="50.00"
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
                                />
                                <p className="text-xs text-neutral-500">Minimum $10/day</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="start_date" className="text-sm font-medium text-neutral-500">
                                    Start Date *
                                </label>
                                <input
                                    id="start_date"
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) => updateFormData("start_date", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="end_date" className="text-sm font-medium text-neutral-500">
                                    End Date *
                                </label>
                                <input
                                    id="end_date"
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e) => updateFormData("end_date", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {formData.start_date && formData.end_date && formData.budget_daily && formData.budget_total && (
                            (() => {
                                const start = new Date(formData.start_date);
                                const end = new Date(formData.end_date);
                                const diffTime = Math.abs(end.getTime() - start.getTime());
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive
                                const minTotal = parseFloat(formData.budget_daily) * diffDays;
                                const currentTotal = parseFloat(formData.budget_total);

                                if (end < start) {
                                    return (
                                        <div className="p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm">
                                            End date must be after start date.
                                        </div>
                                    );
                                }

                                if (currentTotal < minTotal) {
                                    return (
                                        <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg text-sm">
                                            Total budget (${currentTotal.toFixed(2)}) is too low for {diffDays} days at ${formData.budget_daily}/day.
                                            Minimum required: <strong>${minTotal.toFixed(2)}</strong>.
                                        </div>
                                    );
                                }

                                return null;
                            })()
                        )}

                        <div className="flex justify-end pt-4">
                            <Button type="button" onClick={handleContinueToTargeting} disabled={!isStep1Valid}>
                                Continue to Targeting →
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Targeting */}
                {step === 2 && (
                    <div className="space-y-6 bg-background-elevated p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                        <div>
                            <h2 className="text-lg font-semibold">Audience Targeting</h2>
                            <p className="text-sm text-neutral-500">
                                Select the categories that match your target audience (optional)
                            </p>
                        </div>

                        {targetingCategories.map((category) => (
                            <div key={category.name}>
                                <h3 className="font-medium mb-3">{category.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.options.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => toggleTargeting(option)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTargeting.includes(option)
                                                ? "bg-primary-500 text-white"
                                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {selectedTargeting.length > 0 && (
                            <div className="p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-100 dark:border-primary-500/20">
                                <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                    {selectedTargeting.length} targeting options selected
                                </p>
                            </div>
                        )}

                        <div className="flex justify-between pt-4">
                            <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                                ← Back
                            </Button>
                            <Button type="button" onClick={() => setStep(3)}>
                                Review Campaign →
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                    <div className="space-y-6">
                        <div className="bg-background-elevated p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                            <h2 className="text-lg font-semibold mb-6">Review Your Campaign</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between py-3 border-b border-neutral-200 dark:border-neutral-800">
                                    <span className="text-neutral-500">Campaign Name</span>
                                    <span className="font-medium">{formData.name || "Not set"}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-neutral-200 dark:border-neutral-800">
                                    <span className="text-neutral-500">Total Budget</span>
                                    <span className="font-medium">${formData.budget_total || "0"}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-neutral-200 dark:border-neutral-800">
                                    <span className="text-neutral-500">Daily Budget</span>
                                    <span className="font-medium">${formData.budget_daily || "0"}/day</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-neutral-200 dark:border-neutral-800">
                                    <span className="text-neutral-500">Schedule</span>
                                    <span className="font-medium">{formData.start_date} – {formData.end_date}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-neutral-200 dark:border-neutral-800">
                                    <span className="text-neutral-500">Status</span>
                                    <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full text-sm font-medium">
                                        Draft
                                    </span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-neutral-500">Targeting</span>
                                    <span className="text-right max-w-xs">
                                        {selectedTargeting.length > 0
                                            ? selectedTargeting.join(", ")
                                            : "All audiences"}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20">
                                <p className="text-sm text-blue-600 dark:text-blue-400">
                                    <strong>Note:</strong> Your campaign will be saved as a draft. You can edit it
                                    before submitting for review.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button type="button" variant="ghost" onClick={() => setStep(2)}>
                                ← Back
                            </Button>
                            <Button onClick={handleSubmit} disabled={loading || !isStep1Valid}>
                                {loading ? "Creating..." : "Create Campaign"}
                            </Button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
