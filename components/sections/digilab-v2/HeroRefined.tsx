/**
 * HeroRefined - Digilab-style polished hero
 *
 * Key improvements:
 * - Animated vertical line (grows on scroll)
 * - Muted palette (#F5F1E9 background, #3BB59E teal accent)
 * - Generous white space
 * - Clean, uncluttered composition
 * - Purposeful, slow animations
 * - 60-70ch text width
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { digilibTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroRefined() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
        },
      });

      // Vertical line grows from top
      tl.fromTo(
        '.hero-line',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, ease: 'none' },
        0
      );

      // Headline fades in
      tl.fromTo(
        '.hero-headline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.1
      );

      // Body fades in
      tl.fromTo(
        '.hero-body',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        0.2
      );

      // CTA fades in
      tl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
        0.35
      );

      // Fade out everything as scroll continues
      tl.to('.hero-content', { opacity: 0, y: -40, duration: 0.4, ease: 'power2.in' }, 0.7);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn('relative overflow-hidden', digilibTheme.spacing.section)}
      style={{ backgroundColor: digilibTheme.backgrounds.light }}
    >
      {/* Animated vertical line - Digilab signature element */}
      <div className="absolute left-8 md:left-16 top-0 bottom-0 w-[2px] overflow-hidden">
        <div
          className="hero-line w-full h-full"
          style={{
            backgroundColor: digilibTheme.accents.teal,
            opacity: 0.25,
          }}
        />
      </div>

      {/* Content - aligned to grid with generous spacing */}
      <div className={cn('hero-content relative z-10', digilibTheme.spacing.container)}>
        <div className="flex flex-col justify-center min-h-screen pl-12 md:pl-24">
          {/* Headline - xl size only */}
          <h1
            className={cn('hero-headline mb-8', digilibTheme.typography.headline, digilibTheme.spacing.textBlock)}
            style={{ color: digilibTheme.text.lightBg }}
          >
            Grant Automation.
            <br />
            Powered by AI.
          </h1>

          {/* Body - base size, constrained width */}
          <p
            className={cn('hero-body mb-12', digilibTheme.typography.body, digilibTheme.spacing.textBlock)}
            style={{ color: digilibTheme.text.muted }}
          >
            From company profile to submitted application in 14 days. AI extracts your technology,
            discovers perfect-fit grants, and writes 7+/10 quality responses for under $50 in API costs.
          </p>

          {/* CTA - muted teal accent */}
          <div className="hero-cta">
            <Link
              href="/auth/sign-up"
              className="inline-block px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: digilibTheme.accents.teal }}
            >
              Start Your Free Profile →
            </Link>
          </div>

          {/* Trust signal - sm size */}
          <div className="mt-8">
            <p className={cn(digilibTheme.typography.small)} style={{ color: digilibTheme.text.muted, opacity: 0.7 }}>
              No credit card required · 5-minute setup · 42% success rate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
