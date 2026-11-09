/** Lowercase "flav" with the ember full stop (wordmark W1). */
export function Wordmark({ size = 26 }: { size?: number }) {
    const dot = Math.max(5, Math.round(size * 0.23));
    return (
        <span style={{ display: "inline-flex", alignItems: "baseline", gap: 3 }}>
            <span style={{ fontSize: size, lineHeight: 1, fontWeight: 800, letterSpacing: "-0.055em", color: "var(--fl-ink)" }}>
                flav
            </span>
            <span
                aria-hidden="true"
                style={{ width: dot, height: dot, borderRadius: "50%", background: "var(--fl-ember)", alignSelf: "flex-end", marginBottom: 1 }}
            />
        </span>
    );
}
