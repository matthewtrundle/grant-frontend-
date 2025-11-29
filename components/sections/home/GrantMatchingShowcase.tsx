/**
 * Grant Matching Showcase Section
 *
 * Refined two-column layout featuring:
 * - Left: Explanatory text with eyebrow + H2 + description
 * - Right: Dark glass panel with reactor + floating grant cards
 * - Premium Apple/Stripe-like aesthetic
 * - Digilab brand integration
 */

'use client';

import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Dynamically import the reactor panels to avoid SSR issues
const ReactorPanel = dynamic(
  () => import('@/components/ReactorPanel'),
  { ssr: false }
);

const ReactorSVGPanel = dynamic(
  () => import('@/components/ReactorSVGPanel').then(mod => ({ default: mod.ReactorSVGPanel })),
  { ssr: false }
);

const grantCards = [
  {
    name: 'NIH R01',
    amount: '$500K',
    quarter: 'Q4 2025',
    percentage: 92,
    color: '#2FB49E', // Digilab Teal
    position: { top: '5%', right: '3%' } // Top-right corner - moved up
  },
  {
    name: 'DARPA Young Faculty',
    amount: '$500K',
    quarter: 'Q2 2025',
    percentage: 88,
    color: '#A98CEB', // Digilab Lavender
    position: { top: '38%', right: '2%' } // Mid-right edge
  },
  {
    name: 'NSF STTR',
    amount: '$225K',
    quarter: 'Q3 2025',
    percentage: 85,
    color: '#2FB49E',
    position: { top: '72%', right: '4%' } // Lower-right - moved down
  },
  {
    name: 'DOE Innovation',
    amount: '$150K',
    quarter: 'Q1 2025',
    percentage: 78,
    color: '#A98CEB',
    position: { top: '8%', right: '35%' } // Upper-mid area - separated from NIH
  },
  {
    name: 'NASA SBIR',
    amount: '$125K',
    quarter: 'Q3 2025',
    percentage: 72,
    color: '#2FB49E',
    position: { top: '80%', right: '38%' } // Bottom area - moved down more
  },
];

export interface GrantMatchingShowcaseProps {
  /** Reactor type: '3d' for React Three Fiber, 'svg' for SVG-based */
  reactorType?: '3d' | 'svg';
  /** SVG variant (only used when reactorType is 'svg') */
  svgVariant?: 'metallic' | 'blueprint';
}

export function GrantMatchingShowcase({
  reactorType = '3d',
  svgVariant = 'metallic',
}: GrantMatchingShowcaseProps = {}) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate offset from card center to mouse
    const offsetX = (e.clientX - centerX) * 0.15; // 15% of distance for subtle effect
    const offsetY = (e.clientY - centerY) * 0.15;

    setMousePosition({ x: offsetX, y: offsetY });
  };

  const handleCardMouseEnter = (index: number) => {
    setHoveredCard(index);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section
      className={cn(
        'relative py-16 md:py-20',
        'overflow-hidden',
        'bg-white'
      )}
    >

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Two-column grid layout - responsive */}
        <div className="grid lg:grid-cols-[1.1fr,1.3fr] gap-8 lg:gap-12 items-center">

          {/* Left Column: Text Content */}
          <div className="space-y-4 md:space-y-6">
            {/* Eyebrow label */}
            <p className="text-xs uppercase tracking-[0.3em] text-fundaid-accent-secondary/70 font-medium">
              Multi-Agent Engine
            </p>

            {/* Main heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fundaid-text-primary tracking-tight leading-tight">
              AI-Powered Grant Matching
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg text-fundaid-text-secondary leading-relaxed max-w-xl">
              Our AI Grant Intelligence Network coordinates six specialized agents—Profile, Discovery, Analysis, Writing, Quality, and Optimization. Each agent processes grant data in parallel, feeding intelligence into the network which synthesizes findings and generates the real-time matching cards you see <span className="hidden lg:inline">on the right</span><span className="lg:hidden">below</span>.
            </p>

            {/* Technical capabilities - enhanced with metrics */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-fundaid-accent-secondary" />
                <span className="text-sm text-fundaid-text-secondary">6 specialized AI agents handle profiling, discovery, analysis, writing, quality, and optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-fundaid-accent-data" />
                <span className="text-sm text-fundaid-text-secondary">92% match accuracy with RAG-enhanced profile-to-grant alignment and TRL assessment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-fundaid-accent-secondary" />
                <span className="text-sm text-fundaid-text-secondary">Real-time processing of 1000+ funding sources with intelligent ranking and scoring</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dark Glass Reactor Panel */}
          <div className="relative">
            {/* Light clinical panel */}
            <div
              className={cn(
                'relative rounded-2xl md:rounded-3xl overflow-hidden',
                'border border-fundaid-border-subtle',
                'shadow-fundaid-xl',
                'bg-white',
                'h-[400px] md:h-[480px] lg:h-[550px]'
              )}
            >
              {/* Subtle grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(0deg, rgba(17,24,39,0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(17,24,39,0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Reactor Panel - 3D or SVG based on prop */}
              <div className="absolute inset-0 opacity-90">
                {reactorType === 'svg' ? (
                  <ReactorSVGPanel variant={svgVariant} animate asBackground />
                ) : (
                  <ReactorPanel />
                )}
              </div>

              {/* Grant cards layered on top - responsive visibility */}
              <div className="absolute inset-0 p-4 md:p-6 lg:p-8">
                {grantCards.map((grant, index) => (
                  <div
                    key={grant.name}
                    ref={(el) => (cardRefs.current[index] = el)}
                    onMouseMove={(e) => handleCardMouseMove(e, index)}
                    onMouseEnter={() => handleCardMouseEnter(index)}
                    onMouseLeave={handleCardMouseLeave}
                    className={cn(
                      'absolute bg-white backdrop-blur-md rounded-lg',
                      'border border-fundaid-border-subtle',
                      'p-2 md:p-2.5 min-w-[140px] md:min-w-[160px]',
                      'shadow-fundaid-md',
                      'hover:scale-105 hover:border-fundaid-accent-primary/30',
                      'hover:shadow-fundaid-lg',
                      'cursor-pointer',
                      // Hide some cards on mobile for cleaner look
                      index >= 3 ? 'hidden md:block' : ''
                    )}
                    style={{
                      ...grant.position,
                      animation: `float 3s ease-in-out infinite`,
                      animationDelay: `${index * 0.5}s`,
                      transform: hoveredCard === index
                        ? `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.05)`
                        : 'translate(0, 0) scale(1)',
                      transition: hoveredCard === index
                        ? 'transform 0.1s ease-out, border-color 0.3s, box-shadow 0.3s'
                        : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s, box-shadow 0.3s'
                    }}
                  >
                    <div className="space-y-1">
                      <h4 className="text-fundaid-text-primary font-semibold text-[11px] md:text-xs leading-tight">
                        {grant.name}
                      </h4>
                      <div className="flex items-baseline gap-1 md:gap-1.5">
                        <span className="text-sm md:text-base font-bold text-fundaid-text-primary">{grant.amount}</span>
                        <span className="text-[9px] md:text-[10px] text-fundaid-text-muted">• {grant.quarter}</span>
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex justify-between text-[10px] md:text-xs">
                          <span className="text-fundaid-text-muted">Match Score</span>
                          <span className="font-semibold" style={{ color: grant.color }}>
                            {grant.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-fundaid-muted rounded-full h-1 overflow-hidden border border-fundaid-border-subtle">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${grant.percentage}%`,
                              backgroundColor: grant.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status indicator (top-left of panel) */}
              <div className="absolute top-4 left-4 flex items-center gap-2 text-xs">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-fundaid-accent-secondary/30 shadow-fundaid-sm">
                  <div className="w-1.5 h-1.5 bg-fundaid-accent-secondary rounded-full animate-pulse" />
                  <span className="text-fundaid-accent-secondary font-medium">System Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes grid-slide {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }

        @keyframes scan-line {
          0% {
            background-position: 0 -400px;
          }
          100% {
            background-position: 0 calc(100% + 400px);
          }
        }

        .animate-grid-slide {
          animation: grid-slide 20s linear infinite;
        }

        .animate-scan-line {
          animation: scan-line 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
