"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, AsymmetricTextCard } from "@/components/ui/abstract-cards";

export default function GettingStartedPage() {
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
              <span className="accent-underline">Getting Started</span> Guide
            </h1>

            <p className="text-xl body-black">
              Complete walkthrough from signup to your first grant application submission.
              Follow these steps in order for the best experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step 1 - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Badge className="bg-white text-black px-4 py-2 text-sm mb-4">Step 1</Badge>
            <h2 className="text-4xl heading-white mb-4">Create Your Account</h2>
            <p className="text-xl body-white">Sign up and verify your email address</p>
          </div>

          <div className="space-y-6 body-white">
            <p>
              Navigate to <Link href="/sign-up" className="text-purple-400 hover:text-purple-300 underline">/sign-up</Link> and
              create your account using email or social login (Google, Microsoft).
            </p>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-white">What you'll need:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Work email address (yourname@company.com preferred)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Company name and website URL</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Your role at the company (Founder, CTO, Research Director, etc.)</span>
                </li>
              </ul>
            </div>

            <p>
              After signup, verify your email address by clicking the link sent to your inbox. This unlocks full
              access to all stages.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <ArrowDown className="w-8 h-8 text-white opacity-50" />
          </div>
        </div>
      </section>

      {/* Step 2 - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Badge className="bg-black text-white px-4 py-2 text-sm mb-4">Step 2</Badge>
            <h2 className="text-4xl heading-black mb-4">Stage 1: Create Company Profile</h2>
            <p className="text-xl body-black">Upload documents and get your TRL assessment</p>
          </div>

          <div className="space-y-6 body-black">
            <p>
              Navigate to <strong>Dashboard → Stage 1: Profile</strong>. This is where AI extracts key facts about
              your company, technology, and team.
            </p>

            <AsymmetricTextCard title="Upload Documents" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p>Accepted formats: PDF, DOCX, website URLs</p>
                <p><strong>Recommended uploads:</strong></p>
                <ul className="space-y-2 ml-4">
                  <li>• Pitch deck (10-20 slides)</li>
                  <li>• Company website URL</li>
                  <li>• Product whitepaper or technical documentation</li>
                  <li>• Team bios or LinkedIn profiles</li>
                </ul>
              </div>
            </AsymmetricTextCard>

            <AsymmetricTextCard title="AI Extraction Process" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p>AI analyzes your documents and extracts:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Core technology description</li>
                  <li>• Technology Readiness Level (TRL 1-9)</li>
                  <li>• Team expertise and credentials</li>
                  <li>• Target market and customers</li>
                  <li>• Intellectual property status</li>
                  <li>• Development milestones achieved</li>
                </ul>
                <p className="font-semibold mt-4">Processing time: 2-5 minutes</p>
              </div>
            </AsymmetricTextCard>

            <AsymmetricTextCard title="Review & Confirm" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p>After AI extraction, review the results:</p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>TRL Score:</strong> Verify accuracy. Edit if needed.</li>
                  <li>• <strong>Technology Summary:</strong> Ensure key innovations are captured.</li>
                  <li>• <strong>Team Credentials:</strong> Add missing expertise.</li>
                </ul>
                <p className="font-semibold mt-4">Click "Save Profile" when satisfied.</p>
              </div>
            </AsymmetricTextCard>
          </div>

          <div className="mt-8 flex justify-center">
            <ArrowDown className="w-8 h-8 opacity-50" />
          </div>
        </div>
      </section>

      {/* Step 3 - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Badge className="bg-white text-black px-4 py-2 text-sm mb-4">Step 3</Badge>
            <h2 className="text-4xl heading-white mb-4">Stage 2: Discover Grants</h2>
            <p className="text-xl body-white">Search and find matching funding opportunities</p>
          </div>

          <div className="space-y-6 body-white">
            <p>
              Navigate to <strong>Dashboard → Stage 2: Discover</strong>. Search for grants matching your company profile.
            </p>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-white">Search Options:</h3>
              <ul className="space-y-3">
                <li>
                  <strong>Keyword Search:</strong> Enter technology terms (e.g., "AI healthcare", "battery storage")
                </li>
                <li>
                  <strong>TRL Filter:</strong> Automatically filters to your TRL range (±1 level)
                </li>
                <li>
                  <strong>Award Amount:</strong> Filter by funding size ($50K-$10M+)
                </li>
                <li>
                  <strong>Program Type:</strong> SBIR, NSF, DOE, state programs, private foundations
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-white">Understanding Fit Scores (0-100):</h3>
              <ul className="space-y-3">
                <li>• <strong>80-100:</strong> <span className="text-green-400">Excellent match</span> - High win probability</li>
                <li>• <strong>60-79:</strong> <span className="text-yellow-400">Good match</span> - Worth applying</li>
                <li>• <strong>0-59:</strong> <span className="text-red-400">Weak match</span> - Skip for better opportunities</li>
              </ul>
              <p className="mt-4">
                Focus on grants scoring 70+ for best ROI on your time.
              </p>
            </div>

            <p>
              <strong>Next step:</strong> Click "Analyze Grant" on any result to move to Stage 3.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <ArrowDown className="w-8 h-8 text-white opacity-50" />
          </div>
        </div>
      </section>

      {/* Step 4 - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Badge className="bg-black text-white px-4 py-2 text-sm mb-4">Step 4</Badge>
            <h2 className="text-4xl heading-black mb-4">Stage 3: Analyze RFP (Optional, $199)</h2>
            <p className="text-xl body-black">Deep analysis before writing application</p>
          </div>

          <div className="space-y-6 body-black">
            <p>
              <strong>Stage 3 is optional but highly recommended.</strong> $199 gets you comprehensive RFP analysis
              that prevents wasted effort on grants you can't win.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AsymmetricTextCard title="What's Included" accentPosition="left" theme="light">
                <ul className="space-y-2 text-sm body-black">
                  <li>• Timeline extraction (all deadlines)</li>
                  <li>• Budget requirements & validation</li>
                  <li>• Evaluation criteria breakdown</li>
                  <li>• Success factors analysis</li>
                  <li>• Risk assessment (red flags)</li>
                  <li>• Go/no-go recommendation</li>
                </ul>
              </AsymmetricTextCard>

              <AsymmetricTextCard title="Processing Time" accentPosition="left" theme="light">
                <div className="space-y-4 text-sm body-black">
                  <p>15 minutes for AI analysis</p>
                  <p>Deliverables:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• PDF analysis report</li>
                    <li>• Visual timeline (Gantt chart)</li>
                    <li>• Budget template (Excel)</li>
                    <li>• Risk assessment summary</li>
                  </ul>
                </div>
              </AsymmetricTextCard>
            </div>

            <p className="font-semibold">
              Skip Stage 3 if you're confident about the grant and ready to write immediately. Otherwise, $199 saves
              40+ hours of manual RFP analysis.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <ArrowDown className="w-8 h-8 opacity-50" />
          </div>
        </div>
      </section>

      {/* Step 5 - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Badge className="bg-white text-black px-4 py-2 text-sm mb-4">Step 5</Badge>
            <h2 className="text-4xl heading-white mb-4">Stage 4: Generate Application ($999)</h2>
            <p className="text-xl body-white">Complete, submission-ready grant application</p>
          </div>

          <div className="space-y-6 body-white">
            <p>
              Navigate to <strong>Dashboard → Stage 4: Generate</strong>. Upload the RFP (if you skipped Stage 3) and
              initiate application generation.
            </p>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-white">Generation Process (48 hours):</h3>
              <ol className="space-y-3 list-decimal list-inside">
                <li>AI retrieves 3-5 relevant examples from successful grants database</li>
                <li>Generates draft responses for all required sections</li>
                <li>3-assessor simulation scores each response (technical, business, academic)</li>
                <li>Revisions made for any section scoring below 7/10</li>
                <li>Final consistency check across all sections</li>
                <li>Word limit enforcement and formatting</li>
                <li>PDF + DOCX export generation</li>
              </ol>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-white">What You Receive:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Complete narrative (all required sections)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Executive summary</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Budget narrative with line-item justifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Appendices (data tables, bios, support letters)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>PDF (submission-ready) + DOCX (editable)</span>
                </li>
              </ul>
            </div>

            <p className="font-semibold">
              Download files from dashboard. Review, make any final edits in DOCX version, then submit PDF to grant
              agency portal.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps - White */}
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
              Ready to Start?
            </h2>
            <p className="text-xl body-black max-w-2xl mx-auto">
              Create your free company profile and complete Stage 1 in 15 minutes.
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
              <Link href="/docs/guides">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-black text-black hover:bg-black hover:text-white px-12 py-6 text-lg"
                >
                  View How-To Guides
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
