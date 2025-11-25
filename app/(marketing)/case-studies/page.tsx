"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { StatCard, QuoteCard, OffsetCard } from "@/components/ui/abstract-cards";
import { DNABackground } from "@/components/ui/dna-background";

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen relative">
      <DNABackground
        density="medium"
        glowColor="#14B8A6"
        pattern="molecular"
        opacity={0.12}
        className="fixed inset-0 z-0"
      />
      {/* Hero - White */}
      <section className="section-light py-24 relative z-10 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-black text-white px-4 py-2 text-sm">Case Studies</Badge>
            <h1 className="text-5xl md:text-7xl font-playfair heading-black max-w-4xl">
              <span className="accent-underline">Success Stories</span> from Our Customers
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Real healthcare innovators, real results. See how we helped 300+ biotech and medtech companies secure $50M+ in NIH, FDA, and CDC funding.
            </p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <StatCard stat="$50M+" label="Healthcare Funding Secured" description="NIH, FDA, CDC grants" theme="light" />
            <StatCard stat="300+" label="Biotech & Medtech Companies" description="Since 2024" theme="light" />
            <StatCard stat="40%" label="Average Win Rate" description="vs. 18% industry average" theme="light" />
          </motion.div>
        </div>
      </section>

      {/* Case Study 1 - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <Badge className="bg-purple-950 text-purple-300 border border-ocean-600/30 mb-4">Healthcare AI</Badge>
            <h2 className="text-4xl heading-white mb-4">CardioAI Diagnostics: $2.1M NIH SBIR</h2>
            <p className="text-xl body-white">From pre-revenue to Phase II funding in 18 months</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard title="The Challenge" description="Early-stage healthcare AI company. No revenue, no clinical trials. Needed funding to build FDA-compliant prototype. Traditional consultants wanted $15K." number="01" theme="dark" />
            <OffsetCard title="The Solution" description="Used platform to generate Phase I application ($275K) in 2 weeks. Won funding. 12 months later, Phase II application ($1.9M) generated in 48 hours. Won again." number="02" theme="dark" />
          </div>
          <div className="mt-12">
            <QuoteCard quote="Won Phase I and Phase II using this platform. Total investment: $1,198. Total funding secured: $2.175M. ROI: 181,533%. Best decision we ever made." author="Dr. Lisa Chen" role="Founder & CEO, CardioAI Diagnostics" theme="dark" />
          </div>
        </div>
      </section>

      {/* Case Study 2 - White */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <Badge className="bg-gray-200 text-black mb-4">Medical Devices</Badge>
            <h2 className="text-4xl heading-black mb-4">NeuroPulse Medical: $1.8M FDA CDRH Grant</h2>
            <p className="text-xl body-black">Device startup navigates complex FDA regulatory pathway</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard title="The Challenge" description="Early-stage neurotech company with novel implantable device. Complex FDA pathway (510(k) vs PMA). Traditional regulatory consultants wanted $25K+ for grant application alone." number="01" theme="light" />
            <OffsetCard title="The Solution" description="Platform identified FDA CDRH grant opportunity, validated regulatory strategy, and generated compliant application in 3 weeks. Included clinical trial protocol and FDA submission timeline. Won $1.8M." number="02" theme="light" />
          </div>
          <div className="mt-12">
            <QuoteCard quote="The platform understood our FDA regulatory pathway better than our previous consultant. Saved us $24K in consulting fees and won us $1.8M. Now we can afford proper clinical trials." author="Dr. James Martinez" role="CEO, NeuroPulse Medical" theme="light" />
          </div>
        </div>
      </section>

      {/* CTA - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl heading-white">Your Healthcare Success Story Starts Here</h2>
            <p className="text-xl body-white max-w-2xl mx-auto">Join 300+ funded biotech and medtech companies. Create your free profile today.</p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg">Create Free Profile<ArrowRight className="ml-2 w-5 h-5" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
