"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, DollarSign, Calculator, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, FloatingContentCard, MinimalIconCard, QuoteCard } from "@/components/ui/abstract-cards";

export default function BudgetPage() {
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
              Budget Validation • Included in Stage 3 & 4
            </Badge>

            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              Automated <span className="accent-underline">Budget Validation</span>
            </h1>

            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Grant-specific budget rules, cost validation, and automatic error detection.
              Ensure your budget is compliant before submission—avoid disqualification.
            </p>

            <div className="flex gap-4 flex-wrap pt-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-6 text-lg"
                >
                  Validate Your Budget
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
              stat="15%"
              label="Rejection Rate"
              description="Due to budget errors alone"
              theme="light"
            />
            <StatCard
              stat="50+"
              label="Validation Rules"
              description="Per grant program"
              theme="light"
            />
            <StatCard
              stat="< 1 min"
              label="Check Time"
              description="Instant validation feedback"
              theme="light"
            />
          </motion.div>
        </div>
      </section>

      {/* Common Budget Errors Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Common Budget Disqualifiers
            </h2>
            <p className="text-xl body-white">
              Automated detection prevents these critical errors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard
              title="Exceeding Category Limits"
              description="SBIR caps travel at $5K/yr. NSF limits indirect costs to 10% for equipment. Exceed limits = automatic rejection. Our system enforces per-category caps."
              number="01"
              theme="dark"
            />

            <OffsetCard
              title="Missing Cost Sharing"
              description="Grant requires 20% match but you budget $0. Or you claim in-kind match when only cash is allowed. We validate required percentages and acceptable types."
              number="02"
              theme="dark"
            />

            <OffsetCard
              title="Disallowed Expenses"
              description="Some grants prohibit consultant fees, capital equipment, or foreign travel. Our rules engine flags unallowable costs before submission."
              number="03"
              theme="dark"
            />

            <OffsetCard
              title="Math Errors"
              description="Columns don't sum correctly. Indirect rate miscalculated. Year 2 numbers don't match narrative. Automated validation catches arithmetic mistakes."
              number="04"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Validation Rules Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              Grant-Specific Validation Rules
            </h2>
            <p className="text-xl body-black">
              Different grants have different budget requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FloatingContentCard theme="light" elevation="subtle">
              <div className="space-y-4">
                <DollarSign className="w-12 h-12" />
                <h3 className="text-xl font-bold">SBIR/STTR Rules</h3>
                <ul className="space-y-2 text-sm body-black">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>Phase I: $50K-$275K cap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>33% consultant limit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>Travel $5K max per year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>PI salary cap enforced</span>
                  </li>
                </ul>
              </div>
            </FloatingContentCard>

            <FloatingContentCard theme="light" elevation="subtle">
              <div className="space-y-4">
                <Calculator className="w-12 h-12" />
                <h3 className="text-xl font-bold">NSF Rules</h3>
                <ul className="space-y-2 text-sm body-black">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>Indirect rate varies by org type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>Equipment >$5K itemized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>Subaward justification required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>Cost share clearly identified</span>
                  </li>
                </ul>
              </div>
            </FloatingContentCard>

            <FloatingContentCard theme="light" elevation="subtle">
              <div className="space-y-4">
                <AlertTriangle className="w-12 h-12" />
                <h3 className="text-xl font-bold">DOE Rules</h3>
                <ul className="space-y-2 text-sm body-black">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>20-50% cost share typical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>Foreign travel restricted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>Capital equipment scrutinized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>National lab partnerships</span>
                  </li>
                </ul>
              </div>
            </FloatingContentCard>
          </div>
        </div>
      </section>

      {/* Budget Categories Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Validated Cost Categories
            </h2>
            <p className="text-xl body-white">
              Comprehensive validation across all budget line items
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MinimalIconCard
              icon={<DollarSign className="w-10 h-10" />}
              label="Personnel - Salary caps, FTE limits, fringe rates"
              theme="dark"
            />
            <MinimalIconCard
              icon={<Calculator className="w-10 h-10" />}
              label="Equipment - Capitalization thresholds, justification"
              theme="dark"
            />
            <MinimalIconCard
              icon={<AlertTriangle className="w-10 h-10" />}
              label="Travel - Domestic/foreign splits, per diem rates"
              theme="dark"
            />
            <MinimalIconCard
              icon={<CheckCircle2 className="w-10 h-10" />}
              label="Indirect Costs - F&A rates, modified total direct costs"
              theme="dark"
            />
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold heading-white mb-8">Real-Time Validation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">As You Type:</strong>
                  <span className="body-white ml-2">
                    Instant feedback on each line item. See green checkmarks for valid entries,
                    red flags for errors.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Cross-Section Checks:</strong>
                  <span className="body-white ml-2">
                    Validates budget numbers match narrative claims. If narrative says "3 researchers,"
                    budget must show 3 FTEs.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Formula Verification:</strong>
                  <span className="body-white ml-2">
                    Automatically calculates totals, subtotals, percentages. Flags discrepancies
                    between your numbers and correct math.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Pre-Submission Report:</strong>
                  <span className="body-white ml-2">
                    Final validation checklist before submission. Must pass all checks to proceed
                    to download.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Sharing Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              Cost Share Validation
            </h2>
            <p className="text-xl body-black">
              Complex matching requirements simplified
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold heading-black">What We Check</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Required Percentage:</strong>
                    <span className="body-black ml-2">
                      If grant requires 25% match, your cost share must equal exactly 25% of total budget.
                      We enforce this automatically.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Cash vs. In-Kind:</strong>
                    <span className="body-black ml-2">
                      Some grants require cash match only. Others accept in-kind (donated equipment, volunteer time).
                      We validate acceptable types.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Source Documentation:</strong>
                    <span className="body-black ml-2">
                      Cost share must be documented and auditable. We flag when letters of commitment
                      or financial statements are required.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold heading-black">Common Mistakes</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Wrong Percentage:</strong>
                    <span className="body-black ml-2">
                      20% requirement but you budget 15%. Math error or misunderstanding. Either way, disqualified.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Unacceptable Match:</strong>
                    <span className="body-black ml-2">
                      Claiming volunteer time as match when grant requires cash only. Reviewers reject this immediately.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Missing Documentation:</strong>
                    <span className="body-black ml-2">
                      No commitment letters for third-party contributions. Claimed match with zero documentation.
                      Instant rejection.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard
            quote="The validator caught a $12K math error in our indirect costs. Would have been disqualified if we submitted that. Worth every penny."
            author="Robert Kim"
            role="Grant Manager, University Research Institute"
            theme="dark"
          />
        </div>
      </section>

      {/* CTA Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl heading-black">
              Never Submit a Budget Error
            </h2>
            <p className="text-xl body-black max-w-2xl mx-auto">
              Budget validation included in Stage 3 Analysis ($199) and Stage 4 Generation ($999).
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg"
              >
                Start Validating Budgets
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
