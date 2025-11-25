/**
 * Data Packets Component
 * Animated glowing dots traveling along connection lines using <animateMotion>
 */

import { DESIGN_TOKENS } from './design-tokens';

interface DataPacketsProps {
  nodes: Array<{ x: number; y: number }>;
  packetCount?: number;
}

interface PacketProps {
  pathId: string;
  color: string;
  delay: number;
  size?: number;
  duration?: string;
}

/**
 * Single data packet that travels along a path
 */
export function DataPacket({ pathId, color, delay, size = DESIGN_TOKENS.particles.packetSize, duration = DESIGN_TOKENS.animation.packetSpeed }: PacketProps) {
  return (
    <circle r={size} fill={color} opacity="0.9" filter="url(#nodeGlow)">
      <animateMotion
        dur={duration}
        repeatCount="indefinite"
        begin={`${delay}s`}
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
      {/* Pulse animation */}
      <animate
        attributeName="r"
        values={`${size};${size * 1.3};${size}`}
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
  );
}

/**
 * All data packets traveling along the diagonal network
 */
export function DataPackets({ nodes, packetCount = 18 }: DataPacketsProps) {
  if (nodes.length < 2) return null;

  // Colors for packets (mostly cyan/teal, rare purple)
  const colors = [
    DESIGN_TOKENS.colors.nodeCyan,
    DESIGN_TOKENS.colors.nodeTeal,
    DESIGN_TOKENS.colors.nodeCyan,
    DESIGN_TOKENS.colors.nodeTeal,
    DESIGN_TOKENS.colors.nodeCyan,
    DESIGN_TOKENS.colors.nodeTeal,
    '#A88CFF', // Rare purple
  ];

  // Generate path definitions for all connection lines
  const paths = nodes.slice(0, -1).map((node, i) => {
    const next = nodes[i + 1];
    return {
      id: `path-${i}`,
      d: `M ${node.x} ${node.y} L ${next.x} ${next.y}`,
    };
  });

  // Create packets distributed across different paths with varied properties
  const packets = [];
  for (let i = 0; i < packetCount; i++) {
    const pathIndex = i % paths.length;
    const delay = (i * 0.7) % 10; // Staggered delays
    const color = colors[i % colors.length];

    // Varied sizes (2-3px) and speeds (8-14s)
    const size = 2 + Math.random() * 1; // 2-3px
    const duration = `${8 + Math.random() * 6}s`; // 8-14s

    packets.push({
      pathId: paths[pathIndex].id,
      color,
      delay,
      size,
      duration,
    });
  }

  return (
    <g id="data-packets">
      {/* Hidden path definitions */}
      <defs>
        {paths.map((path) => (
          <path key={path.id} id={path.id} d={path.d} fill="none" />
        ))}
      </defs>

      {/* Animated packets */}
      {packets.map((packet, i) => (
        <DataPacket
          key={`packet-${i}`}
          pathId={packet.pathId}
          color={packet.color}
          delay={packet.delay}
          size={packet.size}
          duration={packet.duration}
        />
      ))}
    </g>
  );
}
