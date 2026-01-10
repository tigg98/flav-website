import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { AdsNav } from '@/components/ads/AdsNav'
import { Button } from '@/components/ui/Button'
import { MetricsChart } from '@/components/ads/MetricsChart'
import { DateRangeFilter } from '@/components/ads/DateRangeFilter'

interface DashboardPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
    const supabase = await createClient()
    const resolvedSearchParams = await searchParams
    const range = typeof resolvedSearchParams.range === 'string' ? resolvedSearchParams.range : '30d'

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

    // Calculate dates
    const now = new Date()
    let startDate: Date | null = new Date()

    switch (range) {
        case '7d':
            startDate.setDate(now.getDate() - 7)
            break
        case '30d':
            startDate.setDate(now.getDate() - 30)
            break
        case '90d':
            startDate.setDate(now.getDate() - 90)
            break
        case 'all':
            startDate = null
            break
        default:
            startDate.setDate(now.getDate() - 30)
    }

    // Get total impressions from ad_events
    let totalImpressions = 0
    let totalClicks = 0
    let totalSaves = 0

    if (campaignIds.length > 0) {
        // Impressions
        let impressionsQuery = supabase
            .from('ad_events')
            .select('*', { count: 'exact', head: true })
            .in('campaign_id', campaignIds)
            .eq('event_type', 'impression')

        if (startDate) {
            impressionsQuery = impressionsQuery.gte('created_at', startDate.toISOString())
        }
        const { count: impressionCount } = await impressionsQuery

        // Clicks
        let clicksQuery = supabase
            .from('ad_events')
            .select('*', { count: 'exact', head: true })
            .in('campaign_id', campaignIds)
            .eq('event_type', 'click')

        if (startDate) {
            clicksQuery = clicksQuery.gte('created_at', startDate.toISOString())
        }
        const { count: clickCount } = await clicksQuery

        // Saves
        let savesQuery = supabase
            .from('ad_events')
            .select('*', { count: 'exact', head: true })
            .in('campaign_id', campaignIds)
            .eq('event_type', 'save')

        if (startDate) {
            savesQuery = savesQuery.gte('created_at', startDate.toISOString())
        }
        const { count: saveCount } = await savesQuery

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

    // Generate Chart Data based on Range
    let chartData = []

    // Helper to generate fake historical data based on current totals
    // (In production this would be a real day-by-day query)
    if (range === '7d') {
        // Daily data for last 7 days
        for (let i = 6; i >= 0; i--) {
            const d = new Date()
            d.setDate(d.getDate() - i)
            chartData.push({
                label: d.toLocaleDateString('en-US', { weekday: 'short' }),
                value: Math.floor((totalImpressions / 7) * (0.8 + Math.random() * 0.4)) // Randomize slightly around average
            })
        }
    } else if (range === '30d') {
        // Every 3 days or weekly-ish
        for (let i = 0; i < 4; i++) {
            chartData.push({
                label: `Week ${i + 1}`,
                value: Math.floor((totalImpressions / 4) * (0.8 + Math.random() * 0.4))
            })
        }
    } else if (range === '90d') {
        // Monthly
        for (let i = 2; i >= 0; i--) {
            const d = new Date()
            d.setMonth(d.getMonth() - i)
            chartData.push({
                label: d.toLocaleDateString('en-US', { month: 'short' }),
                value: Math.floor((totalImpressions / 3) * (0.8 + Math.random() * 0.4))
            })
        }
    } else {
        // All time (just show monthly for last 6 months)
        for (let i = 5; i >= 0; i--) {
            const d = new Date()
            d.setMonth(d.getMonth() - i)
            chartData.push({
                label: d.toLocaleDateString('en-US', { month: 'short' }),
                value: Math.floor((totalImpressions / 6) * (0.8 + Math.random() * 0.4))
            })
        }
    }

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
                    <div className="flex items-center gap-3">
                        <DateRangeFilter />
                        <Link href="/ads/campaigns/new">
                            <Button>+ New Campaign</Button>
                        </Link>
                    </div>
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
                        <div className="h-12 -mx-2">
                            <MetricsChart minimal data={[{ label: '1', value: 10 }, { label: '2', value: totalImpressions }]} height={48} color="var(--color-primary-500)" />
                        </div>
                    </div>

                    {/* Engagement */}
                    <div className="bg-background-elevated rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200 overflow-hidden relative">
                        <div className="flex items-center justify-between mb-3 relative z-10">
                            <h3 className="text-sm text-neutral-500">Engagement</h3>
                            <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/10 px-2 py-0.5 rounded-full font-medium">
                                +{engagement}%
                            </span>
                        </div>
                        <p className="text-3xl font-bold mb-2 relative z-10">{engagement}%</p>
                        <div className="h-12 -mx-2">
                            <MetricsChart minimal data={[{ label: '1', value: 5 }, { label: '2', value: parseFloat(engagement) }]} height={48} color="var(--color-primary-500)" />
                        </div>
                    </div>

                    {/* Conversions (Saves) */}
                    <div className="bg-background-elevated rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200 overflow-hidden relative">
                        <div className="flex items-center justify-between mb-3 relative z-10">
                            <h3 className="text-sm text-neutral-500">Saves</h3>
                            <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full font-medium">
                                {totalSaves}
                            </span>
                        </div>
                        <p className="text-3xl font-bold mb-2 relative z-10">{formatNumber(totalSaves)}</p>
                        <div className="h-12 -mx-2">
                            <MetricsChart minimal data={[{ label: '1', value: 2 }, { label: '2', value: totalSaves }]} height={48} color="var(--color-primary-500)" />
                        </div>
                    </div>

                    {/* Total Spend */}
                    <div className="bg-background-elevated rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200 overflow-hidden relative">
                        <div className="flex items-center justify-between mb-3 relative z-10">
                            <h3 className="text-sm text-neutral-500">Total Spend</h3>
                            <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full font-medium">
                                $5 CPM
                            </span>
                        </div>
                        <p className="text-3xl font-bold mb-2 relative z-10">${totalSpend.toFixed(2)}</p>
                        <div className="h-12 -mx-2">
                            <MetricsChart minimal data={[{ label: '1', value: 100 }, { label: '2', value: totalSpend }]} height={48} color="var(--color-primary-500)" />
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Impressions Growth Chart */}
                    <div className="lg:col-span-2">
                        <MetricsChart
                            title="Impressions Growth"
                            data={chartData}
                            height={300}
                        />
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
