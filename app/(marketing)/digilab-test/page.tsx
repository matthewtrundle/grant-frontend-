/**
 * Digilab Test Page - Complete modern scroll story
 */

import { ContactCTA } from '@/components/sections/digilab/ContactCTA';
import { AnimationTestPanel } from '@/components/debug/AnimationTestPanel';
import { SuccessPipeline } from '@/components/sections/success/SuccessPipeline';
import { OrbitalAgentsSection } from '@/components/sections/home/OrbitalAgentsSection';
import { GrantMatchingShowcase } from '@/components/sections/home/GrantMatchingShowcase';
import { DigilabHero } from '@/components/sections/digilab/DigilabHero';
import ProcessTimelineFixed from '@/components/sections/digilab/ProcessTimelineFixed';
import FlowingWaveBackground from '@/components/FlowingWaveBackground';

export default function DigilabTestPage() {
  return (
    <main
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg,
          #1a1a3e 0%,
          #2d2d5f 20%,
          #3a3a6e 40%,
          #4a4a7a 60%,
          #5a5a8a 80%,
          #6a6a9a 100%
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
