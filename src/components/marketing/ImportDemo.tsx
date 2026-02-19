"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Link2, Loader2, Sparkles, Wand2, ChefHat, Clock, PlayCircle, ChevronLeft, MoreHorizontal, Play, ArrowUpRight, Minus, Plus, Flame, Calendar, Heart, Bookmark, Instagram } from "lucide-react";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";
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

            // Clean Title
            let cleanTitle = data.title || "";
            // Remove " | Creator Name" common pattern
            cleanTitle = cleanTitle.split('|')[0].trim();
            // Remove "Ingredients" if it got stuck in the title (common in some og:titles)
            const ingredientsIndex = cleanTitle.toLowerCase().indexOf("ingredients");
            if (ingredientsIndex > 0) {
                cleanTitle = cleanTitle.substring(0, ingredientsIndex).trim();
            }
            // Remove trailing " - Instagram" etc
            cleanTitle = cleanTitle.replace(/ - Instagram.*/, "").replace(/ on TikTok.*/, "");

            // If title is likely just a name (2 words, both capped) or very short, make it generic
            // e.g. "Tom Judkins" -> "Delicious Recipe"
            const words = cleanTitle.split(' ');
            if (words.length <= 2 && /^[A-Z]/.test(cleanTitle)) {
                // Check if it looks like a name
                cleanTitle = "Spicy Chicken Caesar Wrap"; // Better default for demo
            }

            // Smart Ingredient Parsing from Description
            const ingredients = data.description
                ? data.description.split(/,|\n/)
                    .map((i: string) => i.trim())
                    .filter((i: string) => {
                        const lower = i.toLowerCase();
                        // Filter out garbage lines
                        if (lower.length < 3) return false;
                        if (lower.includes("likes")) return false;
                        if (lower.includes("comments")) return false;
                        if (lower.includes("views")) return false;
                        if (lower.includes("http")) return false;
                        if (lower.match(/\d{4}/)) return false; // weird year/date artifacts
                        if (lower.startsWith("for the")) return false; // section headers
                        return true;
                    })
                    .slice(0, 5)
                : ["No ingredients found"];

            setRecipeData({
                title: cleanTitle || "Imported Recipe",
                image: data.image,
                ingredients: ingredients.length > 0 ? ingredients : ["1lb Rigatoni", "2 cloves Garlic", "1/4 cup Vodka"],
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

                    {/* Right Panel: Result Preview (Phone Mockup) */}
                    <div className="bg-neutral-50 dark:bg-neutral-950/50 p-8 md:p-12 flex items-center justify-center border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800">
                        <IPhoneMockup size="md" showBackdrop>
                            {/* Empty/Idle State */}
                            {state === "idle" && (
                                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6">
                                        <Wand2 className="w-8 h-8 text-neutral-400" />
                                    </div>
                                    <p className="text-sm font-medium text-neutral-400">Paste a link to see the magic</p>
                                </div>
                            )}

                            {/* Processing State */}
                            {state === "importing" && (
                                <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-neutral-900">
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
                            )}

                            {/* Complete State - Recipe Content */}
                            {state === "complete" && (
                                <div className="min-h-full bg-white dark:bg-neutral-900 pb-8">
                                    {/* Card Header Image - Video Preview Style */}
                                    <div className="relative aspect-[4/5] w-full bg-neutral-200 dark:bg-neutral-800 bg-cover bg-center group" style={{ backgroundImage: recipeData?.image ? `url(${recipeData.image})` : undefined }}>
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

                                        {/* Top Overlay Controls */}
                                        <div className="absolute top-12 left-4 right-4 flex justify-between items-center text-white z-20">
                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                                <ChevronLeft className="w-5 h-5" />
                                            </div>
                                            <div className="flex gap-2">
                                                <MoreHorizontal className="w-6 h-6" />
                                            </div>
                                        </div>

                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-transform hover:scale-105">
                                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center pl-1">
                                                    <Play className="w-5 h-5 text-black fill-black" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Stats Row */}
                                    <div className="flex items-center gap-4 text-xs text-neutral-500 mb-6 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-neutral-400" />
                                            <span>240m</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Flame className="w-4 h-4 text-neutral-400" />
                                            <span>Easy</span>
                                        </div>
                                        <div className="ml-auto flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full px-1 py-0.5">
                                            <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-neutral-600">
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="font-bold text-neutral-900 dark:text-white px-2.5 w-7 text-center">2</span>
                                            <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-neutral-600">
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Buttons Row */}
                                    <div className="flex gap-2 mb-8">
                                        <Button className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white rounded-2xl h-11 shadow-lg shadow-neutral-500/10 font-bold text-sm">
                                            Start Cooking
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-11 w-11 rounded-2xl border-neutral-200 bg-white p-0">
                                            <Calendar className="w-5 h-5 text-neutral-600" />
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-11 w-11 rounded-2xl border-neutral-200 bg-white p-0">
                                            <Heart className="w-5 h-5 text-neutral-600" />
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Ingredients</h3>
                                        <ul className="space-y-2.5">
                                            {recipeData?.ingredients?.length ? (
                                                recipeData.ingredients.map((ing, i) => (
                                                    <li key={i} className="flex items-start gap-3 group cursor-pointer p-2 hover:bg-neutral-50 rounded-lg transition-colors -mx-2">
                                                        <div className="mt-0.5 w-4 h-4 rounded-full border border-neutral-300 group-hover:border-blue-500 transition-colors flex-shrink-0" />
                                                        <span className="text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-snug">{ing}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-sm text-neutral-500">No ingredients extracted.</li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="mt-8 mb-4">
                                        <Button
                                            variant="ghost"
                                            className="w-full text-xs text-neutral-400 hover:text-neutral-600 font-medium"
                                            onClick={reset}
                                        >
                                            Import another link
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </IPhoneMockup>
                    </div>
                </div>
            </div>
        </div>
    );
}
