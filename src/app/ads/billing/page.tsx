"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Mock transaction data - in production this would come from Stripe/database
const mockTransactions = [
    { id: "1", date: "2026-01-08", description: "Added funds", amount: 500, type: "credit" },
    { id: "2", date: "2026-01-05", description: "Campaign: Summer Grilling", amount: -45.50, type: "debit" },
    { id: "3", date: "2026-01-03", description: "Campaign: Summer Grilling", amount: -32.25, type: "debit" },
    { id: "4", date: "2026-01-01", description: "Added funds", amount: 200, type: "credit" },
];

export default function BillingPage() {
    const [isAddingFunds, setIsAddingFunds] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

    // Mock balance - in production this would come from the database
    const currentBalance = 622.25;

    const handleAddFunds = async () => {
        if (!selectedAmount) return;

        setIsAddingFunds(true);

        // In production, this would create a Stripe Checkout session
        // For now, we'll just show an alert
        setTimeout(() => {
            alert(`Stripe Checkout would open for $${selectedAmount}. This feature requires STRIPE_SECRET_KEY to be configured.`);
            setIsAddingFunds(false);
            setSelectedAmount(null);
        }, 500);
    };

    const fundingOptions = [50, 100, 250, 500, 1000];

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-[var(--background-elevated)] border-b border-[var(--color-neutral-200)]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link href="/ads/dashboard" className="flex items-center gap-2">
                                <div className="relative w-8 h-8">
                                    <img src="/logo.png" alt="Flav Logo" className="object-contain w-full h-full" />
                                </div>
                                <span className="text-xl font-bold gradient-text">Flav Ads</span>
                            </Link>
                            <span className="text-[var(--color-neutral-400)]">/</span>
                            <span className="text-sm text-[var(--color-neutral-600)]">Billing</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="/ads/dashboard" className="text-sm font-medium text-[var(--color-neutral-600)] hover:text-[var(--foreground)]">
                                Dashboard
                            </Link>
                            <Link href="/ads/settings" className="text-sm font-medium text-[var(--color-neutral-600)] hover:text-[var(--foreground)]">
                                Settings
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold">Billing</h1>
                    <p className="text-sm text-[var(--color-neutral-500)]">
                        Manage your account balance and payment methods
                    </p>
                </div>

                {/* Balance Card */}
                <div className="bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-2xl p-8 text-white">
                    <p className="text-sm opacity-80 mb-1">Current Balance</p>
                    <p className="text-4xl font-bold mb-6">${currentBalance.toFixed(2)}</p>
                    <p className="text-sm opacity-80">
                        Funds are automatically deducted as your campaigns run
                    </p>
                </div>

                {/* Add Funds */}
                <div className="bg-[var(--background-elevated)] rounded-2xl p-8 shadow-sm border border-[var(--color-neutral-200)]">
                    <h2 className="text-lg font-semibold mb-4">Add Funds</h2>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                        {fundingOptions.map((amount) => (
                            <button
                                key={amount}
                                type="button"
                                onClick={() => setSelectedAmount(amount)}
                                className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all ${selectedAmount === amount
                                        ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)] text-[var(--color-primary-600)]'
                                        : 'border-[var(--color-neutral-200)] hover:border-[var(--color-neutral-300)]'
                                    }`}
                            >
                                ${amount}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label htmlFor="custom_amount" className="sr-only">Custom Amount</label>
                            <input
                                type="number"
                                id="custom_amount"
                                min="10"
                                placeholder="Or enter custom amount..."
                                className="w-full px-4 py-3 rounded-xl border border-[var(--color-neutral-300)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-500)]/20 outline-none transition-colors"
                                onChange={(e) => setSelectedAmount(Number(e.target.value) || null)}
                            />
                        </div>
                        <Button
                            onClick={handleAddFunds}
                            disabled={!selectedAmount || isAddingFunds}
                            size="lg"
                        >
                            {isAddingFunds ? 'Processing...' : `Add $${selectedAmount || 0}`}
                        </Button>
                    </div>

                    <p className="text-xs text-[var(--color-neutral-500)] mt-4">
                        Payments are processed securely via Stripe. Minimum deposit is $10.
                    </p>
                </div>

                {/* Transaction History */}
                <div className="bg-[var(--background-elevated)] rounded-2xl p-8 shadow-sm border border-[var(--color-neutral-200)]">
                    <h2 className="text-lg font-semibold mb-4">Transaction History</h2>

                    <div className="divide-y divide-[var(--color-neutral-200)]">
                        {mockTransactions.map((tx) => (
                            <div key={tx.id} className="py-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{tx.description}</p>
                                    <p className="text-sm text-[var(--color-neutral-500)]">
                                        {new Date(tx.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <span className={`font-semibold ${tx.type === 'credit'
                                        ? 'text-green-600'
                                        : 'text-[var(--color-neutral-600)]'
                                    }`}>
                                    {tx.type === 'credit' ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {mockTransactions.length === 0 && (
                        <div className="text-center py-8 text-[var(--color-neutral-500)]">
                            No transactions yet
                        </div>
                    )}
                </div>

                {/* Payment Methods */}
                <div className="bg-[var(--background-elevated)] rounded-2xl p-8 shadow-sm border border-[var(--color-neutral-200)]">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Payment Methods</h2>
                        <Button variant="outline" size="sm" onClick={() => alert("Stripe Payment Methods UI would open here.")}>
                            Add Card
                        </Button>
                    </div>

                    <div className="text-center py-8 border-2 border-dashed border-[var(--color-neutral-200)] rounded-xl">
                        <div className="text-3xl mb-2">💳</div>
                        <p className="text-[var(--color-neutral-500)]">
                            No payment methods saved yet
                        </p>
                        <p className="text-sm text-[var(--color-neutral-400)]">
                            Save a card for faster checkout
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
