import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Flav — Save Any TikTok Recipe in 10 Seconds",
    template: "%s | Flav",
  },
  description:
    "Flav turns TikTok, Instagram, and web recipe videos into an AI-organized cookbook. Paste a link, get the full recipe — ingredients, steps, timers — then cook hands-free. Free on iOS. Android coming soon.",
  keywords: [
    "best cooking app 2026",
    "how to monetize food videos",
    "AI recipe generator",
    "TikTok for food",
    "step by step cooking app",
    "recipe organizer",
    "food creator economy",
    "Flav app",
    "cooking app with AI",
    "import recipes from TikTok",
    "food creator monetization",
    "short form video cooking",
    "recipe import app",
    "AI cooking assistant",
  ],
  authors: [{ name: "Flav Team" }],
  creator: "Tig Tech LLC",
  publisher: "Tig Tech LLC",
  metadataBase: new URL("https://flav.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flav.app",
    siteName: "Flav",
    title: "Flav — Save Any TikTok Recipe in 10 Seconds",
    description:
      "Paste a link, get the full recipe — ingredients, steps, timers — in a cookbook that's actually yours. Free on iOS. Android coming soon.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flav — turn TikTok and Instagram recipe videos into an AI-organized cookbook",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flav — Save Any TikTok Recipe in 10 Seconds",
    description:
      "Turn TikTok and Instagram recipe videos into an AI-organized cookbook with hands-free Cook Mode. Free on iOS. Android coming soon.",
    images: ["/og-image.png"],
    creator: "@cookwithflav",
  },
  itunes: {
    appId: "6759994122",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  other: {
    "tiktok-developers-site-verification": "f33UOQnG7Y9jrIEuK33OVAk8hTsHCkb7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            <Header />
            <main className="min-h-screen pt-16 md:pt-20">{children}</main>
            <Footer />
            <ExitIntentPopup />
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
