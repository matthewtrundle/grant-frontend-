/**
 * DNAScrollScene - Main 3D scene with ScrollControls
 *
 * Features:
 * - ScrollControls from @react-three/drei
 * - DNA helix with scroll animation
 * - Camera path along spline
 * - Particle field background
 * - Premium lighting setup
 */

'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { DNAHelix3D } from './DNAHelix3D';
import { ParticleField } from './ParticleField';
import { CameraPath } from './CameraPath';

interface DNAScrollSceneProps {
  pages?: number;
  damping?: number;
}

export function DNAScrollScene({ pages = 3, damping = 0.3 }: DNAScrollSceneProps) {
  return (
    <Canvas
      className="fixed inset-0 z-0"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      {/* Camera setup - positioned for better depth perception */}
      <PerspectiveCamera makeDefault position={[6, 3, 8]} fov={45} />

      {/* Softer, more atmospheric lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.4} color="#C5EDE5" />
      <directionalLight position={[-3, -5, -3]} intensity={0.3} color="#D4F1E8" />
      <pointLight position={[0, 4, 2]} intensity={0.3} color="#B8E6D5" />

      {/* Environment for subtle reflections */}
      <Environment preset="city" environmentIntensity={0.3} />

      {/* ScrollControls wrapper */}
      <ScrollControls pages={pages} damping={damping} distance={1}>
        {/* Camera animation */}
        <CameraPath />

        {/* DNA Helix - using refined defaults */}
        <DNAHelix3D />

        {/* Reduced particle layers for atmosphere */}
        <ParticleField count={60} spread={30} size={0.04} color="#C5EDE5" />
        <ParticleField count={40} spread={25} size={0.03} color="#D4F1E8" />
      </ScrollControls>

      {/* Enhanced fog for depth and softness */}
      <fog attach="fog" args={['#F8FAFB', 10, 30]} />
    </Canvas>
  );
}
