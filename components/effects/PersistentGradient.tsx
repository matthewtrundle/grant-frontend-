/**
 * PersistentGradient - A gradient background that persists throughout scroll
 *
 * Features:
 * - Stays visible from hero through all sections
 * - Subtle parallax effect
 * - Smooth opacity transitions
 * - Performance optimized
 */

'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PersistentGradientProps {
  imageSrc?: string;
  parallaxSpeed?: number;
  fadeBottom?: boolean;
}

export function PersistentGradient({
  imageSrc = '/HeroFlow.png',
  parallaxSpeed = 0.5, // 0 = no parallax, 1 = normal scroll speed
  fadeBottom = true,
}: PersistentGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const ctx = gsap.context(() => {
      // Calculate document height for proper scaling
      const updateDimensions = () => {
        const docHeight = document.documentElement.scrollHeight;
        const viewHeight = window.innerHeight;

        // Make gradient tall enough to cover entire scroll
        // Account for parallax movement
        const gradientHeight = docHeight + (viewHeight * parallaxSpeed);

        // Set container to cover viewport
        gsap.set(container, {
          height: viewHeight,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          overflow: 'hidden',
          zIndex: -1,
        });

        // Set inner to be much taller for parallax
        gsap.set(inner, {
          height: gradientHeight,
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        });
      };

      updateDimensions();

      // Create parallax timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          onUpdate: (self) => {
            // Move inner content based on scroll progress
            const moveAmount = self.progress * window.innerHeight * parallaxSpeed;
            gsap.set(inner, {
              y: -moveAmount,
              force3D: true,
            });
          }
        }
      });

      // Fade effect at bottom if enabled
      if (fadeBottom) {
        ScrollTrigger.create({
          trigger: document.body,
          start: 'bottom-=20% bottom',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            // Fade from 1 to 0.1 opacity
            const opacity = 1 - (self.progress * 0.9);
            gsap.set(container, { opacity });
          }
        });
      }

      // Handle resize
      const handleResize = () => {
        updateDimensions();
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    return () => {
      ctx.revert();
    };
  }, [parallaxSpeed, fadeBottom]);

  return (
    <div ref={containerRef} className="pointer-events-none">
      <div ref={innerRef}>
        <Image
          src={imageSrc}
          alt="Background gradient"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
          style={{
            objectPosition: 'center top',
            // Add blend mode for better integration
            mixBlendMode: 'normal',
          }}
        />
      </div>
    </div>
  );
}