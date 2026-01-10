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

            // Success!
            setSuccessMessage(`Successfully added $${amount.toFixed(2)} to your account`);
            setShowSuccess(true);
            setSelectedAmount(null);
            setCustomAmount("");

            // Refresh balance and transactions
            await fetchBillingData();

            // Hide success after 5 seconds
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (err: any) {
            setError(err.message || "Failed to add funds. Please try again.");
        } finally {
            setIsAddingFunds(false);
        }
    };

    const fundingOptions = [50, 100, 250, 500, 1000];

    // Calculate estimated runway based on average daily spend
    const calculateRunway = () => {
        const spendTransactions = transactions.filter(t => t.type === "spend");
        if (spendTransactions.length === 0) return null;

        // Calculate average daily spend based on recent transactions
        const totalSpend = spendTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
        const avgDaily = totalSpend / Math.max(spendTransactions.length, 1);

        if (avgDaily <= 0) return null;
        return Math.floor(balance / avgDaily);
    };

    const runway = calculateRunway();

    if (isLoading) {
        return (
            <div className="min-h-screen">
                <AdsNav />
                <div className="flex items-center justify-center py-20">
                    <div className="text-[var(--color-neutral-500)]">Loading billing...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <AdsNav />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold">Billing</h1>
                    <p className="text-sm text-[var(--color-neutral-500)]">
                        Manage your account balance and view transaction history
                    </p>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                        <span className="text-xl text-green-600">✓</span>
                        <div>
                            <p className="font-medium text-green-800">{successMessage}</p>
                            <p className="text-sm text-green-600">Your balance has been updated.</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                        <span className="text-xl text-red-600">⚠</span>
                        <div>
                            <p className="font-medium text-red-800">Error</p>
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                        <button
                            onClick={() => setError("")}
                            className="ml-auto text-red-400 hover:text-red-600"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Balance Card */}
                <div className="bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-2xl p-8 text-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-sm opacity-80 mb-1">Current Balance</p>
                            <p className="text-5xl font-bold">${balance.toFixed(2)}</p>
                            <p className="text-sm opacity-80 mt-2">
                                Funds are automatically deducted as your campaigns run
                            </p>
                        </div>
                        {runway !== null && runway > 0 && (
                            <div className="text-right">
                                <p className="text-sm opacity-80">Estimated runway</p>
                                <p className="text-2xl font-semibold">~{runway} days</p>
                                <p className="text-xs opacity-60">based on recent spend</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add Funds */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-[var(--color-neutral-200)]">
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
                                        ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)] text-[var(--color-primary-600)]"
                                        : "border-[var(--color-neutral-200)] hover:border-[var(--color-neutral-300)]"
                                    }`}
                            >
                                ${amount}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <div className="flex-1">
                            <label htmlFor="custom_amount" className="sr-only">
                                Custom Amount
                            </label>
                            <input
                                type="number"
                                id="custom_amount"
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
                                className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
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

                    <p className="text-xs text-[var(--color-neutral-500)] mt-4">
                        Payments are processed securely via Stripe. Minimum deposit is $10, maximum $10,000.
                    </p>
                </div>

                {/* Transaction History */}
                <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                    <div className="p-6 border-b border-[var(--color-neutral-200)]">
                        <h2 className="text-lg font-semibold">Transaction History</h2>
                        <p className="text-sm text-[var(--color-neutral-500)]">
                            Complete record of all account activity
                        </p>
                    </div>

                    {transactions.length === 0 ? (
                        <div className="text-center py-12 text-[var(--color-neutral-500)]">
                            <div className="text-4xl mb-3">📄</div>
                            <p className="font-medium">No transactions yet</p>
                            <p className="text-sm">Add funds to get started</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[var(--color-neutral-200)]">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${tx.type === "deposit"
                                                    ? "bg-green-100 text-green-600"
                                                    : tx.type === "refund"
                                                        ? "bg-blue-100 text-blue-600"
                                                        : "bg-[var(--color-neutral-100)] text-[var(--color-neutral-500)]"
                                                }`}
                                        >
                                            {tx.type === "deposit" ? "↓" : tx.type === "refund" ? "↩" : "↑"}
                                        </div>
                                        <div>
                                            <p className="font-medium">{tx.description}</p>
                                            <p className="text-sm text-[var(--color-neutral-500)]">
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
                                            className={`font-semibold ${tx.amount > 0 ? "text-green-600" : "text-[var(--color-neutral-600)]"
                                                }`}
                                        >
                                            {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                                        </span>
                                        <p className="text-xs text-[var(--color-neutral-500)]">
                                            Balance: ${tx.balance_after.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Card */}
                <div className="bg-[var(--color-neutral-50)] rounded-2xl p-6 border border-[var(--color-neutral-200)]">
                    <h3 className="font-semibold mb-2">💡 How billing works</h3>
                    <ul className="text-sm text-[var(--color-neutral-600)] space-y-2">
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
