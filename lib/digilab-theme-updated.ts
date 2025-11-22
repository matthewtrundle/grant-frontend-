/**
 * FundAid Light Theme - Updated Based on User Feedback
 *
 * Design Changes:
 * - Pure white backgrounds instead of beige
 * - Extended blue hero theme throughout
 * - Better contrast and polish
 * - Support for color-adaptive menu
 */

export const fundaidTheme = {
  // Updated backgrounds - pure white and blue-tinted grays
  backgrounds: {
    page: '#FFFFFF',       // Changed from #F5F2ED to pure white
    pageAlt: '#FAFBFC',    // Very light blue-gray for subtle variation
    panel: '#FFFFFF',      // Pure white for panels
    canvas: '#F0F4F8',     // Light blue-gray for 3D canvas backgrounds
    hero: 'linear-gradient(135deg, #0A2540 0%, #1E4D8B 50%, #2563EB 100%)', // Extended blue gradient
    heroOverlay: 'linear-gradient(180deg, transparent 0%, rgba(10, 37, 64, 0.05) 100%)', // Subtle blue tint
  },

  // Text colors - high contrast on white
  text: {
    main: '#0F172A',       // Darker for better contrast on white (was #14141F)
    muted: '#64748B',      // Slate gray for better readability (was #6B6B7C)
    data: '#475569',       // Darker data labels for white backgrounds
    onDark: '#FFFFFF',     // White text for dark backgrounds
    onDarkMuted: '#94A3B8', // Muted text on dark backgrounds
  },

  // Updated accent colors - more vibrant for white backgrounds
  accents: {
    teal: '#14B8A6',       // Slightly brighter teal (was #2FB49E)
    lavender: '#A78BFA',   // Brighter lavender (was #A98CEB)
    coral: '#EF4444',      // Brighter red for alerts (was #E4584A)
    blue: '#3B82F6',       // Primary blue matching hero
    blueLight: '#60A5FA',  // Light blue for hover states
    blueDark: '#1E4D8B',   // Dark blue from hero gradient
  },

  // Typography tokens - unchanged structure
  typography: {
    // Headlines - bold sans-serif (Inter via Geist Sans)
    h1: 'text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]',
    h2: 'text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]',
    h3: 'text-3xl md:text-4xl font-bold tracking-tight leading-[1.15]',

    // Stage-specific typography
    stageNumber: 'text-[110px] font-black leading-none',
    stageLabel: 'text-xs uppercase tracking-[0.3em] font-medium',

    // Body text
    body: 'text-sm md:text-base leading-relaxed max-w-[280px]',
    bodyLarge: 'text-base md:text-lg leading-relaxed',

    // Data metrics
    metric: 'font-mono text-[11px] leading-tight',
    metricValue: 'font-mono text-2xl md:text-3xl font-bold leading-none',

    // Small text
    small: 'text-xs leading-relaxed',
    caption: 'text-[10px] leading-tight',
  },

  // Updated spacing for cleaner white design
  spacing: {
    section: 'min-h-screen py-20 md:py-28 lg:py-36', // Slightly reduced padding
    container: 'max-w-7xl mx-auto px-6 md:px-8 lg:px-12',
    textBlock: 'max-w-[65ch]',
    breathing: 'my-12 md:my-16 lg:my-20',
  },

  // Animation durations - unchanged
  animations: {
    instant: 150,
    fast: 300,
    medium: 600,
    slow: 1200,
    cinematic: 2000,
  },

  // Updated opacity levels for white backgrounds
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
    particles: 1.0,
  },

  // New: Shadow system for depth on white
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px rgba(0, 0, 0, 0.06)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 12px 48px rgba(0, 0, 0, 0.16)',
    glow: '0 0 24px rgba(59, 130, 246, 0.15)', // Blue glow for hover
  },

  // New: Section-specific color modes for menu adaptation
  sections: {
    hero: { background: 'dark', menuColor: 'white' },
    mission: { background: 'light', menuColor: 'black' },
    timeline: { background: 'light', menuColor: 'black' },
    grantCircle: { background: 'dark', menuColor: 'white' },
    success: { background: 'light', menuColor: 'black' },
    contact: { background: 'light', menuColor: 'black' },
  },
} as const;

// Utility functions
export function getAccentColor(accent: keyof typeof fundaidTheme.accents): string {
  return fundaidTheme.accents[accent];
}

export function getStructuralOpacity(level: 'min' | 'mid' | 'max'): number {
  return fundaidTheme.opacity.structural[level];
}

export function getDataOpacity(level: 'min' | 'mid' | 'max'): number {
  return fundaidTheme.opacity.data[level];
}

export function getShadow(size: keyof typeof fundaidTheme.shadows): string {
  return fundaidTheme.shadows[size];
}

export function getSectionColorMode(section: keyof typeof fundaidTheme.sections): 'light' | 'dark' {
  return fundaidTheme.sections[section].background;
}

// Legacy export for migration
export const digilibTheme = fundaidTheme;