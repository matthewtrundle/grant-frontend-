"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  variant?: "fadeIn" | "slideUp" | "slideInLeft" | "slideInRight";
  delay?: number;
  duration?: number;
  className?: string;
}

// Animation variants for different reveal effects
const variants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
};

export function RevealOnScroll({
  children,
  variant = "slideUp",
  delay = 0,
  duration = 0.6,
  className = "",
}: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
}

// Staggered reveal for grid/list items
interface StaggerRevealProps {
  children: ReactNode;
  variant?: "fadeIn" | "slideUp" | "slideInLeft" | "slideInRight";
  staggerDelay?: number;
  duration?: number;
  className?: string;
}

export function StaggerReveal({
  children,
  variant = "slideUp",
  staggerDelay = 0.1,
  duration = 0.6,
  className = "",
}: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        staggerChildren: staggerDelay,
      }}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual item wrapper for StaggerReveal
interface StaggerItemProps {
  children: ReactNode;
  variant?: "fadeIn" | "slideUp" | "slideInLeft" | "slideInRight";
  duration?: number;
  className?: string;
}

export function StaggerItem({
  children,
  variant = "slideUp",
  duration = 0.6,
  className = "",
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      transition={{
        duration,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
