/**
 * useScrollReveal Hook
 *
 * Simple scroll-triggered reveal animation using GSAP ScrollTrigger.
 * Elements fade in and slide up when they enter the viewport.
 *
 * @example
 * ```tsx
 * const titleRef = useScrollReveal();
 * return <h2 ref={titleRef}>Animated Title</h2>;
 * ```
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealOptions {
  /**
   * Starting opacity (default: 0)
   */
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  /**
   * Animation duration in seconds (default: 0.8)
   */
  duration?: number;
  /**
   * GSAP easing function (default: 'power3.out')
   */
  ease?: string;
  /**
   * ScrollTrigger start position (default: 'top 80%')
   */
  start?: string;
  /**
   * ScrollTrigger end position (default: 'top 50%')
   */
  end?: string;
  /**
   * Delay before animation starts in seconds (default: 0)
   */
  delay?: number;
  /**
   * Whether to play animation only once (default: true)
   */
  once?: boolean;
}

/**
 * Hook for scroll-triggered reveal animations
 *
 * @param options - Animation configuration options
 * @returns Ref to attach to the element
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): React.RefObject<T> {
  const {
    from = { opacity: 0, y: 40 },
    duration = 0.8,
    ease = 'power3.out',
    start = 'top 80%',
    end = 'top 50%',
    delay = 0,
    once = true,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Skip animation, just show the element
      gsap.set(element, { opacity: 1 });
      return;
    }

    const animation = gsap.fromTo(
      element,
      from,
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) {
          st.kill();
        }
      });
    };
  }, [from, duration, ease, start, end, delay, once]);

  return ref;
}
