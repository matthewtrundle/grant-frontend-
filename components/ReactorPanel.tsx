/**
 * Reactor Panel Component
 *
 * A photo-realistic metallic React Three Fiber reactor visualization featuring:
 * - 5 polished chrome energy cores with brushed metal rings
 * - Metallic particles with environment reflections and shimmers
 * - Industrial gray color palette (chrome, brushed steel, dark metal accents)
 * - High metalness (0.95-1.0) + low roughness (0.04-0.15) for mirror-like surfaces
 * - Strong environment reflections (envMapIntensity 2.0-3.2) for realistic shimmers
 * - Animated connection lines to grant cards
 * - Optimized lighting (6 lights total)
 * - Premium industrial aesthetic inspired by high-end machinery
 */

'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// Single Energy Core - clean circular design with subtle animation
function EnergyCore({
  position,
  size,
  glowIntensity = 1.0,
  delay = 0
}: {
  position: [number, number, number];
  size: number;
  glowIntensity?: number;
  delay?: number;
}) {
  const coreRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coreRef.current) {
      const time = state.clock.elapsedTime + delay;
      // Subtle pulsing rotation
      coreRef.current.rotation.y = time * 0.15;
      // Gentle scale pulsing
      const pulseScale = 1 + Math.sin(time * 1.5) * 0.05;
      coreRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  // Photo-realistic polished chrome core material
  const coreMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.75, 0.78, 0.82), // Polished chrome gray
    emissive: new THREE.Color(0.15, 0.18, 0.22), // Very subtle dark blue emissive
    emissiveIntensity: glowIntensity * 0.15,
    metalness: 1.0, // Pure metal
    roughness: 0.05, // Very smooth/shiny
    envMapIntensity: 3.0, // Strong environment reflections
    transparent: true,
    opacity: 0.98,
  }), [glowIntensity]);

  // Brushed metal ring material (slightly rougher)
  const ringMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.68, 0.72, 0.76), // Brushed steel gray
    emissive: new THREE.Color(0.12, 0.15, 0.18),
    emissiveIntensity: glowIntensity * 0.1,
    metalness: 0.97,
    roughness: 0.12, // Slightly brushed surface
    envMapIntensity: 2.5,
    transparent: true,
    opacity: 0.95,
  }), [glowIntensity]);

  // Subtle outer glow (darker, more industrial)
  const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.35, 0.42, 0.48), // Dark industrial blue-gray
    emissive: new THREE.Color(0.25, 0.32, 0.38),
    emissiveIntensity: glowIntensity * 0.2,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  }), [glowIntensity]);

  return (
    <group ref={coreRef} position={position}>
      {/* Main core sphere - polished chrome */}
      <mesh material={coreMaterial}>
        <sphereGeometry args={[size, 32, 32]} />
      </mesh>

      {/* Inner ring detail - brushed metal */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={ringMaterial}>
        <torusGeometry args={[size * 0.7, size * 0.08, 16, 32]} />
      </mesh>

      {/* Outer glow layer - subtle industrial aura */}
      <mesh material={glowMaterial}>
        <sphereGeometry args={[size * 1.3, 24, 24]} />
      </mesh>

      {/* Equatorial ring - brushed metal */}
      <mesh rotation={[0, 0, 0]} material={ringMaterial}>
        <torusGeometry args={[size * 0.85, size * 0.05, 12, 32]} />
      </mesh>
    </group>
  );
}

// Enhanced particle system with turbulence and avoidance behaviors
function ParticleFlow() {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const count = 35;

  const [positions, velocities, colors, trails] = useMemo(() => {
    const pos = [];
    const vel = [];
    const col = new Float32Array(count * 3);
    const trailHistory = [];

    for (let i = 0; i < count; i++) {
      // Emit from reactor cores (distributed across 5 cores)
      const coreIndex = i % 5;
      const coreX = -4 + coreIndex * 2; // Cores at x: -4, -2, 0, 2, 4

      pos.push({
        x: coreX + (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.3,
      });

      // Flow rightward toward cards with variation
      vel.push({
        x: 0.025 + Math.random() * 0.01,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002,
        turbulence: Math.random() * 0.5, // Turbulence phase offset
      });

      // Metallic silver-gray color
      col[i * 3] = 0.72;
      col[i * 3 + 1] = 0.75;
      col[i * 3 + 2] = 0.78;

      // Trail history for motion blur effect
      trailHistory.push([]);
    }

    return [pos, vel, col, trailHistory];
  }, []);

  const particleMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.72, 0.75, 0.78), // Metallic silver
    emissive: new THREE.Color(0.18, 0.22, 0.28), // Subtle dark blue emissive
    emissiveIntensity: 0.25,
    metalness: 0.98,
    roughness: 0.08,
    envMapIntensity: 2.8,
    transparent: true,
    opacity: 0.9,
  }), []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const dummy = new THREE.Object3D();
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      // Add turbulence effect (perlin-like noise simulation)
      const turbulence = {
        x: Math.sin(time * 2 + velocities[i].turbulence * 10) * 0.002,
        y: Math.cos(time * 3 + velocities[i].turbulence * 10) * 0.003,
        z: Math.sin(time * 1.5 + velocities[i].turbulence * 10) * 0.002,
      };

      // Particle avoidance - repel from nearby particles
      let avoidanceX = 0;
      let avoidanceY = 0;
      let avoidanceZ = 0;
      const avoidanceRadius = 0.8;

      for (let j = 0; j < count; j++) {
        if (i === j) continue;

        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        const dz = positions[i].z - positions[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < avoidanceRadius && dist > 0.01) {
          const force = (avoidanceRadius - dist) / avoidanceRadius * 0.001;
          avoidanceX += (dx / dist) * force;
          avoidanceY += (dy / dist) * force;
          avoidanceZ += (dz / dist) * force;
        }
      }

      // Update position with velocity, turbulence, and avoidance
      positions[i].x += velocities[i].x + turbulence.x + avoidanceX;
      positions[i].y += velocities[i].y + turbulence.y + avoidanceY;
      positions[i].z += velocities[i].z + turbulence.z + avoidanceZ;

      // Wrap from right back to left (reset to core)
      if (positions[i].x > 7) {
        const coreIndex = i % 5;
        const coreX = -4 + coreIndex * 2;
        positions[i].x = coreX + (Math.random() - 0.5) * 0.3;
        positions[i].y = (Math.random() - 0.5) * 0.5;
        positions[i].z = (Math.random() - 0.5) * 0.3;
      }

      // Gentle bounds - keep particles within view
      if (Math.abs(positions[i].y) > 3) {
        positions[i].y *= 0.95;
      }
      if (Math.abs(positions[i].z) > 2) {
        positions[i].z *= 0.95;
      }

      // Apply transform with dynamic rotation
      dummy.position.set(positions[i].x, positions[i].y, positions[i].z);
      dummy.rotation.set(
        time * 0.5 + positions[i].x * 0.3,
        time * 0.3 + positions[i].y * 0.3,
        time * 0.7 + positions[i].z * 0.3
      );

      // Dynamic scale with pulsing
      const pulse = 1 + Math.sin(time * 3 + i * 0.5) * 0.15;
      const baseScale = 0.04 + Math.sin(positions[i].x * 2) * 0.01;
      const scale = baseScale * pulse;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      particlesRef.current.setMatrixAt(i, dummy.matrix);
    }

    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, particleMaterial, count]}>
      <boxGeometry args={[1, 1, 1]} />
    </instancedMesh>
  );
}

// Connection lines from reactor to cards (Lavender #A98CEB)
function ConnectionLines({ cardPositions }: { cardPositions: Array<{ x: number; y: number; z: number }> }) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      // Subtle pulsing animation for connection lines
      const pulse = 0.7 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      linesRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Line) {
          const material = child.material as THREE.LineBasicMaterial;
          material.opacity = pulse * 0.4;
        }
      });
    }
  });

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(0.58, 0.62, 0.70), // Cool metallic gray
    transparent: true,
    opacity: 0.35,
    linewidth: 2,
  }), []);

  // Create connection lines from central core to each card
  const connectionGeometries = useMemo(() => {
    return cardPositions.slice(0, 3).map((cardPos) => {
      const points = [
        new THREE.Vector3(0, 0, 0), // Central reactor core
        new THREE.Vector3(cardPos.x, cardPos.y, cardPos.z),
      ];
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, [cardPositions]);

  return (
    <group ref={linesRef}>
      {connectionGeometries.map((geometry, i) => (
        <line key={i} geometry={geometry} material={lineMaterial} />
      ))}
    </group>
  );
}

// Enhanced glowing dots with trailing particle effect
function ConnectionDots({ cardPositions }: { cardPositions: Array<{ x: number; y: number; z: number }> }) {
  const dotsRef = useRef<THREE.Group>(null);
  const trailsRef = useRef<THREE.Points[]>([]);

  const dotMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.78, 0.82, 0.88), // Polished metallic highlight
    emissive: new THREE.Color(0.32, 0.38, 0.48), // Cool metallic emissive
    emissiveIntensity: 0.8,
    metalness: 1.0,
    roughness: 0.04,
    envMapIntensity: 3.2,
    transparent: true,
    opacity: 0.95,
  }), []);

  const trailMaterial = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color(0.65, 0.7, 0.78), // Metallic silver trail
    size: 0.03,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    if (!dotsRef.current) return;

    dotsRef.current.children.forEach((dot, i) => {
      const cardPos = cardPositions[i % cardPositions.length];
      const speed = 0.4 + (i * 0.1); // Varying speeds for visual interest
      const t = (state.clock.elapsedTime * speed + i * 0.4) % 1;

      // Smooth easing for more natural movement
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      // Interpolate from reactor core to card with easing
      dot.position.x = THREE.MathUtils.lerp(0, cardPos.x, eased);
      dot.position.y = THREE.MathUtils.lerp(0, cardPos.y, eased);
      dot.position.z = THREE.MathUtils.lerp(0, cardPos.z, eased);

      // Pulsing glow effect
      const pulse = 0.7 + Math.sin(state.clock.elapsedTime * 4 + i) * 0.3;
      const opacity = pulse * (1 - eased * 0.3);

      if ((dot as THREE.Mesh).material) {
        const mat = (dot as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.opacity = opacity;
        mat.emissiveIntensity = 1.5 * pulse;
      }

      // Dynamic scale for pulsing effect
      const scale = 1 + pulse * 0.3;
      dot.scale.set(scale, scale, scale);
    });
  });

  return (
    <group ref={dotsRef}>
      {cardPositions.slice(0, 3).map((_, i) => (
        <mesh key={i} material={dotMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
      ))}
    </group>
  );
}

// Main reactor scene with 5 cores
function ReactorScene() {
  // Card positions in 3D space (approximate based on 2D overlay positions)
  const cardPositions = useMemo(() => [
    { x: 5, y: 1.5, z: 0.5 },
    { x: 4.5, y: 0, z: -0.5 },
    { x: 5.5, y: -1, z: 0 },
  ], []);

  return (
    <>
      <Environment preset="night" />

      {/* Optimized lighting - 6 lights total */}
      <ambientLight intensity={0.15} color="#0C051A" />

      {/* Central core spotlight */}
      <pointLight
        position={[0, 0, 0]}
        intensity={4}
        distance={12}
        decay={1.5}
        color="#2FB49E"
      />

      {/* Accent rim lights */}
      <pointLight
        position={[4, 2, 4]}
        intensity={2}
        distance={10}
        decay={1.8}
        color="#A98CEB"
      />
      <pointLight
        position={[-4, 2, -4]}
        intensity={2}
        distance={10}
        decay={1.8}
        color="#A98CEB"
      />

      {/* Top spotlight for definition */}
      <spotLight
        position={[0, 6, 0]}
        intensity={2}
        angle={0.6}
        penumbra={1}
        decay={1.5}
        color="#2FB49E"
      />

      {/* Fill light from front */}
      <pointLight
        position={[0, 0, 5]}
        intensity={1.5}
        distance={10}
        decay={1.8}
        color="#151A3A"
      />

      {/* 5 Energy Cores arranged horizontally */}
      <EnergyCore position={[-4, 0, 0]} size={0.4} glowIntensity={0.8} delay={0} />
      <EnergyCore position={[-2, 0, 0]} size={0.5} glowIntensity={0.9} delay={0.5} />
      <EnergyCore position={[0, 0, 0]} size={0.6} glowIntensity={1.2} delay={1.0} /> {/* Central - largest */}
      <EnergyCore position={[2, 0, 0]} size={0.5} glowIntensity={0.9} delay={1.5} />
      <EnergyCore position={[4, 0, 0]} size={0.4} glowIntensity={0.8} delay={2.0} />

      {/* Connecting rods between cores - dark industrial metal */}
      {[-3, -1, 1, 3].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 1.8, 16]} />
          <meshStandardMaterial
            color={new THREE.Color(0.38, 0.42, 0.48)} // Dark industrial metal
            emissive={new THREE.Color(0.15, 0.18, 0.22)}
            emissiveIntensity={0.15}
            metalness={0.95}
            roughness={0.15}
            envMapIntensity={2.0}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Particle flow */}
      <ParticleFlow />

      {/* Connection lines and dots to cards */}
      <ConnectionLines cardPositions={cardPositions} />
      <ConnectionDots cardPositions={cardPositions} />
    </>
  );
}

export default function ReactorPanel() {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 50,
          near: 0.1,
          far: 100
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <color attach="background" args={['transparent']} />
        <ReactorScene />
      </Canvas>
    </div>
  );
}
