import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Flav Privacy Policy - How we collect, use, and protect your data.",
    alternates: {
        canonical: "https://flav.app/privacy",
    },
};

export default function PrivacyPage() {
    return (
        <div className="container-main py-16">
            <div className="max-w-3xl mx-auto prose prose-neutral prose-headings:font-bold">
                <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-[var(--color-neutral-500)] mb-8">Last updated: January 8, 2026</p>

                <p>
                    This Privacy Policy describes how Tig Tech LLC ("Company", "we", "us", or "our") collects, uses, and shares
                    information in connection with the Flav application and website (collectively, the "Service").
                </p>

                <div className="bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-800)] p-4 rounded-lg mb-6">
                    <p className="text-sm mb-2"><strong>Legal Entity:</strong> Tig Tech LLC</p>
                    <p className="text-sm"><strong>Contact:</strong> privacy@flav.app</p>
                </div>

                <h2>1. Information We Collect</h2>

                <h3>Information You Provide</h3>
                <ul>
                    <li><strong>Account Information:</strong> Name, email address, username, profile photo, and password when you create an account.</li>
                    <li><strong>Profile Information:</strong> Bio, links to other social accounts, and other information you choose to add.</li>
                    <li><strong>Content:</strong> Videos, recipes, comments, and other content you upload or post.</li>
                    <li><strong>Payment Information:</strong> Billing details processed securely through our payment provider (Stripe).</li>
                    <li><strong>Communications:</strong> Messages you send to us through support channels.</li>
                </ul>

                <h3>Information Collected Automatically</h3>
                <ul>
                    <li><strong>Usage Data:</strong> How you interact with the Service, including videos watched, saves, likes, and time spent.</li>
                    <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers, and mobile network information.</li>
                    <li><strong>Location Data:</strong> General location based on IP address (we do not collect precise location).</li>
                    <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies on our website.</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Provide, maintain, and improve the Service</li>
                    <li>Personalize your experience and content recommendations</li>
                    <li>Process transactions and send related information</li>
                    <li>Send promotional communications (with your consent)</li>
                    <li>Respond to your comments, questions, and support requests</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>Detect, prevent, and address fraud and security issues</li>
                    <li>Comply with legal obligations</li>
                </ul>

                <h2>3. Sharing of Information</h2>
                <p>We may share your information in the following circumstances:</p>
                <ul>
                    <li><strong>Public Content:</strong> Your profile, videos, and recipes are publicly visible to other users.</li>
                    <li><strong>Service Providers:</strong> Third-party vendors who help us operate the Service (hosting, analytics, payment processing).</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety.</li>
                    <li><strong>With Your Consent:</strong> When you give us permission to share your information.</li>
                </ul>

                <h2>4. Data Retention</h2>
                <p>
                    We retain your personal information for as long as your account is active or as needed to provide you
                    the Service. If you delete your account, we will delete your personal information within 30 days, except
                    as required by law or for legitimate business purposes.
                </p>

                <h2>5. Your Rights and Choices</h2>
                <p>Depending on your location, you may have certain rights regarding your personal information:</p>
                <ul>
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                    <li><strong>Portability:</strong> Request a portable copy of your data</li>
                    <li><strong>Opt-Out:</strong> Opt out of marketing communications</li>
                </ul>
                <p>To exercise these rights, contact us at privacy@flav.app.</p>

                <h2>6. Children's Privacy</h2>
                <p>
                    The Service is not intended for children under 13 years of age. We do not knowingly collect personal
                    information from children under 13. If you are a parent or guardian and believe your child has provided
                    us with personal information, please contact us.
                </p>

                <h2>7. California Privacy Rights (CCPA)</h2>
                <p>
                    California residents have additional rights under the California Consumer Privacy Act. You have the right
                    to know what personal information we collect, request deletion, and opt out of the sale of personal
                    information. We do not sell personal information.
                </p>

                <h2>8. International Data Transfers</h2>
                <p>
                    Your information may be transferred to and processed in countries other than your country of residence.
                    We take appropriate safeguards to ensure your information remains protected.
                </p>

                <h2>9. Security</h2>
                <p>
                    We implement appropriate technical and organizational measures to protect your personal information.
                    However, no method of transmission over the Internet is 100% secure.
                </p>

                <h2>10. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                    new Privacy Policy on this page and updating the "Last updated" date.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <ul>
                    <li>Email: privacy@flav.app</li>
                    <li>Company: Tig Tech LLC</li>
                </ul>
            </div>
        </div>
    );
}
