/**
 * DigilabHero - Clean full-screen branded hero
 *
 * Design Philosophy:
 * - Full viewport branded image (FUND AID logo + tagline already in image)
 * - No overlays or animations - pure cinematic calm
 * - Smooth fade out on scroll for seamless transition
 * - No duplicate text - image contains all branding
 * - Adheres to Digilab aesthetic: No bounce, no perpetual loops
 */

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function DigilabHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Set initial state
      gsap.set('.hero-image', { opacity: 0, y: 0 });

      // Subtle fade-in on load
      gsap.to('.hero-image', {
        opacity: 1,
        duration: 1.6,
        ease: 'power2.out'
      });

      // Subtle parallax effect on the hero image (y: 0 to y: -50)
      gsap.to('.hero-image', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          // markers: true, // Uncomment for debugging
        }
      });

      // Fade out entire section on scroll (keep existing behavior)
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(section, {
            opacity: 1 - self.progress,
            duration: 0,
            overwrite: 'auto'
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full"
    >
      {/* Full-screen branded hero image - no overlays */}
      <div className="hero-image absolute inset-0">
        <Image
          src="/Fund Aid Minimalist Variation 1.png"
          alt="Fund Aid - Stop Writing Grants. Start Winning Them."
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>
    </section>
  );
}
