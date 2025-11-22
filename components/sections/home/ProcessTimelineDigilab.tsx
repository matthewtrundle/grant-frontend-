/**
 * ProcessTimeline - Digilab Style
 *
 * Minimalist pinned scroll timeline with cinematic R3F visualization.
 * 25% timeline / 75% fullscreen canvas.
 * No marketing fluff - pure interaction design.
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import Lenis from 'lenis';
import FundAidTimelineBackground from '@/components/FundAidTimelineBackground';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// CONSTANTS
// ============================================

const PARTICLE_COUNT = 80;

const STAGES = [
  {
    number: 1,
    label: 'Company Profiling',
    description: 'Our AI extracts your technology profile, assesses your team\'s capabilities, and determines your Technology Readiness Level—the foundation for grant matching.',
    features: ['TRL Assessment', 'Technology Mapping', 'Team Analysis']
  },
  {
    number: 2,
    label: 'Grant Discovery',
    description: 'We search across federal, state, and private grant databases to identify opportunities aligned with your profile. Our ranking system prioritizes the best fits.',
    features: ['Multi-Source Search', 'Fit Scoring', 'Deadline Tracking']
  },
  {
    number: 3,
    label: 'Grant Analysis',
    description: 'Our AI agents parse the grant RFP, extract key requirements and evaluation criteria, then map them to your company profile. We retrieve successful grant examples using RAG to understand what assessors look for.',
    features: ['RFP Parsing', 'Requirement Mapping', 'Example Retrieval', 'Budget Planning']
  },
  {
    number: 4,
    label: 'Document Generation',
    description: 'A team of specialized AI writing agents collaborates to craft your application. Each section is written to match successful examples, then assessed by our multi-agent simulation system that mimics real grant reviewers.',
    features: ['Multi-Agent Writing', 'RAG-Enhanced Responses', 'Assessor Simulation', 'Quality Control']
  }
];

const COLORS = {
  teal: new THREE.Color('#1A8B76'),      // Darker, more muted teal
  lavender: new THREE.Color('#6B4DB8'),  // Darker, more muted lavender
  bg: new THREE.Color('#FFFFFF')
};

// ============================================
// R3F PARTICLE SYSTEM
// ============================================

// Smooth easing function for transitions
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Helper to calculate popup visibility based on scroll progress
function getPopupVisibility(scrollProgress: number, startThreshold: number, endThreshold: number): {
  opacity: number;
  translateX: number;
  translateY: number;
} {
  if (scrollProgress < startThreshold) {
    return { opacity: 0, translateX: 0, translateY: 8 };
  }
  if (scrollProgress > endThreshold) {
    return { opacity: 0, translateX: 0, translateY: -8 };
  }

  // Fade in phase
  const fadeInDuration = 0.08; // 8% scroll range for fade in - increased for smoother, more intentional transitions
  if (scrollProgress < startThreshold + fadeInDuration) {
    const t = (scrollProgress - startThreshold) / fadeInDuration;
    return { opacity: t, translateX: 0, translateY: 8 * (1 - t) };
  }

  // Fade out phase
  const fadeOutStart = endThreshold - fadeInDuration;
  if (scrollProgress > fadeOutStart) {
    const t = (scrollProgress - fadeOutStart) / fadeInDuration;
    return { opacity: 1 - t, translateX: 0, translateY: -8 * t };
  }

  // Fully visible
  return { opacity: 1, translateX: 0, translateY: 0 };
}

// Continuous blending weight function with smooth easing
function getStageWeights(progress: number): { stage1: number; stage2: number; stage3: number; stage4: number } {
  const thresholds = [0, 0.20, 0.45, 0.70, 1.0];
  const weights = { stage1: 0, stage2: 0, stage3: 0, stage4: 0 };

  if (progress <= thresholds[1]) {
    // Between stage 1 and 2
    const t = progress / thresholds[1];
    const easedT = easeInOutCubic(t);
    weights.stage1 = 1 - easedT;
    weights.stage2 = easedT;
  } else if (progress <= thresholds[2]) {
    // Between stage 2 and 3
    const t = (progress - thresholds[1]) / (thresholds[2] - thresholds[1]);
    const easedT = easeInOutCubic(t);
    weights.stage2 = 1 - easedT;
    weights.stage3 = easedT;
  } else if (progress <= thresholds[3]) {
    // Between stage 3 and 4
    const t = (progress - thresholds[2]) / (thresholds[3] - thresholds[2]);
    const easedT = easeInOutCubic(t);
    weights.stage3 = 1 - easedT;
    weights.stage4 = easedT;
  } else {
    // Fully stage 4
    weights.stage4 = 1;
  }

  return weights;
}

function ParticleSystem({ stage, scrollProgress }: { stage: number; scrollProgress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleData = useRef<{
    positions: THREE.Vector3[];
    targets: THREE.Vector3[];
    colors: THREE.Color[];
    scales: number[];
    targetScales: number[];
    // Precomputed targets for all 4 stages
    stage1Targets: THREE.Vector3[];
    stage2Targets: THREE.Vector3[];
    stage3Targets: THREE.Vector3[];
    stage4Targets: THREE.Vector3[];
    stage1Scales: number[];
    stage2Scales: number[];
    stage3Scales: number[];
    stage4Scales: number[];
  }>({
    positions: [],
    targets: [],
    colors: [],
    scales: [],
    targetScales: [],
    stage1Targets: [],
    stage2Targets: [],
    stage3Targets: [],
    stage4Targets: [],
    stage1Scales: [],
    stage2Scales: [],
    stage3Scales: [],
    stage4Scales: []
  });

  // Initialize particles (tighter initial spread, centered)
  useState(() => {
    const data = particleData.current;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      data.positions[i] = new THREE.Vector3(
        (Math.random() - 0.5) * 8,   // Reduced from 20 to 8
        (Math.random() - 0.5) * 8,   // Reduced from 16 to 8
        (Math.random() - 0.5) * 4    // Reduced from 10 to 4
      );
      data.targets[i] = data.positions[i].clone();
      data.colors[i] = i % 2 === 0 ? COLORS.teal.clone() : COLORS.lavender.clone();
      data.scales[i] = 1.0;
      data.targetScales[i] = 1.0;
    }
  });

  // Precompute all 4 stage targets (once on mount)
  useState(() => {
    const data = particleData.current;

    // Stage 1: Clustering (tighter, more centered)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const cluster = Math.floor(i / (PARTICLE_COUNT / 4));
      const angle = (cluster / 4) * Math.PI * 2;
      const clusterRadii = [2, 3.5, 4.5, 3];  // Reduced radii
      const radius = clusterRadii[cluster % 4];
      data.stage1Targets[i] = new THREE.Vector3(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 1,  // Reduced randomness
        Math.sin(cluster * 0.5) * 2 + (Math.random() - 0.5) * 1,  // Reduced spread
        Math.sin(angle) * radius * 2 + (Math.random() - 0.5) * 2  // Reduced Z spread
      );
      data.stage1Scales[i] = 1.0;
    }

    // Stage 2: Grid (tighter spacing)
    const gridSize = Math.ceil(Math.sqrt(PARTICLE_COUNT));
    const spacing = 1.3;  // Reduced from 1.8 to 1.3
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      data.stage2Targets[i] = new THREE.Vector3(
        (col - gridSize / 2) * spacing,
        (row - gridSize / 2) * spacing,
        0
      );
      data.stage2Scales[i] = 1.0;
    }

    // Stage 3: Funnel (tighter, more centered)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const y = (i / PARTICLE_COUNT) * 8 - 4;  // Reduced height from 10 to 8
      const radius = 4 - (y + 4) * 0.8;  // Reduced starting radius and taper
      const angle = i * 0.5;
      data.stage3Targets[i] = new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
      data.stage3Scales[i] = i >= PARTICLE_COUNT * 0.7 ? 0 : 1.1;
    }

    // Stage 4: Orbital system with smoother transition from Stage 3 funnel
    // Start with particles closer to funnel's bottom, then expand into orbital rings
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (i < 15) {
        // Core cluster - positioned to continue from funnel's narrow bottom
        const theta = (i / 15) * Math.PI * 2;
        const phi = Math.acos(2 * (i / 15) - 1);
        data.stage4Targets[i] = new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * 1.5,
          Math.cos(phi) * 1.5 - 2, // Offset down to align with funnel bottom
          Math.sin(phi) * Math.sin(theta) * 1.5
        );
        data.stage4Scales[i] = 1.8;
      } else if (i < 40) {
        // Inner ring - gradual expansion from core
        const angle = ((i - 15) / 25) * Math.PI * 2;
        const ringProgress = (i - 15) / 25;
        data.stage4Targets[i] = new THREE.Vector3(
          Math.cos(angle) * (3 + ringProgress * 2), // Gradual radius increase
          Math.sin((i - 15) * 0.4) * 1.0 - 1, // Closer to center vertically
          Math.sin(angle) * (3 + ringProgress * 2)
        );
        data.stage4Scales[i] = 1.2;
      } else if (i < 65) {
        // Outer ring - smooth expansion
        const angle = ((i - 40) / 25) * Math.PI * 2 + Math.PI / 6;
        const ringProgress = (i - 40) / 25;
        data.stage4Targets[i] = new THREE.Vector3(
          Math.cos(angle) * (6 + ringProgress * 2), // Progressive expansion
          Math.cos((i - 40) * 0.3) * 1.5, // Gentle vertical variation
          Math.sin(angle) * (6 + ringProgress * 2)
        );
        data.stage4Scales[i] = 1.0;
      } else {
        // Fade out remaining particles gradually
        const fadeProgress = (i - 65) / (PARTICLE_COUNT - 65);
        data.stage4Targets[i] = new THREE.Vector3(0, -3 * fadeProgress, 0);
        data.stage4Scales[i] = 0;
      }
    }
  });

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const data = particleData.current;
    const dummy = new THREE.Object3D();

    // Get continuous blend weights
    const weights = getStageWeights(scrollProgress);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Compute blended target position
      const blendedTarget = new THREE.Vector3(
        data.stage1Targets[i].x * weights.stage1 +
        data.stage2Targets[i].x * weights.stage2 +
        data.stage3Targets[i].x * weights.stage3 +
        data.stage4Targets[i].x * weights.stage4,
        data.stage1Targets[i].y * weights.stage1 +
        data.stage2Targets[i].y * weights.stage2 +
        data.stage3Targets[i].y * weights.stage3 +
        data.stage4Targets[i].y * weights.stage4,
        data.stage1Targets[i].z * weights.stage1 +
        data.stage2Targets[i].z * weights.stage2 +
        data.stage3Targets[i].z * weights.stage3 +
        data.stage4Targets[i].z * weights.stage4
      );

      // Compute blended target scale
      const blendedScale =
        data.stage1Scales[i] * weights.stage1 +
        data.stage2Scales[i] * weights.stage2 +
        data.stage3Scales[i] * weights.stage3 +
        data.stage4Scales[i] * weights.stage4;

      // Adaptive lerp speed - slower during Stage 3->4 transition for smoother motion
      const isStage3To4Transition = weights.stage3 > 0 && weights.stage4 > 0;
      const lerpSpeed = isStage3To4Transition ? 0.05 : 0.08; // Slower during harsh transition

      // Lerp to blended target
      data.positions[i].lerp(blendedTarget, lerpSpeed);
      data.scales[i] += (blendedScale - data.scales[i]) * lerpSpeed;

      // Idle motion + scroll-based parallax (reduced for tighter control)
      let offset = new THREE.Vector3(0, 0, 0);

      // Scroll-based parallax for all stages (very subtle movement)
      const stageProgress = scrollProgress * 4; // 0-4 range
      const withinStageProgress = (stageProgress % 1); // 0-1 within current stage
      const parallaxDepth = (i % 10) / 10; // Different depths for different particles

      offset.x += Math.sin(withinStageProgress * Math.PI * 2 + i * 0.3) * 0.08 * parallaxDepth;  // Reduced from 0.15
      offset.y += Math.cos(withinStageProgress * Math.PI * 2 + i * 0.5) * 0.05 * parallaxDepth;  // Reduced from 0.1
      offset.z += Math.sin(withinStageProgress * Math.PI + i * 0.2) * 0.04 * parallaxDepth;  // Reduced from 0.08

      // Stage-specific idle motion (very subtle)
      if (stage === 1) {
        offset.x += Math.sin(time * 0.3 + i) * 0.03;  // Reduced from 0.05
        offset.y += Math.sin(time * 0.2 + i * 0.5) * 0.04;  // Reduced from 0.08
      } else if (stage === 4) {
        // Core pulse
        if (i < 15) {
          data.scales[i] = data.targetScales[i] * (1 + Math.sin(time * 1.5) * 0.05);
        }
        // Ring rotations (updated to match tighter radii)
        if (i >= 15 && i < 40) {
          const ringIndex = i - 15;
          const angle = (ringIndex / 25) * Math.PI * 2 + time * 0.2;
          data.positions[i].set(
            Math.cos(angle) * 5,  // Updated from 7 to match stage4Targets
            Math.sin(ringIndex * 0.4) * 1.5,  // Updated from 2
            Math.sin(angle) * 5  // Updated from 7
          );
        }
        if (i >= 40 && i < 65) {
          const ringIndex = i - 40;
          const angle = (ringIndex / 25) * Math.PI * 2 - time * 0.15;
          data.positions[i].set(
            Math.cos(angle) * 8,  // Updated from 12 to match stage4Targets
            Math.cos(ringIndex * 0.3) * 2,  // Updated from 3
            Math.sin(angle) * 8  // Updated from 12
          );
        }
      }

      dummy.position.copy(data.positions[i]).add(offset);
      dummy.scale.setScalar(data.scales[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, data.colors[i]);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }

    // Grid lines for stage 2
    if (linesRef.current) {
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = stage === 2 ? 0.15 : 0;
    }
  });

  // Grid line geometry (sparse for stage 2)
  const lineGeometry = useState(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const gridSize = Math.ceil(Math.sqrt(PARTICLE_COUNT));
    const spacing = 1.8;

    // Sparse connections (15%)
    const seed = 12345;
    const seededRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    let s = seed;
    for (let i = 0; i < gridSize - 1; i++) {
      for (let j = 0; j < gridSize - 1; j++) {
        if (seededRandom(s++) < 0.15) {
          const x1 = (j - gridSize / 2) * spacing;
          const y1 = (i - gridSize / 2) * spacing;
          const x2 = (j + 1 - gridSize / 2) * spacing;
          const y2 = (i - gridSize / 2) * spacing;
          positions.push(x1, y1, 0, x2, y2, 0);
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  })[0];

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial
          vertexColors
          emissive="#00D4AA"
          emissiveIntensity={0.5}
          metalness={0.2}
          roughness={0.3}
        />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color={COLORS.teal} transparent opacity={0} />
      </lineSegments>
    </>
  );
}

function Scene({ stage, scrollProgress }: { stage: number; scrollProgress: number }) {
  return (
    <Canvas
      camera={{
        fov: 45,
        position: [0, 0, 28],
        near: 0.1,
        far: 100
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      }}
    >
      <fog attach="fog" args={[COLORS.bg, 20, 30]} />
      <ambientLight color={COLORS.teal} intensity={0.25} />
      <ParticleSystem stage={stage} scrollProgress={scrollProgress} />

      {/* Post-processing effects for fantastical glow */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
          radius={0.8}
        />
      </EffectComposer>
    </Canvas>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function ProcessTimelineDigilab() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentStage, setCurrentStage] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  // GSAP ScrollTrigger
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === section) t.kill();
    });

    // Pin section
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=4500vh',  // Optimized: sweet spot between too fast (3500vh) and too slow (6000vh)
      pin: true,
      scrub: 4,  // Optimal scrub value for smooth, responsive scrolling
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);
        if (progress < 0.20) setCurrentStage(1);
        else if (progress < 0.45) setCurrentStage(2);
        else if (progress < 0.70) setCurrentStage(3);
        else setCurrentStage(4);
      }
    });

    // Stage number animations
    STAGES.forEach((stage) => {
      const el = section.querySelector(`[data-stage="${stage.number}"]`);
      if (!el) return;

      const isActive = stage.number === currentStage;

      gsap.to(el, {
        opacity: isActive ? 1 : 0.15,
        scale: isActive ? 1 : 0.98,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section) t.kill();
      });
    };
  }, [currentStage]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[4500vh] bg-white"
    >
      {/* Pinned container */}
      <div className="sticky top-0 h-screen w-full">
        <div className="h-full grid grid-cols-[35%_65%]">

          {/* Left: Timeline (35% - expanded for more prominent stage descriptions) */}
          <div className="relative flex flex-col justify-center px-16">
            {/* Scroll progress indicator (ruler) */}
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-[70vh] pointer-events-none"
              viewBox="0 0 8 700"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background track */}
              <line
                x1="4"
                y1="0"
                x2="4"
                y2="700"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />

              {/* Progress indicator */}
              <line
                x1="4"
                y1="0"
                x2="4"
                y2={scrollProgress * 700}
                stroke="rgba(47,180,158,0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  transition: 'y2 0.15s ease-out'
                }}
              />

              {/* Tick marks at stage boundaries (0%, 25%, 50%, 75%, 100%) */}
              {[0, 175, 350, 525, 700].map((y, i) => (
                <g key={i}>
                  <line
                    x1="0"
                    y1={y}
                    x2="8"
                    y2={y}
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="1.5"
                  />
                </g>
              ))}

              {/* Moving indicator dot */}
              <circle
                cx="4"
                cy={scrollProgress * 700}
                r="3"
                fill="#1A8B76"
                opacity={0.8}
                style={{
                  transition: 'cy 0.15s ease-out'
                }}
              />
            </svg>

            <div className="relative w-full h-full flex items-center justify-center">
              {STAGES.map((stage) => (
                <div
                  key={stage.number}
                  data-stage={stage.number}
                  className={`
                    absolute inset-0 flex flex-col justify-center items-center text-center
                    transition-all duration-700
                    ${currentStage === stage.number
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none'
                    }
                  `}
                >
                  {/* Huge number */}
                  <div
                    className={`
                      text-[110px]
                      font-black
                      leading-none
                      mb-4
                      transition-all duration-700
                      ${currentStage === stage.number
                        ? 'text-[#1A8B76]'
                        : 'text-[#1A8B76] opacity-10'
                      }
                    `}
                    style={{
                      filter: currentStage === stage.number
                        ? 'drop-shadow(0 0 30px rgba(26,139,118,0.6))'
                        : 'none'
                    }}
                  >
                    {stage.number}
                  </div>

                  {/* Label */}
                  <div
                    className={`
                      text-[11px]
                      uppercase
                      tracking-[0.35em]
                      font-medium
                      mb-8
                      ${currentStage === stage.number
                        ? 'text-[#4A4A4A]'
                        : 'text-[#4A4A4A]/30'
                      }
                    `}
                  >
                    {stage.label}
                  </div>

                  {/* Description */}
                  <div
                    className={`
                      text-[20px]
                      leading-[1.6]
                      tracking-[-0.01em]
                      max-w-[420px]
                      mb-8
                      transition-opacity duration-700
                      font-light
                      ${currentStage === stage.number
                        ? 'text-[#4A4A4A] opacity-100'
                        : 'text-[#4A4A4A] opacity-0'
                      }
                    `}
                  >
                    {stage.description}
                  </div>

                  {/* Features list */}
                  {stage.features && stage.features.length > 0 && (
                    <div
                      className={`
                        space-y-3
                        transition-opacity duration-700
                        ${currentStage === stage.number
                          ? 'opacity-100'
                          : 'opacity-0'
                        }
                      `}
                    >
                      {stage.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-[16px] text-[#4A4A4A] font-normal tracking-wide"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#1A8B76]/70" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Fullscreen canvas (65%) */}
          <div className="relative h-full w-full">
            <FundAidTimelineBackground stage={currentStage as 1 | 2 | 3 | 4} scrollProgress={scrollProgress} />
            <Scene stage={currentStage} scrollProgress={scrollProgress} />

            {/* Floating annotation boxes with particle links */}

            {/* Stage 1: Company Profiling - Technology Profile annotation */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.02, 0.20);
              return (
                <div
                  className="absolute top-[20%] right-[15%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    {/* Connecting line to particle region */}
                    <svg className="absolute -left-24 top-1/2 -translate-y-1/2 w-20 h-1 pointer-events-none">
                      <line x1="0" y1="0" x2="80" y2="0" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>

                    {/* Text box */}
                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Technology Profile</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">AI analyzes your technical capabilities</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 1: TRL Assessment annotation */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.08, 0.20);
              return (
                <div
                  className="absolute bottom-[25%] left-[20%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    {/* Connecting line */}
                    <svg className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-14 pointer-events-none">
                      <line x1="0" y1="0" x2="0" y2="56" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>

                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">TRL Assessment</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Readiness level: 1-9 scale</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 2: Grant Discovery - Database Search annotation */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.22, 0.45);
              return (
                <div
                  className="absolute top-[30%] left-[15%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    {/* Connecting line */}
                    <svg className="absolute -right-24 top-1/2 -translate-y-1/2 w-20 h-1 pointer-events-none">
                      <line x1="0" y1="0" x2="80" y2="0" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="80" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>

                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Database Search</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Scanning federal & state grants</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 2: Fit Scoring annotation */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.30, 0.45);
              return (
                <div
                  className="absolute bottom-[20%] right-[20%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    {/* Connecting line */}
                    <svg className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-14 pointer-events-none">
                      <line x1="0" y1="0" x2="0" y2="56" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>

                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Fit Scoring</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Ranked by relevance (0-100)</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 3: Grant Analysis - RFP Parsing annotation */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.47, 0.70);
              return (
                <div
                  className="absolute top-[15%] left-[25%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    {/* Connecting line */}
                    <svg className="absolute -right-20 top-1/2 -translate-y-1/2 w-16 h-1 pointer-events-none">
                      <line x1="0" y1="0" x2="64" y2="0" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="64" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>

                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">RFP Parsing</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Extracting requirements & criteria</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 3: Timeline Generation annotation */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.55, 0.70);
              return (
                <div
                  className="absolute bottom-[30%] right-[18%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    {/* Connecting line */}
                    <svg className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-18 pointer-events-none">
                      <line x1="0" y1="0" x2="0" y2="72" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>

                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Timeline</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">14-day submission plan</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 4: Document Generation - Multi-Agent Writing annotation */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.72, 1.0);
              return (
                <div
                  className="absolute top-[25%] left-[18%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    {/* Connecting line */}
                    <svg className="absolute -right-24 top-1/2 -translate-y-1/2 w-20 h-1 pointer-events-none">
                      <line x1="0" y1="0" x2="80" y2="0" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="80" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>

                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Multi-Agent Writing</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Coordinated response generation</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 4: RAG Examples annotation */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.80, 1.0);
              return (
                <div
                  className="absolute top-[55%] right-[15%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    {/* Connecting line */}
                    <svg className="absolute -left-20 top-1/2 -translate-y-1/2 w-16 h-1 pointer-events-none">
                      <line x1="0" y1="0" x2="64" y2="0" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>

                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">RAG Examples</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Learning from 50+ successful grants</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 4: Assessor Simulation annotation */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.88, 1.0);
              return (
                <div
                  className="absolute bottom-[18%] left-[22%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    {/* Connecting line */}
                    <svg className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-14 pointer-events-none">
                      <line x1="0" y1="0" x2="0" y2="56" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>

                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Assessor Simulation</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">3 AI reviewers score responses</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ADDITIONAL INTERCONNECTED POPUP BOXES */}

            {/* Stage 1: Team Composition Analysis */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.12, 0.20);
              return (
                <div
                  className="absolute top-[40%] right-[25%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    <svg className="absolute -left-28 top-1/2 -translate-y-1/2 w-24 h-1 pointer-events-none">
                      <path d="M 0 0 Q 60 -20, 96 0" stroke="rgba(47,180,158,0.3)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>
                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Team Analysis</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Evaluating team credentials & experience</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 1-2 Transition: Profile to Discovery Link */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.16, 0.28);
              return (
                <div
                  className="absolute top-[60%] left-[30%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    <svg className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-18 pointer-events-none">
                      <path d="M 0 0 Q 10 35, 0 72" stroke="rgba(47,180,158,0.25)" strokeWidth="1" fill="none" strokeDasharray="6 6" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                      <circle cx="0" cy="72" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>
                    <div className="bg-[#1A1425]/80 backdrop-blur-sm border border-[#1A8B76]/20 rounded-lg px-4 py-3 min-w-[180px]">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Data Pipeline</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Profile → Search Engine</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 2: Eligibility Filter */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.35, 0.45);
              return (
                <div
                  className="absolute top-[45%] right-[12%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    <svg className="absolute -left-24 top-1/2 -translate-y-1/2 w-20 h-1 pointer-events-none">
                      <line x1="0" y1="0" x2="80" y2="0" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>
                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Eligibility Filter</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Automated compliance checking</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 2-3 Transition: Discovery to Analysis Link */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.40, 0.52);
              return (
                <div
                  className="absolute bottom-[35%] left-[35%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    <svg className="absolute -right-32 top-1/2 -translate-y-1/2 w-28 h-1 pointer-events-none">
                      <path d="M 0 0 Q 70 20, 112 0" stroke="rgba(47,180,158,0.25)" strokeWidth="1" fill="none" strokeDasharray="6 6" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                      <circle cx="112" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>
                    <div className="bg-[#1A1425]/80 backdrop-blur-sm border border-[#1A8B76]/20 rounded-lg px-4 py-3 min-w-[180px]">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Ranked Results</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Top matches → Deep analysis</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 3: Budget Calculator */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.60, 0.70);
              return (
                <div
                  className="absolute top-[35%] right-[22%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    <svg className="absolute -left-20 top-1/2 -translate-y-1/2 w-16 h-1 pointer-events-none">
                      <line x1="0" y1="0" x2="64" y2="0" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>
                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Budget Validation</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Compliance & allowable costs</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 3-4 Transition: Analysis to Generation Link */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.65, 0.77);
              return (
                <div
                  className="absolute bottom-[45%] right-[28%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    <svg className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-1 h-22 pointer-events-none">
                      <path d="M 0 0 Q -15 44, 0 88" stroke="rgba(47,180,158,0.25)" strokeWidth="1" fill="none" strokeDasharray="6 6" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                      <circle cx="0" cy="88" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>
                    <div className="bg-[#1A1425]/80 backdrop-blur-sm border border-[#1A8B76]/20 rounded-lg px-4 py-3 min-w-[180px]">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Context Transfer</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Analysis → Writing Engine</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 4: Memory Context */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.85, 1.0);
              return (
                <div
                  className="absolute bottom-[35%] right-[8%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    <svg className="absolute -left-24 top-1/2 -translate-y-1/2 w-20 h-1 pointer-events-none">
                      <line x1="0" y1="0" x2="80" y2="0" stroke="rgba(47,180,158,0.3)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="0" cy="0" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>
                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Mem0 Context</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Cross-stage memory persistence</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Stage 4: Quality Iteration Loop */}
            {(() => {
              const vis = getPopupVisibility(scrollProgress, 0.92, 1.0);
              return (
                <div
                  className="absolute top-[40%] left-[12%] transition-all duration-500"
                  style={{
                    opacity: vis.opacity,
                    transform: `translateY(${vis.translateY}px)`,
                  }}
                >
                  <div className="relative">
                    <svg className="absolute -right-32 top-1/2 -translate-y-1/2 w-28 h-16 pointer-events-none">
                      <path d="M 0 0 Q 70 -8, 112 8" stroke="rgba(47,180,158,0.3)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                      <path d="M 112 8 Q 70 24, 0 16" stroke="rgba(47,180,158,0.3)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                      <circle cx="0" cy="8" r="2" fill="rgba(47,180,158,0.6)" />
                    </svg>
                    <div className="bg-white/95 backdrop-blur-md border-2 border-[#1A8B76]/40 rounded-lg px-4 py-3 min-w-[200px] shadow-md">
                      <div className="text-[11px] uppercase tracking-wider text-[#1A8B76] mb-1 font-medium">Iteration Loop</div>
                      <div className="text-[13px] text-[#4A4A4A] font-light leading-relaxed">Write → Score → Refine → Repeat</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
