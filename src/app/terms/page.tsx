import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Flav Terms of Service - Rules and guidelines for using our platform.",
    alternates: {
        canonical: "https://flav.app/terms",
    },
};

export default function TermsPage() {
    return (
        <div className="container-main py-16">
            <div className="max-w-3xl mx-auto prose prose-neutral prose-headings:font-bold">
                <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
                <p className="text-[var(--color-neutral-500)] mb-8">Last updated: January 8, 2026</p>

                <p>
                    These Terms of Service are a legal agreement between you and Tig Tech LLC, the owner and operator of
                    the Flav application ("we", "us", "our", or "Flav"). These Terms govern your access to and use of the
                    Flav mobile application and website (collectively, the "Service"). By accessing or using the Service,
                    you agree to be bound by these Terms.
                </p>

                <div className="bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-800)] p-4 rounded-lg mb-6">
                    <p className="text-sm"><strong>Operating Entity:</strong> Tig Tech LLC</p>
                </div>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By creating an account or using the Service, you agree to these Terms and our Privacy Policy. If you
                    do not agree, do not use the Service. You must be at least 13 years old to use the Service.
                </p>

                <h2>2. Account Registration</h2>
                <p>
                    To use certain features, you must create an account. You agree to provide accurate information and
                    keep it updated. You are responsible for maintaining the confidentiality of your account credentials
                    and for all activities under your account.
                </p>

                <h2>3. User Content</h2>
                <h3>Your Content</h3>
                <p>
                    You retain ownership of content you post ("User Content"). By posting User Content, you grant Flav
                    a non-exclusive, worldwide, royalty-free license to use, display, reproduce, and distribute your
                    content in connection with the Service.
                </p>

                <h3>Content Guidelines</h3>
                <p>You agree not to post content that:</p>
                <ul>
                    <li>Is illegal, harmful, threatening, abusive, or harassing</li>
                    <li>Infringes on intellectual property rights of others</li>
                    <li>Contains sexually explicit material or nudity</li>
                    <li>Promotes violence, discrimination, or hate speech</li>
                    <li>Is spam, misleading, or deceptive</li>
                    <li>Contains malware or malicious code</li>
                    <li>Violates any applicable laws or regulations</li>
                </ul>

                <h2>4. Prohibited Conduct</h2>
                <p>You agree not to:</p>
                <ul>
                    <li>Use the Service for any illegal purpose</li>
                    <li>Impersonate any person or entity</li>
                    <li>Interfere with or disrupt the Service</li>
                    <li>Attempt to access accounts or data not belonging to you</li>
                    <li>Use automated means to access the Service without permission</li>
                    <li>Collect user information without consent</li>
                    <li>Circumvent any security measures</li>
                </ul>

                <h2>5. Creator Monetization</h2>
                <h3>Eligibility</h3>
                <p>
                    To participate in monetization features (tips, premium recipes), you must meet eligibility requirements
                    and comply with our Creator Terms available in the app.
                </p>

                <h3>Payments</h3>
                <p>
                    Flav processes payments through third-party providers. We are not responsible for errors or failures
                    by payment providers. Payouts are subject to applicable fees and minimum thresholds.
                </p>

                <h3>Taxes</h3>
                <p>
                    You are responsible for reporting and paying any taxes on income earned through the Service.
                </p>

                <h2>6. Subscriptions</h2>
                <p>
                    Verified and Pro subscriptions are billed monthly or annually as selected. Subscriptions automatically
                    renew unless canceled. Refunds are handled according to app store policies.
                </p>

                <h2>7. Intellectual Property</h2>
                <p>
                    The Service and its original content (excluding User Content), features, and functionality are owned
                    by Flav and are protected by copyright, trademark, and other intellectual property laws.
                </p>

                <h2>8. DMCA and Copyright</h2>
                <p>
                    We respect intellectual property rights. If you believe content on the Service infringes your copyright,
                    please send a DMCA notice to: copyright@flav.app
                </p>

                <h2>9. Disclaimers</h2>
                <p>
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
                    WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
                </p>

                <h2>10. Limitation of Liability</h2>
                <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, FLAV SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                    CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
                </p>

                <h2>11. Indemnification</h2>
                <p>
                    You agree to indemnify and hold harmless Flav and its officers, directors, employees, and agents from
                    any claims arising from your use of the Service or violation of these Terms.
                </p>

                <h2>12. Dispute Resolution</h2>
                <p>
                    Any disputes arising from these Terms or the Service shall be resolved through binding arbitration
                    in accordance with the American Arbitration Association rules. You waive the right to participate
                    in class actions.
                </p>

                <h2>13. Termination</h2>
                <p>
                    We may suspend or terminate your account at any time for violation of these Terms or for any other
                    reason. You may delete your account at any time through the app settings.
                </p>

                <h2>14. Changes to Terms</h2>
                <p>
                    We may modify these Terms at any time. Continued use of the Service after changes constitutes
                    acceptance of the new Terms. We will provide notice of material changes through the app or email.
                </p>

                <h2>15. General</h2>
                <p>
                    These Terms constitute the entire agreement between you and Flav regarding the Service. If any
                    provision is found unenforceable, the remaining provisions will continue in effect. Our failure
                    to enforce any right does not waive that right.
                </p>

                <h2>16. Contact</h2>
                <p>
                    For questions about these Terms, please contact us at:
                </p>
                <ul>
                    <li>Email: legal@flav.app</li>
                    <li>Company: Tig Tech LLC</li>
                </ul>
            </div>
        </div>
    );
}
