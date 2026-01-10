import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/app/auth/actions'
import { Button } from '@/components/ui/Button'
import { CampaignList } from '@/components/ads/CampaignList'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Get user's campaign IDs
    const { data: campaigns } = await supabase
        .from('campaigns')
        .select('id, status, budget_total')
        .eq('advertiser_id', user.id)

    const campaignIds = campaigns?.map(c => c.id) || []
    const activeCampaignsCount = campaigns?.filter(c => c.status === 'active').length || 0

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

    // Calculate theoretical spend based on CPM ($5 per 1000 impressions)
    const cpm = 5
    const totalSpend = (totalImpressions / 1000) * cpm

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-[var(--background-elevated)] border-b border-[var(--color-neutral-200)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link href="/ads/dashboard" className="flex items-center gap-2">
                                <div className="relative w-8 h-8 md:w-10 md:h-10">
                                    <img src="/logo.png" alt="Flav Logo" className="object-contain w-full h-full" />
                                </div>
                                <span className="text-xl font-bold gradient-text">Flav Ads</span>
                            </Link>
                            <nav className="hidden md:flex items-center gap-6">
                                <Link href="/ads/dashboard" className="text-sm font-medium text-[var(--color-primary-600)]">
                                    Dashboard
                                </Link>
                                <Link href="/ads/settings" className="text-sm font-medium text-[var(--color-neutral-600)] hover:text-[var(--foreground)]">
                                    Settings
                                </Link>
                                <Link href="/ads/billing" className="text-sm font-medium text-[var(--color-neutral-600)] hover:text-[var(--foreground)]">
                                    Billing
                                </Link>
                            </nav>
                        </div>
                        <form action={signOut}>
                            <Button variant="outline" size="sm">Sign Out</Button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--foreground)]">Dashboard</h1>
                    <p className="text-[var(--color-neutral-500)]">Welcome back, {user.email}</p>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                        <h3 className="text-sm font-medium text-[var(--color-neutral-500)] mb-1">Active Campaigns</h3>
                        <p className="text-3xl font-bold text-[var(--color-primary-600)]">{activeCampaignsCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                        <h3 className="text-sm font-medium text-[var(--color-neutral-500)] mb-1">Total Impressions</h3>
                        <p className="text-3xl font-bold text-[var(--color-secondary-600)]">{totalImpressions.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                        <h3 className="text-sm font-medium text-[var(--color-neutral-500)] mb-1">Total Clicks</h3>
                        <p className="text-3xl font-bold text-[var(--foreground)]">{totalClicks.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                        <h3 className="text-sm font-medium text-[var(--color-neutral-500)] mb-1">Total Spend</h3>
                        <p className="text-3xl font-bold text-[var(--foreground)]">${totalSpend.toFixed(2)}</p>
                    </div>
                </div>

                {/* Campaign List */}
                <CampaignList />
            </main>
        </div>
    )
}
