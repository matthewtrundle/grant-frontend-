/**
 * DigilabHeroEnhanced - Hero with persistent gradient that lasts entire page
 *
 * Improvements:
 * - Gradient persists throughout entire scroll experience
 * - Smoother parallax effect
 * - Better performance with optimized rendering
 * - Gradient stays visible through timeline sections
 */

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { PersistentGradient } from '@/components/effects/PersistentGradient';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function DigilabHeroEnhanced() {
  const logoSectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const logoSection = logoSectionRef.current;
      if (!logoSection) return;

      // Logo fade-in on load with scale
      gsap.set('.hero-logo', {
        opacity: 0,
        scale: 0.95
      });

      gsap.to('.hero-logo', {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power3.out',
        delay: 0.2
      });

      // Logo parallax and fade out as you scroll
      ScrollTrigger.create({
        trigger: logoSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          // Fade and scale down slightly
          gsap.to('.hero-logo', {
            opacity: 1 - self.progress,
            scale: 1 - (self.progress * 0.1), // Subtle scale down
            y: self.progress * 100, // Slight upward movement
            duration: 0,
            overwrite: 'auto'
          });
        },
      });
    },
    { scope: logoSectionRef, dependencies: [] }
  );

  return (
    <>
      {/* Persistent gradient background - uses new component */}
      <PersistentGradient
        imageSrc="/HeroFlow.png"
        parallaxSpeed={0.3} // Slow parallax for persistence
        fadeBottom={true} // Gentle fade at very bottom
      />

      {/* Logo section - full viewport at top */}
      <section
        ref={logoSectionRef}
        className="relative min-h-screen w-full flex items-center justify-center"
      >
        <div className="hero-logo relative w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto">
          <Image
            src="/Hero.png"
            alt="Fund Aid - Stop Writing Grants. Start Winning Them."
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
            quality={100}
          />
        </div>
      </section>
    </>
  );
}