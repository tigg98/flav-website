import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Advertise on Flav",
    description:
        "Reach engaged home cooks with native in-feed ads, creator partnerships, and precision targeting by dietary preference, cuisine, and meal type. Advertise on Flav today.",
    openGraph: {
        title: "Advertise on Flav",
        description:
            "Connect with food lovers through native in-feed ads, creator partnerships, and dietary-based targeting on Flav.",
    },
};

export default function AdvertiseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
