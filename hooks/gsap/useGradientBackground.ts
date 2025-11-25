/**
 * useGradientBackground - Hook for managing persistent gradient background
 *
 * Features:
 * - Smooth parallax scrolling that keeps gradient visible throughout page
 * - Adaptive opacity based on scroll position
 * - Performance optimized with GSAP
 */

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GradientOptions {
  // Parallax movement amount (percentage of gradient height)
  parallaxAmount?: number;
  // Whether to fade gradient at bottom of page
  fadeAtBottom?: boolean;
  // Opacity to fade to (0-1)
  fadeOpacity?: number;
  // When to start fade (percentage from bottom)
  fadeStart?: string;
}

export function useGradientBackground(
  gradientRef: React.RefObject<HTMLDivElement>,
  options: GradientOptions = {}
) {
  const {
    parallaxAmount = 15,
    fadeAtBottom = true,
    fadeOpacity = 0.3,
    fadeStart = 'bottom-=30%'
  } = options;

  useEffect(() => {
    const gradient = gradientRef.current;
    if (!gradient) return;

    const ctx = gsap.context(() => {
      // Main parallax animation
      // Slow, subtle movement that keeps gradient in view
      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5, // Very smooth scrubbing
          onUpdate: (self) => {
            // Calculate position based on scroll progress
            const yPos = self.progress * parallaxAmount;
            gsap.set(gradient, {
              y: `${yPos}%`,
              force3D: true, // Hardware acceleration
            });
          }
        }
      });

      // Optional fade animation at bottom
      if (fadeAtBottom) {
        gsap.to(gradient, {
          opacity: fadeOpacity,
          ease: 'power3.in',
          scrollTrigger: {
            trigger: document.body,
            start: `${fadeStart} bottom`,
            end: 'bottom bottom',
            scrub: 1,
          }
        });
      }

      // Dynamic height adjustment based on document height
      // This ensures gradient covers entire scrollable area
      const updateGradientHeight = () => {
        const docHeight = document.documentElement.scrollHeight;
        const viewHeight = window.innerHeight;
        const scrollDistance = docHeight - viewHeight;

        // Calculate optimal gradient height
        // Needs to be tall enough to cover scroll + parallax movement
        const optimalHeight = viewHeight + scrollDistance * 0.5 + (viewHeight * parallaxAmount / 100);

        gradient.style.height = `${optimalHeight}px`;
        gradient.style.top = `-${viewHeight * 0.2}px`; // Start 20% above viewport
      };

      // Update on load and resize
      updateGradientHeight();
      window.addEventListener('resize', updateGradientHeight);

      // Refresh ScrollTrigger on height change
      ScrollTrigger.addEventListener('refresh', updateGradientHeight);
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener('resize', updateGradientHeight);
        ScrollTrigger.removeEventListener('refresh', updateGradientHeight);
      };
    });

    return () => {
      ctx.revert();
    };
  }, [gradientRef, parallaxAmount, fadeAtBottom, fadeOpacity, fadeStart]);
}