/**
 * AIFeaturesSection - Interactive AI-Powered Grant Success Features
 *
 * Design Features:
 * - 2-column layout: feature cards left, R3F visualizations right
 * - Hover-triggered visualizations for each feature
 * - Scroll-based background color transitions
 * - Calm, scientific aesthetic inspired by digilab.co
 * - GSAP animations with power3.out easing
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useGSAP } from '@/hooks/gsap/useGSAP';

// Dynamically import R3F visualizations
const AIVisualizationCanvas = dynamic(
  () => import('./AIVisualizationCanvas'),
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

// Feature data with unique visualizations
const features = [
  {
    id: 'multi-agent',
    title: 'Multi-Agent Intelligence',
    metric: '12+ AI Agents',
    description: 'Specialized agents work in parallel across 4 stages: profiling, discovery, analysis, and generation.',
    visualization: 'network',
    color: '#2FB49E', // teal
    details: [
      'Parallel processing for faster results',
      'Each agent optimized for specific tasks',
      'Continuous learning from outcomes'
    ]
  },
  {
    id: 'smart-matching',
    title: 'Smart Grant Matching',
    metric: '92% Match Accuracy',
    description: 'Advanced pattern recognition identifies grants with the highest success probability for your profile.',
    visualization: 'clustering',
    color: '#A98CEB', // purple
    details: [
      'Real-time opportunity scanning',
      'Multi-dimensional scoring algorithm',
      'Predictive success modeling'
    ]
  },
  {
    id: 'rag-writing',
    title: 'RAG-Enhanced Writing',
    metric: '7.8/10 Avg Score',
    description: 'Retrieval-augmented generation creates responses using successful grant examples from our knowledge base.',
    visualization: 'assembly',
    color: '#2FB49E', // teal
    details: [
      '500+ successful grant examples',
      'Context-aware response generation',
      'Iterative quality improvement'
    ]
  },
  {
    id: 'success-optimization',
    title: 'Success Optimization',
    metric: '40% Win Rate',
    description: 'Continuous feedback loops and assessor simulations optimize each application for maximum impact.',
    visualization: 'feedback',
    color: '#E4584A', // coral
    details: [
      'Multi-assessor simulation scoring',
      'Historical pattern analysis',
      'Strategic timeline optimization'
    ]
  }
];

// Bottom stats bar data
const stats = [
  { label: 'AI Agents', value: '12+', color: '#2FB49E' },
  { label: 'Grant Sources', value: '500+', color: '#A98CEB' },
  { label: 'Success Rate', value: '40%', color: '#2FB49E' },
  { label: 'Active Users', value: '200+', color: '#E4584A' }
];

export function AIFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
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
      gsap.set('.section-title', { opacity: 0, y: 20 });

      // Create timeline for section entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });

      // Animate title
      tl.to('.section-title', {
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

      // Background color transition on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
          const progress = self.progress;
          const bgElement = bgRef.current;
          if (bgElement) {
            // Subtle color shift from page background to slightly tinted
            const opacity = progress * 0.03; // Very subtle tint
            bgElement.style.backgroundColor = `rgba(47, 180, 158, ${opacity})`;
          }
        }
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Handle feature hover/click
  const handleFeatureInteraction = (featureId: string) => {
    setActiveFeature(featureId);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
    >
      {/* Background with subtle color transition */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: '#F5F2ED' }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="ai-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0C051A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ai-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="section-title text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-[#0C051A] mb-6 tracking-tight">
            AI-Powered Grant Success
          </h2>
          <p className="text-xl text-[#0C051A]/60 max-w-3xl mx-auto leading-relaxed">
            Our multi-agent system combines advanced AI with grant expertise to maximize your funding success.
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
                  'border cursor-pointer',
                  activeFeature === feature.id
                    ? 'bg-white shadow-lg border-current'
                    : 'bg-white/50 shadow-sm border-gray-200 hover:bg-white hover:shadow-md'
                )}
                style={{
                  borderColor: activeFeature === feature.id ? feature.color : undefined
                }}
                onMouseEnter={() => {
                  setHoveredFeature(feature.id);
                  handleFeatureInteraction(feature.id);
                }}
                onMouseLeave={() => setHoveredFeature(null)}
                onClick={() => handleFeatureInteraction(feature.id)}
              >
                {/* Feature Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0C051A] mb-1">
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
                <p className="text-sm text-[#0C051A]/60 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature Details */}
                <div className={cn(
                  'grid grid-cols-1 gap-2 overflow-hidden transition-all duration-500',
                  activeFeature === feature.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                )}>
                  {feature.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#0C051A]/50">
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: feature.color }}
                      />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Hover indicator line */}
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
            className="visualization-container relative h-[500px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden bg-white/30 border border-gray-200/50"
          >
            <AIVisualizationCanvas
              activeFeature={activeFeature}
              hoveredFeature={hoveredFeature}
            />

            {/* Visualization Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#0C051A]/40 uppercase tracking-wider mb-1">
                      Active Visualization
                    </div>
                    <div className="text-sm font-semibold text-[#0C051A]">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div
                className="text-3xl font-mono font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#0C051A]/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-500/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </section>
  );
}