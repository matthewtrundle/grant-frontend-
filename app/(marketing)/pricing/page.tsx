"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { CircuitBackground } from "@/components/ui/circuit-background";

export default function PricingPage() {
  return (
    <div className="min-h-screen relative">
      {/* Circuit Background */}
      <CircuitBackground
        density="medium"
        glowColor="#6C47FF"
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
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm badge-pulse">Pricing</Badge>
            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl mx-auto">
              Simple, <span className="accent-underline">Transparent</span> Pricing
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl mx-auto">
              Start free with Stages 1 & 2, then pay only for the analysis and generation you need
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
                    <span className="text-sm text-gray-300">Stage 2: Grant Discovery & Matching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Up to 3 company profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Unlimited grant searches</span>
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
                    <span className="text-sm text-gray-300">Eligibility check with detailed reasoning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Timeline with milestones & dependencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Budget breakdown by category</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Requirements checklist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Success factors & risk mitigation</span>
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
                    <span className="text-sm text-gray-300">RAG-powered writing with proven examples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">3-assessor simulation (Tech, Business, Academic)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Iterative improvement to target score</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Consistency checking across sections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-gray-300">Download PDF/DOCX formats</span>
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
              <h3 className="text-xl font-semibold text-white mb-2">Can I purchase just Stage 3 or Stage 4?</h3>
              <p className="body-white">Yes! You can purchase each stage individually. Stage 3 ($199) gives you the analysis, and Stage 4 ($999) includes everything plus the full application.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">How long does it take to generate an application?</h3>
              <p className="body-white">Stage 4 typically completes in 30-60 minutes, depending on grant complexity. You&apos;ll see real-time progress updates.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">What if I&apos;m not satisfied with the results?</h3>
              <p className="body-white">We use iterative improvement with 3-assessor simulation to ensure quality scores. If you need revisions, contact support and we&apos;ll work with you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
