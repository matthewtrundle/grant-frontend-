/**
 * ProcessTimeline Component
 *
 * Three-column pinned composition with vertical timeline, content layer, and R3F canvas.
 * Column 1 (20%): Minimal vertical timeline with numbered milestones
 * Column 2 (35%): Stage content that fades in/out based on current stage
 * Column 3 (45%): Canvas placeholder for R3F visualization
 *
 * Design: Dark indigo background, teal accents, no cards/borders
 * Mobile: Stacks vertically with inline content
 *
 * GSAP ScrollTrigger animations:
 * - Pin section for ~400vh of scroll
 * - Stage activation at 0%, 25%, 50%, 75%
 * - SVG line stroke animation synchronized with scroll
 * - Stage marker opacity transitions
 * - Content fade in/out based on active stage
 */

'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import FundAidTimelineBackground from '@/components/FundAidTimelineBackground';
import { ConnectingLine } from '@/components/ui/decorative-elements';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Dynamic import for R3F component to avoid SSR issues
const ProcessTimelineVisualization = dynamic(
  () => import('@/components/r3f/ProcessTimelineVisualization'),
  { ssr: false }
);

interface TimelineStage {
  number: number;
  label: string;
}

interface StageContent {
  stage: number;
  headline: string;
  description: string;
  capabilities: string[];
}

const stages: TimelineStage[] = [
  { number: 1, label: 'Profile' },
  { number: 2, label: 'Discovery' },
  { number: 3, label: 'Analysis' },
  { number: 4, label: 'Generation' }
];

const stageContent: StageContent[] = [
  {
    stage: 1,
    headline: "Company Profiling",
    description: "Our AI extracts your technology profile, assesses your team's capabilities, and determines your Technology Readiness Level—the foundation for grant matching.",
    capabilities: ["TRL Assessment", "Technology Mapping", "Team Analysis"]
  },
  {
    stage: 2,
    headline: "Grant Discovery",
    description: "We search across federal, state, and private grant databases to identify opportunities aligned with your profile. Our ranking system prioritizes the best fits.",
    capabilities: ["Multi-Source Search", "Fit Scoring", "Deadline Tracking"]
  },
  {
    stage: 3,
    headline: "Opportunity Analysis",
    description: "Each grant is parsed, analyzed, and mapped to your capabilities. We extract requirements, assess fit confidence, and build a strategic roadmap.",
    capabilities: ["RFP Parsing", "Requirement Mapping", "Timeline Planning"]
  },
  {
    stage: 4,
    headline: "Application Generation",
    description: "Our multi-agent system writes your responses, simulates assessor scoring, and iteratively refines until every answer meets professional standards.",
    capabilities: ["AI Writing Agents", "Assessor Simulation", "Quality Control"]
  }
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // GSAP ScrollTrigger animations
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Kill all ScrollTriggers on this element before creating new ones
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === section) trigger.kill();
    });

    // Main pinning ScrollTrigger with stage updates
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=300vh', // Pin for 300vh (400vh total scroll including the initial 100vh)
      pin: true,
      scrub: 1,
      // markers: true, // Enable for development debugging
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        // Update current stage based on scroll progress
        // 0-25% = Stage 1, 25-50% = Stage 2, 50-75% = Stage 3, 75-100% = Stage 4
        if (progress < 0.25) {
          setCurrentStage(1);
        } else if (progress < 0.5) {
          setCurrentStage(2);
        } else if (progress < 0.75) {
          setCurrentStage(3);
        } else {
          setCurrentStage(4);
        }
      }
    });

    // ========================================
    // TIMELINE LINE ANIMATION (ENHANCED)
    // ========================================
    const timelineLine = section.querySelector('[data-timeline-line] line') as SVGLineElement;
    if (timelineLine) {
      const lineLength = timelineLine.getTotalLength();

      // Set initial properties
      gsap.set(timelineLine, {
        strokeDasharray: lineLength,
        strokeDashoffset: lineLength,
        stroke: '#2FB49E',
        strokeOpacity: 0.3,
        strokeWidth: 2
      });

      // Create timeline for line animation with progressive opacity
      const lineTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300vh',
          scrub: 1,
          onUpdate: (self) => {
            // Increase opacity as user progresses (0.3 → 0.7)
            const opacity = 0.3 + (self.progress * 0.4);
            gsap.to(timelineLine, {
              strokeOpacity: opacity,
              duration: 0.3
            });
          }
        }
      });

      // Animate stroke reveal
      lineTimeline.to(timelineLine, {
        strokeDashoffset: 0,
        ease: 'none'
      });
    }

    // ========================================
    // STAGE MARKER ANIMATIONS (ENHANCED with glow)
    // ========================================
    stages.forEach((stage) => {
      const stageElement = section.querySelector(`[data-stage="${stage.number}"]`) as HTMLElement;
      if (!stageElement) return;

      const numberElement = stageElement.querySelector('span') as HTMLElement;
      const labelElement = stageElement.querySelectorAll('span')[1] as HTMLElement;
      const circleElement = stageElement.querySelector('div > div') as HTMLElement;

      const isActive = stage.number === currentStage;

      // Number color and opacity with subtle scale
      gsap.to(numberElement, {
        color: isActive ? '#2FB49E' : 'rgba(47, 180, 158, 0.2)',
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.95, // Subtle scale
        duration: 0.6,
        ease: 'power2.inOut'
      });

      // Label fade
      gsap.to(labelElement, {
        opacity: isActive ? 1 : 0.4,
        duration: 0.6,
        ease: 'power2.inOut'
      });

      // Circle with animated glow
      gsap.to(circleElement, {
        borderColor: isActive ? '#2FB49E' : 'rgba(47, 180, 158, 0.2)',
        boxShadow: isActive
          ? '0 0 25px rgba(47, 180, 158, 0.4), 0 0 50px rgba(47, 180, 158, 0.2)'
          : 'none',
        scale: isActive ? 1 : 0.95,
        duration: 0.6,
        ease: 'power2.inOut'
      });

      // Add pulsing glow for active stage only
      if (isActive) {
        gsap.to(circleElement, {
          boxShadow: '0 0 30px rgba(47, 180, 158, 0.5), 0 0 60px rgba(47, 180, 158, 0.25)',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      } else {
        // Kill pulsing animation when not active
        gsap.killTweensOf(circleElement);
      }
    });

    // ========================================
    // CONTENT LAYER ANIMATIONS (NEW)
    // ========================================
    stageContent.forEach((content) => {
      const contentElement = section.querySelector(`[data-stage-content="${content.stage}"]`) as HTMLElement;
      if (!contentElement) return;

      const headline = contentElement.querySelector('h3');
      const description = contentElement.querySelector('p');
      const tags = contentElement.querySelectorAll('span');

      // Determine if this stage is active
      const isActive = content.stage === currentStage;

      if (isActive) {
        // Staggered fade-in when stage becomes active
        const tl = gsap.timeline();

        // Container fades in and moves up
        tl.to(contentElement, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, 0);

        // Headline appears first
        tl.fromTo(headline,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          },
          0.1 // Slight delay after container
        );

        // Description follows
        tl.fromTo(description,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          },
          0.2 // Stagger
        );

        // Tags stagger in last
        tl.fromTo(tags,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05, // Each tag 50ms after previous
            ease: 'back.out(1.2)' // Subtle spring effect
          },
          0.3
        );

      } else {
        // Fade out when stage becomes inactive
        gsap.to(contentElement, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: 'power2.in'
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, [currentStage]); // Re-run when currentStage changes to update opacity

  return (
    <section
      ref={sectionRef}
      data-timeline-section
      className="relative bg-[#0C051A] min-h-[400vh] overflow-hidden"
    >
      {/* FundAid Timeline Background - technical blueprint visualization */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <FundAidTimelineBackground
          stage={currentStage as 1 | 2 | 3 | 4}
          scrollProgress={scrollProgress}
        />
      </div>

      {/* Sticky container that pins during scroll */}
      <div className="sticky top-0 h-screen relative z-10">
        {/* Three-column grid: 20% timeline, 35% content, 45% canvas */}
        <div className="h-full grid grid-cols-1 lg:grid-cols-[20%_35%_45%] gap-6 lg:gap-8 px-4 lg:px-8 max-w-[1600px] mx-auto">

          {/* Column 1: Timeline Markers (20%) */}
          <div className="relative flex flex-col justify-center items-center lg:items-start py-16 lg:py-0">
            {/* SVG line - adjust positioning */}
            <svg
              data-timeline-line
              className="absolute left-1/2 lg:left-[50px] top-[20%] bottom-[20%] w-[2px] -translate-x-1/2 lg:translate-x-0"
              preserveAspectRatio="none"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#2FB49E"
                strokeOpacity="0.3"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Stage markers */}
            <div className="relative z-10 flex flex-col gap-24 lg:gap-32">
              {stages.map((stage) => (
                <div
                  key={stage.number}
                  data-stage={stage.number}
                  className="flex flex-col items-center lg:items-start"
                >
                  {/* Circle - adjusted size for 20% column */}
                  <div className="relative">
                    <div
                      className={`
                        w-16 h-16 lg:w-20 lg:h-20
                        rounded-full
                        flex items-center justify-center
                        bg-[#0C051A]
                        border-2
                        transition-all duration-500
                        ${stage.number === currentStage
                          ? 'border-[#2FB49E] shadow-[0_0_20px_rgba(47,180,158,0.3)]'
                          : 'border-[#2FB49E]/20'
                        }
                      `}
                    >
                      <span
                        className={`
                          text-4xl lg:text-5xl font-bold
                          transition-opacity duration-500
                          ${stage.number === currentStage ? 'text-[#2FB49E]' : 'text-[#2FB49E]/20'}
                        `}
                      >
                        {stage.number}
                      </span>
                    </div>
                  </div>

                  {/* Stage label */}
                  <span
                    className={`
                      mt-2
                      text-xs lg:text-sm
                      uppercase
                      tracking-[0.15em]
                      transition-opacity duration-500
                      ${stage.number === currentStage ? 'text-[#6B6B7C]' : 'text-[#6B6B7C]/50'}
                    `}
                  >
                    {stage.label}
                  </span>

                  {/* Mobile inline content - shown only on mobile with active stage */}
                  <div className={`lg:hidden mt-4 ${stage.number === currentStage ? 'block' : 'hidden'}`}>
                    <div className="pl-4 border-l-2 border-[#2FB49E]/20">
                      <h3 className="text-xl font-semibold text-[#F5F2ED] mb-2">
                        {stageContent[stage.number - 1].headline}
                      </h3>
                      <p className="text-sm text-[#A09DAA] leading-relaxed mb-3">
                        {stageContent[stage.number - 1].description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {stageContent[stage.number - 1].capabilities.map((cap, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs text-[#2FB49E] border border-[#2FB49E]/30 rounded-full bg-[#2FB49E]/5"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Content Layer (35% - NEW) */}
          <div className="relative hidden lg:flex flex-col justify-center py-16 lg:py-0">
            {/* Connecting line from active timeline marker to content */}
            {currentStage && (
              <ConnectingLine
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                className="absolute left-[-100%] w-[200%]"
                gradient={true}
                animated={true}
                color="#2FB49E"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            )}

            {/* Content cards - one per stage */}
            <div className="relative space-y-32">
              {stageContent.map((content) => (
                <div
                  key={content.stage}
                  data-stage-content={content.stage}
                  className={`
                    transition-all duration-700 ease-out
                    ${content.stage === currentStage
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8 pointer-events-none'
                    }
                  `}
                  style={{
                    minHeight: '200px' // Prevents layout shift
                  }}
                >
                  {/* Stage headline */}
                  <h3 className="text-2xl lg:text-3xl font-semibold text-[#F5F2ED] mb-4 leading-tight">
                    {content.headline}
                  </h3>

                  {/* Stage description */}
                  <p className="text-base lg:text-lg text-[#A09DAA] leading-relaxed mb-6">
                    {content.description}
                  </p>

                  {/* Capability tags */}
                  <div className="flex flex-wrap gap-3">
                    {content.capabilities.map((capability, idx) => (
                      <span
                        key={idx}
                        className="
                          px-3 py-1.5
                          text-xs uppercase tracking-wide
                          text-[#2FB49E]
                          border border-[#2FB49E]/30
                          rounded-full
                          bg-[#2FB49E]/5
                        "
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: R3F Visualization (45%) */}
          <div
            ref={canvasRef}
            data-canvas-container
            className="relative h-full flex items-center justify-center overflow-hidden"
          >
            {/* R3F Particle Visualization */}
            <ProcessTimelineVisualization currentStage={currentStage} />
          </div>
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:hidden">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[#6B6B7C] text-xs uppercase tracking-widest">Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M19 12l-7 7-7-7" stroke="#2FB49E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
          </svg>
        </div>
      </div>
    </section>
  );
}