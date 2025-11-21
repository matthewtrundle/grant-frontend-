/**
 * DNA Helix with Scroll Animation
 *
 * Enhanced version with GSAP scroll-driven rotation.
 * Rotates continuously as user scrolls through the page.
 *
 * Usage:
 * <DNAHelixScroll scrollRotation={720} /> // 2 full rotations
 */

'use client';

import { cn } from '@/lib/utils';
import { useScrollRotation } from '@/hooks/gsap/useScrollRotation';

export interface DNAHelixScrollProps {
  size?: 'sm' | 'md' | 'lg' | 'full';
  variant?: 'watermark' | 'featured' | 'icon';
  colorScheme?: 'default' | 'mono-teal' | 'mono-green';
  scrollRotation?: number; // Degrees to rotate (default: 360)
  className?: string;
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
    strand1: '#0B7E8C',
    strand2: '#2ECC71',
    bonds: '#4ABEFF',
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

export function DNAHelixScroll({
  size = 'md',
  variant = 'featured',
  colorScheme = 'default',
  scrollRotation = 360,
  className,
}: DNAHelixScrollProps) {
  const colors = colorSchemes[colorScheme];

  // Apply scroll rotation
  const svgRef = useScrollRotation<SVGSVGElement>({
    rotation: scrollRotation,
    scrub: 1,
  });

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        sizeClasses[size],
        opacityClasses[variant],
        className
      )}
    >
      <defs>
        {/* Gradient for Strand 1 (Teal) */}
        <linearGradient id="strand1-gradient-scroll" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.strand1} stopOpacity="0.8" />
          <stop offset="50%" stopColor={colors.strand1} stopOpacity="1" />
          <stop offset="100%" stopColor={colors.strand1} stopOpacity="0.8" />
        </linearGradient>

        {/* Gradient for Strand 2 (Green) */}
        <linearGradient id="strand2-gradient-scroll" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.strand2} stopOpacity="0.8" />
          <stop offset="50%" stopColor={colors.strand2} stopOpacity="1" />
          <stop offset="100%" stopColor={colors.strand2} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Left Strand (Teal - Sine Wave) */}
      <path
        d="M 30 0 Q 10 25, 30 50 T 30 100 T 30 150 T 30 200"
        stroke="url(#strand1-gradient-scroll)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Right Strand (Green - Cosine Wave) */}
      <path
        d="M 70 0 Q 90 25, 70 50 T 70 100 T 70 150 T 70 200"
        stroke="url(#strand2-gradient-scroll)"
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

      {/* Node circles at intersection points */}
      {variant !== 'watermark' && (
        <>
          {Array.from({ length: 9 }).map((_, i) => {
            const y = i * 25;
            return (
              <g key={`node-${i}`}>
                <circle
                  cx="30"
                  cy={y}
                  r="4"
                  fill={colors.strand1}
                  opacity="0.9"
                />
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
    </svg>
  );
}
