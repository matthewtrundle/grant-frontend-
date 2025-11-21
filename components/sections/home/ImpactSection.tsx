/**
 * ImpactSection Component
 *
 * Impact & ROI section with animated scroll counters and testimonial cards.
 * Implements scroll-triggered number animations using useScrollCounter hook.
 *
 * Animation Pattern:
 * - Counters animate from 0 → target value when 60% in viewport
 * - Staggered start (0.1s delay between each)
 * - Power3.out easing for smooth deceleration
 * - Testimonial cards fade in with stagger
 *
 * From PAGE_STRUCTURE.md Section 5: "impact"
 */

'use client';

import { useScrollCounter } from '@/hooks/animations/useScrollCounter';
import { useStaggerReveal } from '@/hooks/animations/useStaggerReveal';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const stats = [
  {
    value: 40,
    suffix: '%',
    label: 'Success Rate',
    description: 'Higher than industry average',
    color: 'from-teal-200 to-ocean-200',
  },
  {
    value: 100,
    suffix: '+',
    label: 'Hours Saved',
    description: 'Per application',
    color: 'from-purple-200 to-teal-200',
  },
  {
    value: 10000,
    suffix: '+',
    label: 'Grants Won',
    description: 'In total funding secured',
    color: 'from-ocean-200 to-purple-200',
    formatter: (value: number) => {
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}K+`;
      }
      return `$${value}`;
    },
  },
];

const testimonials = [
  {
    quote: "The AI-powered grant writing saved us 3 months of work. We went from idea to funded in 6 weeks.",
    author: "Dr. Sarah Chen",
    role: "CEO, BioTech Innovations",
    company: "Series A Startup",
  },
  {
    quote: "We've won 4 out of 5 grants we applied for using this platform. The assessor simulation is incredibly accurate.",
    author: "Michael Roberts",
    role: "Research Director",
    company: "MedDevice Labs",
  },
  {
    quote: "Finally, grant writing that doesn't drain our entire R&D budget on consultants. The ROI is undeniable.",
    author: "Lisa Wong",
    role: "CTO",
    company: "CleanTech Solutions",
  },
];

export function ImpactSection() {
  const counter1Ref = useScrollCounter({
    targetValue: stats[0].value,
    suffix: stats[0].suffix,
    decimals: 0,
    duration: 2,
    ease: 'power3.out',
  });

  const counter2Ref = useScrollCounter({
    targetValue: stats[1].value,
    suffix: stats[1].suffix,
    decimals: 0,
    duration: 2,
    ease: 'power3.out',
  });

  const counter3Ref = useScrollCounter({
    targetValue: stats[2].value,
    suffix: '+',
    decimals: 0,
    duration: 2,
    ease: 'power3.out',
    formatter: stats[2].formatter,
  });

  const testimonialRef = useStaggerReveal('.testimonial-card', {
    stagger: 0.15,
    from: { opacity: 0, y: 30 },
    duration: 0.6,
    ease: 'power2.out',
  });

  const counterRefs = [counter1Ref, counter2Ref, counter3Ref];

  return (
    <section className="py-32 bg-gradient-to-br from-ocean-900 via-teal-900 to-ocean-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,200,200,0.3),transparent)]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-teal-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Real Results, Measurable Impact
          </h2>
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto">
            Companies using our platform win more grants in less time
          </p>
        </motion.div>

        {/* Stats Grid with Counters */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: 'backOut',
              }}
              className="relative"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl" />

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Animated Counter */}
                <div
                  ref={counterRefs[idx]}
                  className={`text-6xl md:text-7xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                >
                  0{stat.suffix}
                </div>

                {/* Label */}
                <div className="text-2xl font-semibold mb-2">{stat.label}</div>

                {/* Description */}
                <div className="text-teal-200">{stat.description}</div>

                {/* Pulse Animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Trusted by Innovative Teams
          </motion.h3>

          <div ref={testimonialRef} className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="testimonial-card relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-teal-300 mb-4 opacity-50" />

                {/* Quote */}
                <p className="text-lg text-white/90 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="border-t border-white/10 pt-4">
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-teal-200">{testimonial.role}</div>
                  <div className="text-sm text-white/60">{testimonial.company}</div>
                </div>

                {/* Accent Border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-purple-400 rounded-t-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
