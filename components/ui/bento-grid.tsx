"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PremiumMotionCard } from "./motion-card";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  /**
   * Number of columns in the grid
   * Default: 3
   */
  columns?: 1 | 2 | 3 | 4;
  /**
   * Gap between grid items
   * Default: 6 (1.5rem)
   */
  gap?: number;
  /**
   * Enable staggered animation on mount
   * Default: true
   */
  stagger?: boolean;
}

/**
 * BentoGrid - Premium grid layout for feature showcases
 *
 * Clerk.com-style bento grid with:
 * - Responsive column layout (1-4 columns)
 * - Staggered entrance animations
 * - Built-in support for spanning items
 * - Glassmorphic card integration
 *
 * @example
 * <BentoGrid columns={3} gap={6}>
 *   <BentoGridItem>Content</BentoGridItem>
 *   <BentoGridItem span="2">Wider content</BentoGridItem>
 * </BentoGrid>
 */
export function BentoGrid({
  children,
  className = "",
  columns = 3,
  gap = 6,
  stagger = true
}: BentoGridProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  const gapClass = `gap-${gap}`;

  return (
    <motion.div
      className={cn(
        "grid",
        colClasses[columns],
        gapClass,
        className
      )}
      initial={stagger ? "hidden" : undefined}
      whileInView={stagger ? "visible" : undefined}
      viewport={{ once: true, margin: "-100px" }}
      variants={
        stagger
          ? {
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}

interface BentoGridItemProps {
  children: ReactNode;
  className?: string;
  /**
   * Grid column span
   * Default: 1
   */
  span?: "1" | "2" | "3" | "full";
  /**
   * Grid row span
   * Default: 1
   */
  rowSpan?: "1" | "2" | "3";
  /**
   * Enable glassmorphic card wrapper
   * Default: true
   */
  glass?: boolean;
  /**
   * Enable premium motion effects
   * Default: true
   */
  motion?: boolean;
  /**
   * Custom gradient overlay on hover
   * Default: purple to blue
   */
  gradientFrom?: string;
  gradientTo?: string;
}

/**
 * BentoGridItem - Individual item within BentoGrid
 *
 * Features:
 * - Automatic stagger animation within BentoGrid
 * - Column/row spanning
 * - Optional glassmorphic wrapper
 * - Gradient hover effects
 *
 * @example
 * <BentoGridItem span="2" rowSpan="2">
 *   <h3>Featured Content</h3>
 * </BentoGridItem>
 */
export function BentoGridItem({
  children,
  className = "",
  span = "1",
  rowSpan = "1",
  glass = true,
  motion: enableMotion = true,
  gradientFrom = "from-purple-500/0",
  gradientTo = "to-blue-500/0"
}: BentoGridItemProps) {
  const spanClasses = {
    "1": "",
    "2": "md:col-span-2",
    "3": "md:col-span-3",
    "full": "md:col-span-full"
  };

  const rowSpanClasses = {
    "1": "",
    "2": "md:row-span-2",
    "3": "md:row-span-3"
  };

  const content = (
    <div className="relative h-full overflow-hidden group">
      {/* Gradient hover overlay */}
      {glass && (
        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            gradientFrom,
            gradientTo
          )}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (!glass) {
    return (
      <motion.div
        className={cn(
          spanClasses[span],
          rowSpanClasses[rowSpan],
          className
        )}
        variants={itemVariants}
      >
        {content}
      </motion.div>
    );
  }

  if (!enableMotion) {
    return (
      <motion.div
        className={cn(
          spanClasses[span],
          rowSpanClasses[rowSpan]
        )}
        variants={itemVariants}
      >
        <div className={cn(
          "p-6 md:p-8 h-full",
          "backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl",
          className
        )}>
          {content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(
        spanClasses[span],
        rowSpanClasses[rowSpan]
      )}
      variants={itemVariants}
    >
      <PremiumMotionCard className={cn(
        "p-6 md:p-8 h-full backdrop-blur-xl bg-white/[0.03] border border-white/10",
        className
      )}>
        {content}
      </PremiumMotionCard>
    </motion.div>
  );
}

/**
 * BentoFeatureCard - Pre-styled feature card for Bento Grid
 *
 * Common pattern: Icon + Title + Description
 */
export function BentoFeatureCard({
  icon,
  title,
  description,
  badge,
  className = ""
}: {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Icon container */}
      <motion.div
        className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>

      {/* Badge (optional) */}
      {badge && (
        <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium">
          {badge}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-white/60 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/**
 * BentoStatCard - Pre-styled stat card for Bento Grid
 *
 * Common pattern: Large number + Label + Description
 */
export function BentoStatCard({
  stat,
  label,
  description,
  trend,
  className = ""
}: {
  stat: string;
  label: string;
  description?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}) {
  const trendColors = {
    up: "text-green-400",
    down: "text-red-400",
    neutral: "text-white/40"
  };

  return (
    <div className={cn("space-y-3 text-center", className)}>
      {/* Stat */}
      <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        {stat}
      </div>

      {/* Label */}
      <div className="text-lg md:text-xl font-semibold text-white">
        {label}
      </div>

      {/* Description */}
      {description && (
        <div className={cn(
          "text-sm",
          trend ? trendColors[trend] : "text-white/60"
        )}>
          {description}
        </div>
      )}
    </div>
  );
}
