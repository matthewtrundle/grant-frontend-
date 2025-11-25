/**
 * IntroText - AI-Powered Grant Success feature showcase
 *
 * Design Philosophy:
 * - Clean grid of feature boxes highlighting AI capabilities
 * - Subtle gradient accents and hover effects
 * - Icons and metrics for visual interest
 * - Consistent with digilab aesthetic
 */

'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme-updated';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import {
  Brain,
  Search,
  FileText,
  TrendingUp,
  Shield,
  Zap,
  ChartBar,
  Users
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Feature data with AI capabilities
const aiFeatures = [
  {
    id: 1,
    icon: Brain,
    title: 'Multi-Agent Intelligence',
    description: 'Specialized AI agents for profiling, discovery, analysis, and writing',
    metric: '4 stages',
    color: fundaidTheme.accents.blue,
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
  },
  {
    id: 2,
    icon: Search,
    title: 'Smart Grant Matching',
    description: 'AI-powered discovery and scoring of relevant funding opportunities',
    metric: '92% match',
    color: fundaidTheme.accents.teal,
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #5EEAD4 100%)',
  },
  {
    id: 3,
    icon: FileText,
    title: 'RAG-Enhanced Writing',
    description: 'Generate winning proposals using successful grant examples',
    metric: '7.8/10 avg',
    color: fundaidTheme.accents.lavender,
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
  },
  {
    id: 4,
    icon: TrendingUp,
    title: 'Success Optimization',
    description: 'Continuous learning from assessor feedback and grant outcomes',
    metric: '40% win rate',
    color: fundaidTheme.accents.blueLight,
    gradient: 'linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%)',
  },
];

export function IntroText() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Set initial states
      gsap.set('.intro-header', { opacity: 0, y: 30 });
      gsap.set('.feature-box', { opacity: 0, y: 40, scale: 0.95 });
      gsap.set('.feature-icon', { scale: 0, rotation: -180 });

      // Header animation
      gsap.to('.intro-header', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Feature boxes staggered reveal
      gsap.to('.feature-box', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Icon animations
      gsap.to('.feature-icon', {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Hover animations
      const boxes = section.querySelectorAll('.feature-box');
      boxes.forEach((box) => {
        box.addEventListener('mouseenter', () => {
          gsap.to(box, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(box.querySelector('.feature-gradient'), {
            opacity: 1,
            duration: 0.3,
          });
        });

        box.addEventListener('mouseleave', () => {
          gsap.to(box, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(box.querySelector('.feature-gradient'), {
            opacity: 0.8,
            duration: 0.3,
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: fundaidTheme.backgrounds.page }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{
            background: fundaidTheme.accents.blue,
            opacity: 0.05,
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{
            background: fundaidTheme.accents.teal,
            opacity: 0.05,
          }}
        />
      </div>

      <div className={cn(fundaidTheme.spacing.container, 'relative')}>
        {/* Header Section */}
        <div className="intro-header max-w-4xl mx-auto text-center mb-16">
          <h2
            className={cn(fundaidTheme.typography.h2, 'mb-6')}
            style={{ color: fundaidTheme.text.main }}
          >
            AI-Powered Grant Success
          </h2>
          <p
            className="text-xl leading-relaxed"
            style={{ color: fundaidTheme.text.muted }}
          >
            FundAid combines advanced AI agents with grant expertise to help innovative companies
            win government funding. Our multi-stage system handles everything from assessment to submission.
          </p>
        </div>

        {/* Feature Boxes Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiFeatures.map((feature) => (
            <div
              key={feature.id}
              className="feature-box relative group cursor-pointer"
            >
              {/* Card Background */}
              <div
                className="relative p-6 h-full rounded-xl border transition-all duration-300"
                style={{
                  backgroundColor: fundaidTheme.backgrounds.panel,
                  borderColor: `${feature.color}20`,
                  boxShadow: fundaidTheme.shadows.sm,
                }}
              >
                {/* Gradient Overlay */}
                <div
                  className="feature-gradient absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
                  style={{
                    background: feature.gradient,
                    opacity: 0.03,
                  }}
                />

                {/* Icon Container */}
                <div className="feature-icon-container mb-4">
                  <div
                    className="feature-icon inline-flex p-3 rounded-lg"
                    style={{
                      background: feature.gradient,
                      boxShadow: `0 4px 20px ${feature.color}30`,
                    }}
                  >
                    <feature.icon
                      size={24}
                      style={{ color: fundaidTheme.text.onDark }}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: fundaidTheme.text.main }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: fundaidTheme.text.muted }}
                >
                  {feature.description}
                </p>

                {/* Metric Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={cn('text-xs font-mono px-2 py-1 rounded')}
                    style={{
                      backgroundColor: `${feature.color}15`,
                      color: feature.color,
                    }}
                  >
                    {feature.metric}
                  </span>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: feature.color,
                          opacity: 0.3 + (i * 0.2),
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"
                  style={{
                    background: feature.gradient,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Row */}
        <div className="mt-16 pt-16 border-t" style={{ borderColor: `${fundaidTheme.text.muted}20` }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'AI Agents', value: '12+', icon: Brain },
              { label: 'Grant Sources', value: '500+', icon: Search },
              { label: 'Success Rate', value: '40%', icon: ChartBar },
              { label: 'Active Users', value: '200+', icon: Users },
            ].map((stat, idx) => (
              <div key={idx} className="stat-item">
                <div className="flex justify-center mb-2">
                  <stat.icon
                    size={20}
                    style={{ color: fundaidTheme.accents.blue, opacity: 0.6 }}
                  />
                </div>
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: fundaidTheme.text.main }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs uppercase tracking-wider"
                  style={{ color: fundaidTheme.text.muted }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}