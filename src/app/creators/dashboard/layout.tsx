import { Sidebar } from "@/components/creators/Sidebar";

export default function CreatorDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-neutral-950 text-white overflow-hidden font-sans">
            {/* Sidebar - Hidden on mobile for now (would need a mobile drawer) */}
            <aside className="w-64 hidden md:block border-r border-neutral-800">
                <Sidebar />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative">
                {/* Mobile Header (placeholder) */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900">
                    <span className="font-bold text-orange-500">Flav Studio</span>
                    {/* Mobile menu trigger would go here */}
                </div>

                <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
