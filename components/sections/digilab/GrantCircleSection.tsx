/**
 * GrantCircleSection - Interactive grant opportunity timeline
 *
 * Features:
 * - Pinned section with 3D circular timeline
 * - Rotating grant opportunities with match scores
 * - Fade-in animation on scroll entry
 */

'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { cn } from '@/lib/utils';
import { digilibTheme } from '@/lib/digilab-theme';
import { GrantCircle3D } from '@/components/3d/GrantCircle3D';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GrantCircleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      // Fade in content
      tl.fromTo(
        '.grant-circle-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(digilibTheme.spacing.section)}
      style={{ backgroundColor: digilibTheme.backgrounds.dark }}
    >
      <div className={cn(digilibTheme.spacing.container)}>
        {/* Header */}
        <div className="grant-circle-content text-center mb-16">
          <h2
            className={cn(digilibTheme.typography.h1, 'mb-6')}
            style={{ color: digilibTheme.text.darkBg }}
          >
            Your Perfect Matches
          </h2>
          <p
            className={cn(digilibTheme.typography.body, 'mx-auto')}
            style={{
              color: digilibTheme.text.muted,
              maxWidth: '60ch',
            }}
          >
            AI-powered discovery ranks thousands of opportunities by fit score.
            See your top 10 grants visualized by deadline and match quality.
          </p>
        </div>

        {/* 3D Grant Circle */}
        <div className="grant-circle-content relative h-[600px] rounded-2xl overflow-hidden bg-slate-900/20">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} />
            <pointLight position={[-5, -5, -5]} intensity={0.3} />

            {/* Grant Circle */}
            <GrantCircle3D />
          </Canvas>

          {/* Legend overlay */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
            <div className="text-sm font-medium mb-3" style={{ color: digilibTheme.text.lightBg }}>
              Match Quality
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10B981' }} />
                <span className="text-xs text-slate-600">High (80%+)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
                <span className="text-xs text-slate-600">Medium (70-80%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#64748B' }} />
                <span className="text-xs text-slate-600">Lower (&lt;70%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
