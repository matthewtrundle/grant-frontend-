/**
 * UnifiedParticleSystem - Single morphing particle system for all 4 stages
 *
 * Digilab Aesthetic Rules:
 * - Max 50 particles visible at once
 * - Flat meshBasicMaterial (no phong/standard shading)
 * - No neon glows, no heavy gradients
 * - Idle motion barely perceptible (slow drift)
 * - Smooth morphing between formations (600ms duration)
 *
 * Formations:
 * 1. Cluster - Tech categorization (3 grouped clusters)
 * 2. Grid - Grant opportunities (5x5 grid)
 * 3. Funnel - Budget flow (funnel/pyramid shape)
 * 4. Orbital - Multi-agent system (central node + satellites)
 */

'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleData {
  index: number;
  currentPosition: THREE.Vector3;
  targetPosition: THREE.Vector3;
  basePosition: THREE.Vector3;
  size: number;
  phase: number; // For idle motion
}

interface UnifiedParticleSystemProps {
  activeStep: 1 | 2 | 3 | 4;
}

// FundAid Light Theme colors (plain hex strings for material color prop)
const COLORS = {
  teal: '#2FB49E',
  lavender: '#A98CEB',
  coral: '#E4584A',
  muted: '#6B6B7C',
};

export function UnifiedParticleSystem({ activeStep }: UnifiedParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particleCount = 50;

  // Generate target formations for each stage
  const formations = useMemo(() => {
    return {
      // Stage 1: 3 Clusters (tech categorization)
      cluster: generateClusterFormation(particleCount),
      // Stage 2: 5x5 Grid (grant opportunities)
      grid: generateGridFormation(particleCount),
      // Stage 3: Funnel (budget flow)
      funnel: generateFunnelFormation(particleCount),
      // Stage 4: Orbital (multi-agent system)
      orbital: generateOrbitalFormation(particleCount),
    };
  }, []);

  // Initialize particle data
  const particles = useMemo<ParticleData[]>(() => {
    const initialFormation = formations.cluster;
    return Array.from({ length: particleCount }, (_, i) => ({
      index: i,
      currentPosition: initialFormation.positions[i].clone(),
      targetPosition: initialFormation.positions[i].clone(),
      basePosition: initialFormation.positions[i].clone(),
      size: 0.08 + Math.random() * 0.04, // 0.08-0.12
      phase: Math.random() * Math.PI * 2,
    }));
  }, [formations]);

  // Update target positions when activeStep changes
  useEffect(() => {
    const formationKey = getFormationKey(activeStep);
    const targetFormation = formations[formationKey];

    particles.forEach((particle, i) => {
      particle.targetPosition.copy(targetFormation.positions[i]);
      particle.basePosition.copy(targetFormation.positions[i]);
    });
  }, [activeStep, formations, particles]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();

    particles.forEach((particle, i) => {
      // Smooth interpolation to target position (600ms ~= 0.6s at 60fps ≈ lerp factor 0.05)
      particle.currentPosition.lerp(particle.targetPosition, 0.05);

      // Barely perceptible idle motion (very slow, very subtle)
      const idleX = Math.sin(time * 0.3 + particle.phase) * 0.02;
      const idleY = Math.cos(time * 0.25 + particle.phase * 1.3) * 0.015;

      position.copy(particle.currentPosition);
      position.x += idleX;
      position.y += idleY;

      scale.setScalar(particle.size);

      matrix.compose(position, new THREE.Quaternion(), scale);
      meshRef.current!.setMatrixAt(i, matrix);

      // Set color (using instanceColor if needed, but for simplicity we'll use single color)
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, 16, 16]} />
      {/* Flat meshBasicMaterial - no shading, no glows */}
      <meshBasicMaterial
        color={COLORS.teal}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  );
}

// Helper: Map activeStep to formation key
function getFormationKey(step: 1 | 2 | 3 | 4): 'cluster' | 'grid' | 'funnel' | 'orbital' {
  const map = { 1: 'cluster', 2: 'grid', 3: 'funnel', 4: 'orbital' } as const;
  return map[step];
}

// Formation generators
interface Formation {
  positions: THREE.Vector3[];
}

function generateClusterFormation(count: number): Formation {
  const positions: THREE.Vector3[] = [];

  // 3 clusters: left, right, bottom
  const clusters = [
    { center: new THREE.Vector3(-2, 1, 0), count: 18 },
    { center: new THREE.Vector3(2, 1, 0), count: 16 },
    { center: new THREE.Vector3(0, -1.5, 0), count: 16 },
  ];

  let particleIndex = 0;
  clusters.forEach((cluster) => {
    for (let i = 0; i < cluster.count && particleIndex < count; i++) {
      const spread = 1.2;
      positions.push(
        new THREE.Vector3(
          cluster.center.x + (Math.random() - 0.5) * spread,
          cluster.center.y + (Math.random() - 0.5) * spread,
          cluster.center.z + (Math.random() - 0.5) * 0.5
        )
      );
      particleIndex++;
    }
  });

  return { positions };
}

function generateGridFormation(count: number): Formation {
  const positions: THREE.Vector3[] = [];

  // 5x5 grid = 25 particles, fill remaining with slight depth variation
  const gridSize = 5;
  const spacing = 1.0;
  const offset = ((gridSize - 1) * spacing) / 2;

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (positions.length >= count) break;

      positions.push(
        new THREE.Vector3(
          x * spacing - offset,
          y * spacing - offset,
          (Math.random() - 0.5) * 0.3
        )
      );
    }
  }

  // Fill remaining particles with random grid positions
  while (positions.length < count) {
    positions.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * (gridSize * spacing),
        (Math.random() - 0.5) * (gridSize * spacing),
        (Math.random() - 0.5) * 0.5
      )
    );
  }

  return { positions };
}

function generateFunnelFormation(count: number): Formation {
  const positions: THREE.Vector3[] = [];

  // Funnel: wide at top, narrow at bottom (budget flow visualization)
  const layers = 5;
  const particlesPerLayer = Math.floor(count / layers);

  for (let layer = 0; layer < layers; layer++) {
    const y = 2 - layer * 1.0; // Top to bottom
    const radius = 2.5 - layer * 0.4; // Narrowing funnel
    const layerParticles = layer === layers - 1 ? count - positions.length : particlesPerLayer;

    for (let i = 0; i < layerParticles; i++) {
      const angle = (i / layerParticles) * Math.PI * 2;
      const r = radius * (0.7 + Math.random() * 0.3); // Slight variation

      positions.push(
        new THREE.Vector3(
          Math.cos(angle) * r,
          y + (Math.random() - 0.5) * 0.3,
          Math.sin(angle) * r
        )
      );
    }
  }

  return { positions };
}

function generateOrbitalFormation(count: number): Formation {
  const positions: THREE.Vector3[] = [];

  // Central writer node (larger, prominent)
  positions.push(new THREE.Vector3(0, 0, 0));

  // 3 rings of satellites (multi-agent system)
  const rings = [
    { radius: 1.5, count: 12 },
    { radius: 2.5, count: 18 },
    { radius: 3.5, count: 19 },
  ];

  rings.forEach((ring) => {
    for (let i = 0; i < ring.count && positions.length < count; i++) {
      const angle = (i / ring.count) * Math.PI * 2;
      const r = ring.radius + (Math.random() - 0.5) * 0.2;

      positions.push(
        new THREE.Vector3(
          Math.cos(angle) * r,
          (Math.random() - 0.5) * 0.8,
          Math.sin(angle) * r
        )
      );
    }
  });

  return { positions };
}
