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
        background: `radial-gradient(ellipse at 30% 50%,
          #2a1a4d 0%,
          #3a2a5d 15%,
          #4a3a6d 30%,
          #e89b5d 70%,
          #fba45d 85%,
          #f5a872 100%
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
