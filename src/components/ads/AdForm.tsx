'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

interface AdFormProps {
    campaignId: string
    initialData?: {
        id?: string
        title: string
        description: string
        media_url: string
        target_url: string
        format: string
        status: string
    }
    isEdit?: boolean
}

const formatOptions = [
    { value: 'feed_image', label: 'Feed Image' },
    { value: 'feed_video', label: 'Feed Video' },
    { value: 'story', label: 'Story' },
]

const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'pending_review', label: 'Submit for Review' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
]

export function AdForm({ campaignId, initialData, isEdit = false }: AdFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        media_url: initialData?.media_url || '',
        target_url: initialData?.target_url || '',
        format: initialData?.format || 'feed_image',
        status: initialData?.status || 'draft',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const url = isEdit ? `/api/ads/${initialData?.id}` : '/api/ads'
            const method = isEdit ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campaign_id: campaignId,
                    ...formData,
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to save ad')
            }

            router.push(`/ads/campaigns/${campaignId}`)
            router.refresh()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this ad?')) return

        setIsDeleting(true)
        setError('')

        try {
            const res = await fetch(`/api/ads/${initialData?.id}`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to delete')
            }

            router.push(`/ads/campaigns/${campaignId}`)
            router.refresh()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete')
            setIsDeleting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                    {error}
                </div>
            )}

            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Ad Title *
                </label>
                <input
                    type="text"
                    id="title"
                    required
                    placeholder="e.g., Summer Grilling Recipe"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    rows={3}
                    placeholder="Brief description of your ad content..."
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="format" className="block text-sm font-medium mb-2">
                        Format
                    </label>
                    <select
                        id="format"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors bg-white"
                        value={formData.format}
                        onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    >
                        {formatOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {isEdit && (
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors bg-white"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            {statusOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div>
                <label htmlFor="media_url" className="block text-sm font-medium mb-2">
                    Media URL
                </label>
                <input
                    type="url"
                    id="media_url"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                    value={formData.media_url}
                    onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                />
                <p className="text-xs text-[var(--color-neutral-500)] mt-1">
                    Direct link to your image or video file
                </p>
            </div>

            <div>
                <label htmlFor="target_url" className="block text-sm font-medium mb-2">
                    Target URL
                </label>
                <input
                    type="url"
                    id="target_url"
                    placeholder="https://yourwebsite.com/landing-page"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                    value={formData.target_url}
                    onChange={(e) => setFormData({ ...formData, target_url: e.target.value })}
                />
                <p className="text-xs text-[var(--color-neutral-500)] mt-1">
                    Where users go when they click your ad
                </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-neutral-200)]">
                {isEdit ? (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Ad'}
                    </Button>
                ) : (
                    <div />
                )}
                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push(`/ads/campaigns/${campaignId}`)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Ad'}
                    </Button>
                </div>
            </div>
        </form>
    )
}
