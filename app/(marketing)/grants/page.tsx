"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, Database, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingContentCard, StatCard, AsymmetricTextCard } from "@/components/ui/abstract-cards";
import { CircuitBackground } from "@/components/ui/circuit-background";

export default function GrantsPage() {
  const featuredGrants = [
    {
      title: "SBIR Phase I",
      agency: "NSF, NIH, DOE, DoD, NASA",
      award: "$50K-$275K",
      deadline: "Rolling",
      trl: "2-5",
      category: "R&D",
      description: "Proof of concept funding for early-stage technology. No revenue required. Focus on technical feasibility and innovation."
    },
    {
      title: "SBIR Phase II",
      agency: "Multiple Federal Agencies",
      award: "$750K-$1.9M",
      deadline: "Varies by agency",
      trl: "4-7",
      category: "R&D",
      description: "Scale-up funding after successful Phase I. Focus on commercialization path, pilot customers, and market validation."
    },
    {
      title: "DOE ARPA-E",
      agency: "Department of Energy",
      award: "$1M-$10M",
      deadline: "Quarterly FOAs",
      trl: "3-6",
      category: "Clean Energy",
      description: "High-risk, high-reward energy technology. Breakthrough potential required. Program director engagement critical."
    },
    {
      title: "NSF I-Corps",
      agency: "National Science Foundation",
      award: "$50K",
      deadline: "3 cohorts/year",
      trl: "3-5",
      category: "Commercialization",
      description: "Customer discovery and business model validation. 7-week intensive program. No equity, no dilution."
    },
    {
      title: "NIST MEP",
      agency: "National Institute of Standards",
      award: "$100K-$500K",
      deadline: "Annual",
      trl: "7-9",
      category: "Manufacturing",
      description: "Advanced manufacturing process improvement. Focus on workforce development, technology adoption, supply chain."
    },
    {
      title: "State SBIR Match",
      agency: "Various State Programs",
      award: "$50K-$250K",
      deadline: "Varies by state",
      trl: "2-7",
      category: "State Funding",
      description: "State-level matching funds for federal SBIR awards. No additional application often required after federal win."
    }
  ];

  return (
    <div className="min-h-screen relative">
      <CircuitBackground
        density="medium"
        glowColor="#3B82F6"
        opacity={0.10}
        className="fixed inset-0 z-0"
      />
      {/* Hero - White */}
      <section className="section-light py-24 relative z-10 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-black text-white px-4 py-2 text-sm">Grant Database</Badge>
            <h1 className="text-5xl md:text-7xl font-playfair heading-black max-w-4xl">
              <span className="accent-underline">2,400+</span> Active Grant Programs
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Federal, state, and private foundation grants. Updated daily. Matched to your company profile automatically.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StatCard
              stat="2,400+"
              label="Active Grants"
              description="Across all industries and stages"
              theme="light"
            />
            <StatCard
              stat="$89B"
              label="Total Available"
              description="In annual grant funding"
              theme="light"
            />
            <StatCard
              stat="Daily"
              label="Database Updates"
              description="New opportunities added constantly"
              theme="light"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Grants - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-4xl heading-white mb-4">Featured Grant Programs</h2>
            <p className="text-xl body-white">Popular funding opportunities across all stages</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredGrants.map((grant, index) => (
              <FloatingContentCard key={index} theme="dark" elevation="subtle">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold heading-white mb-2">{grant.title}</h3>
                      <p className="text-sm text-gray-400">{grant.agency}</p>
                    </div>
                    <Badge className="bg-purple-950 text-purple-300 border border-ocean-600/30 whitespace-nowrap">
                      {grant.category}
                    </Badge>
                  </div>

                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Award:</span>
                      <span className="text-white ml-2 font-semibold">{grant.award}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">TRL:</span>
                      <span className="text-white ml-2 font-semibold">{grant.trl}</span>
                    </div>
                  </div>

                  <p className="body-white text-sm">{grant.description}</p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-400">
                      <strong className="text-gray-300">Deadline:</strong> {grant.deadline}
                    </span>
                    <Button
                      variant="ghost"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-950/50 text-sm"
                    >
                      View Details <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </FloatingContentCard>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              These are just 6 of 2,400+ grants in our database. Create a free profile to see personalized matches.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg">
                Get Personalized Matches
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - White */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-4xl heading-black mb-4">How Grant Matching Works</h2>
            <p className="text-xl body-black">Intelligent filtering based on your company profile</p>
          </div>

          <div className="space-y-8">
            <AsymmetricTextCard title="Technology Readiness Level (TRL) Matching" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p>
                  After Stage 1 profile creation, your TRL (1-9) is automatically assessed. Grants are filtered
                  to show only programs accepting your current TRL ±1 level.
                </p>
                <p>
                  <strong>Example:</strong> If you're TRL 5 (lab-validated), you'll see grants for TRL 4-6 companies.
                  You won't see TRL 8-9 (commercial scale) programs you're not ready for.
                </p>
              </div>
            </AsymmetricTextCard>

            <AsymmetricTextCard title="Industry & Sector Alignment" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p>
                  AI extracts your technology domain from uploaded documents. Grant programs are tagged with
                  relevant industries (healthcare, clean energy, AI/ML, manufacturing, etc.).
                </p>
                <p>
                  <strong>Smart matching:</strong> Adjacent industries are included. A battery tech company sees both
                  "energy storage" and "electric vehicles" grants.
                </p>
              </div>
            </AsymmetricTextCard>

            <AsymmetricTextCard title="Geographic & Eligibility Requirements" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p>
                  Your company location determines eligibility for state programs, regional initiatives, and
                  location-specific federal set-asides.
                </p>
                <p>
                  <strong>Compliance check:</strong> SBIR requires {"<"}500 employees + US-based + majority US ownership.
                  Ineligible companies are shown alternative programs.
                </p>
              </div>
            </AsymmetricTextCard>

            <AsymmetricTextCard title="Funding Amount & Stage Appropriateness" accentPosition="left" theme="light">
              <div className="space-y-4 text-sm body-black">
                <p>
                  Pre-revenue companies are prioritized for $50K-$500K grants. Series A+ companies see $1M-$25M
                  scale-up programs. No time wasted on mismatched award sizes.
                </p>
                <p>
                  <strong>ROI optimization:</strong> Application effort is weighted. A $2M grant requiring 200 hours ranks
                  higher than a $50K grant requiring 80 hours.
                </p>
              </div>
            </AsymmetricTextCard>
          </div>
        </div>
      </section>

      {/* Grant Categories - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl heading-white mb-4">Browse by Category</h2>
            <p className="text-xl body-white">2,400+ grants organized into searchable categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "R&D Grants", count: "850+" },
              { label: "Clean Energy", count: "420+" },
              { label: "Healthcare", count: "380+" },
              { label: "Manufacturing", count: "290+" },
              { label: "AI/ML", count: "210+" },
              { label: "Agriculture", count: "180+" },
              { label: "Defense", count: "150+" },
              { label: "Education", count: "120+" }
            ].map((category, index) => (
              <div
                key={index}
                className="p-6 bg-gray-900 border border-gray-800 rounded-lg hover:border-ocean-600 transition-colors cursor-pointer"
              >
                <div className="text-3xl font-bold text-white mb-2">{category.count}</div>
                <div className="body-white text-sm">{category.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="body-white mb-6">
              Plus 100+ additional categories including biotech, cybersecurity, space tech, climate adaptation, and more.
            </p>
          </div>
        </div>
      </section>

      {/* CTA - White */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl heading-black">Start Finding Your Grants</h2>
            <p className="text-xl body-black max-w-2xl mx-auto">
              Create your free company profile and get instant access to personalized grant matches.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/sign-up">
                <Button size="lg" className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg">
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
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
