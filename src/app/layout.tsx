import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
    default: "Flav — Your Recipes, Your Audience, Your Income",
    template: "%s | Flav",
  },
  description:
    "Flav is the short-form video app for food lovers. Discover recipes through swipeable videos, cook step-by-step with an AI sous-chef, import recipes from TikTok and Instagram in seconds, and earn 90–97% of revenue as a food creator. Free on iOS and Android.",
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
  creator: "Flav Inc.",
  publisher: "Flav Inc.",
  metadataBase: new URL("https://flav.app"),
  alternates: {
    canonical: "https://flav.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flav.app",
    siteName: "Flav",
    title: "Flav — The #1 Short-Form Video App for Food Lovers",
    description:
      "Discover viral recipes, cook step-by-step with an AI sous-chef, and earn 90–97% of revenue as a food creator. Import recipes from TikTok and Instagram. Free on iOS and Android.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flav — Short-form video app for food lovers with AI cooking assistant and creator monetization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flav — Your Recipes, Your Audience, Your Income",
    description:
      "The #1 short-form video app for food lovers. AI-powered recipe import, step-by-step cooking mode, and 90–97% creator payouts. Free on iOS & Android.",
    images: ["/og-image.png"],
    creator: "@cookwithflav",
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
          <Header />
          <main className="min-h-screen pt-16 md:pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
