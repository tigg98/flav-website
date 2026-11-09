/** Shared shapes for the /try feature. Safe to import from client code. */

export type TryPlatform = "tiktok" | "instagram" | "web";

export type TryStatus = "recipe" | "no_recipe" | "limited" | "error";

export interface TryIngredient {
    name: string;
    /** Quantity as written in the source, or "" when the source gives none. */
    qty: string;
}

export interface TryRecipe {
    title: string;
    ingredients: TryIngredient[];
    steps: string[];
    minutes: number | null;
}

export interface TrySource {
    platform: TryPlatform | null;
    creator: string | null;
    thumbnail: string | null;
    url: string | null;
}

export interface TryResponse {
    status: TryStatus;
    recipe?: TryRecipe;
    source: TrySource;
    ms: number;
    cached: boolean;
    remainingToday: number;
    /** Plain sentence for the visitor on error, limited and disabled states. */
    message?: string;
    /** Why a run was limited: this visitor's daily tries, or the site-wide daily cap. */
    limit?: "visitor" | "global";
}

export const TRY_PER_VISITOR_PER_DAY = 3;

/** Shown when TRY_ENABLED=false, by the API and by the page. */
export const TRY_DISABLED_MESSAGE = "The web version is off for now. Try it in the app instead.";
