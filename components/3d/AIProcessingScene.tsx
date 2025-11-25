/**
 * AIProcessingScene - Static front-facing neural network with horizontal particle flows
 *
 * This scene represents an AI processing pipeline with:
 * - A static, front-facing neural network (no rotation)
 * - Multiple horizontal particle streams flowing at different speeds
 * - Different particle grid patterns per lane
 * - Mouse interactivity for neurons and particles
 *
 * Visual concept: Data flows horizontally through processing lanes while
 * passing through a central neural network structure.
 *
 * Props:
 * - isActive: Whether the network is actively processing
 * - progress: Processing progress (0-1)
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

// Mouse influence configuration
const MOUSE_INFLUENCE = {
  radius: 3.5,
  glowStrength: 2.0,
  pulseSpeed: 2.5,
  connectionBoost: 3.0,
  particleSpeed: 1.5,
  particleDeviation: 0.8,
  lerpSpeed: 0.15
};

interface NeuronProps {
  position: [number, number, number];
  layerIndex: number;
  neuronIndex: number;
  isActive: boolean;
  activationStrength: number;
  mousePosition: THREE.Vector3;
}

// Static neuron component with mouse interaction (no rotation)
function Neuron({
  position,
  layerIndex,
  neuronIndex,
  isActive,
  activationStrength,
  mousePosition
}: NeuronProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const currentScale = useRef(1);
  const currentGlow = useRef(0);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;

    const time = state.clock.elapsedTime;

    // Calculate distance from mouse
    const neuronPos = new THREE.Vector3(...position);
    const distance = neuronPos.distanceTo(mousePosition);
    const proximity = Math.max(0, 1 - distance / MOUSE_INFLUENCE.radius);

    // Gentle pulsing that increases with mouse proximity
    const pulseSpeed = 1.2 + proximity * MOUSE_INFLUENCE.pulseSpeed;
    const pulse = Math.sin(time * pulseSpeed + layerIndex * 0.3 + neuronIndex * 0.2) * 0.1 + 1;

    // Target scale and glow based on proximity
    const targetScale = (isActive ? 0.8 : 0.5) * (1 + proximity * 0.6) * pulse;
    const targetGlow = proximity * MOUSE_INFLUENCE.glowStrength;

    // Smooth interpolation
    currentScale.current += (targetScale - currentScale.current) * MOUSE_INFLUENCE.lerpSpeed;
    currentGlow.current += (targetGlow - currentGlow.current) * MOUSE_INFLUENCE.lerpSpeed;

    // Apply transformations
    meshRef.current.scale.setScalar(currentScale.current);
    glowRef.current.scale.setScalar(currentScale.current * 1.5);

    // Update materials
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.2 * activationStrength * (1 + currentGlow.current);
    material.opacity = 0.3 + proximity * 0.3;

    const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
    glowMaterial.opacity = 0.1 + proximity * 0.2;
  });

  const neuronColor = layerIndex === 0 ? colors.teal :
                      layerIndex === 4 ? colors.coral :
                      colors.lavender;

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={neuronColor}
          emissive={neuronColor}
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.7}
          opacity={0.3}
          transparent
        />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial
          color={neuronColor}
          opacity={0.1}
          transparent
        />
      </mesh>
    </group>
  );
}

interface ConnectionProps {
  startPos: THREE.Vector3;
  endPos: THREE.Vector3;
  strength: number;
  mousePosition: THREE.Vector3;
}

// Static synapse connections with mouse-responsive brightness
function Connection({ startPos, endPos, strength, mousePosition }: ConnectionProps) {
  const lineRef = useRef<THREE.Line>(null);
  const currentOpacity = useRef(0.1);

  useFrame(() => {
    if (!lineRef.current) return;

    // Calculate proximity to mouse for the connection midpoint
    const midPoint = new THREE.Vector3(
      (startPos.x + endPos.x) / 2,
      (startPos.y + endPos.y) / 2,
      startPos.z
    );
    const distance = midPoint.distanceTo(mousePosition);
    const proximity = Math.max(0, 1 - distance / MOUSE_INFLUENCE.radius);

    // Enhanced brightness based on mouse proximity
    const targetOpacity = (0.1 + proximity * 0.4) * strength;
    currentOpacity.current += (targetOpacity - currentOpacity.current) * MOUSE_INFLUENCE.lerpSpeed;

    const material = lineRef.current.material as THREE.LineBasicMaterial;
    material.opacity = currentOpacity.current;
  });

  const points = [startPos, endPos];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={colors.blue}
        opacity={0.1}
        transparent
      />
    </line>
  );
}

// Configuration for horizontal particle lanes
interface ParticleLane {
  y: number;           // Vertical position
  speed: number;       // Base speed multiplier
  pattern: 'single' | 'grid2x2' | 'grid3x3' | 'scattered';
  particleCount: number;
  color: string;
  size: number;
  spacing: number;
}

interface HorizontalParticleFlowProps {
  lane: ParticleLane;
  index: number;
  mousePosition: THREE.Vector3;
}

// Horizontal particle flow system
function HorizontalParticleFlow({ lane, index, mousePosition }: HorizontalParticleFlowProps) {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const particleData = useRef<Array<{
    x: number;
    baseY: number;
    baseZ: number;
    speedMult: number;
    phase: number;
  }>>([]);

  // Initialize particle positions based on pattern
  useMemo(() => {
    const particles: typeof particleData.current = [];
    const startX = -15; // Start off-screen left
    const endX = 15;    // End off-screen right

    switch (lane.pattern) {
      case 'single':
        // Single-file line of particles
        for (let i = 0; i < lane.particleCount; i++) {
          particles.push({
            x: startX + (i / lane.particleCount) * (endX - startX),
            baseY: lane.y,
            baseZ: 0,
            speedMult: 0.9 + Math.random() * 0.2,
            phase: Math.random() * Math.PI * 2
          });
        }
        break;

      case 'grid2x2':
        // 2x2 grid formation
        for (let i = 0; i < lane.particleCount; i++) {
          const gridX = i % 2;
          const gridY = Math.floor(i / 2) % 2;
          particles.push({
            x: startX + (i / lane.particleCount) * (endX - startX) * 4,
            baseY: lane.y + (gridY - 0.5) * lane.spacing,
            baseZ: (gridX - 0.5) * lane.spacing * 0.5,
            speedMult: 0.95 + Math.random() * 0.1,
            phase: Math.random() * Math.PI * 2
          });
        }
        break;

      case 'grid3x3':
        // 3x3 grid formation
        for (let i = 0; i < lane.particleCount; i++) {
          const gridX = i % 3;
          const gridY = Math.floor(i / 3) % 3;
          particles.push({
            x: startX + (i / lane.particleCount) * (endX - startX) * 6,
            baseY: lane.y + (gridY - 1) * lane.spacing,
            baseZ: (gridX - 1) * lane.spacing * 0.5,
            speedMult: 0.9 + Math.random() * 0.2,
            phase: Math.random() * Math.PI * 2
          });
        }
        break;

      case 'scattered':
        // Randomly scattered particles in a band
        for (let i = 0; i < lane.particleCount; i++) {
          particles.push({
            x: startX + Math.random() * (endX - startX),
            baseY: lane.y + (Math.random() - 0.5) * lane.spacing * 2,
            baseZ: (Math.random() - 0.5) * lane.spacing,
            speedMult: 0.7 + Math.random() * 0.6,
            phase: Math.random() * Math.PI * 2
          });
        }
        break;
    }

    particleData.current = particles;
  }, [lane]);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.elapsedTime;
    const tempMatrix = new THREE.Matrix4();
    const tempPos = new THREE.Vector3();

    particleData.current.forEach((particle, i) => {
      // Move particle horizontally
      particle.x += lane.speed * particle.speedMult * 0.02;

      // Wrap around when particle goes off-screen
      if (particle.x > 15) {
        particle.x = -15;
      }

      // Set particle position
      tempPos.set(particle.x, particle.baseY, particle.baseZ - 5);

      // Calculate mouse influence
      const distance = tempPos.distanceTo(mousePosition);
      const proximity = Math.max(0, 1 - distance / MOUSE_INFLUENCE.radius);

      // Speed boost and deviation near mouse
      if (proximity > 0) {
        // Speed up
        particle.x += proximity * MOUSE_INFLUENCE.particleSpeed * 0.02;

        // Add vertical deviation
        const deviation = Math.sin(time * 5 + particle.phase) * proximity * MOUSE_INFLUENCE.particleDeviation;
        tempPos.y += deviation * 0.3;

        // Add slight z deviation for depth
        tempPos.z += Math.cos(time * 4 + particle.phase) * proximity * 0.2;
      }

      // Gentle floating motion
      tempPos.y += Math.sin(time * 2 + particle.phase) * 0.05;

      // Apply scale based on proximity
      const scale = lane.size * (1 + proximity * 0.5);

      // Set instance matrix
      tempMatrix.makeScale(scale, scale, scale);
      tempMatrix.setPosition(tempPos);
      particlesRef.current!.setMatrixAt(i, tempMatrix);
    });

    particlesRef.current.instanceMatrix.needsUpdate = true;

    // Update material opacity based on overall mouse proximity
    const material = particlesRef.current.material as THREE.MeshBasicMaterial;
    if (material) {
      material.opacity = 0.3;
    }
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, lane.particleCount]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial
        color={lane.color}
        opacity={0.3}
        transparent
      />
    </instancedMesh>
  );
}

// Main Scene Component
export interface AIProcessingSceneProps {
  isActive?: boolean;
  progress?: number;
}

export function AIProcessingScene({
  isActive = true,
  progress = 0.5
}: AIProcessingSceneProps) {
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

  // Generate static neural network structure
  const network = useMemo(() => {
    const neurons: Array<{
      position: THREE.Vector3;
      layer: number;
      index: number;
      active: boolean;
      strength: number;
    }> = [];

    const connections: Array<{
      start: THREE.Vector3;
      end: THREE.Vector3;
      strength: number;
    }> = [];

    // 5 layers arranged vertically in columns
    const layers = [
      { count: 6, x: -3 },   // Input layer
      { count: 8, x: -1.5 }, // Hidden layer 1
      { count: 7, x: 0 },    // Hidden layer 2
      { count: 8, x: 1.5 },  // Hidden layer 3
      { count: 6, x: 3 }     // Output layer
    ];

    // Create neurons in vertical columns
    layers.forEach((layer, layerIndex) => {
      const ySpacing = 0.6;
      const yOffset = -(layer.count - 1) * ySpacing / 2;

      for (let i = 0; i < layer.count; i++) {
        const position = new THREE.Vector3(
          layer.x,
          yOffset + i * ySpacing,
          -5
        );

        const isNeuronActive = isActive && (
          Math.random() > 0.3 ||
          (layerIndex <= Math.floor(progress * 5))
        );

        neurons.push({
          position,
          layer: layerIndex,
          index: i,
          active: isNeuronActive,
          strength: 0.4 + Math.random() * 0.6
        });
      }
    });

    // Create connections between adjacent layers
    let neuronIndex = 0;
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerStart = neuronIndex;
      const currentLayerEnd = currentLayerStart + layers[l].count;
      const nextLayerStart = currentLayerEnd;
      const nextLayerEnd = nextLayerStart + layers[l + 1].count;

      for (let i = currentLayerStart; i < currentLayerEnd; i++) {
        for (let j = nextLayerStart; j < nextLayerEnd; j++) {
          // Selective connections for cleaner look
          if (Math.random() > 0.6) {
            connections.push({
              start: neurons[i].position,
              end: neurons[j].position,
              strength: 0.3 + Math.random() * 0.7
            });
          }
        }
      }
      neuronIndex = currentLayerEnd;
    }

    return { neurons, connections };
  }, [isActive, progress]);

  // Define horizontal particle lanes with varied patterns
  const particleLanes: ParticleLane[] = useMemo(() => [
    // Top lanes - faster, single file
    {
      y: 3.5,
      speed: 2.5,
      pattern: 'single',
      particleCount: 12,
      color: colors.lightTeal,
      size: 0.8,
      spacing: 0.3
    },
    {
      y: 2.8,
      speed: 1.8,
      pattern: 'grid2x2',
      particleCount: 16,
      color: colors.blue,
      size: 0.7,
      spacing: 0.25
    },
    // Middle lanes - moderate speed, grid patterns
    {
      y: 1.5,
      speed: 1.2,
      pattern: 'grid3x3',
      particleCount: 18,
      color: colors.purple,
      size: 0.6,
      spacing: 0.2
    },
    {
      y: 0.3,
      speed: 1.5,
      pattern: 'scattered',
      particleCount: 20,
      color: colors.orange,
      size: 0.5,
      spacing: 0.4
    },
    // Center lane - through the network
    {
      y: 0,
      speed: 0.8,
      pattern: 'single',
      particleCount: 10,
      color: colors.coral,
      size: 0.9,
      spacing: 0.3
    },
    // Bottom lanes - slower, varied patterns
    {
      y: -1.2,
      speed: 0.6,
      pattern: 'grid2x2',
      particleCount: 14,
      color: colors.lavender,
      size: 0.6,
      spacing: 0.25
    },
    {
      y: -2.5,
      speed: 1.0,
      pattern: 'scattered',
      particleCount: 15,
      color: colors.teal,
      size: 0.5,
      spacing: 0.5
    },
    {
      y: -3.5,
      speed: 2.0,
      pattern: 'single',
      particleCount: 10,
      color: colors.blue,
      size: 0.7,
      spacing: 0.3
    }
  ], []);

  // Smooth mouse position interpolation
  useFrame(() => {
    mousePosition.current.lerp(targetMousePosition.current, MOUSE_INFLUENCE.lerpSpeed);
  });

  return (
    <group ref={groupRef}>
      {/* Static neural network */}
      {network.neurons.map((neuron, i) => (
        <Neuron
          key={`neuron-${i}`}
          position={neuron.position.toArray() as [number, number, number]}
          layerIndex={neuron.layer}
          neuronIndex={neuron.index}
          isActive={neuron.active}
          activationStrength={neuron.strength}
          mousePosition={mousePosition.current}
        />
      ))}

      {/* Network connections */}
      {network.connections.map((conn, i) => (
        <Connection
          key={`conn-${i}`}
          startPos={conn.start}
          endPos={conn.end}
          strength={conn.strength}
          mousePosition={mousePosition.current}
        />
      ))}

      {/* Horizontal particle flows */}
      {particleLanes.map((lane, i) => (
        <HorizontalParticleFlow
          key={`lane-${i}`}
          lane={lane}
          index={i}
          mousePosition={mousePosition.current}
        />
      ))}

      {/* Subtle background gradient planes */}
      <mesh position={[0, 0, -6]} rotation={[0, 0, 0]}>
        <planeGeometry args={[30, 15]} />
        <meshBasicMaterial
          color={colors.purple}
          opacity={0.02}
          transparent
        />
      </mesh>

      <mesh position={[0, 0, -7]} rotation={[0, 0, 0]}>
        <planeGeometry args={[35, 18]} />
        <meshBasicMaterial
          color={colors.dark}
          opacity={0.03}
          transparent
        />
      </mesh>
    </group>
  );
}