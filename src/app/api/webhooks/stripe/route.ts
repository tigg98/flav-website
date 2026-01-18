import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe, getTierFromPriceId } from '@/lib/stripe';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';

// Use Node.js runtime for raw body access
export const runtime = 'nodejs';

// Create admin client for webhook processing (bypasses RLS)
function getAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing Supabase admin credentials');
    }

    return createAdminClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: Request) {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        console.error('No Stripe signature found');
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error('STRIPE_WEBHOOK_SECRET not set');
        }

        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const supabase = getAdminClient();

    // Idempotency check
    const { data: existingEvent } = await supabase
        .from('stripe_events')
        .select('event_id')
        .eq('event_id', event.id)
        .single();

    if (existingEvent) {
        console.log(`Event ${event.id} already processed, skipping`);
        return NextResponse.json({ received: true, skipped: true });
    }

    try {
        // Process the event
        await handleStripeEvent(event, supabase);

        // Record event as processed
        await supabase.from('stripe_events').insert({
            event_id: event.id,
            event_type: event.type,
            payload: event.data.object,
        });

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}

async function handleStripeEvent(event: Stripe.Event, supabase: ReturnType<typeof getAdminClient>) {
    switch (event.type) {
        case 'checkout.session.completed':
            await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session, supabase);
            break;

        case 'customer.subscription.created':
        case 'customer.subscription.updated':
            await handleSubscriptionUpdate(event.data.object as Stripe.Subscription, supabase);
            break;

        case 'customer.subscription.deleted':
            await handleSubscriptionDeleted(event.data.object as Stripe.Subscription, supabase);
            break;

        case 'invoice.payment_succeeded':
            await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice, supabase);
            break;

        case 'invoice.payment_failed':
            await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice, supabase);
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }
}

async function handleCheckoutCompleted(
    session: Stripe.Checkout.Session,
    supabase: ReturnType<typeof getAdminClient>
) {
    const userId = session.metadata?.user_id;
    const tier = session.metadata?.tier as 'verified' | 'pro';
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    if (!userId || !tier) {
        console.error('Missing user_id or tier in checkout session metadata');
        return;
    }

    // Get subscription details
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subData = subscription as any;

    await supabase
        .from('subscriptions')
        .upsert({
            user_id: userId,
            tier,
            source: 'stripe',
            status: 'active',
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            current_period_start: subData.current_period_start ? new Date(subData.current_period_start * 1000).toISOString() : null,
            current_period_end: subData.current_period_end ? new Date(subData.current_period_end * 1000).toISOString() : null,
            cancel_at_period_end: subData.cancel_at_period_end ?? false,
            updated_at: new Date().toISOString(),
        }, {
            onConflict: 'user_id',
        });

    await logAudit(supabase, userId, 'subscription_created', {
        tier,
        source: 'stripe',
        stripe_subscription_id: subscriptionId,
    });
}

async function handleSubscriptionUpdate(
    subscription: Stripe.Subscription,
    supabase: ReturnType<typeof getAdminClient>
) {
    const userId = subscription.metadata?.user_id;

    if (!userId) {
        // Try to find user by customer ID
        const { data: existingSub } = await supabase
            .from('subscriptions')
            .select('user_id')
            .eq('stripe_subscription_id', subscription.id)
            .single();

        if (!existingSub) {
            console.error('Could not find user for subscription:', subscription.id);
            return;
        }

        await updateSubscriptionRecord(subscription, existingSub.user_id, supabase);
        return;
    }

    await updateSubscriptionRecord(subscription, userId, supabase);
}

async function updateSubscriptionRecord(
    subscription: Stripe.Subscription,
    userId: string,
    supabase: ReturnType<typeof getAdminClient>
) {
    const priceId = subscription.items.data[0]?.price.id;
    const tier = getTierFromPriceId(priceId) || 'verified';

    // Map Stripe status to our status
    let status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'expired';
    switch (subscription.status) {
        case 'active':
            status = 'active';
            break;
        case 'canceled':
            status = 'canceled';
            break;
        case 'past_due':
            status = 'past_due';
            break;
        case 'trialing':
            status = 'trialing';
            break;
        case 'unpaid':
        case 'incomplete_expired':
            status = 'expired';
            break;
        default:
            status = 'active';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subData = subscription as any;

    await supabase
        .from('subscriptions')
        .upsert({
            user_id: userId,
            tier,
            source: 'stripe',
            status,
            stripe_customer_id: subscription.customer as string,
            stripe_subscription_id: subscription.id,
            current_period_start: subData.current_period_start ? new Date(subData.current_period_start * 1000).toISOString() : null,
            current_period_end: subData.current_period_end ? new Date(subData.current_period_end * 1000).toISOString() : null,
            cancel_at_period_end: subData.cancel_at_period_end ?? false,
            updated_at: new Date().toISOString(),
        }, {
            onConflict: 'user_id',
        });

    await logAudit(supabase, userId, 'subscription_updated', {
        tier,
        status,
        cancel_at_period_end: subscription.cancel_at_period_end,
    });
}

async function handleSubscriptionDeleted(
    subscription: Stripe.Subscription,
    supabase: ReturnType<typeof getAdminClient>
) {
    // Find user by subscription ID
    const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', subscription.id)
        .single();

    if (!existingSub) {
        console.error('Could not find user for deleted subscription:', subscription.id);
        return;
    }

    // Set tier back to free
    await supabase
        .from('subscriptions')
        .update({
            tier: 'free',
            status: 'canceled',
            cancel_at_period_end: false,
            updated_at: new Date().toISOString(),
        })
        .eq('user_id', existingSub.user_id);

    await logAudit(supabase, existingSub.user_id, 'subscription_canceled', {
        stripe_subscription_id: subscription.id,
    });
}

async function handleInvoicePaymentSucceeded(
    invoice: Stripe.Invoice,
    supabase: ReturnType<typeof getAdminClient>
) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscriptionId = (invoice as any).subscription as string;

    if (!subscriptionId) return;

    const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', subscriptionId)
        .single();

    if (!existingSub) return;

    // Update status to active (in case it was past_due)
    await supabase
        .from('subscriptions')
        .update({
            status: 'active',
            updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscriptionId);

    await logAudit(supabase, existingSub.user_id, 'payment_succeeded', {
        invoice_id: invoice.id,
        amount: invoice.amount_paid,
    });
}

async function handleInvoicePaymentFailed(
    invoice: Stripe.Invoice,
    supabase: ReturnType<typeof getAdminClient>
) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscriptionId = (invoice as any).subscription as string;

    if (!subscriptionId) return;

    const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', subscriptionId)
        .single();

    if (!existingSub) return;

    await supabase
        .from('subscriptions')
        .update({
            status: 'past_due',
            updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscriptionId);

    await logAudit(supabase, existingSub.user_id, 'payment_failed', {
        invoice_id: invoice.id,
        amount: invoice.amount_due,
    });
}

async function logAudit(
    supabase: ReturnType<typeof getAdminClient>,
    userId: string,
    action: string,
    details: Record<string, unknown>
) {
    await supabase.from('subscription_audit_logs').insert({
        user_id: userId,
        action,
        details,
    });
}
