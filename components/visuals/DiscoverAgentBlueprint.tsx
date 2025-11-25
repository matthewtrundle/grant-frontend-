/**
 * Discover Agent Blueprint - Grant Matching System
 *
 * Stage 2 visualization with:
 * - Teal color scheme (#20D8D2)
 * - Grant database search network
 * - Floating match result cards
 * - Properly contained within 1200×900 viewBox
 */

'use client';

import React from 'react';

interface DiscoverAgentBlueprintProps {
  className?: string;
  animate?: boolean;
}

export function DiscoverAgentBlueprint({ className = '', animate = true }: DiscoverAgentBlueprintProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <svg
        viewBox="0 0 1200 900"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Teal gradients */}
          <linearGradient id="discover-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#20D8D2" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#20D8D2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#20D8D2" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="discover-card-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B1020" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#050816" stopOpacity="0.95" />
          </linearGradient>

          <filter id="discover-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          <radialGradient id="teal-hot">
            <stop offset="0%" stopColor="#20D8D2" stopOpacity="0.95">
              <animate attributeName="stopColor" values="#20D8D2;#39F2C3;#20D8D2" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#39F2C3" stopOpacity="0.6">
              <animate attributeName="stopColor" values="#39F2C3;#20D8D2;#39F2C3" dur="2s" repeatCount="indefinite" />
            </stop>
          </radialGradient>
        </defs>

        {/* Background grid */}
        <g id="background-grid" opacity="0.05">
          {Array.from({ length: 41 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 30} y1="0" x2={i * 30} y2="900" stroke="#20D8D2" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 31 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 30} x2="1200" y2={i * 30} stroke="#20D8D2" strokeWidth="0.5" />
          ))}
        </g>

        {/* Corner registration marks */}
        <g opacity="0.6">
          {/* Top-left */}
          <line x1="40" y1="60" x2="80" y2="60" stroke="#20D8D2" strokeWidth="1.5" />
          <line x1="60" y1="40" x2="60" y2="80" stroke="#20D8D2" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="3" fill="none" stroke="#20D8D2" strokeWidth="1" />

          {/* Top-right */}
          <line x1="1120" y1="60" x2="1160" y2="60" stroke="#20D8D2" strokeWidth="1.5" />
          <line x1="1140" y1="40" x2="1140" y2="80" stroke="#20D8D2" strokeWidth="1.5" />
          <circle cx="1140" cy="60" r="3" fill="none" stroke="#20D8D2" strokeWidth="1" />

          {/* Bottom-left */}
          <line x1="40" y1="840" x2="80" y2="840" stroke="#20D8D2" strokeWidth="1.5" />
          <line x1="60" y1="820" x2="60" y2="860" stroke="#20D8D2" strokeWidth="1.5" />
          <circle cx="60" cy="840" r="3" fill="none" stroke="#20D8D2" strokeWidth="1" />

          {/* Bottom-right */}
          <line x1="1120" y1="840" x2="1160" y2="840" stroke="#20D8D2" strokeWidth="1.5" />
          <line x1="1140" y1="820" x2="1140" y2="860" stroke="#20D8D2" strokeWidth="1.5" />
          <circle cx="1140" cy="840" r="3" fill="none" stroke="#20D8D2" strokeWidth="1" />
        </g>

        {/* Central search hub (larger octagon) */}
        <g transform="translate(600, 420)" className={animate ? 'animate-discover-pulse' : ''}>
          <polygon
            points="0,-48 34,-34 48,0 34,34 0,48 -34,34 -48,0 -34,-34"
            fill="none"
            stroke="#20D8D2"
            strokeWidth="2"
            opacity="0.9"
          />
          <polygon
            points="0,-38 27,-27 38,0 27,27 0,38 -27,27 -38,0 -27,-27"
            fill="none"
            stroke="#20D8D2"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle r="20" fill="none" stroke="#20D8D2" strokeWidth="2" />
          <circle r="11" fill="#20D8D2" opacity="1" filter="url(#discover-glow)" />

          <text x="0" y="-68" fontSize="20" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" fontWeight="700">SEARCH</text>
          <text x="0" y="-48" fontSize="14" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" opacity="0.8">ENGINE</text>
        </g>

        {/* Grant database nodes - positioned symmetrically */}
        {[
          { x: 300, y: 250, label: 'NSF' },
          { x: 900, y: 280, label: 'NIH' },
          { x: 240, y: 520, label: 'DOE' },
          { x: 960, y: 560, label: 'NASA' },
          { x: 420, y: 700, label: 'SBIR' },
          { x: 780, y: 720, label: 'DOD' }
        ].map((node, i) => (
          <g key={i} transform={`translate(${node.x}, ${node.y})`} className={animate ? 'animate-discover-glow' : ''} style={{ animationDelay: `${i * 0.2}s` }}>
            <circle r="28" fill="none" stroke="#20D8D2" strokeWidth="1.5" opacity="0.8" />
            <circle r="20" fill="none" stroke="#20D8D2" strokeWidth="1" opacity="0.6" />
            <circle r="7" fill="#20D8D2" opacity="0.9" filter="url(#discover-glow)" />
            <text x="0" y="48" fontSize="16" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" fontWeight="600">{node.label}</text>
          </g>
        ))}

        {/* Search connections - radial lines from center to database nodes */}
        <g opacity="0.4">
          {[
            'M 600,420 L 300,250',
            'M 600,420 L 900,280',
            'M 600,420 L 240,520',
            'M 600,420 L 960,560',
            'M 600,420 L 420,700',
            'M 600,420 L 780,720'
          ].map((path, i) => (
            <path
              key={i}
              d={path}
              fill="none"
              stroke="url(#discover-stroke)"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              className={animate ? 'animate-discover-pulse-line' : ''}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>

        {/* Scan beam - rotating line */}
        {animate && (
          <line
            x1="600" y1="420"
            x2="600" y2="290"
            stroke="#20D8D2"
            strokeWidth="2"
            opacity="0.5"
            className="animate-discover-scan"
            style={{ transformOrigin: '600px 420px' }}
          />
        )}

        {/* FLOATING CARD 1 - Match Results (Top-Right) */}
        <g className={animate ? 'animate-card-float' : ''}>
          <rect x="900" y="100" width="220" height="150" rx="6" fill="url(#discover-card-gradient)" stroke="#20D8D2" strokeWidth="1.5" opacity="0.95" />
          <rect x="910" y="110" width="200" height="28" rx="3" fill="#20D8D2" opacity="0.2" />
          <text x="1010" y="129" fontSize="14" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" fontWeight="600">MATCHES</text>

          {[
            { label: 'Perfect', value: '12', y: 165 },
            { label: 'Good', value: '28', y: 195 },
            { label: 'Fair', value: '45', y: 225 }
          ].map((item, i) => (
            <g key={i}>
              <text x="920" y={item.y} fontSize="12" fill="#20D8D2" fontFamily="monospace">{item.label}</text>
              <text x="1100" y={item.y} fontSize="18" fill="#20D8D2" textAnchor="end" fontFamily="monospace" fontWeight="700">{item.value}</text>
            </g>
          ))}

          <line x1="900" y1="100" x2="915" y2="100" stroke="#20D8D2" strokeWidth="1.5" />
          <line x1="900" y1="100" x2="900" y2="115" stroke="#20D8D2" strokeWidth="1.5" />
        </g>

        {/* FLOATING CARD 2 - Search Progress (Top-Left) */}
        <g className={animate ? 'animate-card-float' : ''} style={{ animationDelay: '0.5s' }}>
          <rect x="80" y="100" width="220" height="160" rx="6" fill="url(#discover-card-gradient)" stroke="#20D8D2" strokeWidth="1.5" opacity="0.95" />
          <rect x="90" y="110" width="200" height="26" rx="3" fill="#20D8D2" opacity="0.2" />
          <text x="190" y="128" fontSize="14" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" fontWeight="600">SCANNING</text>

          <text x="190" y="185" fontSize="48" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" fontWeight="700">85</text>
          <text x="190" y="205" fontSize="14" fill="#20D8D2" textAnchor="middle" fontFamily="monospace">%</text>

          <circle cx="110" cy="235" r="3" fill="#20D8D2" opacity="0.9">
            {animate && <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />}
          </circle>
          <text x="120" y="239" fontSize="12" fill="#20D8D2" fontFamily="monospace">ACTIVE</text>

          <line x1="80" y1="252" x2="80" y2="260" stroke="#20D8D2" strokeWidth="1.5" />
          <line x1="80" y1="260" x2="95" y2="260" stroke="#20D8D2" strokeWidth="1.5" />
        </g>

        {/* FLOATING CARD 3 - Grant Database (Bottom-Right) */}
        <g className={animate ? 'animate-card-float' : ''} style={{ animationDelay: '1s' }}>
          <rect x="900" y="680" width="220" height="160" rx="6" fill="url(#discover-card-gradient)" stroke="#20D8D2" strokeWidth="1.5" opacity="0.95" />
          <rect x="910" y="690" width="200" height="26" rx="3" fill="#20D8D2" opacity="0.2" />
          <text x="1010" y="708" fontSize="14" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" fontWeight="600">DATABASE</text>

          {[
            { label: 'Total', value: '5.2K', y: 745 },
            { label: 'Open', value: '892', y: 780 },
            { label: 'New', value: '47', y: 815 }
          ].map((item, i) => (
            <g key={i}>
              <text x="920" y={item.y} fontSize="12" fill="#20D8D2" fontFamily="monospace">{item.label}</text>
              <text x="1100" y={item.y} fontSize="16" fill="#20D8D2" textAnchor="end" fontFamily="monospace" fontWeight="700">{item.value}</text>
            </g>
          ))}

          <line x1="1112" y1="832" x2="1120" y2="832" stroke="#20D8D2" strokeWidth="1.5" />
          <line x1="1120" y1="832" x2="1120" y2="840" stroke="#20D8D2" strokeWidth="1.5" />
        </g>

        {/* Data particles - moving along connection lines */}
        {animate && (
          <g>
            <circle r="3" fill="url(#teal-hot)" opacity="0.8" filter="url(#discover-glow)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 600,420 L 300,250" />
            </circle>
            <circle r="3" fill="#20D8D2" opacity="0.75" filter="url(#discover-glow)">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 600,420 L 900,280" begin="0.5s" />
            </circle>
            <circle r="3" fill="url(#teal-hot)" opacity="0.8" filter="url(#discover-glow)">
              <animateMotion dur="3.2s" repeatCount="indefinite" path="M 600,420 L 240,520" begin="1s" />
            </circle>
            <circle r="3" fill="#20D8D2" opacity="0.75" filter="url(#discover-glow)">
              <animateMotion dur="3.8s" repeatCount="indefinite" path="M 600,420 L 960,560" begin="1.5s" />
            </circle>
          </g>
        )}

        {/* System label */}
        <g opacity="0.65">
          <text x="600" y="800" fontSize="18" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" fontWeight="700" letterSpacing="2">
            GRANT DISCOVERY
          </text>
          <text x="600" y="825" fontSize="13" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" letterSpacing="1">
            AI SEARCH ENGINE
          </text>
        </g>
      </svg>

      <style jsx>{`
        @keyframes discover-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes discover-pulse-line {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 12; }
        }

        @keyframes discover-scan {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .animate-discover-pulse {
          animation: discover-pulse 3s ease-in-out infinite;
        }

        .animate-discover-glow {
          animation: discover-pulse 3s ease-in-out infinite;
        }

        .animate-discover-pulse-line {
          animation: discover-pulse-line 4s linear infinite;
        }

        .animate-discover-scan {
          animation: discover-scan 4s linear infinite;
        }

        .animate-card-float {
          animation: card-float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
