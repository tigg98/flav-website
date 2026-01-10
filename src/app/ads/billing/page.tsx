"use client";

import { useState } from "react";
import { AdsNav } from "@/components/ads/AdsNav";
import { Button } from "@/components/ui/Button";

// Mock transaction data - in production this would come from Stripe/database
const mockTransactions = [
    { id: "1", date: "2026-01-08", description: "Added funds", amount: 500, type: "credit" as const },
    { id: "2", date: "2026-01-05", description: "Campaign: Summer Grilling", amount: -45.50, type: "debit" as const },
    { id: "3", date: "2026-01-03", description: "Campaign: Summer Grilling", amount: -32.25, type: "debit" as const },
    { id: "4", date: "2026-01-01", description: "Added funds", amount: 200, type: "credit" as const },
];

export default function BillingPage() {
    const [isAddingFunds, setIsAddingFunds] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock balance - in production this would come from the database
    const currentBalance = 622.25;

    const handleAddFunds = async () => {
        if (!selectedAmount) return;

        setIsAddingFunds(true);

        // Simulate processing
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success message
        setIsAddingFunds(false);
        setShowSuccess(true);
        setSelectedAmount(null);

        // Hide success after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const fundingOptions = [50, 100, 250, 500, 1000];

    return (
        <div className="min-h-screen">
            <AdsNav />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold">Billing</h1>
                    <p className="text-sm text-[var(--color-neutral-500)]">
                        Manage your account balance and payment methods
                    </p>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                        <span className="text-xl">✓</span>
                        <div>
                            <p className="font-medium text-green-800">Funds added successfully!</p>
                            <p className="text-sm text-green-600">Your balance has been updated.</p>
                        </div>
                    </div>
                )}

                {/* Balance Card */}
                <div className="bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-2xl p-8 text-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-sm opacity-80 mb-1">Current Balance</p>
                            <p className="text-5xl font-bold">${currentBalance.toFixed(2)}</p>
                            <p className="text-sm opacity-80 mt-2">
                                Funds are automatically deducted as your campaigns run
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm opacity-80">Estimated runway</p>
                            <p className="text-2xl font-semibold">~12 days</p>
                            <p className="text-xs opacity-60">at $50/day spend</p>
                        </div>
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
                                onClick={() => setSelectedAmount(amount)}
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
                                placeholder="Or enter custom amount..."
                                className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                onChange={(e) => setSelectedAmount(Number(e.target.value) || null)}
                            />
                        </div>
                        <Button onClick={handleAddFunds} disabled={!selectedAmount || isAddingFunds} size="lg">
                            {isAddingFunds ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                `Add $${selectedAmount || 0}`
                            )}
                        </Button>
                    </div>

                    <p className="text-xs text-[var(--color-neutral-500)] mt-4">
                        Payments are processed securely via Stripe. Minimum deposit is $10.
                    </p>
                </div>

                {/* Transaction History */}
                <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-neutral-200)]">
                    <div className="p-6 border-b border-[var(--color-neutral-200)]">
                        <h2 className="text-lg font-semibold">Transaction History</h2>
                    </div>

                    <div className="divide-y divide-[var(--color-neutral-200)]">
                        {mockTransactions.map((tx) => (
                            <div key={tx.id} className="px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "credit"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-[var(--color-neutral-100)] text-[var(--color-neutral-500)]"
                                            }`}
                                    >
                                        {tx.type === "credit" ? "↓" : "↑"}
                                    </div>
                                    <div>
                                        <p className="font-medium">{tx.description}</p>
                                        <p className="text-sm text-[var(--color-neutral-500)]">
                                            {new Date(tx.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`font-semibold ${tx.type === "credit" ? "text-green-600" : "text-[var(--color-neutral-600)]"
                                        }`}
                                >
                                    {tx.type === "credit" ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {mockTransactions.length === 0 && (
                        <div className="text-center py-12 text-[var(--color-neutral-500)]">
                            <div className="text-3xl mb-2">📄</div>
                            No transactions yet
                        </div>
                    )}
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-[var(--color-neutral-200)]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">Payment Methods</h2>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert("Stripe Payment Methods UI would open here.")}
                        >
                            + Add Card
                        </Button>
                    </div>

                    <div className="text-center py-8 border-2 border-dashed border-[var(--color-neutral-200)] rounded-xl">
                        <div className="text-4xl mb-3">💳</div>
                        <p className="font-medium text-[var(--color-neutral-700)]">No payment methods saved</p>
                        <p className="text-sm text-[var(--color-neutral-500)]">Save a card for faster checkout</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
