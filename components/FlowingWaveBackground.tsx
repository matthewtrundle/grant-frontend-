/**
 * FlowingWaveBackground - Enhanced Full-Page Gradient
 *
 * Beautiful flowing gradient background matching the reference design:
 * - Deep blue/purple at top
 * - Coral/pink/orange in middle
 * - Teal/green at bottom
 * - Flowing wave lines throughout
 * - Enhanced particle effects for elegant movement
 * - Spans entire page height from hero to footer
 */

'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Enhanced Color Palette - matches reference image
const GRADIENT_COLORS = {
  // Top - Deep blue/purple
  topDark: '#1a1a3e',
  topMid: '#2d2d5f',
  topLight: '#4a4a7a',

  // Middle - Coral/Pink/Orange
  midCoral: '#ff8e6e',
  midPink: '#ffb4a2',
  midOrange: '#ffa07a',

  // Bottom - Teal/Green
  bottomTeal: '#2d7a7a',
  bottomGreen: '#3d9a8a',
  bottomLight: '#4db8a8'
};

// Convert hex to THREE.Color
const getColor = (hex: string) => new THREE.Color(hex);

// ============================================
// ENHANCED WAVE LAYER COMPONENT
// ============================================

interface WaveLayerProps {
  index: number;
  totalLayers: number;
}

function WaveLayer({ index, totalLayers }: WaveLayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create large wave geometry for full coverage
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(120, 180, 200, 200);
    const positions = geo.attributes.position;

    // Create flowing wave patterns
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      // Multi-layered wave pattern
      const waveX = Math.sin(x * 0.08 + index * 0.7) * 3;
      const waveY = Math.cos(y * 0.04 + index * 0.5) * 2.5;
      const waveZ = (waveX + waveY) * (1.2 + index * 0.4);

      positions.setZ(i, waveZ);
    }

    geo.computeVertexNormals();
    return geo;
  }, [index]);

  // Enhanced shader material with prominent gradient
  const material = useMemo(() => {
    // Gradient progression from top to bottom
    const layerProgress = index / totalLayers;

    let color1, color2;

    if (layerProgress < 0.33) {
      // Top section - blue/purple
      color1 = GRADIENT_COLORS.topDark;
      color2 = GRADIENT_COLORS.topMid;
    } else if (layerProgress < 0.66) {
      // Middle section - coral/pink/orange
      color1 = GRADIENT_COLORS.midCoral;
      color2 = GRADIENT_COLORS.midPink;
    } else {
      // Bottom section - teal/green
      color1 = GRADIENT_COLORS.bottomTeal;
      color2 = GRADIENT_COLORS.bottomGreen;
    }

    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: getColor(color1) },
        uColor2: { value: getColor(color2) },
        uOpacity: { value: 0.85 }, // Higher opacity for more prominent gradient
        uLayerIndex: { value: index },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uLayerIndex;
        varying vec2 vUv;
        varying float vWaveHeight;

        void main() {
          vUv = uv;

          vec3 pos = position;

          // Flowing wave motion - more pronounced
          float waveSpeed = 0.15 + uLayerIndex * 0.03;
          float waveAmplitude = 4.0 + uLayerIndex * 0.8;

          // Vertical flow
          float verticalWave = sin(pos.y * 0.06 + uTime * waveSpeed) * waveAmplitude;

          // Horizontal undulation
          float horizontalWave = cos(pos.x * 0.05 + uTime * waveSpeed * 0.8) * waveAmplitude;

          // Diagonal flow for organic movement
          float diagonalWave = sin((pos.x + pos.y) * 0.03 + uTime * waveSpeed * 0.6) * waveAmplitude * 0.7;

          // Combine waves
          pos.z += verticalWave + horizontalWave + diagonalWave;

          vWaveHeight = pos.z;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uOpacity;
        varying vec2 vUv;
        varying float vWaveHeight;

        void main() {
          // Vertical gradient progression
          float gradientFactor = vUv.y;

          // Flowing color transition
          float colorMix = sin(vUv.x * 2.0 + vUv.y * 1.5 + uTime * 0.1) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, gradientFactor * colorMix);

          // Add subtle shimmer effect
          float shimmer = abs(sin(vWaveHeight * 0.2 + uTime * 0.25)) * 0.15;
          color += vec3(shimmer);

          // Smooth edge fading
          float edgeFade = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
          edgeFade *= smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

          gl_FragColor = vec4(color, uOpacity * edgeFade);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, [index, totalLayers]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const mat = meshRef.current.material as THREE.ShaderMaterial;

    // Update shader uniforms
    mat.uniforms.uTime.value = time;

    // Gentle rotation for added movement
    meshRef.current.rotation.z = Math.sin(time * 0.025 + index * 0.3) * 0.015;

    // Subtle parallax effect
    const parallaxOffset = (index - 4) * 0.4;
    meshRef.current.position.y = Math.sin(time * 0.05) * parallaxOffset * 2;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, 0, -20 - index * 5]}
    />
  );
}

// ============================================
// ENHANCED PARTICLE SYSTEM
// ============================================

function EnhancedParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 300; // More particles for elegant movement

  // Create particle geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Distributed across the scene
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      // Color distribution matching gradient
      const yPos = positions[i * 3 + 1];
      let color;

      if (yPos > 20) {
        // Top - blue/purple tones
        color = getColor(Math.random() > 0.5 ? GRADIENT_COLORS.topMid : GRADIENT_COLORS.topLight);
      } else if (yPos > -20) {
        // Middle - coral/orange tones
        color = getColor(Math.random() > 0.5 ? GRADIENT_COLORS.midCoral : GRADIENT_COLORS.midPink);
      } else {
        // Bottom - teal/green tones
        color = getColor(Math.random() > 0.5 ? GRADIENT_COLORS.bottomTeal : GRADIENT_COLORS.bottomGreen);
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varied sizes
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return geo;
  }, []);

  // Particle material with glow
  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, []);

  // Elegant particle animation
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < particleCount; i++) {
      const x = positions.getX(i);
      let y = positions.getY(i);
      const z = positions.getZ(i);

      // Slow upward drift with variation
      y += 0.08 + Math.sin(time * 0.4 + i) * 0.03;

      // Reset particles that flow off screen
      if (y > 60) {
        y = -60;
      }

      // Gentle sideways drift creating flowing effect
      const newX = x + Math.sin(time * 0.08 + i * 0.15) * 0.02;
      const newZ = z + Math.cos(time * 0.08 + i * 0.15) * 0.02;

      positions.setXYZ(i, newX, y, newZ);
    }

    positions.needsUpdate = true;

    // Gentle pulsing opacity
    (pointsRef.current.material as THREE.PointsMaterial).opacity =
      0.5 + 0.2 * Math.sin(time * 0.5);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

// ============================================
// CSS GRADIENT BACKGROUND (BASE LAYER)
// ============================================
// Provides the main gradient, R3F adds wave lines and particles on top

function CSSGradientBackground() {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        background: `
          linear-gradient(
            180deg,
            ${GRADIENT_COLORS.topDark} 0%,
            ${GRADIENT_COLORS.topMid} 15%,
            ${GRADIENT_COLORS.topLight} 25%,
            ${GRADIENT_COLORS.midCoral} 40%,
            ${GRADIENT_COLORS.midPink} 50%,
            ${GRADIENT_COLORS.midOrange} 60%,
            ${GRADIENT_COLORS.bottomTeal} 75%,
            ${GRADIENT_COLORS.bottomGreen} 85%,
            ${GRADIENT_COLORS.bottomLight} 100%
          )
        `
      }}
    />
  );
}

// ============================================
// MAIN BACKGROUND COMPONENT
// ============================================

export default function FlowingWaveBackground() {
  const totalLayers = 8;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* CSS Gradient Base */}
      <CSSGradientBackground />

      {/* R3F Canvas for wave lines and particles */}
      <Canvas
        camera={{ position: [0, 0, 45], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        {/* Ambient lighting for subtle depth */}
        <ambientLight intensity={0.3} />

        {/* Multiple wave layers for flowing lines */}
        {Array.from({ length: totalLayers }).map((_, i) => (
          <WaveLayer key={i} index={i} totalLayers={totalLayers} />
        ))}

        {/* Enhanced flowing particles */}
        <EnhancedParticles />

        {/* Subtle fog for depth */}
        <fog attach="fog" args={['#000000', 40, 100]} />
      </Canvas>
    </div>
  );
}
