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

const FlowingWaveBackground = dynamic(
  () => import('@/components/FlowingWaveBackground'),
  { ssr: false }
);

export default function DigilabTimelineFlowingPage() {
  return (
    <div className="bg-white relative">
      {/* Hero Section */}
      <HeroSection />

      {/* Main content wrapper with flowing background */}
      <div className="relative">
        {/* Flowing Wave Background - spans entire vertical section */}
        <FlowingWaveBackground />

        {/* Transition with Storytelling Backgrounds */}
        <HeroTimelineTransition />

        {/* Digilab Timeline */}
        <ProcessTimelineDigilab />

        {/* Spacer for scroll end */}
        <div className="h-screen bg-white/90 flex items-center justify-center relative z-10">
          <p className="text-[#666666] text-sm uppercase tracking-widest">End of timeline</p>
        </div>
      </div>
    </div>
  );
}