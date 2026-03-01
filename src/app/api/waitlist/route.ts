import { createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize at module level. Won't break if API key is missing until it's used.
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Use admin client to bypass RLS for waitlist insertion
        const supabase = await createAdminClient();

        const { error } = await supabase
            .from('waitlist')
            .insert({ email });

        if (error) {
            console.error('Waitlist error:', error);
            // Handle unique constraint violation gracefully
            if (error.code === '23505') { // unique_violation
                return NextResponse.json(
                    { message: 'You are already on the waitlist!' },
                    { status: 200 } // Treat as success for UX
                );
            }
            return NextResponse.json(
                { error: 'Something went wrong. Please try again.' },
                { status: 500 }
            );
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
        } else {
            console.warn('RESEND_API_KEY is missing. Welcome email was not sent.');
        }

        return NextResponse.json(
            { message: "You're on the list!" },
            { status: 200 }
        );
    } catch (err) {
        console.error('Waitlist exception:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
