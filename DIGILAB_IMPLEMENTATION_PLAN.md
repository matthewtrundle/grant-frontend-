# Digilab-Style Scroll Story - Implementation Plan

## 🎯 Overview

Transform the Grant Automation Platform into a Digilab-style scroll story experience with pinned sections, scroll-driven animations, and narrative flow.

## 📖 Narrative Structure

### **The Grant Automation Story**

**Arc:** From research struggle → AI-powered solution → funding success

**Sections:**

1. **Hero: Transform Research into Funding**
   - Pinned headline that fades/transforms as you scroll
   - Vertical line growing to hint at scroll direction
   - Soft 3D DNA helix in background (already built, will enhance)
   - Duration: 100vh of scroll

2. **Mission: The Grant Problem**
   - Pinned text over animated research/grant visuals
   - Statement: "Researchers spend 40% of their time on grant applications. Only 20% get funded."
   - Animated dots representing failed grants fading away
   - Transition to solution: "We're changing that with AI"
   - Duration: 150vh of scroll

3. **4-Stage Process Timeline** (Core Value Prop)
   - **Left column:** Sticky vertical timeline with 4 steps
   - **Right column:** Interactive visualizations for each stage

   **Stage 1: Profile (Sky Blue)**
   - Text: "Understand Your Technology"
   - Visual: TRL assessment visualization, tech stack extraction animation
   - Interactive: Dots clustering into tech categories

   **Stage 2: Discover (Emerald Green)**
   - Text: "Find Perfect Matches"
   - Visual: Grant opportunities appearing as circles on a map/grid
   - Interactive: Filter animation, ranking scores appearing

   **Stage 3: Analyze (Purple)**
   - Text: "Deep Grant Analysis"
   - Visual: RFP document parsing, timeline generation, budget breakdown
   - Interactive: Vertical lines growing representing budget allocation

   **Stage 4: Generate (Amber)**
   - Text: "AI-Powered Writing"
   - Visual: Multi-agent system visualization (3 assessors + writer)
   - Interactive: Text appearing in sections, quality scores rising

   Duration: 400vh of scroll (100vh per stage)

4. **Interactive Visualization: Grant Matching Circle**
   - Dark section (switches to deep navy background)
   - Circular timeline showing grant deadlines
   - Info cards appearing with grant details
   - Sound bars replaced with "match quality" bars
   - Scrolling rotates the circle, highlights different grants
   - Duration: 150vh of scroll

5. **Success Stories**
   - Horizontal accordion of testimonials
   - Each opens to show: Company name, grant won, amount, success story
   - Animated metrics: "40% higher success rate", "$10M+ in funding secured"
   - Duration: 100vh of scroll

6. **Contact/CTA: Start Your Journey**
   - Centered headline with animated dots in background
   - Primary CTA: "Start Your Application"
   - Secondary CTA: "Schedule a Demo"
   - Fade out to footer
   - Duration: 100vh of scroll

**Total scroll experience:** ~1000vh (10x viewport height)

## 🎨 Design System

### Color Palette
- **Light sections:** #F8FAFB (soft off-white)
- **Dark sections:** #0A1628 (deep navy)
- **Accent backgrounds:** #F5F1E9 (warm beige)

### Stage Colors
- **Profile:** #0EA5E9 (Sky blue)
- **Discover:** #10B981 (Emerald)
- **Analyze:** #8B5CF6 (Purple)
- **Generate:** #F59E0B (Amber)

### Typography
- **Display:** 6xl-8xl, extrabold, tight tracking
- **Headlines:** 4xl-6xl, bold
- **Body:** base-lg, relaxed leading
- **Max-width:** 60ch for text blocks

### Spacing
- **Sections:** min-h-screen with generous padding
- **Container:** max-w-7xl, px-6 md:px-8

## 🛠️ Technical Implementation

### Dependencies (Already Installed)
- ✅ GSAP 3.13.0 with ScrollTrigger
- ✅ Lenis 1.3.15 for smooth scrolling
- ✅ React Three Fiber + Drei for 3D
- ✅ Next.js 14 with App Router
- ✅ Tailwind CSS

### File Structure
```
components/
├── sections/
│   ├── digilab/
│   │   ├── DigilabHero.tsx          # Pinned hero with vertical line
│   │   ├── MissionSection.tsx       # Pinned mission over animated bg
│   │   ├── ProcessTimeline.tsx      # 4-stage sticky timeline
│   │   ├── GrantCircle.tsx          # Circular grant visualization
│   │   ├── SuccessStories.tsx       # Testimonial accordions
│   │   └── ContactCTA.tsx           # Final CTA section
│   └── ui/
│       ├── StepCard.tsx             # Individual timeline step
│       ├── GrantCard.tsx            # Grant detail card
│       └── AnimatedDots.tsx         # Background dot animations
├── 3d/
│   ├── GrantCircle3D.tsx            # 3D circular timeline
│   ├── ProcessVisuals.tsx           # Stage-specific 3D visuals
│   └── ParticleBackground.tsx       # Animated particle systems
└── hooks/
    ├── useDigilabScroll.ts          # Master scroll controller
    ├── usePinnedSection.ts          # Already have this
    └── useStepAnimation.ts          # Timeline step activation
```

### Animation Strategy

**Hero Section:**
```typescript
// Pin section, animate vertical line growth
gsap.timeline({
  scrollTrigger: {
    trigger: heroRef,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    pin: true,
  }
})
.fromTo('.hero-line', { scaleY: 0 }, { scaleY: 1 })
.fromTo('.hero-heading span', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15 }, 0);
```

**Process Timeline:**
```typescript
// Sticky left column, scroll-activated steps
steps.forEach((step, i) => {
  ScrollTrigger.create({
    trigger: step.ref,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => setActiveStep(step.id),
    onEnterBack: () => setActiveStep(step.id),
  });
});
```

**Grant Circle:**
```typescript
// Rotate circle based on scroll
gsap.to(circleRef.rotation, {
  z: Math.PI * 2, // Full rotation
  scrollTrigger: {
    trigger: sectionRef,
    start: 'top center',
    end: 'bottom center',
    scrub: true,
  }
});
```

## 📊 Content Mapping

### Hero
- **Headline:** "Transform Research into Funding"
- **Subheadline:** "AI-powered grant automation for researchers who want to focus on science, not paperwork"
- **Visual:** Vertical line + soft 3D helix

### Mission
- **Problem Statement:** "Researchers spend 40% of their time on grants. Only 20% get funded."
- **Solution:** "We're changing that with AI-driven precision"
- **Visual:** Animated dots representing grants (red = failed, green = funded)

### Stage 1: Profile
- **Headline:** "Understand Your Technology"
- **Body:** "Extract your tech stack, assess TRL, and build a comprehensive company profile in minutes"
- **Visual:** Clustering dots representing tech categories
- **Metrics:** "5-minute profiling" "95% accuracy"

### Stage 2: Discover
- **Headline:** "Find Perfect Matches"
- **Body:** "AI searches thousands of grants, ranks by fit, and delivers a personalized PDF report"
- **Visual:** Grant circles appearing on a grid/map
- **Metrics:** "1000+ grants searched" "Top 10 matches"

### Stage 3: Analyze
- **Headline:** "Deep Grant Analysis"
- **Body:** "Parse RFPs, generate timelines, validate budgets, and ensure compliance"
- **Visual:** Document parsing, vertical budget bars growing
- **Metrics:** "100% compliant" "Timeline validated"

### Stage 4: Generate
- **Headline:** "AI-Powered Writing"
- **Body:** "Multi-agent system writes responses, simulates assessor feedback, and iterates to perfection"
- **Visual:** 3 assessor agents + writer agent visualization
- **Metrics:** "7+/10 quality score" "<50 API cost"

### Success Stories
- **Company 1:** BioTech Startup → $2.5M NIH Grant
- **Company 2:** Clean Energy → $1.8M DOE Grant
- **Company 3:** AI Research → $3.2M NSF Grant

### Contact CTA
- **Headline:** "Ready to Transform Your Grant Process?"
- **Primary CTA:** "Start Your Application"
- **Secondary CTA:** "Schedule a Demo"

## 🚀 Implementation Phases

### Phase 1: Structure & Hero (Day 1)
- [x] Design system and theme setup
- [ ] Rebuild hero with pinned animation
- [ ] Add vertical line growth
- [ ] Test scroll sync with Lenis

### Phase 2: Mission & Timeline (Day 2)
- [ ] Build mission section with animated background
- [ ] Create 4-stage process timeline
- [ ] Implement sticky left column
- [ ] Build stage-specific visualizations

### Phase 3: Interactive Elements (Day 3)
- [ ] Build grant circle 3D visualization
- [ ] Add scroll-driven rotation
- [ ] Create grant detail cards
- [ ] Implement bar chart animations

### Phase 4: Polish & Performance (Day 4)
- [ ] Success stories section
- [ ] Contact CTA with animated dots
- [ ] Performance optimization
- [ ] Mobile responsive testing
- [ ] Final polish and transitions

## ✅ Success Criteria

- [ ] Smooth 60fps scroll on modern browsers
- [ ] All animations sync perfectly with scroll position
- [ ] Clear narrative flow from problem → solution → stages → CTA
- [ ] Mobile responsive (disable pinning on small screens)
- [ ] Accessible (keyboard navigation, reduced motion support)
- [ ] Fast initial load (<3s)

## 🎯 Next Steps

**Immediate action:** Build DigilabHero.tsx with pinned animation to validate the approach. Once approved, build remaining sections in order.

**User decision needed:**
1. Keep existing hero or replace with new pinned version?
2. Build all sections or start with hero → timeline first?
3. Prefer R3F 3D visuals or SVG + CSS animations?
