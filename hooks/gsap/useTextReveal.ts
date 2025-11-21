/**
 * useTextReveal Hook
 *
 * Creates staggered text reveal animations character by character or word by word.
 * Inspired by premium sites and GSAP SplitText patterns.
 *
 * Features:
 * - Character or word splitting
 * - Staggered fade & slide animations
 * - Scroll-triggered or immediate
 * - Premium easing curves
 *
 * Usage:
 * ```tsx
 * const titleRef = useTextReveal({
 *   splitBy: 'chars',
 *   stagger: 0.03,
 *   triggerOnScroll: true,
 * });
 *
 * <h1 ref={titleRef}>Amazing Title</h1>
 * ```
 */

'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from './useGSAP';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealOptions {
  splitBy?: 'chars' | 'words' | 'lines';
  stagger?: number;
  duration?: number;
  ease?: string;
  triggerOnScroll?: boolean;
  start?: string;
  y?: number;
  opacity?: number;
}

/**
 * Split text into spans for animation
 * Simple implementation without SplitText plugin
 */
function splitText(
  element: HTMLElement,
  splitBy: 'chars' | 'words' | 'lines'
): HTMLElement[] {
  const text = element.textContent || '';
  const spans: HTMLElement[] = [];

  if (splitBy === 'chars') {
    const chars = text.split('');
    element.innerHTML = chars
      .map(
        (char) =>
          `<span class="char" style="display:inline-block">${
            char === ' ' ? '&nbsp;' : char
          }</span>`
      )
      .join('');
    spans.push(...Array.from(element.querySelectorAll('.char')));
  } else if (splitBy === 'words') {
    const words = text.split(' ');
    element.innerHTML = words
      .map(
        (word, i) =>
          `<span class="word" style="display:inline-block">${word}</span>${
            i < words.length - 1 ? ' ' : ''
          }`
      )
      .join('');
    spans.push(...Array.from(element.querySelectorAll('.word')));
  }

  return spans;
}

export function useTextReveal<T extends HTMLElement>(
  options: TextRevealOptions = {}
) {
  const {
    splitBy = 'chars',
    stagger = 0.03,
    duration = 0.6,
    ease = 'power3.out',
    triggerOnScroll = true,
    start = 'top 80%',
    y = 30,
    opacity = 0,
  } = options;

  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      // Split the text
      const spans = splitText(element, splitBy);

      // Set initial state
      gsap.set(spans, {
        y,
        opacity,
      });

      if (triggerOnScroll) {
        // Scroll-triggered animation
        gsap.to(spans, {
          y: 0,
          opacity: 1,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: 'play none none none',
          },
        });
      } else {
        // Immediate animation
        gsap.to(spans, {
          y: 0,
          opacity: 1,
          duration,
          ease,
          stagger,
        });
      }
    },
    { scope: ref }
  );

  return ref;
}
