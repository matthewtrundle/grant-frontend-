"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Users, Target, CheckCircle2, Download, Star } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, FloatingContentCard, MinimalIconCard, QuoteCard, SplitCard } from "@/components/ui/abstract-cards";

export default function GenerationPage() {
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
              Stage 4 • $999 per grant
            </Badge>

            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              Complete <span className="accent-underline">Application Generation</span>
            </h1>

            <p className="text-xl md:text-2xl body-black max-w-3xl">
              RAG-powered writing system generates publication-ready grant applications.
              Multi-agent simulation scores and refines your responses. Download PDF/DOCX and submit with confidence.
            </p>

            <div className="flex gap-4 flex-wrap pt-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-6 text-lg"
                >
                  Generate Application
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
              stat="100+ hrs"
              label="Time Saved"
              description="vs. writing from scratch"
              theme="light"
            />
            <StatCard
              stat="48 hrs"
              label="Turnaround"
              description="Draft to submission-ready"
              theme="light"
            />
            <StatCard
              stat="$999"
              label="Fixed Price"
              description="vs. $10K+ consultants"
              theme="light"
            />
          </motion.div>
        </div>
      </section>

      {/* RAG System Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              RAG-Powered Writing Engine
            </h2>
            <p className="text-xl body-white">
              Learn from 50+ successful grants in your field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard
              title="Example Library"
              description="Vector database of successful grant applications. Search by question type, industry, TRL, and award size to find relevant examples."
              number="01"
              theme="dark"
            />

            <OffsetCard
              title="Semantic Search"
              description="For each grant question, retrieve 3-5 most relevant successful responses. AI adapts winning patterns to your company profile."
              number="02"
              theme="dark"
            />

            <OffsetCard
              title="Context Injection"
              description="Combines your company profile, retrieved examples, and RFP requirements to generate targeted, high-quality responses."
              number="03"
              theme="dark"
            />

            <OffsetCard
              title="Consistency Checking"
              description="Cross-references all responses to ensure claims match across sections. No contradictions that trigger reviewer rejection."
              number="04"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Multi-Agent Simulation Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              3-Assessor Simulation
            </h2>
            <p className="text-xl body-black">
              Every response scored by simulated expert reviewers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FloatingContentCard theme="light" elevation="lifted">
              <div className="space-y-4">
                <Users className="w-12 h-12" />
                <h3 className="text-xl font-bold">Technical Assessor</h3>
                <p className="text-sm body-black">
                  Evaluates technical feasibility, innovation claims, methodology soundness,
                  and risk mitigation strategies. Scores 0-10 on technical merit.
                </p>
                <Badge className="bg-blue-600 text-white">Technical Score</Badge>
              </div>
            </FloatingContentCard>

            <FloatingContentCard theme="light" elevation="lifted">
              <div className="space-y-4">
                <Target className="w-12 h-12" />
                <h3 className="text-xl font-bold">Business Assessor</h3>
                <p className="text-sm body-black">
                  Reviews market opportunity, commercial viability, revenue model, competitive
                  positioning, and budget justification. Scores 0-10 on business case.
                </p>
                <Badge className="bg-green-600 text-white">Business Score</Badge>
              </div>
            </FloatingContentCard>

            <FloatingContentCard theme="light" elevation="lifted">
              <div className="space-y-4">
                <FileText className="w-12 h-12" />
                <h3 className="text-xl font-bold">Academic Assessor</h3>
                <p className="text-sm body-black">
                  Checks research rigor, citation quality, broader impacts, dissemination plans,
                  and alignment with grant objectives. Scores 0-10 on academic merit.
                </p>
                <Badge className="bg-purple-600 text-white">Academic Score</Badge>
              </div>
            </FloatingContentCard>
          </div>

          <div className="mt-12 text-center">
            <SplitCard
              splitDirection="horizontal"
              leftContent={
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Iterative Refinement</h3>
                  <p className="text-gray-300">
                    Responses scoring below 7/10 are automatically revised. AI addresses specific
                    feedback from each assessor until all scores reach 7+.
                  </p>
                </div>
              }
              rightContent={
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-black">Quality Guarantee</h3>
                  <p className="text-gray-700">
                    Final applications average 8.2/10 across all three assessors. Only release
                    submission-ready applications—no half-finished drafts.
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* What's Included Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Complete Application Package
            </h2>
            <p className="text-xl body-white">
              Everything you need to submit a winning grant
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MinimalIconCard
              icon={<FileText className="w-10 h-10" />}
              label="Full Narrative - All required sections, word-limit compliant"
              theme="dark"
            />
            <MinimalIconCard
              icon={<Target className="w-10 h-10" />}
              label="Executive Summary - Impact statement for reviewers"
              theme="dark"
            />
            <MinimalIconCard
              icon={<Download className="w-10 h-10" />}
              label="Budget Narrative - Line-item justifications"
              theme="dark"
            />
            <MinimalIconCard
              icon={<Star className="w-10 h-10" />}
              label="Appendices - Data tables, bios, letters of support"
              theme="dark"
            />
          </div>

          <div className="mt-12 space-y-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold heading-white">Export Formats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Download className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">PDF Export:</strong>
                  <span className="body-white ml-2">
                    Formatted for submission. Includes table of contents, page numbers, headers/footers per RFP specs.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Download className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">DOCX Export:</strong>
                  <span className="body-white ml-2">
                    Editable Word document. Make final tweaks, add custom sections, or pass to internal reviewers.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Word Limit Enforcement Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl heading-black mb-6">
                Strict Word Limit Enforcement
              </h2>
              <div className="space-y-4 body-black">
                <p>
                  Grant applications with exceeded word limits are automatically disqualified—no exceptions.
                  Our system enforces exact word counts per RFP specifications.
                </p>
                <p>
                  Handles edge cases: markdown formatting, bullet lists, tables, and special characters
                  all counted correctly per grant agency rules.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">Per-Section Limits:</strong>
                  <span className="body-black ml-2">
                    Track word count for each section independently. Know exactly where you stand.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">Auto-Condensing:</strong>
                  <span className="body-black ml-2">
                    If draft exceeds limit, AI automatically condenses while preserving key information.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">Visual Indicators:</strong>
                  <span className="body-black ml-2">
                    Real-time word count display with green/yellow/red status per section.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard
            quote="We won $250K on our first AI-generated application. The 3-assessor feedback caught issues our internal team missed. Best $999 we ever spent."
            author="Jennifer Park"
            role="CTO, HealthAI Diagnostics"
            theme="dark"
          />
        </div>
      </section>

      {/* ROI Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl heading-black mb-12 text-center">
            Return on Investment
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">vs. Grant Consultants:</strong>
                <span className="body-black ml-2">
                  Save $9,000+. Consultants charge $10K-$15K per application. Our $999 system delivers comparable quality.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">vs. Internal Writing:</strong>
                <span className="body-black ml-2">
                  Save 100+ hours. Your team's time is worth $5K-$10K. Plus applications are higher quality with RAG examples.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <strong className="font-semibold">Success Rate Increase:</strong>
                <span className="body-black ml-2">
                  40% win rate vs. 20% industry average. Apply to 5 grants, win 2 instead of 1. ROI: 10,000%+
                </span>
              </div>
            </div>
          </div>
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
              Generate Your Winning Application
            </h2>
            <p className="text-xl body-white max-w-2xl mx-auto">
              $999 gets you a complete, submission-ready grant application in 48 hours.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg"
              >
                Start Stage 4 Generation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
