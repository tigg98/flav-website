"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

const mockData = {
    organization: "Acme Foods",
    campaigns: {
        active: 3,
        draft: 2,
        ended: 5,
    },
    metrics: {
        impressions: 1234567,
        views: 456789,
        saves: 23456,
        spent: 12345.67,
    },
    recentCampaigns: [
        { id: "1", name: "Summer Grilling Promo", status: "active", impressions: 450000, spent: 4500 },
        { id: "2", name: "Back to School Lunches", status: "active", impressions: 320000, spent: 3200 },
        { id: "3", name: "Fall Comfort Food", status: "draft", impressions: 0, spent: 0 },
    ],
};

function MetricCard({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
    return (
        <div className="p-6 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)]">
            <p className="text-sm text-[var(--color-neutral-500)] mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {subtitle && <p className="text-sm text-[var(--color-neutral-500)] mt-1">{subtitle}</p>}
        </div>
    );
}

function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
}

export default function AdsDashboardPage() {
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
                                <Link href="/ads/dashboard" className="text-sm font-medium text-[var(--color-primary-600)]">
                                    Dashboard
                                </Link>
                                <Link href="/ads/campaigns" className="text-sm font-medium text-[var(--color-neutral-600)] hover:text-[var(--foreground)]">
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
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-[var(--color-neutral-600)]">{mockData.organization}</span>
                            <Button size="sm" asChild>
                                <Link href="/ads/campaigns/new">+ New Campaign</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-[var(--color-neutral-600)]">Overview of your advertising performance</p>
                    </div>
                    <select className="px-4 py-2 rounded-xl border border-[var(--color-neutral-300)] bg-[var(--background-elevated)] text-sm">
                        <option>Last 30 days</option>
                        <option>Last 7 days</option>
                        <option>Last 90 days</option>
                        <option>All time</option>
                    </select>
                </div>

                {/* Metrics Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <MetricCard title="Impressions" value={formatNumber(mockData.metrics.impressions)} />
                    <MetricCard title="Views" value={formatNumber(mockData.metrics.views)} />
                    <MetricCard title="Saves" value={formatNumber(mockData.metrics.saves)} />
                    <MetricCard title="Total Spend" value={`$${mockData.metrics.spent.toLocaleString()}`} />
                </div>

                {/* Campaign Summary */}
                <div className="grid lg:grid-cols-3 gap-4 mb-8">
                    <div className="p-6 rounded-2xl bg-[var(--color-secondary-500)] text-white">
                        <p className="text-sm opacity-80 mb-1">Active Campaigns</p>
                        <p className="text-4xl font-bold">{mockData.campaigns.active}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-[var(--color-neutral-200)]">
                        <p className="text-sm text-[var(--color-neutral-600)] mb-1">Draft Campaigns</p>
                        <p className="text-4xl font-bold">{mockData.campaigns.draft}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-[var(--color-neutral-100)]">
                        <p className="text-sm text-[var(--color-neutral-500)] mb-1">Ended Campaigns</p>
                        <p className="text-4xl font-bold text-[var(--color-neutral-600)]">{mockData.campaigns.ended}</p>
                    </div>
                </div>

                {/* Recent Campaigns */}
                <div className="bg-[var(--background-elevated)] rounded-2xl border border-[var(--color-neutral-200)] overflow-hidden">
                    <div className="p-6 border-b border-[var(--color-neutral-200)] flex items-center justify-between">
                        <h2 className="text-lg font-bold">Recent Campaigns</h2>
                        <Link href="/ads/campaigns" className="text-sm text-[var(--color-primary-600)] hover:underline">
                            View all →
                        </Link>
                    </div>
                    <div className="divide-y divide-[var(--color-neutral-200)]">
                        {mockData.recentCampaigns.map((campaign) => (
                            <div key={campaign.id} className="p-6 flex items-center justify-between hover:bg-[var(--background-subtle)] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <Link href={`/ads/campaigns/${campaign.id}`} className="font-semibold hover:text-[var(--color-primary-600)]">
                                            {campaign.name}
                                        </Link>
                                        <p className="text-sm text-[var(--color-neutral-500)]">
                                            {formatNumber(campaign.impressions)} impressions
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${campaign.status === "active"
                                            ? "bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)]"
                                            : "bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]"
                                        }`}>
                                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                    </span>
                                    <span className="text-sm font-semibold">${campaign.spent.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
