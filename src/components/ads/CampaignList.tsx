'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface Campaign {
    id: string
    name: string
    status: string
    budget_total: number
    budget_daily: number
    start_date: string
    end_date: string
}

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    active: 'bg-green-100 text-green-700',
    paused: 'bg-orange-100 text-orange-700',
    completed: 'bg-blue-100 text-blue-700',
}

export function CampaignList() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/campaigns')
            .then(res => res.json())
            .then(data => {
                if (data.campaigns) setCampaigns(data.campaigns)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="py-8 text-center text-[var(--color-neutral-500)]">
                <div className="animate-pulse space-y-4">
                    <div className="h-20 bg-[var(--color-neutral-100)] rounded-xl"></div>
                    <div className="h-20 bg-[var(--color-neutral-100)] rounded-xl"></div>
                    <div className="h-20 bg-[var(--color-neutral-100)] rounded-xl"></div>
                </div>
            </div>
        )
    }

    if (campaigns.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--color-neutral-200)] text-center min-h-[300px] flex flex-col items-center justify-center space-y-4">
                <div className="text-5xl mb-2">📊</div>
                <h2 className="text-xl font-semibold">No campaigns yet</h2>
                <p className="text-[var(--color-neutral-500)] max-w-md">
                    Start reaching your audience by creating your first campaign on Flav.
                </p>
                <Link href="/ads/campaigns/new">
                    <Button size="lg">Create Campaign</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Campaigns</h2>
                <Link href="/ads/campaigns/new">
                    <Button size="sm">+ New Campaign</Button>
                </Link>
            </div>
            <div className="grid gap-4">
                {campaigns.map(campaign => (
                    <Link
                        key={campaign.id}
                        href={`/ads/campaigns/${campaign.id}`}
                        className="block bg-white p-6 rounded-xl shadow-sm border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] hover:shadow-md transition-all group"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-semibold text-lg group-hover:text-[var(--color-primary-600)] transition-colors">
                                        {campaign.name}
                                    </h3>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[campaign.status] || 'bg-gray-100 text-gray-700'}`}>
                                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-[var(--color-neutral-500)]">
                                    <span>${campaign.budget_total?.toLocaleString()} budget</span>
                                    {campaign.start_date && (
                                        <>
                                            <span>•</span>
                                            <span>
                                                {new Date(campaign.start_date).toLocaleDateString()}
                                                {campaign.end_date && ` — ${new Date(campaign.end_date).toLocaleDateString()}`}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-[var(--color-neutral-400)] group-hover:text-[var(--color-primary-500)] transition-colors">
                                    Edit →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
