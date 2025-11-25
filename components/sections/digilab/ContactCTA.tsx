/**
 * ContactCTA - Final call-to-action section
 *
 * Features:
 * - Animated background dots (reuse MissionSection pattern)
 * - Centered headline and CTAs
 * - Fade-out transition to footer
 */

'use client';

import { useRef, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FloatingParticles } from '@/components/ui/floating-particles';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CtaDot {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

export function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const ctaDots = useMemo<CtaDot[]>(() => {
    const dots: CtaDot[] = [];
    // Use FundAid accent colors for dots
    const colors = [
      fundaidTheme.accents.teal,
      fundaidTheme.accents.lavender,
      fundaidTheme.accents.coral,
    ];

    // Create 50 dots with random positions
    for (let i = 0; i < 50; i++) {
      dots.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
      });
    }

    return dots;
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Set initial states - visible by default
      gsap.set('.cta-content', { opacity: 1, y: 0 });
      gsap.set('.cta-dot', { scale: 1, opacity: 0.3 });

      // Add subtle floating animation to dots
      gsap.utils.toArray('.cta-dot').forEach((dot: any, index: number) => {
        gsap.to(dot, {
          y: `+=${20 + Math.random() * 10}`,
          x: `+=${Math.random() * 10 - 5}`,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.1,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{
        background: 'linear-gradient(to bottom, #050714 0%, #0A0F1C 50%, #050816 100%)'
      }}
    >
      {/* Cosmic radial glows */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 50%, rgba(57, 242, 195, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(168, 140, 255, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* FloatingParticles for additional ambient motion */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingParticles count={15} color="teal" scrollInteractive />
      </div>

      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {ctaDots.map((dot, i) => (
          <div
            key={i}
            className="cta-dot absolute rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.color,
              transitionDelay: `${dot.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="cta-content text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h2
            className={cn(fundaidTheme.typography.h2, 'mb-8')}
            style={{ color: '#FFFFFF' }}
          >
            Ready to Win Your Next Grant?
          </h2>

          {/* Subheadline */}
          <p
            className={cn(fundaidTheme.typography.bodyLarge, 'mb-12')}
            style={{
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '70ch',
              margin: '0 auto 3rem',
            }}
          >
            From company profile to submitted application in under 14 days.
            Join the researchers winning millions with AI-powered grant automation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <Link
              href="/auth/sign-up"
              className="group relative px-8 py-4 rounded-full font-bold text-lg fundaid-lift shadow-fundaid-md"
              style={{
                backgroundColor: fundaidTheme.accents.teal,
                color: '#ffffff',
              }}
            >
              Start Your Free Profile
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-full font-bold text-lg fundaid-interactive border-2"
              style={{
                borderColor: fundaidTheme.accents.teal,
                color: '#FFFFFF',
                backgroundColor: 'transparent',
              }}
            >
              View Pricing
            </Link>
          </div>

          {/* Trust Signal */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>5-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>42% success rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
