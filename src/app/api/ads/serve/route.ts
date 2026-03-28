import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { sanitizeString } from '@/lib/security'

const VALID_FORMATS = ['feed_image', 'feed_video', 'story']

interface ServedAd {
    ad_id: string
    campaign_id: string
    advertiser_id: string
    title: string
    description: string | null
    media_url: string | null
    target_url: string | null
    format: string
    relevance_score: number
}

export async function GET(request: Request) {
    const requestId = crypto.randomUUID()

    try {
        const supabase = await createAdminClient()
        const { searchParams } = new URL(request.url)

        // Parse and validate params
        const format = sanitizeString(searchParams.get('format') || 'feed_image')
        const limitRaw = parseInt(searchParams.get('limit') || '3', 10)
        const limit = isNaN(limitRaw) ? 3 : Math.max(1, Math.min(limitRaw, 10))
        const deviceId = sanitizeString(searchParams.get('device_id') || '')
        const preferencesRaw = searchParams.get('preferences') || ''

        const preferences: string[] = preferencesRaw
            ? preferencesRaw.split(',').map(s => sanitizeString(s)).filter(Boolean)
            : []

        if (!VALID_FORMATS.includes(format)) {
            return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
        }

        // Optional auth — anonymous users get ads too
        const { data: { user } } = await supabase.auth.getUser()

        const { data: ads, error } = await supabase.rpc('serve_ads', {
            p_user_preferences: preferences,
            p_format: format,
            p_limit: limit,
        })

        if (error) {
            console.error('Ad serve error:', error)
            return NextResponse.json({ ads: [], request_id: requestId })
        }

        // Strip internal fields from response
        const sanitizedAds = ((ads || []) as ServedAd[]).map((ad) => ({
            ad_id: ad.ad_id,
            campaign_id: ad.campaign_id,
            title: ad.title,
            description: ad.description,
            media_url: ad.media_url,
            target_url: ad.target_url,
            format: ad.format,
        }))

        return NextResponse.json(
            { ads: sanitizedAds, request_id: requestId },
            {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                    'X-Request-Id': requestId,
                },
            }
        )
    } catch (err) {
        console.error('Ad serve exception:', err)
        // Never break the feed — return empty ads on any failure
        return NextResponse.json({ ads: [], request_id: requestId })
    }
}
