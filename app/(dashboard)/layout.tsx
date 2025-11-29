"use client";

import { DashboardHeader } from "./components/dashboard-header";
import { FadeTransition } from "@/components/ui/page-transition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-fundaid-page relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-fundaid-section-subtle via-white to-fundaid-section-accent opacity-30" />

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
