/**
 * MissionSection - Why FundAid Exists
 *
 * Design Philosophy:
 * - Calm, data-driven, serious grant research tool aesthetic
 * - 2-column layout: narrative copy (left) + data card (right)
 * - ONE subtle animation only (fade-in on scroll-in-view)
 * - No particle chaos, no bouncing, no perpetual loops
 * - Single teal accent for highlights
 * - Mono fonts for data at 40-60% opacity
 */

'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotGridPattern, CornerBrackets, ConnectingLine, FloatingOrb } from '@/components/ui/decorative-elements';
import { FloatingParticles } from '@/components/ui/floating-particles';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Set initial states
      gsap.set('.mission-content', { opacity: 0, y: 30 });
      gsap.set('.data-card-progress', { scaleX: 0, transformOrigin: 'left center' });

      // ONE subtle fade-in animation on scroll-in-view (1200ms)
      gsap.to('.mission-content', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
          // markers: true, // Uncomment for debugging
        },
      });

      // Slow progress bar fill-in for data card (2.5 seconds)
      gsap.to('.data-card-progress', {
        scaleX: 1,
        duration: 2.5,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.data-card',
          start: 'top 70%',
          toggleActions: 'play none none none',
          // markers: true, // Uncomment for debugging
        },
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
      {/* Background dot grid pattern for subtle depth */}
      <DotGridPattern
        color={fundaidTheme.text.muted}
        dotSize={1}
        spacing={30}
        opacity={0.15}
      />

      {/* Floating particles for subtle motion */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingParticles count={20} color="teal" scrollInteractive />
      </div>

      {/* Floating orbs for filling deadspace */}
      <FloatingOrb
        className="top-20 left-[10%]"
        size={200}
        color={fundaidTheme.accents.teal}
        opacity={0.05}
        blur={40}
      />
      <FloatingOrb
        className="bottom-20 right-[15%]"
        size={150}
        color={fundaidTheme.accents.teal}
        opacity={0.03}
        blur={30}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="mission-content relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Connecting line between columns on desktop */}
          <div className="hidden lg:block absolute left-[45%] top-1/2 w-[10%] -translate-y-1/2">
            <ConnectingLine
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              gradient={true}
              animated={false}
              color={fundaidTheme.accents.teal}
              strokeWidth={1}
              strokeDasharray="6,6"
            />
          </div>
          {/* Left Column: Narrative Copy */}
          <div className="max-w-[600px]">
            {/* Top Label */}
            <div
              className={cn(fundaidTheme.typography.stageLabel, 'mb-6')}
              style={{ color: fundaidTheme.text.muted }}
            >
              WHY FUNDAID EXISTS
            </div>

            {/* Main Heading */}
            <h2
              className={cn(
                'text-4xl md:text-5xl font-bold leading-tight mb-8'
              )}
              style={{ color: fundaidTheme.text.main }}
            >
              Most teams drown in grant PDFs.
              <br />
              Our agents read them for you.
            </h2>

            {/* Body Paragraphs */}
            <div className="space-y-6">
              <p
                className={cn(fundaidTheme.typography.bodyLarge)}
                style={{ color: fundaidTheme.text.muted }}
              >
                Every year, thousands of grants go unclaimed because researchers can't keep up
                with the noise. They spend 40% of their time writing applications, only to
                discover they're not eligible—or worse, miss the deadline entirely.
              </p>

              <p
                className={cn(fundaidTheme.typography.bodyLarge)}
                style={{ color: fundaidTheme.text.muted }}
              >
                FundAid doesn't just search grants. We read them. We extract every eligibility
                criterion, every budget rule, every deadline nuance. Then we map your technology
                profile against thousands of opportunities to find the ones you can actually win.
              </p>

              <p
                className={cn(fundaidTheme.typography.bodyLarge)}
                style={{ color: fundaidTheme.text.muted }}
              >
                We're not a marketplace. We're a research engine that turns messy databases
                into a readable story—your story—backed by data, not hype.
              </p>
            </div>
          </div>

          {/* Right Column: Single Data Card */}
          <div className="lg:sticky lg:top-24">
            <div
              className="data-card relative bg-white rounded-2xl p-8 border"
              style={{
                borderColor: fundaidTheme.text.muted,
                opacity: 0.95,
              }}
            >
              {/* Corner brackets for the card */}
              <CornerBrackets
                color={fundaidTheme.accents.teal}
                size={24}
                strokeWidth={2}
                opacity={0.4}
              />
              {/* Progress bar at top (optional visual interest) */}
              <div
                className="absolute top-0 left-0 right-0 h-1 overflow-hidden rounded-t-2xl"
                style={{ backgroundColor: fundaidTheme.backgrounds.canvas }}
              >
                <div
                  className="data-card-progress h-full origin-left"
                  style={{
                    backgroundColor: fundaidTheme.accents.teal,
                    opacity: 0.6,
                  }}
                />
              </div>

              {/* Card Title */}
              <div
                className={cn(fundaidTheme.typography.stageLabel, 'mb-8 mt-2')}
                style={{ color: fundaidTheme.text.muted, opacity: 0.5 }}
              >
                REAL-TIME GRANT INTELLIGENCE
              </div>

              {/* Data Metrics - Mono fonts, 40-60% opacity */}
              <div className="space-y-6">
                {/* Metric 1: Grants Scanned */}
                <div>
                  <div
                    className={cn(fundaidTheme.typography.metric, 'mb-1')}
                    style={{ color: fundaidTheme.text.muted, opacity: 0.5 }}
                  >
                    GRANTS SCANNED
                  </div>
                  <div
                    className="text-5xl font-black leading-none"
                    style={{ color: fundaidTheme.text.main }}
                  >
                    2,438
                  </div>
                </div>

                {/* Metric 2: Good Matches */}
                <div>
                  <div
                    className={cn(fundaidTheme.typography.metric, 'mb-1')}
                    style={{ color: fundaidTheme.text.muted, opacity: 0.5 }}
                  >
                    GOOD MATCHES
                  </div>
                  <div
                    className="text-5xl font-black leading-none"
                    style={{ color: fundaidTheme.accents.teal }}
                  >
                    94
                  </div>
                </div>

                {/* Metric 3: High-Priority */}
                <div>
                  <div
                    className={cn(fundaidTheme.typography.metric, 'mb-1')}
                    style={{ color: fundaidTheme.text.muted, opacity: 0.5 }}
                  >
                    HIGH-PRIORITY OPPORTUNITIES
                  </div>
                  <div
                    className="text-5xl font-black leading-none"
                    style={{ color: fundaidTheme.accents.teal }}
                  >
                    12
                  </div>
                </div>
              </div>

              {/* Bottom note */}
              <div
                className={cn('mt-8 pt-6 border-t', fundaidTheme.typography.metric)}
                style={{
                  borderColor: fundaidTheme.text.muted,
                  color: fundaidTheme.text.muted,
                  opacity: 0.4,
                }}
              >
                Updated every 24 hours from NIH, NSF, DOE, USDA, and 47 other federal sources
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
