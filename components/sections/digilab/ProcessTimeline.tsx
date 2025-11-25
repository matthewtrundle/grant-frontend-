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
import { NeuralNetworkConnections } from './NeuralNetworkConnections';
import { ProcessTimelinePopups } from './ProcessTimelinePopups';

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
  icon?: React.ReactNode;  // Custom SVG icon for each stage
}

// Technical SVG Icons for each stage - blueprint aesthetic with measurement annotations
const StageIcons = {
  // Stage 1: UFO/Spacecraft blueprint
  ufo: (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Technical grid background */}
      <pattern id="grid1" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke={fundaidTheme.accents.teal} strokeWidth="0.2" opacity="0.2"/>
      </pattern>
      <rect width="90" height="90" fill="url(#grid1)" />

      {/* Main UFO structure */}
      <ellipse cx="45" cy="45" rx="30" ry="12" stroke={fundaidTheme.accents.teal} strokeWidth="1.5" fill="none" strokeDasharray="2 2" opacity="0.3"/>
      <ellipse cx="45" cy="45" rx="20" ry="8" stroke={fundaidTheme.accents.teal} strokeWidth="2" fill="none"/>
      <path d="M 25 45 Q 45 30 65 45" stroke={fundaidTheme.accents.lavender} strokeWidth="2" fill="none"/>

      {/* Measurement annotations */}
      <line x1="15" y1="60" x2="75" y2="60" stroke={fundaidTheme.text.muted} strokeWidth="0.5"/>
      <line x1="15" y1="57" x2="15" y2="63" stroke={fundaidTheme.text.muted} strokeWidth="0.5"/>
      <line x1="75" y1="57" x2="75" y2="63" stroke={fundaidTheme.text.muted} strokeWidth="0.5"/>
      <text x="45" y="68" textAnchor="middle" fontSize="8" fill={fundaidTheme.text.muted} opacity="0.6" fontFamily="monospace">60.0 mm</text>

      {/* Technical details */}
      <circle cx="35" cy="45" r="2" fill={fundaidTheme.accents.teal} opacity="0.8"/>
      <circle cx="45" cy="45" r="2" fill={fundaidTheme.accents.teal} opacity="0.8"/>
      <circle cx="55" cy="45" r="2" fill={fundaidTheme.accents.teal} opacity="0.8"/>
    </svg>
  ),

  // Stage 2: Airplane/Aviation
  airplane: (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Radar circles */}
      <circle cx="45" cy="45" r="35" stroke={fundaidTheme.accents.teal} strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4"/>
      <circle cx="45" cy="45" r="25" stroke={fundaidTheme.accents.teal} strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4"/>
      <circle cx="45" cy="45" r="15" stroke={fundaidTheme.accents.teal} strokeWidth="0.5" opacity="0.4" strokeDasharray="4 4"/>

      {/* Aircraft side profile */}
      <path d="M 20 45 L 35 42 L 50 40 L 65 42 L 70 45 L 65 48 L 50 50 L 35 48 Z"
            stroke={fundaidTheme.accents.lavender} strokeWidth="2" fill="none"/>

      {/* Wings */}
      <path d="M 40 45 L 35 30 L 45 32 L 50 45" stroke={fundaidTheme.accents.teal} strokeWidth="2" fill="none"/>
      <path d="M 40 45 L 35 60 L 45 58 L 50 45" stroke={fundaidTheme.accents.teal} strokeWidth="2" fill="none"/>

      {/* Flight path */}
      <path d="M 10 55 Q 30 40 45 45 T 80 35" stroke={fundaidTheme.accents.coral} strokeWidth="1" opacity="0.5" strokeDasharray="5 5"/>

      {/* Altitude indicator */}
      <line x1="75" y1="20" x2="75" y2="70" stroke={fundaidTheme.text.muted} strokeWidth="0.5" opacity="0.5"/>
      <text x="78" y="25" fontSize="6" fill={fundaidTheme.text.muted} opacity="0.6" fontFamily="monospace">FL350</text>
      <text x="78" y="45" fontSize="6" fill={fundaidTheme.text.muted} opacity="0.6" fontFamily="monospace">FL250</text>
      <text x="78" y="65" fontSize="6" fill={fundaidTheme.text.muted} opacity="0.6" fontFamily="monospace">FL150</text>
    </svg>
  ),

  // Stage 3: Submarine/Underwater vessel
  submarine: (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sonar waves */}
      <path d="M 20 45 Q 10 35 10 45 T 20 45" stroke={fundaidTheme.accents.teal} strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 25 45 Q 10 30 10 45 T 25 45" stroke={fundaidTheme.accents.teal} strokeWidth="1" opacity="0.4" fill="none"/>
      <path d="M 30 45 Q 10 25 10 45 T 30 45" stroke={fundaidTheme.accents.teal} strokeWidth="1" opacity="0.5" fill="none"/>

      {/* Submarine hull */}
      <ellipse cx="50" cy="45" rx="25" ry="10" stroke={fundaidTheme.accents.lavender} strokeWidth="2" fill="none"/>
      <path d="M 25 45 Q 50 35 75 45" stroke={fundaidTheme.accents.lavender} strokeWidth="2" fill="none"/>

      {/* Periscope */}
      <line x1="45" y1="35" x2="45" y2="20" stroke={fundaidTheme.accents.coral} strokeWidth="2"/>
      <rect x="42" y="18" width="6" height="4" stroke={fundaidTheme.accents.coral} strokeWidth="1.5" fill="none"/>

      {/* Depth indicators */}
      <line x1="80" y1="15" x2="80" y2="75" stroke={fundaidTheme.text.muted} strokeWidth="0.5" opacity="0.4"/>
      <text x="82" y="20" fontSize="6" fill={fundaidTheme.text.muted} opacity="0.6" fontFamily="monospace">0m</text>
      <text x="82" y="35" fontSize="6" fill={fundaidTheme.text.muted} opacity="0.6" fontFamily="monospace">-50m</text>
      <text x="82" y="50" fontSize="6" fill={fundaidTheme.text.muted} opacity="0.6" fontFamily="monospace">-100m</text>
      <text x="82" y="65" fontSize="6" fill={fundaidTheme.text.muted} opacity="0.6" fontFamily="monospace">-200m</text>

      {/* Propeller */}
      <circle cx="70" cy="45" r="4" stroke={fundaidTheme.accents.teal} strokeWidth="1" fill="none"/>
      <path d="M 66 45 L 74 45 M 70 41 L 70 49" stroke={fundaidTheme.accents.teal} strokeWidth="1"/>
    </svg>
  ),

  // Stage 4: DNA/Molecular structure
  dna: (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Double helix paths */}
      <path d="M 30 15 Q 45 25 60 15 T 60 35 Q 45 45 30 35 T 30 55 Q 45 65 60 55 T 60 75"
            stroke={fundaidTheme.accents.teal} strokeWidth="2" fill="none" opacity="0.8"/>
      <path d="M 60 15 Q 45 25 30 15 T 30 35 Q 45 45 60 35 T 60 55 Q 45 65 30 55 T 30 75"
            stroke={fundaidTheme.accents.lavender} strokeWidth="2" fill="none" opacity="0.8"/>

      {/* Molecular bonds (horizontal connectors) */}
      <line x1="30" y1="25" x2="60" y2="25" stroke={fundaidTheme.text.muted} strokeWidth="1" opacity="0.4"/>
      <line x1="30" y1="35" x2="60" y2="35" stroke={fundaidTheme.text.muted} strokeWidth="1" opacity="0.4"/>
      <line x1="30" y1="45" x2="60" y2="45" stroke={fundaidTheme.text.muted} strokeWidth="1" opacity="0.4"/>
      <line x1="30" y1="55" x2="60" y2="55" stroke={fundaidTheme.text.muted} strokeWidth="1" opacity="0.4"/>
      <line x1="30" y1="65" x2="60" y2="65" stroke={fundaidTheme.text.muted} strokeWidth="1" opacity="0.4"/>

      {/* Base pair nodes */}
      <circle cx="30" cy="25" r="3" fill={fundaidTheme.accents.coral} opacity="0.7"/>
      <circle cx="60" cy="25" r="3" fill={fundaidTheme.accents.teal} opacity="0.7"/>
      <circle cx="30" cy="45" r="3" fill={fundaidTheme.accents.teal} opacity="0.7"/>
      <circle cx="60" cy="45" r="3" fill={fundaidTheme.accents.coral} opacity="0.7"/>
      <circle cx="30" cy="65" r="3" fill={fundaidTheme.accents.coral} opacity="0.7"/>
      <circle cx="60" cy="65" r="3" fill={fundaidTheme.accents.teal} opacity="0.7"/>

      {/* Scientific annotations */}
      <text x="10" y="25" fontSize="7" fill={fundaidTheme.text.muted} opacity="0.6" fontFamily="monospace">A-T</text>
      <text x="70" y="45" fontSize="7" fill={fundaidTheme.text.muted} opacity="0.6" fontFamily="monospace">G-C</text>
      <text x="10" y="65" fontSize="7" fill={fundaidTheme.text.muted} opacity="0.6" fontFamily="monospace">T-A</text>
    </svg>
  ),
};

const stages: Stage[] = [
  {
    id: 1,
    label: 'PROFILE',
    title: 'Understand Your Technology',
    description: 'Extract tech stack, assess TRL, build comprehensive company profile in 5 minutes.',
    metrics: '5 min setup · 95% accuracy · TRL 1-9 scoring',
    icon: StageIcons.ufo,
  },
  {
    id: 2,
    label: 'DISCOVER',
    title: 'Find Perfect Matches',
    description: 'AI searches thousands of grants, ranks by fit score, delivers personalized PDF report.',
    metrics: '2,438 grants scanned · 8 sources · 94 strong matches',
    icon: StageIcons.airplane,
  },
  {
    id: 3,
    label: 'ANALYZE',
    title: 'Deep Grant Analysis',
    description: 'Parse RFPs, generate timelines, validate budgets, ensure 100% compliance.',
    metrics: '100% compliance · Auto timeline · Budget validation',
    icon: StageIcons.submarine,
  },
  {
    id: 4,
    label: 'GENERATE',
    title: 'AI-Powered Writing',
    description: 'Multi-agent system writes responses, simulates assessor feedback, iterates to 7+/10 quality.',
    metrics: '7+/10 avg score · <$50 API cost · 3-assessor simulation',
    icon: StageIcons.dna,
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

      // Animate stage icons with subtle pulse when active
      gsap.to('.stage-icon svg', {
        scale: (index, element) => {
          const parentDiv = element.closest('.stage-icon');
          const stageDiv = parentDiv?.parentElement;
          const stageId = parseInt(stageDiv?.querySelector('.stage-number')?.dataset.stageId || '1');
          return stageId === activeStep ? 1.05 : 0.95;
        },
        duration: 0.8,
        ease: 'power3.out',
      });

      // Add subtle glow animation for active icon
      const activeIcon = document.querySelector(`.stage-icon:has(~ .stage-number[data-stage-id="${activeStep}"])`);
      if (activeIcon) {
        gsap.to(activeIcon, {
          filter: 'drop-shadow(0 0 8px rgba(20, 184, 166, 0.3))',
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

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
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 lg:py-40 relative">
          {/* 3-Column Grid: Desktop - WIDER left column for BIGGER numbers */}
          <div className="hidden lg:grid grid-cols-[38%_28%_34%] gap-8 items-start relative">
            {/* LEFT COLUMN: All 4 stage numbers stacked vertically */}
            <div className="relative space-y-6">
              {/* Scroll progress indicator */}
              <div
                className="absolute left-[-30px] top-0 bottom-0 w-[2px] bg-gray-200"
                style={{ opacity: 0.15 }}
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
                      'stage-container relative transition-all duration-700',
                      isActive ? 'opacity-100 scale-[1.02]' : 'opacity-30 scale-[0.98]'
                    )}
                    data-stage-id={stage.id}
                  >
                    {/* Container box with glow effect */}
                    <div
                      className={cn(
                        'relative p-8 rounded-2xl border-2 transition-all duration-700',
                        isActive
                          ? 'border-opacity-50 shadow-2xl'
                          : 'border-opacity-20 shadow-lg'
                      )}
                      style={{
                        backgroundColor: isActive
                          ? `${fundaidTheme.backgrounds.panel}`
                          : 'rgba(255, 255, 255, 0.02)',
                        borderColor: isActive ? fundaidTheme.accents.teal : fundaidTheme.text.muted,
                        boxShadow: isActive
                          ? `0 0 60px ${fundaidTheme.accents.teal}15, ${fundaidTheme.shadows.xl}`
                          : fundaidTheme.shadows.md,
                      }}
                    >
                      {/* Subtle animated glow for active stage */}
                      {isActive && (
                        <>
                          <div
                            className="absolute inset-0 rounded-2xl animate-pulse"
                            style={{
                              background: `radial-gradient(circle at center, ${fundaidTheme.accents.teal}08 0%, transparent 60%)`,
                              pointerEvents: 'none',
                            }}
                          />
                          <div
                            className="absolute inset-0 rounded-2xl"
                            style={{
                              background: `linear-gradient(135deg, ${fundaidTheme.accents.teal}05 0%, transparent 50%, ${fundaidTheme.accents.lavender}05 100%)`,
                              pointerEvents: 'none',
                            }}
                          />
                        </>
                      )}

                      <div className="flex items-start gap-6">
                        <div className="flex-1">
                          {/* Stage Number - MUCH BIGGER with glow */}
                          <div
                            className={cn(fundaidTheme.typography.stageNumber, 'stage-number relative')}
                            data-stage-id={stage.id}
                            style={{
                              color: isActive ? fundaidTheme.accents.teal : fundaidTheme.text.main,
                              textShadow: isActive
                                ? `0 6px 30px ${fundaidTheme.accents.teal}40, 0 2px 10px ${fundaidTheme.accents.teal}20`
                                : 'none',
                              filter: isActive ? 'drop-shadow(0 0 20px rgba(20, 184, 166, 0.3))' : 'none',
                            }}
                          >
                            {stage.id}
                          </div>

                          {/* Stage Label with enhanced styling */}
                          <div
                            className={cn(fundaidTheme.typography.stageLabel, 'mt-4')}
                            style={{
                              color: isActive ? fundaidTheme.accents.teal : fundaidTheme.text.muted,
                              opacity: isActive ? 1 : 0.7,
                              letterSpacing: isActive ? '0.4em' : '0.3em',
                            }}
                          >
                            {stage.label}
                          </div>
                        </div>

                        {/* Stage Icon - positioned to the right with glow */}
                        <div
                          className={cn(
                            'stage-icon transition-all duration-700',
                            isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-50'
                          )}
                          style={{
                            filter: isActive
                              ? `drop-shadow(0 0 15px ${fundaidTheme.accents.teal}50)`
                              : 'grayscale(50%)',
                          }}
                        >
                          {stage.icon}
                        </div>
                      </div>

                      {/* Active indicator: left accent bar with glow */}
                      <div
                        className="stage-active-indicator absolute left-0 top-10 bottom-10 w-1 rounded-full transition-all duration-500"
                        data-stage-id={stage.id}
                        style={{
                          backgroundColor: fundaidTheme.accents.teal,
                          opacity: isActive ? 1 : 0,
                          boxShadow: isActive ? `0 0 20px ${fundaidTheme.accents.teal}, 0 0 40px ${fundaidTheme.accents.teal}50` : 'none',
                        }}
                      />
                    </div>
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

          {/* Neural Network Connections Layer - overlays entire grid */}
          <NeuralNetworkConnections
            activeStep={activeStep}
            scrollProgress={scrollProgress}
            containerRef={sectionRef}
            scrollTriggerRef={sectionRef}
            className="absolute inset-0 z-10"
          />

          {/* Popup Boxes Layer - overlays with insights */}
          <ProcessTimelinePopups
            scrollProgress={scrollProgress}
            containerRef={sectionRef}
            className="absolute inset-0 z-20"
          />

          {/* MOBILE: Stack vertically */}
          <div className="lg:hidden space-y-8">
            {/* Mobile: Horizontal mini-timeline of stage numbers - BIGGER */}
            <div className="flex items-center justify-around border-b pb-6"
                 style={{ borderColor: fundaidTheme.text.muted, borderOpacity: 0.2 }}>
              {stages.map((stage) => {
                const isActive = activeStep === stage.id;
                return (
                  <div
                    key={stage.id}
                    className={cn(
                      'text-center transition-all duration-500',
                      isActive ? 'opacity-100 scale-110' : 'opacity-30 scale-95'
                    )}
                  >
                    <div
                      className="text-7xl font-black"
                      style={{
                        color: isActive ? fundaidTheme.accents.teal : fundaidTheme.text.main,
                        textShadow: isActive ? `0 4px 20px ${fundaidTheme.accents.teal}30` : 'none',
                      }}
                    >
                      {stage.id}
                    </div>
                    <div
                      className={cn(fundaidTheme.typography.stageLabel, 'mt-2')}
                      style={{
                        color: isActive ? fundaidTheme.accents.teal : fundaidTheme.text.muted,
                        opacity: isActive ? 1 : 0.7,
                      }}
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
