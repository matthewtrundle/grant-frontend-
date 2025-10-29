"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, MouseEvent as ReactMouseEvent } from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonProps {
  /**
   * Magnetic strength (distance in pixels the button moves)
   * Default: 20
   */
  strength?: number;
  /**
   * Enable glow effect on hover
   * Default: true
   */
  glow?: boolean;
  /**
   * Glow color
   * Default: purple-500
   */
  glowColor?: string;
}

/**
 * MagneticButton - Button that follows mouse cursor within bounds
 *
 * Clerk.com-style magnetic interaction:
 * - Tracks mouse position within button area
 * - Smoothly translates button toward cursor
 * - Spring physics for natural movement
 * - Optional glow effect
 *
 * @example
 * <MagneticButton strength={25} glow>
 *   Magnetic CTA
 * </MagneticButton>
 */
export function MagneticButton({
  children,
  className,
  strength = 20,
  glow = true,
  glowColor = "rgba(147, 51, 234, 0.5)",
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for button position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring config for smooth movement
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Transform for glow
  const glowOpacity = useTransform(
    [springX, springY],
    ([latestX, latestY]: number[]) => {
      const distance = Math.sqrt(latestX ** 2 + latestY ** 2);
      return Math.min(distance / strength, 1) * 0.5;
    }
  );

  const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Apply strength multiplier
    const moveX = (distanceX / rect.width) * strength;
    const moveY = (distanceY / rect.height) * strength;

    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="relative inline-block">
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-lg blur-xl pointer-events-none"
          style={{
            background: glowColor,
            opacity: glowOpacity,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Button */}
      <motion.div
        style={{
          x: springX,
          y: springY
        }}
      >
        <Button
          ref={buttonRef}
          className={cn("relative", className)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    </div>
  );
}

/**
 * GradientMagneticButton - Magnetic button with gradient background
 *
 * Pre-styled variant with purple-to-blue gradient
 */
export function GradientMagneticButton({
  children,
  className,
  ...props
}: MagneticButtonProps) {
  return (
    <MagneticButton
      className={cn(
        "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
        "text-white font-semibold",
        "shadow-lg hover:shadow-xl transition-shadow duration-300",
        className
      )}
      glow
      glowColor="rgba(147, 51, 234, 0.6)"
      {...props}
    >
      {children}
    </MagneticButton>
  );
}

/**
 * OutlineMagneticButton - Magnetic button with glass outline
 *
 * Pre-styled variant with glassmorphic border
 */
export function OutlineMagneticButton({
  children,
  className,
  ...props
}: MagneticButtonProps) {
  return (
    <MagneticButton
      className={cn(
        "border border-white/20 bg-white/5 backdrop-blur-xl",
        "text-white hover:bg-white/10 hover:border-white/30",
        "transition-colors duration-300",
        className
      )}
      glow={false}
      {...props}
    >
      {children}
    </MagneticButton>
  );
}
