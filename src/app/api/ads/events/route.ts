import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { sanitizeString } from '@/lib/security'

const VALID_EVENT_TYPES = ['impression', 'click', 'save']
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const MAX_BATCH_SIZE = 20

interface EventPayload {
    ad_id: string
    campaign_id: string
    event_type: string
    device_id?: string
    metadata?: Record<string, unknown>
}

interface EventResult {
    ad_id: string
    event_type: string
    success: boolean
    charged?: boolean
    error?: string
}

export async function POST(request: Request) {
    try {
        const supabase = await createAdminClient()

        let events: EventPayload[]
        try {
            const raw = await request.json()
            if (Array.isArray(raw.events)) {
                events = raw.events
            } else if (raw.ad_id) {
                events = [raw as EventPayload]
            } else {
                return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
            }
        } catch {
            return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        if (events.length === 0) {
            return NextResponse.json({ error: 'No events provided' }, { status: 400 })
        }

        if (events.length > MAX_BATCH_SIZE) {
            return NextResponse.json(
                { error: `Max ${MAX_BATCH_SIZE} events per batch` },
                { status: 400 }
            )
        }

        // Optional auth
        const { data: { user } } = await supabase.auth.getUser()
        const userId = user?.id || null

        const results: EventResult[] = []

        for (const event of events) {
            const eventType = sanitizeString(event.event_type)

            if (!VALID_EVENT_TYPES.includes(eventType)) {
                results.push({ ad_id: event.ad_id, event_type: eventType, success: false, error: 'Invalid event type' })
                continue
            }

            if (!UUID_REGEX.test(event.ad_id) || !UUID_REGEX.test(event.campaign_id)) {
                results.push({ ad_id: event.ad_id, event_type: eventType, success: false, error: 'Invalid ID format' })
                continue
            }

            if (eventType === 'impression') {
                // Atomic: dedup + spend deduction + event recording
                const { data, error } = await supabase.rpc('record_impression', {
                    p_ad_id: event.ad_id,
                    p_campaign_id: event.campaign_id,
                    p_user_id: userId,
                    p_device_id: event.device_id || null,
                    p_metadata: event.metadata || {},
                })

                if (error) {
                    results.push({ ad_id: event.ad_id, event_type: eventType, success: false, error: error.message })
                } else {
                    results.push({
                        ad_id: event.ad_id,
                        event_type: eventType,
                        success: data?.success ?? false,
                        charged: data?.charged ?? false,
                        error: data?.error,
                    })
                }
            } else {
                // Click and save: simple insert, no billing
                const { error } = await supabase
                    .from('ad_events')
                    .insert({
                        ad_id: event.ad_id,
                        campaign_id: event.campaign_id,
                        event_type: eventType,
                        user_id: userId,
                        metadata: {
                            ...(event.metadata || {}),
                            device_id: event.device_id || null,
                        },
                    })

                results.push({
                    ad_id: event.ad_id,
                    event_type: eventType,
                    success: !error,
                    error: error?.message,
                })
            }
        }

        return NextResponse.json({ results })
    } catch (err) {
        console.error('Ad events exception:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
