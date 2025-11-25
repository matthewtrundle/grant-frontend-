/**
 * ClusteringVisualization - Data clustering for grant matching
 * Shows data points organizing into clusters based on match criteria
 */

'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ClusteringVisualizationProps {
  intensity: number;
  isActive: boolean;
}

export function ClusteringVisualization({ intensity, isActive }: ClusteringVisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.InstancedMesh>(null);
  const [clusterPhase, setClusterPhase] = useState(0);

  // Generate data points and clusters
  const data = useMemo(() => {
    const pointCount = 100;
    const clusterCount = 5;
    const points: {
      position: THREE.Vector3;
      cluster: number;
      size: number;
      color: string;
    }[] = [];

    // Cluster centers (representing different grant categories)
    const clusterCenters = [
      new THREE.Vector3(-2, 2, 0),    // Research grants
      new THREE.Vector3(2, 2, 0),     // Innovation grants
      new THREE.Vector3(0, -2, 0),    // Infrastructure
      new THREE.Vector3(-3, -1, 0),   // Education
      new THREE.Vector3(3, -1, 0),    // Technology
    ];

    const clusterColors = [
      '#2FB49E', // teal
      '#A98CEB', // purple
      '#2FB49E', // teal
      '#E4584A', // coral
      '#A98CEB', // purple
    ];

    // Generate points
    for (let i = 0; i < pointCount; i++) {
      const cluster = Math.floor(Math.random() * clusterCount);

      // Initial random position
      const randomPos = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 2
      );

      points.push({
        position: randomPos,
        cluster,
        size: 0.05 + Math.random() * 0.1,
        color: clusterColors[cluster]
      });
    }

    return { points, clusterCenters, clusterColors };
  }, []);

  // Animation
  useFrame((state) => {
    if (!groupRef.current || !pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();

    // Update cluster phase
    const phase = (Math.sin(time * 0.2) + 1) * 0.5; // 0 to 1

    // Animate points
    for (let i = 0; i < data.points.length; i++) {
      const point = data.points[i];
      const center = data.clusterCenters[point.cluster];

      // Interpolate between random and clustered positions
      const targetX = point.position.x * (1 - phase) + center.x * phase;
      const targetY = point.position.y * (1 - phase) + center.y * phase;
      const targetZ = point.position.z * (1 - phase) + center.z * phase;

      // Add some floating motion
      dummy.position.set(
        targetX + Math.sin(time + i * 0.1) * 0.05,
        targetY + Math.cos(time + i * 0.1) * 0.05,
        targetZ
      );

      // Pulse effect when clustered
      const pulseScale = point.size * (1 + phase * Math.sin(time * 3 + i) * 0.2 * intensity);
      dummy.scale.setScalar(pulseScale);

      dummy.updateMatrix();
      pointsRef.current.setMatrixAt(i, dummy.matrix);

      // Update color based on cluster
      if (pointsRef.current.instanceColor) {
        const color = new THREE.Color(point.color);
        const brightness = 0.5 + phase * 0.5;
        color.multiplyScalar(brightness);
        pointsRef.current.setColorAt(i, color);
      }
    }

    pointsRef.current.instanceMatrix.needsUpdate = true;
    if (pointsRef.current.instanceColor) {
      pointsRef.current.instanceColor.needsUpdate = true;
    }

    // Gentle rotation
    groupRef.current.rotation.y = time * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Data points */}
      <instancedMesh
        ref={pointsRef}
        args={[undefined, undefined, data.points.length]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          vertexColors
          metalness={0.2}
          roughness={0.6}
          emissive="#A98CEB"
          emissiveIntensity={0.1 * intensity}
        />
      </instancedMesh>

      {/* Cluster center indicators */}
      {data.clusterCenters.map((center, i) => (
        <group key={i} position={center}>
          {/* Outer ring */}
          <mesh>
            <ringGeometry args={[0.4, 0.45, 32]} />
            <meshBasicMaterial
              color={data.clusterColors[i]}
              transparent
              opacity={0.3 * intensity}
            />
          </mesh>

          {/* Inner core */}
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={data.clusterColors[i]}
              emissive={data.clusterColors[i]}
              emissiveIntensity={0.5 * intensity}
            />
          </mesh>
        </group>
      ))}

      {/* Connection lines between related clusters */}
      <ClusterConnections centers={data.clusterCenters} intensity={intensity} />

      {/* Match score indicators */}
      {isActive && (
        <MatchScoreParticles centers={data.clusterCenters} intensity={intensity} />
      )}
    </group>
  );
}

// Cluster connections component
function ClusterConnections({ centers, intensity }: any) {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!linesRef.current) return;

    const time = state.clock.elapsedTime;

    linesRef.current.children.forEach((line, i) => {
      if (line instanceof THREE.Line) {
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = 0.1 + Math.sin(time * 2 + i * Math.PI) * 0.05 * intensity;
      }
    });
  });

  const connections = [
    [0, 1], // Research - Innovation
    [1, 4], // Innovation - Technology
    [0, 3], // Research - Education
    [2, 4], // Infrastructure - Technology
  ];

  return (
    <group ref={linesRef}>
      {connections.map(([from, to], i) => {
        const points = [centers[from], centers[to]];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial
              color="#A98CEB"
              transparent
              opacity={0.15}
              linewidth={1}
            />
          </line>
        );
      })}
    </group>
  );
}

// Match score particles
function MatchScoreParticles({ centers, intensity }: any) {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = centers.length * 10;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < centers.length; i++) {
      for (let j = 0; j < 10; j++) {
        const idx = (i * 10 + j) * 3;
        const center = centers[i];

        // Random position around cluster center
        positions[idx] = center.x + (Math.random() - 0.5) * 1;
        positions[idx + 1] = center.y + (Math.random() - 0.5) * 1;
        positions[idx + 2] = center.z + (Math.random() - 0.5) * 0.5;

        // Match score colors (green = high, yellow = medium, red = low)
        const score = Math.random();
        if (score > 0.7) {
          colors[idx] = 0.18;     // Green
          colors[idx + 1] = 0.71;
          colors[idx + 2] = 0.62;
        } else if (score > 0.4) {
          colors[idx] = 0.67;     // Purple
          colors[idx + 1] = 0.55;
          colors[idx + 2] = 0.92;
        } else {
          colors[idx] = 0.89;     // Coral
          colors[idx + 1] = 0.35;
          colors[idx + 2] = 0.29;
        }
      }
    }

    return { positions, colors, count };
  }, [centers]);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < centers.length; i++) {
      for (let j = 0; j < 10; j++) {
        const idx = (i * 10 + j) * 3;
        const center = centers[i];

        // Float upward animation
        positions.array[idx + 1] += 0.01;

        // Reset when too high
        if (positions.array[idx + 1] > center.y + 2) {
          positions.array[idx + 1] = center.y - 1;
        }
      }
    }

    positions.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8 * intensity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}