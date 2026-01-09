"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const objectives = [
    {
        id: "reach",
        title: "Reach",
        description: "Show your ad to as many people as possible",
        icon: "👁️",
    },
    {
        id: "views",
        title: "Video Views",
        description: "Get more people to watch your recipe video",
        icon: "▶️",
    },
    {
        id: "saves",
        title: "Recipe Saves",
        description: "Drive saves from people who want to cook your recipe",
        icon: "❤️",
    },
];

const dietaryTags = ["Vegetarian", "Vegan", "Keto", "Gluten-Free", "High-Protein", "Low-Carb", "Dairy-Free"];
const flavorTags = ["Spicy", "Sweet", "Savory", "Comfort Food", "Light & Fresh", "Rich & Creamy"];
const cuisineTags = ["Italian", "Mexican", "Asian", "Mediterranean", "American", "Indian", "French"];

export default function NewCampaignPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        objective: "",
        budget: "",
        startDate: "",
        endDate: "",
        dietaryTags: [] as string[],
        flavorTags: [] as string[],
        cuisineTags: [] as string[],
        creativeUrl: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleTag = (category: "dietaryTags" | "flavorTags" | "cuisineTags", tag: string) => {
        setFormData((prev) => ({
            ...prev,
            [category]: prev[category].includes(tag)
                ? prev[category].filter((t) => t !== tag)
                : [...prev[category], tag],
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.href = "/ads/campaigns";
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-[var(--background-elevated)] border-b border-[var(--color-neutral-200)]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link href="/ads/campaigns" className="text-[var(--color-neutral-500)] hover:text-[var(--foreground)]">
                                ← Back
                            </Link>
                            <h1 className="text-lg font-semibold">Create Campaign</h1>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--color-neutral-500)]">
                            Step {step} of 4
                        </div>
                    </div>
                </div>
            </header>

            {/* Progress Bar */}
            <div className="bg-[var(--color-neutral-200)] h-1">
                <div
                    className="bg-[var(--color-primary-500)] h-1 transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                />
            </div>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">What's your objective?</h2>
                            <p className="text-[var(--color-neutral-600)]">
                                Choose what you want to achieve with this campaign.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {objectives.map((obj) => (
                                <button
                                    key={obj.id}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, objective: obj.id })}
                                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${formData.objective === obj.id
                                            ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]"
                                            : "border-[var(--color-neutral-200)] bg-[var(--background-elevated)] hover:border-[var(--color-neutral-300)]"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl">{obj.icon}</span>
                                        <div>
                                            <h3 className="font-semibold text-lg">{obj.title}</h3>
                                            <p className="text-[var(--color-neutral-600)]">{obj.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Campaign Details</h2>
                            <p className="text-[var(--color-neutral-600)]">
                                Set your budget and schedule.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Campaign Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., Summer Grilling Campaign"
                                />
                            </div>

                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium mb-2">
                                    Total Budget (USD)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-neutral-500)]">$</span>
                                    <input
                                        type="number"
                                        id="budget"
                                        min="100"
                                        className="w-full px-4 py-3 pl-8 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        placeholder="1000"
                                    />
                                </div>
                                <p className="text-xs text-[var(--color-neutral-500)] mt-1">Minimum $100</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium mb-2">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="endDate" className="block text-sm font-medium mb-2">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Targeting</h2>
                            <p className="text-[var(--color-neutral-600)]">
                                Select the audiences you want to reach. Leave empty for broad targeting.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-3">Dietary Preferences</h3>
                                <div className="flex flex-wrap gap-2">
                                    {dietaryTags.map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => toggleTag("dietaryTags", tag)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${formData.dietaryTags.includes(tag)
                                                    ? "bg-[var(--color-primary-500)] text-white"
                                                    : "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-200)]"
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">Flavor Profiles</h3>
                                <div className="flex flex-wrap gap-2">
                                    {flavorTags.map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => toggleTag("flavorTags", tag)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${formData.flavorTags.includes(tag)
                                                    ? "bg-[var(--color-primary-500)] text-white"
                                                    : "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-200)]"
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">Cuisines</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cuisineTags.map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => toggleTag("cuisineTags", tag)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${formData.cuisineTags.includes(tag)
                                                    ? "bg-[var(--color-primary-500)] text-white"
                                                    : "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-200)]"
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
                            <p className="text-[var(--color-neutral-600)]">
                                Review your campaign details before submitting.
                            </p>
                        </div>

                        <div className="bg-[var(--background-elevated)] rounded-2xl border border-[var(--color-neutral-200)] divide-y divide-[var(--color-neutral-200)]">
                            <div className="p-4 flex justify-between">
                                <span className="text-[var(--color-neutral-600)]">Campaign Name</span>
                                <span className="font-semibold">{formData.name || "—"}</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span className="text-[var(--color-neutral-600)]">Objective</span>
                                <span className="font-semibold capitalize">{formData.objective || "—"}</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span className="text-[var(--color-neutral-600)]">Budget</span>
                                <span className="font-semibold">${formData.budget || "0"}</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span className="text-[var(--color-neutral-600)]">Schedule</span>
                                <span className="font-semibold">
                                    {formData.startDate && formData.endDate
                                        ? `${formData.startDate} to ${formData.endDate}`
                                        : "—"}
                                </span>
                            </div>
                            <div className="p-4">
                                <span className="text-[var(--color-neutral-600)] block mb-2">Targeting</span>
                                <div className="flex flex-wrap gap-1">
                                    {[...formData.dietaryTags, ...formData.flavorTags, ...formData.cuisineTags].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-xs bg-[var(--color-neutral-100)] rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                    {formData.dietaryTags.length === 0 && formData.flavorTags.length === 0 && formData.cuisineTags.length === 0 && (
                                        <span className="text-[var(--color-neutral-500)]">Broad targeting (all users)</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--color-primary-50)] rounded-2xl p-4 border border-[var(--color-primary-200)]">
                            <p className="text-sm text-[var(--color-primary-700)]">
                                <strong>Note:</strong> Your campaign will be submitted for review. You'll receive an email once it's approved and ready to go live.
                            </p>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8 pt-8 border-t border-[var(--color-neutral-200)]">
                    {step > 1 && (
                        <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                            Back
                        </Button>
                    )}
                    {step < 4 ? (
                        <Button
                            onClick={() => setStep(step + 1)}
                            disabled={step === 1 && !formData.objective}
                            className="flex-1"
                        >
                            Continue
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
                            {isSubmitting ? "Submitting..." : "Submit Campaign"}
                        </Button>
                    )}
                </div>
            </main>
        </div>
    );
}
