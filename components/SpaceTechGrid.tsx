/**
 * Space Tech Grid - Apple-esque Blueprint SVG Background
 *
 * Inspired by ReactorSVGBlueprint but adapted for hero section:
 * - Technical grid with registration marks
 * - Animated spacecraft particles (cyan, teal, purple)
 * - Floating data streams
 * - Minimal, premium aesthetic
 * - FundAid brand colors
 */

'use client';

import React from 'react';

interface SpaceTechGridProps {
  className?: string;
}

export function SpaceTechGrid({ className = '' }: SpaceTechGridProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-40"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Definitions */}
        <defs>
          {/* FundAid brand gradient for particles */}
          <linearGradient id="fundaid-particle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#39F2C3" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#20D8D2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A88CFF" stopOpacity="0.8" />
          </linearGradient>

          {/* Cyan glow for spacecraft particles */}
          <radialGradient id="cyan-glow">
            <stop offset="0%" stopColor="#39F2C3" stopOpacity="1">
              <animate attributeName="stopOpacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#20D8D2" stopOpacity="0.3">
              <animate attributeName="stopOpacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
            </stop>
          </radialGradient>

          {/* Purple glow for particles */}
          <radialGradient id="purple-glow">
            <stop offset="0%" stopColor="#A88CFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
          </radialGradient>

          {/* Soft blur for particles */}
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>

          {/* Sharp glow for technical elements */}
          <filter id="sharp-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>

        {/* BACKGROUND TECHNICAL GRID - Ultra subtle */}
        <g id="background-grid" opacity="0.08">
          {/* Vertical lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 100}
              y1="0"
              x2={i * 100}
              y2="1080"
              stroke="#39F2C3"
              strokeWidth="0.5"
            />
          ))}
          {/* Horizontal lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 100}
              x2="1920"
              y2={i * 100}
              stroke="#20D8D2"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* CORNER REGISTRATION MARKS - Blueprint style */}
        <g id="registration-marks" opacity="0.15">
          {/* Top-left */}
          <circle cx="60" cy="60" r="20" fill="none" stroke="#39F2C3" strokeWidth="1" />
          <circle cx="60" cy="60" r="15" fill="none" stroke="#20D8D2" strokeWidth="0.5" />
          <line x1="20" y1="60" x2="100" y2="60" stroke="#39F2C3" strokeWidth="1" />
          <line x1="60" y1="20" x2="60" y2="100" stroke="#39F2C3" strokeWidth="1" />

          {/* Top-right */}
          <circle cx="1860" cy="60" r="20" fill="none" stroke="#A88CFF" strokeWidth="1" />
          <circle cx="1860" cy="60" r="15" fill="none" stroke="#6366f1" strokeWidth="0.5" />
          <line x1="1820" y1="60" x2="1900" y2="60" stroke="#A88CFF" strokeWidth="1" />
          <line x1="1860" y1="20" x2="1860" y2="100" stroke="#A88CFF" strokeWidth="1" />

          {/* Bottom-left */}
          <circle cx="60" cy="1020" r="20" fill="none" stroke="#20D8D2" strokeWidth="1" />
          <circle cx="60" cy="1020" r="15" fill="none" stroke="#39F2C3" strokeWidth="0.5" />
          <line x1="20" y1="1020" x2="100" y2="1020" stroke="#20D8D2" strokeWidth="1" />
          <line x1="60" y1="980" x2="60" y2="1060" stroke="#20D8D2" strokeWidth="1" />

          {/* Bottom-right */}
          <circle cx="1860" cy="1020" r="20" fill="none" stroke="#6366f1" strokeWidth="1" />
          <circle cx="1860" cy="1020" r="15" fill="none" stroke="#A88CFF" strokeWidth="0.5" />
          <line x1="1820" y1="1020" x2="1900" y2="1020" stroke="#6366f1" strokeWidth="1" />
          <line x1="1860" y1="980" x2="1860" y2="1060" stroke="#6366f1" strokeWidth="1" />
        </g>

        {/* SPACECRAFT HEXAGONAL PARTICLES - Like alien drones */}
        <g id="spacecraft-particles">
          {/* Large spacecraft top-left - cyan */}
          <g transform="translate(300, 200)">
            <polygon
              points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15"
              fill="none"
              stroke="url(#fundaid-particle)"
              strokeWidth="1.5"
              filter="url(#sharp-glow)"
              opacity="0.6"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="40s"
                repeatCount="indefinite"
              />
            </polygon>
            <circle r="8" fill="url(#cyan-glow)" opacity="0.8" filter="url(#soft-glow)" />
          </g>

          {/* Medium spacecraft top-right - purple */}
          <g transform="translate(1600, 250)">
            <polygon
              points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10"
              fill="none"
              stroke="#A88CFF"
              strokeWidth="1"
              filter="url(#sharp-glow)"
              opacity="0.5"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360"
                to="0"
                dur="35s"
                repeatCount="indefinite"
              />
            </polygon>
            <circle r="6" fill="url(#purple-glow)" opacity="0.7" filter="url(#soft-glow)" />
          </g>

          {/* Small spacecraft middle-left - teal */}
          <g transform="translate(400, 600)">
            <polygon
              points="0,-15 13,-7.5 13,7.5 0,15 -13,7.5 -13,-7.5"
              fill="none"
              stroke="#20D8D2"
              strokeWidth="0.8"
              filter="url(#sharp-glow)"
              opacity="0.4"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="30s"
                repeatCount="indefinite"
              />
            </polygon>
            <circle r="4" fill="#20D8D2" opacity="0.6" filter="url(#soft-glow)" />
          </g>

          {/* Tiny spacecraft bottom-right - cyan */}
          <g transform="translate(1500, 850)">
            <polygon
              points="0,-10 8.7,-5 8.7,5 0,10 -8.7,5 -8.7,-5"
              fill="none"
              stroke="#39F2C3"
              strokeWidth="0.6"
              filter="url(#sharp-glow)"
              opacity="0.3"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360"
                to="0"
                dur="25s"
                repeatCount="indefinite"
              />
            </polygon>
            <circle r="3" fill="#39F2C3" opacity="0.5" filter="url(#soft-glow)" />
          </g>
        </g>

        {/* FLOATING DATA STREAM PARTICLES - Like flying through space */}
        <g id="data-streams">
          {/* Stream 1 - Diagonal flow */}
          <circle r="4" fill="#39F2C3" opacity="0.6" filter="url(#soft-glow)">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              path="M 0,0 L 1920,1080"
            />
          </circle>
          <circle r="4" fill="#20D8D2" opacity="0.5" filter="url(#soft-glow)">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              path="M 0,0 L 1920,1080"
              begin="5s"
            />
          </circle>
          <circle r="4" fill="#A88CFF" opacity="0.4" filter="url(#soft-glow)">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              path="M 0,0 L 1920,1080"
              begin="10s"
            />
          </circle>

          {/* Stream 2 - Horizontal flow */}
          <circle r="3" fill="#39F2C3" opacity="0.5" filter="url(#soft-glow)">
            <animateMotion
              dur="20s"
              repeatCount="indefinite"
              path="M 0,300 L 1920,300"
            />
          </circle>
          <circle r="3" fill="#20D8D2" opacity="0.4" filter="url(#soft-glow)">
            <animateMotion
              dur="20s"
              repeatCount="indefinite"
              path="M 0,500 L 1920,500"
              begin="7s"
            />
          </circle>

          {/* Stream 3 - Vertical flow */}
          <circle r="3" fill="#A88CFF" opacity="0.4" filter="url(#soft-glow)">
            <animateMotion
              dur="18s"
              repeatCount="indefinite"
              path="M 960,0 L 960,1080"
            />
          </circle>
          <circle r="3" fill="#6366f1" opacity="0.3" filter="url(#soft-glow)">
            <animateMotion
              dur="18s"
              repeatCount="indefinite"
              path="M 1200,0 L 1200,1080"
              begin="6s"
            />
          </circle>

          {/* Stream 4 - Curved path (bezier) */}
          <circle r="4" fill="url(#cyan-glow)" opacity="0.7" filter="url(#soft-glow)">
            <animateMotion
              dur="22s"
              repeatCount="indefinite"
              path="M 0,540 Q 960,200 1920,540"
            />
          </circle>
          <circle r="4" fill="url(#purple-glow)" opacity="0.6" filter="url(#soft-glow)">
            <animateMotion
              dur="22s"
              repeatCount="indefinite"
              path="M 1920,540 Q 960,880 0,540"
              begin="11s"
            />
          </circle>
        </g>

        {/* DIMENSION LINES - Technical annotations (very subtle) */}
        <g id="dimension-lines" opacity="0.06">
          <line x1="200" y1="1050" x2="800" y2="1050" stroke="#39F2C3" strokeWidth="0.5" strokeDasharray="4,4" />
          <text x="500" y="1040" fontSize="10" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" opacity="0.5">SECTOR-A</text>

          <line x1="1120" y1="1050" x2="1720" y2="1050" stroke="#A88CFF" strokeWidth="0.5" strokeDasharray="4,4" />
          <text x="1420" y="1040" fontSize="10" fill="#A88CFF" textAnchor="middle" fontFamily="monospace" opacity="0.5">SECTOR-B</text>
        </g>
      </svg>
    </div>
  );
}
