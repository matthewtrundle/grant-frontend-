/**
 * ProcessTimelineFixed - 4-stage process with scroll-lock mechanism
 *
 * Key Improvements:
 * - Pinned section with snap points at each stage
 * - No dead scroll space
 * - Smooth transitions between stages
 * - Clear visual feedback for active stage
 * - White background instead of beige
 */

'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme-updated';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

// Animated SVG Icons for each stage
const StageIcons = {
  profile: (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
      <path d="M24 4 L24 44 M4 24 L44 24" stroke="currentColor" strokeWidth="1" opacity="0.1"/>
      <circle cx="24" cy="18" r="6" fill="currentColor" opacity="0.8"/>
      <path d="M12 38 Q24 28 36 38" fill="currentColor" opacity="0.6"/>
    </svg>
  ),
  discover: (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M26 26 L38 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.8"/>
    </svg>
  ),
  analyze: (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
      <rect x="12" y="16" width="24" height="2" fill="currentColor" opacity="0.6"/>
      <rect x="12" y="22" width="18" height="2" fill="currentColor" opacity="0.5"/>
      <rect x="12" y="28" width="20" height="2" fill="currentColor" opacity="0.4"/>
      <circle cx="36" cy="36" r="8" fill="currentColor" opacity="0.8"/>
      <path d="M33 36 L35 38 L40 33" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  generate: (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
      <path d="M24 8 L38 16 L38 32 L24 40 L10 32 L10 16 Z" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
      <circle cx="24" cy="24" r="8" fill="currentColor" opacity="0.3"/>
      <path d="M24 8 L24 24 L38 16" fill="currentColor" opacity="0.6"/>
      <path d="M24 24 L38 32 L24 40" fill="currentColor" opacity="0.7"/>
      <path d="M24 24 L10 32 L10 16" fill="currentColor" opacity="0.8"/>
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

export function ProcessTimelineFixed() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      // Clear existing ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });

      // Create main scroll-lock trigger with pinning
      const mainTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=300%', // 4 stages, but less scroll distance
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        snap: {
          snapTo: [0, 0.33, 0.66, 1], // Snap to each stage
          duration: { min: 0.3, max: 0.6 },
          delay: 0,
          ease: 'power2.inOut'
        },
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);

          // Map progress to stages with clear boundaries
          let newStep: 1 | 2 | 3 | 4;
          if (p < 0.25) newStep = 1;
          else if (p < 0.5) newStep = 2;
          else if (p < 0.75) newStep = 3;
          else newStep = 4;

          if (newStep !== activeStep) {
            setActiveStep(newStep);

            // Add haptic-like visual feedback on stage change
            gsap.to(content, {
              scale: 0.98,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut'
            });
          }
        },
        // markers: true, // Uncomment for debugging
      });

      // Progress bar animation
      gsap.to('.progress-bar-fill', {
        scaleX: progress,
        duration: 0.3,
        ease: 'none',
        transformOrigin: 'left center',
      });

      // Stage number animations
      stages.forEach((stage) => {
        const isActive = stage.id === activeStep;

        gsap.to(`.stage-number-${stage.id}`, {
          opacity: isActive ? 1 : 0.2,
          scale: isActive ? 1 : 0.9,
          duration: 0.6,
          ease: 'power3.out',
        });

        gsap.to(`.stage-icon-${stage.id}`, {
          opacity: isActive ? 1 : 0.3,
          y: isActive ? 0 : 10,
          duration: 0.6,
          ease: 'power3.out',
        });
      });

      // Cleanup
      return () => {
        mainTrigger.kill();
      };
    },
    { scope: sectionRef, dependencies: [activeStep, progress] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: '100vh' }} // Single viewport height when pinned
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <div
          className="progress-bar-fill h-full bg-gradient-to-r from-blue-500 to-purple-600"
          style={{ transform: `scaleX(${progress})`, transformOrigin: 'left center' }}
        />
      </div>

      {/* Main Content Container */}
      <div
        ref={contentRef}
        className="h-full flex items-center justify-center"
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          {/* Desktop Layout: 3-column grid */}
          <div className="hidden lg:grid grid-cols-[20%_38%_42%] gap-8 items-center">

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
                      isActive ? 'opacity-100' : 'opacity-30'
                    )}
                  >
                    {/* Stage Icon */}
                    <div
                      className={`stage-icon-${stage.id} text-${isActive ? stage.color : 'gray-400'}`}
                      style={{ color: isActive ? stage.color : undefined }}
                    >
                      {Icon}
                    </div>

                    {/* Stage Number & Label */}
                    <div>
                      <div
                        className={cn(
                          `stage-number-${stage.id}`,
                          'text-4xl font-black',
                          fundaidTheme.text.main
                        )}
                      >
                        {stage.id}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-500">
                        {stage.label}
                      </div>
                    </div>

                    {/* Active indicator line */}
                    {isActive && (
                      <div
                        className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                        style={{ backgroundColor: stage.color }}
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

            {/* MIDDLE: Active stage content */}
            <div className="relative">
              {stages.map((stage) => {
                const isActive = activeStep === stage.id;

                return (
                  <div
                    key={stage.id}
                    className={cn(
                      'transition-all duration-600',
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                    )}
                  >
                    {/* Title with accent color */}
                    <h3
                      className={cn(fundaidTheme.typography.h3, 'mb-4')}
                      style={{ color: fundaidTheme.text.main }}
                    >
                      <span
                        className="inline-block w-1 h-8 mr-3 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      {stage.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(fundaidTheme.typography.bodyLarge, 'mb-6 text-gray-600')}
                    >
                      {stage.description}
                    </p>

                    {/* Metrics with better styling */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                      <div className={cn(fundaidTheme.typography.metric, 'text-gray-700')}>
                        {stage.metrics}
                      </div>
                    </div>

                    {/* CTA for active stage */}
                    {isActive && (
                      <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
                        Start {stage.label.toLowerCase()}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT: R3F Visualization */}
            <div className="relative">
              <div
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: fundaidTheme.backgrounds.canvas }}
              >
                <ProcessTimelineCanvas activeStep={activeStep} />
              </div>

              {/* Stage indicator overlay */}
              <div className="absolute bottom-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                <p className="text-sm font-medium">
                  Stage {activeStep} of 4: {stages[activeStep - 1].label}
                </p>
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
    </section>
  );
}