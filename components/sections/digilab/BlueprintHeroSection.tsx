/**
 * Blueprint Hero Section
 * Combines FundAid blueprint diagram with navigation and CTAs
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FundAidBlueprintHero } from '@/components/hero/FundAidBlueprintHero';

export function BlueprintHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col bg-[#0A0F1C]"
    >
      {/* Sticky Navigation */}
      <nav
        className={cn(
          'sticky top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className={cn(
              'fundaid-wordmark text-2xl transition-all duration-300',
              scrolled ? 'text-gray-900' : ''
            )}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontWeight: 900,
              letterSpacing: '0.08em',
              background: scrolled
                ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
                : 'linear-gradient(135deg, #35F2C7 0%, #1EE2D0 50%, #A88CFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: scrolled
                ? 'none'
                : 'drop-shadow(0 0 12px rgba(53, 242, 199, 0.6)) drop-shadow(0 0 24px rgba(53, 242, 199, 0.3))',
              animation: scrolled ? 'none' : 'navPulse 3s ease-in-out infinite',
            }}
          >
            FUNDAID
          </div>
          <style jsx>{`
            @keyframes navPulse {
              0%, 100% {
                filter: drop-shadow(0 0 12px rgba(53, 242, 199, 0.6)) drop-shadow(0 0 24px rgba(53, 242, 199, 0.3));
              }
              50% {
                filter: drop-shadow(0 0 18px rgba(53, 242, 199, 0.9)) drop-shadow(0 0 36px rgba(53, 242, 199, 0.5)) drop-shadow(0 0 48px rgba(168, 140, 255, 0.3));
              }
            }
          `}</style>
          <div className="flex items-center gap-6">
            <Link
              href="#how-it-works"
              className={cn(
                'text-sm font-medium transition-colors duration-300',
                scrolled
                  ? 'text-gray-600 hover:text-gray-900'
                  : 'text-white/80 hover:text-white'
              )}
            >
              How It Works
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                scrolled
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              )}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Blueprint Hero Diagram */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[2400px] mx-auto">
          <FundAidBlueprintHero />
        </div>

        {/* CTAs below blueprint */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 pb-8">
          <Link
            href="/sign-up"
            className="group relative px-10 py-5 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
              boxShadow:
                '0 0 40px rgba(34, 211, 238, 0.4), 0 0 80px rgba(99, 102, 241, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <span className="relative z-10 text-white">Start Free Trial</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)',
              }}
            />
          </Link>
          <Link
            href="#how-it-works"
            className="px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 border-2"
            style={{
              borderColor: 'rgba(34, 211, 238, 0.3)',
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(12px)',
              color: '#22d3ee',
              boxShadow:
                '0 0 20px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            Explore Features
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-white/60 text-sm font-light">Scroll to explore</span>
        <svg
          className="w-6 h-6 text-white/60 animate-bounce"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
