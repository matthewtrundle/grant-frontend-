"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { DNABackground } from "@/components/ui/dna-background";

export default function PricingPage() {
  return (
    <div className="min-h-screen relative">
      {/* DNA Background */}
      <DNABackground
        density="medium"
        glowColor="#14B8A6"
        pattern="molecular"
        opacity={0.12}
        className="fixed inset-0 z-0"
      />

      {/* Hero - White with circuit pattern */}
      <section className="section-light py-24 md:py-32 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-gradient-to-r from-ocean-600 via-teal-600 to-ocean-700 text-white px-4 py-2 text-sm badge-pulse">Pricing</Badge>
            <h1 className="text-5xl md:text-7xl font-playfair heading-black max-w-4xl mx-auto">
              <span className="accent-underline">Transparent</span> Pricing for Healthcare Innovators
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl mx-auto">
              Start free with company profiling and NIH/FDA grant discovery, then pay only for the analysis and application you need
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Free</CardTitle>
                <CardDescription className="text-gray-400">Lead Generation</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-white">$0</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Stage 1: Company Profile & TRL Assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Stage 2: NIH, FDA, and CDC Grant Discovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Up to 3 biotech/medtech profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Unlimited healthcare grant searches</span>
                  </li>
                </ul>
                <Link href="/sign-up">
                  <Button className="w-full btn-magnetic" variant="outline">Get Started Free</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-accent border-2 relative card-hover-lift shadow-professional-hover">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent text-white badge-pulse">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-white">Pro</CardTitle>
                <CardDescription className="text-gray-400">Grant Analysis</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-white">$199</span>
                  <span className="text-gray-400 text-lg">/grant</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Everything in Free</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Stage 3: Comprehensive RFP Analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">FDA compliance and regulatory pathway checking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Clinical trial timeline with milestones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Budget breakdown by research category</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">NIH/FDA requirements checklist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Success factors & regulatory risk mitigation</span>
                  </li>
                </ul>
                <Link href="/sign-up">
                  <Button className="w-full bg-accent hover:bg-accent-hover text-white btn-magnetic">Start Analysis</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Enterprise</CardTitle>
                <CardDescription className="text-gray-400">Full Application</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-white">$999</span>
                  <span className="text-gray-400 text-lg">/grant</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Stage 4: Complete Grant Application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">NIH SBIR/STTR and FDA grant templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">RAG-powered writing with successful healthcare examples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">3-assessor simulation (Technical, Clinical, Commercial)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Iterative improvement to target score</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Clinical consistency checking across sections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Download NIH-compliant PDF/DOCX formats</span>
                  </li>
                </ul>
                <Link href="/sign-up">
                  <Button className="w-full btn-magnetic" variant="outline">Generate Application</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl heading-black text-center mb-12">Feature Comparison</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold heading-black">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold heading-black">Free</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold heading-black">Pro ($199)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold heading-black">Enterprise ($999)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm body-black">Company Profile & TRL</td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm body-black">Grant Discovery</td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm body-black">RFP Analysis</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm body-black">Timeline & Budget</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm body-black">Full Application Generation</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm body-black">3-Assessor Simulation</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center text-gray-400">—</td>
                  <td className="px-6 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-success mx-auto" aria-hidden="true" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl heading-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Do I need a credit card to start?</h3>
              <p className="body-white">No! Stages 1 and 2 are completely free with no credit card required. You only pay when you want to analyze or generate applications.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Do you support NIH SBIR/STTR applications?</h3>
              <p className="body-white">Yes! Our Stage 4 Enterprise tier includes NIH SBIR/STTR templates and specialized knowledge of NIH grant requirements, review criteria, and successful application patterns.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Can you handle FDA regulatory grant requirements?</h3>
              <p className="body-white">Absolutely. Our Pro tier includes FDA compliance checking and regulatory pathway assessment. We understand FDA grant requirements, clinical trial protocols, and regulatory milestones.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">How long does it take to generate a healthcare grant application?</h3>
              <p className="body-white">Stage 4 typically completes in 30-60 minutes for most NIH and FDA grants. Complex clinical trial applications may take longer. You&apos;ll see real-time progress updates throughout.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">What if I&apos;m not satisfied with the results?</h3>
              <p className="body-white">We use iterative improvement with 3-assessor simulation (Technical, Clinical, Commercial) to ensure quality scores. If you need revisions, contact support and we&apos;ll work with you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
