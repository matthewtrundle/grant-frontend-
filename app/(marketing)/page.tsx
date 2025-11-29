/**
 * Home Page - Deep-Space Control Room Hero
 */

import { ContactCTA } from '@/components/sections/digilab/ContactCTA';
import { SuccessPipeline } from '@/components/sections/success/SuccessPipeline';
import { ROIComparison } from '@/components/sections/home/ROIComparison';
import { OrbitalAgentsSection } from '@/components/sections/home/OrbitalAgentsSection';
import { GrantMatchingShowcase } from '@/components/sections/home/GrantMatchingShowcase';
import { DeepSpaceHero } from '@/components/hero/DeepSpaceHero';
import ProcessTimelineFixed from '@/components/sections/digilab/ProcessTimelineFixed';

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-fundaid-page min-h-screen">
      <DeepSpaceHero />
      <div id="how-it-works">
        <SuccessPipeline />
      </div>
      <ROIComparison />
      <ProcessTimelineFixed />
      <GrantMatchingShowcase reactorType="svg" svgVariant="blueprint" />
      <OrbitalAgentsSection />
      <ContactCTA />
    </main>
  );
}
