/**
 * SmoothScrollProvider Component
 *
 * Initializes and manages Lenis smooth scrolling for the entire application.
 * Only activates on marketing pages (not dashboard) for better UX.
 *
 * Place this component in the root layout for global smooth scrolling.
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initSmoothScroll, destroySmoothScroll } from '@/lib/scroll-config';

export function SmoothScrollProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Only enable smooth scroll on marketing pages (not dashboard)
    const isMarketingPage = !pathname.startsWith('/dashboard') &&
                            !pathname.startsWith('/onboarding') &&
                            !pathname.startsWith('/sign-in') &&
                            !pathname.startsWith('/sign-up');

    if (!isMarketingPage) {
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Skip smooth scrolling for users who prefer reduced motion
      return;
    }

    // Initialize Lenis smooth scroll
    const lenis = initSmoothScroll();

    // Cleanup on unmount
    return () => {
      destroySmoothScroll();
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}
