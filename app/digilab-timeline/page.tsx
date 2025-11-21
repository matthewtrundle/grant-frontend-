import ProcessTimelineDigilab from '@/components/sections/home/ProcessTimelineDigilab';

export default function DigilabTimelinePage() {
  return (
    <div className="bg-[#0C051A]">
      {/* Spacer for scroll start */}
      <div className="h-screen bg-[#0C051A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#F5F2ED] mb-4">Digilab Process Timeline</h1>
          <p className="text-[#6B6B7C] text-sm uppercase tracking-widest">Scroll to experience</p>
        </div>
      </div>

      {/* Digilab Timeline */}
      <ProcessTimelineDigilab />

      {/* Spacer for scroll end */}
      <div className="h-screen bg-[#0C051A] flex items-center justify-center">
        <p className="text-[#6B6B7C] text-sm uppercase tracking-widest">End of timeline</p>
      </div>
    </div>
  );
}
