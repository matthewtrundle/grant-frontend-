"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
  /**
   * Gradient colors to animate between
   * Default: purple to yellow (brand colors)
   */
  colors?: {
    from: string;
    via?: string;
    to: string;
  };
  /**
   * Animation duration in seconds
   * Default: 3s
   */
  duration?: number;
  /**
   * Whether to add text glow effect
   * Default: false
   */
  glow?: boolean;
  /**
   * Glow color (if glow is enabled)
   * Default: purple-500
   */
  glowColor?: string;
  /**
   * Whether to add hover scale effect
   * Default: false
   */
  hoverScale?: boolean;
}

export function AnimatedGradientText({
  children,
  className = "",
  colors = {
    from: "#9333ea", // purple-600
    via: "#d946ef", // fuchsia-500
    to: "#eab308", // yellow-500
  },
  duration = 3,
  glow = false,
  glowColor = "rgba(147, 51, 234, 0.5)", // purple-600 with opacity
  hoverScale = false,
}: AnimatedGradientTextProps) {
  // Build gradient CSS
  const gradientStyle = colors.via
    ? `linear-gradient(90deg, ${colors.from}, ${colors.via}, ${colors.to}, ${colors.from})`
    : `linear-gradient(90deg, ${colors.from}, ${colors.to}, ${colors.from})`;

  return (
    <motion.span
      className={cn(
        "inline-block bg-clip-text text-transparent font-bold",
        // Improved rendering
        "[-webkit-background-clip:text] [-webkit-text-fill-color:transparent]",
        // Safari antialiasing fix
        "[text-rendering:optimizeLegibility] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]",
        glow && "drop-shadow-lg",
        className
      )}
      style={{
        background: gradientStyle,
        backgroundSize: "200% 100%",
        animation: `gradient-shift ${duration}s ease infinite`,
        ...(glow && {
          filter: `drop-shadow(0 0 20px ${glowColor})`,
        }),
      }}
      whileHover={
        hoverScale
          ? {
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" },
            }
          : undefined
      }
    >
      {children}
    </motion.span>
  );
}

// Simpler gradient text without animation (for performance-sensitive areas)
export function GradientText({
  children,
  className = "",
  from = "from-purple-600",
  via,
  to = "to-yellow-500",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  glow?: boolean;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent font-bold",
        from,
        via,
        to,
        // Improved rendering
        "[-webkit-background-clip:text] [-webkit-text-fill-color:transparent]",
        "[text-rendering:optimizeLegibility] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]",
        glow && "drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]",
        className
      )}
    >
      {children}
    </span>
  );
}
