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
