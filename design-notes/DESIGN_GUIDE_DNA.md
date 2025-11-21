# Design Guide: DNA Science Aesthetic

> **Design Language**: Biotech sophistication meets scientific precision meets elegant minimalism
> **Inspiration**: Digilab (elegant polish) + DNA/Molecular biology + Scientific data visualization
> **Vibe**: Professional, trustworthy, scientifically rigorous, biotech startup

---

## Color Palette

### Primary Colors (DNA/Biotech Theme)

```css
/* Background Colors */
--bg-primary:        #FAFBFD  /* Very light off-white with blue undertones */
--bg-secondary:      #F8F9FC  /* Slightly cooler off-white */
--bg-card:           #FFFFFF  /* Pure white for cards */
--bg-card-tint:      #F9FBFC  /* White with slight blue tint */

/* Primary Accents (DNA Strand Colors) */
--teal-primary:      #0B7E8C  /* Deep teal/cyan - DNA strands, trust */
--teal-secondary:    #1B9BA8  /* Lighter teal for gradients */
--green-primary:     #2ECC71  /* Vibrant green - biology/growth */
--green-secondary:   #27AE60  /* Deeper green for contrast */

/* Tech/Data Colors */
--blue-tech:         #3A9ECC  /* Soft blue for data elements */
--blue-light:        #4ABEFF  /* Light blue for highlights */

/* Supporting Colors */
--neon-green:        #00FF9F  /* DNA helix accent lines (use sparingly!) */
--neon-alt:          #20DD7A  /* Alternative neon green */
--navy-deep:         #1A2847  /* Deep navy for text and serious elements */
--gray-light:        #E8EAED  /* Subtle borders and dividers */
--gray-medium:       #BEC3C9  /* Secondary text */
```

### Gradient Combinations

```css
/* DNA Theme Gradients */
--gradient-dna:      linear-gradient(135deg, #0B7E8C, #2ECC71)
--gradient-teal:     linear-gradient(135deg, #0B7E8C, #1B9BA8)
--gradient-green:    linear-gradient(135deg, #27AE60, #2ECC71)
--gradient-tech:     linear-gradient(135deg, #3A9ECC, #4ABEFF)
--gradient-science:  linear-gradient(135deg, #1B9BA8, #2ECC71, #3A9ECC)

/* Subtle Background Gradients */
--gradient-bg:       linear-gradient(180deg, #FAFBFD, #F8F9FC)
```

### Semantic Colors

```css
--success:           #2ECC71  /* Green for success states */
--warning:           #F59E0B  /* Amber for warnings */
--error:             #EF4444  /* Red for errors */
--info:              #3A9ECC  /* Blue for information */
```

---

## Typography

### Font Families

```css
--font-sans:         'Inter', 'Sohne', system-ui, -apple-system  /* Primary sans-serif */
--font-display:      'Founders Grotesk', 'Inter', sans-serif     /* Display headlines */
--font-mono:         'Monaco', 'Courier New', monospace           /* Code/technical data */
```

**Note**: If Inter/Sohne aren't available, use Next.js default Geist Sans

### Type Scale

```css
/* Headlines (Scientific Precision) */
--text-hero:         72px / 1.1     /* Hero headlines */
--text-h1:           56px / 1.2     /* Section headlines */
--text-h2:           40px / 1.3     /* Subsection headlines */
--text-h3:           28px / 1.4     /* Card titles */
--text-h4:           20px / 1.5     /* Small headlines */

/* Body Text (Generous Letter-Spacing) */
--text-body-lg:      18px / 1.7     /* Large body, generous spacing */
--text-body:         16px / 1.6     /* Standard body */
--text-small:        14px / 1.5     /* Small text */
--text-caption:      12px / 1.4     /* Captions, labels */

/* Technical Text */
--text-code:         14px / 1.6     /* Monospace for data */
```

### Letter Spacing

```css
--tracking-tight:    -0.02em  /* Headlines */
--tracking-normal:    0.01em  /* Body text (generous) */
--tracking-wide:      0.02em  /* Small caps, labels */
```

---

## Visual Elements

### DNA Helix Graphics

**Usage**: Subtle watermarks, animated backgrounds, section dividers

**Colors**:
- Primary strand: `#0B7E8C` (teal)
- Secondary strand: `#2ECC71` (green)
- Connecting bonds: `#4ABEFF` (light blue)

**Opacity**: 10-30% for backgrounds, 100% for featured elements

**Animation**:
- Gentle rotation (slow, 20-30s cycle)
- Floating movement (vertical translation)
- Line drawing on scroll reveal

### Molecular/Biotech Patterns

**Hexagonal Patterns**:
- Size: 20-40px hexagons
- Stroke: 1px, `#E8EAED`
- Opacity: 5-15%
- Use: Subtle background texture

**Molecular Bonds**:
- Connected dots pattern
- Nodes: 4-8px circles
- Lines: 1px stroke, `#BEC3C9`
- Opacity: 10-20%

**Circular Nodes**:
- Size: 6-12px
- Colors: Teal/green/blue from palette
- Glow: Subtle box-shadow in matching color
- Animation: Gentle pulsing (2-3s cycle)

### Background Design

```css
/* Base Background */
background: #FAFBFD;

/* With Gradient */
background: linear-gradient(180deg, #FAFBFD 0%, #F8F9FC 100%);

/* With DNA Watermark (pseudo-element) */
background: url('dna-helix-watermark.svg') top right / 400px auto no-repeat,
            linear-gradient(180deg, #FAFBFD 0%, #F8F9FC 100%);
opacity: 0.1;
```

---

## Component Patterns

### Hero Section (DNA Theme)

```jsx
<section className="bg-gradient-to-b from-[#FAFBFD] to-[#F8F9FC] relative overflow-hidden">
  {/* DNA Helix Watermark - top right, low opacity */}
  <div className="absolute top-0 right-0 w-[400px] opacity-10">
    <DNAHelixSVG />
  </div>

  {/* Molecular Pattern Overlay */}
  <div className="absolute inset-0 opacity-5">
    <HexagonalPattern />
  </div>

  {/* Content */}
  <div className="relative z-10">
    <h1 className="text-7xl font-bold text-[#1A2847] leading-tight">
      {/* Tagline */}
    </h1>
    <p className="text-xl text-[#BEC3C9] leading-relaxed tracking-wide">
      {/* Subtext */}
    </p>

    {/* CTA Button */}
    <button className="bg-gradient-to-r from-[#0B7E8C] to-[#1B9BA8] text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all">
      {/* With subtle green glow on hover */}
    </button>
  </div>
</section>
```

### Feature Cards (Biotech Style)

```jsx
<div className="bg-white rounded-2xl p-8 border-l-4 border-[#0B7E8C] shadow-soft relative overflow-hidden">
  {/* DNA Helix Icon - top corner */}
  <div className="absolute top-4 right-4 w-8 h-8 opacity-20">
    <DNAHelixIcon />
  </div>

  {/* Hexagonal Icon Badge */}
  <div className="w-16 h-16 bg-gradient-to-br from-[#0B7E8C] to-[#2ECC71] hexagon-clip flex items-center justify-center mb-4">
    <Icon className="text-white" />
  </div>

  {/* Content */}
  <h3 className="text-2xl font-bold text-[#1A2847] mb-3">
    {/* Title */}
  </h3>
  <p className="text-gray-600 leading-relaxed">
    {/* Description */}
  </p>
</div>
```

### Data Visualization Areas

```jsx
<section className="bg-[#F9FBFC] py-20">
  {/* Circular Progress Indicator (Biotech Style) */}
  <div className="relative w-32 h-32">
    <svg className="transform -rotate-90">
      <circle cx="64" cy="64" r="60"
              stroke="#E8EAED"
              strokeWidth="8"
              fill="none" />
      <circle cx="64" cy="64" r="60"
              stroke="url(#gradient-dna)"
              strokeWidth="8"
              fill="none"
              strokeDasharray="377"
              strokeDashoffset="75" />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-3xl font-bold text-[#0B7E8C]">80%</span>
    </div>
  </div>

  {/* Hexagonal Layout Grid */}
  <div className="grid hexagonal-grid gap-6">
    {/* Items */}
  </div>
</section>
```

### Buttons & CTAs

```css
/* Primary Button (Teal) */
.btn-primary {
  background: linear-gradient(135deg, #0B7E8C, #1B9BA8);
  color: white;
  border: none;
  box-shadow: 0 2px 8px rgba(11, 126, 140, 0.2);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  box-shadow: 0 4px 16px rgba(46, 204, 113, 0.3); /* Subtle green glow */
  transform: translateY(-1px);
}

/* Secondary Button (Green) */
.btn-secondary {
  background: linear-gradient(135deg, #27AE60, #2ECC71);
  color: white;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #0B7E8C, #1B9BA8); /* Teal on hover */
}

/* Outline Button */
.btn-outline {
  background: transparent;
  border: 2px solid #0B7E8C;
  color: #0B7E8C;
}
```

---

## Icons & Graphics

### Icon System

**Style**: Line icons with 2px stroke
**Colors**:
- Default: `#1A2847` (navy)
- Accent: `#0B7E8C` (teal) or `#2ECC71` (green)
- Hover: Gradient fill

**Shapes**:
- ❌ No circles for badges
- ✅ Use hexagons (clip-path or SVG)
- ✅ Molecular structure icons
- ✅ DNA helix for key actions
- ✅ Atom/electron orbit icons for features

### Hexagonal Clip Path

```css
.hexagon-clip {
  clip-path: polygon(
    30% 0%, 70% 0%,
    100% 50%,
    70% 100%, 30% 100%,
    0% 50%
  );
}
```

---

## Animation & Motion

### Animation Principles

**Speed**: Slow, sophisticated (800-1200ms)
**Easing**: `cubic-bezier(0.4, 0.0, 0.2, 1)` - Material ease
**Physics**: Gentle, no bouncing (except DNA rotation)

### Allowed Animations

✅ **Fade-ins on scroll** (opacity 0 → 1, duration 800ms)
✅ **DNA helix gentle rotation** (20-30s cycle, infinite)
✅ **Molecular node pulsing** (scale 1 → 1.1 → 1, 2-3s)
✅ **Line drawing on scroll** (stroke-dashoffset animation)
✅ **Subtle hover lifts** (translateY -2px, shadow increase)
✅ **Smooth section transitions** (fade + slide)

### Forbidden Animations

❌ No spinning/flashy animations
❌ No loud color shifts
❌ No aggressive scaling (> 1.1x)
❌ No bouncing (except DNA if subtle)
❌ No neon pulsing effects

### DNA Helix Animation Example

```css
@keyframes dna-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

.dna-helix {
  animation: dna-float 20s ease-in-out infinite;
}
```

---

## Layout & Spacing

### Grid System

**Max Width**: 1280px (max-w-7xl)
**Padding**: 24px mobile, 48px desktop
**Section Spacing**: 80-120px between sections
**Card Gaps**: 24-32px

### Section Structure

```jsx
<section className="py-20 md:py-32"> {/* Generous vertical spacing */}
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-5xl font-bold text-[#1A2847] mb-16 text-center">
      {/* Section Title */}
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Content */}
    </div>
  </div>
</section>
```

---

## Dividers & Separators

### DNA Strand Divider

```jsx
<div className="w-full h-1 relative my-16">
  <svg className="w-full h-full">
    {/* Animated DNA double helix line */}
    <path d="..."
          stroke="url(#gradient-dna)"
          strokeWidth="2"
          fill="none"
          className="animate-draw" />
  </svg>
</div>
```

### Molecular Pattern Divider

```jsx
<div className="flex items-center justify-center my-12">
  <div className="flex gap-4">
    {[1,2,3,4,5].map(i => (
      <div key={i} className="w-2 h-2 rounded-full bg-[#0B7E8C] opacity-30" />
    ))}
  </div>
</div>
```

### Gradient Line

```css
.divider-gradient {
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    #0B7E8C 20%,
    #2ECC71 50%,
    #0B7E8C 80%,
    transparent 100%
  );
}
```

---

## Shadows & Depth

```css
/* Subtle Scientific Shadows */
--shadow-soft:       0 2px 8px rgba(26, 40, 71, 0.04);
--shadow-card:       0 4px 12px rgba(26, 40, 71, 0.06);
--shadow-lifted:     0 8px 24px rgba(26, 40, 71, 0.08);
--shadow-focus:      0 0 0 4px rgba(11, 126, 140, 0.1);  /* Teal focus ring */

/* Glow Effects (Use Sparingly) */
--glow-teal:         0 0 20px rgba(11, 126, 140, 0.3);
--glow-green:        0 0 20px rgba(46, 204, 113, 0.3);
```

---

## Accessibility

### Color Contrast

- **Text on white**: `#1A2847` (navy) - WCAG AAA
- **Gray text**: `#BEC3C9` - WCAG AA minimum
- **Links**: `#0B7E8C` with underline
- **Focus states**: 4px teal ring (`#0B7E8C`)

### Motion

- Respect `prefers-reduced-motion`
- Disable DNA rotation and pulsing for users with motion sensitivity
- Keep fade-ins only

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Key Differences from Previous Design

| Element | Old (Purple/Ocean) | New (DNA/Biotech) |
|---------|-------------------|-------------------|
| Background | Dark (#0a0a0a) | Light off-white (#FAFBFD) |
| Primary Color | Purple (#9333ea) | Teal (#0B7E8C) |
| Secondary Color | Ocean/Cyan (#14b8a6) | Green (#2ECC71) |
| Icons | Circles | Hexagons |
| Patterns | Circuit boards | DNA helix + molecular |
| Animation | Cinematic scroll | Subtle fade + DNA float |
| Vibe | Futuristic tech | Scientific biotech |

---

## Implementation Checklist

- [ ] Update `tailwind.config.ts` with teal/green palette
- [ ] Create `DNAHelixSVG` component
- [ ] Create `HexagonalPattern` component
- [ ] Create `MolecularBonds` component
- [ ] Update all section backgrounds to light off-white
- [ ] Replace circular icons with hexagonal badges
- [ ] Add DNA watermarks to hero section
- [ ] Implement gentle DNA rotation animation
- [ ] Add molecular node dividers between sections
- [ ] Update button styles with teal/green gradients
- [ ] Ensure all text uses navy (#1A2847) instead of white
- [ ] Test color contrast for accessibility
- [ ] Validate animations respect reduced motion

---

**Design Philosophy**:
> "Professional biotech startup meets scientific precision meets elegant minimalism. We do real science."
