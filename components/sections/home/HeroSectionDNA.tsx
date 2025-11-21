/**
 * Hero Section - DNA Science Aesthetic
 *
 * Professional biotech startup meets scientific precision.
 * Light off-white background with DNA helix watermark.
 *
 * Features:
 * - DNA helix watermark (top right, 10% opacity)
 * - Hexagonal pattern overlay (subtle)
 * - Molecular bonds background
 * - Teal/green gradient CTA button
 * - Navy text on light background
 * - Pinned scroll animation (stays while content scrolls)
 */

'use client';

import { Button } from '@/components/ui/button';
import { DNAHelixScroll } from '@/components/ui/dna-helix-scroll';
import { HexagonalPattern, MolecularBonds } from '@/components/ui/hexagonal-pattern';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useParallax } from '@/hooks/gsap/useParallax';
import { useScrollMorph } from '@/hooks/gsap/useScrollMorph';
import { useTextReveal } from '@/hooks/gsap/useTextReveal';
import dynamic from 'next/dynamic';

// Dynamically import 3D scene to avoid SSR issues
const DNAScrollScene = dynamic(
  () => import('@/components/3d/DNAScrollScene').then((mod) => mod.DNAScrollScene),
  { ssr: false }
);

export function HeroSectionDNA() {
  // Parallax hooks for depth
  const hexPatternRef = useParallax({ speed: 0.3 });
  const molecularRef = useParallax({ speed: 0.6 });

  // Text reveal animations with premium stagger
  const titleRef = useTextReveal({
    splitBy: 'words',
    stagger: 0.08,
    duration: 0.8,
    ease: 'power3.out',
    triggerOnScroll: false, // Immediate on load
    y: 40,
  });

  const subtitleRef = useTextReveal({
    splitBy: 'words',
    stagger: 0.04,
    duration: 0.6,
    ease: 'power2.out',
    triggerOnScroll: false,
    y: 30,
  });

  return (
    <section
      className={cn(
        'relative min-h-screen',
        'flex items-center justify-center',
        'bg-gradient-to-b from-bg-dna-primary to-bg-dna-secondary',
        'overflow-hidden'
      )}
    >
      {/* 3D DNA Scroll Animation - Soft Background */}
      <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
        <DNAScrollScene pages={3} damping={0.3} />
      </div>

      {/* Hexagonal Pattern Overlay - Very Subtle */}
      <div ref={hexPatternRef} className="absolute inset-0 opacity-3 z-[1]">
        <HexagonalPattern density="low" color="gray" />
      </div>

      {/* Molecular Bonds Background - Minimal */}
      <div ref={molecularRef} className="absolute inset-0 opacity-4 z-[1]">
        <MolecularBonds nodeCount={8} nodeSize={2} color="teal" />
      </div>

      {/* Content Container - Clean and Centered */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
        {/* Tagline - Elegant Typography with Proper Line Breaks */}
        <h1
          ref={titleRef}
          className={cn(
            'text-5xl md:text-6xl font-semibold',
            'tracking-tight leading-tight',
            'text-slate-900',
            'mb-6'
          )}
        >
          Grant Automation
          <span className="block mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Powered by Science
          </span>
        </h1>

        {/* Subtitle - Balanced and Legible */}
        <p
          ref={subtitleRef}
          className={cn(
            'text-lg md:text-xl',
            'text-slate-600 leading-relaxed',
            'max-w-2xl mx-auto mb-8'
          )}
        >
          Transform your grant applications with AI-driven precision. From profiling to submission,
          we handle the complexity so you can focus on your research.
        </p>

        {/* CTA Buttons - Refined Styling */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA - Elegant Teal */}
          <Button
            size="lg"
            className={cn(
              'group',
              'bg-gradient-to-r from-emerald-600 to-teal-600',
              'hover:from-emerald-700 hover:to-teal-700',
              'text-white font-medium',
              'px-8 py-6 text-base',
              'transition-all duration-300',
              'hover:scale-105 hover:shadow-lg'
            )}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Start Your Application
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Secondary CTA - Subtle Outline */}
          <Button
            size="lg"
            variant="outline"
            className={cn(
              'border-2 border-emerald-600',
              'text-emerald-700',
              'hover:bg-emerald-50',
              'px-8 py-6 text-base',
              'transition-all duration-300',
              'hover:scale-105'
            )}
          >
            View Sample Grants
          </Button>
        </div>

        {/* Trust Indicators - Clean and Minimal */}
        <div className="mt-12 flex flex-wrap gap-8 justify-center items-center text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>40% Higher Success Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span>100+ Grants Funded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <span>$10K+ Average Award</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Minimal */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center">
            <div className="w-1 h-2 rounded-full bg-slate-400 animate-bounce" />
          </div>
          <span className="text-xs text-slate-400 tracking-wider uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
}
