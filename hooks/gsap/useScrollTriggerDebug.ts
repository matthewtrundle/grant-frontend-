/**
 * useScrollTriggerDebug - Debug hook for GSAP ScrollTrigger animations
 *
 * Use this hook to verify all ScrollTrigger animations are working properly.
 * It logs all triggers and their states to the console.
 */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollTriggerDebug(enabled = false) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Log all active ScrollTriggers
    const logTriggers = () => {
      const triggers = ScrollTrigger.getAll();
      console.group('🎯 ScrollTrigger Debug Info');
      console.log(`Total triggers: ${triggers.length}`);

      triggers.forEach((trigger, index) => {
        const vars = trigger.vars;
        console.group(`Trigger ${index + 1}`);
        console.log('Element:', vars.trigger);
        console.log('Start:', vars.start);
        console.log('End:', vars.end);
        console.log('Progress:', trigger.progress);
        console.log('Is Active:', trigger.isActive);
        console.log('Direction:', trigger.direction);
        if (vars.id) console.log('ID:', vars.id);
        console.groupEnd();
      });

      console.groupEnd();
    };

    // Log on mount
    logTriggers();

    // Log on scroll
    const handleScroll = () => {
      requestAnimationFrame(logTriggers);
    };

    // Debounce scroll logging
    let scrollTimeout: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 500);
    };

    window.addEventListener('scroll', debouncedScroll);

    // Add visual markers for all triggers
    if (enabled) {
      ScrollTrigger.getAll().forEach(trigger => {
        // Enable markers temporarily for debugging
        trigger.vars.markers = true;
      });

      // Refresh all triggers
      ScrollTrigger.refresh();
    }

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(scrollTimeout);

      // Disable markers on cleanup
      if (enabled) {
        ScrollTrigger.getAll().forEach(trigger => {
          trigger.vars.markers = false;
        });
        ScrollTrigger.refresh();
      }
    };
  }, [enabled]);
}