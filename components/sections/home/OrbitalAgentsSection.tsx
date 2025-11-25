/**
 * AI Agent Grid - Apple-style Soft-Glass Premium Cards
 *
 * Premium glassmorphic grid showcasing the 5-agent system.
 * Inspired by Apple / Linear / Arc browser design language.
 */

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Agent data
interface Agent {
  id: number;
  name: string;
  category: string;
  description: string;
  metric: string;
  accentColor: string;
  iconPath: string; // Simple line icon SVG path
}

const AGENTS: Agent[] = [
  {
    id: 1,
    name: "Profile Agent",
    category: "COMPANY ANALYSIS",
    description: "Extracts your tech stack, assesses TRL, and builds a comprehensive company profile.",
    metric: "5 min setup",
    accentColor: "#2FB49E", // Teal (Digilab brand)
    iconPath: "M12 2a4 4 0 0 1 4 4v2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h4V6a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2h4V6a2 2 0 0 0-2-2z",
  },
  {
    id: 2,
    name: "Discovery Agent",
    category: "GRANT SEARCH",
    description: "Searches thousands of grants, ranks by fit score, and delivers a prioritized short list.",
    metric: "1000+ sources",
    accentColor: "#20D8D2", // Cyan
    iconPath: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  },
  {
    id: 3,
    name: "Analysis Agent",
    category: "RFP PARSING",
    description: "Parses RFPs, extracts key criteria, and flags requirements that matter for scoring.",
    metric: "100% accurate criteria map",
    accentColor: "#A88CFF", // Purple
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z",
  },
  {
    id: 4,
    name: "Writing Agent",
    category: "RESPONSE GENERATION",
    description: "Drafts tailored responses, simulates assessor feedback, and iterates to 7+/10 quality.",
    metric: "7+/10 avg score",
    accentColor: "#FF6D6D", // Coral
    iconPath: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 1 1 3.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  },
  {
    id: 5,
    name: "Quality Agent",
    category: "REVIEW & POLISH",
    description: "Checks coherence, validates claims, and ensures your final submission is consistent.",
    metric: "Final pass before submit",
    accentColor: "#8B7ADB", // Blue-purple blend
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  },
  {
    id: 6,
    name: "Optimization Agent",
    category: "CONTINUOUS LEARNING",
    description: "Learns from each submission, tracks what wins grants, and optimizes future applications.",
    metric: "Iterative improvement",
    accentColor: "#39F2C3", // Teal-cyan (gradient base)
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
];

// Simple line icon component
function AgentIcon({ iconPath, color }: { iconPath: string; color: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={iconPath} />
    </svg>
  );
}

// Individual cosmic glassmorphic agent card
function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative",
        "animate-fadeInUp",
      )}
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover glow effect - colored accent glow */}
      <div
        className={cn(
          "absolute -inset-[1px] rounded-3xl opacity-0 transition-opacity duration-500",
          "group-hover:opacity-100"
        )}
        style={{
          background: isHovered
            ? `radial-gradient(circle at 50% 0%, ${agent.accentColor}30, ${agent.accentColor}15 40%, transparent 70%)`
            : undefined,
          boxShadow: isHovered ? `0 0 60px ${agent.accentColor}40` : undefined,
        }}
      />

      {/* Main card - dark glassmorphism */}
      <div
        className={cn(
          "relative h-full",
          "bg-[#050816]/80 backdrop-blur-xl",
          "border border-white/5",
          "rounded-3xl",
          "shadow-[0_0_40px_rgba(0,0,0,0.75)]",
          "transition-all duration-500 ease-out",
          "hover:-translate-y-1",
          "focus-within:ring-2 focus-within:ring-[#39F2C3]",
          "p-8 flex flex-col items-center text-center"
        )}
      >
        {/* Number badge - top-left corner */}
        <div
          className="absolute top-4 left-4 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300"
          style={{
            backgroundColor: isHovered ? `${agent.accentColor}20` : 'rgba(255,255,255,0.05)',
            borderColor: isHovered ? `${agent.accentColor}60` : 'rgba(255,255,255,0.1)',
            color: isHovered ? agent.accentColor : 'rgba(255,255,255,0.5)',
          }}
        >
          {agent.id}
        </div>

        {/* Icon orb - cosmic style with glow */}
        <div
          className={cn(
            "mb-6 h-12 w-12 rounded-full flex items-center justify-center",
            "bg-[#050816]/90 border border-white/10",
            "transition-all duration-500",
            "group-hover:scale-110"
          )}
          style={{
            boxShadow: isHovered
              ? `0 0 24px ${agent.accentColor}60, 0 0 40px ${agent.accentColor}30, inset 0 0 12px ${agent.accentColor}20`
              : "0 4px 12px rgba(0,0,0,0.5), inset 0 0 8px rgba(255,255,255,0.03)",
          }}
        >
          <AgentIcon iconPath={agent.iconPath} color={agent.accentColor} />
        </div>

        {/* Category label - small caps, more subtle */}
        <div className="mb-3 text-[10px] tracking-wider text-slate-300/50 font-medium uppercase">
          {agent.category}
        </div>

        {/* Agent name */}
        <h3 className="mb-4 text-2xl font-bold text-white tracking-tight">
          {agent.name}
        </h3>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-slate-300/85 max-w-[280px]">
          {agent.description}
        </p>

        {/* Glass stat pill - gradient outline style */}
        <div
          className={cn(
            "mt-auto inline-flex items-center gap-2 rounded-full px-4 py-2",
            "text-xs font-medium text-slate-100",
            "transition-all duration-500",
            "relative overflow-hidden"
          )}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${isHovered ? agent.accentColor + '40' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: isHovered ? `0 0 20px ${agent.accentColor}20, inset 0 0 12px ${agent.accentColor}10` : 'none',
          }}
        >
          {/* Gradient glow overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, ${agent.accentColor}15, ${agent.accentColor}08, transparent)`,
            }}
          />

          {/* Glowing dot */}
          <div
            className="relative z-10 w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              backgroundColor: agent.accentColor,
              boxShadow: `0 0 8px ${agent.accentColor}`,
            }}
          />
          <span className="relative z-10">{agent.metric}</span>
        </div>
      </div>
    </div>
  );
}

// Main section component
export function OrbitalAgentsSection() {
  const scrollToFlow = () => {
    const flowSection = document.getElementById('how-it-works');
    if (flowSection) {
      flowSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="ai-agents-heading"
    >
      {/* Enhanced cosmic background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050714] via-[#0A0F1C] to-[#050714]" />

      {/* Cosmic radial glows - more dramatic */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(57, 242, 195, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(168, 140, 255, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(32, 216, 210, 0.04) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      {/* Subtle particle layer - 6 cyan floating dots */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        {[
          { top: '15%', left: '10%', delay: '0s' },
          { top: '25%', right: '15%', delay: '1s' },
          { top: '45%', left: '8%', delay: '2s' },
          { top: '60%', right: '12%', delay: '1.5s' },
          { top: '75%', left: '18%', delay: '0.5s' },
          { top: '85%', right: '20%', delay: '2.5s' },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float-particle"
            style={{
              ...particle,
              backgroundColor: '#39F2C3',
              boxShadow: '0 0 8px #39F2C3, 0 0 16px #39F2C340',
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Curved connecting lines in background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" preserveAspectRatio="none">
        <path
          d="M 0,50 Q 25,30 50,50 T 100,50"
          stroke="#39F2C3"
          strokeWidth="0.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 0,70 Q 33,85 66,70 T 100,70"
          stroke="#A88CFF"
          strokeWidth="0.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
          {/* Overline pill */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/5 border border-white/10">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: "#39F2C3",
                boxShadow: "0 0 8px #39F2C3",
              }}
            />
            <span className="text-xs tracking-[0.2em] text-slate-400 font-medium uppercase">
              AI-Powered System
            </span>
          </div>

          {/* Main heading */}
          <h2
            id="ai-agents-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            Meet Your AI Grant Team
          </h2>

          {/* New subheading */}
          <p className="text-base md:text-lg text-slate-400/90 font-medium tracking-wide">
            Six specialized agents. One coordinated grant pipeline.
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300/80 max-w-2xl mx-auto leading-relaxed">
            Each agent handles a critical stage of your application, working together to maximize your chances of winning funding.
          </p>
        </div>

        {/* Agent grid - reduced gap for tighter spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto mb-12">
          {AGENTS.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={scrollToFlow}
            className={cn(
              "group relative inline-flex items-center gap-2 px-6 py-3 rounded-full",
              "bg-[#050816]/60 backdrop-blur-xl border border-white/10",
              "text-sm font-medium text-slate-200",
              "transition-all duration-300",
              "hover:-translate-y-0.5 hover:border-[#39F2C3]/40",
              "hover:shadow-[0_0_30px_rgba(57,242,195,0.2)]",
              "focus:outline-none focus:ring-2 focus:ring-[#39F2C3]"
            )}
          >
            <span>See how the agents work together</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-12px) translateX(4px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-8px) translateX(-6px);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-16px) translateX(2px);
            opacity: 0.9;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-float-particle {
          animation: float-particle 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
