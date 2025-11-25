/**
 * MissionSectionUpdated - Continues blue theme from hero
 *
 * Changes:
 * - White background with blue gradient accents
 * - Better visual hierarchy
 * - Improved SVG icon usage
 * - Subtle animations for polish
 */

'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { fundaidTheme } from '@/lib/digilab-theme-updated';
import { useGSAP } from '@/hooks/gsap/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animated SVG Icons for mission pillars
const MissionIcons = {
  speed: (
    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
      <path
        d="M32 12 L36 28 L48 32 L36 36 L32 52 L28 36 L16 32 L28 28 Z"
        fill="url(#speed-gradient)"
        opacity="0.8"
      />
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <defs>
        <linearGradient id="speed-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
    </svg>
  ),
  accuracy: (
    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <circle cx="32" cy="32" r="6" fill="url(#accuracy-gradient)"/>
      <path d="M32 8 L32 16 M32 48 L32 56 M8 32 L16 32 M48 32 L56 32" stroke="currentColor" strokeWidth="2"/>
      <defs>
        <linearGradient id="accuracy-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
  ),
  intelligence: (
    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
      <path
        d="M32 8 C24 8 20 16 20 24 C20 32 24 36 24 44 L40 44 C40 36 44 32 44 24 C44 16 40 8 32 8 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="url(#intelligence-gradient)"
        opacity="0.8"
      />
      <path d="M24 44 L40 44 L38 52 L26 52 Z" fill="currentColor" opacity="0.4"/>
      <path d="M28 20 L36 20 M28 28 L36 28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <defs>
        <linearGradient id="intelligence-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
    </svg>
  ),
};

interface MissionPillar {
  title: string;
  description: string;
  icon: keyof typeof MissionIcons;
  stats: string;
}

const missionPillars: MissionPillar[] = [
  {
    title: '14-Day Grant Wins',
    description: 'From company profile to submitted application in two weeks, not six months.',
    icon: 'speed',
    stats: '92% faster than manual',
  },
  {
    title: '95% Accuracy Rate',
    description: 'AI-powered extraction and validation ensures perfect compliance every time.',
    icon: 'accuracy',
    stats: 'Zero compliance errors',
  },
  {
    title: 'Multi-Agent Intelligence',
    description: 'Specialized AI agents collaborate to write, review, and optimize your responses.',
    icon: 'intelligence',
    stats: '7+/10 assessor scores',
  },
];

export function MissionSectionUpdated() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Fade in animation on scroll
      gsap.fromTo(
        '.mission-content',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stagger pillars animation
      gsap.fromTo(
        '.mission-pillar',
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mission-pillars',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Icon rotation on hover setup
      document.querySelectorAll('.pillar-icon').forEach((icon) => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            rotation: 360,
            duration: 0.8,
            ease: 'power2.inOut',
          });
        });
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            rotation: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(239,246,255,0.2) 50%, transparent 100%)'
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.05) 0%, transparent 70%)',
            transform: 'translate(50%, 50%)',
          }}
        />
      </div>

      <div className={cn(fundaidTheme.spacing.section, 'relative')}>
        <div className={fundaidTheme.spacing.container}>
          {/* Main content */}
          <div className="mission-content text-center mb-16">
            {/* Eyebrow text */}
            <p
              className="text-sm uppercase tracking-wider mb-4"
              style={{ color: fundaidTheme.accents.blue }}
            >
              Our Mission
            </p>

            {/* Main heading with gradient */}
            <h2
              className={cn(fundaidTheme.typography.h2, 'mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent')}
            >
              Stop Writing Grants.
              <br />
              Start Winning Them.
            </h2>

            {/* Subheading */}
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: fundaidTheme.text.muted }}
            >
              We're revolutionizing grant applications with AI agents that understand your technology,
              find perfect matches, and write winning proposals in days, not months.
            </p>
          </div>

          {/* Mission pillars grid */}
          <div className="mission-pillars grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {missionPillars.map((pillar, index) => (
              <div
                key={index}
                className="mission-pillar group relative"
              >
                <div
                  className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.9) 100%)',
                  }}
                >
                  {/* Icon */}
                  <div className="pillar-icon flex justify-center mb-6 text-blue-600 group-hover:text-purple-600 transition-colors">
                    {MissionIcons[pillar.icon]}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: fundaidTheme.text.main }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm mb-4"
                    style={{ color: fundaidTheme.text.muted }}
                  >
                    {pillar.description}
                  </p>

                  {/* Stats badge */}
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  >
                    {pillar.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial / Social Proof Section */}
          <div className="mission-content mt-20">
            <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl p-12 border border-gray-200/50">
              <div className="text-center mb-8">
                <p className="text-lg font-semibold mb-2" style={{ color: fundaidTheme.text.main }}>
                  Trusted by Research Teams Worldwide
                </p>
                <p className="text-sm" style={{ color: fundaidTheme.text.muted }}>
                  Join scientists and founders who've streamlined their grant process
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { value: '12+', label: 'AI Agents', sublabel: 'Working in parallel' },
                  { value: '500+', label: 'Grant Sources', sublabel: 'Scanned daily' },
                  { value: '40%', label: 'Success Rate', sublabel: 'From submissions' },
                  { value: '200+', label: 'Active Users', sublabel: 'And growing' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm">
                    <div className="text-3xl font-black mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold mb-1" style={{ color: fundaidTheme.text.main }}>
                      {stat.label}
                    </div>
                    <div className="text-xs" style={{ color: fundaidTheme.text.muted }}>
                      {stat.sublabel}
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Quote */}
              <div className="text-center max-w-2xl mx-auto">
                <svg className="w-8 h-8 mx-auto mb-4 opacity-30" style={{ color: fundaidTheme.accents.blue }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-base italic mb-4" style={{ color: fundaidTheme.text.main }}>
                  "FundAid reduced our grant writing time from 3 months to under 2 weeks. The AI understands our technology better than most consultants."
                </p>
                <p className="text-sm font-medium" style={{ color: fundaidTheme.accents.blue }}>
                  Dr. Sarah Chen, CTO · BioTech Innovations
                </p>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="text-center mt-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <span className="relative z-10">See How It Works</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <p className="mt-4 text-sm text-gray-500">
              Free TRL assessment · No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionSectionUpdated;