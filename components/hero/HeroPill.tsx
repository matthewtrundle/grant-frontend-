/**
 * Hero Pill Component
 * 800×360px translucent panel with cyan edge-lighting
 * Contains hero content (title, tagline, CTAs)
 */

'use client';

import Link from 'next/link';
import { DESIGN_TOKENS } from './design-tokens';

interface HeroPillProps {
  scalePercent?: number; // Scale as percentage (90 = 90% of original size)
}

export function HeroPill({ scalePercent = 100 }: HeroPillProps) {
  const baseWidth = 800;
  const baseHeight = 360;
  const pillWidth = (baseWidth * scalePercent) / 100;
  const pillHeight = (baseHeight * scalePercent) / 100;
  const borderRadius = (28 * scalePercent) / 100;

  return (
    <div className="relative z-20 flex items-center justify-center">
      {/* SVG Pill Background with Glow */}
      <svg
        width={pillWidth}
        height={pillHeight}
        viewBox={`0 0 ${pillWidth} ${pillHeight}`}
        className="absolute inset-0"
        style={{ filter: 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.4))' }}
      >
        <defs>
          {/* Edge lighting gradient */}
          <linearGradient id="pillEdge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={DESIGN_TOKENS.colors.pillGlow} stopOpacity="0.4" />
            <stop offset="50%" stopColor={DESIGN_TOKENS.colors.nodeTeal} stopOpacity="0.3" />
            <stop offset="100%" stopColor={DESIGN_TOKENS.colors.pillGlow} stopOpacity="0.4" />
          </linearGradient>

          {/* Inner gradient */}
          <linearGradient id="pillBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(12, 20, 28, 0.85)" />
            <stop offset="100%" stopColor="rgba(12, 20, 28, 0.65)" />
          </linearGradient>
        </defs>

        {/* Main pill background */}
        <rect
          x="0"
          y="0"
          width={pillWidth}
          height={pillHeight}
          rx={borderRadius}
          ry={borderRadius}
          fill="url(#pillBg)"
          style={{ backdropFilter: 'blur(12px)' }}
        />

        {/* Glowing edge */}
        <rect
          x="0"
          y="0"
          width={pillWidth}
          height={pillHeight}
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke="url(#pillEdge)"
          strokeWidth="2"
          filter="url(#pillGlow)"
          opacity={DESIGN_TOKENS.opacity.pillGlow}
        />

        {/* Inner subtle border */}
        <rect
          x="2"
          y="2"
          width={pillWidth - 4}
          height={pillHeight - 4}
          rx={borderRadius - 2}
          ry={borderRadius - 2}
          fill="none"
          stroke={DESIGN_TOKENS.colors.nodeCyan}
          strokeWidth="0.5"
          opacity="0.15"
        />
      </svg>

      {/* Content Overlay */}
      <div className="relative z-10 px-6 sm:px-12 py-8 sm:py-10 text-center max-w-[720px]">
        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6"
          style={{
            fontFamily: "'Orbitron', monospace",
            letterSpacing: '0.05em',
            background: `linear-gradient(135deg, #ffffff 0%, ${DESIGN_TOKENS.colors.nodeCyan} 60%, ${DESIGN_TOKENS.colors.nodeTeal} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 0 40px ${DESIGN_TOKENS.colors.nodeCyan}40`,
          }}
        >
          FUNDAID
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light mb-2 sm:mb-3 leading-relaxed">
          Stop Writing Grants.
        </p>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light mb-6 sm:mb-10 leading-relaxed">
          Start Winning Them.
        </p>

        {/* Subhead */}
        <p className="text-sm sm:text-base md:text-lg text-white/70 mb-8 sm:mb-12 max-w-[560px] mx-auto font-light">
          AI-powered grant discovery and application automation for deep-tech innovators
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/sign-up"
            className="group relative px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg overflow-hidden transition-all duration-300 w-full sm:w-auto"
            style={{
              background: `linear-gradient(135deg, ${DESIGN_TOKENS.colors.nodeCyan} 0%, ${DESIGN_TOKENS.colors.nodeTeal} 100%)`,
              boxShadow: `0 0 30px ${DESIGN_TOKENS.colors.nodeCyan}50, 0 8px 24px rgba(0, 0, 0, 0.3)`,
            }}
          >
            <span className="relative z-10 text-black font-bold">Start Free Trial</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #39F2C3 100%)',
              }}
            />
          </Link>

          <Link
            href="#how-it-works"
            className="px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 border-2 w-full sm:w-auto"
            style={{
              borderColor: `${DESIGN_TOKENS.colors.nodeCyan}50`,
              background: 'rgba(15, 23, 42, 0.3)',
              backdropFilter: 'blur(8px)',
              color: DESIGN_TOKENS.colors.nodeCyan,
              boxShadow: `0 0 20px ${DESIGN_TOKENS.colors.nodeCyan}20, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            }}
          >
            Explore Features
          </Link>
        </div>
      </div>
    </div>
  );
}
