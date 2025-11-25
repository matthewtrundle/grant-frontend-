/**
 * StageVisualsR3F - React Three Fiber 3D visualizations for stages
 *
 * These components provide sophisticated 3D visuals for DISCOVER and ANALYZE stages
 * using particle systems, network graphs, and abstract geometric forms.
 *
 * Design principles:
 * - Calm, structured motion tied to scroll progress
 * - Abstract, scientific aesthetic
 * - Respects fundaidTheme color palette
 * - Performance-conscious with instanced meshes
 */

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Points,
  PointMaterial,
  Line,
  Sphere,
  Box,
  MeshDistortMaterial,
  Float,
  Trail,
  Instance,
  Instances
} from '@react-three/drei';
import * as THREE from 'three';
import { fundaidTheme } from '@/lib/digilab-theme';

interface VisualizationProps {
  progress: number; // 0-1 scroll progress within stage
}

/**
 * DISCOVER Stage 3D Scene - Grant matching network
 * Features:
 * - Particle cloud representing grant database
 * - Connection lines forming when matches are found
 * - Orbiting scanner element
 * - Data flow particles along connections
 */
function DiscoverScene({ progress }: VisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const connectionsRef = useRef<THREE.Group>(null);

  // Generate particle positions for grant cloud
  const particleCount = 500;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    // Create spherical distribution with clustering
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Spherical coordinates with some clustering
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2 + Math.random() * 2;

      // Add clustering bias for matched grants
      const isMatched = i < particleCount * 0.2; // 20% are matches
      const clusterRadius = isMatched ? radius * 0.7 : radius;

      positions[i3] = clusterRadius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = clusterRadius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = clusterRadius * Math.cos(phi);

      // Color based on match status
      const color = isMatched
        ? new THREE.Color(fundaidTheme.accents.teal)
        : new THREE.Color(fundaidTheme.text.muted);

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Larger scale for matches
      scales[i] = isMatched ? 1.5 : 0.8;
    }

    return { positions, colors, scales };
  }, []);

  // Generate connection lines between matched particles
  const connections = useMemo(() => {
    const lines = [];
    const matchedCount = Math.floor(particleCount * 0.2);

    for (let i = 0; i < matchedCount - 1; i++) {
      if (Math.random() > 0.6) { // Not all matches are connected
        const start = new THREE.Vector3(
          particles.positions[i * 3],
          particles.positions[i * 3 + 1],
          particles.positions[i * 3 + 2]
        );

        const end = new THREE.Vector3(
          particles.positions[(i + 1) * 3],
          particles.positions[(i + 1) * 3 + 1],
          particles.positions[(i + 1) * 3 + 2]
        );

        lines.push({ start, end, opacity: Math.random() * 0.5 + 0.2 });
      }
    }

    return lines;
  }, [particles]);

  // Animate particles and scanner
  useFrame((state) => {
    if (particlesRef.current) {
      // Gentle rotation of particle cloud
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

      // Pulsing based on progress
      const scale = 1 + Math.sin(progress * Math.PI) * 0.1;
      particlesRef.current.scale.setScalar(scale);
    }

    if (scannerRef.current) {
      // Orbiting scanner
      const radius = 3;
      const speed = progress * 2;
      scannerRef.current.position.x = Math.cos(state.clock.elapsedTime * speed) * radius;
      scannerRef.current.position.z = Math.sin(state.clock.elapsedTime * speed) * radius;
      scannerRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;

      // Look at center
      scannerRef.current.lookAt(0, 0, 0);
    }

    if (connectionsRef.current) {
      // Fade in connections based on progress
      connectionsRef.current.children.forEach((child, idx) => {
        if (child instanceof THREE.Line) {
          const material = child.material as THREE.LineBasicMaterial;
          material.opacity = Math.min(progress * 2, 1) * (0.2 + idx * 0.05);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Particle cloud */}
      <Points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>

      {/* Connection lines */}
      <group ref={connectionsRef}>
        {connections.map((conn, idx) => (
          <Line
            key={idx}
            points={[conn.start, conn.end]}
            color={fundaidTheme.accents.teal}
            lineWidth={1}
            opacity={0}
            transparent
          />
        ))}
      </group>

      {/* Scanner element */}
      <mesh ref={scannerRef}>
        <octahedronGeometry args={[0.2]} />
        <meshPhongMaterial
          color={fundaidTheme.accents.teal}
          emissive={fundaidTheme.accents.teal}
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Scanning beam */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[2, 4, 32, 1, true]} />
        <meshBasicMaterial
          color={fundaidTheme.accents.teal}
          transparent
          opacity={progress * 0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/**
 * ANALYZE Stage 3D Scene - Document processing visualization
 * Features:
 * - Floating document planes
 * - Analysis grid/matrix
 * - Progress indicators as 3D bars
 * - Data extraction particles
 */
function AnalyzeScene({ progress }: VisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const documentsRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Group>(null);
  const metricsRef = useRef<THREE.Group>(null);

  // Document positions in 3D space
  const documents = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      position: new THREE.Vector3(
        (i - 2) * 1.2,
        Math.sin(i * 0.5) * 0.5,
        (i - 2) * 0.3
      ),
      rotation: new THREE.Euler(
        Math.random() * 0.2 - 0.1,
        Math.random() * 0.2 - 0.1,
        Math.random() * 0.2 - 0.1
      ),
      scale: 0.8 + Math.random() * 0.4
    }));
  }, []);

  // Metric bars configuration
  const metrics = useMemo(() => {
    return [
      { label: 'TRL', value: 0.85, color: fundaidTheme.accents.lavender },
      { label: 'FIT', value: 0.92, color: fundaidTheme.accents.lavender },
      { label: 'BUD', value: 0.78, color: fundaidTheme.accents.lavender },
      { label: 'TIM', value: 0.95, color: fundaidTheme.accents.lavender },
      { label: 'COM', value: 1.0, color: fundaidTheme.accents.lavender }
    ];
  }, []);

  useFrame((state) => {
    if (documentsRef.current) {
      // Float documents
      documentsRef.current.children.forEach((child, idx) => {
        child.position.y = documents[idx].position.y +
          Math.sin(state.clock.elapsedTime * 0.5 + idx) * 0.1;
        child.rotation.y = documents[idx].rotation.y +
          state.clock.elapsedTime * 0.1;
      });
    }

    if (gridRef.current) {
      // Pulse grid opacity based on progress
      gridRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshBasicMaterial;
          material.opacity = 0.1 + progress * 0.2;
        }
      });
    }

    if (metricsRef.current) {
      // Animate metric bars growing
      metricsRef.current.children.forEach((child, idx) => {
        const targetScale = metrics[idx].value * progress;
        child.scale.y = THREE.MathUtils.lerp(child.scale.y, targetScale, 0.1);
      });
    }

    if (groupRef.current) {
      // Gentle overall rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Analysis grid background */}
      <group ref={gridRef}>
        {Array.from({ length: 10 }, (_, i) => (
          <group key={`grid-${i}`}>
            {/* Horizontal lines */}
            <mesh position={[0, 0, i - 5]}>
              <boxGeometry args={[10, 0.01, 0.01]} />
              <meshBasicMaterial
                color={fundaidTheme.accents.lavender}
                transparent
                opacity={0.1}
              />
            </mesh>
            {/* Vertical lines */}
            <mesh position={[i - 5, 0, 0]}>
              <boxGeometry args={[0.01, 0.01, 10]} />
              <meshBasicMaterial
                color={fundaidTheme.accents.lavender}
                transparent
                opacity={0.1}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Floating documents */}
      <group ref={documentsRef}>
        {documents.map((doc) => (
          <Float
            key={doc.id}
            speed={1}
            rotationIntensity={0.5}
            floatIntensity={0.5}
          >
            <group
              position={doc.position}
              rotation={doc.rotation}
              scale={doc.scale}
            >
              {/* Document plane */}
              <mesh>
                <planeGeometry args={[0.8, 1.2]} />
                <meshPhongMaterial
                  color={fundaidTheme.backgrounds.panel}
                  emissive={fundaidTheme.accents.lavender}
                  emissiveIntensity={0.1}
                  transparent
                  opacity={0.9}
                  side={THREE.DoubleSide}
                />
              </mesh>

              {/* Document lines (content representation) */}
              {Array.from({ length: 5 }, (_, i) => (
                <mesh key={i} position={[0, 0.4 - i * 0.2, 0.01]}>
                  <planeGeometry args={[0.6 - i * 0.1, 0.05]} />
                  <meshBasicMaterial
                    color={fundaidTheme.accents.lavender}
                    transparent
                    opacity={0.3}
                  />
                </mesh>
              ))}
            </group>
          </Float>
        ))}
      </group>

      {/* 3D Metric bars */}
      <group ref={metricsRef} position={[0, -2, 0]}>
        {metrics.map((metric, idx) => (
          <mesh
            key={metric.label}
            position={[(idx - 2) * 0.8, 0, 0]}
          >
            <boxGeometry args={[0.5, 2, 0.5]} />
            <meshPhongMaterial
              color={metric.color}
              emissive={metric.color}
              emissiveIntensity={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Central analysis sphere */}
      <Float speed={2} rotationIntensity={1}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial
            color={fundaidTheme.accents.lavender}
            emissive={fundaidTheme.accents.lavender}
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.8}
            distort={0.2}
            speed={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>

      {/* Ambient particles */}
      <Instances limit={100}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial
          color={fundaidTheme.accents.lavender}
          transparent
          opacity={0.5}
        />
        {Array.from({ length: 50 }, (_, i) => (
          <Instance
            key={i}
            position={[
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6
            ]}
            scale={Math.random() * 0.5 + 0.5}
          />
        ))}
      </Instances>
    </group>
  );
}

/**
 * Canvas wrapper for DISCOVER visualization
 */
export function DiscoverVisualization({ progress = 0 }: { progress?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color={fundaidTheme.accents.teal} />

      {/* Scene */}
      <DiscoverScene progress={progress} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#ffffff', 5, 15]} />
    </Canvas>
  );
}

/**
 * Canvas wrapper for ANALYZE visualization
 */
export function AnalyzeVisualization({ progress = 0 }: { progress?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color={fundaidTheme.accents.lavender} />

      {/* Scene */}
      <AnalyzeScene progress={progress} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#ffffff', 5, 15]} />
    </Canvas>
  );
}

export default { DiscoverVisualization, AnalyzeVisualization };