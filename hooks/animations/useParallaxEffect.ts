/**
 * useParallaxEffect Hook
 *
 * Creates a parallax scrolling effect where elements move at different speeds
 * to create a sense of depth.
 *
 * @example
 * ```tsx
 * const bgRef = useParallaxEffect(0.3);     // Slow background
 * const midRef = useParallaxEffect(0.6);    // Medium layer
 * const fgRef = useParallaxEffect(1.0);     // Normal foreground
 *
 * return (
 *   <div>
 *     <div ref={bgRef} className="bg-layer" />
 *     <div ref={midRef} className="mid-layer" />
 *     <div ref={fgRef} className="fg-layer" />
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

export interface ParallaxOptions {
  /**
   * Scroll speed multiplier (default: 0.5)
   * 0.0 = no movement, 1.0 = normal scroll speed, >1.0 = faster than scroll
   */
  speed?: number;
  /**
   * Direction of parallax movement (default: 'vertical')
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * Enable smooth scrubbing (default: true)
   */
  scrub?: boolean | number;
}

/**
 * Hook for creating parallax scroll effects
 *
 * @param speed - Scroll speed multiplier (0-1 for slower, >1 for faster)
 * @param options - Additional configuration options
 * @returns Ref to attach to the parallax element
 */
export function useParallaxEffect<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.5,
  options: Omit<ParallaxOptions, 'speed'> = {}
): React.RefObject<T> {
  const {
    direction = 'vertical',
    scrub = true,
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
      // Skip parallax effect
      return;
    }

    const yPercent = direction === 'vertical' ? speed * 100 : 0;
    const xPercent = direction === 'horizontal' ? speed * 100 : 0;

    const animation = gsap.to(element, {
      yPercent: yPercent,
      xPercent: xPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: scrub,
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
  }, [speed, direction, scrub]);

  return ref;
}
