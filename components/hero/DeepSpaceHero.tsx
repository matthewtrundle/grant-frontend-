/**
 * Deep-Space Control Room Hero
 * Main hero component with proper z-index layering
 */

'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { DESIGN_TOKENS } from './design-tokens';
import { HexNode, RectNode, NodeFilters } from './BlueprintNodes';
import { BlueprintLines } from './BlueprintLines';
import { DataPackets } from './DataPackets';
import { useParticles } from './useParticles';

// Node positions along diagonal (bottom-left to top-right) - shifted up
const NODE_POSITIONS = [
  { x: 120, y: 680 },
  { x: 200, y: 590 },
  { x: 310, y: 510 },
  { x: 440, y: 420 },
  { x: 560, y: 360 },
  { x: 680, y: 320 },
  { x: 800, y: 280 },
  { x: 920, y: 230 },
  { x: 1040, y: 170 },
  { x: 1160, y: 120 },
  { x: 1280, y: 60 },
  { x: 1360, y: 20 },
];

// Mobile vertical layout (≤480px)
const NODE_POSITIONS_MOBILE = [
  { x: 700, y: 750 },
  { x: 700, y: 630 },
  { x: 700, y: 510 },
  { x: 700, y: 390 },
  { x: 700, y: 270 },
  { x: 700, y: 150 },
];

// Scattered nodes - tree/flower/timeline branches (20 nodes) - shifted up
const SCATTERED_NODES = [
  // Upper left branches
  { x: 80, y: 550, connectTo: 0 },
  { x: 140, y: 480, connectTo: 1 },
  { x: 60, y: 380, connectTo: 1 },
  { x: 180, y: 420, connectTo: 2 },
  // Left side branches
  { x: 250, y: 350, connectTo: 2 },
  { x: 320, y: 440, connectTo: 3 },
  { x: 380, y: 280, connectTo: 3 },
  { x: 490, y: 320, connectTo: 4 },
  // Middle branches
  { x: 540, y: 240, connectTo: 5 },
  { x: 610, y: 420, connectTo: 5 },
  { x: 750, y: 200, connectTo: 6 },
  { x: 720, y: 380, connectTo: 6 },
  // Right side branches
  { x: 870, y: 150, connectTo: 7 },
  { x: 850, y: 320, connectTo: 7 },
  { x: 980, y: 90, connectTo: 8 },
  { x: 1020, y: 250, connectTo: 8 },
  // Upper right branches
  { x: 1120, y: 50, connectTo: 9 },
  { x: 1180, y: 200, connectTo: 10 },
  { x: 1260, y: 10, connectTo: 11 },
  { x: 1320, y: 100, connectTo: 11 },
];

// Precision control room color assignment (70% cyan/teal, 20% purple, 10% coral)
const getControlRoomColor = (index: number, total: number): string => {
  // Primary colors (cool precision) - 70%
  const primaryColors = [DESIGN_TOKENS.colors.nodeCyan, DESIGN_TOKENS.colors.nodeTeal];

  // Highlight zones (attention) - 20%
  const highlightColor = DESIGN_TOKENS.colors.nodePurple;

  // Critical alerts (rare) - 10%
  const alertColor = DESIGN_TOKENS.colors.nodeCoral;

  // Use modulo patterns to create strategic color placement
  // Most nodes are cyan/teal (70%)
  if (index % 10 === 0 || index % 10 === 9) {
    // 10% coral on specific nodes
    return alertColor;
  } else if (index % 5 === 2 || index % 7 === 3) {
    // 20% purple on specific nodes
    return highlightColor;
  } else {
    // 70% cyan/teal, alternating
    return primaryColors[index % 2];
  }
};

// Generate micro-dots for bottom-left density (25-30 dots)
const MICRO_DOTS = Array.from({ length: 28 }, (_, i) => ({
  x: Math.random() * 400, // x: 0-400
  y: 500 + Math.random() * 400, // y: 500-900
  radius: 0.5 + Math.random() * 0.5, // 0.5-1px
  opacity: 0.08 + Math.random() * 0.04, // 0.08-0.12
}));

// Bracket markers for nodes in bottom-left quadrant
const BRACKET_MARKERS = [
  { x: 80, y: 680, node: 0 },
  { x: 160, y: 590, node: 1 },
  { x: 270, y: 510, node: 2 },
  { x: 400, y: 420, node: 3 },
  { x: 520, y: 360, node: 4 },
];

export function DeepSpaceHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1400);

  // Track window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive node selection
  const activeNodes = useMemo(() => {
    if (windowWidth <= DESIGN_TOKENS.mobile.mobile.breakpoint) {
      // Mobile: vertical layout with 6 nodes
      return NODE_POSITIONS_MOBILE;
    } else if (windowWidth <= DESIGN_TOKENS.mobile.tablet.breakpoint) {
      // Tablet: 6 evenly spaced nodes from diagonal
      return [
        NODE_POSITIONS[0],
        NODE_POSITIONS[2],
        NODE_POSITIONS[4],
        NODE_POSITIONS[6],
        NODE_POSITIONS[9],
        NODE_POSITIONS[11],
      ];
    }
    // Desktop: all 12 nodes
    return NODE_POSITIONS;
  }, [windowWidth]);

  // Responsive particle count
  const particleCount = useMemo(() => {
    if (windowWidth <= DESIGN_TOKENS.mobile.tablet.breakpoint) {
      return DESIGN_TOKENS.mobile.tablet.particleCount;
    }
    return DESIGN_TOKENS.particles.total;
  }, [windowWidth]);

  // Generate particles
  const particles = useParticles({
    nodePositions: activeNodes,
    viewBoxWidth: 1400,
    viewBoxHeight: 900,
    count: particleCount,
  });

  // Pulsing node animations removed - too distracting
  // const pulsingNodes = useMemo(() => {
  //   const totalNodes = activeNodes.length + SCATTERED_NODES.length;
  //   const pulseCount = Math.floor(totalNodes * 0.3); // 30% of nodes
  //   const pulsing = new Set<number>();
  //
  //   while (pulsing.size < pulseCount) {
  //     pulsing.add(Math.floor(Math.random() * totalNodes));
  //   }
  //
  //   return Array.from(pulsing).reduce((acc, nodeIndex) => {
  //     acc[nodeIndex] = {
  //       delay: Math.random() * 2, // 0-2s delay
  //       duration: 3 + Math.random() * 2, // 3-5s duration
  //     };
  //     return acc;
  //   }, {} as Record<number, { delay: number; duration: number }>);
  // }, [activeNodes.length]);

  // Blip animations removed - all node animations disabled for cleaner aesthetic
  // const blippingNodes = useMemo(() => {
  //   const totalNodes = activeNodes.length + SCATTERED_NODES.length;
  //   const blipCount = 6 + Math.floor(Math.random() * 3); // 6-8 nodes
  //   const blipping = new Set<number>();
  //
  //   while (blipping.size < blipCount) {
  //     blipping.add(Math.floor(Math.random() * totalNodes));
  //   }
  //
  //   return Array.from(blipping).reduce((acc, nodeIndex) => {
  //     acc[nodeIndex] = {
  //       delay: Math.random() * 3, // 0-3s initial delay for stagger
  //     };
  //     return acc;
  //   }, {} as Record<number, { delay: number }>);
  // }, [activeNodes.length]);

  // Track scroll for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col bg-gradient-to-br from-white via-fundaid-section-accent to-fundaid-section-subtle"
    >
      {/* Sticky Navigation */}
      <nav
        className={cn(
          'sticky top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-fundaid-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="fundaid-wordmark text-2xl text-fundaid-accent-primary transition-colors duration-300 font-black tracking-wide"
          >
            FUNDAID
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-fundaid-text-secondary hover:text-fundaid-accent-primary transition-colors duration-300"
            >
              How It Works
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 rounded-full text-sm font-medium bg-fundaid-accent-primary text-white hover:bg-fundaid-accent-primary-hover transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* SVG Canvas - Proper Z-Index Layering */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[1400px] mx-auto relative">
          {/* Background SVG Layer */}
          <svg
            viewBox="0 0 1400 900"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-auto"
            style={{ minHeight: '900px' }}
          >
            <NodeFilters />

            {/* Layer 1: Blueprint Grid */}
            <g id="blueprint-grid" opacity={DESIGN_TOKENS.opacity.grid}>
              <defs>
                <pattern
                  id="grid"
                  width={DESIGN_TOKENS.spacing.gridSize}
                  height={DESIGN_TOKENS.spacing.gridSize}
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d={`M ${DESIGN_TOKENS.spacing.gridSize} 0 L 0 0 0 ${DESIGN_TOKENS.spacing.gridSize}`}
                    fill="none"
                    stroke={DESIGN_TOKENS.colors.gridStroke}
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="1400" height="900" fill="url(#grid)" />

              {/* Enhanced grid density for bottom-left quadrant */}
              <rect x="0" y="500" width="600" height="400" fill="url(#grid)" opacity="0.6" />
            </g>

            {/* Layer 1.5: Micro-Dots (bottom-left density) */}
            <g id="micro-dots">
              {MICRO_DOTS.map((dot, i) => (
                <circle
                  key={`dot-${i}`}
                  cx={dot.x}
                  cy={dot.y}
                  r={dot.radius}
                  fill={DESIGN_TOKENS.colors.nodeCyan}
                  opacity={dot.opacity}
                />
              ))}
            </g>

            {/* Layer 2: Star Particles */}
            <g id="star-particles">
              {particles.map((particle) => (
                <circle
                  key={particle.id}
                  cx={particle.x}
                  cy={particle.y}
                  r={particle.radius}
                  fill={DESIGN_TOKENS.colors.starColor}
                >
                  {/* Pulse animation */}
                  <animate
                    attributeName="r"
                    values={`${particle.radius};${particle.radius * 1.4};${particle.radius}`}
                    dur={DESIGN_TOKENS.animation.starPulse}
                    begin={`${particle.delay}s`}
                    repeatCount="indefinite"
                  />
                  {/* Jitter animation */}
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`0,0; ${particle.jitterX},${particle.jitterY}; 0,0`}
                    dur={`${DESIGN_TOKENS.particles.jitterDuration}s`}
                    begin={`${particle.delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>

            {/* Layer 3: Connection Lines */}
            <BlueprintLines
              nodes={activeNodes}
              branchIndices={activeNodes.length === 6 ? [2, 4] : [3, 7, 10]}
              scatteredNodes={windowWidth > DESIGN_TOKENS.mobile.tablet.breakpoint ? SCATTERED_NODES : []}
            />

            {/* Layer 4: Main Diagonal Nodes with Strategic Color Assignment */}
            <g id="nodes">
              {activeNodes.map((node, i) => {
                // Alternate between hex and rect nodes
                const isHex = i % 3 !== 1;
                const Node = isHex ? HexNode : RectNode;
                const color = getControlRoomColor(i, activeNodes.length);

                return (
                  <Node
                    key={`node-${i}`}
                    x={node.x}
                    y={node.y}
                    size={24}
                    color={color}
                    id={`N${i + 1}`}
                  />
                );
              })}
            </g>

            {/* Layer 5: Scattered Nodes with Strategic Color Assignment */}
            {windowWidth > DESIGN_TOKENS.mobile.tablet.breakpoint && (
              <g id="scattered-nodes">
                {SCATTERED_NODES.map((node, i) => {
                  // Alternate node types for variety
                  const isHex = i % 2 === 0;
                  const Node = isHex ? HexNode : RectNode;
                  // Match color to parent diagonal node for cohesion
                  const color = getControlRoomColor(node.connectTo, NODE_POSITIONS.length);

                  return (
                    <Node
                      key={`scattered-${i}`}
                      x={node.x}
                      y={node.y}
                      size={18}
                      color={color}
                      id={`S${i + 1}`}
                    />
                  );
                })}
              </g>
            )}

            {/* Layer 5.5: Bracket Markers & Labels (bottom-left density) */}
            {windowWidth > DESIGN_TOKENS.mobile.tablet.breakpoint && (
              <g id="detail-markers">
                {/* Bracket markers around nodes */}
                {BRACKET_MARKERS.map((marker, i) => (
                  <g key={`bracket-${i}`}>
                    {/* Left bracket [ */}
                    <text
                      x={marker.x - 35}
                      y={marker.y + 3}
                      fill={DESIGN_TOKENS.colors.nodeCyan}
                      opacity="0.2"
                      fontSize="14"
                      fontFamily="monospace"
                    >
                      [
                    </text>
                    {/* Right bracket ] */}
                    <text
                      x={marker.x + 30}
                      y={marker.y + 3}
                      fill={DESIGN_TOKENS.colors.nodeCyan}
                      opacity="0.2"
                      fontSize="14"
                      fontFamily="monospace"
                    >
                      ]
                    </text>
                  </g>
                ))}

                {/* Alphanumeric labels for first 6 nodes */}
                {activeNodes.slice(0, 6).map((node, i) => (
                  <text
                    key={`label-${i}`}
                    x={node.x + 32}
                    y={node.y + 5}
                    fill={DESIGN_TOKENS.colors.nodeCyan}
                    opacity="0.15"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="500"
                  >
                    N{String(i + 1).padStart(2, '0')}
                  </text>
                ))}
              </g>
            )}

            {/* Layer 6: Subtle Focal Element - Crosshairs behind title */}
            <g id="crosshairs" opacity="0.04">
              {/* Horizontal crosshair */}
              <line
                x1="300"
                y1="450"
                x2="900"
                y2="450"
                stroke={DESIGN_TOKENS.colors.nodeTeal}
                strokeWidth="1"
                strokeDasharray="8,8"
              />
              {/* Vertical crosshair */}
              <line
                x1="600"
                y1="250"
                x2="600"
                y2="650"
                stroke={DESIGN_TOKENS.colors.nodeTeal}
                strokeWidth="1"
                strokeDasharray="8,8"
              />
              {/* Small center marker circle */}
              <circle
                cx="600"
                cy="450"
                r="6"
                fill="none"
                stroke={DESIGN_TOKENS.colors.nodeCyan}
                strokeWidth="1"
              />
            </g>

            {/* Layer 7: Data Packets */}
            <DataPackets nodes={activeNodes} />
          </svg>

          {/* Layer 6: Direct Text Content (no box) */}
          <div className="relative z-20 flex flex-col items-center justify-center gap-8" style={{ minHeight: '900px' }}>
            {/* FUNDAID Title - Clean, professional styling */}
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-fundaid-accent-primary tracking-tight"
            >
              FUNDAID
            </h1>

            {/* Tagline */}
            <div className="text-center max-w-3xl px-6">
              <p className="text-2xl sm:text-3xl md:text-4xl text-fundaid-text-primary font-light mb-2 leading-relaxed">
                Stop Writing Grants.
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl text-fundaid-text-primary font-light mb-8 leading-relaxed">
                Start Winning Them.
              </p>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
              <Link
                href="/sign-up"
                className="group relative px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 w-full sm:w-auto bg-fundaid-accent-primary hover:bg-fundaid-accent-primary-hover text-white shadow-fundaid-lg hover:shadow-fundaid-xl"
              >
                Get Started
              </Link>

              <Link
                href="#how-it-works"
                className="px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 border-2 w-full sm:w-auto border-fundaid-accent-primary text-fundaid-accent-primary hover:bg-fundaid-section-accent"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-fundaid-text-muted text-sm font-light">Scroll to explore</span>
        <svg
          className="w-6 h-6 text-fundaid-accent-primary animate-bounce"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
