/**
 * Analyze Agent Blueprint - Document Analysis System
 *
 * Stage 3 visualization with:
 * - Lavender/Purple color scheme (#A88CFF)
 * - Document analysis pipeline
 * - Floating analysis cards
 * - Properly contained within 1200×900 viewBox
 */

'use client';

import React from 'react';

interface AnalyzeAgentBlueprintProps {
  className?: string;
  animate?: boolean;
}

export function AnalyzeAgentBlueprint({ className = '', animate = true }: AnalyzeAgentBlueprintProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <svg
        viewBox="0 0 1200 900"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Lavender gradients */}
          <linearGradient id="analyze-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A88CFF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#A88CFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A88CFF" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="analyze-card-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B1020" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#050816" stopOpacity="0.95" />
          </linearGradient>

          <filter id="analyze-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          <radialGradient id="lavender-hot">
            <stop offset="0%" stopColor="#A88CFF" stopOpacity="0.95">
              <animate attributeName="stopColor" values="#A88CFF;#B8A0FF;#A88CFF" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#B8A0FF" stopOpacity="0.6">
              <animate attributeName="stopColor" values="#B8A0FF;#A88CFF;#B8A0FF" dur="2s" repeatCount="indefinite" />
            </stop>
          </radialGradient>
        </defs>

        {/* Background grid */}
        <g id="background-grid" opacity="0.05">
          {Array.from({ length: 41 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 30} y1="0" x2={i * 30} y2="900" stroke="#A88CFF" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 31 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 30} x2="1200" y2={i * 30} stroke="#A88CFF" strokeWidth="0.5" />
          ))}
        </g>

        {/* Corner registration marks */}
        <g opacity="0.6">
          {/* Top-left */}
          <line x1="40" y1="60" x2="80" y2="60" stroke="#A88CFF" strokeWidth="1.5" />
          <line x1="60" y1="40" x2="60" y2="80" stroke="#A88CFF" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="3" fill="none" stroke="#A88CFF" strokeWidth="1" />

          {/* Top-right */}
          <line x1="1120" y1="60" x2="1160" y2="60" stroke="#A88CFF" strokeWidth="1.5" />
          <line x1="1140" y1="40" x2="1140" y2="80" stroke="#A88CFF" strokeWidth="1.5" />
          <circle cx="1140" cy="60" r="3" fill="none" stroke="#A88CFF" strokeWidth="1" />

          {/* Bottom-left */}
          <line x1="40" y1="840" x2="80" y2="840" stroke="#A88CFF" strokeWidth="1.5" />
          <line x1="60" y1="820" x2="60" y2="860" stroke="#A88CFF" strokeWidth="1.5" />
          <circle cx="60" cy="840" r="3" fill="none" stroke="#A88CFF" strokeWidth="1" />

          {/* Bottom-right */}
          <line x1="1120" y1="840" x2="1160" y2="840" stroke="#A88CFF" strokeWidth="1.5" />
          <line x1="1140" y1="820" x2="1140" y2="860" stroke="#A88CFF" strokeWidth="1.5" />
          <circle cx="1140" cy="840" r="3" fill="none" stroke="#A88CFF" strokeWidth="1" />
        </g>

        {/* Document input pipeline (left side) */}
        <g>
          {/* Document stack */}
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={1 - i * 0.15} className={animate ? 'animate-analyze-fade' : ''} style={{ animationDelay: `${i * 0.3}s` }}>
              <rect
                x={180 + i * 5}
                y={230 + i * 5}
                width="80"
                height="100"
                rx="3"
                fill="#0B1020"
                stroke="#A88CFF"
                strokeWidth="1"
                opacity="0.8"
              />
              {/* Document lines */}
              {[0, 1, 2, 3, 4].map((line) => (
                <rect
                  key={line}
                  x={190 + i * 5}
                  y={245 + line * 15 + i * 5}
                  width={60 - i * 5}
                  height="3"
                  fill="#A88CFF"
                  opacity="0.4"
                />
              ))}
            </g>
          ))}
          <text x="220" y="360" fontSize="14" fill="#A88CFF" textAnchor="middle" fontFamily="monospace" fontWeight="600">RFP</text>
        </g>

        {/* Analysis agents - vertical pipeline in center */}
        {[
          { y: 250, label: 'PARSE' },
          { y: 400, label: 'SCORE' },
          { y: 550, label: 'VALIDATE' },
          { y: 700, label: 'RANK' }
        ].map((agent, i) => (
          <g key={i} className={animate ? 'animate-analyze-glow' : ''} style={{ animationDelay: `${i * 0.25}s` }}>
            <g transform={`translate(600, ${agent.y})`}>
              <rect
                x="-50"
                y="-28"
                width="100"
                height="56"
                rx="6"
                fill="none"
                stroke="#A88CFF"
                strokeWidth="1.8"
                opacity="0.8"
              />
              <rect
                x="-40"
                y="-20"
                width="80"
                height="40"
                rx="3"
                fill="none"
                stroke="#A88CFF"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <circle r="8" fill="#A88CFF" opacity="0.9" filter="url(#analyze-glow)" />
              <text y="50" fontSize="16" fill="#A88CFF" textAnchor="middle" fontFamily="monospace" fontWeight="600">{agent.label}</text>
            </g>

            {/* Connection line to next agent */}
            {i < 3 && (
              <path
                d={`M 600,${agent.y + 28} L 600,${agent.y + 122}`}
                fill="none"
                stroke="url(#analyze-stroke)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className={animate ? 'animate-analyze-flow' : ''}
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            )}
          </g>
        ))}

        {/* Flow connections - input and output */}
        <g opacity="0.4">
          <path d="M 220,330 Q 410,300 600,250" fill="none" stroke="url(#analyze-stroke)" strokeWidth="1.5" strokeDasharray="4,4" className={animate ? 'animate-analyze-flow' : ''} />
          <path d="M 600,780 Q 750,800 900,800" fill="none" stroke="url(#analyze-stroke)" strokeWidth="1.5" strokeDasharray="4,4" className={animate ? 'animate-analyze-flow' : ''} style={{ animationDelay: '1s' }} />
        </g>

        {/* FLOATING CARD 1 - Analysis Scores (Top-Right) */}
        <g className={animate ? 'animate-card-float' : ''}>
          <rect x="900" y="100" width="220" height="180" rx="6" fill="url(#analyze-card-gradient)" stroke="#A88CFF" strokeWidth="1.5" opacity="0.95" />
          <rect x="910" y="110" width="200" height="28" rx="3" fill="#A88CFF" opacity="0.2" />
          <text x="1010" y="129" fontSize="14" fill="#A88CFF" textAnchor="middle" fontFamily="monospace" fontWeight="600">ANALYSIS</text>

          {[
            { label: 'Fit', value: '92', color: '#A88CFF', y: 165 },
            { label: 'Budget', value: '88', color: '#A88CFF', y: 200 },
            { label: 'Timeline', value: '95', color: '#A88CFF', y: 235 }
          ].map((item, i) => (
            <g key={i}>
              <text x="920" y={item.y} fontSize="12" fill="#A88CFF" fontFamily="monospace">{item.label}</text>
              <rect x="990" y={item.y - 10} width="100" height="6" rx="3" fill="#0B1020" opacity="0.5" />
              <rect x="990" y={item.y - 10} width={parseInt(item.value)} height="6" rx="3" fill={item.color} opacity="0.8">
                {animate && <animate attributeName="width" from="0" to={parseInt(item.value)} dur="2s" fill="freeze" begin={`${i * 0.3}s`} />}
              </rect>
              <text x="1100" y={item.y} fontSize="14" fill={item.color} textAnchor="end" fontFamily="monospace" fontWeight="700">{item.value}</text>
            </g>
          ))}

          <line x1="900" y1="100" x2="915" y2="100" stroke="#A88CFF" strokeWidth="1.5" />
          <line x1="900" y1="100" x2="900" y2="115" stroke="#A88CFF" strokeWidth="1.5" />
        </g>

        {/* FLOATING CARD 2 - Match Quality (Top-Left) */}
        <g className={animate ? 'animate-card-float' : ''} style={{ animationDelay: '0.5s' }}>
          <rect x="80" y="100" width="220" height="160" rx="6" fill="url(#analyze-card-gradient)" stroke="#A88CFF" strokeWidth="1.5" opacity="0.95" />
          <rect x="90" y="110" width="200" height="28" rx="3" fill="#A88CFF" opacity="0.2" />
          <text x="190" y="129" fontSize="14" fill="#A88CFF" textAnchor="middle" fontFamily="monospace" fontWeight="600">QUALITY</text>

          <text x="190" y="190" fontSize="52" fill="#A88CFF" textAnchor="middle" fontFamily="monospace" fontWeight="700">A</text>
          <text x="190" y="215" fontSize="14" fill="#A88CFF" textAnchor="middle" fontFamily="monospace">GRADE</text>

          <circle cx="110" cy="240" r="3" fill="#A88CFF" opacity="0.9">
            {animate && <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />}
          </circle>
          <text x="120" y="244" fontSize="12" fill="#A88CFF" fontFamily="monospace">VERIFIED</text>

          <line x1="80" y1="252" x2="80" y2="260" stroke="#A88CFF" strokeWidth="1.5" />
          <line x1="80" y1="260" x2="95" y2="260" stroke="#A88CFF" strokeWidth="1.5" />
        </g>

        {/* FLOATING CARD 3 - Timeline (Bottom-Right) */}
        <g className={animate ? 'animate-card-float' : ''} style={{ animationDelay: '1s' }}>
          <rect x="900" y="680" width="220" height="160" rx="6" fill="url(#analyze-card-gradient)" stroke="#A88CFF" strokeWidth="1.5" opacity="0.95" />
          <rect x="910" y="690" width="200" height="26" rx="3" fill="#A88CFF" opacity="0.2" />
          <text x="1010" y="708" fontSize="14" fill="#A88CFF" textAnchor="middle" fontFamily="monospace" fontWeight="600">TIMELINE</text>

          {[
            { label: 'Due', value: '45d', y: 745 },
            { label: 'Prep', value: '12d', y: 780 },
            { label: 'Buffer', value: '5d', y: 815 }
          ].map((item, i) => (
            <g key={i}>
              <text x="920" y={item.y} fontSize="12" fill="#A88CFF" fontFamily="monospace">{item.label}</text>
              <text x="1100" y={item.y} fontSize="16" fill="#A88CFF" textAnchor="end" fontFamily="monospace" fontWeight="700">{item.value}</text>
            </g>
          ))}

          <line x1="1112" y1="832" x2="1120" y2="832" stroke="#A88CFF" strokeWidth="1.5" />
          <line x1="1120" y1="832" x2="1120" y2="840" stroke="#A88CFF" strokeWidth="1.5" />
        </g>

        {/* Data particles - flowing through pipeline */}
        {animate && (
          <g>
            <circle r="3" fill="url(#lavender-hot)" opacity="0.8" filter="url(#analyze-glow)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 220,330 Q 410,300 600,250" />
            </circle>
            <circle r="3" fill="#A88CFF" opacity="0.75" filter="url(#analyze-glow)">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 600,278 L 600,372" begin="0.5s" />
            </circle>
            <circle r="3" fill="url(#lavender-hot)" opacity="0.8" filter="url(#analyze-glow)">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 600,428 L 600,522" begin="1s" />
            </circle>
            <circle r="3" fill="#A88CFF" opacity="0.75" filter="url(#analyze-glow)">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 600,728 Q 750,760 900,780" begin="1.5s" />
            </circle>
          </g>
        )}

        {/* System label */}
        <g opacity="0.65">
          <text x="600" y="800" fontSize="18" fill="#A88CFF" textAnchor="middle" fontFamily="monospace" fontWeight="700" letterSpacing="2">
            GRANT ANALYSIS
          </text>
          <text x="600" y="825" fontSize="13" fill="#A88CFF" textAnchor="middle" fontFamily="monospace" letterSpacing="1">
            SCORING ENGINE
          </text>
        </g>
      </svg>

      <style jsx>{`
        @keyframes analyze-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        @keyframes analyze-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 12; }
        }

        @keyframes analyze-fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .animate-analyze-glow {
          animation: analyze-glow 3s ease-in-out infinite;
        }

        .animate-analyze-flow {
          animation: analyze-flow 4s linear infinite;
        }

        .animate-analyze-fade {
          animation: analyze-fade 3s ease-in-out infinite;
        }

        .animate-card-float {
          animation: card-float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
