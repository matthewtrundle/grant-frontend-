"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type LogoType = "stack" | "integration";

type LogoItem = {
  name: string;
  type: LogoType;
  fontFamily: string;
  tagline: string;
  href?: string;
};

// Tech stack with brand-appropriate font families
const logos: LogoItem[] = [
  {
    name: "Anthropic",
    type: "stack",
    fontFamily: "font-sans font-semibold tracking-tight",
    tagline: "AI Foundation",
    href: "https://anthropic.com",
  },
  {
    name: "Vercel",
    type: "stack",
    fontFamily: "font-sans font-medium tracking-tight",
    tagline: "Deployment Platform",
    href: "https://vercel.com",
  },
  {
    name: "PostgreSQL",
    type: "stack",
    fontFamily: "font-sans font-medium",
    tagline: "Relational Database",
    href: "https://postgresql.org",
  },
  {
    name: "Redis",
    type: "stack",
    fontFamily: "font-sans font-semibold tracking-wide",
    tagline: "In-Memory Cache",
    href: "https://redis.io",
  },
  {
    name: "Qdrant",
    type: "stack",
    fontFamily: "font-sans font-medium",
    tagline: "Vector Database",
    href: "https://qdrant.tech",
  },
  {
    name: "Railway",
    type: "stack",
    fontFamily: "font-sans font-medium tracking-tight",
    tagline: "Cloud Infrastructure",
    href: "https://railway.app",
  },
  {
    name: "Clerk",
    type: "integration",
    fontFamily: "font-sans font-medium tracking-tight",
    tagline: "Auth Platform",
    href: "https://clerk.com",
  },
  {
    name: "OpenRouter",
    type: "integration",
    fontFamily: "font-mono font-medium",
    tagline: "LLM Gateway",
    href: "https://openrouter.ai",
  },
  {
    name: "Firecrawl",
    type: "integration",
    fontFamily: "font-sans font-semibold",
    tagline: "Web Intelligence",
    href: "https://firecrawl.dev",
  },
  {
    name: "Unstructured.io",
    type: "integration",
    fontFamily: "font-sans font-bold tracking-tight",
    tagline: "Document Processing",
    href: "https://unstructured.io",
  },
  {
    name: "Mem0",
    type: "integration",
    fontFamily: "font-sans font-semibold",
    tagline: "Memory Infrastructure",
    href: "https://mem0.ai",
  },
];

function LogoCard({ logo, index }: { logo: LogoItem; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const rotationInterval = 6000 + Math.random() * 3000;
    const initialDelay = index * 500;

    const flipTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, rotationInterval);

      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(flipTimer);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="flex-1 min-w-[220px]"
      style={{ perspective: "1000px" }}
    >
      <a
        href={logo.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${logo.name}`}
        className="group block h-full"
      >
        <motion.div
          className="relative h-28 w-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front - Company Name */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-purple-300/50 group-hover:bg-white dark:bg-gray-900/90 dark:border-gray-700/50 dark:group-hover:border-purple-500/50"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-center px-4">
              <span className={`text-2xl text-gray-900 dark:text-gray-100 ${logo.fontFamily}`}>
                {logo.name}
              </span>
            </div>
          </div>

          {/* Back - Tagline */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 backdrop-blur-sm border border-purple-200/50 shadow-sm dark:from-purple-900/20 dark:to-blue-900/20 dark:border-purple-500/30"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300 px-4 text-center">
              {logo.tagline}
            </span>
            <span className="text-xs text-purple-600/60 dark:text-purple-400/60 mt-2 uppercase tracking-wider">
              {logo.type === "stack" ? "Core Infrastructure" : "Integration"}
            </span>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
}

export default function LogoWall() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + itemsToShow) % logos.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const visibleLogos = [];
  for (let i = 0; i < itemsToShow; i++) {
    visibleLogos.push(logos[(startIndex + i) % logos.length]);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-3"
      >
        <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Built with tools we trust
        </h2>
        <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-500 max-w-xl mx-auto">
          Names and trademarks are used for identification only. All trademarks are property of their respective owners.
        </p>
      </motion.div>

      {/* Single row of 4 rotating logos */}
      <div className="mt-12 flex gap-5 items-stretch justify-center">
        <AnimatePresence>
          {visibleLogos.map((logo, index) => (
            <LogoCard key={`${logo.name}-${startIndex}`} logo={logo} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Minimalist pagination indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-8">
        {Array.from({ length: Math.ceil(logos.length / itemsToShow) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStartIndex(i * itemsToShow)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === Math.floor(startIndex / itemsToShow)
                ? "w-6 bg-gradient-to-r from-purple-500 to-blue-500"
                : "w-1.5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
