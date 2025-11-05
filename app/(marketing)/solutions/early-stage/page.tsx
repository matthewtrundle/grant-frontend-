"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sprout, TrendingUp, Target } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, QuoteCard } from "@/components/ui/abstract-cards";
import { CircuitBackground } from "@/components/ui/circuit-background";

export default function EarlyStagePage() {
  return (
    <div className="min-h-screen relative">
      <CircuitBackground
        density="low"
        glowColor="#8B5CF6"
        opacity={0.08}
        className="fixed inset-0 z-0"
      />
      {/* Hero - White */}
      <section className="section-light py-24 relative z-10 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-black text-white px-4 py-2 text-sm">Solutions for Early-Stage Companies</Badge>
            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              Grant Funding for <span className="accent-underline">Early-Stage Startups</span>
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Pre-seed and seed companies (TRL 2-5) can access $50K-$500K in SBIR Phase I, NSF I-Corps, and accelerator grants.
              Non-dilutive funding without traction requirements.
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
            <StatCard stat="$275K" label="SBIR Phase I" description="12 months funding" theme="light" />
            <StatCard stat="No Traction" label="Required" description="Technology-only evaluation" theme="light" />
            <StatCard stat="52%" label="Early-Stage Win Rate" description="Higher than VC acceptance" theme="light" />
          </motion.div>
        </div>
      </section>

      {/* Why Grants for Early Stage - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">Perfect for Pre-Revenue Companies</h2>
            <p className="text-xl body-white">Grants evaluate technology, not traction</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard title="No Revenue Required" description="VCs demand traction. Grants fund pure R&D. Perfect for deep tech needing 12-24 months to build MVP." number="01" theme="dark" />
            <OffsetCard title="Prototype Funding" description="$275K SBIR Phase I covers prototype development, testing, pilot customers. Bridge to product-market fit." number="02" theme="dark" />
            <OffsetCard title="Credibility Building" description="Grant win validates technology with federal reviewers. Easier follow-on VC fundraising." number="03" theme="dark" />
            <OffsetCard title="Customer Discovery" description="NSF I-Corps ($50K) funds 100 customer interviews. Learn market needs before building wrong product." number="04" theme="dark" />
          </div>
        </div>
      </section>

      {/* Success Story - White */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard quote="Pre-revenue, pre-product. Won NSF SBIR Phase I ($275K) with just a proof-of-concept. 12 months later we had an MVP and raised Series A. Grants made it possible." author="Alex Thompson" role="CEO, Quantum Sensors (now Series B)" theme="light" />
        </div>
      </section>

      {/* CTA - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl heading-white">Fund Your Early-Stage R&D</h2>
            <p className="text-xl body-white max-w-2xl mx-auto">Free profile. Find grants that don't require revenue or customers.</p>
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
