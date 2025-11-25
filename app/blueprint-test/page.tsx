/**
 * Blueprint Hero Test Page
 */

import { FundAidBlueprintHero } from '@/components/hero/FundAidBlueprintHero';

export default function BlueprintTestPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-[2400px] w-full">
        <FundAidBlueprintHero />
      </div>
    </div>
  );
}
