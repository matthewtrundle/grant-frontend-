/**
 * Glassmorphic Light Bulbs Component
 *
 * Apple-style floating light bulbs with glassmorphic aesthetics.
 * Creates a fantastical sunset scene with warm glowing orbs.
 *
 * Usage:
 * <GlassmorphicBulbs count={12} colors={['orange', 'red', 'pink']} />
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface GlassmorphicBulbsProps {
  count?: number;
  colors?: Array<'orange' | 'red' | 'pink' | 'amber' | 'rose'>;
  className?: string;
}

const colorStyles = {
  orange: {
    background: 'radial-gradient(circle at 30% 30%, rgba(251, 146, 60, 0.8), rgba(249, 115, 22, 0.4))',
    boxShadow: '0 0 60px rgba(251, 146, 60, 0.6), 0 0 100px rgba(249, 115, 22, 0.4), inset 0 0 30px rgba(255, 200, 100, 0.3)',
    border: '1px solid rgba(251, 146, 60, 0.3)',
  },
  red: {
    background: 'radial-gradient(circle at 30% 30%, rgba(248, 113, 113, 0.8), rgba(239, 68, 68, 0.4))',
    boxShadow: '0 0 60px rgba(248, 113, 113, 0.6), 0 0 100px rgba(239, 68, 68, 0.4), inset 0 0 30px rgba(255, 180, 180, 0.3)',
    border: '1px solid rgba(248, 113, 113, 0.3)',
  },
  pink: {
    background: 'radial-gradient(circle at 30% 30%, rgba(244, 114, 182, 0.8), rgba(236, 72, 153, 0.4))',
    boxShadow: '0 0 60px rgba(244, 114, 182, 0.6), 0 0 100px rgba(236, 72, 153, 0.4), inset 0 0 30px rgba(255, 200, 220, 0.3)',
    border: '1px solid rgba(244, 114, 182, 0.3)',
  },
  amber: {
    background: 'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.8), rgba(245, 158, 11, 0.4))',
    boxShadow: '0 0 60px rgba(251, 191, 36, 0.6), 0 0 100px rgba(245, 158, 11, 0.4), inset 0 0 30px rgba(255, 220, 120, 0.3)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
  },
  rose: {
    background: 'radial-gradient(circle at 30% 30%, rgba(251, 113, 133, 0.8), rgba(244, 63, 94, 0.4))',
    boxShadow: '0 0 60px rgba(251, 113, 133, 0.6), 0 0 100px rgba(244, 63, 94, 0.4), inset 0 0 30px rgba(255, 180, 200, 0.3)',
    border: '1px solid rgba(251, 113, 133, 0.3)',
  },
};

export function GlassmorphicBulbs({
  count = 12,
  colors = ['orange', 'red', 'pink', 'amber'],
  className,
}: GlassmorphicBulbsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bulbsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      bulbsRef.current.forEach((bulb, index) => {
        if (!bulb) return;

        // Random size for variety
        const size = gsap.utils.random(60, 180);
        bulb.style.width = `${size}px`;
        bulb.style.height = `${size}px`;

        // Initial position
        gsap.set(bulb, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          scale: gsap.utils.random(0.7, 1),
        });

        // Floating animation with slight rotation
        gsap.to(bulb, {
          x: `+=${gsap.utils.random(-150, 150)}`,
          y: `+=${gsap.utils.random(-150, 150)}`,
          rotation: gsap.utils.random(-15, 15),
          scale: gsap.utils.random(0.8, 1.2),
          duration: gsap.utils.random(10, 18),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.3,
        });

        // Pulsing glow effect
        gsap.to(bulb, {
          opacity: gsap.utils.random(0.5, 0.9),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
    >
      {Array.from({ length: count }).map((_, index) => {
        const colorKey = colors[index % colors.length];
        const style = colorStyles[colorKey];

        return (
          <div
            key={index}
            ref={(el) => {
              if (el) bulbsRef.current[index] = el;
            }}
            className="absolute rounded-full opacity-70"
            style={{
              left: `${(index / count) * 100}%`,
              top: `${Math.random() * 100}%`,
              backdropFilter: 'blur(20px)',
              ...style,
            }}
          />
        );
      })}
    </div>
  );
}
