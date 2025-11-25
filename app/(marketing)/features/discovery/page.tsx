"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, Target, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, FloatingContentCard, MinimalIconCard, SplitCard } from "@/components/ui/abstract-cards";
import { DNABackground } from "@/components/ui/dna-background";

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen relative">
      <DNABackground
        density="medium"
        glowColor="#14B8A6"
        pattern="molecular"
        opacity={0.12}
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
              Stage 2 • FREE
            </Badge>

            <h1 className="text-5xl md:text-7xl font-playfair heading-black max-w-4xl">
              AI-Powered <span className="accent-underline">Grant Discovery</span>
            </h1>

            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Find matching NIH, FDA, and CDC grants with intelligent search, automated fit scoring, and ranked
              recommendations. Your perfect healthcare funding opportunity is waiting.
            </p>

            <div className="flex gap-4 flex-wrap pt-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-6 text-lg"
                >
                  Discover Grants
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StatCard
              stat="1000+"
              label="Healthcare Grants"
              description="NIH, FDA, CDC, and private funding sources"
              theme="light"
            />
            <StatCard
              stat="0-100"
              label="Fit Score"
              description="AI-calculated match probability"
              theme="light"
            />
            <StatCard
              stat="5 min"
              label="Search Time"
              description="From query to ranked results"
              theme="light"
            />
          </motion.div>
        </div>
      </section>

      {/* How Discovery Works Section - Black Background */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Smart Grant Matching
            </h2>
            <p className="text-xl body-white">
              Multi-factor analysis finds grants you can actually win
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard
              title="TRL Matching"
              description="Filters out grants requiring different technology readiness levels. Only see opportunities that match your development stage."
              number="01"
              theme="dark"
            />

            <OffsetCard
              title="Clinical & Regulatory Alignment"
              description="Cross-references your technology with grant focus areas. Biotech innovations match with NIH SBIR/STTR, medical devices with FDA CDRH grants, not generic manufacturing opportunities."
              number="02"
              theme="dark"
            />

            <OffsetCard
              title="Award Size Fit"
              description="Considers your funding needs and project scope. Small startups aren't matched with $10M+ enterprise grants."
              number="03"
              theme="dark"
            />

            <OffsetCard
              title="Eligibility Check"
              description="Verifies company age, revenue, location, and other hard requirements before showing you the grant."
              number="04"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Fit Scoring Section - White Background */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              Understanding Fit Scores
            </h2>
            <p className="text-xl body-black">
              Our AI calculates a 0-100 match score for every grant
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FloatingContentCard theme="light" elevation="subtle">
              <div className="text-center space-y-4">
                <div className="text-5xl font-black heading-black">80-100</div>
                <h3 className="text-xl font-bold">Excellent Match</h3>
                <p className="text-sm body-black">
                  High probability of success. All key criteria met, strong alignment with grant objectives.
                </p>
                <Badge className="bg-green-600 text-white">Recommended</Badge>
              </div>
            </FloatingContentCard>

            <FloatingContentCard theme="light" elevation="subtle">
              <div className="text-center space-y-4">
                <div className="text-5xl font-black heading-black">60-79</div>
                <h3 className="text-xl font-bold">Good Match</h3>
                <p className="text-sm body-black">
                  Solid fit with minor gaps. Worth applying if you can address missing elements in your proposal.
                </p>
                <Badge className="bg-yellow-600 text-white">Consider</Badge>
              </div>
            </FloatingContentCard>

            <FloatingContentCard theme="light" elevation="subtle">
              <div className="text-center space-y-4">
                <div className="text-5xl font-black heading-black">0-59</div>
                <h3 className="text-xl font-bold">Weak Match</h3>
                <p className="text-sm body-black">
                  Significant misalignment. Better opportunities exist. Save time for stronger matches.
                </p>
                <Badge className="bg-gray-600 text-white">Skip</Badge>
              </div>
            </FloatingContentCard>
          </div>
        </div>
      </section>

      {/* Search Features Section - Black Background */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Advanced Search Features
            </h2>
            <p className="text-xl body-white">
              Filter, sort, and discover the perfect grants
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MinimalIconCard
              icon={<Search className="w-10 h-10" />}
              label="Keyword Search - Technology, industry, research focus"
              theme="dark"
            />
            <MinimalIconCard
              icon={<Target className="w-10 h-10" />}
              label="TRL Filtering - Match your development stage"
              theme="dark"
            />
            <MinimalIconCard
              icon={<TrendingUp className="w-10 h-10" />}
              label="Award Range - $10K to $10M+ funding"
              theme="dark"
            />
            <MinimalIconCard
              icon={<Sparkles className="w-10 h-10" />}
              label="Smart Sorting - Best fit, newest, closing soon"
              theme="dark"
            />
          </div>

          <div className="mt-16">
            <SplitCard
              splitDirection="horizontal"
              leftContent={
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Free Forever</h3>
                  <p className="text-gray-300">
                    Grant discovery remains free after profile creation. Search unlimited grants, get fit scores,
                    and download grant summaries at no cost.
                  </p>
                </div>
              }
              rightContent={
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-black">Lead Magnet</h3>
                  <p className="text-gray-700">
                    We provide free discovery to demonstrate value. When you find the perfect grant,
                    upgrade to Stage 3 for deep analysis or Stage 4 for complete application generation.
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Benefits Section - White Background */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl heading-black mb-12 text-center">
            Why Manual Grant Search Fails
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">Time Waste:</strong>
                <span className="body-black ml-2">
                  Researchers spend 40+ hours searching grants.gov, missing private funding opportunities entirely.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">Poor Matches:</strong>
                <span className="body-black ml-2">
                  Without AI scoring, you waste time applying to grants you can't win due to TRL or eligibility mismatches.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">Missed Deadlines:</strong>
                <span className="body-black ml-2">
                  Manual tracking fails. Our system alerts you 30 days before deadlines for high-fit grants.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">Limited Sources:</strong>
                <span className="body-black ml-2">
                  Most searches only check grants.gov. We cover 50+ federal agencies, state programs, and private foundations.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Black Background */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl heading-white">
              Find Your Perfect Grant Today
            </h2>
            <p className="text-xl body-white max-w-2xl mx-auto">
              Complete Stage 1 profile, then access unlimited grant discovery for free.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg"
              >
                Start Searching Grants
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
