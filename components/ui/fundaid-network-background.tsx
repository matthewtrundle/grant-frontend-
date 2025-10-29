"use client";

import { useEffect, useRef } from "react";

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: "circle" | "hexagon";
  color: string;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
}

interface DataParticle {
  x: number;
  y: number;
  progress: number;
  fromIndex: number;
  toIndex: number;
}

export function FundAidNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // FundAid color palette (blue to purple gradient)
    const colors = [
      "#1e3a8a", // Navy blue
      "#2563eb", // Blue
      "#3b82f6", // Light blue
      "#0ea5e9", // Cyan
      "#6366f1", // Indigo
      "#8b5cf6", // Violet
      "#a855f7", // Purple
      "#d946ef", // Magenta
    ];

    // Initialize nodes (higher quality, more interconnected)
    const nodes: NetworkNode[] = [];
    const nodeCount = 70; // More nodes for denser network
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2, // Smoother movement
        vy: (Math.random() - 0.5) * 0.2 - 0.08, // Subtle upward bias
        radius: Math.random() * 2 + 1, // Smaller nodes (1-3px)
        type: Math.random() > 0.6 ? "circle" : "hexagon",
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Create connections
    const connections: Connection[] = [];
    const maxDistance = 140; // Tighter connections for denser network
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < maxDistance) {
          connections.push({
            from: i,
            to: j,
            opacity: 1 - distance / maxDistance,
          });
        }
      }
    }

    // Data particles flowing through connections
    const particles: DataParticle[] = [];
    const spawnParticle = () => {
      if (connections.length === 0) return;
      const conn = connections[Math.floor(Math.random() * connections.length)];
      particles.push({
        x: nodes[conn.from].x,
        y: nodes[conn.from].y,
        progress: 0,
        fromIndex: conn.from,
        toIndex: conn.to,
      });
    };

    // Spawn particles periodically (subtle agentic flow)
    const particleInterval = setInterval(() => {
      if (particles.length < 12) { // More particles for network activity
        spawnParticle();
      }
    }, 300); // Balanced spawn rate

    // Draw crisp hexagon with anti-aliasing
    const drawHexagon = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      color: string
    ) => {
      ctx.save();

      // Enable anti-aliasing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Subtle glow effect
      ctx.shadowBlur = 2;
      ctx.shadowColor = color + "30";

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + radius * Math.cos(angle);
        const hy = y + radius * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = color + "90"; // Crisp stroke
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = color + "20"; // Subtle fill
      ctx.fill();

      ctx.restore();
    };

    // Side geometric patterns that animate
    interface SidePattern {
      x: number;
      y: number;
      size: number;
      rotation: number;
      type: "diamond" | "triangle" | "hexagon";
      side: "left" | "right";
      baseX: number;
      baseY: number;
    }

    const sidePatterns: SidePattern[] = [];
    const edgeWidth = 200; // Width of the edge zones

    // Create patterns on left and right sides (more subtle)
    for (let i = 0; i < 10; i++) { // Reduced from 15 to 10
      const side = i % 2 === 0 ? "left" : "right";
      const baseX = side === "left" ? Math.random() * edgeWidth : canvas.width - Math.random() * edgeWidth;
      const baseY = Math.random() * canvas.height;

      sidePatterns.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        size: Math.random() * 20 + 8, // Smaller sizes (was 30 + 10)
        rotation: Math.random() * Math.PI * 2,
        type: ["diamond", "triangle", "hexagon"][Math.floor(Math.random() * 3)] as any,
        side,
      });
    }

    // Draw geometric pattern (more subtle)
    const drawPattern = (pattern: SidePattern, opacity: number = 0.05) => {
      ctx.save();
      ctx.translate(pattern.x, pattern.y);
      ctx.rotate(pattern.rotation);

      ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.6})`; // More subtle stroke
      ctx.lineWidth = 1;
      ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 0.2})`; // More subtle fill

      ctx.beginPath();
      if (pattern.type === "diamond") {
        ctx.moveTo(0, -pattern.size);
        ctx.lineTo(pattern.size, 0);
        ctx.lineTo(0, pattern.size);
        ctx.lineTo(-pattern.size, 0);
      } else if (pattern.type === "triangle") {
        ctx.moveTo(0, -pattern.size);
        ctx.lineTo(pattern.size * 0.866, pattern.size * 0.5);
        ctx.lineTo(-pattern.size * 0.866, pattern.size * 0.5);
      } else {
        // hexagon
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = pattern.size * Math.cos(angle);
          const y = pattern.size * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      ctx.restore();
    };

    // Draw subtle geometric accents (not full grid)
    const drawGeometricAccents = () => {
      // Draw occasional diagonal lines for geometric feel
      ctx.strokeStyle = "rgba(200, 200, 200, 0.06)";
      ctx.lineWidth = 0.3;

      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 6) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + canvas.height * 0.3, canvas.height);
        ctx.stroke();
      }
    };

    // Animation loop with high-quality rendering
    const animate = () => {
      // Enable anti-aliasing for entire canvas
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.fillStyle = "rgba(255, 255, 255, 0.12)"; // Slightly less opaque for more visibility
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw geometric accents
      drawGeometricAccents();

      // Update and draw nodes with very subtle mouse gravity
      nodes.forEach((node) => {
        // Apply very subtle mouse gravity if active
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) { // Much smaller gravity radius (was 150)
            const force = (100 - distance) / 100 * 0.08; // Even weaker force (was 0.15)
            node.vx += (dx / distance) * force;
            node.vy += (dy / distance) * force;
          }
        }

        // Apply velocity damping to prevent runaway
        node.vx *= 0.95;
        node.vy *= 0.95;

        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges
        if (node.x < -50) node.x = canvas.width + 50;
        if (node.x > canvas.width + 50) node.x = -50;
        if (node.y < -50) node.y = canvas.height + 50;
        if (node.y > canvas.height + 50) node.y = -50;

        // Draw node with crisp, high-quality rendering
        if (node.type === "circle") {
          ctx.save();

          // Subtle glow effect
          ctx.shadowBlur = 2;
          ctx.shadowColor = node.color + "30";

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = node.color + "30"; // Subtle fill
          ctx.fill();
          ctx.strokeStyle = node.color + "90"; // Crisp stroke
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.restore();
        } else {
          drawHexagon(ctx, node.x, node.y, node.radius * 1.8, node.color);
        }
      });

      // Update connections based on current node positions
      const currentConnections: Connection[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            currentConnections.push({
              from: i,
              to: j,
              opacity: 1 - distance / maxDistance,
            });
          }
        }
      }

      // Draw crisp connections with gradient effect
      currentConnections.forEach((conn) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];

        ctx.save();

        // Create gradient for agentic flow effect
        const gradient = ctx.createLinearGradient(
          fromNode.x, fromNode.y,
          toNode.x, toNode.y
        );
        gradient.addColorStop(0, `rgba(99, 102, 241, ${conn.opacity * 0.2})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${conn.opacity * 0.25})`);
        gradient.addColorStop(1, `rgba(168, 85, 247, ${conn.opacity * 0.2})`);

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      });

      // Update and draw side patterns with very subtle mouse gravity
      sidePatterns.forEach((pattern) => {
        // Apply very subtle mouse gravity to side patterns
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - pattern.x;
          const dy = mouseRef.current.y - pattern.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) { // Much smaller gravity radius (was 180)
            const force = (120 - distance) / 120;
            const pullStrength = 0.08; // Even weaker pull (was 0.15)
            pattern.x = pattern.baseX + dx * force * pullStrength;
            pattern.y = pattern.baseY + dy * force * pullStrength;
            pattern.rotation += 0.004; // Even slower rotation (was 0.008)
          } else {
            // Ease back to base position
            pattern.x += (pattern.baseX - pattern.x) * 0.05;
            pattern.y += (pattern.baseY - pattern.y) * 0.05;
            pattern.rotation += 0.002; // Very slow rotation (was 0.003)
          }
        } else {
          // Ease back to base position when mouse not active
          pattern.x += (pattern.baseX - pattern.x) * 0.05;
          pattern.y += (pattern.baseY - pattern.y) * 0.05;
          pattern.rotation += 0.002;
        }

        // Calculate opacity based on mouse distance (very subtle)
        let opacity = 0.05; // Lower base opacity
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - pattern.x;
          const dy = mouseRef.current.y - pattern.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            opacity = 0.05 + (1 - distance / 120) * 0.06; // Minimal brightening (was 0.12)
          }
        }

        drawPattern(pattern, opacity);
      });

      // Draw very subtle mouse cursor effect
      if (mouseRef.current.isActive) {
        ctx.save();

        // Outer ring (barely visible)
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 60, 0, Math.PI * 2); // Much smaller radius (was 100)
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 60
        );
        gradient.addColorStop(0, "rgba(168, 85, 247, 0.02)"); // Barely visible (was 0.04)
        gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.01)"); // Barely visible (was 0.02)
        gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner glow (barely visible)
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 20, 0, Math.PI * 2); // Much smaller radius (was 35)
        const innerGradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 20
        );
        innerGradient.addColorStop(0, "rgba(168, 85, 247, 0.04)"); // Barely visible (was 0.08)
        innerGradient.addColorStop(1, "rgba(168, 85, 247, 0)");
        ctx.fillStyle = innerGradient;
        ctx.fill();

        ctx.restore();
      }

      // Update and draw particles with enhanced agentic flow
      particles.forEach((particle, index) => {
        particle.progress += 0.018; // Slightly faster for more activity
        if (particle.progress >= 1) {
          particles.splice(index, 1);
          return;
        }

        const fromNode = nodes[particle.fromIndex];
        const toNode = nodes[particle.toIndex];
        particle.x = fromNode.x + (toNode.x - fromNode.x) * particle.progress;
        particle.y = fromNode.y + (toNode.y - fromNode.y) * particle.progress;

        // Draw crisp particle with gradient glow
        ctx.save();

        // Enhanced glow effect for data flow
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(99, 102, 241, ${0.5 * (1 - particle.progress * 0.5)})`; // Fade as it travels

        // Draw particle with trail effect
        const trailLength = 3;
        for (let i = 0; i < trailLength; i++) {
          const trailProgress = Math.max(0, particle.progress - (i * 0.05));
          const trailX = fromNode.x + (toNode.x - fromNode.x) * trailProgress;
          const trailY = fromNode.y + (toNode.y - fromNode.y) * trailProgress;
          const trailOpacity = 0.4 - (i * 0.15);

          ctx.beginPath();
          ctx.arc(trailX, trailY, 1.2 - (i * 0.3), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${trailOpacity})`;
          ctx.fill();
        }

        // Main particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(168, 85, 247, 0.8)"; // Brighter for visibility
        ctx.fill();

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)" }}
    />
  );
}
