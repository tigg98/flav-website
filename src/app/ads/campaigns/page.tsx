import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdsNav } from "@/components/ads/AdsNav";
import { Button } from "@/components/ui/Button";
import { CampaignStatusToggle } from "@/components/ads/CampaignStatusToggle";
import { LowBalanceWarning } from "@/components/ads/LowBalanceWarning";

const statusColors: Record<string, string> = {
    draft: "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400",
    submitted: "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
    approved: "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400",
    active: "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400",
    paused: "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400",
    ended: "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400",
};

function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
}

export default async function CampaignsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Get user's campaigns
    const { data: campaigns } = await supabase
        .from("campaigns")
        .select("*")
        .eq("advertiser_id", user.id)
        .order("created_at", { ascending: false });

    // Get user's balance
    const { data: balanceData } = await supabase
        .from("advertiser_balances")
        .select("balance")
        .eq("id", user.id)
        .single();

    const balance = parseFloat(balanceData?.balance) || 0;

    // Get ad events for each campaign
    const campaignIds = campaigns?.map((c) => c.id) || [];
    let campaignStats: Record<string, { impressions: number; clicks: number; saves: number }> = {};

    if (campaignIds.length > 0) {
        const { data: events } = await supabase
            .from("ad_events")
            .select("campaign_id, event_type")
            .in("campaign_id", campaignIds);

        if (events) {
            for (const event of events) {
                if (!campaignStats[event.campaign_id]) {
                    campaignStats[event.campaign_id] = { impressions: 0, clicks: 0, saves: 0 };
                }
                if (event.event_type === "impression") campaignStats[event.campaign_id].impressions++;
                if (event.event_type === "click") campaignStats[event.campaign_id].clicks++;
                if (event.event_type === "save") campaignStats[event.campaign_id].saves++;
            }
        }
    }

    // Calculate totals
    const totalImpressions = Object.values(campaignStats).reduce((sum, s) => sum + s.impressions, 0);
    const totalClicks = Object.values(campaignStats).reduce((sum, s) => sum + s.clicks, 0);
    const activeCampaigns = campaigns?.filter(c => c.status === 'active').length || 0;

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
            <AdsNav userEmail={user.email} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Campaigns</h1>
                        <p className="text-sm text-neutral-500">
                            {campaigns?.length || 0} total campaigns
                        </p>
                    </div>
                    <Link href="/ads/campaigns/new">
                        <Button>+ New Campaign</Button>
                    </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-background-elevated rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                        <p className="text-sm text-neutral-500 mb-1">Active</p>
                        <p className="text-2xl font-bold">{activeCampaigns}</p>
                    </div>
                    <div className="bg-background-elevated rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                        <p className="text-sm text-neutral-500 mb-1">Total Impressions</p>
                        <p className="text-2xl font-bold">{formatNumber(totalImpressions)}</p>
                    </div>
                    <div className="bg-background-elevated rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                        <p className="text-sm text-neutral-500 mb-1">Total Clicks</p>
                        <p className="text-2xl font-bold">{formatNumber(totalClicks)}</p>
                    </div>
                </div>

                {/* Low Balance Warning */}
                <LowBalanceWarning balance={balance} />

                {/* Campaigns */}
                {!campaigns || campaigns.length === 0 ? (
                    <div className="bg-background-elevated rounded-xl border border-neutral-200 dark:border-neutral-800 p-12 text-center shadow-sm transition-colors duration-200">
                        <div className="text-5xl mb-4">📊</div>
                        <h2 className="text-xl font-semibold mb-2">No campaigns yet</h2>
                        <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                            Create your first campaign to start reaching millions of food lovers on Flav.
                        </p>
                        <Link href="/ads/campaigns/new">
                            <Button size="lg">Create Your First Campaign</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="bg-background-elevated rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm transition-colors duration-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-neutral-200 dark:border-neutral-800">
                                        <th className="text-left px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Campaign
                                        </th>
                                        <th className="text-left px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="text-right px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Impressions
                                        </th>
                                        <th className="text-right px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Clicks
                                        </th>
                                        <th className="text-right px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Saves
                                        </th>
                                        <th className="text-right px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Budget
                                        </th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                    {campaigns.map((campaign) => {
                                        const stats = campaignStats[campaign.id] || { impressions: 0, clicks: 0, saves: 0 };
                                        return (
                                            <tr key={campaign.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={`/ads/campaigns/${campaign.id}`}
                                                        className="font-medium hover:text-primary-500"
                                                    >
                                                        {campaign.name}
                                                    </Link>
                                                    <p className="text-sm text-neutral-500">
                                                        {campaign.start_date} – {campaign.end_date}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status] || statusColors.draft
                                                            }`}
                                                    >
                                                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right text-neutral-500">{formatNumber(stats.impressions)}</td>
                                                <td className="px-6 py-4 text-right text-neutral-500">{formatNumber(stats.clicks)}</td>
                                                <td className="px-6 py-4 text-right text-neutral-500">{formatNumber(stats.saves)}</td>
                                                <td className="px-6 py-4 text-right font-medium">
                                                    ${campaign.budget_total?.toLocaleString() || 0}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <CampaignStatusToggle
                                                            campaignId={campaign.id}
                                                            currentStatus={campaign.status}
                                                        />
                                                        <Link
                                                            href={`/ads/campaigns/${campaign.id}`}
                                                            className="text-sm text-primary-500 hover:text-primary-600"
                                                        >
                                                            Edit →
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
