"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Link2, Loader2, Sparkles, Wand2, Clock, ChevronLeft, ChevronRight, MoreHorizontal, Play, Minus, Plus, Calendar, Heart, Bookmark, Share, Lock } from "lucide-react";
import { IPhoneMockup } from "@/components/ui/IPhoneMockup";
import { cn } from "@/lib/utils";

export function ImportDemo() {
    const [url, setUrl] = React.useState("");
    const [state, setState] = React.useState<"idle" | "importing" | "complete">("idle");
    const [progress, setProgress] = React.useState(0);
    const [recipeData, setRecipeData] = React.useState<{
        title: string;
        image: string;
        video?: string;
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
                cleanTitle = "Mediterranean Quinoa Bowl"; // Better default for demo
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

            // Fallback food image (Unsplash) when scraping can't extract one
            const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=450&fit=crop&q=80";

            setRecipeData({
                title: cleanTitle || "Imported Recipe",
                image: data.image || FALLBACK_IMAGE,
                video: data.video,
                ingredients: ingredients.length > 0 ? ingredients : ["1 cup quinoa", "Cherry tomatoes", "Cucumber", "Kalamata olives", "Fresh herbs"],
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
                            Flav&#39;s AI watches the video for you, extracting ingredients, steps, and timings in seconds.
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
                                        placeholder="https://www.instagram.com/p/DV..."
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
                                        <Sparkles className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </form>

                        {/* Social Icons Row */}
                        <div className="flex gap-4 mt-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
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

                            {/* Complete State — 1:1 match with app's RecipeDetailView */}
                            {state === "complete" && (
                                <div className="min-h-full bg-white dark:bg-neutral-900">
                                    {/* ── Hero Image ── */}
                                    <div className="relative w-full bg-neutral-200 dark:bg-neutral-800 group" style={{ aspectRatio: '4/3' }}>
                                        {/* Always use og:image for the cover — og:video URLs can't cross-origin load */}
                                        {recipeData?.image ? (
                                            <img
                                                src={recipeData.image}
                                                alt={recipeData?.title || "Recipe"}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-800" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />

                                        {/* Nav overlay */}
                                        <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-white z-20">
                                            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                                <ChevronLeft className="w-4 h-4" />
                                            </div>
                                            <MoreHorizontal className="w-5 h-5 drop-shadow" />
                                        </div>

                                        {/* Play overlay — always shown since this is a video recipe */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center pl-0.5 shadow-lg">
                                                    <Play className="w-4 h-4 text-black fill-black" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── Content below image ── */}
                                    <div className="px-4 pt-4 pb-6">
                                        {/* Title */}
                                        <h2 className="text-[17px] font-bold leading-tight text-[#1A1A1A] dark:text-neutral-100 mb-3">
                                            {recipeData?.title || "Mediterranean Quinoa Bowl"}
                                        </h2>

                                        {/* Creator Row */}
                                        <div className="flex items-center gap-2.5 mb-4">
                                            {/* Avatar */}
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                                                style={{ background: 'linear-gradient(135deg, #1A1A1A, #444)' }}>
                                                S
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[12px] font-semibold text-[#1A1A1A] dark:text-neutral-100 leading-tight">Sarah Green</div>
                                                <div className="text-[10px] text-[#666] dark:text-neutral-400 leading-tight">@healthy_sarah</div>
                                            </div>
                                            <button className="text-[10px] font-semibold text-[#1A1A1A] dark:text-neutral-100 border border-[#1A1A1A] dark:border-neutral-400 rounded-lg px-3 py-1 hover:bg-neutral-50 transition-colors">
                                                Follow
                                            </button>
                                        </div>

                                        {/* Meta Row: time • servings adjuster • difficulty */}
                                        <div className="flex items-center gap-2 mb-3 text-[10px] text-[#666] dark:text-neutral-400 font-medium">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>20 min</span>
                                            </div>
                                            <span className="text-[#ccc]">•</span>
                                            {/* Servings adjuster */}
                                            <div className="flex items-center gap-0.5">
                                                <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#E07A5F] cursor-pointer"><circle cx="10" cy="10" r="9" fill="currentColor" /><rect x="5" y="9" width="10" height="2" rx="1" fill="white" /></svg>
                                                <div className="flex flex-col items-center px-1 leading-none">
                                                    <span className="text-[12px] font-bold text-[#1A1A1A] dark:text-neutral-100">2</span>
                                                    <span className="text-[8px] text-[#666] dark:text-neutral-400">servings</span>
                                                </div>
                                                <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#E07A5F] cursor-pointer"><circle cx="10" cy="10" r="9" fill="currentColor" /><rect x="5" y="9" width="10" height="2" rx="1" fill="white" /><rect x="9" y="5" width="2" height="10" rx="1" fill="white" /></svg>
                                            </div>
                                            <span className="text-[#ccc]">•</span>
                                            <span>Easy</span>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex gap-1.5 mb-4">
                                            {["Healthy", "Vegetarian", "Quick"].map(tag => (
                                                <span key={tag} className="text-[9px] font-medium text-[#666] dark:text-neutral-400 bg-[#F7F7F7] dark:bg-neutral-800 rounded-md px-2 py-1">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Buttons — matching app's sousPrimary style */}
                                        <div className="flex gap-1 mb-3">
                                            {/* Start Cooking – glass material + coral accent */}
                                            <button className="flex-1 flex items-center justify-center gap-1 h-9 rounded-xl text-[#E07A5F] font-semibold text-[11px] whitespace-nowrap border border-[#E07A5F]/40 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md hover:bg-[#E07A5F]/5 transition-all">
                                                <svg viewBox="0 0 20 20" className="w-3 h-3 fill-[#E07A5F] flex-shrink-0"><path d="M10 1C8.5 3 7 5.5 7 8c0 1.1.4 2 1 2.7V17a2 2 0 004 0v-6.3c.6-.7 1-1.6 1-2.7 0-2.5-1.5-5-3-7z" /></svg>
                                                Start Cooking
                                            </button>
                                            {/* Calendar */}
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-black/5 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md hover:bg-neutral-50 transition-colors flex-shrink-0">
                                                <Calendar className="w-3.5 h-3.5 text-[#1A1A1A] dark:text-neutral-300" />
                                            </button>
                                            {/* Heart */}
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-black/5 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md hover:bg-neutral-50 transition-colors flex-shrink-0">
                                                <Heart className="w-3.5 h-3.5 text-[#1A1A1A] dark:text-neutral-300" />
                                            </button>
                                            {/* Bookmark */}
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-black/5 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md hover:bg-neutral-50 transition-colors flex-shrink-0">
                                                <Bookmark className="w-3.5 h-3.5 text-[#1A1A1A] dark:text-neutral-300" />
                                            </button>
                                            {/* Share */}
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-black/5 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md hover:bg-neutral-50 transition-colors flex-shrink-0">
                                                <Share className="w-3.5 h-3.5 text-[#1A1A1A] dark:text-neutral-300" />
                                            </button>
                                        </div>

                                        {/* Converter / Save Offline row */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <button className="flex items-center gap-1 text-[10px] font-medium text-[#1A1A1A] dark:text-neutral-300">
                                                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 11l4-4 3 3 5-5M2 5v6h6" /></svg>
                                                Converter
                                            </button>
                                            <button className="flex items-center gap-1 text-[10px] font-medium text-[#1A1A1A] dark:text-neutral-300">
                                                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2v8M5 7l3 3 3-3M3 12h10" /></svg>
                                                Save Offline
                                            </button>
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px bg-[#F0F0F0] dark:bg-neutral-800 mb-4" />

                                        {/* INGREDIENTS Section */}
                                        <div className="mb-4">
                                            <h3 className="text-[10px] font-bold text-[#E07A5F] uppercase tracking-[0.08em] mb-3">
                                                Ingredients
                                            </h3>
                                            <ul className="space-y-2">
                                                {(recipeData?.ingredients?.length ? recipeData.ingredients.slice(0, 3) : []).map((ing, i) => (
                                                    <li key={i} className="flex items-center gap-2.5 group cursor-pointer">
                                                        {/* Circle checkbox — 18×18 like IngredientRow */}
                                                        <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#999] group-hover:border-[#1A1A1A] transition-colors flex-shrink-0" />
                                                        <span className="text-[12px] text-[#1A1A1A] dark:text-neutral-200 leading-snug">{ing}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Secret Ingredient Card — dashed coral border */}
                                        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-dashed border-[#E07A5F]/40 bg-white/80 dark:bg-neutral-800/40 backdrop-blur-sm cursor-pointer hover:bg-[#E07A5F]/5 transition-colors mb-4">
                                            {/* Lock circle */}
                                            <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#E07A5F]/50 flex items-center justify-center flex-shrink-0">
                                                <Lock className="w-2 h-2 text-[#E07A5F]" />
                                            </div>
                                            <span className="text-[12px] text-[#666] dark:text-neutral-400 flex-1">Secret Ingredient – tap to unlock</span>
                                            <ChevronRight className="w-3 h-3 text-[#999]" />
                                        </div>

                                        {/* Remaining ingredients */}
                                        <ul className="space-y-2 mb-4">
                                            {(recipeData?.ingredients?.length ? recipeData.ingredients.slice(3) : []).map((ing, i) => (
                                                <li key={`rest-${i}`} className="flex items-center gap-2.5 group cursor-pointer">
                                                    <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#999] group-hover:border-[#1A1A1A] transition-colors flex-shrink-0" />
                                                    <span className="text-[12px] text-[#1A1A1A] dark:text-neutral-200 leading-snug">{ing}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Reset link */}
                                        <button
                                            onClick={reset}
                                            className="w-full text-[10px] text-neutral-400 hover:text-neutral-600 font-medium py-2 transition-colors"
                                        >
                                            Import another link
                                        </button>
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
