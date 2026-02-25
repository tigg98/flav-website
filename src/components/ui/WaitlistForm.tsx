"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowRight, Check, Loader2 } from "lucide-react";

interface WaitlistFormProps {
    className?: string;
    onSuccess?: () => void;
}

export function WaitlistForm({ className, onSuccess }: WaitlistFormProps) {
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const [error, setError] = React.useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setIsSuccess(true);
            setEmail("");
            if (onSuccess) onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className={cn("flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-2xl animate-in fade-in zoom-in duration-300", className)}>
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-3 shadow-lg shadow-green-500/20">
                    <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-1">You're on the list!</h3>
                <p className="text-sm text-green-700 dark:text-green-400 text-center mb-4">
                    We've reserved your spot. Keep an eye on your inbox for early access.
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800"
                    onClick={() => setIsSuccess(false)}
                >
                    Add another email
                </Button>
            </div>
        );
    }

    return (
        <div className={cn("w-full max-w-md", className)}>
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-xl opacity-70 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                <div className="relative flex items-center bg-white dark:bg-neutral-900 rounded-xl p-1.5 shadow-xl ring-1 ring-neutral-900/5 dark:ring-white/10">
                    <div className="relative flex-1">
                        <Input
                            type="email"
                            placeholder="Enter your email to join..."
                            className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-base shadow-none px-4 placeholder:text-neutral-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-10 px-6 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-semibold shadow-lg transition-all active:scale-95"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <span className="flex items-center gap-2">
                                Join Waitlist
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        )}
                    </Button>
                </div>
            </form>

            {error && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400 text-center animate-fade-in">
                    {error}
                </p>
            )}


        </div>
    );
}
