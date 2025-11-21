/**
 * useScrollCounter Hook
 *
 * Animates a number from 0 to a target value when it enters the viewport.
 * Perfect for impact statistics, metrics, and KPI displays.
 *
 * @example
 * ```tsx
 * const counterRef = useScrollCounter(100, '+', 0);
 * return <div ref={counterRef} className="text-6xl">0+</div>;
 * ```
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollCounterOptions {
  /**
   * Target value to count to
   */
  targetValue: number;
  /**
   * Suffix to append after number (e.g., '+', '%', 'K')
   */
  suffix?: string;
  /**
   * Prefix to prepend before number (e.g., '$')
   */
  prefix?: string;
  /**
   * Number of decimal places (default: 0)
   */
  decimals?: number;
  /**
   * Animation duration in seconds (default: 2)
   */
  duration?: number;
  /**
   * GSAP easing function (default: 'power3.out')
   */
  ease?: string;
  /**
   * ScrollTrigger start position (default: 'top 70%')
   */
  start?: string;
  /**
   * Custom formatter function (overrides prefix/suffix)
   */
  formatter?: (value: number) => string;
}

/**
 * Hook for scroll-triggered number counter animations
 *
 * @param options - Counter configuration options
 * @returns Ref to attach to the counter element
 */
export function useScrollCounter<T extends HTMLElement = HTMLDivElement>(
  options: ScrollCounterOptions
): React.RefObject<T> {
  const {
    targetValue,
    suffix = '',
    prefix = '',
    decimals = 0,
    duration = 2,
    ease = 'power3.out',
    start = 'top 70%',
    formatter,
  } = options;

  const ref = useRef<T>(null);
  const counterRef = useRef({ value: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Show final value immediately
      if (formatter) {
        element.textContent = formatter(targetValue);
      } else {
        element.textContent = `${prefix}${targetValue.toFixed(decimals)}${suffix}`;
      }
      return;
    }

    const animation = gsap.to(counterRef.current, {
      value: targetValue,
      duration,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (element) {
          const currentValue = counterRef.current.value;
          if (formatter) {
            element.textContent = formatter(currentValue);
          } else {
            element.textContent = `${prefix}${currentValue.toFixed(decimals)}${suffix}`;
          }
        }
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) {
          st.kill();
        }
      });
    };
  }, [targetValue, suffix, prefix, decimals, duration, ease, start, formatter]);

  return ref;
}

/**
 * Utility: Format number with K, M, B suffixes
 */
export function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toFixed(0);
}
