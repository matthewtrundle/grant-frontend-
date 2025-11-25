/**
 * Digilab Test Page - Complete modern scroll story
 */

import dynamic from 'next/dynamic';
import { ContactCTA } from '@/components/sections/digilab/ContactCTA';
import { AnimationTestPanel } from '@/components/debug/AnimationTestPanel';
import { SuccessPipeline } from '@/components/sections/success/SuccessPipeline';
import { OrbitalAgentsSection } from '@/components/sections/home/OrbitalAgentsSection';
import { GrantMatchingShowcase } from '@/components/sections/home/GrantMatchingShowcase';

// Dynamic imports for client-side components
const DigilabHero = dynamic(
  () => import('@/components/sections/digilab/DigilabHero').then(mod => ({ default: mod.DigilabHero })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-orange-600">
        <div className="animate-pulse text-white text-lg">Loading...</div>
      </div>
    )
  }
);

const ProcessTimelineFixed = dynamic(
  () => import('@/components/sections/digilab/ProcessTimelineFixed'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-800 text-lg">Loading...</div>
      </div>
    )
  }
);

const FlowingWaveBackground = dynamic(
  () => import('@/components/FlowingWaveBackground'),
  {
    ssr: false,
    loading: () => null
  }
);

export default function DigilabTestPage() {
  return (
    <main
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg,
          #3a5ba9 0%,
          #4d6ab5 15%,
          #6879c1 25%,
          #e89b5d 45%,
          #fba45d 55%,
          #f5b872 65%,
          #e8c88a 80%,
          #d4d4a0 100%
        )`
      }}
    >
      {/* Animated wave background */}
      <FlowingWaveBackground />

      {/* Main content layer */}
      <div className="relative z-10">
        <DigilabHero />
        <div id="how-it-works">
          <SuccessPipeline />
        </div>
        <ProcessTimelineFixed />
        <GrantMatchingShowcase reactorType="svg" svgVariant="blueprint" />
        <OrbitalAgentsSection />
        <ContactCTA />
      </div>

      {/* Development debug panel */}
      {process.env.NODE_ENV === 'development' && <AnimationTestPanel />}
    </main>
  );
}
