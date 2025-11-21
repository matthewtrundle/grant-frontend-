"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, AsymmetricTextCard } from "@/components/ui/abstract-cards";

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero - White */}
      <section className="section-light py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/docs" className="inline-block">
              <Badge className="bg-gray-200 text-black hover:bg-gray-300 px-4 py-2 text-sm cursor-pointer">
                ← Back to Documentation
              </Badge>
            </Link>

            <h1 className="text-5xl md:text-7xl font-playfair heading-black">
              <span className="accent-underline">How-To</span> Guides
            </h1>

            <p className="text-xl body-black">
              Practical guides for specific tasks and common workflows. Browse by topic below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stage 1 Guides - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-4xl heading-white mb-4">Stage 1: Company Profile</h2>
            <p className="text-xl body-white">Setup and optimization guides</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard
              title="Optimizing Your Company Description"
              description="Best practices for describing your technology. Include: what it does, how it works, what problems it solves, competitive advantages. Aim for 250-500 words."
              number="01"
              theme="dark"
            />

            <OffsetCard
              title="Understanding TRL Scores"
              description="How to interpret your TRL 1-9 assessment. What each level means for grant eligibility. When to request manual TRL review if AI score seems wrong."
              number="02"
              theme="dark"
            />

            <OffsetCard
              title="Adding Team Credentials"
              description="Highlight PhD degrees, patents, industry experience, publications. Grants value technical expertise—don't undersell your team."
              number="03"
              theme="dark"
            />

            <OffsetCard
              title="Updating Your Profile"
              description="When to update: after major milestones, TRL progression, new partnerships, patent grants, or pilot customer acquisition."
              number="04"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Stage 2 Guides - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-4xl heading-black mb-4">Stage 2: Grant Discovery</h2>
            <p className="text-xl body-black">Search and evaluation guides</p>
          </div>

          <div className="space-y-8">
            <AsymmetricTextCard title="Interpreting Fit Scores" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p><strong>What affects fit scores:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• TRL match (±1 level = good, ±2 = okay, ±3+ = poor)</li>
                  <li>• Industry alignment (exact match = high, adjacent = medium)</li>
                  <li>• Award size vs. company stage (too small/large reduces score)</li>
                  <li>• Geographic restrictions (CA-only grants score low for NY companies)</li>
                </ul>
                <p><strong>Action:</strong> Focus on 70+ scores. Ignore 50- scores.</p>
              </div>
            </AsymmetricTextCard>

            <AsymmetricTextCard title="Using Advanced Search Filters" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p><strong>Keyword tips:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• Use specific tech terms: "CRISPR" not "biotech"</li>
                  <li>• Include synonyms: "AI" + "machine learning" + "deep learning"</li>
                  <li>• Try program names: "SBIR Phase I" + "NSF I-Corps"</li>
                </ul>
                <p><strong>Filter strategy:</strong> Start broad, then narrow by TRL → Award size → Deadline</p>
              </div>
            </AsymmetricTextCard>

            <AsymmetricTextCard title="Tracking Grants for Later" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p>Click "Save for Later" on any grant result. Access saved grants from Dashboard → Saved Grants.</p>
                <p><strong>Use cases:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• Grant opens in 3 months—track for future application</li>
                  <li>• Need team approval—save and share link with stakeholders</li>
                  <li>• Good fit but no capacity right now—revisit next quarter</li>
                </ul>
              </div>
            </AsymmetricTextCard>
          </div>
        </div>
      </section>

      {/* Stage 3 Guides - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-4xl heading-white mb-4">Stage 3: RFP Analysis</h2>
            <p className="text-xl body-white">Understanding and using analysis reports</p>
          </div>

          <div className="space-y-8">
            <AsymmetricTextCard title="Reading Timeline Reports" accentPosition="left" theme="dark">
              <div className="space-y-4 text-sm body-white">
                <p><strong>Timeline includes:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• Submission deadlines (LOI, full proposal, supporting docs)</li>
                  <li>• Milestone dates (award notification, project start)</li>
                  <li>• Reporting requirements (quarterly, annual, final)</li>
                </ul>
                <p><strong>Use calendar export:</strong> Click "Export to Calendar" to sync all deadlines to Google/Outlook.</p>
              </div>
            </AsymmetricTextCard>

            <AsymmetricTextCard title="Budget Validation Errors" accentPosition="left" theme="dark">
              <div className="space-y-4 text-sm body-white">
                <p><strong>Common errors flagged:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• Exceeding category limits (travel, consultants, equipment)</li>
                  <li>• Missing required cost share percentage</li>
                  <li>• Disallowed expenses (foreign travel, capital equipment)</li>
                  <li>• Math errors (columns don't sum, indirect rate miscalculated)</li>
                </ul>
                <p><strong>Action:</strong> Fix ALL red flags before proceeding to Stage 4.</p>
              </div>
            </AsymmetricTextCard>

            <AsymmetricTextCard title="Using Go/No-Go Recommendations" accentPosition="left" theme="dark">
              <div className="space-y-4 text-sm body-white">
                <p><strong>GO signals:</strong> High fit score (70+), no major red flags, achievable timeline, budget matches capacity.</p>
                <p><strong>NO-GO signals:</strong> TRL mismatch, missing required partnerships, insufficient runway, unallowable costs exceed 30%.</p>
                <p><strong>Trust the recommendation:</strong> 87% accuracy rate. If report says NO-GO, skip this grant.</p>
              </div>
            </AsymmetricTextCard>
          </div>
        </div>
      </section>

      {/* Stage 4 Guides - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-4xl heading-black mb-4">Stage 4: Application Generation</h2>
            <p className="text-xl body-black">Review and finalization guides</p>
          </div>

          <div className="space-y-8">
            <AsymmetricTextCard title="Reviewing Generated Applications" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p><strong>What to check:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• Accuracy: Verify all technical claims are correct</li>
                  <li>• Consistency: Same numbers/facts across all sections</li>
                  <li>• Completeness: All required sections present</li>
                  <li>• Word limits: Each section within specified limits</li>
                </ul>
                <p><strong>Edit DOCX version:</strong> Make corrections, add company-specific details, update timeline if needed.</p>
              </div>
            </AsymmetricTextCard>

            <AsymmetricTextCard title="Understanding Assessor Scores" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p><strong>Three scores per response:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• Technical (0-10): Feasibility, innovation, methodology</li>
                  <li>• Business (0-10): Market opportunity, commercialization, budget</li>
                  <li>• Academic (0-10): Research rigor, broader impacts, dissemination</li>
                </ul>
                <p><strong>Target:</strong> All sections 7+. Sections 6- were revised automatically.</p>
              </div>
            </AsymmetricTextCard>

            <AsymmetricTextCard title="Final Submission Checklist" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p><strong>Before submitting to grant agency:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>✓ All sections reviewed for accuracy</li>
                  <li>✓ Word limits verified (use platform counter, not Word)</li>
                  <li>✓ Budget numbers match narrative claims</li>
                  <li>✓ Required appendices attached (bios, letters, data)</li>
                  <li>✓ PDF generated with correct formatting</li>
                  <li>✓ Signatures obtained (PI, authorized official)</li>
                </ul>
              </div>
            </AsymmetricTextCard>
          </div>
        </div>
      </section>

      {/* CTA - Black */}
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
              Ready to Apply These Guides?
            </h2>
            <p className="text-xl body-white max-w-2xl mx-auto">
              Create your free company profile and start discovering grants.
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
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-6 text-lg"
                >
                  Getting Started Guide
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
