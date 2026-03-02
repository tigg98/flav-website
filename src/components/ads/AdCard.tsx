'use client'

import Link from 'next/link'
import Image from 'next/image'

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
    draft: "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400",
    pending_review: "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
    active: "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400",
    rejected: "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400",
    paused: "bg-[var(--color-primary-100)] dark:bg-[#E07A5F]/20 text-[var(--color-primary-700)] dark:text-[var(--color-primary-400)]",
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
            className="block bg-background rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[#E07A5F]/50 dark:hover:border-[#E07A5F]/50 hover:shadow-lg hover:shadow-[#E07A5F]/5 transition-all overflow-hidden group"
        >
            {/* Media Preview */}
            <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center relative overflow-hidden">
                {ad.media_url ? (
                    <Image
                        src={ad.media_url}
                        alt={ad.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="text-neutral-400 text-4xl">
                        {ad.format === 'feed_video' ? '🎬' : '🖼️'}
                    </div>
                )}

                {/* Format Badge */}
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] font-medium text-white uppercase tracking-wider border border-white/10 z-10">
                    {formatLabels[ad.format] || ad.format}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-foreground group-hover:text-[var(--color-primary-500)] transition-colors line-clamp-1">
                        {ad.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider shrink-0 ${statusColors[ad.status] || statusColors.draft}`}>
                        {ad.status.replace('_', ' ')}
                    </span>
                </div>

                {ad.description && (
                    <p className="text-sm text-neutral-500 line-clamp-2 mb-3">
                        {ad.description}
                    </p>
                )}

                <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                    <span className="flex items-center gap-1">
                        Created {new Date(ad.created_at).toLocaleDateString()}
                    </span>
                    <span className="group-hover:text-[var(--color-primary-500)] transition-colors flex items-center gap-1">
                        Edit <span className="text-[10px]">→</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}
