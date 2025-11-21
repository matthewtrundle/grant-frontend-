/**
 * useGSAP Hook
 *
 * React hook for GSAP animations with automatic cleanup.
 * Based on @gsap/react useGSAP hook pattern.
 *
 * @example
 * ```tsx
 * const containerRef = useGSAP((context) => {
 *   gsap.from('.title', { opacity: 0, y: 50 });
 * });
 * ```
 */

import { useEffect, useRef, DependencyList } from 'react';
import gsap from 'gsap';

export type GSAPCallback = (context: gsap.Context) => void | (() => void);

interface UseGSAPOptions {
  scope?: HTMLElement | null;
  dependencies?: DependencyList;
  revertOnUpdate?: boolean;
}

/**
 * Hook for setting up GSAP animations with automatic cleanup
 *
 * @param callback - Function to set up GSAP animations
 * @param options - Configuration options
 * @returns Ref to attach to the container element
 */
export function useGSAP(
  callback: GSAPCallback,
  options: UseGSAPOptions = {}
): React.RefObject<HTMLDivElement> {
  const {
    scope = null,
    dependencies = [],
    revertOnUpdate = true,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const scopeElement = scope || containerRef.current;
    if (!scopeElement) return;

    // Revert previous context if revertOnUpdate is true
    if (revertOnUpdate && contextRef.current) {
      contextRef.current.revert();
    }

    // Create new GSAP context
    const context = gsap.context(() => {
      callback(context);
    }, scopeElement);

    contextRef.current = context;

    // Cleanup function
    return () => {
      context.revert();
    };
  }, dependencies);

  return containerRef;
}

/**
 * Hook for creating GSAP matchMedia responsive animations
 *
 * @example
 * ```tsx
 * useGSAPMatchMedia(() => {
 *   gsap.matchMedia().add({
 *     'mobile': '(max-width: 767px)',
 *     'desktop': '(min-width: 768px)',
 *   }, (context) => {
 *     const { mobile, desktop } = context.conditions;
 *     if (mobile) {
 *       // Mobile animation
 *     } else if (desktop) {
 *       // Desktop animation
 *     }
 *   });
 * });
 * ```
 */
export function useGSAPMatchMedia(
  callback: () => gsap.MatchMedia | void,
  dependencies: DependencyList = []
): void {
  useEffect(() => {
    const mm = gsap.matchMedia();
    callback();

    return () => {
      mm.kill();
    };
  }, dependencies);
}
