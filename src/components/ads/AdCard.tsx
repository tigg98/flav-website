'use client'

import Link from 'next/link'

interface Ad {
    id: string
    title: string
    description: string | null
    media_url: string | null
    target_url: string | null
    status: string
    format: string
    created_at: string
}

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    pending_review: 'bg-yellow-100 text-yellow-700',
    active: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    paused: 'bg-orange-100 text-orange-700',
}

const formatLabels: Record<string, string> = {
    feed_image: 'Image',
    feed_video: 'Video',
    story: 'Story',
}

interface AdCardProps {
    ad: Ad
    campaignId: string
}

export function AdCard({ ad, campaignId }: AdCardProps) {
    return (
        <Link
            href={`/ads/campaigns/${campaignId}/ads/${ad.id}`}
            className="block bg-white rounded-xl border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] hover:shadow-md transition-all overflow-hidden group"
        >
            {/* Media Preview */}
            <div className="aspect-video bg-[var(--color-neutral-100)] flex items-center justify-center">
                {ad.media_url ? (
                    <img
                        src={ad.media_url}
                        alt={ad.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-[var(--color-neutral-400)] text-4xl">
                        {ad.format === 'feed_video' ? '🎬' : '🖼️'}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold group-hover:text-[var(--color-primary-600)] transition-colors line-clamp-1">
                        {ad.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${statusColors[ad.status] || 'bg-gray-100 text-gray-700'}`}>
                        {ad.status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                </div>

                {ad.description && (
                    <p className="text-sm text-[var(--color-neutral-500)] line-clamp-2 mb-2">
                        {ad.description}
                    </p>
                )}

                <div className="flex items-center justify-between text-xs text-[var(--color-neutral-400)]">
                    <span className="flex items-center gap-1">
                        <span>{formatLabels[ad.format] || ad.format}</span>
                    </span>
                    <span className="group-hover:text-[var(--color-primary-500)] transition-colors">
                        Edit →
                    </span>
                </div>
            </div>
        </Link>
    )
}
