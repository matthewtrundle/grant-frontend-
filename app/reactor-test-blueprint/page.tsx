/**
 * Test page for SVG Blueprint Reactor variant
 */

import { GrantMatchingShowcase } from '@/components/sections/home/GrantMatchingShowcase';

export default function ReactorTestBlueprintPage() {
  return (
    <main className="min-h-screen bg-[#050714]">
      {/* Header */}
      <div className="py-8 px-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Reactor Test: SVG Blueprint
        </h1>
        <p className="text-slate-400">
          Testing the blueprint/diagram SVG reactor with minimal strokes and holographic style
        </p>
      </div>

      {/* SVG Blueprint Reactor */}
      <GrantMatchingShowcase reactorType="svg" svgVariant="blueprint" />

      {/* Footer info */}
      <div className="py-8 px-6 text-center text-slate-400 text-sm">
        <p>Variant: <code className="text-[#39F2C3]">blueprint</code></p>
        <p className="mt-2">Expected: Hexagonal nodes, clean strokes, background grid, minimal colors</p>
      </div>
    </main>
  );
}
