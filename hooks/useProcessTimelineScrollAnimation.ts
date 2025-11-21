/**
 * useProcessTimelineScrollAnimation Hook
 *
 * Manages scroll-triggered animations for the ProcessTimeline component.
 * Implements GSAP ScrollTrigger for pinning, stage progression, and line drawing.
 *
 * Features:
 * - Pin section for 300vh of scroll (400vh total with initial 100vh)
 * - Stage activation at 0%, 25%, 50%, 75% progress
 * - SVG stroke animation synchronized with scroll
 * - Stage marker opacity transitions
 */

import { useEffect, useState, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once at module level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseProcessTimelineScrollAnimationOptions {
  sectionRef: RefObject<HTMLElement>;
  totalStages?: number;
  pinDuration?: string; // e.g., "+=300vh"
  enableMarkers?: boolean;
}

export function useProcessTimelineScrollAnimation({
  sectionRef,
  totalStages = 4,
  pinDuration = '+=300vh',
  enableMarkers = false
}: UseProcessTimelineScrollAnimationOptions) {
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Create gsap context for proper cleanup
    const ctx = gsap.context(() => {
      // Main pinning ScrollTrigger with stage updates
      const mainTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: pinDuration,
        pin: true,
        scrub: 1,
        markers: enableMarkers,
        onUpdate: (self) => {
          const progress = self.progress;

          // Calculate current stage based on progress
          // Divide progress equally among stages
          const stageProgress = 1 / totalStages;
          let newStage = 1;

          for (let i = 1; i <= totalStages; i++) {
            if (progress >= (i - 1) * stageProgress) {
              newStage = i;
            }
          }

          setCurrentStage(newStage);
        }
      });

      // Timeline line stroke animation
      const timelineLine = section.querySelector('[data-timeline-line] line') as SVGLineElement;
      if (timelineLine) {
        const lineLength = timelineLine.getTotalLength();

        // Set initial stroke properties
        gsap.set(timelineLine, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
          stroke: '#2FB49E',
          strokeOpacity: 1,
          strokeWidth: 2
        });

        // Animate stroke to reveal progressively with scroll
        gsap.to(timelineLine, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: pinDuration,
            scrub: 1
          }
        });
      }

      // Stage marker animations
      const animateStageMarkers = (stageNumber: number) => {
        const stageElements = section.querySelectorAll('[data-stage]');

        stageElements.forEach((element) => {
          const stage = parseInt(element.getAttribute('data-stage') || '0');
          if (stage === 0) return;

          const isActive = stage === stageNumber;
          const numberElement = element.querySelector('span:first-of-type') as HTMLElement;
          const labelElement = element.querySelector('span:last-of-type') as HTMLElement;
          const circleElement = element.querySelector('div > div') as HTMLElement;

          if (numberElement) {
            gsap.to(numberElement, {
              color: isActive ? '#2FB49E' : 'rgba(47, 180, 158, 0.2)',
              opacity: isActive ? 1 : 0.2,
              duration: 0.5,
              ease: 'power1.inOut'
            });
          }

          if (labelElement) {
            gsap.to(labelElement, {
              opacity: isActive ? 1 : 0.5,
              duration: 0.5,
              ease: 'power1.inOut'
            });
          }

          if (circleElement) {
            gsap.to(circleElement, {
              borderColor: isActive ? '#2FB49E' : 'rgba(47, 180, 158, 0.2)',
              boxShadow: isActive ? '0 0 20px rgba(47, 180, 158, 0.3)' : 'none',
              duration: 0.5,
              ease: 'power1.inOut'
            });
          }
        });
      };

      // Initial animation for stage markers
      animateStageMarkers(currentStage);

      // Return cleanup function
      return () => {
        mainTrigger.kill();
      };
    }, section);

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, [sectionRef, totalStages, pinDuration, enableMarkers]);

  // Update stage markers when currentStage changes
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stageElements = section.querySelectorAll('[data-stage]');

    stageElements.forEach((element) => {
      const stage = parseInt(element.getAttribute('data-stage') || '0');
      if (stage === 0) return;

      const isActive = stage === currentStage;
      const numberElement = element.querySelector('span:first-of-type') as HTMLElement;
      const labelElement = element.querySelector('span:last-of-type') as HTMLElement;
      const circleElement = element.querySelector('div > div') as HTMLElement;

      if (numberElement) {
        gsap.to(numberElement, {
          color: isActive ? '#2FB49E' : 'rgba(47, 180, 158, 0.2)',
          opacity: isActive ? 1 : 0.2,
          duration: 0.5,
          ease: 'power1.inOut'
        });
      }

      if (labelElement) {
        gsap.to(labelElement, {
          opacity: isActive ? 1 : 0.5,
          duration: 0.5,
          ease: 'power1.inOut'
        });
      }

      if (circleElement) {
        gsap.to(circleElement, {
          borderColor: isActive ? '#2FB49E' : 'rgba(47, 180, 158, 0.2)',
          boxShadow: isActive ? '0 0 20px rgba(47, 180, 158, 0.3)' : 'none',
          duration: 0.5,
          ease: 'power1.inOut'
        });
      }
    });
  }, [currentStage, sectionRef]);

  return { currentStage };
}