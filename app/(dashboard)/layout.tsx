"use client";

import { DashboardHeader } from "./components/dashboard-header";
import { FadeTransition } from "@/components/ui/page-transition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,60,255,0.03),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(60,120,255,0.03),transparent_50%)]" />

      <div className="relative z-10">
        <DashboardHeader />
        <main className="container mx-auto max-w-7xl px-4 py-8">
          <FadeTransition>
            {children}
          </FadeTransition>
        </main>
      </div>
    </div>
  );
}
