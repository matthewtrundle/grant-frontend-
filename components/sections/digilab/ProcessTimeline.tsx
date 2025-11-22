/**
 * ProcessTimeline - 4-stage process with Digilab 3-column layout
 *
 * Layout:
 * - Left (24%): Huge stage numbers + tiny labels (all 4 stages stacked)
 * - Middle (34%): Active stage content (title, description, metrics)
 * - Right (42%): R3F canvas visualization
 *
 * Scroll Behavior:
 * - 400vh total scroll (100vh per stage)
 * - Active step changes on scroll
 * - Only active stage shows full content in middle column
 * - Inactive stages ghosted to 10-20% opacity
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import R3F canvas wrapper (client-only, no SSR)
const ProcessTimelineCanvas = dynamic(
  () => import('@/components/3d/ProcessTimelineCanvas'),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-900/5 animate-pulse" /> }
);

interface Stage {
  id: 1 | 2 | 3 | 4;
  label: string;           // Uppercase mini-label (e.g., "PROFILE")
  title: string;           // 1-line title
  description: string;     // 1-2 lines max
  metrics: string;         // Mono metrics string (e.g., "2,438 grants · 8 sources · 94 matches")
}

const stages: Stage[] = [
  {
    id: 1,
    label: 'PROFILE',
    title: 'Understand Your Technology',
    description: 'Extract tech stack, assess TRL, build comprehensive company profile in 5 minutes.',
    metrics: '5 min setup · 95% accuracy · TRL 1-9 scoring',
  },
  {
    id: 2,
    label: 'DISCOVER',
    title: 'Find Perfect Matches',
    description: 'AI searches thousands of grants, ranks by fit score, delivers personalized PDF report.',
    metrics: '2,438 grants scanned · 8 sources · 94 strong matches',
  },
  {
    id: 3,
    label: 'ANALYZE',
    title: 'Deep Grant Analysis',
    description: 'Parse RFPs, generate timelines, validate budgets, ensure 100% compliance.',
    metrics: '100% compliance · Auto timeline · Budget validation',
  },
  {
    id: 4,
    label: 'GENERATE',
    title: 'AI-Powered Writing',
    description: 'Multi-agent system writes responses, simulates assessor feedback, iterates to 7+/10 quality.',
    metrics: '7+/10 avg score · <$50 API cost · 3-assessor simulation',
  },
];

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Kill any existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });

      // CRITICAL FIX: Pin the section and add snap points for each stage
      const mainTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=300%', // 4 stages - extend scroll distance for proper progression
        pin: true, // CRITICAL: Pin the section to viewport!
        scrub: 0.5, // Smoother scrubbing
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 1], // Snap to each stage boundary
          duration: { min: 0.3, max: 0.6 },
          delay: 0.1,
          ease: "power2.inOut"
        },
        onUpdate: (self) => {
          // Calculate which stage should be active based on progress
          const progress = self.progress;
          setScrollProgress(progress);

          // Map progress to stages more accurately
          // 0-0.25 = stage 1, 0.25-0.5 = stage 2, 0.5-0.75 = stage 3, 0.75-1 = stage 4
          let newStep: 1 | 2 | 3 | 4;
          if (progress < 0.25) {
            newStep = 1;
          } else if (progress < 0.5) {
            newStep = 2;
          } else if (progress < 0.75) {
            newStep = 3;
          } else {
            newStep = 4;
          }

          // Only update if step changed
          if (newStep !== activeStep) {
            setActiveStep(newStep);
          }
        },
        // markers: true, // Uncomment for debugging
        id: 'process-timeline-main',
      });

      // Add smooth transitions for stage numbers with better timing
      gsap.to('.stage-number', {
        opacity: (index, element) => {
          const stageId = parseInt(element.dataset.stageId || '1');
          return stageId === activeStep ? 1 : 0.2;
        },
        scale: (index, element) => {
          const stageId = parseInt(element.dataset.stageId || '1');
          return stageId === activeStep ? 1 : 0.95;
        },
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
      });

      // Animate scroll progress indicator to show stage progression
      gsap.to('.scroll-progress-line', {
        scaleY: scrollProgress,
        duration: 0.1,
        ease: 'none',
        transformOrigin: 'top center',
        overwrite: 'auto',
      });

      // Refresh ScrollTrigger after a brief delay to ensure layout is complete
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      // Cleanup function
      return () => {
        mainTrigger.kill();
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === section) {
            trigger.kill();
          }
        });
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Smooth transitions for active stage content optimized for pinned scrolling
  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Quick fade out old content
      tl.to('.stage-content-inactive', {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: 'power2.in',
      });

      // Smooth fade in new content
      tl.fromTo(
        '.stage-content-active',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.15' // Small overlap for seamless transition
      );

      // Animate the active indicator with stronger presence
      gsap.to('.stage-active-indicator', {
        opacity: (index, element) => {
          const stageId = parseInt(element.dataset.stageId || '1');
          return stageId === activeStep ? 1 : 0;
        },
        x: (index, element) => {
          const stageId = parseInt(element.dataset.stageId || '1');
          return stageId === activeStep ? 0 : -10;
        },
        scaleY: (index, element) => {
          const stageId = parseInt(element.dataset.stageId || '1');
          return stageId === activeStep ? 1 : 0.7;
        },
        duration: 0.5,
        ease: 'power3.out',
      });
    },
    { dependencies: [activeStep] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen" // FIXED: Single viewport height when pinned
      style={{ backgroundColor: fundaidTheme.backgrounds.page }}
    >
      {/* Pinned container - shows 3-column layout (no longer needs sticky since we're pinning) */}
      <div className="min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 lg:py-40">
          {/* 3-Column Grid: Desktop */}
          <div className="hidden lg:grid grid-cols-[24%_34%_42%] gap-8 items-start">
            {/* LEFT COLUMN: All 4 stage numbers stacked vertically */}
            <div className="relative space-y-8">
              {/* Scroll progress indicator */}
              <div
                className="absolute left-[-20px] top-0 bottom-0 w-[2px] bg-gray-200"
                style={{ opacity: 0.2 }}
              >
                <div
                  className="scroll-progress-line w-full origin-top"
                  style={{ backgroundColor: fundaidTheme.accents.teal, height: '100%' }}
                />
              </div>

              {stages.map((stage) => {
                const isActive = activeStep === stage.id;
                return (
                  <div
                    key={stage.id}
                    className={cn(
                      'relative transition-all duration-500',
                      isActive ? 'opacity-100' : 'opacity-20'
                    )}
                  >
                    {/* Stage Number */}
                    <div
                      className={cn(fundaidTheme.typography.stageNumber, 'stage-number')}
                      data-stage-id={stage.id}
                      style={{ color: fundaidTheme.text.main }}
                    >
                      {stage.id}
                    </div>

                    {/* Stage Label */}
                    <div
                      className={cn(fundaidTheme.typography.stageLabel, 'mt-2')}
                      style={{ color: fundaidTheme.text.muted }}
                    >
                      {stage.label}
                    </div>

                    {/* Active indicator: tiny left border in teal */}
                    <div
                      className="stage-active-indicator absolute left-0 top-0 bottom-0 w-1 rounded-full"
                      data-stage-id={stage.id}
                      style={{
                        backgroundColor: fundaidTheme.accents.teal,
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* MIDDLE COLUMN: Active stage content only */}
            <div className="relative min-h-[400px]">
              {stages.map((stage) => {
                const isActive = activeStep === stage.id;

                return (
                  <div
                    key={stage.id}
                    className={cn(
                      'absolute inset-0',
                      isActive ? 'stage-content-active' : 'stage-content-inactive pointer-events-none'
                    )}
                    style={{
                      opacity: isActive ? 1 : 0,
                      visibility: isActive ? 'visible' : 'hidden',
                    }}
                  >
                    {/* Title */}
                    <h3
                      className={cn(fundaidTheme.typography.h3, 'mb-4')}
                      style={{ color: fundaidTheme.text.main }}
                    >
                      {stage.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(fundaidTheme.typography.bodyLarge, 'mb-6')}
                      style={{ color: fundaidTheme.text.muted }}
                    >
                      {stage.description}
                    </p>

                    {/* Metrics - Mono font at 60% opacity */}
                    <div
                      className={cn(fundaidTheme.typography.metric)}
                      style={{
                        color: fundaidTheme.text.muted,
                        opacity: 0.6,
                      }}
                    >
                      {stage.metrics}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: R3F Canvas wrapper */}
            <div className="relative">
              <div
                className="aspect-[4/3] rounded-2xl overflow-hidden border"
                style={{
                  backgroundColor: fundaidTheme.backgrounds.canvas,
                  borderColor: fundaidTheme.text.muted,
                  borderOpacity: 0.1,
                }}
              >
                <ProcessTimelineCanvas activeStep={activeStep} />
              </div>

              {/* Optional: Stage label overlay on canvas */}
              <div
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
                style={{ opacity: 0.8 }}
              >
                <p
                  className={cn(fundaidTheme.typography.metric)}
                  style={{ color: fundaidTheme.text.main }}
                >
                  STAGE {activeStep}: {stages[activeStep - 1].label}
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE: Stack vertically */}
          <div className="lg:hidden space-y-8">
            {/* Mobile: Horizontal mini-timeline of stage numbers */}
            <div className="flex items-center justify-around border-b pb-6"
                 style={{ borderColor: fundaidTheme.text.muted, borderOpacity: 0.2 }}>
              {stages.map((stage) => {
                const isActive = activeStep === stage.id;
                return (
                  <div
                    key={stage.id}
                    className={cn(
                      'text-center transition-opacity duration-500',
                      isActive ? 'opacity-100' : 'opacity-30'
                    )}
                  >
                    <div
                      className="text-5xl font-black"
                      style={{ color: fundaidTheme.text.main }}
                    >
                      {stage.id}
                    </div>
                    <div
                      className={cn(fundaidTheme.typography.stageLabel, 'mt-1')}
                      style={{ color: fundaidTheme.text.muted }}
                    >
                      {stage.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile: Active stage content */}
            {stages.map((stage) => {
              const isActive = activeStep === stage.id;
              if (!isActive) return null;

              return (
                <div key={stage.id} className="stage-content-active">
                  <h3
                    className={cn(fundaidTheme.typography.h3, 'mb-4')}
                    style={{ color: fundaidTheme.text.main }}
                  >
                    {stage.title}
                  </h3>
                  <p
                    className={cn(fundaidTheme.typography.bodyLarge, 'mb-6')}
                    style={{ color: fundaidTheme.text.muted }}
                  >
                    {stage.description}
                  </p>
                  <div
                    className={cn(fundaidTheme.typography.metric)}
                    style={{
                      color: fundaidTheme.text.muted,
                      opacity: 0.6,
                    }}
                  >
                    {stage.metrics}
                  </div>
                </div>
              );
            })}

            {/* Mobile: Canvas */}
            <div
              className="aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden border"
              style={{
                backgroundColor: fundaidTheme.backgrounds.canvas,
                borderColor: fundaidTheme.text.muted,
                borderOpacity: 0.1,
              }}
            >
              <ProcessTimelineCanvas activeStep={activeStep} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
