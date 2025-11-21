/**
 * Digilab Test Page - Complete scroll story experience
 */

import { DigilabHero } from '@/components/sections/digilab/DigilabHero';
import { MissionSection } from '@/components/sections/digilab/MissionSection';
import { ProcessTimeline } from '@/components/sections/digilab/ProcessTimeline';
import { GrantCircleSection } from '@/components/sections/digilab/GrantCircleSection';
import { SuccessStories } from '@/components/sections/digilab/SuccessStories';
import { ContactCTA } from '@/components/sections/digilab/ContactCTA';

export default function DigilabTestPage() {
  return (
    <main className="overflow-hidden">
      <DigilabHero />
      <MissionSection />
      <ProcessTimeline />
      <GrantCircleSection />
      <SuccessStories />
      <ContactCTA />
    </main>
  );
}
