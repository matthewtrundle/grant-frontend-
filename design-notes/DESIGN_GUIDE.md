# Design Guide: Grant Automation Platform

> **Design Language**: Cinematic science storytelling with premium polish
> **Inspiration**: Corn Revolution (WebGL depth) + Digilab (minimal elegance)
> **Vibe**: Premium, quiet confidence, scientific clarity

---

## Color Palette

### Primary Colors
```
Purple (Accent):     #9333ea  - Gradient highlights, CTAs, interactive elements
Blue (Secondary):    #0284c7  - Trust signals, data visualization
Teal/Cyan:           #14b8a6  - Science/healthcare theme, success states
```

### Neutral Palette
```
Black (Deep):        #000000  - True black for depth
Black (Soft):        #0a0a0a  - Primary background
Black (Light):       #1a1a1a  - Secondary surfaces
White (Pure):        #ffffff  - Primary text
White (Soft):        #fafafa  - Secondary text
Gray Scale:          50-900   - Tailwind defaults for hierarchy
```

### Healthcare/Science Theme
```
Ocean: 50-900        - Cyan/blue gradients for depth
Teal: 50-900         - Turquoise accents for vibrancy
Rose: 50-900         - Pink/red for emphasis (use sparingly)
```

### Semantic Colors
```
Success:             #10b981  - Confirmation, positive states
Warning:             #f59e0b  - Attention, caution
Error:               #ef4444  - Errors, destructive actions
```

---

## Typography

### Font Families
```
Primary (Sans):      Geist Sans       - Body text, UI elements
Monospace:           Geist Mono       - Code, technical data
Display (Serif):     Playfair Display - Hero headlines, elegant emphasis
```

### Type Scale
```
Display 1:           text-8xl  (96px)   - Hero headlines
Display 2:           text-7xl  (72px)   - Section headlines
Heading 1:           text-6xl  (60px)   - Major headings
Heading 2:           text-5xl  (48px)   - Sub-headings
Heading 3:           text-4xl  (36px)   - Card titles
Heading 4:           text-3xl  (30px)   - Component headers
Body Large:          text-xl   (20px)   - Lead paragraphs
Body:                text-base (16px)   - Primary body text
Body Small:          text-sm   (14px)   - Secondary text
Caption:             text-xs   (12px)   - Labels, metadata
```

### Typography Guidelines
- **Hero sections**: Use Playfair Display for elegance + scientific gravitas
- **Body content**: Geist Sans for readability and modern feel
- **Line height**: 1.5 for body text, 1.2 for headlines
- **Letter spacing**: Tight (-0.02em) for headlines, normal for body
- **Font weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

---

## Spacing & Layout

### Spacing Scale
Use Tailwind's default spacing scale (4px base unit):
```
xs:   0.5rem  (8px)   - Tight spacing
sm:   1rem    (16px)  - Component padding
md:   1.5rem  (24px)  - Section padding
lg:   2rem    (32px)  - Large gaps
xl:   3rem    (48px)  - Section margins
2xl:  4rem    (64px)  - Hero spacing
3xl:  6rem    (96px)  - Major section dividers
4xl:  8rem    (128px) - Full-page breaks
```

### Container & Grid
```
Container Max Width:  7xl (80rem / 1280px)
Grid Columns:         12-column system
Gap (Standard):       6 (1.5rem / 24px)
Gap (Tight):          4 (1rem / 16px)
Gap (Loose):          8 (2rem / 32px)
```

### Border Radius
```
sm:   0.25rem  (4px)   - Buttons, badges
md:   0.5rem   (8px)   - Cards, inputs (default)
lg:   0.75rem  (12px)  - Large cards
xl:   1rem     (16px)  - Feature sections
2xl:  1.5rem   (24px)  - Hero cards
full: 9999px           - Pills, circular elements
```

---

## Motion Language

### Animation Philosophy
- **Hero sections**: Slow, cinematic (1.2-2s durations)
- **Content sections**: Snappy, responsive (0.3-0.6s durations)
- **Micro-interactions**: Instant feedback (0.15-0.3s durations)
- **Scroll reveals**: Graceful, not jarring
- **Parallax**: Subtle depth, not dizzying

### Easing Curves (GSAP Compatible)
```javascript
// Smooth & Natural
ease-out-expo:      "expo.out"       - Default for entrances
ease-in-out-circ:   "circ.inOut"     - Smooth bidirectional
ease-out-cubic:     "cubic.out"      - Subtle ease

// Snappy & Responsive
ease-out-back:      "back.out(1.4)"  - Button hovers, pop-ins
ease-out-elastic:   "elastic.out"    - Playful interactions (use sparingly)

// Cinematic & Slow
power2-inOut:       "power2.inOut"   - Hero transitions
power3-out:         "power3.out"     - Scroll-driven reveals
```

### Duration Tokens
```javascript
// Micro-interactions
instant:   0.15s  - Hover state changes
quick:     0.3s   - Button clicks, toggles
snappy:    0.45s  - Small reveals, fades

// Standard animations
normal:    0.6s   - Card reveals, section transitions
smooth:    0.8s   - Larger components, modals

// Cinematic sequences
slow:      1.2s   - Hero title animations
cinematic: 2s     - Full-screen transitions, pinned sections
epic:      3s     - Background morphs, ambient motion
```

### Scroll Speed Multipliers (Parallax)
```javascript
// Layer depth simulation
background:   0.3   - Slowest (farthest back)
midground:    0.6   - Middle depth
foreground:   1.0   - Normal scroll speed (closest)
ultra-slow:   0.15  - Ambient background elements
```

---

## Shadow System

```css
/* Elevation Hierarchy */
subtle:   0 2px 8px rgba(0, 0, 0, 0.08)     - Slight lift
soft:     0 4px 16px rgba(0, 0, 0, 0.12)    - Card hover
lifted:   0 8px 24px rgba(0, 0, 0, 0.16)    - Active cards
float:    0 12px 32px rgba(0, 0, 0, 0.2)    - Modals, overlays
accent:   0 4px 16px rgba(147, 51, 234, 0.3) - Purple glow (CTAs)
```

---

## Component Patterns

### Cards
- **Base**: Soft background (#1a1a1a), subtle border, rounded-lg
- **Hover**: Scale 1.02, lifted shadow, subtle glow
- **Active**: Accent border, accent shadow

### Buttons
- **Primary**: Purple gradient, white text, accent shadow on hover
- **Secondary**: Transparent with border, hover fill
- **Ghost**: No background, hover subtle fill
- **Magnetic**: Cursor-attracted effect (use for CTAs)

### Backgrounds
- **Layered approach**: Base gradient → Radial orbs → Noise texture → Circuit pattern
- **Scroll-reactive**: Gradients shift hue/position on scroll
- **Depth**: Use multiple parallax layers for cinematic feel

### Typography Animation
- **Headlines**: Character-by-character reveal with stagger
- **Gradient text**: Animated background-position for shimmer
- **Scale transitions**: Title scales 0.9 → 1.1 during pin

---

## Accessibility

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable parallax, slow animations */
  /* Keep essential transitions (0.15s instant) */
  /* Remove decorative motion */
}
```

### Contrast Ratios
- **Body text**: Minimum 4.5:1 contrast
- **Large text**: Minimum 3:1 contrast
- **Interactive elements**: Minimum 3:1 contrast

### Focus States
- **Visible focus ring**: 2px solid accent color
- **Keyboard navigation**: Logical tab order
- **Skip links**: Provide for screen readers

---

## Design Tokens Reference

### Tailwind Config Extensions
```javascript
// Add to tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        'instant': '150ms',
        'quick': '300ms',
        'snappy': '450ms',
        'smooth': '800ms',
        'slow': '1200ms',
        'cinematic': '2000ms',
        'epic': '3000ms',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'circ-inOut': 'cubic-bezier(0.85, 0, 0.15, 1)',
        'back-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'soft': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'lifted': '0 8px 24px rgba(0, 0, 0, 0.16)',
        'float': '0 12px 32px rgba(0, 0, 0, 0.2)',
        'accent': '0 4px 16px rgba(147, 51, 234, 0.3)',
      },
    },
  },
};
```

---

## Usage Guidelines

1. **Start with PAGE_STRUCTURE.md** to define narrative flow
2. **Reference this guide** for all visual decisions
3. **Use Tailwind tokens** where possible for consistency
4. **Test motion** on low-end devices and with prefers-reduced-motion
5. **Iterate on timing** - start conservative, add drama where needed
6. **Document deviations** if you break from this system (with rationale)

---

**Last Updated**: 2025-11-21
**Maintained By**: SiteRebuild Agent (Art Director Role)
