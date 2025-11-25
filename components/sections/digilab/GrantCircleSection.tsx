/**
 * GrantCircleSection - Redesigned with agentic ring visualization and rich content
 *
 * Features:
 * - Prominent colored open ring with agent nodes
 * - Horizontal particle flows showing data processing
 * - Rich content sections explaining the grant matching process
 * - No stats or CTA sections - pure informational content
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';

// Dynamically import R3F canvas wrapper (client-only, no SSR)
const GrantReactorScene = dynamic(
  () => import('@/components/GrantReactorScene'),
  {
    ssr: false,
    loading: () => null
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

// Grant data for visualization
const grantOpportunities = [
  { id: 1, title: 'SBIR Phase I', amount: '$50K', deadline: 'Q2 2025', matchScore: 0.92, status: 'evaluating' },
  { id: 2, title: 'NSF STTR', amount: '$225K', deadline: 'Q3 2025', matchScore: 0.88, status: 'matched' },
  { id: 3, title: 'DOE Innovation', amount: '$150K', deadline: 'Q1 2025', matchScore: 0.85, status: 'matched' },
  { id: 4, title: 'NIH R01', amount: '$500K', deadline: 'Q4 2025', matchScore: 0.78, status: 'processing' },
  { id: 5, title: 'DARPA Young Faculty', amount: '$500K', deadline: 'Q2 2025', matchScore: 0.72, status: 'processing' },
  { id: 6, title: 'NASA SBIR', amount: '$125K', deadline: 'Q3 2025', matchScore: 0.68, status: 'analyzing' },
];

// Processing status indicators
const processingStates = ['discovering', 'analyzing', 'evaluating', 'ranking', 'optimizing'];

// Agent descriptions for rich content
const agentDescriptions = [
  {
    title: 'Discovery Agent',
    color: '#1A8B76',
    description: 'Continuously scans 8+ major grant databases, monitoring new opportunities in real-time. Uses advanced pattern recognition to identify grants matching your research profile.',
    features: ['Real-time monitoring', 'Pattern matching', 'Eligibility pre-screening']
  },
  {
    title: 'Analysis Agent',
    color: '#4A90E2',
    description: 'Deep-dives into grant requirements, parsing RFPs and extracting key criteria. Builds comprehensive requirement matrices and identifies critical success factors.',
    features: ['RFP parsing', 'Requirement extraction', 'Success factor analysis']
  },
  {
    title: 'Matching Agent',
    color: '#6B4DB8',
    description: 'Compares your company profile against grant criteria using multi-dimensional scoring. Evaluates technical fit, TRL alignment, and budget compatibility.',
    features: ['Multi-factor scoring', 'TRL assessment', 'Budget validation']
  },
  {
    title: 'Ranking Agent',
    color: '#8B7DB8',
    description: 'Prioritizes opportunities based on success probability, deadline urgency, and funding amount. Creates optimized application sequences to maximize success rates.',
    features: ['Success prediction', 'Timeline optimization', 'Resource allocation']
  },
  {
    title: 'Optimization Agent',
    color: '#FF6B35',
    description: 'Fine-tunes application strategies based on historical success patterns. Identifies improvement areas and suggests response enhancements.',
    features: ['Strategy refinement', 'Historical analysis', 'Response optimization']
  },
  {
    title: 'Validation Agent',
    color: '#FF8E53',
    description: 'Ensures 100% compliance with grant requirements. Cross-checks all sections for consistency and completeness before submission.',
    features: ['Compliance checking', 'Consistency validation', 'Completeness verification']
  }
];

// Process timeline for rich content
const processTimeline = [
  {
    phase: 'Intake',
    duration: '1-2 days',
    description: 'Upload your company documents, pitch decks, and technical specifications. Our AI extracts and structures your complete profile.'
  },
  {
    phase: 'Discovery',
    duration: '2-3 days',
    description: 'AI agents scan thousands of grants across federal, state, and private sources. Machine learning models predict match scores.'
  },
  {
    phase: 'Analysis',
    duration: '3-4 days',
    description: 'Deep analysis of top matches. Requirements parsing, budget validation, and timeline feasibility assessment.'
  },
  {
    phase: 'Writing',
    duration: '5-7 days',
    description: 'Multi-agent system generates responses using RAG-enhanced examples. Iterative refinement until quality scores exceed 7/10.'
  },
  {
    phase: 'Review',
    duration: '1-2 days',
    description: 'Final compliance checks, consistency validation, and human review. Package preparation for submission.'
  }
];

export function GrantCircleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [processingState, setProcessingState] = useState(0);
  const [activeGrant, setActiveGrant] = useState<number | null>(null);
  const [activeAgent, setActiveAgent] = useState(0);

  useEffect(() => {
    // Mark canvas as loaded after a short delay
    const timer = setTimeout(() => setCanvasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through processing states
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingState(prev => (prev + 1) % processingStates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Cycle through active agents
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent(prev => (prev + 1) % agentDescriptions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Randomly highlight grants as being processed
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGrant(Math.floor(Math.random() * grantOpportunities.length));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !gsap || !ScrollTrigger) return;

      // Set initial states
      gsap.set('.grant-content', { opacity: 0, y: 30 });
      gsap.set('.processing-indicator', { opacity: 0, scale: 0.8 });
      gsap.set('.agent-card', { opacity: 0, x: -20 });
      gsap.set('.timeline-item', { opacity: 0, y: 20 });

      // Fade-in reveal animation
      gsap.to('.grant-content', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        }
      });

      // Animate agent cards
      gsap.to('.agent-card', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.agents-grid',
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      });

      // Animate timeline items
      gsap.to('.timeline-item', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.process-timeline',
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      });

      // Animate processing indicators
      gsap.to('.processing-indicator', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          toggleActions: 'play none none none',
        }
      });
    },
    { scope: sectionRef, dependencies: [canvasLoaded] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: fundaidTheme.backgrounds.page }}
    >
      {/* Subtle grid background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
          <defs>
            <pattern id="ai-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={fundaidTheme.text.muted} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ai-grid)" />
        </svg>
      </div>

      {/* Animated processing lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
        <defs>
          <linearGradient id="processing-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fundaidTheme.accents.teal} stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor={fundaidTheme.accents.teal} stopOpacity="1">
              <animate attributeName="stop-opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor={fundaidTheme.accents.teal} stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;1;0" dur="2s" begin="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        {/* Processing data streams */}
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={`stream-${i}`}>
            <path
              d={`M ${i * 200},0 Q ${i * 200 + 100},${window.innerHeight / 2} ${i * 200 + 200},${window.innerHeight}`}
              stroke="url(#processing-gradient)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,10"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-15"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        ))}
      </svg>

      {/* Floating AI processing indicators */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left - Data input indicator */}
        <div className="processing-indicator absolute top-20 left-20 flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping" />
            <div className="relative w-3 h-3 bg-teal-500 rounded-full" />
          </div>
          <span className="text-xs font-mono" style={{ color: fundaidTheme.text.muted }}>
            {agentDescriptions[activeAgent].title} Active
          </span>
        </div>

        {/* Top right - Processing status */}
        <div className="processing-indicator absolute top-20 right-20 flex items-center gap-3">
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: agentDescriptions[activeAgent].color,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
          <span className="text-xs font-mono" style={{ color: fundaidTheme.text.muted }}>
            {processingStates[processingState]}
          </span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grant-content text-center mb-16">
          <h2
            className={cn(fundaidTheme.typography.h1, 'mb-6')}
            style={{ color: fundaidTheme.text.main }}
          >
            AI-Powered Grant Matching
          </h2>
          <p
            className={cn(fundaidTheme.typography.body, 'mx-auto')}
            style={{
              color: fundaidTheme.text.muted,
              maxWidth: '60ch',
            }}
          >
            Watch our multi-agent system discover, analyze, and rank grant opportunities
            in real-time. Each specialized agent handles a critical part of the matching process.
          </p>
        </div>

        {/* 3D Processing Visualization with Agentic Ring */}
        <div className="grant-content relative h-[600px] mb-24">
          {/* Processing status bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium" style={{ color: fundaidTheme.text.muted }}>
                  Multi-Agent System Active
                </span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <span className="text-xs font-mono" style={{ color: fundaidTheme.text.muted }}>
                {grantOpportunities.length} grants in pipeline
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: fundaidTheme.text.muted }}>Processing:</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-8 h-1 rounded-full transition-all duration-300",
                      i <= processingState ? "bg-teal-500" : "bg-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3D Canvas with Agentic Ring */}
          <div className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            canvasLoaded ? "opacity-100" : "opacity-0"
          )}>
            <GrantReactorScene />
          </div>

          {/* Grant cards floating around the visualization */}
          <div className="absolute inset-0 pointer-events-none">
            {grantOpportunities.map((grant, i) => {
              const angle = (i / grantOpportunities.length) * Math.PI * 2;
              const radius = 38; // percentage
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;

              return (
                <div
                  key={grant.id}
                  className={cn(
                    "grant-content absolute -translate-x-1/2 -translate-y-1/2",
                    "bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg",
                    "transition-all duration-500",
                    activeGrant === i ? "scale-110 shadow-xl" : "scale-100"
                  )}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    borderColor: activeGrant === i ? fundaidTheme.accents.teal : 'transparent',
                    borderWidth: '2px',
                    borderStyle: 'solid'
                  }}
                >
                  <div className="text-xs font-bold mb-1" style={{ color: fundaidTheme.text.main }}>
                    {grant.title}
                  </div>
                  <div className="text-xs opacity-60 mb-2">
                    {grant.amount} • {grant.deadline}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${grant.matchScore * 100}%`,
                          backgroundColor: grant.matchScore > 0.8 ? fundaidTheme.accents.teal :
                                         grant.matchScore > 0.7 ? fundaidTheme.accents.lavender :
                                         fundaidTheme.accents.coral
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium" style={{
                      color: grant.matchScore > 0.8 ? fundaidTheme.accents.teal : fundaidTheme.text.muted
                    }}>
                      {Math.round(grant.matchScore * 100)}%
                    </span>
                  </div>
                  {activeGrant === i && (
                    <div className="absolute -top-2 -right-2 w-4 h-4">
                      <div className="absolute inset-0 bg-teal-500 rounded-full animate-ping" />
                      <div className="relative w-4 h-4 bg-teal-500 rounded-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Descriptions Grid */}
        <div className="grant-content mb-24">
          <h3 className="text-3xl font-bold mb-12 text-center" style={{ color: fundaidTheme.text.main }}>
            Meet Your AI Agent Team
          </h3>
          <div className="agents-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentDescriptions.map((agent, i) => (
              <div
                key={i}
                className={cn(
                  "agent-card relative bg-white/80 backdrop-blur-sm rounded-2xl p-6",
                  "border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300",
                  activeAgent === i && "ring-2 ring-offset-2"
                )}
                style={{
                  borderColor: activeAgent === i ? agent.color : undefined,
                  ringColor: activeAgent === i ? agent.color : undefined
                }}
              >
                <div
                  className="w-12 h-12 rounded-full mb-4 flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: agent.color }}
                >
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold mb-3" style={{ color: fundaidTheme.text.main }}>
                  {agent.title}
                </h4>
                <p className="text-sm leading-relaxed mb-4" style={{ color: fundaidTheme.text.muted }}>
                  {agent.description}
                </p>
                <ul className="space-y-2">
                  {agent.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs">
                      <span style={{ color: agent.color }}>•</span>
                      <span style={{ color: fundaidTheme.text.muted }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                {activeAgent === i && (
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: agent.color }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="grant-content mb-24">
          <h3 className="text-3xl font-bold mb-12 text-center" style={{ color: fundaidTheme.text.main }}>
            From Discovery to Submission: 14 Days
          </h3>
          <div className="process-timeline relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-purple-500 to-coral-500 opacity-30" />

            {processTimeline.map((phase, i) => (
              <div key={i} className="timeline-item relative flex gap-8 mb-12 last:mb-0">
                {/* Timeline dot */}
                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: agentDescriptions[i % agentDescriptions.length].color }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-4 mb-2">
                    <h4 className="text-xl font-bold" style={{ color: fundaidTheme.text.main }}>
                      {phase.phase}
                    </h4>
                    <span className="text-sm px-3 py-1 rounded-full bg-gray-100" style={{ color: fundaidTheme.text.muted }}>
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: fundaidTheme.text.muted }}>
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits Grid */}
        <div className="grant-content grid md:grid-cols-3 gap-8">
          {/* Speed Card */}
          <div className="relative bg-gradient-to-br from-teal-50/50 to-transparent backdrop-blur-sm rounded-2xl p-8 border border-teal-200/30">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" style={{ color: fundaidTheme.accents.teal }} viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: fundaidTheme.text.main }}>
              14-Day Turnaround
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: fundaidTheme.text.muted }}>
              From initial discovery to submission-ready application. Our parallel processing agents work 24/7 to meet tight deadlines.
            </p>
          </div>

          {/* Quality Card */}
          <div className="relative bg-gradient-to-br from-purple-50/50 to-transparent backdrop-blur-sm rounded-2xl p-8 border border-purple-200/30">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" style={{ color: fundaidTheme.accents.lavender }} viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: fundaidTheme.text.main }}>
              7+/10 Quality Score
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: fundaidTheme.text.muted }}>
              Multi-assessor simulation ensures every response meets high quality standards before submission.
            </p>
          </div>

          {/* Cost Card */}
          <div className="relative bg-gradient-to-br from-coral-50/50 to-transparent backdrop-blur-sm rounded-2xl p-8 border border-coral-200/30">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" style={{ color: fundaidTheme.accents.coral }} viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: fundaidTheme.text.main }}>
              Under $50 API Cost
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: fundaidTheme.text.muted }}>
              Efficient token usage and caching keeps costs minimal while maintaining quality and completeness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}