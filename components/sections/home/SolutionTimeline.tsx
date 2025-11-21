/**
 * SolutionTimeline Component
 *
 * Horizontal scroll section showing the 4-stage product flow.
 * Implements Corn Revolution-style pinned horizontal scroll with GSAP.
 *
 * Animation Pattern:
 * - Section pins for 4 viewport heights (one per stage)
 * - Inner scroller translates horizontally (-scrollWidth)
 * - Each stage card brightens/scales as it centers
 * - Connecting lines pulse with scroll progress
 *
 * From PAGE_STRUCTURE.md Section 3: "solution-timeline"
 */

'use client';

import { useHorizontalScroll } from '@/hooks/animations/useHorizontalScroll';
import { StageCard } from './StageCard';
import { Target, Zap, FileText, DollarSign } from 'lucide-react';

const stages = [
  {
    number: 1,
    title: 'Company Profiler',
    description:
      'Get your Technology Readiness Level (TRL) assessment and create your company profile. We extract key facts for precise grant matching.',
    features: [
      'TRL 1-9 assessment in minutes',
      'Company profile auto-generation',
      'Key facts extraction for matching',
      'Free forever, no credit card',
    ],
    badge: 'FREE',
    badgeColor: 'from-green-500 to-emerald-500',
    icon: Target,
  },
  {
    number: 2,
    title: 'Grant Discovery',
    description:
      'AI-powered web search finds matching grants with fit scores and expert recommendations. Get a PDF report instantly.',
    features: [
      'Web search for matching grants',
      'AI-powered fit scoring (0-100)',
      'Ranked recommendations',
      'Free PDF report download',
    ],
    badge: 'FREE',
    badgeColor: 'from-green-500 to-emerald-500',
    icon: Zap,
  },
  {
    number: 3,
    title: 'Grant Analysis',
    description:
      'Deep RFP parsing with timeline extraction, budget breakdown, and compliance checking. Know exactly what is required before you start.',
    features: [
      'RFP parsing and analysis',
      'Timeline and deadline tracking',
      'Budget validation and breakdown',
      'Compliance requirements check',
    ],
    badge: '$199',
    badgeColor: 'from-ocean-500 via-teal-500 to-ocean-600',
    icon: FileText,
  },
  {
    number: 4,
    title: 'Document Generation',
    description:
      'Multi-agent AI system writes your complete application with RAG-powered examples and 3-assessor simulation scoring for quality control.',
    features: [
      '12 specialized AI agents collaborate',
      'RAG retrieval from 1000+ winning grants',
      '3-assessor simulation scoring',
      'Iterative refinement until 7+/10 score',
    ],
    badge: '$999',
    badgeColor: 'from-ocean-500 via-teal-500 to-ocean-600',
    icon: DollarSign,
  },
];

export function SolutionTimeline() {
  const { containerRef, scrollerRef } = useHorizontalScroll({
    itemCount: 4, // Pin for 4 viewport heights
    scrub: 1.5, // Slightly slower scrub for more control
    markers: false,
  });

  return (
    <section
      ref={containerRef}
      className="h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white relative"
    >
      {/* Section Header (Sticky) */}
      <div className="absolute top-12 left-0 right-0 z-10 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-ocean-700 to-teal-600 bg-clip-text text-transparent">
            Your Path to Funded Research
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto px-6">
          Four AI-powered stages that transform how you apply for grants
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {[1, 2, 3, 4].map((stage) => (
          <div
            key={stage}
            className="w-3 h-3 rounded-full bg-gray-300 transition-colors"
            data-stage={stage}
          />
        ))}
      </div>

      {/* Horizontal Scroller */}
      <div
        ref={scrollerRef}
        className="flex h-full items-center will-change-transform"
      >
        {stages.map((stage) => (
          <StageCard key={stage.number} {...stage} />
        ))}
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs for depth */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-ocean-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-teal-200/20 to-transparent rounded-full blur-3xl" />
      </div>
    </section>
  );
}
