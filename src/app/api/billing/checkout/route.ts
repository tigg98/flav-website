import { createClient } from '@/lib/supabase/server';
import { createCheckoutSession, PRICE_IDS } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { tier, interval = 'month' } = body;

        // Validate tier
        if (!tier || !['verified', 'pro'].includes(tier)) {
            return NextResponse.json({
                error: 'Invalid tier. Must be "verified" or "pro".'
            }, { status: 400 });
        }

        // Validate interval
        if (!['month', 'year'].includes(interval)) {
            return NextResponse.json({
                error: 'Invalid interval. Must be "month" or "year".'
            }, { status: 400 });
        }

        // Check if user already has a Stripe customer ID
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('stripe_customer_id')
            .eq('user_id', user.id)
            .single();

        const origin = request.headers.get('origin') || 'https://flav.app';

        // Create checkout session
        const session = await createCheckoutSession({
            userId: user.id,
            userEmail: user.email || '',
            tier: tier as 'verified' | 'pro',
            interval: interval as 'month' | 'year',
            successUrl: `${origin}/account/billing?success=true`,
            cancelUrl: `${origin}/account/billing?canceled=true`,
            customerId: subscription?.stripe_customer_id || undefined,
        });

        return NextResponse.json({
            url: session.url,
            sessionId: session.id
        });
    } catch (error) {
        console.error('Checkout session error:', error);
        return NextResponse.json({
            error: 'Failed to create checkout session'
        }, { status: 500 });
    }
}

// Return available prices for client
export async function GET() {
    return NextResponse.json({
        verified: {
            monthly: { price: '$7.99', priceId: PRICE_IDS.verified.month },
            yearly: { price: '$69.99', priceId: PRICE_IDS.verified.year, savings: '~27%' },
        },
        pro: {
            monthly: { price: '$19.99', priceId: PRICE_IDS.pro.month },
            yearly: { price: '$179.99', priceId: PRICE_IDS.pro.year, savings: '~25%' },
        },
    });
}
