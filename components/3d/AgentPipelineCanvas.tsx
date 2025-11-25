/**
 * AgentPipelineCanvas - R3F visualization of the agent processing pipeline
 *
 * Features:
 * - 6 agent nodes in a flow layout
 * - Data streams flowing between nodes
 * - Active agent highlighting
 * - Scroll-linked activation
 * - Particle effects for data processing
 *
 * Follows digilab.co aesthetic:
 * - Scientific/research tone
 * - Approved color palette
 * - Smooth animations
 * - Minimal, elegant design
 */

'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Agent {
  id: string;
  number: number;
  title: string;
  color: string;
  position: { x: number; y: number; z: number };
}

interface AgentPipelineCanvasProps {
  agents: Agent[];
  activeAgent: number;
  scrollProgress: number;
}

// Agent Node Component
function AgentNode({
  agent,
  index,
  isActive,
  scrollProgress
}: {
  agent: Agent;
  index: number;
  isActive: boolean;
  scrollProgress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);

  // Animate based on activation
  useFrame((state) => {
    if (!meshRef.current || !ringRef.current) return;

    // Pulse when active
    if (isActive) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
      ringRef.current.rotation.z += 0.02;
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      ringRef.current.rotation.z += 0.005;
    }

    // Glow intensity
    if (glowRef.current) {
      glowRef.current.intensity = isActive ? 2 : 0.5;
    }
  });

  const nodeColor = useMemo(() => new THREE.Color(agent.color), [agent.color]);

  return (
    <group position={[agent.position.x, agent.position.y, agent.position.z]}>
      {/* Glow light */}
      <pointLight
        ref={glowRef}
        color={nodeColor}
        intensity={0.5}
        distance={3}
      />

      {/* Outer ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.6, 0.05, 16, 32]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={isActive ? 0.5 : 0.2}
          transparent
          opacity={isActive ? 1 : 0.5}
        />
      </mesh>

      {/* Core sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhysicalMaterial
          color={isActive ? nodeColor : '#ffffff'}
          emissive={nodeColor}
          emissiveIntensity={isActive ? 0.3 : 0.1}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0}
          transparent
          opacity={isActive ? 1 : 0.7}
        />
      </mesh>

      {/* Agent number */}
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.3}
        floatingRange={[-0.1, 0.1]}
      >
        <mesh position={[0, 0, 0.5]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={isActive ? 1 : 0.5}
          />
        </mesh>
      </Float>

      {/* Activation indicator */}
      {isActive && (
        <mesh scale={[1.5, 1.5, 1.5]}>
          <ringGeometry args={[0.7, 0.75, 32]} />
          <meshBasicMaterial
            color={nodeColor}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

// Data Flow Connection
function DataConnection({
  start,
  end,
  isActive,
  color,
  delay = 0
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  isActive: boolean;
  color: string;
  delay?: number;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const curve = useMemo(() => {
    const mid = new THREE.Vector3(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2 + 0.5,
      (start.z + end.z) / 2
    );
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    const points = curve.getPoints(50);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [curve]);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(30); // 10 particles * 3 coords

    for (let i = 0; i < 10; i++) {
      const t = i / 10;
      const point = curve.getPoint(t);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [curve]);

  useFrame((state) => {
    if (!particlesRef.current || !isActive) return;

    const time = state.clock.elapsedTime + delay;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < 10; i++) {
      const t = ((time * 0.2 + i / 10) % 1);
      const point = curve.getPoint(t);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      {/* Connection line */}
      <line ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={isActive ? 0.3 : 0.1}
          linewidth={2}
        />
      </line>

      {/* Data particles */}
      {isActive && (
        <points ref={particlesRef} geometry={particleGeometry}>
          <pointsMaterial
            color={color}
            size={0.1}
            transparent
            opacity={0.8}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </>
  );
}

// Background particles
function BackgroundParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(300); // 100 particles * 3 coords

    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={particlesRef} geometry={particleGeometry}>
      <pointsMaterial
        color="#ffffff"
        size={0.02}
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
}

// Main Scene Component
function Scene({ agents, activeAgent, scrollProgress }: AgentPipelineCanvasProps) {
  const { camera } = useThree();

  // Update camera position based on active agent
  useEffect(() => {
    const targetAgent = agents[activeAgent];
    if (targetAgent) {
      camera.position.lerp(
        new THREE.Vector3(
          targetAgent.position.x + 3,
          targetAgent.position.y + 2,
          8
        ),
        0.1
      );
      camera.lookAt(
        targetAgent.position.x,
        targetAgent.position.y,
        targetAgent.position.z
      );
    }
  }, [activeAgent, agents, camera]);

  // Create connections between sequential agents
  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < agents.length - 1; i++) {
      conns.push({
        start: new THREE.Vector3(
          agents[i].position.x,
          agents[i].position.y,
          agents[i].position.z
        ),
        end: new THREE.Vector3(
          agents[i + 1].position.x,
          agents[i + 1].position.y,
          agents[i + 1].position.z
        ),
        color: agents[i].color,
        index: i
      });
    }
    return conns;
  }, [agents]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {/* Background */}
      <BackgroundParticles />

      {/* Agent Nodes */}
      {agents.map((agent, index) => (
        <AgentNode
          key={agent.id}
          agent={agent}
          index={index}
          isActive={index === activeAgent}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* Data Connections */}
      {connections.map((conn, index) => (
        <DataConnection
          key={`conn-${index}`}
          start={conn.start}
          end={conn.end}
          isActive={index <= activeAgent}
          color={conn.color}
          delay={index * 0.2}
        />
      ))}

      {/* Orbit Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Main Canvas Component
export default function AgentPipelineCanvas({
  agents,
  activeAgent,
  scrollProgress
}: AgentPipelineCanvasProps) {
  return (
    <Canvas
      camera={{
        position: [5, 3, 8],
        fov: 45,
        near: 0.1,
        far: 100
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      }}
      style={{ background: 'transparent' }}
    >
      <Scene
        agents={agents}
        activeAgent={activeAgent}
        scrollProgress={scrollProgress}
      />
    </Canvas>
  );
}