import { LoadingSpinner } from '@/components/ui/Loading'

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-[var(--color-neutral-500)]">Loading...</p>
        </div>
    )
}
