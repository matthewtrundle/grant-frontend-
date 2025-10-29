"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Bell, FileText, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, StatCard, FloatingContentCard, MinimalIconCard, QuoteCard } from "@/components/ui/abstract-cards";

export default function TrackerPage() {
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
              Application Tracker • FREE
            </Badge>

            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              Grant Application <span className="accent-underline">Tracker</span>
            </h1>

            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Track submissions, monitor deadlines, manage reporting requirements, and measure success rates
              across all your grant applications. Never miss a deadline again.
            </p>

            <div className="flex gap-4 flex-wrap pt-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-6 text-lg"
                >
                  Start Tracking Applications
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
              stat="100%"
              label="Free Feature"
              description="Included with every account"
              theme="light"
            />
            <StatCard
              stat="30 days"
              label="Advance Alerts"
              description="Before critical deadlines"
              theme="light"
            />
            <StatCard
              stat="∞"
              label="Applications"
              description="Track unlimited grants"
              theme="light"
            />
          </motion.div>
        </div>
      </section>

      {/* Key Features Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Complete Application Management
            </h2>
            <p className="text-xl body-white">
              From submission to award notification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard
              title="Deadline Tracking"
              description="Automated calendar of all critical dates: submissions, revisions, reporting, renewals. 30-day advance alerts ensure you never miss a deadline."
              number="01"
              theme="dark"
            />

            <OffsetCard
              title="Status Pipeline"
              description="Visual workflow: Draft → Submitted → Under Review → Revision Requested → Awarded/Rejected. See exactly where each application stands."
              number="02"
              theme="dark"
            />

            <OffsetCard
              title="Document Management"
              description="Store all versions of proposals, budgets, supporting docs. Track what was submitted, when, and to which grant program."
              number="03"
              theme="dark"
            />

            <OffsetCard
              title="Success Analytics"
              description="Win rate by grant type, average award size, time-to-decision metrics. Optimize your grant strategy with data."
              number="04"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Status Tracking Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              Application Status Workflow
            </h2>
            <p className="text-xl body-black">
              Track progress through every stage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FloatingContentCard theme="light" elevation="subtle">
              <div className="space-y-4">
                <Clock className="w-12 h-12" />
                <h3 className="text-xl font-bold">Pre-Submission</h3>
                <ul className="space-y-2 text-sm body-black">
                  <li>• Draft in Progress</li>
                  <li>• Internal Review</li>
                  <li>• Awaiting Signatures</li>
                  <li>• Ready to Submit</li>
                </ul>
                <Badge className="bg-yellow-600 text-white">In Development</Badge>
              </div>
            </FloatingContentCard>

            <FloatingContentCard theme="light" elevation="subtle">
              <div className="space-y-4">
                <FileText className="w-12 h-12" />
                <h3 className="text-xl font-bold">Under Review</h3>
                <ul className="space-y-2 text-sm body-black">
                  <li>• Submitted</li>
                  <li>• Administrative Review</li>
                  <li>• Peer Review</li>
                  <li>• Revision Requested</li>
                </ul>
                <Badge className="bg-blue-600 text-white">Active</Badge>
              </div>
            </FloatingContentCard>

            <FloatingContentCard theme="light" elevation="subtle">
              <div className="space-y-4">
                <CheckCircle2 className="w-12 h-12" />
                <h3 className="text-xl font-bold">Final Status</h3>
                <ul className="space-y-2 text-sm body-black">
                  <li>• Awarded (Funded)</li>
                  <li>• Not Awarded</li>
                  <li>• Withdrawn</li>
                  <li>• Declined</li>
                </ul>
                <Badge className="bg-green-600 text-white">Closed</Badge>
              </div>
            </FloatingContentCard>
          </div>
        </div>
      </section>

      {/* Alerts & Notifications Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Smart Alerts & Reminders
            </h2>
            <p className="text-xl body-white">
              Never miss a critical deadline
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MinimalIconCard
              icon={<Bell className="w-10 h-10" />}
              label="30-Day Warning - Submission deadline approaching"
              theme="dark"
            />
            <MinimalIconCard
              icon={<Calendar className="w-10 h-10" />}
              label="7-Day Urgent - Final week before deadline"
              theme="dark"
            />
            <MinimalIconCard
              icon={<FileText className="w-10 h-10" />}
              label="Reporting Due - Quarterly/annual reports needed"
              theme="dark"
            />
            <MinimalIconCard
              icon={<TrendingUp className="w-10 h-10" />}
              label="Decision Timeline - Expected notification dates"
              theme="dark"
            />
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold heading-white mb-8">Alert Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Email Notifications:</strong>
                  <span className="body-white ml-2">
                    Daily digest or instant alerts. Choose your cadence and notification types.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Dashboard Indicators:</strong>
                  <span className="body-white ml-2">
                    Visual badges for upcoming deadlines. Red/yellow/green status at a glance.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Calendar Export:</strong>
                  <span className="body-white ml-2">
                    Sync deadlines to Google Calendar, Outlook, or Apple Calendar automatically.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <strong className="font-semibold text-white">Team Notifications:</strong>
                  <span className="body-white ml-2">
                    Share deadline alerts with collaborators. Ensure entire team is aligned.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-black mb-4">
              Success Metrics & Analytics
            </h2>
            <p className="text-xl body-black">
              Data-driven grant strategy optimization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold heading-black mb-6">Track Performance</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Win Rate by Type:</strong>
                    <span className="body-black ml-2">
                      40% success on SBIR vs. 25% on NSF. Focus efforts on high-win programs.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Average Award Size:</strong>
                    <span className="body-black ml-2">
                      Track typical grant amounts. Know which programs offer better ROI for your time.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Time to Decision:</strong>
                    <span className="body-black ml-2">
                      NSF takes 6 months, SBIR takes 3 months. Plan pipeline based on actual timelines.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold heading-black mb-6">Optimize Strategy</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Identify Patterns:</strong>
                    <span className="body-black ml-2">
                      Discover which grant types, review panels, or program officers yield best results.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Portfolio Management:</strong>
                    <span className="body-black ml-2">
                      Balance applications across stages. Maintain healthy pipeline of Draft/Submitted/Under Review.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold">Trend Analysis:</strong>
                    <span className="body-black ml-2">
                      Year-over-year improvement. Are your success rates increasing? Is time-to-award decreasing?
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Requirements Section - Black Background */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading-white mb-4">
              Post-Award Tracking
            </h2>
            <p className="text-xl body-white">
              Manage reporting requirements after you win
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold heading-white">Reporting Calendar</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold text-white">Quarterly Reports:</strong>
                    <span className="body-white ml-2">
                      Track due dates for progress reports, financial reports, invention disclosures.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold text-white">Annual Reports:</strong>
                    <span className="body-white ml-2">
                      Comprehensive project summaries, budget justifications, outcomes achieved.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold text-white">Final Reports:</strong>
                    <span className="body-white ml-2">
                      Project closeout requirements, final financial accounting, impact assessment.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold heading-white">Compliance Tracking</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold text-white">Milestone Achievement:</strong>
                    <span className="body-white ml-2">
                      Log completed milestones, deliverables, and performance metrics as specified in award.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold text-white">Budget Monitoring:</strong>
                    <span className="body-white ml-2">
                      Track spending against approved budget. Alert when categories approach limits.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <strong className="font-semibold text-white">No-Cost Extensions:</strong>
                    <span className="body-white ml-2">
                      Request deadline extensions when needed. Track approval status and revised timelines.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - White Background */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <QuoteCard
            quote="We were tracking 12 applications in a spreadsheet. Missed a revision deadline and lost a $150K grant. Switched to the tracker—never happened again."
            author="Amanda Lopez"
            role="Research Director, Clean Energy Lab"
            theme="light"
          />
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
              Start Tracking Applications Today
            </h2>
            <p className="text-xl body-white max-w-2xl mx-auto">
              Free with every account. Track unlimited grants, get deadline alerts, measure success rates.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg"
              >
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
