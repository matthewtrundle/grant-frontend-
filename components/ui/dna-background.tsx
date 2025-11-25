"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DNABackgroundProps {
  density?: "low" | "medium" | "high";
  glowColor?: string;
  animationSpeed?: number; // seconds for one pulse cycle
  opacity?: number;
  pattern?: "helix" | "molecular" | "hexagonal";
  className?: string;
}

interface MolecularNode {
  x: number;
  y: number;
  id: string;
  size: number;
}

interface MolecularBond {
  start: MolecularNode;
  end: MolecularNode;
  animated: boolean;
  bondType: "single" | "double";
}

/**
 * DNABackground - Animated molecular and DNA pattern background
 *
 * Creates a biotech/scientific aesthetic background with:
 * - SVG molecular bonds network
 * - Circular nodes representing atoms/molecules
 * - Animated glow on bonds (pulse effect)
 * - DNA helix, molecular bonds, or hexagonal patterns
 * - Teal/blue/lavender color scheme
 * - 10-20% opacity for subtlety
 *
 * @example
 * <DNABackground density="medium" glowColor="#14B8A6" pattern="molecular" opacity={0.12} />
 */
export function DNABackground({
  density = "medium",
  glowColor = "#14B8A6", // Teal by default (FundAid color)
  animationSpeed = 4,
  opacity = 0.12,
  pattern = "molecular",
  className = ""
}: DNABackgroundProps) {
  const [bonds, setBonds] = useState<MolecularBond[]>([]);
  const [nodes, setNodes] = useState<MolecularNode[]>([]);

  // Density configurations
  const densityConfig = {
    low: { nodeCount: 25, bondsPerNode: 2 },
    medium: { nodeCount: 45, bondsPerNode: 3 },
    high: { nodeCount: 65, bondsPerNode: 4 }
  };

  const config = densityConfig[density];

  useEffect(() => {
    if (pattern === "helix") {
      generateHelixPattern();
    } else if (pattern === "hexagonal") {
      generateHexagonalPattern();
    } else {
      generateMolecularPattern();
    }
  }, [density, pattern, config.nodeCount, config.bondsPerNode]);

  // Generate DNA helix pattern
  const generateHelixPattern = () => {
    const generatedNodes: MolecularNode[] = [];
    const generatedBonds: MolecularBond[] = [];
    const helixPoints = config.nodeCount;

    for (let i = 0; i < helixPoints; i++) {
      const progress = i / helixPoints;
      const angle = progress * Math.PI * 4; // 2 full rotations

      // First helix strand
      const x1 = 30 + Math.sin(angle) * 15;
      const y1 = 10 + progress * 80;

      // Second helix strand (opposite phase)
      const x2 = 70 + Math.sin(angle + Math.PI) * 15;
      const y2 = 10 + progress * 80;

      const node1 = {
        x: x1,
        y: y1,
        id: `helix-1-${i}`,
        size: 2 + Math.random() * 1
      };

      const node2 = {
        x: x2,
        y: y2,
        id: `helix-2-${i}`,
        size: 2 + Math.random() * 1
      };

      generatedNodes.push(node1, node2);

      // Connect strands with cross-links every few nodes
      if (i > 0 && i % 3 === 0) {
        const prevNode1 = generatedNodes[(i - 1) * 2];
        const prevNode2 = generatedNodes[(i - 1) * 2 + 1];

        // Cross-link between strands
        generatedBonds.push({
          start: node1,
          end: node2,
          animated: Math.random() < 0.25,
          bondType: "single"
        });

        // Backbone connections
        if (prevNode1) {
          generatedBonds.push({
            start: prevNode1,
            end: node1,
            animated: false,
            bondType: "double"
          });
        }

        if (prevNode2) {
          generatedBonds.push({
            start: prevNode2,
            end: node2,
            animated: false,
            bondType: "double"
          });
        }
      }
    }

    setNodes(generatedNodes);
    setBonds(generatedBonds);
  };

  // Generate molecular bond pattern
  const generateMolecularPattern = () => {
    const generatedNodes: MolecularNode[] = [];
    const cols = density === "low" ? 6 : density === "medium" ? 8 : 10;
    const rows = density === "low" ? 5 : density === "medium" ? 7 : 9;

    for (let i = 0; i < config.nodeCount; i++) {
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);

      // Add randomness to grid positions
      const xBase = (col / cols) * 100;
      const yBase = (row / rows) * 100;
      const xOffset = (Math.random() - 0.5) * 12;
      const yOffset = (Math.random() - 0.5) * 12;

      generatedNodes.push({
        x: Math.max(5, Math.min(95, xBase + xOffset)),
        y: Math.max(5, Math.min(95, yBase + yOffset)),
        id: `molecule-${i}`,
        size: 1.5 + Math.random() * 1.5
      });
    }

    setNodes(generatedNodes);

    // Generate molecular bonds connecting nearby nodes
    const generatedBonds: MolecularBond[] = [];
    const maxDistance = density === "low" ? 25 : density === "medium" ? 20 : 18;

    generatedNodes.forEach((node, index) => {
      const nearbyNodes = generatedNodes
        .filter((otherNode, otherIndex) => {
          if (otherIndex === index) return false;
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          return distance < maxDistance;
        })
        .slice(0, config.bondsPerNode);

      nearbyNodes.forEach((nearbyNode) => {
        const animated = Math.random() < 0.2;
        const bondType = Math.random() < 0.3 ? "double" : "single";

        generatedBonds.push({
          start: node,
          end: nearbyNode,
          animated,
          bondType
        });
      });
    });

    setBonds(generatedBonds);
  };

  // Generate hexagonal honeycomb pattern
  const generateHexagonalPattern = () => {
    const generatedNodes: MolecularNode[] = [];
    const generatedBonds: MolecularBond[] = [];
    const hexRadius = density === "low" ? 12 : density === "medium" ? 10 : 8;
    const cols = Math.ceil(100 / (hexRadius * 1.5));
    const rows = Math.ceil(100 / (hexRadius * Math.sqrt(3)));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xOffset = row % 2 === 0 ? 0 : hexRadius * 0.75;
        const x = col * hexRadius * 1.5 + xOffset;
        const y = row * hexRadius * Math.sqrt(3);

        if (x <= 100 && y <= 100) {
          const centerNode = {
            x,
            y,
            id: `hex-center-${row}-${col}`,
            size: 1.5
          };

          generatedNodes.push(centerNode);

          // Create hexagon vertices
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const vertexX = x + Math.cos(angle) * hexRadius * 0.7;
            const vertexY = y + Math.sin(angle) * hexRadius * 0.7;

            if (vertexX >= 0 && vertexX <= 100 && vertexY >= 0 && vertexY <= 100) {
              const vertexNode = {
                x: vertexX,
                y: vertexY,
                id: `hex-v-${row}-${col}-${i}`,
                size: 1
              };

              generatedBonds.push({
                start: centerNode,
                end: vertexNode,
                animated: Math.random() < 0.15,
                bondType: "single"
              });
            }
          }
        }
      }
    }

    setNodes(generatedNodes);
    setBonds(generatedBonds);
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Gradient for animated bonds */}
          <linearGradient id="dna-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0" />
            <stop offset="50%" stopColor={glowColor} stopOpacity="1" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </linearGradient>

          {/* Filter for glow effect */}
          <filter id="dna-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          {/* Filter for node glow */}
          <filter id="molecule-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="2" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Static bonds */}
        {bonds.filter(b => !b.animated).map((bond, index) => (
          <g key={`static-bond-${index}`}>
            <line
              x1={`${bond.start.x}%`}
              y1={`${bond.start.y}%`}
              x2={`${bond.end.x}%`}
              y2={`${bond.end.y}%`}
              stroke="white"
              strokeWidth={bond.bondType === "double" ? "1.5" : "1"}
              strokeOpacity="0.25"
              strokeLinecap="round"
            />
            {bond.bondType === "double" && (
              <line
                x1={`${bond.start.x}%`}
                y1={`${bond.start.y}%`}
                x2={`${bond.end.x}%`}
                y2={`${bond.end.y}%`}
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity="0.15"
                strokeLinecap="round"
                strokeDasharray="3 3"
              />
            )}
          </g>
        ))}

        {/* Animated bonds with glow */}
        {bonds.filter(b => b.animated).map((bond, index) => (
          <g key={`animated-bond-${index}`}>
            {/* Base bond */}
            <line
              x1={`${bond.start.x}%`}
              y1={`${bond.start.y}%`}
              x2={`${bond.end.x}%`}
              y2={`${bond.end.y}%`}
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.25"
              strokeLinecap="round"
            />

            {/* Animated glow overlay */}
            <motion.line
              x1={`${bond.start.x}%`}
              y1={`${bond.start.y}%`}
              x2={`${bond.end.x}%`}
              y2={`${bond.end.y}%`}
              stroke={glowColor}
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#dna-blur)"
              initial={{ strokeOpacity: 0 }}
              animate={{
                strokeOpacity: [0, 0.7, 0],
              }}
              transition={{
                duration: animationSpeed,
                delay: index * 0.6,
                repeat: Infinity,
                repeatDelay: animationSpeed * 2,
                ease: "easeInOut"
              }}
            />
          </g>
        ))}

        {/* Molecular nodes (atoms) */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Node glow */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size * 1.5}
              fill={glowColor}
              filter="url(#molecule-glow)"
              initial={{ opacity: 0.25, r: node.size * 1.5 }}
              animate={{
                opacity: [0.25, 0.6, 0.25],
                r: [node.size * 1.5, node.size * 2, node.size * 1.5]
              }}
              transition={{
                duration: animationSpeed * 1.8,
                delay: Math.random() * animationSpeed,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Node core */}
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="white"
              fillOpacity="0.7"
            />
          </g>
        ))}

        {/* Fade at edges for seamless effect */}
        <defs>
          <radialGradient id="dna-edge-fade">
            <stop offset="60%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.7" />
          </radialGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#dna-edge-fade)"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}

/**
 * Simpler static DNA/molecular pattern (performance-optimized for mobile)
 */
export function StaticDNABackground({
  opacity = 0.08,
  pattern = "molecular",
  className = ""
}: {
  opacity?: number;
  pattern?: "molecular" | "hexagonal";
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        {pattern === "hexagonal" ? (
          <defs>
            <pattern id="hexagon-pattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              {/* Hexagon shape */}
              <polygon
                points="30,1 50,14 50,38 30,51 10,38 10,14"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity="0.2"
              />
              <circle cx="30" cy="26" r="1" fill="white" opacity="0.3" />
            </pattern>
          </defs>
        ) : (
          <defs>
            <pattern id="molecular-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Molecular bonds */}
              <line x1="20" y1="20" x2="80" y2="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
              <line x1="80" y1="20" x2="20" y2="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" />

              {/* Atoms/nodes */}
              <circle cx="20" cy="20" r="2" fill="white" opacity="0.3" />
              <circle cx="80" cy="20" r="2" fill="white" opacity="0.3" />
              <circle cx="20" cy="80" r="2" fill="white" opacity="0.3" />
              <circle cx="80" cy="80" r="2" fill="white" opacity="0.3" />
              <circle cx="50" cy="50" r="1.5" fill="white" opacity="0.4" />
            </pattern>
          </defs>
        )}

        <rect
          width="100%"
          height="100%"
          fill={`url(#${pattern === "hexagonal" ? "hexagon-pattern" : "molecular-pattern"})`}
        />
      </svg>
    </div>
  );
}
