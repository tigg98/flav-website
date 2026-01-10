import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdsNav } from "@/components/ads/AdsNav";
import { Button } from "@/components/ui/Button";

const statusColors: Record<string, string> = {
    draft: "bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]",
    submitted: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    active: "bg-green-100 text-green-700",
    paused: "bg-orange-100 text-orange-700",
    ended: "bg-[var(--color-neutral-200)] text-[var(--color-neutral-500)]",
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

    return (
        <div className="min-h-screen">
            <AdsNav userEmail={user.email} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Campaigns</h1>
                        <p className="text-sm text-[var(--color-neutral-500)]">
                            {campaigns?.length || 0} total campaigns
                        </p>
                    </div>
                    <Link href="/ads/campaigns/new">
                        <Button>+ New Campaign</Button>
                    </Link>
                </div>

                {/* Campaigns */}
                {!campaigns || campaigns.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-[var(--color-neutral-200)] p-12 text-center">
                        <div className="text-5xl mb-4">📊</div>
                        <h2 className="text-xl font-semibold mb-2">No campaigns yet</h2>
                        <p className="text-[var(--color-neutral-500)] mb-6 max-w-md mx-auto">
                            Create your first campaign to start reaching millions of food lovers on Flav.
                        </p>
                        <Link href="/ads/campaigns/new">
                            <Button size="lg">Create Your First Campaign</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-[var(--color-neutral-200)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--color-neutral-200)] bg-[var(--background-subtle)]">
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">
                                            Campaign
                                        </th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">
                                            Status
                                        </th>
                                        <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">
                                            Impressions
                                        </th>
                                        <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">
                                            Clicks
                                        </th>
                                        <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">
                                            Saves
                                        </th>
                                        <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--color-neutral-600)]">
                                            Budget
                                        </th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--color-neutral-200)]">
                                    {campaigns.map((campaign) => {
                                        const stats = campaignStats[campaign.id] || { impressions: 0, clicks: 0, saves: 0 };
                                        return (
                                            <tr key={campaign.id} className="hover:bg-[var(--background-subtle)] transition-colors">
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={`/ads/campaigns/${campaign.id}`}
                                                        className="font-semibold hover:text-[var(--color-primary-600)]"
                                                    >
                                                        {campaign.name}
                                                    </Link>
                                                    <p className="text-sm text-[var(--color-neutral-500)]">
                                                        {campaign.start_date} – {campaign.end_date}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[campaign.status] || statusColors.draft
                                                            }`}
                                                    >
                                                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">{formatNumber(stats.impressions)}</td>
                                                <td className="px-6 py-4 text-right">{formatNumber(stats.clicks)}</td>
                                                <td className="px-6 py-4 text-right">{formatNumber(stats.saves)}</td>
                                                <td className="px-6 py-4 text-right font-semibold">
                                                    ${campaign.budget_total?.toLocaleString() || 0}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={`/ads/campaigns/${campaign.id}`}
                                                        className="text-sm text-[var(--color-primary-600)] hover:underline"
                                                    >
                                                        Edit →
                                                    </Link>
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
