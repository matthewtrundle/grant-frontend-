/**
 * ProblemSection Component
 *
 * Highlights the pain points of traditional grant applications.
 * Uses stagger reveals for pain point cards.
 *
 * Animation Pattern:
 * - Title fades in from bottom
 * - Pain point cards stagger-reveal left → right (0.2s delay)
 * - Cards have subtle float animation (continuous)
 *
 * From PAGE_STRUCTURE.md Section 2: "problem"
 */

'use client';

import { useStaggerReveal } from '@/hooks/animations/useStaggerReveal';
import { motion } from 'framer-motion';
import { Clock, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';

const painPoints = [
  {
    icon: Clock,
    title: '100+ Hours Wasted',
    description:
      'Most teams spend months researching, drafting, and revising. Your best people are stuck writing instead of innovating.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: TrendingDown,
    title: '15% Success Rate',
    description:
      'Industry average success rate is abysmal. Most applications get rejected for reasons you never see.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: DollarSign,
    title: '$10K+ in Consultant Fees',
    description:
      'Grant consultants charge premium rates but cannot guarantee results. You are burning capital on hope.',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    icon: AlertCircle,
    title: 'No Feedback Loop',
    description:
      'Rejected applications provide zero insight. You are flying blind, repeating the same mistakes.',
    color: 'from-yellow-500 to-red-500',
  },
];

export function ProblemSection() {
  const cardsRef = useStaggerReveal('.pain-card', {
    stagger: 0.2,
    from: { opacity: 0, y: 40 },
    duration: 0.8,
    ease: 'power3.out',
    start: 'top 75%',
  });

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-red-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-orange-100/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              The Grant Application Nightmare
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Why do <span className="font-bold text-red-600">85%</span> of applications fail?
          </p>
        </motion.div>

        {/* Pain Points Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {painPoints.map((point, idx) => (
            <div
              key={idx}
              className="pain-card group relative"
            >
              {/* Card Background with Hover Effect */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-2xl p-8 shadow-soft border border-gray-200/50 overflow-hidden h-full"
              >
                {/* Top Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${point.color}`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <point.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {point.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-gray-600 leading-relaxed">
                  {point.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </motion.div>

              {/* Floating Animation */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.2,
                }}
                className="absolute inset-0 pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Traditional grant writing is{' '}
            <span className="font-bold text-red-600">broken</span>. Our AI-powered
            platform fixes every one of these problems.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
