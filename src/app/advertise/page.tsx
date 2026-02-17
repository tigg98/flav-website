"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
    Smartphone,
    Handshake,
    Star,
    type LucideIcon,
} from "lucide-react";

const adFormats: { icon: LucideIcon; title: string; description: string }[] = [
    {
        icon: Smartphone,
        title: "In-Feed Promoted Recipes",
        description: "Native video ads that appear seamlessly in user feeds. Your content looks and feels like organic recipes.",
    },
    {
        icon: Handshake,
        title: "Creator Partnerships",
        description: "Collaborate with Flav creators for authentic branded content that resonates with their audience.",
    },
    {
        icon: Star,
        title: "Sponsored Placements",
        description: "Premium placement in search results and category pages for maximum visibility.",
    },
];

const targetingOptions = [
    { category: "Dietary", tags: ["Vegetarian", "Vegan", "Keto", "Gluten-Free", "High-Protein"] },
    { category: "Cuisine", tags: ["Italian", "Mexican", "Asian", "Mediterranean", "Indian"] },
    { category: "Meal Type", tags: ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts"] },
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <>
            {/* Hero */}
            {/* Hero */}
            <section className="relative overflow-hidden min-h-[85vh] flex items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neutral-900)] via-[var(--color-neutral-950)] to-black" />

                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary-500)]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-secondary-500)]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="container-main relative z-10 py-12 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        {/* Left: Text Content */}
                        <div className="text-center lg:text-left text-white">
                            <Badge variant="beta" className="mb-8" />

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
                                Turn engagement into <br className="hidden lg:block" />
                                <span className="bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-secondary-400)] bg-clip-text text-transparent">
                                    delicious results
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-[var(--color-neutral-300)] mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Connect with millions of passionate home cooks on the world's most engaging food platform.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-12">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 h-auto" asChild>
                                    <Link href="#contact">Start Advertising</Link>
                                </Button>
                                <div className="flex flex-col items-center sm:items-start">
                                    <span className="text-[var(--color-neutral-400)] text-sm font-medium">
                                        Ads Manager
                                    </span>
                                    <span className="text-[var(--color-neutral-500)] text-xs">
                                        Coming Soon
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-[var(--color-neutral-400)] font-medium">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-[var(--color-primary-500)]/20 flex items-center justify-center text-[var(--color-primary-400)]">✓</div>
                                    <span>High intent audience</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-[var(--color-primary-500)]/20 flex items-center justify-center text-[var(--color-primary-400)]">✓</div>
                                    <span>Brand-safe content</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Focused Ad Example */}
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="relative z-20 transform hover:scale-[1.02] transition-transform duration-500">
                                {/* Glass card effect container */}
                                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-3 shadow-2xl shadow-[var(--color-primary-900)]/20">
                                    <div className="relative w-[280px] md:w-[320px] aspect-[9/16] rounded-[2rem] overflow-hidden bg-[var(--color-neutral-900)]">
                                        <Image
                                            src="/images/hero-ad-example.png"
                                            alt="Example ad on Flav"
                                            fill
                                            className="object-cover"
                                            priority
                                        />

                                        {/* Mock UI overlay to make it look like the app */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

                                        {/* "Sponsored" tag simulation */}
                                        <div className="absolute bottom-24 left-4 right-4 animate-fade-in-up">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur" />
                                                <div className="flex flex-col">
                                                    <div className="w-24 h-3 bg-white/20 rounded mb-1" />
                                                    <div className="w-16 h-2 bg-white/10 rounded" />
                                                </div>
                                            </div>
                                            <div className="w-full h-10 bg-[var(--color-primary-500)] rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[var(--color-primary-500)]/30">
                                                Shop Now
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating elements behind */}
                                <div className="absolute -z-10 top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[var(--color-secondary-400)] to-[var(--color-secondary-600)] rounded-full blur-2xl opacity-40 animate-pulse-slow" />
                                <div className="absolute -z-10 -bottom-5 -left-5 w-40 h-40 bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-primary-600)] rounded-full blur-2xl opacity-30 animate-pulse-slow delay-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ad Formats with Screenshots */}
            <section className="section">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ad formats that{" "}
                            <span className="gradient-text">work</span>
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                            Choose from multiple formats designed for authentic engagement.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {adFormats.map((format, index) => {
                            const IconComponent = format.icon;
                            return (
                                <div
                                    key={index}
                                    className="p-6 md:p-8 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] transition-colors"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] flex items-center justify-center mb-4">
                                        <IconComponent className="w-7 h-7 text-[var(--color-primary-600)]" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{format.title}</h3>
                                    <p className="text-[var(--color-neutral-600)]">{format.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* In-Feed Example */}
            <section className="section bg-[var(--background-subtle)]">
                <div className="container-main">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center">
                            <div className="relative w-56 md:w-64">
                                <div className="relative bg-[var(--color-neutral-900)] rounded-[3rem] p-2 shadow-2xl">
                                    <div className="relative w-full aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-black">
                                        <Image
                                            src="/screenshots/feed-video.png"
                                            alt="In-feed promoted recipe"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Native in-feed ads
                            </h2>
                            <p className="text-lg text-[var(--color-neutral-600)] mb-6">
                                Your promoted recipes appear naturally in the For You feed. Users engage with your content just like any other recipe—with saves, likes, and comments.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Seamless full-screen video format",
                                    "Clear 'Promoted' labeling",
                                    "Real engagement metrics",
                                    "Link to your website or app",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-[var(--color-secondary-100)] text-[var(--color-secondary-600)] flex items-center justify-center text-sm">✓</span>
                                        <span className="text-[var(--color-neutral-700)]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore Page Example */}
            <section className="section">
                <div className="container-main">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Sponsored explore placements
                            </h2>
                            <p className="text-lg text-[var(--color-neutral-600)] mb-6">
                                Feature your brand in the Explore tab with premium placements. Reach users who are actively searching for inspiration.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Featured carousel placement",
                                    "Category-specific targeting",
                                    "Trending section sponsorship",
                                    "Search result boosts",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)] flex items-center justify-center text-sm">✓</span>
                                        <span className="text-[var(--color-neutral-700)]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="order-1 md:order-2 flex justify-center">
                            <div className="relative w-56 md:w-64">
                                <div className="relative bg-[var(--color-neutral-900)] rounded-[3rem] p-2 shadow-2xl">
                                    <div className="relative w-full aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-black">
                                        <Image
                                            src="/screenshots/explore.png"
                                            alt="Explore page sponsorship"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Targeting Options */}
            <section className="section bg-[var(--color-neutral-950)] text-white">
                <div className="container-main">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Precision targeting for food brands
                        </h2>
                        <p className="text-lg text-[var(--color-neutral-400)] max-w-2xl mx-auto">
                            Reach exactly the right audience with our food-native targeting categories.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {targetingOptions.map((option, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="font-bold mb-4 text-[var(--color-primary-400)]">{option.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {option.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-3 py-1 text-sm bg-white/10 text-white/80 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
                        <div>
                            <p className="text-4xl font-bold text-[var(--color-primary-400)]">85%</p>
                            <p className="text-sm text-[var(--color-neutral-400)]">of saves convert to cooking</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-[var(--color-primary-400)]">10M+</p>
                            <p className="text-sm text-[var(--color-neutral-400)]">monthly active users</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-[var(--color-primary-400)]">100%</p>
                            <p className="text-sm text-[var(--color-neutral-400)]">human-reviewed ads</p>
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
                    <p className="text-[var(--color-neutral-400)]">
                        Already have an advertiser account?{" "}
                        <span className="text-[var(--color-neutral-500)] font-medium">
                            Ads Manager coming soon
                        </span>
                    </p>
                </div>
            </section>
        </>
    );
}
