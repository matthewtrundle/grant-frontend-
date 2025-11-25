/**
 * Digilab Test Page - Complete modern scroll story
 */

'use client';

import dynamic from 'next/dynamic';

// Dynamically import all components to avoid SSR issues with GSAP/R3F
const ContactCTA = dynamic(
  () => import('@/components/sections/digilab/ContactCTA').then(mod => ({ default: mod.ContactCTA })),
  { ssr: false }
);

const AnimationTestPanel = dynamic(
  () => import('@/components/debug/AnimationTestPanel').then(mod => ({ default: mod.AnimationTestPanel })),
  { ssr: false }
);

const SuccessPipeline = dynamic(
  () => import('@/components/sections/success/SuccessPipeline').then(mod => ({ default: mod.SuccessPipeline })),
  { ssr: false }
);

const OrbitalAgentsSection = dynamic(
  () => import('@/components/sections/home/OrbitalAgentsSection').then(mod => ({ default: mod.OrbitalAgentsSection })),
  { ssr: false }
);

const GrantMatchingShowcase = dynamic(
  () => import('@/components/sections/home/GrantMatchingShowcase').then(mod => ({ default: mod.GrantMatchingShowcase })),
  { ssr: false }
);

const DigilabHero = dynamic(
  () => import('@/components/sections/digilab/DigilabHero').then(mod => ({ default: mod.DigilabHero })),
  { ssr: false }
);

const ProcessTimelineFixed = dynamic(
  () => import('@/components/sections/digilab/ProcessTimelineFixed'),
  { ssr: false }
);

const FlowingWaveBackground = dynamic(
  () => import('@/components/FlowingWaveBackground'),
  { ssr: false }
);

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
