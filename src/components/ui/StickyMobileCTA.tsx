"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

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
          asChild
        >
          <Link href="https://apps.apple.com/us/app/flav/id6759994122?utm_source=website&utm_medium=sticky_cta&utm_campaign=ios_download">
             Download the App
          </Link>
        </Button>
      </div>
    </div>
  );
}
