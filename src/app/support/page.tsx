"use client";

import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

const helpTopics = [
    {
        icon: "👤",
        title: "Account & Settings",
        description: "Profile setup, password reset, account deletion",
        href: "#account",
    },
    {
        icon: "💳",
        title: "Billing & Payments",
        description: "Subscriptions, payouts, refunds, payment methods",
        href: "#billing",
    },
    {
        icon: "🎬",
        title: "Content & Recipes",
        description: "Uploading, editing, deleting content",
        href: "#content",
    },
    {
        icon: "🚨",
        title: "Reporting & Safety",
        description: "Report abuse, block users, content violations",
        href: "#reporting",
    },
    {
        icon: "🔒",
        title: "Privacy & Security",
        description: "Data privacy, security settings, two-factor auth",
        href: "#privacy",
    },
    {
        icon: "📊",
        title: "Creator Tools",
        description: "Analytics, monetization, Verified features",
        href: "#creator",
    },
];

const faqItems = [
    {
        question: "How do I reset my password?",
        answer:
            "Open the Flav app, go to Settings > Account > Change Password. If you're logged out, tap 'Forgot Password' on the login screen and follow the email instructions.",
    },
    {
        question: "How do I delete my account?",
        answer:
            "Go to Settings > Account > Delete Account in the app. Your data will be permanently deleted within 30 days. If you have an active subscription, cancel it first to avoid further charges.",
    },
    {
        question: "How do I report inappropriate content?",
        answer:
            "Tap the three dots on any video or profile and select 'Report'. Choose the reason and submit. Our team reviews all reports within 24 hours.",
    },
    {
        question: "When do creators get paid?",
        answer:
            "Payouts are processed monthly on the 15th for the previous month's earnings. Minimum payout is $10. Set up your payment method in Settings > Payments.",
    },
    {
        question: "How do I cancel my Verified subscription?",
        answer:
            "Go to Settings > Subscription > Manage Subscription in the app. You can cancel anytime and will retain benefits until the end of your billing period.",
    },
];

export default function SupportPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "",
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
            <section className="section bg-[var(--background-subtle)]">
                <div className="container-main">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            How can we help?
                        </h1>
                        <p className="text-lg text-[var(--color-neutral-600)]">
                            Find answers to common questions or get in touch with our support team.
                        </p>
                    </div>
                </div>
            </section>

            {/* Help Topics */}
            <section className="section">
                <div className="container-main">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {helpTopics.map((topic, index) => (
                            <Link
                                key={index}
                                href={topic.href}
                                className="p-6 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] hover:shadow-md transition-all"
                            >
                                <span className="text-3xl mb-3 block">{topic.icon}</span>
                                <h3 className="text-lg font-bold mb-1">{topic.title}</h3>
                                <p className="text-sm text-[var(--color-neutral-600)]">{topic.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section bg-[var(--background-subtle)]" id="faq">
                <div className="container-main">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <FAQAccordion items={faqItems} />
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="section" id="contact">
                <div className="container-main">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Contact Support
                            </h2>
                            <p className="text-[var(--color-neutral-600)]">
                                Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
                            </p>
                        </div>

                        {isSubmitted ? (
                            <div className="text-center p-8 rounded-2xl bg-[var(--color-secondary-50)] border border-[var(--color-secondary-200)]">
                                <span className="text-5xl mb-4 block">✓</span>
                                <h3 className="text-2xl font-bold mb-2 text-[var(--color-secondary-700)]">Message Sent!</h3>
                                <p className="text-[var(--color-secondary-600)]">
                                    We've received your message and will respond within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Email *
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
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors bg-white"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="">Select a category</option>
                                        <option value="account">Account & Settings</option>
                                        <option value="billing">Billing & Payments</option>
                                        <option value="content">Content & Recipes</option>
                                        <option value="reporting">Reporting & Safety</option>
                                        <option value="privacy">Privacy & Security</option>
                                        <option value="creator">Creator Tools</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        )}

                        <div className="mt-12 text-center">
                            <p className="text-[var(--color-neutral-600)] mb-2">
                                You can also reach us at:
                            </p>
                            <a
                                href="mailto:support@flav.app"
                                className="text-[var(--color-primary-600)] font-semibold hover:underline"
                            >
                                support@flav.app
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
