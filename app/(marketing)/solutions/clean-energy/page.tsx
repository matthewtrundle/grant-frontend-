"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Sun, Wind, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, FloatingContentCard, MinimalIconCard, QuoteCard } from "@/components/ui/abstract-cards";

export default function CleanEnergyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero - White */}
      <section className="section-light py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-black text-white px-4 py-2 text-sm">Solutions for Clean Energy</Badge>
            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              Grant Funding for <span className="accent-underline">Clean Energy</span>
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl">
              DOE ARPA-E, EERE, and state programs offer $500K-$50M+ for renewable energy, grid tech, and carbon reduction.
              We navigate complex DOE requirements and multi-year project planning.
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
            <StatCard stat="$50M+" label="ARPA-E Awards" description="High-risk, high-reward research" theme="light" />
            <StatCard stat="50%" label="Cost Share" description="Typical DOE requirement" theme="light" />
            <StatCard stat="42%" label="CleanTech Win Rate" description="With our platform" theme="light" />
          </motion.div>
        </div>
      </section>

      {/* Top Programs - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">Top Clean Energy Programs</h2>
            <p className="text-xl body-white">DOE, ARPA-E, and state incentives</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard title="DOE ARPA-E" description="$500K-$10M for breakthrough energy technologies. Solar, wind, storage, grid, carbon capture. TRL 2-5." number="01" theme="dark" />
            <OffsetCard title="DOE EERE (SBIR)" description="Phase I: $275K. Phase II: $1.8M. Energy efficiency, renewable energy, advanced manufacturing." number="02" theme="dark" />
            <OffsetCard title="State Energy Programs" description="$100K-$5M from CA, NY, TX, MA energy offices. Solar, EV charging, grid modernization incentives." number="03" theme="dark" />
            <OffsetCard title="Private Foundations" description="Breakthrough Energy, Gates Foundation, Schmidt Futures. $1M-$25M for climate tech at scale." number="04" theme="dark" />
          </div>
        </div>
      </section>

      {/* Success Story - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard quote="Won DOE ARPA-E ($3.2M) for our next-gen battery tech. The cost-share validation caught errors that would have disqualified us. ROI: infinite." author="Maria Gonzalez" role="CTO, GridStorage Solutions" theme="light" />
        </div>
      </section>

      {/* CTA - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl heading-white">Scale Your Clean Energy Innovation</h2>
            <p className="text-xl body-white max-w-2xl mx-auto">Free profile. Find DOE, ARPA-E, and state energy grants.</p>
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
