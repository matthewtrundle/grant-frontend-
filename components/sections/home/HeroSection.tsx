'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import * as THREE from 'three';

// Dynamic imports for client-side only libraries
let Canvas: any;
let useFrame: any;
let gsap: any;

if (typeof window !== 'undefined') {
  const fiber = require('@react-three/fiber');
  Canvas = fiber.Canvas;
  useFrame = fiber.useFrame;
  gsap = require('gsap').default;
}

// ============================================
// CONNECTING PARTICLES - Bridge to Timeline
// ============================================

interface ConnectingParticlesProps {
  scrollProgress: number;
}

function ConnectingParticles({ scrollProgress }: ConnectingParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const particleCount = 30;

  useEffect(() => {
    if (!meshRef.current) return;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const dummy = new THREE.Object3D();

    // Create particle grid that will connect
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Teal color
      colors[i * 3] = 0.1;
      colors[i * 3 + 1] = 0.55;
      colors[i * 3 + 2] = 0.47;
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Create connecting lines
    const linePositions: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dist = Math.sqrt(
          Math.pow(positions[i * 3] - positions[j * 3], 2) +
          Math.pow(positions[i * 3 + 1] - positions[j * 3 + 1], 2) +
          Math.pow(positions[i * 3 + 2] - positions[j * 3 + 2], 2)
        );

        // Only connect nearby particles
        if (dist < 5) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    if (linesRef.current) {
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      linesRef.current.geometry = lineGeometry;
    }
  }, []);

  useFrame(() => {
    if (!meshRef.current || !linesRef.current) return;

    // Fade in/out based on scroll
    meshRef.current.visible = scrollProgress < 0.3;
    linesRef.current.visible = scrollProgress < 0.3;

    const opacity = Math.max(0, 1 - scrollProgress * 3);
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    (linesRef.current.material as THREE.LineBasicMaterial).opacity = opacity * 0.3;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#1A8B76" transparent />
      </instancedMesh>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#1A8B76" transparent />
      </lineSegments>
    </>
  );
}

// ============================================
// HERO SECTION COMPONENT
// ============================================

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Fade in animation
    gsap.fromTo(
      heroRef.current.querySelector('.hero-content'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.3 }
    );

    gsap.fromTo(
      heroRef.current.querySelector('.hero-nav'),
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#0F0F1E] overflow-hidden"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Fund Aid Minimalist Variation 1.png"
          alt="FundAid Hero - Stop Writing Grants. Start Winning Them."
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Minimalist Navigation */}
      <nav className="hero-nav absolute top-0 left-0 right-0 z-50 px-12 py-8">
        <div className="flex items-center justify-between">
          {/* Logo - Transparent PNG */}
          <div className="relative h-12 w-48">
            <Image
              src="/FUND AID Text Transparent PNG.png"
              alt="FUNDAID"
              fill
              className="object-contain object-left"
              priority
            />
          </div>

          {/* Menu Items */}
          <div className="flex gap-8 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <a href="#process" className="text-white/70 hover:text-white transition-colors tracking-wider">
              PROCESS
            </a>
            <a href="#about" className="text-white/70 hover:text-white transition-colors tracking-wider">
              ABOUT
            </a>
            <a href="#contact" className="text-white/70 hover:text-white transition-colors tracking-wider">
              CONTACT
            </a>
          </div>
        </div>
      </nav>

      {/* 3D Particle Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <ConnectingParticles scrollProgress={0} />
        </Canvas>
      </div>

      {/* Hero Content - CTA Button Only (image has title/tagline) */}
      <div className="hero-content absolute inset-0 flex flex-col items-center justify-end pb-32 px-8">
        {/* CTA Button */}
        <button className="px-8 py-4 bg-[#1A8B76] hover:bg-[#1A8B76]/80 text-white font-semibold tracking-wider transition-all duration-300 hover:scale-105"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          GET STARTED
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="text-white/50 text-xs tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          SCROLL
        </div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
