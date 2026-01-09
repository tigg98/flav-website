"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const mockCampaigns = [
    { id: "1", name: "Summer Grilling Promo", status: "active", objective: "views", budget: 5000, spent: 4500, impressions: 450000, views: 125000, saves: 8900, startDate: "2025-06-01", endDate: "2025-08-31" },
    { id: "2", name: "Back to School Lunches", status: "active", objective: "saves", budget: 4000, spent: 3200, impressions: 320000, views: 89000, saves: 12500, startDate: "2025-08-15", endDate: "2025-09-30" },
    { id: "3", name: "Fall Comfort Food", status: "draft", objective: "reach", budget: 3000, spent: 0, impressions: 0, views: 0, saves: 0, startDate: "2025-10-01", endDate: "2025-11-30" },
    { id: "4", name: "Holiday Baking Special", status: "submitted", objective: "views", budget: 8000, spent: 0, impressions: 0, views: 0, saves: 0, startDate: "2025-11-15", endDate: "2025-12-31" },
    { id: "5", name: "New Year Health Kick", status: "approved", objective: "saves", budget: 6000, spent: 0, impressions: 0, views: 0, saves: 0, startDate: "2026-01-01", endDate: "2026-01-31" },
    { id: "6", name: "Valentine's Dinner Ideas", status: "ended", objective: "reach", budget: 2500, spent: 2500, impressions: 280000, views: 72000, saves: 5600, startDate: "2025-02-01", endDate: "2025-02-14" },
];

const statusColors: Record<string, string> = {
    draft: "bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]",
    submitted: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    active: "bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)]",
    paused: "bg-orange-100 text-orange-700",
    ended: "bg-[var(--color-neutral-200)] text-[var(--color-neutral-500)]",
};

function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
}

export default function CampaignsPage() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-[var(--background-elevated)] border-b border-[var(--color-neutral-200)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link href="/ads/dashboard" className="flex items-center gap-2 text-xl font-bold">
                                <span className="text-2xl">🍳</span>
                                <span className="gradient-text">Flav Ads</span>
                            </Link>
                            <nav className="hidden md:flex items-center gap-6">
                                <Link href="/ads/dashboard" className="text-sm font-medium text-[var(--color-neutral-600)] hover:text-[var(--foreground)]">
                                    Dashboard
                                </Link>
                                <Link href="/ads/campaigns" className="text-sm font-medium text-[var(--color-primary-600)]">
                                    Campaigns
                                </Link>
                                <Link href="/ads/settings" className="text-sm font-medium text-[var(--color-neutral-600)] hover:text-[var(--foreground)]">
                                    Settings
                                </Link>
                                <Link href="/ads/billing" className="text-sm font-medium text-[var(--color-neutral-600)] hover:text-[var(--foreground)]">
                                    Billing
                                </Link>
                            </nav>
                        </div>
                        <Button size="sm" asChild>
                            <Link href="/ads/campaigns/new">+ New Campaign</Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Campaigns</h1>
                    <div className="flex items-center gap-4">
                        <select className="px-4 py-2 rounded-xl border border-[var(--color-neutral-300)] bg-[var(--background-elevated)] text-sm">
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Draft</option>
                            <option>Submitted</option>
                            <option>Ended</option>
                        </select>
                    </div>
                </div>

                {/* Campaigns Table */}
                <div className="bg-[var(--background-elevated)] rounded-2xl border border-[var(--color-neutral-200)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[var(--color-neutral-200)] bg-[var(--background-subtle)]">
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">Campaign</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">Status</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">Impressions</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">Views</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">Saves</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">Spent</th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">Budget</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--color-neutral-200)]">
                                {mockCampaigns.map((campaign) => (
                                    <tr key={campaign.id} className="hover:bg-[var(--background-subtle)] transition-colors">
                                        <td className="px-6 py-4">
                                            <Link href={`/ads/campaigns/${campaign.id}`} className="font-semibold hover:text-[var(--color-primary-600)]">
                                                {campaign.name}
                                            </Link>
                                            <p className="text-sm text-[var(--color-neutral-500)] capitalize">{campaign.objective}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[campaign.status]}`}>
                                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">{formatNumber(campaign.impressions)}</td>
                                        <td className="px-6 py-4 text-right">{formatNumber(campaign.views)}</td>
                                        <td className="px-6 py-4 text-right">{formatNumber(campaign.saves)}</td>
                                        <td className="px-6 py-4 text-right font-semibold">${campaign.spent.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right text-[var(--color-neutral-600)]">${campaign.budget.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
