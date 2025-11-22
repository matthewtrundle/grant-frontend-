/**
 * GrantCircleSection - Interactive grant opportunity timeline
 *
 * Features:
 * - Pinned section with 3D circular timeline
 * - Rotating grant opportunities with match scores
 * - Fade-in animation on scroll entry
 */

'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { GridLinesPattern, CornerBrackets, CircuitPattern } from '@/components/ui/decorative-elements';

// Dynamically import R3F canvas wrapper (client-only, no SSR)
const GrantCircleCanvas = dynamic(
  () => import('@/components/3d/GrantCircleCanvas'),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-900/20 animate-pulse" /> }
);

// Dynamic GSAP imports
let gsap: any;
let ScrollTrigger: any;

if (typeof window !== 'undefined') {
  gsap = require('gsap').default;
  ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
}

export function GrantCircleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !gsap || !ScrollTrigger) return;

      // Set initial states
      gsap.set('.grant-circle-content', { opacity: 0, y: 30 });

      // Fade-in reveal animation (1200ms duration, power2.out easing)
      gsap.to('.grant-circle-content', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.2, // Slight stagger between header and canvas
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
          // markers: true, // Uncomment for debugging
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: fundaidTheme.backgrounds.page }}
    >
      {/* Grid lines pattern for technical feel */}
      <GridLinesPattern
        color={fundaidTheme.text.muted}
        strokeWidth={0.5}
        spacing={80}
        opacity={0.08}
      />

      {/* Circuit patterns for tech aesthetic */}
      <CircuitPattern
        className="top-10 right-10 w-[200px] h-[200px]"
        color={fundaidTheme.accents.teal}
        opacity={0.1}
      />
      <CircuitPattern
        className="bottom-10 left-10 w-[200px] h-[200px] rotate-90"
        color={fundaidTheme.accents.lavender}
        opacity={0.08}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grant-circle-content text-center mb-16">
          <h2
            className={cn(fundaidTheme.typography.h1, 'mb-6')}
            style={{ color: fundaidTheme.text.main }}
          >
            Your Perfect Matches
          </h2>
          <p
            className={cn(fundaidTheme.typography.body, 'mx-auto')}
            style={{
              color: fundaidTheme.text.muted,
              maxWidth: '60ch',
            }}
          >
            AI-powered discovery ranks thousands of opportunities by fit score.
            See your top 10 grants visualized by deadline and match quality.
          </p>
        </div>

        {/* 3D Grant Circle */}
        <div
          className="grant-circle-content relative h-[600px] rounded-2xl overflow-hidden"
          style={{ backgroundColor: fundaidTheme.backgrounds.canvas }}
        >
          <GrantCircleCanvas />

          {/* Legend overlay */}
          <div className="relative absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
            <CornerBrackets
              color={fundaidTheme.accents.teal}
              size={16}
              strokeWidth={1.5}
              opacity={0.4}
            />
            <div className="text-sm font-medium mb-3" style={{ color: fundaidTheme.text.main }}>
              Match Quality
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: fundaidTheme.accents.teal }} />
                <span className="text-xs" style={{ color: fundaidTheme.text.muted }}>High (80%+)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: fundaidTheme.accents.lavender }} />
                <span className="text-xs" style={{ color: fundaidTheme.text.muted }}>Medium (70-80%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: fundaidTheme.text.muted }} />
                <span className="text-xs" style={{ color: fundaidTheme.text.muted }}>Lower (&lt;70%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
