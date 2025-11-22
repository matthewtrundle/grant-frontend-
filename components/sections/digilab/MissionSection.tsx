/**
 * MissionSection - The Grant Problem → Solution
 *
 * Features:
 * - Pinned text over animated grant visualization
 * - Dots representing grants (red = failed, green = funded)
 * - Transition from problem to solution
 * - Parallax background movement
 */

'use client';

import { useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { digilibTheme } from '@/lib/digilab-theme';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GrantDot {
  x: number;
  y: number;
  size: number;
  status: 'failed' | 'funded';
  delay: number;
}

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  // Generate random grant dots
  const grantDots = useMemo(() => {
    const dots: GrantDot[] = [];
    const totalDots = 100;
    const fundedRatio = 0.2; // 20% get funded

    for (let i = 0; i < totalDots; i++) {
      dots.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 8,
        status: Math.random() < fundedRatio ? 'funded' : 'failed',
        delay: Math.random() * 2,
      });
    }

    return dots;
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Create pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
        },
      });

      // Parallax dots background
      tl.fromTo(
        '.grant-dots',
        { yPercent: 0 },
        { yPercent: -20, ease: 'none' },
        0
      );

      // Fade out problem statement
      tl.fromTo(
        '.problem-text',
        { opacity: 1, y: 0 },
        { opacity: 0, y: -50, ease: 'power2.in' },
        0
      );

      // Animate failed grants fading
      tl.to(
        '.grant-dot-failed',
        {
          opacity: 0.1,
          scale: 0.5,
          stagger: { each: 0.01, from: 'random' },
          ease: 'power2.in',
        },
        0.3
      );

      // Animate funded grants growing
      tl.to(
        '.grant-dot-funded',
        {
          scale: 1.5,
          opacity: 1,
          stagger: { each: 0.02, from: 'center' },
          ease: 'back.out(2)',
        },
        0.5
      );

      // Fade in solution statement
      tl.fromTo(
        '.solution-text',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.6
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn('relative min-h-screen', 'flex items-center justify-center', 'overflow-hidden')}
      style={{ backgroundColor: digilibTheme.backgrounds.accent }}
    >
      {/* Subtle gradient overlay bridging hero to timeline */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-amber-500/5 pointer-events-none z-0" />

      {/* Animated Grant Dots Background */}
      <div
        ref={dotsRef}
        className="grant-dots absolute inset-0 z-0"
      >
        {grantDots.map((dot, i) => (
          <div
            key={i}
            className={cn(
              'grant-dot absolute rounded-full',
              dot.status === 'failed' ? 'grant-dot-failed' : 'grant-dot-funded'
            )}
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.status === 'failed' ? '#EF4444' : '#F59E0B',  // Changed funded to amber
              opacity: dot.status === 'failed' ? 0.4 : 0.6,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Problem Statement */}
        <div className="problem-text">
          <h2
            className={cn(digilibTheme.typography.h1, 'mb-6')}
            style={{ color: digilibTheme.text.lightBg }}
          >
            The Grant Problem
          </h2>
          <p
            className={cn(
              digilibTheme.typography.body,
              digilibTheme.spacing.textBlock,
              'mx-auto text-2xl md:text-3xl font-medium leading-relaxed'
            )}
            style={{ color: digilibTheme.text.muted }}
          >
            Researchers spend <span className="text-red-600 font-bold">40% of their time</span> on
            grant applications.
            <br />
            Only <span className="text-red-600 font-bold">20% get funded</span>.
          </p>
        </div>

        {/* Solution Statement (Initially hidden) */}
        <div className="solution-text opacity-0">
          <h2
            className={cn(digilibTheme.typography.h1, 'mb-6')}
            style={{ color: digilibTheme.text.lightBg }}
          >
            We're Changing That
          </h2>
          <p
            className={cn(
              digilibTheme.typography.body,
              digilibTheme.spacing.textBlock,
              'mx-auto text-2xl md:text-3xl font-medium leading-relaxed'
            )}
            style={{ color: digilibTheme.text.muted }}
          >
            With <span className="text-amber-600 font-bold">AI-driven precision</span>, we help
            you craft winning applications
            <br />
            and <span className="text-amber-600 font-bold">increase your success rate by 40%</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
