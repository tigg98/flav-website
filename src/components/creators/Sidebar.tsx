"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video, BarChart3, Wallet, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigation = [
    { name: "Dashboard", href: "/creators/dashboard", icon: LayoutDashboard },
    { name: "Content", href: "/creators/content", icon: Video },
    { name: "Analytics", href: "/creators/analytics", icon: BarChart3 },
    { name: "Earnings", href: "/creators/earnings", icon: Wallet },
    { name: "Settings", href: "/creators/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-full flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white transition-colors">
            {/* Logo Area */}
            <div className="flex h-16 items-center px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
                    <span className="text-[var(--color-primary-600)] dark:text-[var(--color-primary-500)]">Flav</span>
                    <span className="text-neutral-500 dark:text-neutral-400 font-normal text-sm border-l border-neutral-300 dark:border-neutral-700 pl-2 ml-2">Studio</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-[var(--color-primary-50)] dark:bg-[#E07A5F]/10 text-[var(--color-primary-600)] dark:text-[var(--color-primary-500)]"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5 flex-shrink-0 transition-colors",
                                    isActive ? "text-[var(--color-primary-600)] dark:text-[var(--color-primary-500)]" : "text-neutral-500 group-hover:text-black dark:group-hover:text-white"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User / Footer */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 p-4">
                <div className="flex items-center gap-2">
                    <button className="flex-1 group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white transition-all text-left">
                        <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden border border-neutral-300 dark:border-neutral-700">
                            {/* Placeholder Avatar */}
                            <div className="w-full h-full bg-gradient-to-tr from-[var(--color-primary-400)] to-rose-400" />
                        </div>
                        <div className="flex flex-col items-start text-xs">
                            <span className="font-semibold text-neutral-900 dark:text-white">Chef Ty</span>
                            <span>View Profile</span>
                        </div>
                    </button>
                    <ThemeToggle className="flex-shrink-0" />
                </div>
            </div>
        </div>
    );
}
