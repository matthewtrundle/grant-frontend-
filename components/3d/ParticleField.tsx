/**
 * ParticleField - Floating particle background for 3D scene
 *
 * Features:
 * - Instanced meshes for performance
 * - Subtle floating animation
 * - Scroll-reactive movement
 * - DNA science aesthetic colors
 */

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  size?: number;
  color?: string;
}

export function ParticleField({
  count = 80, // Reduced for atmosphere
  spread = 35,
  size = 0.04,
  color = '#B8E6D5', // Even softer teal
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const scroll = useScroll();

  // Generate random particle positions and velocities
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread * 0.8, // Less vertical spread
        (Math.random() - 0.5) * spread
      );

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );

      const phase = Math.random() * Math.PI * 2;

      temp.push({ position, velocity, phase });
    }
    return temp;
  }, [count, spread]);

  // Subtle floating animation
  useFrame((state) => {
    if (!meshRef.current) return;

    const scrollOffset = scroll.offset;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const { position, velocity, phase } = particle;

      // Gentle floating animation
      const floatY = Math.sin(time * 0.3 + phase) * 0.4;
      const floatX = Math.cos(time * 0.2 + phase) * 0.3;
      const floatZ = Math.sin(time * 0.25 + phase) * 0.2;

      // Very subtle scroll reaction
      const scrollDispersion = scrollOffset * 1.5;

      // Update position
      const matrix = new THREE.Matrix4();
      matrix.setPosition(
        position.x + floatX + Math.sin(scrollDispersion + phase) * 0.8,
        position.y + floatY + scrollDispersion * 0.5,
        position.z + floatZ + Math.cos(scrollDispersion + phase) * 0.8
      );

      // Very gentle pulse
      const scale = 1 + Math.sin(time * 0.8 + phase) * 0.15;
      matrix.scale(new THREE.Vector3(scale, scale, scale));

      meshRef.current.setMatrixAt(i, matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.1}
        roughness={0.5}
        transparent
        opacity={0.2} // Very subtle
      />
    </instancedMesh>
  );
}
