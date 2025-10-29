"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, Heart, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";
import { OffsetCard, MinimalIconCard, FloatingContentCard } from "@/components/ui/abstract-cards";

export default function CareersPage() {
  const openings = [
    {
      title: "Senior AI Engineer (Grant Writing)",
      team: "Product Engineering",
      location: "Remote (US)",
      type: "Full-time",
      description: "Build next-gen AI agents for grant application generation. Work with Claude, RAG systems, and multi-agent orchestration."
    },
    {
      title: "Grant Domain Expert",
      team: "Content & Strategy",
      location: "Remote (US)",
      type: "Full-time",
      description: "Former grant writer or program officer. Help train AI models, validate outputs, and advise on grant compliance."
    },
    {
      title: "Founding Sales Lead",
      team: "Go-to-Market",
      location: "Remote (US)",
      type: "Full-time",
      description: "Build our sales motion from scratch. Target: tech founders, research directors, grant consultants. $200M+ TAM."
    }
  ];

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
            <Badge className="bg-black text-white px-4 py-2 text-sm">Careers</Badge>
            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              Build the <span className="accent-underline">Future</span> of Grant Funding
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl">
              We're a small team solving a $50B problem. Join us in democratizing access to non-dilutive funding for
              innovators worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-4xl heading-white mb-4">Why Join Us</h2>
            <p className="text-xl body-white">What makes this opportunity different</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <OffsetCard
              title="Real Impact"
              description="Help companies secure billions in non-dilutive funding. We've already helped 500+ companies win $200M+. Your work directly changes founders' lives."
              number="01"
              theme="dark"
            />

            <OffsetCard
              title="Hard Technical Problems"
              description="Multi-agent systems, RAG optimization, domain-specific AI evaluation. Not another CRUD app. Real AI engineering challenges daily."
              number="02"
              theme="dark"
            />

            <OffsetCard
              title="Product-Market Fit Achieved"
              description="$999 ACV, 40%+ win rate, customers love us. You're not validating an idea—you're scaling a working product."
              number="03"
              theme="dark"
            />

            <OffsetCard
              title="Founding Team Opportunity"
              description="Early employee equity. Shape culture, product, and strategy. Your decisions matter. No corporate bureaucracy."
              number="04"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Values - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl heading-black mb-4">Our Values</h2>
            <p className="text-xl body-black">What we believe and how we work</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MinimalIconCard
              icon={<Zap className="w-10 h-10" />}
              label="Move Fast - Ship daily. Iterate quickly. Bias toward action."
              theme="light"
            />
            <MinimalIconCard
              icon={<Heart className="w-10 h-10" />}
              label="Customer Obsessed - Every feature solves real user pain. We win when they win."
              theme="light"
            />
            <MinimalIconCard
              icon={<Users className="w-10 h-10" />}
              label="Radical Candor - Direct feedback. No politics. Best idea wins."
              theme="light"
            />
            <MinimalIconCard
              icon={<Briefcase className="w-10 h-10" />}
              label="Own Outcomes - Take ownership. Fix what's broken. Don't wait for permission."
              theme="light"
            />
          </div>
        </div>
      </section>

      {/* Open Positions - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <h2 className="text-4xl heading-white mb-4">Open Positions</h2>
            <p className="text-xl body-white">3 roles, all remote (US-based preferred)</p>
          </div>

          <div className="space-y-6">
            {openings.map((job, index) => (
              <FloatingContentCard key={index} theme="dark" elevation="subtle">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold heading-white mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <Badge className="bg-purple-950 text-purple-300 border border-purple-600/30">
                          {job.team}
                        </Badge>
                        <span className="text-gray-400">{job.location}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">{job.type}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-950/50 whitespace-nowrap"
                    >
                      Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                  <p className="body-white">{job.description}</p>
                </div>
              </FloatingContentCard>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-900 border border-gray-800 rounded-lg">
            <p className="body-white mb-4">
              <strong className="text-white">Don't see your role?</strong> We're always looking for exceptional people.
              If you're passionate about AI, grants, or helping innovators succeed, reach out.
            </p>
            <p className="text-sm text-gray-400">
              Email us at <a href="mailto:careers@grantautomation.com" className="text-purple-400 hover:text-purple-300 underline">careers@grantautomation.com</a> with
              your background and why you're interested.
            </p>
          </div>
        </div>
      </section>

      {/* Perks - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-4xl heading-black mb-4">Perks & Benefits</h2>
            <p className="text-xl body-black">We take care of our team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-xl font-bold heading-black">💰 Compensation</h3>
              <ul className="space-y-2 body-black text-sm">
                <li>• Competitive salary (top 25% for role)</li>
                <li>• Meaningful equity (0.5%-2% depending on role)</li>
                <li>• Annual performance bonuses</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold heading-black">🏥 Health & Wellness</h3>
              <ul className="space-y-2 body-black text-sm">
                <li>• Platinum health insurance (medical, dental, vision)</li>
                <li>• Unlimited PTO (minimum 3 weeks/year enforced)</li>
                <li>• Mental health support ($200/mo stipend)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold heading-black">💻 Work Setup</h3>
              <ul className="space-y-2 body-black text-sm">
                <li>• $3K home office budget</li>
                <li>• Latest MacBook Pro + peripherals</li>
                <li>• Co-working space membership</li>
              </ul>
            </div>
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
            <h2 className="text-4xl md:text-5xl heading-white">Ready to Join?</h2>
            <p className="text-xl body-white max-w-2xl mx-auto">
              Apply to an open role or reach out directly. We review every application.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg"
              >
                View Open Roles
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="mailto:careers@grantautomation.com">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-6 text-lg"
                >
                  Email Us Directly
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
