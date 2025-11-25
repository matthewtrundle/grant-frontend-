/**
 * StepCardRefined - Individual step with clean, restrained design
 *
 * Key improvements:
 * - Muted colors (teal/sage/lavender accents)
 * - Generous padding and breathing room
 * - Subtle active/inactive transitions
 * - No harsh borders or shadows
 * - Limited typography (only 2 sizes)
 */

'use client';

import { cn } from '@/lib/utils';
import { digilibTheme } from '@/lib/digilab-theme';

interface StepCardRefinedProps {
  stepNumber: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  isActive: boolean;
}

// Map step numbers to accent colors
const stepColors = [
  digilibTheme.accents.teal,
  digilibTheme.accents.sage,
  digilibTheme.accents.lavender,
  digilibTheme.accents.coral,
];

export function StepCardRefined({ stepNumber, title, description, metrics, isActive }: StepCardRefinedProps) {
  const accentColor = stepColors[stepNumber - 1];

  return (
    <div
      className={cn(
        'relative px-8 py-10 rounded-2xl transition-all duration-700 ease-out backdrop-blur-sm',
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-40'
      )}
      style={{
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
        border: isActive ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Accent line on left edge - teal pill highlight */}
      <div
        className="absolute left-0 top-8 bottom-8 w-[3px] rounded-r-full bg-[#26E6C8] transition-opacity duration-500"
        style={{
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Step Number - Softer, rounded friendly styling */}
      <div
        className={cn(
          'text-4xl md:text-5xl font-semibold mb-6 transition-all duration-500',
          isActive ? 'text-white/90' : 'text-white/30'
        )}
      >
        {stepNumber}
      </div>

      {/* Title - Gradient text for premium feel */}
      <h3
        className={cn(
          'text-3xl md:text-4xl font-semibold tracking-tight mb-4 transition-all duration-500',
          isActive ? 'bg-gradient-to-r from-[#30E3B7] to-[#A26CF7] bg-clip-text text-transparent' : 'text-white/40'
        )}
      >
        {title}
      </h3>

      {/* Description - Softer off-white with extra line-height */}
      <p
        className={cn(
          'text-sm md:text-base text-slate-200/80 leading-relaxed max-w-xl mb-8 transition-opacity duration-500'
        )}
        style={{
          opacity: isActive ? 1 : 0.5,
        }}
      >
        {description}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="transition-opacity duration-500" style={{ opacity: isActive ? 1 : 0.4 }}>
            <div
              className="text-3xl font-bold mb-1"
              style={{ color: isActive ? '#30E3B7' : 'rgba(255, 255, 255, 0.3)' }}
            >
              {metric.value}
            </div>
            <div className="text-xs text-slate-400">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
