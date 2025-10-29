"use client";

import { motion } from "framer-motion";
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
  // Core Stack
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
    tagline: "Deployment",
    href: "https://vercel.com",
  },
  {
    name: "PostgreSQL",
    type: "stack",
    fontFamily: "font-sans font-medium",
    tagline: "Database",
    href: "https://postgresql.org",
  },
  {
    name: "Redis",
    type: "stack",
    fontFamily: "font-sans font-semibold tracking-wide",
    tagline: "Caching",
    href: "https://redis.io",
  },
  {
    name: "Qdrant",
    type: "stack",
    fontFamily: "font-sans font-medium",
    tagline: "Vector Search",
    href: "https://qdrant.tech",
  },
  {
    name: "Railway",
    type: "stack",
    fontFamily: "font-sans font-medium tracking-tight",
    tagline: "Infrastructure",
    href: "https://railway.app",
  },

  // Integrations
  {
    name: "Clerk",
    type: "integration",
    fontFamily: "font-sans font-medium tracking-tight",
    tagline: "Authentication",
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
    tagline: "Web Scraping",
    href: "https://firecrawl.dev",
  },
  {
    name: "Unstructured.io",
    type: "integration",
    fontFamily: "font-sans font-bold tracking-tight",
    tagline: "Document AI",
    href: "https://unstructured.io",
  },
  {
    name: "Mem0",
    type: "integration",
    fontFamily: "font-sans font-semibold",
    tagline: "Memory Layer",
    href: "https://mem0.ai",
  },
];

function titleFor(types: Set<LogoType>) {
  if (types.size === 1) {
    const only = [...types][0];
    if (only === "integration") return "Integrates with leading platforms";
    if (only === "stack") return "Built with tools we trust";
  }
  // mixed list
  return "Built with tools we trust";
}

// Individual logo card with flip animation
function LogoCard({ logo, delay }: { logo: LogoItem; delay: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Set up non-coordinated rotation with random intervals
    const rotationInterval = 4000 + Math.random() * 3000; // 4-7 seconds

    const flipTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, rotationInterval);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(flipTimer);
  }, [delay]);

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 4000 }}
      className="perspective-1000"
    >
      <a
        href={logo.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${logo.name} (${logo.type})`}
        className="group block h-full"
      >
        <motion.div
          className="relative h-32 w-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front - Company Name */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl border border-gray-200/70 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all group-hover:border-purple-300/50 group-hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:group-hover:border-purple-500/30"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span
              className={`text-xl text-gray-900 dark:text-gray-100 ${logo.fontFamily}`}
            >
              {logo.name}
            </span>
          </div>

          {/* Back - Tagline */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-2xl border border-purple-200/70 bg-purple-50/80 p-6 shadow-sm backdrop-blur-sm dark:border-purple-500/30 dark:bg-purple-900/20"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              {logo.tagline}
            </span>
          </div>
        </motion.div>
      </a>
    </motion.li>
  );
}

export default function LogoWall() {
  const typeSet = new Set(logos.map((l) => l.type));
  const title = titleFor(typeSet);

  // Generate random delays for non-coordinated animations
  const delays = logos.map(() => Math.random() * 5000); // 0-5 second delays

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Names are used for identification only. All trademarks are property
          of their respective owners.
        </p>
      </motion.div>

      <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {logos.map((logo, index) => (
          <LogoCard key={logo.name} logo={logo} delay={delays[index]} />
        ))}
      </ul>
    </section>
  );
}
