# Animation Notes: Technical Implementation Guide

> **GSAP + ScrollTrigger + Framer Motion + Lenis**
> **Target**: Cinematic scroll experience with 60fps performance

---

## Animation Stack Overview

### Primary Tools
- **GSAP 3.x**: Complex scroll-driven timelines, pinned sections
- **ScrollTrigger**: Viewport-based animation triggers
- **Lenis**: Buttery smooth scrolling (replaces native scroll)
- **Framer Motion**: Declarative React animations (micro-interactions, page transitions)

### When to Use What
- **GSAP**: Scroll-driven sequences, pinned sections, complex timelines
- **Framer Motion**: Hover states, layout animations, stagger reveals
- **Lenis**: Global smooth scrolling (always active)
- **CSS**: Simple transitions (opacity, color)

---

## Global Setup

### Lenis Smooth Scroll

**File**: `lib/scroll-config.ts`

```typescript
import Lenis from '@studio-freight/lenis';

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,           // Scroll duration (higher = smoother but slower)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,      // Disable on touch devices (better performance)
    touchMultiplier: 2,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
}
```

**Usage in `app/layout.tsx`**:

```typescript
'use client';

import { useEffect } from 'react';
import { initSmoothScroll } from '@/lib/scroll-config';

export default function RootLayout({ children }) {
  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => lenis.destroy();
  }, []);

  return <html>{children}</html>;
}
```

---

## GSAP Patterns

### 1. Basic ScrollTrigger Reveal

**Hook**: `hooks/useScrollReveal.ts`

```typescript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',      // Animation starts when element is 80% from top
          end: 'top 50%',
          toggleActions: 'play none none none',
          ...options,
        },
      }
    );
  }, []);

  return ref;
}
```

**Usage**:
```tsx
const titleRef = useScrollReveal();

<h2 ref={titleRef}>My Animated Title</h2>
```

---

### 2. Pinned Section with Scrub Timeline

**Hook**: `hooks/usePinnedTimeline.ts`

```typescript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePinnedTimeline({
  pin = true,
  scrub = 1,             // Smooth scrubbing (0 = instant, 1 = 1s lag)
  pinSpacing = true,
  duration = 1,          // Duration in viewport heights
} = {}) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${duration * window.innerHeight}`,
        pin: pin,
        scrub: scrub,
        pinSpacing: pinSpacing,
        anticipatePin: 1,
      },
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [pin, scrub, pinSpacing, duration]);

  return { containerRef, timeline: timelineRef.current };
}
```

**Usage** (Hero Section):
```tsx
'use client';

import { usePinnedTimeline } from '@/hooks/usePinnedTimeline';
import { useEffect } from 'react';

export function HeroSection() {
  const { containerRef, timeline } = usePinnedTimeline({ duration: 1 });

  useEffect(() => {
    if (!timeline) return;

    // Add animations to timeline
    timeline
      .fromTo('.hero-title',
        { scale: 0.9, opacity: 0 },
        { scale: 1.05, opacity: 1, duration: 0.5 }
      )
      .fromTo('.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        '-=0.2' // Overlap with previous animation
      )
      .to('.hero-bg',
        { rotation: 5, duration: 1 },
        0 // Start at timeline beginning
      );
  }, [timeline]);

  return (
    <section ref={containerRef} className="h-screen relative">
      <div className="hero-bg absolute inset-0 bg-gradient-to-br from-ocean-900 to-purple-900" />
      <h1 className="hero-title">Grants shouldn't be this hard.</h1>
      <p className="hero-subtitle">AI-powered grant writing...</p>
    </section>
  );
}
```

---

### 3. Horizontal Scroll Section (Solution Timeline)

**Hook**: `hooks/useHorizontalScroll.ts`

```typescript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useHorizontalScroll(itemCount: number) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    const scrollWidth = scroller.scrollWidth - window.innerWidth;

    gsap.to(scroller, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${itemCount * window.innerHeight}`, // Pin for N viewports
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [itemCount]);

  return { containerRef, scrollerRef };
}
```

**Usage** (Solution Timeline):
```tsx
export function SolutionTimeline() {
  const { containerRef, scrollerRef } = useHorizontalScroll(4); // 4 stages

  return (
    <section ref={containerRef} className="h-screen overflow-hidden">
      <div ref={scrollerRef} className="flex w-max h-full">
        <StageCard number={1} title="Company Profiler" />
        <StageCard number={2} title="Grant Discovery" />
        <StageCard number={3} title="Grant Analysis" />
        <StageCard number={4} title="Document Generation" />
      </div>
    </section>
  );
}
```

---

### 4. Parallax Layers

**Hook**: `hooks/useParallaxEffect.ts`

```typescript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useParallaxEffect(speed: number = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [speed]);

  return ref;
}
```

**Usage** (Technology Section):
```tsx
export function TechnologySection() {
  const bgRef = useParallaxEffect(0.3);     // Slow background
  const midRef = useParallaxEffect(0.6);    // Medium layer
  const fgRef = useParallaxEffect(1.0);     // Normal foreground

  return (
    <section className="relative min-h-screen">
      <div ref={bgRef} className="absolute inset-0 bg-pattern" />
      <div ref={midRef} className="absolute inset-0 tech-badges" />
      <div ref={fgRef} className="relative z-10 content" />
    </section>
  );
}
```

---

### 5. Scroll-Triggered Number Counter

**Hook**: `hooks/useScrollCounter.ts`

```typescript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollCounter(
  targetValue: number,
  suffix: string = '',
  decimals: number = 0
) {
  const ref = useRef(null);
  const counterRef = useRef({ value: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(counterRef.current, {
      value: targetValue,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (element) {
          element.textContent =
            counterRef.current.value.toFixed(decimals) + suffix;
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [targetValue, suffix, decimals]);

  return ref;
}
```

**Usage** (Impact Section):
```tsx
export function ImpactSection() {
  const successRef = useScrollCounter(40, '%', 0);
  const hoursRef = useScrollCounter(100, '+ Hours', 0);
  const fundsRef = useScrollCounter(10000, '+ Grants', 0);

  return (
    <section>
      <div ref={successRef} className="text-6xl font-bold">0%</div>
      <div ref={hoursRef} className="text-6xl font-bold">0 Hours</div>
      <div ref={fundsRef} className="text-6xl font-bold">0 Grants</div>
    </section>
  );
}
```

---

## Framer Motion Patterns

### 1. Stagger Reveal (Cards, Grid Items)

```tsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,  // 150ms delay between each child
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function CardGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-3 gap-6"
    >
      <motion.div variants={itemVariants}>Card 1</motion.div>
      <motion.div variants={itemVariants}>Card 2</motion.div>
      <motion.div variants={itemVariants}>Card 3</motion.div>
    </motion.div>
  );
}
```

---

### 2. Hover Interactions

```tsx
import { motion } from 'framer-motion';

export function InteractiveCard() {
  return (
    <motion.div
      className="card"
      whileHover={{
        scale: 1.03,
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(147, 51, 234, 0.5)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
    >
      Content
    </motion.div>
  );
}
```

---

### 3. Page Transitions

**Wrapper**: `components/PageTransition.tsx`

```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## Performance Optimization

### 1. Lazy Load Animations Below Fold

```typescript
import { useEffect, useState } from 'react';

export function useLazyAnimation() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
        }
      },
      { rootMargin: '100px' } // Start 100px before entering viewport
    );

    // Observe target element
  }, []);

  return shouldAnimate;
}
```

---

### 2. Reduced Motion Support

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**JavaScript Detection**:
```typescript
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
```

---

### 3. ScrollTrigger Performance Tips

```typescript
// Disable markers in production
ScrollTrigger.config({ markers: process.env.NODE_ENV === 'development' });

// Batch updates for better performance
ScrollTrigger.batch('.animate-item', {
  onEnter: (batch) => gsap.to(batch, { opacity: 1, stagger: 0.15 }),
  start: 'top 80%',
});

// Use will-change sparingly
// Add only during animation, remove after
.on('onStart', () => element.style.willChange = 'transform, opacity')
.on('onComplete', () => element.style.willChange = 'auto');
```

---

## Easing Reference

### GSAP Easing Strings

```javascript
// Smooth & Natural
'power1.out'      // Subtle ease
'power2.out'      // Standard ease (recommended default)
'power3.out'      // Strong ease (hero animations)
'power4.out'      // Very strong ease (rarely used)

// Elastic & Bounce
'elastic.out(1, 0.3)'   // Bouncy (use sparingly)
'back.out(1.4)'         // Overshoot (buttons, pop-ins)

// Expo (Cinematic)
'expo.out'              // Dramatic slow-down (pinned sections)
'expo.inOut'            // Smooth bidirectional

// Circ (Smooth Curves)
'circ.out'              // Very smooth (scrolling)
'circ.inOut'            // Bidirectional smooth
```

---

## Animation Checklist

Before deploying a section, verify:

- [ ] Animation works on mobile (simplified if needed)
- [ ] No layout shift (CLS score)
- [ ] Respects `prefers-reduced-motion`
- [ ] 60fps performance (check DevTools)
- [ ] ScrollTriggers cleaned up on unmount
- [ ] Lenis smooth scroll doesn't conflict with GSAP
- [ ] Animations don't block user interaction
- [ ] Touch gestures work (swipe, tap)

---

**Last Updated**: 2025-11-21
**Maintained By**: SiteRebuild Agent (Motion Designer Role)
