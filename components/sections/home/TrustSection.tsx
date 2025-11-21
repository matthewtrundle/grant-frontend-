/**
 * TrustSection Component
 *
 * Social proof section with logo wall and rotating testimonial carousel.
 * Demonstrates credibility through company logos and client testimonials.
 *
 * Animation Pattern:
 * - Logo wall with infinite marquee scroll
 * - Testimonial cards with auto-rotating carousel
 * - Fade transitions between testimonials (8s intervals)
 * - Logos desaturate/saturate on hover
 *
 * From PAGE_STRUCTURE.md Section 6: "trust"
 */

'use client';

import { motion } from 'framer-motion';
import { useStaggerReveal } from '@/hooks/animations/useStaggerReveal';
import LogoWall from '@/components/ui/logo-wall';
import { RotatingGrantStatements } from '@/components/ui/rotating-grant-statements';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "The AI-powered grant writing saved us 3 months of work. We went from idea to funded in 6 weeks.",
    author: "Dr. Sarah Chen",
    role: "CEO",
    company: "BioTech Innovations",
    industry: "Series A Startup",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "We've won 4 out of 5 grants we applied for using this platform. The assessor simulation is incredibly accurate.",
    author: "Michael Roberts",
    role: "Research Director",
    company: "MedDevice Labs",
    industry: "Medical Devices",
    avatar: "MR",
    rating: 5,
  },
  {
    quote: "Finally, grant writing that doesn't drain our entire R&D budget on consultants. The ROI is undeniable.",
    author: "Lisa Wong",
    role: "CTO",
    company: "CleanTech Solutions",
    industry: "Clean Energy",
    avatar: "LW",
    rating: 5,
  },
  {
    quote: "The TRL assessment alone was worth it - gave us clear roadmap for improving our grant eligibility.",
    author: "James Martinez",
    role: "Founder",
    company: "AI Robotics Co",
    industry: "Seed Stage",
    avatar: "JM",
    rating: 5,
  },
];

const awards = [
  { name: "Best AI Tool 2024", org: "TechCrunch" },
  { name: "Innovation Award", org: "SBIR Conference" },
  { name: "Top 10 Startups", org: "Y Combinator" },
];

export function TrustSection() {
  const testimonialsRef = useStaggerReveal('.testimonial-feature-card', {
    stagger: 0.15,
    from: { opacity: 0, y: 30 },
    duration: 0.6,
    ease: 'power2.out',
    start: 'top 70%',
  });

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-ocean-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-teal-100/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-ocean-700 to-teal-600 bg-clip-text text-transparent">
              Trusted by Innovative Companies
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            From early-stage startups to established research institutions
          </p>
        </motion.div>

        {/* Logo Wall */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <LogoWall />
        </motion.div>

        {/* Awards Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 mb-20"
        >
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-ocean-50 to-teal-50 rounded-full border border-ocean-200/50"
            >
              <Star className="w-5 h-5 text-ocean-600 fill-ocean-600" />
              <div className="text-sm">
                <div className="font-semibold text-gray-900">{award.name}</div>
                <div className="text-gray-600">{award.org}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
          >
            What Our Customers Say
          </motion.h3>

          <div ref={testimonialsRef} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="testimonial-feature-card group"
              >
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)' }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-2xl p-8 shadow-soft border border-gray-200/50 h-full"
                >
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-ocean-300 mb-4 opacity-40" />

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-500 to-teal-500 flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>

                    {/* Info */}
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </div>
                      <div className="text-xs text-gray-500">{testimonial.industry}</div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Rotating Grant Statements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <RotatingGrantStatements />
        </motion.div>
      </div>
    </section>
  );
}
