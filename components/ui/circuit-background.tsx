"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CircuitBackgroundProps {
  density?: "low" | "medium" | "high";
  glowColor?: string;
  animationSpeed?: number; // seconds for one pulse cycle
  opacity?: number;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  id: string;
}

interface Path {
  start: Node;
  end: Node;
  animated: boolean;
}

/**
 * CircuitBackground - Animated circuit board pattern with glowing nodes
 *
 * Creates a technical aesthetic background with:
 * - SVG line network with thin strokes (1-2px)
 * - Circular nodes at intersections
 * - Animated glow on random paths (pulse effect)
 * - 10-20% opacity for subtlety
 * - CSS animations for performance
 *
 * @example
 * <CircuitBackground density="medium" glowColor="#6C47FF" opacity={0.15} />
 */
export function CircuitBackground({
  density = "medium",
  glowColor = "#6C47FF",
  animationSpeed = 3,
  opacity = 0.15,
  className = ""
}: CircuitBackgroundProps) {
  const [paths, setPaths] = useState<Path[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);

  // Density configurations
  const densityConfig = {
    low: { nodeCount: 20, pathsPerNode: 2 },
    medium: { nodeCount: 40, pathsPerNode: 3 },
    high: { nodeCount: 60, pathsPerNode: 4 }
  };

  const config = densityConfig[density];

  useEffect(() => {
    // Generate nodes in a grid pattern with randomness
    const generatedNodes: Node[] = [];
    const cols = density === "low" ? 5 : density === "medium" ? 7 : 9;
    const rows = density === "low" ? 4 : density === "medium" ? 6 : 8;

    for (let i = 0; i < config.nodeCount; i++) {
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);

      // Add randomness to grid positions (±10%)
      const xBase = (col / cols) * 100;
      const yBase = (row / rows) * 100;
      const xOffset = (Math.random() - 0.5) * 10;
      const yOffset = (Math.random() - 0.5) * 10;

      generatedNodes.push({
        x: Math.max(5, Math.min(95, xBase + xOffset)),
        y: Math.max(5, Math.min(95, yBase + yOffset)),
        id: `node-${i}`
      });
    }

    setNodes(generatedNodes);

    // Generate paths connecting nearby nodes
    const generatedPaths: Path[] = [];
    const maxDistance = density === "low" ? 30 : density === "medium" ? 25 : 20;

    generatedNodes.forEach((node, index) => {
      // Find nearby nodes
      const nearbyNodes = generatedNodes
        .filter((otherNode, otherIndex) => {
          if (otherIndex === index) return false;
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          return distance < maxDistance;
        })
        .slice(0, config.pathsPerNode);

      // Create paths to nearby nodes
      nearbyNodes.forEach((nearbyNode) => {
        // Randomly assign some paths to be animated (20%)
        const animated = Math.random() < 0.2;

        generatedPaths.push({
          start: node,
          end: nearbyNode,
          animated
        });
      });
    });

    setPaths(generatedPaths);
  }, [density, config.nodeCount, config.pathsPerNode]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Gradient for animated paths */}
          <linearGradient id="circuit-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0" />
            <stop offset="50%" stopColor={glowColor} stopOpacity="1" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </linearGradient>

          {/* Filter for glow effect */}
          <filter id="circuit-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          {/* Filter for node glow */}
          <filter id="node-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="2" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Static paths */}
        {paths.filter(p => !p.animated).map((path, index) => (
          <line
            key={`static-${index}`}
            x1={`${path.start.x}%`}
            y1={`${path.start.y}%`}
            x2={`${path.end.x}%`}
            y2={`${path.end.y}%`}
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        ))}

        {/* Animated paths with glow */}
        {paths.filter(p => p.animated).map((path, index) => (
          <g key={`animated-${index}`}>
            {/* Base line */}
            <line
              x1={`${path.start.x}%`}
              y1={`${path.start.y}%`}
              x2={`${path.end.x}%`}
              y2={`${path.end.y}%`}
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />

            {/* Animated glow overlay */}
            <motion.line
              x1={`${path.start.x}%`}
              y1={`${path.start.y}%`}
              x2={`${path.end.x}%`}
              y2={`${path.end.y}%`}
              stroke={glowColor}
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#circuit-blur)"
              initial={{ strokeOpacity: 0 }}
              animate={{
                strokeOpacity: [0, 0.8, 0],
              }}
              transition={{
                duration: animationSpeed,
                delay: index * 0.5,
                repeat: Infinity,
                repeatDelay: animationSpeed * 2,
                ease: "easeInOut"
              }}
            />
          </g>
        ))}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Node glow */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill={glowColor}
              filter="url(#node-glow)"
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                r: [3, 4, 3]
              }}
              transition={{
                duration: animationSpeed * 1.5,
                delay: Math.random() * animationSpeed,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Node core */}
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="1.5"
              fill="white"
              strokeWidth="0.5"
            />
          </g>
        ))}

        {/* Fade at edges for seamless effect */}
        <defs>
          <radialGradient id="edge-fade">
            <stop offset="60%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.8" />
          </radialGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#edge-fade)"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}

/**
 * Simpler static circuit pattern (performance-optimized for mobile)
 */
export function StaticCircuitBackground({
  opacity = 0.1,
  className = ""
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        {/* Simple repeating pattern */}
        <defs>
          <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Horizontal lines */}
            <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />

            {/* Vertical lines */}
            <line x1="30" y1="0" x2="30" y2="100" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="60" y1="0" x2="60" y2="100" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />

            {/* Nodes */}
            <circle cx="30" cy="20" r="1.5" fill="white" opacity="0.5" />
            <circle cx="60" cy="50" r="1.5" fill="white" opacity="0.5" />
            <circle cx="30" cy="80" r="1.5" fill="white" opacity="0.5" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
    </div>
  );
}
