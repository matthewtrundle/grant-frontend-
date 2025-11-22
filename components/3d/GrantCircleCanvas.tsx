/**
 * GrantCircleCanvas - Client-only R3F canvas wrapper
 * This component is NEVER server-rendered, preventing SSR errors
 */

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GrantCircle3D } from '@/components/3d/GrantCircle3D';

export default function GrantCircleCanvas() {
  return (
    <Canvas
      shadows={false}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Minimal lighting for flat Digilab aesthetic */}
      <ambientLight intensity={0.8} />

      {/* Grant Circle */}
      <GrantCircle3D />
    </Canvas>
  );
}
