# Page Structure: Grant Automation Platform

> **Scroll-based storytelling architecture** for marketing pages
> **Approach**: Section-by-section narrative with cinematic transitions

---

## Home Page (`/`)

### Overview
8 scroll sections that progressively reveal the product story, from problem → solution → technology → trust → conversion.

---

## Section 1: Hero

**ID**: `hero`

**Title**: "Grants shouldn't be this hard."

**Subtitle**: "AI-powered grant writing that learns from winners. Turn months of work into days."

**Copy**:
> Traditional grant applications are brutal: months of research, endless drafts, and a 15% success rate if you're lucky. We've analyzed thousands of winning applications to build an AI system that writes like the experts who actually get funded.

**Visual Concept**:
- Full-viewport dark gradient background (ocean-900 → purple-900)
- Subtle animated circuit pattern in background
- Large Playfair Display headline with gradient text treatment
- Floating "TRL Assessment" badge with glow
- Two CTAs: "Start Free Assessment" (primary) + "See How It Works" (secondary)

**Scroll Beats**:
1. **0-100vh (pinned)**: Section stays fixed while user scrolls
   - Title scales from 0.9 → 1.05 and fades in (opacity 0 → 1)
   - Subtitle fades in with slight upward motion (20px → 0, opacity 0 → 1)
   - Background gradient slowly rotates 5° clockwise
   - Circuit pattern pulses subtly (opacity 0.05 → 0.1 → 0.05)
2. **100vh (unpin)**: Section releases, next section scrolls in
3. **Exit**: Slight blur applied to hero as it exits viewport (blur 0 → 2px)

**Components Needed**:
- `HeroSection.tsx`
- `hooks/useHeroAnimation.ts`
- `ui/animated-gradient-text.tsx` (already exists, enhance)

---

## Section 2: Problem Statement

**ID**: `problem`

**Title**: "The Grant Application Nightmare"

**Subtitle**: "Why do 85% of applications fail?"

**Copy**:
> Most teams spend 100+ hours per application, only to get rejected for reasons they never see. The process drains your best people, delays your research, and burns capital on consultants who can't guarantee results.

**Visual Concept**:
- 3-column grid of "pain points" with icons
- Dark cards with subtle borders + hover lift
- Red/amber accent colors for emphasis
- Animated counter showing "100+ hours wasted"

**Scroll Beats**:
1. **Section enters viewport**: Title fades in from bottom
2. **50% in viewport**: Pain point cards stagger-reveal left → right (0.2s delay between each)
3. **75% in viewport**: Counter animates from 0 → 100+ with number counting effect
4. **Fully visible**: Cards have subtle float animation (continuous)

**Components Needed**:
- `ProblemSection.tsx`
- `DarkFeatureCard.tsx` (already exists, reuse)
- `hooks/useScrollCounter.ts`

---

## Section 3: 4-Stage Solution Timeline

**ID**: `solution-timeline`

**Title**: "Your path to funded research"

**Subtitle**: "Four AI-powered stages that transform how you apply for grants"

**Copy**:
> From TRL assessment to final submission, our platform handles the heavy lifting. Each stage builds on the last, learning from your company profile and thousands of winning applications.

**Visual Concept**:
- **Horizontal scroll section** (Corn Revolution style)
- Section pins for 4x viewport heights
- 4 stage cards scroll horizontally: Profile → Discovery → Analysis → Generation
- Each card: large number, title, description, features list, price badge
- Progressive reveal: cards enter from right, brighten as they center
- Connecting line between cards pulses with scroll progress

**Scroll Beats**:
1. **Pin section** (scrollY 0-4 viewports)
2. **0-1vh**: Stage 1 (Profile) centers, brightens, scales up
3. **1-2vh**: Stage 1 dims, Stage 2 (Discovery) enters and centers
4. **2-3vh**: Stage 2 dims, Stage 3 (Analysis) enters and centers
5. **3-4vh**: Stage 3 dims, Stage 4 (Generation) enters and centers
6. **4vh**: Unpin, all 4 stages visible in a row as section exits

**Components Needed**:
- `SolutionTimeline.tsx`
- `hooks/usePinnedTimeline.ts`
- `StageCard.tsx` (new)

---

## Section 4: Technology Deep Dive

**ID**: `technology`

**Title**: "Powered by multi-agent AI architecture"

**Subtitle**: "Not just another chatbot. Real agents working together."

**Copy**:
> Our system uses 12 specialized AI agents, each trained on a specific aspect of grant writing. They collaborate in real-time, pulling from a vector database of winning applications to craft responses that match what assessors actually want to see.

**Visual Concept**:
- **3-layer parallax background**:
  - Layer 1 (slowest): Abstract neural network visualization
  - Layer 2 (medium): Floating tech badges (RAG, Mem0, OpenRouter, Qdrant)
  - Layer 3 (normal): Content cards
- Bento grid layout (2x3) showing tech features
- Code snippet previews with syntax highlighting
- Subtle animation: data "flowing" between agent nodes

**Scroll Beats**:
1. **Section enters**: Title fades in
2. **Parallax layers**: Background layers move at different speeds (0.3x, 0.6x, 1.0x)
3. **50% visible**: Bento grid items stagger-reveal
4. **75% visible**: "Data flow" animation starts (continuous loop)
5. **Mouse move**: Parallax layers respond to cursor (subtle tilt)

**Components Needed**:
- `TechnologySection.tsx`
- `hooks/useParallaxEffect.ts`
- `ui/bento-grid.tsx` (already exists, enhance)
- `CodeSnippet.tsx` (already exists)

---

## Section 5: Impact & ROI

**ID**: `impact`

**Title**: "Real results, measurable impact"

**Subtitle**: "Companies using our platform win more grants in less time"

**Copy**:
> Our customers report 40% higher success rates and save 100+ hours per application. That's more funding, faster turnaround, and your team focused on what matters: your research.

**Visual Concept**:
- Large statistics displayed as animated counters
- 3-column grid: "40% Success Rate" | "100+ Hours Saved" | "$10K+ Grants Won"
- Gradient number styling (purple → teal)
- Testimonial cards below stats
- Background: Soft purple glow pulsing behind stats

**Scroll Beats**:
1. **50% in viewport**: Title fades in
2. **60% in viewport**: Counters animate from 0 → final value
   - Use easing: slow start, fast finish (power3.out)
   - Add "+" or "%" suffix at end
   - Stagger: each counter starts 0.1s after previous
3. **75% in viewport**: Testimonial cards fade in with stagger
4. **Fully visible**: Stats have subtle scale pulse (0.98 → 1.0 → 0.98, 3s loop)

**Components Needed**:
- `ImpactSection.tsx`
- `hooks/useScrollCounter.ts` (reuse from Problem section)
- `ui/testimonial-card.tsx` (already exists)

---

## Section 6: Trust Signals

**ID**: `trust`

**Title**: "Trusted by innovative companies"

**Subtitle**: "From early-stage startups to established research institutions"

**Copy**:
> Join hundreds of teams who've streamlined their grant process and increased their funding success.

**Visual Concept**:
- Logo wall with grayscale company logos
- Logos fade to color on hover
- Marquee-style infinite scroll (optional)
- Customer quote carousel below logos
- Subtle background: Gradient orbs floating

**Scroll Beats**:
1. **Enters viewport**: Title + subtitle fade in
2. **50% visible**: Logo grid fades in with stagger (row by row)
3. **75% visible**: Quote carousel auto-rotates (5s intervals)
4. **Hover on logo**: Grayscale → color transition (0.3s)

**Components Needed**:
- `TrustSection.tsx`
- `ui/logo-wall.tsx` (already exists)
- `RotatingGrantStatements.tsx` (already exists, adapt for quotes)

---

## Section 7: Pricing Teaser

**ID**: `pricing-teaser`

**Title**: "Transparent pricing, no surprises"

**Subtitle**: "Start free. Scale as you grow."

**Copy**:
> Stage 1 & 2 are completely free forever. Pay only when you're ready to analyze or generate applications. No subscriptions, no hidden fees.

**Visual Concept**:
- 3 pricing cards: FREE | $199 | $999
- Cards on dark background with accent borders
- "Most Popular" badge on $199 card
- Each card: tier name, price, bullet features, CTA button
- Hover: Card lifts, border glows

**Scroll Beats**:
1. **Enters viewport**: Title fades in
2. **50% visible**: Pricing cards slide up with stagger (0.15s delay)
   - Left card enters first, then center, then right
   - Each card: translateY(40px) → 0, opacity 0 → 1
3. **Hover on card**: Scale 1.0 → 1.03, shadow elevates, border glow animates

**Components Needed**:
- `PricingTeaser.tsx`
- `PricingCard.tsx` (new, simplified version of pricing page cards)
- `ui/badge.tsx` (already exists)

---

## Section 8: Final CTA

**ID**: `final-cta`

**Title**: "Ready to win your next grant?"

**Subtitle**: "Start with a free TRL assessment. No credit card required."

**Copy**:
> Join innovative teams who are writing better grants in less time. Get your Technology Readiness Level score in minutes and see which grants you qualify for.

**Visual Concept**:
- Full-viewport section (like Hero but simpler)
- Centered content with large CTA
- Background: Animated gradient mesh with particle effects
- Single large button: "Start Free TRL Assessment →"
- Secondary link: "Talk to our team" (subtle, bottom)

**Scroll Beats**:
1. **Enters viewport**: Content fades in (opacity 0 → 1, 0.8s)
2. **50% visible**: CTA button scales in (scale 0.9 → 1.0) with spring easing
3. **Fully visible**: Background particles drift slowly (continuous)
4. **Hover on CTA**: Magnetic button effect (cursor-attracted)
   - Button scales to 1.05
   - Shadow elevates (accent glow)

**Components Needed**:
- `FinalCTA.tsx`
- `ui/magnetic-button.tsx` (already exists)
- `MeteorEffect.tsx` (already exists)

---

## Feature Pages (`/features/*`)

### General Structure (3-4 sections each)

All feature pages follow a similar pattern:

1. **Hero Section**: Feature-specific headline + description
2. **How It Works**: Step-by-step breakdown with visual aids
3. **Key Benefits**: 3-4 benefit cards with icons
4. **CTA**: Link to pricing or next feature

### Specific Pages

#### `/features/profiler` (Stage 1)
- Hero: "Know your TRL score"
- How it works: Input → Analysis → Score + Recommendations
- Benefits: Fast, accurate, free forever
- CTA: "Start Free Assessment"

#### `/features/discovery` (Stage 2)
- Hero: "Find grants you actually qualify for"
- How it works: TRL + profile → Web search → Ranked results → PDF report
- Benefits: Saves 40+ hours, free lead magnet, expert ranking
- CTA: "Discover Grants"

#### `/features/analysis` (Stage 3)
- Hero: "Understand the RFP before you write"
- How it works: Upload RFP → AI parsing → Timeline + Budget + Requirements
- Benefits: No missed deadlines, budget validation, compliance checks
- CTA: "Analyze Your Grant ($199)"

#### `/features/generation` (Stage 4)
- Hero: "AI agents that write like winning teams"
- How it works: Multi-agent system → RAG examples → Iterative writing → Assessor simulation
- Benefits: 10x faster, higher quality, continuous improvement
- CTA: "Generate Application ($999)"

#### `/features/trl`
- Hero: "What is Technology Readiness Level?"
- Education-focused: TRL 1-9 explained, why it matters, how to improve
- CTA: "Get Your TRL Score"

#### `/features/budget`
- Hero: "Budget validation that prevents rejections"
- Deep dive: Allowable costs, grant-specific rules, automated checking
- CTA: "Analyze Your Grant"

#### `/features/tracker`
- Hero: "Track your applications end-to-end"
- Features: Timeline management, deadline alerts, team collaboration
- CTA: "Start Tracking"

---

## Solutions Pages (`/solutions/*`)

### General Structure (4-5 sections)

1. **Hero**: Industry/size-specific headline
2. **Challenges**: Pain points specific to this segment
3. **How We Help**: Product features tailored to their needs
4. **Case Study**: Success story from similar company
5. **CTA**: Book demo or start free

### Specific Pages

#### `/solutions/healthcare`
- Focus: NIH, FDA grants, clinical trial funding
- Pain points: Regulatory compliance, budget complexity, long timelines
- CTA: "Find Healthcare Grants"

#### `/solutions/early-stage`
- Focus: SBIR, STTR, seed grants
- Pain points: Limited resources, first-time applications, proving feasibility
- CTA: "Start Your First Grant"

#### `/solutions/growth-stage`
- Focus: Scaling R&D, larger grants ($500K+)
- Pain points: Competing priorities, proving commercial viability, TRL 5-7 gap
- CTA: "Scale Your Funding"

#### `/solutions/enterprise`
- Focus: Multi-year grants, partnerships, consortiums
- Pain points: Coordination, compliance, team management
- CTA: "Talk to Enterprise Team"

---

## Animation Notes Reference

**For detailed animation timing, easing curves, and GSAP configurations, see ANIMATION_NOTES.md.**

---

**Last Updated**: 2025-11-21
**Maintained By**: SiteRebuild Agent (Narrative Architect Role)
