"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdsNav } from "@/components/ads/AdsNav";
import { Button } from "@/components/ui/Button";
import { AdCard } from "@/components/ads/AdCard";

interface Campaign {
    id: string;
    name: string;
    status: string;
    budget_total: number;
    budget_daily: number;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

interface Ad {
    id: string;
    title: string;
    description: string | null;
    media_url: string | null;
    target_url: string | null;
    status: string;
    format: string;
    created_at: string;
}

const statusOptions = ["draft", "active", "paused", "completed"];

const statusColors: Record<string, string> = {
    draft: "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400",
    active: "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400",
    paused: "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400",
    completed: "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400",
};

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [ads, setAds] = useState<Ad[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        budget_total: "",
        budget_daily: "",
        start_date: "",
        end_date: "",
        status: "draft",
    });

    useEffect(() => {
        fetchCampaign();
        fetchAds();
    }, [id]);

    const fetchCampaign = async () => {
        try {
            const res = await fetch("/api/campaigns");
            const data = await res.json();
            const found = data.campaigns?.find((c: Campaign) => c.id === id);
            if (found) {
                setCampaign(found);
                setFormData({
                    name: found.name,
                    budget_total: found.budget_total?.toString() || "",
                    budget_daily: found.budget_daily?.toString() || "",
                    start_date: found.start_date || "",
                    end_date: found.end_date || "",
                    status: found.status || "draft",
                });
            } else {
                setError("Campaign not found");
            }
        } catch {
            setError("Failed to load campaign");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAds = async () => {
        try {
            const res = await fetch(`/api/ads?campaign_id=${id}`);
            const data = await res.json();
            if (data.ads) {
                setAds(data.ads);
            }
        } catch {
            console.error("Failed to load ads");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");
        setSuccessMessage("");

        try {
            const res = await fetch("/api/campaigns", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id,
                    name: formData.name,
                    budget_total: parseFloat(formData.budget_total),
                    budget_daily: parseFloat(formData.budget_daily),
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                    status: formData.status,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to update");
            }

            setSuccessMessage("Campaign updated successfully!");
            fetchCampaign();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) {
            return;
        }

        setIsDeleting(true);
        setError("");

        try {
            const res = await fetch(`/api/campaigns?id=${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to delete");
            }

            router.push("/ads/campaigns");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete");
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
                <AdsNav />
                <div className="flex items-center justify-center py-20">
                    <div className="text-neutral-500">Loading campaign...</div>
                </div>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
                <AdsNav />
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <h1 className="text-2xl font-bold">Campaign Not Found</h1>
                    <Link href="/ads/campaigns">
                        <Button>Back to Campaigns</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
            <AdsNav />

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Campaign Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{campaign.name}</h1>
                        <p className="text-sm text-neutral-500">
                            Created {new Date(campaign.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[campaign.status]}`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
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

                {/* Campaign Settings Form */}
                <form onSubmit={handleSave} className="bg-background-elevated rounded-xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200 space-y-6">
                    <h2 className="text-lg font-semibold">Campaign Settings</h2>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-neutral-500">
                            Campaign Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 outline-none transition-colors placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="budget_total" className="block text-sm font-medium mb-2 text-neutral-500">
                                Total Budget ($)
                            </label>
                            <input
                                type="number"
                                id="budget_total"
                                required
                                min="1"
                                step="0.01"
                                className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 outline-none transition-colors placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                value={formData.budget_total}
                                onChange={(e) => setFormData({ ...formData, budget_total: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="budget_daily" className="block text-sm font-medium mb-2 text-neutral-500">
                                Daily Budget ($)
                            </label>
                            <input
                                type="number"
                                id="budget_daily"
                                min="1"
                                step="0.01"
                                className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 outline-none transition-colors placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                value={formData.budget_daily}
                                onChange={(e) => setFormData({ ...formData, budget_daily: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="start_date" className="block text-sm font-medium mb-2 text-neutral-500">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="start_date"
                                className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="end_date" className="block text-sm font-medium mb-2 text-neutral-500">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="end_date"
                                className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                value={formData.end_date}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium mb-2 text-neutral-500">
                            Status
                        </label>
                        <select
                            id="status"
                            className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            {statusOptions.map((s) => (
                                <option key={s} value={s} className="bg-background text-foreground">
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                            {isDeleting ? "Deleting..." : "Delete Campaign"}
                        </Button>
                        <div className="flex gap-3">
                            <Link href="/ads/dashboard">
                                <Button type="button" variant="outline" className="border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </form>

                {/* Ads Section */}
                <div className="bg-background-elevated rounded-xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold">Ads</h2>
                            <p className="text-sm text-neutral-500">
                                {ads.length} ad{ads.length !== 1 ? 's' : ''} in this campaign
                            </p>
                        </div>
                        <Link href={`/ads/campaigns/${id}/ads/new`}>
                            <Button size="sm">+ Create Ad</Button>
                        </Link>
                    </div>

                    {ads.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                            <div className="text-4xl mb-3">🎨</div>
                            <h3 className="font-semibold mb-1">No ads yet</h3>
                            <p className="text-sm text-neutral-500 mb-4">
                                Create your first ad to start reaching users
                            </p>
                            <Link href={`/ads/campaigns/${id}/ads/new`}>
                                <Button>Create Your First Ad</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {ads.map((ad) => (
                                <AdCard key={ad.id} ad={ad} campaignId={id} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
