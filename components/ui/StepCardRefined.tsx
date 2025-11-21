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
        'relative px-8 py-10 rounded-2xl transition-all duration-700 ease-out',
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-40'
      )}
      style={{
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)',
      }}
    >
      {/* Accent line on left edge */}
      <div
        className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full transition-opacity duration-500"
        style={{
          backgroundColor: accentColor,
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Step Number Badge */}
      <div
        className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-6 font-bold text-white text-sm transition-all duration-500"
        style={{
          backgroundColor: accentColor,
          opacity: isActive ? 1 : 0.5,
        }}
      >
        {stepNumber}
      </div>

      {/* Title - use body size (not headline) */}
      <h3
        className={cn('text-2xl font-bold mb-4 transition-colors duration-500')}
        style={{
          color: isActive ? digilibTheme.text.lightBg : digilibTheme.text.muted,
        }}
      >
        {title}
      </h3>

      {/* Description - base size */}
      <p
        className={cn(digilibTheme.typography.body, 'mb-8 transition-opacity duration-500')}
        style={{
          color: digilibTheme.text.muted,
          opacity: isActive ? 1 : 0.6,
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
              style={{ color: accentColor }}
            >
              {metric.value}
            </div>
            <div className={cn(digilibTheme.typography.small)} style={{ color: digilibTheme.text.muted }}>
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
