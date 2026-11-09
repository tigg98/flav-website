import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/flav/SiteHeader";
import { SiteFooter } from "@/components/flav/SiteFooter";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import "../styles/flav.css";

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
    default: "Flav: save any TikTok recipe, then cook it",
    template: "%s | Flav",
  },
  description:
    "Share a TikTok or Instagram Reel to Flav and get the ingredients, steps and timers in your cookbook, then cook it hands free. Free on iPhone for 10 recipes a month.",
  keywords: [
    "best cooking app 2026",
    "AI recipe generator",
    "TikTok for food",
    "step by step cooking app",
    "recipe organizer",
    "Flav app",
    "cooking app with AI",
    "import recipes from TikTok",
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
    title: "Flav: save any TikTok recipe, then cook it",
    description:
      "Share a TikTok or a Reel and get the ingredients, steps and timers in your own cookbook. Free on iPhone.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flav turns TikTok and Instagram cooking videos into recipes you can cook from",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flav: save any TikTok recipe, then cook it",
    description:
      "Share a TikTok or a Reel and get the ingredients, steps and timers in your own cookbook. Free on iPhone.",
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
  // Icons are served via the app-directory file conventions:
  // src/app/icon.png (favicon) and src/app/apple-icon.png (180×180 apple-touch-icon).
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
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PostHogProvider>
            <SiteHeader />
            <main className="min-h-screen">{children}</main>
            <SiteFooter />
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
