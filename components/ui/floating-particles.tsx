/**
 * Floating Particles Component
 *
 * Molecular nodes that scatter and reform based on scroll position.
 * Uses GSAP for smooth, physics-based movement.
 *
 * Usage:
 * <FloatingParticles count={20} color="teal" scrollInteractive />
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FloatingParticlesProps {
  count?: number;              // Number of particles (default: 15)
  color?: 'teal' | 'green' | 'blue' | 'gray';
  scrollInteractive?: boolean; // React to scroll position
  className?: string;
}

const colorClasses = {
  teal: 'bg-dna-teal',
  green: 'bg-dna-green',
  blue: 'bg-bio-blue',
  gray: 'bg-gray-400',
};

export function FloatingParticles({
  count = 15,
  color = 'teal',
  scrollInteractive = true,
  className,
}: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Initial floating animation for each particle
      particlesRef.current.forEach((particle, index) => {
        if (!particle) return;

        // Random starting position
        gsap.set(particle, {
          x: gsap.utils.random(-50, 50),
          y: gsap.utils.random(-50, 50),
          scale: gsap.utils.random(0.5, 1.5),
        });

        // Continuous floating animation
        gsap.to(particle, {
          x: `+=${gsap.utils.random(-100, 100)}`,
          y: `+=${gsap.utils.random(-100, 100)}`,
          duration: gsap.utils.random(8, 15),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });

        // Scroll-driven scatter effect
        if (scrollInteractive) {
          gsap.to(particle, {
            x: `+=${gsap.utils.random(-200, 200)}`,
            y: `+=${gsap.utils.random(-150, 150)}`,
            opacity: gsap.utils.random(0.3, 1),
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 2,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [count, scrollInteractive]);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) particlesRef.current[index] = el;
          }}
          className={cn(
            'absolute w-2 h-2 rounded-full',
            colorClasses[color],
            'opacity-40'
          )}
          style={{
            left: `${(index / count) * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
