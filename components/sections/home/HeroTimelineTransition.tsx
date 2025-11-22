'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

// Dynamic imports for client-side only libraries
let gsap: any;
let ScrollTrigger: any;

if (typeof window !== 'undefined') {
  gsap = require('gsap').default;
  ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroTimelineTransition() {
  const transitionRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!transitionRef.current || !bg1Ref.current || !bg2Ref.current) return;

    // Parallax effect for storytelling backgrounds
    gsap.to(bg1Ref.current, {
      scrollTrigger: {
        trigger: transitionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -150,
      ease: 'none',
    });

    gsap.to(bg2Ref.current, {
      scrollTrigger: {
        trigger: transitionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -100,
      ease: 'none',
    });

    // Fade in transition content
    gsap.fromTo(
      transitionRef.current.querySelector('.transition-content'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: transitionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div
      ref={transitionRef}
      className="relative w-full h-[60vh] overflow-hidden bg-[#0A0A0A]"
    >
      {/* Storytelling Background 1 - Deeper layer */}
      <div
        ref={bg1Ref}
        className="absolute inset-0 will-change-transform"
        style={{ transform: 'translateY(0)' }}
      >
        <Image
          src="/Storytelling Background 1.png"
          alt="FundAid Transition Background"
          fill
          className="object-cover opacity-40"
          quality={90}
        />
      </div>

      {/* Storytelling Background 3 - Front layer */}
      <div
        ref={bg2Ref}
        className="absolute inset-0 will-change-transform"
        style={{ transform: 'translateY(0)' }}
      >
        <Image
          src="/Storytelling Background 3.png"
          alt="FundAid Transition Background"
          fill
          className="object-cover opacity-30"
          quality={90}
        />
      </div>

      {/* Gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-white/90" />

      {/* Optional transition content */}
      <div className="transition-content absolute inset-0 flex items-center justify-center">
        <div className="text-center px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-white/90 tracking-wide"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            THE FUNDAID PROCESS
          </h2>
        </div>
      </div>
    </div>
  );
}
