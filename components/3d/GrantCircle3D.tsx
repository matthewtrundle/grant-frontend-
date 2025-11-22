/**
 * GrantCircle3D - Circular timeline of grant opportunities
 *
 * Features:
 * - Circular RingGeometry for timeline base
 * - Grant opportunity spheres positioned via polar coordinates
 * - Scroll-driven rotation
 * - HTML overlay cards on hover
 */

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface GrantOpportunity {
  id: number;
  title: string;
  amount: string;
  deadline: string;
  matchScore: number;
  angle: number;
}

export function GrantCircle3D() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const grants = useMemo<GrantOpportunity[]>(() => {
    const opportunities = [
      { title: 'SBIR Phase I', amount: '$50K', deadline: 'Q2 2025', matchScore: 0.92 },
      { title: 'NSF STTR', amount: '$225K', deadline: 'Q3 2025', matchScore: 0.88 },
      { title: 'DOE Innovation', amount: '$150K', deadline: 'Q1 2025', matchScore: 0.85 },
      { title: 'NIH R01', amount: '$500K', deadline: 'Q4 2025', matchScore: 0.78 },
      { title: 'DARPA Young Faculty', amount: '$500K', deadline: 'Q2 2025', matchScore: 0.72 },
      { title: 'NASA SBIR', amount: '$125K', deadline: 'Q3 2025', matchScore: 0.68 },
    ];

    return opportunities.map((grant, i) => ({
      id: i,
      ...grant,
      angle: (i / opportunities.length) * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Gentle continuous rotation
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Timeline ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.8, 4, 64]} />
        <meshBasicMaterial
          color="#6B6B7C"
          opacity={0.3}
          transparent
        />
      </mesh>

      {/* Grant opportunity nodes */}
      {grants.map((grant) => {
        const radius = 4;
        const x = Math.cos(grant.angle) * radius;
        const y = Math.sin(grant.angle) * radius;

        // Color based on match score - using FundAid colors
        const color = grant.matchScore > 0.8
          ? '#2FB49E'  // High match - teal
          : grant.matchScore > 0.7
          ? '#A98CEB'  // Medium match - lavender
          : '#E4584A'; // Lower match - coral

        return (
          <group key={grant.id} position={[x, y, 0]}>
            {/* Grant node sphere */}
            <mesh>
              <sphereGeometry args={[0.15 + grant.matchScore * 0.1, 32, 32]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.85}
              />
            </mesh>

            {/* Connection line to ring */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    x * 0.95, y * 0.95, 0,
                    x, y, 0,
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={color} opacity={0.3} transparent />
            </line>

            {/* HTML overlay card */}
            <Html
              position={[0, 0, 0]}
              center
              distanceFactor={10}
              style={{
                transition: 'all 0.2s',
                opacity: 0.9,
                pointerEvents: 'none',
              }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 min-w-[180px]">
                <div className="text-sm font-bold mb-1" style={{ color: '#0A1628' }}>
                  {grant.title}
                </div>
                <div className="text-xs text-slate-600 mb-2">
                  {grant.amount} · {grant.deadline}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${grant.matchScore * 100}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium" style={{ color }}>
                    {Math.round(grant.matchScore * 100)}%
                  </span>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
