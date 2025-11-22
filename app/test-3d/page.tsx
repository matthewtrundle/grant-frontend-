/**
 * Test page for 3D visualizations
 * Verifies all React Three Fiber components are rendering correctly
 * with Digilab flat material aesthetic
 */

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import 3D components (client-only)
const ProcessTimelineCanvas = dynamic(
  () => import('@/components/3d/ProcessTimelineCanvas'),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" /> }
);

const GrantCircleCanvas = dynamic(
  () => import('@/components/3d/GrantCircleCanvas'),
  { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" /> }
);

export default function Test3DPage() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">3D Visualization Test Page</h1>

        {/* Test 1: UnifiedParticleSystem with formation morphing */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">UnifiedParticleSystem Test</h2>

          {/* Controls for testing morphing */}
          <div className="flex gap-4 mb-4">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => setActiveStep(step as 1 | 2 | 3 | 4)}
                className={`px-4 py-2 rounded ${
                  activeStep === step
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Stage {step}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-600 mb-4">
            Active Formation: {
              activeStep === 1 ? 'Cluster (3 groups)' :
              activeStep === 2 ? 'Grid (5×5)' :
              activeStep === 3 ? 'Funnel (budget flow)' :
              'Orbital (multi-agent)'
            }
          </div>

          {/* Canvas container */}
          <div className="h-[500px] bg-gray-900 rounded-lg overflow-hidden">
            <ProcessTimelineCanvas activeStep={activeStep} />
          </div>

          {/* Checklist */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="particles-visible" />
              <label htmlFor="particles-visible">✓ 50 particles visible</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="single-color" />
              <label htmlFor="single-color">✓ Single teal color (no per-particle colors)</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="smooth-morph" />
              <label htmlFor="smooth-morph">✓ Smooth morphing between formations</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="subtle-idle" />
              <label htmlFor="subtle-idle">✓ Subtle idle motion (barely visible)</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="flat-material" />
              <label htmlFor="flat-material">✓ Flat meshBasicMaterial (no shading)</label>
            </div>
          </div>
        </section>

        {/* Test 2: GrantCircle3D */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">GrantCircle3D Test</h2>

          {/* Canvas container */}
          <div className="h-[500px] bg-gray-900 rounded-lg overflow-hidden">
            <GrantCircleCanvas />
          </div>

          {/* Checklist */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="grants-visible" />
              <label htmlFor="grants-visible">✓ Grant nodes visible</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="flat-grants" />
              <label htmlFor="flat-grants">✓ Flat materials (no emissive glow)</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="fundaid-colors" />
              <label htmlFor="fundaid-colors">✓ FundAid colors (teal, lavender, coral)</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="ring-visible" />
              <label htmlFor="ring-visible">✓ Ring geometry visible</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="auto-rotate" />
              <label htmlFor="auto-rotate">✓ Gentle auto-rotation</label>
            </div>
          </div>
        </section>

        {/* Performance Check */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Performance Check</h2>
          <div className="space-y-2 text-sm">
            <p>✓ Canvas settings: shadows=false, antialias=true, alpha=true</p>
            <p>✓ Lighting: Only ambient light at 0.8 intensity</p>
            <p>✓ Materials: All meshBasicMaterial (no standard/phong)</p>
            <p>✓ No emissive properties or glow effects</p>
            <p>✓ Max DPR: 2 for retina displays</p>
            <p>✓ Performance mode: high-performance</p>
          </div>
        </section>
      </div>
    </div>
  );
}