/**
 * Smooth Scroll Provider with Lenis + GSAP ScrollTrigger
 *
 * Based on best practices from:
 * - https://github.com/darkroomengineering/lenis
 * - https://github.com/codebucks27/Smooth-Scroll-Next.js
 * - GSAP ScrollTrigger documentation
 *
 * Features:
 * - Lenis smooth scrolling with physics-based easing
 * - GSAP ScrollTrigger integration via RAF ticker
 * - Proper cleanup and reduced motion support
 */

'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Don't initialize smooth scroll if user prefers reduced motion
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Smooth scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      orientation: 'vertical', // or 'horizontal'
      gestureOrientation: 'vertical', // or 'horizontal', 'both'
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker for smooth updates
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert GSAP time to milliseconds
    });

    // Disable lag smoothing for better sync
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
