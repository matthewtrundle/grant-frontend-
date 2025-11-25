/**
 * LogoFundAid - Clean, reusable FundAid logo component
 *
 * Features:
 * - Uses the transparent PNG asset
 * - Accepts className for flexible sizing
 * - Optional diffusion glow wrapper for hero usage
 */

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoFundAidProps {
  className?: string;
  withGlow?: boolean;
  priority?: boolean;
}

export function LogoFundAid({ className, withGlow = false, priority = false }: LogoFundAidProps) {
  // Return logo with diffusion glow wrapper if requested
  if (withGlow) {
    return (
      <div className={cn("relative", className)}>
        {/* Diffusion glow effect */}
        <div
          className="absolute inset-0 blur-3xl opacity-60 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.35), transparent)',
          }}
        />
        {/* Logo on top */}
        <div className="relative z-10 w-full h-full">
          <Image
            src="/FUND AID Text Transparent PNG.png"
            alt="FUND AID"
            fill
            className="object-contain"
            priority={priority}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src="/FUND AID Text Transparent PNG.png"
        alt="FUND AID"
        fill
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}
