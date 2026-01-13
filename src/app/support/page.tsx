"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import {
    User,
    CreditCard,
    ChefHat,
    ShieldAlert,
    Lock,
    BarChart3,
    Search,
    Mail,
    MessageCircle,
    HelpCircle,
} from "lucide-react";

const helpTopics = [
    {
        icon: User,
        title: "Account & Settings",
        description: "Profile setup, password reset, account deletion",
        href: "#account",
    },
    {
        icon: CreditCard,
        title: "Billing & Payments",
        description: "Subscriptions, payouts, refunds, payment methods",
        href: "#billing",
    },
    {
        icon: ChefHat,
        title: "Content & Recipes",
        description: "Uploading, editing, deleting content",
        href: "#content",
    },
    {
        icon: ShieldAlert,
        title: "Reporting & Safety",
        description: "Report abuse, block users, content violations",
        href: "#reporting",
    },
    {
        icon: Lock,
        title: "Privacy & Security",
        description: "Data privacy, security settings, two-factor auth",
        href: "#privacy",
    },
    {
        icon: BarChart3,
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
    const [searchQuery, setSearchQuery] = useState("");
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
            {/* Hero with Search */}
            <section className="relative overflow-hidden py-16 md:py-24">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-50 to-white dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800" />
                <div className="absolute top-10 right-20 w-[400px] h-[400px] bg-orange-200/50 dark:bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-orange-100/60 dark:bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="container-main relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] text-white mb-6">
                            <HelpCircle className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            How can we help?
                        </h1>
                        <p className="text-lg text-[var(--color-neutral-600)] mb-8">
                            Find answers to common questions or get in touch with our support team.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-neutral-400)]" />
                            <input
                                type="text"
                                placeholder="Search for help articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[var(--color-neutral-200)] bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-all text-lg shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Help Topics */}
            <section className="section">
                <div className="container-main">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {helpTopics.map((topic, index) => {
                            const IconComponent = topic.icon;
                            return (
                                <Link
                                    key={index}
                                    href={topic.href}
                                    className="group p-6 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-50)] dark:from-[var(--color-primary-900)] dark:to-[var(--color-primary-800)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <IconComponent className="w-6 h-6 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)]" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-1">{topic.title}</h3>
                                    <p className="text-sm text-[var(--color-neutral-600)]">{topic.description}</p>
                                </Link>
                            );
                        })}
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
                        <p className="text-[var(--color-neutral-600)] max-w-xl mx-auto">
                            Quick answers to the most common questions about using Flav.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <FAQAccordion items={faqItems} />
                    </div>
                </div>
            </section>

            {/* Still Need Help CTA */}
            <section className="section bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)]">
                <div className="container-main">
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Still need help?
                        </h2>
                        <p className="text-lg text-white/80 mb-8">
                            Our support team is here for you. Send us a message and we'll get back to you within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button variant="secondary" size="lg" asChild>
                                <Link href="#contact">Contact Support</Link>
                            </Button>
                            <a
                                href="mailto:support@flav.app"
                                className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                                support@flav.app
                            </a>
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
                                Contact Support
                            </h2>
                            <p className="text-[var(--color-neutral-600)]">
                                Can't find what you're looking for? Send us a message.
                            </p>
                        </div>

                        {isSubmitted ? (
                            <div className="text-center p-8 rounded-2xl bg-[var(--color-secondary-50)] border border-[var(--color-secondary-200)]">
                                <div className="w-16 h-16 rounded-full bg-[var(--color-secondary-100)] flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-[var(--color-secondary-600)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-[var(--color-secondary-700)]">Message Sent!</h3>
                                <p className="text-[var(--color-secondary-600)]">
                                    We've received your message and will respond within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)]">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors bg-white dark:bg-neutral-800"
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
                                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors bg-white dark:bg-neutral-800"
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
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors bg-white dark:bg-neutral-800"
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
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors resize-none bg-white dark:bg-neutral-800"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
