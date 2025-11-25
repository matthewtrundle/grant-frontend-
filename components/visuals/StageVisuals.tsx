/**
 * StageVisuals - Elaborate animated SVG visuals for ProcessTimelineFixed stages
 *
 * Design Philosophy:
 * - Scientific, abstract visualizations
 * - Calm, structured animations tied to scroll/state
 * - Network graphs, data flows, analysis patterns
 * - Respects fundaidTheme colors
 * - No chaotic motion or random effects
 */

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { fundaidTheme } from '@/lib/digilab-theme';

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin);

interface StageVisualProps {
  isActive: boolean;
  progress?: number; // 0-1 for animation progress
}

/**
 * DISCOVER Stage Visual - Grant Matching Network
 * Represents the AI searching through grants and finding matches
 */
export function DiscoverVisual({ isActive, progress = 0 }: StageVisualProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const connectionsRef = useRef<SVGGElement>(null);
  const scanLineRef = useRef<SVGLineElement>(null);
  const pulseRingsRef = useRef<SVGGElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useLayoutEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      if (isActive) {
        if (prefersReducedMotion.current) {
          // Instant display if reduced motion
          gsap.set('.discover-node', { opacity: 1, scale: 1 });
          gsap.set('.discover-connection', { strokeDashoffset: 0, opacity: 0.3 });
          if (scanLineRef.current) {
            gsap.set(scanLineRef.current, { opacity: 0 }); // Hide continuous animations
          }
          // Skip pulse and particle animations entirely
        } else {
          // Breathing glow effect on background panel
          gsap.to('.stage2-glow-layer', {
            opacity: [0.03, 0.06, 0.03],
            duration: 4,
            repeat: -1,
            ease: fundaidTheme.easing.cinematic,
            yoyo: false
          });

          // Subtle pulsing on border glow
          gsap.to('.stage2-border-glow', {
            strokeOpacity: [0.08, 0.14, 0.08],
            duration: 3,
            repeat: -1,
            ease: fundaidTheme.easing.smooth,
            yoyo: false
          });

          // Traveling shimmer highlight around border
          gsap.to('.stage2-border-shimmer', {
            strokeDashoffset: -1700, // Perimeter of rounded rect (travels full circle)
            duration: 5,
            repeat: -1,
            ease: fundaidTheme.easing.linear,
            yoyo: false
          });

          // Animate nodes appearing
          gsap.fromTo('.discover-node',
            {
              opacity: 0,
              scale: 0,
              transformOrigin: 'center'
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: {
                from: 'center',
                amount: 1.2,
                grid: 'auto',
                ease: 'power2.inOut'
              },
              ease: 'back.out(1.4)'
            }
          );

          // Animate connections drawing
          gsap.fromTo('.discover-connection',
            {
              strokeDasharray: '100',
              strokeDashoffset: '100',
              opacity: 0
            },
            {
              strokeDashoffset: 0,
              opacity: 0.3,
              duration: 1.5,
              stagger: 0.1,
              ease: 'power2.inOut',
              delay: 0.5
            }
          );

          // Scanning line animation - use attr for SVG properties
          if (scanLineRef.current) {
            gsap.fromTo(scanLineRef.current,
              {
                attr: { x1: -100, x2: -100 },
                opacity: 0
              },
              {
                attr: { x1: 500, x2: 500 },
                opacity: [0, 0.8, 0.8, 0],
                duration: 3,
                repeat: -1,
                ease: 'none'
              }
            );
          }

          // Pulse rings on matched nodes
          gsap.to('.pulse-ring', {
            scale: 2,
            opacity: 0,
            duration: 2,
            stagger: {
              each: 0.3,
              repeat: -1,
              from: 'random'
            },
            ease: 'power2.out'
          });

          // Data flow particles animation removed - path elements not compatible with MotionPathPlugin

          // Breathing animations for idle states - very subtle
          if (nodesRef.current) {
            gsap.to(nodesRef.current, {
              scale: 1.02,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }

          // Gentle breathing for connections
          if (connectionsRef.current) {
            gsap.to(connectionsRef.current, {
              opacity: 0.35,
              duration: 3.5,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }
        }

      } else {
        // Kill continuous loop animations to save performance
        gsap.killTweensOf([scanLineRef.current, '.pulse-ring', '.data-particle', '.stage2-glow-layer', '.stage2-border-glow', '.stage2-border-shimmer', nodesRef.current, connectionsRef.current]);

        // Fade out when not active
        gsap.to(['.discover-node', '.discover-connection', scanLineRef.current], {
          opacity: 0,
          duration: 0.5
        });
      }
    }, svgRef);

    return () => ctx?.revert();
  }, [isActive]);

  // Parallax depth layers based on scroll progress
  useEffect(() => {
    if (!svgRef.current || !isActive || prefersReducedMotion.current) return;

    // Subtle parallax effect - background moves slower, foreground moves faster
    // Background panels: slowest (0.5x)
    gsap.set('.stage2-glow-layer, .stage2-border-glow, .stage2-border-shimmer', {
      y: progress * 5,
      overwrite: 'auto'
    });

    // Middle layer (connections): medium speed (1x)
    if (connectionsRef.current) {
      gsap.set(connectionsRef.current, {
        y: progress * 10,
        overwrite: 'auto'
      });
    }

    // Foreground (nodes, scan line): fastest (1.5x)
    if (nodesRef.current) {
      gsap.set(nodesRef.current, {
        y: progress * 15,
        overwrite: 'auto'
      });
    }

    if (scanLineRef.current) {
      gsap.set(scanLineRef.current, {
        y: progress * 15,
        overwrite: 'auto'
      });
    }

    if (pulseRingsRef.current) {
      gsap.set(pulseRingsRef.current, {
        y: progress * 15,
        overwrite: 'auto'
      });
    }
  }, [progress, isActive]);

  // Generate network nodes positions - ENHANCED: More nodes for richer visualization
  const nodes = [
    { id: 1, x: 200, y: 80, matched: true, size: 'large' },
    { id: 2, x: 100, y: 120, matched: false, size: 'medium' },
    { id: 3, x: 300, y: 110, matched: true, size: 'medium' },
    { id: 4, x: 150, y: 180, matched: false, size: 'small' },
    { id: 5, x: 250, y: 200, matched: true, size: 'large' },
    { id: 6, x: 350, y: 170, matched: false, size: 'small' },
    { id: 7, x: 80, y: 240, matched: true, size: 'medium' },
    { id: 8, x: 180, y: 280, matched: false, size: 'small' },
    { id: 9, x: 320, y: 260, matched: true, size: 'medium' },
    { id: 10, x: 220, y: 150, matched: false, size: 'large' },
    { id: 11, x: 120, y: 340, matched: true, size: 'small' },
    { id: 12, x: 280, y: 350, matched: true, size: 'medium' },
    { id: 13, x: 60, y: 380, matched: false, size: 'small' },
    { id: 14, x: 340, y: 390, matched: true, size: 'large' },
    { id: 15, x: 200, y: 400, matched: true, size: 'medium' }
  ];

  // Generate connections between nodes - ENHANCED: More connections for richer network
  const connections = [
    { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 10 },
    { from: 2, to: 4 }, { from: 3, to: 6 },
    { from: 4, to: 5 }, { from: 5, to: 8 }, { from: 5, to: 9 },
    { from: 6, to: 9 }, { from: 7, to: 8 },
    { from: 10, to: 5 }, { from: 10, to: 6 },
    { from: 7, to: 11 }, { from: 8, to: 12 }, { from: 9, to: 12 },
    { from: 11, to: 13 }, { from: 11, to: 15 }, { from: 12, to: 14 },
    { from: 12, to: 15 }, { from: 14, to: 15 }, { from: 13, to: 15 },
    { from: 5, to: 12 }, { from: 1, to: 5 }, { from: 9, to: 14 }
  ];

  const getNodeRadius = (size: string) => {
    switch(size) {
      case 'large': return 12;
      case 'medium': return 8;
      case 'small': return 5;
      default: return 8;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 400 450"
        className="w-full h-full max-w-xl"
        style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))' }}
      >
        {/* Background grid pattern */}
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={fundaidTheme.accents.teal}
              strokeWidth="0.5"
              opacity="0.1"
            />
          </pattern>

          {/* Gradient for matched nodes */}
          <radialGradient id="matched-gradient">
            <stop offset="0%" stopColor={fundaidTheme.accents.teal} stopOpacity="0.8" />
            <stop offset="100%" stopColor={fundaidTheme.accents.teal} stopOpacity="0.2" />
          </radialGradient>

          {/* Glow filter for matched nodes */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* ENHANCED GLASSMORPHISM FILTERS */}

          {/* Frosted glass texture with noise */}
          <filter id="frosted-glass-stage2" x="-50%" y="-50%" width="200%" height="200%">
            {/* Create organic noise texture */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              seed="2"
              result="noise"
            />
            {/* Subtle displacement for depth */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Multi-layer blur for depth */}
            <feGaussianBlur in="displaced" stdDeviation="1.5" result="blur1"/>
            <feGaussianBlur in="blur1" stdDeviation="3" result="blur2"/>
            {/* Blend layers */}
            <feBlend in="blur2" in2="SourceGraphic" mode="normal" result="blended"/>
            {/* Add subtle color tint */}
            <feColorMatrix
              in="blended"
              type="matrix"
              values="1 0 0 0 0.05
                      0 1 0 0 0.15
                      0 0 1 0 0.15
                      0 0 0 1 0"
              result="tinted"
            />
            <feMerge>
              <feMergeNode in="tinted"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Specular highlights for premium feel */}
          <filter id="glass-highlights-stage2">
            {/* Create lighting effect */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
            <feSpecularLighting
              in="blur"
              surfaceScale="5"
              specularConstant="0.8"
              specularExponent="20"
              lighting-color={fundaidTheme.accents.teal}
              result="specOut"
            >
              <fePointLight x="100" y="50" z="200"/>
            </feSpecularLighting>
            {/* Composite highlights */}
            <feComposite
              in="specOut"
              in2="SourceAlpha"
              operator="in"
              result="specOut2"
            />
            <feComposite
              in="SourceGraphic"
              in2="specOut2"
              operator="arithmetic"
              k1="0" k2="1" k3="1" k4="0"
            />
          </filter>

          {/* Edge glow for depth */}
          <filter id="edge-glow-stage2">
            <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken"/>
            <feGaussianBlur in="thicken" stdDeviation="3" result="blurred"/>
            <feFlood flood-color={fundaidTheme.accents.teal} flood-opacity="0.3" result="glowColor"/>
            <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow"/>
            <feMerge>
              <feMergeNode in="softGlow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Enhanced Background Panel with Radial Gradient - Stage 2 (Teal) */}
        <defs>
          <radialGradient id="panel-bg-gradient-stage2" cx="50%" cy="30%">
            <stop offset="0%" stopColor="rgba(28, 44, 85, 0.45)" />
            <stop offset="75%" stopColor="rgba(10, 16, 32, 0.85)" />
          </radialGradient>
        </defs>
        {/* Base glassmorphic panel with frosted texture */}
        <rect
          width="400"
          height="450"
          rx="40"
          fill="url(#panel-bg-gradient-stage2)"
          filter="url(#frosted-glass-stage2)"
          style={{ backdropFilter: 'blur(30px)' }}
        />
        {/* Border with edge glow */}
        <rect
          className="stage2-border-glow"
          width="400"
          height="450"
          rx="40"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          strokeOpacity="0.08"
          filter="url(#edge-glow-stage2)"
        />
        {/* Traveling shimmer highlight on border */}
        <rect
          className="stage2-border-shimmer"
          width="400"
          height="450"
          rx="40"
          fill="none"
          stroke={fundaidTheme.accents.teal}
          strokeWidth="2"
          strokeOpacity="0.15"
          strokeDasharray="80 1620"
          strokeDashoffset="0"
          style={{ mixBlendMode: 'screen' }}
        />
        {/* Inner highlight layer with specular lighting */}
        <rect
          width="396"
          height="446"
          x="2"
          y="2"
          rx="38"
          fill="rgba(11, 242, 201, 0.04)"
          filter="url(#glass-highlights-stage2)"
          style={{ mixBlendMode: 'screen' }}
        />
        {/* Subtle inner glow for depth with breathing animation */}
        <rect
          className="stage2-glow-layer"
          width="400"
          height="450"
          rx="40"
          fill="rgba(11, 242, 201, 0.03)"
          opacity="0.03"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Blueprint micro-lines pattern */}
        <g opacity="0.08">
          {[...Array(20)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 22.5}
              x2="400"
              y2={i * 22.5}
              stroke="rgba(11, 242, 201, 0.3)"
              strokeWidth="0.5"
            />
          ))}
          {[...Array(18)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 22.2}
              y1="0"
              x2={i * 22.2}
              y2="450"
              stroke="rgba(11, 242, 201, 0.3)"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Tiny particle dots */}
        <g>
          {[...Array(30)].map((_, i) => (
            <circle
              key={`particle-${i}`}
              cx={Math.random() * 400}
              cy={Math.random() * 450}
              r="1"
              fill={i % 3 === 0 ? '#0BF2C9' : i % 3 === 1 ? '#A26CF7' : '#FFFFFF'}
              opacity={Math.random() * 0.4 + 0.1}
            />
          ))}
        </g>

        {/* Scanning line */}
        <line
          ref={scanLineRef}
          x1="0" y1="0"
          x2="0" y2="450"
          stroke={fundaidTheme.accents.teal}
          strokeWidth="2"
          opacity="0"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Connections */}
        <g ref={connectionsRef}>
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <line
                key={idx}
                className="discover-connection"
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={fundaidTheme.accents.teal}
                strokeWidth="1"
                opacity="0"
              />
            );
          })}
        </g>

        {/* Data flow particles - ENHANCED: More particles for richer animation */}
        <g>
          {connections.slice(0, 10).map((_, idx) => (
            <circle
              key={`particle-${idx}`}
              className="data-particle"
              r="2.5"
              fill={fundaidTheme.accents.teal}
              opacity="0.9"
              style={{ filter: 'drop-shadow(0 0 4px rgba(47, 180, 158, 0.8))' }}
            />
          ))}
        </g>

        {/* Nodes */}
        <g ref={nodesRef}>
          {nodes.map(node => (
            <g key={node.id} className="discover-node">
              {/* Pulse ring for matched nodes */}
              {node.matched && (
                <circle
                  className="pulse-ring"
                  cx={node.x}
                  cy={node.y}
                  r={getNodeRadius(node.size)}
                  fill="none"
                  stroke={fundaidTheme.accents.teal}
                  strokeWidth="2"
                  opacity="0.5"
                />
              )}

              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={getNodeRadius(node.size)}
                fill={node.matched ? 'url(#matched-gradient)' : fundaidTheme.backgrounds.panel}
                stroke={node.matched ? fundaidTheme.accents.teal : fundaidTheme.text.muted}
                strokeWidth={node.matched ? '2' : '1'}
                filter={node.matched ? 'url(#glow)' : 'none'}
                opacity={node.matched ? 1 : 0.5}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  if (prefersReducedMotion.current) return;
                  gsap.to(e.currentTarget, {
                    attr: { r: getNodeRadius(node.size) * 1.15 },
                    opacity: 1,
                    duration: 0.3,
                    ease: fundaidTheme.easing.smooth
                  });
                }}
                onMouseLeave={(e) => {
                  if (prefersReducedMotion.current) return;
                  gsap.to(e.currentTarget, {
                    attr: { r: getNodeRadius(node.size) },
                    opacity: node.matched ? 1 : 0.5,
                    duration: 0.3,
                    ease: fundaidTheme.easing.smooth
                  });
                }}
                onClick={(e) => {
                  if (prefersReducedMotion.current) return;
                  // Quick scale down and back for tactile feedback
                  gsap.timeline()
                    .to(e.currentTarget, {
                      attr: { r: getNodeRadius(node.size) * 0.85 },
                      duration: 0.1,
                      ease: fundaidTheme.easing.strong
                    })
                    .to(e.currentTarget, {
                      attr: { r: getNodeRadius(node.size) * 1.2 },
                      duration: 0.2,
                      ease: fundaidTheme.easing.elasticSoft
                    })
                    .to(e.currentTarget, {
                      attr: { r: getNodeRadius(node.size) * 1.15 },
                      duration: 0.15,
                      ease: fundaidTheme.easing.smooth
                    });
                }}
              />

              {/* Match indicator */}
              {node.matched && (
                <text
                  x={node.x}
                  y={node.y + 3}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                >
                  ✓
                </text>
              )}
            </g>
          ))}
        </g>

        {/* Info overlay - ENHANCED: Updated numbers to reflect richer visualization */}
        <g transform="translate(20, 30)">
          <rect
            width="140"
            height="75"
            rx="4"
            fill={fundaidTheme.backgrounds.panel}
            fillOpacity="0.95"
            stroke={fundaidTheme.accents.teal}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text x="10" y="20" fill={fundaidTheme.text.main} fontSize="11" fontWeight="700">
            GRANT DISCOVERY
          </text>
          <text x="10" y="38" fill={fundaidTheme.text.muted} fontSize="9">
            3,847 sources scanned
          </text>
          <text x="10" y="52" fill={fundaidTheme.accents.teal} fontSize="10" fontWeight="600">
            156 strong matches
          </text>
          <text x="10" y="65" fill={fundaidTheme.accents.teal} fontSize="8" opacity="0.7">
            Ranking by fit score...
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * ANALYZE Stage Visual - Document Analysis Flow
 * Represents deep grant analysis, scoring, and validation
 */
export function AnalyzeVisual({ isActive, progress = 0 }: StageVisualProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const documentsRef = useRef<SVGGElement>(null);
  const metricsRef = useRef<SVGGElement>(null);
  const flowLinesRef = useRef<SVGGElement>(null);
  const scanLineRef = useRef<SVGLineElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useLayoutEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      if (isActive) {
        if (prefersReducedMotion.current) {
          // Instant display if reduced motion
          gsap.set('.analyze-doc', { x: 0, opacity: 1, rotate: 0 });
          gsap.set('.analysis-line', { scaleX: 1 });
          gsap.set('.metric-bar', { scaleY: 1 });
          const scoreText = document.querySelector('.score-text');
          if (scoreText) scoreText.textContent = '92';
          // Skip continuous animations (flow particles, processing ring)
        } else {
          // Breathing glow effect on background panel
          gsap.to('.stage3-glow-layer', {
            opacity: [0.03, 0.06, 0.03],
            duration: 4.2,
            repeat: -1,
            ease: fundaidTheme.easing.cinematic,
            yoyo: false
          });

          // Subtle pulsing on border glow
          gsap.to('.stage3-border-glow', {
            strokeOpacity: [0.08, 0.14, 0.08],
            duration: 3.2,
            repeat: -1,
            ease: fundaidTheme.easing.smooth,
            yoyo: false
          });

          // Traveling shimmer highlight around border
          gsap.to('.stage3-border-shimmer', {
            strokeDashoffset: -1700, // Perimeter of rounded rect (travels full circle)
            duration: 5.2,
            repeat: -1,
            ease: fundaidTheme.easing.linear,
            yoyo: false
          });

          // Documents sliding in
          gsap.fromTo('.analyze-doc',
            {
              x: -50,
              opacity: 0,
              rotate: -5
            },
            {
              x: 0,
              opacity: 1,
              rotate: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power2.out'
            }
          );

          // Analysis lines drawing
          gsap.fromTo('.analysis-line',
            {
              scaleX: 0,
              transformOrigin: 'left center'
            },
            {
              scaleX: 1,
              duration: 1.2,
              stagger: 0.1,
              ease: 'power2.inOut',
              delay: 0.5
            }
          );

          // Metrics appearing
          gsap.fromTo('.metric-bar',
            {
              scaleY: 0,
              transformOrigin: 'bottom center'
            },
            {
              scaleY: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'back.out(1.2)',
              delay: 1
            }
          );

          // Score counter animation
          gsap.fromTo('.score-text',
            {
              textContent: 0
            },
            {
              textContent: 92,
              duration: 2,
              ease: 'power2.inOut',
              snap: { textContent: 1 },
              delay: 1.5,
              onUpdate: function() {
                const target = this.targets()[0];
                if (target) {
                  target.textContent = Math.floor(this.progress() * 92);
                }
              }
            }
          );

          // Flow particles
          gsap.to('.flow-particle', {
            x: 300,
            duration: 2,
            stagger: {
              each: 0.2,
              repeat: -1
            },
            ease: 'none'
          });

          // Processing indicator pulse
          gsap.to('.processing-ring', {
            scale: 1.2,
            opacity: [0.8, 0.2],
            duration: 1.5,
            repeat: -1,
            ease: 'power2.inOut'
          });

          // Scanning line animation - universal scan line effect
          if (scanLineRef.current) {
            gsap.fromTo(scanLineRef.current,
              {
                attr: { x1: -100, x2: -100 },
                opacity: 0
              },
              {
                attr: { x1: 500, x2: 500 },
                opacity: [0, 0.8, 0.8, 0],
                duration: 3.2,
                repeat: -1,
                ease: fundaidTheme.easing.linear
              }
            );
          }

          // Breathing animations for idle states - very subtle
          if (documentsRef.current) {
            gsap.to(documentsRef.current, {
              scale: 1.015,
              duration: 4.5,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }

          // Gentle breathing for metrics dashboard
          if (metricsRef.current) {
            gsap.to(metricsRef.current, {
              scale: 1.02,
              duration: 3.8,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }
        }

      } else {
        // Kill continuous loop animations to save performance
        gsap.killTweensOf(['.flow-particle', '.processing-ring', '.stage3-glow-layer', '.stage3-border-glow', '.stage3-border-shimmer', scanLineRef.current, documentsRef.current, metricsRef.current]);

        // Fade out when not active
        gsap.to(['.analyze-doc', '.analysis-line', '.metric-bar'], {
          opacity: 0,
          duration: 0.5
        });
      }
    }, svgRef);

    return () => ctx?.revert();
  }, [isActive]);

  // Parallax depth layers based on scroll progress
  useEffect(() => {
    if (!svgRef.current || !isActive || prefersReducedMotion.current) return;

    // Subtle parallax effect - background moves slower, foreground moves faster
    // Background panels: slowest (0.5x)
    gsap.set('.stage3-glow-layer, .stage3-border-glow, .stage3-border-shimmer', {
      y: progress * 5,
      overwrite: 'auto'
    });

    // Middle layer (documents, flow lines): medium speed (1x)
    if (documentsRef.current) {
      gsap.set(documentsRef.current, {
        y: progress * 10,
        overwrite: 'auto'
      });
    }

    if (flowLinesRef.current) {
      gsap.set(flowLinesRef.current, {
        y: progress * 10,
        overwrite: 'auto'
      });
    }

    // Foreground (metrics dashboard): fastest (1.5x)
    if (metricsRef.current) {
      gsap.set(metricsRef.current, {
        y: progress * 15,
        overwrite: 'auto'
      });
    }
  }, [progress, isActive]);

  // ENHANCED: More metrics for richer dashboard
  const metrics = [
    { label: 'TRL', value: 85, height: 85 },
    { label: 'FIT', value: 92, height: 92 },
    { label: 'BUD', value: 78, height: 78 },
    { label: 'TIM', value: 95, height: 95 },
    { label: 'COM', value: 100, height: 100 },
    { label: 'REL', value: 88, height: 88 },
    { label: 'IMP', value: 94, height: 94 }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 400 450"
        className="w-full h-full max-w-xl"
        style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))' }}
      >
        <defs>
          {/* Gradient for documents */}
          <linearGradient id="doc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fundaidTheme.accents.lavender} stopOpacity="0.2" />
            <stop offset="100%" stopColor={fundaidTheme.accents.lavender} stopOpacity="0.05" />
          </linearGradient>

          {/* Pattern for document texture */}
          <pattern id="doc-lines" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="0" stroke={fundaidTheme.accents.lavender} strokeWidth="0.5" opacity="0.3" />
          </pattern>

          {/* Clip path for document shape */}
          <clipPath id="doc-clip">
            <rect x="0" y="0" width="60" height="80" rx="2" />
          </clipPath>

          {/* ENHANCED GLASSMORPHISM FILTERS */}

          {/* Frosted glass texture with noise */}
          <filter id="frosted-glass-stage3" x="-50%" y="-50%" width="200%" height="200%">
            {/* Create organic noise texture */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              seed="3"
              result="noise"
            />
            {/* Subtle displacement for depth */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Multi-layer blur for depth */}
            <feGaussianBlur in="displaced" stdDeviation="1.5" result="blur1"/>
            <feGaussianBlur in="blur1" stdDeviation="3" result="blur2"/>
            {/* Blend layers */}
            <feBlend in="blur2" in2="SourceGraphic" mode="normal" result="blended"/>
            {/* Add subtle color tint */}
            <feColorMatrix
              in="blended"
              type="matrix"
              values="1 0 0 0 0.12
                      0 1 0 0 0.08
                      0 0 1 0 0.15
                      0 0 0 1 0"
              result="tinted"
            />
            <feMerge>
              <feMergeNode in="tinted"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Specular highlights for premium feel */}
          <filter id="glass-highlights-stage3">
            {/* Create lighting effect */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
            <feSpecularLighting
              in="blur"
              surfaceScale="5"
              specularConstant="0.8"
              specularExponent="20"
              lighting-color={fundaidTheme.accents.lavender}
              result="specOut"
            >
              <fePointLight x="100" y="50" z="200"/>
            </feSpecularLighting>
            {/* Composite highlights */}
            <feComposite
              in="specOut"
              in2="SourceAlpha"
              operator="in"
              result="specOut2"
            />
            <feComposite
              in="SourceGraphic"
              in2="specOut2"
              operator="arithmetic"
              k1="0" k2="1" k3="1" k4="0"
            />
          </filter>

          {/* Edge glow for depth */}
          <filter id="edge-glow-stage3">
            <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken"/>
            <feGaussianBlur in="thicken" stdDeviation="3" result="blurred"/>
            <feFlood flood-color={fundaidTheme.accents.lavender} flood-opacity="0.3" result="glowColor"/>
            <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow"/>
            <feMerge>
              <feMergeNode in="softGlow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Enhanced Background Panel with Radial Gradient - Stage 3 (Lavender) */}
        <defs>
          <radialGradient id="panel-bg-gradient-stage3" cx="50%" cy="30%">
            <stop offset="0%" stopColor="rgba(28, 44, 85, 0.45)" />
            <stop offset="75%" stopColor="rgba(10, 16, 32, 0.85)" />
          </radialGradient>
        </defs>

        {/* Base glassmorphic panel with frosted texture */}
        <rect
          width="400"
          height="450"
          rx="40"
          fill="url(#panel-bg-gradient-stage3)"
          filter="url(#frosted-glass-stage3)"
          style={{ backdropFilter: 'blur(30px)' }}
        />
        {/* Border with edge glow */}
        <rect
          className="stage3-border-glow"
          width="400"
          height="450"
          rx="40"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          strokeOpacity="0.08"
          filter="url(#edge-glow-stage3)"
        />
        {/* Traveling shimmer highlight on border */}
        <rect
          className="stage3-border-shimmer"
          width="400"
          height="450"
          rx="40"
          fill="none"
          stroke={fundaidTheme.accents.lavender}
          strokeWidth="2"
          strokeOpacity="0.15"
          strokeDasharray="80 1620"
          strokeDashoffset="0"
          style={{ mixBlendMode: 'screen' }}
        />
        {/* Inner highlight layer with specular lighting */}
        <rect
          width="396"
          height="446"
          x="2"
          y="2"
          rx="38"
          fill="rgba(178, 132, 255, 0.04)"
          filter="url(#glass-highlights-stage3)"
          style={{ mixBlendMode: 'screen' }}
        />
        {/* Subtle inner glow for depth with breathing animation */}
        <rect
          className="stage3-glow-layer"
          width="400"
          height="450"
          rx="40"
          fill="rgba(178, 132, 255, 0.03)"
          opacity="0.03"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Blueprint micro-lines pattern */}
        <g opacity="0.08">
          {[...Array(20)].map((_, i) => (
            <line key={`h-stage3-${i}`} x1="0" y1={i * 22.5} x2="400" y2={i * 22.5} stroke="rgba(178, 132, 255, 0.3)" strokeWidth="0.5" />
          ))}
          {[...Array(18)].map((_, i) => (
            <line key={`v-stage3-${i}`} x1={i * 22.2} y1="0" x2={i * 22.2} y2="450" stroke="rgba(178, 132, 255, 0.3)" strokeWidth="0.5" />
          ))}
        </g>

        {/* Tiny particle dots */}
        <g>
          {[...Array(30)].map((_, i) => (
            <circle
              key={`particle-stage3-${i}`}
              cx={Math.random() * 400}
              cy={Math.random() * 450}
              r="1"
              fill={i % 3 === 0 ? '#B284FF' : i % 3 === 1 ? '#A26CF7' : '#FFFFFF'}
              opacity={Math.random() * 0.4 + 0.1}
            />
          ))}
        </g>

        {/* Background grid */}
        <rect width="400" height="450" fill="url(#grid-pattern)" opacity="0.05" />

        {/* Documents Stack - ENHANCED: More documents */}
        <g ref={documentsRef} transform="translate(40, 80)">
          {[0, 1, 2, 3, 4].map((idx) => (
            <g key={idx} className="analyze-doc" transform={`translate(${idx * 12}, ${idx * 12})`}>
              {/* Document shadow */}
              <rect
                x="2" y="2"
                width="60" height="80"
                rx="2"
                fill="black"
                opacity="0.1"
              />

              {/* Document body */}
              <rect
                width="60" height="80"
                rx="2"
                fill={fundaidTheme.backgrounds.panel}
                stroke={fundaidTheme.accents.lavender}
                strokeWidth="1"
              />

              {/* Document texture */}
              <rect
                width="60" height="80"
                rx="2"
                fill="url(#doc-gradient)"
              />

              {/* Document lines */}
              <g clipPath="url(#doc-clip)">
                {[10, 20, 30, 40, 50, 60].map((y) => (
                  <rect
                    key={y}
                    x="8" y={y}
                    width={44 - (idx * 4)}
                    height="2"
                    fill={fundaidTheme.accents.lavender}
                    opacity="0.2"
                  />
                ))}
              </g>

              {/* Document corner fold */}
              <path
                d="M 50 0 L 60 10 L 50 10 Z"
                fill={fundaidTheme.accents.lavender}
                opacity="0.3"
              />
            </g>
          ))}
        </g>

        {/* Analysis Flow Lines - ENHANCED: More flow lines */}
        <g ref={flowLinesRef} transform="translate(140, 80)">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
            <g key={idx}>
              {/* Flow line */}
              <rect
                className="analysis-line"
                x="0"
                y={idx * 20}
                width="80"
                height="2"
                fill={fundaidTheme.accents.lavender}
                opacity="0.3"
              />

              {/* Flow particle with glow */}
              <circle
                className="flow-particle"
                cx="0"
                cy={idx * 20 + 1}
                r="3.5"
                fill={fundaidTheme.accents.lavender}
                opacity="0.9"
                style={{ filter: 'drop-shadow(0 0 4px rgba(162, 108, 247, 0.8))' }}
              />
            </g>
          ))}
        </g>

        {/* Metrics Dashboard - ENHANCED: Wider for more bars, better positioned */}
        <g ref={metricsRef} transform="translate(230, 80)">
          {/* Dashboard background */}
          <rect
            width="150" height="180"
            rx="4"
            fill={fundaidTheme.backgrounds.panel}
            fillOpacity="0.95"
            stroke={fundaidTheme.accents.lavender}
            strokeWidth="1"
            strokeOpacity="0.3"
          />

          {/* Title */}
          <text x="75" y="20" textAnchor="middle" fill={fundaidTheme.text.main} fontSize="10" fontWeight="600">
            ANALYSIS METRICS
          </text>

          {/* Metric bars */}
          <g transform="translate(15, 140)">
            {metrics.map((metric, idx) => (
              <g
                key={metric.label}
                transform={`translate(${idx * 19}, 0)`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  if (prefersReducedMotion.current) return;
                  const barElement = e.currentTarget.querySelector('.metric-bar');
                  if (barElement) {
                    gsap.to(barElement, {
                      opacity: 1,
                      scaleY: 1.1,
                      transformOrigin: 'bottom',
                      duration: 0.3,
                      ease: fundaidTheme.easing.smooth
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  if (prefersReducedMotion.current) return;
                  const barElement = e.currentTarget.querySelector('.metric-bar');
                  if (barElement) {
                    gsap.to(barElement, {
                      opacity: 0.7,
                      scaleY: 1,
                      duration: 0.3,
                      ease: fundaidTheme.easing.smooth
                    });
                  }
                }}
                onClick={(e) => {
                  if (prefersReducedMotion.current) return;
                  const barElement = e.currentTarget.querySelector('.metric-bar');
                  if (barElement) {
                    // Pulse feedback with bounce
                    gsap.timeline()
                      .to(barElement, {
                        scaleY: 0.85,
                        opacity: 0.5,
                        transformOrigin: 'bottom',
                        duration: 0.08,
                        ease: fundaidTheme.easing.strong
                      })
                      .to(barElement, {
                        scaleY: 1.2,
                        opacity: 1,
                        duration: 0.25,
                        ease: fundaidTheme.easing.elasticSoft
                      })
                      .to(barElement, {
                        scaleY: 1.1,
                        duration: 0.15,
                        ease: fundaidTheme.easing.smooth
                      });
                  }
                }}
              >
                {/* Bar background */}
                <rect
                  x="0" y={-100}
                  width="12" height="100"
                  fill={fundaidTheme.text.muted}
                  opacity="0.1"
                  rx="2"
                />

                {/* Bar value */}
                <rect
                  className="metric-bar"
                  x="0" y={-metric.height}
                  width="12" height={metric.height}
                  fill={fundaidTheme.accents.lavender}
                  opacity="0.7"
                  rx="2"
                />

                {/* Label */}
                <text
                  x="6" y="10"
                  textAnchor="middle"
                  fill={fundaidTheme.text.muted}
                  fontSize="7"
                  fontWeight="500"
                >
                  {metric.label}
                </text>

                {/* Value */}
                <text
                  x="6" y={-metric.height - 5}
                  textAnchor="middle"
                  fill={fundaidTheme.accents.lavender}
                  fontSize="8"
                  fontWeight="600"
                >
                  {metric.value}
                </text>
              </g>
            ))}
          </g>
        </g>

        {/* Score Display */}
        <g transform="translate(200, 280)">
          {/* Processing ring */}
          <circle
            className="processing-ring"
            cx="0" cy="0" r="45"
            fill="none"
            stroke={fundaidTheme.accents.lavender}
            strokeWidth="2"
            opacity="0.3"
          />

          {/* Score circle */}
          <circle
            cx="0" cy="0" r="40"
            fill={fundaidTheme.backgrounds.panel}
            stroke={fundaidTheme.accents.lavender}
            strokeWidth="2"
          />

          {/* Score text */}
          <text
            className="score-text"
            x="0" y="5"
            textAnchor="middle"
            fill={fundaidTheme.accents.lavender}
            fontSize="28"
            fontWeight="bold"
          >
            0
          </text>

          {/* Score label */}
          <text
            x="0" y="20"
            textAnchor="middle"
            fill={fundaidTheme.text.muted}
            fontSize="8"
          >
            COMPLIANCE
          </text>
        </g>

        {/* Status indicators - ENHANCED: More status items */}
        <g transform="translate(40, 310)">
          {['Parsing RFPs', 'Validating Budget', 'Checking Timeline', 'Scoring Fit', 'Verifying Requirements'].map((status, idx) => (
            <g key={status} transform={`translate(0, ${idx * 25})`}>
              {/* Status dot */}
              <circle
                cx="0" cy="0" r="3"
                fill={idx === 0 ? fundaidTheme.accents.lavender : fundaidTheme.text.muted}
                opacity={idx === 0 ? 1 : 0.3}
              >
                {idx === 0 && (
                  <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>

              {/* Status text */}
              <text
                x="10" y="3"
                fill={fundaidTheme.text.muted}
                fontSize="9"
                opacity={idx === 0 ? 1 : 0.5}
              >
                {status}
              </text>
            </g>
          ))}
        </g>

        {/* Universal scanning line effect */}
        <line
          ref={scanLineRef}
          x1="-100"
          x2="-100"
          y1="0"
          y2="450"
          stroke={fundaidTheme.accents.lavender}
          strokeWidth="2"
          opacity="0"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
}

/**
 * PROFILE Stage Visual - Technology Profiling & TRL Assessment
 * Represents company analysis, tech stack extraction, and TRL scoring
 */
export function ProfileVisual({ isActive, progress = 0 }: StageVisualProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const coreRef = useRef<SVGGElement>(null);
  const techNodesRef = useRef<SVGGElement>(null);
  const dataStreamsRef = useRef<SVGGElement>(null);
  const trlMeterRef = useRef<SVGGElement>(null);
  const scanLineRef = useRef<SVGLineElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useLayoutEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      if (isActive) {
        if (prefersReducedMotion.current) {
          // Instant display if reduced motion
          gsap.set('.profile-core', { scale: 1, opacity: 1, rotate: 0 });
          gsap.set('.tech-node', { scale: 1, opacity: 1 });
          gsap.set('.data-stream', { opacity: 0.6 }); // Show but no animation
          gsap.set('.trl-segment', (index) => ({
            opacity: index < 7 ? 1 : 0.2,
            scale: 1
          }));
          // Skip continuous animations (tech-scanner, extraction-point pulse, data particles)
        } else {
          // Breathing glow effect on background panel
          gsap.to('.stage1-glow-layer', {
            opacity: [0.03, 0.06, 0.03],
            duration: 4.5,
            repeat: -1,
            ease: fundaidTheme.easing.cinematic,
            yoyo: false
          });

          // Subtle pulsing on border glow
          gsap.to('.stage1-border-glow', {
            strokeOpacity: [0.08, 0.14, 0.08],
            duration: 3.5,
            repeat: -1,
            ease: fundaidTheme.easing.smooth,
            yoyo: false
          });

          // Traveling shimmer highlight around border
          gsap.to('.stage1-border-shimmer', {
            strokeDashoffset: -1700, // Perimeter of rounded rect (travels full circle)
            duration: 5.5,
            repeat: -1,
            ease: fundaidTheme.easing.linear,
            yoyo: false
          });

          // Core hexagon scaling in
          gsap.fromTo('.profile-core',
            {
              scale: 0,
              opacity: 0,
              rotate: -30,
              transformOrigin: 'center'
            },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 1,
              ease: 'back.out(1.4)'
            }
          );

          // Tech nodes radiating out
          gsap.fromTo('.tech-node',
            {
              scale: 0,
              opacity: 0,
              transformOrigin: 'center'
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              stagger: {
                from: 'center',
                amount: 1.2,
                ease: 'power2.out'
              },
              delay: 0.5,
              ease: 'back.out(1.2)'
            }
          );

          // Data streams animation
          gsap.fromTo('.data-stream',
            {
              strokeDasharray: '5 10',
              strokeDashoffset: '0',
              opacity: 0
            },
            {
              strokeDashoffset: -15,
              opacity: 0.6,
              duration: 2,
              repeat: -1,
              ease: 'none',
              stagger: 0.1
            }
          );

          // TRL segments filling
          gsap.fromTo('.trl-segment',
            {
              opacity: 0,
              scale: 0.8,
              transformOrigin: 'center'
            },
            {
              opacity: function(index) {
                // Fill up to TRL 7 (example value)
                return index < 7 ? 1 : 0.2;
              },
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              delay: 1.2
            }
          );

          // Scanning animation on tech nodes
          gsap.to('.tech-scanner', {
            rotate: 360,
            duration: 4,
            repeat: -1,
            ease: 'none',
            transformOrigin: 'center'
          });

          // Pulse on extraction points
          gsap.to('.extraction-point', {
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
            duration: 2,
            repeat: -1,
            stagger: {
              each: 0.2,
              from: 'random'
            },
            ease: 'power2.inOut'
          });

          // Data particle flow animation removed - path elements not compatible with MotionPathPlugin

          // Scanning line animation - universal scan line effect
          if (scanLineRef.current) {
            gsap.fromTo(scanLineRef.current,
              {
                attr: { x1: -100, x2: -100 },
                opacity: 0
              },
              {
                attr: { x1: 500, x2: 500 },
                opacity: [0, 0.8, 0.8, 0],
                duration: 3.5,
                repeat: -1,
                ease: fundaidTheme.easing.linear
              }
            );
          }

          // Breathing animations for idle states - very subtle
          if (coreRef.current) {
            gsap.to(coreRef.current, {
              scale: 1.025,
              duration: 4.2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }

          // Gentle breathing for tech nodes
          if (techNodesRef.current) {
            gsap.to(techNodesRef.current, {
              scale: 1.015,
              duration: 3.6,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }

          // Subtle TRL meter breathing
          if (trlMeterRef.current) {
            gsap.to(trlMeterRef.current, {
              opacity: 0.95,
              duration: 5,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }
        }

      } else {
        // Kill continuous loop animations to save performance
        gsap.killTweensOf(['.trl-meter', '.tech-scanner', '.extract-point', '.data-particle', '.stage1-glow-layer', '.stage1-border-glow', '.stage1-border-shimmer', scanLineRef.current, coreRef.current, techNodesRef.current, trlMeterRef.current]);

        // Fade out when not active
        gsap.to(['.profile-core', '.tech-node', '.data-stream', '.trl-segment'], {
          opacity: 0,
          duration: 0.5
        });
      }
    }, svgRef);

    return () => ctx?.revert();
  }, [isActive]);

  // Parallax depth layers based on scroll progress
  useEffect(() => {
    if (!svgRef.current || !isActive || prefersReducedMotion.current) return;

    // Subtle parallax effect - background moves slower, foreground moves faster
    // Background panels: slowest (0.5x)
    gsap.set('.stage1-glow-layer, .stage1-border-glow, .stage1-border-shimmer', {
      y: progress * 5,
      overwrite: 'auto'
    });

    // Middle layer (data streams): medium speed (1x)
    if (dataStreamsRef.current) {
      gsap.set(dataStreamsRef.current, {
        y: progress * 10,
        overwrite: 'auto'
      });
    }

    // Foreground (core, tech nodes, TRL meter): fastest (1.5x)
    if (coreRef.current) {
      gsap.set(coreRef.current, {
        y: progress * 15,
        overwrite: 'auto'
      });
    }

    if (techNodesRef.current) {
      gsap.set(techNodesRef.current, {
        y: progress * 15,
        overwrite: 'auto'
      });
    }

    if (trlMeterRef.current) {
      gsap.set(trlMeterRef.current, {
        y: progress * 15,
        overwrite: 'auto'
      });
    }
  }, [progress, isActive]);

  // Tech stack nodes positions (radiating from center) - ENHANCED: More tech nodes
  const techNodes = [
    { id: 1, x: 200, y: 60, label: 'AI/ML', icon: '🧠' },
    { id: 2, x: 290, y: 100, label: 'API', icon: '🔌' },
    { id: 3, x: 340, y: 160, label: 'DATA', icon: '📊' },
    { id: 4, x: 340, y: 240, label: 'CLOUD', icon: '☁️' },
    { id: 5, x: 290, y: 300, label: 'DEVOPS', icon: '⚙️' },
    { id: 6, x: 200, y: 340, label: 'MOBILE', icon: '📱' },
    { id: 7, x: 110, y: 300, label: 'WEB', icon: '🌐' },
    { id: 8, x: 60, y: 240, label: 'SEC', icon: '🔐' },
    { id: 9, x: 60, y: 160, label: 'IOT', icon: '📡' },
    { id: 10, x: 110, y: 100, label: 'DB', icon: '💾' },
    { id: 11, x: 200, y: 380, label: 'EDGE', icon: '⚡' },
    { id: 12, x: 360, y: 200, label: 'AI', icon: '🤖' }
  ];

  // TRL levels for the meter
  const trlLevels = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 400 450"
        className="w-full h-full max-w-xl"
        style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))' }}
      >
        <defs>
          {/* Gradient for core */}
          <radialGradient id="core-gradient">
            <stop offset="0%" stopColor={fundaidTheme.accents.blue} stopOpacity="0.9" />
            <stop offset="100%" stopColor={fundaidTheme.accents.blue} stopOpacity="0.3" />
          </radialGradient>

          {/* Pattern for scanning effect */}
          <pattern id="scan-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.5" fill={fundaidTheme.accents.blue} opacity="0.3" />
          </pattern>

          {/* Hexagon clip path */}
          <clipPath id="hex-clip">
            <polygon points="200,140 250,170 250,230 200,260 150,230 150,170" />
          </clipPath>

          {/* Glow filter */}
          <filter id="blue-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* ENHANCED GLASSMORPHISM FILTERS */}

          {/* Frosted glass texture with noise */}
          <filter id="frosted-glass-stage1" x="-50%" y="-50%" width="200%" height="200%">
            {/* Create organic noise texture */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.82"
              numOctaves="4"
              seed="1"
              result="noise"
            />
            {/* Subtle displacement for depth */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Multi-layer blur for depth */}
            <feGaussianBlur in="displaced" stdDeviation="1.5" result="blur1"/>
            <feGaussianBlur in="blur1" stdDeviation="3" result="blur2"/>
            {/* Blend layers */}
            <feBlend in="blur2" in2="SourceGraphic" mode="normal" result="blended"/>
            {/* Add subtle color tint */}
            <feColorMatrix
              in="blended"
              type="matrix"
              values="1 0 0 0 0.08
                      0 1 0 0 0.12
                      0 0 1 0 0.18
                      0 0 0 1 0"
              result="tinted"
            />
            <feMerge>
              <feMergeNode in="tinted"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Specular highlights for premium feel */}
          <filter id="glass-highlights-stage1">
            {/* Create lighting effect */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
            <feSpecularLighting
              in="blur"
              surfaceScale="5"
              specularConstant="0.8"
              specularExponent="20"
              lighting-color={fundaidTheme.accents.blue}
              result="specOut"
            >
              <fePointLight x="100" y="50" z="200"/>
            </feSpecularLighting>
            {/* Composite highlights */}
            <feComposite
              in="specOut"
              in2="SourceAlpha"
              operator="in"
              result="specOut2"
            />
            <feComposite
              in="SourceGraphic"
              in2="specOut2"
              operator="arithmetic"
              k1="0" k2="1" k3="1" k4="0"
            />
          </filter>

          {/* Edge glow for depth */}
          <filter id="edge-glow-stage1">
            <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken"/>
            <feGaussianBlur in="thicken" stdDeviation="3" result="blurred"/>
            <feFlood flood-color={fundaidTheme.accents.blue} flood-opacity="0.3" result="glowColor"/>
            <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow"/>
            <feMerge>
              <feMergeNode in="softGlow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Enhanced Background Panel with Radial Gradient - Stage 1 (Blue) */}
        <defs>
          <radialGradient id="panel-bg-gradient-stage1" cx="50%" cy="30%">
            <stop offset="0%" stopColor="rgba(28, 44, 85, 0.45)" />
            <stop offset="75%" stopColor="rgba(10, 16, 32, 0.85)" />
          </radialGradient>
        </defs>

        {/* Base glassmorphic panel with frosted texture */}
        <rect
          width="400"
          height="450"
          rx="40"
          fill="url(#panel-bg-gradient-stage1)"
          filter="url(#frosted-glass-stage1)"
          style={{ backdropFilter: 'blur(30px)' }}
        />
        {/* Border with edge glow */}
        <rect
          className="stage1-border-glow"
          width="400"
          height="450"
          rx="40"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          strokeOpacity="0.08"
          filter="url(#edge-glow-stage1)"
        />
        {/* Traveling shimmer highlight on border */}
        <rect
          className="stage1-border-shimmer"
          width="400"
          height="450"
          rx="40"
          fill="none"
          stroke={fundaidTheme.accents.blue}
          strokeWidth="2"
          strokeOpacity="0.15"
          strokeDasharray="80 1620"
          strokeDashoffset="0"
          style={{ mixBlendMode: 'screen' }}
        />
        {/* Inner highlight layer with specular lighting */}
        <rect
          width="396"
          height="446"
          x="2"
          y="2"
          rx="38"
          fill="rgba(59, 165, 255, 0.04)"
          filter="url(#glass-highlights-stage1)"
          style={{ mixBlendMode: 'screen' }}
        />
        {/* Subtle inner glow for depth with breathing animation */}
        <rect
          className="stage1-glow-layer"
          width="400"
          height="450"
          rx="40"
          fill="rgba(59, 165, 255, 0.03)"
          opacity="0.03"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Blueprint micro-lines pattern */}
        <g opacity="0.08">
          {[...Array(20)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 22.5}
              x2="400"
              y2={i * 22.5}
              stroke="rgba(59, 165, 255, 0.3)"
              strokeWidth="0.5"
            />
          ))}
          {[...Array(18)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 22.2}
              y1="0"
              x2={i * 22.2}
              y2="450"
              stroke="rgba(59, 165, 255, 0.3)"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Tiny particle dots */}
        <g>
          {[...Array(30)].map((_, i) => (
            <circle
              key={`particle-${i}`}
              cx={Math.random() * 400}
              cy={Math.random() * 450}
              r="1"
              fill={i % 3 === 0 ? '#3BA5FF' : i % 3 === 1 ? '#A26CF7' : '#FFFFFF'}
              opacity={Math.random() * 0.4 + 0.1}
            />
          ))}
        </g>

        {/* Data streams from documents to core */}
        <g ref={dataStreamsRef}>
          {/* Left stream (from documents) */}
          <path
            className="data-stream"
            d="M 30 100 Q 100 150 200 200"
            fill="none"
            stroke={fundaidTheme.accents.blue}
            strokeWidth="1.5"
            strokeDasharray="5 10"
            opacity="0"
          />
          <path
            className="data-stream"
            d="M 30 200 Q 100 200 200 200"
            fill="none"
            stroke={fundaidTheme.accents.blue}
            strokeWidth="1.5"
            strokeDasharray="5 10"
            opacity="0"
          />
          <path
            className="data-stream"
            d="M 30 300 Q 100 250 200 200"
            fill="none"
            stroke={fundaidTheme.accents.blue}
            strokeWidth="1.5"
            strokeDasharray="5 10"
            opacity="0"
          />
        </g>

        {/* Document extraction points */}
        <g>
          <g className="extraction-point" transform="translate(30, 100)">
            <rect width="40" height="50" rx="2" fill={fundaidTheme.backgrounds.panel} stroke={fundaidTheme.accents.blue} strokeWidth="1" opacity="0.6"/>
            <text x="20" y="30" textAnchor="middle" fill={fundaidTheme.accents.blue} fontSize="8">PDF</text>
          </g>
          <g className="extraction-point" transform="translate(30, 175)">
            <rect width="40" height="50" rx="2" fill={fundaidTheme.backgrounds.panel} stroke={fundaidTheme.accents.blue} strokeWidth="1" opacity="0.6"/>
            <text x="20" y="30" textAnchor="middle" fill={fundaidTheme.accents.blue} fontSize="8">DOC</text>
          </g>
          <g className="extraction-point" transform="translate(30, 250)">
            <rect width="40" height="50" rx="2" fill={fundaidTheme.backgrounds.panel} stroke={fundaidTheme.accents.blue} strokeWidth="1" opacity="0.6"/>
            <text x="20" y="30" textAnchor="middle" fill={fundaidTheme.accents.blue} fontSize="8">WEB</text>
          </g>
        </g>

        {/* Data flow particles */}
        <g>
          {[0, 1, 2, 3, 4].map(idx => (
            <circle
              key={`particle-${idx}`}
              className="data-particle-profile"
              r="2"
              fill={fundaidTheme.accents.blue}
              opacity="0.8"
            />
          ))}
        </g>

        {/* Central core hexagon */}
        <g ref={coreRef} className="profile-core">
          {/* Outer ring */}
          <polygon
            points="200,130 260,165 260,235 200,270 140,235 140,165"
            fill="none"
            stroke={fundaidTheme.accents.blue}
            strokeWidth="2"
            opacity="0.3"
            filter="url(#blue-glow)"
          />

          {/* Main hexagon */}
          <polygon
            points="200,140 250,170 250,230 200,260 150,230 150,170"
            fill="url(#core-gradient)"
            stroke={fundaidTheme.accents.blue}
            strokeWidth="2"
            filter="url(#blue-glow)"
          />

          {/* Scanner ring */}
          <polygon
            className="tech-scanner"
            points="200,145 245,172 245,228 200,255 155,228 155,172"
            fill="none"
            stroke={fundaidTheme.accents.blue}
            strokeWidth="1"
            strokeDasharray="10 5"
            opacity="0.5"
          />

          {/* Center label */}
          <text x="200" y="195" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            COMPANY
          </text>
          <text x="200" y="210" textAnchor="middle" fill="white" fontSize="8">
            PROFILE
          </text>
        </g>

        {/* Tech stack nodes */}
        <g ref={techNodesRef}>
          {techNodes.map(node => (
            <g key={node.id} className="tech-node">
              {/* Connection line to core */}
              <line
                x1="200" y1="200"
                x2={node.x} y2={node.y}
                stroke={fundaidTheme.accents.blue}
                strokeWidth="1"
                opacity="0.2"
              />

              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill={fundaidTheme.backgrounds.panel}
                stroke={fundaidTheme.accents.blue}
                strokeWidth="1.5"
                opacity="0.9"
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  if (prefersReducedMotion.current) return;
                  gsap.to(e.currentTarget, {
                    attr: { r: 28 },
                    strokeWidth: 2,
                    opacity: 1,
                    filter: 'url(#glow)',
                    duration: 0.3,
                    ease: fundaidTheme.easing.smooth
                  });
                }}
                onMouseLeave={(e) => {
                  if (prefersReducedMotion.current) return;
                  gsap.to(e.currentTarget, {
                    attr: { r: 25 },
                    strokeWidth: 1.5,
                    opacity: 0.9,
                    filter: 'none',
                    duration: 0.3,
                    ease: fundaidTheme.easing.smooth
                  });
                }}
                onClick={(e) => {
                  if (prefersReducedMotion.current) return;
                  // Ripple feedback with scale bounce
                  gsap.timeline()
                    .to(e.currentTarget, {
                      attr: { r: 22 },
                      strokeWidth: 2.5,
                      duration: 0.08,
                      ease: fundaidTheme.easing.strong
                    })
                    .to(e.currentTarget, {
                      attr: { r: 32 },
                      strokeWidth: 1.5,
                      opacity: 1,
                      duration: 0.25,
                      ease: fundaidTheme.easing.elasticSoft
                    })
                    .to(e.currentTarget, {
                      attr: { r: 28 },
                      strokeWidth: 2,
                      duration: 0.15,
                      ease: fundaidTheme.easing.smooth
                    });
                }}
              />

              {/* Node icon */}
              <text x={node.x} y={node.y - 5} textAnchor="middle" fontSize="14">
                {node.icon}
              </text>

              {/* Node label */}
              <text x={node.x} y={node.y + 10} textAnchor="middle" fill={fundaidTheme.accents.blue} fontSize="7" fontWeight="600">
                {node.label}
              </text>
            </g>
          ))}
        </g>

        {/* TRL Assessment Meter */}
        <g ref={trlMeterRef} transform="translate(320, 340)">
          {/* Meter background */}
          <rect
            width="70" height="90"
            rx="4"
            fill={fundaidTheme.backgrounds.panel}
            fillOpacity="0.95"
            stroke={fundaidTheme.accents.blue}
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* Title */}
          <text x="35" y="15" textAnchor="middle" fill={fundaidTheme.accents.blue} fontSize="8" fontWeight="600">
            TRL LEVEL
          </text>

          {/* TRL segments */}
          <g transform="translate(10, 25)">
            {trlLevels.map((level, idx) => (
              <g key={level} transform={`translate(${(idx % 3) * 18}, ${Math.floor(idx / 3) * 18})`}>
                <rect
                  className="trl-segment"
                  x="0" y="0"
                  width="15" height="15"
                  rx="2"
                  fill={fundaidTheme.accents.blue}
                  opacity="0.2"
                />
                <text
                  x="7.5" y="10"
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="600"
                >
                  {level}
                </text>
              </g>
            ))}
          </g>

          {/* Current TRL indicator */}
          <text x="35" y="82" textAnchor="middle" fill={fundaidTheme.accents.blue} fontSize="6">
            ASSESSED: 7/9
          </text>
        </g>

        {/* Info overlay - ENHANCED */}
        <g transform="translate(100, 30)">
          <rect
            width="140"
            height="65"
            rx="4"
            fill={fundaidTheme.backgrounds.panel}
            fillOpacity="0.95"
            stroke={fundaidTheme.accents.blue}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text x="10" y="18" fill={fundaidTheme.text.main} fontSize="10" fontWeight="700">
            TECH PROFILING
          </text>
          <text x="10" y="34" fill={fundaidTheme.text.muted} fontSize="9">
            12 stack components
          </text>
          <text x="10" y="48" fill={fundaidTheme.accents.blue} fontSize="9" fontWeight="600">
            TRL 7 validated
          </text>
          <text x="10" y="60" fill={fundaidTheme.accents.blue} fontSize="7" opacity="0.7">
            Analyzing capabilities...
          </text>
        </g>

        {/* Universal scanning line effect */}
        <line
          ref={scanLineRef}
          x1="-100"
          x2="-100"
          y1="0"
          y2="450"
          stroke={fundaidTheme.accents.blue}
          strokeWidth="2"
          opacity="0"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
}

/**
 * GENERATE Stage Visual - AI Multi-Agent Writing System
 * Represents collaborative writing agents, assessor feedback, and quality improvement
 */
export function GenerateVisual({ isActive, progress = 0 }: StageVisualProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const agentsRef = useRef<SVGGElement>(null);
  const documentsRef = useRef<SVGGElement>(null);
  const assessorsRef = useRef<SVGGElement>(null);
  const qualityMeterRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      if (isActive) {
        // Agent nodes appearing
        gsap.fromTo('.agent-node',
          {
            scale: 0,
            opacity: 0,
            rotate: -180,
            transformOrigin: 'center'
          },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.4)'
          }
        );

        // Document fragments flowing
        gsap.fromTo('.doc-fragment',
          {
            x: function(index) {
              return index % 2 === 0 ? -100 : 100;
            },
            y: -50,
            opacity: 0,
            scale: 0.5
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power2.out',
            delay: 0.5
          }
        );

        // Collaboration lines pulsing
        gsap.to('.collab-line', {
          strokeDashoffset: -20,
          duration: 2,
          repeat: -1,
          ease: 'none',
          stagger: 0.1
        });

        // Agent activity pulses
        gsap.to('.agent-pulse', {
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
          duration: 2.5,
          repeat: -1,
          stagger: {
            each: 0.3,
            from: 'random'
          },
          ease: 'power2.inOut'
        });

        // Assessor feedback loops
        gsap.fromTo('.feedback-arc',
          {
            strokeDasharray: '100',
            strokeDashoffset: '100',
            opacity: 0
          },
          {
            strokeDashoffset: 0,
            opacity: 0.6,
            duration: 1.5,
            stagger: 0.2,
            repeat: -1,
            repeatDelay: 1,
            ease: 'power2.inOut',
            delay: 1
          }
        );

        // Quality score animation
        const qualityTarget = 7.8; // Example score
        gsap.fromTo('.quality-fill',
          {
            scaleY: 0,
            transformOrigin: 'bottom center'
          },
          {
            scaleY: qualityTarget / 10,
            duration: 2,
            ease: 'power2.out',
            delay: 1.5
          }
        );

        // Score counter
        gsap.fromTo('.quality-score',
          {
            textContent: '0.0'
          },
          {
            textContent: qualityTarget.toFixed(1),
            duration: 2,
            ease: 'power2.inOut',
            delay: 1.5,
            onUpdate: function() {
              const target = this.targets()[0];
              if (target) {
                const value = (this.progress() * qualityTarget).toFixed(1);
                target.textContent = value;
              }
            }
          }
        );

        // Text blocks assembly animation
        gsap.to('.text-block', {
          y: function(index) {
            return index * 15;
          },
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 1
        });

        // Iteration indicator
        gsap.to('.iteration-indicator', {
          rotate: 360,
          duration: 3,
          repeat: -1,
          ease: 'none'
        });

      } else {
        // Fade out when not active
        gsap.to(['.agent-node', '.doc-fragment', '.feedback-arc', '.quality-fill'], {
          opacity: 0,
          duration: 0.5
        });
      }
    }, svgRef);

    return () => ctx?.revert();
  }, [isActive]);

  // ENHANCED: Agent positions with stage color coding - Better spacing
  const writerAgents = [
    { id: 1, x: 70, y: 90, label: 'WRITER 1', role: 'Technical', color: fundaidTheme.accents.blue },
    { id: 2, x: 200, y: 60, label: 'WRITER 2', role: 'Business', color: fundaidTheme.accents.teal },
    { id: 3, x: 330, y: 90, label: 'WRITER 3', role: 'Research', color: fundaidTheme.accents.lavender },
    { id: 4, x: 130, y: 160, label: 'WRITER 4', role: 'Impact', color: fundaidTheme.accents.coral },
    { id: 5, x: 270, y: 160, label: 'WRITER 5', role: 'Innovation', color: fundaidTheme.accents.lavender },
    { id: 6, x: 200, y: 220, label: 'COORDINATOR', role: 'Quality', color: fundaidTheme.accents.coral }
  ];

  // ENHANCED: Assessor positions with comprehensive feedback - Better spacing
  const assessors = [
    { id: 1, x: 50, y: 300, label: 'TECH', color: fundaidTheme.accents.blue },
    { id: 2, x: 130, y: 340, label: 'BIZ', color: fundaidTheme.accents.teal },
    { id: 3, x: 200, y: 360, label: 'ACAD', color: fundaidTheme.accents.lavender },
    { id: 4, x: 270, y: 340, label: 'GRANT', color: '#FF4F4F' },
    { id: 5, x: 350, y: 300, label: 'PEER', color: fundaidTheme.accents.coral }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 400 450"
        className="w-full h-full max-w-xl"
        style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))' }}
      >
        <defs>
          {/* Gradient for agents */}
          <radialGradient id="agent-gradient">
            <stop offset="0%" stopColor={fundaidTheme.accents.coral} stopOpacity="0.9" />
            <stop offset="100%" stopColor={fundaidTheme.accents.coral} stopOpacity="0.4" />
          </radialGradient>

          {/* Pattern for document texture */}
          <pattern id="doc-pattern" width="3" height="3" patternUnits="userSpaceOnUse">
            <rect width="3" height="0.5" fill={fundaidTheme.accents.coral} opacity="0.2" />
          </pattern>

          {/* Glow filter */}
          <filter id="coral-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Enhanced Background Panel with Radial Gradient */}
        <defs>
          <radialGradient id="panel-bg-gradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="rgba(28, 44, 85, 0.45)" />
            <stop offset="75%" stopColor="rgba(10, 16, 32, 0.85)" />
          </radialGradient>
        </defs>
        <rect
          width="400"
          height="450"
          rx="40"
          fill="url(#panel-bg-gradient)"
          style={{ backdropFilter: 'blur(30px)' }}
        />
        <rect
          width="400"
          height="450"
          rx="40"
          fill="none"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1"
        />
        {/* Inner shadow/glow */}
        <rect
          width="400"
          height="450"
          rx="40"
          fill="rgba(0, 200, 255, 0.03)"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Blueprint micro-lines pattern - reduced opacity for cleaner look */}
        <g opacity="0.02">
          {[...Array(20)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 22.5}
              x2="400"
              y2={i * 22.5}
              stroke="rgba(0, 255, 255, 0.3)"
              strokeWidth="0.5"
            />
          ))}
          {[...Array(18)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 22.2}
              y1="0"
              x2={i * 22.2}
              y2="450"
              stroke="rgba(0, 255, 255, 0.3)"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Tiny particle dots - reduced from 30 to 12 */}
        <g>
          {[...Array(12)].map((_, i) => (
            <circle
              key={`particle-${i}`}
              cx={Math.random() * 400}
              cy={Math.random() * 450}
              r="1"
              fill={i % 3 === 0 ? '#00FFE6' : i % 3 === 1 ? '#A26CF7' : '#FFFFFF'}
              opacity={Math.random() * 0.4 + 0.1}
            />
          ))}
        </g>

        {/* Collaboration lines between agents - Subtle connections */}
        <g>
          {writerAgents.slice(0, 5).map((agent, idx) => {
            const nextAgent = writerAgents[(idx + 1) % 5];
            return (
              <g key={`collab-${idx}`}>
                {/* Glow layer - reduced visibility */}
                <line
                  x1={agent.x} y1={agent.y}
                  x2={nextAgent.x} y2={nextAgent.y}
                  stroke="rgba(0, 255, 230, 0.2)"
                  strokeWidth="2"
                  opacity="0.1"
                  style={{ filter: 'blur(3px)' }}
                />
                {/* Main line - more subtle */}
                <line
                  className="collab-line"
                  x1={agent.x} y1={agent.y}
                  x2={nextAgent.x} y2={nextAgent.y}
                  stroke="rgba(0, 255, 230, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                  opacity="0.2"
                />
              </g>
            );
          })}
        </g>

        {/* Writer Agents - Cleaner appearance */}
        <g ref={agentsRef}>
          {writerAgents.map(agent => (
            <g key={agent.id} className="agent-node">
              {/* Glow background - reduced */}
              <circle
                cx={agent.x}
                cy={agent.y}
                r="24"
                fill={agent.color}
                opacity="0.06"
                style={{ filter: 'blur(8px)' }}
              />

              {/* Agent pulse ring - more subtle */}
              <circle
                className="agent-pulse"
                cx={agent.x}
                cy={agent.y}
                r="28"
                fill="none"
                stroke={agent.color}
                strokeWidth="0.8"
                opacity="0.25"
              />

              {/* Glassmorphic background */}
              <rect
                x={agent.x - 24}
                y={agent.y - 24}
                width="48"
                height="48"
                rx="18"
                fill="rgba(255, 255, 255, 0.12)"
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth="1"
                style={{ backdropFilter: 'blur(16px)' }}
              />

              {/* Inner glass layer */}
              <rect
                x={agent.x - 22}
                y={agent.y - 22}
                width="44"
                height="44"
                rx="16"
                fill="url(#agent-gradient)"
                opacity="0.3"
              />

              {/* Agent label */}
              <text x={agent.x} y={agent.y - 5} textAnchor="middle" fill="white" fontSize="7" fontWeight="600">
                {agent.label}
              </text>
              <text x={agent.x} y={agent.y + 5} textAnchor="middle" fill="white" fontSize="6" opacity="0.9">
                {agent.role}
              </text>

              {/* Stage-coded bottom neon bar */}
              <rect
                x={agent.x - 24}
                y={agent.y + 21}
                width="48"
                height="3"
                rx="1.5"
                fill={agent.color}
                opacity="0.9"
                style={{ filter: `drop-shadow(0 0 6px ${agent.color})` }}
              />

              {/* Activity indicator with glow */}
              <circle
                cx={agent.x + 18}
                cy={agent.y - 18}
                r="3"
                fill={agent.color}
                style={{ filter: `drop-shadow(0 0 4px ${agent.color})` }}
              >
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </g>

        {/* Central Document Assembly - Enhanced with Glassmorphism */}
        <g ref={documentsRef} transform="translate(200, 220)">
          {/* Glow background */}
          <rect
            x="-48" y="-38"
            width="96" height="116"
            rx="8"
            fill="#FF4F4F"
            opacity="0.15"
            style={{ filter: 'blur(20px)' }}
          />

          {/* Glassmorphic main document */}
          <rect
            x="-44" y="-34"
            width="88" height="108"
            rx="18"
            fill="linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1"
            style={{ backdropFilter: 'blur(16px)' }}
          />

          {/* Inner glass layer */}
          <rect
            x="-40" y="-30"
            width="80" height="100"
            rx="14"
            fill="rgba(255, 255, 255, 0.08)"
          />

          {/* Document fragments flowing in - Reduced for clarity */}
          {[0, 1, 2, 3].map(idx => (
            <g key={idx} className="doc-fragment">
              <rect
                x={-35 + (idx % 2) * 35}
                y={-25 + (idx % 2) * 25}
                width="30"
                height="15"
                rx="2"
                fill={fundaidTheme.accents.coral}
                opacity="0.25"
                style={{ filter: 'drop-shadow(0 0 3px rgba(235, 125, 100, 0.5))' }}
              />
            </g>
          ))}

          {/* Text blocks assembling - Simplified */}
          <g>
            {[0, 1, 2, 3, 4].map(idx => (
              <rect
                key={idx}
                className="text-block"
                x="-30"
                y={-20 + idx * 12}
                width={52 - idx * 3}
                height="2"
                rx="1"
                fill="#FFFFFF"
                opacity="0.6"
              />
            ))}
          </g>

          {/* Stage-coded bottom neon bar */}
          <rect
            x="-44"
            y="71"
            width="88"
            height="3"
            rx="1.5"
            fill="#FF4F4F"
            opacity="0.9"
            style={{ filter: 'drop-shadow(0 0 8px #FF4F4F)' }}
          />

          {/* Document label */}
          <text x="0" y="85" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" opacity="0.9">
            GRANT DOCUMENT
          </text>
        </g>

        {/* Assessor Simulation - Cleaner appearance */}
        <g ref={assessorsRef}>
          {assessors.map(assessor => (
            <g key={assessor.id}>
              {/* Feedback arc to document - more subtle */}
              <path
                className="feedback-arc"
                d={`M ${assessor.x} ${assessor.y} Q 200 280 200 260`}
                fill="none"
                stroke={assessor.color}
                strokeWidth="1"
                strokeDasharray="100"
                opacity="0"
                style={{ filter: `drop-shadow(0 0 2px ${assessor.color}40)` }}
              />

              {/* Glow background - reduced */}
              <circle
                cx={assessor.x}
                cy={assessor.y}
                r="16"
                fill={assessor.color}
                opacity="0.06"
                style={{ filter: 'blur(8px)' }}
              />

              {/* Glassmorphic assessor node */}
              <rect
                x={assessor.x - 18}
                y={assessor.y - 18}
                width="36"
                height="36"
                rx="12"
                fill="rgba(255, 255, 255, 0.12)"
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth="1"
                style={{ backdropFilter: 'blur(16px)' }}
              />

              {/* Inner glass layer */}
              <rect
                x={assessor.x - 16}
                y={assessor.y - 16}
                width="32"
                height="32"
                rx="10"
                fill="rgba(255, 255, 255, 0.08)"
              />

              {/* Assessor label */}
              <text x={assessor.x} y={assessor.y + 3} textAnchor="middle" fill="white" fontSize="7" fontWeight="600" opacity="0.95">
                {assessor.label}
              </text>

              {/* Stage-coded bottom neon bar */}
              <rect
                x={assessor.x - 18}
                y={assessor.y + 15}
                width="36"
                height="3"
                rx="1.5"
                fill={assessor.color}
                opacity="0.9"
                style={{ filter: `drop-shadow(0 0 6px ${assessor.color})` }}
              />
            </g>
          ))}

          {/* Assessor label with glassmorphic background */}
          <rect
            x="130"
            y="355"
            width="140"
            height="20"
            rx="10"
            fill="rgba(255, 255, 255, 0.08)"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1"
          />
          <text x="200" y="368" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" opacity="0.9">
            ASSESSOR SIMULATION
          </text>
        </g>

        {/* Quality Score Meter - Enhanced with Glassmorphism */}
        <g ref={qualityMeterRef} transform="translate(320, 180)">
          {/* Glow background */}
          <rect
            x="-5" y="-5"
            width="70" height="130"
            rx="8"
            fill="#FF4F4F"
            opacity="0.15"
            style={{ filter: 'blur(20px)' }}
          />

          {/* Glassmorphic meter background */}
          <rect
            width="60" height="120"
            rx="18"
            fill="linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1"
            style={{ backdropFilter: 'blur(16px)' }}
          />

          {/* Inner glass layer */}
          <rect
            x="2" y="2"
            width="56" height="116"
            rx="16"
            fill="rgba(255, 255, 255, 0.08)"
          />

          {/* Title */}
          <text x="30" y="18" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" opacity="0.95">
            QUALITY
          </text>

          {/* Meter container with glass effect */}
          <rect
            x="18" y="28"
            width="24" height="70"
            rx="4"
            fill="rgba(255, 255, 255, 0.05)"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />

          {/* Meter fill with gradient and glow */}
          <defs>
            <linearGradient id="quality-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FF4F4F" stopOpacity="0.9" />
              <stop offset="50%" stopColor={fundaidTheme.accents.coral} stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFB366" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <rect
            className="quality-fill"
            x="18" y="98"
            width="24" height="70"
            rx="4"
            fill="url(#quality-gradient)"
            style={{
              transform: 'scaleY(0)',
              transformOrigin: 'bottom',
              filter: 'drop-shadow(0 0 8px #FF4F4F)'
            }}
          />

          {/* Score display */}
          <text className="quality-score" x="30" y="108" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            0.0
          </text>
          <text x="30" y="117" textAnchor="middle" fill="white" fontSize="6" opacity="0.7">
            / 10
          </text>

          {/* Stage-coded bottom neon bar */}
          <rect
            x="0"
            y="117"
            width="60"
            height="3"
            rx="1.5"
            fill="#FF4F4F"
            opacity="0.9"
            style={{ filter: 'drop-shadow(0 0 8px #FF4F4F)' }}
          />
        </g>

        {/* Iteration indicator */}
        <g transform="translate(80, 200)">
          <circle
            className="iteration-indicator"
            cx="0" cy="0" r="8"
            fill="none"
            stroke={fundaidTheme.accents.coral}
            strokeWidth="1"
            strokeDasharray="3 2"
            opacity="0.5"
          />
          <text x="0" y="20" textAnchor="middle" fill={fundaidTheme.text.muted} fontSize="7">
            ITERATING
          </text>
        </g>

        {/* Info overlay */}
        <g transform="translate(20, 30)">
          <rect
            width="140"
            height="60"
            rx="4"
            fill={fundaidTheme.backgrounds.panel}
            fillOpacity="0.95"
            stroke={fundaidTheme.accents.coral}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text x="10" y="18" fill={fundaidTheme.text.main} fontSize="9" fontWeight="600">
            MULTI-AGENT SYSTEM
          </text>
          <text x="10" y="32" fill={fundaidTheme.text.muted} fontSize="8">
            4 agents collaborating
          </text>
          <text x="10" y="45" fill={fundaidTheme.accents.coral} fontSize="8" fontWeight="500">
            3 assessors reviewing
          </text>
          <text x="10" y="55" fill={fundaidTheme.text.muted} fontSize="7">
            Target: 7+ quality score
          </text>
        </g>
      </svg>
    </div>
  );
}

export default { DiscoverVisual, AnalyzeVisual, ProfileVisual, GenerateVisual };