/**
 * The hero phone: a saved recipe with the line drawing across and the
 * ingredients writing in. Pure CSS, no images, so it ships with the page.
 */
const ingredients = [
    ["Unsalted butter", "1 cup"],
    ["Granulated sugar", "¾ cup"],
    ["Egg", "1"],
    ["Vanilla extract", "1 tsp"],
    ["All-purpose flour", "2¼ cups"],
];

export function PhoneRecipe() {
    return (
        <div
            role="img"
            aria-label="Flav on iPhone: a recipe saved from a TikTok, with its ingredients and a Start cooking button"
            style={{
                width: 330,
                height: 690,
                maxWidth: "100%",
                borderRadius: 48,
                background: "var(--fl-ground)",
                boxShadow: "0 1px 2px rgba(0,0,0,.08), 0 40px 80px -30px rgba(0,0,0,.45), inset 0 0 0 10px #0A0A0A",
                position: "relative",
                overflow: "hidden",
                flex: "0 0 auto",
            }}
        >
            <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: 18, width: 96, height: 28, marginLeft: -48, borderRadius: 14, background: "#0A0A0A" }} />
            <div aria-hidden="true" style={{ position: "absolute", left: 28, right: 28, top: 70, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ height: 150, borderRadius: 24, position: "relative", background: "var(--fl-track)", overflow: "hidden" }}>
                    <span style={{ position: "absolute", left: 12, top: 12, fontSize: 10, fontWeight: 700, letterSpacing: ".06em", color: "#FFFFFF", background: "rgba(10,10,10,.55)", padding: "6px 9px", borderRadius: 10 }}>
                        FROM TIKTOK · 0:19
                    </span>
                </div>
                <span style={{ fontSize: 24, lineHeight: "26px", fontWeight: 800, letterSpacing: "-.05em" }}>Christmas Sprinkle Cookies</span>
                <span className="fl-micro" style={{ letterSpacing: ".04em", fontSize: 12 }}>10 ingredients · 7 steps · 13 min</span>
                <div className="fl-line fl-line-run">
                    <div className="fl-line-track" />
                    <div className="fl-line-fill" />
                    <div className="fl-dot" />
                </div>
                <div className="fl-card fl-rows" style={{ borderRadius: 20, padding: "6px 16px", display: "flex", flexDirection: "column" }}>
                    {ingredients.map(([name, qty], i) => (
                        <div
                            key={name}
                            className="fl-write"
                            style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", fontSize: 13, fontWeight: 500, color: "var(--fl-ink-2)", animationDelay: `${0.3 + i * 0.08}s` }}
                        >
                            <span>{name}</span>
                            <b className="fl-num" style={{ fontWeight: 800, color: "var(--fl-ink)", letterSpacing: "-.02em" }}>{qty}</b>
                        </div>
                    ))}
                </div>
                <span className="fl-btn fl-btn-ink" style={{ height: 52, fontSize: 15 }}>Start cooking</span>
            </div>
        </div>
    );
}
