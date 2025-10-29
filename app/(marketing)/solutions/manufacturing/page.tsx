"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Factory, Cog, Cpu, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, QuoteCard } from "@/components/ui/abstract-cards";

export default function ManufacturingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero - White */}
      <section className="section-light py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-black text-white px-4 py-2 text-sm">Solutions for Manufacturing</Badge>
            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              Grant Funding for <span className="accent-underline">Advanced Manufacturing</span>
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl">
              NIST MEP, DOE advanced manufacturing, and DoD Manufacturing Innovation Institutes offer $250K-$10M+ for Industry 4.0,
              automation, and supply chain resilience.
            </p>
            <div className="flex gap-4 flex-wrap pt-4">
              <Link href="/sign-up">
                <Button size="lg" className="bg-accent hover:bg-accent-hover text-white px-8 py-6 text-lg">
                  Start Your Profile<ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <StatCard stat="$10M+" label="MII Awards" description="Manufacturing Innovation Institutes" theme="light" />
            <StatCard stat="40%" label="Manufacturing Win Rate" description="Our success rate" theme="light" />
            <StatCard stat="100+" label="Active Programs" description="Federal + state programs" theme="light" />
          </motion.div>
        </div>
      </section>

      {/* Programs - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">Manufacturing Grant Programs</h2>
            <p className="text-xl body-white">Federal and state innovation funding</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard title="NIST MEP" description="$500K-$5M for manufacturing technology adoption. Automation, AI/ML, cybersecurity, supply chain optimization." number="01" theme="dark" />
            <OffsetCard title="DoD MII Programs" description="$2M-$10M through Manufacturing USA institutes. Additive manufacturing, robotics, photonics, biofabrication." number="02" theme="dark" />
            <OffsetCard title="DOE Advanced Mfg" description="$1M-$15M for energy-efficient processes. Carbon fiber, batteries, semiconductors, critical materials." number="03" theme="dark" />
            <OffsetCard title="State Incentives" description="Tax credits + grants from OH, MI, NC, TX. Reshoring, workforce development, capital equipment." number="04" theme="dark" />
          </div>
        </div>
      </section>

      {/* Success Story - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard quote="Won NIST MEP grant ($2.1M) for robotic assembly automation. Cut our application time from 3 months to 2 weeks. The budget validation was clutch." author="James Rodriguez" role="VP Operations, Precision Components Inc" theme="light" />
        </div>
      </section>

      {/* CTA - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl heading-white">Modernize Your Manufacturing</h2>
            <p className="text-xl body-white max-w-2xl mx-auto">Free profile. Find NIST, DoD, DOE manufacturing grants.</p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg">
                Create Free Profile<ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
