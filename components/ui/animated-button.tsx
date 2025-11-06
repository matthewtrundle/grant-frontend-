"use client";

import { motion } from "framer-motion";
import { Button } from "./button";
import { ButtonProps } from "@/components/ui/button";
import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  /**
   * Enable shimmer effect on hover
   * Default: true
   */
  shimmer?: boolean;
  /**
   * Enable ripple effect on click
   * Default: true
   */
  ripple?: boolean;
  /**
   * Enable shadow pulse on hover
   * Default: true
   */
  shadowPulse?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, shimmer = true, ripple = true, shadowPulse = true, ...props }, ref) => {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }

      // Call original onClick if provided
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <motion.div
        className="relative inline-block"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden",
            shimmer && "hover:[background-image:linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)]",
            className
          )}
          {...props}
          onClick={handleClick}
          style={{
            ...props.style,
            ...(shadowPulse && {
              transition: "box-shadow 0.3s ease",
            }),
          }}
        >
          {/* Shimmer effect */}
          {shimmer && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{
                x: "100%",
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeInOut",
                },
              }}
            />
          )}

          {/* Button content */}
          <span className="relative z-10">{children}</span>

          {/* Ripple effects */}
          {ripple &&
            ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                className="absolute rounded-full bg-white/50 pointer-events-none"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: 0,
                  height: 0,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ width: 0, height: 0, opacity: 0.5 }}
                animate={{
                  width: 300,
                  height: 300,
                  opacity: 0,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

// Variant for gradient buttons with animated gradient background
export const GradientAnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <AnimatedButton
        ref={ref}
        className={cn(
          "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
          "shadow-lg hover:shadow-xl transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </AnimatedButton>
    );
  }
);

GradientAnimatedButton.displayName = "GradientAnimatedButton";
