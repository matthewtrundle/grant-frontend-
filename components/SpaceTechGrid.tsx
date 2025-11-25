/**
 * Space Tech Grid - EPIC Hans Zimmer Agentic Reactor Blueprint
 *
 * Massive central reactor core with neural mesh network of agent nodes,
 * dramatic energy beams, orbital rings, and coordinated drone swarm aesthetic.
 * Sunset color palette (oranges, pinks, purples) + FundAid cyans.
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
        className="w-full h-full opacity-70"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Definitions */}
        <defs>
          {/* FundAid brand gradient */}
          <linearGradient id="fundaid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#39F2C3" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#20D8D2" stopOpacity="1" />
            <stop offset="100%" stopColor="#A88CFF" stopOpacity="0.9" />
          </linearGradient>

          {/* Sunset gradient - dramatic oranges/pinks */}
          <linearGradient id="sunset-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF8C42" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFA07A" stopOpacity="0.8" />
          </linearGradient>

          {/* Pink/Purple sunset gradient */}
          <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6BA8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#C77DFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A88CFF" stopOpacity="0.8" />
          </linearGradient>

          {/* Reactor core energy glow - pulsing cyan/purple */}
          <radialGradient id="reactor-core-glow">
            <stop offset="0%" stopColor="#39F2C3" stopOpacity="1">
              <animate attributeName="stopOpacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="40%" stopColor="#20D8D2" stopOpacity="0.7">
              <animate attributeName="stopOpacity" values="0.6;0.8;0.6" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#A88CFF" stopOpacity="0.3">
              <animate attributeName="stopOpacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
            </stop>
          </radialGradient>

          {/* Sunset glow - warm oranges */}
          <radialGradient id="sunset-glow">
            <stop offset="0%" stopColor="#FF8C42" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFA07A" stopOpacity="0.2" />
          </radialGradient>

          {/* Pink/purple glow */}
          <radialGradient id="pink-glow">
            <stop offset="0%" stopColor="#FF6BA8" stopOpacity="1">
              <animate attributeName="stopOpacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#C77DFF" stopOpacity="0.4">
              <animate attributeName="stopOpacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
            </stop>
          </radialGradient>

          {/* Dramatic glow filters */}
          <filter id="epic-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feFlood floodColor="#39F2C3" floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="colorBlur" />
            <feMerge>
              <feMergeNode in="colorBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>

          <filter id="sharp-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          <filter id="energy-beam-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
        </defs>

        {/* BACKGROUND TECHNICAL GRID - More visible for blueprint aesthetic */}
        <g id="background-grid" opacity="0.12">
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

        {/* CORNER REGISTRATION MARKS - Enhanced blueprint style */}
        <g id="registration-marks" opacity="0.2">
          {/* Top-left */}
          <circle cx="60" cy="60" r="25" fill="none" stroke="#39F2C3" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="18" fill="none" stroke="#20D8D2" strokeWidth="1" />
          <line x1="15" y1="60" x2="105" y2="60" stroke="#39F2C3" strokeWidth="1.5" />
          <line x1="60" y1="15" x2="60" y2="105" stroke="#39F2C3" strokeWidth="1.5" />

          {/* Top-right */}
          <circle cx="1860" cy="60" r="25" fill="none" stroke="#FF8C42" strokeWidth="1.5" />
          <circle cx="1860" cy="60" r="18" fill="none" stroke="#FF6B35" strokeWidth="1" />
          <line x1="1815" y1="60" x2="1905" y2="60" stroke="#FF8C42" strokeWidth="1.5" />
          <line x1="1860" y1="15" x2="1860" y2="105" stroke="#FF8C42" strokeWidth="1.5" />

          {/* Bottom-left */}
          <circle cx="60" cy="1020" r="25" fill="none" stroke="#20D8D2" strokeWidth="1.5" />
          <circle cx="60" cy="1020" r="18" fill="none" stroke="#39F2C3" strokeWidth="1" />
          <line x1="15" y1="1020" x2="105" y2="1020" stroke="#20D8D2" strokeWidth="1.5" />
          <line x1="60" y1="975" x2="60" y2="1065" stroke="#20D8D2" strokeWidth="1.5" />

          {/* Bottom-right */}
          <circle cx="1860" cy="1020" r="25" fill="none" stroke="#C77DFF" strokeWidth="1.5" />
          <circle cx="1860" cy="1020" r="18" fill="none" stroke="#A88CFF" strokeWidth="1" />
          <line x1="1815" y1="1020" x2="1905" y2="1020" stroke="#C77DFF" strokeWidth="1.5" />
          <line x1="1860" y1="975" x2="1860" y2="1065" stroke="#C77DFF" strokeWidth="1.5" />
        </g>

        {/* MASSIVE REACTOR CORE - Epic central command hub */}
        <g id="reactor-core" transform="translate(960, 540)">
          {/* Outer containment ring - massive scale */}
          <circle r="400" fill="none" stroke="url(#fundaid-gradient)" strokeWidth="3" opacity="0.25" filter="url(#epic-glow)">
            <animate attributeName="r" values="400;405;400" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.25;0.35;0.25" dur="5s" repeatCount="indefinite" />
          </circle>

          {/* Secondary energy ring - pulsing */}
          <circle r="320" fill="none" stroke="#39F2C3" strokeWidth="2.5" opacity="0.3" strokeDasharray="20,10" filter="url(#epic-glow)">
            <animate attributeName="r" values="320;325;320" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.45;0.3" dur="4s" repeatCount="indefinite" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="40s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Tertiary ring - sunset colors */}
          <circle r="250" fill="none" stroke="url(#sunset-gradient)" strokeWidth="2" opacity="0.35" strokeDasharray="15,8" filter="url(#soft-glow)">
            <animate attributeName="r" values="250;255;250" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0.5;0.35" dur="3.5s" repeatCount="indefinite" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360"
              to="0"
              dur="35s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Inner plasma ring - pink/purple */}
          <circle r="180" fill="none" stroke="url(#pink-gradient)" strokeWidth="3" opacity="0.4" strokeDasharray="12,6" filter="url(#epic-glow)">
            <animate attributeName="r" values="180;185;180" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.6;0.4" dur="3s" repeatCount="indefinite" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="30s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Core containment field */}
          <circle r="120" fill="none" stroke="#20D8D2" strokeWidth="4" opacity="0.5" strokeDasharray="8,4" filter="url(#epic-glow)">
            <animate attributeName="r" values="120;125;120" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.7;0.5" dur="2.5s" repeatCount="indefinite" />
          </circle>

          {/* Reactor singularity - massive glowing core */}
          <circle r="80" fill="url(#reactor-core-glow)" opacity="0.6" filter="url(#epic-glow)">
            <animate attributeName="r" values="80;90;80" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r="50" fill="url(#sunset-glow)" opacity="0.7" filter="url(#soft-glow)">
            <animate attributeName="r" values="50;55;50" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle r="25" fill="#39F2C3" opacity="0.9" filter="url(#soft-glow)">
            <animate attributeName="opacity" values="0.9;1;0.9" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ORBITAL RINGS - Rotating around reactor */}
        <g id="orbital-rings" transform="translate(960, 540)">
          {/* Outer orbital path with markers */}
          <circle r="350" fill="none" stroke="#39F2C3" strokeWidth="1" opacity="0.15" strokeDasharray="4,8" />
          <g opacity="0.6">
            <circle r="12" fill="url(#fundaid-gradient)" filter="url(#sharp-glow)">
              <animateMotion
                dur="30s"
                repeatCount="indefinite"
                path="M 350,0 A 350,350 0 1,1 -350,0 A 350,350 0 1,1 350,0"
              />
            </circle>
            <circle r="10" fill="#FF8C42" filter="url(#sharp-glow)">
              <animateMotion
                dur="30s"
                repeatCount="indefinite"
                path="M 350,0 A 350,350 0 1,1 -350,0 A 350,350 0 1,1 350,0"
                begin="10s"
              />
            </circle>
            <circle r="10" fill="#C77DFF" filter="url(#sharp-glow)">
              <animateMotion
                dur="30s"
                repeatCount="indefinite"
                path="M 350,0 A 350,350 0 1,1 -350,0 A 350,350 0 1,1 350,0"
                begin="20s"
              />
            </circle>
          </g>

          {/* Middle orbital path */}
          <circle r="280" fill="none" stroke="#20D8D2" strokeWidth="1" opacity="0.12" strokeDasharray="3,6" />
          <g opacity="0.5">
            <circle r="10" fill="#20D8D2" filter="url(#sharp-glow)">
              <animateMotion
                dur="25s"
                repeatCount="indefinite"
                path="M 280,0 A 280,280 0 1,0 -280,0 A 280,280 0 1,0 280,0"
              />
            </circle>
            <circle r="9" fill="#FF6BA8" filter="url(#sharp-glow)">
              <animateMotion
                dur="25s"
                repeatCount="indefinite"
                path="M 280,0 A 280,280 0 1,0 -280,0 A 280,280 0 1,0 280,0"
                begin="8s"
              />
            </circle>
            <circle r="9" fill="#A88CFF" filter="url(#sharp-glow)">
              <animateMotion
                dur="25s"
                repeatCount="indefinite"
                path="M 280,0 A 280,280 0 1,0 -280,0 A 280,280 0 1,0 280,0"
                begin="16s"
              />
            </circle>
          </g>

          {/* Inner orbital path - faster */}
          <circle r="220" fill="none" stroke="#A88CFF" strokeWidth="1" opacity="0.1" strokeDasharray="2,4" />
          <g opacity="0.4">
            <circle r="8" fill="#39F2C3" filter="url(#sharp-glow)">
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                path="M 220,0 A 220,220 0 1,1 -220,0 A 220,220 0 1,1 220,0"
              />
            </circle>
            <circle r="7" fill="#FF8C42" filter="url(#sharp-glow)">
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                path="M 220,0 A 220,220 0 1,1 -220,0 A 220,220 0 1,1 220,0"
                begin="6s"
              />
            </circle>
            <circle r="7" fill="#C77DFF" filter="url(#sharp-glow)">
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                path="M 220,0 A 220,220 0 1,1 -220,0 A 220,220 0 1,1 220,0"
                begin="12s"
              />
            </circle>
            <circle r="7" fill="#20D8D2" filter="url(#sharp-glow)">
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                path="M 220,0 A 220,220 0 1,1 -220,0 A 220,220 0 1,1 220,0"
                begin="18s"
              />
            </circle>
          </g>
        </g>

        {/* NEURAL MESH - Agent network nodes (12 nodes in coordinated formation) */}
        <g id="agent-mesh" opacity="0.35">
          {/* Agent Node A1 - Top-left quadrant */}
          <g transform="translate(450, 180)">
            <polygon points="0,-35 30,-17.5 30,17.5 0,35 -30,17.5 -30,-17.5" fill="none" stroke="#39F2C3" strokeWidth="2" filter="url(#sharp-glow)" />
            <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" fill="url(#fundaid-gradient)" opacity="0.3" />
            <circle r="8" fill="#39F2C3" opacity="0.8" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="-50" fontSize="12" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A1</text>
          </g>

          {/* Agent Node A2 - Top center-left */}
          <g transform="translate(650, 140)">
            <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16" fill="none" stroke="#20D8D2" strokeWidth="2" filter="url(#sharp-glow)" />
            <polygon points="0,-18 15,-9 15,9 0,18 -15,9 -15,-9" fill="#20D8D2" opacity="0.3" />
            <circle r="7" fill="#20D8D2" opacity="0.8" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="-48" fontSize="12" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A2</text>
          </g>

          {/* Agent Node A3 - Top center-right */}
          <g transform="translate(1270, 140)">
            <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16" fill="none" stroke="#FF8C42" strokeWidth="2" filter="url(#sharp-glow)" />
            <polygon points="0,-18 15,-9 15,9 0,18 -15,9 -15,-9" fill="url(#sunset-gradient)" opacity="0.3" />
            <circle r="7" fill="#FF8C42" opacity="0.8" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="-48" fontSize="12" fill="#FF8C42" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A3</text>
          </g>

          {/* Agent Node A4 - Top-right quadrant */}
          <g transform="translate(1470, 180)">
            <polygon points="0,-35 30,-17.5 30,17.5 0,35 -30,17.5 -30,-17.5" fill="none" stroke="#FF6BA8" strokeWidth="2" filter="url(#sharp-glow)" />
            <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" fill="url(#pink-gradient)" opacity="0.3" />
            <circle r="8" fill="#FF6BA8" opacity="0.8" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="-50" fontSize="12" fill="#FF6BA8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A4</text>
          </g>

          {/* Agent Node A5 - Middle-left */}
          <g transform="translate(280, 400)">
            <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" fill="none" stroke="#39F2C3" strokeWidth="1.8" filter="url(#sharp-glow)" />
            <polygon points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8" fill="#39F2C3" opacity="0.3" />
            <circle r="6" fill="#39F2C3" opacity="0.7" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="-45" fontSize="11" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A5</text>
          </g>

          {/* Agent Node A6 - Middle-right */}
          <g transform="translate(1640, 400)">
            <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" fill="none" stroke="#C77DFF" strokeWidth="1.8" filter="url(#sharp-glow)" />
            <polygon points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8" fill="#C77DFF" opacity="0.3" />
            <circle r="6" fill="#C77DFF" opacity="0.7" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="-45" fontSize="11" fill="#C77DFF" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A6</text>
          </g>

          {/* Agent Node A7 - Bottom-left quadrant */}
          <g transform="translate(450, 900)">
            <polygon points="0,-35 30,-17.5 30,17.5 0,35 -30,17.5 -30,-17.5" fill="none" stroke="#20D8D2" strokeWidth="2" filter="url(#sharp-glow)" />
            <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" fill="#20D8D2" opacity="0.3" />
            <circle r="8" fill="#20D8D2" opacity="0.8" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="60" fontSize="12" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A7</text>
          </g>

          {/* Agent Node A8 - Bottom center-left */}
          <g transform="translate(650, 940)">
            <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16" fill="none" stroke="#39F2C3" strokeWidth="2" filter="url(#sharp-glow)" />
            <polygon points="0,-18 15,-9 15,9 0,18 -15,9 -15,-9" fill="url(#fundaid-gradient)" opacity="0.3" />
            <circle r="7" fill="#39F2C3" opacity="0.8" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3.4s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="55" fontSize="12" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A8</text>
          </g>

          {/* Agent Node A9 - Bottom center-right */}
          <g transform="translate(1270, 940)">
            <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16" fill="none" stroke="#A88CFF" strokeWidth="2" filter="url(#sharp-glow)" />
            <polygon points="0,-18 15,-9 15,9 0,18 -15,9 -15,-9" fill="url(#pink-gradient)" opacity="0.3" />
            <circle r="7" fill="#A88CFF" opacity="0.8" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3.6s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="55" fontSize="12" fill="#A88CFF" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A9</text>
          </g>

          {/* Agent Node A10 - Bottom-right quadrant */}
          <g transform="translate(1470, 900)">
            <polygon points="0,-35 30,-17.5 30,17.5 0,35 -30,17.5 -30,-17.5" fill="none" stroke="#FF8C42" strokeWidth="2" filter="url(#sharp-glow)" />
            <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" fill="url(#sunset-gradient)" opacity="0.3" />
            <circle r="8" fill="#FF8C42" opacity="0.8" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3.8s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="60" fontSize="12" fill="#FF8C42" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A10</text>
          </g>

          {/* Agent Node A11 - Bottom middle-left */}
          <g transform="translate(280, 680)">
            <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" fill="none" stroke="#FF6BA8" strokeWidth="1.8" filter="url(#sharp-glow)" />
            <polygon points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8" fill="#FF6BA8" opacity="0.3" />
            <circle r="6" fill="#FF6BA8" opacity="0.7" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="50" fontSize="11" fill="#FF6BA8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A11</text>
          </g>

          {/* Agent Node A12 - Bottom middle-right */}
          <g transform="translate(1640, 680)">
            <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" fill="none" stroke="#20D8D2" strokeWidth="1.8" filter="url(#sharp-glow)" />
            <polygon points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8" fill="#20D8D2" opacity="0.3" />
            <circle r="6" fill="#20D8D2" opacity="0.7" filter="url(#soft-glow)">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4.2s" repeatCount="indefinite" />
            </circle>
            <text x="0" y="50" fontSize="11" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" fontWeight="bold">A12</text>
          </g>
        </g>

        {/* ENERGY BEAMS - Dramatic connections from reactor to all agent nodes */}
        <g id="energy-beams" opacity="0.25">
          {/* Reactor to A1 */}
          <line x1="960" y1="540" x2="450" y2="180" stroke="url(#fundaid-gradient)" strokeWidth="2" filter="url(#energy-beam-glow)" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
          </line>
          {/* Reactor to A2 */}
          <line x1="960" y1="540" x2="650" y2="140" stroke="#20D8D2" strokeWidth="1.8" filter="url(#energy-beam-glow)" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.2s" repeatCount="indefinite" />
          </line>
          {/* Reactor to A3 */}
          <line x1="960" y1="540" x2="1270" y2="140" stroke="url(#sunset-gradient)" strokeWidth="1.8" filter="url(#energy-beam-glow)" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.4s" repeatCount="indefinite" />
          </line>
          {/* Reactor to A4 */}
          <line x1="960" y1="540" x2="1470" y2="180" stroke="url(#pink-gradient)" strokeWidth="2" filter="url(#energy-beam-glow)" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.6s" repeatCount="indefinite" />
          </line>
          {/* Reactor to A5 */}
          <line x1="960" y1="540" x2="280" y2="400" stroke="#39F2C3" strokeWidth="1.6" filter="url(#energy-beam-glow)" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.8s" repeatCount="indefinite" />
          </line>
          {/* Reactor to A6 */}
          <line x1="960" y1="540" x2="1640" y2="400" stroke="#C77DFF" strokeWidth="1.6" filter="url(#energy-beam-glow)" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
          </line>
          {/* Reactor to A7 */}
          <line x1="960" y1="540" x2="450" y2="900" stroke="#20D8D2" strokeWidth="2" filter="url(#energy-beam-glow)" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" from="0" to="30" dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.2s" repeatCount="indefinite" />
          </line>
          {/* Reactor to A8 */}
          <line x1="960" y1="540" x2="650" y2="940" stroke="url(#fundaid-gradient)" strokeWidth="1.8" filter="url(#energy-beam-glow)" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" from="0" to="30" dur="3.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.4s" repeatCount="indefinite" />
          </line>
          {/* Reactor to A9 */}
          <line x1="960" y1="540" x2="1270" y2="940" stroke="url(#pink-gradient)" strokeWidth="1.8" filter="url(#energy-beam-glow)" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" from="0" to="30" dur="3.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.6s" repeatCount="indefinite" />
          </line>
          {/* Reactor to A10 */}
          <line x1="960" y1="540" x2="1470" y2="900" stroke="url(#sunset-gradient)" strokeWidth="2" filter="url(#energy-beam-glow)" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" from="0" to="30" dur="3.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.8s" repeatCount="indefinite" />
          </line>
          {/* Reactor to A11 */}
          <line x1="960" y1="540" x2="280" y2="680" stroke="#FF6BA8" strokeWidth="1.6" filter="url(#energy-beam-glow)" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
          </line>
          {/* Reactor to A12 */}
          <line x1="960" y1="540" x2="1640" y2="680" stroke="#20D8D2" strokeWidth="1.6" filter="url(#energy-beam-glow)" strokeDasharray="8,4">
            <animate attributeName="stroke-dashoffset" from="0" to="24" dur="4.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4.2s" repeatCount="indefinite" />
          </line>
        </g>

        {/* INTER-NODE CONNECTIONS - Neural network mesh */}
        <g id="mesh-connections" opacity="0.15">
          {/* Top horizontal connections */}
          <path d="M 450,180 L 650,140" stroke="#39F2C3" strokeWidth="1" strokeDasharray="3,3" filter="url(#sharp-glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M 650,140 L 1270,140" stroke="#20D8D2" strokeWidth="1" strokeDasharray="3,3" filter="url(#sharp-glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="2.5s" repeatCount="indefinite" />
          </path>
          <path d="M 1270,140 L 1470,180" stroke="#FF8C42" strokeWidth="1" strokeDasharray="3,3" filter="url(#sharp-glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="3s" repeatCount="indefinite" />
          </path>

          {/* Bottom horizontal connections */}
          <path d="M 450,900 L 650,940" stroke="#20D8D2" strokeWidth="1" strokeDasharray="3,3" filter="url(#sharp-glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="2.2s" repeatCount="indefinite" />
          </path>
          <path d="M 650,940 L 1270,940" stroke="#39F2C3" strokeWidth="1" strokeDasharray="3,3" filter="url(#sharp-glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="2.7s" repeatCount="indefinite" />
          </path>
          <path d="M 1270,940 L 1470,900" stroke="#FF8C42" strokeWidth="1" strokeDasharray="3,3" filter="url(#sharp-glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="3.2s" repeatCount="indefinite" />
          </path>

          {/* Vertical side connections */}
          <path d="M 280,400 L 280,680" stroke="#39F2C3" strokeWidth="1" strokeDasharray="3,3" filter="url(#sharp-glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="2.8s" repeatCount="indefinite" />
          </path>
          <path d="M 1640,400 L 1640,680" stroke="#C77DFF" strokeWidth="1" strokeDasharray="3,3" filter="url(#sharp-glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="3.5s" repeatCount="indefinite" />
          </path>

          {/* Diagonal cross-mesh connections */}
          <path d="M 450,180 Q 800,350 1270,940" stroke="#A88CFF" strokeWidth="0.8" strokeDasharray="2,4" opacity="0.5" filter="url(#sharp-glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="4s" repeatCount="indefinite" />
          </path>
          <path d="M 1470,180 Q 1100,350 650,940" stroke="#FF6BA8" strokeWidth="0.8" strokeDasharray="2,4" opacity="0.5" filter="url(#sharp-glow)">
            <animate attributeName="stroke-dashoffset" from="0" to="12" dur="4.5s" repeatCount="indefinite" />
          </path>
        </g>

        {/* DATA FLOW PARTICLES - Flowing between nodes */}
        <g id="data-particles">
          {/* Particles along energy beams */}
          <circle r="5" fill="#39F2C3" opacity="0.8" filter="url(#soft-glow)">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path="M 960,540 L 450,180"
            />
          </circle>
          <circle r="5" fill="#FF8C42" opacity="0.8" filter="url(#soft-glow)">
            <animateMotion
              dur="3.5s"
              repeatCount="indefinite"
              path="M 960,540 L 1470,180"
            />
          </circle>
          <circle r="5" fill="#20D8D2" opacity="0.8" filter="url(#soft-glow)">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M 960,540 L 450,900"
            />
          </circle>
          <circle r="5" fill="#C77DFF" opacity="0.8" filter="url(#soft-glow)">
            <animateMotion
              dur="4.5s"
              repeatCount="indefinite"
              path="M 960,540 L 1470,900"
            />
          </circle>

          {/* Additional ambient particles */}
          <circle r="4" fill="#FF6BA8" opacity="0.6" filter="url(#soft-glow)">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              path="M 0,0 L 1920,1080"
            />
          </circle>
          <circle r="4" fill="#39F2C3" opacity="0.6" filter="url(#soft-glow)">
            <animateMotion
              dur="18s"
              repeatCount="indefinite"
              path="M 1920,0 L 0,1080"
              begin="5s"
            />
          </circle>
          <circle r="4" fill="#FF8C42" opacity="0.6" filter="url(#soft-glow)">
            <animateMotion
              dur="20s"
              repeatCount="indefinite"
              path="M 960,0 L 960,1080"
            />
          </circle>
        </g>

        {/* DIMENSION ANNOTATIONS - Technical blueprint labels */}
        <g id="annotations" opacity="0.12">
          <line x1="150" y1="1050" x2="750" y2="1050" stroke="#39F2C3" strokeWidth="0.8" strokeDasharray="4,4" />
          <text x="450" y="1040" fontSize="10" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="600">NEURAL-MESH-ALPHA</text>

          <line x1="1170" y1="1050" x2="1770" y2="1050" stroke="#FF8C42" strokeWidth="0.8" strokeDasharray="4,4" />
          <text x="1470" y="1040" fontSize="10" fill="#FF8C42" textAnchor="middle" fontFamily="monospace" fontWeight="600">NEURAL-MESH-OMEGA</text>

          <line x1="120" y1="60" x2="250" y2="60" stroke="#20D8D2" strokeWidth="0.6" />
          <text x="185" y="80" fontSize="9" fill="#20D8D2" textAnchor="middle" fontFamily="monospace">SECTOR-01</text>

          <line x1="1670" y1="60" x2="1800" y2="60" stroke="#C77DFF" strokeWidth="0.6" />
          <text x="1735" y="80" fontSize="9" fill="#C77DFF" textAnchor="middle" fontFamily="monospace">SECTOR-04</text>
        </g>

        {/* MASSIVE ALIEN DRONE SPACECRAFT - Epic hexagonal vessels */}
        <g id="alien-spacecraft">
          {/* Command Drone 1 - Top-left - Massive scale */}
          <g transform="translate(200, 250)" opacity="0.6">
            <polygon
              points="0,-55 48,-27.5 48,27.5 0,55 -48,27.5 -48,-27.5"
              fill="none"
              stroke="url(#fundaid-gradient)"
              strokeWidth="2.5"
              filter="url(#epic-glow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="50s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon
              points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
              fill="none"
              stroke="#39F2C3"
              strokeWidth="1.5"
              filter="url(#sharp-glow)"
              opacity="0.7"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360"
                to="0"
                dur="40s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon
              points="0,-25 22,-12.5 22,12.5 0,25 -22,12.5 -22,-12.5"
              fill="url(#reactor-core-glow)"
              opacity="0.4"
            />
            <circle r="15" fill="url(#cyan-glow)" opacity="0.9" filter="url(#epic-glow)">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Command Drone 2 - Top-right - Sunset colors */}
          <g transform="translate(1720, 250)" opacity="0.6">
            <polygon
              points="0,-55 48,-27.5 48,27.5 0,55 -48,27.5 -48,-27.5"
              fill="none"
              stroke="url(#sunset-gradient)"
              strokeWidth="2.5"
              filter="url(#epic-glow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360"
                to="0"
                dur="55s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon
              points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
              fill="none"
              stroke="#FF8C42"
              strokeWidth="1.5"
              filter="url(#sharp-glow)"
              opacity="0.7"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="45s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon
              points="0,-25 22,-12.5 22,12.5 0,25 -22,12.5 -22,-12.5"
              fill="url(#sunset-glow)"
              opacity="0.4"
            />
            <circle r="15" fill="url(#sunset-glow)" opacity="0.9" filter="url(#epic-glow)">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.3s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Command Drone 3 - Bottom-left - Pink/purple */}
          <g transform="translate(200, 830)" opacity="0.6">
            <polygon
              points="0,-55 48,-27.5 48,27.5 0,55 -48,27.5 -48,-27.5"
              fill="none"
              stroke="url(#pink-gradient)"
              strokeWidth="2.5"
              filter="url(#epic-glow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="48s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon
              points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
              fill="none"
              stroke="#FF6BA8"
              strokeWidth="1.5"
              filter="url(#sharp-glow)"
              opacity="0.7"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360"
                to="0"
                dur="38s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon
              points="0,-25 22,-12.5 22,12.5 0,25 -22,12.5 -22,-12.5"
              fill="url(#pink-glow)"
              opacity="0.4"
            />
            <circle r="15" fill="url(#pink-glow)" opacity="0.9" filter="url(#epic-glow)">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Command Drone 4 - Bottom-right - Cyan/teal */}
          <g transform="translate(1720, 830)" opacity="0.6">
            <polygon
              points="0,-55 48,-27.5 48,27.5 0,55 -48,27.5 -48,-27.5"
              fill="none"
              stroke="#20D8D2"
              strokeWidth="2.5"
              filter="url(#epic-glow)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360"
                to="0"
                dur="52s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon
              points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
              fill="none"
              stroke="url(#fundaid-gradient)"
              strokeWidth="1.5"
              filter="url(#sharp-glow)"
              opacity="0.7"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="42s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon
              points="0,-25 22,-12.5 22,12.5 0,25 -22,12.5 -22,-12.5"
              fill="#20D8D2"
              opacity="0.4"
            />
            <circle r="15" fill="#20D8D2" opacity="0.9" filter="url(#epic-glow)">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.7s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  );
}
