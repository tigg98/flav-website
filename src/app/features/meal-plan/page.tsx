import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "AI Meal Planning",
    description:
        "Let Flav AI generate the perfect meal plan based on your dietary needs, macros, and preferences.",
    openGraph: {
        title: "AI Meal Planning | Flav",
        description:
            "Let Flav AI generate the perfect meal plan based on your dietary needs, macros, and preferences.",
    },
    alternates: {
        canonical: "https://flav.app/features/meal-plan",
    },
};

export default function MealPlanPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden min-h-[80vh] flex items-center pt-24 pb-16">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--background)] to-[var(--color-secondary-50)] opacity-50" />
                
                <div className="container-main relative z-10">
                    <div className="text-center mb-16 lg:mb-24">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary-50)] dark:bg-[#E07A5F]/15 text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] text-sm font-semibold mb-6">
                            ✨ AI Meal Planning
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                            Plan your week in <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#e8967d]">seconds.</span>
                        </h1>
                        <p className="text-xl text-[var(--color-neutral-600)] max-w-2xl mx-auto leading-relaxed mb-8">
                            Let Flav AI generate the perfect meal plan based on your dietary needs, macros, and preferences. Or simply drag-and-drop your favorite saved recipes.
                        </p>
                        
                        <div className="flex justify-center mb-4">
                            <AppStoreButtons iosUrl="https://apps.apple.com/us/app/flav/id6759994122" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
                        {/* Left Mockup: AI Generation */}
                        <div className="flex justify-center md:justify-end relative group">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[var(--color-primary-200)] dark:bg-[#E07A5F]/25 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 transform group-hover:scale-[1.02] group-hover:-rotate-2 transition-all duration-500">
                                <IPhoneMockup
                                    src="/screenshots/meal-plan-generation.webp"
                                    alt="Flav AI generating a personalized weekly meal plan based on dietary preferences"
                                    size="lg"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right Mockup: Calendar View */}
                        <div className="flex justify-center md:justify-start relative group">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[var(--color-primary-300)] dark:bg-[#E07A5F]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 transform group-hover:scale-[1.02] group-hover:rotate-2 transition-all duration-500 md:-mt-20">
                                <IPhoneMockup
                                    src="/screenshots/meal-plan-calendar.webp"
                                    alt="Flav weekly meal plan calendar view with scheduled breakfast, lunch, and dinner recipes"
                                    size="lg"
                                    priority
                                    showBackdrop
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
