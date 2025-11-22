/**
 * SiteNavigation - Global navigation bar
 *
 * Design: Clean white bar with logo, dropdowns, and CTAs
 * Position: Sticky at top, appears after scrolling past hero
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SiteNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <span className="text-[#2FB49E] font-bold text-xl">Fund</span>
              <span className="text-[#A98CEB] font-bold text-xl">Aid</span>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Product Dropdown */}
            <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              Product
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Solutions Dropdown */}
            <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              Solutions
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Docs Dropdown */}
            <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              Docs
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Pricing */}
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Pricing
            </a>

            {/* Company Dropdown */}
            <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              Company
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
              Sign In
            </button>
            <Button
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-6 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start Free TRL Assessment
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
