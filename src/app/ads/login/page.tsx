"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AdsLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate login - replace with real auth
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demo, redirect to dashboard
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
                        Sign in to manage your campaigns
                    </p>
                </div>

                <div className="bg-[var(--background-elevated)] rounded-2xl p-8 shadow-lg border border-[var(--color-neutral-200)]">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-[var(--color-neutral-600)]">Remember me</span>
                            </label>
                            <a
                                href="mailto:support@flav.app?subject=Flav%20Ads%20password%20reset"
                                className="text-[var(--color-primary-600)] hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[var(--color-neutral-200)] text-center">
                        <p className="text-sm text-[var(--color-neutral-600)]">
                            Don't have an account?{" "}
                            <Link href="/ads/signup" className="text-[var(--color-primary-600)] font-semibold hover:underline">
                                Create one
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
