/**
 * useScrolled Hook - Track scroll position for nav brightness
 *
 * Returns true when user has scrolled past threshold (default 80px)
 * Used to trigger nav background and CTA opacity changes
 */

'use client';

import { useState, useEffect } from 'react';

export function useScrolled(threshold: number = 80): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Set initial state
    handleScroll();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
