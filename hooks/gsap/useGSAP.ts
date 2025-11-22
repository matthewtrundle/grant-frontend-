/**
 * useGSAP Hook - Proper GSAP integration for React/Next.js
 *
 * Based on best practices from:
 * - @gsap/react official package
 * - GSAP community forums
 * - Next.js GSAP boilerplates
 *
 * Features:
 * - Automatic cleanup with gsap.context()
 * - useLayoutEffect for sync rendering
 * - Dependency tracking
 * - Reduced motion support
 */

'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type UseGSAPOptions = {
  scope?: React.RefObject<HTMLElement>;
  dependencies?: any[];
  revertOnUpdate?: boolean;
};

/**
 * Custom GSAP hook for React components
 *
 * Usage:
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 *
 * useGSAP(() => {
 *   gsap.to('.box', { x: 100, rotation: 360 });
 * }, { scope: containerRef });
 * ```
 */
export function useGSAP(
  callback: () => void | (() => void),
  options: UseGSAPOptions = {}
) {
  const { scope, dependencies = [], revertOnUpdate = true } = options;

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      // Skip animations if user prefers reduced motion
      return;
    }

    // Create GSAP context for automatic cleanup
    const ctx = gsap.context(() => {
      callback();
    }, scope?.current || undefined);

    // Cleanup function
    return () => {
      if (revertOnUpdate) {
        ctx.revert(); // Removes all animations and restores state
      } else {
        ctx.kill(); // Just kills the animations without reverting
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
