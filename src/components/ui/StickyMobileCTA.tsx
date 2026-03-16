"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (~600px)
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-white/95 dark:bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 px-4 py-3 safe-bottom">
        <Button
          size="lg"
          className="w-full rounded-xl text-base font-semibold"
          onClick={() => {
            const el = document.getElementById("waitlist");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
              // Focus the email input after scrolling
              setTimeout(() => {
                const input = el.querySelector("input[type='email']");
                if (input instanceof HTMLInputElement) {
                  input.focus();
                }
              }, 500);
            }
          }}
        >
          Get Early Access
        </Button>
      </div>
    </div>
  );
}
