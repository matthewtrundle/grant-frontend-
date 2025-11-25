/**
 * NetworkVisualization - Multi-agent network visualization
 * Shows connected nodes representing AI agents working together
 */

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NetworkVisualizationProps {
  intensity: number;
  isActive: boolean;
}

export function NetworkVisualization({ intensity, isActive }: NetworkVisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const connectionsRef = useRef<THREE.Group>(null);

  // Generate network structure
  const network = useMemo(() => {
    const nodeCount = 12; // 12 agents
    const nodes: THREE.Vector3[] = [];
    const connections: [number, number][] = [];

    // Create nodes in a structured network layout
    // Central coordinator
    nodes.push(new THREE.Vector3(0, 0, 0));

    // Inner ring (Stage coordinators)
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      nodes.push(
        new THREE.Vector3(
          Math.cos(angle) * 2,
          Math.sin(angle) * 2,
          Math.sin(angle * 2) * 0.5
        )
      );
      // Connect to center
      connections.push([0, i + 1]);
    }

    // Outer ring (Specialist agents)
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2 + Math.PI / 7;
      nodes.push(
        new THREE.Vector3(
          Math.cos(angle) * 4,
          Math.sin(angle) * 4,
          Math.cos(angle * 3) * 0.8
        )
      );
      // Connect to nearest stage coordinator
      const stageIndex = Math.floor((i / 7) * 4) + 1;
      connections.push([stageIndex, i + 5]);
    }

    // Add some cross-connections for complexity
    connections.push([2, 4]);
    connections.push([3, 1]);
    connections.push([6, 9]);
    connections.push([8, 11]);

    return { nodes, connections };
  }, []);

  // Animation
  useFrame((state) => {
    if (!groupRef.current || !nodesRef.current) return;

    // Gentle rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.1;

    // Animate nodes
    const time = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < network.nodes.length; i++) {
      const node = network.nodes[i];

      // Add subtle floating motion
      dummy.position.set(
        node.x,
        node.y + Math.sin(time * 0.5 + i) * 0.1,
        node.z
      );

      // Pulse scale based on activity
      const pulseScale = 1 + Math.sin(time * 2 + i * 0.5) * 0.1 * intensity;
      dummy.scale.setScalar(pulseScale);

      dummy.updateMatrix();
      nodesRef.current.setMatrixAt(i, dummy.matrix);
    }

    nodesRef.current.instanceMatrix.needsUpdate = true;

    // Animate connection opacity
    if (connectionsRef.current) {
      connectionsRef.current.children.forEach((line, i) => {
        if (line instanceof THREE.Line) {
          const mat = line.material as THREE.LineBasicMaterial;
          mat.opacity = 0.2 + Math.sin(time * 1.5 + i) * 0.1 * intensity;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, network.nodes.length]}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#2FB49E"
          emissive="#2FB49E"
          emissiveIntensity={0.3 * intensity}
          metalness={0.3}
          roughness={0.5}
        />
      </instancedMesh>

      {/* Connections */}
      <group ref={connectionsRef}>
        {network.connections.map(([from, to], i) => {
          const points = [
            network.nodes[from],
            network.nodes[to]
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <line key={i} geometry={geometry}>
              <lineBasicMaterial
                color="#2FB49E"
                transparent
                opacity={0.3}
                linewidth={1}
              />
            </line>
          );
        })}
      </group>

      {/* Data flow particles */}
      {isActive && (
        <DataFlowParticles connections={network.connections} nodes={network.nodes} intensity={intensity} />
      )}
    </group>
  );
}

// Data flow particles component
function DataFlowParticles({ connections, nodes, intensity }: any) {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = connections.length * 2;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const connectionIndex = Math.floor(i / 2);
      const [from] = connections[connectionIndex];
      const node = nodes[from];

      positions[i * 3] = node.x;
      positions[i * 3 + 1] = node.y;
      positions[i * 3 + 2] = node.z;

      // Random velocities for particle movement
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    return { positions, velocities, count };
  }, [connections, nodes]);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < particles.count; i++) {
      const connectionIndex = Math.floor(i / 2);
      const [from, to] = connections[connectionIndex];
      const progress = ((time * 0.3 + i * 0.1) % 1);

      // Interpolate position along connection
      const fromNode = nodes[from];
      const toNode = nodes[to];

      positions.array[i * 3] = fromNode.x + (toNode.x - fromNode.x) * progress;
      positions.array[i * 3 + 1] = fromNode.y + (toNode.y - fromNode.y) * progress;
      positions.array[i * 3 + 2] = fromNode.z + (toNode.z - fromNode.z) * progress;
    }

    positions.needsUpdate = true;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#2FB49E"
        transparent
        opacity={0.6 * intensity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}