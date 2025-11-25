/**
 * ProfileVisualCosmic - Clean, abstract tech profiling visualization
 *
 * Replaces cluttered emoji icons with a structured cosmic display:
 * - Central pulsing core (company profile)
 * - Concentric data rings showing tech capabilities
 * - TRL progress arc
 * - Scanning beam effect
 * - Abstract, premium aesthetic
 */

'use client';

import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';

interface ProfileVisualCosmicProps {
  isActive: boolean;
  progress?: number;
}

export function ProfileVisualCosmic({ isActive, progress = 0 }: ProfileVisualCosmicProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const coreRef = useRef<SVGGElement>(null);
  const ringsRef = useRef<SVGGElement>(null);
  const scanBeamRef = useRef<SVGLineElement>(null);
  const trlArcRef = useRef<SVGPathElement>(null);

  // Check for reduced motion
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
          gsap.set('.cosmic-core', { scale: 1, opacity: 1 });
          gsap.set('.data-ring', { opacity: 1, scale: 1 });
          gsap.set('.tech-indicator', { opacity: 1 });
          gsap.set('.trl-arc', { opacity: 1 });
        } else {
          // Core pulsing in
          gsap.fromTo('.cosmic-core',
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'power2.out'
            }
          );

          // Concentric rings expanding
          gsap.fromTo('.data-ring',
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              stagger: 0.15,
              ease: 'power2.out',
              delay: 0.4
            }
          );

          // Tech indicators fading in
          gsap.fromTo('.tech-indicator',
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: 'back.out(1.4)',
              delay: 0.8
            }
          );

          // TRL arc drawing
          if (trlArcRef.current) {
            const arcLength = trlArcRef.current.getTotalLength();
            gsap.fromTo(trlArcRef.current,
              {
                strokeDasharray: arcLength,
                strokeDashoffset: arcLength,
                opacity: 0
              },
              {
                strokeDashoffset: arcLength * 0.22, // 78% completion (TRL 7/9)
                opacity: 1,
                duration: 1.5,
                ease: 'power2.inOut',
                delay: 1
              }
            );
          }

          // Continuous scan beam rotation
          if (scanBeamRef.current) {
            gsap.to(scanBeamRef.current, {
              rotate: 360,
              duration: 4,
              repeat: -1,
              ease: 'none',
              transformOrigin: '200px 225px'
            });
          }

          // Core subtle pulse
          if (coreRef.current) {
            gsap.to(coreRef.current, {
              scale: 1.05,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }

          // Rings subtle breathing
          if (ringsRef.current) {
            gsap.to(ringsRef.current, {
              opacity: 0.8,
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }
        }
      } else {
        // Kill animations when not active
        gsap.killTweensOf([scanBeamRef.current, coreRef.current, ringsRef.current]);

        // Fade out
        gsap.to(['.cosmic-core', '.data-ring', '.tech-indicator', '.trl-arc'], {
          opacity: 0,
          duration: 0.5
        });
      }
    }, svgRef);

    return () => ctx?.revert();
  }, [isActive]);

  // Parallax effect
  useEffect(() => {
    if (!svgRef.current || !isActive || prefersReducedMotion.current) return;

    if (coreRef.current) {
      gsap.set(coreRef.current, {
        y: progress * 15,
        overwrite: 'auto'
      });
    }

    if (ringsRef.current) {
      gsap.set(ringsRef.current, {
        y: progress * 10,
        overwrite: 'auto'
      });
    }
  }, [progress, isActive]);

  // Tech capability data points (8 sectors)
  const techSectors = [
    { angle: 0, label: 'AI/ML', value: 0.9 },
    { angle: 45, label: 'Cloud', value: 0.85 },
    { angle: 90, label: 'Data', value: 0.75 },
    { angle: 135, label: 'API', value: 0.95 },
    { angle: 180, label: 'Mobile', value: 0.7 },
    { angle: 225, label: 'Security', value: 0.8 },
    { angle: 270, label: 'IoT', value: 0.65 },
    { angle: 315, label: 'DevOps', value: 0.88 }
  ];

  // Helper to calculate positions on circle
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const centerX = 200;
  const centerY = 225;

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg
        ref={svgRef}
        viewBox="0 0 400 450"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.2))' }}
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="core-glow">
            <stop offset="0%" stopColor="#20D8D2" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#39F2C3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#A88CFF" stopOpacity="0.1" />
          </radialGradient>

          <linearGradient id="trl-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#39F2C3" />
            <stop offset="50%" stopColor="#20D8D2" />
            <stop offset="100%" stopColor="#A88CFF" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="cosmic-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background grid for tech aesthetic */}
        <g opacity="0.03">
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 25}
              x2="400"
              y2={i * 25}
              stroke="#20D8D2"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 25}
              y1="0"
              x2={i * 25}
              y2="450"
              stroke="#20D8D2"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Concentric data rings */}
        <g ref={ringsRef}>
          {[60, 90, 120, 150].map((radius, i) => (
            <circle
              key={`ring-${i}`}
              className="data-ring"
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="#20D8D2"
              strokeWidth="1"
              strokeOpacity={0.2 - i * 0.03}
              strokeDasharray="4 6"
            />
          ))}
        </g>

        {/* Central core */}
        <g ref={coreRef}>
          {/* Outer glow */}
          <circle
            className="cosmic-core"
            cx={centerX}
            cy={centerY}
            r="45"
            fill="url(#core-glow)"
            opacity="0.4"
            filter="url(#cosmic-glow)"
          />

          {/* Inner hexagon core */}
          <polygon
            className="cosmic-core"
            points={`
              ${centerX},${centerY - 30}
              ${centerX + 26},${centerY - 15}
              ${centerX + 26},${centerY + 15}
              ${centerX},${centerY + 30}
              ${centerX - 26},${centerY + 15}
              ${centerX - 26},${centerY - 15}
            `}
            fill="#0B1020"
            stroke="#20D8D2"
            strokeWidth="2"
            filter="url(#cosmic-glow)"
          />

          {/* Core center dot */}
          <circle
            className="cosmic-core"
            cx={centerX}
            cy={centerY}
            r="8"
            fill="#20D8D2"
            opacity="0.9"
          />
        </g>

        {/* Tech capability indicators (clean bars on rings) */}
        {techSectors.map((sector, i) => {
          const innerPos = polarToCartesian(centerX, centerY, 65, sector.angle);
          const outerPos = polarToCartesian(centerX, centerY, 65 + (sector.value * 85), sector.angle);
          const labelPos = polarToCartesian(centerX, centerY, 162, sector.angle);

          return (
            <g key={`sector-${i}`} className="tech-indicator">
              {/* Capability bar */}
              <line
                x1={innerPos.x}
                y1={innerPos.y}
                x2={outerPos.x}
                y2={outerPos.y}
                stroke="#20D8D2"
                strokeWidth="2"
                strokeOpacity="0.6"
                filter="url(#cosmic-glow)"
              />

              {/* End node */}
              <circle
                cx={outerPos.x}
                cy={outerPos.y}
                r="3"
                fill="#39F2C3"
                opacity="0.9"
              />

              {/* Label (small, clean text) */}
              <text
                x={labelPos.x}
                y={labelPos.y}
                fill="#F5F6FF"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
                dominantBaseline="middle"
                opacity="0.7"
                letterSpacing="0.5"
              >
                {sector.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* TRL Progress Arc (top) */}
        <g>
          <path
            ref={trlArcRef}
            className="trl-arc"
            d={`M ${centerX - 100} 80 A 100 100 0 0 1 ${centerX + 100} 80`}
            fill="none"
            stroke="url(#trl-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#cosmic-glow)"
          />

          {/* TRL label */}
          <text
            x={centerX}
            y="60"
            fill="#F5F6FF"
            fontSize="10"
            fontFamily="monospace"
            textAnchor="middle"
            opacity="0.7"
            letterSpacing="1"
          >
            TRL 7/9
          </text>
        </g>

        {/* Scanning beam */}
        <line
          ref={scanBeamRef}
          x1={centerX}
          y1={centerY}
          x2={centerX}
          y2={centerY - 150}
          stroke="#20D8D2"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeLinecap="round"
        />

        {/* Tech profiling label at bottom */}
        <text
          x={centerX}
          y="420"
          fill="#F5F6FF"
          fontSize="11"
          fontFamily="monospace"
          textAnchor="middle"
          opacity="0.6"
          letterSpacing="2"
        >
          TECH STACK ANALYSIS
        </text>
      </svg>
    </div>
  );
}
