/**
 * Digilab Refined Test Page - Polished v2 with Digilab-level sophistication
 *
 * Key improvements implemented:
 * 1. Muted, restrained palette (#F5F1E9 beige, #0D061A indigo, muted accents)
 * 2. Limited typography (3 sizes only: headline, body, small)
 * 3. Generous white space and breathing room
 * 4. Truly scroll-driven ProcessTimeline with evolving 3D visuals
 * 5. Purposeful particle animations (cluster to form stats, not random drift)
 * 6. Animated vertical lines and connecting elements
 * 7. Clean, uncluttered composition
 */

import { HeroRefined } from '@/components/sections/digilab-v2/HeroRefined';
import { MissionRefined } from '@/components/sections/digilab-v2/MissionRefined';
import { ProcessTimelineRefined } from '@/components/sections/digilab-v2/ProcessTimelineRefined';

export default function DigilabRefinedPage() {
  return (
    <main className="overflow-hidden">
      <HeroRefined />
      <MissionRefined />
      <ProcessTimelineRefined />

      {/* More sections coming - focusing on core narrative first */}
      <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F1E9' }}>
        <div className="text-center max-w-2xl px-8">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#0D061A' }}>
            Refinement in Progress
          </h2>
          <p className="text-lg" style={{ color: '#6B6B7C' }}>
            Testing the polished hero, mission, and truly scroll-driven process timeline.
            Remaining sections (Success Stories, Contact CTA) will follow the same refined aesthetic.
          </p>
        </div>
      </section>
    </main>
  );
}
