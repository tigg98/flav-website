import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('campaign_id')

    let query = supabase
        .from('ads')
        .select('*, campaigns(name)')
        .eq('advertiser_id', user.id)
        .order('created_at', { ascending: false })

    if (campaignId) {
        query = query.eq('campaign_id', campaignId)
    }

    const { data: ads, error } = await query

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ads })
}

export async function POST(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { campaign_id, title, description, media_url, target_url, format } = body

        if (!campaign_id || !title) {
            return NextResponse.json({ error: 'Campaign ID and title are required' }, { status: 400 })
        }

        // Verify campaign ownership
        const { data: campaign } = await supabase
            .from('campaigns')
            .select('advertiser_id')
            .eq('id', campaign_id)
            .single()

        if (!campaign || campaign.advertiser_id !== user.id) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
        }

        const { data: ad, error } = await supabase
            .from('ads')
            .insert({
                campaign_id,
                advertiser_id: user.id,
                title,
                description: description || null,
                media_url: media_url || null,
                target_url: target_url || null,
                format: format || 'feed_image',
                status: 'draft'
            })
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ ad }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
}
