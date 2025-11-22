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
import { fundaidTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotGridPattern, CornerBrackets, ConnectingLine, TechLines } from '@/components/ui/decorative-elements';

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

      // Set initial states for progressive reveal
      gsap.set('.success-header', { opacity: 0, y: 40 });
      gsap.set('.success-card', { opacity: 0, y: 40 });
      gsap.set('.summary-stat', { opacity: 0, y: 30 });

      // Progressive reveal: header first with smooth entrance
      gsap.fromTo('.success-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none none',
            // markers: true, // Uncomment for debugging
          }
        }
      );

      // Then stagger in success cards with smooth progression
      gsap.fromTo('.success-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          stagger: 0.15, // Progressive reveal
          scrollTrigger: {
            trigger: '.success-grid',
            start: 'top 65%',
            toggleActions: 'play none none none',
            // markers: true, // Uncomment for debugging
          }
        }
      );

      // Summary stats reveal with slight delay
      gsap.fromTo('.summary-stat',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.summary-stats',
            start: 'top 70%',
            toggleActions: 'play none none none',
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: fundaidTheme.backgrounds.page }}
    >
      {/* Background dot grid for depth */}
      <DotGridPattern
        color={fundaidTheme.text.muted}
        dotSize={1.5}
        spacing={50}
        opacity={0.1}
      />

      {/* Tech lines for visual interest */}
      <TechLines
        className="top-20 left-0 w-full"
        orientation="horizontal"
        count={3}
        spacing={60}
        color={fundaidTheme.accents.teal}
        opacity={0.08}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="success-header text-center mb-16">
          <h2
            className={cn(fundaidTheme.typography.h1, 'mb-6')}
            style={{ color: fundaidTheme.text.main }}
          >
            Real Results
          </h2>
          <p
            className={cn(fundaidTheme.typography.body, 'mx-auto')}
            style={{
              color: fundaidTheme.text.muted,
              maxWidth: '60ch',
            }}
          >
            Early adopters have won over $4M in grants using our AI-powered platform.
            Here's what they achieved.
          </p>
        </div>

        {/* Success Stories Grid */}
        <div className="success-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="success-card relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Corner brackets for each card */}
              <CornerBrackets
                color={fundaidTheme.accents.teal}
                size={20}
                strokeWidth={1.5}
                opacity={0.3}
              />
              {/* Amount Badge */}
              <div
                className="inline-flex items-center px-4 py-2 rounded-full mb-6 font-bold text-white"
                style={{ backgroundColor: fundaidTheme.accents.teal }}
              >
                {story.amount}
              </div>

              {/* Grant Type */}
              <div className="text-sm font-medium mb-4" style={{ color: fundaidTheme.accents.lavender }}>
                {story.grant}
              </div>

              {/* Testimonial */}
              <blockquote
                className={cn(fundaidTheme.typography.body, 'mb-6 italic')}
                style={{ color: fundaidTheme.text.main }}
              >
                "{story.testimonial}"
              </blockquote>

              {/* Author */}
              <div className="mb-6">
                <div className="font-bold" style={{ color: fundaidTheme.text.main }}>
                  {story.author}
                </div>
                <div className="text-sm" style={{ color: fundaidTheme.text.muted }}>
                  {story.role}, {story.company}
                </div>
              </div>

              {/* Metric */}
              <div className="border-t pt-6" style={{ borderColor: fundaidTheme.text.muted, borderOpacity: 0.2 }}>
                <div className="flex items-baseline gap-2">
                  <div
                    className="text-3xl font-bold"
                    style={{ color: fundaidTheme.accents.coral }}
                  >
                    {story.metric}
                  </div>
                  <div className="text-sm" style={{ color: fundaidTheme.text.muted, opacity: 0.6 }}>
                    {story.metricLabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="summary-stats mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="summary-stat">
            <div
              className="text-5xl font-bold mb-2"
              style={{ color: fundaidTheme.accents.teal }}
            >
              $4M+
            </div>
            <div className="text-sm" style={{ color: fundaidTheme.text.muted, opacity: 0.6 }}>
              Total Funding Won
            </div>
          </div>
          <div className="summary-stat">
            <div
              className="text-5xl font-bold mb-2"
              style={{ color: fundaidTheme.accents.lavender }}
            >
              42%
            </div>
            <div className="text-sm" style={{ color: fundaidTheme.text.muted, opacity: 0.6 }}>
              Success Rate
            </div>
          </div>
          <div className="summary-stat">
            <div
              className="text-5xl font-bold mb-2"
              style={{ color: fundaidTheme.accents.teal }}
            >
              11 days
            </div>
            <div className="text-sm" style={{ color: fundaidTheme.text.muted, opacity: 0.6 }}>
              Average Time to Submit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
