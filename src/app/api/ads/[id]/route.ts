import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

type RouteParams = { params: Promise<{ id: string }> }

export async function GET(
    request: Request,
    { params }: RouteParams
) {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: ad, error } = await supabase
        .from('ads')
        .select('*, campaigns(name)')
        .eq('id', id)
        .eq('advertiser_id', user.id)
        .single()

    if (error || !ad) {
        return NextResponse.json({ error: 'Ad not found' }, { status: 404 })
    }

    return NextResponse.json({ ad })
}

export async function PUT(
    request: Request,
    { params }: RouteParams
) {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { title, description, media_url, target_url, format, status } = body

        // Verify ownership
        const { data: existing } = await supabase
            .from('ads')
            .select('advertiser_id')
            .eq('id', id)
            .single()

        if (!existing || existing.advertiser_id !== user.id) {
            return NextResponse.json({ error: 'Ad not found' }, { status: 404 })
        }

        const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
        if (title !== undefined) updateData.title = title
        if (description !== undefined) updateData.description = description
        if (media_url !== undefined) updateData.media_url = media_url
        if (target_url !== undefined) updateData.target_url = target_url
        if (format !== undefined) updateData.format = format
        if (status !== undefined) updateData.status = status

        const { data: ad, error } = await supabase
            .from('ads')
            .update(updateData)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ ad })
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
}

export async function DELETE(
    request: Request,
    { params }: RouteParams
) {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify ownership
    const { data: existing } = await supabase
        .from('ads')
        .select('advertiser_id')
        .eq('id', id)
        .single()

    if (!existing || existing.advertiser_id !== user.id) {
        return NextResponse.json({ error: 'Ad not found' }, { status: 404 })
    }

    const { error } = await supabase
        .from('ads')
        .delete()
        .eq('id', id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
