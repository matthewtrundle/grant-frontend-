/**
 * ProcessTimelineVisualization Component
 *
 * R3F particle system that morphs through 4 distinct states based on scroll progress.
 * Visual: Scientific, methodical particle animations representing the grant process.
 *
 * Stage 1 (Profile): Scattered points clustering
 * Stage 2 (Discovery): Grid formation with connections
 * Stage 3 (Analysis): Funnel/filter shape
 * Stage 4 (Generation): Central cluster with orbital elements
 */

'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Constants for particle system
const PARTICLE_COUNT = 75;
const REJECTED_PARTICLE_COUNT = Math.floor(PARTICLE_COUNT * 0.3); // 30% fade out in stage 3

// Stage 4 layer distribution
const CORE_COUNT = 15;      // Inner synthesis cluster
const RING1_COUNT = 20;     // First orbital ring
const RING2_COUNT = 25;     // Second orbital ring
// Total active in Stage 4: 60 particles

// Color palette (strict enforcement)
const COLORS = {
  teal: new THREE.Color('#2FB49E'),
  lavender: new THREE.Color('#A98CEB'),
  background: new THREE.Color('#0C051A')
};

interface ProcessTimelineVisualizationProps {
  currentStage: 1 | 2 | 3 | 4;
}

/**
 * Particle System Component
 * Handles all particle states and transitions
 */
function ParticleSystem({ currentStage }: { currentStage: 1 | 2 | 3 | 4 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Track individual particle states
  const particleData = useRef<{
    positions: THREE.Vector3[];
    targetPositions: THREE.Vector3[];
    colors: THREE.Color[];
    scales: number[];
    targetScales: number[];
    isRejected: boolean[];
  }>({
    positions: [],
    targetPositions: [],
    colors: [],
    scales: [],
    targetScales: [],
    isRejected: []
  });

  // Initialize particle data
  useMemo(() => {
    const data = particleData.current;

    // Initialize main particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Initial scattered positions (Stage 1)
      data.positions[i] = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10
      );
      data.targetPositions[i] = data.positions[i].clone();

      // Alternate colors between teal and lavender
      data.colors[i] = i % 2 === 0 ? COLORS.teal.clone() : COLORS.lavender.clone();

      data.scales[i] = 1.0;
      data.targetScales[i] = 1.0;

      // Mark some particles as rejected for stage 3
      data.isRejected[i] = i >= PARTICLE_COUNT - REJECTED_PARTICLE_COUNT;
    }
  }, []);

  // Grid line geometry for Stage 2
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];

    // Create SPARSE grid connections (only 15% for clean visual)
    const gridStep = Math.ceil(Math.sqrt(PARTICLE_COUNT));
    const CONNECTION_PROBABILITY = 0.15; // Only 15% of possible connections

    // Seed random for consistent pattern across reloads
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    let connectionSeed = 12345; // Fixed seed for reproducible pattern

    for (let i = 0; i < gridStep; i++) {
      for (let j = 0; j < gridStep - 1; j++) {
        // Horizontal connections (sparse)
        if (seededRandom(connectionSeed++) < CONNECTION_PROBABILITY) {
          const idx1 = i * gridStep + j;
          const idx2 = i * gridStep + (j + 1);
          if (idx1 < PARTICLE_COUNT && idx2 < PARTICLE_COUNT) {
            const p1 = particleData.current.targetPositions[idx1];
            const p2 = particleData.current.targetPositions[idx2];
            positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
          }
        }

        // Vertical connections (sparse)
        if (seededRandom(connectionSeed++) < CONNECTION_PROBABILITY) {
          const idx3 = j * gridStep + i;
          const idx4 = (j + 1) * gridStep + i;
          if (idx3 < PARTICLE_COUNT && idx4 < PARTICLE_COUNT) {
            const p3 = particleData.current.targetPositions[idx3];
            const p4 = particleData.current.targetPositions[idx4];
            positions.push(p3.x, p3.y, p3.z, p4.x, p4.y, p4.z);
          }
        }

        // Diagonal connections (add for visual interest, even rarer)
        if (seededRandom(connectionSeed++) < CONNECTION_PROBABILITY * 0.5) {
          const idx5 = i * gridStep + j;
          const idx6 = (i + 1) * gridStep + (j + 1);
          if (idx5 < PARTICLE_COUNT && idx6 < PARTICLE_COUNT && i < gridStep - 1) {
            const p5 = particleData.current.targetPositions[idx5];
            const p6 = particleData.current.targetPositions[idx6];
            positions.push(p5.x, p5.y, p5.z, p6.x, p6.y, p6.z);
          }
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  // Update target positions based on stage
  useEffect(() => {
    const data = particleData.current;

    switch (currentStage) {
      case 1: // Scattered → Clustering
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          // Create 5-6 cluster centers
          const clusterIndex = Math.floor(i / (PARTICLE_COUNT / 6));
          const clusterAngle = (clusterIndex / 6) * Math.PI * 2;
          const clusterRadius = 4 + Math.random() * 2;

          data.targetPositions[i].set(
            Math.cos(clusterAngle) * clusterRadius + (Math.random() - 0.5) * 2,
            Math.sin(clusterIndex * 0.5) * 3 + (Math.random() - 0.5) * 2,
            Math.sin(clusterAngle) * clusterRadius * 0.5 + (Math.random() - 0.5) * 2
          );

          data.targetScales[i] = 1.0;
        }
        break;

      case 2: // Grid formation
        const gridSize = Math.ceil(Math.sqrt(PARTICLE_COUNT));
        const spacing = 1.5;
        const offsetX = -(gridSize - 1) * spacing / 2;
        const offsetY = -(gridSize - 1) * spacing / 2;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;

          data.targetPositions[i].set(
            offsetX + col * spacing,
            offsetY + row * spacing,
            0
          );

          data.targetScales[i] = 1.0;
        }
        break;

      case 3: // Funnel shape
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          if (data.isRejected[i]) {
            // Rejected particles fade out
            data.targetScales[i] = 0.0;
          } else {
            // Create funnel/cone shape
            const normalizedIndex = i / (PARTICLE_COUNT - REJECTED_PARTICLE_COUNT);
            const y = normalizedIndex * 10 - 5; // Y from -5 to +5

            // Radius decreases as we go down
            const topRadius = 8;
            const bottomRadius = 2;
            const radius = topRadius + (bottomRadius - topRadius) * ((y + 5) / 10);

            const angle = i * 0.5;
            data.targetPositions[i].set(
              Math.cos(angle) * radius,
              y,
              Math.sin(angle) * radius
            );

            data.targetScales[i] = 1.2; // Slightly brighter/larger
          }
        }
        break;

      case 4: // Generation - Concentric orbital system
        // === LAYER 1: CORE SYNTHESIS CLUSTER (15 particles) ===
        for (let i = 0; i < 15; i++) {
          // Tight cluster at origin with spherical distribution
          const coreRadius = 1.5;
          const theta = (i / 15) * Math.PI * 2;
          const phi = Math.acos(2 * (i / 15) - 1); // Spherical distribution

          data.targetPositions[i].set(
            Math.sin(phi) * Math.cos(theta) * coreRadius,
            Math.cos(phi) * coreRadius,
            Math.sin(phi) * Math.sin(theta) * coreRadius
          );
          data.targetScales[i] = 1.5; // Larger, brighter core
        }

        // === LAYER 2: INNER ORBITAL RING (20 particles) ===
        for (let i = 15; i < 35; i++) {
          const ringIndex = i - 15;
          const angle = (ringIndex / 20) * Math.PI * 2;
          const radius = 6;

          // Y offset creates 3D orbital plane (not flat)
          const yOffset = Math.sin(ringIndex * 0.5) * 2;

          data.targetPositions[i].set(
            Math.cos(angle) * radius,
            yOffset,
            Math.sin(angle) * radius
          );
          data.targetScales[i] = 1.2; // Medium size
        }

        // === LAYER 3: OUTER ORBITAL RING (25 particles) ===
        for (let i = 35; i < 60; i++) {
          const ringIndex = i - 35;
          const angle = (ringIndex / 25) * Math.PI * 2 + Math.PI / 6; // Offset from inner ring
          const radius = 10;

          // Different orbital plane (tilted)
          const yOffset = Math.cos(ringIndex * 0.3) * 3;

          data.targetPositions[i].set(
            Math.cos(angle) * radius,
            yOffset,
            Math.sin(angle) * radius
          );
          data.targetScales[i] = 1.0; // Smaller outer agents
        }

        // === HIDE REMAINING PARTICLES ===
        for (let i = 60; i < PARTICLE_COUNT; i++) {
          data.targetScales[i] = 0.0;
        }
        break;
    }
  }, [currentStage]);

  // Animation frame
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const data = particleData.current;
    const dummy = new THREE.Object3D();

    // Update main particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Smooth lerp to target position
      data.positions[i].lerp(data.targetPositions[i], 0.05);

      // Smooth scale transition
      data.scales[i] += (data.targetScales[i] - data.scales[i]) * 0.05;

      // Add idle motion based on stage
      let idleOffset = new THREE.Vector3(0, 0, 0);

      if (currentStage === 1) {
        // Gentle orbital drift
        const orbitSpeed = 0.0005;
        idleOffset.x = Math.sin(time * orbitSpeed + i) * 0.1;
        idleOffset.y = Math.sin(time * orbitSpeed * 0.7 + i * 0.5) * 0.15;
        idleOffset.z = Math.cos(time * orbitSpeed * 0.5 + i * 0.3) * 0.1;
      } else if (currentStage === 4) {
        // === LAYER 1: CORE PULSING ===
        if (i < 15) {
          const pulseScale = 1 + Math.sin(time * 2) * 0.08; // Slower, larger pulse
          data.scales[i] = data.targetScales[i] * pulseScale;
        }

        // === LAYER 2: INNER RING ROTATION ===
        if (i >= 15 && i < 35) {
          const ringIndex = i - 15;
          const angle = (ringIndex / 20) * Math.PI * 2 + time * 0.15; // Rotate clockwise
          const radius = 6;
          const yOffset = Math.sin(ringIndex * 0.5) * 2;

          data.positions[i].set(
            Math.cos(angle) * radius,
            yOffset,
            Math.sin(angle) * radius
          );
        }

        // === LAYER 3: OUTER RING ROTATION (opposite direction) ===
        if (i >= 35 && i < 60) {
          const ringIndex = i - 35;
          const angle = (ringIndex / 25) * Math.PI * 2 - time * 0.1; // Rotate counter-clockwise
          const radius = 10;
          const yOffset = Math.cos(ringIndex * 0.3) * 3;

          data.positions[i].set(
            Math.cos(angle) * radius,
            yOffset,
            Math.sin(angle) * radius
          );
        }
      }

      // Apply position and scale to instance
      dummy.position.copy(data.positions[i]).add(idleOffset);
      dummy.scale.setScalar(data.scales[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Update color
      meshRef.current.setColorAt(i, data.colors[i]);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }

    // Update grid lines opacity for Stage 2
    if (linesRef.current) {
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      const targetOpacity = currentStage === 2 ? 0.2 : 0.0;
      material.opacity += (targetOpacity - material.opacity) * 0.05;
    }
  });

  return (
    <>
      {/* Main particle system */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial />
      </instancedMesh>

      {/* Grid connection lines (Stage 2) */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={COLORS.teal}
          transparent
          opacity={0}
        />
      </lineSegments>
    </>
  );
}

/**
 * Main R3F Visualization Component
 */
export default function ProcessTimelineVisualization({ currentStage }: ProcessTimelineVisualizationProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{
          fov: 50,
          position: [0, 0, 20],
          near: 0.1,
          far: 100
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        {/* Fog for depth */}
        <fog attach="fog" args={[COLORS.background, 15, 30]} />

        {/* Ambient lighting only */}
        <ambientLight color={COLORS.teal} intensity={0.3} />

        {/* Particle System */}
        <ParticleSystem currentStage={currentStage} />
      </Canvas>
    </div>
  );
}