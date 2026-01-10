import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import { DollarSign, Wallet, CreditCard, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function EarningsPage() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Monetization</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">Manage your revenue streams and payouts.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-xl font-medium transition-colors border border-neutral-200 dark:border-transparent">
                        Export CSV
                    </button>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-emerald-900/20">
                        Cash Out Now
                    </button>
                </div>
            </div>

            {/* Hero Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-800 shadow-xl dark:shadow-none relative overflow-hidden group transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/10 dark:group-hover:bg-orange-500/20 transition-all duration-500" />
                    <div className="relative">
                        <div className="text-neutral-500 dark:text-neutral-400 font-medium mb-1 flex items-center gap-2">
                            <Wallet className="w-4 h-4" /> Available Balance
                        </div>
                        <div className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">$1,240.50</div>
                        <div className="text-sm text-neutral-500">Ready to payout to Chase ***8892</div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
                    <div className="text-neutral-500 dark:text-neutral-400 font-medium mb-1">Lifetime Earnings</div>
                    <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">$12,840.00</div>
                    <div className="text-sm text-emerald-500 flex items-center gap-1">
                        +18% <ArrowUpRight className="w-3 h-3" /> <span className="text-neutral-500 dark:text-neutral-500">vs last month</span>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
                    <div className="text-neutral-500 dark:text-neutral-400 font-medium mb-1">Pending Payouts</div>
                    <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">$540.00</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-500">Estimated arrival: Mar 15</div>
                </div>
            </div>

            {/* Main Chart Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Revenue History</h2>
                            <select className="bg-neutral-100 dark:bg-neutral-800 border-none text-sm rounded-lg py-1 px-3 text-neutral-900 dark:text-white cursor-pointer">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <EarningsChart />
                    </div>

                    {/* Income Streams */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                            <h3 className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-4 uppercase tracking-wider">Top Sources</h3>
                            <div className="space-y-4">
                                {[
                                    { label: "Premium Subs", value: "$840.00", percent: "65%" },
                                    { label: "Tips", value: "$120.50", percent: "15%" },
                                    { label: "Brand Deals", value: "$280.00", percent: "20%" },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-neutral-700 dark:text-neutral-300">{item.label}</span>
                                            <span className="font-bold text-neutral-900 dark:text-white">{item.value}</span>
                                        </div>
                                        <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-500" style={{ width: item.percent }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <TransactionsList />
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6">
                        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Payout Settings</h2>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden p-1">
                                <Image
                                    src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://chase.com&size=64"
                                    alt="Chase Bank"
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm">Chase Bank</div>
                                <div className="text-xs text-neutral-400">Checking ****8892</div>
                            </div>
                            <div className="px-2 py-1 text-xs font-bold bg-emerald-500/10 text-emerald-500 rounded">
                                Active
                            </div>
                        </div>

                        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
                            <h3 className="text-sm font-bold text-neutral-500 dark:text-neutral-400">Tax Documents</h3>
                            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm text-neutral-700 dark:text-neutral-300">
                                <span>2025 - 1099-K</span>
                                <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm text-neutral-700 dark:text-neutral-300">
                                <span>W-9 Form</span>
                                <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                            </button>
                        </div>

                        <button className="w-full py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 font-medium text-sm transition-colors text-neutral-900 dark:text-white">
                            Manage Stripe Account
                        </button>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-lg">
                        <h2 className="text-xl font-bold mb-2">Flav Pro</h2>
                        <p className="text-white/90 text-sm mb-4">
                            You're saving 0% in platform fees because you are a Pro member.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold backdrop-blur">
                            Savings: $248.00 this month
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
