"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";

const cols = [
    {
        title: "Flav",
        links: [
            { href: "/#how", label: "How it works" },
            { href: "/try", label: "Try it on a link" },
            { href: "/pricing", label: "Pricing" },
            { href: "/guides", label: "Guides" },
        ],
    },
    {
        title: "Recipes",
        links: [
            { href: "/recipes/high-protein", label: "High protein" },
            { href: "/recipes/meal-prep", label: "Meal prep" },
            { href: "/recipes/under-30-minutes", label: "Under 30 minutes" },
            { href: "/recipes", label: "All categories" },
        ],
    },
    {
        title: "Compare",
        links: [
            { href: "/compare/paprika", label: "Flav vs Paprika" },
            { href: "/compare/samsung-food", label: "Flav vs Samsung Food" },
            { href: "/compare/mealime", label: "Flav vs Mealime" },
        ],
    },
    {
        title: "Help",
        links: [
            { href: "/support", label: "Support" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
        ],
    },
];

export function SiteFooter() {
    const pathname = usePathname() ?? "/";
    if (pathname.startsWith("/ads") || pathname.startsWith("/creators/")) return null;

    return (
        <footer className="fl-page" style={{ borderTop: "1px solid var(--fl-hairline)" }}>
            <div className="fl-wrap" style={{ paddingTop: 48, paddingBottom: 56, display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 280 }}>
                    <Wordmark size={20} />
                    <p className="fl-body" style={{ fontSize: 13, lineHeight: "20px" }}>
                        Any cooking video, written down. Made by Tig Tech LLC in Austin, Texas.
                    </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 48 }}>
                    {cols.map((c) => (
                        <nav key={c.title} aria-label={c.title} style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 140 }}>
                            <span className="fl-micro">{c.title}</span>
                            {c.links.map((l) => (
                                <Link key={l.href} href={l.href} className="fl-navlink" style={{ fontSize: 14 }}>
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    ))}
                </div>
            </div>
            <div className="fl-wrap" style={{ paddingBottom: 40 }}>
                <span className="fl-body" style={{ fontSize: 12 }}>© {new Date().getFullYear()} Tig Tech LLC</span>
            </div>
        </footer>
    );
}
