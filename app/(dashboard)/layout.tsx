"use client";

import { DashboardHeader } from "./components/dashboard-header";
import { FadeTransition } from "@/components/ui/page-transition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <FadeTransition>
          {children}
        </FadeTransition>
      </main>
    </div>
  );
}
