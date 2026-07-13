import { permanentRedirect } from "next/navigation";

interface Props {
    params: Promise<{ handle: string }>;
}

/**
 * Legacy creator-profile path. The canonical bio-link page lives at
 * flav.app/@handle — permanently redirect (308) so old inbound links,
 * bios, and the app's flav.app/creators/{handle} universal links keep working.
 *
 * Static portal routes (/creators/dashboard, /creators/earnings,
 * /creators/settings) take precedence over this dynamic segment, so the
 * (portal) route group is unaffected.
 */
export default async function LegacyCreatorHandlePage({ params }: Props) {
    const { handle: raw } = await params;

    let decoded = raw;
    try {
        decoded = decodeURIComponent(raw);
    } catch {
        // keep the raw segment
    }

    permanentRedirect(`/@${decoded.replace(/^@+/, "")}`);
}
