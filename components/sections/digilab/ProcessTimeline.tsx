/**
 * ProcessTimeline - 4-stage sticky timeline with 3D visualizations
 *
 * Features:
 * - Sticky left column with StepCards
 * - Scrolling right column with 3D stage visualizations
 * - Scroll-activated step switching
 * - 400vh total scroll (100vh per stage)
 */

'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { digilibTheme } from '@/lib/digilab-theme';
import { StepCard } from '@/components/ui/StepCard';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Dynamically import R3F canvas wrapper (client-only, no SSR)
const ProcessTimelineCanvas = dynamic(
  () => import('@/components/3d/ProcessTimelineCanvas'),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-900/5 animate-pulse" /> }
);

const stages = [
  {
    id: 1 as const,
    title: 'Understand Your Technology',
    description: 'Extract your tech stack, assess TRL, and build a comprehensive company profile in minutes with AI-powered analysis.',
    metrics: [
      { label: 'Profiling Time', value: '5 min' },
      { label: 'Accuracy', value: '95%' },
    ],
  },
  {
    id: 2 as const,
    title: 'Find Perfect Matches',
    description: 'AI searches thousands of grants, ranks by fit score, and delivers a personalized PDF report with top opportunities.',
    metrics: [
      { label: 'Grants Searched', value: '1000+' },
      { label: 'Top Matches', value: '10' },
    ],
  },
  {
    id: 3 as const,
    title: 'Deep Grant Analysis',
    description: 'Parse RFPs, generate timelines, validate budgets, and ensure 100% compliance with grant requirements.',
    metrics: [
      { label: 'Compliance', value: '100%' },
      { label: 'Timeline', value: 'Auto' },
    ],
  },
  {
    id: 4 as const,
    title: 'AI-Powered Writing',
    description: 'Multi-agent system writes responses, simulates assessor feedback, and iterates to achieve 7+/10 quality scores.',
    metrics: [
      { label: 'Quality Score', value: '7+/10' },
      { label: 'API Cost', value: '<$50' },
    ],
  },
];

// Background gradient helper based on active step
const getBackgroundGradient = (step: 1 | 2 | 3 | 4) => {
  const gradients = {
    1: 'linear-gradient(135deg, rgba(8, 145, 178, 0.08) 0%, rgba(245, 241, 233, 1) 100%)',    // Cyan tint
    2: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(245, 241, 233, 1) 100%)',   // Violet tint
    3: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(245, 241, 233, 1) 100%)',   // Orange tint
    4: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 241, 233, 1) 100%)',   // Amber tint
  };
  return gradients[step];
};

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Create scroll triggers for each stage (400vh = 100vh per stage)
      stages.forEach((stage, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: `top+${i * 100}vh top`,
          end: `top+${(i + 1) * 100}vh top`,
          onEnter: () => setActiveStep(stage.id),
          onEnterBack: () => setActiveStep(stage.id),
          // markers: true, // Uncomment for debugging
        });
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Animate background when activeStep changes
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.to(section, {
        background: getBackgroundGradient(activeStep),
        duration: 0.6,
        ease: 'power2.out',
      });
    },
    { scope: sectionRef, dependencies: [activeStep] }
  );

  return (
    <section
      ref={sectionRef}
      className={cn('relative min-h-[400vh]')}
      style={{ background: getBackgroundGradient(1) }} // Initial gradient
    >
      <div className="sticky top-0 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12">
        {/* Left Column: Sticky StepCards */}
        <div className="space-y-8 flex flex-col justify-center">
          {stages.map((stage) => (
            <StepCard
              key={stage.id}
              stepNumber={stage.id}
              title={stage.title}
              description={stage.description}
              metrics={stage.metrics}
              isActive={activeStep === stage.id}
            />
          ))}
        </div>

        {/* Right Column: 3D Visualizations */}
        <div className="relative h-[600px] rounded-2xl overflow-hidden bg-slate-900/5">
          <ProcessTimelineCanvas activeStep={activeStep} />

          {/* Stage label overlay */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <p className="text-sm font-medium" style={{ color: digilibTheme.text.lightBg }}>
              Stage {activeStep}: {stages[activeStep - 1].title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
