/**
 * FeedbackVisualization - Optimization feedback loops
 * Shows iterative improvement cycles and feedback pathways
 */

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface FeedbackVisualizationProps {
  intensity: number;
  isActive: boolean;
}

export function FeedbackVisualization({ intensity, isActive }: FeedbackVisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const loopsRef = useRef<THREE.Group>(null);
  const metricsRef = useRef<THREE.Group>(null);

  // Feedback loop structure
  const loops = useMemo(() => {
    return [
      {
        radius: 2,
        segments: 64,
        color: '#E4584A', // coral - main loop
        speed: 0.5,
        phase: 0
      },
      {
        radius: 1.5,
        segments: 48,
        color: '#2FB49E', // teal - inner loop
        speed: -0.7,
        phase: Math.PI / 3
      },
      {
        radius: 2.5,
        segments: 72,
        color: '#A98CEB', // purple - outer loop
        speed: 0.3,
        phase: Math.PI * 2 / 3
      }
    ];
  }, []);

  // Optimization metrics
  const metrics = useMemo(() => {
    return [
      { label: 'Technical', value: 0.85, position: [3, 1, 0], color: '#2FB49E' },
      { label: 'Business', value: 0.72, position: [3, 0, 0], color: '#A98CEB' },
      { label: 'Academic', value: 0.78, position: [3, -1, 0], color: '#E4584A' }
    ];
  }, []);

  // Animation
  useFrame((state) => {
    if (!groupRef.current || !loopsRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle scene rotation
    groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.3;
    groupRef.current.rotation.x = Math.cos(time * 0.15) * 0.1;

    // Animate feedback loops
    loopsRef.current.children.forEach((loop, i) => {
      const loopData = loops[i];
      loop.rotation.z = time * loopData.speed + loopData.phase;

      // Pulse effect
      const pulseScale = 1 + Math.sin(time * 2 + i) * 0.05 * intensity;
      loop.scale.setScalar(pulseScale);
    });

    // Animate metrics
    if (metricsRef.current) {
      metricsRef.current.children.forEach((metricGroup, i) => {
        const metric = metrics[i];
        const barMesh = metricGroup.children.find(child => child.userData.isBar);

        if (barMesh && barMesh instanceof THREE.Mesh) {
          // Animate bar height
          const targetHeight = metric.value * 2;
          const currentHeight = targetHeight * (0.8 + Math.sin(time * 2 + i) * 0.2 * intensity);
          barMesh.scale.y = currentHeight;
          barMesh.position.y = currentHeight / 2;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Feedback loops */}
      <group ref={loopsRef}>
        {loops.map((loop, i) => (
          <group key={i}>
            {/* Main loop ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[loop.radius, 0.02, 8, loop.segments]} />
              <meshStandardMaterial
                color={loop.color}
                emissive={loop.color}
                emissiveIntensity={0.3 * intensity}
                metalness={0.5}
                roughness={0.3}
              />
            </mesh>

            {/* Flow indicators on loop */}
            <FlowIndicators
              radius={loop.radius}
              count={8}
              color={loop.color}
              speed={loop.speed}
              intensity={intensity}
            />
          </group>
        ))}
      </group>

      {/* Central optimization core */}
      <mesh>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#E4584A"
          emissive="#E4584A"
          emissiveIntensity={0.4 * intensity}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Score metrics display */}
      <group ref={metricsRef} position={[-1, 0, 0]}>
        {metrics.map((metric, i) => (
          <group key={i} position={metric.position}>
            {/* Bar background */}
            <mesh position={[0, 1, -0.1]}>
              <planeGeometry args={[0.3, 2]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.1} />
            </mesh>

            {/* Animated bar */}
            <mesh userData={{ isBar: true }} position={[0, 0, 0]}>
              <boxGeometry args={[0.3, 1, 0.1]} />
              <meshStandardMaterial
                color={metric.color}
                emissive={metric.color}
                emissiveIntensity={0.2 * intensity}
                metalness={0.3}
                roughness={0.5}
              />
            </mesh>

            {/* Label */}
            <Text
              position={[0, -0.3, 0]}
              fontSize={0.15}
              color={metric.color}
              anchorX="center"
              anchorY="middle"
              material-transparent
              material-opacity={0.7}
            >
              {metric.label}
            </Text>

            {/* Value */}
            <Text
              position={[0, 2.3, 0]}
              fontSize={0.2}
              color={metric.color}
              anchorX="center"
              anchorY="middle"
              material-transparent
              material-opacity={0.9}
            >
              {Math.round(metric.value * 100)}%
            </Text>
          </group>
        ))}
      </group>

      {/* Improvement indicators */}
      {isActive && <ImprovementParticles intensity={intensity} />}

      {/* Process labels */}
      <group>
        <FloatingProcessLabel
          text="Assess"
          position={[0, 2.8, 0]}
          color="#E4584A"
          intensity={intensity}
        />
        <FloatingProcessLabel
          text="Optimize"
          position={[-2.8, 0, 0]}
          color="#2FB49E"
          intensity={intensity}
        />
        <FloatingProcessLabel
          text="Validate"
          position={[0, -2.8, 0]}
          color="#A98CEB"
          intensity={intensity}
        />
        <FloatingProcessLabel
          text="Iterate"
          position={[2.8, 0, 0]}
          color="#E4584A"
          intensity={intensity}
        />
      </group>
    </group>
  );
}

// Flow indicators on feedback loops
function FlowIndicators({ radius, count, color, speed, intensity }: any) {
  const indicatorsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!indicatorsRef.current) return;

    const time = state.clock.elapsedTime;

    indicatorsRef.current.children.forEach((indicator, i) => {
      const angle = (i / count) * Math.PI * 2 + time * speed;
      indicator.position.x = Math.cos(angle) * radius;
      indicator.position.y = Math.sin(angle) * radius;

      // Pulse opacity
      if (indicator.children[0] && indicator.children[0] instanceof THREE.Mesh) {
        const mat = indicator.children[0].material as THREE.MeshStandardMaterial;
        mat.opacity = 0.3 + Math.sin(time * 3 + i) * 0.3 * intensity;
      }
    });
  });

  return (
    <group ref={indicatorsRef}>
      {Array.from({ length: count }).map((_, i) => (
        <group key={i}>
          <mesh>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5 * intensity}
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Improvement particles
function ImprovementParticles({ intensity }: any) {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random position in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 1 + Math.random() * 2;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color based on improvement (green = positive, red = negative)
      const improvement = Math.random();
      if (improvement > 0.5) {
        colors[i * 3] = 0.18;     // Green
        colors[i * 3 + 1] = 0.71;
        colors[i * 3 + 2] = 0.62;
      } else {
        colors[i * 3] = 0.89;     // Red
        colors[i * 3 + 1] = 0.35;
        colors[i * 3 + 2] = 0.29;
      }
    }

    return { positions, colors, count };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.elapsedTime;
    particlesRef.current.rotation.y = time * 0.1;
    particlesRef.current.rotation.x = time * 0.05;

    // Pulse size
    const mat = particlesRef.current.material as THREE.PointsMaterial;
    mat.size = 0.03 * (1 + Math.sin(time * 2) * 0.2 * intensity);
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
        opacity={0.6 * intensity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating process label
function FloatingProcessLabel({ text, position, color, intensity }: any) {
  const textRef = useRef<any>(null);

  useFrame((state) => {
    if (!textRef.current) return;

    const time = state.clock.elapsedTime;
    const floatAmount = 0.05;
    textRef.current.position.y = position[1] + Math.sin(time * 2 + position[0]) * floatAmount;
    textRef.current.material.opacity = 0.4 + intensity * 0.3;
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.25}
      color={color}
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={0.6}
    >
      {text}
    </Text>
  );
}