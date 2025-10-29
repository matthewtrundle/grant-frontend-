"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverShadow?: string;
  transition?: {
    duration?: number;
    ease?: string;
  };
  /**
   * Enable 3D tilt effect on hover
   * Default: false
   */
  tilt?: boolean;
  /**
   * Enable border glow animation on hover
   * Default: false
   */
  borderGlow?: boolean;
  /**
   * Enable inner glow overlay on hover
   * Default: false
   */
  innerGlow?: boolean;
  /**
   * Glow color (for borderGlow and innerGlow)
   * Default: purple-500
   */
  glowColor?: string;
  /**
   * Enable Clerk-style gradient border
   * Default: false
   */
  gradientBorder?: boolean;
}

export function MotionCard({
  children,
  className = "",
  hoverScale = 1.02,
  hoverShadow = "0 20px 40px rgba(0, 0, 0, 0.12)",
  transition = { duration: 0.3, ease: "easeOut" },
  tilt = false,
  borderGlow = false,
  innerGlow = false,
  glowColor = "rgba(147, 51, 234, 0.5)", // purple-500
  gradientBorder = false,
}: MotionCardProps) {
  return (
    <motion.div
      className={cn("h-full", tilt && "perspective-1000")}
      style={{
        perspective: tilt ? "1000px" : undefined,
        transformStyle: tilt ? "preserve-3d" : undefined,
      }}
      whileHover={{
        scale: hoverScale,
        boxShadow: hoverShadow,
        ...(tilt && {
          rotateX: 2,
          rotateY: -2,
        }),
      }}
      transition={transition}
    >
      <Card
        className={cn(
          "h-full relative",
          borderGlow && "hover:border-purple-400 transition-colors duration-300",
          className
        )}
        style={{
          ...(borderGlow && {
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }),
        }}
      >
        {/* Gradient border effect (Clerk-style) */}
        {gradientBorder && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10" />
        )}

        {/* Inner glow overlay */}
        {innerGlow && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${glowColor}, transparent 50%)`,
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.15 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Card content */}
        <div className="relative z-10">{children}</div>
      </Card>
    </motion.div>
  );
}

// Premium variant with all effects enabled (Clerk-inspired)
export function PremiumMotionCard({
  children,
  className = "",
  ...props
}: MotionCardProps) {
  return (
    <MotionCard
      className={className}
      tilt
      borderGlow
      innerGlow
      gradientBorder
      hoverScale={1.03}
      hoverShadow="0 25px 50px rgba(147, 51, 234, 0.25)"
      {...props}
    >
      {children}
    </MotionCard>
  );
}

// Enhanced stage card variant specifically for Grant Automation stages
export function PremiumStageCard({
  children,
  className = "",
}: Omit<MotionCardProps, "hoverScale" | "transition">) {
  return (
    <motion.div
      className={cn("group relative h-full", className)}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Outer gradient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

      {/* Card container with gradient border and background */}
      <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-white/10 group-hover:border-purple-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300">
        {/* Inner hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-300" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}

// Icon wrapper with hover animation
interface MotionIconProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: "scale" | "rotate" | "bounce";
}

export function MotionIcon({
  children,
  className = "",
  hoverEffect = "scale",
}: MotionIconProps) {
  const hoverAnimations = {
    scale: { scale: 1.15 },
    rotate: { rotate: 10 },
    bounce: { y: -4 },
  };

  return (
    <motion.div
      className={className}
      whileHover={hoverAnimations[hoverEffect]}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Gradient border card (light mode - for white backgrounds)
export function LightGradientCard({
  children,
  className = "",
}: Pick<MotionCardProps, "children" | "className">) {
  return (
    <motion.div
      className={cn("relative group h-full", className)}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient border glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />

      {/* Card with border that becomes transparent on hover to show gradient */}
      <div className="relative h-full p-8 rounded-2xl bg-white border-2 border-gray-200 group-hover:border-transparent text-center transition-all duration-300 shadow-sm">
        {children}
      </div>
    </motion.div>
  );
}

// Dark gradient border card (dark mode - for black backgrounds)
export function DarkGradientCard({
  children,
  className = "",
}: Pick<MotionCardProps, "children" | "className">) {
  return (
    <motion.div
      className={cn("group relative h-full", className)}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Outer gradient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

      {/* Card with subtle gradient background and border */}
      <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-white/10 group-hover:border-purple-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300">
        {/* Inner hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-300" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}
