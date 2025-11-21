/**
 * usePinnedSection Hook
 *
 * Pins a section while scroll-scrubbed animations play.
 * Based on GSAP ScrollTrigger pinning best practices.
 *
 * Features:
 * - Section pinning during scroll
 * - Scrubbed timeline animations
 * - Automatic cleanup
 * - Premium easing curves
 *
 * Usage:
 * ```tsx
 * const sectionRef = usePinnedSection({
 *   onEnter: (tl) => {
 *     tl.to('.element', { opacity: 1, y: 0 })
 *       .to('.other', { scale: 1.2 }, '<50%');
 *   },
 *   duration: '100%',
 *   scrub: 1,
 * });
 * ```
 */

'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from './useGSAP';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PinnedSectionOptions {
  onEnter?: (timeline: gsap.core.Timeline) => void;
  pin?: boolean;
  pinSpacing?: boolean;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  markers?: boolean;
  anticipatePin?: number;
}

export function usePinnedSection<T extends HTMLElement>(
  options: PinnedSectionOptions = {}
) {
  const {
    onEnter,
    pin = true,
    pinSpacing = true,
    scrub = 1,
    start = 'top top',
    end = '+=100%',
    markers = false,
    anticipatePin = 1,
  } = options;

  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !onEnter) return;

      // Create timeline with premium easing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start,
          end,
          pin,
          pinSpacing,
          scrub,
          markers,
          anticipatePin,
          // Invalidate on refresh for responsive behavior
          invalidateOnRefresh: true,
        },
        defaults: {
          ease: 'power2.out',
          duration: 1,
        },
      });

      // Run user-defined animations
      onEnter(tl);

      return () => {
        tl.kill();
      };
    },
    { scope: ref }
  );

  return ref;
}
