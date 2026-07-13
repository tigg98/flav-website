import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export interface Entitlements {
    tier: 'free' | 'verified' | 'pro';
    source: 'stripe' | 'apple_iap' | null;
    status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'expired' | null;
    current_period_end: string | null;
    cancel_at_period_end: boolean;
    features: {
        can_monetize: boolean;
        payout_rate: number;
        verified_badge: boolean;
        pro_badge: boolean;
        advanced_analytics: boolean;
        priority_support: boolean;
    };
}

export async function GET() {
    try {
        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Try to use the database function first
        const { data: entitlements, error: rpcError } = await supabase
            .rpc('get_user_entitlements', { p_user_id: user.id });

        if (!rpcError && entitlements) {
            return NextResponse.json(entitlements);
        }

        // Fallback: query subscription directly
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();

        // Build entitlements from subscription
        const tier = subscription?.tier || 'free';
        const features = getFeatures(tier);

        const response: Entitlements = {
            tier,
            source: subscription?.source || null,
            status: subscription?.status || null,
            current_period_end: subscription?.current_period_end || null,
            cancel_at_period_end: subscription?.cancel_at_period_end || false,
            features,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Entitlements error:', error);
        return NextResponse.json({ error: 'Failed to fetch entitlements' }, { status: 500 });
    }
}

function getFeatures(tier: string) {
    switch (tier) {
        case 'pro':
            return {
                can_monetize: true,
                payout_rate: 0.90,
                verified_badge: true,
                pro_badge: true,
                advanced_analytics: true,
                priority_support: true,
            };
        case 'verified':
            return {
                can_monetize: true,
                payout_rate: 0.85,
                verified_badge: true,
                pro_badge: false,
                advanced_analytics: true,
                priority_support: false,
            };
        default:
            return {
                can_monetize: false,
                payout_rate: 0,
                verified_badge: false,
                pro_badge: false,
                advanced_analytics: false,
                priority_support: false,
            };
    }
}
