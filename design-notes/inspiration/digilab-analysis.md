# Digilab Analysis

**URL**: https://digilab.co

**Category**: Premium Minimalist Design with Micro-Animations

---

## What They're Doing

### Design Philosophy
- **Clean, spacious layouts** - Generous white space (or dark space)
- **Strong typography hierarchy** - Clear size/weight distinctions
- **Restrained color palette** - 2-3 colors max, mostly neutrals
- **Section-based storytelling** - Clear narrative flow: What we do → Team → Science

### Visual Patterns

1. **Typography-First Design**
   - Large, legible headings
   - Short, punchy copy
   - Serif + sans-serif pairing
   - Ample line-height for readability

2. **Subtle Motion**
   - Scroll-triggered fades
   - Element reveals (not all at once)
   - Hover state refinements
   - Micro-transitions (200-400ms)

3. **Grid Discipline**
   - Consistent column system
   - Aligned elements
   - Predictable spacing
   - Bento-grid style layouts

4. **Confidence Through Simplicity**
   - No visual noise
   - Every element earns its place
   - Premium = minimal, not busy

---

## Key Techniques to Adapt

### 1. Typography Hierarchy
```css
/* Digilab-style type scale */
h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

p.lead {
  font-family: 'Geist Sans', sans-serif;
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}
```

**Adaptation**:
- Hero: Playfair Display for headline
- Subheadings: Geist Sans semibold
- Body: Geist Sans regular with 1.5 line-height

---

### 2. Scroll-Triggered Reveals
```javascript
// Simple fade-in on scroll (no complex timelines)
gsap.fromTo('.reveal',
  { opacity: 0, y: 30 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.reveal',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  }
);
```

**Adaptation**:
- Problem section cards
- Impact statistics
- Testimonial cards
- Logo grid items

---

### 3. Spacious Layouts
```css
/* Generous spacing between sections */
section {
  padding-top: clamp(4rem, 10vw, 8rem);
  padding-bottom: clamp(4rem, 10vw, 8rem);
}

/* Breathing room in containers */
.container {
  max-width: 80rem; /* 1280px */
  padding-left: 2rem;
  padding-right: 2rem;
}
```

**Adaptation**:
- Use Tailwind: `py-16 md:py-24 lg:py-32`
- Container: `max-w-7xl mx-auto px-6`

---

### 4. Restrained Color Use
```javascript
// Digilab-style palette
const colors = {
  background: '#0A0A0F',      // Near black
  surface: '#1A1A24',         // Slightly lighter
  text: '#FAFAFA',            // Soft white
  accent: '#3B82F6',          // Blue (use sparingly)
  muted: 'rgba(250,250,250,0.5)'
};
```

**Adaptation**:
- Background: `#0a0a0a` (soft black)
- Text: `#ffffff` (white) and `#fafafa` (soft white)
- Accent: `#9333ea` (purple) - only for CTAs and highlights
- Use gray-500 for borders, gray-700 for muted text

---

### 5. Hover State Refinement
```css
/* Subtle, classy hover effects */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  border-color: rgba(147, 51, 234, 0.4);
}
```

**Adaptation**:
- Cards: Lift 4px, add shadow
- Buttons: Slight scale (1.02), glow shadow
- Links: Underline animation (width 0 → 100%)

---

## What to Copy

✅ **Typography System**
- Large, legible type
- Clear hierarchy
- Serif + sans-serif pairing

✅ **Generous Spacing**
- Breathing room between sections
- Don't cram content

✅ **Restrained Animation**
- Simple fades and slides
- 0.3-0.8s durations
- `power2.out` easing

✅ **Grid Discipline**
- Aligned elements
- Consistent gaps
- Predictable structure

✅ **Confidence Through Simplicity**
- If it doesn't add value, remove it
- White space > clutter

---

## What NOT to Copy

❌ **Overly Static** - We need more motion than Digilab (but not Corn Revolution level)
❌ **Too Minimal** - We have more content to convey (4-stage product)
❌ **Slow Load** - Some Digilab sites load heavy images upfront

---

## Inspiration Takeaways

1. **Polish Through Restraint**
   - Fewer colors = more elegant
   - Fewer animations = more impactful when used
   - Fewer fonts = clearer hierarchy

2. **Micro-Animations Matter**
   - Hover states feel responsive
   - Scroll reveals add delight
   - Transitions prevent jarring jumps

3. **Typography IS Design**
   - Good type can carry the whole site
   - Size, weight, spacing matter more than fancy effects
   - Readable = premium

4. **Trust White Space**
   - Cramming everything "above the fold" is amateur
   - Let sections breathe
   - Scrolling is expected and ok

---

## Combining with Corn Revolution

| Corn Revolution     | Digilab           | Our Approach              |
|---------------------|-------------------|---------------------------|
| Cinematic motion    | Subtle reveals    | Cinematic for hero/timeline, subtle for content |
| WebGL/3D            | 2D CSS            | 2D with depth illusion (parallax) |
| Heavy animations    | Light micro-anims | Balanced: hero is bold, rest is refined |
| Desktop-focused     | Responsive first  | Responsive with progressive complexity |
| Experimental        | Professional      | Professional with creative flair |

---

**How to Apply**: Use Digilab's restraint and polish for Problem, Impact, Trust sections. Use Corn Revolution's cinematic approach for Hero and Solution Timeline.
