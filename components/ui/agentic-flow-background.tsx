"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AgenticFlowBackgroundProps {
  backgroundColor?: "light" | "dark";
  prominence?: "subtle" | "prominent";
  flowSpeed?: number; // Animation duration in seconds
  nodeCount?: number;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  id: string;
  size: number;
}

interface Connection {
  start: Node;
  end: Node;
  id: string;
}

// Unused interface removed - energy packets are managed inline
// interface EnergyPacket {
//   connectionId: string;
//   progress: number;
//   id: string;
// }

/**
 * AgenticFlowBackground - Neural network style animated background
 *
 * Features:
 * - Network of nodes (agents) connected by lines
 * - Animated "energy packets" traveling along connections
 * - Nodes pulse when energy passes through
 * - Adapts colors based on light/dark background
 * - Prominent option makes animations highly visible
 *
 * @example
 * // On white background
 * <AgenticFlowBackground backgroundColor="light" prominence="prominent" />
 *
 * // On dark background
 * <AgenticFlowBackground backgroundColor="dark" prominence="prominent" />
 */
export function AgenticFlowBackground({
  backgroundColor = "dark",
  prominence = "prominent",
  flowSpeed = 3,
  nodeCount = 25,
  className = "",
}: AgenticFlowBackgroundProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  // Color schemes based on background
  const colorScheme = backgroundColor === "light"
    ? {
        // Light background colors
        line: "#6C47FF",
        lineOpacity: prominence === "prominent" ? 0.25 : 0.12,
        packet: "#6C47FF",
        packetGlow: "#2F80ED",
        node: "#6C47FF",
        nodeCore: "#6C47FF",
        pulseColor: "#2F80ED",
      }
    : {
        // Dark background colors
        line: "#6C47FF",
        lineOpacity: prominence === "prominent" ? 0.35 : 0.15,
        packet: "#8B5CF6",
        packetGlow: "#60A5FA",
        node: "#8B5CF6",
        nodeCore: "#FFFFFF",
        pulseColor: "#60A5FA",
      };

  const baseOpacity = prominence === "prominent" ? 1 : 0.6;

  useEffect(() => {
    // Generate nodes in a distributed grid pattern
    const generatedNodes: Node[] = [];
    const cols = 6;
    const rows = 5;
    const margin = 10; // Percentage margin from edges

    for (let i = 0; i < nodeCount; i++) {
      // Create semi-random grid positions
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Base position on grid
      const xBase = margin + ((100 - 2 * margin) / (cols - 1)) * col;
      const yBase = margin + ((100 - 2 * margin) / (rows - 1)) * row;

      // Add randomness (±5%)
      const xOffset = (Math.random() - 0.5) * 8;
      const yOffset = (Math.random() - 0.5) * 8;

      generatedNodes.push({
        x: Math.max(5, Math.min(95, xBase + xOffset)),
        y: Math.max(5, Math.min(95, yBase + yOffset)),
        id: `node-${i}`,
        size: prominence === "prominent" ? 4 + Math.random() * 2 : 3 + Math.random() * 1,
      });
    }

    setNodes(generatedNodes);

    // Create connections between nearby nodes
    const generatedConnections: Connection[] = [];
    const maxDistance = 35; // Maximum connection distance in percentage
    const connectionsPerNode = prominence === "prominent" ? 3 : 2;

    generatedNodes.forEach((node, index) => {
      // Find nearby nodes
      const nearbyNodes = generatedNodes
        .map((otherNode, otherIndex) => ({
          node: otherNode,
          distance: Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) +
            Math.pow(node.y - otherNode.y, 2)
          ),
          index: otherIndex,
        }))
        .filter(({ index: otherIndex, distance }) =>
          otherIndex !== index && distance < maxDistance
        )
        .sort((a, b) => a.distance - b.distance)
        .slice(0, connectionsPerNode);

      // Create connections
      nearbyNodes.forEach(({ node: nearbyNode }) => {
        // Avoid duplicate connections
        const connectionExists = generatedConnections.some(
          conn =>
            (conn.start.id === node.id && conn.end.id === nearbyNode.id) ||
            (conn.start.id === nearbyNode.id && conn.end.id === node.id)
        );

        if (!connectionExists) {
          generatedConnections.push({
            start: node,
            end: nearbyNode,
            id: `connection-${node.id}-${nearbyNode.id}`,
          });
        }
      });
    });

    setConnections(generatedConnections);
  }, [nodeCount, prominence]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity: baseOpacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ minHeight: '100%', minWidth: '100%' }}
      >
        <defs>
          {/* Glow filter for energy packets */}
          <filter id="packet-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.5" />
            </feComponentTransfer>
          </filter>

          {/* Stronger glow for prominent mode */}
          <filter id="packet-glow-strong">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="2" />
            </feComponentTransfer>
          </filter>

          {/* Node glow filter */}
          <filter id="node-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          {/* Gradient for energy packets */}
          <radialGradient id="packet-gradient">
            <stop offset="0%" stopColor={colorScheme.packet} stopOpacity="1" />
            <stop offset="50%" stopColor={colorScheme.packetGlow} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colorScheme.packetGlow} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connection lines */}
        {connections.map((connection) => (
          <line
            key={connection.id}
            x1={`${connection.start.x}%`}
            y1={`${connection.start.y}%`}
            x2={`${connection.end.x}%`}
            y2={`${connection.end.y}%`}
            stroke={colorScheme.line}
            strokeWidth={prominence === "prominent" ? "2" : "1.5"}
            strokeOpacity={colorScheme.lineOpacity}
            strokeLinecap="round"
          />
        ))}

        {/* Animated energy packets traveling along connections */}
        {connections.map((connection, index) => {
          // Calculate animation delay so packets start at different times
          const delay = (index * flowSpeed) / connections.length;

          return (
            <motion.circle
              key={`packet-${connection.id}`}
              r={prominence === "prominent" ? "5" : "3"}
              fill="url(#packet-gradient)"
              filter={prominence === "prominent" ? "url(#packet-glow-strong)" : "url(#packet-glow)"}
              initial={{
                cx: `${connection.start.x}%`,
                cy: `${connection.start.y}%`,
                opacity: 0,
              }}
              animate={{
                cx: [`${connection.start.x}%`, `${connection.end.x}%`, `${connection.start.x}%`],
                cy: [`${connection.start.y}%`, `${connection.end.y}%`, `${connection.start.y}%`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: flowSpeed,
                delay: delay,
                repeat: Infinity,
                repeatDelay: flowSpeed * 0.5,
                ease: "easeInOut",
                times: [0, 0.45, 0.55, 1], // Control when opacity changes
              }}
            />
          );
        })}

        {/* Network nodes */}
        {nodes.map((node, index) => {
          // Nodes pulse when energy passes through (random timing)
          const pulseDelay = (index * 0.3) % flowSpeed;

          return (
            <g key={node.id}>
              {/* Node outer glow (pulses) */}
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size * 1.5}
                fill={colorScheme.node}
                opacity={0.3}
                filter="url(#node-glow)"
                initial={{ r: node.size * 1.5, opacity: 0.3 }}
                animate={{
                  r: [node.size * 1.5, node.size * 2.5, node.size * 1.5],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: flowSpeed,
                  delay: pulseDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Node ring */}
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size}
                fill="none"
                stroke={colorScheme.node}
                strokeWidth={prominence === "prominent" ? "2" : "1.5"}
                opacity={0.8}
              />

              {/* Node core */}
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size * 0.5}
                fill={colorScheme.nodeCore}
                initial={{ opacity: 0.6 }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: flowSpeed,
                  delay: pulseDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}

        {/* Subtle vignette to fade edges */}
        <defs>
          <radialGradient id="edge-vignette">
            <stop offset="50%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.3" />
          </radialGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#edge-vignette)"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}

/**
 * Simplified static version for performance-critical contexts
 */
export function StaticAgenticFlow({
  backgroundColor = "dark",
  className = "",
}: Pick<AgenticFlowBackgroundProps, "backgroundColor" | "className">) {
  const lineColor = backgroundColor === "light" ? "#6C47FF" : "#8B5CF6";
  const lineOpacity = backgroundColor === "light" ? 0.15 : 0.2;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern
            id="agentic-pattern"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* Network pattern */}
            <line x1="30" y1="30" x2="90" y2="30" stroke={lineColor} strokeWidth="1.5" strokeOpacity={lineOpacity} />
            <line x1="30" y1="30" x2="60" y2="90" stroke={lineColor} strokeWidth="1.5" strokeOpacity={lineOpacity} />
            <line x1="90" y1="30" x2="60" y2="90" stroke={lineColor} strokeWidth="1.5" strokeOpacity={lineOpacity} />

            {/* Nodes */}
            <circle cx="30" cy="30" r="3" fill={lineColor} opacity={lineOpacity * 2} />
            <circle cx="90" cy="30" r="3" fill={lineColor} opacity={lineOpacity * 2} />
            <circle cx="60" cy="90" r="3" fill={lineColor} opacity={lineOpacity * 2} />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#agentic-pattern)" />
      </svg>
    </div>
  );
}
