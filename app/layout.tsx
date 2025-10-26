import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Grant Automation Platform - AI-Powered Grant Writing in 48 Hours",
  description: "Generate winning grant applications with AI. Save $10,000+ and 100+ hours. Get your TRL assessment, discover matching grants, and create complete applications.",
  keywords: ["grant writing", "AI grants", "SBIR", "STTR", "grant automation", "grant funding"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
