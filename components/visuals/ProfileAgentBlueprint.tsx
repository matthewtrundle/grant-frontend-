/**
 * Profile Agent Blueprint - Company Profiling System
 *
 * Stage 1 visualization with:
 * - Cyan/Teal color scheme (#39F2C3, #20D8D2)
 * - Organic agent scatter pattern
 * - Floating info cards
 * - Properly contained within 1200×900 viewBox
 */

'use client';

import React from 'react';

interface ProfileAgentBlueprintProps {
  className?: string;
  animate?: boolean;
}

export function ProfileAgentBlueprint({ className = '', animate = true }: ProfileAgentBlueprintProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <svg
        viewBox="0 0 1200 900"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Cyan/Teal gradients */}
          <linearGradient id="profile-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#39F2C3" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#20D8D2" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#39F2C3" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="profile-card-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B1020" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#050816" stopOpacity="0.95" />
          </linearGradient>

          <filter id="profile-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          <radialGradient id="cyan-hot">
            <stop offset="0%" stopColor="#39F2C3" stopOpacity="0.95">
              <animate attributeName="stopColor" values="#20D8D2;#39F2C3;#20D8D2" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#20D8D2" stopOpacity="0.6">
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
          <line x1="40" y1="60" x2="80" y2="60" stroke="#39F2C3" strokeWidth="1.5" />
          <line x1="60" y1="40" x2="60" y2="80" stroke="#39F2C3" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="3" fill="none" stroke="#39F2C3" strokeWidth="1" />

          {/* Top-right */}
          <line x1="1120" y1="60" x2="1160" y2="60" stroke="#39F2C3" strokeWidth="1.5" />
          <line x1="1140" y1="40" x2="1140" y2="80" stroke="#39F2C3" strokeWidth="1.5" />
          <circle cx="1140" cy="60" r="3" fill="none" stroke="#39F2C3" strokeWidth="1" />

          {/* Bottom-left */}
          <line x1="40" y1="840" x2="80" y2="840" stroke="#39F2C3" strokeWidth="1.5" />
          <line x1="60" y1="820" x2="60" y2="860" stroke="#39F2C3" strokeWidth="1.5" />
          <circle cx="60" cy="840" r="3" fill="none" stroke="#39F2C3" strokeWidth="1" />

          {/* Bottom-right */}
          <line x1="1120" y1="840" x2="1160" y2="840" stroke="#39F2C3" strokeWidth="1.5" />
          <line x1="1140" y1="820" x2="1140" y2="860" stroke="#39F2C3" strokeWidth="1.5" />
          <circle cx="1140" cy="840" r="3" fill="none" stroke="#39F2C3" strokeWidth="1" />
        </g>

        {/* Data flow paths - organic connections */}
        <g opacity="0.4">
          <path d="M 260,360 Q 380,410 500,480" fill="none" stroke="url(#profile-stroke)" strokeWidth="1.5" strokeDasharray="4,4" className={animate ? 'animate-profile-pulse' : ''} />
          <path d="M 520,500 Q 580,540 620,590" fill="none" stroke="url(#profile-stroke)" strokeWidth="1.8" strokeDasharray="5,5" className={animate ? 'animate-profile-pulse' : ''} style={{ animationDelay: '0.5s' }} />
          <path d="M 660,615 Q 720,660 760,720" fill="none" stroke="url(#profile-stroke)" strokeWidth="1.5" strokeDasharray="4,4" className={animate ? 'animate-profile-pulse' : ''} style={{ animationDelay: '1s' }} />
          <path d="M 780,750 Q 740,780 680,780" fill="none" stroke="url(#profile-stroke)" strokeWidth="1.2" strokeDasharray="3,3" className={animate ? 'animate-profile-pulse' : ''} style={{ animationDelay: '1.5s' }} />

          {/* Cross connections */}
          <path d="M 260,365 Q 450,500 620,595" fill="none" stroke="#20D8D2" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.25" />
          <path d="M 510,490 Q 650,580 760,720" fill="none" stroke="#20D8D2" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.25" />
        </g>

        {/* AGENT NODE 1 - Document Extraction (Left) */}
        <g transform="translate(250, 350)" className={animate ? 'animate-profile-glow' : ''}>
          <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16" fill="none" stroke="#39F2C3" strokeWidth="1.5" opacity="0.8" />
          <polygon points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11" fill="none" stroke="#20D8D2" strokeWidth="1" opacity="0.6" />
          <circle r="10" fill="none" stroke="#39F2C3" strokeWidth="1.5" />
          <circle r="4" fill="#20D8D2" opacity="0.9" filter="url(#profile-glow)" />

          <text x="0" y="-48" fontSize="16" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="700">A-01</text>
          <text x="0" y="-32" fontSize="12" fill="#20D8D2" textAnchor="middle" fontFamily="monospace">DOC</text>
        </g>

        {/* AGENT NODE 2 - Tech Stack Analyzer */}
        <g transform="translate(500, 470)" className={animate ? 'animate-profile-glow' : ''} style={{ animationDelay: '0.3s' }}>
          <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16" fill="none" stroke="#39F2C3" strokeWidth="1.5" opacity="0.8" />
          <polygon points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11" fill="none" stroke="#20D8D2" strokeWidth="1" opacity="0.6" />
          <circle r="10" fill="none" stroke="#39F2C3" strokeWidth="1.5" />
          <circle r="4" fill="#20D8D2" opacity="0.9" filter="url(#profile-glow)" />

          <text x="0" y="-48" fontSize="16" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="700">A-02</text>
          <text x="0" y="-32" fontSize="12" fill="#20D8D2" textAnchor="middle" fontFamily="monospace">TECH</text>
        </g>

        {/* AGENT NODE 3 - CORE TRL Assessment (Center - LARGER) */}
        <g transform="translate(630, 600)" className={animate ? 'animate-profile-glow' : ''} style={{ animationDelay: '0.6s' }}>
          {/* Larger hexagon */}
          <polygon points="0,-42 36,-21 36,21 0,42 -36,21 -36,-21" fill="none" stroke="#39F2C3" strokeWidth="2" opacity="0.9" />
          <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16" fill="none" stroke="#20D8D2" strokeWidth="1.5" opacity="0.7" />
          <polygon points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11" fill="none" stroke="#20D8D2" strokeWidth="1" opacity="0.5" />
          <circle r="12" fill="none" stroke="#39F2C3" strokeWidth="2" />
          <circle r="6" fill="#20D8D2" opacity="1" filter="url(#profile-glow)" />

          {/* Corner markers */}
          {[
            [0, -42], [36, -21], [36, 21], [0, 42], [-36, 21], [-36, -21]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" fill="none" stroke="#20D8D2" strokeWidth="1" opacity="0.75" />
          ))}

          {/* Accent ring */}
          <circle r="52" fill="none" stroke="#39F2C3" strokeWidth="0.5" opacity="0.3" strokeDasharray="4,8" />

          <text x="0" y="-58" fontSize="18" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="700">CORE</text>
          <text x="0" y="-42" fontSize="12" fill="#20D8D2" textAnchor="middle" fontFamily="monospace">TRL</text>
        </g>

        {/* AGENT NODE 4 - Team Profiler */}
        <g transform="translate(770, 730)" className={animate ? 'animate-profile-glow' : ''} style={{ animationDelay: '0.9s' }}>
          <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16" fill="none" stroke="#39F2C3" strokeWidth="1.5" opacity="0.8" />
          <polygon points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11" fill="none" stroke="#20D8D2" strokeWidth="1" opacity="0.6" />
          <circle r="10" fill="none" stroke="#39F2C3" strokeWidth="1.5" />
          <circle r="4" fill="#20D8D2" opacity="0.9" filter="url(#profile-glow)" />

          <text x="0" y="50" fontSize="16" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="700">A-03</text>
          <text x="0" y="65" fontSize="12" fill="#20D8D2" textAnchor="middle" fontFamily="monospace">TEAM</text>
        </g>

        {/* AGENT NODE 5 - Output Synthesis */}
        <g transform="translate(680, 780)" className={animate ? 'animate-profile-glow' : ''} style={{ animationDelay: '1.2s' }}>
          <polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16" fill="none" stroke="#39F2C3" strokeWidth="1.5" opacity="0.8" />
          <polygon points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11" fill="none" stroke="#20D8D2" strokeWidth="1" opacity="0.6" />
          <circle r="10" fill="none" stroke="#39F2C3" strokeWidth="1.5" />
          <circle r="4" fill="#20D8D2" opacity="0.9" filter="url(#profile-glow)" />

          <text x="0" y="50" fontSize="16" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="700">A-04</text>
          <text x="0" y="65" fontSize="12" fill="#20D8D2" textAnchor="middle" fontFamily="monospace">OUTPUT</text>
        </g>

        {/* FLOATING INFO CARD 1 - Tech Stack (Top-Right) */}
        <g className={animate ? 'animate-card-float' : ''}>
          <rect x="900" y="100" width="220" height="150" rx="6" fill="url(#profile-card-gradient)" stroke="#39F2C3" strokeWidth="1.5" opacity="0.95" />
          <rect x="910" y="110" width="200" height="28" rx="3" fill="#20D8D2" opacity="0.2" />
          <text x="1010" y="129" fontSize="14" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="600">TECH STACK</text>

          {[
            { label: 'AI/ML', value: 85, y: 165 },
            { label: 'Cloud', value: 72, y: 190 },
            { label: 'Data', value: 90, y: 215 }
          ].map((item, i) => (
            <g key={i}>
              <text x="920" y={item.y} fontSize="12" fill="#20D8D2" fontFamily="monospace">{item.label}</text>
              <rect x="1000" y={item.y - 10} width="100" height="6" rx="3" fill="#0B1020" opacity="0.5" />
              <rect x="1000" y={item.y - 10} width={item.value} height="6" rx="3" fill="#20D8D2" opacity="0.8">
                {animate && <animate attributeName="width" from="0" to={item.value} dur="2s" fill="freeze" begin={`${i * 0.3}s`} />}
              </rect>
            </g>
          ))}

          <line x1="900" y1="100" x2="915" y2="100" stroke="#39F2C3" strokeWidth="1.5" />
          <line x1="900" y1="100" x2="900" y2="115" stroke="#39F2C3" strokeWidth="1.5" />
        </g>

        {/* FLOATING INFO CARD 2 - TRL Score (Top-Left) */}
        <g className={animate ? 'animate-card-float' : ''} style={{ animationDelay: '0.5s' }}>
          <rect x="80" y="100" width="220" height="150" rx="6" fill="url(#profile-card-gradient)" stroke="#20D8D2" strokeWidth="1.5" opacity="0.95" />
          <rect x="90" y="110" width="200" height="28" rx="3" fill="#39F2C3" opacity="0.2" />
          <text x="190" y="129" fontSize="14" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="600">TRL SCORE</text>

          <text x="190" y="185" fontSize="48" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" fontWeight="700">7</text>
          <text x="190" y="205" fontSize="14" fill="#39F2C3" textAnchor="middle" fontFamily="monospace">/9</text>

          <circle cx="110" cy="230" r="3" fill="#20D8D2" opacity="0.9">
            {animate && <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />}
          </circle>
          <text x="120" y="234" fontSize="12" fill="#20D8D2" fontFamily="monospace">VALIDATED</text>

          <line x1="292" y1="100" x2="300" y2="100" stroke="#20D8D2" strokeWidth="1.5" />
          <line x1="300" y1="100" x2="300" y2="115" stroke="#20D8D2" strokeWidth="1.5" />
        </g>

        {/* FLOATING INFO CARD 3 - Documents (Bottom-Left) */}
        <g className={animate ? 'animate-card-float' : ''} style={{ animationDelay: '1s' }}>
          <rect x="80" y="680" width="220" height="160" rx="6" fill="url(#profile-card-gradient)" stroke="#39F2C3" strokeWidth="1.5" opacity="0.95" />
          <rect x="90" y="690" width="200" height="26" rx="3" fill="#20D8D2" opacity="0.2" />
          <text x="190" y="708" fontSize="14" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="600">DOCUMENTS</text>

          {/* Document stack */}
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={1 - i * 0.2}>
              <rect
                x={105 + i * 4}
                y={738 + i * 4}
                width="50"
                height="60"
                rx="2"
                fill="#0B1020"
                stroke="#20D8D2"
                strokeWidth="0.8"
                opacity="0.7"
              />
              {[0, 1, 2, 3].map((line) => (
                <rect
                  key={line}
                  x={110 + i * 4}
                  y={746 + line * 10 + i * 4}
                  width={40 - i * 3}
                  height="2"
                  fill="#20D8D2"
                  opacity="0.3"
                />
              ))}
            </g>
          ))}

          <text x="210" y="760" fontSize="14" fill="#39F2C3" fontFamily="monospace" fontWeight="600">3 FILES</text>
          <text x="210" y="780" fontSize="11" fill="#20D8D2" fontFamily="monospace">EXTRACTING</text>
          <rect x="210" y="790" width="70" height="4" rx="2" fill="#0B1020" opacity="0.5" />
          <rect x="210" y="790" width="45" height="4" rx="2" fill="#20D8D2" opacity="0.8">
            {animate && <animate attributeName="width" values="0;70;0" dur="3s" repeatCount="indefinite" />}
          </rect>

          <line x1="80" y1="832" x2="80" y2="840" stroke="#39F2C3" strokeWidth="1.5" />
          <line x1="80" y1="840" x2="95" y2="840" stroke="#39F2C3" strokeWidth="1.5" />
        </g>

        {/* FLOATING INFO CARD 4 - Team Metrics (Bottom-Right) */}
        <g className={animate ? 'animate-card-float' : ''} style={{ animationDelay: '1.5s' }}>
          <rect x="900" y="680" width="220" height="160" rx="6" fill="url(#profile-card-gradient)" stroke="#20D8D2" strokeWidth="1.5" opacity="0.95" />
          <rect x="910" y="690" width="200" height="28" rx="3" fill="#39F2C3" opacity="0.2" />
          <text x="1010" y="709" fontSize="14" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="600">TEAM DATA</text>

          {[
            { label: 'Size', value: '12', y: 750 },
            { label: 'PhDs', value: '3', y: 785 },
            { label: 'Years', value: '8', y: 820 }
          ].map((item, i) => (
            <g key={i}>
              <text x="920" y={item.y} fontSize="12" fill="#20D8D2" fontFamily="monospace">{item.label}</text>
              <text x="1100" y={item.y} fontSize="18" fill="#39F2C3" textAnchor="end" fontFamily="monospace" fontWeight="700">{item.value}</text>
            </g>
          ))}

          <line x1="1112" y1="832" x2="1120" y2="832" stroke="#20D8D2" strokeWidth="1.5" />
          <line x1="1120" y1="832" x2="1120" y2="840" stroke="#20D8D2" strokeWidth="1.5" />
        </g>

        {/* Data particles */}
        {animate && (
          <g>
            <circle r="3" fill="url(#cyan-hot)" opacity="0.8" filter="url(#profile-glow)">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 260,360 Q 380,410 500,480" />
            </circle>
            <circle r="3.5" fill="url(#cyan-hot)" opacity="0.85" filter="url(#profile-glow)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 520,500 Q 580,540 620,590" />
            </circle>
            <circle r="3" fill="#20D8D2" opacity="0.75" filter="url(#profile-glow)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 520,500 Q 580,540 620,590" begin="1.5s" />
            </circle>
            <circle r="3.5" fill="url(#cyan-hot)" opacity="0.85" filter="url(#profile-glow)">
              <animateMotion dur="4.5s" repeatCount="indefinite" path="M 660,615 Q 720,660 760,720" />
            </circle>
            <circle r="3" fill="#20D8D2" opacity="0.75" filter="url(#profile-glow)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 780,750 Q 740,780 680,780" />
            </circle>
          </g>
        )}

        {/* System label */}
        <g opacity="0.65">
          <text x="600" y="800" fontSize="18" fill="#39F2C3" textAnchor="middle" fontFamily="monospace" fontWeight="700" letterSpacing="2">
            PROFILING PIPELINE
          </text>
          <text x="600" y="825" fontSize="13" fill="#20D8D2" textAnchor="middle" fontFamily="monospace" letterSpacing="1">
            5-AGENT SYSTEM
          </text>
        </g>
      </svg>

      <style jsx>{`
        @keyframes profile-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        @keyframes profile-pulse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 12; }
        }

        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .animate-profile-glow {
          animation: profile-glow 3s ease-in-out infinite;
        }

        .animate-profile-pulse {
          animation: profile-pulse 4s linear infinite;
        }

        .animate-card-float {
          animation: card-float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
