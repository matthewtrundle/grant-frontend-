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
import { FloatingParticles } from '@/components/ui/floating-particles';
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

      // Animate FUNDAID letters with 60ms stagger
      const letters = document.querySelectorAll('.fundaid-letter');
      gsap.from(letters, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.06, // 60ms stagger
        delay: 0.2
      });

      // Gentle pulse glow animation (1% intensity every 4 seconds)
      gsap.to('.fundaid-wordmark-gradient', {
        textShadow: '0 0 3px rgba(255, 255, 255, 0.4), 0 1px 3px rgba(0, 0, 0, 0.05)',
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        repeatDelay: 2
      });

      // Fade in tagline and description
      gsap.from('.hero-text', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power2.out',
        delay: 0.7,
        stagger: 0.15
      });

      // Fade in CTAs
      gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.2,
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
      {/* Dense Cosmic Particles for Fantastical Effect */}
      <FloatingParticles
        count={150}
        color="cyan"
        scrollInteractive
        className="opacity-40"
      />

      {/* Additional Lavender Particles Layer */}
      <FloatingParticles
        count={100}
        color="purple"
        scrollInteractive
        className="opacity-25"
      />

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
          {/* FUNDAID Wordmark with metallic capsule */}
          <div
            className="relative inline-flex items-center justify-center px-16 py-8 rounded-[4rem]"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(100, 200, 255, 0.15)',
              boxShadow: `
                0 0 60px rgba(34, 211, 238, 0.3),
                0 0 100px rgba(99, 102, 241, 0.2),
                0 0 140px rgba(167, 139, 250, 0.15),
                inset 0 1px 0 rgba(100, 200, 255, 0.2),
                inset 0 -1px 0 rgba(99, 102, 241, 0.1)
              `,
            }}
          >
            <h1
              className="fundaid-wordmark-gradient"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                lineHeight: 1.1,
                display: 'flex',
                justifyContent: 'center',
                gap: '0.08em',
                fontWeight: 900,
                letterSpacing: '0.02em',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              {'FUNDAID'.split('').map((letter, index) => (
                <span
                  key={index}
                  className="fundaid-letter inline-block"
                  style={{ display: 'inline-block' }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Tagline with cyan → lavender gradient */}
          <p
            className="hero-text text-xl md:text-2xl font-light max-w-2xl mx-auto"
            style={{
              background: 'linear-gradient(90deg, #22d3ee 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Stop Writing Grants. Start Winning Them.
          </p>

          {/* Description */}
          <p className="hero-text text-white/70 text-base md:text-lg font-light max-w-xl mx-auto">
            AI-powered grant automation that learns from winning proposals to help you secure funding faster.
          </p>

          {/* Prominent Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="/sign-up"
              className="hero-cta group relative px-10 py-5 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
                boxShadow: '0 0 40px rgba(34, 211, 238, 0.4), 0 0 80px rgba(99, 102, 241, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span className="relative z-10 text-white">Start Free Trial</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)',
                }}
              />
            </Link>
            <Link
              href="#how-it-works"
              className="hero-cta px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 border-2"
              style={{
                borderColor: 'rgba(34, 211, 238, 0.3)',
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(12px)',
                color: '#22d3ee',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              Explore Features
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
