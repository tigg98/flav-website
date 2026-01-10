import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { AdsNav } from '@/components/ads/AdsNav'
import { Button } from '@/components/ui/Button'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Get user's campaigns
    const { data: campaigns } = await supabase
        .from('campaigns')
        .select('*')
        .eq('advertiser_id', user.id)
        .order('created_at', { ascending: false })

    const campaignIds = campaigns?.map(c => c.id) || []
    const activeCampaignsCount = campaigns?.filter(c => c.status === 'active').length || 0
    const draftCampaignsCount = campaigns?.filter(c => c.status === 'draft').length || 0

    // Get total impressions from ad_events
    let totalImpressions = 0
    let totalClicks = 0

    if (campaignIds.length > 0) {
        const { count: impressionCount } = await supabase
            .from('ad_events')
            .select('*', { count: 'exact', head: true })
            .in('campaign_id', campaignIds)
            .eq('event_type', 'impression')

        const { count: clickCount } = await supabase
            .from('ad_events')
            .select('*', { count: 'exact', head: true })
            .in('campaign_id', campaignIds)
            .eq('event_type', 'click')

        totalImpressions = impressionCount || 0
        totalClicks = clickCount || 0
    }

    // Calculate CTR and spend
    const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00'
    const cpm = 5
    const totalSpend = (totalImpressions / 1000) * cpm

    // Get recent campaigns for display
    const recentCampaigns = campaigns?.slice(0, 5) || []

    return (
        <div className="min-h-screen">
            <AdsNav userEmail={user.email} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--foreground)]">Dashboard</h1>
                        <p className="text-[var(--color-neutral-500)]">Overview of your advertising performance</p>
                    </div>
                    <Link href="/ads/campaigns/new">
                        <Button>+ New Campaign</Button>
                    </Link>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-[var(--color-neutral-500)]">Active Campaigns</h3>
                            <span className="text-lg">🚀</span>
                        </div>
                        <p className="text-3xl font-bold text-[var(--color-primary-600)]">{activeCampaignsCount}</p>
                        {draftCampaignsCount > 0 && (
                            <p className="text-xs text-[var(--color-neutral-500)] mt-1">{draftCampaignsCount} draft</p>
                        )}
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-[var(--color-neutral-500)]">Impressions</h3>
                            <span className="text-lg">👁️</span>
                        </div>
                        <p className="text-3xl font-bold text-[var(--color-secondary-600)]">{totalImpressions.toLocaleString()}</p>
                        <p className="text-xs text-[var(--color-neutral-500)] mt-1">All time</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-[var(--color-neutral-500)]">Clicks</h3>
                            <span className="text-lg">👆</span>
                        </div>
                        <p className="text-3xl font-bold text-[var(--foreground)]">{totalClicks.toLocaleString()}</p>
                        <p className="text-xs text-[var(--color-neutral-500)] mt-1">{ctr}% CTR</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-[var(--color-neutral-500)]">Total Spend</h3>
                            <span className="text-lg">💰</span>
                        </div>
                        <p className="text-3xl font-bold text-[var(--foreground)]">${totalSpend.toFixed(2)}</p>
                        <p className="text-xs text-[var(--color-neutral-500)] mt-1">$5.00 CPM</p>
                    </div>
                </div>

                {/* Recent Campaigns */}
                <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                    <div className="p-6 border-b border-[var(--color-neutral-200)] flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Recent Campaigns</h2>
                        <Link href="/ads/campaigns" className="text-sm text-[var(--color-primary-600)] hover:underline">
                            View all →
                        </Link>
                    </div>

                    {recentCampaigns.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
                            <p className="text-[var(--color-neutral-500)] mb-6">Create your first campaign to start reaching food lovers</p>
                            <Link href="/ads/campaigns/new">
                                <Button>Create Campaign</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-[var(--color-neutral-200)]">
                            {recentCampaigns.map((campaign) => (
                                <div key={campaign.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium truncate">{campaign.name}</h3>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${campaign.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : campaign.status === 'paused'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]'
                                                }`}>
                                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[var(--color-neutral-500)]">
                                            ${campaign.budget_total?.toLocaleString() || 0} budget • {campaign.start_date} – {campaign.end_date}
                                        </p>
                                    </div>
                                    <Link href={`/ads/campaigns/${campaign.id}`} className="text-sm text-[var(--color-primary-600)] hover:underline whitespace-nowrap">
                                        View details →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/ads/campaigns/new" className="p-6 bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-2xl text-white hover:opacity-90 transition-opacity">
                        <h3 className="font-semibold mb-1">Create Campaign</h3>
                        <p className="text-sm opacity-80">Launch a new ad campaign</p>
                    </Link>
                    <Link href="/ads/billing" className="p-6 bg-white rounded-2xl border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] transition-colors">
                        <h3 className="font-semibold mb-1">Add Funds</h3>
                        <p className="text-sm text-[var(--color-neutral-500)]">Top up your account balance</p>
                    </Link>
                    <Link href="/ads/settings" className="p-6 bg-white rounded-2xl border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] transition-colors">
                        <h3 className="font-semibold mb-1">Account Settings</h3>
                        <p className="text-sm text-[var(--color-neutral-500)]">Manage your profile</p>
                    </Link>
                </div>
            </main>
        </div>
    )
}
