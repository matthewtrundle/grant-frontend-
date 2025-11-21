/**
 * DNAHelix3D - Interactive 3D DNA helix with scroll animation
 *
 * Features:
 * - Double helix geometry using TubeGeometry
 * - Scroll-driven rotation, morphing, and pulsing
 * - Teal/green DNA science aesthetic
 * - Camera path animation along spline
 */

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

interface DNAHelixProps {
  radius?: number;
  height?: number;
  rotations?: number;
  segments?: number;
  tubeRadius?: number;
  color1?: string;
  color2?: string;
}

/**
 * Create a helical curve for DNA strand
 */
class HelixCurve extends THREE.Curve<THREE.Vector3> {
  radius: number;
  height: number;
  rotations: number;
  phase: number;

  constructor(radius: number, height: number, rotations: number, phase: number = 0) {
    super();
    this.radius = radius;
    this.height = height;
    this.rotations = rotations;
    this.phase = phase;
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const angle = t * Math.PI * 2 * this.rotations + this.phase;
    const x = Math.cos(angle) * this.radius;
    const y = (t - 0.5) * this.height;
    const z = Math.sin(angle) * this.radius;

    return optionalTarget.set(x, y, z);
  }
}

export function DNAHelix3D({
  radius = 1.2,
  height = 12,
  rotations = 6,
  segments = 200,
  tubeRadius = 0.06, // Thinner for elegance
  color1 = '#8EE4D8', // Softer teal
  color2 = '#A8E6CF', // Softer green
}: DNAHelixProps) {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Create the two helical curves (double helix)
  const { curve1, curve2, connectorPositions } = useMemo(() => {
    const c1 = new HelixCurve(radius, height, rotations, 0);
    const c2 = new HelixCurve(radius, height, rotations, Math.PI);

    // Calculate connector positions (base pairs) - fewer for cleaner look
    const connectors: Array<[THREE.Vector3, THREE.Vector3]> = [];
    const connectorCount = 20;

    for (let i = 0; i < connectorCount; i++) {
      const t = i / (connectorCount - 1);
      const p1 = c1.getPoint(t);
      const p2 = c2.getPoint(t);
      connectors.push([p1, p2]);
    }

    return {
      curve1: c1,
      curve2: c2,
      connectorPositions: connectors,
    };
  }, [radius, height, rotations]);

  // Elegant, subtle animation
  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.getElapsedTime();
    const scrollOffset = scroll.offset;

    // Slow, gentle oscillation
    group.current.rotation.y = Math.sin(t * 0.15) * 0.4 + scrollOffset * Math.PI * 0.5;
    group.current.rotation.x = 0.2;

    // Subtle vertical drift
    group.current.position.y = Math.sin(t * 0.1) * 0.3 + scrollOffset * 2;

    // Very gentle breathing effect
    const breathe = 1 + Math.sin(t * 0.3) * 0.05;
    group.current.scale.setScalar(breathe);
  });

  return (
    <group ref={group} position={[0, 0.5, -3]}>
      {/* First helix strand - Soft Teal */}
      <mesh>
        <tubeGeometry args={[curve1, segments, tubeRadius, 12, false]} />
        <meshStandardMaterial
          color={color1}
          emissive={color1}
          emissiveIntensity={0.15}
          opacity={0.35}
          transparent
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>

      {/* Second helix strand - Soft Green */}
      <mesh>
        <tubeGeometry args={[curve2, segments, tubeRadius, 12, false]} />
        <meshStandardMaterial
          color={color2}
          emissive={color2}
          emissiveIntensity={0.15}
          opacity={0.35}
          transparent
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>

      {/* Base pair connectors - softer and fewer */}
      {connectorPositions.map(([start, end], index) => {
        if (index % 2 !== 0) return null; // Only every other connector for cleaner look

        const midpoint = new THREE.Vector3().lerpVectors(start, end, 0.5);
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();

        // Create quaternion for rotation
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.clone().normalize()
        );

        return (
          <mesh key={index} position={midpoint} quaternion={quaternion}>
            <cylinderGeometry args={[tubeRadius * 0.4, tubeRadius * 0.4, length, 6]} />
            <meshStandardMaterial
              color={index % 4 === 0 ? color1 : color2}
              emissive={index % 4 === 0 ? color1 : color2}
              emissiveIntensity={0.1}
              metalness={0.1}
              roughness={0.4}
              opacity={0.25}
              transparent
            />
          </mesh>
        );
      })}

      {/* Spherical nodes at key positions - minimal */}
      {connectorPositions.map(([start, end], index) => {
        if (index % 5 !== 0) return null; // Only every 5th for minimal accent

        return (
          <group key={`nodes-${index}`}>
            <mesh position={start}>
              <sphereGeometry args={[tubeRadius * 1.2, 12, 12]} />
              <meshStandardMaterial
                color={color1}
                emissive={color1}
                emissiveIntensity={0.2}
                metalness={0.2}
                roughness={0.3}
                opacity={0.3}
                transparent
              />
            </mesh>
            <mesh position={end}>
              <sphereGeometry args={[tubeRadius * 1.2, 12, 12]} />
              <meshStandardMaterial
                color={color2}
                emissive={color2}
                emissiveIntensity={0.2}
                metalness={0.2}
                roughness={0.3}
                opacity={0.3}
                transparent
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
