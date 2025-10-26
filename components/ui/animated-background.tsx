"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Meteor {
  id: number;
  x: number;
  y: number;
  length: number;
  speed: number;
  delay: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create meteors
    const meteors: Meteor[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      length: Math.random() * 80 + 20,
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 5000,
    }));

    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now() - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      meteors.forEach((meteor) => {
        if (currentTime < meteor.delay) return;

        // Update position
        meteor.y += meteor.speed;
        meteor.x += meteor.speed * 0.5;

        // Reset if off screen
        if (meteor.y > canvas.height + meteor.length) {
          meteor.y = -meteor.length;
          meteor.x = Math.random() * canvas.width;
          meteor.delay = currentTime + Math.random() * 5000;
        }

        // Draw meteor trail
        const gradient = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          meteor.x - meteor.length * 0.5,
          meteor.y - meteor.length
        );
        gradient.addColorStop(0, "rgba(108, 71, 255, 0.6)");
        gradient.addColorStop(1, "rgba(108, 71, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.length * 0.5, meteor.y - meteor.length);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      aria-hidden="true"
    />
  );
}

export function GradientOrb({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function AnimatedGradient() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Purple orb */}
      <GradientOrb className="w-[500px] h-[500px] bg-purple-600 -top-48 -left-48" />

      {/* Yellow orb */}
      <GradientOrb className="w-[400px] h-[400px] bg-yellow-400 top-1/3 -right-32" />

      {/* Purple orb bottom */}
      <GradientOrb className="w-[600px] h-[600px] bg-purple-700 -bottom-64 left-1/3" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
}
