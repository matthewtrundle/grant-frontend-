/**
 * Decorative Elements Component Library
 *
 * Collection of SVG decorative elements for enhancing section layouts.
 * Includes corner brackets, connecting lines, dot patterns, and other visual elements.
 */

'use client';

import { cn } from '@/lib/utils';

/**
 * Corner Brackets - adds decorative corner brackets to cards/sections
 */
export function CornerBrackets({
  className,
  color = 'currentColor',
  size = 20,
  strokeWidth = 2,
  opacity = 0.3
}: {
  className?: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  opacity?: number;
}) {
  return (
    <>
      {/* Top left */}
      <svg
        className={cn('absolute top-0 left-0', className)}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ opacity }}
      >
        <path
          d={`M0,${size/3} L0,0 L${size/3},0`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>

      {/* Top right */}
      <svg
        className={cn('absolute top-0 right-0', className)}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ opacity }}
      >
        <path
          d={`M${size*2/3},0 L${size},0 L${size},${size/3}`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>

      {/* Bottom left */}
      <svg
        className={cn('absolute bottom-0 left-0', className)}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ opacity }}
      >
        <path
          d={`M0,${size*2/3} L0,${size} L${size/3},${size}`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>

      {/* Bottom right */}
      <svg
        className={cn('absolute bottom-0 right-0', className)}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ opacity }}
      >
        <path
          d={`M${size*2/3},${size} L${size},${size} L${size},${size*2/3}`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>
    </>
  );
}

/**
 * Dot Grid Pattern - subtle dot grid background
 */
export function DotGridPattern({
  className,
  color = '#6B6B7C',
  dotSize = 1,
  spacing = 40,
  opacity = 0.2
}: {
  className?: string;
  color?: string;
  dotSize?: number;
  spacing?: number;
  opacity?: number;
}) {
  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        opacity,
        backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`
      }}
    />
  );
}

/**
 * Grid Lines Pattern - creates a subtle grid overlay
 */
export function GridLinesPattern({
  className,
  color = '#6B6B7C',
  strokeWidth = 1,
  spacing = 100,
  opacity = 0.1
}: {
  className?: string;
  color?: string;
  strokeWidth?: number;
  spacing?: number;
  opacity?: number;
}) {
  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="grid-pattern"
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
}

/**
 * Connecting Line - animated gradient line between elements
 */
export function ConnectingLine({
  x1, y1, x2, y2,
  className,
  animated = false,
  gradient = true,
  strokeWidth = 1,
  strokeDasharray = '5,5',
  color = '#2FB49E'
}: {
  x1: string | number;
  y1: string | number;
  x2: string | number;
  y2: string | number;
  className?: string;
  animated?: boolean;
  gradient?: boolean;
  strokeWidth?: number;
  strokeDasharray?: string;
  color?: string;
}) {
  const id = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg className={cn('absolute inset-0 pointer-events-none', className)}>
      {gradient && (
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0"/>
            <stop offset="50%" stopColor={color} stopOpacity="0.5"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
      )}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={gradient ? `url(#${id})` : color}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        className={animated ? 'animate-dash' : ''}
      />
      {animated && (
        <style jsx>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -10;
            }
          }
          .animate-dash {
            animation: dash 1s linear infinite;
          }
        `}</style>
      )}
    </svg>
  );
}

/**
 * Floating Orb - decorative floating element for filling deadspace
 */
export function FloatingOrb({
  className,
  size = 100,
  color = '#2FB49E',
  opacity = 0.1,
  blur = 20
}: {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
}) {
  return (
    <div
      className={cn('absolute rounded-full', className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${blur}px)`
      }}
    />
  );
}

/**
 * Tech Lines - decorative technical schematic lines
 */
export function TechLines({
  className,
  orientation = 'horizontal',
  count = 3,
  spacing = 20,
  color = '#6B6B7C',
  opacity = 0.15
}: {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  count?: number;
  spacing?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      className={cn('absolute pointer-events-none', className)}
      style={{ opacity }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <line
          key={i}
          x1={orientation === 'horizontal' ? '0%' : `${(i + 1) * spacing}px`}
          y1={orientation === 'horizontal' ? `${(i + 1) * spacing}px` : '0%'}
          x2={orientation === 'horizontal' ? '100%' : `${(i + 1) * spacing}px`}
          y2={orientation === 'horizontal' ? `${(i + 1) * spacing}px` : '100%'}
          stroke={color}
          strokeWidth="1"
          strokeDasharray={i % 2 === 0 ? '8,4' : '4,4'}
        />
      ))}
    </svg>
  );
}

/**
 * Circuit Pattern - technical circuit-like decoration
 */
export function CircuitPattern({
  className,
  color = '#2FB49E',
  opacity = 0.2
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg
      className={cn('absolute pointer-events-none', className)}
      viewBox="0 0 200 200"
      style={{ opacity }}
    >
      {/* Main circuit path */}
      <path
        d="M20,50 L80,50 L80,100 L120,100 M120,100 L180,100"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M50,20 L50,80 L100,80 L100,120 L100,180"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />

      {/* Circuit nodes */}
      <circle cx="50" cy="50" r="4" fill={color} />
      <circle cx="100" cy="100" r="4" fill={color} />
      <circle cx="80" cy="50" r="3" fill={color} />
      <circle cx="80" cy="100" r="3" fill={color} />
      <circle cx="120" cy="100" r="3" fill={color} />
      <circle cx="100" cy="120" r="3" fill={color} />

      {/* Small connectors */}
      <rect x="45" y="75" width="10" height="10" stroke={color} strokeWidth="1" fill="none" />
      <rect x="95" y="125" width="10" height="10" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}