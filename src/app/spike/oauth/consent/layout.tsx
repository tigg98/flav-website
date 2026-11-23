import type { Metadata } from 'next'

// Spike only: the sign-in and consent page for the ChatGPT connection test.
// It talks to the throwaway Supabase project flav-chatgpt-test, never to
// Flav's own project. This branch is not meant to be merged.
export const metadata: Metadata = {
    title: 'ChatGPT connection test',
    robots: { index: false, follow: false },
}

export default function SpikeLayout({ children }: { children: React.ReactNode }) {
    return children
}
