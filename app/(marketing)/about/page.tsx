"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Heart,
  Users,
  Zap,
} from "lucide-react";
import { CircuitBackground } from "@/components/ui/circuit-background";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "We're committed to democratizing access to grant funding for innovative companies worldwide.",
    },
    {
      icon: Heart,
      title: "Customer-First",
      description:
        "Your success is our success. We build features based on real feedback from grant applicants.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our team combines AI/ML expertise with deep grant writing experience from top consultants.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We leverage cutting-edge AI technology to solve real problems in the grant application process.",
    },
  ];

  const stats = [
    {
      value: "$50M+",
      label: "Grant Funding Secured",
      description: "Total funding won by our customers",
    },
    {
      value: "500+",
      label: "Applications Submitted",
      description: "Successful grant submissions",
    },
    {
      value: "40%",
      label: "Win Rate",
      description: "Above industry average of 20%",
    },
    {
      value: "14 Days",
      label: "Average Turnaround",
      description: "From start to submission",
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Company Founded",
      description:
        "Started with a mission to make grant funding accessible to all innovators",
    },
    {
      year: "2024",
      title: "Stage 1-2 Launch",
      description: "Released free Company Profiler and Grant Discovery tools",
    },
    {
      year: "2025",
      title: "Stage 3-4 Launch",
      description:
        "Launched premium Grant Analysis and Document Generation features",
    },
    {
      year: "2025",
      title: "Growing Fast",
      description: "Helping hundreds of companies secure millions in funding",
    },
  ];

  return (
    <div className="min-h-screen relative">
      <CircuitBackground
        density="medium"
        glowColor="#8B5CF6"
        opacity={0.10}
        className="fixed inset-0 z-0"
      />
      {/* Hero Section - White */}
      <section className="section-light py-24 relative z-10 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <Badge className="bg-black text-white px-4 py-2 text-sm badge-pulse">
              About Us
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl heading-black max-w-4xl mx-auto">
              We're on a mission to{" "}
              <span className="accent-underline">democratize</span>{" "}
              grant funding
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl mx-auto">
              Grant Automation combines cutting-edge AI with deep grant writing
              expertise to help innovative companies secure the funding they
              deserve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="text-4xl md:text-5xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-white">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section - White */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl heading-black mb-6 text-center">
                Our Story
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg body-black"
            >
              <p>
                Grant Automation was born from a simple observation: brilliant
                companies with groundbreaking technology were losing out on
                millions in grant funding—not because their ideas weren't
                worthy, but because the application process was overwhelming.
              </p>
              <p>
                Our founders, combining decades of experience in AI/ML and grant
                consulting, saw an opportunity to level the playing field. We
                asked: What if we could automate the tedious parts of grant
                applications while preserving the strategic thinking that wins
                funding?
              </p>
              <p>
                Today, Grant Automation serves hundreds of innovative companies
                across technology, healthcare, clean energy, and manufacturing.
                We've helped secure over $50M in funding and continue to push
                the boundaries of what's possible with AI-powered grant writing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl heading-white mb-4">Our Values</h2>
            <p className="text-xl body-white max-w-2xl mx-auto">
              The principles that guide everything we build
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-accent transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section - White */}
      <section className="section-light py-24 relative z-10 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl heading-black mb-4">Our Journey</h2>
            <p className="text-xl body-black max-w-2xl mx-auto">
              Key milestones in our mission to democratize grant funding
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0 w-24">
                  <div className="text-2xl font-bold text-accent">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1 bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {milestone.title}
                  </h3>
                  <p className="body-black">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Black */}
      <section className="section-dark py-24 relative z-10 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-8 bg-gray-900 border border-gray-800 p-12 rounded-2xl"
          >
            <h2 className="text-4xl heading-white">
              Ready to secure your grant funding?
            </h2>
            <p className="text-xl body-white">
              Join hundreds of innovative companies using Grant Automation to
              win millions in funding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-accent hover:bg-accent-hover text-white btn-magnetic">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="btn-magnetic hover-glow">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
