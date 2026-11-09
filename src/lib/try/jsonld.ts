import { cleanLine, cleanRecipe, decodeEntities, isoDurationMinutes, splitIngredient } from "./text";
import type { TryRecipe } from "./types";

/**
 * Reads a schema.org Recipe from a page's JSON-LD. Handles @graph, top level
 * arrays, @type arrays, recipeInstructions as a string, strings, HowToStep,
 * HowToSection and ItemList. Pure, no network.
 */

type Json = unknown;

export interface JsonLdRecipe {
    recipe: TryRecipe;
    author: string | null;
    image: string | null;
}

function isRecipeNode(node: Record<string, unknown>): boolean {
    const t = node["@type"];
    const types = Array.isArray(t) ? t : [t];
    return types.some((x) => typeof x === "string" && /(^|[/:])Recipe$/i.test(x));
}

function findRecipeNode(node: Json, depth = 0): Record<string, unknown> | null {
    if (depth > 8 || node === null || typeof node !== "object") return null;
    if (Array.isArray(node)) {
        for (const item of node) {
            const hit = findRecipeNode(item, depth + 1);
            if (hit) return hit;
        }
        return null;
    }
    const obj = node as Record<string, unknown>;
    if (isRecipeNode(obj)) return obj;
    for (const key of ["@graph", "mainEntity", "mainEntityOfPage", "itemListElement", "item"]) {
        if (key in obj) {
            const hit = findRecipeNode(obj[key], depth + 1);
            if (hit) return hit;
        }
    }
    return null;
}

function textOf(v: Json): string {
    if (typeof v === "string") return v;
    if (typeof v === "number") return String(v);
    return "";
}

function instructionSteps(v: Json, depth = 0): string[] {
    if (depth > 6 || v == null) return [];
    if (typeof v === "string") {
        // A single string may hold several steps on separate lines or in <li>s.
        const withBreaks = v.replace(/<\/(li|p)>|<br\s*\/?>/gi, "\n");
        return withBreaks
            .split(/\n+/)
            .map(cleanLine)
            .filter(Boolean);
    }
    if (Array.isArray(v)) return v.flatMap((x) => instructionSteps(x, depth + 1));
    if (typeof v === "object") {
        const o = v as Record<string, unknown>;
        if (o.itemListElement) return instructionSteps(o.itemListElement, depth + 1);
        const text = textOf(o.text) || textOf(o.name) || textOf(o.description);
        return text ? instructionSteps(text, depth + 1) : [];
    }
    return [];
}

function firstString(v: Json): string | null {
    if (typeof v === "string") return v;
    if (Array.isArray(v)) {
        for (const x of v) {
            const s = firstString(x);
            if (s) return s;
        }
        return null;
    }
    if (v && typeof v === "object") {
        const o = v as Record<string, unknown>;
        return firstString(o.url) ?? firstString(o.name) ?? firstString(o["@id"]) ?? null;
    }
    return null;
}

function authorName(v: Json): string | null {
    if (typeof v === "string") return cleanLine(v) || null;
    if (Array.isArray(v)) return v.length ? authorName(v[0]) : null;
    if (v && typeof v === "object") {
        const name = (v as Record<string, unknown>).name;
        return typeof name === "string" ? cleanLine(name) || null : null;
    }
    return null;
}

function parseBlock(raw: string): Json {
    const body = raw.trim().replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").replace(/^<!--/, "").replace(/-->$/, "");
    try {
        return JSON.parse(body);
    } catch {
        // Some sites leave raw newlines or control characters inside strings.
        try {
            return JSON.parse(body.replace(/[\u0000-\u001F]+/g, " "));
        } catch {
            return null;
        }
    }
}

export function extractJsonLdRecipe(html: string): JsonLdRecipe | null {
    const re = /<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi;
    for (const match of html.matchAll(re)) {
        const node = findRecipeNode(parseBlock(match[1]));
        if (!node) continue;

        const ingredientsRaw = node.recipeIngredient ?? node.ingredients;
        const ingredients = (Array.isArray(ingredientsRaw) ? ingredientsRaw : [ingredientsRaw])
            .map(textOf)
            .map(decodeEntities)
            .filter((s) => s.trim())
            .map(splitIngredient);

        const minutes =
            isoDurationMinutes(node.totalTime) ??
            (() => {
                const sum = (isoDurationMinutes(node.prepTime) ?? 0) + (isoDurationMinutes(node.cookTime) ?? 0);
                return sum > 0 ? sum : null;
            })();

        const recipe = cleanRecipe({
            title: textOf(node.name) || textOf(node.headline),
            ingredients,
            steps: instructionSteps(node.recipeInstructions),
            minutes,
        });
        if (!recipe) continue;

        const image = firstString(node.image);
        return {
            recipe,
            author: authorName(node.author),
            image: image && image.startsWith("https://") ? image : null,
        };
    }
    return null;
}

/** og:image (or twitter:image) from a page, https only. */
export function metaImage(html: string): string | null {
    for (const name of ["og:image:secure_url", "og:image", "twitter:image"]) {
        const a = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]*content=["']([^"']+)["']`, "i"));
        const b = html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${name}["']`, "i"));
        const v = decodeEntities((a ?? b)?.[1] ?? "");
        if (v.startsWith("https://")) return v;
    }
    return null;
}

/** og:site_name, for the "FROM ..." line on web pages. */
export function metaSiteName(html: string): string | null {
    const a = html.match(/<meta[^>]+property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i);
    const b = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:site_name["']/i);
    const v = cleanLine((a ?? b)?.[1] ?? "");
    return v || null;
}
