/**
 * Holographic Agent Team Section
 *
 * Premium hard-surface holographic UI for the 6-agent multi-agent system.
 * Numbered vertical flow showing the grant application pipeline.
 * Same aerospace-inspired aesthetic as HolographicFeatures.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const agents = [
  {
    number: 1,
    name: 'Discovery Agent',
    description: 'Continuously scans 8+ major grant databases, monitoring new opportunities in real-time. Uses advanced pattern recognition to identify grants matching your research profile.',
    features: [
      'Real-time monitoring',
      'Pattern matching',
      'Eligibility pre-screening'
    ],
  },
  {
    number: 2,
    name: 'Analysis Agent',
    description: 'Deep-dives into grant requirements, parsing RFPs and extracting key criteria. Builds comprehensive requirement matrices and identifies critical success factors.',
    features: [
      'RFP parsing',
      'Requirement extraction',
      'Success factor analysis'
    ],
  },
  {
    number: 3,
    name: 'Matching Agent',
    description: 'Compares your company profile against grant criteria using multi-dimensional scoring. Evaluates technical fit, TRL alignment, and budget compatibility.',
    features: [
      'Multi-factor scoring',
      'TRL assessment',
      'Budget validation'
    ],
  },
  {
    number: 4,
    name: 'Ranking Agent',
    description: 'Prioritizes opportunities based on success probability, deadline urgency, and funding amount. Creates optimized application sequences to maximize success rates.',
    features: [
      'Success prediction',
      'Timeline optimization',
      'Resource allocation'
    ],
  },
  {
    number: 5,
    name: 'Optimization Agent',
    description: 'Fine-tunes application strategies based on historical success patterns. Identifies improvement areas and suggests response enhancements.',
    features: [
      'Strategy refinement',
      'Historical analysis',
      'Response optimization'
    ],
  },
  {
    number: 6,
    name: 'Validation Agent',
    description: 'Ensures 100% compliance with grant requirements. Cross-checks all sections for consistency and completeness before submission.',
    features: [
      'Compliance checking',
      'Consistency validation',
      'Completeness verification'
    ],
  },
];

function AgentCard({
  agent,
  index
}: {
  agent: typeof agents[0];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        "group relative",
        "hover:scale-[1.01] transition-all duration-700 ease-out"
      )}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Connection line to next agent */}
      {index < agents.length - 1 && (
        <div className={cn(
          "absolute left-[31px] top-[80px] w-[2px] h-[calc(100%+2rem)]",
          "bg-gradient-to-b from-cyan-400/40 via-violet-400/40 to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        )} />
      )}

      <div className="flex items-start gap-6">
        {/* Agent Number Badge */}
        <div className={cn(
          "relative flex-shrink-0 z-10",
          "w-16 h-16 rounded-2xl",
          "bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80",
          "backdrop-blur-xl border border-slate-700/30",
          "shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1),inset_0_-1px_0_0_rgba(71,85,105,0.3)]",
          "flex items-center justify-center",
          "group-hover:scale-110 transition-transform duration-500"
        )}>
          {/* Underglow */}
          <div className={cn(
            "absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100",
            "bg-gradient-to-br from-cyan-500/30 via-violet-500/30 to-cyan-500/30",
            "blur-lg transition-opacity duration-700"
          )} />

          {/* Number */}
          <span className={cn(
            "relative text-2xl font-bold",
            "bg-gradient-to-br from-cyan-300 via-slate-200 to-violet-300 bg-clip-text text-transparent",
            "filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
          )}>
            {agent.number}
          </span>

          {/* Orbital ring decoration */}
          <div className="absolute inset-0 rounded-2xl opacity-30">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-cyan-400"
                strokeDasharray="2 4"
              />
            </svg>
          </div>
        </div>

        {/* Agent Content Card */}
        <div className="flex-1">
          {/* Underglow */}
          <div className={cn(
            "absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100",
            "bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-cyan-500/20",
            "blur-xl transition-opacity duration-700"
          )} />

          {/* Metallic frame */}
          <div className={cn(
            "absolute -inset-[0.5px] rounded-2xl",
            "bg-gradient-to-br from-slate-300/40 via-slate-400/30 to-slate-300/40",
            "shadow-[0_0_1px_rgba(148,163,184,0.5)]"
          )} />

          {/* Glass slab */}
          <div className={cn(
            "relative rounded-2xl overflow-hidden",
            "bg-gradient-to-br from-slate-950/60 via-slate-900/50 to-slate-950/60",
            "backdrop-blur-xl border border-slate-700/30",
            "shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1),inset_0_-1px_0_0_rgba(71,85,105,0.3)]",
            "p-8"
          )}>

            {/* Chromatic dispersion */}
            <div className={cn(
              "absolute inset-0 rounded-2xl opacity-40",
              "bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-400/5",
              "pointer-events-none"
            )} />

            {/* Circuit pattern background */}
            <div className={cn(
              "absolute top-0 right-0 w-40 h-40 opacity-10",
              "pointer-events-none"
            )}>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="80" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                <circle cx="80" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-violet-400" />
                <line x1="80" y1="5" x2="80" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                <line x1="95" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-violet-400" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Agent Name */}
              <h3 className={cn(
                "text-2xl font-semibold mb-4",
                "bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent",
                "tracking-tight",
                "filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
              )}>
                {agent.name}
              </h3>

              {/* Divider */}
              <div className="flex items-center gap-1 mb-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
                <div className="w-1 h-1 rounded-full bg-cyan-400/50" />
                <div className="w-0.5 h-0.5 rounded-full bg-violet-400/50" />
              </div>

              {/* Description */}
              <p className={cn(
                "text-sm leading-relaxed mb-6",
                "text-slate-400",
                "font-light tracking-wide"
              )}>
                {agent.description}
              </p>

              {/* Features List */}
              <div className="space-y-3">
                {agent.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {/* Bullet point */}
                    <div className={cn(
                      "flex-shrink-0 w-1.5 h-1.5 rounded-full",
                      "bg-gradient-to-r from-cyan-400 to-violet-400",
                      "shadow-[0_0_6px_rgba(6,182,212,0.6)]"
                    )} />

                    {/* Feature text */}
                    <span className={cn(
                      "text-sm",
                      "text-slate-300",
                      "font-light tracking-wide"
                    )}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Parallax overlay */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100",
              "bg-gradient-to-tr from-cyan-400/5 via-transparent to-violet-400/5",
              "transition-opacity duration-700",
              "pointer-events-none"
            )} />

          </div>
        </div>
      </div>
    </div>
  );
}

export function HolographicAgentTeam() {
  return (
    <section className={cn(
      "relative py-16 pb-8",
      "overflow-hidden"
    )}>

      {/* Volumetric lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute top-1/3 left-1/3 w-96 h-96 rounded-full",
          "bg-cyan-500/5 blur-[100px]",
          "animate-pulse"
        )} />
        <div className={cn(
          "absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full",
          "bg-violet-500/5 blur-[100px]",
          "animate-pulse"
        )}
        style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className={cn(
            "text-5xl md:text-6xl font-bold mb-6",
            "bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent",
            "tracking-tight",
            "filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          )}>
            Meet Your AI Agent Team
          </h2>
          <p className={cn(
            "text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed",
            "font-light tracking-wide"
          )}>
            Six specialized agents working in perfect coordination to transform your grant application
            process from discovery to submission.
          </p>
        </div>

        {/* Agent Cards - Vertical Flow */}
        <div className="space-y-8">
          {agents.map((agent, index) => (
            <AgentCard
              key={agent.number}
              agent={agent}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
