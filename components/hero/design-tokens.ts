/**
 * Deep-Space Control Room Design Tokens
 * Global constants for the hero section visual system
 */

export const DESIGN_TOKENS = {
  colors: {
    // Background
    bgGradientStart: '#020611',
    bgGradientEnd: '#050b16',

    // Grid & Structure
    gridStroke: '#0d1a22',

    // Particles
    starColor: 'rgba(80, 255, 255, 0.25)',

    // Nodes - Gradient colors (cool to warm) - 13% reduced saturation for precision aesthetic
    nodeCyan: '#4FE7CC',    // was #39F2C3 - reduced from 88% to 75% saturation
    nodeTeal: '#41C7C2',    // was #20D8D2 - reduced from 74% to 61% saturation
    nodePurple: '#B0A0FF',  // was #A88CFF - reduced from 100% to 87% saturation
    nodeCoral: '#FF8383',   // was #FF6D6D - reduced from 100% to 87% saturation

    // Hero Pill (legacy - keeping for now)
    pillBg: 'rgba(12, 20, 28, 0.75)',
    pillGlow: '#39F2C3',

    // Text
    textPrimary: '#ffffff',
  },

  typography: {
    fontFamily: "'Exo', 'Orbitron', monospace",
  },

  opacity: {
    grid: 0.03,
    lines: 0.6,
    pillGlow: 0.2,
    starBase: 0.25,
  },

  spacing: {
    gridSize: 60,
    nodeStroke: 1.5,
    lineStroke: 1.2,
  },

  animation: {
    starPulse: '5s',  // Slowed from 4s for more deliberate, measured feel
    packetSpeed: '12s',
    packetDelays: [0, 1.3, 2.8, 4.1, 5.5, 6.8, 8.2],
  },

  glow: {
    nodeBlur: 8,
    pillBlur: 20,
  },

  particles: {
    total: 70,
    randomPercent: 60,
    nodeTiedPercent: 40,
    velocityMin: 0.5,
    velocityMax: 1.1,
    jitterRange: 6,
    jitterDuration: 3,
    radius: 1.5,
    packetSize: 4,
  },

  mobile: {
    tablet: {
      breakpoint: 768,
      nodeCount: 6,
      particleCount: 40,
    },
    mobile: {
      breakpoint: 480,
      pillWidthPercent: 90,
    },
  },
} as const;

export type DesignTokens = typeof DESIGN_TOKENS;
