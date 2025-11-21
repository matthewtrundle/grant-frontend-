/**
 * Team & Trust Section - DNA Science Aesthetic
 *
 * Scientific credibility and social proof.
 * Clean testimonials with hexagonal avatars.
 *
 * Features:
 * - Testimonial cards with hexagonal avatars
 * - 5-star ratings with scientific styling
 * - Award badges
 * - Logo wall integration
 * - Stagger reveal animations
 */

'use client';

import { cn } from '@/lib/utils';
import { HexagonBadge, HexagonalPattern } from '@/components/ui/hexagonal-pattern';
import { DNAHelixScroll } from '@/components/ui/dna-helix-scroll';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { useParallax } from '@/hooks/gsap/useParallax';
import { useScrollMorph } from '@/hooks/gsap/useScrollMorph';
import { Star, Award, CheckCircle } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  initials: string;
  quote: string;
  rating: number;
  colorClass: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Principal Investigator',
    company: 'BioGenomics Institute',
    initials: 'SC',
    quote: 'The AI-powered analysis saved us weeks of work. We secured a $250K SBIR grant on our first submission.',
    rating: 5,
    colorClass: 'from-dna-teal to-dna-teal-light',
  },
  {
    name: 'Michael Torres',
    role: 'CTO',
    company: 'NanoMed Solutions',
    initials: 'MT',
    quote: 'Professional, data-driven, and incredibly efficient. The multi-agent system caught details we would have missed.',
    rating: 5,
    colorClass: 'from-dna-green to-dna-green-dark',
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Research Director',
    company: 'Quantum Therapeutics',
    initials: 'EW',
    quote: 'The TRL assessment and grant fit scoring are remarkably accurate. This platform understands biotech.',
    rating: 5,
    colorClass: 'from-bio-blue to-bio-blue-light',
  },
];

const awards = [
  {
    title: 'AI Innovation Award',
    year: '2024',
    organization: 'Grant Writers Association',
  },
  {
    title: 'Top Rated Platform',
    year: '2024',
    organization: 'Biotech Startups Review',
  },
  {
    title: 'Best Automation Tool',
    year: '2023',
    organization: 'Research Tech Summit',
  },
];

export function TeamTrustDNA() {
  // Parallax for hexagonal pattern
  const patternRef = useParallax({ speed: 0.3 });

  // Scroll morph for title
  const titleRef = useScrollMorph({ scale: 1.03, opacity: 1 });

  return (
    <section
      className={cn(
        'relative py-24 md:py-32',
        'bg-gradient-to-b from-white to-bg-dna-secondary',
        'overflow-hidden'
      )}
    >
      {/* DNA Helix with Scroll Rotation - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[600px] opacity-8">
        <DNAHelixScroll
          size="lg"
          variant="watermark"
          scrollRotation={360}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles count={10} color="blue" scrollInteractive />

      {/* Hexagonal Pattern Background with Parallax */}
      <div ref={patternRef} className="absolute inset-0 opacity-5">
        <HexagonalPattern density="medium" color="teal" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold text-navy-deep mb-6 tracking-tight">
            Trusted by Researchers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join scientists and biotech innovators who trust our platform
            to power their grant applications with AI precision.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Awards Banner */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-navy-deep text-center mb-8">
            Industry Recognition
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {awards.map((award, index) => (
              <AwardBadge key={index} award={award} />
            ))}
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="pt-12 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-dna-green" />
                <span className="text-3xl font-bold text-dna-teal">100+</span>
              </div>
              <p className="text-gray-600">Grants Funded</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-dna-green" />
                <span className="text-3xl font-bold text-dna-teal">$10M+</span>
              </div>
              <p className="text-gray-600">Total Funding Secured</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-dna-green" />
                <span className="text-3xl font-bold text-dna-teal">40%</span>
              </div>
              <p className="text-gray-600">Higher Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Individual Testimonial Card
 */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  // Subtle scroll morph for cards
  const cardRef = useScrollMorph({ scale: 1.02, y: -10 });

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative',
        'bg-white rounded-2xl p-8',
        'shadow-soft hover:shadow-lifted',
        'transition-all duration-quick',
        'hover:-translate-y-2',
        'border-l-4 border-dna-teal'
      )}
    >
      {/* Hexagonal Avatar */}
      <div className="mb-6">
        <HexagonBadge
          size="lg"
          className={cn(
            'bg-gradient-to-br',
            testimonial.colorClass,
            'text-white font-bold text-2xl'
          )}
        >
          {testimonial.initials}
        </HexagonBadge>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
        "{testimonial.quote}"
      </blockquote>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      {/* Author Info */}
      <div>
        <p className="font-bold text-navy-deep">{testimonial.name}</p>
        <p className="text-sm text-gray-600">{testimonial.role}</p>
        <p className="text-sm text-dna-teal font-semibold">{testimonial.company}</p>
      </div>

      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10">
        <svg
          className="h-12 w-12 text-dna-teal"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Award Badge Component
 */
function AwardBadge({ award }: { award: typeof awards[0] }) {
  return (
    <div
      className={cn(
        'group',
        'bg-gradient-to-br from-bg-dna-card to-white',
        'rounded-xl p-6',
        'border border-gray-200',
        'shadow-subtle hover:shadow-soft',
        'transition-all duration-quick',
        'hover:-translate-y-1',
        'text-center'
      )}
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dna-green-50 mb-4">
        <Award className="h-6 w-6 text-dna-green" />
      </div>
      <h4 className="font-bold text-navy-deep mb-1">{award.title}</h4>
      <p className="text-sm text-gray-600">{award.organization}</p>
      <p className="text-xs text-dna-teal font-semibold mt-2">{award.year}</p>
    </div>
  );
}
