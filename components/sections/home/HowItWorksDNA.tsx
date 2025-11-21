/**
 * How It Works Section - DNA Science Aesthetic
 *
 * 4-stage hexagonal flow showing grant automation process.
 * Clean layout with molecular structure inspiration.
 *
 * Features:
 * - 4 hexagonal stage cards with icons
 * - Connecting lines (molecular bonds)
 * - Stagger reveal animation
 * - Teal/green gradient accents
 * - Pricing badges
 */

'use client';

import { HexagonBadge, HexagonalPattern } from '@/components/ui/hexagonal-pattern';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { cn } from '@/lib/utils';
import { useParallax } from '@/hooks/gsap/useParallax';
import { useScrollMorph } from '@/hooks/gsap/useScrollMorph';
import {
  User,
  Search,
  FileText,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

interface Stage {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  pricing: string;
  colorClass: string;
}

const stages: Stage[] = [
  {
    number: 1,
    title: 'Company Profiler',
    description: 'Extract your technology profile, assess TRL, and build your grant foundation.',
    icon: User,
    features: [
      'Technology assessment',
      'TRL scoring (1-9)',
      'Team analysis',
      'Market positioning',
    ],
    pricing: 'FREE',
    colorClass: 'from-dna-teal to-dna-teal-light',
  },
  {
    number: 2,
    title: 'Grant Discovery',
    description: 'AI-powered search finds the perfect grants for your company profile.',
    icon: Search,
    features: [
      'Web search integration',
      'Fit scoring algorithm',
      'PDF report generation',
      'Ranked recommendations',
    ],
    pricing: 'FREE',
    colorClass: 'from-dna-green to-dna-green-dark',
  },
  {
    number: 3,
    title: 'Grant Analysis',
    description: 'Deep RFP parsing with timeline extraction and budget validation.',
    icon: FileText,
    features: [
      'RFP requirement extraction',
      'Timeline & milestones',
      'Budget breakdown',
      'Compliance check',
    ],
    pricing: '$199',
    colorClass: 'from-bio-blue to-bio-blue-light',
  },
  {
    number: 4,
    title: 'Document Generation',
    description: 'Multi-agent writing system with RAG examples and assessor simulation.',
    icon: Sparkles,
    features: [
      'RAG-enhanced writing',
      '3-assessor validation',
      'Consistency checking',
      'Final polish & export',
    ],
    pricing: '$999',
    colorClass: 'from-dna-teal to-dna-green',
  },
];

export function HowItWorksDNA() {
  // Parallax hook for background pattern
  const patternRef = useParallax({ speed: 0.4 });

  // Scroll morph for section title
  const titleRef = useScrollMorph({ scale: 1.03, opacity: 1 });

  return (
    <section
      className={cn(
        'relative py-24 md:py-32',
        'bg-gradient-to-b from-bg-dna-secondary to-white',
        'overflow-hidden'
      )}
    >
      {/* Floating Particles */}
      <FloatingParticles count={12} color="teal" scrollInteractive />

      {/* Subtle Hexagonal Pattern Background with Parallax */}
      <div ref={patternRef} className="absolute inset-0 opacity-5">
        <HexagonalPattern density="low" color="teal" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold text-navy-deep mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our 4-stage system transforms your grant application from idea to submission
            with scientific precision and AI-powered intelligence.
          </p>
        </div>

        {/* Stage Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stages.map((stage, index) => (
            <StageCard key={stage.number} stage={stage} index={index} />
          ))}
        </div>

        {/* Bottom Trust Line */}
        <div className="mt-16 pt-12 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-lg">
            Join <span className="font-bold text-dna-teal">100+ researchers</span> who have
            successfully automated their grant applications.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Individual Stage Card Component
 */
function StageCard({ stage, index }: { stage: Stage; index: number }) {
  const isEven = index % 2 === 0;

  // Subtle scale effect on scroll
  const cardRef = useScrollMorph({ scale: 1.02, y: -10 });

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative',
        'bg-white rounded-2xl p-8',
        'border-l-4',
        'shadow-soft hover:shadow-lifted',
        'transition-all duration-quick',
        'hover:-translate-y-2',
        // Alternate border colors
        isEven ? 'border-dna-teal' : 'border-dna-green'
      )}
    >
      {/* Stage Number Badge - Hexagonal */}
      <div className="mb-6 flex items-center justify-between">
        <HexagonBadge
          size="md"
          className={cn(
            'bg-gradient-to-br',
            stage.colorClass,
            'text-white font-bold text-xl'
          )}
        >
          {stage.number}
        </HexagonBadge>

        {/* Pricing Badge */}
        <div
          className={cn(
            'px-3 py-1 rounded-full text-xs font-semibold',
            stage.pricing === 'FREE'
              ? 'bg-dna-green-50 text-dna-green-700'
              : 'bg-bio-blue-50 text-bio-blue-700'
          )}
        >
          {stage.pricing}
        </div>
      </div>

      {/* Icon */}
      <div className="mb-4">
        <stage.icon
          className={cn(
            'h-10 w-10',
            isEven ? 'text-dna-teal' : 'text-dna-green',
            'group-hover:scale-110 transition-transform'
          )}
        />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-navy-deep mb-3 leading-tight">
        {stage.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        {stage.description}
      </p>

      {/* Features List */}
      <ul className="space-y-2">
        {stage.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 text-dna-green mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Connecting Line (for non-last cards on desktop) */}
      {index < stages.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-dna-teal to-dna-green opacity-30" />
      )}
    </div>
  );
}
