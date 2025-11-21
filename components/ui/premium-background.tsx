"use client";

import { motion } from "framer-motion";

interface PremiumBackgroundProps {
  variant?: "ocean" | "teal" | "amber" | "gradient";
  intensity?: "subtle" | "medium" | "strong";
  className?: string;
}

export function PremiumBackground({
  variant = "ocean",
  intensity = "medium",
  className = "",
}: PremiumBackgroundProps) {
  const colorVariants = {
    ocean: {
      orb1: "from-ocean-200/30 via-teal-100/20",
      orb2: "from-teal-200/40 via-ocean-100/20",
      mesh: "from-ocean-50 via-white to-teal-50",
    },
    teal: {
      orb1: "from-teal-300/30 via-ocean-200/20",
      orb2: "from-ocean-300/40 via-teal-200/20",
      mesh: "from-teal-50 via-white to-ocean-50",
    },
    amber: {
      orb1: "from-amber-200/30 via-rose-100/20",
      orb2: "from-rose-200/40 via-amber-100/20",
      mesh: "from-amber-50 via-white to-rose-50",
    },
    gradient: {
      orb1: "from-purple-200/30 via-blue-100/20",
      orb2: "from-blue-200/40 via-purple-100/20",
      mesh: "from-purple-50 via-white to-blue-50",
    },
  };

  const intensityMap = {
    subtle: { orb1Size: "600px", orb2Size: "400px", opacity: 0.5 },
    medium: { orb1Size: "800px", orb2Size: "600px", opacity: 0.7 },
    strong: { orb1Size: "1000px", orb2Size: "800px", opacity: 0.9 },
  };

  const colors = colorVariants[variant];
  const settings = intensityMap[intensity];

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      {/* Layer 1: Base gradient mesh */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.mesh}`} />

      {/* Layer 2: Animated radial gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute top-0 right-0 bg-gradient-radial ${colors.orb1} to-transparent rounded-full blur-3xl`}
          style={{
            width: settings.orb1Size,
            height: settings.orb1Size,
            opacity: settings.opacity,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute bottom-0 left-0 bg-gradient-radial ${colors.orb2} to-transparent rounded-full blur-3xl`}
          style={{
            width: settings.orb2Size,
            height: settings.orb2Size,
            opacity: settings.opacity,
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Layer 3: Noise texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="texture-paper w-full h-full" />
      </div>
    </div>
  );
}
