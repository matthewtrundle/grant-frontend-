"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Abstract card variants - each unique, not templated

/**
 * Offset Card - Content intentionally misaligned, thick left border
 */
export interface OffsetCardProps {
  title: string;
  description: string;
  number?: string;
  theme?: "light" | "dark";
  className?: string;
}

export function OffsetCard({
  title,
  description,
  number,
  theme = "light",
  className,
}: OffsetCardProps) {
  const isDark = theme === "dark";

  return (
    <motion.div
      className={cn(
        "relative p-8 card-bordered-left",
        isDark ? "bg-black text-white border-white" : "bg-white text-black border-black",
        className
      )}
      whileHover={{ x: 8, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {number && (
        <div
          className={cn(
            "floating-number top-4 right-4",
            isDark ? "text-white" : "text-black"
          )}
        >
          {number}
        </div>
      )}
      <h3 className={cn("text-2xl font-bold mb-4", isDark ? "text-white" : "text-black")}>
        {title}
      </h3>
      <p className={cn("body-black", isDark && "body-white")}>{description}</p>
    </motion.div>
  );
}

/**
 * Stat Card - Large number as visual element
 */
export interface StatCardProps {
  stat: string;
  label: string;
  description?: string;
  theme?: "light" | "dark";
  className?: string;
}

export function StatCard({
  stat,
  label,
  description,
  theme = "light",
  className,
}: StatCardProps) {
  const isDark = theme === "dark";

  return (
    <motion.div
      className={cn(
        "p-8 relative overflow-hidden",
        isDark ? "card-dark" : "card-light",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative z-10">
        <div
          className={cn(
            "text-6xl md:text-7xl font-black mb-2",
            isDark ? "text-white" : "text-black"
          )}
        >
          {stat}
        </div>
        <div
          className={cn(
            "text-lg font-semibold mb-2",
            isDark ? "text-gray-300" : "text-gray-700"
          )}
        >
          {label}
        </div>
        {description && (
          <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Asymmetric Text Card - Typography-first, minimal design
 */
export interface AsymmetricTextCardProps {
  title: string;
  children: ReactNode;
  accentPosition?: "top" | "left";
  theme?: "light" | "dark";
  className?: string;
}

export function AsymmetricTextCard({
  title,
  children,
  accentPosition = "left",
  theme = "light",
  className,
}: AsymmetricTextCardProps) {
  const isDark = theme === "dark";

  return (
    <motion.div
      className={cn(
        "p-8",
        accentPosition === "left" ? "card-bordered-left" : "card-bordered-top",
        isDark
          ? "bg-black text-white border-accent"
          : "bg-white text-black border-accent",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3
        className={cn(
          "text-3xl md:text-4xl font-bold mb-6",
          isDark ? "text-white" : "text-black"
        )}
      >
        {title}
      </h3>
      <div className={cn("space-y-4", isDark ? "text-gray-300" : "text-gray-700")}>
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Floating Content Card - Content hovers above background
 */
export interface FloatingContentCardProps {
  children: ReactNode;
  theme?: "light" | "dark";
  elevation?: "subtle" | "lifted" | "float";
  className?: string;
}

export function FloatingContentCard({
  children,
  theme = "light",
  elevation = "lifted",
  className,
}: FloatingContentCardProps) {
  const isDark = theme === "dark";
  const shadowClass = {
    subtle: "shadow-subtle",
    lifted: "shadow-lifted",
    float: "shadow-float",
  }[elevation];

  return (
    <motion.div
      className={cn(
        "p-10 rounded-none",
        isDark ? "bg-black text-white" : "bg-white text-black",
        shadowClass,
        className
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Split Card - Two-tone split design
 */
export interface SplitCardProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  splitDirection?: "vertical" | "horizontal";
  className?: string;
}

export function SplitCard({
  leftContent,
  rightContent,
  splitDirection = "horizontal",
  className,
}: SplitCardProps) {
  return (
    <motion.div
      className={cn(
        "overflow-hidden shadow-soft",
        splitDirection === "horizontal" ? "flex flex-col md:flex-row" : "flex flex-col",
        className
      )}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-1 bg-black text-white p-8">{leftContent}</div>
      <div className="flex-1 bg-white text-black p-8 border border-gray-200">
        {rightContent}
      </div>
    </motion.div>
  );
}

/**
 * Minimal Icon Card - Simple icon with label, no borders
 */
export interface MinimalIconCardProps {
  icon: ReactNode;
  label: string;
  theme?: "light" | "dark";
  className?: string;
}

export function MinimalIconCard({
  icon,
  label,
  theme = "light",
  className,
}: MinimalIconCardProps) {
  const isDark = theme === "dark";

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center p-6 space-y-4 transition-all",
        isDark ? "hover:bg-gray-900" : "hover:bg-gray-50",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={cn(isDark ? "text-white" : "text-black")}>{icon}</div>
      <span
        className={cn(
          "text-sm font-medium text-center",
          isDark ? "text-gray-300" : "text-gray-700"
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

/**
 * Quote Card - Large quote with attribution
 */
export interface QuoteCardProps {
  quote: string;
  author: string;
  role?: string;
  theme?: "light" | "dark";
  className?: string;
}

export function QuoteCard({
  quote,
  author,
  role,
  theme = "light",
  className,
}: QuoteCardProps) {
  const isDark = theme === "dark";

  return (
    <motion.div
      className={cn(
        "p-10 relative texture-paper",
        isDark ? "bg-black text-white" : "bg-white text-black border border-gray-200",
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative z-10">
        <div className="text-6xl font-serif mb-4 opacity-20">"</div>
        <p className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
          {quote}
        </p>
        <div className={cn("font-semibold", isDark ? "text-white" : "text-black")}>
          {author}
        </div>
        {role && (
          <div className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
            {role}
          </div>
        )}
      </div>
    </motion.div>
  );
}
