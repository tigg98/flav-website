"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Link2, Loader2, Sparkles, Wand2, ChefHat, Clock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImportDemo() {
    const [url, setUrl] = React.useState("");
    const [state, setState] = React.useState<"idle" | "importing" | "complete">("idle");
    const [progress, setProgress] = React.useState(0);
    const [recipeData, setRecipeData] = React.useState<{
        title: string;
        image: string;
        ingredients: string[];
        url: string;
    } | null>(null);

    const handleImport = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setState("importing");
        setProgress(0);
        setRecipeData(null);

        // Simulate progress for better UX while fetching
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return 90; // Hold at 90% until complete
                return prev + 10;
            });
        }, 500);

        try {
            const response = await fetch("/api/extract", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) throw new Error("Failed to extract");

            const data = await response.json();

            // map description to ingredients list (simple split by newline or comma)
            const ingredients = data.description
                ? data.description.split(/,|\n/).filter((i: string) => i.trim().length > 0).slice(0, 5)
                : ["No ingredients found"];

            setRecipeData({
                title: data.title,
                image: data.image,
                ingredients: ingredients,
                url: data.url
            });

            clearInterval(interval);
            setProgress(100);
            setTimeout(() => setState("complete"), 200);

        } catch (err) {
            console.error(err);
            clearInterval(interval);
            setState("idle");
            setProgress(0);
            alert("Failed to import recipe. Please try another link.");
        }
    };

    const reset = () => {
        setUrl("");
        setState("idle");
        setProgress(0);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden relative">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

                <div className="grid md:grid-cols-2">
                    {/* Left Panel: Input */}
                    <div className="p-8 md:p-12 flex flex-col justify-center relative z-10 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-semibold mb-6 w-fit border border-blue-100 dark:border-blue-800">
                            <Link2 className="w-3 h-3" />
                            Import from Social
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Paste a video link. <br />
                            <span className="text-neutral-400">Get a recipe instantly.</span>
                        </h3>

                        <p className="text-neutral-500 dark:text-neutral-400 mb-8">
                            Flav's AI watches the video for you, extracting ingredients, steps, and timings in seconds.
                        </p>

                        <form onSubmit={handleImport} className="relative group">
                            <div className="flex gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                                <div className="relative flex-1">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                        <Link2 className="w-4 h-4" />
                                    </div>
                                    <Input
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="Paste TikTok or Instagram link..."
                                        className="pl-9 bg-transparent border-none shadow-none h-10 text-sm focus-visible:ring-0"
                                        disabled={state !== "idle"}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={state !== "idle" || !url}
                                    className="bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20"
                                >
                                    {state === "importing" ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : state === "complete" ? (
                                        <Sparkles className="w-4 h-4" />
                                    ) : (
                                        "Import"
                                    )}
                                </Button>
                            </div>
                        </form>

                        {/* Social Icons Row */}
                        <div className="flex gap-4 mt-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Add SVG icons for TikTok, Instagram, YouTube Shorts here if needed, or keeping it simple */}
                            <div className="text-xs text-neutral-400 font-medium">Supports Instagram Reels, TikTok, and YouTube Shorts</div>
                        </div>
                    </div>

                    {/* Right Panel: Result Preview */}
                    <div className="bg-neutral-50 dark:bg-neutral-950/50 p-8 md:p-12 flex items-center justify-center border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 relative overflow-hidden">

                        {/* Empty/Idle State */}
                        <div className={cn(
                            "absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-500",
                            state !== "idle" ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                        )}>
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-neutral-800 shadow-xl flex items-center justify-center mb-6">
                                <Wand2 className="w-8 h-8 text-neutral-400" />
                            </div>
                            <p className="text-sm font-medium text-neutral-400">Result will appear here</p>
                        </div>

                        {/* Processing State */}
                        <div className={cn(
                            "absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-500",
                            state === "importing" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                        )}>
                            <div className="w-full max-w-[200px] space-y-4">
                                <div className="flex justify-between text-xs font-semibold text-blue-500 mb-1">
                                    <span>Analyzing video...</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-100 ease-linear rounded-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="space-y-2 pt-4">
                                    <div className="h-2 w-3/4 mx-auto bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                                    <div className="h-2 w-1/2 mx-auto bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse delay-75" />
                                </div>
                            </div>
                        </div>

                        {/* Complete State - Recipe Card */}
                        <div className={cn(
                            "w-full max-w-xs bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden transition-all duration-700 transform",
                            state === "complete" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
                        )}>
                            {/* Card Header Image */}
                            <div className="h-32 bg-neutral-200 dark:bg-neutral-800 relative bg-cover bg-center" style={{ backgroundImage: recipeData?.image ? `url(${recipeData.image})` : undefined }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                    <h4 className="text-white font-bold text-lg leading-tight line-clamp-2">{recipeData?.title || "Spicy Vodka Pasta"}</h4>
                                </div>
                                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
                                    <PlayCircle className="w-3 h-3 text-white" />
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-4 space-y-4">
                                <div className="flex gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>20m</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ChefHat className="w-3 h-3" />
                                        <span>Easy</span>
                                    </div>
                                    <div className="ml-auto text-orange-500 font-semibold">
                                        Imported
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Ingredients</p>
                                    <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                                        {recipeData?.ingredients?.length ? (
                                            recipeData.ingredients.map((ing, i) => (
                                                <li key={i} className="flex gap-2"><span>•</span> {ing}</li>
                                            ))
                                        ) : (
                                            <>
                                                <li className="flex gap-2"><span>•</span> 1lb Rigatoni</li>
                                                <li className="flex gap-2"><span>•</span> 2 cloves Garlic</li>
                                                <li className="flex gap-2"><span>•</span> 1/4 cup Vodka</li>
                                            </>
                                        )}
                                    </ul>
                                </div>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full text-xs h-8"
                                    onClick={reset}
                                >
                                    Import Another
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
