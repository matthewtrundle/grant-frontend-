/**
 * Timeline Showcase Page
 *
 * Demonstrates the ProcessTimeline component with R3F visualization
 * in isolation for testing and development.
 */

'use client';

import ProcessTimeline from '@/components/sections/home/ProcessTimeline';

export default function ShowcaseTimelinePage() {
  return (
    <main className="bg-[#0C051A] min-h-screen">
      {/* Header with info */}
      <div className="fixed top-0 left-0 z-50 p-4 text-white bg-black/50 backdrop-blur-sm">
        <h1 className="text-sm font-mono text-[#2FB49E]">ProcessTimeline Showcase</h1>
        <p className="text-xs text-gray-400 mt-1">Scroll to see morphing particle states</p>
        <div className="text-xs text-gray-500 mt-2">
          <span>Stage 1: Clustering</span> •
          <span className="ml-2">Stage 2: Grid</span> •
          <span className="ml-2">Stage 3: Funnel</span> •
          <span className="ml-2">Stage 4: Central</span>
        </div>
      </div>

      {/* ProcessTimeline Component with R3F Visualization */}
      <ProcessTimeline />

      {/* Debug info */}
      <div className="fixed bottom-4 right-4 text-xs text-[#2FB49E]/50 font-mono">
        <div>React Three Fiber</div>
        <div>75 Particles</div>
        <div>4 Stage Morph</div>
      </div>
    </main>
  );
}