"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Lightbulb, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, MinimalIconCard } from "@/components/ui/abstract-cards";

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero - White */}
      <section className="section-light py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-black text-white px-4 py-2 text-sm">
              Documentation
            </Badge>

            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              <span className="accent-underline">Grant Automation</span> Documentation
            </h1>

            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Everything you need to successfully navigate the 4-stage grant process—from company
              profile creation to winning application submission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Documentation Sections
            </h2>
            <p className="text-xl body-white">
              Choose your starting point
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <Link href="/docs/getting-started">
              <OffsetCard
                title="Getting Started"
                description="Complete walkthrough from signup to your first grant application. Step-by-step instructions for beginners. Start here if this is your first time using the platform."
                number="01"
                theme="dark"
                className="cursor-pointer hover:border-white transition-colors"
              />
            </Link>

            <Link href="/docs/guides">
              <OffsetCard
                title="How-To Guides"
                description="Practical guides for specific tasks: optimizing your company profile, interpreting TRL scores, understanding grant fit scores, preparing for analysis, and more."
                number="02"
                theme="dark"
                className="cursor-pointer hover:border-white transition-colors"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* By Stage - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              Documentation by Stage
            </h2>
            <p className="text-xl body-black">
              Browse by workflow stage
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MinimalIconCard
              icon={<FileText className="w-10 h-10" />}
              label="Stage 1: Profile - Company setup, TRL assessment, document upload"
              theme="light"
            />
            <MinimalIconCard
              icon={<Lightbulb className="w-10 h-10" />}
              label="Stage 2: Discovery - Grant search, fit scoring, recommendations"
              theme="light"
            />
            <MinimalIconCard
              icon={<BookOpen className="w-10 h-10" />}
              label="Stage 3: Analysis - RFP breakdown, timeline, budget validation"
              theme="light"
            />
            <MinimalIconCard
              icon={<CheckCircle2 className="w-10 h-10" />}
              label="Stage 4: Generation - Application writing, assessor simulation, export"
              theme="light"
            />
          </div>
        </div>
      </section>

      {/* Common Questions - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl heading-white mb-4">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">
                How long does each stage take?
              </h3>
              <p className="body-white">
                Stage 1 (Profile): 15-30 minutes. Stage 2 (Discovery): 5-10 minutes per search.
                Stage 3 (Analysis): 15 minutes processing + your review time. Stage 4 (Generation): 48 hours turnaround.
              </p>
            </div>

            <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">
                What documents do I need to upload for Stage 1?
              </h3>
              <p className="body-white">
                Pitch deck, company website URL, product whitepaper, or technical documentation. Any materials
                describing your technology, team, and market. AI extracts key facts automatically.
              </p>
            </div>

            <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I edit my company profile after creation?
              </h3>
              <p className="body-white">
                Yes. Profile editing is available at any time. Re-run TRL assessment if your technology
                advances. Updated profiles improve grant matching accuracy.
              </p>
            </div>

            <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">
                What format are Stage 4 applications delivered in?
              </h3>
              <p className="body-white">
                Both PDF (for submission) and DOCX (for editing). Includes full narrative, executive summary,
                budget narrative, and appendices. Formatted per RFP specifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - White */}
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
              Ready to Get Started?
            </h2>
            <p className="text-xl body-black max-w-2xl mx-auto">
              Create your free company profile and start discovering grants today.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg"
                >
                  Create Free Profile
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/docs/getting-started">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-black text-black hover:bg-black hover:text-white px-12 py-6 text-lg"
                >
                  Read Getting Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
