/**
 * useHorizontalScroll Hook
 *
 * Creates a horizontal scrolling effect where content scrolls sideways
 * as the user scrolls vertically. Perfect for timelines, galleries, and
 * multi-step sequences.
 *
 * Pattern: Section pins while inner content translates horizontally.
 *
 * @example
 * ```tsx
 * const { containerRef, scrollerRef } = useHorizontalScroll(4);
 *
 * return (
 *   <section ref={containerRef} className="h-screen overflow-hidden">
 *     <div ref={scrollerRef} className="flex w-max h-full">
 *       <StageCard number={1} />
 *       <StageCard number={2} />
 *       <StageCard number={3} />
 *       <StageCard number={4} />
 *     </div>
 *   </section>
 * );
 * ```
 */

import { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HorizontalScrollOptions {
  /**
   * Number of items to scroll through (determines pin duration)
   */
  itemCount: number;
  /**
   * Smooth scrubbing delay (default: 1)
   */
  scrub?: number | boolean;
  /**
   * Spacing between items in pixels (default: 0)
   */
  spacing?: number;
  /**
   * Show debug markers (default: false)
   */
  markers?: boolean;
}

export interface UseHorizontalScrollReturn {
  containerRef: MutableRefObject<HTMLElement | null>;
  scrollerRef: MutableRefObject<HTMLDivElement | null>;
}

/**
 * Hook for creating horizontal scroll animations
 *
 * @param options - Configuration options
 * @returns Object with containerRef and scrollerRef
 */
export function useHorizontalScroll(
  options: HorizontalScrollOptions
): UseHorizontalScrollReturn {
  const { itemCount, scrub = 1, spacing = 0, markers = false } = options;

  const containerRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;

    if (!container || !scroller) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Show all items without animation
      // User can scroll horizontally normally
      return;
    }

    // Calculate scroll distance
    // scrollWidth - window width gives us how far to scroll
    const scrollWidth = scroller.scrollWidth - window.innerWidth;

    // Create horizontal scroll animation
    const animation = gsap.to(scroller, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${itemCount * window.innerHeight}`, // Pin for N viewports
        pin: true,
        scrub: scrub,
        anticipatePin: 1,
        invalidateOnRefresh: true, // Recalculate on window resize
        markers: markers && process.env.NODE_ENV === 'development',
      },
    });

    // Cleanup
    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) {
          st.kill();
        }
      });
    };
  }, [itemCount, scrub, spacing, markers]);

  return { containerRef, scrollerRef };
}
