# Corn Revolution Analysis

**URL**: https://cornrevolution.resn.global

**Category**: WebGL/Three.js Cinematic Scroll Experience

---

## What They're Doing

### Technical Approach
- **Full-bleed WebGL canvas** - Entire viewport is a 3D scene
- **Scroll-driven timelines** - Sections pin while content animates
- **GSAP ScrollTrigger** (or custom scroll controller) feeding values into shaders/3D scenes
- **Scrubbed animations** - Progress tied directly to scroll position (0-1 values)

### Visual Patterns

1. **Pinned 3D Scenes**
   - Camera moves through 3D space as user scrolls
   - Objects rotate, scale, and translate in 3D
   - Shaders create organic, fluid motion

2. **Depth & Layers**
   - Multiple Z-depth layers for parallax
   - Foreground, midground, background separation
   - Blur effects for depth of field

3. **Transitions**
   - Seamless morphing between scenes
   - Cross-fade overlays
   - Particle transitions between states

4. **Typography**
   - Text appears/disappears in sync with 3D scenes
   - Large, bold headlines
   - Minimal copy (let visuals tell story)

---

## Key Techniques to Adapt

### 1. Pinned Scroll Sections
```javascript
// GSAP ScrollTrigger pattern
ScrollTrigger.create({
  trigger: '.section',
  start: 'top top',
  end: '+=200%',        // Pin for 2 viewport heights
  pin: true,
  scrub: 1,             // Smooth scrubbing
  onUpdate: (self) => {
    // Feed progress (0-1) to animation
    animateScene(self.progress);
  }
});
```

**Adaptation for Grant Platform**:
- Pin Hero section (1 viewport)
- Pin Solution Timeline (4 viewports - one per stage)
- Pin Technology section with parallax layers

---

### 2. Scroll-Scrubbed Timelines
```javascript
// Tie animation progress directly to scroll
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.container',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,  // Animation scrubs with scroll
  }
});

tl.to('.object', { rotation: 360, scale: 2 })
  .to('.object', { x: 500 }, '-=0.5'); // Overlap
```

**Adaptation**:
- Title scales 0.9 → 1.1 during hero pin
- Cards enter/exit with scroll progress
- Background gradients shift with scroll

---

### 3. Parallax Depth
```javascript
// Different scroll speeds for depth illusion
gsap.to('.layer-1', { y: '50%', ease: 'none', scrollTrigger: {...} });
gsap.to('.layer-2', { y: '30%', ease: 'none', scrollTrigger: {...} });
gsap.to('.layer-3', { y: '10%', ease: 'none', scrollTrigger: {...} });
```

**Adaptation**:
- Background: 0.3x scroll speed
- Midground (badges, icons): 0.6x
- Foreground (content): 1.0x

---

### 4. Camera-Like Movement (Non-3D Alternative)
Instead of Three.js camera:
- Use CSS transforms (scale, translateZ) for depth
- Combine with blur filters
- Animate multiple layers independently

```javascript
// Simulate camera zoom with 2D transforms
tl.to('.scene', {
  scale: 1.2,
  filter: 'blur(0px)',
  scrollTrigger: { scrub: true }
});
```

---

## What NOT to Copy

❌ **Full WebGL implementation** - Too heavy for our use case
❌ **Complex shaders** - Overkill for marketing site
❌ **Long load times** - 3D assets are large
❌ **Desktop-only experiences** - Mobile support is critical

✅ **Do Extract**:
- Pinned section pattern
- Scrubbed scroll timelines
- Parallax layering concept
- Cinematic pacing and timing
- Minimal, impactful copy

---

## Performance Considerations

### Corn Revolution Challenges:
- Heavy WebGL rendering (GPU-intensive)
- Large 3D asset files
- Not great on mobile/low-end devices
- Accessibility concerns (motion sickness)

### Our Approach (Better):
- CSS/SVG animations (lighter)
- GSAP for timeline control (battle-tested)
- Progressive enhancement (mobile gets simplified)
- Respect `prefers-reduced-motion`
- Faster load times

---

## Inspiration Takeaways

1. **Slow, Cinematic Pacing**
   - Don't rush animations
   - Let moments breathe
   - 1-2s durations for hero elements

2. **Scroll as Progress Bar**
   - User controls the "playback" by scrolling
   - Immediate, tactile feedback
   - No auto-play (user-driven)

3. **Less Copy, More Visual**
   - Headlines + 1-2 sentences max per screen
   - Visuals carry the narrative
   - White space is your friend

4. **Seamless Transitions**
   - No jarring cuts
   - Crossfades between sections
   - Maintain flow

---

**How to Apply**: Use these patterns for Hero, Solution Timeline, and Technology sections.
