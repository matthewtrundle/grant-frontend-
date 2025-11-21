/**
 * ProcessTimelineRefined - Truly scroll-driven timeline with evolving 3D visuals
 *
 * Key improvements:
 * - Sticky left column with StepCards
 * - Scrollable right column with R3F canvas
 * - ScrollTrigger detects current step
 * - 3D visuals evolve based on step:
 *   * Step 1: Particles cluster into tight ball
 *   * Step 2: Particles drift apart and connect with lines
 *   * Step 3: Lines converge into funnel shape
 *   * Step 4: Network of connected nodes
 * - Vertical connecting lines grow/shrink between cards
 * - GSAP animates positions/opacity
 */

'use client';

import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { cn } from '@/lib/utils';
import { digilibTheme } from '@/lib/digilab-theme';
import { StepCardRefined } from '@/components/ui/StepCardRefined';
import { EvolvingVisual3D } from '@/components/3d/EvolvingVisual3D';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stages = [
  {
    id: 1 as const,
    title: 'Understand Your Technology',
    description: 'AI extracts your tech stack, assesses TRL, and builds a comprehensive company profile in 5 minutes.',
    metrics: [
      { label: 'Profiling Time', value: '5 min' },
      { label: 'Accuracy', value: '95%' },
    ],
  },
  {
    id: 2 as const,
    title: 'Find Perfect Matches',
    description: 'Search thousands of grants, rank by fit score, and deliver a PDF report with your top 10 opportunities.',
    metrics: [
      { label: 'Grants Searched', value: '1000+' },
      { label: 'Top Matches', value: '10' },
    ],
  },
  {
    id: 3 as const,
    title: 'Deep Grant Analysis',
    description: 'Parse RFPs, generate timelines, validate budgets, and ensure 100% compliance with requirements.',
    metrics: [
      { label: 'Compliance', value: '100%' },
      { label: 'Timeline', value: 'Auto' },
    ],
  },
  {
    id: 4 as const,
    title: 'AI-Powered Writing',
    description: 'Multi-agent system writes responses, simulates assessor feedback, and iterates to 7+/10 quality.',
    metrics: [
      { label: 'Quality Score', value: '7+/10' },
      { label: 'API Cost', value: '<$50' },
    ],
  },
];

export function ProcessTimelineRefined() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Create scroll triggers for each stage (25% of scroll per stage)
      stages.forEach((stage, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: `top+${i * 25}% center`,
          end: `top+${(i + 1) * 25}% center`,
          onEnter: () => setActiveStep(stage.id),
          onEnterBack: () => setActiveStep(stage.id),
        });
      });

      // Animate connecting lines between cards
      gsap.to('.connecting-line', {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        scaleY: 1,
        ease: 'none',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn('relative min-h-[400vh]')}
      style={{ backgroundColor: digilibTheme.backgrounds.light }}
    >
      <div className="sticky top-0 min-h-screen">
        <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-12', digilibTheme.spacing.container, 'py-16')}>
          {/* Left Column: Sticky Timeline with Cards */}
          <div className="relative flex flex-col justify-center space-y-12">
            {/* Vertical connecting line */}
            <div className="absolute left-6 top-24 bottom-24 w-[2px] bg-gray-200">
              <div
                className="connecting-line w-full h-full origin-top"
                style={{
                  backgroundColor: digilibTheme.accents.teal,
                  opacity: 0.3,
                  scaleY: 0,
                }}
              />
            </div>

            {/* Step Cards */}
            {stages.map((stage) => (
              <StepCardRefined
                key={stage.id}
                stepNumber={stage.id}
                title={stage.title}
                description={stage.description}
                metrics={stage.metrics}
                isActive={activeStep === stage.id}
              />
            ))}
          </div>

          {/* Right Column: 3D Canvas with Evolving Visuals */}
          <div className="flex items-center justify-center">
            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden" style={{ backgroundColor: digilibTheme.backgrounds.accent }}>
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                <OrbitControls enableZoom={false} enablePan={false} />

                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={0.6} />
                <pointLight position={[-5, -5, -5]} intensity={0.2} />

                {/* Evolving visual based on active step */}
                <EvolvingVisual3D activeStep={activeStep} />
              </Canvas>

              {/* Stage label overlay */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <p className={cn(digilibTheme.typography.small, 'font-medium')} style={{ color: digilibTheme.text.lightBg }}>
                  Stage {activeStep}: {stages[activeStep - 1].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
