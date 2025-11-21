# Motion System Documentation

## Overview

This document describes the GSAP + ScrollTrigger motion system implemented for the Grant Automation Platform frontend. The system provides smooth, scroll-synchronized animations with a calm, professional aesthetic.

## Core Components

### 1. ProcessTimeline Component
**Location:** `/components/sections/home/ProcessTimeline.tsx`

The main component showcasing our motion system capabilities:
- **Pinned scrolling:** Section pins for 400vh total scroll distance
- **Stage progression:** 4 stages activated at 0%, 25%, 50%, 75% scroll progress
- **SVG line animation:** Stroke-dashoffset animation synchronized with scroll
- **Dynamic state management:** `currentStage` state passed to R3F components

### 2. Motion Hooks

#### useProcessTimelineScrollAnimation
**Location:** `/hooks/useProcessTimelineScrollAnimation.ts`

Reusable hook for timeline scroll animations:
```tsx
const { currentStage } = useProcessTimelineScrollAnimation({
  sectionRef,
  totalStages: 4,
  pinDuration: '+=300vh',
  enableMarkers: false // Set to true for debugging
});
```

#### useHeroScrollAnimation
**Location:** `/hooks/useHeroScrollAnimation.ts`

Reusable hook for hero section parallax and fade effects:
```tsx
useHeroScrollAnimation({
  containerRef,
  contentRef,
  backgroundRef,
  parallaxSpeed: 0.5,
  fadeOutContent: true,
  scaleOnScroll: false
});
```

## Motion Language

### Easing Functions
- **Primary:** `power1.inOut`, `power2.out`, `power3.out`
- **Scroll-synced:** `none` (linear, tied directly to scroll)
- **Subtle transitions:** `sine.inOut` for micro-interactions

### Timing Guidelines
- **Major transitions:** 0.8s - 2.5s
- **Micro-interactions:** 0.3s - 0.5s
- **Scroll scrub factor:** 1 (tight coupling to scroll)

### ScrollTrigger Patterns
```javascript
// Standard pinning pattern
ScrollTrigger.create({
  trigger: section,
  start: 'top top',
  end: '+=300vh',
  pin: true,
  scrub: 1
});

// Reveal animation pattern
ScrollTrigger.create({
  trigger: element,
  start: 'top 80%',
  toggleActions: 'play none none none'
});
```

## Animation Types

### 1. Scroll-Pinned Sections
Used for immersive storytelling sections where content transforms as user scrolls.

### 2. SVG Path Animations
Line drawing effects for timelines, progress indicators, and decorative elements.

### 3. Stage-Based Transitions
Discrete state changes triggered at specific scroll thresholds.

### 4. Parallax Effects
Subtle depth through differential scroll speeds for background elements.

## Implementation Guidelines

### DO's
- ✅ Use `gsap.context()` for proper cleanup
- ✅ Kill ScrollTriggers on component unmount
- ✅ Use `useLayoutEffect` or `useGSAP` hook
- ✅ Test on different screen sizes
- ✅ Optimize for 60fps performance
- ✅ Use `will-change` CSS property sparingly
- ✅ Batch DOM reads/writes

### DON'Ts
- ❌ Create bouncy or spring animations
- ❌ Use excessive stagger effects
- ❌ Animate text readability properties
- ❌ Create infinite loops without user control
- ❌ Animate hundreds of individual DOM nodes
- ❌ Mix CSS transitions with GSAP animations

## Performance Considerations

### Optimization Techniques
1. **Use transform properties:** Stick to `x`, `y`, `scale`, `rotation`
2. **Avoid layout thrashing:** Don't animate `width`, `height`, `top`, `left`
3. **Batch animations:** Use timelines for coordinated animations
4. **Lazy load ScrollTriggers:** Create triggers only when elements enter viewport

### Debugging
Enable markers for development:
```javascript
ScrollTrigger.create({
  markers: true, // Shows start/end markers
  // ... other config
});
```

## R3F Integration

The `currentStage` state from ProcessTimeline can be passed to R3F components:

```tsx
<ProcessCanvas currentStage={currentStage} />
```

This enables synchronized 3D transformations based on scroll progress:
- Stage 1: Initial cluster formation
- Stage 2: Expansion and exploration
- Stage 3: Analysis visualization
- Stage 4: Final form generation

## Testing

### Test Page
**Location:** `/app/process-timeline-test/page.tsx`

Visit `http://localhost:3002/process-timeline-test` to see the motion system in action.

### Key Test Scenarios
1. Scroll through all stages smoothly
2. Verify stage transitions at correct percentages
3. Check line animation completes at 100% scroll
4. Ensure proper cleanup on navigation
5. Test mobile responsiveness

## Motion Utilities

### GSAP Configuration
```javascript
// Register plugins once
gsap.registerPlugin(ScrollTrigger);

// Global defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8
});
```

### Common Patterns

#### Fade In on Scroll
```javascript
gsap.from(element, {
  opacity: 0,
  y: 30,
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});
```

#### Scrubbed Timeline
```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});

tl.to(element1, { x: 100 })
  .to(element2, { opacity: 0 }, '<50%')
  .to(element3, { scale: 1.2 }, '-=0.5');
```

## Future Enhancements

1. **Lenis Integration:** Add smooth scroll for better feel
2. **Motion Preferences:** Respect `prefers-reduced-motion`
3. **Performance Monitoring:** Add FPS counter in dev mode
4. **Advanced Morphing:** SVG morphing for shape transitions
5. **Gesture Support:** Touch and swipe interactions

## Resources

- [GSAP Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Plugin](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [@gsap/react Integration](https://gsap.com/resources/React/)
- [Performance Best Practices](https://gsap.com/docs/v3/GSAP/gsap.ticker/)