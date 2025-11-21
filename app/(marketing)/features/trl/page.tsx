"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lightbulb, FlaskConical, Rocket, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, AsymmetricTextCard, MinimalIconCard } from "@/components/ui/abstract-cards";
import { CircuitBackground } from "@/components/ui/circuit-background";

export default function TRLPage() {
  return (
    <div className="min-h-screen relative">
      {/* Circuit Background */}
      <CircuitBackground
        density="medium"
        glowColor="#8B5CF6"
        opacity={0.10}
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
              TRL Assessment • FREE
            </Badge>

            <h1 className="text-5xl md:text-7xl font-playfair heading-black max-w-4xl">
              Technology Readiness Level <span className="accent-underline">Scoring</span>
            </h1>

            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Accurate TRL assessment is critical for grant eligibility. Wrong TRL = automatic rejection.
              Our AI evaluates your technology against NASA's 9-level framework.
            </p>

            <div className="flex gap-4 flex-wrap pt-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-6 text-lg"
                >
                  Get TRL Assessment
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
              description="Basic research to full deployment"
              theme="light"
            />
            <StatCard
              stat="80%"
              label="Grant Specificity"
              description="Require exact TRL ranges"
              theme="light"
            />
            <StatCard
              stat="5 min"
              label="Assessment Time"
              description="Automated AI scoring"
              theme="light"
            />
          </motion.div>
        </div>
      </section>

      {/* TRL Framework Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Understanding the TRL Framework
            </h2>
            <p className="text-xl body-white">
              NASA's 9-level scale from basic research to commercial deployment
            </p>
          </div>

          <div className="space-y-8">
            {/* TRL 1-3 */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Lightbulb className="w-12 h-12 text-white" />
                <h3 className="text-3xl heading-white">TRL 1-3: Research</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AsymmetricTextCard title="TRL 1" accentPosition="left" theme="dark">
                  <p className="text-sm body-white">
                    <strong>Basic Principles:</strong> Scientific research beginning. Principles observed
                    and reported. Paper studies of basic properties.
                  </p>
                </AsymmetricTextCard>
                <AsymmetricTextCard title="TRL 2" accentPosition="left" theme="dark">
                  <p className="text-sm body-white">
                    <strong>Concept Formulated:</strong> Practical applications identified. Concept and
                    application are speculative. No experimental proof.
                  </p>
                </AsymmetricTextCard>
                <AsymmetricTextCard title="TRL 3" accentPosition="left" theme="dark">
                  <p className="text-sm body-white">
                    <strong>Proof of Concept:</strong> Active R&D. Lab studies. Analytical/experimental
                    validation of critical function and/or concept.
                  </p>
                </AsymmetricTextCard>
              </div>
            </div>

            {/* TRL 4-6 */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <FlaskConical className="w-12 h-12 text-white" />
                <h3 className="text-3xl heading-white">TRL 4-6: Development</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AsymmetricTextCard title="TRL 4" accentPosition="left" theme="dark">
                  <p className="text-sm body-white">
                    <strong>Component Validation:</strong> Component or breadboard validation in lab.
                    Basic technological components integrated.
                  </p>
                </AsymmetricTextCard>
                <AsymmetricTextCard title="TRL 5" accentPosition="left" theme="dark">
                  <p className="text-sm body-white">
                    <strong>Prototype Demo:</strong> Component/system validation in relevant environment.
                    High fidelity lab integration of components.
                  </p>
                </AsymmetricTextCard>
                <AsymmetricTextCard title="TRL 6" accentPosition="left" theme="dark">
                  <p className="text-sm body-white">
                    <strong>Prototype in Environment:</strong> System/subsystem model in relevant environment.
                    Representative system tested in lab or field.
                  </p>
                </AsymmetricTextCard>
              </div>
            </div>

            {/* TRL 7-9 */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Rocket className="w-12 h-12 text-white" />
                <h3 className="text-3xl heading-white">TRL 7-9: Deployment</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AsymmetricTextCard title="TRL 7" accentPosition="left" theme="dark">
                  <p className="text-sm body-white">
                    <strong>Operational Prototype:</strong> System prototype in operational environment.
                    Demonstration of actual system in operational environment.
                  </p>
                </AsymmetricTextCard>
                <AsymmetricTextCard title="TRL 8" accentPosition="left" theme="dark">
                  <p className="text-sm body-white">
                    <strong>Qualified System:</strong> System complete and qualified through test and
                    demonstration. Actual technology in final form.
                  </p>
                </AsymmetricTextCard>
                <AsymmetricTextCard title="TRL 9" accentPosition="left" theme="dark">
                  <p className="text-sm body-white">
                    <strong>Proven in Operations:</strong> Actual system proven through successful mission
                    operations. Full commercial deployment.
                  </p>
                </AsymmetricTextCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why TRL Matters Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              Why TRL Assessment Matters
            </h2>
            <p className="text-xl body-black">
              Accurate scoring prevents wasted applications and finds better matches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard
              title="Eligibility Gatekeeper"
              description="SBIR Phase I requires TRL 2-3. Phase II requires TRL 3-4. Apply with wrong TRL and you're automatically disqualified—no reviewer ever sees your application."
              number="01"
              theme="light"
            />

            <OffsetCard
              title="Competitive Positioning"
              description="Grants target specific readiness levels. TRL 5 companies applying to TRL 2 grants get rejected for being 'too mature.' Score determines grant fit."
              number="02"
              theme="light"
            />

            <OffsetCard
              title="Timeline Realism"
              description="TRL progression takes time. TRL 3→6 typically requires 18-36 months. Claiming unrealistic TRL jumps signals poor planning and gets rejected."
              number="03"
              theme="light"
            />

            <OffsetCard
              title="Funding Amount Alignment"
              description="Early TRL (1-4) gets smaller awards ($50K-$250K). Late TRL (6-8) qualifies for larger awards ($500K-$5M). Score affects budget expectations."
              number="04"
              theme="light"
            />
          </div>
        </div>
      </section>

      {/* Common Mistakes Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Common TRL Assessment Mistakes
            </h2>
            <p className="text-xl body-white">
              Avoid these critical errors that lead to rejection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Inflating TRL:</strong>
                  <span className="body-white ml-2">
                    Claiming TRL 6 when you're actually TRL 4. Reviewers see through this immediately
                    and question your credibility.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Confusing Lab vs. Field:</strong>
                  <span className="body-white ml-2">
                    "Relevant environment" (TRL 5-6) means real-world conditions, not just your lab.
                    Bench tests don't count.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Missing Evidence:</strong>
                  <span className="body-white ml-2">
                    Claiming TRL 7 requires documentation—test reports, pilot deployments, user data.
                    No evidence = rejection.
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Honest Assessment:</strong>
                  <span className="body-white ml-2">
                    Accurate TRL matches you with appropriate grants. Better to be TRL 4 applying to
                    TRL 4 grants than lying about TRL 6.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Environment Clarity:</strong>
                  <span className="body-white ml-2">
                    Specify exactly what "relevant environment" means for your technology. Hospital
                    simulation lab? Field trials? Be precise.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Supporting Data:</strong>
                  <span className="body-white ml-2">
                    Include test results, pilot metrics, validation reports. Concrete evidence
                    supports your TRL claim and builds credibility.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assessment Process Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              Our AI Assessment Process
            </h2>
            <p className="text-xl body-black">
              Multi-factor analysis for accurate TRL scoring
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MinimalIconCard
              icon={<Lightbulb className="w-10 h-10" />}
              label="Document Analysis - Parse pitch decks, whitepapers, websites"
              theme="light"
            />
            <MinimalIconCard
              icon={<FlaskConical className="w-10 h-10" />}
              label="Evidence Extraction - Identify test results, pilot data, validation"
              theme="light"
            />
            <MinimalIconCard
              icon={<Rocket className="w-10 h-10" />}
              label="Framework Mapping - Match descriptions to NASA TRL definitions"
              theme="light"
            />
            <MinimalIconCard
              icon={<CheckCircle2 className="w-10 h-10" />}
              label="Confidence Scoring - Flag ambiguous cases for manual review"
              theme="light"
            />
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold heading-black mb-6">What We Analyze</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">Testing Environment:</strong>
                  <span className="body-black ml-2">
                    Lab bench? Simulated conditions? Actual deployment? Environment determines TRL 3 vs. 5 vs. 7.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">Validation Data:</strong>
                  <span className="body-black ml-2">
                    User feedback? Performance metrics? Clinical trials? Evidence quality affects score confidence.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold">System Integration:</strong>
                  <span className="body-black ml-2">
                    Component-level testing (TRL 4) vs. integrated system (TRL 6) vs. full deployment (TRL 9).
                  </span>
                </div>
              </li>
            </ul>
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
              Get Your Free TRL Assessment
            </h2>
            <p className="text-xl body-white max-w-2xl mx-auto">
              Start with Stage 1 company profile. TRL scoring is included free, forever.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg"
              >
                Create Profile & Get TRL Score
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
