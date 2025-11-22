import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display, Orbitron } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Grant Automation Platform - AI-Powered Grant Writing in 48 Hours",
  description: "Generate winning grant applications with AI. Save $10,000+ and 100+ hours. Get your TRL assessment, discover matching grants, and create complete applications.",
  keywords: ["grant writing", "AI grants", "SBIR", "STTR", "grant automation", "grant funding"],
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
      <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} ${orbitron.variable}`}>
        <body className="antialiased">
          <SmoothScrollProvider />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
