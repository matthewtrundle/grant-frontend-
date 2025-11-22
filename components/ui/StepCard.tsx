/**
 * StepCard - Individual step in the process timeline
 *
 * Features:
 * - Active/inactive states with smooth transitions
 * - Number badge with stage color
 * - Title and description
 * - Metrics display
 */

'use client';

import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme';

interface StepCardProps {
  stepNumber: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  isActive: boolean;
}

export function StepCard({ stepNumber, title, description, metrics, isActive }: StepCardProps) {
  // Use single teal accent for all stages (FundAid Light Theme)
  const stageColor = fundaidTheme.accents.teal;

  return (
    <div
      className={cn(
        'relative p-8 rounded-2xl transition-all duration-500',
        'border-2',
        isActive
          ? 'scale-100 opacity-100 shadow-xl'
          : 'scale-90 opacity-40 shadow-sm'
      )}
      style={{
        borderColor: isActive ? stageColor : 'transparent',
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)',
      }}
    >
      {/* Step Number Badge */}
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 font-bold text-white transition-transform duration-300"
        style={{
          backgroundColor: stageColor,
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {stepNumber}
      </div>

      {/* Title */}
      <h3
        className={cn(
          fundaidTheme.typography.h3,
          'mb-3 transition-colors duration-300'
        )}
        style={{
          color: isActive ? fundaidTheme.text.main : fundaidTheme.text.muted,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          fundaidTheme.typography.body,
          'mb-6 transition-opacity duration-300'
        )}
        style={{
          color: fundaidTheme.text.muted,
          opacity: isActive ? 1 : 0.7,
        }}
      >
        {description}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="transition-opacity duration-300"
            style={{ opacity: isActive ? 1 : 0.5 }}
          >
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: stageColor }}
            >
              {metric.value}
            </div>
            <div className="text-sm" style={{ color: fundaidTheme.text.muted }}>
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
