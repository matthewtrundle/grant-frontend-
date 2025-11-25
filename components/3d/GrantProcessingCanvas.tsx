/**
 * GrantProcessingCanvas - Enhanced R3F canvas with AI processing visualization
 * Combines grant circle with processing gears, data flows, and evaluation animations
 */

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GrantCircle3D } from '@/components/3d/GrantCircle3D';
import { AgenticRingScene } from '@/components/3d/AgenticRingScene';
import { useState, useEffect } from 'react';

export default function GrantProcessingCanvas() {
  const [processingIntensity, setProcessingIntensity] = useState(0.5);
  const [currentStep, setCurrentStep] = useState<'discovery' | 'analysis' | 'evaluation' | 'ranking'>('discovery');

  // Cycle through processing steps
  useEffect(() => {
    const steps: Array<'discovery' | 'analysis' | 'evaluation' | 'ranking'> =
      ['discovery', 'analysis', 'evaluation', 'ranking'];
    let stepIndex = 0;

    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setCurrentStep(steps[stepIndex]);

      // Vary processing intensity based on step
      setProcessingIntensity(0.4 + Math.random() * 0.4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.2}
      />

      {/* Lighting setup for processing elements */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      <directionalLight position={[-5, -5, -5]} intensity={0.2} />

      {/* Agentic Ring Scene - prominent colored ring with agents */}
      <group position={[0, 0, 0]} scale={1.2}>
        <AgenticRingScene
          isActive={true}
          progress={processingIntensity}
        />
      </group>
    </Canvas>
  );
}