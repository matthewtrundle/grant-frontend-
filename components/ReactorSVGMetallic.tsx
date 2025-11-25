/**
 * Metallic/Spacey Agentic Reactor - SVG Version
 *
 * A photo-realistic metallic SVG reactor visualization featuring:
 * - 5 horizontal agent nodes with polished chrome rings
 * - Dual connecting rails with brushed metal aesthetic
 * - Animated metallic data pellets
 * - Industrial chrome, steel gray, and dark metal color palette
 * - Realistic metallic gradients mimicking environment reflections
 *
 * Metallic colors: Chrome (#C0C5CC), Steel Gray (#ADBAC0), Dark Metal (#606872)
 */

'use client';

import React from 'react';

interface ReactorSVGMetallicProps {
  className?: string;
  animate?: boolean;
}

export function ReactorSVGMetallic({ className = '', animate = true }: ReactorSVGMetallicProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <svg
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 24px rgba(192, 200, 210, 0.25))' }}
      >
        {/* Definitions: Gradients and Filters */}
        <defs>
          {/* Polished chrome gradient (realistic metal reflection) */}
          <linearGradient id="metallic-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" /> {/* Bright highlight */}
            <stop offset="35%" stopColor="rgba(200,208,218,0.9)" /> {/* Chrome mid-tone */}
            <stop offset="65%" stopColor="rgba(160,170,185,0.7)" /> {/* Steel gray */}
            <stop offset="100%" stopColor="rgba(96,104,114,0.5)" /> {/* Dark metal shadow */}
          </linearGradient>

          {/* Brushed metal gradient (slightly rougher surface) */}
          <linearGradient id="brushed-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(220,225,230,0.85)" />
            <stop offset="50%" stopColor="rgba(173,186,192,0.75)" />
            <stop offset="100%" stopColor="rgba(130,140,150,0.6)" />
          </linearGradient>

          {/* Dark industrial metal */}
          <linearGradient id="dark-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(96,104,114,0.8)" />
            <stop offset="50%" stopColor="rgba(70,78,88,0.7)" />
            <stop offset="100%" stopColor="rgba(45,52,62,0.6)" />
          </linearGradient>

          {/* Inner glow gradient (cool metallic) */}
          <radialGradient id="inner-glow">
            <stop offset="0%" stopColor="#C8D0DA" stopOpacity="0.7" /> {/* Chrome center */}
            <stop offset="50%" stopColor="#8A95A5" stopOpacity="0.4" /> {/* Steel mid */}
            <stop offset="100%" stopColor="rgba(96,104,114,0)" stopOpacity="0" />
          </radialGradient>

          {/* Cool metallic accent gradient */}
          <linearGradient id="metal-accent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B0B8C5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7A8590" stopOpacity="0.3" />
          </linearGradient>

          {/* Glow filter for nodes */}
          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Soft shadow filter */}
          <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* DATA RAILS - Dual connecting lines */}
        <g id="data-rails" opacity="0.7">
          {/* Upper rail - polished chrome */}
          <line
            x1="100"
            y1="160"
            x2="1100"
            y2="160"
            stroke="url(#metallic-ring)"
            strokeWidth="2.5"
            strokeDasharray="8,4"
            className={animate ? 'animate-rail-shimmer' : ''}
          />

          {/* Lower rail - polished chrome */}
          <line
            x1="100"
            y1="240"
            x2="1100"
            y2="240"
            stroke="url(#metallic-ring)"
            strokeWidth="2.5"
            strokeDasharray="8,4"
            className={animate ? 'animate-rail-shimmer' : ''}
            style={{ animationDelay: '0.5s' }}
          />

          {/* Central spine - brushed metal */}
          <line
            x1="100"
            y1="200"
            x2="1100"
            y2="200"
            stroke="url(#brushed-metal)"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </g>

        {/* AGENT NODE 1 - Left */}
        <g id="agent-node-1" transform="translate(150, 200)" className={animate ? 'animate-node-glow' : ''}>
          {/* Outer ring */}
          <circle
            r="45"
            fill="none"
            stroke="url(#metallic-ring)"
            strokeWidth="2"
            opacity="0.7"
            filter="url(#soft-shadow)"
          />

          {/* Middle ring */}
          <circle
            r="35"
            fill="none"
            stroke="url(#metallic-ring)"
            strokeWidth="1.5"
            opacity="0.5"
          />

          {/* Inner core */}
          <circle
            r="25"
            fill="url(#inner-glow)"
            filter="url(#glow-filter)"
          />

          {/* Center dot - bright chrome highlight */}
          <circle
            r="8"
            fill="#E0E5EA"
            opacity="0.95"
          />

          {/* Accent arcs - dark metal detail */}
          <path
            d="M -30,-30 A 42 42 0 0 1 30,-30"
            fill="none"
            stroke="url(#dark-metal)"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </g>

        {/* AGENT NODE 2 */}
        <g id="agent-node-2" transform="translate(350, 200)" className={animate ? 'animate-node-glow' : ''} style={{ animationDelay: '0.3s' }}>
          <circle r="45" fill="none" stroke="url(#metallic-ring)" strokeWidth="2" opacity="0.7" filter="url(#soft-shadow)" />
          <circle r="35" fill="none" stroke="url(#metallic-ring)" strokeWidth="1.5" opacity="0.5" />
          <circle r="25" fill="url(#inner-glow)" filter="url(#glow-filter)" />
          <circle r="8" fill="#E0E5EA" opacity="0.95" />
          <path d="M -30,-30 A 42 42 0 0 1 30,-30" fill="none" stroke="url(#dark-metal)" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* AGENT NODE 3 - Central (largest) */}
        <g id="agent-node-3" transform="translate(600, 200)" className={animate ? 'animate-node-glow' : ''} style={{ animationDelay: '0.6s' }}>
          <circle r="55" fill="none" stroke="url(#metallic-ring)" strokeWidth="2.5" opacity="0.8" filter="url(#soft-shadow)" />
          <circle r="45" fill="none" stroke="url(#metallic-ring)" strokeWidth="2" opacity="0.6" />
          <circle r="32" fill="url(#inner-glow)" filter="url(#glow-filter)" />
          <circle r="12" fill="#D0D8E0" opacity="1" /> {/* Bright polished chrome center */}
          <path d="M -35,-35 A 50 50 0 0 1 35,-35" fill="none" stroke="url(#dark-metal)" strokeWidth="2" opacity="0.7" />

          {/* Central node gets extra accent ring - brushed metal */}
          <circle r="65" fill="none" stroke="url(#brushed-metal)" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,6" />
        </g>

        {/* AGENT NODE 4 */}
        <g id="agent-node-4" transform="translate(850, 200)" className={animate ? 'animate-node-glow' : ''} style={{ animationDelay: '0.9s' }}>
          <circle r="45" fill="none" stroke="url(#metallic-ring)" strokeWidth="2" opacity="0.7" filter="url(#soft-shadow)" />
          <circle r="35" fill="none" stroke="url(#metallic-ring)" strokeWidth="1.5" opacity="0.5" />
          <circle r="25" fill="url(#inner-glow)" filter="url(#glow-filter)" />
          <circle r="8" fill="#E0E5EA" opacity="0.95" />
          <path d="M -30,-30 A 42 42 0 0 1 30,-30" fill="none" stroke="url(#dark-metal)" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* AGENT NODE 5 - Right */}
        <g id="agent-node-5" transform="translate(1050, 200)" className={animate ? 'animate-node-glow' : ''} style={{ animationDelay: '1.2s' }}>
          <circle r="45" fill="none" stroke="url(#metallic-ring)" strokeWidth="2" opacity="0.7" filter="url(#soft-shadow)" />
          <circle r="35" fill="none" stroke="url(#metallic-ring)" strokeWidth="1.5" opacity="0.5" />
          <circle r="25" fill="url(#inner-glow)" filter="url(#glow-filter)" />
          <circle r="8" fill="#E0E5EA" opacity="0.95" />
          <path d="M -30,-30 A 42 42 0 0 1 30,-30" fill="none" stroke="url(#dark-metal)" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* DATA PELLETS - Metallic animated particles on rails */}
        {animate && (
          <g id="data-pellets">
            {/* Pellet 1 - Upper rail (bright chrome) */}
            <circle
              r="6"
              fill="#D8E0E8"
              opacity="0.9"
              filter="url(#glow-filter)"
              className="animate-data-flow-upper"
            >
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path="M 100,160 L 1100,160"
              />
            </circle>

            {/* Pellet 2 - Upper rail (steel gray, delayed) */}
            <circle
              r="6"
              fill="#B0B8C5"
              opacity="0.85"
              filter="url(#glow-filter)"
              className="animate-data-flow-upper"
            >
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path="M 100,160 L 1100,160"
                begin="3s"
              />
            </circle>

            {/* Pellet 3 - Lower rail (brushed metal) */}
            <circle
              r="6"
              fill="#A0AAB8"
              opacity="0.9"
              filter="url(#glow-filter)"
              className="animate-data-flow-lower"
            >
              <animateMotion
                dur="10s"
                repeatCount="indefinite"
                path="M 100,240 L 1100,240"
              />
            </circle>

            {/* Pellet 4 - Lower rail (polished chrome, delayed) */}
            <circle
              r="6"
              fill="#C8D0DC"
              opacity="0.85"
              filter="url(#glow-filter)"
              className="animate-data-flow-lower"
            >
              <animateMotion
                dur="10s"
                repeatCount="indefinite"
                path="M 100,240 L 1100,240"
                begin="4s"
              />
            </circle>

            {/* Pellet 5 - Central spine (bright highlight) */}
            <circle
              r="5"
              fill="rgba(240,245,250,0.7)"
              opacity="0.6"
              filter="url(#glow-filter)"
            >
              <animateMotion
                dur="12s"
                repeatCount="indefinite"
                path="M 100,200 L 1100,200"
              />
            </circle>
          </g>
        )}
      </svg>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes node-glow {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.4);
          }
        }

        @keyframes rail-shimmer {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-node-glow {
          animation: node-glow 4s ease-in-out infinite;
        }

        .animate-rail-shimmer {
          animation: rail-shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
