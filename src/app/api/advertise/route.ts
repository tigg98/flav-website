import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { companyName, contactName, email, website, budget, message } = await request.json();

        if (!companyName || !contactName || !email) {
            return NextResponse.json(
                { error: 'Company name, contact name, and email are required.' },
                { status: 400 }
            );
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address.' },
                { status: 400 }
            );
        }

        const budgetLabels: Record<string, string> = {
            '<5k': 'Less than $5,000',
            '5k-25k': '$5,000 – $25,000',
            '25k-100k': '$25,000 – $100,000',
            '100k+': '$100,000+',
        };

        const { error: emailError } = await resend.emails.send({
            from: 'Flav Advertising <ads@flav.app>',
            to: 'support@flav.app',
            replyTo: email,
            subject: `New Advertiser Request: ${companyName}`,
            html: `
                <h2>New Advertiser Access Request</h2>
                <table style="border-collapse:collapse;width:100%;max-width:500px;">
                    <tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Company</td><td style="padding:8px 12px;">${companyName}</td></tr>
                    <tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Contact</td><td style="padding:8px 12px;">${contactName}</td></tr>
                    <tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Email</td><td style="padding:8px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
                    ${website ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Website</td><td style="padding:8px 12px;"><a href="${website}">${website}</a></td></tr>` : ''}
                    ${budget ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#555;">Budget</td><td style="padding:8px 12px;">${budgetLabels[budget] || budget}</td></tr>` : ''}
                </table>
                ${message ? `<h3 style="margin-top:24px;">Goals &amp; Message</h3><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
            `,
        });

        if (emailError) {
            console.error('Failed to send advertiser request email:', emailError);
            return NextResponse.json(
                { error: 'Failed to send request. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: 'Request submitted successfully.' }, { status: 200 });
    } catch (err) {
        console.error('Advertise API exception:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
