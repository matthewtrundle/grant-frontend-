/**
 * ContactCTA - Final call-to-action section
 *
 * Clinical medical SaaS aesthetic
 * Features:
 * - Subtle gradient background
 * - Centered headline and CTAs
 * - Clean, professional design
 * - Trust signals
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';

export function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Set initial states - visible by default
      gsap.set('.cta-content', { opacity: 1, y: 0 });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-fundaid-section-accent"
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #E5E7EB 1px, transparent 1px),
              linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Soft blue accent gradient - very subtle */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 50%, #1446A015 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, #1BA39C10 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="cta-content text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-fundaid-text-primary mb-8 tracking-tight"
          >
            Ready to Win Your Next Grant?
          </h2>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-fundaid-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            From company profile to submitted application in under 14 days.
            Join the researchers winning millions with AI-powered grant automation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <Link
              href="/auth/sign-up"
              className="group relative px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 shadow-fundaid-md hover:shadow-fundaid-lg bg-fundaid-accent-primary text-white"
            >
              Start Your Free Profile
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-0.5 border-2 border-fundaid-accent-primary text-fundaid-accent-primary bg-white hover:shadow-fundaid-md"
            >
              View Pricing
            </Link>
          </div>

          {/* Trust Signal */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-fundaid-text-muted">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-fundaid-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-fundaid-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>5-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-fundaid-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>42% success rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
