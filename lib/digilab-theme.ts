/**
 * Digilab Design System - Refined & Sophisticated
 *
 * Inspired by Digilab's restrained palette:
 * - Muted neutrals (warm beige, deep indigo)
 * - Purposeful accents (teal, coral, lavender)
 * - Generous breathing room
 * - Limited type scale (3 sizes only)
 */

export const digilibTheme = {
  // Neutral base colors
  backgrounds: {
    light: '#F5F1E9',    // Warm beige (very light, sophisticated)
    dark: '#0D061A',     // Deep indigo/purple (elegant, mysterious)
    accent: '#F9F7F4',   // Nearly white beige (subtle variation)
  },

  // Muted accent colors (not bright/harsh)
  accents: {
    teal: '#3BB59E',     // Muted teal (primary - trust, calm)
    coral: '#E4584A',    // Soft coral (secondary - energy, warmth)
    lavender: '#A68BEA', // Muted lavender (tertiary - innovation)
    sage: '#8BA888',     // Soft sage green (success, growth)
  },

  // Stage colors for the 4-stage process (matches hero gradient: blue → purple → orange → amber)
  stages: {
    profile: '#0891B2',   // Cyan-600 - Stage 1: Deep blue (foundation)
    discover: '#8B5CF6',  // Violet-500 - Stage 2: Purple (discovery)
    analyze: '#F97316',   // Orange-500 - Stage 3: Bright orange (analysis)
    generate: '#F59E0B',  // Amber-500 - Stage 4: Gold (success)
  },

  // Text colors
  text: {
    lightBg: '#0D061A',  // Deep indigo on light backgrounds
    darkBg: '#F5F1E9',   // Light beige on dark backgrounds
    muted: '#6B6B7C',    // Muted purple-gray for secondary text
    accent: '#3BB59E',   // Teal for highlights/links
  },

  // Typography - ONLY 3 SIZES
  typography: {
    // XL - Headlines only
    headline: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]',

    // Base - Body text (default for most content)
    body: 'text-base md:text-lg leading-relaxed',

    // SM - Small annotations, captions, labels
    small: 'text-sm leading-relaxed',
  },

  // Generous spacing - Digilab's signature breathing room
  spacing: {
    section: 'min-h-screen py-32 md:py-40 lg:py-48', // Huge vertical space
    container: 'max-w-6xl mx-auto px-8 md:px-12 lg:px-16', // Wide gutters
    textBlock: 'max-w-[65ch]', // Readable line length (60-70ch)
    breathing: 'my-16 md:my-24', // Generous vertical rhythm between elements
  },

  // Animation durations (keep subtle)
  animations: {
    fast: 300,
    medium: 600,
    slow: 1200,
  },
} as const;

// Utility: Get accent color by name
export function getAccentColor(accent: 'teal' | 'coral' | 'lavender' | 'sage'): string {
  return digilibTheme.accents[accent];
}

// Utility: Get stage color by step number (1-4)
export function getStageColor(stepNumber: number): string {
  const stageKeys = ['profile', 'discover', 'analyze', 'generate'] as const;
  const stageIndex = (stepNumber - 1) % 4; // Cycle through stages
  return digilibTheme.stages[stageKeys[stageIndex]];
}
