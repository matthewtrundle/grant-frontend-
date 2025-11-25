/**
 * GrantCircleSectionEnhanced - Enhanced with interactive AI features
 *
 * Replaces the existing GrantCircleSection with the new interactive design:
 * - Interactive feature cards with hover effects
 * - R3F visualizations that change based on active feature
 * - Smooth GSAP animations
 * - Digilab-inspired calm aesthetic
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';

// Dynamically import R3F visualizations
const AIVisualizationCanvas = dynamic(
  () => import('../ai-features/AIVisualizationCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
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

// Feature data matching the original content
const features = [
  {
    id: 'multi-agent',
    title: 'Multi-Agent Intelligence',
    metric: '4 Stages',
    description: '12+ specialized AI agents work in parallel across profiling, discovery, analysis, and generation stages.',
    visualization: 'network',
    color: fundaidTheme.accents.teal,
    details: [
      'Profile extraction & TRL assessment',
      'Real-time grant discovery',
      'Deep requirement analysis',
      'RAG-enhanced generation'
    ]
  },
  {
    id: 'smart-matching',
    title: 'Smart Grant Matching',
    metric: '92% Match',
    description: 'Advanced pattern recognition identifies grants with the highest success probability for your unique profile.',
    visualization: 'clustering',
    color: fundaidTheme.accents.lavender,
    details: [
      'Multi-dimensional scoring',
      'Eligibility verification',
      'Timeline optimization',
      'Budget validation'
    ]
  },
  {
    id: 'rag-writing',
    title: 'RAG-Enhanced Writing',
    metric: '7.8/10 Avg',
    description: 'Retrieval-augmented generation creates responses using 500+ successful grant examples.',
    visualization: 'assembly',
    color: fundaidTheme.accents.teal,
    details: [
      'Context-aware generation',
      'Example-based learning',
      'Consistency validation',
      'Quality scoring'
    ]
  },
  {
    id: 'success-optimization',
    title: 'Success Optimization',
    metric: '40% Win Rate',
    description: 'Continuous feedback loops and multi-assessor simulations maximize your success rate.',
    visualization: 'feedback',
    color: fundaidTheme.accents.coral,
    details: [
      'Three-assessor simulation',
      'Historical pattern analysis',
      'Iterative improvement',
      'Strategic positioning'
    ]
  }
];

// Bottom stats
const stats = [
  { label: 'AI Agents', value: '12+', color: fundaidTheme.accents.teal },
  { label: 'Grant Sources', value: '500+', color: fundaidTheme.accents.lavender },
  { label: 'Success Rate', value: '40%', color: fundaidTheme.accents.teal },
  { label: 'Active Users', value: '200+', color: fundaidTheme.accents.coral }
];

export function GrantCircleSectionEnhanced() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<string>('multi-agent');
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  // GSAP animations
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !gsap || !ScrollTrigger) return;

      // Set initial states
      gsap.set('.feature-card', { opacity: 0, x: -30 });
      gsap.set('.visualization-container', { opacity: 0, scale: 0.95 });
      gsap.set('.stat-item', { opacity: 0, y: 20 });
      gsap.set('.section-header', { opacity: 0, y: 20 });

      // Create timeline for section entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // Animate header
      tl.to('.section-header', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate feature cards
      tl.to('.feature-card', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      }, '-=0.4');

      // Animate visualization container
      tl.to('.visualization-container', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6');

      // Animate stats
      tl.to('.stat-item', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05
      }, '-=0.4');
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: fundaidTheme.backgrounds.page }}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="ai-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={fundaidTheme.text.muted} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ai-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <h2
            className={cn(fundaidTheme.typography.h1, 'mb-6')}
            style={{ color: fundaidTheme.text.main }}
          >
            AI-Powered Grant Success
          </h2>
          <p
            className={cn(fundaidTheme.typography.bodyLarge, 'mx-auto')}
            style={{
              color: fundaidTheme.text.muted,
              maxWidth: '60ch',
            }}
          >
            Our multi-agent system discovers, analyzes, and optimizes grant opportunities
            in real-time. Each specialized agent handles a critical part of your success.
          </p>
        </div>

        {/* Main Content: 2-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left: Feature Cards */}
          <div className="space-y-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={cn(
                  'feature-card relative p-6 rounded-2xl transition-all duration-500',
                  'border cursor-pointer backdrop-blur-sm',
                  activeFeature === feature.id
                    ? 'bg-white shadow-xl border-current'
                    : 'bg-white/70 shadow-md border-gray-200/50 hover:bg-white hover:shadow-lg'
                )}
                style={{
                  borderColor: activeFeature === feature.id ? feature.color : undefined
                }}
                onMouseEnter={() => {
                  setHoveredFeature(feature.id);
                  setActiveFeature(feature.id);
                }}
                onMouseLeave={() => setHoveredFeature(null)}
                onClick={() => setActiveFeature(feature.id)}
              >
                {/* Feature Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1" style={{ color: fundaidTheme.text.main }}>
                      {feature.title}
                    </h3>
                    <div
                      className="text-2xl font-mono font-bold"
                      style={{ color: feature.color }}
                    >
                      {feature.metric}
                    </div>
                  </div>
                  {activeFeature === feature.id && (
                    <div
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: feature.color }}
                    />
                  )}
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-4" style={{ color: fundaidTheme.text.muted }}>
                  {feature.description}
                </p>

                {/* Feature Details */}
                <div className={cn(
                  'grid grid-cols-1 gap-2 overflow-hidden transition-all duration-500',
                  activeFeature === feature.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                )}>
                  {feature.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs" style={{ color: fundaidTheme.text.muted }}>
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: feature.color }}
                      />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Active indicator line */}
                <div
                  className={cn(
                    'absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-opacity duration-300',
                    activeFeature === feature.id ? 'opacity-100' : 'opacity-0'
                  )}
                  style={{ backgroundColor: feature.color }}
                />
              </div>
            ))}
          </div>

          {/* Right: R3F Visualization Canvas */}
          <div
            ref={canvasRef}
            className="visualization-container relative h-[500px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm border border-gray-200/30"
          >
            <AIVisualizationCanvas
              activeFeature={activeFeature}
              hoveredFeature={hoveredFeature}
            />

            {/* Visualization Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-200/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color: fundaidTheme.text.muted }}>
                      Active System
                    </div>
                    <div className="text-sm font-semibold" style={{ color: fundaidTheme.text.main }}>
                      {features.find(f => f.id === activeFeature)?.title}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{
                          backgroundColor: features.find(f => f.id === activeFeature)?.color,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/30">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div
                className="text-3xl font-mono font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: fundaidTheme.text.muted }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}