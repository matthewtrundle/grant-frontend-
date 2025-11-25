'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Disable SSR for components using GSAP and R3F
const HeroSection = dynamic(
  () => import('@/components/sections/home/HeroSection').then(mod => ({ default: mod.default })),
  { ssr: false, loading: () => <div className="min-h-screen bg-white" /> }
);

const HeroTimelineTransition = dynamic(
  () => import('@/components/sections/home/HeroTimelineTransition').then(mod => ({ default: mod.default })),
  { ssr: false, loading: () => <div className="min-h-screen" /> }
);

const ProcessTimelineDigilab = dynamic(
  () => import('@/components/sections/home/ProcessTimelineDigilab').then(mod => ({ default: mod.default })),
  { ssr: false, loading: () => <div className="min-h-screen" /> }
);

const FlowingWaveBackgroundDynamic = dynamic(
  () => import('@/components/FlowingWaveBackground').then(mod => ({ default: mod.default })),
  { ssr: false }
);

export default function DigilabTimelineIntegratedPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4>(1);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const heroHeight = window.innerHeight; // Hero section height
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Only start tracking after hero section
      if (scrollTop < heroHeight) {
        setScrollProgress(0);
        setCurrentStage(1);
        return;
      }

      // Calculate progress through the timeline section
      const timelineScrollTop = scrollTop - heroHeight;
      const timelineHeight = docHeight - heroHeight - winHeight;
      const progress = Math.min(1, Math.max(0, timelineScrollTop / timelineHeight));

      setScrollProgress(progress);

      // Determine current stage based on progress
      if (progress < 0.25) setCurrentStage(1);
      else if (progress < 0.5) setCurrentStage(2);
      else if (progress < 0.75) setCurrentStage(3);
      else setCurrentStage(4);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white relative">
      {/* Hero Section */}
      <HeroSection />

      {/* Main content wrapper with flowing background */}
      <div ref={contentRef} className="relative">
        {/* Flowing Wave Background - spans entire vertical section with scroll tracking */}
        <FlowingWaveBackgroundDynamic stage={currentStage} scrollProgress={scrollProgress} />

        {/* Transition with Storytelling Backgrounds */}
        <HeroTimelineTransition />

        {/* Digilab Timeline */}
        <ProcessTimelineDigilab />

        {/* Additional sections can be added here */}
        <section className="relative z-10 bg-white/80 backdrop-blur-sm">
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4 text-[#1A8B76]">Mission Statement</h2>
              <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto px-8">
                Transforming the grant application process through AI-powered automation,
                enabling innovators to focus on what matters most - their groundbreaking work.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-white/70 backdrop-blur-sm">
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4 text-[#6B4DB8]">Success Stories</h2>
              <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto px-8">
                <div className="bg-white/90 p-6 rounded-lg shadow-lg">
                  <div className="text-5xl font-bold text-[#1A8B76] mb-2">87%</div>
                  <p className="text-sm text-[#4A4A4A]">Success Rate</p>
                </div>
                <div className="bg-white/90 p-6 rounded-lg shadow-lg">
                  <div className="text-5xl font-bold text-[#FF6B35] mb-2">$42M</div>
                  <p className="text-sm text-[#4A4A4A]">Grants Won</p>
                </div>
                <div className="bg-white/90 p-6 rounded-lg shadow-lg">
                  <div className="text-5xl font-bold text-[#4A90E2] mb-2">14d</div>
                  <p className="text-sm text-[#4A4A4A]">Average Time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* End spacer */}
        <div className="h-screen bg-white/90 backdrop-blur-sm flex items-center justify-center relative z-10">
          <div className="text-center">
            <p className="text-[#666666] text-sm uppercase tracking-widest mb-4">End of experience</p>
            <button className="px-8 py-4 bg-[#1A8B76] hover:bg-[#1A8B76]/80 text-white font-semibold tracking-wider transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              START YOUR JOURNEY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}