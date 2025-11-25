/**
 * ProcessTimelineFixed - 4-stage process with smooth scroll-linked animations
 *
 * Key Features:
 * - Smooth, controlled animations with GSAP power3.out and power2.inOut
 * - Expanding lines in center column with coordinated nodule appearances
 * - Professional, intentional motion - no jittery effects
 * - Clean visual integration with stage colors
 */

'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProfileAgentBlueprint } from '@/components/visuals/ProfileAgentBlueprint';
import { DiscoverAgentBlueprint } from '@/components/visuals/DiscoverAgentBlueprint';
import { AnalyzeAgentBlueprint } from '@/components/visuals/AnalyzeAgentBlueprint';
import { GenerateAgentBlueprint } from '@/components/visuals/GenerateAgentBlueprint';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import R3F canvas wrapper
const ProcessTimelineCanvas = dynamic(
  () => import('@/components/3d/ProcessTimelineCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white animate-pulse" />
    )
  }
);

// Animated SVG Icons for each stage - Enhanced visibility
const StageIcons = {
  profile: (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <path d="M24 4 L24 44 M4 24 L44 24" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <circle cx="24" cy="18" r="6" fill="currentColor"/>
      <path d="M12 38 Q24 28 36 38" fill="currentColor" opacity="0.8"/>
    </svg>
  ),
  discover: (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M26 26 L38 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="3" fill="currentColor"/>
    </svg>
  ),
  analyze: (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <rect x="12" y="16" width="24" height="2" fill="currentColor" opacity="0.8"/>
      <rect x="12" y="22" width="18" height="2" fill="currentColor" opacity="0.7"/>
      <rect x="12" y="28" width="20" height="2" fill="currentColor" opacity="0.6"/>
      <circle cx="36" cy="36" r="8" fill="currentColor"/>
      <path d="M33 36 L35 38 L40 33" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  generate: (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
      <path d="M24 8 L38 16 L38 32 L24 40 L10 32 L10 16 Z" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <circle cx="24" cy="24" r="8" fill="currentColor" opacity="0.4"/>
      <path d="M24 8 L24 24 L38 16" fill="currentColor" opacity="0.7"/>
      <path d="M24 24 L38 32 L24 40" fill="currentColor" opacity="0.8"/>
      <path d="M24 24 L10 32 L10 16" fill="currentColor" opacity="0.9"/>
    </svg>
  )
};

interface Stage {
  id: 1 | 2 | 3 | 4;
  label: string;
  title: string;
  description: string;
  metrics: string;
  icon: keyof typeof StageIcons;
  color: string;
}

const stages: Stage[] = [
  {
    id: 1,
    label: 'PROFILE',
    title: 'Understand Your Technology',
    description: 'Extract tech stack, assess TRL, build comprehensive company profile in 5 minutes.',
    metrics: '5 min setup · 95% accuracy · TRL 1-9 scoring',
    icon: 'profile',
    color: fundaidTheme.accents.blue,
  },
  {
    id: 2,
    label: 'DISCOVER',
    title: 'Find Perfect Matches',
    description: 'AI searches thousands of grants, ranks by fit score, delivers personalized PDF report.',
    metrics: '2,438 grants scanned · 8 sources · 94 strong matches',
    icon: 'discover',
    color: fundaidTheme.accents.teal,
  },
  {
    id: 3,
    label: 'ANALYZE',
    title: 'Deep Grant Analysis',
    description: 'Parse RFPs, generate timelines, validate budgets, ensure 100% compliance.',
    metrics: '100% compliance · Auto timeline · Budget validation',
    icon: 'analyze',
    color: fundaidTheme.accents.lavender,
  },
  {
    id: 4,
    label: 'GENERATE',
    title: 'AI-Powered Writing',
    description: 'Multi-agent system writes responses, simulates assessor feedback, iterates to 7+/10 quality.',
    metrics: '7+/10 avg score · <$50 API cost · 3-assessor simulation',
    icon: 'generate',
    color: fundaidTheme.accents.coral,
  },
];

// Generate nodule data with fixed positioning for smooth animation
interface Nodule {
  id: string;
  position: number; // Percentage position on line
  label: string;
}

const generateNodules = (lineIndex: number): Nodule[] => {
  // Fixed 2 nodules per line at 33% and 66% positions for consistent, smooth motion
  return [
    {
      id: `line-${lineIndex}-nodule-0`,
      position: 33,
      label: 'NODE A',
    },
    {
      id: `line-${lineIndex}-nodule-1`,
      position: 66,
      label: 'NODE B',
    }
  ];
};

export function ProcessTimelineFixed() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [scrollProgress, setScrollProgress] = useState(0); // Track scroll progress for visuals
  const prevActiveStepRef = useRef<1 | 2 | 3 | 4>(1);
  const hasInitializedRef = useRef(false);
  const timelineLinesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Pre-generate nodules data - 5 lines with 2 nodules each
  const nodulesData = useRef<Nodule[][]>(
    Array.from({ length: 5 }, (_, i) => generateNodules(i))
  );

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // Main ScrollTrigger setup for pinning, scroll progress, and line animations
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Clear existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });

      // Initialize lines and nodules to starting state
      timelineLinesRef.current.forEach((line) => {
        if (!line) return;
        const lineBar = line.querySelector('.timeline-line-bar');
        const nodules = line.querySelectorAll('.timeline-nodule');

        // Set initial states
        gsap.set(lineBar, { width: '0%' });
        gsap.set(nodules, { opacity: 0, scale: 0 });
      });

      // Create main scroll-lock trigger with smooth snapping
      const mainTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=500%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        // Snap disabled to prevent auto-scrolling issues
        // snap: {
        //   snapTo: [0, 0.25, 0.5, 0.75, 1],
        //   duration: { min: 0.4, max: 0.8 },
        //   delay: 0.2,
        //   ease: 'power2.inOut',
        //   directional: false,
        //   inertia: false
        // },
        onUpdate: (self) => {
          const p = self.progress;

          // Update scroll progress for visuals
          setScrollProgress(p);

          // Smooth progress bar update (instant if reduced motion)
          if (progressBarRef.current) {
            if (prefersReducedMotion.current) {
              gsap.set(progressBarRef.current, { scaleX: p });
            } else {
              gsap.to(progressBarRef.current, {
                scaleX: p,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }
          }

          // Map progress to stages with adjusted thresholds for better scroll behavior
          // Stage 1 gets more range (0-0.28) to make it easier to reach when scrolling up
          let newStep: 1 | 2 | 3 | 4;
          if (p < 0.28) newStep = 1;
          else if (p < 0.52) newStep = 2;
          else if (p < 0.77) newStep = 3;
          else newStep = 4;

          if (newStep !== activeStep) {
            setActiveStep(newStep);

            // Subtle pulse on stage change (skip if reduced motion)
            if (!prefersReducedMotion.current) {
              gsap.to(content, {
                scale: 0.98,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
              });
            }
          }

          // Animate lines and nodules based on scroll progress
          timelineLinesRef.current.forEach((line, lineIndex) => {
            if (!line) return;

            const lineBar = line.querySelector('.timeline-line-bar') as HTMLElement;
            const nodules = line.querySelectorAll('.timeline-nodule');

            // Calculate staggered progress for each line
            const lineDelay = lineIndex * 0.05;
            const lineProgress = Math.max(0, Math.min(1, (p - lineDelay) / (1 - lineDelay * 4)));

            // Smooth line expansion with ScrollTrigger scrub (instant if reduced motion)
            if (prefersReducedMotion.current) {
              gsap.set(lineBar, {
                width: `${lineProgress * 100}%`,
                backgroundColor: stages[newStep - 1].color
              });
            } else {
              gsap.to(lineBar, {
                width: `${lineProgress * 100}%`,
                duration: 0,
                ease: 'none',
                overwrite: 'auto'
              });

              // Smooth color transition based on active step
              gsap.to(lineBar, {
                backgroundColor: stages[newStep - 1].color,
                duration: 0.8,
                ease: 'power2.inOut',
                overwrite: 'auto'
              });
            }

            // Animate nodules based on line progress
            nodules.forEach((nodule, nIndex) => {
              const noduleElement = nodule as HTMLElement;
              const noduleThreshold = (nIndex + 1) / (nodules.length + 1);
              const shouldShow = lineProgress >= noduleThreshold;

              // Only animate if state has changed
              const isShown = noduleElement.dataset.shown === 'true';
              if (shouldShow !== isShown) {
                noduleElement.dataset.shown = shouldShow.toString();

                if (prefersReducedMotion.current) {
                  // Instant transition if reduced motion
                  gsap.set(noduleElement, {
                    opacity: shouldShow ? 1 : 0,
                    scale: shouldShow ? 1 : 0
                  });
                } else {
                  if (shouldShow) {
                    // Fade in with subtle scale
                    gsap.to(noduleElement, {
                      opacity: 1,
                      scale: 1,
                      duration: 0.6,
                      ease: 'power2.out',
                      overwrite: 'auto'
                    });
                  } else {
                    // Fade out
                    gsap.to(noduleElement, {
                      opacity: 0,
                      scale: 0,
                      duration: 0.3,
                      ease: 'power2.in',
                      overwrite: 'auto'
                    });
                  }
                }
              }

              // Update nodule color to match current stage
              if (shouldShow) {
                const dot = noduleElement.querySelector('.nodule-dot') as HTMLElement;
                const ring = noduleElement.querySelector('.nodule-ring') as HTMLElement;
                const color = stages[newStep - 1].color;

                if (prefersReducedMotion.current) {
                  // Instant color change if reduced motion
                  if (dot) gsap.set(dot, { backgroundColor: color });
                  if (ring) gsap.set(ring, { backgroundColor: color });
                } else {
                  // Smooth color transition
                  if (dot) {
                    gsap.to(dot, {
                      backgroundColor: color,
                      duration: 0.8,
                      ease: 'power2.inOut',
                      overwrite: 'auto'
                    });
                  }
                  if (ring) {
                    gsap.to(ring, {
                      backgroundColor: color,
                      duration: 0.8,
                      ease: 'power2.inOut',
                      overwrite: 'auto'
                    });
                  }
                }
              }
            });
          });
        },
      });

      return () => {
        mainTrigger.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Smooth stage number and icon animations with enhanced Stage 1 entry
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      // Initialize on first mount with subtle entry animations
      if (!hasInitializedRef.current) {
        stages.forEach((stage) => {
          if (stage.id === 1) {
            // Stage 1: Initial entry with fade-in and upward motion
            gsap.fromTo(`.stage-number-${stage.id}`,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
            );
            gsap.fromTo(`.stage-icon-${stage.id}`,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
            );
          } else {
            gsap.set(`.stage-number-${stage.id}`, {
              opacity: 0.6,
              scale: 0.9,
            });
            gsap.set(`.stage-icon-${stage.id}`, {
              opacity: 0.6,
              y: 10,
            });
          }
        });
        hasInitializedRef.current = true;
        prevActiveStepRef.current = 1;
      } else if (prevActiveStepRef.current !== activeStep) {
        // Smooth transitions between stages (instant if reduced motion)
        const prevStep = prevActiveStepRef.current;

        if (prefersReducedMotion.current) {
          // Instant transitions if reduced motion
          gsap.set(`.stage-number-${prevStep}`, { opacity: 0.6, scale: 0.9 });
          gsap.set(`.stage-icon-${prevStep}`, { opacity: 0.6, y: 10 });
          gsap.set(`.stage-number-${activeStep}`, { opacity: 1, scale: 1 });
          gsap.set(`.stage-icon-${activeStep}`, { opacity: 1, y: 0 });
        } else {
          // Fade out previous stage
          gsap.to(`.stage-number-${prevStep}`, {
            opacity: 0.6,
            scale: 0.9,
            duration: 0.8,
            ease: 'power3.out',
          });

          gsap.to(`.stage-icon-${prevStep}`, {
            opacity: 0.6,
            y: 10,
            duration: 0.8,
            ease: 'power3.out',
          });

          // Fade in current stage
          gsap.to(`.stage-number-${activeStep}`, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
          });

          gsap.to(`.stage-icon-${activeStep}`, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        }

        prevActiveStepRef.current = activeStep;
      }
    }, contentRef);

    return () => ctx.revert();
  }, [activeStep]);

  // Subtle entry animations for all Stages content and right panel
  useLayoutEffect(() => {
    if (!contentRef.current || prefersReducedMotion.current) return;

    const ctx = gsap.context(() => {
      if (activeStep === 1) {
        // Animate Stage 1 middle column content
        gsap.fromTo('.stage-content-1',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.4 }
        );

        // Animate Stage 1 right panel with scale-in and glow pulse
        gsap.fromTo('.stage-1-panel',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.6,
            onComplete: () => {
              // Subtle glow pulse after entry
              gsap.to('.stage-1-panel', {
                boxShadow: '0 0 40px rgba(57, 242, 195, 0.3), inset 0 1px 1px rgba(255,255,255,0.05), 0 24px 60px rgba(0,0,0,0.65)',
                duration: 2,
                yoyo: true,
                repeat: 1,
                ease: 'sine.inOut'
              });
            }
          }
        );
      } else if (activeStep === 2) {
        // Animate Stage 2 middle column content
        gsap.fromTo('.stage-content-2',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.4 }
        );

        // Animate Stage 2 right panel with scale-in and glow pulse
        gsap.fromTo('.stage-2-panel',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.6,
            onComplete: () => {
              // Subtle teal glow pulse after entry
              gsap.to('.stage-2-panel', {
                boxShadow: '0 0 40px rgba(20, 216, 210, 0.3), inset 0 1px 1px rgba(255,255,255,0.05), 0 24px 60px rgba(0,0,0,0.65)',
                duration: 2,
                yoyo: true,
                repeat: 1,
                ease: 'sine.inOut'
              });
            }
          }
        );
      } else if (activeStep === 3) {
        // Animate Stage 3 middle column content
        gsap.fromTo('.stage-content-3',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.4 }
        );

        // Animate Stage 3 right panel with scale-in and purple glow pulse
        gsap.fromTo('.stage-3-panel',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.6,
            onComplete: () => {
              // Subtle purple glow pulse after entry
              gsap.to('.stage-3-panel', {
                boxShadow: '0 0 40px rgba(168, 140, 255, 0.3), inset 0 1px 1px rgba(255,255,255,0.05), 0 24px 60px rgba(0,0,0,0.65)',
                duration: 2,
                yoyo: true,
                repeat: 1,
                ease: 'sine.inOut'
              });
            }
          }
        );
      } else if (activeStep === 4) {
        // Animate Stage 4 middle column content
        gsap.fromTo('.stage-content-4',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.4 }
        );

        // Animate Stage 4 right panel with scale-in and coral glow pulse
        gsap.fromTo('.stage-4-panel',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.6,
            onComplete: () => {
              // Subtle coral glow pulse after entry
              gsap.to('.stage-4-panel', {
                boxShadow: '0 0 40px rgba(255, 109, 109, 0.3), inset 0 1px 1px rgba(255,255,255,0.05), 0 24px 60px rgba(0,0,0,0.65)',
                duration: 2,
                yoyo: true,
                repeat: 1,
                ease: 'sine.inOut'
              });
            }
          }
        );
      }
    }, contentRef);

    return () => ctx.revert();
  }, [activeStep]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-[#0A0E27] via-[#151B3D] to-[#0A0E27]"
    >
      {/* Cosmic starfield background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* HUD particles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#30E3B7' : i % 3 === 1 ? '#A26CF7' : '#FFFFFF',
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Progress Bar - removed white background to prevent white space creep */}
      <div className="absolute top-0 left-0 right-0 h-1 z-50" style={{ background: 'rgba(229, 231, 235, 0.2)' }}>
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
        />
      </div>

      {/* Main Content Container */}
      <div
        ref={contentRef}
        className="h-full flex items-center justify-center"
      >
        <div className="w-full h-full px-8 md:px-12">
          {/* Desktop Layout: 3-column grid */}
          <div className="hidden lg:grid grid-cols-[25%_35%_40%] gap-6 items-center h-full">

            {/* LEFT: Stage indicators */}
            <div className="space-y-6">
              {stages.map((stage) => {
                const isActive = activeStep === stage.id;
                const Icon = StageIcons[stage.icon];

                return (
                  <div
                    key={stage.id}
                    className={cn(
                      'relative flex items-center gap-3 transition-all duration-500',
                      isActive ? 'opacity-100' : 'opacity-60'
                    )}
                  >
                    {/* Stage Icon */}
                    <div
                      className={`stage-icon-${stage.id}`}
                      style={{
                        color: isActive && stage.id === 1
                          ? '#20D8D2'
                          : isActive && stage.id === 2
                          ? '#20D8D2'
                          : isActive && stage.id === 3
                          ? '#A88CFF'
                          : isActive && stage.id === 4
                          ? '#FF6D6D'
                          : isActive ? stage.color : '#e5e7eb',
                        filter: isActive && stage.id === 1
                          ? 'drop-shadow(0 0 16px rgba(20, 216, 210, 0.8)) drop-shadow(0 0 32px rgba(20, 216, 210, 0.4))'
                          : isActive && stage.id === 2
                          ? 'drop-shadow(0 0 16px rgba(20, 216, 210, 0.8)) drop-shadow(0 0 32px rgba(20, 216, 210, 0.4))'
                          : isActive && stage.id === 3
                          ? 'drop-shadow(0 0 16px rgba(168, 140, 255, 0.8)) drop-shadow(0 0 32px rgba(168, 140, 255, 0.4))'
                          : isActive && stage.id === 4
                          ? 'drop-shadow(0 0 16px rgba(255, 109, 109, 0.8)) drop-shadow(0 0 32px rgba(255, 109, 109, 0.4))'
                          : isActive ? `drop-shadow(0 0 12px ${stage.color}40)` : 'none'
                      }}
                    >
                      {Icon}
                    </div>

                    {/* Stage Number & Label */}
                    <div>
                      <div
                        className={cn(
                          `stage-number-${stage.id}`,
                          'text-[120px] font-black leading-none'
                        )}
                        style={{
                          color: isActive && stage.id === 1
                            ? '#20D8D2'
                            : isActive && stage.id === 2
                            ? '#20D8D2'
                            : isActive && stage.id === 3
                            ? '#A88CFF'
                            : isActive && stage.id === 4
                            ? '#FF6D6D'
                            : isActive ? stage.color : '#e5e7eb',
                          textShadow: isActive && stage.id === 1
                            ? '0 0 30px rgba(32, 216, 210, 0.8), 0 0 60px rgba(57, 242, 195, 0.4)'
                            : isActive && stage.id === 2
                            ? '0 0 30px rgba(20, 216, 210, 0.8), 0 0 60px rgba(57, 242, 195, 0.4)'
                            : isActive && stage.id === 3
                            ? '0 0 30px rgba(168, 140, 255, 0.8), 0 0 60px rgba(196, 164, 255, 0.4)'
                            : isActive && stage.id === 4
                            ? '0 0 30px rgba(255, 109, 109, 0.8), 0 0 60px rgba(255, 143, 143, 0.4)'
                            : isActive ? `0 0 20px ${stage.color}40` : '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      >
                        {stage.id}
                      </div>
                      <div
                        className="text-sm uppercase tracking-widest mt-2"
                        style={{
                          color: isActive && stage.id === 1
                            ? '#39F2C3'
                            : isActive && stage.id === 2
                            ? '#20D8D2'
                            : isActive && stage.id === 3
                            ? '#A88CFF'
                            : isActive && stage.id === 4
                            ? '#FF6D6D'
                            : isActive ? stage.color : '#9ca3af'
                        }}
                      >
                        {stage.label}
                      </div>
                    </div>

                    {/* Active indicator line with enhanced glow for all Stages */}
                    {isActive && (
                      <div
                        className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                        style={{
                          background: stage.id === 1
                            ? 'linear-gradient(to bottom, #39F2C3, #20D8D2)'
                            : stage.id === 2
                            ? 'linear-gradient(to bottom, #20D8D2, #39F2C3)'
                            : stage.id === 3
                            ? 'linear-gradient(to bottom, #A88CFF, #C4A4FF)'
                            : stage.id === 4
                            ? 'linear-gradient(to bottom, #FF6D6D, #FF8F8F)'
                            : stage.color,
                          boxShadow: stage.id === 1
                            ? '0 0 20px rgba(32, 216, 210, 0.8), 0 0 40px rgba(57, 242, 195, 0.4)'
                            : stage.id === 2
                            ? '0 0 20px rgba(20, 216, 210, 0.8), 0 0 40px rgba(20, 216, 210, 0.4)'
                            : stage.id === 3
                            ? '0 0 20px rgba(168, 140, 255, 0.8), 0 0 40px rgba(196, 164, 255, 0.4)'
                            : stage.id === 4
                            ? '0 0 20px rgba(255, 109, 109, 0.8), 0 0 40px rgba(255, 143, 143, 0.4)'
                            : `0 0 12px ${stage.color}60`
                        }}
                      />
                    )}
                  </div>
                );
              })}

              {/* Mini progress dots */}
              <div className="flex gap-2 pt-4">
                {stages.map((stage) => (
                  <div
                    key={stage.id}
                    className={cn(
                      'h-2 rounded-full transition-all duration-500',
                      activeStep >= stage.id
                        ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-600'
                        : 'w-2 bg-gray-300'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* MIDDLE: Active stage content with smooth expanding lines */}
            <div className="relative">
              {stages.map((stage) => {
                const isActive = activeStep === stage.id;

                return (
                  <div
                    key={stage.id}
                    className={cn(
                      'transition-all duration-600 relative',
                      stage.id === 1 ? 'stage-content-1' : stage.id === 2 ? 'stage-content-2' : stage.id === 3 ? 'stage-content-3' : stage.id === 4 ? 'stage-content-4' : '',
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                    )}
                  >
                    {/* Title with premium gradient text on key word */}
                    <h3 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                      {stage.id === 1 ? (
                        <>
                          <span className="text-white">Understand Your </span>
                          <span className="bg-gradient-to-r from-[#39F2C3] via-[#20D8D2] to-[#A88CFF] bg-clip-text text-transparent">
                            Technology
                          </span>
                        </>
                      ) : stage.id === 2 ? (
                        <>
                          <span className="text-white">Find </span>
                          <span className="bg-gradient-to-r from-[#20D8D2] via-[#39F2C3] to-[#A88CFF] bg-clip-text text-transparent">
                            Perfect Matches
                          </span>
                        </>
                      ) : stage.id === 3 ? (
                        <>
                          <span className="text-white">Deep </span>
                          <span className="bg-gradient-to-r from-[#A88CFF] via-[#C4A4FF] to-[#FF6D6D] bg-clip-text text-transparent">
                            Grant Analysis
                          </span>
                        </>
                      ) : stage.id === 4 ? (
                        <>
                          <span className="bg-gradient-to-r from-[#FF6D6D] via-[#FF8F8F] to-[#A88CFF] bg-clip-text text-transparent">
                            AI-Powered Writing
                          </span>
                        </>
                      ) : (
                        <span className="bg-gradient-to-r from-[#30E3B7] to-[#A26CF7] bg-clip-text text-transparent">
                          {stage.title}
                        </span>
                      )}
                    </h3>

                    {/* Description - Softer off-white with extra line-height and airy max-width */}
                    <p className="text-sm md:text-base text-[#F5F6FF]/80 leading-[1.8] max-w-xl mb-8">
                      {stage.description}
                    </p>

                    {/* Cosmic Glassmorphic Metrics Card - Stages 1 & 2 Enhanced */}
                    {stage.id === 1 ? (
                      <div className="relative mb-8 group">
                        {/* Outer gradient border container */}
                        <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-[#39F2C3] via-[#20D8D2] to-[#A88CFF] shadow-[0_0_40px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:shadow-[0_0_60px_rgba(32,216,210,0.5)]">
                          {/* Inner dark glassmorphism card */}
                          <div className="relative bg-[#0B1020]/80 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 group-hover:bg-[#0B1020]/90">
                            {/* Stage pill with glowing dot */}
                            <div className="absolute -top-3 left-6 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#20D8D2]" style={{
                              boxShadow: '0 0 20px rgba(32, 216, 210, 0.6), inset 0 1px 1px rgba(255,255,255,0.2)'
                            }}>
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{
                                boxShadow: '0 0 8px rgba(255,255,255,0.8)'
                              }} />
                              STAGE {stage.id}
                            </div>

                            {/* Metrics text with tech font and letter spacing */}
                            <div className="font-mono text-sm md:text-base font-medium text-white tracking-wide mt-2">
                              {stage.metrics}
                            </div>

                            {/* Cyan progress beam */}
                            <div className="mt-4 h-[3px] bg-slate-200/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#39F2C3] to-[#20D8D2]"
                                style={{
                                  width: '75%',
                                  boxShadow: '0 0 12px rgba(57, 242, 195, 0.6)'
                                }}
                              />
                            </div>

                            {/* Subtle cyan outer glow */}
                            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                              boxShadow: '0 0 24px rgba(57, 242, 195, 0.15)'
                            }} />
                          </div>
                        </div>
                      </div>
                    ) : stage.id === 2 ? (
                      <div className="relative mb-8 group">
                        {/* Outer gradient border container - Teal/Cyan gradient for Stage 2 */}
                        <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-[#20D8D2] via-[#39F2C3] to-[#A88CFF] shadow-[0_0_40px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:shadow-[0_0_60px_rgba(20,216,210,0.5)]">
                          {/* Inner dark glassmorphism card */}
                          <div className="relative bg-[#0B1020]/80 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 group-hover:bg-[#0B1020]/90">
                            {/* Stage pill with glowing dot - Teal for Stage 2 */}
                            <div className="absolute -top-3 left-6 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#20D8D2]" style={{
                              boxShadow: '0 0 20px rgba(20, 216, 210, 0.6), inset 0 1px 1px rgba(255,255,255,0.2)'
                            }}>
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{
                                boxShadow: '0 0 8px rgba(255,255,255,0.8)'
                              }} />
                              STAGE {stage.id}
                            </div>

                            {/* Metrics text with tech font and letter spacing */}
                            <div className="font-mono text-sm md:text-base font-medium text-white tracking-wide mt-2">
                              {stage.metrics}
                            </div>

                            {/* Teal progress beam for Stage 2 */}
                            <div className="mt-4 h-[3px] bg-slate-200/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#20D8D2] to-[#39F2C3]"
                                style={{
                                  width: '85%',
                                  boxShadow: '0 0 12px rgba(20, 216, 210, 0.6)'
                                }}
                              />
                            </div>

                            {/* Subtle teal outer glow */}
                            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                              boxShadow: '0 0 24px rgba(20, 216, 210, 0.15)'
                            }} />
                          </div>
                        </div>
                      </div>
                    ) : stage.id === 3 ? (
                      <div className="relative mb-8 group">
                        {/* Outer gradient border container - Purple/Lavender gradient for Stage 3 */}
                        <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-[#A88CFF] via-[#C4A4FF] to-[#FF6D6D] shadow-[0_0_40px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:shadow-[0_0_60px_rgba(168,140,255,0.5)]">
                          {/* Inner dark glassmorphism card */}
                          <div className="relative bg-[#0B1020]/80 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 group-hover:bg-[#0B1020]/90">
                            {/* Stage pill with glowing dot - Purple for Stage 3 */}
                            <div className="absolute -top-3 left-6 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#A88CFF]" style={{
                              boxShadow: '0 0 20px rgba(168, 140, 255, 0.6), inset 0 1px 1px rgba(255,255,255,0.2)'
                            }}>
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{
                                boxShadow: '0 0 8px rgba(255,255,255,0.8)'
                              }} />
                              STAGE {stage.id}
                            </div>

                            {/* Metrics text with tech font and letter spacing */}
                            <div className="font-mono text-sm md:text-base font-medium text-white tracking-wide mt-2">
                              {stage.metrics}
                            </div>

                            {/* Purple progress beam for Stage 3 */}
                            <div className="mt-4 h-[3px] bg-slate-200/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#A88CFF] to-[#C4A4FF]"
                                style={{
                                  width: '90%',
                                  boxShadow: '0 0 12px rgba(168, 140, 255, 0.6)'
                                }}
                              />
                            </div>

                            {/* Subtle purple outer glow */}
                            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                              boxShadow: '0 0 24px rgba(168, 140, 255, 0.15)'
                            }} />
                          </div>
                        </div>
                      </div>
                    ) : stage.id === 4 ? (
                      <div className="relative mb-8 group">
                        {/* Outer gradient border container - Coral gradient for Stage 4 */}
                        <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-[#FF6D6D] via-[#FF8F8F] to-[#A88CFF] shadow-[0_0_40px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:shadow-[0_0_60px_rgba(255,109,109,0.5)]">
                          {/* Inner dark glassmorphism card */}
                          <div className="relative bg-[#0B1020]/80 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 group-hover:bg-[#0B1020]/90">
                            {/* Stage pill with glowing dot - Coral for Stage 4 */}
                            <div className="absolute -top-3 left-6 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#FF6D6D]" style={{
                              boxShadow: '0 0 20px rgba(255, 109, 109, 0.6), inset 0 1px 1px rgba(255,255,255,0.2)'
                            }}>
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{
                                boxShadow: '0 0 8px rgba(255,255,255,0.8)'
                              }} />
                              STAGE {stage.id}
                            </div>

                            {/* Metrics text with tech font and letter spacing */}
                            <div className="font-mono text-sm md:text-base font-medium text-white tracking-wide mt-2">
                              {stage.metrics}
                            </div>

                            {/* Coral progress beam for Stage 4 */}
                            <div className="mt-4 h-[3px] bg-slate-200/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#FF6D6D] to-[#FF8F8F]"
                                style={{
                                  width: '95%',
                                  boxShadow: '0 0 12px rgba(255, 109, 109, 0.6)'
                                }}
                              />
                            </div>

                            {/* Subtle coral outer glow */}
                            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                              boxShadow: '0 0 24px rgba(255, 109, 109, 0.15)'
                            }} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Minimal fallback for any other stages */
                      <div className="relative mb-8">
                        <div className="relative p-8 rounded-2xl backdrop-blur-xl border shadow-2xl bg-[#0B1020]/80">
                          <div className="text-xl font-mono font-bold text-white tracking-tight">
                            {stage.metrics}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Cosmic Horizontal Data Rails with Glowing Nodes */}
              <div className="space-y-3 mt-4">
                {nodulesData.current.map((lineNodules, lineIndex) => (
                  <div
                    key={`timeline-line-${lineIndex}`}
                    ref={(el) => (timelineLinesRef.current[lineIndex] = el)}
                    className="relative h-[3px]"
                  >
                    {/* Base track - faint light rail */}
                    <div className="absolute inset-0 bg-slate-200/10 rounded-full overflow-hidden" />

                    {/* Smooth expanding line with cosmic gradients */}
                    <div
                      className="timeline-line-bar absolute left-0 top-0 h-full rounded-full"
                      style={{
                        width: '0%',
                        background: activeStep === 1
                          ? 'linear-gradient(to right, #39F2C3, #20D8D2)'
                          : activeStep === 2
                          ? 'linear-gradient(to right, #20D8D2, #39F2C3)'
                          : activeStep === 3
                          ? 'linear-gradient(to right, #A88CFF, #C4A4FF)'
                          : activeStep === 4
                          ? 'linear-gradient(to right, #FF6D6D, #FF8F8F)'
                          : stages[activeStep - 1].color,
                        boxShadow: activeStep === 1
                          ? '0 0 12px rgba(57, 242, 195, 0.6), 0 2px 4px rgba(57, 242, 195, 0.4)'
                          : activeStep === 2
                          ? '0 0 12px rgba(20, 216, 210, 0.6), 0 2px 4px rgba(20, 216, 210, 0.4)'
                          : activeStep === 3
                          ? '0 0 12px rgba(168, 140, 255, 0.6), 0 2px 4px rgba(168, 140, 255, 0.4)'
                          : activeStep === 4
                          ? '0 0 12px rgba(255, 109, 109, 0.6), 0 2px 4px rgba(255, 109, 109, 0.4)'
                          : `0 0 12px ${stages[activeStep - 1].color}40`,
                      }}
                    />

                    {/* Coordinated nodules with enhanced glow */}
                    {lineNodules.map((nodule) => (
                      <div
                        key={nodule.id}
                        className="timeline-nodule absolute top-1/2 -translate-y-1/2"
                        style={{
                          left: `${nodule.position}%`,
                          opacity: 0,
                          transform: 'translateY(-50%) translateX(-50%) scale(0)',
                        }}
                        data-shown="false"
                      >
                        {/* Nodule dot with enhanced cosmic glow */}
                        <div className="relative">
                          <div
                            className="nodule-dot w-3 h-3 rounded-full border-2 border-white relative z-10"
                            style={{
                              backgroundColor: activeStep === 1
                                ? '#20D8D2'
                                : activeStep === 2
                                ? '#20D8D2'
                                : activeStep === 3
                                ? '#A88CFF'
                                : activeStep === 4
                                ? '#FF6D6D'
                                : stages[activeStep - 1].color,
                              boxShadow: activeStep === 1
                                ? '0 0 20px rgba(32, 216, 210, 0.9), 0 0 40px rgba(32, 216, 210, 0.4)'
                                : activeStep === 2
                                ? '0 0 20px rgba(20, 216, 210, 0.9), 0 0 40px rgba(20, 216, 210, 0.4)'
                                : activeStep === 3
                                ? '0 0 20px rgba(168, 140, 255, 0.9), 0 0 40px rgba(168, 140, 255, 0.4)'
                                : activeStep === 4
                                ? '0 0 20px rgba(255, 109, 109, 0.9), 0 0 40px rgba(255, 109, 109, 0.4)'
                                : `0 0 20px ${stages[activeStep - 1].color}80`,
                            }}
                          />
                          {/* Enhanced outer glow ring */}
                          <div
                            className="nodule-ring absolute inset-0 rounded-full blur-sm"
                            style={{
                              backgroundColor: activeStep === 1
                                ? '#20D8D2'
                                : activeStep === 2
                                ? '#20D8D2'
                                : activeStep === 3
                                ? '#A88CFF'
                                : activeStep === 4
                                ? '#FF6D6D'
                                : stages[activeStep - 1].color,
                              opacity: 0.4,
                              transform: 'scale(2)',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: 3D Visualization or Stage Visuals - Glassmorphism Panel */}
            <div className="relative h-full flex items-center">
              {/* Conditional rendering based on active stage */}
              {activeStep === 1 ? (
                // PROFILE stage - Cosmic Company Profile Panel
                <div className="stage-1-panel w-full h-[750px] rounded-[32px] bg-[#050816]/80 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_24px_60px_rgba(0,0,0,0.65)] p-6 overflow-hidden relative transition-all duration-500 hover:border-[#20D8D2]/20 hover:shadow-[0_0_30px_rgba(32,216,210,0.2),inset_0_1px_1px_rgba(255,255,255,0.05),0_24px_60px_rgba(0,0,0,0.65)]">
                  {/* Hexagonal pattern overlay */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="hexagons" x="0" y="0" width="50" height="43.4" patternUnits="userSpaceOnUse">
                          <polygon points="25,0 50,14.43 50,28.87 25,43.3 0,28.87 0,14.43" fill="none" stroke="rgba(57, 242, 195, 0.3)" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#hexagons)" />
                    </svg>
                  </div>

                  {/* Inner HUD particles inside the card */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-[1px] h-[1px] rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        backgroundColor: i % 2 === 0 ? '#39F2C3' : '#A88CFF',
                        opacity: Math.random() * 0.4 + 0.2,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${Math.random() * 2 + 2}s`,
                      }}
                    />
                  ))}

                  {/* Inner recessed display */}
                  <div className="relative h-full w-full rounded-2xl bg-[#050816]/60 border border-white/5 overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">
                    <ProfileAgentBlueprint animate={true} />
                  </div>

                  {/* HUD label in top-right corner */}
                  <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full border text-xs font-medium tracking-[0.2em] uppercase" style={{
                    background: 'linear-gradient(135deg, rgba(57, 242, 195, 0.1), rgba(168, 140, 255, 0.1))',
                    borderImage: 'linear-gradient(to right, #39F2C3, #A88CFF) 1',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    color: '#F5F6FF',
                    boxShadow: '0 0 20px rgba(57, 242, 195, 0.2)'
                  }}>
                    Stage 1 • Tech Profiling
                  </div>

                  {/* Stage indicator for Profile - Enhanced glassmorphism */}
                  <div className="absolute bottom-6 left-6 bg-[#0B1020]/90 backdrop-blur-md border border-[#20D8D2]/30 px-6 py-3 rounded-full shadow-lg">
                    <p className="text-sm md:text-base font-medium text-white tracking-wide">
                      <span className="uppercase text-xs text-[#20D8D2] tracking-[0.2em]">COMPANY PROFILE</span>
                    </p>
                  </div>
                </div>
              ) : activeStep === 2 ? (
                // DISCOVER stage - Cosmic Grant Matching Panel
                <div className="stage-2-panel w-full h-[750px] rounded-[32px] bg-[#050816]/80 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_24px_60px_rgba(0,0,0,0.65)] p-6 overflow-hidden relative transition-all duration-500 hover:border-[#20D8D2]/20 hover:shadow-[0_0_30px_rgba(20,216,210,0.2),inset_0_1px_1px_rgba(255,255,255,0.05),0_24px_60px_rgba(0,0,0,0.65)]">
                  {/* Grid pattern overlay for discovery theme */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid-discover" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(20, 216, 210, 0.3)" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid-discover)" />
                    </svg>
                  </div>

                  {/* Inner HUD particles - teal theme */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-[1px] h-[1px] rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        backgroundColor: i % 2 === 0 ? '#20D8D2' : '#A88CFF',
                        opacity: Math.random() * 0.4 + 0.2,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${Math.random() * 2 + 2}s`,
                      }}
                    />
                  ))}

                  {/* Inner recessed display */}
                  <div className="relative h-full w-full rounded-2xl bg-[#050816]/60 border border-white/5 overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">
                    <DiscoverAgentBlueprint animate={true} />
                  </div>

                  {/* HUD label in top-right corner */}
                  <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full border text-xs font-medium tracking-[0.2em] uppercase" style={{
                    background: 'linear-gradient(135deg, rgba(20, 216, 210, 0.1), rgba(168, 140, 255, 0.1))',
                    borderImage: 'linear-gradient(to right, #20D8D2, #A88CFF) 1',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    color: '#F5F6FF',
                    boxShadow: '0 0 20px rgba(20, 216, 210, 0.2)'
                  }}>
                    Stage 2 • Grant Matching
                  </div>

                  {/* Stage indicator for Discover - Enhanced glassmorphism */}
                  <div className="absolute bottom-6 left-6 bg-[#0B1020]/90 backdrop-blur-md border border-[#20D8D2]/30 px-6 py-3 rounded-full shadow-lg">
                    <p className="text-sm md:text-base font-medium text-white tracking-wide">
                      <span className="uppercase text-xs text-[#20D8D2] tracking-[0.2em]">DISCOVERY ENGINE</span>
                    </p>
                  </div>
                </div>
              ) : activeStep === 3 ? (
                // ANALYZE stage - Cosmic Analysis Panel
                <div className="stage-3-panel w-full h-[750px] rounded-[32px] bg-[#050816]/80 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_24px_60px_rgba(0,0,0,0.65)] p-6 overflow-hidden relative transition-all duration-500 hover:border-[#A88CFF]/20 hover:shadow-[0_0_30px_rgba(168,140,255,0.2),inset_0_1px_1px_rgba(255,255,255,0.05),0_24px_60px_rgba(0,0,0,0.65)]">
                  {/* Circuit/analysis pattern overlay */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="circuit-analyze" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                          <path d="M 0 30 L 60 30 M 30 0 L 30 60" fill="none" stroke="rgba(168, 140, 255, 0.3)" strokeWidth="0.5"/>
                          <circle cx="30" cy="30" r="2" fill="rgba(168, 140, 255, 0.5)"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#circuit-analyze)" />
                    </svg>
                  </div>

                  {/* Inner HUD particles - purple theme */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-[1px] h-[1px] rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        backgroundColor: i % 2 === 0 ? '#A88CFF' : '#C4A4FF',
                        opacity: Math.random() * 0.4 + 0.2,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${Math.random() * 2 + 2}s`,
                      }}
                    />
                  ))}

                  {/* Inner recessed display */}
                  <div className="relative h-full w-full rounded-2xl bg-[#050816]/60 border border-white/5 overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">
                    <AnalyzeAgentBlueprint animate={true} />
                  </div>

                  {/* HUD label in top-right corner */}
                  <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full border text-xs font-medium tracking-[0.2em] uppercase" style={{
                    background: 'linear-gradient(135deg, rgba(168, 140, 255, 0.1), rgba(255, 109, 109, 0.1))',
                    borderImage: 'linear-gradient(to right, #A88CFF, #FF6D6D) 1',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    color: '#F5F6FF',
                    boxShadow: '0 0 20px rgba(168, 140, 255, 0.2)'
                  }}>
                    Stage 3 • Deep Analysis
                  </div>

                  {/* Stage indicator for Analyze - Enhanced glassmorphism */}
                  <div className="absolute bottom-6 left-6 bg-[#0B1020]/90 backdrop-blur-md border border-[#A88CFF]/30 px-6 py-3 rounded-full shadow-lg">
                    <p className="text-sm md:text-base font-medium text-white tracking-wide">
                      <span className="uppercase text-xs text-[#A88CFF] tracking-[0.2em]">ANALYSIS ENGINE</span>
                    </p>
                  </div>
                </div>
              ) : (
                // GENERATE stage - Cosmic AI Writing Panel
                <div className="stage-4-panel w-full h-[750px] rounded-[32px] bg-[#050816]/80 backdrop-blur-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_24px_60px_rgba(0,0,0,0.65)] p-6 overflow-hidden relative transition-all duration-500 hover:border-[#FF6D6D]/20 hover:shadow-[0_0_30px_rgba(255,109,109,0.2),inset_0_1px_1px_rgba(255,255,255,0.05),0_24px_60px_rgba(0,0,0,0.65)]">
                  {/* Document/writing lines pattern overlay */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="lines-generate" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 10 10 L 90 10" fill="none" stroke="rgba(255, 109, 109, 0.3)" strokeWidth="0.5"/>
                          <circle cx="5" cy="10" r="1.5" fill="rgba(255, 109, 109, 0.5)"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#lines-generate)" />
                    </svg>
                  </div>

                  {/* Inner HUD particles - coral theme */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-[1px] h-[1px] rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        backgroundColor: i % 2 === 0 ? '#FF6D6D' : '#FF8F8F',
                        opacity: Math.random() * 0.4 + 0.2,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${Math.random() * 2 + 2}s`,
                      }}
                    />
                  ))}

                  {/* Inner recessed display */}
                  <div className="relative h-full w-full rounded-2xl bg-[#050816]/60 border border-white/5 overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">
                    <GenerateAgentBlueprint animate={true} />
                  </div>

                  {/* HUD label in top-right corner */}
                  <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full border text-xs font-medium tracking-[0.2em] uppercase" style={{
                    background: 'linear-gradient(135deg, rgba(255, 109, 109, 0.1), rgba(168, 140, 255, 0.1))',
                    borderImage: 'linear-gradient(to right, #FF6D6D, #A88CFF) 1',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    color: '#F5F6FF',
                    boxShadow: '0 0 20px rgba(255, 109, 109, 0.2)'
                  }}>
                    Stage 4 • AI Writing
                  </div>

                  {/* Stage indicator for Generate - Enhanced glassmorphism */}
                  <div className="absolute bottom-6 left-6 bg-[#0B1020]/90 backdrop-blur-md border border-[#FF6D6D]/30 px-6 py-3 rounded-full shadow-lg">
                    <p className="text-sm md:text-base font-medium text-white tracking-wide">
                      <span className="uppercase text-xs text-[#FF6D6D] tracking-[0.2em]">AI WRITING SYSTEM</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Status readout - always visible */}
              <div className="absolute top-4 right-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-md text-xs font-mono text-green-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span>TIMELINE: {Math.round((activeStep - 1) * 25 + 25)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Mobile stage selector */}
            <div className="flex justify-center gap-4 mb-8">
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStep(stage.id)}
                  className={cn(
                    'w-12 h-12 rounded-full font-bold transition-all',
                    activeStep === stage.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110'
                      : 'bg-gray-100 text-gray-400'
                  )}
                >
                  {stage.id}
                </button>
              ))}
            </div>

            {/* Mobile content */}
            <div className="space-y-6">
              {stages.map((stage) => {
                if (activeStep !== stage.id) return null;

                return (
                  <div key={stage.id} className="text-center">
                    <div className="flex justify-center mb-4" style={{ color: stage.color }}>
                      {StageIcons[stage.icon]}
                    </div>
                    <h3 className={cn(fundaidTheme.typography.h3, 'mb-4')}>
                      {stage.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {stage.description}
                    </p>
                    <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
                      {stage.metrics}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile canvas */}
            <div className="mt-8 aspect-video rounded-xl overflow-hidden shadow-xl">
              <ProcessTimelineCanvas activeStep={activeStep} />
            </div>
          </div>
        </div>
      </div>

      {/* Smooth scan animation keyframes */}
      <style jsx>{`
        @keyframes smoothScan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(400%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

export default ProcessTimelineFixed;