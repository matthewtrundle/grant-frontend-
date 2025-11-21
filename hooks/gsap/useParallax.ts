/**
 * useParallax Hook
 *
 * Creates multi-layer parallax effects with different scroll speeds.
 * Background layers move slower, creating depth.
 *
 * Usage:
 * const ref = useParallax({ speed: 0.5 }); // Moves at 50% scroll speed
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxOptions {
  speed?: number;     // Parallax speed multiplier (0.1 = slow, 1 = normal, 2 = fast)
  direction?: 'y' | 'x'; // Direction of movement (default: 'y')
  start?: string;     // Start position
  end?: string;       // End position
}

export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {}
) {
  const {
    speed = 0.5,
    direction = 'y',
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Calculate movement distance based on viewport height
      const movement = window.innerHeight * speed;

      gsap.to(element, {
        [direction]: movement,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed, direction, start, end]);

  return ref;
}
