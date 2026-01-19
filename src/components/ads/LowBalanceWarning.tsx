"use client";

import Link from "next/link";

interface LowBalanceWarningProps {
    balance: number;
    threshold?: number;
    showAddFunds?: boolean;
}

export function LowBalanceWarning({
    balance,
    threshold = 50,
    showAddFunds = true
}: LowBalanceWarningProps) {
    if (balance >= threshold) {
        return null;
    }

    const isZero = balance <= 0;

    return (
        <div className={`p-4 rounded-xl border ${isZero
                ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20"
                : "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20"
            }`}>
            <div className="flex items-start gap-3">
                <span className="text-xl">{isZero ? "🚨" : "⚠️"}</span>
                <div className="flex-1">
                    <h3 className={`font-semibold text-sm ${isZero
                            ? "text-red-700 dark:text-red-400"
                            : "text-amber-700 dark:text-amber-400"
                        }`}>
                        {isZero ? "Balance Depleted" : "Low Balance Warning"}
                    </h3>
                    <p className={`text-sm mt-1 ${isZero
                            ? "text-red-600 dark:text-red-300"
                            : "text-amber-600 dark:text-amber-300"
                        }`}>
                        {isZero
                            ? "Your balance is $0. Active campaigns have been paused."
                            : `Your balance ($${balance.toFixed(2)}) is below $${threshold}. Add funds to keep campaigns running.`
                        }
                    </p>
                    {showAddFunds && (
                        <Link
                            href="/ads/billing"
                            className={`inline-block mt-2 text-sm font-medium underline ${isZero
                                    ? "text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                    : "text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300"
                                }`}
                        >
                            Add Funds →
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
