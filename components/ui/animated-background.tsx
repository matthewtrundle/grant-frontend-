"use client";

import { motion } from "framer-motion";

interface MeteorEffectProps {
  density?: number; // 5-20 meteors
  speed?: number; // 1.0-3.0 multiplier
  color?: string; // hex color
  opacity?: number; // 0.0-1.0
  className?: string;
}

// Single meteor SVG path animation
function Meteor({
  index,
  speed,
  color,
  opacity
}: {
  index: number;
  speed: number;
  color: string;
  opacity: number;
}) {
  // Randomized starting position (staggered)
  const startX = Math.random() * 100;
  const startY = -10 - (Math.random() * 50);

  // Animation duration (1-2.3s per Clerk.com analysis)
  const duration = (1 + Math.random() * 1.3) / speed;

  // Delay for stagger effect
  const delay = index * 0.15;

  return (
    <motion.line
      x1={`${startX}%`}
      y1={`${startY}%`}
      x2={`${startX - 2}%`}
      y2={`${startY - 5}%`}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{
        opacity: [0, opacity, opacity, 0],
        pathLength: [0, 1, 1, 1],
        y1: ["0%", "110%"],
        y2: ["0%", "110%"],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
        ease: "linear",
      }}
    />
  );
}

export function MeteorEffect({
  density = 12,
  speed = 1.0,
  color = "#6c47ff",
  opacity = 0.6,
  className = "",
}: MeteorEffectProps) {
  // Reduce density on mobile for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const actualDensity = isMobile ? Math.floor(density / 2) : density;

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="meteor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={opacity} />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: actualDensity }).map((_, i) => (
          <Meteor
            key={i}
            index={i}
            speed={speed}
            color="url(#meteor-gradient)"
            opacity={opacity}
          />
        ))}
      </svg>
    </div>
  );
}

// Alias for backward compatibility
export const AnimatedBackground = MeteorEffect;

export function GradientOrb({
  className = "",
  blendMode = "normal" as "normal" | "multiply" | "color-burn" | "color-dodge" | "screen",
}: {
  className?: string;
  blendMode?: "normal" | "multiply" | "color-burn" | "color-dodge" | "screen";
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      style={{
        mixBlendMode: blendMode,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
        x: [-10, 10, -10],
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function AnimatedGradient() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Purple orb with multiply blend */}
      <GradientOrb
        className="w-[500px] h-[500px] bg-purple-600 -top-48 -left-48"
        blendMode="multiply"
      />

      {/* Yellow orb with color-burn blend */}
      <GradientOrb
        className="w-[400px] h-[400px] bg-yellow-400 top-1/3 -right-32"
        blendMode="color-burn"
      />

      {/* Purple orb bottom with multiply blend */}
      <GradientOrb
        className="w-[600px] h-[600px] bg-purple-700 -bottom-64 left-1/3"
        blendMode="multiply"
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
}

// Gradient overlay for specific sections (hero, pricing)
export function GradientOverlay({
  variant = "hero" as "hero" | "pricing" | "subtle",
  className = "",
}: {
  variant?: "hero" | "pricing" | "subtle";
  className?: string;
}) {
  // Variant-specific configurations
  const configs = {
    hero: {
      orbs: [
        { size: "w-[600px] h-[600px]", color: "bg-purple-500", position: "top-0 left-0 -translate-x-1/3 -translate-y-1/3", blend: "multiply" as const },
        { size: "w-[500px] h-[500px]", color: "bg-yellow-400", position: "top-1/4 right-0 translate-x-1/4", blend: "color-burn" as const },
        { size: "w-[400px] h-[400px]", color: "bg-purple-600", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3", blend: "multiply" as const },
      ],
    },
    pricing: {
      orbs: [
        { size: "w-[500px] h-[500px]", color: "bg-yellow-300", position: "top-0 left-1/4 -translate-y-1/2", blend: "color-burn" as const },
        { size: "w-[450px] h-[450px]", color: "bg-purple-500", position: "bottom-0 right-1/4 translate-y-1/2", blend: "multiply" as const },
      ],
    },
    subtle: {
      orbs: [
        { size: "w-[400px] h-[400px]", color: "bg-purple-400", position: "top-1/2 left-0 -translate-x-1/2", blend: "multiply" as const },
      ],
    },
  };

  const selectedConfig = configs[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {selectedConfig.orbs.map((orb, index) => (
        <GradientOrb
          key={index}
          className={`${orb.size} ${orb.color} ${orb.position}`}
          blendMode={orb.blend}
        />
      ))}
    </div>
  );
}

// Circuit board background pattern for technical aesthetic
export function CircuitBackground({
  opacity = 0.15,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="circuit-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal lines */}
            <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-purple-500/30" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-purple-500/30" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-purple-500/30" />

            {/* Vertical lines */}
            <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-purple-500/30" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-purple-500/30" />
            <line x1="80" y1="0" x2="80" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-purple-500/30" />

            {/* Circuit nodes */}
            <circle cx="20" cy="20" r="2" fill="currentColor" className="text-purple-400/50" />
            <circle cx="50" cy="50" r="2" fill="currentColor" className="text-purple-400/50" />
            <circle cx="80" cy="80" r="2" fill="currentColor" className="text-purple-400/50" />
            <circle cx="80" cy="20" r="2" fill="currentColor" className="text-blue-400/50" />
            <circle cx="20" cy="80" r="2" fill="currentColor" className="text-blue-400/50" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
    </div>
  );
}
