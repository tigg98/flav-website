"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />; // Placeholder to prevent layout shift
    }

    const toggleTheme = () => {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('system');
        else setTheme('light');
    };

    const icons = {
        light: <Sun className="h-[1.2rem] w-[1.2rem]" />,
        dark: <Moon className="h-[1.2rem] w-[1.2rem]" />,
        system: <Monitor className="h-[1.2rem] w-[1.2rem]" />
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-background-elevated border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title={`Current theme: ${theme}`}
        >
            {icons[theme as keyof typeof icons] || <Monitor className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
