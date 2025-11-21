/**
 * Test page for ProcessTimeline component with GSAP ScrollTrigger
 */

import ProcessTimeline from '@/components/sections/home/ProcessTimeline';

export default function ProcessTimelineTestPage() {
  return (
    <main className="relative">
      {/* Spacer before timeline for scroll context */}
      <div className="h-screen bg-[#0C051A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Scroll Down to See
          </h1>
          <p className="text-[#6B6B7C] text-lg">
            GSAP ScrollTrigger Animation Demo
          </p>
        </div>
      </div>

      {/* ProcessTimeline Component with GSAP animations */}
      <ProcessTimeline />

      {/* Spacer after timeline for scroll context */}
      <div className="h-screen bg-[#0C051A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            End of Timeline
          </h1>
          <p className="text-[#6B6B7C] text-lg">
            Scroll back up to replay
          </p>
        </div>
      </div>
    </main>
  );
}