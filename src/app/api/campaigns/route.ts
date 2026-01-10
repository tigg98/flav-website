import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: campaigns, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('advertiser_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ campaigns })
}

export async function POST(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { name, budget_total, budget_daily, start_date, end_date } = body

        if (!name || !budget_total) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const { data: campaign, error } = await supabase
            .from('campaigns')
            .insert({
                advertiser_id: user.id,
                name,
                budget_total,
                budget_daily,
                start_date,
                end_date,
                status: 'draft'
            })
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ campaign }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
}

export async function PUT(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { id, name, budget_total, budget_daily, start_date, end_date, status } = body

        if (!id) {
            return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 })
        }

        // Verify ownership
        const { data: existing } = await supabase
            .from('campaigns')
            .select('advertiser_id')
            .eq('id', id)
            .single()

        if (!existing || existing.advertiser_id !== user.id) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
        }

        const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
        if (name !== undefined) updateData.name = name
        if (budget_total !== undefined) updateData.budget_total = budget_total
        if (budget_daily !== undefined) updateData.budget_daily = budget_daily
        if (start_date !== undefined) updateData.start_date = start_date
        if (end_date !== undefined) updateData.end_date = end_date
        if (status !== undefined) updateData.status = status

        const { data: campaign, error } = await supabase
            .from('campaigns')
            .update(updateData)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ campaign })
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
}

export async function DELETE(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 })
        }

        // Verify ownership
        const { data: existing } = await supabase
            .from('campaigns')
            .select('advertiser_id')
            .eq('id', id)
            .single()

        if (!existing || existing.advertiser_id !== user.id) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
        }

        const { error } = await supabase
            .from('campaigns')
            .delete()
            .eq('id', id)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
}
