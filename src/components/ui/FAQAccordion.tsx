"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={cn("divide-y divide-[var(--color-neutral-200)]", className)}>
            {items.map((item, index) => (
                <div key={index} className="py-4">
                    <button
                        className="flex items-center justify-between w-full text-left gap-4"
                        onClick={() => toggleItem(index)}
                        aria-expanded={openIndex === index}
                    >
                        <span className="text-lg font-semibold text-[var(--foreground)]">
                            {item.question}
                        </span>
                        <span
                            className={cn(
                                "flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-neutral-100)] flex items-center justify-center transition-transform duration-200",
                                openIndex === index && "rotate-180"
                            )}
                        >
                            <svg
                                className="w-4 h-4 text-[var(--color-neutral-600)]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </span>
                    </button>
                    <div
                        className={cn(
                            "overflow-hidden transition-all duration-300",
                            openIndex === index ? "max-h-96 mt-3" : "max-h-0"
                        )}
                    >
                        <p className="text-[var(--color-neutral-600)] leading-relaxed">
                            {item.answer}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
