"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdForm } from "@/components/ads/AdForm";

export default function NewAdPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-[var(--background-elevated)] border-b border-[var(--color-neutral-200)]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link href="/ads/dashboard" className="flex items-center gap-2">
                                <div className="relative w-8 h-8">
                                    <Image src="/logo.png" alt="Flav Logo" fill className="object-contain" />
                                </div>
                                <span className="text-xl font-bold gradient-text">Flav Ads</span>
                            </Link>
                            <span className="text-[var(--color-neutral-400)]">/</span>
                            <Link href={`/ads/campaigns/${id}`} className="text-sm text-[var(--color-neutral-600)] hover:text-[var(--foreground)]">
                                Campaign
                            </Link>
                            <span className="text-[var(--color-neutral-400)]">/</span>
                            <span className="text-sm text-[var(--color-neutral-600)]">New Ad</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Create New Ad</h1>
                    <p className="text-sm text-[var(--color-neutral-500)]">
                        Design your ad creative for this campaign
                    </p>
                </div>

                <div className="bg-[var(--background-elevated)] rounded-2xl p-8 shadow-sm border border-[var(--color-neutral-200)]">
                    <AdForm campaignId={id} />
                </div>
            </main>
        </div>
    );
}
