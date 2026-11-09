/**
 * The /guides content. Each guide is a markdown file in content/guides with a
 * small front matter block. Read at build time on the server only (uses fs).
 *
 * A draft opens with a paragraph starting "Short answer:", has a "## FAQ"
 * section of **Q: ...** / A: ... pairs, and may carry HTML comments (sources,
 * and "CONFIRM before publishing" notes). Comments never render. A guide that
 * still has a CONFIRM note is unconfirmed: it renders, but stays noindex and
 * out of the sitemap until the founder clears the note.
 */
import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";

export type GuideFaq = {
    q: string;
    /** Answer as markdown, as written in the draft. */
    a: string;
    /** Answer rendered as inline HTML, for the page. */
    aHtml: string;
    /** Answer as plain text, for FAQPage structured data. */
    aText: string;
};

export type Guide = {
    slug: string;
    title: string;
    description: string;
    /** YYYY-MM-DD */
    date: string;
    /** YYYY-MM-DD. The drafts carry one date, so this equals `date` for now. */
    dateModified: string;
    readMinutes: number;
    shortAnswerHtml: string;
    shortAnswerText: string;
    /** Body HTML between the short answer and the FAQ. */
    bodyHtml: string;
    faq: GuideFaq[];
    unconfirmed: boolean;
};

/** Index order. Guides not listed here follow, by title. */
const ORDER = [
    "how-to-save-a-recipe-from-tiktok",
    "tiktok-recipe-not-in-caption",
    "how-to-save-recipes-from-instagram-reels",
    "what-app-saves-recipes-from-tiktok",
    "how-to-organize-recipes-saved-from-tiktok",
    "cook-from-a-tiktok-without-pausing",
    "turn-a-cooking-video-into-a-grocery-list",
    "why-tiktok-favorites-is-a-bad-recipe-box",
    "how-to-save-a-recipe-from-youtube-shorts",
    "share-saved-recipes-with-your-household",
];

const CONFIRM_MARK = "CONFIRM before publishing";

const md = new Marked({ gfm: true, breaks: false });

function renderBlock(src: string): string {
    return md.parse(src, { async: false }) as string;
}

function renderInline(src: string): string {
    return md.parseInline(src, { async: false }) as string;
}

/** Tags out, common entities decoded. For read time and structured data. */
export function htmlToText(html: string): string {
    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
}

function stripComments(src: string): string {
    return src.replace(/<!--[\s\S]*?-->/g, "");
}

/** Parses the simple `key: "value"` / `key: value` front matter the drafts use. */
function parseFrontMatter(source: string): { data: Record<string, string>; content: string } {
    const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!m) return { data: {}, content: source };
    const data: Record<string, string> = {};
    for (const line of m[1].split(/\r?\n/)) {
        const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
        if (!kv) continue;
        let value = kv[2].trim();
        if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
        } else if (value.length >= 2 && value.startsWith("'") && value.endsWith("'")) {
            value = value.slice(1, -1).replace(/''/g, "'");
        }
        data[kv[1]] = value;
    }
    return { data, content: source.slice(m[0].length) };
}

/** Splits the "## FAQ" section into pairs: a "**Q: ...**" line, then "A: ..." lines. */
function parseFaq(section: string): GuideFaq[] {
    const out: GuideFaq[] = [];
    const blocks = section.split(/^\*\*Q:\s*/m).slice(1);
    for (const block of blocks) {
        const qEnd = block.indexOf("**");
        if (qEnd < 0) continue;
        const q = block.slice(0, qEnd).trim();
        const rest = block.slice(qEnd + 2);
        const am = rest.match(/^\s*A:\s*([\s\S]*)$/m);
        if (!q || !am) continue;
        const a = am[1].trim().replace(/\s*\n\s*/g, " ");
        const aHtml = renderInline(a);
        out.push({ q, a, aHtml, aText: htmlToText(aHtml) });
    }
    return out;
}

export function parseGuide(source: string, fallbackSlug: string): Guide {
    const unconfirmed = source.includes(CONFIRM_MARK);
    const { data, content } = parseFrontMatter(source);
    let text = stripComments(content).replace(/\r\n/g, "\n");

    // The page renders the title as its own H1; drop the draft's.
    text = text.replace(/^\s*# [^\n]*\n/, "");

    // The FAQ section runs from "## FAQ" to the next H2 or the end.
    let faqSection = "";
    const faqStart = text.search(/^## FAQ\s*$/m);
    if (faqStart >= 0) {
        const afterHeading = text.indexOf("\n", faqStart) + 1;
        const nextH2 = text.slice(afterHeading).search(/^## /m);
        const faqEnd = nextH2 >= 0 ? afterHeading + nextH2 : text.length;
        faqSection = text.slice(afterHeading, faqEnd);
        text = text.slice(0, faqStart) + text.slice(faqEnd);
    }

    // The short answer is the paragraph that starts "Short answer:".
    let shortAnswerMd = "";
    const sa = text.match(/^Short answer:\s*([\s\S]*?)(?:\n\s*\n|$)/m);
    if (sa && sa.index !== undefined) {
        shortAnswerMd = sa[1].trim();
        text = text.slice(0, sa.index) + text.slice(sa.index + sa[0].length);
    }
    if (shortAnswerMd) {
        // Capitalise the first letter now the "Short answer:" prefix is gone.
        shortAnswerMd = shortAnswerMd.charAt(0).toUpperCase() + shortAnswerMd.slice(1);
    }

    const shortAnswerHtml = shortAnswerMd ? renderInline(shortAnswerMd) : "";
    const bodyHtml = renderBlock(text.trim())
        .replace(/<table>/g, '<div class="fl-prose-table"><table>')
        .replace(/<\/table>/g, "</table></div>");
    const faq = parseFaq(faqSection);

    const words = [
        htmlToText(shortAnswerHtml),
        htmlToText(bodyHtml),
        ...faq.map((f) => `${f.q} ${f.aText}`),
    ]
        .join(" ")
        .split(/\s+/)
        .filter(Boolean).length;

    const date = data.date ?? "";
    return {
        slug: data.slug || fallbackSlug,
        title: data.title ?? "",
        description: data.description ?? "",
        date,
        dateModified: data.updated || data.dateModified || date,
        readMinutes: Math.max(1, Math.ceil(words / 200)),
        shortAnswerHtml,
        shortAnswerText: htmlToText(shortAnswerHtml),
        bodyHtml,
        faq,
        unconfirmed,
    };
}

function sortGuides(guides: Guide[]): Guide[] {
    const rank = (slug: string) => {
        const i = ORDER.indexOf(slug);
        return i < 0 ? ORDER.length : i;
    };
    return [...guides].sort((a, b) => rank(a.slug) - rank(b.slug) || a.title.localeCompare(b.title));
}

/** Loads every guide in a folder. Exported so a check script can point it at the repo. */
export function loadGuides(dir: string): Guide[] {
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    return sortGuides(
        files.map((file) =>
            parseGuide(fs.readFileSync(path.join(dir, file), "utf8"), file.replace(/\.md$/, "")),
        ),
    );
}

let cache: Guide[] | null = null;

export function getAllGuides(): Guide[] {
    if (!cache) cache = loadGuides(path.join(process.cwd(), "content", "guides"));
    return cache;
}

export function getGuide(slug: string): Guide | undefined {
    return getAllGuides().find((g) => g.slug === slug);
}

/** Three other guides to read next: the ones after this one in index order, wrapping. */
export function getNextGuides(slug: string, count = 3): Guide[] {
    const all = getAllGuides();
    const i = all.findIndex((g) => g.slug === slug);
    const out: Guide[] = [];
    for (let k = 1; k < all.length && out.length < count; k++) {
        out.push(all[(Math.max(i, 0) + k) % all.length]);
    }
    return out.filter((g) => g.slug !== slug);
}

/** "November 2026" from YYYY-MM-DD. */
export function formatMonthYear(date: string): string {
    const d = new Date(`${date}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}
