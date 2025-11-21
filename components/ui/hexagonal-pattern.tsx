/**
 * Hexagonal Pattern Component
 *
 * Molecular structure-inspired hexagonal grid pattern
 * for biotech/science aesthetic backgrounds.
 *
 * Usage:
 * - <HexagonalPattern /> - Full screen background pattern
 * - <HexagonalPattern density="high" /> - More hexagons
 * - <HexagonalPattern className="opacity-5" /> - Very subtle
 */

'use client';

import { cn } from '@/lib/utils';

export interface HexagonalPatternProps {
  /**
   * Pattern density
   * - low: Large hexagons, fewer elements
   * - medium: Default balanced density
   * - high: Small hexagons, dense pattern
   */
  density?: 'low' | 'medium' | 'high';

  /**
   * Color scheme
   */
  color?: 'teal' | 'green' | 'gray';

  /**
   * Custom className
   */
  className?: string;
}

const densityConfig = {
  low: {
    size: 60,
    spacing: 70,
  },
  medium: {
    size: 40,
    spacing: 50,
  },
  high: {
    size: 20,
    spacing: 25,
  },
};

const colorConfig = {
  teal: '#0B7E8C',
  green: '#2ECC71',
  gray: '#E8EAED',
};

export function HexagonalPattern({
  density = 'medium',
  color = 'gray',
  className,
}: HexagonalPatternProps) {
  const { size, spacing } = densityConfig[density];
  const strokeColor = colorConfig[color];

  // Calculate viewBox dimensions for proper tiling
  const patternWidth = spacing * 2;
  const patternHeight = spacing * Math.sqrt(3);

  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={`hexPattern-${density}-${color}`}
          x="0"
          y="0"
          width={patternWidth}
          height={patternHeight}
          patternUnits="userSpaceOnUse"
        >
          {/* Create hexagons in a honeycomb pattern */}
          {/* Hexagon 1 */}
          <polygon
            points={getHexagonPoints(spacing, 0, size)}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            opacity="0.3"
          />
          {/* Hexagon 2 (offset) */}
          <polygon
            points={getHexagonPoints(spacing * 1.5, spacing * Math.sqrt(3) / 2, size)}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
            opacity="0.3"
          />
        </pattern>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill={`url(#hexPattern-${density}-${color})`}
      />
    </svg>
  );
}

/**
 * Generate hexagon points for SVG polygon
 */
function getHexagonPoints(centerX: number, centerY: number, size: number): string {
  const points: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2; // Start from top
    const x = centerX + size * Math.cos(angle);
    const y = centerY + size * Math.sin(angle);
    points.push([x, y]);
  }
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}

/**
 * Molecular Bonds Pattern
 *
 * Connected dots pattern representing molecular bonds
 */
export interface MolecularBondsProps {
  /**
   * Number of nodes
   */
  nodeCount?: number;

  /**
   * Node size
   */
  nodeSize?: number;

  /**
   * Line color
   */
  color?: 'teal' | 'green' | 'gray';

  className?: string;
}

export function MolecularBonds({
  nodeCount = 20,
  nodeSize = 4,
  color = 'gray',
  className,
}: MolecularBondsProps) {
  const strokeColor = colorConfig[color];

  // Generate random nodes
  const nodes: Array<{ x: number; y: number; id: number }> = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      id: i,
    });
  }

  // Connect nearby nodes (distance threshold)
  const connections: Array<[number, number]> = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only connect nodes within 20 units
      if (distance < 20) {
        connections.push([i, j]);
      }
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Draw connections */}
      {connections.map(([i, j], idx) => (
        <line
          key={`line-${idx}`}
          x1={`${nodes[i].x}%`}
          y1={`${nodes[i].y}%`}
          x2={`${nodes[j].x}%`}
          y2={`${nodes[j].y}%`}
          stroke={strokeColor}
          strokeWidth="1"
          opacity="0.15"
        />
      ))}

      {/* Draw nodes */}
      {nodes.map((node) => (
        <circle
          key={`node-${node.id}`}
          cx={`${node.x}%`}
          cy={`${node.y}%`}
          r={nodeSize}
          fill={strokeColor}
          opacity="0.3"
        />
      ))}
    </svg>
  );
}

/**
 * Hexagonal Badge Clip Path
 *
 * Creates a hexagonal-shaped container for badges/icons
 */
export function HexagonBadge({
  children,
  className,
  size = 'md',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        'flex items-center justify-center',
        className
      )}
      style={{
        clipPath:
          'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
      }}
    >
      {children}
    </div>
  );
}
