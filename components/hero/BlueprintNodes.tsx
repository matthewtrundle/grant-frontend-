/**
 * Blueprint Nodes - Reusable SVG node components
 * HexNode and RectNode with exact wireframe geometry
 */

import { DESIGN_TOKENS } from './design-tokens';

interface NodeProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  id?: string;
  className?: string;
  shouldPulse?: boolean;
  pulseDelay?: number;
  pulseDuration?: number;
  shouldBlip?: boolean;
  blipDelay?: number;
}

/**
 * Hexagon Node Component
 * 6-sided wireframe with subtle glow
 */
export function HexNode({ x, y, size = 24, color = DESIGN_TOKENS.colors.nodeCyan, id, className = '', shouldPulse = false, pulseDelay = 0, pulseDuration = 4, shouldBlip = false, blipDelay = 0 }: NodeProps) {
  // Calculate hexagon points (flat-top orientation)
  const height = size;
  const width = size * (Math.sqrt(3) / 2);

  // Points for a flat-top hexagon centered at (0, 0)
  const points = [
    [width, 0],                    // Right
    [width / 2, height / 2],       // Bottom-right
    [-width / 2, height / 2],      // Bottom-left
    [-width, 0],                   // Left
    [-width / 2, -height / 2],     // Top-left
    [width / 2, -height / 2],      // Top-right
  ]
    .map(([px, py]) => `${px},${py}`)
    .join(' ');

  return (
    <g transform={`translate(${x}, ${y})`} className={className}>
      {/* Micro-blip scale animation on entire node group */}
      {shouldBlip && (
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1;1.3;1"
          dur="0.3s"
          begin={`${blipDelay}s`}
          repeatCount="indefinite"
          additive="sum"
        />
      )}

      {/* Main hexagon outline */}
      <polygon
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={DESIGN_TOKENS.spacing.nodeStroke}
        filter="url(#nodeGlow)"
        opacity={shouldPulse ? undefined : 1}
      >
        {/* Opacity pulse animation */}
        {shouldPulse && (
          <animate
            attributeName="opacity"
            values="1;0.6;1"
            dur={`${pulseDuration}s`}
            begin={`${pulseDelay}s`}
            repeatCount="indefinite"
          />
        )}
      </polygon>

      {/* Inner hexagon for depth */}
      <polygon
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={DESIGN_TOKENS.spacing.nodeStroke * 0.6}
        opacity="0.4"
        transform="scale(0.6)"
      />

      {/* Center point */}
      <circle
        r="2"
        fill={color}
        opacity="0.8"
      />

      {id && (
        <text
          y={height + 12}
          textAnchor="middle"
          fill={color}
          fontSize="9"
          opacity="0.6"
          fontFamily="monospace"
        >
          {id}
        </text>
      )}
    </g>
  );
}

/**
 * Rectangle Node Component
 * Rounded rectangle with corner brackets
 */
export function RectNode({ x, y, size = 24, color = DESIGN_TOKENS.colors.nodeTeal, id, className = '', shouldPulse = false, pulseDelay = 0, pulseDuration = 4, shouldBlip = false, blipDelay = 0 }: NodeProps) {
  const width = size * 1.4;
  const height = size;
  const radius = 4;
  const bracketSize = 6;

  return (
    <g transform={`translate(${x}, ${y})`} className={className}>
      {/* Micro-blip scale animation on entire node group */}
      {shouldBlip && (
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1;1.3;1"
          dur="0.3s"
          begin={`${blipDelay}s`}
          repeatCount="indefinite"
          additive="sum"
        />
      )}

      {/* Main rounded rectangle */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill="none"
        stroke={color}
        strokeWidth={DESIGN_TOKENS.spacing.nodeStroke}
        filter="url(#nodeGlow)"
        opacity={shouldPulse ? undefined : 1}
      >
        {/* Opacity pulse animation */}
        {shouldPulse && (
          <animate
            attributeName="opacity"
            values="1;0.6;1"
            dur={`${pulseDuration}s`}
            begin={`${pulseDelay}s`}
            repeatCount="indefinite"
          />
        )}
      </rect>

      {/* Inner rectangle for depth */}
      <rect
        x={-width * 0.3}
        y={-height * 0.3}
        width={width * 0.6}
        height={height * 0.6}
        rx={radius * 0.6}
        ry={radius * 0.6}
        fill="none"
        stroke={color}
        strokeWidth={DESIGN_TOKENS.spacing.nodeStroke * 0.6}
        opacity="0.4"
      />

      {/* Corner brackets */}
      {/* Top-left */}
      <path
        d={`M ${-width / 2 + bracketSize} ${-height / 2} L ${-width / 2} ${-height / 2} L ${-width / 2} ${-height / 2 + bracketSize}`}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      {/* Top-right */}
      <path
        d={`M ${width / 2 - bracketSize} ${-height / 2} L ${width / 2} ${-height / 2} L ${width / 2} ${-height / 2 + bracketSize}`}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      {/* Bottom-right */}
      <path
        d={`M ${width / 2} ${height / 2 - bracketSize} L ${width / 2} ${height / 2} L ${width / 2 - bracketSize} ${height / 2}`}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      {/* Bottom-left */}
      <path
        d={`M ${-width / 2} ${height / 2 - bracketSize} L ${-width / 2} ${height / 2} L ${-width / 2 + bracketSize} ${height / 2}`}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />

      {/* Center point */}
      <circle
        r="1.5"
        fill={color}
        opacity="0.6"
      />

      {id && (
        <text
          y={height / 2 + 12}
          textAnchor="middle"
          fill={color}
          fontSize="9"
          opacity="0.6"
          fontFamily="monospace"
        >
          {id}
        </text>
      )}
    </g>
  );
}

/**
 * SVG Filter Definitions for Node Glows
 * Must be included in the parent SVG <defs>
 */
export function NodeFilters() {
  return (
    <defs>
      {/* Subtle node glow */}
      <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation={DESIGN_TOKENS.glow.nodeBlur} />
        <feFlood floodColor={DESIGN_TOKENS.colors.nodeCyan} floodOpacity="0.3" />
        <feComposite in2="SourceGraphic" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Pill glow (stronger) */}
      <filter id="pillGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation={DESIGN_TOKENS.glow.pillBlur} />
        <feFlood floodColor={DESIGN_TOKENS.colors.pillGlow} floodOpacity={DESIGN_TOKENS.opacity.pillGlow} />
        <feComposite in2="SourceGraphic" operator="in" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}
