"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Rocket, Code, Zap, CheckCircle2, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, FloatingContentCard, MinimalIconCard, QuoteCard } from "@/components/ui/abstract-cards";

export default function TechStartupsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - White Background */}
      <section className="section-light py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-black text-white px-4 py-2 text-sm">
              Solutions for Tech Startups
            </Badge>

            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              Grant Funding for <span className="accent-underline">Tech Startups</span>
            </h1>

            <p className="text-xl md:text-2xl body-black max-w-3xl">
              From SBIR/STTR to NSF grants, tech startups can access $50K-$2M+ in non-dilutive funding.
              We automate the entire process—you focus on building product.
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

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StatCard
              stat="$2M+"
              label="SBIR Phase II"
              description="Non-dilutive funding available"
              theme="light"
            />
            <StatCard
              stat="0%"
              label="Equity Given Up"
              description="Keep 100% ownership"
              theme="light"
            />
            <StatCard
              stat="45%"
              label="Tech Startup Win Rate"
              description="vs. 20% industry average"
              theme="light"
            />
          </motion.div>
        </div>
      </section>

      {/* Why Grants for Tech Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Why Tech Startups Choose Grants
            </h2>
            <p className="text-xl body-white">
              Non-dilutive funding without giving up equity or control
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard
              title="No Equity Dilution"
              description="VC rounds give up 20-30% ownership. Grants are free money—zero equity taken. Maintain control while scaling your technology."
              number="01"
              theme="dark"
            />

            <OffsetCard
              title="Credibility Signal"
              description="Winning SBIR/NSF grants validates your technology. Shows VCs you've passed rigorous federal review. Easier Series A fundraising."
              number="02"
              theme="dark"
            />

            <OffsetCard
              title="Runway Extension"
              description="$275K Phase I + $2M Phase II = 18-24 months runway. Build product, acquire customers, de-risk before raising equity."
              number="03"
              theme="dark"
            />

            <OffsetCard
              title="Customer Validation"
              description="Many grants require commercialization plans. Forces market research, customer discovery, product-market fit—all funded."
              number="04"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Best Grants for Tech Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              Top Grant Programs for Tech Startups
            </h2>
            <p className="text-xl body-black">
              Where to apply first
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FloatingContentCard theme="light" elevation="lifted">
              <div className="space-y-4">
                <Rocket className="w-12 h-12" />
                <h3 className="text-xl font-bold">SBIR/STTR</h3>
                <div className="space-y-2 text-sm body-black">
                  <p><strong>Phase I:</strong> $50K-$275K (6-12 months)</p>
                  <p><strong>Phase II:</strong> $750K-$2M (24 months)</p>
                  <p><strong>Best For:</strong> Hardware, software, biotech, cleantech</p>
                  <p><strong>TRL:</strong> 3-6 (prototype to pilot)</p>
                </div>
                <Badge className="bg-green-600 text-white">Most Popular</Badge>
              </div>
            </FloatingContentCard>

            <FloatingContentCard theme="light" elevation="lifted">
              <div className="space-y-4">
                <Code className="w-12 h-12" />
                <h3 className="text-xl font-bold">NSF I-Corps</h3>
                <div className="space-y-2 text-sm body-black">
                  <p><strong>Amount:</strong> $50K (6 months)</p>
                  <p><strong>Purpose:</strong> Customer discovery, market validation</p>
                  <p><strong>Best For:</strong> Academic spinouts, early-stage</p>
                  <p><strong>TRL:</strong> 2-4 (research to prototype)</p>
                </div>
                <Badge className="bg-blue-600 text-white">Fast Process</Badge>
              </div>
            </FloatingContentCard>

            <FloatingContentCard theme="light" elevation="lifted">
              <div className="space-y-4">
                <Zap className="w-12 h-12" />
                <h3 className="text-xl font-bold">DOE SBIR</h3>
                <div className="space-y-2 text-sm body-black">
                  <p><strong>Phase I:</strong> $200K-$275K</p>
                  <p><strong>Phase II:</strong> $1.1M-$1.5M</p>
                  <p><strong>Best For:</strong> Energy, cleantech, advanced manufacturing</p>
                  <p><strong>TRL:</strong> 3-7 (prototype to demo)</p>
                </div>
                <Badge className="bg-yellow-600 text-white">High Awards</Badge>
              </div>
            </FloatingContentCard>
          </div>
        </div>
      </section>

      {/* Common Challenges Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Tech Startup Grant Challenges (Solved)
            </h2>
            <p className="text-xl body-white">
              How we overcome common obstacles
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MinimalIconCard
              icon={<DollarSign className="w-10 h-10" />}
              label="Limited Resources - Can't afford $10K grant consultant"
              theme="dark"
            />
            <MinimalIconCard
              icon={<Rocket className="w-10 h-10" />}
              label="No Grant Experience - First-time applicants need guidance"
              theme="dark"
            />
            <MinimalIconCard
              icon={<Code className="w-10 h-10" />}
              label="Complex Requirements - RFPs are 50+ pages of jargon"
              theme="dark"
            />
            <MinimalIconCard
              icon={<Zap className="w-10 h-10" />}
              label="Time Constraints - Building product, can't spend 100+ hours"
              theme="dark"
            />
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold heading-white mb-8">Our Solution</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Affordable Pricing:</strong>
                  <span className="body-white ml-2">
                    $999 complete application vs. $10K+ consultants. Same quality, 90% cost savings.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Guided Process:</strong>
                  <span className="body-white ml-2">
                    Step-by-step workflow. AI explains requirements in plain English. No grant expertise needed.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Automated Analysis:</strong>
                  <span className="body-white ml-2">
                    AI parses complex RFPs, extracts requirements, identifies red flags. 15 minutes vs. 20+ hours.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">48-Hour Turnaround:</strong>
                  <span className="body-white ml-2">
                    Complete application ready in 2 days. Minimal founder time required—focus on product.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard
            quote="Won NSF SBIR Phase I ($275K) and Phase II ($2M) using this platform. Extended our runway by 2 years without dilution. Now we're raising Series A from a position of strength."
            author="David Park"
            role="CEO, AI Hardware Startup"
            theme="light"
          />
        </div>
      </section>

      {/* CTA Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl heading-white">
              Start Your Grant Journey Today
            </h2>
            <p className="text-xl body-white max-w-2xl mx-auto">
              Free company profile + TRL assessment. Find matching grants in 5 minutes.
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
