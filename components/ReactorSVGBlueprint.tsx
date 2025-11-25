/**
 * Blueprint/Diagram Reactor - SVG Version (Metallic)
 *
 * A minimalist metallic schematic version featuring:
 * - 5 horizontal hexagonal agent nodes with metallic strokes
 * - Clean connecting rails in brushed metal aesthetic
 * - Industrial gray color palette (steel, chrome, dark metal)
 * - Blueprint/technical diagram aesthetic with metallic finish
 * - Performance-optimized (minimal filters)
 *
 * Metallic colors: Steel Gray (#A8B2C0), Chrome (#D0D8E0), Dark Metal (#606872)
 */

'use client';

import React from 'react';

interface ReactorSVGBlueprintProps {
  className?: string;
  animate?: boolean;
}

export function ReactorSVGBlueprint({ className = '', animate = true }: ReactorSVGBlueprintProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <svg
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Definitions: Metallic gradients for blueprint aesthetic */}
        <defs>
          {/* Steel gray stroke gradient */}
          <linearGradient id="blueprint-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#808895" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#B0B8C5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#808895" stopOpacity="0.5" />
          </linearGradient>

          {/* Brushed metal stroke */}
          <linearGradient id="blueprint-brushed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A0A8B5" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#C0C8D5" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#A0A8B5" stopOpacity="0.4" />
          </linearGradient>

          {/* Simple glow for nodes */}
          <filter id="blueprint-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          {/* Red-hot metallic gradient for approaching particles */}
          <radialGradient id="red-hot-metal">
            <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.95">
              <animate attributeName="stopColor" values="#D8E0E8;#FF8A80;#FF6B6B;#FF8A80;#D8E0E8" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#C8D0DC" stopOpacity="0.6">
              <animate attributeName="stopColor" values="#C8D0DC;#FFB4B0;#FFA8A0;#FFB4B0;#C8D0DC" dur="2s" repeatCount="indefinite" />
            </stop>
          </radialGradient>
        </defs>

        {/* BACKGROUND GRID - Metallic tech pattern */}
        <g id="background-grid" opacity="0.15">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={100 + i * 90}
              y1="50"
              x2={100 + i * 90}
              y2="350"
              stroke="#A8B2C0"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="100"
              y1={50 + i * 50}
              x2="1100"
              y2={50 + i * 50}
              stroke="#A8B2C0"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* CORNER REGISTRATION MARKS - Classic blueprint framing */}
        <g id="registration-marks" opacity="0.6">
          {/* Top-left corner */}
          <line x1="30" y1="30" x2="70" y2="30" stroke="#B0B8C5" strokeWidth="1.5" />
          <line x1="50" y1="10" x2="50" y2="50" stroke="#B0B8C5" strokeWidth="1.5" />
          <circle cx="50" cy="30" r="3" fill="none" stroke="#B0B8C5" strokeWidth="1" />

          {/* Top-right corner */}
          <line x1="1130" y1="30" x2="1170" y2="30" stroke="#B0B8C5" strokeWidth="1.5" />
          <line x1="1150" y1="10" x2="1150" y2="50" stroke="#B0B8C5" strokeWidth="1.5" />
          <circle cx="1150" cy="30" r="3" fill="none" stroke="#B0B8C5" strokeWidth="1" />

          {/* Bottom-left corner */}
          <line x1="30" y1="370" x2="70" y2="370" stroke="#B0B8C5" strokeWidth="1.5" />
          <line x1="50" y1="350" x2="50" y2="390" stroke="#B0B8C5" strokeWidth="1.5" />
          <circle cx="50" cy="370" r="3" fill="none" stroke="#B0B8C5" strokeWidth="1" />

          {/* Bottom-right corner */}
          <line x1="1130" y1="370" x2="1170" y2="370" stroke="#B0B8C5" strokeWidth="1.5" />
          <line x1="1150" y1="350" x2="1150" y2="390" stroke="#B0B8C5" strokeWidth="1.5" />
          <circle cx="1150" cy="370" r="3" fill="none" stroke="#B0B8C5" strokeWidth="1" />
        </g>

        {/* DATA RAILS - Clean double lines */}
        <g id="data-rails">
          {/* Upper rail */}
          <line
            x1="100"
            y1="160"
            x2="1100"
            y2="160"
            stroke="url(#blueprint-stroke)"
            strokeWidth="1.5"
            strokeDasharray="6,3"
            className={animate ? 'animate-blueprint-pulse' : ''}
          />

          {/* Lower rail */}
          <line
            x1="100"
            y1="240"
            x2="1100"
            y2="240"
            stroke="url(#blueprint-stroke)"
            strokeWidth="1.5"
            strokeDasharray="6,3"
            className={animate ? 'animate-blueprint-pulse' : ''}
            style={{ animationDelay: '0.4s' }}
          />

          {/* Central data spine - brushed metal */}
          <line
            x1="100"
            y1="200"
            x2="1100"
            y2="200"
            stroke="url(#blueprint-brushed)"
            strokeWidth="1"
            strokeDasharray="2,2"
            opacity="0.6"
          />

          {/* Connection indicators at each node */}
          {[150, 350, 600, 850, 1050].map((x, i) => (
            <g key={`connection-${i}`}>
              <line x1={x} y1="160" x2={x} y2="180" stroke="#B0B8C5" strokeWidth="1" opacity="0.7" />
              <line x1={x} y1="220" x2={x} y2="240" stroke="#B0B8C5" strokeWidth="1" opacity="0.7" />
            </g>
          ))}
        </g>

        {/* DIMENSION LINES - Technical measurement indicators */}
        <g id="dimension-lines" opacity="0.5">
          {/* Dimension between Node 1 and Node 2 */}
          <g>
            <line x1="150" y1="280" x2="350" y2="280" stroke="#98A0B0" strokeWidth="1" strokeDasharray="3,3" />
            {/* Arrows */}
            <polygon points="150,280 158,277 158,283" fill="#98A0B0" />
            <polygon points="350,280 342,277 342,283" fill="#98A0B0" />
            {/* Extension lines */}
            <line x1="150" y1="250" x2="150" y2="285" stroke="#98A0B0" strokeWidth="0.5" />
            <line x1="350" y1="250" x2="350" y2="285" stroke="#98A0B0" strokeWidth="0.5" />
            <text x="250" y="275" fontSize="10" fill="#A8B0C0" textAnchor="middle" fontFamily="monospace">200px</text>
          </g>

          {/* Dimension between Node 2 and Node 3 */}
          <g>
            <line x1="350" y1="290" x2="600" y2="290" stroke="#98A0B0" strokeWidth="1" strokeDasharray="3,3" />
            <polygon points="350,290 358,287 358,293" fill="#98A0B0" />
            <polygon points="600,290 592,287 592,293" fill="#98A0B0" />
            <line x1="350" y1="260" x2="350" y2="295" stroke="#98A0B0" strokeWidth="0.5" />
            <line x1="600" y1="260" x2="600" y2="295" stroke="#98A0B0" strokeWidth="0.5" />
            <text x="475" y="305" fontSize="10" fill="#A8B0C0" textAnchor="middle" fontFamily="monospace">250px</text>
          </g>

          {/* Dimension between Node 3 and Node 4 */}
          <g>
            <line x1="600" y1="290" x2="850" y2="290" stroke="#98A0B0" strokeWidth="1" strokeDasharray="3,3" />
            <polygon points="600,290 608,287 608,293" fill="#98A0B0" />
            <polygon points="850,290 842,287 842,293" fill="#98A0B0" />
            <line x1="600" y1="260" x2="600" y2="295" stroke="#98A0B0" strokeWidth="0.5" />
            <line x1="850" y1="260" x2="850" y2="295" stroke="#98A0B0" strokeWidth="0.5" />
            <text x="725" y="305" fontSize="10" fill="#A8B0C0" textAnchor="middle" fontFamily="monospace">250px</text>
          </g>

          {/* Dimension between Node 4 and Node 5 */}
          <g>
            <line x1="850" y1="280" x2="1050" y2="280" stroke="#98A0B0" strokeWidth="1" strokeDasharray="3,3" />
            <polygon points="850,280 858,277 858,283" fill="#98A0B0" />
            <polygon points="1050,280 1042,277 1042,283" fill="#98A0B0" />
            <line x1="850" y1="250" x2="850" y2="285" stroke="#98A0B0" strokeWidth="0.5" />
            <line x1="1050" y1="250" x2="1050" y2="285" stroke="#98A0B0" strokeWidth="0.5" />
            <text x="950" y="275" fontSize="10" fill="#A8B0C0" textAnchor="middle" fontFamily="monospace">200px</text>
          </g>
        </g>

        {/* TECHNICAL ANNOTATIONS - Node labels with leader lines */}
        <g id="technical-annotations" opacity="0.7">
          {/* Agent Node 1 Label */}
          <g>
            <line x1="150" y1="130" x2="150" y2="150" stroke="#A8B0C0" strokeWidth="0.5" />
            <line x1="150" y1="130" x2="120" y2="110" stroke="#A8B0C0" strokeWidth="0.5" />
            <line x1="80" y1="110" x2="120" y2="110" stroke="#A8B0C0" strokeWidth="0.5" />
            <text x="75" y="108" fontSize="11" fill="#B0B8C5" textAnchor="end" fontFamily="monospace" fontWeight="500">AGENT-01</text>
            <text x="75" y="120" fontSize="8" fill="#98A0B0" textAnchor="end" fontFamily="monospace">DISCOVERY</text>
          </g>

          {/* Agent Node 2 Label */}
          <g>
            <line x1="350" y1="130" x2="350" y2="150" stroke="#A8B0C0" strokeWidth="0.5" />
            <line x1="350" y1="130" x2="320" y2="110" stroke="#A8B0C0" strokeWidth="0.5" />
            <line x1="280" y1="110" x2="320" y2="110" stroke="#A8B0C0" strokeWidth="0.5" />
            <text x="275" y="108" fontSize="11" fill="#B0B8C5" textAnchor="end" fontFamily="monospace" fontWeight="500">AGENT-02</text>
            <text x="275" y="120" fontSize="8" fill="#98A0B0" textAnchor="end" fontFamily="monospace">ANALYSIS</text>
          </g>

          {/* Agent Node 3 Label (Central - larger) */}
          <g>
            <line x1="600" y1="110" x2="600" y2="135" stroke="#A8B0C0" strokeWidth="0.5" />
            <line x1="600" y1="110" x2="560" y2="85" stroke="#A8B0C0" strokeWidth="0.5" />
            <line x1="500" y1="85" x2="560" y2="85" stroke="#A8B0C0" strokeWidth="0.5" />
            <text x="495" y="83" fontSize="12" fill="#C0C8D5" textAnchor="end" fontFamily="monospace" fontWeight="600">CORE-REACTOR</text>
            <text x="495" y="96" fontSize="8" fill="#A8B0C0" textAnchor="end" fontFamily="monospace">COORDINATION HUB</text>
          </g>

          {/* Agent Node 4 Label */}
          <g>
            <line x1="850" y1="130" x2="850" y2="150" stroke="#A8B0C0" strokeWidth="0.5" />
            <line x1="850" y1="130" x2="880" y2="110" stroke="#A8B0C0" strokeWidth="0.5" />
            <line x1="880" y1="110" x2="920" y2="110" stroke="#A8B0C0" strokeWidth="0.5" />
            <text x="925" y="108" fontSize="11" fill="#B0B8C5" textAnchor="start" fontFamily="monospace" fontWeight="500">AGENT-03</text>
            <text x="925" y="120" fontSize="8" fill="#98A0B0" textAnchor="start" fontFamily="monospace">RANKING</text>
          </g>

          {/* Agent Node 5 Label */}
          <g>
            <line x1="1050" y1="130" x2="1050" y2="150" stroke="#A8B0C0" strokeWidth="0.5" />
            <line x1="1050" y1="130" x2="1080" y2="110" stroke="#A8B0C0" strokeWidth="0.5" />
            <line x1="1080" y1="110" x2="1120" y2="110" stroke="#A8B0C0" strokeWidth="0.5" />
            <text x="1125" y="108" fontSize="11" fill="#B0B8C5" textAnchor="start" fontFamily="monospace" fontWeight="500">AGENT-04</text>
            <text x="1125" y="120" fontSize="8" fill="#98A0B0" textAnchor="start" fontFamily="monospace">OUTPUT</text>
          </g>
        </g>

        {/* AGENT NODE 1 - Hexagonal metallic blueprint style */}
        <g id="agent-node-1" transform="translate(150, 200)" className={animate ? 'animate-blueprint-glow' : ''}>
          {/* Outer hexagon - steel gray */}
          <polygon
            points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
            fill="none"
            stroke="#B0B8C5"
            strokeWidth="1.5"
            opacity="0.75"
          />

          {/* Inner hexagon - brushed metal */}
          <polygon
            points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14"
            fill="none"
            stroke="#98A0B0"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Center circle - chrome */}
          <circle r="10" fill="none" stroke="#C0C8D5" strokeWidth="1.5" />
          <circle r="4" fill="#D0D8E0" opacity="0.9" filter="url(#blueprint-glow)" />

          {/* Corner markers - dark metal */}
          <circle cx="0" cy="-40" r="3" fill="none" stroke="#808895" strokeWidth="1" opacity="0.7" />
          <circle cx="35" cy="-20" r="3" fill="none" stroke="#808895" strokeWidth="1" opacity="0.7" />
        </g>

        {/* AGENT NODE 2 */}
        <g id="agent-node-2" transform="translate(350, 200)" className={animate ? 'animate-blueprint-glow' : ''} style={{ animationDelay: '0.25s' }}>
          <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" fill="none" stroke="#B0B8C5" strokeWidth="1.5" opacity="0.75" />
          <polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14" fill="none" stroke="#98A0B0" strokeWidth="1" opacity="0.6" />
          <circle r="10" fill="none" stroke="#C0C8D5" strokeWidth="1.5" />
          <circle r="4" fill="#D0D8E0" opacity="0.9" filter="url(#blueprint-glow)" />
          <circle cx="0" cy="-40" r="3" fill="none" stroke="#808895" strokeWidth="1" opacity="0.7" />
          <circle cx="-35" cy="20" r="3" fill="none" stroke="#808895" strokeWidth="1" opacity="0.7" />
        </g>

        {/* AGENT NODE 3 - Central (larger, more detailed) */}
        <g id="agent-node-3" transform="translate(600, 200)" className={animate ? 'animate-blueprint-glow' : ''} style={{ animationDelay: '0.5s' }}>
          {/* Larger outer hexagon - bright steel */}
          <polygon
            points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25"
            fill="none"
            stroke="#C0C8D5"
            strokeWidth="2"
            opacity="0.85"
          />

          <polygon
            points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
            fill="none"
            stroke="#A8B0C0"
            strokeWidth="1.5"
            opacity="0.7"
          />

          <polygon
            points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14"
            fill="none"
            stroke="#98A0B0"
            strokeWidth="1"
            opacity="0.5"
          />

          <circle r="15" fill="none" stroke="#D0D8E0" strokeWidth="2" />
          <circle r="8" fill="#E0E5EA" opacity="1" filter="url(#blueprint-glow)" />

          {/* All corner markers for central node - dark metal */}
          {[
            [0, -50],
            [43, -25],
            [43, 25],
            [0, 50],
            [-43, 25],
            [-43, -25],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="none" stroke="#808895" strokeWidth="1" opacity="0.75" />
          ))}

          {/* Accent ring - brushed metal */}
          <circle r="60" fill="none" stroke="#A0A8B5" strokeWidth="0.5" opacity="0.4" strokeDasharray="3,6" />
        </g>

        {/* AGENT NODE 4 */}
        <g id="agent-node-4" transform="translate(850, 200)" className={animate ? 'animate-blueprint-glow' : ''} style={{ animationDelay: '0.75s' }}>
          <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" fill="none" stroke="#B0B8C5" strokeWidth="1.5" opacity="0.75" />
          <polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14" fill="none" stroke="#98A0B0" strokeWidth="1" opacity="0.6" />
          <circle r="10" fill="none" stroke="#C0C8D5" strokeWidth="1.5" />
          <circle r="4" fill="#D0D8E0" opacity="0.9" filter="url(#blueprint-glow)" />
          <circle cx="35" cy="20" r="3" fill="none" stroke="#808895" strokeWidth="1" opacity="0.7" />
          <circle cx="0" cy="40" r="3" fill="none" stroke="#808895" strokeWidth="1" opacity="0.7" />
        </g>

        {/* AGENT NODE 5 */}
        <g id="agent-node-5" transform="translate(1050, 200)" className={animate ? 'animate-blueprint-glow' : ''} style={{ animationDelay: '1s' }}>
          <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" fill="none" stroke="#B0B8C5" strokeWidth="1.5" opacity="0.75" />
          <polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14" fill="none" stroke="#98A0B0" strokeWidth="1" opacity="0.6" />
          <circle r="10" fill="none" stroke="#C0C8D5" strokeWidth="1.5" />
          <circle r="4" fill="#D0D8E0" opacity="0.9" filter="url(#blueprint-glow)" />
          <circle cx="-35" cy="-20" r="3" fill="none" stroke="#808895" strokeWidth="1" opacity="0.7" />
          <circle cx="0" cy="40" r="3" fill="none" stroke="#808895" strokeWidth="1" opacity="0.7" />
        </g>

        {/* ENHANCED DATA PELLETS - Flow from rails to grant cards */}
        {animate && (
          <g id="data-pellets">
            {/* Base horizontal flow particles (more particles on rails) */}
            <circle r="3" fill="#D8E0E8" opacity="0.8" filter="url(#blueprint-glow)">
              <animateMotion dur="8s" repeatCount="indefinite" path="M 100,160 L 1100,160" />
            </circle>
            <circle r="3" fill="#B0B8C5" opacity="0.75" filter="url(#blueprint-glow)">
              <animateMotion dur="8s" repeatCount="indefinite" path="M 100,160 L 1100,160" begin="2s" />
            </circle>
            <circle r="3" fill="#A0A8B5" opacity="0.8" filter="url(#blueprint-glow)">
              <animateMotion dur="9s" repeatCount="indefinite" path="M 100,240 L 1100,240" />
            </circle>
            <circle r="3" fill="#C8D0DC" opacity="0.75" filter="url(#blueprint-glow)">
              <animateMotion dur="9s" repeatCount="indefinite" path="M 100,240 L 1100,240" begin="3s" />
            </circle>

            {/* Card 1 - NIH R01 (top: 8%, right: 3%) → Magnetic pull with dramatic curve */}
            <circle r="5" fill="url(#red-hot-metal)" opacity="0.98" filter="url(#blueprint-glow)" className="particle-magnetic">
              <animateMotion dur="6s" repeatCount="indefinite" path="M 100,160 L 700,160 Q 950,30 1164,32" />
            </circle>
            <circle r="5" fill="url(#red-hot-metal)" opacity="0.95" filter="url(#blueprint-glow)" className="particle-magnetic">
              <animateMotion dur="6s" repeatCount="indefinite" path="M 100,160 L 700,160 Q 950,30 1164,32" begin="2s" />
            </circle>

            {/* Card 2 - DARPA (top: 35%, right: 2%) → Strong magnetic attraction */}
            <circle r="5" fill="url(#red-hot-metal)" opacity="0.98" filter="url(#blueprint-glow)" className="particle-magnetic">
              <animateMotion dur="5.5s" repeatCount="indefinite" path="M 100,160 L 800,160 Q 1050,140 1176,140" />
            </circle>
            <circle r="5" fill="url(#red-hot-metal)" opacity="0.95" filter="url(#blueprint-glow)" className="particle-magnetic">
              <animateMotion dur="5.5s" repeatCount="indefinite" path="M 100,160 L 800,160 Q 1050,140 1176,140" begin="1.8s" />
            </circle>

            {/* Card 3 - NSF STTR (top: 65%, right: 5%) → Aggressive downward pull */}
            <circle r="5" fill="url(#red-hot-metal)" opacity="0.98" filter="url(#blueprint-glow)" className="particle-magnetic">
              <animateMotion dur="5.5s" repeatCount="indefinite" path="M 100,240 L 750,240 Q 980,260 1140,260" />
            </circle>
            <circle r="5" fill="url(#red-hot-metal)" opacity="0.95" filter="url(#blueprint-glow)" className="particle-magnetic">
              <animateMotion dur="5.5s" repeatCount="indefinite" path="M 100,240 L 750,240 Q 980,260 1140,260" begin="2s" />
            </circle>

            {/* Card 4 - DOE Innovation (top: 12%, right: 28%) → Sharp upward magnetic pull */}
            <circle r="5" fill="url(#red-hot-metal)" opacity="0.98" filter="url(#blueprint-glow)" className="particle-magnetic">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 100,160 L 550,160 Q 720,60 864,48" />
            </circle>
            <circle r="5" fill="url(#red-hot-metal)" opacity="0.95" filter="url(#blueprint-glow)" className="particle-magnetic">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 100,160 L 550,160 Q 720,60 864,48" begin="1.6s" />
            </circle>

            {/* Card 5 - NASA SBIR (top: 75%, right: 32%) → Extreme downward magnetic pull */}
            <circle r="5" fill="url(#red-hot-metal)" opacity="0.98" filter="url(#blueprint-glow)" className="particle-magnetic">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 100,240 L 520,240 Q 680,290 816,300" />
            </circle>
            <circle r="5" fill="url(#red-hot-metal)" opacity="0.95" filter="url(#blueprint-glow)" className="particle-magnetic">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 100,240 L 520,240 Q 680,290 816,300" begin="1.7s" />
            </circle>
          </g>
        )}
      </svg>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blueprint-glow {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes blueprint-pulse {
          0%, 100% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 18;
          }
        }

        .animate-blueprint-glow {
          animation: blueprint-glow 3s ease-in-out infinite;
        }

        .animate-blueprint-pulse {
          animation: blueprint-pulse 4s linear infinite;
        }

        @keyframes magnetic-pull {
          0% {
            r: 4;
            opacity: 0.7;
          }
          70% {
            r: 4.5;
            opacity: 0.9;
          }
          90% {
            r: 6;
            opacity: 1;
          }
          100% {
            r: 7;
            opacity: 0.4;
          }
        }

        .particle-magnetic {
          animation: magnetic-pull 1.5s ease-in infinite;
        }
      `}</style>
    </div>
  );
}
