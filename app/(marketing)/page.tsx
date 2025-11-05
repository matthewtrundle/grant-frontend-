"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Target, Zap, FileText, DollarSign, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Import animation components
import { MeteorEffect, AnimatedGradient, GradientOverlay } from "@/components/ui/animated-background";
import { PremiumMotionCard, MotionIcon } from "@/components/ui/motion-card";
import { AnimatedGradientText, GradientText } from "@/components/ui/animated-gradient-text";
import { GradientAnimatedButton, AnimatedButton } from "@/components/ui/animated-button";
import { StaggerReveal, StaggerItem, RevealOnScroll } from "@/components/ui/reveal-on-scroll";

// Import LogoWall component
import LogoWall from "@/components/ui/logo-wall";

// Import FundAid components
// import { FundAidNetworkBackground } from "@/components/ui/fundaid-network-background";
import { RotatingGrantStatements } from "@/components/ui/rotating-grant-statements";

export default function Home() {
  // Force re-mount animations on navigation
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const stages = [
    {
      icon: Target,
      number: "01",
      title: "Stage 1: Profile",
      description: "Get your TRL assessment and create your company profile. We extract key facts for grant matching.",
      badge: "FREE",
      badgeColor: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      number: "02",
      title: "Stage 2: Discover",
      description: "Find matching grants with AI-powered search. Get fit scores and recommendations instantly.",
      badge: "FREE",
      badgeColor: "from-green-500 to-emerald-500"
    },
    {
      icon: FileText,
      number: "03",
      title: "Stage 3: Analyze",
      description: "Deep RFP analysis with timeline, budget breakdown, and success factors identified.",
      badge: "$199",
      badgeColor: "from-purple-500 to-blue-500"
    },
    {
      icon: DollarSign,
      number: "04",
      title: "Stage 4: Generate",
      description: "Complete grant application with RAG-powered writing and 3-assessor simulation scoring.",
      badge: "$999",
      badgeColor: "from-purple-500 to-blue-500"
    }
  ];

  const stats = [
    { value: "100+", label: "Hours Saved", description: "Per application" },
    { value: "$10K+", label: "Cost Savings", description: "vs. grant consultants" },
    { value: "48 Hrs", label: "First Draft", description: "Complete application ready" }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Main Hero Background - Smooth parallax effect with extended coverage */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[120vh] bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/hero4.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
      />

      {/* Subtle white overlay with gradient fade - extends beyond viewport */}
      <div className="fixed top-0 left-0 right-0 h-[120vh] z-[1] bg-gradient-to-b from-white/40 via-white/40 to-white/60 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10">
        {/* ===== HERO SECTION - CUSTOM BACKGROUND ===== */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">

        {/* Content overlay */}
        <div className="container mx-auto max-w-6xl relative z-10 px-4 pt-4 pb-20">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            {/* Centered Logo - Moderate size for balance */}
            <motion.div
              className="flex flex-col items-center justify-center mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <img
                src="/logo1.png"
                alt="FundAid for Health"
                className="w-auto h-40 md:h-48 lg:h-56 drop-shadow-2xl mb-3"
              />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200">
                <span className="text-sm md:text-base text-purple-700 font-medium">For Healthcare Innovators</span>
              </div>
            </motion.div>

            {/* Hero Headline - DARK text on WHITE background */}
            <h1 className="hero-headline-xl">
              <span className="text-gray-900 block">
                Stop Writing Grants.
              </span>
              <span className="text-gray-900 block">
                Start{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent inline-block">
                  Winning Them.
                </span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl body-black max-w-3xl mx-auto">
              Healthcare innovators waste months writing grant applications that get rejected. We help you find the right grants, write compelling applications, and actually get funded—all powered by AI that's studied thousands of successful submissions.
            </p>

            {/* CTA Buttons - Focused on TRL Assessment */}
            <div className="flex gap-6 justify-center flex-wrap pt-4">
              <Link href="/sign-up">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl" />
                  <button
                    className="relative min-w-[280px] px-8 py-6 text-lg rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                    aria-label="Create your profile and start free TRL assessment"
                  >
                    Start Free TRL Assessment →
                  </button>
                </div>
              </Link>
              <Link href="/pricing">
                <button
                  className="min-w-[180px] px-8 py-6 text-lg rounded-lg border-2 border-gray-300 bg-white text-gray-900 font-semibold hover:border-purple-500 hover:bg-purple-50 active:bg-purple-100 transition-all duration-200 hover:shadow-md"
                  aria-label="See how it works and pricing"
                >
                  See How It Works
                </button>
              </Link>
            </div>

            <p className="text-gray-500 pt-2">
              Free company profile + TRL assessment • Find matching grants instantly • No credit card needed
            </p>
          </motion.div>

          {/* Rotating Grant Statements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <RotatingGrantStatements />
          </motion.div>

          {/* Hero Stats - LIGHT MODE with gradient borders and micro-interactions */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group cursor-default"
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                <div className="relative p-8 rounded-2xl bg-white border-2 border-gray-200 group-hover:border-transparent text-center transition-all duration-300 shadow-sm group-hover:shadow-xl">
                  <div className="space-y-3">
                    <motion.div
                      className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-lg font-semibold text-gray-900">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== LOGO WALL SECTION - WHITE BACKGROUND ===== */}
      <section className="relative bg-white overflow-hidden">
        {/* Content */}
        <div className="relative z-10">
          <LogoWall />
        </div>
      </section>

      {/* ===== GRADIENT TRANSITION SECTION - WHITE TO BLACK ===== */}
      <section className="relative h-64 overflow-hidden">
        {/* Smooth gradient from white to dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-900/95 to-[#0A0A0F]" />
      </section>

      {/* ===== UNIFIED BENTO GRID SECTION - BLACK BACKGROUND ===== */}
      <section className="relative py-24 px-4 overflow-hidden bg-[#0A0A0F]">
        {/* Subtle glowing orb effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <RevealOnScroll variant="slideUp">
            <div className="text-center mb-16">
              <h2 className="section-headline heading-white mb-4">
                How It Works
              </h2>
              <p className="text-xl body-white">
                AI-powered grant automation from profile to funding
              </p>
            </div>
          </RevealOnScroll>

          {/* Mega Bento Box Grid Layout - 6 columns for flexibility */}
          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(180px,auto)] gap-4 lg:gap-6">
            {/* Stage 1 - Large Featured Tile (spans 2 columns, 2 rows) */}
            <motion.div
              className="group relative md:col-span-2 md:row-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.01, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <div className="relative h-full min-h-[400px] p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-white/10 group-hover:border-purple-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-300" />

                <div className="relative z-10 space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm font-mono">
                    01
                  </div>
                  <MotionIcon hoverEffect="bounce">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-500/30 flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                      <Target className="w-12 h-12 text-purple-300" />
                    </div>
                  </MotionIcon>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                      Stage 1: Profile
                    </h3>
                    <p className="text-white/60 leading-relaxed text-lg">
                      Get your TRL assessment and create your company profile. We extract key facts for grant matching.
                    </p>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-lg opacity-50" />
                    <div className="relative px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-base">
                      FREE
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stage 2 - Tall Tile (2 columns, 2 rows) */}
            <motion.div
              className="group relative md:col-span-2 md:row-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.01, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <div className="relative h-full min-h-[400px] p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-white/10 group-hover:border-purple-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-300" />

                <div className="relative z-10 space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm font-mono">
                    02
                  </div>
                  <MotionIcon hoverEffect="bounce">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-500/30 flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                      <Zap className="w-10 h-10 text-purple-300" />
                    </div>
                  </MotionIcon>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Stage 2: Discover
                    </h3>
                    <p className="text-white/60 leading-relaxed text-base">
                      Find matching grants with AI-powered search. Get fit scores and recommendations instantly.
                    </p>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-lg opacity-50" />
                    <div className="relative px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-sm">
                      FREE
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stat Tile - Success Rate */}
            <motion.div
              className="group relative md:col-span-2 md:row-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.01, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <div className="relative h-full min-h-[180px] p-6 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-white/10 group-hover:border-green-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300 flex flex-col justify-center items-center text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-300" />

                <div className="relative z-10">
                  <div className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                    40%
                  </div>
                  <h3 className="text-white font-semibold text-lg">Success Rate</h3>
                  <p className="text-white/60 text-sm mt-1">Applications funded</p>
                </div>
              </div>
            </motion.div>

            {/* Stage 3 - Compact Tile (2 columns, 1 row) */}
            <motion.div
              className="group relative md:col-span-2 md:row-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.01, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <div className="relative h-full min-h-[190px] p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-white/10 group-hover:border-purple-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-300" />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm font-mono">
                      03
                    </div>
                    <MotionIcon hoverEffect="bounce">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-500/30 flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                        <FileText className="w-6 h-6 text-purple-300" />
                      </div>
                    </MotionIcon>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Stage 3: Analyze
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    Deep RFP analysis with timeline, budget breakdown, and success factors.
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-50" />
                    <div className="relative px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm">
                      $199
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stage 4 - Compact Tile (2 columns, 1 row) */}
            <motion.div
              className="group relative md:col-span-2 md:row-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.01, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <div className="relative h-full min-h-[190px] p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-white/10 group-hover:border-purple-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-300" />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm font-mono">
                      04
                    </div>
                    <MotionIcon hoverEffect="bounce">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-500/30 flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                        <DollarSign className="w-6 h-6 text-purple-300" />
                      </div>
                    </MotionIcon>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Stage 4: Generate
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    Complete grant application with RAG-powered writing and 3-assessor simulation.
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-50" />
                    <div className="relative px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm">
                      $999
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Tile (2 columns, 2 rows) */}
            <motion.div
              className="group relative md:col-span-2 md:row-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.01, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <div className="relative h-full min-h-[400px] p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-white/10 group-hover:border-purple-500/30 backdrop-blur-xl overflow-hidden transition-all duration-300 flex flex-col justify-between">
                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <p className="text-white/90 text-lg leading-relaxed mb-6 italic">
                    "Won $275K NSF SBIR with zero revenue. The AI analysis and writing saved us months. Best investment we made."
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      ST
                    </div>
                    <div>
                      <p className="text-white font-semibold">Sarah Thompson</p>
                      <p className="text-white/60 text-sm">CEO, Quantum Diagnostics</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Technology Showcase (2 columns, 2 rows) */}
            <motion.div
              className="group relative md:col-span-2 md:row-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.01, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <div className="relative h-full min-h-[400px] p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-white/10 group-hover:border-blue-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-500/30 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Powered by AI</h3>
                    <p className="text-white/60 text-base leading-relaxed">
                      Advanced language models analyze 1000+ winning grants to craft your perfect application
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                      Claude 3.5 Sonnet
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                      RAG Search
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                      Vector DB
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                      Multi-Agent
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stat Tile - Time to Submit (2 columns, 1 row) */}
            <motion.div
              className="group relative md:col-span-2 md:row-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.01, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <div className="relative h-full min-h-[180px] p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-white/10 group-hover:border-blue-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300 flex flex-col justify-center items-center text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-300" />

                <div className="relative z-10">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    14 Days
                  </div>
                  <h3 className="text-white font-semibold text-lg">Time to Submit</h3>
                  <p className="text-white/60 text-sm mt-1">From start to finish</p>
                </div>
              </div>
            </motion.div>

            {/* Feature Highlight - Non-Dilutive (2 columns, 2 rows) */}
            <motion.div
              className="group relative md:col-span-2 md:row-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.01, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <div className="relative h-full min-h-[400px] p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-white/10 group-hover:border-emerald-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300 flex flex-col justify-center">
                <div className="relative z-10 text-center">
                  {/* Large Icon */}
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-8">
                    <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <h3 className="text-4xl font-bold text-white mb-4">
                    100% Non-Dilutive
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed max-w-md mx-auto mb-6">
                    Keep your equity. Grant funding means zero dilution for founders.
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <span className="text-emerald-400 font-semibold text-sm">0% Equity Given Up</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stat Tile - Average Grant (2 columns, 1 row) */}
            <motion.div
              className="group relative md:col-span-2 md:row-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.01, y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <div className="relative h-full min-h-[180px] p-6 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-white/10 group-hover:border-yellow-500/50 backdrop-blur-xl overflow-hidden transition-all duration-300 flex flex-col justify-center items-center text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/5 group-hover:to-orange-500/5 transition-all duration-300" />

                <div className="relative z-10">
                  <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                    $50K
                  </div>
                  <h3 className="text-white font-semibold text-lg">Average Grant</h3>
                  <p className="text-white/60 text-sm mt-1">Typical award size</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Old pricing section removed - now integrated into bento grid above */}

      {/* ===== CTA SECTION - BLACK BACKGROUND ===== */}
      <section className="relative py-24 px-4 overflow-hidden bg-[#0A0A0F]">
        <GradientOverlay variant="hero" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <RevealOnScroll variant="slideUp">
            <div className="space-y-8">
              <h2 className="section-headline heading-white">
                Ready to{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Win Your Grant?
                </span>
              </h2>
              <p className="text-xl body-white max-w-2xl mx-auto">
                Join researchers and startups saving thousands with AI-powered grant writing
              </p>
              <Link href="/sign-up">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl" />
                  <button
                    className="relative min-w-[240px] px-12 py-6 text-lg rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                    aria-label="Start your free profile now"
                  >
                    Start Your Free Profile
                    <ArrowRight className="ml-2 w-5 h-5 inline-block" aria-hidden="true" />
                  </button>
                </div>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
    </div>
  );
}
