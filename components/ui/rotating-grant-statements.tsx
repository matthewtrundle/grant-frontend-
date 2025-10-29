"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const grantStatements = [
  {
    text: "AI-Powered Grant Discovery",
    description: "Find the perfect grants for your research",
  },
  {
    text: "NIH SBIR/STTR Support",
    description: "Specialized for medical technology companies",
  },
  {
    text: "Expert Grant Writing",
    description: "AI-assisted proposals that win funding",
  },
  {
    text: "FDA & BARDA Grants",
    description: "Medical device and therapeutic funding",
  },
  {
    text: "Higher Success Rates",
    description: "40%+ success rate vs industry 20%",
  },
  {
    text: "TRL Assessment",
    description: "Technology readiness for medtech innovation",
  },
  {
    text: "Automated RFP Analysis",
    description: "Intelligent requirement extraction",
  },
  {
    text: "Smart Budget Planning",
    description: "Compliance-checked financial models",
  },
  {
    text: "Timeline Management",
    description: "Never miss a deadline again",
  },
  {
    text: "Compliance Checking",
    description: "Automated validation against guidelines",
  },
];

export function RotatingGrantStatements() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % grantStatements.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 space-y-6">
      {/* Statement Display */}
      <div className="relative h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {grantStatements[currentIndex].text}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {grantStatements[currentIndex].description}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2">
        {grantStatements.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="relative group"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Outer ring for active state */}
            {index === currentIndex && (
              <motion.div
                layoutId="active-ring"
                className="absolute inset-0 rounded-full border-2 border-blue-500"
                style={{ width: 16, height: 16, left: -2, top: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Dot */}
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-110"
                  : "bg-gray-300 group-hover:bg-gray-400"
              }`}
            />
          </motion.button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="max-w-md mx-auto">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            key={currentIndex}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
