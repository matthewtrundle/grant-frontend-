/**
 * Results & Data Section - DNA Science Aesthetic
 *
 * Scientific data visualization with biotech styling.
 * Circular progress indicators and key metrics.
 *
 * Features:
 * - 3 circular progress indicators with DNA gradients
 * - Scroll-triggered counter animations
 * - Molecular pattern backgrounds
 * - Scientific precision styling
 */

'use client';

import { cn } from '@/lib/utils';
import { MolecularBonds } from '@/components/ui/hexagonal-pattern';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { useParallax } from '@/hooks/gsap/useParallax';
import { useScrollMorph } from '@/hooks/gsap/useScrollMorph';
import { TrendingUp, Award, DollarSign } from 'lucide-react';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'teal' | 'green' | 'blue';
  description: string;
}

const metrics: Metric[] = [
  {
    label: 'Success Rate',
    value: 40,
    suffix: '%',
    icon: TrendingUp,
    color: 'teal',
    description: 'Higher approval rate than industry average',
  },
  {
    label: 'Grants Funded',
    value: 100,
    suffix: '+',
    icon: Award,
    color: 'green',
    description: 'Successful applications processed',
  },
  {
    label: 'Average Award',
    value: 10,
    suffix: 'K+',
    icon: DollarSign,
    color: 'blue',
    description: 'Median grant value secured',
  },
];

const colorClasses = {
  teal: {
    gradient: 'from-dna-teal to-dna-teal-light',
    text: 'text-dna-teal',
    bg: 'bg-dna-teal-50',
  },
  green: {
    gradient: 'from-dna-green to-dna-green-dark',
    text: 'text-dna-green',
    bg: 'bg-dna-green-50',
  },
  blue: {
    gradient: 'from-bio-blue to-bio-blue-light',
    text: 'text-bio-blue',
    bg: 'bg-bio-blue-50',
  },
};

export function ResultsDataDNA() {
  // Parallax for molecular bonds background
  const bondsRef = useParallax({ speed: 0.5 });

  // Scroll morph for title
  const titleRef = useScrollMorph({ scale: 1.03, opacity: 1 });

  return (
    <section
      className={cn(
        'relative py-24 md:py-32',
        'bg-bg-dna-card-tint',
        'overflow-hidden'
      )}
    >
      {/* Floating Particles */}
      <FloatingParticles count={15} color="green" scrollInteractive />

      {/* Molecular Bonds Background with Parallax */}
      <div ref={bondsRef} className="absolute inset-0 opacity-10">
        <MolecularBonds nodeCount={25} nodeSize={4} color="teal" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold text-navy-deep mb-6 tracking-tight">
            Results That Matter
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Data-driven outcomes from our AI-powered grant automation platform.
            Real researchers, real results, real funding.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            * Based on applications submitted between 2023-2025. Success rates vary by grant type and applicant qualifications.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Individual Metric Card with Circular Progress
 */
function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const colors = colorClasses[metric.color];

  // Scroll morph for card
  const cardRef = useScrollMorph({ scale: 1.05, y: -15 });

  // Use static value (will add animation later with hooks)
  const count = metric.value;

  // Calculate progress percentage (for visual circle)
  const progressPercent = metric.suffix === '%' ? metric.value : 100;

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative',
        'bg-white rounded-2xl p-8',
        'shadow-soft hover:shadow-lifted',
        'transition-all duration-quick',
        'hover:-translate-y-2',
        'border-t-4',
        `border-${metric.color === 'teal' ? 'dna-teal' : metric.color === 'green' ? 'dna-green' : 'bio-blue'}`
      )}
    >
      {/* Icon Badge */}
      <div className={cn('mb-6 inline-flex p-3 rounded-xl', colors.bg)}>
        <metric.icon className={cn('h-8 w-8', colors.text)} />
      </div>

      {/* Circular Progress Indicator */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <svg
          className="transform -rotate-90 w-full h-full"
          viewBox="0 0 128 128"
        >
          {/* Background Circle */}
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#E8EAED"
            strokeWidth="8"
            fill="none"
          />

          {/* Progress Circle with DNA Gradient */}
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                className={metric.color === 'teal' ? 'text-dna-teal' : metric.color === 'green' ? 'text-dna-green' : 'text-bio-blue'}
                style={{ stopColor: 'currentColor' }}
              />
              <stop
                offset="100%"
                className={metric.color === 'teal' ? 'text-dna-teal-light' : metric.color === 'green' ? 'text-dna-green-dark' : 'text-bio-blue-light'}
                style={{ stopColor: 'currentColor' }}
              />
            </linearGradient>
          </defs>

          <circle
            cx="64"
            cy="64"
            r="56"
            stroke={`url(#gradient-${index})`}
            strokeWidth="8"
            fill="none"
            strokeDasharray="352"
            strokeDashoffset={352 - (352 * progressPercent) / 100}
            strokeLinecap="round"
            className="transition-all duration-slow"
          />
        </svg>

        {/* Counter in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className={cn('text-4xl font-bold', colors.text)}>
              {Math.round(count)}{metric.suffix}
            </span>
          </div>
        </div>
      </div>

      {/* Label */}
      <h3 className="text-xl font-bold text-navy-deep mb-2 text-center">
        {metric.label}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm text-center leading-relaxed">
        {metric.description}
      </p>

      {/* Pulsing Dot Indicator */}
      <div className="absolute top-4 right-4">
        <div
          className={cn(
            'w-3 h-3 rounded-full',
            `bg-${metric.color === 'teal' ? 'dna-teal' : metric.color === 'green' ? 'dna-green' : 'bio-blue'}`,
            'animate-molecule-pulse'
          )}
        />
      </div>
    </div>
  );
}
