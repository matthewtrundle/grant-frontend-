/**
 * Agent Showcase Test Page - Enhanced agent team visualization
 * Test page for the new scroll-linked agent showcase with R3F pipeline
 */

import dynamic from 'next/dynamic';

// Disable SSR for components using GSAP and R3F
const AgentShowcaseSection = dynamic(
  () => import('@/components/sections/digilab/AgentShowcaseSection').then(mod => ({ default: mod.AgentShowcaseSection })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2ED]">
        <div className="animate-pulse text-gray-600">Loading agent visualization...</div>
      </div>
    )
  }
);

export default function AgentShowcaseTestPage() {
  return (
    <main className="overflow-hidden">
      {/* Simple header for context */}
      <div className="py-12 px-6 text-center bg-[#F5F2ED]">
        <h1 className="text-4xl font-bold text-[#14141F] mb-4">
          Enhanced Agent Showcase Demo
        </h1>
        <p className="text-[#6B6B7C] max-w-2xl mx-auto">
          Scroll to see the agents activate in sequence. The pipeline visualization on the right
          shows data flowing through each agent as they process grant opportunities.
        </p>
      </div>

      {/* Main showcase section */}
      <AgentShowcaseSection />

      {/* Footer spacer */}
      <div className="h-screen bg-[#F5F2ED] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#14141F] mb-4">
            End of Demo
          </h2>
          <p className="text-[#6B6B7C]">
            The agent pipeline continues processing in the background.
          </p>
        </div>
      </div>
    </main>
  );
}