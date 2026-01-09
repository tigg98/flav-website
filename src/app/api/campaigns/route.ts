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
