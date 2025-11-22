/**
 * Digilab Test Page - Complete scroll story experience
 */

import dynamic from 'next/dynamic';
import { DigilabHero } from '@/components/sections/digilab/DigilabHero';
import { MissionSection } from '@/components/sections/digilab/MissionSection';
import { SuccessStories } from '@/components/sections/digilab/SuccessStories';
import { ContactCTA } from '@/components/sections/digilab/ContactCTA';
import { AnimationTestPanel } from '@/components/debug/AnimationTestPanel';

// Disable SSR for components using GSAP and R3F
const ProcessTimeline = dynamic(
  () => import('@/components/sections/digilab/ProcessTimeline').then(mod => ({ default: mod.ProcessTimeline })),
  {
    ssr: false,
    loading: () => <div className="min-h-screen bg-[#F5F1E9] flex items-center justify-center">
      <div className="animate-pulse text-[#0D061A]">Loading...</div>
    </div>
  }
);

const GrantCircleSection = dynamic(
  () => import('@/components/sections/digilab/GrantCircleSection').then(mod => ({ default: mod.GrantCircleSection })),
  {
    ssr: false,
    loading: () => <div className="min-h-screen bg-[#0D061A] flex items-center justify-center">
      <div className="animate-pulse text-[#F5F1E9]">Loading...</div>
    </div>
  }
);

export default function DigilabTestPage() {
  return (
    <main className="overflow-hidden">
      <DigilabHero />
      <MissionSection />
      <ProcessTimeline />
      <GrantCircleSection />
      <SuccessStories />
      <ContactCTA />

      {/* Animation Debug Panel - Development Only */}
      {process.env.NODE_ENV === 'development' && <AnimationTestPanel />}
    </main>
  );
}
