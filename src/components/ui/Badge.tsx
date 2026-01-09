import { cn } from "@/lib/utils";

interface BadgeProps {
    variant?: "verified" | "pro" | "new" | "beta";
    size?: "sm" | "md";
    className?: string;
}

export function Badge({ variant = "verified", size = "md", className }: BadgeProps) {
    const variants = {
        verified: "bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] text-white",
        pro: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
        new: "bg-[var(--color-secondary-500)] text-white",
        beta: "bg-[var(--color-neutral-600)] text-white",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
    };

    const labels = {
        verified: "✓ Verified",
        pro: "★ Pro",
        new: "New",
        beta: "Beta",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center font-semibold rounded-full shadow-sm",
                variants[variant],
                sizes[size],
                className
            )}
        >
            {labels[variant]}
        </span>
    );
}
