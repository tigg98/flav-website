import { CampaignForm } from '@/components/ads/CampaignForm'

export default function NewCampaignPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-[var(--foreground)]">Create New Campaign</h1>
                <p className="text-[var(--color-neutral-500)]">Set up your budget and schedule</p>
            </div>

            <CampaignForm />
        </div>
    )
}
