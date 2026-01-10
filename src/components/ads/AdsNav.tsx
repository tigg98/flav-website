"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { signOut } from "@/app/auth/actions";

interface AdsNavProps {
    userEmail?: string;
}

export function AdsNav({ userEmail }: AdsNavProps) {
    const pathname = usePathname();

    const navItems = [
        { href: "/ads/dashboard", label: "Dashboard" },
        { href: "/ads/campaigns", label: "Campaigns" },
        { href: "/ads/billing", label: "Billing" },
        { href: "/ads/settings", label: "Settings" },
    ];

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    return (
        <header className="bg-background-elevated border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link href="/ads/dashboard" className="flex items-center gap-2">
                            <div className="relative w-8 h-8 md:w-10 md:h-10">
                                <Image
                                    src="/logo.png"
                                    alt="Flav Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold gradient-text">Flav Ads</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive(item.href)
                                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10"
                                        : "text-neutral-600 dark:text-neutral-400 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        {userEmail && (
                            <span className="hidden lg:block text-sm text-neutral-500">
                                {userEmail}
                            </span>
                        )}
                        <ThemeToggle />
                        <form action={signOut}>
                            <Button variant="outline" size="sm" className="border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800">Sign Out</Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800">
                <nav className="flex overflow-x-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${isActive(item.href)
                                ? "text-primary-600 dark:text-primary-400 border-primary-500"
                                : "text-neutral-600 dark:text-neutral-400 border-transparent hover:text-foreground"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
