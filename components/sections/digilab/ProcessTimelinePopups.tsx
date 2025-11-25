/**
 * ProcessTimelinePopups - Scroll-triggered popup boxes with insights
 *
 * Features:
 * - Appear at specific scroll progress points
 * - Connected to neural network lines
 * - Staggered animations
 * - Mobile responsive
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface PopupData {
  id: string;
  triggerProgress: number; // 0-1 when this popup appears
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  label: string;
  value: string;
  color?: keyof typeof fundaidTheme.accents;
  connectorTo?: string; // ID of element to connect to
}

// Popup configurations for each stage
const popupConfigs: PopupData[] = [
  // Stage 1 popups
  {
    id: 'popup-trl-accuracy',
    triggerProgress: 0.15,
    position: { top: '20%', left: '45%' },
    label: 'ACCURACY',
    value: '95% TRL precision',
    color: 'teal'
  },
  {
    id: 'popup-setup-time',
    triggerProgress: 0.18,
    position: { top: '35%', right: '15%' },
    label: 'SPEED',
    value: '5 min setup',
    color: 'blue'
  },

  // Stage 2 popups
  {
    id: 'popup-grants-scanned',
    triggerProgress: 0.35,
    position: { top: '25%', left: '50%' },
    label: 'COVERAGE',
    value: '2,438 grants/search',
    color: 'lavender'
  },
  {
    id: 'popup-ai-ranking',
    triggerProgress: 0.40,
    position: { bottom: '40%', right: '20%' },
    label: 'AI RANKING',
    value: '94 strong matches',
    color: 'teal'
  },

  // Stage 3 popups
  {
    id: 'popup-compliance',
    triggerProgress: 0.60,
    position: { top: '30%', right: '25%' },
    label: 'VALIDATION',
    value: '100% compliance',
    color: 'blue'
  },
  {
    id: 'popup-timeline',
    triggerProgress: 0.65,
    position: { bottom: '35%', left: '48%' },
    label: 'AUTOMATION',
    value: 'Auto timeline generation',
    color: 'lavender'
  },

  // Stage 4 popups
  {
    id: 'popup-quality-score',
    triggerProgress: 0.85,
    position: { top: '22%', left: '52%' },
    label: 'QUALITY',
    value: '7+/10 avg score',
    color: 'teal'
  },
  {
    id: 'popup-cost',
    triggerProgress: 0.88,
    position: { top: '45%', right: '18%' },
    label: 'EFFICIENCY',
    value: '<$50 API cost',
    color: 'blue'
  },
  {
    id: 'popup-assessors',
    triggerProgress: 0.92,
    position: { bottom: '30%', left: '55%' },
    label: 'SIMULATION',
    value: '3-assessor feedback',
    color: 'lavender'
  }
];

interface ProcessTimelinePopupsProps {
  scrollProgress: number;
  containerRef: React.RefObject<HTMLElement>;
  className?: string;
}

export function ProcessTimelinePopups({
  scrollProgress,
  containerRef,
  className
}: ProcessTimelinePopupsProps) {
  const [visiblePopups, setVisiblePopups] = useState<Set<string>>(new Set());
  const popupRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Determine which popups should be visible based on scroll progress
  useEffect(() => {
    const newVisible = new Set<string>();

    popupConfigs.forEach(popup => {
      // Show popup when we've scrolled past its trigger point
      if (scrollProgress >= popup.triggerProgress) {
        newVisible.add(popup.id);
      }
    });

    setVisiblePopups(newVisible);
  }, [scrollProgress]);

  // Animate connectors when popups appear
  useEffect(() => {
    if (!containerRef.current) return;

    visiblePopups.forEach(popupId => {
      const popup = popupRefs.current.get(popupId);
      if (!popup) return;

      const config = popupConfigs.find(p => p.id === popupId);
      if (!config?.connectorTo) return;

      // Find connector element and animate it
      const connector = containerRef.current?.querySelector(
        `.connector-${popupId}`
      ) as HTMLElement;

      if (connector) {
        gsap.fromTo(
          connector,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.3,
            duration: 0.6,
            ease: 'power2.out',
            transformOrigin: 'left center'
          }
        );
      }
    });
  }, [visiblePopups, containerRef]);

  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      <AnimatePresence>
        {popupConfigs.map(popup => {
          const isVisible = visiblePopups.has(popup.id);
          const accentColor = popup.color
            ? fundaidTheme.accents[popup.color]
            : fundaidTheme.accents.teal;

          return (
            <motion.div
              key={popup.id}
              ref={el => {
                if (el) popupRefs.current.set(popup.id, el);
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                isVisible
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.8, y: 20 }
              }
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
                delay: isVisible ? 0.1 : 0
              }}
              className="absolute z-20 pointer-events-auto"
              style={popup.position}
            >
              {/* Popup Box */}
              <div
                className={cn(
                  'backdrop-blur-md bg-white/90 rounded-lg p-3 shadow-lg',
                  'border border-gray-200/20',
                  'min-w-[140px] max-w-[200px]',
                  'hover:shadow-xl transition-shadow duration-300'
                )}
                style={{
                  boxShadow: fundaidTheme.shadows.md
                }}
              >
                {/* Label */}
                <div
                  className={cn(
                    'text-[10px] font-mono uppercase tracking-wider mb-1',
                    'opacity-60'
                  )}
                  style={{ color: accentColor }}
                >
                  {popup.label}
                </div>

                {/* Value */}
                <div
                  className="text-sm font-semibold leading-tight"
                  style={{ color: fundaidTheme.text.main }}
                >
                  {popup.value}
                </div>

                {/* Connection dot */}
                <div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: accentColor,
                    opacity: 0.6
                  }}
                />
              </div>

              {/* Pulse effect on appearance */}
              {isVisible && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    backgroundColor: accentColor,
                    filter: 'blur(8px)'
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Mobile indicator - show current stage info */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="backdrop-blur-md bg-white/90 rounded-lg p-4 shadow-lg"
        >
          <div
            className="text-xs font-mono uppercase tracking-wider mb-1 opacity-60"
            style={{ color: fundaidTheme.accents.teal }}
          >
            SCROLL PROGRESS
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${scrollProgress * 100}%`,
                  backgroundColor: fundaidTheme.accents.teal
                }}
              />
            </div>
            <span
              className="text-xs font-mono"
              style={{ color: fundaidTheme.text.muted }}
            >
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}