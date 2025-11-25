/**
 * Generate Agent Blueprint - AI Writing System
 *
 * Completely rebuilt Stage 4 visualization with:
 * - Coral color scheme (#FF9B7D / #FF6D6D)
 * - Multi-agent writing system
 * - Proper containment within viewBox
 * - Apple-esque spacing and balance
 */

'use client';

import React from 'react';

interface GenerateAgentBlueprintProps {
  className?: string;
  animate?: boolean;
}

export function GenerateAgentBlueprint({ className = '', animate = true }: GenerateAgentBlueprintProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <svg
        viewBox="0 0 1200 900"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Coral gradients */}
          <linearGradient id="generate-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6D6D" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FF9B7D" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FF6D6D" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="generate-card-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B1020" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#050816" stopOpacity="0.95" />
          </linearGradient>

          <filter id="generate-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>

          <radialGradient id="coral-hot">
            <stop offset="0%" stopColor="#FF9B7D" stopOpacity="0.95">
              <animate attributeName="stopColor" values="#FF9B7D;#FFAC94;#FF9B7D" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#FFAC94" stopOpacity="0.6">
              <animate attributeName="stopColor" values="#FFAC94;#FF9B7D;#FFAC94" dur="2s" repeatCount="indefinite" />
            </stop>
          </radialGradient>
        </defs>

        {/* Background grid - subtle */}
        <g id="background-grid" opacity="0.05">
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 50 + 40} y1="40" x2={i * 50 + 40} y2="860" stroke="#FF9B7D" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={`h-${i}`} x1="40" y1={i * 50 + 40} x2="1160" y2={i * 50 + 40} stroke="#FF9B7D" strokeWidth="0.5" />
          ))}
        </g>

        {/* Corner registration marks */}
        <g opacity="0.5">
          <line x1="40" y1="60" x2="80" y2="60" stroke="#FF6D6D" strokeWidth="1.5" />
          <line x1="60" y1="40" x2="60" y2="80" stroke="#FF6D6D" strokeWidth="1.5" />

          <line x1="1120" y1="60" x2="1160" y2="60" stroke="#FF6D6D" strokeWidth="1.5" />
          <line x1="1140" y1="40" x2="1140" y2="80" stroke="#FF6D6D" strokeWidth="1.5" />

          <line x1="40" y1="840" x2="80" y2="840" stroke="#FF6D6D" strokeWidth="1.5" />
          <line x1="60" y1="820" x2="60" y2="860" stroke="#FF6D6D" strokeWidth="1.5" />

          <line x1="1120" y1="840" x2="1160" y2="840" stroke="#FF6D6D" strokeWidth="1.5" />
          <line x1="1140" y1="820" x2="1140" y2="860" stroke="#FF6D6D" strokeWidth="1.5" />
        </g>

        {/* Central LEAD WRITER node */}
        <g transform="translate(600, 280)" className={animate ? 'animate-generate-pulse' : ''}>
          <polygon
            points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25"
            fill="none"
            stroke="#FF6D6D"
            strokeWidth="2"
            opacity="0.9"
          />
          <polygon
            points="0,-38 32,-19 32,19 0,38 -32,19 -32,-19"
            fill="none"
            stroke="#FF9B7D"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle r="20" fill="none" stroke="#FF6D6D" strokeWidth="2" />
          <circle r="10" fill="#FF6D6D" opacity="1" filter="url(#generate-glow)" />

          <text x="0" y="-65" fontSize="20" fill="#FF6D6D" textAnchor="middle" fontFamily="monospace" fontWeight="700">LEAD</text>
          <text x="0" y="-45" fontSize="14" fill="#FF9B7D" textAnchor="middle" fontFamily="monospace">WRITER</text>
        </g>

        {/* Six writing agents in circular orbit */}
        {[
          { angle: 0, label: 'W-01', sublabel: 'INTRO' },
          { angle: 60, label: 'W-02', sublabel: 'TECH' },
          { angle: 120, label: 'W-03', sublabel: 'BUDGET' },
          { angle: 180, label: 'W-04', sublabel: 'IMPACT' },
          { angle: 240, label: 'W-05', sublabel: 'TEAM' },
          { angle: 300, label: 'W-06', sublabel: 'TIMELINE' }
        ].map((agent, i) => {
          const radian = (agent.angle - 90) * (Math.PI / 180);
          const radius = 180;
          const x = 600 + Math.cos(radian) * radius;
          const y = 280 + Math.sin(radian) * radius;

          return (
            <g key={i} transform={`translate(${x}, ${y})`} className={animate ? 'animate-generate-glow' : ''} style={{ animationDelay: `${i * 0.15}s` }}>
              <polygon
                points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14"
                fill="none"
                stroke="#FF9B7D"
                strokeWidth="1.5"
                opacity="0.8"
              />
              <polygon
                points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10"
                fill="none"
                stroke="#FF6D6D"
                strokeWidth="1"
                opacity="0.6"
              />
              <circle r="8" fill="none" stroke="#FF9B7D" strokeWidth="1.5" />
              <circle r="4" fill="#FF6D6D" opacity="0.9" filter="url(#generate-glow)" />

              <text x="0" y="-42" fontSize="16" fill="#FF6D6D" textAnchor="middle" fontFamily="monospace" fontWeight="700">{agent.label}</text>
              <text x="0" y="-28" fontSize="11" fill="#FF9B7D" textAnchor="middle" fontFamily="monospace">{agent.sublabel}</text>
            </g>
          );
        })}

        {/* Connections from Lead Writer to orbiting agents */}
        <g opacity="0.25">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const radian = (angle - 90) * (Math.PI / 180);
            const radius = 180;
            const x = 600 + Math.cos(radian) * radius;
            const y = 280 + Math.sin(radian) * radius;

            return (
              <path
                key={i}
                d={`M 600,280 L ${x},${y}`}
                fill="none"
                stroke="url(#generate-stroke)"
                strokeWidth="1"
                strokeDasharray="4,4"
                className={animate ? 'animate-generate-flow' : ''}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            );
          })}
        </g>

        {/* Three assessor output nodes (bottom, evenly spaced) */}
        {[
          { x: 300, label: 'TECH' },
          { x: 600, label: 'BUSINESS' },
          { x: 900, label: 'ACADEMIC' }
        ].map((assessor, i) => (
          <g key={i} transform={`translate(${assessor.x}, 620)`} className={animate ? 'animate-generate-glow' : ''} style={{ animationDelay: `${(i + 6) * 0.15}s` }}>
            <rect
              x="-55"
              y="-28"
              width="110"
              height="56"
              rx="4"
              fill="none"
              stroke="#FF6D6D"
              strokeWidth="1.5"
              opacity="0.8"
            />
            <rect
              x="-45"
              y="-22"
              width="90"
              height="44"
              rx="3"
              fill="none"
              stroke="#FF9B7D"
              strokeWidth="1"
              opacity="0.6"
            />
            <circle r="8" fill="#FF6D6D" opacity="0.9" filter="url(#generate-glow)" />
            <text y="50" fontSize="14" fill="#FF6D6D" textAnchor="middle" fontFamily="monospace" fontWeight="600">{assessor.label}</text>
          </g>
        ))}

        {/* Feedback loops from Lead Writer to assessors */}
        <g opacity="0.25">
          <path d="M 600,330 Q 450,480 300,592" fill="none" stroke="url(#generate-stroke)" strokeWidth="1.5" strokeDasharray="4,4" className={animate ? 'animate-generate-flow' : ''} />
          <path d="M 600,330 L 600,592" fill="none" stroke="url(#generate-stroke)" strokeWidth="1.5" strokeDasharray="4,4" className={animate ? 'animate-generate-flow' : ''} style={{ animationDelay: '0.3s' }} />
          <path d="M 600,330 Q 750,480 900,592" fill="none" stroke="url(#generate-stroke)" strokeWidth="1.5" strokeDasharray="4,4" className={animate ? 'animate-generate-flow' : ''} style={{ animationDelay: '0.6s' }} />
        </g>

        {/* FLOATING CARD 1 - Progress (top-left) */}
        <g className={animate ? 'animate-card-float' : ''}>
          <rect x="80" y="100" width="220" height="160" rx="6" fill="url(#generate-card-gradient)" stroke="#FF6D6D" strokeWidth="1.5" opacity="0.95" />
          <rect x="90" y="110" width="200" height="32" rx="4" fill="#FF6D6D" opacity="0.15" />
          <text x="190" y="133" fontSize="16" fill="#FF6D6D" textAnchor="middle" fontFamily="monospace" fontWeight="600">PROGRESS</text>

          <text x="190" y="185" fontSize="48" fill="#FF9B7D" textAnchor="middle" fontFamily="monospace" fontWeight="700">4.2K</text>
          <text x="190" y="210" fontSize="14" fill="#FF6D6D" textAnchor="middle" fontFamily="monospace">WORDS</text>

          <rect x="100" y="225" width="180" height="6" rx="3" fill="#0B1020" opacity="0.5" />
          <rect x="100" y="225" width="126" height="6" rx="3" fill="#FF6D6D" opacity="0.8">
            {animate && <animate attributeName="width" values="0;126;126" dur="2s" fill="freeze" />}
          </rect>
          <text x="190" y="248" fontSize="12" fill="#FF9B7D" textAnchor="middle" fontFamily="monospace">70% COMPLETE</text>
        </g>

        {/* FLOATING CARD 2 - Quality (top-right) */}
        <g className={animate ? 'animate-card-float' : ''} style={{ animationDelay: '0.5s' }}>
          <rect x="900" y="100" width="220" height="160" rx="6" fill="url(#generate-card-gradient)" stroke="#FF9B7D" strokeWidth="1.5" opacity="0.95" />
          <rect x="910" y="110" width="200" height="32" rx="4" fill="#FF9B7D" opacity="0.15" />
          <text x="1010" y="133" fontSize="16" fill="#FF9B7D" textAnchor="middle" fontFamily="monospace" fontWeight="600">QUALITY</text>

          <text x="1010" y="195" fontSize="56" fill="#FF6D6D" textAnchor="middle" fontFamily="monospace" fontWeight="700">9.2</text>
          <text x="1010" y="220" fontSize="16" fill="#FF9B7D" textAnchor="middle" fontFamily="monospace">/10</text>

          <circle cx="975" cy="240" r="4" fill="#FF6D6D" opacity="0.9">
            {animate && <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />}
          </circle>
          <text x="985" y="245" fontSize="12" fill="#FF9B7D" fontFamily="monospace">EXCELLENT</text>
        </g>

        {/* FLOATING CARD 3 - Feedback (bottom-right) */}
        <g className={animate ? 'animate-card-float' : ''} style={{ animationDelay: '1s' }}>
          <rect x="900" y="680" width="220" height="160" rx="6" fill="url(#generate-card-gradient)" stroke="#FF6D6D" strokeWidth="1.5" opacity="0.95" />
          <rect x="910" y="690" width="200" height="32" rx="4" fill="#FF6D6D" opacity="0.15" />
          <text x="1010" y="713" fontSize="16" fill="#FF6D6D" textAnchor="middle" fontFamily="monospace" fontWeight="600">FEEDBACK</text>

          {[
            { label: 'Tech', score: '9.5', y: 750 },
            { label: 'Business', score: '9.0', y: 785 },
            { label: 'Academic', score: '9.1', y: 820 }
          ].map((item, i) => (
            <g key={i}>
              <text x="920" y={item.y} fontSize="13" fill="#FF9B7D" fontFamily="monospace">{item.label}</text>
              <rect x="1010" y={item.y - 11} width="90" height="6" rx="3" fill="#0B1020" opacity="0.5" />
              <rect x="1010" y={item.y - 11} width={parseFloat(item.score) * 9} height="6" rx="3" fill="#FF6D6D" opacity="0.8">
                {animate && <animate attributeName="width" from="0" to={parseFloat(item.score) * 9} dur="2s" fill="freeze" begin={`${i * 0.3}s`} />}
              </rect>
              <text x="1105" y={item.y} fontSize="15" fill="#FF6D6D" textAnchor="end" fontFamily="monospace" fontWeight="700">{item.score}</text>
            </g>
          ))}
        </g>

        {/* Data particles */}
        {animate && (
          <g>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const radian = (angle - 90) * (Math.PI / 180);
              const radius = 180;
              const x = 600 + Math.cos(radian) * radius;
              const y = 280 + Math.sin(radian) * radius;

              return (
                <circle key={i} r="3" fill="url(#coral-hot)" opacity="0.8" filter="url(#generate-glow)">
                  <animateMotion dur="3s" repeatCount="indefinite" path={`M ${x},${y} L 600,280`} begin={`${i * 0.5}s`} />
                </circle>
              );
            })}
          </g>
        )}

        {/* System label (bottom-center) */}
        <g opacity="0.6">
          <text x="600" y="800" fontSize="22" fill="#FF6D6D" textAnchor="middle" fontFamily="monospace" fontWeight="700" letterSpacing="2">
            AI WRITING SYSTEM
          </text>
          <text x="600" y="825" fontSize="13" fill="#FF9B7D" textAnchor="middle" fontFamily="monospace" letterSpacing="1">
            6-AGENT COLLABORATION
          </text>
        </g>
      </svg>

      <style jsx>{`
        @keyframes generate-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes generate-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        @keyframes generate-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 16; }
        }

        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .animate-generate-pulse {
          animation: generate-pulse 3s ease-in-out infinite;
        }

        .animate-generate-glow {
          animation: generate-glow 3s ease-in-out infinite;
        }

        .animate-generate-flow {
          animation: generate-flow 5s linear infinite;
        }

        .animate-card-float {
          animation: card-float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
