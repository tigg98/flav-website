import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AppStoreButtons } from "@/components/ui/AppStoreButtons";

/**
 * Branded 404 for the root-level [handle] segment.
 * Reached for unknown @handles (and any other unmatched root path),
 * so the copy sells the bio-link without assuming which case it was.
 */
export default function HandleNotFound() {
    return (
        <div className="min-h-screen bg-[var(--color-neutral-950)] text-white flex items-center relative overflow-hidden">
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E07A5F]/15 rounded-full blur-[120px]" />

            <div className="container-main relative z-10 py-20 text-center">
                <p className="font-mono text-sm text-[var(--color-primary-300)] mb-4">404</p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Nobody&apos;s cooking here yet.
                </h1>
                <p className="text-lg text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed">
                    This page doesn&apos;t exist — and if you were looking for a creator,
                    this <span className="font-mono text-[var(--color-primary-300)]">@handle</span>{" "}
                    isn&apos;t claimed on Flav yet. It could be yours.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                    <Button size="lg" asChild>
                        <Link href="/creators">Claim this @handle</Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-white/30 text-white hover:border-white hover:text-white"
                        asChild
                    >
                        <Link href="/">Go to flav.app</Link>
                    </Button>
                </div>

                <div className="flex justify-center">
                    <AppStoreButtons showAndroid={false} utmSource="biolink_404" />
                </div>
            </div>
        </div>
    );
}
