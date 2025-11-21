"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Activity, Shield, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, FloatingContentCard, MinimalIconCard, QuoteCard } from "@/components/ui/abstract-cards";
import { CircuitBackground } from "@/components/ui/circuit-background";

export default function HealthcarePage() {
  return (
    <div className="min-h-screen relative">
      <CircuitBackground
        density="medium"
        glowColor="#3B82F6"
        opacity={0.10}
        className="fixed inset-0 z-0"
      />
      {/* Hero Section - White Background */}
      <section className="section-light py-24 relative z-10 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-black text-white px-4 py-2 text-sm">
              Solutions for Healthcare & Biotech
            </Badge>

            <h1 className="text-5xl md:text-7xl font-playfair heading-black max-w-4xl">
              Grant Funding for <span className="accent-underline">Healthcare Innovation</span>
            </h1>

            <p className="text-xl md:text-2xl body-black max-w-3xl">
              From NIH R01 to FDA medical device grants, healthcare companies can access $500K-$5M+ in
              non-dilutive funding. We navigate complex compliance and accelerate your research.
            </p>

            <div className="flex gap-4 flex-wrap pt-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-6 text-lg"
                >
                  Start Your Profile
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StatCard
              stat="$5M+"
              label="NIH R01 Grants"
              description="5-year research funding"
              theme="light"
            />
            <StatCard
              stat="48%"
              label="Healthcare Win Rate"
              description="With our platform"
              theme="light"
            />
            <StatCard
              stat="FDA"
              label="Grant Compliance"
              description="Built-in validation"
              theme="light"
            />
          </motion.div>
        </div>
      </section>

      {/* Top Healthcare Grants - Black Background */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Top Healthcare Grant Programs
            </h2>
            <p className="text-xl body-white">
              NIH, FDA, BARDA, and private foundations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard
              title="NIH SBIR/STTR"
              description="Phase I: $275K-$400K. Phase II: $1.8M-$3M. Best for diagnostic tools, therapeutics, medical devices. TRL 2-6."
              number="01"
              theme="dark"
            />

            <OffsetCard
              title="FDA MDIC Grants"
              description="$500K-$2M for regulatory science. Medical device innovation, clinical trial design, patient-centered outcomes research."
              number="02"
              theme="dark"
            />

            <OffsetCard
              title="BARDA Funding"
              description="$1M-$50M+ for pandemic preparedness. Vaccines, diagnostics, therapeutics targeting biodefense threats."
              number="03"
              theme="dark"
            />

            <OffsetCard
              title="Private Foundations"
              description="Gates Foundation, Chan Zuckerberg, Michael J. Fox Foundation. $100K-$5M for specific disease areas."
              number="04"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Healthcare-Specific Challenges - White Background */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              Healthcare Grant Complexity (Solved)
            </h2>
            <p className="text-xl body-black">
              Unique challenges in medical research funding
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MinimalIconCard
              icon={<Heart className="w-10 h-10" />}
              label="IRB Requirements - Human subjects compliance documentation"
              theme="light"
            />
            <MinimalIconCard
              icon={<Activity className="w-10 h-10" />}
              label="Clinical Trial Design - Endpoints, power analysis, protocols"
              theme="light"
            />
            <MinimalIconCard
              icon={<Shield className="w-10 h-10" />}
              label="FDA Pathway - 510(k), PMA, De Novo regulatory strategy"
              theme="light"
            />
            <MinimalIconCard
              icon={<CheckCircle2 className="w-10 h-10" />}
              label="Compliance Burden - GLP, GMP, HIPAA, 21 CFR Part 11"
              theme="light"
            />
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold heading-black mb-8">How We Help</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">IRB Documentation Templates:</strong>
                  <span className="body-black ml-2">
                    Pre-formatted consent forms, risk assessment tables, data management plans. Speeds IRB submission 10x.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">Clinical Trial Budget Calculator:</strong>
                  <span className="body-black ml-2">
                    Automated costing for patient recruitment, site fees, CRO oversight, data monitoring. Validates against NIH caps.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">FDA Regulatory Roadmap:</strong>
                  <span className="body-black ml-2">
                    Maps your device/drug to correct FDA pathway. Identifies required studies, timelines, costs for approval.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story - Black Background */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard
            quote="Won NIH SBIR Phase II ($1.9M) for our AI diagnostic tool. The platform handled all the clinical trial design sections—we never could have written those ourselves."
            author="Dr. Lisa Chen"
            role="Founder, CardioAI Diagnostics"
            theme="dark"
          />
        </div>
      </section>

      {/* CTA - White Background */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl heading-black">
              Accelerate Your Healthcare Research
            </h2>
            <p className="text-xl body-black max-w-2xl mx-auto">
              Free profile + TRL assessment. Find NIH, FDA, and private foundation grants.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg"
              >
                Create Free Profile
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
