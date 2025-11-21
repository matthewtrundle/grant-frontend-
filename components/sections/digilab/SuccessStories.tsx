/**
 * SuccessStories - Testimonials and success metrics
 *
 * Features:
 * - Staggered reveal animations
 * - Success story cards with metrics
 * - Company logos and testimonials
 */

'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { digilibTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const successStories = [
  {
    id: 1,
    company: 'BioNova Therapeutics',
    amount: '$2.5M',
    grant: 'NIH SBIR Phase II',
    testimonial: 'The AI-generated application was indistinguishable from our best human-written grants. We won on the first submission.',
    author: 'Dr. Sarah Chen',
    role: 'CEO & Co-founder',
    metric: '7.8/10',
    metricLabel: 'Assessor Score',
  },
  {
    id: 2,
    company: 'QuantumEdge Materials',
    amount: '$500K',
    grant: 'DOE Phase I SBIR',
    testimonial: 'From company profile to submitted application in 11 days. The budget validation caught errors we would have missed.',
    author: 'James Martinez',
    role: 'Principal Investigator',
    metric: '8.2/10',
    metricLabel: 'Quality Score',
  },
  {
    id: 3,
    company: 'AgriSense AI',
    amount: '$1.2M',
    grant: 'USDA SBIR Phase I + II',
    testimonial: 'The multi-agent writing system produced responses that our grant consultant said were "publication quality." Worth every penny.',
    author: 'Rachel Thompson',
    role: 'VP of Research',
    metric: '7.5/10',
    metricLabel: 'Average Score',
  },
];

export function SuccessStories() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      // Stagger in success cards
      tl.fromTo(
        '.success-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(digilibTheme.spacing.section)}
      style={{ backgroundColor: digilibTheme.backgrounds.light }}
    >
      <div className={cn(digilibTheme.spacing.container)}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={cn(digilibTheme.typography.h1, 'mb-6')}
            style={{ color: digilibTheme.text.lightBg }}
          >
            Real Results
          </h2>
          <p
            className={cn(digilibTheme.typography.body, 'mx-auto')}
            style={{
              color: digilibTheme.text.muted,
              maxWidth: '60ch',
            }}
          >
            Early adopters have won over $4M in grants using our AI-powered platform.
            Here's what they achieved.
          </p>
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="success-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Amount Badge */}
              <div
                className="inline-flex items-center px-4 py-2 rounded-full mb-6 font-bold text-white"
                style={{ backgroundColor: digilibTheme.stages.generate }}
              >
                {story.amount}
              </div>

              {/* Grant Type */}
              <div className="text-sm font-medium mb-4" style={{ color: digilibTheme.stages.discover }}>
                {story.grant}
              </div>

              {/* Testimonial */}
              <blockquote
                className={cn(digilibTheme.typography.body, 'mb-6 italic')}
                style={{ color: digilibTheme.text.lightBg }}
              >
                "{story.testimonial}"
              </blockquote>

              {/* Author */}
              <div className="mb-6">
                <div className="font-bold" style={{ color: digilibTheme.text.lightBg }}>
                  {story.author}
                </div>
                <div className="text-sm" style={{ color: digilibTheme.text.muted }}>
                  {story.role}, {story.company}
                </div>
              </div>

              {/* Metric */}
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-baseline gap-2">
                  <div
                    className="text-3xl font-bold"
                    style={{ color: digilibTheme.stages.analyze }}
                  >
                    {story.metric}
                  </div>
                  <div className="text-sm" style={{ color: digilibTheme.text.muted }}>
                    {story.metricLabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div
              className="text-5xl font-bold mb-2"
              style={{ color: digilibTheme.stages.profile }}
            >
              $4M+
            </div>
            <div className="text-sm" style={{ color: digilibTheme.text.muted }}>
              Total Funding Won
            </div>
          </div>
          <div>
            <div
              className="text-5xl font-bold mb-2"
              style={{ color: digilibTheme.stages.discover }}
            >
              42%
            </div>
            <div className="text-sm" style={{ color: digilibTheme.text.muted }}>
              Success Rate
            </div>
          </div>
          <div>
            <div
              className="text-5xl font-bold mb-2"
              style={{ color: digilibTheme.stages.generate }}
            >
              11 days
            </div>
            <div className="text-sm" style={{ color: digilibTheme.text.muted }}>
              Average Time to Submit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
