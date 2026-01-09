'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function CampaignForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name'),
            budget_total: parseFloat(formData.get('budget_total') as string),
            budget_daily: parseFloat(formData.get('budget_daily') as string),
            start_date: formData.get('start_date'),
            end_date: formData.get('end_date'),
        }

        try {
            const res = await fetch('/api/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const json = await res.json()
                throw new Error(json.error || 'Failed to create campaign')
            }

            router.push('/ads/dashboard')
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Campaign Name</label>
                <Input name="name" id="name" required placeholder="e.g. Summer Sale 2026" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="budget_total" className="text-sm font-medium">Total Budget ($)</label>
                    <Input name="budget_total" id="budget_total" type="number" min="1" step="0.01" required placeholder="1000.00" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="budget_daily" className="text-sm font-medium">Daily Budget ($)</label>
                    <Input name="budget_daily" id="budget_daily" type="number" min="1" step="0.01" required placeholder="50.00" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="start_date" className="text-sm font-medium">Start Date</label>
                    <Input name="start_date" id="start_date" type="date" required />
                </div>
                <div className="space-y-2">
                    <label htmlFor="end_date" className="text-sm font-medium">End Date</label>
                    <Input name="end_date" id="end_date" type="date" required />
                </div>
            </div>

            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                    {error}
                </div>
            )}

            <div className="flex justify-end gap-4">
                <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Campaign'}
                </Button>
            </div>
        </form>
    )
}
