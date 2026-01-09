"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/creators", label: "Creators" },
    { href: "/verified", label: "Verified" },
    { href: "/advertise", label: "Advertise" },
    { href: "/support", label: "Support" },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-[var(--background)]/95 backdrop-blur-md shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="container-main">
                <nav className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl md:text-2xl font-bold"
                    >
                        <span className="text-3xl">🍳</span>
                        <span className="gradient-text">Flav</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[var(--color-neutral-600)] hover:text-[var(--foreground)] transition-colors font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/ads/login">Advertiser Login</Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="#download">Download App</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-[var(--color-neutral-100)] transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        "md:hidden overflow-hidden transition-all duration-300",
                        isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
                    )}
                >
                    <div className="flex flex-col gap-2 pt-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-3 rounded-lg text-[var(--color-neutral-600)] hover:text-[var(--foreground)] hover:bg-[var(--color-neutral-100)] transition-colors font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 pt-2 mt-2 border-t border-[var(--color-neutral-200)]">
                            <Link
                                href="/ads/login"
                                className="px-4 py-3 rounded-lg text-center font-medium text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Advertiser Login
                            </Link>
                            <Button size="md" className="mx-4">
                                Download App
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
