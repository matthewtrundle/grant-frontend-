"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, FileText, Lightbulb, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, AsymmetricTextCard, MinimalIconCard, QuoteCard } from "@/components/ui/abstract-cards";
import { DNABackground } from "@/components/ui/dna-background";

export default function ProfilerPage() {
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
      <section className="section-light py-24 md:py-32 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-black text-white px-4 py-2 text-sm">
              Stage 1 • FREE
            </Badge>

            <h1 className="text-5xl md:text-7xl font-playfair heading-black max-w-4xl">
              Company Profiler <span className="accent-underline">& TRL Assessment</span>
            </h1>

            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Get your Technology Readiness Level score and create a comprehensive biotech/medtech profile
              that matches you with NIH, FDA, and CDC grants.
            </p>

            <div className="flex gap-4 flex-wrap pt-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-6 text-lg"
                >
                  Create Your Profile
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
              stat="1-9"
              label="TRL Scale"
              description="From basic research to full commercial deployment"
              theme="light"
            />
            <StatCard
              stat="15 min"
              label="Setup Time"
              description="Quick company profile creation"
              theme="light"
            />
            <StatCard
              stat="100%"
              label="Free Forever"
              description="No credit card required"
              theme="light"
            />
          </motion.div>
        </div>
      </section>

      {/* What We Extract Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              What We Extract
            </h2>
            <p className="text-xl body-white">
              AI-powered analysis of your company documents and website
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard
              title="Technology Profile"
              description="Core technology stack, innovation claims, intellectual property status, and competitive advantages extracted from your materials."
              number="01"
              theme="dark"
            />

            <OffsetCard
              title="Team & Clinical Expertise"
              description="Founder backgrounds, clinical expertise, academic credentials, regulatory experience, and medical advisory board members that strengthen healthcare grant applications."
              number="02"
              theme="dark"
            />

            <OffsetCard
              title="Market Position"
              description="Target market, customer validation, revenue model, and competitive landscape to demonstrate commercial viability."
              number="03"
              theme="dark"
            />

            <OffsetCard
              title="Development Stage"
              description="Current product status, milestones achieved, testing results, and technology readiness level assessment."
              number="04"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* TRL Assessment Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl heading-black mb-6">
                Technology Readiness Level (TRL)
              </h2>
              <div className="space-y-4 body-black">
                <p>
                  Your TRL score (1-9) is critical for grant eligibility. Many grants target specific
                  TRL ranges, and mismatched applications are automatically rejected.
                </p>
                <p>
                  Our AI analyzes your technology status against NASA's TRL framework, providing an
                  accurate assessment that matches you with appropriate funding opportunities.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <AsymmetricTextCard
                title="TRL 1-3: Early Research"
                accentPosition="left"
                theme="light"
              >
                <p className="text-sm body-black">
                  Basic principles observed, concept formulated, proof of concept in laboratory
                </p>
              </AsymmetricTextCard>

              <AsymmetricTextCard
                title="TRL 4-6: Development"
                accentPosition="left"
                theme="light"
              >
                <p className="text-sm body-black">
                  Component validation, prototype demonstrated, system prototype in relevant environment
                </p>
              </AsymmetricTextCard>

              <AsymmetricTextCard
                title="TRL 7-9: Deployment"
                accentPosition="left"
                theme="light"
              >
                <p className="text-sm body-black">
                  System prototype in operational environment, qualified through test, proven in operations
                </p>
              </AsymmetricTextCard>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              How Profiling Works
            </h2>
            <p className="text-xl body-white">
              Three simple steps to create your company profile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MinimalIconCard
              icon={<FileText className="w-12 h-12" />}
              label="Upload Documents - Pitch deck, website, or product description"
              theme="dark"
            />
            <MinimalIconCard
              icon={<Lightbulb className="w-12 h-12" />}
              label="AI Analysis - Automatic extraction of key facts and TRL assessment"
              theme="dark"
            />
            <MinimalIconCard
              icon={<CheckCircle2 className="w-12 h-12" />}
              label="Review & Confirm - Verify extracted information and save your profile"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Why It Matters Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard
            quote="Without an accurate TRL assessment, you're applying to NIH grants you can't win. The profiler correctly identified our TRL 5 status and matched us with appropriate SBIR Phase I opportunities. Saved us weeks of wasted effort."
            author="Dr. Sarah Chen"
            role="Founder, CardioAI Diagnostics"
            theme="light"
          />

          <div className="mt-16 space-y-6">
            <h2 className="text-3xl md:text-4xl heading-black mb-6">
              Why Profile Accuracy Matters
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">Grant Eligibility:</strong>
                  <span className="body-black ml-2">
                    Wrong TRL = automatic rejection. Many grants specify exact TRL requirements.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">Match Quality:</strong>
                  <span className="body-black ml-2">
                    Accurate profiles get better grant recommendations, saving time on irrelevant applications.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">Consistency:</strong>
                  <span className="body-black ml-2">
                    Same company facts used across all applications, preventing contradictions that trigger rejection.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl heading-white">
              Start With Your Free Profile
            </h2>
            <p className="text-xl body-white max-w-2xl mx-auto">
              Get your TRL score and unlock Stage 2 grant discovery. No credit card required.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg"
              >
                Create Profile Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
