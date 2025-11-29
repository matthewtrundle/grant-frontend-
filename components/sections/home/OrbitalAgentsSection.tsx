/**
 * AI Agent Grid - Clinical Medical SaaS Cards
 *
 * Clean, professional grid showcasing the 6-agent system.
 * Inspired by modern medical SaaS and clinical software design language.
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
    accentColor: "#1BA39C", // Teal (Secondary brand)
    iconPath: "M12 2a4 4 0 0 1 4 4v2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h4V6a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2h4V6a2 2 0 0 0-2-2z",
  },
  {
    id: 2,
    name: "Discovery Agent",
    category: "GRANT SEARCH",
    description: "Searches thousands of grants, ranks by fit score, and delivers a prioritized short list.",
    metric: "1000+ sources",
    accentColor: "#1446A0", // Primary Blue
    iconPath: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  },
  {
    id: 3,
    name: "Analysis Agent",
    category: "RFP PARSING",
    description: "Parses RFPs, extracts key criteria, and flags requirements that matter for scoring.",
    metric: "100% accurate criteria map",
    accentColor: "#6D5BD0", // Data Purple
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z",
  },
  {
    id: 4,
    name: "Writing Agent",
    category: "RESPONSE GENERATION",
    description: "Drafts tailored responses, simulates assessor feedback, and iterates to 7+/10 quality.",
    metric: "7+/10 avg score",
    accentColor: "#2BAF7D", // Success Green
    iconPath: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 1 1 3.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  },
  {
    id: 5,
    name: "Quality Agent",
    category: "REVIEW & POLISH",
    description: "Checks coherence, validates claims, and ensures your final submission is consistent.",
    metric: "Final pass before submit",
    accentColor: "#1446A0", // Primary Blue
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  },
  {
    id: 6,
    name: "Optimization Agent",
    category: "CONTINUOUS LEARNING",
    description: "Learns from each submission, tracks what wins grants, and optimizes future applications.",
    metric: "Iterative improvement",
    accentColor: "#1BA39C", // Teal
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

// Individual clinical card
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
      {/* Subtle hover accent - no glow, just border color change */}
      <div
        className={cn(
          "absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100"
        )}
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${agent.accentColor}10, transparent)`
            : undefined,
        }}
      />

      {/* Main card - clean white clinical design */}
      <div
        className={cn(
          "relative h-full",
          "bg-white",
          "border transition-all duration-300",
          "rounded-2xl",
          "shadow-fundaid-md hover:shadow-fundaid-lg",
          "hover:-translate-y-1",
          "focus-within:ring-2 focus-within:ring-fundaid-accent-primary",
          "p-8 flex flex-col items-center text-center"
        )}
        style={{
          borderColor: isHovered ? `${agent.accentColor}40` : 'var(--border-subtle)',
        }}
      >
        {/* Number badge - top-left corner */}
        <div
          className="absolute top-4 left-4 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300"
          style={{
            backgroundColor: isHovered ? `${agent.accentColor}15` : '#F3F4F6',
            borderColor: isHovered ? `${agent.accentColor}50` : '#E5E7EB',
            color: isHovered ? agent.accentColor : '#6B7280',
          }}
        >
          {agent.id}
        </div>

        {/* Icon container - clean clinical style */}
        <div
          className={cn(
            "mb-6 h-12 w-12 rounded-full flex items-center justify-center",
            "border transition-all duration-300",
            "group-hover:scale-105"
          )}
          style={{
            backgroundColor: isHovered ? `${agent.accentColor}10` : '#F9FAFB',
            borderColor: isHovered ? `${agent.accentColor}40` : '#E5E7EB',
          }}
        >
          <AgentIcon iconPath={agent.iconPath} color={agent.accentColor} />
        </div>

        {/* Category label - subtle gray */}
        <div className="mb-3 text-[10px] tracking-wider text-fundaid-text-muted font-medium uppercase">
          {agent.category}
        </div>

        {/* Agent name - dark, bold */}
        <h3 className="mb-4 text-2xl font-bold text-fundaid-text-primary tracking-tight">
          {agent.name}
        </h3>

        {/* Description - readable gray */}
        <p className="mb-6 text-sm leading-relaxed text-fundaid-text-secondary max-w-[280px]">
          {agent.description}
        </p>

        {/* Metric pill - clean clinical style */}
        <div
          className={cn(
            "mt-auto inline-flex items-center gap-2 rounded-full px-4 py-2",
            "text-xs font-medium transition-all duration-300",
            "relative overflow-hidden"
          )}
          style={{
            backgroundColor: isHovered ? `${agent.accentColor}10` : '#F3F4F6',
            border: `1px solid ${isHovered ? agent.accentColor + '30' : '#E5E7EB'}`,
            color: isHovered ? agent.accentColor : '#374151',
          }}
        >
          {/* Status indicator dot */}
          <div
            className="relative z-10 w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: agent.accentColor,
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
      className="relative py-24 md:py-32 overflow-hidden bg-fundaid-section-subtle"
      aria-labelledby="ai-agents-heading"
    >
      {/* Subtle grid pattern background - clinical style */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #E5E7EB 1px, transparent 1px),
              linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Soft blue accent gradient - very subtle */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, #1446A010 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, #1BA39C10 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
          {/* Overline pill - clinical style */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white border border-fundaid-border-subtle">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: "#1BA39C",
              }}
            />
            <span className="text-xs tracking-[0.2em] text-fundaid-text-muted font-medium uppercase">
              AI-Powered System
            </span>
          </div>

          {/* Main heading - dark, bold */}
          <h2
            id="ai-agents-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-fundaid-text-primary tracking-tight"
          >
            Meet Your AI Grant Team
          </h2>

          {/* Subheading */}
          <p className="text-base md:text-lg text-fundaid-text-secondary font-medium tracking-wide">
            Six specialized agents. One coordinated grant pipeline.
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-fundaid-text-secondary max-w-2xl mx-auto leading-relaxed">
            Each agent handles a critical stage of your application, working together to maximize your chances of winning funding.
          </p>
        </div>

        {/* Agent grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto mb-12">
          {AGENTS.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>

        {/* CTA Button - clean clinical style */}
        <div className="flex justify-center mt-12">
          <button
            onClick={scrollToFlow}
            className={cn(
              "group relative inline-flex items-center gap-2 px-6 py-3 rounded-full",
              "bg-white border border-fundaid-border-subtle",
              "text-sm font-medium text-fundaid-text-primary",
              "transition-all duration-300",
              "hover:-translate-y-0.5 hover:border-fundaid-accent-primary hover:text-fundaid-accent-primary",
              "hover:shadow-fundaid-md",
              "focus:outline-none focus:ring-2 focus:ring-fundaid-accent-primary"
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

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
