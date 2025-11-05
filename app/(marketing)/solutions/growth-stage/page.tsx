"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Rocket, Award } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, QuoteCard } from "@/components/ui/abstract-cards";
import { CircuitBackground } from "@/components/ui/circuit-background";

export default function GrowthStagePage() {
  return (
    <div className="min-h-screen relative">
      <CircuitBackground
        density="medium"
        glowColor="#6C47FF"
        opacity={0.10}
        className="fixed inset-0 z-0"
      />
      {/* Hero - White */}
      <section className="section-light py-24 relative z-10 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-black text-white px-4 py-2 text-sm">Solutions for Growth-Stage Companies</Badge>
            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              Grant Funding for <span className="accent-underline">Growth-Stage Scale</span>
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Series A-C companies (TRL 6-8) can access $1M-$25M in SBIR Phase II+, DOE scale-up, and commercialization grants.
              Non-dilutive capital to accelerate market expansion.
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
            <StatCard stat="$25M+" label="DOE Scale-Up" description="Commercialization funding" theme="light" />
            <StatCard stat="$2M" label="SBIR Phase II" description="24-month awards" theme="light" />
            <StatCard stat="38%" label="Growth-Stage Win Rate" description="With proven traction" theme="light" />
          </motion.div>
        </div>
      </section>

      {/* Programs - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">Growth-Stage Grant Programs</h2>
            <p className="text-xl body-white">Scale production without dilution</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard title="SBIR Phase II" description="$1.8M-$3M for product refinement and pilot production. Follows successful Phase I. TRL 5-7." number="01" theme="dark" />
            <OffsetCard title="DOE Scale-Up Grants" description="$5M-$25M for manufacturing scale-up. Clean energy, advanced materials, critical minerals. TRL 7-8." number="02" theme="dark" />
            <OffsetCard title="ARPA-E Bridge" description="$10M-$50M+ for commercialization of breakthrough technologies. Follows successful ARPA-E Phase I/II." number="03" theme="dark" />
            <OffsetCard title="State Expansion Grants" description="$500K-$5M for facility expansion, job creation, market entry. Available in 30+ states." number="04" theme="dark" />
          </div>
        </div>
      </section>

      {/* Success Story - White */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard quote="Post-Series A, we won DOE scale-up grant ($8.5M). Extended our runway by 18 months without dilution. Reached profitability before needing Series B." author="Priya Patel" role="CFO, Battery Tech Inc (now profitable)" theme="light" />
        </div>
      </section>

      {/* CTA - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl heading-white">Scale Without Dilution</h2>
            <p className="text-xl body-white max-w-2xl mx-auto">Free profile. Find scale-up and commercialization grants.</p>
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
