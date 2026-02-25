"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        const baseStyles =
            "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

        const variants = {
            primary:
                "bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] text-white hover:from-[var(--color-primary-600)] hover:to-[var(--color-primary-700)] focus-visible:ring-[var(--color-primary-500)] shadow-md hover:shadow-lg",
            secondary:
                "bg-[var(--color-secondary-500)] text-white hover:bg-[var(--color-secondary-600)] focus-visible:ring-[var(--color-secondary-500)]",
            outline:
                "border-2 border-[var(--color-neutral-300)] text-[var(--foreground)] hover:border-[var(--color-primary-500)] hover:text-[var(--color-primary-600)] focus-visible:ring-[var(--color-primary-500)]",
            ghost:
                "text-[var(--foreground)] hover:bg-[var(--color-neutral-100)] focus-visible:ring-[var(--color-neutral-400)]",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <Comp
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
