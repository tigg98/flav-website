"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video, BarChart3, Wallet, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <div className="flex h-full w-full flex-col bg-neutral-900 border-r border-neutral-800 text-white">
            {/* Logo Area */}
            <div className="flex h-16 items-center px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
                    <span className="text-orange-500">Flav</span>
                    <span className="text-neutral-400 font-normal text-sm border-l border-neutral-700 pl-2 ml-2">Studio</span>
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
                                    ? "bg-orange-500/10 text-orange-500"
                                    : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5 flex-shrink-0 transition-colors",
                                    isActive ? "text-orange-500" : "text-neutral-500 group-hover:text-white"
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User / Footer */}
            <div className="border-t border-neutral-800 p-4">
                <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all">
                    <div className="h-8 w-8 rounded-full bg-neutral-800 overflow-hidden border border-neutral-700">
                        {/* Placeholder Avatar */}
                        <div className="w-full h-full bg-gradient-to-tr from-orange-500 to-rose-500" />
                    </div>
                    <div className="flex flex-col items-start text-xs">
                        <span className="font-semibold text-white">Chef Ty</span>
                        <span className="text-neutral-500">View Profile</span>
                    </div>
                    <LogOut className="ml-auto h-4 w-4 text-neutral-500 group-hover:text-white" />
                </button>
            </div>
        </div>
    );
}
