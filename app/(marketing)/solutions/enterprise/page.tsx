"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, QuoteCard } from "@/components/ui/abstract-cards";
import { CircuitBackground } from "@/components/ui/circuit-background";

export default function EnterprisePage() {
  return (
    <div className="min-h-screen relative">
      <CircuitBackground
        density="high"
        glowColor="#2563EB"
        opacity={0.12}
        className="fixed inset-0 z-0"
      />
      {/* Hero - White */}
      <section className="section-light py-24 relative z-10 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-black text-white px-4 py-2 text-sm">Solutions for Enterprise</Badge>
            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              Grant Funding for <span className="accent-underline">Enterprise Innovation</span>
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Established companies and research institutions can access $1M-$100M+ in R&D consortia, DOE demonstrations,
              and public-private partnerships. Accelerate innovation without budget constraints.
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
            <StatCard stat="$100M+" label="Mega Grants" description="DOE demonstration projects" theme="light" />
            <StatCard stat="Multi-Year" label="Funding Cycles" description="3-7 year programs" theme="light" />
            <StatCard stat="35%" label="Enterprise Win Rate" description="Competitive but high ROI" theme="light" />
          </motion.div>
        </div>
      </section>

      {/* Programs - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">Enterprise Grant Programs</h2>
            <p className="text-xl body-white">Large-scale R&D and demonstration projects</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard title="DOE Demonstration Projects" description="$10M-$100M+ for first-of-a-kind clean energy systems. Carbon capture, hydrogen, nuclear, grid modernization." number="01" theme="dark" />
            <OffsetCard title="Defense Innovation" description="$5M-$50M from DARPA, AFRL, ONR. Dual-use technologies, autonomy, cybersecurity, advanced materials." number="02" theme="dark" />
            <OffsetCard title="Manufacturing USA" description="$2M-$20M through public-private consortia. Requires industry cost-share. Multi-year partnerships." number="03" theme="dark" />
            <OffsetCard title="University Partnerships" description="$1M-$25M NSF/NIH collaborations. Industry leads with academic partners. TRL 3-7 bridging." number="04" theme="dark" />
          </div>
        </div>
      </section>

      {/* Why Enterprise Needs Grants - White */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">Why Enterprises Apply</h2>
            <p className="text-xl body-black">Strategic advantages beyond funding</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold heading-black">De-Risk Innovation</h3>
              <p className="body-black">
                Corporate R&D budgets face quarterly pressure. Grants fund high-risk, long-horizon projects that CFOs
                won't approve. Explore breakthrough technologies without balance sheet impact.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold heading-black">Government Relationships</h3>
              <p className="body-black">
                Winning DOE/DOD grants establishes relationships with program managers. Opens doors to follow-on
                procurement, pilot programs, regulatory input. Strategic beyond the dollar amount.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold heading-black">Talent Magnet</h3>
              <p className="body-black">
                Top researchers want to work on cutting-edge problems. Grant-funded projects attract PhD talent
                who value impact over compensation. Strengthen your technical team.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold heading-black">Market Validation</h3>
              <p className="body-black">
                Federal endorsement signals technology credibility. Easier customer acquisition, partnership discussions,
                and investor confidence. Grants are marketing for enterprise deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard quote="Won DOE demonstration grant ($35M) for carbon capture pilot. This technology was too risky for our internal innovation fund. Grant made it possible—now it's a $200M+ business unit." author="Dr. Robert Chen" role="VP Innovation, Fortune 500 Energy Company" theme="dark" />
        </div>
      </section>

      {/* CTA - White */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl heading-black">Accelerate Enterprise Innovation</h2>
            <p className="text-xl body-black max-w-2xl mx-auto">Free profile. Find large-scale R&D and demonstration grants.</p>
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
