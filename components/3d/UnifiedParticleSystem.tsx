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

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
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

  // Mouse tracking
  const { camera, size } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouse3D = useRef(new THREE.Vector3());
  const raycaster = useRef(new THREE.Raycaster());

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  // Animation loop with mouse interaction
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();

    // Update mouse position in 3D space
    // Project mouse from 2D screen to 3D world at z=0 plane
    raycaster.current.setFromCamera(
      new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
      camera
    );

    // Calculate intersection with a plane at z=0
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    raycaster.current.ray.intersectPlane(plane, mouse3D.current);

    // Mouse influence parameters
    const mouseInfluence = 0.15; // 15% maximum influence
    const mouseRadius = 2.5; // Influence radius in 3D units
    const attractionStrength = 0.3; // Gentle attraction/repulsion

    particles.forEach((particle, i) => {
      // Smooth interpolation to target position (600ms ~= 0.6s at 60fps ≈ lerp factor 0.05)
      particle.currentPosition.lerp(particle.targetPosition, 0.05);

      // Calculate mouse influence
      const distanceToMouse = particle.currentPosition.distanceTo(mouse3D.current);
      let mouseOffsetX = 0;
      let mouseOffsetY = 0;
      let mouseOffsetZ = 0;

      if (distanceToMouse < mouseRadius && distanceToMouse > 0.1) {
        // Calculate influence strength based on distance
        const influence = (1 - distanceToMouse / mouseRadius) * mouseInfluence;

        // Calculate direction from particle to mouse
        const direction = new THREE.Vector3()
          .subVectors(mouse3D.current, particle.currentPosition)
          .normalize();

        // Apply gentle repulsion (particles move away from mouse)
        // For attraction, change the sign to positive
        const repulsionFactor = -attractionStrength * influence;

        // Apply the offset while maintaining formation structure
        mouseOffsetX = direction.x * repulsionFactor;
        mouseOffsetY = direction.y * repulsionFactor;
        mouseOffsetZ = direction.z * repulsionFactor * 0.5; // Less z-axis movement

        // Add subtle swirl effect for more interesting motion
        const angle = Math.atan2(direction.y, direction.x);
        const swirlX = Math.cos(angle + Math.PI/2) * influence * 0.1;
        const swirlY = Math.sin(angle + Math.PI/2) * influence * 0.1;

        mouseOffsetX += swirlX;
        mouseOffsetY += swirlY;
      }

      // Barely perceptible idle motion (very slow, very subtle)
      const idleX = Math.sin(time * 0.3 + particle.phase) * 0.02;
      const idleY = Math.cos(time * 0.25 + particle.phase * 1.3) * 0.015;

      // Combine all position influences
      position.copy(particle.currentPosition);
      position.x += idleX + mouseOffsetX;
      position.y += idleY + mouseOffsetY;
      position.z += mouseOffsetZ;

      // Slightly scale particles near mouse
      const scaleInfluence = distanceToMouse < mouseRadius ?
        1 + (1 - distanceToMouse / mouseRadius) * 0.2 : 1;
      scale.setScalar(particle.size * scaleInfluence);

      // Update color based on mouse proximity
      const colorInfluence = distanceToMouse < mouseRadius ?
        (1 - distanceToMouse / mouseRadius) : 0;

      // Note: Color blending removed to simplify - using single teal color from material
      // Mouse proximity still affects scale (particles grow near mouse)

      matrix.compose(position, new THREE.Quaternion(), scale);
      meshRef.current!.setMatrixAt(i, matrix);
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
