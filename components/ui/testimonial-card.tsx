"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { PremiumMotionCard } from "./motion-card";
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    role: string;
    company?: string;
    avatar?: string;
  };
  /**
   * Star rating (1-5)
   */
  rating?: number;
  /**
   * Enable avatar glow effect
   * Default: true
   */
  avatarGlow?: boolean;
  /**
   * Glow color for avatar ring
   * Default: purple-500
   */
  glowColor?: string;
  className?: string;
}

/**
 * TestimonialCard - Customer testimonial with avatar glow
 *
 * Clerk.com-style testimonial featuring:
 * - Avatar with gradient glow ring
 * - Glassmorphic card background
 * - Quote with gradient quotation marks
 * - Star rating (optional)
 * - Hover shadow bloom effect
 *
 * @example
 * <TestimonialCard
 *   quote="This saved us weeks of work!"
 *   author={{ name: "Jane Doe", role: "CTO", company: "TechCo", avatar: "/avatars/jane.jpg" }}
 *   rating={5}
 * />
 */
export function TestimonialCard({
  quote,
  author,
  rating,
  avatarGlow = true,
  glowColor = "#9333ea",
  className = ""
}: TestimonialCardProps) {
  return (
    <PremiumMotionCard
      className={cn(
        "p-6 md:p-8 backdrop-blur-xl bg-white/[0.03] border border-white/10 h-full",
        className
      )}
    >
      <div className="flex flex-col h-full space-y-6">
        {/* Quote icon with gradient */}
        <div className="relative">
          <Quote className="w-8 h-8 text-purple-400 opacity-50" />
        </div>

        {/* Quote text */}
        <blockquote className="flex-1 text-white/90 text-lg leading-relaxed">
          {quote}
        </blockquote>

        {/* Rating stars (if provided) */}
        {rating && (
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <svg
                  className={cn(
                    "w-5 h-5",
                    i < rating ? "text-yellow-400" : "text-white/20"
                  )}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
            ))}
          </div>
        )}

        {/* Author section */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          {/* Avatar with glow ring */}
          <div className="relative">
            {avatarGlow && (
              <div
                className="absolute inset-0 rounded-full blur-md"
                style={{
                  background: `radial-gradient(circle, ${glowColor}80 0%, transparent 70%)`,
                  transform: "scale(1.2)"
                }}
              />
            )}

            <div
              className={cn(
                "relative w-12 h-12 rounded-full overflow-hidden",
                avatarGlow && "ring-2 ring-purple-500/50"
              )}
            >
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                  {author.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Author info */}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white truncate">
              {author.name}
            </div>
            <div className="text-sm text-white/60 truncate">
              {author.role}
              {author.company && ` at ${author.company}`}
            </div>
          </div>
        </div>
      </div>
    </PremiumMotionCard>
  );
}

/**
 * TestimonialGrid - Masonry grid layout for testimonials
 *
 * Responsive grid with staggered reveals
 */
export function TestimonialGrid({
  testimonials,
  columns = 3,
  className = ""
}: {
  testimonials: Array<TestimonialCardProps>;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const colClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <motion.div
      className={cn("grid gap-6", colClasses[columns], className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
        >
          <TestimonialCard {...testimonial} />
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * CompactTestimonialCard - Smaller testimonial variant
 *
 * Useful for sidebars or tight spaces
 */
export function CompactTestimonialCard({
  quote,
  author,
  className = ""
}: Omit<TestimonialCardProps, "rating" | "avatarGlow" | "glowColor">) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg backdrop-blur-xl bg-white/[0.03] border border-white/10",
        className
      )}
    >
      <div className="space-y-3">
        <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
          {quote}
        </p>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold">
            {author.name.charAt(0)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white truncate">
              {author.name}
            </div>
            <div className="text-xs text-white/60 truncate">{author.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
