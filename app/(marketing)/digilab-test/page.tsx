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
          #1a1a3e 0%,
          #2d2d5f 15%,
          #4a4a7a 25%,
          #ff8e6e 40%,
          #ffb4a2 50%,
          #ffa07a 60%,
          #2d7a7a 75%,
          #3d9a8a 85%,
          #4db8a8 100%
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
