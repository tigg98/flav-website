import { cn } from "@/lib/utils";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
    return (
        <div
            className={cn(
                "group p-6 md:p-8 rounded-2xl bg-[var(--background-elevated)] border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] transition-all duration-300 hover:shadow-lg",
                className
            )}
        >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-primary-600)] mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{title}</h3>
            <p className="text-[var(--color-neutral-600)] leading-relaxed">{description}</p>
        </div>
    );
}
