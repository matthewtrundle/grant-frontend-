/**
 * useStaggerReveal Hook
 *
 * Creates staggered reveal animations for multiple child elements using GSAP.
 * Children animate in sequence with a configurable delay between each.
 *
 * @example
 * ```tsx
 * const containerRef = useStaggerReveal('.card', { stagger: 0.15 });
 *
 * return (
 *   <div ref={containerRef}>
 *     <div className="card">Card 1</div>
 *     <div className="card">Card 2</div>
 *     <div className="card">Card 3</div>
 *   </div>
 * );
 * ```
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface StaggerRevealOptions {
  /**
   * Delay between each child animation in seconds (default: 0.15)
   */
  stagger?: number;
  /**
   * Starting state for children
   */
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  /**
   * Animation duration in seconds (default: 0.6)
   */
  duration?: number;
  /**
   * GSAP easing function (default: 'power2.out')
   */
  ease?: string;
  /**
   * ScrollTrigger start position (default: 'top 75%')
   */
  start?: string;
  /**
   * Whether to play animation only once (default: true)
   */
  once?: boolean;
}

/**
 * Hook for staggered reveal animations of child elements
 *
 * @param childSelector - CSS selector for child elements to animate (e.g., '.card', '> div')
 * @param options - Animation configuration options
 * @returns Ref to attach to the container element
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  childSelector: string,
  options: StaggerRevealOptions = {}
): React.RefObject<T> {
  const {
    stagger = 0.15,
    from = { opacity: 0, y: 30 },
    duration = 0.6,
    ease = 'power2.out',
    start = 'top 75%',
    once = true,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (children.length === 0) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Show all children immediately
      gsap.set(children, { opacity: 1 });
      return;
    }

    const animation = gsap.fromTo(
      children,
      from,
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        ease,
        stagger: {
          each: stagger,
          from: 'start',
        },
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) {
          st.kill();
        }
      });
    };
  }, [childSelector, stagger, from, duration, ease, start, once]);

  return ref;
}
