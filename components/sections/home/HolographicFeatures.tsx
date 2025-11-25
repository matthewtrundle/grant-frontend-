/**
 * Holographic Features Section
 *
 * Premium hard-surface holographic UI cards for AI multi-agent system.
 * Aerospace-inspired design with floating translucent glass slabs,
 * metallic microframes, and soft cyan+violet hologram glow.
 *
 * Enhanced with interconnecting circuit lines and interactive hover effects.
 */

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Multi-Agent Intelligence',
    description: 'Specialized AI agents for profiling, discovery, analysis, and writing',
    metric: '4 stages',
    icon: '⚡',
  },
  {
    title: 'Smart Grant Matching',
    description: 'AI-powered discovery and scoring of relevant funding opportunities',
    metric: '92% match',
    icon: '🎯',
  },
  {
    title: 'RAG-Enhanced Writing',
    description: 'Generate winning proposals using successful grant examples',
    metric: '7.8/10 avg',
    icon: '✍️',
  },
  {
    title: 'Success Optimization',
    description: 'Continuous learning from assessor feedback and grant outcomes',
    metric: '40% win rate',
    icon: '📈',
  },
];

function HolographicCard({
  title,
  description,
  metric,
  icon,
  index,
  onHover
}: {
  title: string;
  description: string;
  metric: string;
  icon: string;
  index: number;
  onHover: (index: number | null) => void;
}) {
  return (
    <div
      className={cn(
        "group relative",
        "hover:scale-105 hover:-translate-y-2 transition-all duration-700 ease-out",
        "hover:z-10"
      )}
      style={{
        animationDelay: `${index * 150}ms`
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Underglow - soft cyan+violet - enhanced on hover */}
      <div className={cn(
        "absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100",
        "bg-gradient-to-br from-cyan-500/30 via-violet-500/30 to-cyan-500/30",
        "blur-2xl transition-all duration-700"
      )} />

      {/* Metallic microframe - brushed titanium - glows on hover */}
      <div className={cn(
        "absolute -inset-[0.5px] rounded-2xl transition-all duration-700",
        "bg-gradient-to-br from-slate-300/40 via-slate-400/30 to-slate-300/40",
        "group-hover:from-cyan-400/50 group-hover:via-violet-400/40 group-hover:to-cyan-400/50",
        "shadow-[0_0_1px_rgba(148,163,184,0.5)]",
        "group-hover:shadow-[0_0_8px_rgba(6,182,212,0.6)]"
      )} />

      {/* Main glass slab - translucent with beveled edges */}
      <div className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-slate-950/60 via-slate-900/50 to-slate-950/60",
        "backdrop-blur-xl border border-slate-700/30",
        "group-hover:border-cyan-400/40",
        "shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1),inset_0_-1px_0_0_rgba(71,85,105,0.3)]",
        "transition-all duration-700",
        "p-8"
      )}>

        {/* Chromatic dispersion edge highlight */}
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-70",
          "bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-400/5",
          "transition-opacity duration-700",
          "pointer-events-none"
        )} />

        {/* Blueprint-style circuitry lines (minimal) - animate on hover */}
        <div className={cn(
          "absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-30",
          "transition-opacity duration-700",
          "pointer-events-none"
        )}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Orbital curves */}
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-violet-400" />
            {/* Circuit lines */}
            <line x1="50" y1="20" x2="50" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
            <line x1="80" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-violet-400" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">

          {/* Icon - etched holographic style - enhanced hover */}
          <div className={cn(
            "flex items-center justify-center w-14 h-14 rounded-xl",
            "bg-gradient-to-br from-cyan-500/10 to-violet-500/10",
            "group-hover:from-cyan-500/20 group-hover:to-violet-500/20",
            "border border-cyan-400/20 group-hover:border-cyan-400/40",
            "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
            "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]",
            "transition-all duration-700",
            "group-hover:scale-110 group-hover:rotate-6"
          )}>
            <div className={cn(
              "text-2xl",
              "bg-gradient-to-br from-cyan-300 to-violet-300 bg-clip-text text-transparent",
              "filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]",
              "group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]",
              "transition-all duration-700"
            )}>
              {icon}
            </div>
          </div>

          {/* Title - etched into surface */}
          <div>
            <h3 className={cn(
              "text-xl font-semibold mb-2",
              "bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent",
              "tracking-tight",
              "filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            )}>
              {title}
            </h3>

            {/* Thin UI divider - etched tick marks - pulses on hover */}
            <div className="flex items-center gap-1 mb-4">
              <div className={cn(
                "h-[1px] flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent",
                "group-hover:from-cyan-500/60 transition-all duration-700"
              )} />
              <div className={cn(
                "w-1 h-1 rounded-full bg-cyan-400/50",
                "group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)]",
                "transition-all duration-700"
              )} />
              <div className={cn(
                "w-0.5 h-0.5 rounded-full bg-violet-400/50",
                "group-hover:bg-violet-400 group-hover:shadow-[0_0_6px_rgba(139,92,246,0.8)]",
                "transition-all duration-700"
              )} />
            </div>

            {/* Description */}
            <p className={cn(
              "text-sm leading-relaxed",
              "text-slate-400 group-hover:text-slate-300",
              "font-light tracking-wide",
              "transition-colors duration-700"
            )}>
              {description}
            </p>
          </div>

          {/* Metric - holographic projection - enhanced glow on hover */}
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-gradient-to-r from-cyan-500/5 to-violet-500/5",
            "group-hover:from-cyan-500/10 group-hover:to-violet-500/10",
            "border border-cyan-400/20 group-hover:border-cyan-400/40",
            "shadow-[0_0_15px_rgba(6,182,212,0.1)]",
            "group-hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]",
            "transition-all duration-700"
          )}>
            <div className={cn(
              "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse",
              "shadow-[0_0_6px_rgba(6,182,212,0.8)]",
              "group-hover:shadow-[0_0_12px_rgba(6,182,212,1)]",
              "transition-all duration-700"
            )} />
            <span className={cn(
              "text-sm font-mono font-medium",
              "bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent"
            )}>
              {metric}
            </span>
          </div>

        </div>

        {/* Subtle surface reflections - parallax overlay - enhanced */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "bg-gradient-to-tr from-cyan-400/10 via-transparent to-violet-400/10",
          "transition-opacity duration-700",
          "pointer-events-none"
        )} />

      </div>
    </div>
  );
}

function InterconnectingLines({ hoveredCard }: { hoveredCard: number | null }) {
  // Define connection paths between cards in 2x2 grid
  // Coordinates are approximate percentages for responsive layout
  const connections = [
    // Horizontal connections
    { from: 0, to: 1, path: 'M 25% 25% L 75% 25%' }, // Top row
    { from: 2, to: 3, path: 'M 25% 75% L 75% 75%' }, // Bottom row

    // Vertical connections
    { from: 0, to: 2, path: 'M 25% 25% L 25% 75%' }, // Left column
    { from: 1, to: 3, path: 'M 75% 25% L 75% 75%' }, // Right column

    // Diagonal connections
    { from: 0, to: 3, path: 'M 25% 25% L 75% 75%' }, // Top-left to bottom-right
    { from: 1, to: 2, path: 'M 75% 25% L 25% 75%' }, // Top-right to bottom-left
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        {/* Gradient for active lines */}
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.6" />
          <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0.6" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {connections.map((conn, i) => {
        const isActive = hoveredCard === conn.from || hoveredCard === conn.to;

        return (
          <g key={i}>
            {/* Base line - always visible, subtle */}
            <path
              d={conn.path}
              stroke="rgba(100, 116, 139, 0.15)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 4"
              className="transition-all duration-700"
            />

            {/* Active line - visible on hover */}
            <path
              d={conn.path}
              stroke="url(#lineGradient)"
              strokeWidth={isActive ? "2" : "0"}
              fill="none"
              filter={isActive ? "url(#glow)" : "none"}
              className="transition-all duration-700"
              style={{
                opacity: isActive ? 1 : 0
              }}
            >
              {isActive && (
                <animate
                  attributeName="stroke-dasharray"
                  values="0 100;100 0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </path>
          </g>
        );
      })}
    </svg>
  );
}

export function HolographicFeatures() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className={cn(
      "relative py-32",
      "overflow-hidden"
    )}>

      {/* Volumetric lighting - soft and subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute top-1/4 left-1/4 w-96 h-96 rounded-full",
          "bg-cyan-500/5 blur-[100px]",
          "animate-pulse"
        )} />
        <div className={cn(
          "absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full",
          "bg-violet-500/5 blur-[100px]",
          "animate-pulse"
        )}
        style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className={cn(
            "text-5xl md:text-6xl font-bold mb-6",
            "bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent",
            "tracking-tight",
            "filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          )}>
            AI-Powered Grant Success
          </h2>
          <p className={cn(
            "text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed",
            "font-light tracking-wide"
          )}>
            FundAid combines advanced AI agents with grant expertise to help innovative companies
            win government funding. Our multi-stage system handles everything from assessment to submission.
          </p>
        </div>

        {/* Feature Cards Grid with Interconnecting Lines */}
        <div className="relative">
          {/* Interconnecting circuit lines */}
          <InterconnectingLines hoveredCard={hoveredCard} />

          {/* Feature Cards Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <HolographicCard
                key={feature.title}
                {...feature}
                index={index}
                onHover={setHoveredCard}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
