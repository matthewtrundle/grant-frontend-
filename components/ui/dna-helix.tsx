/**
 * DNA Helix SVG Component
 *
 * Animated double helix visualization for biotech/science aesthetic.
 * Can be used as background watermark or featured element.
 *
 * Usage:
 * - Watermark: <DNAHelix className="opacity-10" variant="watermark" />
 * - Featured: <DNAHelix variant="featured" animated />
 * - Icon: <DNAHelix size="sm" variant="icon" />
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface DNAHelixProps {
  /**
   * Size variant
   * - sm: 100px (icon size)
   * - md: 200px (default)
   * - lg: 400px (watermark)
   * - full: 100% width/height
   */
  size?: 'sm' | 'md' | 'lg' | 'full';

  /**
   * Visual variant
   * - watermark: Low opacity, subtle (10-30%)
   * - featured: Full opacity, vibrant
   * - icon: Simple, small version
   */
  variant?: 'watermark' | 'featured' | 'icon';

  /**
   * Enable gentle floating animation
   */
  animated?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Color scheme
   * - default: Teal + Green
   * - mono-teal: All teal
   * - mono-green: All green
   */
  colorScheme?: 'default' | 'mono-teal' | 'mono-green';
}

const sizeClasses = {
  sm: 'w-[100px] h-[200px]',
  md: 'w-[200px] h-[400px]',
  lg: 'w-[400px] h-[800px]',
  full: 'w-full h-full',
};

const opacityClasses = {
  watermark: 'opacity-10',
  featured: 'opacity-100',
  icon: 'opacity-100',
};

const colorSchemes = {
  default: {
    strand1: '#0B7E8C', // Teal
    strand2: '#2ECC71', // Green
    bonds: '#4ABEFF',   // Light blue
  },
  'mono-teal': {
    strand1: '#0B7E8C',
    strand2: '#1B9BA8',
    bonds: '#1B9BA8',
  },
  'mono-green': {
    strand1: '#2ECC71',
    strand2: '#27AE60',
    bonds: '#2ECC71',
  },
};

export function DNAHelix({
  size = 'md',
  variant = 'featured',
  animated = false,
  className,
  colorScheme = 'default',
}: DNAHelixProps) {
  const colors = colorSchemes[colorScheme];

  const Component = animated ? motion.svg : 'svg';
  const animationProps = animated
    ? {
        animate: {
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        },
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }
    : {};

  return (
    <Component
      viewBox="0 0 100 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        sizeClasses[size],
        opacityClasses[variant],
        className
      )}
      {...animationProps}
    >
      <defs>
        {/* Gradient for Strand 1 (Teal) */}
        <linearGradient id="strand1-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.strand1} stopOpacity="0.8" />
          <stop offset="50%" stopColor={colors.strand1} stopOpacity="1" />
          <stop offset="100%" stopColor={colors.strand1} stopOpacity="0.8" />
        </linearGradient>

        {/* Gradient for Strand 2 (Green) */}
        <linearGradient id="strand2-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.strand2} stopOpacity="0.8" />
          <stop offset="50%" stopColor={colors.strand2} stopOpacity="1" />
          <stop offset="100%" stopColor={colors.strand2} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Left Strand (Teal - Sine Wave) */}
      <path
        d="M 30 0 Q 10 25, 30 50 T 30 100 T 30 150 T 30 200"
        stroke="url(#strand1-gradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Right Strand (Green - Cosine Wave) */}
      <path
        d="M 70 0 Q 90 25, 70 50 T 70 100 T 70 150 T 70 200"
        stroke="url(#strand2-gradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Connecting Bonds (Horizontal Lines) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const y = i * 25 + 12.5;
        const bondOpacity = variant === 'watermark' ? 0.6 : 0.8;

        return (
          <line
            key={i}
            x1="30"
            y1={y}
            x2="70"
            y2={y}
            stroke={colors.bonds}
            strokeWidth="2"
            strokeOpacity={bondOpacity}
            strokeLinecap="round"
          />
        );
      })}

      {/* Optional: Node circles at intersection points */}
      {variant !== 'watermark' && (
        <>
          {Array.from({ length: 9 }).map((_, i) => {
            const y = i * 25;
            return (
              <g key={`node-${i}`}>
                {/* Left node (teal) */}
                <circle
                  cx="30"
                  cy={y}
                  r="4"
                  fill={colors.strand1}
                  opacity="0.9"
                />
                {/* Right node (green) */}
                <circle
                  cx="70"
                  cy={y}
                  r="4"
                  fill={colors.strand2}
                  opacity="0.9"
                />
              </g>
            );
          })}
        </>
      )}
    </Component>
  );
}

/**
 * DNA Helix Icon (Small Version)
 * Simplified version for use in UI elements
 */
export function DNAHelixIcon({ className }: { className?: string }) {
  return (
    <DNAHelix
      size="sm"
      variant="icon"
      className={cn('w-8 h-16', className)}
    />
  );
}

/**
 * DNA Helix Watermark (Background Version)
 * Low opacity version for background use
 */
export function DNAHelixWatermark({
  className,
  position = 'top-right',
}: {
  className?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
}) {
  const positionClasses = {
    'top-right': 'absolute top-0 right-0',
    'top-left': 'absolute top-0 left-0',
    'bottom-right': 'absolute bottom-0 right-0',
    'bottom-left': 'absolute bottom-0 left-0',
    'center': 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <DNAHelix
      size="lg"
      variant="watermark"
      animated
      className={cn(
        positionClasses[position],
        'pointer-events-none',
        className
      )}
    />
  );
}

/**
 * Animated DNA Helix for Hero Sections
 * Full featured version with animation
 */
export function DNAHelixHero({ className }: { className?: string }) {
  return (
    <DNAHelix
      size="lg"
      variant="featured"
      animated
      className={cn('mx-auto', className)}
    />
  );
}
