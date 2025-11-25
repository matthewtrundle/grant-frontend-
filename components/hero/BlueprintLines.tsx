/**
 * Blueprint Lines Component
 * Connection lines between nodes + secondary branch offsets
 */

import { DESIGN_TOKENS } from './design-tokens';

interface LineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  id?: string;
  className?: string;
}

interface ScatteredNode {
  x: number;
  y: number;
  connectTo: number;
}

interface BlueprintLinesProps {
  nodes: Array<{ x: number; y: number }>;
  branchIndices?: number[];
  scatteredNodes?: ScatteredNode[];
}

/**
 * Single connection line with PCB trace style
 */
export function ConnectionLine({ from, to, id, className = '' }: LineProps) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={DESIGN_TOKENS.colors.nodeTeal}
      strokeWidth={DESIGN_TOKENS.spacing.lineStroke}
      opacity={DESIGN_TOKENS.opacity.lines}
      className={className}
    />
  );
}

/**
 * Branch line that extends from a node at an angle
 */
export function BranchLine({ from, angle, length, id }: { from: { x: number; y: number }; angle: number; length: number; id?: string }) {
  const to = {
    x: from.x + Math.cos(angle * Math.PI / 180) * length,
    y: from.y + Math.sin(angle * Math.PI / 180) * length,
  };

  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={DESIGN_TOKENS.colors.nodeTeal}
      strokeWidth={DESIGN_TOKENS.spacing.lineStroke}
      opacity={DESIGN_TOKENS.opacity.lines * 0.7}
      strokeDasharray="4,4"
    />
  );
}

/**
 * All blueprint lines: main connections + branch offsets + scattered node connections
 */
export function BlueprintLines({ nodes, branchIndices = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11], scatteredNodes = [] }: BlueprintLinesProps) {
  if (nodes.length < 2) return null;

  return (
    <g id="blueprint-lines">
      {/* Main connection lines between adjacent nodes */}
      {nodes.slice(0, -1).map((node, i) => (
        <ConnectionLine
          key={`line-${i}`}
          from={node}
          to={nodes[i + 1]}
          id={`connection-${i}`}
        />
      ))}

      {/* Secondary branch lines from specific nodes - MORE BRANCHING */}
      {branchIndices.map((index, i) => {
        if (index >= nodes.length) return null;

        const node = nodes[index];

        // More varied branch angles for organic branching effect
        const angles = [
          -60,  // Node 1: up-left steep
          -90,  // Node 2: straight up
          -45,  // Node 3: up-left diagonal
          180,  // Node 5: straight left
          135,  // Node 6: down-left diagonal
          170,  // Node 7: left slight up
          90,   // Node 8: straight down
          45,   // Node 9: down-right diagonal
          120,  // Node 10: down-left steep
          -30,  // Node 11: up-right diagonal
        ];

        // Varied branch lengths for visual interest
        const lengths = [70, 85, 80, 95, 75, 100, 90, 65, 85, 70];

        return (
          <BranchLine
            key={`branch-${index}-${i}`}
            from={node}
            angle={angles[i]}
            length={lengths[i]}
            id={`branch-${index}`}
          />
        );
      })}

      {/* Scattered node connections - tree/flower/timeline branches */}
      {scatteredNodes.map((scatteredNode, i) => {
        const mainNode = nodes[scatteredNode.connectTo];
        if (!mainNode) return null;

        return (
          <line
            key={`scattered-${i}`}
            x1={scatteredNode.x}
            y1={scatteredNode.y}
            x2={mainNode.x}
            y2={mainNode.y}
            stroke={DESIGN_TOKENS.colors.nodeTeal}
            strokeWidth={DESIGN_TOKENS.spacing.lineStroke}
            opacity={DESIGN_TOKENS.opacity.lines * 0.5}
            strokeDasharray="3,3"
          />
        );
      })}
    </g>
  );
}
