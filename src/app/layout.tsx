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
    "The short-form video app for food lovers. Discover recipes, grow your audience, and monetize your cooking content with tips and premium recipes.",
  keywords: [
    "recipes",
    "cooking",
    "food videos",
    "creator monetization",
    "cooking app",
    "recipe app",
    "food creators",
    "short-form video",
  ],
  authors: [{ name: "Flav" }],
  creator: "Flav",
  publisher: "Flav Inc.",
  metadataBase: new URL("https://flav.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flav.app",
    siteName: "Flav",
    title: "Flav — Your Recipes, Your Audience, Your Income",
    description:
      "The short-form video app for food lovers. Discover recipes, grow your audience, and monetize your cooking content.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flav - Recipe Discovery App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flav — Your Recipes, Your Audience, Your Income",
    description:
      "The short-form video app for food lovers. Discover, create, and earn from your recipes.",
    images: ["/og-image.png"],
    creator: "@flavapp",
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
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
