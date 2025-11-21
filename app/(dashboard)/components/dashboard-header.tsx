"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { MeteorEffect } from "@/components/ui/animated-background";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const stages = [
  { name: "Dashboard", href: "/dashboard", stage: null },
  { name: "Profile", href: "/profile", stage: "Stage 1" },
  { name: "Discover", href: "/discover", stage: "Stage 2" },
  { name: "Analyze", href: "/analyze", stage: "Stage 3" },
  { name: "Generate", href: "/generate", stage: "Stage 4" },
];

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="relative bg-dark-950 border-b border-dark-800 backdrop-blur-md">
      {/* Subtle meteor effect */}
      <MeteorEffect
        density={8}
        speed={0.8}
        color="#9333ea"
        opacity={0.2}
      />

      <div className="relative z-10 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="dark-ghost" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
            </Link>
            <div className="border-l border-dark-700 h-8" />
            <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-semibold text-gradient-purple-blue-animated hidden md:block">Grant Automation</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {stages.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-purple-950/50 text-purple-300 border border-ocean-600/30"
                      : "text-dark-300 hover:bg-dark-800/50 hover:text-white"
                  )}
                >
                  <span>{item.name}</span>
                  {item.stage && (
                    <span className="ml-1.5 text-xs opacity-60">({item.stage})</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden mt-4 flex flex-wrap gap-2">
          {stages.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border",
                  isActive
                    ? "bg-purple-950/50 text-purple-300 border-ocean-600/30"
                    : "text-dark-300 hover:bg-dark-800/50 hover:text-white border-dark-700"
                )}
              >
                {item.stage || item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
