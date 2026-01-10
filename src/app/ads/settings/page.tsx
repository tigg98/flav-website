"use client";

import { useState, useEffect } from "react";
import { AdsNav } from "@/components/ads/AdsNav";
import { Button } from "@/components/ui/Button";

interface Profile {
    id: string;
    full_name: string | null;
    company_name: string | null;
    website: string | null;
    avatar_url: string | null;
    username: string | null;
}

export default function SettingsPage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        full_name: "",
        company_name: "",
        website: "",
        avatar_url: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/profile");
            const data = await res.json();
            if (data.profile) {
                setProfile(data.profile);
                setEmail(data.email || "");
                setFormData({
                    full_name: data.profile.full_name || "",
                    company_name: data.profile.company_name || "",
                    website: data.profile.website || "",
                    avatar_url: data.profile.avatar_url || "",
                });
            }
        } catch {
            setError("Failed to load profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");
        setSuccessMessage("");

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to update");
            }

            setSuccessMessage("Profile updated successfully!");
            fetchProfile();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
                <AdsNav />
                <div className="flex items-center justify-center py-20">
                    <div className="text-neutral-500">Loading settings...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
            <AdsNav userEmail={email} />

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold">Account Settings</h1>
                    <p className="text-sm text-neutral-500">
                        Manage your profile and preferences
                    </p>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400">
                        {successMessage}
                    </div>
                )}

                {/* Profile Form */}
                <form onSubmit={handleSave} className="bg-background-elevated rounded-xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200 space-y-6">
                    <h2 className="text-lg font-semibold">Profile Information</h2>

                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-3xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
                            {formData.avatar_url ? (
                                <img src={formData.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                "👤"
                            )}
                        </div>
                        <div className="flex-1">
                            <label htmlFor="avatar_url" className="block text-sm font-medium mb-2 text-neutral-500">
                                Avatar URL
                            </label>
                            <input
                                type="url"
                                id="avatar_url"
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 outline-none transition-colors placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                value={formData.avatar_url}
                                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="full_name" className="block text-sm font-medium mb-2 text-neutral-500">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 outline-none transition-colors placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-neutral-500">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                disabled
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 cursor-not-allowed"
                                value={email}
                            />
                            <p className="text-xs text-neutral-500 mt-1">
                                Contact support to change your email
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="company_name" className="block text-sm font-medium mb-2 text-neutral-500">
                                Company Name
                            </label>
                            <input
                                type="text"
                                id="company_name"
                                placeholder="Acme Inc."
                                className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 outline-none transition-colors placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                value={formData.company_name}
                                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="website" className="block text-sm font-medium mb-2 text-neutral-500">
                                Website
                            </label>
                            <input
                                type="url"
                                id="website"
                                placeholder="https://yourcompany.com"
                                className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 outline-none transition-colors placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>

                {/* Danger Zone */}
                <div className="bg-background-elevated rounded-xl p-8 border border-red-200 dark:border-red-500/20 shadow-sm transition-colors duration-200">
                    <h2 className="text-lg font-semibold text-red-600 dark:text-red-500 mb-2">Danger Zone</h2>
                    <p className="text-sm text-neutral-500 mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg border border-red-500/50 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors bg-transparent"
                        onClick={() => alert("Please contact support@flav.app to delete your account.")}
                    >
                        Delete Account
                    </button>
                </div>
            </main>
        </div>
    );
}
