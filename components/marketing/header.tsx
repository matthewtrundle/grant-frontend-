"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MegaMenuItem, MobileMenu } from "./mega-menu";
import {
  Sparkles,
  Zap,
  FileText,
  Users,
  Building2,
  BookOpen,
  Code,
  Rocket,
  Mail,
  Briefcase,
  Menu,
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for shrinking header effect
  useEffect(() => {
    const handleScroll = () => {
      // Snap menu into place after scrolling 100px
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      label: "Product",
      columns: [
        {
          title: "Features",
          items: [
            {
              label: "Company Profiler",
              href: "/features/profiler",
              description: "AI-powered tech profile extraction",
              icon: Sparkles,
            },
            {
              label: "Grant Discovery",
              href: "/features/discovery",
              description: "Find matching grant opportunities",
              icon: Zap,
            },
            {
              label: "Grant Analysis",
              href: "/features/analysis",
              description: "Deep RFP analysis & timelines",
              icon: FileText,
              badge: "$199",
            },
            {
              label: "Document Generation",
              href: "/features/generation",
              description: "Multi-agent grant writing system",
              icon: Rocket,
              badge: "$999",
            },
          ],
        },
        {
          title: "Tools",
          items: [
            {
              label: "TRL Scoring",
              href: "/features/trl",
              description: "Technology readiness assessment",
            },
            {
              label: "Budget Validator",
              href: "/features/budget",
              description: "Ensure grant compliance",
            },
            {
              label: "Progress Tracker",
              href: "/features/tracker",
              description: "Real-time application status",
            },
          ],
        },
      ],
    },
    {
      label: "Solutions",
      columns: [
        {
          title: "By Industry",
          items: [
            {
              label: "Healthcare",
              href: "/solutions/healthcare",
              icon: Users,
            },
          ],
        },
        {
          title: "By Company Size",
          items: [
            {
              label: "Early Stage",
              href: "/solutions/early-stage",
              description: "Pre-seed to Series A",
            },
            {
              label: "Growth Stage",
              href: "/solutions/growth-stage",
              description: "Series B+",
            },
            {
              label: "Enterprise",
              href: "/solutions/enterprise",
              description: "Large organizations",
            },
          ],
        },
      ],
    },
    {
      label: "Docs",
      columns: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              href: "/docs/getting-started",
              icon: BookOpen,
            },
            {
              label: "API Reference",
              href: "/docs/api",
              icon: Code,
            },
            {
              label: "Guides",
              href: "/docs/guides",
              icon: FileText,
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Blog",
              href: "/blog",
            },
            {
              label: "Case Studies",
              href: "/case-studies",
            },
            {
              label: "Grant Database",
              href: "/grants",
            },
          ],
        },
      ],
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Company",
      columns: [
        {
          title: "",
          items: [
            {
              label: "About Us",
              href: "/about",
              icon: Users,
            },
            {
              label: "Contact",
              href: "/contact",
              icon: Mail,
            },
            {
              label: "Careers",
              href: "/careers",
              icon: Briefcase,
              badge: "We're hiring",
            },
          ],
        },
      ],
    },
  ];

  return (
    <header
      className={`
        sticky top-0 z-50
        transition-all duration-500 ease-in-out
        ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      <div className={`container mx-auto px-4 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="flex items-center justify-between">
          {/* Logo - Shrinks on scroll */}
          <Link href="/" className={`flex items-center group transition-all duration-500 ${isScrolled ? '' : '-my-8'}`}>
            <img
              src="/logo1.png"
              alt="FundAid"
              className={`w-auto transition-all duration-500 group-hover:scale-105 drop-shadow-lg ${
                isScrolled ? 'h-16' : 'h-64'
              }`}
            />
          </Link>

          {/* Desktop Navigation - transitions on scroll */}
          <nav className={`hidden lg:flex items-center transition-all duration-500 ${isScrolled ? 'gap-4' : 'gap-6'}`}>
            {navigationItems.map((item, index) => (
              <MegaMenuItem
                key={index}
                label={item.label}
                href={item.href}
                columns={item.columns}
                isScrolled={isScrolled}
              />
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-900 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:scale-105 transition-transform duration-200"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button - Fitts's Law optimized */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden transition-all duration-300 p-2 rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-900 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        items={navigationItems}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
