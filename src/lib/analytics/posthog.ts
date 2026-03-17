import posthog from "posthog-js";

export function initPostHog() {
    if (typeof window === "undefined") return;
    if (posthog.__loaded) return;

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (!key) return;

    posthog.init(key, {
        api_host: host,
        person_profiles: "identified_only",
        capture_pageview: false, // We handle this manually for SPA navigation
        capture_pageleave: true,
        autocapture: true,
    });
}

// ── Waitlist funnel events ──

export function trackWaitlistFormFocus() {
    posthog.capture("waitlist_form_focus");
}

export function trackWaitlistSignup(properties: {
    referral_code: string;
    position: number;
    referred_by?: string | null;
}) {
    posthog.capture("waitlist_signup_success", properties);
}

export function trackWaitlistError(error: string) {
    posthog.capture("waitlist_signup_error", { error });
}

// ── Referral events ──

export function trackReferralLinkCopy() {
    posthog.capture("referral_link_copy");
}

export function trackReferralShare(method: "twitter" | "text" | "native") {
    posthog.capture("referral_share", { method });
}

export function trackReferralDashboardView(referral_code: string) {
    posthog.capture("referral_dashboard_view", { referral_code });
}

// ── Engagement events ──

export function trackCTAClicked(cta_name: string, location: string) {
    posthog.capture("cta_clicked", { cta_name, location });
}

export function trackFAQExpanded(question: string) {
    posthog.capture("faq_expanded", { question });
}

export function trackCreatorApplyClicked() {
    posthog.capture("creator_apply_clicked");
}

export function trackPageView(url: string) {
    posthog.capture("$pageview", { $current_url: url });
}

export { posthog };
