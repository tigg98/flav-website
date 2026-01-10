"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AdsSignupPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        fullName: "",
        website: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 1) {
            setStep(2);
            return;
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.href = "/ads/dashboard";
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-2">
                        <div className="relative w-8 h-8 md:w-10 md:h-10">
                            <img
                                src="/logo.png"
                                alt="Flav Logo"
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <span className="text-2xl font-bold gradient-text">Flav Ads</span>
                    </Link>
                    <p className="text-[var(--color-neutral-600)]">
                        Create your advertiser account
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className={`flex items-center gap-2 ${step >= 1 ? "text-[var(--color-primary-600)]" : "text-[var(--color-neutral-400)]"}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 1 ? "bg-[var(--color-primary-500)] text-white" : "bg-[var(--color-neutral-200)]"}`}>1</span>
                        <span className="text-sm font-medium hidden sm:inline">Account</span>
                    </div>
                    <div className="w-8 h-0.5 bg-[var(--color-neutral-200)]" />
                    <div className={`flex items-center gap-2 ${step >= 2 ? "text-[var(--color-primary-600)]" : "text-[var(--color-neutral-400)]"}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 2 ? "bg-[var(--color-primary-500)] text-white" : "bg-[var(--color-neutral-200)]"}`}>2</span>
                        <span className="text-sm font-medium hidden sm:inline">Company</span>
                    </div>
                </div>

                <div className="bg-[var(--background-elevated)] rounded-2xl p-8 shadow-lg border border-[var(--color-neutral-200)]">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {step === 1 ? (
                            <>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Work Email
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
                                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        minLength={8}
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <p className="text-xs text-[var(--color-neutral-500)] mt-1">
                                        Minimum 8 characters
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                                        Company Name
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
                                    <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="website" className="block text-sm font-medium mb-2">
                                        Website (optional)
                                    </label>
                                    <input
                                        type="url"
                                        id="website"
                                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    />
                                </div>
                            </>
                        )}

                        <div className="flex gap-3 pt-2">
                            {step === 2 && (
                                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                                    Back
                                </Button>
                            )}
                            <Button type="submit" size="lg" className="flex-1" disabled={isLoading}>
                                {isLoading ? "Creating account..." : step === 1 ? "Continue" : "Create Account"}
                            </Button>
                        </div>

                        {step === 2 && (
                            <p className="text-xs text-[var(--color-neutral-500)] text-center">
                                By creating an account, you agree to our{" "}
                                <Link href="/terms" className="underline">Terms of Service</Link>
                                {" "}and{" "}
                                <Link href="/privacy" className="underline">Privacy Policy</Link>.
                            </p>
                        )}
                    </form>

                    <div className="mt-6 pt-6 border-t border-[var(--color-neutral-200)] text-center">
                        <p className="text-sm text-[var(--color-neutral-600)]">
                            Already have an account?{" "}
                            <Link href="/ads/login" className="text-[var(--color-primary-600)] font-semibold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-[var(--color-neutral-500)]">
                    <Link href="/" className="hover:underline">← Back to flav.app</Link>
                </p>
            </div>
        </div>
    );
}
