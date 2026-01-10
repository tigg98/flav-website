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
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unknown error occurred')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-background-elevated p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Campaign Name</label>
                <Input name="name" id="name" required placeholder="e.g. Summer Sale 2026" className="bg-background" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="budget_total" className="text-sm font-medium text-foreground">Total Budget ($)</label>
                    <Input name="budget_total" id="budget_total" type="number" min="1" step="0.01" required placeholder="1000.00" className="bg-background" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="budget_daily" className="text-sm font-medium text-foreground">Daily Budget ($)</label>
                    <Input name="budget_daily" id="budget_daily" type="number" min="1" step="0.01" required placeholder="50.00" className="bg-background" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="start_date" className="text-sm font-medium text-foreground">Start Date</label>
                    <Input name="start_date" id="start_date" type="date" required className="bg-background" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="end_date" className="text-sm font-medium text-foreground">End Date</label>
                    <Input name="end_date" id="end_date" type="date" required className="bg-background" />
                </div>
            </div>

            {error && (
                <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-200 dark:border-red-500/20">
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
