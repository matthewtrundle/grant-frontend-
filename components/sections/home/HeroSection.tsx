/**
 * HeroSection Component
 *
 * Full-viewport pinned hero section with cinematic scroll-driven animations.
 * Implements the design from PAGE_STRUCTURE.md with GSAP ScrollTrigger.
 *
 * Animation Timeline:
 * - 0-100vh (pinned): Section stays fixed
 *   - Title scales 0.9 → 1.05 and fades in
 *   - Subtitle fades in with upward motion
 *   - Background gradient rotates 5°
 *   - Circuit pattern pulses
 * - 100vh (unpin): Section releases
 * - Exit: Slight blur applied as section exits
 */

'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CircuitBackground } from '@/components/ui/circuit-background';
import { ArrowRight, Sparkles } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const copy = copyRef.current;
    const cta = ctaRef.current;
    const bg = bgRef.current;

    if (!section || !title || !subtitle || !copy || !cta || !bg) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Show everything immediately without animation
      gsap.set([title, subtitle, copy, cta], { opacity: 1, y: 0 });
      return;
    }

    // Create ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=100%', // Pin for one viewport height
        pin: true,
        scrub: 1, // Smooth scrubbing with 1s lag
        pinSpacing: true,
        anticipatePin: 1,
        markers: process.env.NODE_ENV === 'development' ? false : false,
      },
    });

    // Animation sequence
    tl
      // Title: Scale + fade in
      .fromTo(
        title,
        { scale: 0.9, opacity: 0 },
        { scale: 1.05, opacity: 1, duration: 0.5, ease: 'power3.out' },
        0
      )
      // Subtitle: Slide up + fade in
      .fromTo(
        subtitle,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.2 // Start slightly after title
      )
      // Copy: Fade in
      .fromTo(
        copy,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
        0.4
      )
      // CTAs: Slide up + fade in
      .fromTo(
        cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' },
        0.5
      )
      // Background: Subtle rotation
      .to(
        bg,
        { rotation: 5, duration: 1, ease: 'none' },
        0 // Start at beginning
      );

    // Exit blur effect
    ScrollTrigger.create({
      trigger: section,
      start: 'bottom bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const blur = self.progress * 2; // 0 → 2px blur
        section.style.filter = `blur(${blur}px)`;
      },
    });

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Animated Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-ocean-900 via-purple-900 to-black"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Circuit Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <CircuitBackground />
        </div>

        {/* Radial Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="inline-flex mb-8"
        >
          <Badge
            variant="outline"
            className="px-4 py-2 text-sm font-medium border-purple-500/30 bg-purple-500/10 text-purple-200 backdrop-blur-sm shadow-accent"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Free TRL Assessment
          </Badge>
        </motion.div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl lg:text-8xl font-playfair font-bold mb-6 opacity-0"
          style={{ transformOrigin: 'center center' }}
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-teal-200 bg-clip-text text-transparent animate-gradient-shift">
            Grants shouldn't be this hard.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl font-medium text-white/90 mb-6 opacity-0"
        >
          AI-powered grant writing that learns from winners.{' '}
          <span className="text-teal-300">Turn months into days.</span>
        </p>

        {/* Copy */}
        <p
          ref={copyRef}
          className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed opacity-0"
        >
          Traditional grant applications are brutal: months of research, endless
          drafts, and a 15% success rate if you're lucky. We've analyzed
          thousands of winning applications to build an AI system that writes
          like the experts who actually get funded.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center opacity-0">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-accent transition-all duration-quick hover:scale-105 hover:shadow-lifted group"
          >
            Start Free Assessment
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-quick hover:scale-105"
          >
            See How It Works
          </Button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
