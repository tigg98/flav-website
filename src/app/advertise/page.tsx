"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const adFormats = [
    {
        icon: "📱",
        title: "In-Feed Promoted Recipes",
        description: "Native video ads that appear seamlessly in user feeds. Your content looks and feels like organic recipes.",
    },
    {
        icon: "🤝",
        title: "Creator Partnerships",
        description: "Collaborate with Flav creators for authentic branded content that resonates with their audience.",
    },
    {
        icon: "⭐",
        title: "Sponsored Placements",
        description: "Premium placement in search results and category pages for maximum visibility.",
    },
];

const whyFlav = [
    {
        title: "Intent-Based Audience",
        description: "Flav users save recipes they plan to make. Saves signal real cooking intent, not passive scrolling.",
    },
    {
        title: "Food-Focused Targeting",
        description: "Target by dietary preferences, flavor profiles, cuisines, and cooking skill level.",
    },
    {
        title: "Brand-Safe Environment",
        description: "Our content policies ensure your brand appears alongside quality, family-friendly content.",
    },
    {
        title: "Transparent Reporting",
        description: "Real-time dashboards showing impressions, views, saves, and engagement metrics.",
    },
];

const targetingOptions = [
    { category: "Dietary", tags: ["Vegetarian", "Vegan", "Keto", "Gluten-Free", "High-Protein", "Low-Carb"] },
    { category: "Cuisine", tags: ["Italian", "Mexican", "Asian", "Mediterranean", "American", "Indian"] },
    { category: "Meal Type", tags: ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts", "Drinks"] },
    { category: "Skill Level", tags: ["Beginner", "Intermediate", "Advanced", "Quick & Easy"] },
];

export default function AdvertisePage() {
    const [formData, setFormData] = useState({
        companyName: "",
        contactName: "",
        email: "",
        website: "",
        budget: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neutral-900)] to-[var(--color-neutral-950)]" />

                <div className="container-main relative z-10 py-16 md:py-24 text-white">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge variant="beta" className="mb-6" />

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Reach food lovers where they're{" "}
                            <span className="text-[var(--color-primary-400)]">hungry to discover</span>
                        </h1>

                        <p className="text-lg md:text-xl text-[var(--color-neutral-300)] mb-8 max-w-2xl mx-auto">
                            Advertise on Flav to connect with millions of home cooks who are actively looking for their next meal.
                            Our intent-based platform means your brand reaches ready-to-cook audiences.
                        </p>

                        <Button size="lg" asChild>
                            <Link href="#contact">Request Advertiser Access</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Ad Formats */}
            <section className="section">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ad formats that work
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                            Choose from multiple formats designed for authentic engagement.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {adFormats.map((format, index) => (
                            <div
                                key={index}
                                className="p-6 md:p-8 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] transition-colors"
                            >
                                <span className="text-4xl mb-4 block">{format.icon}</span>
                                <h3 className="text-xl font-bold mb-2">{format.title}</h3>
                                <p className="text-[var(--color-neutral-600)]">{format.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Flav */}
            <section className="section bg-[var(--background-subtle)]">
                <div className="container-main">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Why advertise on Flav?
                            </h2>
                            <div className="space-y-6">
                                {whyFlav.map((item, index) => (
                                    <div key={index}>
                                        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                        <p className="text-[var(--color-neutral-600)]">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] rounded-3xl flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-6xl font-bold gradient-text">85%</p>
                                    <p className="text-lg text-[var(--color-neutral-600)] mt-2">of saves convert to cooking sessions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Targeting Options */}
            <section className="section">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Precision targeting for food brands
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                            Reach exactly the right audience with our food-native targeting categories.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {targetingOptions.map((option, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)]">
                                <h3 className="font-bold mb-4 text-[var(--color-primary-600)]">{option.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {option.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-3 py-1 text-sm bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Safety */}
            <section className="section bg-[var(--color-neutral-950)] text-white">
                <div className="container-main">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Brand safety you can trust
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-300)] mb-8">
                            Every ad goes through our review process. All promoted content is clearly labeled.
                            We maintain strict content policies to ensure your brand appears in a safe, welcoming environment.
                        </p>
                        <div className="grid sm:grid-cols-3 gap-6 text-center">
                            <div>
                                <p className="text-3xl font-bold text-[var(--color-primary-400)]">100%</p>
                                <p className="text-sm text-[var(--color-neutral-400)]">Human-reviewed ads</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[var(--color-primary-400)]">Labeled</p>
                                <p className="text-sm text-[var(--color-neutral-400)]">Clearly marked sponsored content</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[var(--color-primary-400)]">Family-Safe</p>
                                <p className="text-sm text-[var(--color-neutral-400)]">Strict content policies</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="section" id="contact">
                <div className="container-main">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Request advertiser access
                            </h2>
                            <p className="text-lg text-[var(--color-neutral-600)]">
                                Tell us about your brand and we'll be in touch within 48 hours.
                            </p>
                        </div>

                        {isSubmitted ? (
                            <div className="text-center p-8 rounded-2xl bg-[var(--color-secondary-50)] border border-[var(--color-secondary-200)]">
                                <span className="text-5xl mb-4 block">✓</span>
                                <h3 className="text-2xl font-bold mb-2 text-[var(--color-secondary-700)]">Request Received!</h3>
                                <p className="text-[var(--color-secondary-600)]">
                                    Thanks for your interest in advertising on Flav. Our team will review your request and get back to you within 48 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                                            Company Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contactName" className="block text-sm font-medium mb-2">
                                            Contact Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="contactName"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                            value={formData.contactName}
                                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Work Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="website" className="block text-sm font-medium mb-2">
                                            Website
                                        </label>
                                        <input
                                            type="url"
                                            id="website"
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="budget" className="block text-sm font-medium mb-2">
                                        Estimated Monthly Budget
                                    </label>
                                    <select
                                        id="budget"
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors bg-white"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    >
                                        <option value="">Select a range</option>
                                        <option value="<5k">Less than $5,000</option>
                                        <option value="5k-25k">$5,000 - $25,000</option>
                                        <option value="25k-100k">$25,000 - $100,000</option>
                                        <option value="100k+">$100,000+</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Tell us about your goals
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Request Access"}
                                </Button>

                                <p className="text-sm text-[var(--color-neutral-500)] text-center">
                                    By submitting, you agree to our{" "}
                                    <Link href="/privacy" className="underline">Privacy Policy</Link>
                                    {" "}and{" "}
                                    <Link href="/terms" className="underline">Terms of Service</Link>.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Already an advertiser? */}
            <section className="py-12 border-t border-[var(--color-neutral-200)]">
                <div className="container-main text-center">
                    <p className="text-[var(--color-neutral-600)]">
                        Already have an advertiser account?{" "}
                        <Link href="/ads/login" className="text-[var(--color-primary-600)] font-semibold hover:underline">
                            Sign in to Ads Manager →
                        </Link>
                    </p>
                </div>
            </section>
        </>
    );
}
