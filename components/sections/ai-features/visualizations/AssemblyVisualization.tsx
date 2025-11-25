/**
 * AssemblyVisualization - Knowledge assembly for RAG-enhanced writing
 * Shows fragments of knowledge coming together to form complete responses
 */

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface AssemblyVisualizationProps {
  intensity: number;
  isActive: boolean;
}

export function AssemblyVisualization({ intensity, isActive }: AssemblyVisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const fragmentsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Knowledge fragments
  const fragments = useMemo(() => {
    const count = 20;
    const items: {
      position: THREE.Vector3;
      targetPosition: THREE.Vector3;
      rotation: THREE.Euler;
      scale: number;
      color: string;
      type: 'example' | 'context' | 'template';
    }[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;

      // Scattered starting position
      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius
      );

      // Target position (assembled)
      const targetRadius = 0.8;
      const targetPosition = new THREE.Vector3(
        Math.cos(angle) * targetRadius,
        Math.sin(angle * 2) * 0.5,
        Math.sin(angle) * targetRadius
      );

      // Fragment properties
      const types: ('example' | 'context' | 'template')[] = ['example', 'context', 'template'];
      const type = types[i % 3];

      const colors = {
        example: '#2FB49E',   // teal - successful examples
        context: '#A98CEB',   // purple - context data
        template: '#2FB49E'   // teal - templates
      };

      items.push({
        position,
        targetPosition,
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        scale: 0.3 + Math.random() * 0.3,
        color: colors[type],
        type
      });
    }

    return items;
  }, []);

  // Animation
  useFrame((state) => {
    if (!groupRef.current || !fragmentsRef.current || !coreRef.current) return;

    const time = state.clock.elapsedTime;

    // Assembly phase (0 = scattered, 1 = assembled)
    const assemblyPhase = (Math.sin(time * 0.15) + 1) * 0.5;

    // Rotate the whole scene gently
    groupRef.current.rotation.y = time * 0.05;

    // Animate fragments
    fragmentsRef.current.children.forEach((child, i) => {
      const fragment = fragments[i];

      // Interpolate position
      child.position.lerpVectors(
        fragment.position,
        fragment.targetPosition,
        assemblyPhase
      );

      // Rotation based on assembly state
      child.rotation.x = fragment.rotation.x * (1 - assemblyPhase) + time * 0.2;
      child.rotation.y = fragment.rotation.y * (1 - assemblyPhase) + time * 0.3;
      child.rotation.z = fragment.rotation.z * (1 - assemblyPhase);

      // Scale pulses when assembled
      const pulseScale = fragment.scale * (1 + assemblyPhase * Math.sin(time * 3 + i) * 0.1 * intensity);
      child.scale.setScalar(pulseScale);

      // Opacity based on assembly
      if (child.children[0] && child.children[0] instanceof THREE.Mesh) {
        const mat = child.children[0].material as THREE.MeshStandardMaterial;
        mat.opacity = 0.3 + assemblyPhase * 0.5;
      }
    });

    // Core glow effect
    const coreScale = 0.5 + assemblyPhase * 0.5;
    coreRef.current.scale.setScalar(coreScale);

    const coreMat = coreRef.current.material as THREE.MeshStandardMaterial;
    coreMat.emissiveIntensity = 0.2 + assemblyPhase * 0.6 * intensity;
  });

  return (
    <group ref={groupRef}>
      {/* Central core (assembled knowledge) */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial
          color="#2FB49E"
          emissive="#2FB49E"
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Knowledge fragments */}
      <group ref={fragmentsRef}>
        {fragments.map((fragment, i) => (
          <group key={i} position={fragment.position}>
            <mesh>
              {fragment.type === 'example' ? (
                <boxGeometry args={[0.3, 0.3, 0.1]} />
              ) : fragment.type === 'context' ? (
                <tetrahedronGeometry args={[0.25, 0]} />
              ) : (
                <octahedronGeometry args={[0.2, 0]} />
              )}
              <meshStandardMaterial
                color={fragment.color}
                emissive={fragment.color}
                emissiveIntensity={0.2 * intensity}
                metalness={0.3}
                roughness={0.5}
                transparent
                opacity={0.5}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Data streams connecting fragments */}
      {isActive && <DataStreams fragments={fragments} intensity={intensity} />}

      {/* Floating text labels */}
      <group>
        <FloatingLabel
          text="Examples"
          position={[2, 2, 0]}
          color="#2FB49E"
          intensity={intensity}
        />
        <FloatingLabel
          text="Context"
          position={[-2, 2, 0]}
          color="#A98CEB"
          intensity={intensity}
        />
        <FloatingLabel
          text="Templates"
          position={[0, -2.5, 0]}
          color="#2FB49E"
          intensity={intensity}
        />
      </group>
    </group>
  );
}

// Data streams between fragments
function DataStreams({ fragments, intensity }: any) {
  const streamsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!streamsRef.current) return;

    const time = state.clock.elapsedTime;

    streamsRef.current.children.forEach((stream, i) => {
      if (stream instanceof THREE.Line) {
        const mat = stream.material as THREE.LineBasicMaterial;
        const pulse = Math.sin(time * 3 + i * 0.5) * 0.5 + 0.5;
        mat.opacity = 0.1 + pulse * 0.2 * intensity;
      }
    });
  });

  // Create connections between nearby fragments
  const connections: [number, number][] = [];
  for (let i = 0; i < fragments.length; i++) {
    const nextIndex = (i + 1) % fragments.length;
    const skipIndex = (i + Math.floor(fragments.length / 3)) % fragments.length;
    connections.push([i, nextIndex]);
    if (i % 3 === 0) {
      connections.push([i, skipIndex]);
    }
  }

  return (
    <group ref={streamsRef}>
      {connections.map(([from, to], i) => {
        const points = [
          fragments[from].targetPosition,
          fragments[to].targetPosition
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial
              color="#2FB49E"
              transparent
              opacity={0.2}
              linewidth={1}
            />
          </line>
        );
      })}
    </group>
  );
}

// Floating text label component
function FloatingLabel({ text, position, color, intensity }: any) {
  const textRef = useRef<any>(null);

  useFrame((state) => {
    if (!textRef.current) return;

    const time = state.clock.elapsedTime;
    textRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.1;
    textRef.current.material.opacity = 0.3 + intensity * 0.4;
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.3}
      color={color}
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={0.5}
    >
      {text}
    </Text>
  );
}