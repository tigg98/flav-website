import Stripe from 'stripe';

// Lazy initialization to avoid build-time errors when env vars aren't set
let stripeClient: Stripe | null = null;

function getStripeClient(): Stripe {
    if (!stripeClient) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is not set');
        }
        stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    return stripeClient;
}

// Lazy proxy for stripe client - avoids module-level instantiation
export const stripe = {
    get checkout() { return getStripeClient().checkout; },
    get customers() { return getStripeClient().customers; },
    get subscriptions() { return getStripeClient().subscriptions; },
    get billingPortal() { return getStripeClient().billingPortal; },
    get webhooks() { return getStripeClient().webhooks; },
};

// Price IDs mapping - actual Stripe price IDs
export const PRICE_IDS = {
    verified: {
        month: process.env.STRIPE_VERIFIED_MONTHLY_PRICE_ID || 'price_1SqnvsC0EZpx18HSsVKrG6tf',
        year: process.env.STRIPE_VERIFIED_YEARLY_PRICE_ID || 'price_1SqnvsC0EZpx18HSsVKrG6tf', // Update when yearly price created
    },
    pro: {
        month: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || 'price_1SqnwKC0EZpx18HSacLMKHBO',
        year: process.env.STRIPE_PRO_YEARLY_PRICE_ID || 'price_1SqnwKC0EZpx18HSacLMKHBO', // Update when yearly price created
    },
} as const;

// Map price IDs to tiers
export function getTierFromPriceId(priceId: string): 'verified' | 'pro' | null {
    if (
        priceId === PRICE_IDS.verified.month ||
        priceId === PRICE_IDS.verified.year
    ) {
        return 'verified';
    }
    if (
        priceId === PRICE_IDS.pro.month ||
        priceId === PRICE_IDS.pro.year
    ) {
        return 'pro';
    }
    return null;
}

export type SubscriptionTier = 'free' | 'verified' | 'pro';
export type SubscriptionInterval = 'month' | 'year';

export interface CreateCheckoutParams {
    userId: string;
    userEmail: string;
    tier: 'verified' | 'pro';
    interval: SubscriptionInterval;
    successUrl: string;
    cancelUrl: string;
    customerId?: string;
}

export async function createCheckoutSession(params: CreateCheckoutParams) {
    const client = getStripeClient();
    const priceId = PRICE_IDS[params.tier][params.interval];

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
        metadata: {
            user_id: params.userId,
            tier: params.tier,
        },
        subscription_data: {
            metadata: {
                user_id: params.userId,
                tier: params.tier,
            },
        },
    };

    // Use existing customer if available
    if (params.customerId) {
        sessionConfig.customer = params.customerId;
    } else {
        sessionConfig.customer_email = params.userEmail;
    }

    return client.checkout.sessions.create(sessionConfig);
}

export async function createCustomerPortalSession(
    customerId: string,
    returnUrl: string
) {
    const client = getStripeClient();
    return client.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });
}

export function constructWebhookEvent(
    payload: string | Buffer,
    signature: string
): Stripe.Event {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    }

    return getStripeClient().webhooks.constructEvent(payload, signature, webhookSecret);
}
