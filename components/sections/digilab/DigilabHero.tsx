/**
 * DigilabHero - Pinned hero section with vertical line animation
 *
 * Features:
 * - Pinned section with scroll-driven animations
 * - Growing vertical line to hint at scroll direction
 * - Staggered headline reveal
 * - Soft 3D helix background
 * - CTA button
 */

'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { digilibTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

// Dynamically import 3D scene
const DNAScrollScene = dynamic(
  () => import('@/components/3d/DNAScrollScene').then((mod) => mod.DNAScrollScene),
  { ssr: false }
);

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function DigilabHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Create pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
        },
      });

      // Animate vertical line growth
      tl.fromTo(
        '.hero-line',
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, ease: 'none' },
        0
      );

      // Staggered headline reveal
      tl.fromTo(
        '.hero-heading-word',
        { yPercent: 50, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.1, ease: 'power2.out' },
        0
      );

      // Fade out subheading and CTA
      tl.to(
        '.hero-subheading, .hero-cta',
        { opacity: 0, y: -20, ease: 'power2.in' },
        0.7
      );

      // Fade out entire section
      tl.to(section, { opacity: 0, ease: 'power2.in' }, 0.9);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative min-h-screen',
        'flex items-center justify-center',
        'overflow-hidden'
      )}
      style={{ backgroundColor: digilibTheme.backgrounds.light }}
    >
      {/* 3D DNA Background - Very Subtle */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
        <DNAScrollScene pages={1} damping={0.3} />
      </div>

      {/* Vertical Line - Scroll Hint */}
      <div
        ref={lineRef}
        className="hero-line absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-sky-500 to-transparent z-[1]"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Headline - Split into words for stagger animation */}
        <h1
          className={cn(
            digilibTheme.typography.display,
            'mb-6 leading-[1.1]'
          )}
          style={{ color: digilibTheme.text.lightBg }}
        >
          <span className="hero-heading-word inline-block mr-6">Transform</span>
          <span className="hero-heading-word inline-block mr-6">Research</span>
          <br />
          <span className="hero-heading-word inline-block mr-6">into</span>
          <span className="hero-heading-word inline-block bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
            Funding
          </span>
        </h1>

        {/* Subheading */}
        <p
          className={cn(
            'hero-subheading',
            digilibTheme.typography.body,
            digilibTheme.spacing.textBlock,
            'mx-auto mb-8'
          )}
          style={{ color: digilibTheme.text.muted }}
        >
          AI-powered grant automation for researchers who want to focus on science, not paperwork
        </p>

        {/* CTA */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className={cn(
              'group',
              'bg-gradient-to-r from-sky-600 to-emerald-600',
              'hover:from-sky-700 hover:to-emerald-700',
              'text-white font-medium',
              'px-8 py-6 text-base',
              'transition-all duration-300',
              'hover:scale-105 hover:shadow-xl'
            )}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Start Your Application
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className={cn(
              'border-2 border-sky-600',
              'text-sky-700',
              'hover:bg-sky-50',
              'px-8 py-6 text-base',
              'transition-all duration-300',
              'hover:scale-105'
            )}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-50 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center">
            <div className="w-1 h-2 rounded-full bg-slate-400" />
          </div>
          <span className="text-xs text-slate-400 tracking-wider uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
}
