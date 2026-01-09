import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
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

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--foreground)]">Ads Manager</h1>
                    <p className="text-[var(--color-neutral-500)]">Welcome back, {user.email}</p>
                </div>
                <form action={signOut}>
                    <Button variant="outline">Sign Out</Button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                    <h3 className="text-lg font-semibold mb-2">Active Campaigns</h3>
                    <p className="text-3xl font-bold text-[var(--color-primary-600)]">0</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                    <h3 className="text-lg font-semibold mb-2">Total Impressions</h3>
                    <p className="text-3xl font-bold text-[var(--color-secondary-600)]">0</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                    <h3 className="text-lg font-semibold mb-2">Spread (Cost)</h3>
                    <p className="text-3xl font-bold text-[var(--foreground)]">$0.00</p>
                </div>
            </div>

            <CampaignList />
        </div>
    )
}
