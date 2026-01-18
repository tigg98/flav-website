import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';

// POST - Create Stripe Checkout Session for adding funds
export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { amount } = body;

        // Validate amount
        if (!amount || typeof amount !== 'number' || amount < 10) {
            return NextResponse.json({
                error: 'Invalid amount. Minimum deposit is $10.'
            }, { status: 400 });
        }

        if (amount > 10000) {
            return NextResponse.json({
                error: 'Maximum single deposit is $10,000.'
            }, { status: 400 });
        }

        const origin = request.headers.get('origin') || 'https://flav.app';

        // Create a Stripe Checkout session for one-time payment
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Flav Ads Credit',
                            description: `Add $${amount.toFixed(2)} to your advertising account`,
                        },
                        unit_amount: Math.round(amount * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                user_id: user.id,
                type: 'advertiser_deposit',
                amount: amount.toString(),
            },
            success_url: `${origin}/ads/billing?success=true&amount=${amount}`,
            cancel_url: `${origin}/ads/billing?canceled=true`,
            customer_email: user.email || undefined,
        });

        return NextResponse.json({
            url: session.url,
            sessionId: session.id
        });
    } catch (error) {
        console.error('Advertiser checkout error:', error);
        return NextResponse.json({
            error: 'Failed to create checkout session'
        }, { status: 500 });
    }
}
