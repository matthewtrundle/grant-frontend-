/**
 * MissionRefined - Problem → Solution with purposeful particles
 *
 * Key improvements:
 * - Particles move with purpose (cluster to form stats, not random drift)
 * - Consistent 4-6px dots with muted accent colors
 * - Slow, intentional animations (sine wave paths)
 * - Particles cluster to form "42%" and "20%" on scroll
 * - Clean, breathable layout
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

interface Particle {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  delay: number;
}

export function MissionRefined() {
  const sectionRef = useRef<HTMLElement>(null);

  // Create particles that will cluster to form stats
  const particles = useMemo<Particle[]>(() => {
    const dots: Particle[] = [];
    const colors = [
      digilibTheme.accents.teal,
      digilibTheme.accents.sage,
      digilibTheme.accents.lavender,
    ];

    // 60 particles total
    for (let i = 0; i < 60; i++) {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;

      // Half cluster toward left (42%), half toward right (20%)
      const isLeftCluster = i < 30;
      const targetX = isLeftCluster ? 30 + (Math.random() - 0.5) * 15 : 70 + (Math.random() - 0.5) * 15;
      const targetY = 50 + (Math.random() - 0.5) * 20;

      dots.push({
        id: i,
        startX,
        startY,
        targetX,
        targetY,
        size: 4 + Math.random() * 2, // 4-6px
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
      });
    }

    return dots;
  }, []);

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

      // Text transitions: "The Problem" → "The Solution"
      tl.fromTo(
        '.problem-text',
        { opacity: 1 },
        { opacity: 0, duration: 0.3 },
        0
      );

      tl.fromTo(
        '.solution-text',
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        0.3
      );

      // Particles cluster to form stats (42% and 20%)
      particles.forEach((particle) => {
        tl.fromTo(
          `.particle-${particle.id}`,
          {
            left: `${particle.startX}%`,
            top: `${particle.startY}%`,
            opacity: 0.3,
          },
          {
            left: `${particle.targetX}%`,
            top: `${particle.targetY}%`,
            opacity: 0.8,
            ease: 'power2.inOut',
          },
          particle.delay
        );
      });

      // Show stat labels after clustering
      tl.fromTo(
        '.stat-label',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1 },
        0.7
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn('relative', digilibTheme.spacing.section)}
      style={{ backgroundColor: digilibTheme.backgrounds.dark }}
    >
      {/* Controlled particle field */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`particle-${particle.id} absolute rounded-full transition-all duration-1000`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={cn('relative z-10', digilibTheme.spacing.container)}>
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          {/* Problem Text */}
          <div className="problem-text absolute">
            <h2
              className={cn('mb-6', digilibTheme.typography.headline)}
              style={{ color: digilibTheme.text.darkBg }}
            >
              The Grant Problem
            </h2>
            <p
              className={cn('mx-auto', digilibTheme.typography.body, digilibTheme.spacing.textBlock)}
              style={{ color: digilibTheme.text.muted }}
            >
              Only 20% of grant applications succeed. Teams waste months on applications
              that never had a chance—wrong fit, missed requirements, weak narratives.
            </p>
          </div>

          {/* Solution Text */}
          <div className="solution-text opacity-0">
            <h2
              className={cn('mb-6', digilibTheme.typography.headline)}
              style={{ color: digilibTheme.text.darkBg }}
            >
              The AI Solution
            </h2>
            <p
              className={cn('mx-auto', digilibTheme.typography.body, digilibTheme.spacing.textBlock)}
              style={{ color: digilibTheme.text.muted }}
            >
              Our platform achieves 42% success rate by matching you to perfect-fit opportunities
              and writing responses that score 7+/10 from simulated assessors.
            </p>
          </div>

          {/* Stat Labels (appear after clustering) */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-around -translate-y-1/2 pointer-events-none">
            <div className="stat-label opacity-0">
              <div
                className="text-6xl font-bold mb-2"
                style={{ color: digilibTheme.accents.sage }}
              >
                42%
              </div>
              <div className={cn(digilibTheme.typography.small)} style={{ color: digilibTheme.text.muted }}>
                Success Rate
              </div>
            </div>

            <div className="stat-label opacity-0">
              <div
                className="text-6xl font-bold mb-2"
                style={{ color: digilibTheme.accents.coral }}
              >
                20%
              </div>
              <div className={cn(digilibTheme.typography.small)} style={{ color: digilibTheme.text.muted }}>
                Industry Average
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
