/**
 * PricingTeaser Component
 *
 * Simplified pricing overview with 3-tier structure.
 * Links to full pricing page for detailed comparisons.
 *
 * Animation Pattern:
 * - Cards scale up and fade in with stagger
 * - Hover effects with shadow lift and gradient glow
 * - Featured tier (Stage 4) has premium treatment
 * - CTA buttons with magnetic effect
 *
 * From PAGE_STRUCTURE.md Section 7: "pricing-teaser"
 */

'use client';

import { motion } from 'framer-motion';
import { useStaggerReveal } from '@/hooks/animations/useStaggerReveal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const pricingTiers = [
  {
    name: 'Free Profile',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with grant applications',
    features: [
      'TRL Assessment',
      'Company Profile Creation',
      'Grant Discovery & Fit Scoring',
      'PDF Report Download',
      'Basic Support',
    ],
    cta: 'Start Free',
    href: '/onboarding',
    color: 'from-green-500 to-emerald-500',
    featured: false,
  },
  {
    name: 'Grant Analysis',
    price: '$199',
    period: 'per grant',
    description: 'Deep RFP analysis before you start writing',
    features: [
      'Everything in Free',
      'RFP Parsing & Analysis',
      'Timeline Extraction',
      'Budget Breakdown',
      'Compliance Checking',
      'Priority Support',
    ],
    cta: 'Analyze Grant',
    href: '/pricing',
    color: 'from-ocean-500 to-teal-500',
    featured: false,
  },
  {
    name: 'Full Application',
    price: '$999',
    period: 'per grant',
    description: 'Complete AI-powered grant writing with expert simulation',
    features: [
      'Everything in Analysis',
      '12 Specialized AI Agents',
      'RAG-Powered Examples',
      '3-Assessor Simulation',
      'Iterative Refinement',
      'Quality Guarantee (7+/10)',
      'Dedicated Support',
    ],
    cta: 'Get Started',
    href: '/pricing',
    color: 'from-purple-500 via-ocean-500 to-teal-500',
    featured: true,
    badge: 'Most Popular',
  },
];

export function PricingTeaser() {
  const cardsRef = useStaggerReveal('.pricing-card', {
    stagger: 0.15,
    from: { opacity: 0, y: 40, scale: 0.95 },
    duration: 0.7,
    ease: 'back.out(1.2)',
    start: 'top 70%',
  });

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-ocean-100/50 to-transparent rounded-full blur-3xl" />
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
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Start free, upgrade only when you need advanced features
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className="pricing-card group"
            >
              <motion.div
                whileHover={{
                  y: tier.featured ? -12 : -8,
                  boxShadow: tier.featured
                    ? '0 20px 60px rgba(0, 0, 0, 0.2)'
                    : '0 12px 40px rgba(0, 0, 0, 0.15)',
                }}
                transition={{ duration: 0.3 }}
                className={`relative bg-white rounded-3xl p-8 shadow-soft border h-full flex flex-col ${
                  tier.featured
                    ? 'border-ocean-300 ring-2 ring-ocean-200'
                    : 'border-gray-200/50'
                }`}
              >
                {/* Featured Badge */}
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge
                      className={`bg-gradient-to-r ${tier.color} text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-lg flex items-center gap-1.5`}
                    >
                      <Sparkles className="w-4 h-4" />
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                {/* Top Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.color} rounded-t-3xl`} />

                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-2">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                      {tier.price}
                    </span>
                    <span className="text-gray-600">/ {tier.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {tier.description}
                </p>

                {/* CTA Button */}
                <Link href={tier.href} className="block mb-8">
                  <Button
                    className={`w-full py-6 text-lg font-semibold transition-all duration-300 group/btn ${
                      tier.featured
                        ? `bg-gradient-to-r ${tier.color} text-white hover:shadow-accent hover:scale-105`
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                {/* Features List */}
                <div className="space-y-3 flex-grow">
                  {tier.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          tier.featured ? 'text-ocean-600' : 'text-green-600'
                        }`}
                      />
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl pointer-events-none`} />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-lg text-gray-600 mb-4">
            Need a custom plan for your organization?
          </p>
          <Link href="/pricing">
            <Button
              variant="outline"
              size="lg"
              className="text-ocean-700 border-ocean-300 hover:bg-ocean-50 group/link"
            >
              View Detailed Pricing
              <ArrowRight className="ml-2 w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
