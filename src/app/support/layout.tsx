import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Help & Support",
    description:
        "Get help with your Flav account, billing, content, privacy settings, and more. Browse our FAQ or contact the Flav support team directly.",
    openGraph: {
        title: "Help & Support | Flav",
        description:
            "Get help with your Flav account, billing, content, and more. Browse FAQs or contact support.",
    },
    alternates: {
        canonical: "https://flav.app/support",
    },
};

export default function SupportLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
