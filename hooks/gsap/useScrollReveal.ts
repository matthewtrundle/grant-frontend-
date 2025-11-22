/**
 * useScrollReveal - Custom hook for smooth scroll-based reveal animations
 *
 * Features:
 * - Progressive reveal animations
 * - Staggered children animations
 * - Customizable easing and duration
 * - Clean ScrollTrigger management
 */

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  toggleActions?: string;
  duration?: number;
  ease?: string;
  stagger?: number | gsap.StaggerVars;
  y?: number;
  opacity?: number;
  markers?: boolean;
}

export function useScrollReveal(
  selector: string,
  options: ScrollRevealOptions = {},
  dependencies: any[] = []
) {
  useLayoutEffect(() => {
    const {
      trigger = selector,
      start = 'top 65%',
      end = undefined,
      toggleActions = 'play none none none',
      duration = 1.2,
      ease = 'power2.out',
      stagger = 0.15,
      y = 40,
      opacity = 0,
      markers = false,
    } = options;

    // Set initial state
    gsap.set(selector, {
      opacity,
      y,
    });

    // Create the animation
    const animation = gsap.fromTo(
      selector,
      {
        opacity,
        y,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger,
          start,
          end,
          toggleActions,
          markers,
        },
      }
    );

    // Cleanup
    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === selector) {
          trigger.kill();
        }
      });
    };
  }, dependencies);
}

// Batch reveal multiple selectors with different options
export function useScrollReveals(
  reveals: Array<{ selector: string; options?: ScrollRevealOptions }>,
  dependencies: any[] = []
) {
  useLayoutEffect(() => {
    const animations: gsap.core.Tween[] = [];
    const triggers: ScrollTrigger[] = [];

    reveals.forEach(({ selector, options = {} }) => {
      const {
        trigger = selector,
        start = 'top 65%',
        end = undefined,
        toggleActions = 'play none none none',
        duration = 1.2,
        ease = 'power2.out',
        stagger = 0.15,
        y = 40,
        opacity = 0,
        markers = false,
      } = options;

      // Set initial state
      gsap.set(selector, {
        opacity,
        y,
      });

      // Create the animation
      const animation = gsap.fromTo(
        selector,
        {
          opacity,
          y,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger,
            start,
            end,
            toggleActions,
            markers,
          },
        }
      );

      animations.push(animation);
    });

    // Refresh ScrollTrigger after all animations are created
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      animations.forEach((anim) => anim.kill());
      ScrollTrigger.getAll().forEach((trigger) => {
        const shouldKill = reveals.some(({ selector }) => trigger.vars.trigger === selector);
        if (shouldKill) {
          trigger.kill();
        }
      });
    };
  }, dependencies);
}