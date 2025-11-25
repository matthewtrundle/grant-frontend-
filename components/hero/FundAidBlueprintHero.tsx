/**
 * FundAid Blueprint Hero Image
 *
 * Engineered AI system diagram - blueprint aesthetic
 * Dark navy background, thin neon teal linework, crisp vector geometry
 * 2400x1400 resolution, landscape orientation
 */

'use client';

import React from 'react';

export function FundAidBlueprintHero() {
  return (
    <svg
      viewBox="0 0 2400 1400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      style={{ maxWidth: '2400px' }}
    >
      <defs>
        {/* Neon teal color definitions */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

            .blueprint-text {
              font-family: 'Orbitron', monospace;
              fill: #35F2C7;
              text-anchor: middle;
            }
            .blueprint-title {
              font-family: 'Orbitron', monospace;
              font-weight: 900;
              fill: url(#titleGradient);
              text-anchor: middle;
              letter-spacing: 8px;
              filter: drop-shadow(0 0 20px rgba(53, 242, 199, 0.8)) drop-shadow(0 0 40px rgba(53, 242, 199, 0.4));
              animation: titlePulse 3s ease-in-out infinite;
            }
            .blueprint-subtitle {
              font-family: 'Orbitron', monospace;
              font-weight: 400;
              fill: #1EE2D0;
              text-anchor: middle;
              letter-spacing: 2px;
              filter: drop-shadow(0 0 10px rgba(30, 226, 208, 0.6));
            }
            .agent-label {
              font-family: 'Orbitron', monospace;
              font-weight: 700;
              fill: #35F2C7;
              text-anchor: middle;
              font-size: 14px;
            }
            .micro-text {
              font-family: 'Courier New', monospace;
              fill: #35F2C7;
              opacity: 0.15;
              font-size: 8px;
            }

            @keyframes titlePulse {
              0%, 100% {
                filter: drop-shadow(0 0 20px rgba(53, 242, 199, 0.8)) drop-shadow(0 0 40px rgba(53, 242, 199, 0.4));
              }
              50% {
                filter: drop-shadow(0 0 30px rgba(53, 242, 199, 1)) drop-shadow(0 0 60px rgba(53, 242, 199, 0.6)) drop-shadow(0 0 80px rgba(168, 140, 255, 0.3));
              }
            }
          `}
        </style>

        {/* Gradient for title text */}
        <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#35F2C7" />
          <stop offset="50%" stopColor="#1EE2D0" />
          <stop offset="100%" stopColor="#A88CFF" />
        </linearGradient>

        {/* Glowing stroke for title */}
        <filter id="titleGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Dark navy background */}
      <rect width="2400" height="1400" fill="#0A0F1C" />

      {/* Technical blueprint grid - ultra subtle */}
      <g opacity="0.015">
        {/* Vertical lines */}
        {Array.from({ length: 25 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 100}
            y1="0"
            x2={i * 100}
            y2="1400"
            stroke="#35F2C7"
            strokeWidth="1"
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 100}
            x2="2400"
            y2={i * 100}
            stroke="#1EE2D0"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* Blueprint crosshairs in corners */}
      <g stroke="#35F2C7" strokeWidth="2" opacity="0.4">
        {/* Top-left crosshair */}
        <circle cx="100" cy="100" r="30" fill="none" />
        <line x1="70" y1="100" x2="130" y2="100" />
        <line x1="100" y1="70" x2="100" y2="130" />
        <text x="100" y="180" className="micro-text" textAnchor="middle">REF-001</text>

        {/* Top-right crosshair */}
        <circle cx="2300" cy="100" r="30" fill="none" />
        <line x1="2270" y1="100" x2="2330" y2="100" />
        <line x1="2300" y1="70" x2="2300" y2="130" />
        <text x="2300" y="180" className="micro-text" textAnchor="middle">REF-002</text>

        {/* Bottom-left crosshair */}
        <circle cx="100" cy="1300" r="30" fill="none" />
        <line x1="70" y1="1300" x2="130" y2="1300" />
        <line x1="100" y1="1270" x2="100" y2="1330" />
        <text x="100" y="1250" className="micro-text" textAnchor="middle">REF-003</text>

        {/* Bottom-right crosshair */}
        <circle cx="2300" cy="1300" r="30" fill="none" />
        <line x1="2270" y1="1300" x2="2330" y2="1300" />
        <line x1="2300" y1="1270" x2="2300" y2="1330" />
        <text x="2300" y="1250" className="micro-text" textAnchor="middle">REF-004</text>
      </g>

      {/* Measurement ticks - top */}
      <g stroke="#35F2C7" strokeWidth="1" opacity="0.2">
        {Array.from({ length: 12 }).map((_, i) => (
          <React.Fragment key={`tick-t-${i}`}>
            <line x1={200 + i * 180} y1="50" x2={200 + i * 180} y2="70" />
            <text x={200 + i * 180} y="40" className="micro-text" textAnchor="middle">{i * 20}</text>
          </React.Fragment>
        ))}
      </g>

      {/* Measurement ticks - bottom */}
      <g stroke="#35F2C7" strokeWidth="1" opacity="0.2">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`tick-b-${i}`} x1={200 + i * 180} y1="1330" x2={200 + i * 180} y2="1350" />
        ))}
      </g>

      {/* Central AI CORE hexagon */}
      <g transform="translate(1200, 700)">
        {/* Large central hexagon */}
        <polygon
          points="0,-200 173,-100 173,100 0,200 -173,100 -173,-100"
          fill="none"
          stroke="#35F2C7"
          strokeWidth="4"
        />
        {/* Inner detail hexagon */}
        <polygon
          points="0,-160 138,-80 138,80 0,160 -138,80 -138,-80"
          fill="none"
          stroke="#1EE2D0"
          strokeWidth="2"
          opacity="0.6"
        />
        {/* Innermost hexagon */}
        <polygon
          points="0,-120 104,-60 104,60 0,120 -104,60 -104,-60"
          fill="none"
          stroke="#A88CFF"
          strokeWidth="2"
          opacity="0.4"
        />

        {/* Corner brackets for engineering aesthetic */}
        <g stroke="#35F2C7" strokeWidth="2">
          {/* Top corner */}
          <path d="M -20,-200 L 0,-220 L 20,-200" fill="none" />
          {/* Top-right corner */}
          <path d="M 153,-100 L 173,-80 L 193,-100" fill="none" />
          {/* Bottom-right corner */}
          <path d="M 153,100 L 173,120 L 193,100" fill="none" />
          {/* Bottom corner */}
          <path d="M -20,200 L 0,220 L 20,200" fill="none" />
          {/* Bottom-left corner */}
          <path d="M -193,100 L -173,120 L -153,100" fill="none" />
          {/* Top-left corner */}
          <path d="M -193,-100 L -173,-80 L -153,-100" fill="none" />
        </g>

        {/* Center labels with enhanced text treatment */}
        {/* Title with stroke outline for extra pop */}
        <text
          y="-30"
          className="blueprint-title"
          fontSize="80"
          stroke="rgba(53, 242, 199, 0.3)"
          strokeWidth="2"
          paintOrder="stroke"
        >
          FUND AID
        </text>

        {/* Subtitles with glow */}
        <text y="20" className="blueprint-subtitle" fontSize="18">Stop Writing Grants.</text>
        <text y="45" className="blueprint-subtitle" fontSize="18">Start Winning Them.</text>

        {/* AI CORE label above */}
        <text y="-250" className="agent-label" fontSize="16" opacity="0.7">AI CORE</text>
        <rect x="-50" y="-270" width="100" height="2" fill="#35F2C7" opacity="0.4" />
      </g>

      {/* Agent Module A-01 PROFILE - Top-left (Cyan) */}
      <g transform="translate(450, 300)">
        <polygon
          points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30"
          fill="#101722"
          stroke="#35F2C7"
          strokeWidth="2"
          filter="drop-shadow(0 0 8px rgba(53, 242, 199, 0.4))"
        />
        <text y="-5" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#35F2C7', textAnchor: 'middle', fontSize: '12px'}}>A-01</text>
        <text y="15" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#35F2C7', textAnchor: 'middle', fontSize: '11px', opacity: 0.7}}>PROFILE</text>
        {/* Corner markers */}
        <circle cx="0" cy="-60" r="4" fill="#35F2C7" />
        <rect x="-3" y="-75" width="6" height="10" fill="#35F2C7" opacity="0.3" />
        {/* Data counter */}
        <rect x="-30" y="70" width="60" height="18" fill="none" stroke="#35F2C7" strokeWidth="1" opacity="0.5" />
        <text x="0" y="82" className="micro-text" textAnchor="middle" fontSize="10" opacity="0.7" fill="#35F2C7">TRL-9</text>
      </g>

      {/* Agent Module A-02 DISCOVERY - Top-right (Blue) */}
      <g transform="translate(1950, 280)">
        <polygon
          points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30"
          fill="#101722"
          stroke="#6366F1"
          strokeWidth="2"
          filter="drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))"
        />
        <text y="-5" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#6366F1', textAnchor: 'middle', fontSize: '12px'}}>A-02</text>
        <text y="15" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#6366F1', textAnchor: 'middle', fontSize: '11px', opacity: 0.7}}>DISCOVERY</text>
        <circle cx="0" cy="-60" r="4" fill="#6366F1" />
        <rect x="-3" y="-75" width="6" height="10" fill="#6366F1" opacity="0.3" />
        <rect x="-30" y="70" width="60" height="18" fill="none" stroke="#6366F1" strokeWidth="1" opacity="0.5" />
        <text x="0" y="82" className="micro-text" textAnchor="middle" fontSize="10" opacity="0.7" fill="#6366F1">RANK-A</text>
      </g>

      {/* Agent Module A-03 ANALYSIS - Middle-left (Purple) */}
      <g transform="translate(350, 700)">
        <rect
          x="-70"
          y="-50"
          width="140"
          height="100"
          rx="8"
          fill="#101722"
          stroke="#A88CFF"
          strokeWidth="2"
          filter="drop-shadow(0 0 8px rgba(168, 140, 255, 0.4))"
        />
        <text y="-5" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#A88CFF', textAnchor: 'middle', fontSize: '12px'}}>A-03</text>
        <text y="15" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#A88CFF', textAnchor: 'middle', fontSize: '11px', opacity: 0.7}}>ANALYSIS</text>
        {/* Chip indicators */}
        <rect x="-50" y="60" width="20" height="20" fill="none" stroke="#A88CFF" strokeWidth="1" opacity="0.6" />
        <rect x="-20" y="60" width="20" height="20" fill="none" stroke="#A88CFF" strokeWidth="1" opacity="0.6" />
        <rect x="10" y="60" width="20" height="20" fill="none" stroke="#A88CFF" strokeWidth="1" opacity="0.6" />
        <rect x="40" y="60" width="20" height="20" fill="none" stroke="#A88CFF" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Agent Module A-04 MATCHING - Middle-right (Green) */}
      <g transform="translate(2050, 720)">
        <rect
          x="-70"
          y="-50"
          width="140"
          height="100"
          rx="8"
          fill="#101722"
          stroke="#10B981"
          strokeWidth="2"
          filter="drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))"
        />
        <text y="-5" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#10B981', textAnchor: 'middle', fontSize: '12px'}}>A-04</text>
        <text y="15" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#10B981', textAnchor: 'middle', fontSize: '11px', opacity: 0.7}}>MATCHING</text>
        <circle cx="0" cy="60" r="8" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.6" />
        <path d="M -6,60 L 0,66 L 6,54" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.8" />
      </g>

      {/* Agent Module A-05 WRITING - Bottom-left (Orange) */}
      <g transform="translate(550, 1100)">
        <polygon
          points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30"
          fill="#101722"
          stroke="#F97316"
          strokeWidth="2"
          filter="drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))"
        />
        <text y="-5" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#F97316', textAnchor: 'middle', fontSize: '12px'}}>A-05</text>
        <text y="15" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#F97316', textAnchor: 'middle', fontSize: '11px', opacity: 0.7}}>WRITING</text>
        <circle cx="0" cy="-60" r="4" fill="#F97316" />
        <rect x="-3" y="-75" width="6" height="10" fill="#F97316" opacity="0.3" />
        {/* Progress bar */}
        <rect x="-30" y="70" width="60" height="6" fill="none" stroke="#F97316" strokeWidth="1" opacity="0.5" />
        <rect x="-30" y="70" width="45" height="6" fill="#F97316" opacity="0.4" />
      </g>

      {/* Agent Module A-06 QUALITY - Bottom-right (Pink) */}
      <g transform="translate(1850, 1120)">
        <polygon
          points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30"
          fill="#101722"
          stroke="#EC4899"
          strokeWidth="2"
          filter="drop-shadow(0 0 8px rgba(236, 72, 153, 0.4))"
        />
        <text y="-5" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#EC4899', textAnchor: 'middle', fontSize: '12px'}}>A-06</text>
        <text y="15" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#EC4899', textAnchor: 'middle', fontSize: '11px', opacity: 0.7}}>QUALITY</text>
        <circle cx="0" cy="-60" r="4" fill="#EC4899" />
        <rect x="-3" y="-75" width="6" height="10" fill="#EC4899" opacity="0.3" />
        {/* Quality score */}
        <text x="0" y="82" style={{fontFamily: 'Orbitron, monospace', fontWeight: 700, fill: '#EC4899', textAnchor: 'middle', fontSize: '16px', opacity: 0.9}}>9.7</text>
      </g>

      {/* Data flow lines - thin connecting lines with arrows */}
      <g stroke="#35F2C7" strokeWidth="1.5" fill="none" opacity="0.5">
        {/* A-01 PROFILE → AI CORE */}
        <path d="M 502,330 L 900,550" markerEnd="url(#arrowhead)" />

        {/* A-02 DISCOVERY → AI CORE */}
        <path d="M 1898,310 L 1500,550" markerEnd="url(#arrowhead)" />

        {/* A-03 ANALYSIS → AI CORE */}
        <path d="M 490,700 L 900,700" markerEnd="url(#arrowhead)" />

        {/* A-04 MATCHING → AI CORE */}
        <path d="M 1980,720 L 1500,710" markerEnd="url(#arrowhead)" />

        {/* A-05 WRITING → AI CORE */}
        <path d="M 602,1070 L 1050,870" markerEnd="url(#arrowhead)" />

        {/* A-06 QUALITY → AI CORE */}
        <path d="M 1798,1090 L 1350,870" markerEnd="url(#arrowhead)" />

        {/* Inter-agent connections */}
        <path d="M 502,360 L 1898,340" stroke="#1EE2D0" opacity="0.3" strokeDasharray="10,5" />
        <path d="M 420,750 L 420,1050" stroke="#1EE2D0" opacity="0.3" strokeDasharray="10,5" />
        <path d="M 2020,770 L 1920,1060" stroke="#1EE2D0" opacity="0.3" strokeDasharray="10,5" />
      </g>

      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#35F2C7" />
        </marker>
      </defs>

      {/* Small data flow indicators (animated dots would be here in interactive version) */}
      <g fill="#35F2C7" opacity="0.6">
        <circle cx="700" cy="440" r="3" />
        <circle cx="1700" cy="430" r="3" />
        <circle cx="700" cy="700" r="3" />
        <circle cx="1700" cy="715" r="3" />
        <circle cx="826" cy="785" r="3" />
        <circle cx="1574" cy="790" r="3" />
      </g>

      {/* Node ID boxes - small technical annotations */}
      <g className="micro-text" opacity="0.25">
        <text x="450" y="250">NODE_001_ACTIVE</text>
        <text x="1950" y="230">NODE_002_ACTIVE</text>
        <text x="350" y="640">NODE_003_ACTIVE</text>
        <text x="2050" y="660">NODE_004_ACTIVE</text>
        <text x="550" y="1050">NODE_005_ACTIVE</text>
        <text x="1850" y="1070">NODE_006_ACTIVE</text>
      </g>

      {/* Technical blueprint micro-text scattered */}
      <g className="micro-text">
        <text x="200" y="200">SCHEMA_V2.3.1</text>
        <text x="2100" y="200">LATENCY_12MS</text>
        <text x="200" y="1200">UPTIME_99.99%</text>
        <text x="2100" y="1200">NODES_SYNCED</text>
        <text x="100" y="700">VECTOR_ALIGNED</text>
        <text x="2200" y="700">MESH_OPTIMAL</text>
      </g>

      {/* Bottom blueprint info bar */}
      <g opacity="0.3">
        <line x1="200" y1="1360" x2="2200" y2="1360" stroke="#35F2C7" strokeWidth="1" />
        <text x="250" y="1385" className="micro-text" textAnchor="start">FUNDAID-CORE-ARCHITECTURE-BLUEPRINT</text>
        <text x="1200" y="1385" className="micro-text">REVISION_3.0</text>
        <text x="2150" y="1385" className="micro-text" textAnchor="end">2025-01-25</text>
      </g>

      {/* Top system status bar */}
      <g opacity="0.3">
        <line x1="200" y1="40" x2="2200" y2="40" stroke="#35F2C7" strokeWidth="1" />
        <text x="250" y="30" className="micro-text" textAnchor="start">SYSTEM_STATUS: OPERATIONAL</text>
        <text x="1200" y="30" className="micro-text">AI_AGENTS: 6/6</text>
        <text x="2150" y="30" className="micro-text" textAnchor="end">CONNECTIONS: SECURE</text>
      </g>

      {/* Small UI element boxes */}
      <g stroke="#1EE2D0" strokeWidth="1" fill="none" opacity="0.3">
        <rect x="180" y="400" width="80" height="40" rx="4" />
        <text x="220" y="425" className="micro-text" textAnchor="middle" opacity="0.6">PROC-01</text>

        <rect x="2140" y="420" width="80" height="40" rx="4" />
        <text x="2180" y="445" className="micro-text" textAnchor="middle" opacity="0.6">PROC-02</text>

        <rect x="180" y="900" width="80" height="40" rx="4" />
        <text x="220" y="925" className="micro-text" textAnchor="middle" opacity="0.6">PROC-03</text>

        <rect x="2140" y="920" width="80" height="40" rx="4" />
        <text x="2180" y="945" className="micro-text" textAnchor="middle" opacity="0.6">PROC-04</text>
      </g>
    </svg>
  );
}
