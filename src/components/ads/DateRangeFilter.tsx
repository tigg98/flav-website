"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export function DateRangeFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentRange = searchParams.get("range") || "30d";

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        router.push(pathname + "?" + createQueryString("range", value));
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="date-range" className="text-sm font-medium text-neutral-500 whitespace-nowrap hidden sm:block">
                Date Range:
            </label>
            <select
                id="date-range"
                value={currentRange}
                onChange={handleChange}
                className="bg-background-elevated text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500/20 transition-all cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700"
            >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="all">All Time</option>
            </select>
        </div>
    );
}
