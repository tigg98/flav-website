"use client";

interface ScrollToButtonProps {
    targetId: string;
    children: React.ReactNode;
    className?: string;
}

export function ScrollToButton({ targetId, children, className }: ScrollToButtonProps) {
    return (
        <button
            onClick={() => {
                document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={className}
        >
            {children}
        </button>
    );
}
