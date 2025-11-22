/**
 * AnimationTestPanel - Debug panel for testing GSAP ScrollTrigger animations
 *
 * This component provides a floating panel to test and verify all animations.
 * Only shows in development mode.
 */

'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollTriggerDebug } from '@/hooks/gsap/useScrollTriggerDebug';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AnimationTestPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [debugEnabled, setDebugEnabled] = useState(false);
  const [triggers, setTriggers] = useState<any[]>([]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Enable debug hook
  useScrollTriggerDebug(debugEnabled);

  useEffect(() => {
    const updateTriggers = () => {
      const allTriggers = ScrollTrigger.getAll();
      setTriggers(
        allTriggers.map(trigger => ({
          element: trigger.vars.trigger?.className || trigger.vars.trigger?.tagName || 'Unknown',
          start: trigger.vars.start,
          end: trigger.vars.end,
          progress: Math.round(trigger.progress * 100),
          isActive: trigger.isActive,
        }))
      );
    };

    // Update on scroll
    const handleScroll = () => {
      requestAnimationFrame(updateTriggers);
    };

    window.addEventListener('scroll', handleScroll);
    updateTriggers(); // Initial update

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[9999] bg-black text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
        style={{ fontFamily: 'monospace' }}
      >
        🎯 Animations ({triggers.length})
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-[9998] bg-white border-2 border-black rounded-lg shadow-xl p-4 max-w-md max-h-[70vh] overflow-y-auto">
          <h3 className="font-bold text-lg mb-4">ScrollTrigger Animations</h3>

          {/* Debug Toggle */}
          <div className="mb-4 p-3 bg-gray-100 rounded">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={debugEnabled}
                onChange={(e) => setDebugEnabled(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">
                {debugEnabled ? '🔴 Markers ON' : '⚪ Markers OFF'}
              </span>
            </label>
            <p className="text-xs text-gray-600 mt-1">
              Enable to show scroll markers for all animations
            </p>
          </div>

          {/* Animation Status */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase text-gray-600">
              Active Triggers ({triggers.filter(t => t.isActive).length}/{triggers.length})
            </h4>

            {triggers.length === 0 ? (
              <p className="text-gray-500 text-sm">No animations detected</p>
            ) : (
              <div className="space-y-2">
                {triggers.map((trigger, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded text-xs font-mono ${
                      trigger.isActive ? 'bg-green-100 border border-green-300' : 'bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold">{trigger.element}</div>
                    <div className="text-gray-600">
                      Progress: {trigger.progress}% | {trigger.start} → {trigger.end}
                    </div>
                    <div className={trigger.isActive ? 'text-green-600' : 'text-gray-400'}>
                      {trigger.isActive ? '✅ Active' : '⏸️ Inactive'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t space-y-2">
            <button
              onClick={() => {
                ScrollTrigger.refresh();
                console.log('ScrollTrigger refreshed');
              }}
              className="w-full px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              🔄 Refresh ScrollTriggers
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              ⬆️ Scroll to Top
            </button>
            <button
              onClick={() => {
                const sections = [
                  '.mission-content',
                  '.hero-image',
                  '.grant-circle-content',
                  '.success-card',
                  '.cta-content',
                ];
                sections.forEach(selector => {
                  const el = document.querySelector(selector);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                });
              }}
              className="w-full px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
            >
              🎬 Test All Sections
            </button>
          </div>

          {/* Animation Checklist */}
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-sm uppercase text-gray-600 mb-2">
              Animation Checklist
            </h4>
            <div className="space-y-1 text-xs">
              <div>✅ Duration: 1200ms (power2.out)</div>
              <div>✅ No bounce/elastic/back easing</div>
              <div>✅ toggleActions: 'play none none none'</div>
              <div>✅ Subtle movement (y: 30px max)</div>
              <div>✅ Fire once, no reversal</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}