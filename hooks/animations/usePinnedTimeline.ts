/**
 * usePinnedTimeline Hook
 *
 * Creates a GSAP timeline that pins a section while scrolling through it.
 * Perfect for hero sections and multi-step scroll sequences.
 *
 * @example
 * ```tsx
 * const { containerRef, timeline } = usePinnedTimeline({ duration: 1 });
 *
 * useEffect(() => {
 *   if (!timeline) return;
 *   timeline
 *     .fromTo('.title', { scale: 0.9 }, { scale: 1.05, duration: 0.5 })
 *     .fromTo('.subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2');
 * }, [timeline]);
 * ```
 */

import { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface PinnedTimelineOptions {
  /**
   * Whether to pin the section (default: true)
   */
  pin?: boolean;
  /**
   * Smooth scrubbing delay (0 = instant, 1 = 1s lag) (default: 1)
   */
  scrub?: number | boolean;
  /**
   * Whether to add spacing after pinned section (default: true)
   */
  pinSpacing?: boolean;
  /**
   * Duration in viewport heights (default: 1)
   * 1 = pins for one full scroll of viewport height
   * 2 = pins for two full scrolls, etc.
   */
  duration?: number;
  /**
   * ScrollTrigger start position (default: 'top top')
   */
  start?: string;
  /**
   * Markers for debugging (default: false)
   */
  markers?: boolean;
}

export interface UsePinnedTimelineReturn {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  timeline: gsap.core.Timeline | null;
}

/**
 * Hook for creating pinned scroll timelines
 *
 * @param options - Configuration options
 * @returns Object with containerRef and timeline
 */
export function usePinnedTimeline(
  options: PinnedTimelineOptions = {}
): UsePinnedTimelineReturn {
  const {
    pin = true,
    scrub = 1,
    pinSpacing = true,
    duration = 1,
    start = 'top top',
    markers = false,
  } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Skip pinned timeline, just show content
      gsap.set(container, { opacity: 1 });
      return;
    }

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        end: `+=${duration * window.innerHeight}`,
        pin: pin,
        scrub: scrub,
        pinSpacing: pinSpacing,
        anticipatePin: 1,
        markers: markers && process.env.NODE_ENV === 'development',
      },
    });

    timelineRef.current = tl;

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) {
          st.kill();
        }
      });
    };
  }, [pin, scrub, pinSpacing, duration, start, markers]);

  return {
    containerRef,
    timeline: timelineRef.current,
  };
}
