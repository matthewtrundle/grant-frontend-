/**
 * ProcessTimelineCanvas - Client-only R3F canvas wrapper
 *
 * Unified particle system approach:
 * - Single UnifiedParticleSystem component morphs between 4 formations
 * - No more separate Stage1/2/3/4 components
 * - Digilab aesthetic: flat materials, subtle motion, max 50 particles
 */

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { UnifiedParticleSystem } from '@/components/3d/UnifiedParticleSystem';

interface ProcessTimelineCanvasProps {
  activeStep: 1 | 2 | 3 | 4;
}

export default function ProcessTimelineCanvas({ activeStep }: ProcessTimelineCanvasProps) {
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
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Minimal lighting for flat Digilab aesthetic */}
      <ambientLight intensity={0.8} />

      {/* Single unified particle system that morphs between formations */}
      <UnifiedParticleSystem activeStep={activeStep} />
    </Canvas>
  );
}
