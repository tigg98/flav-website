import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your Waitlist Position",
    description:
        "Track your position on the Flav Android waitlist and invite friends to unlock rewards.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function WaitlistCodeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
