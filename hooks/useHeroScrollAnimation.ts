/**
 * useHeroScrollAnimation Hook
 *
 * Manages scroll-triggered animations for hero sections.
 * Implements subtle parallax and fade effects using GSAP ScrollTrigger.
 *
 * Features:
 * - Parallax scrolling for background elements
 * - Fade out content on scroll
 * - Scale and translate effects
 * - Configurable animation parameters
 */

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once at module level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseHeroScrollAnimationOptions {
  containerRef: RefObject<HTMLElement>;
  contentRef?: RefObject<HTMLElement>;
  backgroundRef?: RefObject<HTMLElement>;
  parallaxSpeed?: number; // 0-1, where 0.5 = 50% of scroll speed
  fadeOutContent?: boolean;
  scaleOnScroll?: boolean;
  enableMarkers?: boolean;
}

export function useHeroScrollAnimation({
  containerRef,
  contentRef,
  backgroundRef,
  parallaxSpeed = 0.5,
  fadeOutContent = true,
  scaleOnScroll = false,
  enableMarkers = false
}: UseHeroScrollAnimationOptions) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create gsap context for proper cleanup
    const ctx = gsap.context(() => {
      // Background parallax effect
      if (backgroundRef?.current) {
        gsap.to(backgroundRef.current, {
          yPercent: parallaxSpeed * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            markers: enableMarkers
          }
        });
      }

      // Content fade and translate effect
      if (contentRef?.current && fadeOutContent) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '50% top',
            scrub: 1,
            markers: enableMarkers
          }
        });

        tl.to(contentRef.current, {
          opacity: 0,
          y: -50,
          scale: scaleOnScroll ? 0.95 : 1,
          ease: 'power2.inOut'
        });
      }

      // Additional subtle animations for child elements
      const animateChildren = () => {
        // Animate headings
        const headings = container.querySelectorAll('h1, h2, h3');
        headings.forEach((heading, index) => {
          gsap.from(heading, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          });
        });

        // Animate paragraphs
        const paragraphs = container.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
          gsap.from(p, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: index * 0.05 + 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          });
        });

        // Animate buttons
        const buttons = container.querySelectorAll('button, a');
        buttons.forEach((button, index) => {
          gsap.from(button, {
            opacity: 0,
            y: 15,
            duration: 0.8,
            delay: index * 0.05 + 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: button,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          });
        });
      };

      // Apply child animations
      animateChildren();
    }, container);

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, [containerRef, contentRef, backgroundRef, parallaxSpeed, fadeOutContent, scaleOnScroll, enableMarkers]);
}