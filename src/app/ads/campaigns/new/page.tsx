"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdsNav } from "@/components/ads/AdsNav";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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

    // Form state - persisted across all steps
    const [formData, setFormData] = useState({
        name: "",
        budget_total: "",
        budget_daily: "",
        start_date: "",
        end_date: "",
    });
    const [selectedTargeting, setSelectedTargeting] = useState<string[]>([]);

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleTargeting = (option: string) => {
        setSelectedTargeting((prev) =>
            prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
    };

    const validateStep1 = () => {
        if (!formData.name || !formData.budget_total || !formData.budget_daily || !formData.start_date || !formData.end_date) {
            setError("Please fill in all required fields");
            return false;
        }
        setError("");
        return true;
    };

    const handleContinueToTargeting = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    async function handleSubmit() {
        if (!validateStep1()) {
            setStep(1);
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

    const isStep1Valid = formData.name && formData.budget_total && formData.budget_daily && formData.start_date && formData.end_date;

    return (
        <div className="min-h-screen">
            <AdsNav />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-[var(--color-neutral-500)] mb-6">
                    <Link href="/ads/campaigns" className="hover:text-[var(--foreground)]">
                        Campaigns
                    </Link>
                    <span>/</span>
                    <span className="text-[var(--foreground)]">New Campaign</span>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[var(--foreground)]">Create New Campaign</h1>
                    <p className="text-[var(--color-neutral-500)]">
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
                                    ? "bg-[var(--color-primary-500)] text-white"
                                    : step > i + 1
                                        ? "bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)]"
                                        : "bg-[var(--color-neutral-100)] text-[var(--color-neutral-500)]"
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
                    <div className="mb-6 p-4 text-sm text-red-500 bg-red-50 rounded-xl border border-red-200">
                        {error}
                    </div>
                )}

                {/* Step 1: Details */}
                {step === 1 && (
                    <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                        <h2 className="text-lg font-semibold">Campaign Details</h2>

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Campaign Name *
                            </label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => updateFormData("name", e.target.value)}
                                placeholder="e.g. Summer Grilling Promo"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="budget_total" className="text-sm font-medium">
                                    Total Budget ($) *
                                </label>
                                <Input
                                    id="budget_total"
                                    type="number"
                                    min="50"
                                    step="0.01"
                                    value={formData.budget_total}
                                    onChange={(e) => updateFormData("budget_total", e.target.value)}
                                    placeholder="1000.00"
                                />
                                <p className="text-xs text-[var(--color-neutral-500)]">Minimum $50</p>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="budget_daily" className="text-sm font-medium">
                                    Daily Budget ($) *
                                </label>
                                <Input
                                    id="budget_daily"
                                    type="number"
                                    min="10"
                                    step="0.01"
                                    value={formData.budget_daily}
                                    onChange={(e) => updateFormData("budget_daily", e.target.value)}
                                    placeholder="50.00"
                                />
                                <p className="text-xs text-[var(--color-neutral-500)]">Minimum $10/day</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="start_date" className="text-sm font-medium">
                                    Start Date *
                                </label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) => updateFormData("start_date", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="end_date" className="text-sm font-medium">
                                    End Date *
                                </label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e) => updateFormData("end_date", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="button" onClick={handleContinueToTargeting} disabled={!isStep1Valid}>
                                Continue to Targeting →
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Targeting */}
                {step === 2 && (
                    <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                        <div>
                            <h2 className="text-lg font-semibold">Audience Targeting</h2>
                            <p className="text-sm text-[var(--color-neutral-500)]">
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
                                                    ? "bg-[var(--color-primary-500)] text-white"
                                                    : "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-200)]"
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {selectedTargeting.length > 0 && (
                            <div className="p-4 bg-[var(--color-primary-50)] rounded-xl">
                                <p className="text-sm font-medium text-[var(--color-primary-700)]">
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
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                            <h2 className="text-lg font-semibold mb-6">Review Your Campaign</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between py-3 border-b border-[var(--color-neutral-200)]">
                                    <span className="text-[var(--color-neutral-500)]">Campaign Name</span>
                                    <span className="font-medium">{formData.name || "Not set"}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-[var(--color-neutral-200)]">
                                    <span className="text-[var(--color-neutral-500)]">Total Budget</span>
                                    <span className="font-medium">${formData.budget_total || "0"}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-[var(--color-neutral-200)]">
                                    <span className="text-[var(--color-neutral-500)]">Daily Budget</span>
                                    <span className="font-medium">${formData.budget_daily || "0"}/day</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-[var(--color-neutral-200)]">
                                    <span className="text-[var(--color-neutral-500)]">Schedule</span>
                                    <span className="font-medium">{formData.start_date} – {formData.end_date}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-[var(--color-neutral-200)]">
                                    <span className="text-[var(--color-neutral-500)]">Status</span>
                                    <span className="px-3 py-1 bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] rounded-full text-sm font-medium">
                                        Draft
                                    </span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-[var(--color-neutral-500)]">Targeting</span>
                                    <span className="text-right max-w-xs">
                                        {selectedTargeting.length > 0
                                            ? selectedTargeting.join(", ")
                                            : "All audiences"}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-[var(--color-secondary-50)] rounded-xl">
                                <p className="text-sm text-[var(--color-secondary-700)]">
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
