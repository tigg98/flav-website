import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateReferralCode(): string {
    return crypto.randomBytes(4).toString('hex'); // 8-char hex code
}

export async function POST(request: Request) {
    try {
        const { email, ref, utm_source, utm_medium, utm_campaign } = await request.json();

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        const supabase = await createClient();
        const referralCode = generateReferralCode();

        // Insert new waitlist entry with referral code
        const { data, error } = await supabase
            .from('waitlist')
            .insert({
                email,
                referral_code: referralCode,
                referred_by: ref || null,
                utm_source: utm_source || null,
                utm_medium: utm_medium || null,
                utm_campaign: utm_campaign || null,
            })
            .select('id, referral_code, position, referral_count, tier')
            .single();

        if (error) {
            console.error('Waitlist error:', error);

            // Handle unique constraint violation (already signed up)
            if (error.code === '23505') {
                // Fetch their existing entry so they can still see their referral dashboard
                const { data: existing } = await supabase
                    .from('waitlist')
                    .select('referral_code, position, referral_count, tier')
                    .eq('email', email)
                    .single();

                return NextResponse.json({
                    message: 'You are already on the waitlist!',
                    referral_code: existing?.referral_code,
                    position: existing?.position,
                    referral_count: existing?.referral_count || 0,
                    tier: existing?.tier || 'standard',
                    already_joined: true,
                }, { status: 200 });
            }

            return NextResponse.json(
                { error: 'Something went wrong. Please try again.' },
                { status: 500 }
            );
        }

        // If referred by someone, increment their referral count
        if (ref) {
            const { data: referrer } = await supabase
                .from('waitlist')
                .select('id, referral_count')
                .eq('referral_code', ref)
                .single();

            if (referrer) {
                await supabase
                    .from('waitlist')
                    .update({ referral_count: referrer.referral_count + 1 })
                    .eq('id', referrer.id);
            }
        }

        // Send Welcome Email
        if (process.env.RESEND_API_KEY) {
            try {
                const { error: emailError } = await resend.emails.send({
                    from: 'Flav <welcome@flav.app>',
                    to: email,
                    template: {
                        id: 'vip-waitlist-confirmation'
                    },
                });

                if (emailError) {
                    console.error('Failed to send welcome email:', emailError);
                }
            } catch (emailException) {
                console.error('Exception sending welcome email:', emailException);
            }
        }

        return NextResponse.json({
            message: "You're on the list!",
            referral_code: data.referral_code,
            position: data.position,
            referral_count: data.referral_count,
            tier: data.tier,
        }, { status: 200 });
    } catch (err) {
        console.error('Waitlist exception:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// GET endpoint to look up a waitlist entry by referral code (for the dashboard)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');

        if (!code) {
            return NextResponse.json({ error: 'Missing referral code' }, { status: 400 });
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from('waitlist')
            .select('referral_code, position, referral_count, tier')
            .eq('referral_code', code)
            .single();

        if (error || !data) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        console.error('Waitlist GET exception:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
