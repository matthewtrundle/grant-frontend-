/**
 * AI Features Test Page - Interactive AI-Powered Grant Success section
 *
 * Testing the new AI features section with:
 * - Hover-triggered R3F visualizations
 * - Scroll-based background transitions
 * - 4 different feature visualizations
 * - Digilab-inspired calm aesthetic
 */

'use client';

import { AIFeaturesSection } from '@/components/sections/ai-features/AIFeaturesSection';

export default function AIFeaturesTestPage() {
  return (
    <main className="min-h-screen bg-[#F5F2ED]">
      {/* Simple header for context */}
      <div className="py-20 text-center bg-white border-b border-gray-200/50">
        <h1 className="text-4xl font-bold text-[#0C051A] mb-4">
          AI Features Section Test
        </h1>
        <p className="text-lg text-[#0C051A]/60 max-w-2xl mx-auto px-6">
          Testing interactive visualizations that respond to hover and scroll.
          Each feature has a unique 3D visualization on the right.
        </p>
      </div>

      {/* AI Features Section */}
      <AIFeaturesSection />

      {/* Spacer section to test scroll effects */}
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-2xl px-8">
          <h2 className="text-3xl font-bold mb-4 text-[#0C051A]">
            Additional Content Below
          </h2>
          <p className="text-lg text-[#0C051A]/60">
            This section exists to test scroll-based animations and transitions.
            The background should subtly shift as you scroll through the AI features.
          </p>
        </div>
      </section>
    </main>
  );
}