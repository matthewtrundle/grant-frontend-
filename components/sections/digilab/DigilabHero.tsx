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
import Image from 'next/image';

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
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Fund Aid Minimalist Variation 1.png"
          alt="Fund Aid Hero Background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Vertical Line - Scroll Hint */}
      <div
        ref={lineRef}
        className="hero-line absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/60 to-transparent z-[1]"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Headline - Split into words for stagger animation */}
        <h1
          className={cn(
            digilibTheme.typography.display,
            'mb-6 leading-[1.1]',
            'text-white drop-shadow-lg'
          )}
        >
          <span className="hero-heading-word inline-block mr-6">Transform</span>
          <span className="hero-heading-word inline-block mr-6">Research</span>
          <br />
          <span className="hero-heading-word inline-block mr-6">into</span>
          <span className="hero-heading-word inline-block bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-transparent">
            Funding
          </span>
        </h1>

        {/* Subheading */}
        <p
          className={cn(
            'hero-subheading',
            digilibTheme.typography.body,
            digilibTheme.spacing.textBlock,
            'mx-auto mb-8',
            'text-white/90 drop-shadow-md'
          )}
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
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-70 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 rounded-full border-2 border-white/60 flex items-center justify-center">
            <div className="w-1 h-2 rounded-full bg-white/80" />
          </div>
          <span className="text-xs text-white/80 tracking-wider uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
}
