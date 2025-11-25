"use client";

import { useRef, useMemo, useState, useEffect, forwardRef, useImperativeHandle, createRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Industrial Piston with maximum parametric details
function IndustrialPiston({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const pistonRef = useRef<THREE.Group>(null);
  const rodRef = useRef<THREE.Mesh>(null);
  const cylinderRef = useRef<THREE.Mesh>(null);
  const [isAtTop, setIsAtTop] = useState(false);

  useFrame((state) => {
    if (pistonRef.current && rodRef.current && cylinderRef.current) {
      const time = state.clock.elapsedTime * 1.5 + delay;
      const offset = Math.sin(time) * 0.5;

      // Detect top position (when sin(time) > 0.95)
      const atTop = Math.sin(time) > 0.95;
      if (atTop !== isAtTop) {
        setIsAtTop(atTop);
      }

      pistonRef.current.position.y = position[1] + offset;

      const rodScale = 1 + Math.sin(time) * 0.35;
      rodRef.current.scale.y = rodScale;
      cylinderRef.current.position.y = offset * 0.5;
    }
  });

  // Photo-realistic materials with enhanced shine
  const pistonMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.7, 0.75, 0.8),
    metalness: 1.0,
    roughness: 0.08,
    envMapIntensity: 3.0,
  }), []);

  const rodMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.65, 0.7, 0.75),
    metalness: 1.0,
    roughness: 0.04,
    envMapIntensity: 3.2,
  }), []);

  const connectorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.35, 0.38, 0.42),
    emissive: new THREE.Color(0.15, 0.15, 0.18),
    emissiveIntensity: 0.3,
    metalness: 0.97,
    roughness: 0.1,
    envMapIntensity: 2.0,
  }), []);

  const detailMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.3, 0.35, 0.4),
    metalness: 0.95,
    roughness: 0.15,
    envMapIntensity: 1.8,
  }), []);

  return (
    <group ref={pistonRef} position={position}>
      {/* Piston head with octagonal detail */}
      <mesh material={pistonMaterial}>
        <cylinderGeometry args={[0.18, 0.18, 0.35, 8]} />
      </mesh>

      {/* Top cap with bevel */}
      <mesh position={[0, 0.2, 0]} material={pistonMaterial}>
        <cylinderGeometry args={[0.14, 0.18, 0.05, 8]} />
      </mesh>

      {/* Top detail plate */}
      <mesh position={[0, 0.23, 0]} material={detailMaterial}>
        <cylinderGeometry args={[0.12, 0.14, 0.02, 8]} />
      </mesh>

      {/* Detail rings - multiple bands */}
      <mesh position={[0, 0.08, 0]} material={connectorMaterial}>
        <torusGeometry args={[0.19, 0.012, 8, 20]} />
      </mesh>
      <mesh position={[0, 0.0, 0]} material={connectorMaterial}>
        <torusGeometry args={[0.19, 0.015, 8, 20]} />
      </mesh>
      <mesh position={[0, -0.08, 0]} material={connectorMaterial}>
        <torusGeometry args={[0.19, 0.012, 8, 20]} />
      </mesh>

      {/* Mounting bolts around perimeter */}
      {[0, Math.PI / 4, Math.PI / 2, Math.PI * 3/4, Math.PI, Math.PI * 5/4, Math.PI * 3/2, Math.PI * 7/4].map((angle, i) => (
        <mesh
          key={`bolt-${i}`}
          position={[
            Math.cos(angle) * 0.17,
            0.0,
            Math.sin(angle) * 0.17
          ]}
          material={detailMaterial}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
        </mesh>
      ))}

      {/* Hydraulic cylinder with detail */}
      <mesh ref={cylinderRef} position={[0, -0.3, 0]} material={pistonMaterial}>
        <cylinderGeometry args={[0.21, 0.21, 0.45, 16]} />
      </mesh>

      {/* Cylinder mounting flange */}
      <mesh position={[0, -0.53, 0]} material={pistonMaterial}>
        <cylinderGeometry args={[0.24, 0.21, 0.06, 16]} />
      </mesh>

      {/* Cylinder detail grooves */}
      <mesh position={[0, -0.2, 0]} material={detailMaterial}>
        <torusGeometry args={[0.215, 0.008, 8, 24]} />
      </mesh>
      <mesh position={[0, -0.4, 0]} material={detailMaterial}>
        <torusGeometry args={[0.215, 0.008, 8, 24]} />
      </mesh>

      {/* Piston rod with multiple detail grooves */}
      <mesh ref={rodRef} position={[0, -0.75, 0]} material={rodMaterial}>
        <cylinderGeometry args={[0.055, 0.055, 1.3, 20]} />
      </mesh>

      {/* Rod detail grooves - precision machined appearance */}
      {[-0.45, -0.6, -0.75, -0.9, -1.05].map((y, i) => (
        <mesh key={`groove-${i}`} position={[0, y, 0]} material={detailMaterial}>
          <torusGeometry args={[0.058, 0.006, 8, 20]} />
        </mesh>
      ))}

      {/* Rod coupling */}
      <mesh position={[0, -1.2, 0]} material={rodMaterial}>
        <cylinderGeometry args={[0.08, 0.055, 0.1, 12]} />
      </mesh>

      {/* Glowing connector assembly */}
      <mesh position={[0, -1.4, 0]} material={connectorMaterial}>
        <boxGeometry args={[0.26, 0.14, 0.26]} />
      </mesh>

      {/* Connector detail panels */}
      {[
        { pos: [0.13, 0, 0], rot: [0, 0, 0] },
        { pos: [-0.13, 0, 0], rot: [0, 0, 0] },
        { pos: [0, 0, 0.13], rot: [0, Math.PI/2, 0] },
        { pos: [0, 0, -0.13], rot: [0, Math.PI/2, 0] },
      ].map((panel, i) => (
        <mesh
          key={`panel-${i}`}
          position={[panel.pos[0], -1.4 + panel.pos[1], panel.pos[2]]}
          rotation={panel.rot as [number, number, number]}
          material={detailMaterial}
        >
          <boxGeometry args={[0.02, 0.1, 0.2]} />
        </mesh>
      ))}

      {/* Connector bevels */}
      <mesh position={[0, -1.48, 0]} material={connectorMaterial}>
        <boxGeometry args={[0.3, 0.04, 0.3]} />
      </mesh>

      {/* Corner detail blocks */}
      {[
        [0.12, -1.4, 0.12],
        [-0.12, -1.4, 0.12],
        [0.12, -1.4, -0.12],
        [-0.12, -1.4, -0.12],
      ].map((pos, i) => (
        <mesh key={`corner-${i}`} position={pos as [number, number, number]} material={detailMaterial}>
          <boxGeometry args={[0.04, 0.16, 0.04]} />
        </mesh>
      ))}

      {/* Energy ports with detail */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <group key={`port-group-${i}`}>
          <mesh
            position={[
              Math.cos(angle) * 0.15,
              -1.4,
              Math.sin(angle) * 0.15
            ]}
            material={connectorMaterial}
          >
            <cylinderGeometry args={[0.028, 0.028, 0.16, 8]} />
          </mesh>
          {/* Port glow ring */}
          <mesh
            position={[
              Math.cos(angle) * 0.15,
              -1.4,
              Math.sin(angle) * 0.15
            ]}
            material={connectorMaterial}
          >
            <torusGeometry args={[0.03, 0.008, 6, 12]} />
          </mesh>
        </group>
      ))}

      {/* Energy burst at piston top */}
      <PistonBurst
        position={[0, 0.4, 0]}
        active={isAtTop}
      />
    </group>
  );
}

// Piston energy burst particles - fire/gas effect at top of stroke
function PistonBurst({
  position,
  active
}: {
  position: [number, number, number];
  active: boolean;
}) {
  const burstRef = useRef<THREE.Points>(null);
  const particleCount = 30;

  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const lifetimes = [];

    for (let i = 0; i < particleCount; i++) {
      // Start at piston top position
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // Radial burst velocities
      const angle = (i / particleCount) * Math.PI * 2;
      const speed = 0.03 + Math.random() * 0.02;
      velocities.push({
        x: Math.cos(angle) * speed,
        y: 0.05 + Math.random() * 0.03, // Upward bias
        z: Math.sin(angle) * speed
      });

      lifetimes.push(Math.random() * 0.5);
    }

    return { positions, velocities, lifetimes };
  }, []);

  useFrame((state, delta) => {
    if (!burstRef.current || !active) return;

    const positions = burstRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      // Update lifetime
      particleData.lifetimes[i] += delta;

      // Reset particle if lifetime exceeded
      if (particleData.lifetimes[i] > 1.0) {
        particleData.lifetimes[i] = 0;
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;
      } else {
        // Update position based on velocity
        positions[i * 3] += particleData.velocities[i].x;
        positions[i * 3 + 1] += particleData.velocities[i].y;
        positions[i * 3 + 2] += particleData.velocities[i].z;

        // Apply gravity
        particleData.velocities[i].y -= 0.001;
      }
    }

    burstRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const burstMaterial = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color(1.0, 0.6, 0.2), // Orange/fire color
    size: 0.08,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }), []);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3));
    return geom;
  }, [particleData]);

  return (
    <points ref={burstRef} position={position} material={burstMaterial} geometry={geometry} />
  );
}

// Industrial Gear with extreme parametric detail
function IndustrialGear({
  position,
  radius,
  teeth,
  delay = 0,
  thickness = 0.2
}: {
  position: [number, number, number];
  radius: number;
  teeth: number;
  delay?: number;
  thickness?: number;
}) {
  const gearRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gearRef.current) {
      gearRef.current.rotation.z = state.clock.elapsedTime * 0.4 + delay;
    }
  });

  const teethElements = useMemo(() => {
    const elements = [];
    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      elements.push({ x, y, angle, key: i });
    }
    return elements;
  }, [teeth, radius]);

  const gearMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.35, 0.4, 0.45),
    metalness: 1.0,
    roughness: 0.05,
    envMapIntensity: 3.0,
  }), []);

  const toothMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.45, 0.5, 0.55),
    emissive: new THREE.Color(0.1, 0.1, 0.12),
    emissiveIntensity: 0.2,
    metalness: 1.0,
    roughness: 0.04,
    envMapIntensity: 3.2,
  }), []);

  const hubMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.5, 0.52, 0.55),
    emissive: new THREE.Color(0.2, 0.2, 0.22),
    emissiveIntensity: 0.8,
    metalness: 1.0,
    roughness: 0.0,
    transparent: true,
    opacity: 0.95,
  }), []);

  const detailMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.3, 0.35, 0.4),
    metalness: 0.96,
    roughness: 0.12,
    envMapIntensity: 1.8,
  }), []);

  return (
    <group ref={gearRef} position={position} rotation={[0, 0, 0]}>
      {/* Main gear body */}
      <mesh material={gearMaterial}>
        <cylinderGeometry args={[radius * 0.72, radius * 0.72, thickness, 36]} />
      </mesh>

      {/* Side detail rings - multiple layers */}
      <mesh position={[0, 0, thickness / 2]} material={toothMaterial}>
        <torusGeometry args={[radius * 0.65, 0.018, 8, 36]} />
      </mesh>
      <mesh position={[0, 0, thickness / 2]} material={detailMaterial}>
        <torusGeometry args={[radius * 0.55, 0.015, 8, 32]} />
      </mesh>
      <mesh position={[0, 0, -thickness / 2]} material={toothMaterial}>
        <torusGeometry args={[radius * 0.65, 0.018, 8, 36]} />
      </mesh>
      <mesh position={[0, 0, -thickness / 2]} material={detailMaterial}>
        <torusGeometry args={[radius * 0.55, 0.015, 8, 32]} />
      </mesh>

      {/* Radial detail spokes */}
      {Array.from({ length: Math.floor(teeth / 2) }).map((_, i) => {
        const angle = (i / Math.floor(teeth / 2)) * Math.PI * 2;
        return (
          <mesh
            key={`spoke-${i}`}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, angle]}
            material={detailMaterial}
          >
            <boxGeometry args={[0.025, radius * 0.6, thickness * 0.8]} />
          </mesh>
        );
      })}

      {/* Parametric teeth with bevels */}
      {teethElements.map((tooth) => (
        <group key={tooth.key}>
          <mesh
            position={[tooth.x, tooth.y, 0]}
            rotation={[0, 0, tooth.angle]}
            material={toothMaterial}
          >
            <boxGeometry args={[0.19, radius * 0.44, thickness * 1.15]} />
          </mesh>
          {/* Tooth chamfer */}
          <mesh
            position={[tooth.x * 1.01, tooth.y * 1.01, 0]}
            rotation={[0, 0, tooth.angle]}
            material={toothMaterial}
          >
            <boxGeometry args={[0.15, radius * 0.35, thickness * 1.1]} />
          </mesh>
        </group>
      ))}

      {/* Tooth tips bevels with sharp edges */}
      {teethElements.map((tooth) => (
        <mesh
          key={`bevel-${tooth.key}`}
          position={[tooth.x * 1.03, tooth.y * 1.03, 0]}
          rotation={[0, 0, tooth.angle]}
          material={toothMaterial}
        >
          <boxGeometry args={[0.1, radius * 0.12, thickness * 0.95]} />
        </mesh>
      ))}

      {/* Center mounting ring with detail */}
      <mesh material={gearMaterial}>
        <cylinderGeometry args={[radius * 0.38, radius * 0.38, thickness * 1.25, 28]} />
      </mesh>

      {/* Mounting bolt holes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={`bolt-${i}`}
            position={[
              Math.cos(angle) * radius * 0.48,
              Math.sin(angle) * radius * 0.48,
              0
            ]}
            material={detailMaterial}
          >
            <cylinderGeometry args={[0.035, 0.035, thickness * 1.3, 6]} />
          </mesh>
        );
      })}

      {/* Glowing energy core */}
      <mesh material={hubMaterial}>
        <cylinderGeometry args={[radius * 0.26, radius * 0.26, thickness * 1.35, 20]} />
      </mesh>

      {/* Core detail rings */}
      <mesh position={[0, 0, 0]} material={hubMaterial}>
        <torusGeometry args={[radius * 0.29, 0.025, 8, 20]} />
      </mesh>
      <mesh position={[0, 0, 0]} material={hubMaterial}>
        <torusGeometry args={[radius * 0.23, 0.02, 8, 16]} />
      </mesh>

      {/* Energy conduits */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <mesh
          key={`conduit-${i}`}
          position={[
            Math.cos(angle) * radius * 0.3,
            Math.sin(angle) * radius * 0.3,
            0
          ]}
          material={hubMaterial}
        >
          <cylinderGeometry args={[0.015, 0.015, thickness * 1.4, 8]} />
        </mesh>
      ))}
    </group>
  );
}

// Industrial Segmented Ring with extreme detail
function IndustrialRing({
  position,
  radius,
  segments,
  glowIntensity = 0.6
}: {
  position: [number, number, number];
  radius: number;
  segments: number;
  glowIntensity?: number;
}) {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  const ringSegments = useMemo(() => {
    const segs = [];
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      segs.push({ x, z, angle, key: i });
    }
    return segs;
  }, [segments, radius]);

  const segmentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.25, 0.3, 0.35),
    emissive: new THREE.Color(0.08, 0.08, 0.1),
    emissiveIntensity: glowIntensity * 0.3,
    metalness: 1.0,
    roughness: 0.05,
    envMapIntensity: 2.2,
  }), [glowIntensity]);

  const detailMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.2, 0.25, 0.3),
    metalness: 0.95,
    roughness: 0.1,
    envMapIntensity: 1.9,
  }), []);

  return (
    <group ref={ringRef} position={position}>
      {ringSegments.map((seg) => (
        <group key={seg.key}>
          {/* Main segment block */}
          <mesh
            position={[seg.x, 0, seg.z]}
            rotation={[0, seg.angle, 0]}
            material={segmentMaterial}
          >
            <boxGeometry args={[0.3, 0.2, 0.2]} />
          </mesh>

          {/* Top bevel plate */}
          <mesh
            position={[seg.x, 0.11, seg.z]}
            rotation={[0, seg.angle, 0]}
            material={segmentMaterial}
          >
            <boxGeometry args={[0.34, 0.04, 0.24]} />
          </mesh>

          {/* Bottom mounting plate */}
          <mesh
            position={[seg.x, -0.11, seg.z]}
            rotation={[0, seg.angle, 0]}
            material={detailMaterial}
          >
            <boxGeometry args={[0.32, 0.02, 0.22]} />
          </mesh>

          {/* Side detail panels */}
          <mesh
            position={[seg.x, 0, seg.z]}
            rotation={[0, seg.angle, 0]}
            material={detailMaterial}
          >
            <boxGeometry args={[0.26, 0.16, 0.02]} />
          </mesh>

          {/* Mounting bolts */}
          {[
            [-0.12, 0.08, 0],
            [0.12, 0.08, 0],
            [-0.12, -0.08, 0],
            [0.12, -0.08, 0],
          ].map((boltPos, i) => (
            <mesh
              key={`bolt-${i}`}
              position={[seg.x, boltPos[1], seg.z]}
              rotation={[0, seg.angle + Math.PI / 2, 0]}
              material={detailMaterial}
            >
              <cylinderGeometry args={[0.015, 0.015, 0.25, 6]} />
            </mesh>
          ))}

          {/* Energy channels - vertical */}
          <mesh
            position={[seg.x, 0, seg.z]}
            rotation={[0, seg.angle, Math.PI / 2]}
            material={segmentMaterial}
          >
            <cylinderGeometry args={[0.032, 0.032, 0.22, 10]} />
          </mesh>

          {/* Energy channel detail rings */}
          <mesh
            position={[seg.x, 0.06, seg.z]}
            rotation={[Math.PI / 2, 0, seg.angle]}
            material={segmentMaterial}
          >
            <torusGeometry args={[0.034, 0.008, 6, 12]} />
          </mesh>
          <mesh
            position={[seg.x, -0.06, seg.z]}
            rotation={[Math.PI / 2, 0, seg.angle]}
            material={segmentMaterial}
          >
            <torusGeometry args={[0.034, 0.008, 6, 12]} />
          </mesh>

          {/* Corner reinforcement blocks */}
          {[
            [0.14, 0.09, 0.09],
            [-0.14, 0.09, 0.09],
            [0.14, -0.09, 0.09],
            [-0.14, -0.09, 0.09],
          ].map((cornerPos, i) => (
            <mesh
              key={`corner-${i}`}
              position={[
                seg.x + Math.cos(seg.angle) * cornerPos[0],
                cornerPos[1],
                seg.z + Math.sin(seg.angle) * cornerPos[0]
              ]}
              material={detailMaterial}
            >
              <boxGeometry args={[0.03, 0.03, 0.03]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// Volumetric energy core with detail
function VolumetricCore() {
  const coreRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const coreMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.55, 0.58, 0.62),
    emissive: new THREE.Color(0.25, 0.25, 0.28),
    emissiveIntensity: 1.2,
    metalness: 1.0,
    roughness: 0.0,
    transparent: true,
    opacity: 0.9,
  }), []);

  const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.4, 0.42, 0.45),
    emissive: new THREE.Color(0.15, 0.15, 0.18),
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  }), []);

  return (
    <group ref={coreRef} position={[0, 0, 0]}>
      {/* Inner core column */}
      <mesh material={coreMaterial}>
        <cylinderGeometry args={[0.36, 0.36, 6.8, 16]} />
      </mesh>

      {/* Volumetric glow layers */}
      <mesh material={glowMaterial}>
        <cylinderGeometry args={[0.52, 0.52, 7.0, 20]} />
      </mesh>
      <mesh material={glowMaterial}>
        <cylinderGeometry args={[0.72, 0.72, 7.4, 24]} />
      </mesh>

      {/* Energy rings at regular intervals */}
      {[-2.8, -2.0, -1.2, -0.4, 0.4, 1.2, 2.0, 2.8].map((y, i) => (
        <mesh key={`ring-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} material={coreMaterial}>
          <torusGeometry args={[0.42, 0.022, 8, 28]} />
        </mesh>
      ))}

      {/* Detail rings */}
      {[-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4].map((y, i) => (
        <mesh key={`detail-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} material={coreMaterial}>
          <torusGeometry args={[0.38, 0.015, 6, 24]} />
        </mesh>
      ))}
    </group>
  );
}

// Main Industrial Engine Assembly
function IndustrialEngine() {
  const engineRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (engineRef.current) {
      engineRef.current.rotation.y += 0.0008;
    }
  });

  const beamMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.3, 0.35, 0.4),
    emissive: new THREE.Color(0.08, 0.08, 0.1),
    emissiveIntensity: 0.25,
    metalness: 0.98,
    roughness: 0.07,
    envMapIntensity: 2.0,
  }), []);

  const detailMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.25, 0.3, 0.35),
    metalness: 0.96,
    roughness: 0.1,
    envMapIntensity: 1.8,
  }), []);

  return (
    <group ref={engineRef} rotation={[0, 0, Math.PI / 2]} scale={1.5}>
      {/* Base platform rings with extreme detail */}
      <IndustrialRing position={[0, -3.9, 0]} radius={3.1} segments={28} glowIntensity={1.0} />
      <IndustrialRing position={[0, -3.5, 0]} radius={2.7} segments={24} glowIntensity={0.85} />
      <IndustrialRing position={[0, -3.1, 0]} radius={2.3} segments={20} glowIntensity={0.7} />

      {/* Pistons in hexagonal arrangement */}
      <IndustrialPiston position={[1.8, -2.3, 0]} delay={0} />
      <IndustrialPiston position={[-1.8, -2.3, 0]} delay={Math.PI} />
      <IndustrialPiston position={[0.9, -2.3, 1.56]} delay={Math.PI / 3} />
      <IndustrialPiston position={[-0.9, -2.3, 1.56]} delay={Math.PI * 4/3} />
      <IndustrialPiston position={[0.9, -2.3, -1.56]} delay={Math.PI * 5/3} />
      <IndustrialPiston position={[-0.9, -2.3, -1.56]} delay={Math.PI * 2/3} />

      {/* Volumetric core */}
      <VolumetricCore />

      {/* Stacked industrial gears with detail */}
      <IndustrialGear position={[0, -1.9, 0]} radius={0.75} teeth={16} delay={0} thickness={0.24} />
      <IndustrialGear position={[0, -0.5, 0]} radius={0.95} teeth={20} delay={Math.PI} thickness={0.28} />
      <IndustrialGear position={[0, 1.1, 0]} radius={0.85} teeth={18} delay={Math.PI / 2} thickness={0.26} />
      <IndustrialGear position={[0, 2.7, 0]} radius={0.65} teeth={14} delay={Math.PI * 1.5} thickness={0.22} />

      {/* Vertical support beams with extreme detail */}
      {[0, Math.PI / 3, Math.PI * 2/3, Math.PI, Math.PI * 4/3, Math.PI * 5/3].map((angle, i) => (
        <group key={i}>
          {/* Main beam */}
          <mesh
            position={[Math.cos(angle) * 2.6, -0.9, Math.sin(angle) * 2.6]}
            material={beamMaterial}
          >
            <boxGeometry args={[0.16, 5.8, 0.16]} />
          </mesh>

          {/* Beam edge details */}
          {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((y, j) => (
            <mesh
              key={`detail-${j}`}
              position={[Math.cos(angle) * 2.6, y, Math.sin(angle) * 2.6]}
              material={detailMaterial}
            >
              <boxGeometry args={[0.18, 0.08, 0.18]} />
            </mesh>
          ))}

          {/* Rivets along beam */}
          {[-2.8, -2.0, -1.2, -0.4, 0.4, 1.2, 2.0, 2.8].map((y, j) => (
            <mesh
              key={`rivet-${j}`}
              position={[
                Math.cos(angle) * 2.68,
                y,
                Math.sin(angle) * 2.68
              ]}
              material={detailMaterial}
            >
              <cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
            </mesh>
          ))}

          {/* Base connector assembly */}
          <mesh
            position={[Math.cos(angle) * 2.6, -3.3, Math.sin(angle) * 2.6]}
            material={beamMaterial}
          >
            <boxGeometry args={[0.24, 0.18, 0.24]} />
          </mesh>

          {/* Base connector detail */}
          <mesh
            position={[Math.cos(angle) * 2.6, -3.4, Math.sin(angle) * 2.6]}
            material={detailMaterial}
          >
            <boxGeometry args={[0.28, 0.06, 0.28]} />
          </mesh>

          {/* Top connector assembly */}
          <mesh
            position={[Math.cos(angle) * 2.6, 1.9, Math.sin(angle) * 2.6]}
            material={beamMaterial}
          >
            <boxGeometry args={[0.22, 0.16, 0.22]} />
          </mesh>

          {/* Mounting bolts */}
          {[
            [0.09, -3.3, 0.09],
            [-0.09, -3.3, 0.09],
            [0.09, -3.3, -0.09],
            [-0.09, -3.3, -0.09],
          ].map((boltPos, j) => (
            <mesh
              key={`bolt-${j}`}
              position={[
                Math.cos(angle) * 2.6 + boltPos[0],
                boltPos[1],
                Math.sin(angle) * 2.6 + boltPos[2]
              ]}
              material={detailMaterial}
            >
              <cylinderGeometry args={[0.018, 0.018, 0.2, 6]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Cross bracing between beams */}
      {[0, Math.PI * 2/3, Math.PI * 4/3].map((baseAngle, i) => {
        const angle1 = baseAngle;
        const angle2 = baseAngle + Math.PI / 3;
        const x1 = Math.cos(angle1) * 2.6;
        const z1 = Math.sin(angle1) * 2.6;
        const x2 = Math.cos(angle2) * 2.6;
        const z2 = Math.sin(angle2) * 2.6;
        const midX = (x1 + x2) / 2;
        const midZ = (z1 + z2) / 2;
        const length = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
        const rotY = Math.atan2(z2 - z1, x2 - x1);

        return (
          <mesh
            key={`brace-${i}`}
            position={[midX, -2.5, midZ]}
            rotation={[0, rotY, Math.PI / 2]}
            material={detailMaterial}
          >
            <cylinderGeometry args={[0.04, 0.04, length, 8]} />
          </mesh>
        );
      })}
    </group>
  );
}

// Geometric energy particles - cubes instead of points
function IndustrialParticles({ mousePosition }: { mousePosition: THREE.Vector3 }) {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const count = 150;

  const [positions, velocities, rotations, colors] = useMemo(() => {
    const pos = [];
    const vel = [];
    const rot = [];
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Emit from specific reactor positions (core, piston ring, top)
      const emissionPoint = i % 3;
      let x, y, z;

      if (emissionPoint === 0) {
        // Emit from core
        x = -3 + (Math.random() - 0.5) * 0.5;
        y = (Math.random() - 0.5) * 3;
        z = (Math.random() - 0.5) * 0.5;
      } else if (emissionPoint === 1) {
        // Emit from piston ring
        const angle = Math.random() * Math.PI * 2;
        x = -3 + Math.cos(angle) * 2;
        y = -2 + Math.random() * 0.5;
        z = Math.sin(angle) * 2;
      } else {
        // Emit from top
        x = -3 + (Math.random() - 0.5) * 1;
        y = 2 + Math.random() * 0.5;
        z = (Math.random() - 0.5) * 1;
      }

      pos.push({ x, y, z });

      // Horizontal velocity - moving right (toward cards) - increased speed
      vel.push({
        x: 0.02 + Math.random() * 0.015, // Faster rightward flow
        y: (Math.random() - 0.5) * 0.003, // Slight vertical drift
        z: (Math.random() - 0.5) * 0.002  // Minimal depth variation
      });

      rot.push({
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02
      });

      // Initial color (will be updated in useFrame)
      col[i * 3] = 0.5;
      col[i * 3 + 1] = 0.55;
      col[i * 3 + 2] = 0.6;
    }

    return [pos, vel, rot, col];
  }, []);

  const cubeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    emissive: new THREE.Color(0.12, 0.12, 0.15),
    emissiveIntensity: 0.5,
    metalness: 1.0,
    roughness: 0.08,
    envMapIntensity: 2.0,
    transparent: true,
    opacity: 0.9,
    vertexColors: true,
  }), []);

  useFrame(() => {
    if (!particlesRef.current) return;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      // Calculate heat based on speed and proximity to reactor
      const speed = Math.sqrt(
        velocities[i].x ** 2 +
        velocities[i].y ** 2 +
        velocities[i].z ** 2
      );

      const distanceFromReactor = Math.sqrt(
        positions[i].x ** 2 +
        positions[i].y ** 2 +
        positions[i].z ** 2
      );

      // Heat formula: higher near reactor, increases with speed
      const heat = Math.min(1.0, (1.0 / (distanceFromReactor + 1)) + speed * 10);

      // Color gradient: cool (blue) -> warm (orange) -> hot (red)
      if (heat < 0.3) {
        // Cool - blue tones
        colors[i * 3] = 0.3 + heat;     // R
        colors[i * 3 + 1] = 0.4 + heat; // G
        colors[i * 3 + 2] = 0.7 + heat; // B
      } else if (heat < 0.6) {
        // Warm - orange tones
        const t = (heat - 0.3) / 0.3;
        colors[i * 3] = 0.6 + t * 0.4;     // R
        colors[i * 3 + 1] = 0.4 + t * 0.2; // G
        colors[i * 3 + 2] = 0.3 - t * 0.3; // B
      } else {
        // Hot - red tones
        const t = (heat - 0.6) / 0.4;
        colors[i * 3] = 1.0;               // R
        colors[i * 3 + 1] = 0.3 - t * 0.3; // G
        colors[i * 3 + 2] = 0.1 - t * 0.1; // B
      }

      // Add mouse attraction force
      const dx = mousePosition.x - positions[i].x;
      const dy = mousePosition.y - positions[i].y;
      const dz = mousePosition.z - positions[i].z;
      const distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);

      // Subtle attraction force (magnetism strength: 0.003)
      const attractionStrength = 0.003;
      const attractionFalloff = Math.max(0, 1 - distToMouse / 15);

      if (distToMouse > 0.1) {
        positions[i].x += (dx / distToMouse) * attractionStrength * attractionFalloff;
        positions[i].y += (dy / distToMouse) * attractionStrength * attractionFalloff;
        positions[i].z += (dz / distToMouse) * attractionStrength * attractionFalloff;
      }

      // Add targeting behavior toward grant cards
      const targetX = 6; // Right side of screen (grant cards)
      const targetY = positions[i].y; // Maintain vertical spread
      const targetZ = 0; // Center depth

      const toTarget = {
        x: targetX - positions[i].x,
        y: targetY - positions[i].y,
        z: targetZ - positions[i].z
      };

      const distToTarget = Math.sqrt(
        toTarget.x ** 2 + toTarget.y ** 2 + toTarget.z ** 2
      );

      // Gentle guidance toward target (cards)
      if (distToTarget > 0.1) {
        positions[i].x += (toTarget.x / distToTarget) * 0.001;
        positions[i].y += (toTarget.y / distToTarget) * 0.0005;
        positions[i].z += (toTarget.z / distToTarget) * 0.0005;
      }

      // Normal velocity movement
      positions[i].x += velocities[i].x;
      positions[i].y += velocities[i].y;
      positions[i].z += velocities[i].z;

      // Wrap particles from right back to left (horizontal flow)
      if (positions[i].x > 6) {
        // Reset with proper emission point distribution
        const emissionPoint = i % 3;
        if (emissionPoint === 0) {
          positions[i].x = -3 + (Math.random() - 0.5) * 0.5;
          positions[i].y = (Math.random() - 0.5) * 3;
          positions[i].z = (Math.random() - 0.5) * 0.5;
        } else if (emissionPoint === 1) {
          const angle = Math.random() * Math.PI * 2;
          positions[i].x = -3 + Math.cos(angle) * 2;
          positions[i].y = -2 + Math.random() * 0.5;
          positions[i].z = Math.sin(angle) * 2;
        } else {
          positions[i].x = -3 + (Math.random() - 0.5) * 1;
          positions[i].y = 2 + Math.random() * 0.5;
          positions[i].z = (Math.random() - 0.5) * 1;
        }
      }

      // Keep particles within vertical bounds
      if (Math.abs(positions[i].y) > 4) {
        positions[i].y *= 0.95;
      }

      // Keep particles within depth bounds
      if (Math.abs(positions[i].z) > 4) {
        positions[i].z *= 0.95;
      }

      rotations[i].x += rotations[i].vx;
      rotations[i].y += rotations[i].vy;
      rotations[i].z += rotations[i].vz;

      dummy.position.set(positions[i].x, positions[i].y, positions[i].z);
      dummy.rotation.set(rotations[i].x, rotations[i].y, rotations[i].z);

      const scale = 0.04 + Math.random() * 0.03;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      particlesRef.current.setMatrixAt(i, dummy.matrix);

      // Update instance color
      if (particlesRef.current.instanceColor) {
        particlesRef.current.instanceColor.setXYZ(
          i,
          colors[i * 3],
          colors[i * 3 + 1],
          colors[i * 3 + 2]
        );
      }
    }

    particlesRef.current.instanceMatrix.needsUpdate = true;
    if (particlesRef.current.instanceColor) {
      particlesRef.current.instanceColor.needsUpdate = true;
    }
  });

  // Initialize instance colors on mount
  useEffect(() => {
    if (particlesRef.current) {
      const colorArray = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        colorArray[i] = colors[i];
      }
      particlesRef.current.instanceColor = new THREE.InstancedBufferAttribute(colorArray, 3);
      particlesRef.current.instanceColor.needsUpdate = true;
    }
  }, [count, colors]);

  return (
    <instancedMesh ref={particlesRef} args={[undefined, cubeMaterial, count]}>
      <boxGeometry args={[1, 1, 1]} />
    </instancedMesh>
  );
}

// Robotic Sentinel Agent - Matrix-inspired squid robot with random 2D movement
const RoboticSentinel = forwardRef<THREE.Group, { orbitRadius: number; speed: number; offset: number }>(
  ({ orbitRadius, speed, offset }, ref) => {
  const sentinelRef = useRef<THREE.Group>(null);
  const tentaclesRef = useRef<THREE.Group[]>([]);

  // Expose the internal ref via forwarded ref
  useImperativeHandle(ref, () => sentinelRef.current!);

  // Random 2D movement state
  const positionRef = useRef({
    x: (Math.random() - 0.5) * 5, // Random starting X position
    z: (Math.random() - 0.5) * 5, // Random starting Z position
    y: -1.5, // Fixed Y plane
  });

  const velocityRef = useRef({
    x: (Math.random() - 0.5) * 0.015 * speed, // Random X velocity
    z: (Math.random() - 0.5) * 0.015 * speed, // Random Z velocity
  });

  // Direction change timer
  const directionChangeTimer = useRef(Math.random() * 5); // Random initial timer

  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.25, 0.28, 0.32),
    metalness: 1.0,
    roughness: 0.06,
    envMapIntensity: 3.0,
  }), []);

  const tentacleMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.35, 0.38, 0.42),
    metalness: 0.98,
    roughness: 0.08,
    envMapIntensity: 2.8,
  }), []);

  const eyeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.6, 0.62, 0.65),
    emissive: new THREE.Color(0.3, 0.3, 0.32),
    emissiveIntensity: 1.5,
    metalness: 1.0,
    roughness: 0.0,
  }), []);

  useFrame((state, delta) => {
    if (sentinelRef.current) {
      const time = state.clock.elapsedTime;

      // Update position based on velocity (random 2D movement)
      positionRef.current.x += velocityRef.current.x;
      positionRef.current.z += velocityRef.current.z;

      // Boundary checking - bounce off edges
      const maxDistance = 3.5; // Movement boundary

      if (Math.abs(positionRef.current.x) > maxDistance) {
        velocityRef.current.x *= -1; // Reverse direction
        positionRef.current.x = Math.sign(positionRef.current.x) * maxDistance;
      }

      if (Math.abs(positionRef.current.z) > maxDistance) {
        velocityRef.current.z *= -1; // Reverse direction
        positionRef.current.z = Math.sign(positionRef.current.z) * maxDistance;
      }

      // Random direction changes every few seconds
      directionChangeTimer.current -= delta;
      if (directionChangeTimer.current <= 0) {
        // Change direction randomly
        velocityRef.current.x += (Math.random() - 0.5) * 0.01;
        velocityRef.current.z += (Math.random() - 0.5) * 0.01;

        // Clamp velocity to reasonable range
        const maxSpeed = 0.02;
        const currentSpeed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.z ** 2);
        if (currentSpeed > maxSpeed) {
          velocityRef.current.x = (velocityRef.current.x / currentSpeed) * maxSpeed;
          velocityRef.current.z = (velocityRef.current.z / currentSpeed) * maxSpeed;
        }

        // Reset timer for next direction change (2-5 seconds)
        directionChangeTimer.current = 2 + Math.random() * 3;
      }

      // Apply position to sentinel
      sentinelRef.current.position.x = positionRef.current.x;
      sentinelRef.current.position.z = positionRef.current.z;
      sentinelRef.current.position.y = positionRef.current.y + Math.sin(time * 2) * 0.1; // Gentle bobbing

      // Rotate to face movement direction
      const targetRotation = Math.atan2(velocityRef.current.z, velocityRef.current.x) + Math.PI / 2;
      sentinelRef.current.rotation.y = targetRotation;

      // Animate tentacles
      tentaclesRef.current.forEach((tentacle, i) => {
        if (tentacle) {
          const wave = Math.sin(time * 3 + i * 0.5);
          tentacle.rotation.z = wave * 0.3;
          tentacle.rotation.x = wave * 0.2;
        }
      });
    }
  });

  return (
    <group ref={sentinelRef}>
      {/* Main body - spherical with detail */}
      <mesh material={bodyMaterial}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>

      {/* Body segments */}
      <mesh position={[0, 0.08, 0]} material={bodyMaterial}>
        <sphereGeometry args={[0.09, 12, 12]} />
      </mesh>
      <mesh position={[0, -0.08, 0]} material={bodyMaterial}>
        <sphereGeometry args={[0.09, 12, 12]} />
      </mesh>

      {/* Detail rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={tentacleMaterial}>
        <torusGeometry args={[0.13, 0.008, 8, 16]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={tentacleMaterial}>
        <torusGeometry args={[0.11, 0.006, 8, 16]} />
      </mesh>

      {/* Eyes/sensors */}
      {[0, Math.PI].map((angle, i) => (
        <mesh
          key={`eye-${i}`}
          position={[
            Math.cos(angle) * 0.12,
            0,
            Math.sin(angle) * 0.12
          ]}
          material={eyeMaterial}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
        </mesh>
      ))}

      {/* Mechanical tentacles - 6 arms */}
      <group>
        {[0, Math.PI / 3, Math.PI * 2/3, Math.PI, Math.PI * 4/3, Math.PI * 5/3].map((angle, i) => (
          <group
            key={`tentacle-${i}`}
            ref={(el) => { if (el) tentaclesRef.current[i] = el; }}
            position={[
              Math.cos(angle) * 0.1,
              -0.05,
              Math.sin(angle) * 0.1
            ]}
            rotation={[0, angle, 0]}
          >
            {/* Tentacle segments */}
            {[0, 1, 2].map((seg) => (
              <group key={`seg-${seg}`} position={[0, -seg * 0.08, 0]}>
                <mesh material={tentacleMaterial}>
                  <cylinderGeometry args={[0.012, 0.008, 0.08, 6]} />
                </mesh>

                {/* Joint */}
                <mesh position={[0, -0.04, 0]} material={bodyMaterial}>
                  <sphereGeometry args={[0.015, 8, 8]} />
                </mesh>

                {/* Detail ring */}
                {seg < 2 && (
                  <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]} material={tentacleMaterial}>
                    <torusGeometry args={[0.013, 0.003, 4, 8]} />
                  </mesh>
                )}
              </group>
            ))}

            {/* Claw/gripper at end */}
            <group position={[0, -0.26, 0]}>
              {[0, Math.PI * 2/3, Math.PI * 4/3].map((clawAngle, ci) => (
                <mesh
                  key={`claw-${ci}`}
                  position={[
                    Math.cos(clawAngle) * 0.015,
                    -0.02,
                    Math.sin(clawAngle) * 0.015
                  ]}
                  rotation={[Math.PI / 6, clawAngle, 0]}
                  material={tentacleMaterial}
                >
                  <boxGeometry args={[0.008, 0.03, 0.005]} />
                </mesh>
              ))}
            </group>
          </group>
        ))}
      </group>

      {/* Antenna/sensor array on top */}
      <mesh position={[0, 0.12, 0]} material={tentacleMaterial}>
        <cylinderGeometry args={[0.008, 0.008, 0.06, 6]} />
      </mesh>
      <mesh position={[0, 0.15, 0]} material={eyeMaterial}>
        <sphereGeometry args={[0.012, 8, 8]} />
      </mesh>
    </group>
  );
});

RoboticSentinel.displayName = 'RoboticSentinel';

// Connecting Web Lines between robots and reactor
function ConnectingWebLines({ robotRefs }: { robotRefs: React.RefObject<THREE.Group>[] }) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(0.4, 0.7, 0.9),
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame(() => {
    if (!linesRef.current) return;

    const positions: number[] = [];

    // Get actual robot positions from refs
    const robotPositions: THREE.Vector3[] = [];
    robotRefs.forEach(ref => {
      if (ref.current) {
        robotPositions.push(ref.current.position.clone());
      }
    });

    // Create web connections
    // 1. Connect each robot to 2 nearest robots
    robotPositions.forEach((pos, i) => {
      // Find 2 nearest robots
      const distances = robotPositions
        .map((otherPos, j) => ({ index: j, dist: pos.distanceTo(otherPos) }))
        .filter(d => d.index !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 2);

      distances.forEach(({ index }) => {
        positions.push(pos.x, pos.y, pos.z);
        positions.push(robotPositions[index].x, robotPositions[index].y, robotPositions[index].z);
      });
    });

    // 2. Connect some robots to the reactor core
    [0, 3, 6, 9].forEach(i => {
      if (robotPositions[i]) {
        positions.push(robotPositions[i].x, robotPositions[i].y, robotPositions[i].z);
        positions.push(0, 0, 0); // Reactor center
      }
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    linesRef.current.geometry = geometry;
  });

  return <lineSegments ref={linesRef} material={lineMaterial} />;
}

// 3D Scene with enhanced volumetric lighting
function Scene() {
  const [mousePos3D, setMousePos3D] = useState(new THREE.Vector3(0, 0, 0));
  const mouseRef = useRef(new THREE.Vector2());

  // Create refs for all 12 robots
  const robotRefs = useMemo(() =>
    Array.from({ length: 12 }, () => createRef<THREE.Group>()),
    []
  );

  // Track mouse movement and convert to 3D space
  useFrame((state) => {
    // Get normalized mouse coordinates (-1 to 1)
    const { mouse, camera } = state;
    mouseRef.current.copy(mouse);

    // Project mouse position into 3D space at a fixed distance from camera
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);

    // Calculate direction from camera to mouse point
    const dir = vector.sub(camera.position).normalize();

    // Set distance from camera (adjust this value to control how far into the scene the mouse projects)
    const distance = 10;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));

    setMousePos3D(pos);
  });

  return (
    <>
      <Environment preset="night" />

      <ambientLight intensity={0.1} color="#1a2844" />

      {/* Core volumetric light shafts - neutral white */}
      <pointLight position={[0, 0, 0]} intensity={8} distance={16} decay={1.7} color="#e8edf2" />
      <pointLight position={[0, 4, 0]} intensity={4} distance={12} decay={1.4} color="#dde3e8" />
      <pointLight position={[0, -3.5, 0]} intensity={3} distance={11} decay={1.4} color="#d5dce2" />

      {/* Accent rim lights for specular highlights */}
      <pointLight position={[5, 2.5, 5]} intensity={2.5} distance={14} decay={1.8} color="#c8d0d8" />
      <pointLight position={[-5, 2.5, -5]} intensity={2.5} distance={14} decay={1.8} color="#c8d0d8" />
      <pointLight position={[5, -1.5, -5]} intensity={2} distance={12} decay={1.9} color="#b8c0c8" />
      <pointLight position={[-5, -1.5, 5]} intensity={2} distance={12} decay={1.9} color="#b8c0c8" />

      {/* Additional detail lights for metal reflections */}
      <pointLight position={[3, 0, 0]} intensity={1.2} distance={8} decay={2} color="#d0d5da" />
      <pointLight position={[-3, 0, 0]} intensity={1.2} distance={8} decay={2} color="#d0d5da" />
      <pointLight position={[0, 0, 3]} intensity={1.2} distance={8} decay={2} color="#d0d5da" />
      <pointLight position={[0, 0, -3]} intensity={1.2} distance={8} decay={2} color="#d0d5da" />

      {/* Specular highlights from above */}
      <spotLight
        position={[0, 7, 0]}
        intensity={3}
        angle={0.6}
        penumbra={1}
        decay={1.4}
        color="#e0e5ea"
      />
      <spotLight
        position={[6, 4, 6]}
        intensity={2}
        angle={0.5}
        penumbra={0.9}
        decay={1.8}
        color="#d5dae0"
      />
      <spotLight
        position={[-6, 4, -6]}
        intensity={2}
        angle={0.5}
        penumbra={0.9}
        decay={1.8}
        color="#d5dae0"
      />

      <IndustrialEngine />
      <IndustrialParticles mousePosition={mousePos3D} />
      <ConnectingWebLines robotRefs={robotRefs} />

      {/* Robotic sentinel agents patrolling the base - increased to 12 with random 2D movement */}
      <RoboticSentinel ref={robotRefs[0]} orbitRadius={2.8} speed={0.15} offset={0} />
      <RoboticSentinel ref={robotRefs[1]} orbitRadius={2.6} speed={0.18} offset={Math.PI} />
      <RoboticSentinel ref={robotRefs[2]} orbitRadius={2.9} speed={0.12} offset={Math.PI / 2} />
      <RoboticSentinel ref={robotRefs[3]} orbitRadius={3.2} speed={0.14} offset={Math.PI / 3} />
      <RoboticSentinel ref={robotRefs[4]} orbitRadius={2.5} speed={0.16} offset={Math.PI * 1.5} />
      <RoboticSentinel ref={robotRefs[5]} orbitRadius={3.0} speed={0.13} offset={Math.PI / 4} />
      <RoboticSentinel ref={robotRefs[6]} orbitRadius={2.7} speed={0.17} offset={Math.PI * 1.2} />
      <RoboticSentinel ref={robotRefs[7]} orbitRadius={3.1} speed={0.11} offset={Math.PI / 6} />
      <RoboticSentinel ref={robotRefs[8]} orbitRadius={2.4} speed={0.19} offset={Math.PI * 1.8} />
      <RoboticSentinel ref={robotRefs[9]} orbitRadius={3.3} speed={0.10} offset={Math.PI / 5} />
      <RoboticSentinel ref={robotRefs[10]} orbitRadius={2.8} speed={0.15} offset={Math.PI * 1.3} />
      <RoboticSentinel ref={robotRefs[11]} orbitRadius={3.0} speed={0.14} offset={Math.PI / 7} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        minDistance={8}
        maxDistance={20}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.6}
        autoRotate={false}
      />
    </>
  );
}

const grantCards = [
  {
    name: 'DARPA Young Faculty',
    amount: '$500K',
    quarter: 'Q2 2025',
    percentage: 72,
    color: '#6366f1',
    position: { top: '12%', right: '8%' }
  },
  {
    name: 'NASA SBIR',
    amount: '$125K',
    quarter: 'Q3 2025',
    percentage: 68,
    color: '#ef4444',
    position: { top: '28%', right: '18%' }
  },
  {
    name: 'NIH R01',
    amount: '$500K',
    quarter: 'Q4 2025',
    percentage: 78,
    color: '#8b5cf6',
    position: { top: '18%', right: '32%' }
  },
  {
    name: 'DOE Innovation',
    amount: '$150K',
    quarter: 'Q1 2025',
    percentage: 85,
    color: '#10b981',
    position: { top: '48%', right: '12%' }
  },
  {
    name: 'NSF STTR',
    amount: '$225K',
    quarter: 'Q3 2025',
    percentage: 88,
    color: '#14b8a6',
    position: { top: '65%', right: '25%' }
  },
  {
    name: 'SBIR Phase I',
    amount: '$50K',
    quarter: 'Q2 2025',
    percentage: 92,
    color: '#06b6d4',
    position: { top: '75%', right: '10%' }
  },
];

export default function GrantReactorScene() {
  return (
    <div className="relative w-full h-[700px]">
      {/* Glass platform under the reactor */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[200px] rounded-[999px] bg-white/6 border border-white/12 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.8)] pointer-events-none z-0" />

      <Canvas
        camera={{
          position: [-8, 4, 14],
          fov: 50,
          near: 0.1,
          far: 100
        }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
      >
        <color attach="background" args={['transparent']} />
        <Scene />
      </Canvas>

      <div className="absolute top-6 left-6 flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md px-3 py-2 rounded-lg border border-cyan-500/40 shadow-lg shadow-cyan-500/20">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/80" />
          <span className="text-cyan-300 font-medium">Multi-Agent System Active</span>
        </div>
        <div className="bg-slate-950/90 backdrop-blur-md px-3 py-2 rounded-lg border border-indigo-500/40 shadow-lg shadow-indigo-500/20">
          <span className="text-indigo-300 font-medium">6 grants in pipeline</span>
        </div>
      </div>

      <div className="absolute top-6 right-6">
        <div className="bg-slate-950/90 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700/50 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="text-slate-300 text-sm font-medium">Processing:</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-1.5 bg-cyan-500/20 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-400 animate-pulse shadow-lg shadow-cyan-400/50"
                    style={{
                      width: '100%',
                      animation: `pulse 1.5s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {grantCards.map((grant, index) => (
        <div
          key={grant.name}
          className="absolute bg-slate-950/95 backdrop-blur-md rounded-lg border border-cyan-500/30 p-4 min-w-[200px] shadow-[0_18px_45px_rgba(0,0,0,0.75),0_0_30px_rgba(6,182,212,0.15)] hover:scale-105 hover:border-cyan-400/50 hover:shadow-[0_18px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(6,182,212,0.25)] transition-all duration-300"
          style={{
            ...grant.position,
            animation: `float 3s ease-in-out infinite`,
            animationDelay: `${index * 0.5}s`
          }}
        >
          <div className="space-y-2">
            <h4 className="text-cyan-100 font-semibold text-sm">{grant.name}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white">{grant.amount}</span>
              <span className="text-xs text-slate-400">• {grant.quarter}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Match Score</span>
                <span className="font-semibold" style={{ color: grant.color }}>
                  {grant.percentage}%
                </span>
              </div>
              <div className="w-full bg-slate-900/80 rounded-full h-1.5 overflow-hidden border border-cyan-900/30">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${grant.percentage}%`,
                    background: `linear-gradient(90deg, ${grant.color}, #00e5ff)`,
                    boxShadow: `0 0 12px ${grant.color}60, inset 0 0 8px ${grant.color}40`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
