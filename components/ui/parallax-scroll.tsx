"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: ReactNode;
  /**
   * Scroll speed multiplier
   * < 1 = slower than scroll (background effect)
   * > 1 = faster than scroll (foreground effect)
   * Default: 0.5
   */
  speed?: number;
  /**
   * Enable smooth spring animation
   * Default: true
   */
  smooth?: boolean;
  className?: string;
}

/**
 * ParallaxSection - Section with scroll-based parallax effect
 *
 * Clerk.com-style parallax scrolling:
 * - Multiple layers with different scroll speeds
 * - Smooth spring interpolation
 * - Performance optimized (transform only)
 *
 * @example
 * <ParallaxSection speed={0.5}>
 *   <div>Background layer (slower)</div>
 * </ParallaxSection>
 */
export function ParallaxSection({
  children,
  speed = 0.5,
  smooth = true,
  className = ""
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to Y position
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    // Adjust range based on speed (slower speed = less movement)
    [`${(speed - 1) * 100}%`, `${(1 - speed) * 100}%`]
  );

  // Apply spring for smooth movement
  const y = smooth
    ? useSpring(rawY, { stiffness: 100, damping: 30, mass: 0.5 })
    : rawY;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        style={{ y }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * ParallaxLayers - Container for multi-layer parallax
 *
 * Manages multiple ParallaxSection components with different speeds
 */
export function ParallaxLayers({
  layers,
  className = ""
}: {
  layers: Array<{ content: ReactNode; speed?: number; className?: string }>;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {layers.map((layer, index) => (
        <ParallaxSection
          key={index}
          speed={layer.speed}
          className={cn("absolute inset-0", layer.className)}
        >
          {layer.content}
        </ParallaxSection>
      ))}
    </div>
  );
}

/**
 * ParallaxImage - Image with parallax effect
 *
 * Common pattern: Image that moves slower than scroll
 */
export function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  className = ""
}: {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}) {
  return (
    <ParallaxSection speed={speed} className={cn("overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </ParallaxSection>
  );
}

/**
 * ParallaxText - Text with scroll-based reveal and parallax
 *
 * Text that fades in and moves as you scroll
 */
export function ParallaxText({
  children,
  speed = 0.8,
  className = ""
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${(speed - 1) * 50}%`, `${(1 - speed) * 50}%`]
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        style={{ opacity, y }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * ParallaxHero - Hero section with multi-layer parallax
 *
 * Pre-built hero pattern with background, midground, and foreground layers
 */
export function ParallaxHero({
  background,
  midground,
  foreground,
  className = ""
}: {
  background?: ReactNode;
  midground?: ReactNode;
  foreground: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Background layer (slowest) */}
      {background && (
        <ParallaxSection speed={0.3} className="absolute inset-0 z-0">
          {background}
        </ParallaxSection>
      )}

      {/* Midground layer (medium speed) */}
      {midground && (
        <ParallaxSection speed={0.6} className="absolute inset-0 z-10">
          {midground}
        </ParallaxSection>
      )}

      {/* Foreground layer (normal speed) */}
      <div className="relative z-20">
        {foreground}
      </div>
    </div>
  );
}

/**
 * useParallaxEffect - Hook for custom parallax effects
 *
 * Returns a MotionValue you can use for custom parallax animations
 */
export function useParallaxEffect(
  speed: number = 0.5,
  range: [number, number] = [0, 1]
): MotionValue<number> {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const value = useTransform(scrollYProgress, range, [
    `${(speed - 1) * 100}%`,
    `${(1 - speed) * 100}%`
  ]);

  return useSpring(value, { stiffness: 100, damping: 30 });
}
