import { ArrowUpRight, Video, Eye, Heart, DollarSign } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Dashboard</h1>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2">Welcome back to your creative studio.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Views", value: "24.5K", change: "+12%", icon: Eye },
                    { label: "Total Likes", value: "8.2K", change: "+5%", icon: Heart },
                    { label: "Recipes", value: "48", change: "+2", icon: Video },
                    { label: "Earnings", value: "$1,240", change: "+18%", icon: DollarSign, highlight: true },
                ].map((stat, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-orange-500 dark:hover:border-neutral-700 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${stat.highlight ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-500 flex items-center gap-1 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                                {stat.change} <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Recent Uploads</h2>
                        <button className="text-sm text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 font-medium">View All</button>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 flex items-center gap-4 border-b border-neutral-200 dark:border-neutral-800 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex-shrink-0" /> {/* Thumbnail placeholder */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium truncate text-neutral-900 dark:text-white">Spicy Miso Ramen with Pork Belly</h3>
                                    <div className="flex items-center gap-4 text-xs text-neutral-500 mt-1">
                                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 1.2K</span>
                                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> 245</span>
                                        <span>2 hours ago</span>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-emerald-600 dark:text-emerald-500">+$24.50</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Quick Actions</h2>
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 space-y-2">
                        <button className="w-full flex items-center justify-center gap-2 p-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90 transition-colors">
                            <Video className="w-4 h-4" /> Create Recipe
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 p-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
