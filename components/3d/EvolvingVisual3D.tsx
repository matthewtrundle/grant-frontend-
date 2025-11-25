/**
 * EvolvingVisual3D - 3D visualization that morphs based on active step
 *
 * Step 1: Particles cluster into tight ball (tech categorization)
 * Step 2: Particles drift apart and connect with lines (grant discovery)
 * Step 3: Lines converge into funnel shape (analysis/filtering)
 * Step 4: Network of connected nodes (multi-agent collaboration)
 *
 * Uses GSAP to animate positions/opacity transitions between states
 */

'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { digilibTheme } from '@/lib/digilab-theme';

interface EvolvingVisual3DProps {
  activeStep: 1 | 2 | 3 | 4;
}

interface Particle {
  mesh: THREE.Mesh | null;
  step1Pos: THREE.Vector3; // Tight cluster
  step2Pos: THREE.Vector3; // Spread apart
  step3Pos: THREE.Vector3; // Funnel shape
  step4Pos: THREE.Vector3; // Network nodes
  color: string;
}

export function EvolvingVisual3D({ activeStep }: EvolvingVisual3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Create 30 particles with positions for all 4 steps
  const particles = useMemo<Particle[]>(() => {
    const count = 30;
    const items: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius1 = 0.5 + Math.random() * 0.3; // Tight cluster
      const radius2 = 2 + Math.random() * 1; // Spread out
      const height = (i / count - 0.5) * 4; // For funnel

      items.push({
        mesh: null,
        // Step 1: Tight ball
        step1Pos: new THREE.Vector3(
          Math.cos(angle) * radius1,
          Math.sin(angle) * radius1,
          (Math.random() - 0.5) * 0.5
        ),
        // Step 2: Spread apart in grid
        step2Pos: new THREE.Vector3(
          Math.cos(angle) * radius2,
          Math.sin(angle) * radius2,
          (Math.random() - 0.5) * 1
        ),
        // Step 3: Funnel shape (converge to point)
        step3Pos: new THREE.Vector3(
          Math.cos(angle) * (1 - i / count) * 2,
          height,
          Math.sin(angle) * (1 - i / count) * 2
        ),
        // Step 4: Network nodes (cube formation)
        step4Pos: new THREE.Vector3(
          ((i % 3) - 1) * 2,
          (Math.floor(i / 3) % 3 - 1) * 2,
          (Math.floor(i / 9) % 3 - 1) * 2
        ),
        color: i % 3 === 0
          ? digilibTheme.accents.teal
          : i % 3 === 1
          ? digilibTheme.accents.sage
          : digilibTheme.accents.lavender,
      });
    }

    return items;
  }, []);

  // Animate particles to new positions when activeStep changes
  useEffect(() => {
    particles.forEach((particle, i) => {
      if (!particle.mesh) return;

      let targetPos: THREE.Vector3;
      switch (activeStep) {
        case 1:
          targetPos = particle.step1Pos;
          break;
        case 2:
          targetPos = particle.step2Pos;
          break;
        case 3:
          targetPos = particle.step3Pos;
          break;
        case 4:
          targetPos = particle.step4Pos;
          break;
      }

      gsap.to(particle.mesh.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.5,
        ease: 'power2.inOut',
        delay: i * 0.02,
      });
    });
  }, [activeStep, particles]);

  // Gentle rotation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.3;
  });

  // Connection lines for steps 2, 3, 4
  const shouldShowLines = activeStep >= 2;

  return (
    <group ref={groupRef}>
      {/* Particles with soft halos */}
      {particles.map((particle, i) => {
        // Determine if this is an active node (for step 2 "Find Perfect Matches")
        const isActiveNode = activeStep === 2 && i < 10; // Highlight top 10 matches in step 2

        return (
          <group key={i}>
            {/* Main particle sphere */}
            <mesh
              position={particle.step1Pos}
              ref={(mesh) => {
                if (mesh) particle.mesh = mesh;
              }}
            >
              <sphereGeometry args={[isActiveNode ? 0.12 : 0.08, 16, 16]} />
              <meshStandardMaterial
                color={isActiveNode ? '#2DFDE6' : particle.color}
                emissive={isActiveNode ? '#2DFDE6' : particle.color}
                emissiveIntensity={isActiveNode ? 0.8 : 0.3}
                metalness={0.5}
                roughness={0.2}
                transparent
                opacity={isActiveNode ? 1.0 : 0.8}
              />
            </mesh>

            {/* Outer glow halo for active nodes */}
            {isActiveNode && (
              <mesh position={particle.mesh?.position || particle.step1Pos}>
                <sphereGeometry args={[0.24, 16, 16]} />
                <meshBasicMaterial
                  color="#2DFDE6"
                  transparent
                  opacity={0.15}
                />
              </mesh>
            )}

            {/* Point light for glow effect */}
            {isActiveNode && (
              <pointLight
                position={particle.mesh?.position || particle.step1Pos}
                color="#2DFDE6"
                intensity={0.3}
                distance={1}
              />
            )}
          </group>
        );
      })}

      {/* Connection lines (only for steps 2, 3, 4) - thinner and softer */}
      {shouldShowLines &&
        particles.slice(0, 15).map((particle, i) => {
          const nextParticle = particles[(i + 1) % 15];
          if (!particle.mesh || !nextParticle.mesh) return null;

          return (
            <Line
              key={`line-${i}`}
              points={[particle.mesh.position, nextParticle.mesh.position]}
              color="#30E3B7"
              lineWidth={0.5}
              opacity={0.2}
              transparent
            />
          );
        })}
    </group>
  );
}
