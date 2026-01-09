import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: {
        default: "Flav Ads Manager",
        template: "%s | Flav Ads",
    },
    description: "Manage your advertising campaigns on Flav",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--background-subtle)]">
            {children}
        </div>
    );
}
