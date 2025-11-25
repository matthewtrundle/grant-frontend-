/**
 * SuccessPipeline - 4-Stage Grant Success System
 *
 * Console panel aesthetic with connecting rail to visualize the pipeline:
 * Stage 1 → Stage 2 → Stage 3 → Stage 4
 *
 * Features:
 * - Metallic mini-orb icons matching planetary visuals
 * - Stage-specific brand color accents
 * - Connecting rail with glowing nodes
 * - Console panel cards with depth
 * - Enhanced hover interactions
 */

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Zap, Target, FileText, TrendingUp } from 'lucide-react';

// Type definition for success stages
type SuccessStage = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  chips: string[];
  accentColor: string;
  icon: React.ComponentType<{ className?: string }>;
};

// Stage data with brand colors
const SUCCESS_STAGES: SuccessStage[] = [
  {
    id: 1,
    title: "Multi-Agent Intelligence",
    subtitle: "4-stage AI system",
    description: "Specialized AI agents for profiling, discovery, analysis, and writing.",
    metricLabel: "Stages",
    metricValue: "4",
    chips: ["12+ AI agents", "End-to-end coverage"],
    accentColor: "#39F2C3", // Cyan
    icon: Zap,
  },
  {
    id: 2,
    title: "Smart Grant Matching",
    subtitle: "Find the right grants",
    description: "AI-powered discovery and scoring of relevant funding opportunities.",
    metricLabel: "Match rate",
    metricValue: "92%",
    chips: ["8+ data sources", "Fit-score ranking"],
    accentColor: "#20D8D2", // Teal
    icon: Target,
  },
  {
    id: 3,
    title: "RAG-Enhanced Writing",
    subtitle: "Write with real examples",
    description: "Generate winning proposals using successful grant examples.",
    metricLabel: "Avg score",
    metricValue: "7.8/10",
    chips: ["Grounded in past wins", "Assessor-style tone"],
    accentColor: "#A88CFF", // Purple
    icon: FileText,
  },
  {
    id: 4,
    title: "Success Optimization",
    subtitle: "Iterate toward a win",
    description: "Continuous learning from assessor feedback and grant outcomes.",
    metricLabel: "Win rate",
    metricValue: "40%",
    chips: ["Feedback loops", "Portfolio insights"],
    accentColor: "#FF6D6D", // Coral
    icon: TrendingUp,
  },
];

// Individual stage card component
function StageCard({ stage, isHovered, onHover }: {
  stage: SuccessStage;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}) {
  const Icon = stage.icon;

  return (
    <div
      className="relative group"
      onMouseEnter={() => onHover(stage.id)}
      onMouseLeave={() => onHover(null)}
      tabIndex={0}
      role="article"
      aria-labelledby={`stage-${stage.id}-title`}
    >
      {/* Hover lift & scale */}
      <div
        className={cn(
          "relative rounded-2xl transition-all duration-300 ease-out",
          "bg-[#080C14]/80 backdrop-blur-xl",
          "border border-white/6",
          "shadow-[0_20px_60px_rgba(0,0,0,0.75)]",
          "hover:-translate-y-1 hover:scale-[1.01]",
          "hover:border-white/10 hover:shadow-[0_22px_65px_rgba(0,0,0,0.85)]",
          "p-6 md:p-8"
        )}
      >
        {/* Inner radial gradient from top-left */}
        <div
          className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 10% 10%, ${stage.accentColor}08 0%, transparent 50%)`
          }}
        />

        {/* Top inner stroke for hardware faceplate feel */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Content */}
        <div className="relative space-y-4">
          {/* Top row: Metallic orb icon + Stage label */}
          <div className="flex items-start justify-between">
            {/* Metallic mini-orb icon */}
            <div
              className={cn(
                "relative w-12 h-12 rounded-full flex items-center justify-center",
                "transition-all duration-300",
                "group-hover:scale-110"
              )}
              style={{
                background: `radial-gradient(circle at 35% 35%, #1a1f2e 0%, #0a0e16 100%)`,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: isHovered
                  ? `0 0 20px ${stage.accentColor}60, inset 0 0 15px rgba(0,0,0,0.8)`
                  : `0 0 12px ${stage.accentColor}30, inset 0 0 12px rgba(0,0,0,0.9)`
              }}
            >
              {/* Inner glow core */}
              <div
                className="absolute inset-2 rounded-full opacity-40"
                style={{
                  background: `radial-gradient(circle, ${stage.accentColor}40 0%, transparent 70%)`
                }}
              />
              <Icon
                className="relative z-10 w-5 h-5 transition-colors"
                style={{ color: stage.accentColor }}
              />
            </div>

            {/* Stage label */}
            <div className="text-xs font-medium uppercase tracking-wider text-slate-400/80">
              Stage {stage.id}
            </div>
          </div>

          {/* Title & subtitle */}
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-slate-300/80 font-medium">
              {stage.subtitle}
            </div>
            <h3
              id={`stage-${stage.id}-title`}
              className="text-xl md:text-2xl font-semibold text-slate-50 tracking-tight"
            >
              {stage.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300/90 leading-relaxed max-w-[280px]">
            {stage.description}
          </p>

          {/* Bottom row: Chips + Metric */}
          <div className="flex items-end justify-between gap-4 pt-2">
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {stage.chips.map((chip, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `${stage.accentColor}12`,
                    border: `1px solid ${stage.accentColor}25`,
                    color: `${stage.accentColor}dd`
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>

            {/* Metric */}
            <div className="flex flex-col items-end">
              <div className="text-[10px] uppercase tracking-wider text-slate-400/70 font-medium">
                {stage.metricLabel}
              </div>
              <div
                className={cn(
                  "text-2xl font-bold tracking-tight",
                  "transition-all duration-300",
                  isHovered && "scale-110"
                )}
                style={{
                  color: stage.accentColor,
                  textShadow: isHovered ? `0 0 12px ${stage.accentColor}80` : 'none'
                }}
              >
                {stage.metricValue}
              </div>
            </div>
          </div>
        </div>

        {/* Subtle orbit lines decoration (bottom right) */}
        <div className="absolute bottom-8 right-8 w-20 h-20 opacity-[0.15] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke={stage.accentColor}
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.5"
            />
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="none"
              stroke={stage.accentColor}
              strokeWidth="0.5"
              opacity="0.3"
            />
            {/* Tiny glowing dot that drifts */}
            <circle
              cx="85"
              cy="50"
              r="2"
              fill={stage.accentColor}
              opacity="0.8"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>

      {/* Rail entry/exit nodes */}
      {stage.id < 4 && (
        <>
          {/* Exit node (right side for stages 1-2, bottom for stage 3) */}
          <div
            className={cn(
              "absolute w-3 h-3 rounded-full z-20",
              "transition-all duration-300",
              stage.id <= 2 ? "top-1/2 -translate-y-1/2 -right-[7px]" : "bottom-0 left-1/2 -translate-x-1/2 -bottom-[7px]"
            )}
            style={{
              backgroundColor: isHovered ? stage.accentColor : 'rgba(255,255,255,0.2)',
              boxShadow: isHovered ? `0 0 12px ${stage.accentColor}` : '0 0 4px rgba(255,255,255,0.2)'
            }}
          />
        </>
      )}

      {stage.id > 1 && (
        <>
          {/* Entry node (left side for stages 2-4, top for stage 3) */}
          <div
            className={cn(
              "absolute w-3 h-3 rounded-full z-20",
              "transition-all duration-300",
              stage.id === 3 ? "top-0 left-1/2 -translate-x-1/2 -top-[7px]" : "top-1/2 -translate-y-1/2 -left-[7px]"
            )}
            style={{
              backgroundColor: isHovered ? SUCCESS_STAGES[stage.id - 2].accentColor : 'rgba(255,255,255,0.2)',
              boxShadow: isHovered ? `0 0 12px ${SUCCESS_STAGES[stage.id - 2].accentColor}` : '0 0 4px rgba(255,255,255,0.2)'
            }}
          />
        </>
      )}
    </div>
  );
}

// Main section component
export function SuccessPipeline() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  return (
    <section
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      aria-labelledby="success-pipeline-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C] via-[#0F1420] to-[#0A0F1C]" />

      {/* Container */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <h2
            id="success-pipeline-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-50 tracking-tight"
          >
            AI-Powered Grant Success
          </h2>
          <p className="text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            FundAid combines advanced AI agents with grant expertise to help innovative companies win government funding.
            <br className="hidden md:block" />
            Our multi-stage system handles everything from assessment to submission.
          </p>
        </div>

        {/* 2x2 Grid with connecting rail */}
        <div className="relative">
          {/* Rail lines - desktop only */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            {/* Horizontal line connecting stages 1-2 */}
            <div
              className="absolute top-[25%] left-[calc(50%-30px)] w-[60px] h-[1px] transition-all duration-300"
              style={{
                backgroundColor: hoveredStage === 1 || hoveredStage === 2
                  ? SUCCESS_STAGES[0].accentColor
                  : 'rgba(255,255,255,0.05)'
              }}
            />

            {/* Horizontal line connecting stages 3-4 */}
            <div
              className="absolute bottom-[25%] left-[calc(50%-30px)] w-[60px] h-[1px] transition-all duration-300"
              style={{
                backgroundColor: hoveredStage === 3 || hoveredStage === 4
                  ? SUCCESS_STAGES[2].accentColor
                  : 'rgba(255,255,255,0.05)'
              }}
            />

            {/* Vertical line connecting stage 2-3 */}
            <div
              className="absolute top-[25%] right-[calc(25%-15px)] w-[1px] h-[calc(50%+30px)] transition-all duration-300"
              style={{
                backgroundColor: hoveredStage === 2 || hoveredStage === 3
                  ? SUCCESS_STAGES[1].accentColor
                  : 'rgba(255,255,255,0.05)'
              }}
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {SUCCESS_STAGES.map((stage) => (
              <StageCard
                key={stage.id}
                stage={stage}
                isHovered={hoveredStage === stage.id}
                onHover={setHoveredStage}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
