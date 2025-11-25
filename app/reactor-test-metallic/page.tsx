/**
 * Test page for SVG Metallic Reactor variant
 */

import { GrantMatchingShowcase } from '@/components/sections/home/GrantMatchingShowcase';

export default function ReactorTestMetallicPage() {
  return (
    <main className="min-h-screen bg-[#050714]">
      {/* Header */}
      <div className="py-8 px-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Reactor Test: SVG Metallic
        </h1>
        <p className="text-slate-400">
          Testing the metallic/spacey SVG reactor with premium gradients and glows
        </p>
      </div>

      {/* SVG Metallic Reactor */}
      <GrantMatchingShowcase reactorType="svg" svgVariant="metallic" />

      {/* Footer info */}
      <div className="py-8 px-6 text-center text-slate-400 text-sm">
        <p>Variant: <code className="text-[#2FB49E]">metallic</code></p>
        <p className="mt-2">Expected: Premium gradients, metallic rings, glowing cores, animated data pellets</p>
      </div>
    </main>
  );
}
