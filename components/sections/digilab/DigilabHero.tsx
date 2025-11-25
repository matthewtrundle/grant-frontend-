/**
 * DigilabHero - Ultra-minimal hero with FUNDAID custom font
 *
 * Design Philosophy:
 * - Uses custom FUNDAID font (no PNG transparency issues!)
 * - Minimal, Apple-esque aesthetic
 * - Sticky navigation that brightens on scroll
 * - Gradient text treatment on hero wordmark
 * - Clean scroll indicator
 * - Works seamlessly with FlowingWaveBackground
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import '@/styles/fundaid-font.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function DigilabHero() {
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

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Fade in hero content
      gsap.from('.hero-content', {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });

      // Fade in CTAs
      gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.8,
        stagger: 0.1
      });

      // Scroll indicator pulse
      gsap.to('.scroll-indicator', {
        y: 10,
        opacity: 0.4,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
      });

      // Fade out scroll indicator on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=300',
        scrub: 1,
        onUpdate: (self) => {
          gsap.to('.scroll-indicator', {
            opacity: 1 - self.progress,
            duration: 0
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col"
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
          <div className={cn(
            'fundaid-wordmark text-2xl transition-colors duration-300',
            scrolled ? 'text-gray-900' : 'text-white'
          )}>
            FUNDAID
          </div>
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

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="hero-content max-w-5xl mx-auto text-center space-y-8">
          {/* FUNDAID Wordmark with custom font */}
          <h1
            className="fundaid-wordmark-gradient"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              lineHeight: 1.1,
              letterSpacing: '0.08em'
            }}
          >
            FUNDAID
          </h1>

          {/* Tagline */}
          <p className="text-white text-xl md:text-2xl font-light max-w-2xl mx-auto">
            Stop Writing Grants. Start Winning Them.
          </p>

          {/* Description */}
          <p className="text-white/80 text-base md:text-lg font-light max-w-xl mx-auto">
            AI-powered grant automation that learns from winning proposals to help you secure funding faster.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/sign-up"
              className="hero-cta px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              href="#how-it-works"
              className="hero-cta px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/60 text-sm font-light">Scroll to explore</span>
        <svg
          className="w-6 h-6 text-white/60"
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
