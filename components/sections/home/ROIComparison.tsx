/**
 * ROIComparison - Cost Savings Visualization
 *
 * Clinical medical SaaS aesthetic showing Traditional vs. FundAid cost comparison
 * Features:
 * - Clean white cards with subtle shadows
 * - Animated cost breakdown
 * - Savings calculation
 * - Professional, trustworthy design
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { DollarSign, TrendingDown, Zap } from 'lucide-react';

export function ROIComparison() {
  return (
    <section
      className="relative py-32 overflow-hidden bg-white"
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block px-6 py-2 rounded-full mb-6 bg-fundaid-section-subtle border border-fundaid-border-subtle"
          >
            <span className="text-sm font-semibold tracking-wider text-fundaid-accent-secondary">
              COST ANALYSIS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-fundaid-text-primary mb-4">
            Why Pay <span className="text-fundaid-error">10x More</span> for the Same Result?
          </h2>
          <p className="text-lg text-fundaid-text-secondary max-w-2xl mx-auto">
            Traditional grant writers charge thousands. FundAid delivers the same quality—with higher success rates—for a fraction of the cost.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Traditional Cost Card */}
          <div
            className="relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-fundaid-xl bg-white shadow-fundaid-lg"
            style={{
              borderColor: '#EF444420',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center bg-red-50"
              >
                <DollarSign className="w-6 h-6 text-fundaid-error" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-fundaid-text-primary">Traditional Grant Writer</h3>
                <p className="text-sm text-fundaid-text-muted">Industry Standard</p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-fundaid-border-subtle">
                <span className="text-fundaid-text-secondary">Base Fee</span>
                <span className="text-xl font-bold text-fundaid-text-primary">$5,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fundaid-border-subtle">
                <span className="text-fundaid-text-secondary">Revisions & Edits</span>
                <span className="text-xl font-bold text-fundaid-text-primary">$3,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fundaid-border-subtle">
                <span className="text-fundaid-text-secondary">Timeline Delays</span>
                <span className="text-xl font-bold text-fundaid-text-primary">$2,000+</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-6 border-t-2 border-red-100">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-fundaid-text-muted uppercase tracking-wider">Total Cost</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-fundaid-error">
                    $10K–$20K
                  </span>
                </div>
              </div>
              <p className="text-xs text-fundaid-text-muted mt-2">Plus weeks of back-and-forth</p>
            </div>
          </div>

          {/* FundAid Cost Card */}
          <div
            className="relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-fundaid-xl bg-white shadow-fundaid-lg"
            style={{
              borderColor: '#1BA39C40',
            }}
          >
            {/* Best Value Badge */}
            <div
              className="absolute -top-4 right-8 px-4 py-1 rounded-full text-xs font-bold bg-fundaid-accent-secondary text-white"
            >
              BEST VALUE
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#1BA39C15' }}
              >
                <Zap className="w-6 h-6 text-fundaid-accent-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-fundaid-text-primary">FundAid AI Platform</h3>
                <p className="text-sm text-fundaid-text-muted">Complete 4-Stage System</p>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-fundaid-border-subtle">
                <span className="text-fundaid-text-secondary">Stage 4: Document Generation</span>
                <span className="text-xl font-bold text-fundaid-text-primary">$999</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fundaid-border-subtle">
                <span className="text-fundaid-text-secondary">LLM API Costs</span>
                <span className="text-xl font-bold text-fundaid-text-primary">~$50</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-fundaid-border-subtle">
                <span className="text-fundaid-text-secondary">Stage 2 & 3 (Optional)</span>
                <span className="text-xl font-bold text-fundaid-accent-secondary">$199</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-6 border-t-2" style={{ borderColor: '#1BA39C30' }}>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-fundaid-text-muted uppercase tracking-wider">Total Cost</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-fundaid-accent-secondary">
                    $1,049
                  </span>
                </div>
              </div>
              <p className="text-xs text-fundaid-text-muted mt-2">Complete in under 14 days</p>
            </div>
          </div>
        </div>

        {/* Savings Highlight */}
        <div
          className="max-w-3xl mx-auto p-8 rounded-2xl border bg-white shadow-fundaid-lg"
          style={{
            borderColor: '#6D5BD030',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#6D5BD015' }}
              >
                <TrendingDown className="w-8 h-8 text-fundaid-accent-data" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-fundaid-text-primary mb-1">Your Savings</h3>
                <p className="text-fundaid-text-muted">Per grant application</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="flex items-baseline gap-2 justify-center md:justify-end">
                <span className="text-5xl md:text-6xl font-black text-fundaid-accent-data">
                  $9K–$19K
                </span>
              </div>
              <p className="text-sm text-fundaid-text-muted mt-2">
                <span className="text-fundaid-accent-secondary font-semibold">90-95%</span> cost reduction
              </p>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-fundaid-text-muted">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-fundaid-accent-secondary" />
              <span>&lt;14 days turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-fundaid-accent-data" />
              <span>7+/10 quality score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-fundaid-accent-primary" />
              <span>AI-powered automation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
