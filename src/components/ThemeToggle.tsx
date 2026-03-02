"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, theme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
                "relative rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                className
            )}
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 scale-100 transition-all dark:scale-0 dark:absolute text-[var(--color-primary-500)]" />
            <Moon className="h-5 w-5 scale-0 transition-all dark:scale-100 absolute dark:static text-neutral-400" />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
