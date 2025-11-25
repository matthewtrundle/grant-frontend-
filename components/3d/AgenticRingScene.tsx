/**
 * AgenticRingScene - Multi-colored open ring with agent nodes and data flows
 *
 * Visual concept:
 * - Large open ring (donut) with colored segments
 * - Agent nodes positioned around the ring
 * - Data particles flowing through the ring
 * - Processing indicators and connections
 * - Maintains horizontal particle flows from AIProcessingScene
 */

'use client';

import { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import React from 'react';

// FundAid color palette
const colors = {
  purple: '#6B4DB8',
  lavender: '#8B7DB8',
  teal: '#1A8B76',
  lightTeal: '#2FB49E',
  blue: '#4A90E2',
  orange: '#FF6B35',
  coral: '#FF8E53',
  muted: '#94A3B8',
  dark: '#1E293B'
};

// Agent types and their colors
const agentTypes = [
  { name: 'Discovery', color: colors.teal, icon: '🔍' },
  { name: 'Analysis', color: colors.blue, icon: '📊' },
  { name: 'Matching', color: colors.purple, icon: '🎯' },
  { name: 'Ranking', color: colors.lavender, icon: '📈' },
  { name: 'Optimization', color: colors.orange, icon: '⚡' },
  { name: 'Validation', color: colors.coral, icon: '✓' }
];

// Mouse influence configuration
const MOUSE_INFLUENCE = {
  radius: 4.0,
  glowStrength: 2.5,
  pulseSpeed: 3.0,
  ringRotationSpeed: 0.2,
  particleSpeed: 1.8,
  agentScale: 1.5,
  lerpSpeed: 0.15
};

interface AgentNodeProps {
  position: [number, number, number];
  agent: typeof agentTypes[0];
  index: number;
  totalAgents: number;
  mousePosition: THREE.Vector3;
  isActive: boolean;
}

// Agent node component
function AgentNode({ position, agent, index, totalAgents, mousePosition, isActive }: AgentNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const currentScale = useRef(1);
  const currentGlow = useRef(0);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current || !orbRef.current) return;

    const time = state.clock.elapsedTime;

    // Calculate distance from mouse
    const nodePos = new THREE.Vector3(...position);
    const distance = nodePos.distanceTo(mousePosition);
    const proximity = Math.max(0, 1 - distance / MOUSE_INFLUENCE.radius);

    // Agent-specific animation phase
    const phase = (index / totalAgents) * Math.PI * 2;

    // Pulsing animation
    const pulseSpeed = 1.5 + proximity * MOUSE_INFLUENCE.pulseSpeed;
    const pulse = Math.sin(time * pulseSpeed + phase) * 0.15 + 1;

    // Target scale and glow
    const targetScale = (isActive ? 1.2 : 0.8) * (1 + proximity * 0.5) * pulse;
    const targetGlow = proximity * MOUSE_INFLUENCE.glowStrength;

    // Smooth interpolation
    currentScale.current += (targetScale - currentScale.current) * MOUSE_INFLUENCE.lerpSpeed;
    currentGlow.current += (targetGlow - currentGlow.current) * MOUSE_INFLUENCE.lerpSpeed;

    // Apply transformations
    meshRef.current.scale.setScalar(currentScale.current);
    glowRef.current.scale.setScalar(currentScale.current * 1.8);

    // Orbit rotation for active agents
    if (isActive) {
      orbRef.current.rotation.y = time * 2 + phase;
      orbRef.current.rotation.z = Math.sin(time * 1.5 + phase) * 0.1;
    }

    // Update materials
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.5 + currentGlow.current * 0.5;
    material.metalness = 0.3 + proximity * 0.3;

    const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
    glowMaterial.opacity = 0.2 + proximity * 0.3;
  });

  return (
    <group position={position}>
      {/* Main agent sphere - reduced from 0.3 to 0.24 */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial
          color={agent.color}
          emissive={agent.color}
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow effect - reduced from 0.4 to 0.32 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial
          color={agent.color}
          opacity={0.2}
          transparent
        />
      </mesh>

      {/* Orbiting indicator - reduced orbit radius and size */}
      <group ref={orbRef}>
        <mesh position={[0.48, 0, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={agent.color} />
        </mesh>
      </group>
    </group>
  );
}

interface ColoredRingProps {
  mousePosition: THREE.Vector3;
  isActive: boolean;
}

// Multi-colored ring component
function ColoredRing({ mousePosition, isActive }: ColoredRingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const segmentRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle rotation influenced by mouse
    const distance = mousePosition.distanceTo(new THREE.Vector3(0, 0, -5));
    const proximity = Math.max(0, 1 - distance / 6);

    groupRef.current.rotation.z += (0.002 + proximity * MOUSE_INFLUENCE.ringRotationSpeed * 0.01);

    // Animate segments
    segmentRefs.current.forEach((segment, i) => {
      if (segment) {
        const material = segment.material as THREE.MeshStandardMaterial;
        const phase = (i / 6) * Math.PI * 2;
        const glow = Math.sin(time * 2 + phase) * 0.3 + 0.7;
        material.emissiveIntensity = glow * (isActive ? 0.6 : 0.3);

        // Subtle scale animation
        const scale = 1 + Math.sin(time * 1.5 + phase) * 0.02;
        segment.scale.setScalar(scale);
      }
    });
  });

  // Create ring segments
  const segments = useMemo(() => {
    const segs = [];
    const segmentAngle = (Math.PI * 2) / 6;
    const ringRadius = 3; // Reduced from 4 to make ring less prominent
    const tubeRadius = 0.25; // Reduced from 0.3 to make ring thinner
    const gapAngle = 0.05; // Small gap between segments

    for (let i = 0; i < 6; i++) {
      const startAngle = i * segmentAngle + gapAngle / 2;
      const endAngle = (i + 1) * segmentAngle - gapAngle / 2;

      const curve = new THREE.Curve<THREE.Vector3>();
      curve.getPoint = (t: number) => {
        const angle = startAngle + (endAngle - startAngle) * t;
        return new THREE.Vector3(
          Math.cos(angle) * ringRadius,
          Math.sin(angle) * ringRadius,
          0
        );
      };

      segs.push({
        curve,
        color: agentTypes[i].color,
        index: i
      });
    }
    return segs;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {segments.map((segment, i) => (
        <mesh
          key={`segment-${i}`}
          ref={(el) => {
            if (el) segmentRefs.current[i] = el;
          }}
        >
          <tubeGeometry args={[segment.curve, 20, 0.3, 8, false]} />
          <meshStandardMaterial
            color={segment.color}
            emissive={segment.color}
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

// Ring particles that flow through the ring
interface RingParticlesProps {
  mousePosition: THREE.Vector3;
}

function RingParticles({ mousePosition }: RingParticlesProps) {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const particleData = useRef<Array<{
    angle: number;
    speed: number;
    radius: number;
    color: string;
    size: number;
  }>>([]);

  // Initialize particles
  useMemo(() => {
    const particles = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: (i / particleCount) * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        radius: 2.7 + Math.random() * 0.8, // Reduced from 3.5 to match smaller ring
        color: agentTypes[Math.floor(Math.random() * agentTypes.length)].color,
        size: 0.05 + Math.random() * 0.1
      });
    }

    particleData.current = particles;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.elapsedTime;
    const tempMatrix = new THREE.Matrix4();
    const tempPos = new THREE.Vector3();

    particleData.current.forEach((particle, i) => {
      // Update angle
      particle.angle += particle.speed * 0.01;

      // Calculate position on ring
      const x = Math.cos(particle.angle) * particle.radius;
      const y = Math.sin(particle.angle) * particle.radius;
      const z = Math.sin(time * 2 + i * 0.1) * 0.5 - 5;

      tempPos.set(x, y, z);

      // Mouse influence
      const distance = tempPos.distanceTo(mousePosition);
      const proximity = Math.max(0, 1 - distance / MOUSE_INFLUENCE.radius);

      if (proximity > 0) {
        // Speed boost
        particle.angle += proximity * MOUSE_INFLUENCE.particleSpeed * 0.01;

        // Radial deviation
        const radiusOffset = Math.sin(time * 5 + i) * proximity * 0.5;
        tempPos.x *= (1 + radiusOffset * 0.1);
        tempPos.y *= (1 + radiusOffset * 0.1);
      }

      // Apply scale
      const scale = particle.size * (1 + proximity * 0.8);

      tempMatrix.makeScale(scale, scale, scale);
      tempMatrix.setPosition(tempPos);
      particlesRef.current!.setMatrixAt(i, tempMatrix);
    });

    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, 60]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial
        color={colors.lightTeal}
        opacity={0.6}
        transparent
      />
    </instancedMesh>
  );
}

// Horizontal particle lanes (from original AIProcessingScene)
interface ParticleLane {
  y: number;
  speed: number;
  particleCount: number;
  color: string;
  size: number;
}

function HorizontalParticles({ lane, mousePosition }: { lane: ParticleLane; mousePosition: THREE.Vector3 }) {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const particleData = useRef<Array<{ x: number; y: number; speed: number }>>([]);

  useMemo(() => {
    const particles = [];
    for (let i = 0; i < lane.particleCount; i++) {
      particles.push({
        x: -15 + Math.random() * 30,
        y: lane.y,
        speed: lane.speed * (0.8 + Math.random() * 0.4)
      });
    }
    particleData.current = particles;
  }, [lane]);

  useFrame(() => {
    if (!particlesRef.current) return;

    const tempMatrix = new THREE.Matrix4();
    const tempPos = new THREE.Vector3();

    particleData.current.forEach((particle, i) => {
      particle.x += particle.speed * 0.02;
      if (particle.x > 15) particle.x = -15;

      tempPos.set(particle.x, particle.y, -6);

      const distance = tempPos.distanceTo(mousePosition);
      const proximity = Math.max(0, 1 - distance / MOUSE_INFLUENCE.radius);
      const scale = lane.size * (1 + proximity * 1.2); // Increased from 0.5 to 1.2 for more prominent interaction

      tempMatrix.makeScale(scale, scale, scale);
      tempMatrix.setPosition(tempPos);
      particlesRef.current!.setMatrixAt(i, tempMatrix);
    });

    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, lane.particleCount]}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshBasicMaterial color={lane.color} opacity={0.5} transparent />
    </instancedMesh>
  );
}

// Main scene component
export interface AgenticRingSceneProps {
  isActive?: boolean;
  progress?: number;
}

export function AgenticRingScene({
  isActive = true,
  progress = 0.5
}: AgenticRingSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useRef(new THREE.Vector3(0, 0, -5));
  const targetMousePosition = useRef(new THREE.Vector3(0, 0, -5));

  // Three.js context for mouse tracking
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);

    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 5);
    const intersection = new THREE.Vector3();
    raycaster.current.ray.intersectPlane(plane, intersection);

    if (intersection) {
      targetMousePosition.current.copy(intersection);
    }
  }, [camera, gl]);

  // Set up mouse event listeners
  React.useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl, handleMouseMove]);

  // Smooth mouse position interpolation
  useFrame(() => {
    mousePosition.current.lerp(targetMousePosition.current, MOUSE_INFLUENCE.lerpSpeed);
  });

  // Agent positions around the ring
  const agentPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const radius = 3.5; // Reduced from 4.5 to make ring less prominent

    agentTypes.forEach((_, i) => {
      const angle = (i / agentTypes.length) * Math.PI * 2 - Math.PI / 2;
      positions.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -5
      ]);
    });

    return positions;
  }, []);

  // Horizontal particle lanes configuration - increased count and prominence
  const particleLanes: ParticleLane[] = useMemo(() => [
    { y: 3.5, speed: 2.0, particleCount: 15, color: colors.lightTeal, size: 0.7 },
    { y: 2.0, speed: 1.5, particleCount: 16, color: colors.blue, size: 0.6 },
    { y: -2.0, speed: 1.8, particleCount: 14, color: colors.lavender, size: 0.6 },
    { y: -3.5, speed: 2.2, particleCount: 13, color: colors.coral, size: 0.7 }
  ], []);

  return (
    <group ref={groupRef}>
      {/* Main colored ring */}
      <ColoredRing mousePosition={mousePosition.current} isActive={isActive} />

      {/* Agent nodes around the ring */}
      {agentPositions.map((pos, i) => (
        <AgentNode
          key={`agent-${i}`}
          position={pos}
          agent={agentTypes[i]}
          index={i}
          totalAgents={agentTypes.length}
          mousePosition={mousePosition.current}
          isActive={isActive && (i <= Math.floor(progress * agentTypes.length))}
        />
      ))}

      {/* Ring particles */}
      <RingParticles mousePosition={mousePosition.current} />

      {/* Horizontal particle streams */}
      {particleLanes.map((lane, i) => (
        <HorizontalParticles
          key={`lane-${i}`}
          lane={lane}
          mousePosition={mousePosition.current}
        />
      ))}

      {/* Connecting lines between agents */}
      <group>
        {agentPositions.map((startPos, i) => {
          const endIndex = (i + 1) % agentPositions.length;
          const endPos = agentPositions[endIndex];

          return (
            <line key={`connection-${i}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([...startPos, ...endPos])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={agentTypes[i].color}
                opacity={0.2}
                transparent
              />
            </line>
          );
        })}
      </group>

      {/* Background gradient */}
      <mesh position={[0, 0, -8]}>
        <planeGeometry args={[30, 20]} />
        <meshBasicMaterial
          color={colors.dark}
          opacity={0.02}
          transparent
        />
      </mesh>
    </group>
  );
}