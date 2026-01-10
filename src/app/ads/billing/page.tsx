"use client";

import { useState, useEffect, useCallback } from "react";
import { AdsNav } from "@/components/ads/AdsNav";
import { Button } from "@/components/ui/Button";

interface Transaction {
    id: string;
    created_at: string;
    amount: number;
    type: "deposit" | "spend" | "refund" | "adjustment";
    description: string;
    balance_after: number;
}

export default function BillingPage() {
    const [balance, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingFunds, setIsAddingFunds] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    const fetchBillingData = useCallback(async () => {
        try {
            const res = await fetch("/api/billing");
            if (!res.ok) {
                throw new Error("Failed to fetch billing data");
            }
            const data = await res.json();
            setBalance(data.balance || 0);
            setTransactions(data.transactions || []);
        } catch (err) {
            console.error("Error fetching billing data:", err);
            setError("Failed to load billing information");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBillingData();
    }, [fetchBillingData]);

    const handleAddFunds = async () => {
        const amount = selectedAmount || parseFloat(customAmount);

        if (!amount || amount < 10) {
            setError("Minimum deposit is $10");
            return;
        }

        if (amount > 10000) {
            setError("Maximum single deposit is $10,000");
            return;
        }

        setIsAddingFunds(true);
        setError("");

        try {
            const res = await fetch("/api/billing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to add funds");
            }

            setSuccessMessage(`Successfully added $${amount.toFixed(2)} to your account`);
            setShowSuccess(true);
            setSelectedAmount(null);
            setCustomAmount("");

            await fetchBillingData();

            setTimeout(() => setShowSuccess(false), 5000);
        } catch (err: any) {
            setError(err.message || "Failed to add funds. Please try again.");
        } finally {
            setIsAddingFunds(false);
        }
    };

    const fundingOptions = [50, 100, 250, 500, 1000];

    const calculateRunway = () => {
        const spendTransactions = transactions.filter(t => t.type === "spend");
        if (spendTransactions.length === 0) return null;

        const totalSpend = spendTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
        const avgDaily = totalSpend / Math.max(spendTransactions.length, 1);

        if (avgDaily <= 0) return null;
        return Math.floor(balance / avgDaily);
    };

    const runway = calculateRunway();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
                <AdsNav />
                <div className="flex items-center justify-center py-20">
                    <div className="text-neutral-500">Loading billing...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
            <AdsNav />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold">Billing</h1>
                    <p className="text-sm text-neutral-500">
                        Manage your account balance and view transaction history
                    </p>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl flex items-center gap-3">
                        <span className="text-xl text-green-600 dark:text-green-400">✓</span>
                        <div>
                            <p className="font-medium text-green-600 dark:text-green-400">{successMessage}</p>
                            <p className="text-sm text-green-700 dark:text-green-400/70">Your balance has been updated.</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-center gap-3">
                        <span className="text-xl text-red-600 dark:text-red-400">⚠</span>
                        <div>
                            <p className="font-medium text-red-600 dark:text-red-400">Error</p>
                            <p className="text-sm text-red-700 dark:text-red-400/70">{error}</p>
                        </div>
                        <button
                            onClick={() => setError("")}
                            className="ml-auto text-red-500 dark:text-red-400/50 hover:text-red-700 dark:hover:text-red-400"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Balance Card */}
                <div className="bg-background-elevated rounded-xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-sm text-neutral-500 mb-1">Current Balance</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-bold text-foreground">${balance.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-neutral-500 mt-2">
                                Funds are automatically deducted as your campaigns run
                            </p>
                        </div>
                        {runway !== null && runway > 0 && (
                            <div className="text-right">
                                <p className="text-sm text-neutral-500">Estimated runway</p>
                                <p className="text-2xl font-semibold text-foreground">~{runway} days</p>
                                <p className="text-xs text-neutral-400">based on recent spend</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add Funds */}
                <div className="bg-background-elevated rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                    <h2 className="text-lg font-semibold mb-6">Add Funds</h2>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                        {fundingOptions.map((amount) => (
                            <button
                                key={amount}
                                type="button"
                                onClick={() => {
                                    setSelectedAmount(amount);
                                    setCustomAmount("");
                                    setError("");
                                }}
                                className={`py-4 px-4 rounded-xl border-2 font-semibold transition-all ${selectedAmount === amount
                                    ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                                    : "border-neutral-200 dark:border-neutral-800 text-foreground hover:border-neutral-300 dark:hover:border-neutral-700"
                                    }`}
                            >
                                ${amount}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <div className="flex-1">
                            <input
                                type="number"
                                min="10"
                                max="10000"
                                step="0.01"
                                placeholder="Or enter custom amount ($10 - $10,000)..."
                                value={customAmount}
                                onChange={(e) => {
                                    setCustomAmount(e.target.value);
                                    setSelectedAmount(null);
                                    setError("");
                                }}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-neutral-200 dark:border-neutral-800 outline-none transition-colors placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                            />
                        </div>
                        <Button
                            onClick={handleAddFunds}
                            disabled={(!selectedAmount && !customAmount) || isAddingFunds}
                            size="lg"
                        >
                            {isAddingFunds ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                `Add $${selectedAmount || parseFloat(customAmount) || 0}`
                            )}
                        </Button>
                    </div>

                    <p className="text-xs text-neutral-500 mt-4">
                        Payments are processed securely via Stripe. Minimum deposit is $10, maximum $10,000.
                    </p>
                </div>

                {/* Transaction History */}
                <div className="bg-background-elevated rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm transition-colors duration-200">
                    <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                        <h2 className="text-lg font-semibold">Transaction History</h2>
                        <p className="text-sm text-neutral-500">
                            Complete record of all account activity
                        </p>
                    </div>

                    {transactions.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-3">📄</div>
                            <p className="font-medium">No transactions yet</p>
                            <p className="text-sm text-neutral-500">Add funds to get started</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${tx.type === "deposit"
                                                ? "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400"
                                                : tx.type === "refund"
                                                    ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                                                }`}
                                        >
                                            {tx.type === "deposit" ? "↓" : tx.type === "refund" ? "↩" : "↑"}
                                        </div>
                                        <div>
                                            <p className="font-medium">{tx.description}</p>
                                            <p className="text-sm text-neutral-500">
                                                {new Date(tx.created_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span
                                            className={`font-semibold ${tx.amount > 0 ? "text-green-600 dark:text-green-400" : "text-neutral-500"
                                                }`}
                                        >
                                            {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                                        </span>
                                        <p className="text-xs text-neutral-500">
                                            Balance: ${tx.balance_after.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Card */}
                <div className="bg-background-elevated rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
                    <h3 className="font-semibold mb-3">💡 How billing works</h3>
                    <ul className="text-sm text-neutral-500 space-y-2">
                        <li>• Add funds to your account anytime (min $10, max $10,000 per transaction)</li>
                        <li>• Funds are automatically deducted as your ads receive impressions</li>
                        <li>• Current rate: $5.00 CPM (cost per 1,000 impressions)</li>
                        <li>• All transactions are logged and available in your history</li>
                        <li>• Unused funds can be refunded—contact support@flav.app</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
