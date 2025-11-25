import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display, Orbitron, Fredoka, Nunito, Varela_Round, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

// FundAid Wordmark Fonts - Heavy, rounded geometric style
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const varelaRound = Varela_Round({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-varela-round",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FundAid for Health - AI-Powered Healthcare Grant Writing",
  description: "Generate winning NIH, FDA, and CDC grant applications with AI. Save $10,000+ and 100+ hours. Biotech and medtech companies get TRL assessment, discover matching grants, and create complete applications.",
  keywords: ["healthcare grant writing", "NIH grants", "FDA grants", "SBIR", "STTR", "biotech funding", "medtech grants", "grant automation"],
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} ${orbitron.variable} ${fredoka.variable} ${nunito.variable} ${varelaRound.variable} ${outfit.variable}`}>
        <body className="antialiased">
          <SmoothScrollProvider />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
