/**
 * ROIComparison - Cost Savings Visualization
 *
 * Space-tech aesthetic showing Traditional vs. FundAid cost comparison
 * Features:
 * - Glassmorphic cards with brand colors
 * - Animated cost breakdown
 * - Savings calculation
 * - Circuit-line connectors
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { DollarSign, TrendingDown, Zap } from 'lucide-react';

// Brand colors from SuccessPipeline
const BRAND_COLORS = {
  cyan: '#39F2C3',
  teal: '#20D8D2',
  purple: '#A88CFF',
  coral: '#FF6D6D',
};

export function ROIComparison() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0E27 0%, #151B3D 50%, #0A0E27 100%)',
      }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? BRAND_COLORS.cyan : i % 3 === 1 ? BRAND_COLORS.purple : BRAND_COLORS.teal,
              opacity: Math.random() * 0.3 + 0.1,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block px-6 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(57, 242, 195, 0.1)',
              border: `1px solid ${BRAND_COLORS.cyan}30`,
            }}
          >
            <span className="text-sm font-semibold tracking-wider" style={{ color: BRAND_COLORS.cyan }}>
              COST ANALYSIS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Pay <span style={{ color: BRAND_COLORS.coral }}>10x More</span> for the Same Result?
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Traditional grant writers charge thousands. FundAid delivers the same quality—with higher success rates—for a fraction of the cost.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Traditional Cost Card */}
          <div
            className="relative p-8 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'rgba(255, 109, 109, 0.05)',
              borderColor: `${BRAND_COLORS.coral}30`,
              boxShadow: `0 0 40px ${BRAND_COLORS.coral}20`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_COLORS.coral}30, ${BRAND_COLORS.coral}10)`,
                }}
              >
                <DollarSign className="w-6 h-6" style={{ color: BRAND_COLORS.coral }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Traditional Grant Writer</h3>
                <p className="text-sm text-white/50">Industry Standard</p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/70">Base Fee</span>
                <span className="text-xl font-bold text-white">$5,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/70">Revisions & Edits</span>
                <span className="text-xl font-bold text-white">$3,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/70">Timeline Delays</span>
                <span className="text-xl font-bold text-white">$2,000+</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-6 border-t-2" style={{ borderColor: `${BRAND_COLORS.coral}50` }}>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-white/60 uppercase tracking-wider">Total Cost</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black" style={{ color: BRAND_COLORS.coral }}>
                    $10K–$20K
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-2">Plus weeks of back-and-forth</p>
            </div>
          </div>

          {/* FundAid Cost Card */}
          <div
            className="relative p-8 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'rgba(57, 242, 195, 0.05)',
              borderColor: `${BRAND_COLORS.cyan}40`,
              boxShadow: `0 0 60px ${BRAND_COLORS.cyan}30`,
            }}
          >
            {/* Best Value Badge */}
            <div
              className="absolute -top-4 right-8 px-4 py-1 rounded-full text-xs font-bold"
              style={{
                background: `linear-gradient(135deg, ${BRAND_COLORS.cyan}, ${BRAND_COLORS.teal})`,
                color: '#000',
              }}
            >
              BEST VALUE
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_COLORS.cyan}30, ${BRAND_COLORS.cyan}10)`,
                }}
              >
                <Zap className="w-6 h-6" style={{ color: BRAND_COLORS.cyan }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">FundAid AI Platform</h3>
                <p className="text-sm text-white/50">Complete 4-Stage System</p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/70">Stage 4: Document Generation</span>
                <span className="text-xl font-bold text-white">$999</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/70">LLM API Costs</span>
                <span className="text-xl font-bold text-white">~$50</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/70">Stage 2 & 3 (Optional)</span>
                <span className="text-xl font-bold" style={{ color: BRAND_COLORS.teal }}>$199</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-6 border-t-2" style={{ borderColor: `${BRAND_COLORS.cyan}50` }}>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-white/60 uppercase tracking-wider">Total Cost</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black" style={{ color: BRAND_COLORS.cyan }}>
                    $1,049
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-2">Complete in under 14 days</p>
            </div>
          </div>
        </div>

        {/* Savings Highlight */}
        <div
          className="max-w-3xl mx-auto p-8 rounded-2xl backdrop-blur-md border"
          style={{
            background: 'rgba(168, 140, 255, 0.05)',
            borderColor: `${BRAND_COLORS.purple}30`,
            boxShadow: `0 0 40px ${BRAND_COLORS.purple}20`,
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_COLORS.purple}40, ${BRAND_COLORS.purple}10)`,
                }}
              >
                <TrendingDown className="w-8 h-8" style={{ color: BRAND_COLORS.purple }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Your Savings</h3>
                <p className="text-white/50">Per grant application</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="flex items-baseline gap-2 justify-center md:justify-end">
                <span className="text-5xl md:text-6xl font-black" style={{ color: BRAND_COLORS.purple }}>
                  $9K–$19K
                </span>
              </div>
              <p className="text-sm text-white/60 mt-2">
                <span style={{ color: BRAND_COLORS.cyan }}>90-95%</span> cost reduction
              </p>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS.teal }} />
              <span>&lt;14 days turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS.purple }} />
              <span>7+/10 quality score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS.cyan }} />
              <span>AI-powered automation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
