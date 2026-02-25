"use client";

interface SkeletonProps {
    className?: string
    variant?: 'text' | 'circular' | 'rectangular'
    width?: string | number
    height?: string | number
    count?: number
}

export function Skeleton({
    className = '',
    variant = 'rectangular',
    width,
    height,
    count = 1,
}: SkeletonProps) {
    const baseClasses = 'animate-pulse bg-[var(--color-neutral-200)]'

    const variantClasses = {
        text: 'rounded h-4',
        circular: 'rounded-full',
        rectangular: 'rounded-xl',
    }

    const style: React.CSSProperties = {}
    if (width) style.width = typeof width === 'number' ? `${width}px` : width
    if (height) style.height = typeof height === 'number' ? `${height}px` : height

    const items = Array.from({ length: count }, (_, i) => (
        <div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
        />
    ))

    if (count === 1) return items[0]

    return <div className="space-y-2">{items}</div>
}

// Pre-built skeleton patterns
export function CardSkeleton() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-neutral-200)] space-y-4">
            <Skeleton height={24} width="60%" />
            <Skeleton height={16} count={2} />
            <div className="flex gap-2 pt-2">
                <Skeleton height={32} width={80} className="rounded-full" />
                <Skeleton height={32} width={80} className="rounded-full" />
            </div>
        </div>
    )
}

export function TableRowSkeleton() {
    return (
        <div className="flex items-center gap-4 p-4 border-b border-[var(--color-neutral-100)]">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1 space-y-2">
                <Skeleton height={16} width="40%" />
                <Skeleton height={12} width="60%" />
            </div>
            <Skeleton height={24} width={60} className="rounded-full" />
        </div>
    )
}

export function CampaignCardSkeleton() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[var(--color-neutral-200)]">
            <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                        <Skeleton height={20} width="50%" />
                        <Skeleton height={20} width={60} className="rounded-full" />
                    </div>
                    <Skeleton height={14} width="70%" />
                </div>
                <Skeleton height={16} width={50} />
            </div>
        </div>
    )
}
