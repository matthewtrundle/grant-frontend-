/**
 * AIVisualizationCanvas - R3F visualizations for AI features
 *
 * Visualizations:
 * - Network: Connected nodes for multi-agent system
 * - Clustering: Data points organizing for grant matching
 * - Assembly: Knowledge fragments coming together for RAG
 * - Feedback: Loops and optimization cycles
 */

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { NetworkVisualization } from './visualizations/NetworkVisualization';
import { ClusteringVisualization } from './visualizations/ClusteringVisualization';
import { AssemblyVisualization } from './visualizations/AssemblyVisualization';
import { FeedbackVisualization } from './visualizations/FeedbackVisualization';

interface AIVisualizationCanvasProps {
  activeFeature: string;
  hoveredFeature: string | null;
}

export default function AIVisualizationCanvas({ activeFeature, hoveredFeature }: AIVisualizationCanvasProps) {
  const [intensity, setIntensity] = useState(0.5);

  // Update intensity on hover
  useEffect(() => {
    if (hoveredFeature) {
      setIntensity(0.8);
    } else {
      setIntensity(0.5);
    }
  }, [hoveredFeature]);

  const getVisualization = () => {
    switch (activeFeature) {
      case 'multi-agent':
        return <NetworkVisualization intensity={intensity} isActive={true} />;
      case 'smart-matching':
        return <ClusteringVisualization intensity={intensity} isActive={true} />;
      case 'rag-writing':
        return <AssemblyVisualization intensity={intensity} isActive={true} />;
      case 'success-optimization':
        return <FeedbackVisualization intensity={intensity} isActive={true} />;
      default:
        return <NetworkVisualization intensity={intensity} isActive={true} />;
    }
  };

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
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.2}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#F5F2ED', 10, 30]} />

      <Suspense fallback={null}>
        {getVisualization()}
      </Suspense>
    </Canvas>
  );
}