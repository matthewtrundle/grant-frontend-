/**
 * FundAidTimelineBackground
 *
 * Advanced blueprint/alien aircraft technical diagrams for the Process Timeline.
 * Highly detailed technical schematics with cross-fades between stages.
 * Think: extraterrestrial engineering blueprints, technical wireframes, advanced architectural diagrams.
 */

import React from 'react';

type FundAidTimelineBackgroundProps = {
  stage: 1 | 2 | 3 | 4;
};

export default function FundAidTimelineBackground({ stage }: FundAidTimelineBackgroundProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Stage 1: PROFILE - Radar/Scanning System Blueprint */}
      <g style={{ opacity: stage === 1 ? 1 : 0, transition: 'opacity 600ms ease' }}>
        {/* Central scanning hub */}
        <g transform="translate(1100, 450)">
          {/* Core */}
          <circle r="40" stroke="rgba(47,180,158,0.3)" strokeWidth="2" fill="none" />
          <circle r="30" stroke="rgba(47,180,158,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />

          {/* Scanning rings */}
          <circle r="120" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <circle r="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" strokeDasharray="8 8" />
          <circle r="280" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" fill="none" strokeDasharray="12 12" />

          {/* Radar sweep lines (8 directions) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="0"
              y1="0"
              x2={Math.cos(angle * Math.PI / 180) * 280}
              y2={Math.sin(angle * Math.PI / 180) * 280}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          ))}

          {/* Data nodes at ring intersections */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <g key={angle}>
              <circle
                cx={Math.cos(angle * Math.PI / 180) * 200}
                cy={Math.sin(angle * Math.PI / 180) * 200}
                r="4"
                fill="rgba(47,180,158,0.6)"
              />
              <circle
                cx={Math.cos(angle * Math.PI / 180) * 200}
                cy={Math.sin(angle * Math.PI / 180) * 200}
                r="8"
                stroke="rgba(47,180,158,0.3)"
                strokeWidth="1"
                fill="none"
              />
            </g>
          ))}
        </g>

        {/* Technical annotation boxes */}
        <rect x="950" y="200" width="80" height="40" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
        <line x1="1015" y1="240" x2="1070" y2="320" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="4 4" />

        <rect x="1200" y="650" width="90" height="45" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
        <line x1="1245" y1="650" x2="1140" y2="530" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      {/* Stage 2: DISCOVERY - Database Grid / Matrix Architecture */}
      <g style={{ opacity: stage === 2 ? 1 : 0, transition: 'opacity 600ms ease' }}>
        {/* Primary grid system */}
        <g>
          {/* Vertical columns */}
          {[850, 970, 1090, 1210, 1330, 1450].map((x, i) => (
            <line
              key={`v-${i}`}
              x1={x}
              y1="150"
              x2={x}
              y2="750"
              stroke={i === 2 ? "rgba(47,180,158,0.20)" : "rgba(255,255,255,0.12)"}
              strokeWidth={i === 2 ? "2" : "1.5"}
            />
          ))}

          {/* Horizontal rows */}
          {[200, 300, 400, 500, 600, 700].map((y, i) => (
            <line
              key={`h-${i}`}
              x1="850"
              y1={y}
              x2="1450"
              y2={y}
              stroke={i === 2 ? "rgba(47,180,158,0.18)" : "rgba(255,255,255,0.10)"}
              strokeWidth={i === 2 ? "1.5" : "1"}
              strokeDasharray="8 8"
            />
          ))}
        </g>

        {/* Data cells at intersections */}
        {[970, 1090, 1210, 1330].map((x) =>
          [300, 400, 500, 600].map((y) => (
            <g key={`${x}-${y}`}>
              <rect
                x={x - 15}
                y={y - 15}
                width="30"
                height="30"
                stroke="rgba(47,180,158,0.3)"
                strokeWidth="1"
                fill="rgba(47,180,158,0.05)"
              />
              <line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke="rgba(47,180,158,0.4)" strokeWidth="1" />
              <line x1={x} y1={y - 10} x2={x} y2={y + 10} stroke="rgba(47,180,158,0.4)" strokeWidth="1" />
            </g>
          ))
        )}

        {/* Corner registration marks */}
        {[[850, 150], [1450, 150], [850, 750], [1450, 750]].map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={x + (i % 2 === 0 ? 20 : -20)} y2={y} stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <line x1={x} y1={y} x2={x} y2={y + (i < 2 ? 20 : -20)} stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          </g>
        ))}
      </g>

      {/* Stage 3: ANALYSIS - Energy Beam / Particle Accelerator */}
      <g style={{ opacity: stage === 3 ? 1 : 0, transition: 'opacity 600ms ease' }}>
        {/* Converging beam paths */}
        <path
          d="M 750 100 L 1050 450 L 1050 450"
          stroke="rgba(47,180,158,0.20)"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M 1450 100 L 1150 450 L 1150 450"
          stroke="rgba(47,180,158,0.20)"
          strokeWidth="3"
          fill="none"
        />

        {/* Funnel containment field */}
        <line x1="820" y1="180" x2="1000" y2="720" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <line x1="1380" y1="180" x2="1200" y2="720" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

        {/* Energy stratification layers */}
        {[
          { y: 250, w: 450 },
          { y: 380, w: 320 },
          { y: 510, w: 190 },
          { y: 640, w: 100 }
        ].map(({ y, w }, i) => (
          <g key={i}>
            <line
              x1={1100 - w/2}
              y1={y}
              x2={1100 + w/2}
              y2={y}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
            />
            <circle cx={1100 - w/2} cy={y} r="3" fill="rgba(47,180,158,0.5)" />
            <circle cx={1100 + w/2} cy={y} r="3" fill="rgba(47,180,158,0.5)" />
          </g>
        ))}

        {/* Central focusing array */}
        <circle cx="1100" cy="720" r="60" stroke="rgba(47,180,158,0.25)" strokeWidth="2" fill="none" />
        <circle cx="1100" cy="720" r="50" stroke="rgba(47,180,158,0.15)" strokeWidth="1" fill="none" strokeDasharray="4 4" />

        {/* Particle injection points */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <line
            key={angle}
            x1={1100 + Math.cos(angle * Math.PI / 180) * 50}
            y1={720 + Math.sin(angle * Math.PI / 180) * 50}
            x2={1100 + Math.cos(angle * Math.PI / 180) * 70}
            y2={720 + Math.sin(angle * Math.PI / 180) * 70}
            stroke="rgba(47,180,158,0.3)"
            strokeWidth="2"
          />
        ))}
      </g>

      {/* Stage 4: GENERATION - Orbital Command Station / Satellite Network */}
      <g style={{ opacity: stage === 4 ? 1 : 0, transition: 'opacity 600ms ease' }}>
        {/* Central command hub */}
        <g transform="translate(1150, 420)">
          {/* Core reactor */}
          <circle r="50" stroke="rgba(47,180,158,0.25)" strokeWidth="2.5" fill="rgba(47,180,158,0.08)" />
          <circle r="40" stroke="rgba(47,180,158,0.20)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />

          {/* Rotating shield layers */}
          <circle r="110" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <circle r="180" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" strokeDasharray="12 12" />
          <circle r="260" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" fill="none" strokeDasharray="16 16" />

          {/* Orbital paths */}
          <ellipse rx="320" ry="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" transform="rotate(30)" />
          <ellipse rx="320" ry="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" transform="rotate(-30)" />
        </g>

        {/* Satellite nodes on orbital paths */}
        {[
          { angle: 0, r: 260 },
          { angle: 90, r: 260 },
          { angle: 180, r: 260 },
          { angle: 270, r: 260 }
        ].map(({ angle, r }, i) => (
          <g key={i} transform={`translate(${1150 + Math.cos(angle * Math.PI / 180) * r}, ${420 + Math.sin(angle * Math.PI / 180) * r})`}>
            {/* Satellite body */}
            <rect x="-12" y="-8" width="24" height="16" stroke="rgba(47,180,158,0.3)" strokeWidth="1.5" fill="rgba(47,180,158,0.1)" />

            {/* Solar panels */}
            <rect x="-28" y="-6" width="12" height="12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
            <rect x="16" y="-6" width="12" height="12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />

            {/* Communication link to center */}
            <line
              x1="0"
              y1="0"
              x2={-Math.cos(angle * Math.PI / 180) * r}
              y2={-Math.sin(angle * Math.PI / 180) * r}
              stroke="rgba(47,180,158,0.15)"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
          </g>
        ))}

        {/* Corner docking ports */}
        {[
          [900, 180], [1400, 180], [900, 660], [1400, 660]
        ].map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 20} y={y - 15} width="40" height="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
            <line x1={x - 15} y1={y - 10} x2={x - 15} y2={y + 10} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1={x + 15} y1={y - 10} x2={x + 15} y2={y + 10} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <circle cx={x} cy={y} r="5" fill="rgba(47,180,158,0.3)" />
          </g>
        ))}

        {/* Data transmission beams */}
        {[
          { x1: 1150, y1: 420, x2: 900, y2: 180 },
          { x1: 1150, y1: 420, x2: 1400, y2: 180 },
          { x1: 1150, y1: 420, x2: 900, y2: 660 },
          { x1: 1150, y1: 420, x2: 1400, y2: 660 }
        ].map(({ x1, y1, x2, y2 }, i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(47,180,158,0.10)"
            strokeWidth="1"
            strokeDasharray="8 8"
          />
        ))}
      </g>
    </svg>
  );
}
