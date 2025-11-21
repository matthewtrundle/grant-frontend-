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
import { digilibTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    const colors = [
      digilibTheme.stages.profile,
      digilibTheme.stages.discover,
      digilibTheme.stages.analyze,
      digilibTheme.stages.generate,
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      // Fade in content
      tl.fromTo(
        '.cta-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5 }
      );

      // Pulse dots
      tl.fromTo(
        '.cta-dot',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.6,
          stagger: { each: 0.01, from: 'random' },
          duration: 0.5,
        },
        0.2
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn('relative', digilibTheme.spacing.section)}
      style={{ backgroundColor: digilibTheme.backgrounds.dark }}
    >
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
      <div className={cn('relative z-10', digilibTheme.spacing.container)}>
        <div className="cta-content text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h2
            className={cn(digilibTheme.typography.display, 'mb-8')}
            style={{ color: digilibTheme.text.darkBg }}
          >
            Ready to Win Your Next Grant?
          </h2>

          {/* Subheadline */}
          <p
            className={cn(digilibTheme.typography.h3, 'mb-12')}
            style={{
              color: digilibTheme.text.muted,
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
              className="group relative px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: digilibTheme.stages.generate,
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
              className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 border-2"
              style={{
                borderColor: digilibTheme.text.darkBg,
                color: digilibTheme.text.darkBg,
                backgroundColor: 'transparent',
              }}
            >
              View Pricing
            </Link>
          </div>

          {/* Trust Signal */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm" style={{ color: digilibTheme.text.muted }}>
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
