import { Sidebar } from "@/components/creators/Sidebar";

export default function CreatorDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-hidden font-sans transition-colors">
            {/* Sidebar - Hidden on mobile for now (would need a mobile drawer) */}
            <aside className="w-64 hidden md:block border-r border-neutral-200 dark:border-neutral-800 transition-colors">
                <Sidebar />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative">
                {/* Mobile Header (placeholder) */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors">
                    <span className="font-bold text-[var(--color-primary-600)] dark:text-[var(--color-primary-500)]">Flav Studio</span>
                    {/* Mobile menu trigger would go here */}
                </div>

                <div className="p-6 md:px-12 md:py-8 max-w-[1600px] mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
