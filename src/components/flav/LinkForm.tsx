"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * The link pill: paste a TikTok, Instagram or recipe link. Sends the visitor
 * to /try?url=..., which runs the import. Used on home, guides and /try.
 */
export function LinkForm({
    id = "link",
    placeholder = "Paste a TikTok or Instagram link",
    button = "Get recipe",
    initial = "",
    onSubmitUrl,
    busy = false,
}: {
    id?: string;
    placeholder?: string;
    button?: string;
    initial?: string;
    onSubmitUrl?: (url: string) => void;
    busy?: boolean;
}) {
    const router = useRouter();
    const [value, setValue] = useState(initial);

    return (
        <form
            className="fl-pill"
            onSubmit={(e) => {
                e.preventDefault();
                const url = value.trim();
                if (!url) return;
                if (onSubmitUrl) onSubmitUrl(url);
                else router.push(`/try?url=${encodeURIComponent(url)}`);
            }}
        >
            <label htmlFor={id} className="fl-sr">
                Video or recipe link
            </label>
            <input
                id={id}
                type="url"
                inputMode="url"
                autoComplete="off"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
            />
            <button type="submit" className="fl-btn fl-btn-ink" disabled={busy}>
                {busy ? "Reading" : button}
            </button>
        </form>
    );
}
