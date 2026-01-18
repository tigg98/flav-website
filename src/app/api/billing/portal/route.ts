import { createClient } from '@/lib/supabase/server';
import { createCustomerPortalSession } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user's Stripe customer ID
        const { data: subscription, error: subError } = await supabase
            .from('subscriptions')
            .select('stripe_customer_id, source')
            .eq('user_id', user.id)
            .single();

        if (subError || !subscription?.stripe_customer_id) {
            return NextResponse.json({
                error: 'No Stripe subscription found. You may need to subscribe first.'
            }, { status: 404 });
        }

        // If subscription is from Apple, don't allow Stripe portal
        if (subscription.source === 'apple_iap') {
            return NextResponse.json({
                error: 'Your subscription is managed through the App Store. Please manage it in your Apple device settings.',
                source: 'apple_iap'
            }, { status: 400 });
        }

        const origin = request.headers.get('origin') || 'https://flav.app';

        const portalSession = await createCustomerPortalSession(
            subscription.stripe_customer_id,
            `${origin}/account/billing`
        );

        return NextResponse.json({
            url: portalSession.url
        });
    } catch (error) {
        console.error('Portal session error:', error);
        return NextResponse.json({
            error: 'Failed to create portal session'
        }, { status: 500 });
    }
}
