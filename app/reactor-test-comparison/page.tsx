/**
 * Comparison page for all reactor variants
 * Shows 3D, SVG Metallic, and SVG Blueprint side-by-side
 */

import { GrantMatchingShowcase } from '@/components/sections/home/GrantMatchingShowcase';

export default function ReactorComparisonPage() {
  return (
    <main className="min-h-screen bg-[#050714]">
      {/* Header */}
      <div className="py-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          Reactor Variants Comparison
        </h1>
        <p className="text-slate-300 text-lg">
          Compare all three reactor implementations: React Three Fiber 3D, SVG Metallic, and SVG Blueprint
        </p>
      </div>

      {/* 3D Reactor (React Three Fiber) */}
      <div className="border-t border-white/10 py-8">
        <div className="px-6 mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            1. React Three Fiber (3D) - Default
          </h2>
          <p className="text-slate-400">
            WebGL-based 3D reactor with 5 energy cores, 35 particles, turbulence, and avoidance behaviors
          </p>
        </div>
        <GrantMatchingShowcase reactorType="3d" />
      </div>

      {/* SVG Metallic */}
      <div className="border-t border-white/10 py-8">
        <div className="px-6 mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            2. SVG Metallic - Premium
          </h2>
          <p className="text-slate-400">
            Pure SVG with premium gradients, metallic rings, glows, and animated data pellets
          </p>
        </div>
        <GrantMatchingShowcase reactorType="svg" svgVariant="metallic" />
      </div>

      {/* SVG Blueprint */}
      <div className="border-t border-white/10 py-8">
        <div className="px-6 mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            3. SVG Blueprint - Minimal
          </h2>
          <p className="text-slate-400">
            Clean blueprint schematic with hexagonal nodes, minimal strokes, and holographic aesthetic
          </p>
        </div>
        <GrantMatchingShowcase reactorType="svg" svgVariant="blueprint" />
      </div>

      {/* Performance Comparison */}
      <div className="border-t border-white/10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Performance Comparison
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* 3D Stats */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#2FB49E] mb-3">React Three Fiber</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• File: ~400 lines</li>
                <li>• Bundle: ~500KB</li>
                <li>• FPS: 40-50 mobile</li>
                <li>• Load: 1-2s</li>
              </ul>
            </div>

            {/* SVG Metallic Stats */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#A88CEB] mb-3">SVG Metallic</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• File: ~250 lines</li>
                <li>• Bundle: ~12KB</li>
                <li>• FPS: 60 mobile</li>
                <li>• Load: Instant</li>
              </ul>
            </div>

            {/* SVG Blueprint Stats */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#39F2C3] mb-3">SVG Blueprint</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• File: ~240 lines</li>
                <li>• Bundle: ~11KB</li>
                <li>• FPS: 60 mobile</li>
                <li>• Load: Instant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-white/10 py-8 px-6 text-center">
        <p className="text-slate-400 mb-4">Test individual variants:</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/reactor-test-metallic"
             className="px-6 py-2 bg-[#2FB49E]/20 border border-[#2FB49E]/40 text-[#2FB49E] rounded-lg hover:bg-[#2FB49E]/30 transition-colors">
            SVG Metallic
          </a>
          <a href="/reactor-test-blueprint"
             className="px-6 py-2 bg-[#39F2C3]/20 border border-[#39F2C3]/40 text-[#39F2C3] rounded-lg hover:bg-[#39F2C3]/30 transition-colors">
            SVG Blueprint
          </a>
          <a href="/digilab-test"
             className="px-6 py-2 bg-[#A88CEB]/20 border border-[#A88CEB]/40 text-[#A88CEB] rounded-lg hover:bg-[#A88CEB]/30 transition-colors">
            Full Digilab Page (3D)
          </a>
        </div>
      </div>
    </main>
  );
}
