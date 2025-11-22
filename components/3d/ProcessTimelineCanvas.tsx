/**
 * ProcessTimelineCanvas - Client-only R3F canvas wrapper
 * This component is NEVER server-rendered, preventing SSR errors
 */

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import {
  Stage1Clustering,
  Stage2GrantGrid,
  Stage3BudgetBars,
  Stage4MultiAgent
} from '@/components/3d/ProcessVisuals';

interface ProcessTimelineCanvasProps {
  activeStep: 1 | 2 | 3 | 4;
}

export default function ProcessTimelineCanvas({ activeStep }: ProcessTimelineCanvasProps) {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <OrbitControls enableZoom={false} enablePan={false} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} />

      {/* Stage-specific visualization */}
      {activeStep === 1 && <Stage1Clustering />}
      {activeStep === 2 && <Stage2GrantGrid />}
      {activeStep === 3 && <Stage3BudgetBars />}
      {activeStep === 4 && <Stage4MultiAgent />}
    </Canvas>
  );
}
