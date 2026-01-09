'use client' // Using client component for simplicity in fetching for now, or could use server component

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface Campaign {
    id: string
    name: string
    status: string
    budget_total: number
    start_date: string
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

    if (loading) return <div className="py-8 text-center text-[var(--color-neutral-500)]">Loading campaigns...</div>

    if (campaigns.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--color-neutral-200)] text-center min-h-[300px] flex flex-col items-center justify-center space-y-4">
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
                <h2 className="text-xl font-semibold">Recent Campaigns</h2>
                <Link href="/ads/campaigns/new">
                    <Button size="sm">New Campaign</Button>
                </Link>
            </div>
            <div className="grid gap-4">
                {campaigns.map(campaign => (
                    <div key={campaign.id} className="bg-white p-6 rounded-xl shadow-sm border border-[var(--color-neutral-200)] flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-lg">{campaign.name}</h3>
                            <p className="text-sm text-[var(--color-neutral-500)]">
                                {new Date(campaign.start_date).toLocaleDateString()} • ${campaign.budget_total} Budget
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                                ${campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                                    campaign.status === 'draft' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'}`}>
                                {campaign.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
