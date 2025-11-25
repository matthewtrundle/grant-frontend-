/**
 * AgentShowcaseSection - Enhanced "Meet Your AI Agent Team" section
 *
 * Features:
 * - R3F agent pipeline visualization on the right
 * - Scroll-linked agent activation
 * - Data flow animations between agents
 * - Background color transitions
 * - Agent-specific visual identities
 *
 * Design follows digilab.co aesthetic:
 * - Calm, scientific tone
 * - Approved color palette only
 * - Smooth GSAP animations with power3.out
 * - Subtle particle effects
 */

'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';

// Dynamically import R3F visualization
const AgentPipelineCanvas = dynamic(
  () => import('@/components/3d/AgentPipelineCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-sm text-gray-400">Loading visualization...</div>
      </div>
    )
  }
);

// Dynamic GSAP imports
let gsap: any;
let ScrollTrigger: any;

if (typeof window !== 'undefined') {
  gsap = require('gsap').default;
  ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
}

// Agent data with approved colors
const agents = [
  {
    id: 'discovery',
    number: 1,
    title: 'Discovery Agent',
    color: '#2FB49E', // Teal
    description: 'Continuously scans 8+ major grant databases, monitoring new opportunities in real-time.',
    features: ['Real-time monitoring', 'Pattern matching', 'Eligibility pre-screening'],
    icon: 'search', // for future icon implementation
    position: { x: 0, y: 3, z: 0 }
  },
  {
    id: 'analysis',
    number: 2,
    title: 'Analysis Agent',
    color: '#A98CEB', // Purple
    description: 'Deep-dives into grant requirements, parsing RFPs and extracting key criteria.',
    features: ['RFP parsing', 'Requirement extraction', 'Success factor analysis'],
    icon: 'analyze',
    position: { x: 2, y: 2, z: 0 }
  },
  {
    id: 'matching',
    number: 3,
    title: 'Matching Agent',
    color: '#2FB49E', // Teal (reuse)
    description: 'Compares your profile against grant criteria using multi-dimensional scoring.',
    features: ['Multi-factor scoring', 'TRL assessment', 'Budget validation'],
    icon: 'match',
    position: { x: 3, y: 0, z: 0 }
  },
  {
    id: 'ranking',
    number: 4,
    title: 'Ranking Agent',
    color: '#E4584A', // Coral
    description: 'Prioritizes opportunities based on success probability and deadline urgency.',
    features: ['Success prediction', 'Timeline optimization', 'Resource allocation'],
    icon: 'rank',
    position: { x: 2, y: -2, z: 0 }
  },
  {
    id: 'optimization',
    number: 5,
    title: 'Optimization Agent',
    color: '#A98CEB', // Purple (reuse)
    description: 'Fine-tunes application strategies based on historical success patterns.',
    features: ['Strategy refinement', 'Historical analysis', 'Response optimization'],
    icon: 'optimize',
    position: { x: 0, y: -3, z: 0 }
  },
  {
    id: 'validation',
    number: 6,
    title: 'Validation Agent',
    color: '#E4584A', // Coral (reuse)
    description: 'Ensures 100% compliance with grant requirements before submission.',
    features: ['Compliance checking', 'Consistency validation', 'Completeness verification'],
    icon: 'validate',
    position: { x: -2, y: -2, z: 0 }
  }
];

export function AgentShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeAgent, setActiveAgent] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Memoize background gradient based on active agent
  const backgroundGradient = useMemo(() => {
    const agent = agents[activeAgent];
    const nextAgent = agents[(activeAgent + 1) % agents.length];

    return `linear-gradient(135deg,
      ${fundaidTheme.backgrounds.page} 0%,
      ${agent.color}08 50%,
      ${nextAgent.color}05 100%
    )`;
  }, [activeAgent]);

  // Initialize canvas after mount
  useEffect(() => {
    const timer = setTimeout(() => setCanvasReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // GSAP scroll-linked animations
  useGSAP(
    () => {
      const section = sectionRef.current;
      const cardsContainer = cardsContainerRef.current;
      if (!section || !cardsContainer || !gsap || !ScrollTrigger) return;

      // Get all agent cards
      const cards = cardsContainer.querySelectorAll('.agent-card');
      if (cards.length === 0) return;

      // Set initial states
      gsap.set(cards, {
        opacity: 0.3,
        scale: 0.95,
        x: -20
      });

      // Create timeline for scroll-linked activation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 20%',
          end: 'bottom 20%',
          scrub: 1,
          onUpdate: (self) => {
            // Update scroll progress for visualization
            setScrollProgress(self.progress);

            // Calculate active agent based on scroll
            const agentIndex = Math.floor(self.progress * agents.length);
            const clampedIndex = Math.min(Math.max(agentIndex, 0), agents.length - 1);
            setActiveAgent(clampedIndex);
          }
        }
      });

      // Add card animations to timeline
      cards.forEach((card, index) => {
        const startTime = index / agents.length;
        const endTime = (index + 1) / agents.length;

        tl.to(card, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: 'power3.out'
        }, startTime)
        .to(card, {
          opacity: 0.3,
          scale: 0.95,
          x: -20,
          duration: 0.3,
          ease: 'power3.out'
        }, endTime);
      });

      // Background color morphing
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 2
        },
        backgroundImage: backgroundGradient,
        ease: 'none'
      });

      // Entrance animations
      gsap.from('.section-header', {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          once: true
        }
      });

      // Canvas fade in
      gsap.from(canvasContainerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          once: true
        }
      });

      // Floating particles
      const particles = section.querySelectorAll('.data-particle');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: 'random(-20, 20)',
          x: 'random(-10, 10)',
          duration: 'random(3, 5)',
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.2
        });
      });
    },
    { scope: sectionRef, dependencies: [canvasReady, backgroundGradient] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] py-24 md:py-32 overflow-hidden"
      style={{
        backgroundColor: fundaidTheme.backgrounds.page,
        backgroundImage: backgroundGradient,
        transition: 'background-image 1s ease'
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="agent-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={fundaidTheme.text.muted} opacity="0.3" />
              <circle cx="20" cy="20" r="1" fill={fundaidTheme.text.muted} opacity="0.3" />
              <circle cx="38" cy="38" r="1" fill={fundaidTheme.text.muted} opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#agent-grid)" />
        </svg>
      </div>

      {/* Floating data particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="data-particle absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: agents[i % agents.length].color,
              opacity: 0.3
            }}
          />
        ))}
      </div>

      <div className="sticky top-32 h-screen">
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 h-full">
          {/* Section Header */}
          <div className="section-header text-center mb-12">
            <h2
              className={cn(fundaidTheme.typography.h1, 'mb-6')}
              style={{ color: fundaidTheme.text.main }}
            >
              Meet Your AI Agent Team
            </h2>
            <p
              className={cn(fundaidTheme.typography.body, 'mx-auto')}
              style={{
                color: fundaidTheme.text.muted,
                maxWidth: '60ch'
              }}
            >
              Six specialized agents working in perfect harmony to discover, analyze, and secure
              your grant funding. Scroll to see how they collaborate.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 h-[calc(100%-200px)]">
            {/* Left: Agent Cards */}
            <div
              ref={cardsContainerRef}
              className="relative space-y-6 overflow-y-auto pr-4 custom-scrollbar"
              style={{ maxHeight: '600px' }}
            >
              {agents.map((agent, index) => (
                <div
                  key={agent.id}
                  className={cn(
                    'agent-card relative bg-white/90 backdrop-blur-sm rounded-2xl p-6',
                    'border transition-all duration-500',
                    activeAgent === index && 'ring-2 ring-offset-2 shadow-2xl'
                  )}
                  style={{
                    borderColor: activeAgent === index ? agent.color : 'rgba(0,0,0,0.1)',
                    ringColor: activeAgent === index ? agent.color : 'transparent'
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Agent Number */}
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300"
                      style={{
                        backgroundColor: activeAgent === index ? agent.color : '#E5E5E5',
                        transform: activeAgent === index ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      {agent.number}
                    </div>

                    {/* Agent Content */}
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: fundaidTheme.text.main }}
                      >
                        {agent.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-3"
                        style={{ color: fundaidTheme.text.muted }}
                      >
                        {agent.description}
                      </p>
                      <ul className="space-y-1">
                        {agent.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: agent.color }}
                            />
                            <span style={{ color: fundaidTheme.text.muted }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {activeAgent === index && (
                    <div className="absolute -top-2 -right-2">
                      <div className="relative">
                        <div
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{ backgroundColor: agent.color, opacity: 0.3 }}
                        />
                        <div
                          className="relative w-4 h-4 rounded-full"
                          style={{ backgroundColor: agent.color }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: R3F Pipeline Visualization */}
            <div
              ref={canvasContainerRef}
              className="relative h-full rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg,
                  ${fundaidTheme.backgrounds.dark}CC 0%,
                  ${fundaidTheme.backgrounds.dark}EE 100%
                )`,
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 z-10 p-4 backdrop-blur-sm bg-black/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: agents[activeAgent].color }}
                      />
                      <span className="text-xs font-mono text-white/80">
                        {agents[activeAgent].title} Processing
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {agents.map((agent, i) => (
                      <div
                        key={i}
                        className="w-8 h-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: i <= activeAgent ? agent.color : 'rgba(255,255,255,0.2)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* R3F Canvas */}
              {canvasReady && (
                <AgentPipelineCanvas
                  agents={agents}
                  activeAgent={activeAgent}
                  scrollProgress={scrollProgress}
                />
              )}

              {/* Data Flow Indicators */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Input: Company Data</span>
                  <span>→</span>
                  <span>Processing: {activeAgent + 1}/6</span>
                  <span>→</span>
                  <span>Output: Grant Matches</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}