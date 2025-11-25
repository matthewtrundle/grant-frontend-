"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileSearch, Calendar, DollarSign, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, AsymmetricTextCard, MinimalIconCard, QuoteCard } from "@/components/ui/abstract-cards";
import { DNABackground } from "@/components/ui/dna-background";

export default function AnalysisPage() {
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
              Stage 3 • $199 per grant
            </Badge>

            <h1 className="text-5xl md:text-7xl font-playfair heading-black max-w-4xl">
              Deep RFP <span className="accent-underline">Analysis</span>
            </h1>

            <p className="text-xl md:text-2xl body-black max-w-3xl">
              AI-powered analysis of NIH, FDA, and CDC grant requirements, clinical timeline extraction, regulatory budget breakdown,
              and success factors. Know exactly what it takes to win healthcare funding before you write a single word.
            </p>

            <div className="flex gap-4 flex-wrap pt-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-6 text-lg"
                >
                  Analyze a Grant
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
              stat="20+ hrs"
              label="Time Saved"
              description="vs. manual RFP analysis"
              theme="light"
            />
            <StatCard
              stat="15 min"
              label="Analysis Time"
              description="From RFP to report"
              theme="light"
            />
            <StatCard
              stat="$199"
              label="Fixed Price"
              description="Per grant analysis"
              theme="light"
            />
          </motion.div>
        </div>
      </section>

      {/* What We Analyze Section - Black Background */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Comprehensive RFP Breakdown
            </h2>
            <p className="text-xl body-white">
              Every critical element extracted and analyzed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard
              title="Clinical Timeline Analysis"
              description="Extract all deadlines, clinical trial milestones, FDA submission dates, IRB approval timelines, and reporting requirements. Never miss a critical regulatory date again."
              number="01"
              theme="dark"
            />

            <OffsetCard
              title="Budget Requirements"
              description="Identify allowable costs, cost-sharing requirements, indirect rate limits, and budget justification needs."
              number="02"
              theme="dark"
            />

            <OffsetCard
              title="Evaluation Criteria"
              description="Understand exactly how proposals are scored. Know which sections matter most and weight your efforts accordingly."
              number="03"
              theme="dark"
            />

            <OffsetCard
              title="Success Factors"
              description="Identify key themes, required partnerships, preferred methodologies, and competitive advantages that win."
              number="04"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Timeline Feature Section - White Background */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl heading-black mb-6">
                Automated Timeline Extraction
              </h2>
              <div className="space-y-4 body-black">
                <p>
                  RFPs hide critical dates across 50+ pages. Miss one deadline and your application
                  is automatically rejected—no exceptions.
                </p>
                <p>
                  Our AI scans the entire document, identifies all dates, categorizes them by type
                  (submission, reporting, milestones), and creates a visual timeline with alerts.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/sign-up">
                  <Button className="bg-accent hover:bg-accent-hover text-white">
                    See Timeline Example
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <MinimalIconCard
                icon={<Calendar className="w-10 h-10" />}
                label="Submission Deadlines - LOI, full proposal, supporting docs"
                theme="light"
              />
              <MinimalIconCard
                icon={<FileSearch className="w-10 h-10" />}
                label="Review Milestones - Award notification, revisions, appeals"
                theme="light"
              />
              <MinimalIconCard
                icon={<AlertTriangle className="w-10 h-10" />}
                label="Reporting Requirements - Quarterly, annual, final reports"
                theme="light"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Budget Analysis Section - Black Background */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Budget Analysis & Validation
            </h2>
            <p className="text-xl body-white">
              Know exactly what costs are allowed before you build your budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AsymmetricTextCard
              title="Allowable Costs"
              accentPosition="left"
              theme="dark"
            >
              <p className="text-sm body-white">
                Extract specific cost categories allowed: personnel, equipment, travel, materials.
                Identify restrictions on overhead, capital expenses, and consultant fees.
              </p>
            </AsymmetricTextCard>

            <AsymmetricTextCard
              title="Cost Sharing"
              accentPosition="left"
              theme="dark"
            >
              <p className="text-sm body-white">
                Identify required vs. voluntary cost-share percentages. Calculate exact matching
                fund amounts and acceptable forms of match (cash, in-kind).
              </p>
            </AsymmetricTextCard>

            <AsymmetricTextCard
              title="Budget Limits"
              accentPosition="left"
              theme="dark"
            >
              <p className="text-sm body-white">
                Flag maximum award amounts, per-category limits, and indirect cost rate caps.
                Ensure your budget doesn't exceed allowable ranges.
              </p>
            </AsymmetricTextCard>
          </div>
        </div>
      </section>

      {/* Risk Analysis Section - White Background */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              Risk Assessment
            </h2>
            <p className="text-xl body-black">
              Identify red flags before you invest time in writing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold heading-black">Common Disqualifiers</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">TRL Mismatch:</strong>
                    <span className="body-black ml-2">
                      Grant requires TRL 4-6 but your company is TRL 8. Automatic rejection.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Missing Partnerships:</strong>
                    <span className="body-black ml-2">
                      RFP requires university collaboration but you have none. Need 3+ months to establish.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Insufficient Runway:</strong>
                    <span className="body-black ml-2">
                      4-month timeline but you need 6 months minimum. You'll miss the deadline.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold heading-black">Competitive Advantages</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Preferred Keywords:</strong>
                    <span className="body-black ml-2">
                      Grant emphasizes "commercial viability" 8 times. You have revenue—highlight it.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Rare Expertise:</strong>
                    <span className="body-black ml-2">
                      Your CTO's PhD matches the grant's focus area. This is a significant advantage.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Pilot Data:</strong>
                    <span className="body-black ml-2">
                      Grant values preliminary results. Your beta test data directly addresses evaluation criteria.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Black Background */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard
            quote="The analysis revealed we were missing a required partnership that would have disqualified us. $199 saved us 40 hours of wasted work."
            author="Michael Torres"
            role="CEO, CleanTech Solutions"
            theme="dark"
          />
        </div>
      </section>

      {/* What You Get Section - White Background */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl heading-black mb-12 text-center">
            Deliverables ($199)
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">PDF Analysis Report:</strong>
                <span className="body-black ml-2">
                  Complete breakdown of requirements, timeline, budget, evaluation criteria, and success factors.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">Visual Timeline:</strong>
                <span className="body-black ml-2">
                  Gantt chart with all deadlines, milestones, and critical dates. Includes calendar export.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">Budget Template:</strong>
                <span className="body-black ml-2">
                  Pre-structured Excel template with allowable cost categories and limits already filled in.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">Risk Assessment:</strong>
                <span className="body-black ml-2">
                  Red flags and competitive advantages specific to your company profile.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">Go/No-Go Recommendation:</strong>
                <span className="body-black ml-2">
                  Data-driven decision on whether this grant is worth pursuing based on your profile.
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
              Know Before You Write
            </h2>
            <p className="text-xl body-white max-w-2xl mx-auto">
              $199 analysis saves 40+ hours and prevents pursuing grants you can't win.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg"
              >
                Analyze Your First Grant
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
