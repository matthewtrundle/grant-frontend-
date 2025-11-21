/**
 * useScrollRotation Hook
 *
 * Rotates elements continuously as user scrolls.
 * Perfect for DNA helixes, geometric shapes, and background elements.
 *
 * Usage:
 * const ref = useScrollRotation({ rotation: 360, scrub: 1 });
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRotationOptions {
  rotation?: number;        // Total rotation in degrees (default: 360)
  scrub?: number | boolean; // Scroll scrub amount (default: 1)
  start?: string;           // Start position (default: "top bottom")
  end?: string;             // End position (default: "bottom top")
  markers?: boolean;        // Show debug markers (default: false)
}

export function useScrollRotation<T extends HTMLElement>(
  options: ScrollRotationOptions = {}
) {
  const {
    rotation = 360,
    scrub = 1,
    start = 'top bottom',
    end = 'bottom top',
    markers = false,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        rotation,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
          markers,
        },
      });
    });

    return () => ctx.revert();
  }, [rotation, scrub, start, end, markers]);

  return ref;
}
