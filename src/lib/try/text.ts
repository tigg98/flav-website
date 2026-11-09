import type { TryIngredient, TryRecipe } from "./types";

/** Small text helpers shared by the JSON-LD reader, the page reader and the model parser. */

const NAMED_ENTITIES: Record<string, string> = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "-", mdash: "-",
    frac12: "½", frac14: "¼", frac34: "¾", deg: "°", hellip: "...",
    rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', eacute: "é", egrave: "è",
    times: "x", frasl: "/",
};

export function decodeEntities(s: string): string {
    return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z0-9]+);/gi, (whole, body: string) => {
        if (body[0] === "#") {
            const code = body[1] === "x" || body[1] === "X" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
            if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return "";
            return String.fromCodePoint(code);
        }
        return NAMED_ENTITIES[body.toLowerCase()] ?? whole;
    });
}

/** Collapse whitespace and swap long dashes for plain hyphens, so copy we show stays plain. */
export function cleanLine(s: string): string {
    return decodeEntities(s.replace(/<[^>]*>/g, " "))
        .replace(/[\u2012\u2013\u2014\u2015]/g, "-")
        .replace(/\s+/g, " ")
        .trim();
}

const BLOCK_TAGS = /<\/?(p|div|br|li|ul|ol|h[1-6]|tr|td|th|section|article|table|blockquote|pre|dd|dt)\b[^>]*>/gi;

/** Visible text of an HTML page, one block per line, at most `max` characters. */
export function htmlToText(html: string, max = 12000): string {
    const title = cleanLine(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    let body = html
        .replace(/<!--[\s\S]*?-->/g, " ")
        .replace(/<head\b[\s\S]*?<\/head>/gi, " ")
        .replace(/<(script|style|noscript|svg|template|iframe|nav|footer|header|aside|form|button|select)\b[\s\S]*?<\/\1>/gi, " ")
        .replace(BLOCK_TAGS, "\n")
        .replace(/<[^>]+>/g, " ");
    body = decodeEntities(body)
        .split("\n")
        .map((l) => l.replace(/[ \t\f\v ]+/g, " ").trim())
        .filter(Boolean)
        .join("\n");

    // Long pages: start a little before the ingredients so the recipe fits the budget.
    if (body.length > max) {
        const at = body.search(/\bingredients\b/i);
        if (at > 1500) body = body.slice(at - 1500);
    }
    const text = title ? `${title}\n\n${body}` : body;
    return text.slice(0, max);
}

/** Minutes in an ISO 8601 duration such as PT1H30M or P0DT45M. */
export function isoDurationMinutes(value: unknown): number | null {
    if (typeof value !== "string") return null;
    const m = value.trim().match(/^P(?:(\d+(?:\.\d+)?)D)?(?:T(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?)?$/i);
    if (!m) return null;
    const [, d, h, min, s] = m.map((x) => (x ? Number(x) : 0));
    const total = Math.round(d * 1440 + h * 60 + min + s / 60);
    return total > 0 ? total : null;
}

const QTY = "(?:\\d+(?:[.,]\\d+)?(?:\\s*\\/\\s*\\d+)?|[¼-¾⅐-⅞])";
const UNITS = [
    "cups?", "c\\.", "tablespoons?", "tbsps?\\.?", "tbs\\.?", "T\\b", "teaspoons?", "tsps?\\.?", "t\\b",
    "grams?", "g\\b", "kilograms?", "kgs?\\b", "milliliters?", "millilitres?", "ml\\b", "liters?", "litres?", "l\\b",
    "ounces?", "oz\\.?", "fl\\.? ?oz\\.?", "pounds?", "lbs?\\.?", "pints?", "quarts?", "gallons?",
    "cloves?", "cans?", "tins?", "packages?", "pkgs?\\.?", "packets?", "sticks?", "slices?", "pinch(?:es)?",
    "dash(?:es)?", "handfuls?", "bunch(?:es)?", "sprigs?", "heads?", "jars?", "bottles?", "scoops?", "pieces?",
];
const INGREDIENT_RE = new RegExp(
    `^((?:${QTY}(?:\\s+${QTY})?)(?:\\s*(?:-|to)\\s*${QTY})?(?:\\s*(?:${UNITS.join("|")}))?)(?:\\s+of)?\\s+(.+)$`,
    "i",
);

/** Split "2 cups flour" into { qty: "2 cups", name: "flour" }. Leaves the text as written. */
export function splitIngredient(line: string): TryIngredient {
    const text = cleanLine(line);
    const m = text.match(INGREDIENT_RE);
    if (!m) return { name: text, qty: "" };
    return { name: m[2].trim(), qty: m[1].trim() };
}

const MAX_INGREDIENTS = 60;
const MAX_STEPS = 40;

/** Trim, drop blanks, cap lengths. Returns null when nothing usable is left. */
export function cleanRecipe(r: {
    title?: unknown;
    ingredients?: unknown;
    steps?: unknown;
    minutes?: unknown;
}): TryRecipe | null {
    const ingredients: TryIngredient[] = (Array.isArray(r.ingredients) ? r.ingredients : [])
        .map((i): TryIngredient | null => {
            if (typeof i === "string") return splitIngredient(i);
            if (i && typeof i === "object") {
                const o = i as Record<string, unknown>;
                const name = typeof o.name === "string" ? cleanLine(o.name) : "";
                const qty = typeof o.qty === "string" ? cleanLine(o.qty) : typeof o.qty === "number" ? String(o.qty) : "";
                return name ? { name: name.slice(0, 160), qty: qty.slice(0, 40) } : null;
            }
            return null;
        })
        .filter((i): i is TryIngredient => !!i && !!i.name)
        .slice(0, MAX_INGREDIENTS);

    const steps = (Array.isArray(r.steps) ? r.steps : [])
        .map((s) => (typeof s === "string" ? cleanLine(s) : ""))
        .map((s) => s.replace(/^(?:step\s*)?\d+[.):]\s+/i, ""))
        .filter(Boolean)
        .map((s) => s.slice(0, 600))
        .slice(0, MAX_STEPS);

    if (!ingredients.length && !steps.length) return null;

    const title = (typeof r.title === "string" ? cleanLine(r.title) : "").slice(0, 140) || "Untitled recipe";
    const minutes =
        typeof r.minutes === "number" && Number.isFinite(r.minutes) && r.minutes > 0 && r.minutes < 10000
            ? Math.round(r.minutes)
            : null;
    return { title, ingredients, steps, minutes };
}

/**
 * True when a caption has nothing a recipe could come from: once hashtags,
 * mentions and links are removed, only a short line is left. Saves a model call.
 */
export function isThinCaption(caption: string): boolean {
    const rest = caption
        .replace(/https?:\/\/\S+/g, " ")
        .replace(/[#@][\p{L}\p{N}_.]+/gu, " ")
        .replace(/[\p{Extended_Pictographic}️‍]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
    return rest.length < 40;
}
