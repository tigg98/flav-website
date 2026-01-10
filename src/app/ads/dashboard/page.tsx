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

    // Get total impressions from ad_events
    let totalImpressions = 0
    let totalClicks = 0
    let totalSaves = 0

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

        const { count: saveCount } = await supabase
            .from('ad_events')
            .select('*', { count: 'exact', head: true })
            .in('campaign_id', campaignIds)
            .eq('event_type', 'save')

        totalImpressions = impressionCount || 0
        totalClicks = clickCount || 0
        totalSaves = saveCount || 0
    }

    // Calculate metrics
    const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : '0.0'
    const engagement = totalImpressions > 0 ? (((totalClicks + totalSaves) / totalImpressions) * 100).toFixed(1) : '0.0'
    const cpm = 5
    const totalSpend = (totalImpressions / 1000) * cpm

    // Format large numbers
    const formatNumber = (num: number): string => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
        return num.toString()
    }

    // Get recent campaigns for display
    const recentCampaigns = campaigns?.slice(0, 5) || []

    // Mock weekly data for chart (in production, this would come from real data)
    const weeklyData = [
        { week: 'Week 1', impressions: Math.floor(totalImpressions * 0.1) || 100 },
        { week: 'Week 2', impressions: Math.floor(totalImpressions * 0.2) || 200 },
        { week: 'Week 3', impressions: Math.floor(totalImpressions * 0.3) || 600 },
        { week: 'Week 4', impressions: Math.floor(totalImpressions * 0.4) || 800 },
    ]

    const maxImpressions = Math.max(...weeklyData.map(d => d.impressions), 1)

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
            <AdsNav userEmail={user.email} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <p className="text-neutral-500 text-sm uppercase tracking-wider mb-1">FLAV</p>
                        <h1 className="text-2xl font-semibold">Analytics: Recipe Ad Performance</h1>
                    </div>
                    <Link href="/ads/campaigns/new">
                        <Button>+ New Campaign</Button>
                    </Link>
                </div>

                {/* Top Metrics Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Views */}
                    <div className="bg-background-elevated rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm text-neutral-500">Views</h3>
                            <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/10 px-2 py-0.5 rounded-full font-medium">
                                +{totalImpressions > 0 ? '100%' : '0%'}
                            </span>
                        </div>
                        <p className="text-3xl font-bold mb-2">{formatNumber(totalImpressions)}</p>
                        <div className="h-8">
                            <svg viewBox="0 0 100 30" className="w-full h-full">
                                <path
                                    d="M0,25 Q20,20 40,15 T80,10 T100,5"
                                    fill="none"
                                    stroke="var(--color-primary-500)"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Engagement */}
                    <div className="bg-background-elevated rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm text-neutral-500">Engagement</h3>
                            <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/10 px-2 py-0.5 rounded-full font-medium">
                                +{engagement}%
                            </span>
                        </div>
                        <p className="text-3xl font-bold mb-2">{engagement}%</p>
                        <div className="h-8">
                            <svg viewBox="0 0 100 30" className="w-full h-full">
                                <path
                                    d="M0,20 Q25,25 50,15 T100,10"
                                    fill="none"
                                    stroke="var(--color-primary-500)"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Conversions (Saves) */}
                    <div className="bg-background-elevated rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm text-neutral-500">Saves</h3>
                            <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full font-medium">
                                {totalSaves}
                            </span>
                        </div>
                        <p className="text-3xl font-bold mb-2">{formatNumber(totalSaves)}</p>
                        <div className="h-8">
                            <svg viewBox="0 0 100 30" className="w-full h-full">
                                <path
                                    d="M0,15 Q30,20 60,10 T100,15"
                                    fill="none"
                                    stroke="var(--color-primary-500)"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Total Spend */}
                    <div className="bg-background-elevated rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm text-neutral-500">Total Spend</h3>
                            <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full font-medium">
                                $5 CPM
                            </span>
                        </div>
                        <p className="text-3xl font-bold mb-2">${totalSpend.toFixed(2)}</p>
                        <div className="h-8">
                            <svg viewBox="0 0 100 30" className="w-full h-full">
                                <path
                                    d="M0,25 L25,20 L50,15 L75,10 L100,5"
                                    fill="none"
                                    stroke="var(--color-primary-500)"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Impressions Growth Chart */}
                    <div className="lg:col-span-2 bg-background-elevated rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold">Impressions Growth</h2>
                            <select className="bg-background dark:bg-background text-neutral-500 text-sm px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800">
                                <option>All months</option>
                                <option>Last 30 days</option>
                                <option>Last 7 days</option>
                            </select>
                        </div>

                        {/* Bar Chart */}
                        <div className="flex items-end justify-between h-48 gap-4">
                            {weeklyData.map((data, index) => {
                                const heightPercent = (data.impressions / maxImpressions) * 100
                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        <div className="text-xs text-neutral-500 mb-1">
                                            {data.week}: {formatNumber(data.impressions)}
                                        </div>
                                        <div className="relative w-full flex justify-center">
                                            <div
                                                className="w-12 md:w-16 rounded-t-lg bg-gradient-to-t from-primary-600 to-primary-400"
                                                style={{ height: `${Math.max(heightPercent * 1.5, 20)}px` }}
                                            />
                                        </div>
                                        <div className="text-xs text-neutral-400">{data.week}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Engagement Breakdown */}
                    <div className="bg-background-elevated rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                        <h2 className="text-lg font-semibold mb-6">Engagement</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                <span className="text-sm text-neutral-500">Impressions</span>
                                <span className="font-medium">{formatNumber(totalImpressions)}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                <span className="text-sm text-neutral-500">Clicks</span>
                                <span className="font-medium">{formatNumber(totalClicks)}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                <span className="text-sm text-neutral-500">Saves</span>
                                <span className="font-medium">{formatNumber(totalSaves)}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                <span className="text-sm text-neutral-500">CTR</span>
                                <span className="font-medium">{ctr}%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-500/10 rounded-lg border border-primary-200 dark:border-primary-500/20">
                                <span className="text-sm text-primary-600 dark:text-primary-400">Engagement Rate</span>
                                <span className="text-primary-600 dark:text-primary-400 font-semibold">{engagement}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="mt-6 bg-background-elevated rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm transition-colors duration-200">
                    <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Campaign Performance</h2>
                        <Link href="/ads/campaigns" className="text-sm text-primary-500 hover:text-primary-600">
                            View all →
                        </Link>
                    </div>

                    {recentCampaigns.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
                            <p className="text-neutral-500 mb-6">Create your first campaign to start reaching food lovers</p>
                            <Link href="/ads/campaigns/new">
                                <Button>Create Campaign</Button>
                            </Link>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs text-neutral-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Campaign</th>
                                    <th className="px-6 py-4">Views</th>
                                    <th className="px-6 py-4">Engagement</th>
                                    <th className="px-6 py-4">Budget</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                {recentCampaigns.map((campaign) => (
                                    <tr key={campaign.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                        <td className="px-6 py-4">
                                            <Link href={`/ads/campaigns/${campaign.id}`} className="hover:text-primary-500 font-medium">
                                                {campaign.name}
                                            </Link>
                                            <p className="text-xs text-neutral-500 mt-1">
                                                {campaign.start_date} – {campaign.end_date}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-500">0</td>
                                        <td className="px-6 py-4 text-neutral-500">0%</td>
                                        <td className="px-6 py-4">${campaign.budget_total?.toLocaleString() || 0}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${campaign.status === 'active'
                                                ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                                                : campaign.status === 'paused'
                                                    ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                                                }`}>
                                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                    <Link href="/ads/campaigns/new" className="p-5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl text-white hover:opacity-90 transition-opacity">
                        <h3 className="font-semibold mb-1">Create Campaign</h3>
                        <p className="text-sm opacity-90">Launch a new ad campaign</p>
                    </Link>
                    <Link href="/ads/billing" className="p-5 bg-background-elevated rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/50 shadow-sm transition-colors duration-200">
                        <h3 className="font-semibold mb-1">Add Funds</h3>
                        <p className="text-sm text-neutral-500">Top up your account balance</p>
                    </Link>
                    <Link href="/ads/settings" className="p-5 bg-background-elevated rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/50 shadow-sm transition-colors duration-200">
                        <h3 className="font-semibold mb-1">Account Settings</h3>
                        <p className="text-sm text-neutral-500">Manage your profile</p>
                    </Link>
                </div>
            </main>
        </div>
    )
}
