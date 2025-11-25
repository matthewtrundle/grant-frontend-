/**
 * useNeuralNetworkAnimation - GSAP hook for neural network-style connection lines
 *
 * Creates organic connection lines between timeline stages with:
 * - SVG path animations (draw-in effect)
 * - Particle flow along paths
 * - Branch points and splits
 * - Scroll-triggered progression
 */

'use client';

import { useLayoutEffect, useRef, MutableRefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface NeuralNetworkOptions {
  containerRef: MutableRefObject<HTMLElement | null>;
  scrollTriggerRef: MutableRefObject<HTMLElement | null>;
  activeStep: number;
  scrollProgress: number;
}

export function useNeuralNetworkAnimation({
  containerRef,
  scrollTriggerRef,
  activeStep,
  scrollProgress
}: NeuralNetworkOptions) {
  const pathRefs = useRef<SVGPathElement[]>([]);
  const particleRefs = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const trigger = scrollTriggerRef.current;

    if (!container || !trigger) return;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create master timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        // markers: true,
      }
    });

    // Get all connection paths
    const paths = container.querySelectorAll<SVGPathElement>('.neural-path');
    const particles = container.querySelectorAll<HTMLDivElement>('.neural-particle');

    paths.forEach((path, index) => {
      const length = path.getTotalLength();

      // Set initial state - paths are hidden
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0
      });

      // Calculate when this path should animate based on stages
      const startProgress = index * 0.25; // Each path starts at a different scroll point
      const endProgress = startProgress + 0.3; // Animation duration in scroll %

      // Animate path drawing
      masterTl.to(
        path,
        {
          strokeDashoffset: 0,
          opacity: 0.4,
          duration: endProgress - startProgress,
          ease: 'power2.inOut'
        },
        startProgress
      );

      // Add glow effect on active paths
      if (Math.floor(scrollProgress * 4) === index) {
        gsap.to(path, {
          opacity: 0.8,
          strokeWidth: 2.5,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    // Animate particles along paths (simplified version)
    particles.forEach((particle, index) => {
      const targetPath = paths[index % paths.length];
      if (!targetPath) return;

      // Only animate particles on active or completed paths
      const pathProgress = index * 0.25;
      if (scrollProgress >= pathProgress) {
        // Use a simple animation along the path
        const pathLength = targetPath.getTotalLength();

        // Create an object to track progress
        const progressObj = { progress: 0 };

        gsap.to(progressObj, {
          progress: 1,
          duration: 3 + index * 0.5,
          repeat: -1,
          ease: 'none',
          delay: index * 0.3,
          onUpdate: () => {
            const point = targetPath.getPointAtLength(progressObj.progress * pathLength);
            gsap.set(particle, {
              x: point.x + 'px',
              y: point.y + 'px'
            });
          }
        });
      }
    });

    // Pulse animation for branch points
    const branches = container.querySelectorAll<HTMLElement>('.neural-branch');
    branches.forEach((branch, index) => {
      const branchProgress = (index + 1) * 0.25;

      if (scrollProgress >= branchProgress - 0.1) {
        gsap.to(branch, {
          scale: 1.2,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          yoyo: true,
          repeat: -1,
          repeatDelay: 2
        });
      }
    });

    timelineRef.current = masterTl;

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === trigger) {
          t.kill();
        }
      });
    };
  }, [containerRef, scrollTriggerRef, activeStep, scrollProgress]);

  return {
    pathRefs,
    particleRefs
  };
}

/**
 * Utility function to generate organic curved paths between points
 */
export function generateOrganicPath(
  x1: number, y1: number,
  x2: number, y2: number,
  curve: number = 50
): string {
  // Calculate midpoint
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  // Add some organic variation
  const variation = Math.sin(Date.now() * 0.001) * curve * 0.3;

  // Control points for bezier curve
  const cx1 = mx + curve + variation;
  const cy1 = my - curve * 0.5;
  const cx2 = mx - curve * 0.5;
  const cy2 = my + curve + variation;

  return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
}