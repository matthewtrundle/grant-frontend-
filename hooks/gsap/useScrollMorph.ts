/**
 * useScrollMorph Hook
 *
 * Morphs elements (scale, opacity, transform) as you scroll.
 * Perfect for pulsing DNA nodes, morphing shapes, fade effects.
 *
 * Usage:
 * const ref = useScrollMorph({ scale: 1.2, opacity: 0.5 });
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollMorphOptions {
  scale?: number;
  opacity?: number;
  x?: number;
  y?: number;
  rotation?: number;
  duration?: number;
  scrub?: number | boolean;
  start?: string;
  end?: string;
}

export function useScrollMorph<T extends HTMLElement>(
  options: ScrollMorphOptions = {}
) {
  const {
    scale,
    opacity,
    x,
    y,
    rotation,
    scrub = 1,
    start = 'top center',
    end = 'bottom center',
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
      const animationProps: Record<string, any> = {
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
        },
      };

      if (scale !== undefined) animationProps.scale = scale;
      if (opacity !== undefined) animationProps.opacity = opacity;
      if (x !== undefined) animationProps.x = x;
      if (y !== undefined) animationProps.y = y;
      if (rotation !== undefined) animationProps.rotation = rotation;

      gsap.to(element, animationProps);
    });

    return () => ctx.revert();
  }, [scale, opacity, x, y, rotation, scrub, start, end]);

  return ref;
}
