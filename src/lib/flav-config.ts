/**
 * One place for facts the site repeats. Phase 2 (pricing) changes prices here only.
 * Prices confirmed against the App Store listing on 2026-11-08.
 */
export const FLAV = {
    appStoreId: "6759994122",
    freeImportsPerMonth: 10,
    prices: {
        monthly: "$4.99",
        yearly: "$29.99",
        lifetime: "$59.99",
    },
    priceNumbers: {
        monthly: "4.99",
        yearly: "29.99",
        lifetime: "59.99",
    },
    supportEmail: "support@flav.app",
} as const;

/**
 * App Store link with a campaign token, so App Store Connect shows which page
 * sent the install. Apple only records `ct` when the provider token `pt` is
 * present; set NEXT_PUBLIC_ASC_PROVIDER_TOKEN in Vercel (App Store Connect >
 * App Analytics > Campaigns shows it). Without it the plain link is used.
 */
export function appStoreUrl(campaign?: string): string {
    const base = `https://apps.apple.com/us/app/flav/id${FLAV.appStoreId}`;
    const pt = process.env.NEXT_PUBLIC_ASC_PROVIDER_TOKEN;
    if (!campaign || !pt) return base;
    const params = new URLSearchParams({ pt, ct: campaign, mt: "8" });
    return `${base}?${params.toString()}`;
}
