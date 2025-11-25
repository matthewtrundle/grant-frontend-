/**
 * FundAid Light Theme - Digilab-Inspired Data Visualization Aesthetic
 *
 * Design Philosophy:
 * - Restrained light backgrounds (warm cream #F5F2ED)
 * - Minimal accent colors (teal, lavender, coral)
 * - Clean sans-serif + mono for data
 * - Slow, scroll-driven motion
 * - No gradients, no glows, no confetti
 */

export const fundaidTheme = {
  // Pure white backgrounds - cleaner, more polished
  backgrounds: {
    page: '#FFFFFF',       // Pure white - main page background
    pageAlt: '#FAFBFC',    // Very light blue-gray for subtle variation
    panel: '#FFFFFF',      // Pure white for panels
    canvas: '#F0F4F8',     // Light blue-gray for 3D canvas backgrounds
    hero: 'linear-gradient(135deg, #0A2540 0%, #1E4D8B 50%, #2563EB 100%)', // Extended blue gradient
    heroOverlay: 'linear-gradient(180deg, transparent 0%, rgba(10, 37, 64, 0.05) 100%)', // Subtle blue tint
  },

  // Text colors - high contrast on white backgrounds
  text: {
    main: '#0F172A',       // Darker for better contrast on white
    muted: '#64748B',      // Slate gray for better readability
    data: '#475569',       // Darker data labels for white backgrounds
    onDark: '#FFFFFF',     // White text for dark backgrounds
    onDarkMuted: '#94A3B8', // Muted text on dark backgrounds
  },

  // Accent colors - more vibrant for white backgrounds
  accents: {
    teal: '#14B8A6',       // Slightly brighter teal
    lavender: '#A78BFA',   // Brighter lavender
    coral: '#EF4444',      // Brighter red for alerts
    blue: '#3B82F6',       // Primary blue matching hero
    blueLight: '#60A5FA',  // Light blue for hover states
    blueDark: '#1E4D8B',   // Dark blue from hero gradient
  },

  // Typography tokens - clean sans + mono
  typography: {
    // Headlines - bold sans-serif (Inter via Geist Sans)
    h1: 'text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]',
    h2: 'text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]',
    h3: 'text-3xl md:text-4xl font-bold tracking-tight leading-[1.15]',

    // Stage-specific typography
    stageNumber: 'text-[180px] font-black leading-none',  // EVEN MORE MASSIVE stage numbers (900 weight)
    stageLabel: 'text-xs uppercase tracking-[0.3em] font-medium',  // PROFILE / DISCOVERY labels

    // Body text - clean sans
    body: 'text-sm md:text-base leading-relaxed max-w-[280px]',  // Descriptions
    bodyLarge: 'text-base md:text-lg leading-relaxed',

    // Data metrics - monospace
    metric: 'font-mono text-[11px] leading-tight',  // Rendered at 40-60% opacity
    metricValue: 'font-mono text-2xl md:text-3xl font-bold leading-none',

    // Small text
    small: 'text-xs leading-relaxed',
    caption: 'text-[10px] leading-tight',
  },

  // Spacing - generous breathing room (Digilab signature)
  spacing: {
    section: 'min-h-screen py-24 md:py-32 lg:py-40',
    container: 'max-w-7xl mx-auto px-6 md:px-8 lg:px-12',
    textBlock: 'max-w-[65ch]',
    breathing: 'my-12 md:my-16 lg:my-20',
  },

  // Animation durations - slow, cinematic
  animations: {
    instant: 150,
    fast: 300,
    medium: 600,
    slow: 1200,      // Use this for most transitions
    cinematic: 2000, // Scroll-driven morphing
  },

  // Unified easing system - GSAP-compatible curves
  easing: {
    // Standard smooth transitions (use for most animations)
    smooth: 'power2.out',           // Default: smooth deceleration
    smoothIn: 'power2.in',          // Smooth acceleration
    smoothInOut: 'power2.inOut',    // Smooth both directions

    // Strong transitions (stage changes, major UI shifts)
    strong: 'power3.out',           // Strong deceleration
    strongIn: 'power3.in',          // Strong acceleration
    strongInOut: 'power3.inOut',    // Strong both directions

    // Elastic bounce effects (use sparingly for playful elements)
    elastic: 'back.out(1.4)',       // Moderate bounce-back
    elasticSoft: 'back.out(1.2)',   // Subtle bounce-back
    elasticStrong: 'back.out(1.7)', // Strong bounce-back
    elasticIn: 'back.in(1.4)',      // Bounce in (rare)
    elasticInOut: 'back.inOut(1.4)', // Bounce both ways (rare)

    // Linear (for continuous animations, particles, scan lines)
    linear: 'none',                 // No easing, constant speed

    // Cinematic (for scroll-driven animations)
    cinematic: 'power1.inOut',      // Very gentle, feels natural with scroll
  },

  // Opacity levels for structural elements
  opacity: {
    structural: {
      min: 0.1,   // Lighter lines on white (was 0.2)
      mid: 0.15,  // Lighter circles on white (was 0.3)
      max: 0.2,   // Lighter structural elements (was 0.4)
    },
    data: {
      min: 0.5,   // Darker data labels on white (was 0.4)
      mid: 0.6,   // Darker medium (was 0.5)
      max: 0.7,   // Darker maximum (was 0.6)
    },
    particles: 1.0,  // Particles can use full opacity
  },

  // Shadow system for depth on white backgrounds
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px rgba(0, 0, 0, 0.06)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 12px 48px rgba(0, 0, 0, 0.16)',
    glow: '0 0 24px rgba(59, 130, 246, 0.15)', // Blue glow for hover
  },

  // Section-specific color modes for menu adaptation
  sections: {
    hero: { background: 'dark', menuColor: 'white' },
    mission: { background: 'light', menuColor: 'black' },
    timeline: { background: 'light', menuColor: 'black' },
    grantCircle: { background: 'dark', menuColor: 'white' },
    success: { background: 'light', menuColor: 'black' },
    contact: { background: 'light', menuColor: 'black' },
  },
} as const;

// Utility: Get accent color by name
export function getAccentColor(accent: keyof typeof fundaidTheme.accents): string {
  return fundaidTheme.accents[accent];
}

// Utility: Get opacity level for structural elements
export function getStructuralOpacity(level: 'min' | 'mid' | 'max'): number {
  return fundaidTheme.opacity.structural[level];
}

// Utility: Get opacity level for data labels
export function getDataOpacity(level: 'min' | 'mid' | 'max'): number {
  return fundaidTheme.opacity.data[level];
}

// Utility: Get shadow by size
export function getShadow(size: keyof typeof fundaidTheme.shadows): string {
  return fundaidTheme.shadows[size];
}

// Utility: Get section color mode
export function getSectionColorMode(section: keyof typeof fundaidTheme.sections): 'light' | 'dark' {
  return fundaidTheme.sections[section].background;
}

// Deprecated: Legacy digilibTheme export for gradual migration
// TODO: Remove after all components migrated to fundaidTheme
export const digilibTheme = fundaidTheme;
