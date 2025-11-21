/**
 * Lenis Smooth Scroll Configuration
 *
 * Initializes and manages the Lenis smooth scrolling library for
 * buttery-smooth scroll experience across the marketing pages.
 *
 * Integrated with GSAP ScrollTrigger for synchronized animations.
 *
 * @see https://github.com/studio-freight/lenis
 * @see https://gsap.com/docs/v3/Plugins/ScrollTrigger/
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;

export interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
  smooth?: boolean;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
}

/**
 * Initialize Lenis smooth scrolling
 *
 * @param options - Custom Lenis configuration options
 * @returns Lenis instance
 */
export function initSmoothScroll(options: LenisOptions = {}): Lenis {
  // Prevent multiple instances
  if (lenisInstance) {
    return lenisInstance;
  }

  const defaultOptions: LenisOptions = {
    duration: 1.2,           // Scroll duration (higher = smoother but slower)
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,      // Disable on touch devices (better performance)
    touchMultiplier: 2,
    infinite: false,
  };

  lenisInstance = new Lenis({
    ...defaultOptions,
    ...options,
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  // This is the critical integration for scroll-driven animations
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Add Lenis to GSAP ticker for smooth updates
  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000); // Convert GSAP time to milliseconds
  });

  // Disable lag smoothing for better Lenis + GSAP sync
  gsap.ticker.lagSmoothing(0);

  // Debug logging (only in development)
  if (process.env.NODE_ENV === 'development') {
    lenisInstance.on('scroll', (e: any) => {
      // console.log('[Lenis] Scroll:', e.scroll, 'Progress:', e.progress);
    });
  }

  return lenisInstance;
}

/**
 * Get the current Lenis instance
 *
 * @returns Current Lenis instance or null if not initialized
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Destroy the Lenis instance and clean up GSAP integration
 */
export function destroySmoothScroll(): void {
  if (lenisInstance) {
    // Remove GSAP ticker callback
    gsap.ticker.remove((time) => {
      lenisInstance?.raf(time * 1000);
    });

    // Destroy Lenis
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

/**
 * Scroll to a specific position or element
 *
 * @param target - Y position (number), CSS selector (string), or HTMLElement
 * @param options - Scroll behavior options
 */
export function scrollTo(
  target: number | string | HTMLElement,
  options: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
    immediate?: boolean;
    lock?: boolean;
    force?: boolean;
    onComplete?: () => void;
  } = {}
): void {
  if (!lenisInstance) {
    console.warn('[Lenis] Instance not initialized. Call initSmoothScroll() first.');
    return;
  }

  lenisInstance.scrollTo(target, options);
}

/**
 * Stop smooth scrolling
 */
export function stopScroll(): void {
  if (lenisInstance) {
    lenisInstance.stop();
  }
}

/**
 * Resume smooth scrolling
 */
export function startScroll(): void {
  if (lenisInstance) {
    lenisInstance.start();
  }
}

/**
 * Check if Lenis is currently scrolling
 */
export function isScrolling(): boolean {
  return lenisInstance?.isScrolling ?? false;
}
