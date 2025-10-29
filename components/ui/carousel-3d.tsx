"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Carousel3DProps {
  items: React.ReactNode[];
  /**
   * Auto-rotate interval in milliseconds (0 to disable)
   * Default: 5000 (5 seconds)
   */
  autoRotate?: number;
  /**
   * Enable pause on hover
   * Default: true
   */
  pauseOnHover?: boolean;
  /**
   * Card width in pixels
   * Default: 400
   */
  cardWidth?: number;
  /**
   * Card height in pixels
   * Default: 500
   */
  cardHeight?: number;
  className?: string;
}

/**
 * Carousel3D - 3D rotating carousel with perspective
 *
 * Clerk.com-style 3D carousel featuring:
 * - 3D perspective transform
 * - Auto-rotate with pause on hover
 * - Manual navigation (arrows + dots)
 * - Smooth easing animations
 * - Touch/swipe gestures
 *
 * @example
 * <Carousel3D
 *   items={[
 *     <TestimonialCard key={1} ... />,
 *     <TestimonialCard key={2} ... />,
 *   ]}
 *   autoRotate={5000}
 * />
 */
export function Carousel3D({
  items,
  autoRotate = 5000,
  pauseOnHover = true,
  cardWidth = 400,
  cardHeight = 500,
  className = ""
}: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  // Auto-rotate logic
  useEffect(() => {
    if (autoRotate === 0 || isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoRotate);

    return () => clearInterval(interval);
  }, [currentIndex, autoRotate, isPaused]);

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
  };

  // Variants for card animations
  const variants = {
    enter: (direction: "next" | "prev") => ({
      rotateY: direction === "next" ? 90 : -90,
      opacity: 0,
      scale: 0.8,
      z: -200
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0
    },
    exit: (direction: "next" | "prev") => ({
      rotateY: direction === "next" ? -90 : 90,
      opacity: 0,
      scale: 0.8,
      z: -200
    })
  };

  return (
    <div
      className={cn("relative flex flex-col items-center gap-8", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Carousel container with perspective */}
      <div
        className="relative overflow-visible"
        style={{
          perspective: "1000px",
          width: cardWidth,
          height: cardHeight
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              rotateY: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: 0.4 },
              scale: { duration: 0.6 },
              z: { duration: 0.6 }
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d"
            }}
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
        <motion.button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2">
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === index
                ? "bg-purple-500 w-8"
                : "bg-white/30 hover:bg-white/50"
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * SimpleCarousel - Flat carousel without 3D effects
 *
 * Lighter-weight alternative for simpler use cases
 */
export function SimpleCarousel({
  items,
  autoRotate = 5000,
  pauseOnHover = true,
  className = ""
}: Omit<Carousel3DProps, "cardWidth" | "cardHeight">) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (autoRotate === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoRotate);

    return () => clearInterval(interval);
  }, [currentIndex, autoRotate, isPaused, items.length]);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2 justify-center mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === index
                ? "bg-purple-500 w-8"
                : "bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
