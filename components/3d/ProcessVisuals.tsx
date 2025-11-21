/**
 * ProcessVisuals - 3D visualizations for each process stage
 *
 * Stage 1: Clustering dots (tech categorization)
 * Stage 2: Grant grid (opportunity visualization)
 * Stage 3: Budget bars (financial breakdown)
 * Stage 4: Multi-agent system (AI writers)
 */

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getStageColor } from '@/lib/digilab-theme';

// Stage 1: Clustering Dots - Tech Categorization
export function Stage1Clustering() {
  const groupRef = useRef<THREE.Group>(null);

  const dots = useMemo(() => {
    const categories = [
      { center: new THREE.Vector3(-2, 1, 0), count: 15, color: '#0EA5E9' },
      { center: new THREE.Vector3(2, 1, 0), count: 12, color: '#10B981' },
      { center: new THREE.Vector3(0, -1, 0), count: 10, color: '#8B5CF6' },
    ];

    return categories.flatMap((cat) =>
      Array.from({ length: cat.count }, () => ({
        position: new THREE.Vector3(
          cat.center.x + (Math.random() - 0.5) * 2,
          cat.center.y + (Math.random() - 0.5) * 2,
          cat.center.z + (Math.random() - 0.5) * 1
        ),
        color: cat.color,
        phase: Math.random() * Math.PI * 2,
      }))
    );
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {dots.map((dot, i) => (
        <mesh key={i} position={dot.position}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={dot.color}
            emissive={dot.color}
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Stage 2: Grant Grid - Opportunity Visualization
export function Stage2GrantGrid() {
  const groupRef = useRef<THREE.Group>(null);

  const grants = useMemo(() => {
    const grid = [];
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        grid.push({
          position: new THREE.Vector3(x * 1.2, y * 1.2, 0),
          matchScore: Math.random(),
        });
      }
    }
    return grid;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {grants.map((grant, i) => (
        <mesh key={i} position={grant.position}>
          <boxGeometry args={[0.8, 0.8, 0.1]} />
          <meshStandardMaterial
            color={grant.matchScore > 0.7 ? '#10B981' : grant.matchScore > 0.4 ? '#F59E0B' : '#64748B'}
            emissive={grant.matchScore > 0.7 ? '#10B981' : '#64748B'}
            emissiveIntensity={grant.matchScore * 0.3}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Stage 3: Budget Bars - Financial Breakdown
export function Stage3BudgetBars() {
  const groupRef = useRef<THREE.Group>(null);

  const bars = useMemo(() => [
    { height: 2.5, color: '#8B5CF6', label: 'Personnel', x: -2 },
    { height: 1.8, color: '#0EA5E9', label: 'Equipment', x: -0.6 },
    { height: 1.2, color: '#10B981', label: 'Materials', x: 0.8 },
    { height: 0.9, color: '#F59E0B', label: 'Travel', x: 2 },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const bar = child as THREE.Mesh;
      const targetScale = 1 + Math.sin(t * 0.5 + i * 0.3) * 0.1;
      bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, targetScale, 0.1);
    });
  });

  return (
    <group ref={groupRef}>
      {bars.map((bar, i) => (
        <mesh key={i} position={[bar.x, bar.height / 2, 0]}>
          <boxGeometry args={[0.6, bar.height, 0.6]} />
          <meshStandardMaterial
            color={bar.color}
            emissive={bar.color}
            emissiveIntensity={0.2}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Stage 4: Multi-Agent System - AI Writers
export function Stage4MultiAgent() {
  const groupRef = useRef<THREE.Group>(null);

  const agents = useMemo(() => [
    { position: new THREE.Vector3(0, 2, 0), color: '#F59E0B', label: 'Writer' },
    { position: new THREE.Vector3(-1.5, -1, 0), color: '#0EA5E9', label: 'Technical' },
    { position: new THREE.Vector3(1.5, -1, 0), color: '#10B981', label: 'Business' },
    { position: new THREE.Vector3(0, -1, -1.5), color: '#8B5CF6', label: 'Academic' },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Central writer node */}
      {agents.map((agent, i) => (
        <group key={i}>
          <mesh position={agent.position}>
            <sphereGeometry args={[i === 0 ? 0.4 : 0.25, 32, 32]} />
            <meshStandardMaterial
              color={agent.color}
              emissive={agent.color}
              emissiveIntensity={0.4}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>

          {/* Connection lines to writer */}
          {i > 0 && (
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    agents[0].position.x, agents[0].position.y, agents[0].position.z,
                    agent.position.x, agent.position.y, agent.position.z,
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={agent.color} opacity={0.3} transparent />
            </line>
          )}
        </group>
      ))}
    </group>
  );
}
