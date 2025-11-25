/**
 * Gradient Test Page - Verify persistent gradient background
 */

'use client';

import dynamic from 'next/dynamic';

// Test both versions of DigilabHero
const DigilabHero = dynamic(
  () => import('@/components/sections/digilab/DigilabHero').then(mod => ({ default: mod.DigilabHero })),
  { ssr: false }
);

const DigilabHeroEnhanced = dynamic(
  () => import('@/components/sections/digilab/DigilabHeroEnhanced').then(mod => ({ default: mod.DigilabHeroEnhanced })),
  { ssr: false }
);

interface TestSectionProps {
  title: string;
  description: string;
  bgColor?: string;
}

function TestSection({ title, description, bgColor = 'transparent' }: TestSectionProps) {
  return (
    <section
      className="min-h-screen flex items-center justify-center p-8"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-4xl text-center">
        <h2 className="text-5xl font-bold mb-6 text-gray-900">{title}</h2>
        <p className="text-xl text-gray-700">{description}</p>
      </div>
    </section>
  );
}

export default function GradientTestPage() {
  // Toggle between original and enhanced
  const useEnhanced = true;

  return (
    <main className="relative">
      {/* Hero with gradient background */}
      {useEnhanced ? <DigilabHeroEnhanced /> : <DigilabHero />}

      {/* Test sections to verify gradient persists */}
      <TestSection
        title="Section 1: Timeline Start"
        description="The gradient should still be visible here, with subtle parallax movement."
      />

      <TestSection
        title="Section 2: Process Overview"
        description="Gradient continues through the timeline sections, creating visual cohesion."
      />

      <TestSection
        title="Section 3: Mid-Timeline"
        description="Notice how the gradient moves slowly as you scroll, staying in view."
      />

      <TestSection
        title="Section 4: Deep Scroll"
        description="Even this far down, the gradient should still provide atmospheric background."
      />

      <TestSection
        title="Section 5: Near Bottom"
        description="The gradient may start to fade slightly here for a smooth transition."
      />

      <TestSection
        title="Section 6: End"
        description="Final section - gradient should have persisted throughout the entire scroll journey."
        bgColor="rgba(255, 255, 255, 0.5)"
      />

      {/* Version indicator */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg text-sm z-50">
        Using: {useEnhanced ? 'Enhanced' : 'Original'} Hero
      </div>
    </main>
  );
}