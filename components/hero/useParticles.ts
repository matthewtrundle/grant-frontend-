/**
 * useParticles Hook
 * Generates 70 star particles with controlled chaos distribution
 * 60% random placement, 40% tied to node positions
 */

'use client';

import { useMemo } from 'react';
import { DESIGN_TOKENS } from './design-tokens';

export interface Particle {
  id: string;
  x: number;
  y: number;
  radius: number;
  velocity: number;
  jitterX: number;
  jitterY: number;
  delay: number;
}

interface UseParticlesOptions {
  nodePositions?: Array<{ x: number; y: number }>;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  count?: number;
}

export function useParticles({
  nodePositions = [],
  viewBoxWidth = 1400,
  viewBoxHeight = 900,
  count = DESIGN_TOKENS.particles.total,
}: UseParticlesOptions = {}): Particle[] {
  return useMemo(() => {
    const particles: Particle[] = [];
    const { randomPercent, nodeTiedPercent, velocityMin, velocityMax, jitterRange } = DESIGN_TOKENS.particles;

    // Calculate counts
    const randomCount = Math.floor((count * randomPercent) / 100);
    const nodeTiedCount = Math.floor((count * nodeTiedPercent) / 100);

    // Generate random particles (60%)
    for (let i = 0; i < randomCount; i++) {
      particles.push({
        id: `particle-random-${i}`,
        x: Math.random() * viewBoxWidth,
        y: Math.random() * viewBoxHeight,
        radius: DESIGN_TOKENS.particles.radius,
        velocity: velocityMin + Math.random() * (velocityMax - velocityMin),
        jitterX: (Math.random() - 0.5) * jitterRange,
        jitterY: (Math.random() - 0.5) * jitterRange,
        delay: Math.random() * 4, // Stagger pulse animations
      });
    }

    // Generate node-tied particles (40%)
    if (nodePositions.length > 0) {
      for (let i = 0; i < nodeTiedCount; i++) {
        // Pick a random node
        const node = nodePositions[Math.floor(Math.random() * nodePositions.length)];

        // Place particle near node (within 80px radius)
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 60;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        particles.push({
          id: `particle-node-${i}`,
          x: node.x + offsetX,
          y: node.y + offsetY,
          radius: DESIGN_TOKENS.particles.radius,
          velocity: velocityMin + Math.random() * (velocityMax - velocityMin),
          jitterX: (Math.random() - 0.5) * jitterRange,
          jitterY: (Math.random() - 0.5) * jitterRange,
          delay: Math.random() * 4,
        });
      }
    }

    return particles;
  }, [nodePositions, viewBoxWidth, viewBoxHeight, count]);
}
