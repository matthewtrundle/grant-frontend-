/**
 * NeuralNetworkConnections - SVG paths and particles for timeline connections
 *
 * Creates organic connection lines between stages with:
 * - Curved SVG paths
 * - Animated particles
 * - Branch points
 * - Scroll-triggered drawing
 */

'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme';
import { useNeuralNetworkAnimation, generateOrganicPath } from '@/hooks/gsap/useNeuralNetworkAnimation';

interface NeuralNetworkConnectionsProps {
  activeStep: number;
  scrollProgress: number;
  containerRef: React.RefObject<HTMLElement>;
  scrollTriggerRef: React.RefObject<HTMLElement>;
  className?: string;
}

export function NeuralNetworkConnections({
  activeStep,
  scrollProgress,
  containerRef,
  scrollTriggerRef,
  className
}: NeuralNetworkConnectionsProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Use the neural network animation hook
  const { pathRefs, particleRefs } = useNeuralNetworkAnimation({
    containerRef: svgRef as React.MutableRefObject<HTMLElement | null>,
    scrollTriggerRef,
    activeStep,
    scrollProgress
  });

  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {/* Main SVG for connection lines */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 600"
      >
        <defs>
          {/* Define gradients for lines */}
          <linearGradient id="neural-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fundaidTheme.accents.teal} stopOpacity="0.2" />
            <stop offset="50%" stopColor={fundaidTheme.accents.teal} stopOpacity="0.6" />
            <stop offset="100%" stopColor={fundaidTheme.accents.teal} stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="neural-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fundaidTheme.accents.lavender} stopOpacity="0.2" />
            <stop offset="50%" stopColor={fundaidTheme.accents.lavender} stopOpacity="0.6" />
            <stop offset="100%" stopColor={fundaidTheme.accents.lavender} stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="neural-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fundaidTheme.accents.blue} stopOpacity="0.2" />
            <stop offset="50%" stopColor={fundaidTheme.accents.blue} stopOpacity="0.6" />
            <stop offset="100%" stopColor={fundaidTheme.accents.blue} stopOpacity="0.2" />
          </linearGradient>

          {/* Glow filter for active paths */}
          <filter id="neural-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feComponentTransfer in="blur">
              <feFuncA type="discrete" tableValues="0 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 1" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Main connection paths between stages */}
        <g className="neural-connections">
          {/* Stage 1 to Stage 2 */}
          <path
            className="neural-path"
            d={generateOrganicPath(200, 150, 400, 200, 60)}
            fill="none"
            stroke="url(#neural-gradient-1)"
            strokeWidth="1.5"
            opacity="0"
            ref={el => el && pathRefs.current.push(el)}
          />

          {/* Branch from Stage 1 to popup */}
          <path
            className="neural-path"
            d={generateOrganicPath(200, 150, 250, 100, 30)}
            fill="none"
            stroke="url(#neural-gradient-1)"
            strokeWidth="1"
            opacity="0"
            ref={el => el && pathRefs.current.push(el)}
          />

          {/* Stage 2 to Stage 3 */}
          <path
            className="neural-path"
            d={generateOrganicPath(400, 200, 600, 250, 80)}
            fill="none"
            stroke="url(#neural-gradient-2)"
            strokeWidth="1.5"
            opacity="0"
            ref={el => el && pathRefs.current.push(el)}
          />

          {/* Branch from Stage 2 */}
          <path
            className="neural-path"
            d={generateOrganicPath(400, 200, 450, 280, 40)}
            fill="none"
            stroke="url(#neural-gradient-2)"
            strokeWidth="1"
            opacity="0"
            ref={el => el && pathRefs.current.push(el)}
          />

          {/* Stage 3 to Stage 4 */}
          <path
            className="neural-path"
            d={generateOrganicPath(600, 250, 800, 300, 70)}
            fill="none"
            stroke="url(#neural-gradient-3)"
            strokeWidth="1.5"
            opacity="0"
            ref={el => el && pathRefs.current.push(el)}
          />

          {/* Branch from Stage 3 */}
          <path
            className="neural-path"
            d={generateOrganicPath(600, 250, 650, 180, 35)}
            fill="none"
            stroke="url(#neural-gradient-3)"
            strokeWidth="1"
            opacity="0"
            ref={el => el && pathRefs.current.push(el)}
          />

          {/* Additional organic connections */}
          <path
            className="neural-path"
            d={generateOrganicPath(300, 350, 500, 400, 50)}
            fill="none"
            stroke="url(#neural-gradient-1)"
            strokeWidth="0.8"
            opacity="0"
            strokeDasharray="5,5"
            ref={el => el && pathRefs.current.push(el)}
          />

          <path
            className="neural-path"
            d={generateOrganicPath(500, 400, 700, 350, 60)}
            fill="none"
            stroke="url(#neural-gradient-2)"
            strokeWidth="0.8"
            opacity="0"
            strokeDasharray="5,5"
            ref={el => el && pathRefs.current.push(el)}
          />

          {/* Feedback loops */}
          <path
            className="neural-path"
            d="M 800 300 Q 850 250, 800 200 T 750 150"
            fill="none"
            stroke="url(#neural-gradient-3)"
            strokeWidth="0.5"
            opacity="0"
            strokeDasharray="3,3"
            ref={el => el && pathRefs.current.push(el)}
          />
        </g>

        {/* Branch points (neural nodes) */}
        <g className="neural-branches">
          <circle
            className="neural-branch"
            cx="200"
            cy="150"
            r="4"
            fill={fundaidTheme.accents.teal}
            opacity="0"
          />
          <circle
            className="neural-branch"
            cx="400"
            cy="200"
            r="4"
            fill={fundaidTheme.accents.lavender}
            opacity="0"
          />
          <circle
            className="neural-branch"
            cx="600"
            cy="250"
            r="4"
            fill={fundaidTheme.accents.blue}
            opacity="0"
          />
          <circle
            className="neural-branch"
            cx="800"
            cy="300"
            r="4"
            fill={fundaidTheme.accents.teal}
            opacity="0"
          />
        </g>
      </svg>

      {/* Particles that travel along paths */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="neural-particle absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? fundaidTheme.accents.teal : fundaidTheme.accents.lavender,
              boxShadow: `0 0 10px ${i % 2 === 0 ? fundaidTheme.accents.teal : fundaidTheme.accents.lavender}`,
              opacity: 0.8
            }}
            ref={el => el && particleRefs.current.push(el)}
          />
        ))}
      </div>

      {/* Additional decorative elements */}
      <div className="absolute inset-0">
        {/* Pulse rings at key points */}
        {activeStep > 1 && (
          <div
            className="absolute animate-pulse"
            style={{
              left: '20%',
              top: '25%',
              width: '60px',
              height: '60px',
            }}
          >
            <div
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: fundaidTheme.accents.teal,
                opacity: 0.2,
                animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
              }}
            />
          </div>
        )}

        {activeStep > 2 && (
          <div
            className="absolute animate-pulse"
            style={{
              left: '40%',
              top: '33%',
              width: '60px',
              height: '60px',
            }}
          >
            <div
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: fundaidTheme.accents.lavender,
                opacity: 0.2,
                animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                animationDelay: '0.5s'
              }}
            />
          </div>
        )}

        {activeStep > 3 && (
          <div
            className="absolute animate-pulse"
            style={{
              right: '20%',
              top: '50%',
              width: '60px',
              height: '60px',
            }}
          >
            <div
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: fundaidTheme.accents.blue,
                opacity: 0.2,
                animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                animationDelay: '1s'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}