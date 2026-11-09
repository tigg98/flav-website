"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";
import { appStoreUrl } from "@/lib/flav-config";

const links = [
    { href: "/#how", label: "How it works", match: "" },
    { href: "/guides", label: "Guides", match: "/guides" },
    { href: "/pricing", label: "Flav+", match: "/pricing" },
    { href: "/support", label: "Support", match: "/support" },
];

export function SiteHeader() {
    const pathname = usePathname() ?? "/";
    // The old ads portal and creator portal keep their own chrome.
    if (pathname.startsWith("/ads") || pathname.startsWith("/creators/")) return null;

    return (
        <header className="fl-page">
            <div className="fl-wrap" style={{ paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
                <Link href="/" aria-label="flav home" style={{ textDecoration: "none" }}>
                    <Wordmark />
                </Link>
                <nav aria-label="Main" style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap", fontSize: 14 }}>
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="fl-navlink fl-hide-sm"
                            aria-current={l.match && pathname.startsWith(l.match) ? "page" : undefined}
                        >
                            {l.label}
                        </Link>
                    ))}
                    <a href={appStoreUrl("web-header")} className="fl-btn fl-btn-ink fl-btn-sm">
                        Get the app
                    </a>
                </nav>
            </div>
        </header>
    );
}
