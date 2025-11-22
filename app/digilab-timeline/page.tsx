import dynamic from 'next/dynamic';

// Disable SSR for components using GSAP and R3F
const HeroSection = dynamic(
  () => import('@/components/sections/home/HeroSection'),
  { ssr: false }
);

const HeroTimelineTransition = dynamic(
  () => import('@/components/sections/home/HeroTimelineTransition'),
  { ssr: false }
);

const ProcessTimelineDigilab = dynamic(
  () => import('@/components/sections/home/ProcessTimelineDigilab'),
  { ssr: false }
);

export default function DigilabTimelinePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Transition with Storytelling Backgrounds */}
      <HeroTimelineTransition />

      {/* Digilab Timeline */}
      <ProcessTimelineDigilab />

      {/* Spacer for scroll end */}
      <div className="h-screen bg-white flex items-center justify-center">
        <p className="text-[#666666] text-sm uppercase tracking-widest">End of timeline</p>
      </div>
    </div>
  );
}
