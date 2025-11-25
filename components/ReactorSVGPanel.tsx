/**
 * Reactor SVG Panel - Wrapper Component
 *
 * Switchable wrapper that renders either:
 * - Metallic/Spacey version (premium gradients and glows)
 * - Blueprint/Diagram version (minimal strokes)
 *
 * Can be used as:
 * - Background element (absolute positioning)
 * - Inline component
 */

'use client';

import React from 'react';
import { ReactorSVGMetallic } from './ReactorSVGMetallic';
import { ReactorSVGBlueprint } from './ReactorSVGBlueprint';

export type ReactorVariant = 'metallic' | 'blueprint';

interface ReactorSVGPanelProps {
  /** Which reactor style to render */
  variant?: ReactorVariant;
  /** Additional CSS classes */
  className?: string;
  /** Enable/disable animations */
  animate?: boolean;
  /** Render as background (absolute positioning) */
  asBackground?: boolean;
}

export function ReactorSVGPanel({
  variant = 'metallic',
  className = '',
  animate = true,
  asBackground = false,
}: ReactorSVGPanelProps) {
  const ReactorComponent = variant === 'blueprint' ? ReactorSVGBlueprint : ReactorSVGMetallic;

  if (asBackground) {
    return (
      <div className={`absolute inset-0 pointer-events-none opacity-80 ${className}`}>
        <ReactorComponent animate={animate} />
      </div>
    );
  }

  return (
    <div className={className}>
      <ReactorComponent animate={animate} />
    </div>
  );
}

// Export individual components for direct use
export { ReactorSVGMetallic, ReactorSVGBlueprint };
