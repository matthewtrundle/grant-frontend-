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
        background: `radial-gradient(ellipse at 50% 30%,
          #1e3a8a 0%,
          #4338ca 20%,
          #6d28d9 40%,
          #1e1b4b 70%,
          #0f0a1e 100%
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
