"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Zap, Code, Heart, Users, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Import ALL Clerk-style components
import { CircuitBackground } from "@/components/ui/circuit-background";
import { MeteorEffect, AnimatedGradient, GradientOverlay } from "@/components/ui/animated-background";
import { PremiumMotionCard, MotionIcon } from "@/components/ui/motion-card";
import { AnimatedGradientText, GradientText } from "@/components/ui/animated-gradient-text";
import { GradientAnimatedButton, AnimatedButton } from "@/components/ui/animated-button";
import { StaggerReveal, StaggerItem, RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { BentoGrid, BentoGridItem, BentoFeatureCard, BentoStatCard } from "@/components/ui/bento-grid";
import { MagneticButton, GradientMagneticButton, OutlineMagneticButton } from "@/components/ui/magnetic-button";
import { CodeSnippet, InlineCode, CodeTabs } from "@/components/ui/code-snippet";
import { TestimonialCard, TestimonialGrid, CompactTestimonialCard } from "@/components/ui/testimonial-card";
import { Carousel3D, SimpleCarousel } from "@/components/ui/carousel-3d";
import { ParallaxSection, ParallaxText, ParallaxHero } from "@/components/ui/parallax-scroll";

export default function DesignSystemPage() {
  // Sample data
  const codeExample = `import { Agent } from 'pydantic-ai';

const agent = Agent(
  get_llm_model(),
  deps_type=GrantAgentDependencies,
  system_prompt="Expert grant consultant..."
);

@agent.tool
async function search_grants(
  ctx: RunContext,
  query: string
) {
  return await external_api_call(query);
}`;

  const codeTabs = [
    {
      label: "TypeScript",
      language: "typescript",
      code: `const result = await agent.run("Find grants");
console.log(result.data);`
    },
    {
      label: "Python",
      language: "python",
      code: `result = await agent.run("Find grants")
print(result.data)`
    },
    {
      label: "cURL",
      language: "bash",
      code: `curl -X POST https://api.example.com/grants \\
  -H "Content-Type: application/json" \\
  -d '{"query": "Find grants"}'`
    }
  ];

  const testimonials = [
    {
      quote: "This platform saved us 100+ hours on our grant application. The AI-powered writing is incredible!",
      author: {
        name: "Dr. Sarah Chen",
        role: "Principal Investigator",
        company: "Stanford Research Lab"
      },
      rating: 5
    },
    {
      quote: "We secured $250K in funding thanks to the deep RFP analysis and 3-assessor simulation.",
      author: {
        name: "Marcus Johnson",
        role: "CTO",
        company: "BioTech Innovations"
      },
      rating: 5
    },
    {
      quote: "The TRL assessment alone was worth the price. Completely transformed our funding strategy.",
      author: {
        name: "Elena Rodriguez",
        role: "Founder",
        company: "CleanEnergy Corp"
      },
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0F] to-[#1A1A2E]">
      {/* Hero Section with Parallax */}
      <ParallaxHero
        background={
          <>
            <CircuitBackground density="medium" glowColor="#6C47FF" opacity={0.15} />
            <MeteorEffect density={12} color="#6c47ff" opacity={0.6} />
            <AnimatedGradient />
          </>
        }
        foreground={
          <section className="relative min-h-screen flex items-center justify-center px-4">
            <div className="container mx-auto max-w-6xl relative z-10">
              <div className="text-center space-y-8">
                <Badge className="bg-white/5 border border-white/10 text-white">
                  Clerk.com-Inspired Design System
                </Badge>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent block mb-2">
                    Complete Clerk-Style
                  </span>
                  <AnimatedGradientText
                    glow
                    hoverScale
                    colors={{ from: "#6C47FF", to: "#2F80ED" }}
                  >
                    Component Library
                  </AnimatedGradientText>
                </h1>

                <p className="text-xl text-white/60 max-w-3xl mx-auto">
                  12 premium B2B SaaS components with dark-mode-first design, glassmorphism, gradient effects, and smooth animations
                </p>

                <div className="flex gap-4 justify-center flex-wrap pt-4">
                  <Link href="/">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl" />
                      <GradientAnimatedButton size="lg" className="relative px-8 py-6">
                        View Live Demo
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </GradientAnimatedButton>
                    </div>
                  </Link>
                  <Link href="#components">
                    <AnimatedButton
                      variant="outline"
                      size="lg"
                      className="border border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 px-8 py-6"
                    >
                      Browse Components
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        }
      />

      {/* Components Showcase */}
      <div className="container mx-auto px-4 py-24 space-y-32 relative z-10" id="components">
        {/* 1. Animated Backgrounds */}
        <RevealOnScroll variant="slideUp">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Animated Backgrounds</h2>
              <p className="text-xl text-white/60">Circuit patterns, meteors, and gradient orbs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PremiumMotionCard className="relative h-64 overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/10">
                <CircuitBackground density="high" glowColor="#6C47FF" opacity={0.3} />
                <div className="relative z-10 p-6 flex items-center justify-center h-full">
                  <p className="text-white font-semibold">Circuit Background</p>
                </div>
              </PremiumMotionCard>

              <PremiumMotionCard className="relative h-64 overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/10">
                <MeteorEffect density={8} color="#2F80ED" opacity={0.8} />
                <div className="relative z-10 p-6 flex items-center justify-center h-full">
                  <p className="text-white font-semibold">Meteor Effect</p>
                </div>
              </PremiumMotionCard>
            </div>
          </section>
        </RevealOnScroll>

        {/* 2. Motion Cards */}
        <RevealOnScroll variant="slideUp">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Premium Motion Cards</h2>
              <p className="text-xl text-white/60">3D tilt, border glow, and inner glow effects</p>
            </div>

            <StaggerReveal variant="slideUp" staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <StaggerItem key={i}>
                  <PremiumMotionCard className="p-8 backdrop-blur-xl bg-white/[0.03] border border-white/10">
                    <MotionIcon hoverEffect="bounce">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                      </div>
                    </MotionIcon>
                    <h3 className="text-xl font-semibold text-white mb-2">Card {i}</h3>
                    <p className="text-white/60">Hover to see 3D tilt and glow effects</p>
                  </PremiumMotionCard>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </section>
        </RevealOnScroll>

        {/* 3. Gradient Text */}
        <RevealOnScroll variant="slideUp">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Gradient Text</h2>
              <p className="text-xl text-white/60">Animated gradient text with glow effects</p>
            </div>

            <div className="text-center space-y-6">
              <div className="text-5xl font-bold">
                <AnimatedGradientText glow hoverScale colors={{ from: "#6C47FF", to: "#2F80ED" }}>
                  Animated Gradient
                </AnimatedGradientText>
              </div>
              <div className="text-4xl font-bold">
                <GradientText from="from-purple-400" to="to-pink-400" glow>
                  Static Gradient
                </GradientText>
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* 4. Animated Buttons */}
        <RevealOnScroll variant="slideUp">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Animated Buttons</h2>
              <p className="text-xl text-white/60">Shimmer, ripple, and scale effects</p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <GradientAnimatedButton size="lg">
                Gradient Button
                <ArrowRight className="ml-2 w-5 h-5" />
              </GradientAnimatedButton>

              <AnimatedButton
                variant="outline"
                size="lg"
                className="border border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10"
              >
                Outline Button
              </AnimatedButton>

              <AnimatedButton size="lg" className="bg-white text-black hover:bg-white/90">
                Solid Button
              </AnimatedButton>
            </div>
          </section>
        </RevealOnScroll>

        {/* 5. Magnetic Buttons */}
        <RevealOnScroll variant="slideUp">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Magnetic Buttons</h2>
              <p className="text-xl text-white/60">Buttons that follow your cursor</p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              <GradientMagneticButton size="lg" strength={25}>
                Hover Me
              </GradientMagneticButton>

              <OutlineMagneticButton size="lg" strength={20}>
                Magnetic Outline
              </OutlineMagneticButton>

              <MagneticButton size="lg" className="bg-white text-black" strength={30}>
                Custom Magnetic
              </MagneticButton>
            </div>
          </section>
        </RevealOnScroll>

        {/* 6. Bento Grid */}
        <RevealOnScroll variant="slideUp">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Bento Grid</h2>
              <p className="text-xl text-white/60">Flexible grid layout with staggered animations</p>
            </div>

            <BentoGrid columns={3} gap={6}>
              <BentoGridItem>
                <BentoFeatureCard
                  icon={<Target className="w-8 h-8 text-purple-400" />}
                  title="Feature 1"
                  description="Description of the first feature"
                  badge="New"
                />
              </BentoGridItem>

              <BentoGridItem span="2">
                <BentoStatCard
                  stat="99%"
                  label="Success Rate"
                  description="Applications funded"
                  trend="up"
                />
              </BentoGridItem>

              <BentoGridItem span="2" rowSpan="2">
                <BentoFeatureCard
                  icon={<Code className="w-8 h-8 text-blue-400" />}
                  title="Large Feature"
                  description="This card spans 2 columns and 2 rows"
                />
              </BentoGridItem>

              <BentoGridItem>
                <BentoFeatureCard
                  icon={<Zap className="w-8 h-8 text-yellow-400" />}
                  title="Feature 3"
                  description="Another feature description"
                />
              </BentoGridItem>
            </BentoGrid>
          </section>
        </RevealOnScroll>

        {/* 7. Code Snippets */}
        <RevealOnScroll variant="slideUp">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Code Snippets</h2>
              <p className="text-xl text-white/60">Syntax-highlighted code with copy functionality</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <CodeSnippet
                code={codeExample}
                language="typescript"
                lineNumbers
                theme="clerk-dark"
              />

              <div className="space-y-2">
                <p className="text-white/80">
                  Use <InlineCode>InlineCode</InlineCode> for inline snippets
                </p>
              </div>

              <CodeTabs tabs={codeTabs} />
            </div>
          </section>
        </RevealOnScroll>

        {/* 8. Testimonial Cards */}
        <RevealOnScroll variant="slideUp">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Testimonial Cards</h2>
              <p className="text-xl text-white/60">Customer testimonials with avatar glow</p>
            </div>

            <TestimonialGrid testimonials={testimonials} columns={3} />
          </section>
        </RevealOnScroll>

        {/* 9. 3D Carousel */}
        <RevealOnScroll variant="slideUp">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">3D Carousel</h2>
              <p className="text-xl text-white/60">Rotating carousel with perspective</p>
            </div>

            <div className="flex justify-center">
              <Carousel3D
                items={testimonials.map((t, i) => (
                  <TestimonialCard key={i} {...t} />
                ))}
                autoRotate={7000}
                cardWidth={400}
                cardHeight={350}
              />
            </div>
          </section>
        </RevealOnScroll>

        {/* 10. Parallax Scroll */}
        <section className="space-y-12 min-h-screen flex items-center">
          <div className="w-full space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Parallax Scroll</h2>
              <p className="text-xl text-white/60">Scroll-based parallax effects</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ParallaxSection speed={0.3}>
                <PremiumMotionCard className="p-8 backdrop-blur-xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-2xl font-semibold text-white mb-4">Slow Movement</h3>
                  <p className="text-white/60">This card moves at 0.3x scroll speed (background effect)</p>
                </PremiumMotionCard>
              </ParallaxSection>

              <ParallaxSection speed={1.2}>
                <PremiumMotionCard className="p-8 backdrop-blur-xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-2xl font-semibold text-white mb-4">Fast Movement</h3>
                  <p className="text-white/60">This card moves at 1.2x scroll speed (foreground effect)</p>
                </PremiumMotionCard>
              </ParallaxSection>
            </div>
          </div>
        </section>

        {/* Component Summary */}
        <RevealOnScroll variant="slideUp">
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">Complete Component Library</h2>
              <p className="text-xl text-white/60">All 12 Clerk-style components ready to use</p>
            </div>

            <BentoGrid columns={4} gap={4}>
              {[
                "Circuit Background",
                "Meteor Effect",
                "Motion Cards",
                "Gradient Text",
                "Animated Buttons",
                "Magnetic Buttons",
                "Bento Grid",
                "Code Snippets",
                "Testimonials",
                "3D Carousel",
                "Parallax Scroll",
                "Scroll Reveals"
              ].map((name, i) => (
                <BentoGridItem key={i} glass={false}>
                  <div className="p-4 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-lg h-full flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto" />
                      <p className="text-white/80 text-sm">{name}</p>
                    </div>
                  </div>
                </BentoGridItem>
              ))}
            </BentoGrid>
          </section>
        </RevealOnScroll>

        {/* CTA */}
        <RevealOnScroll variant="slideUp">
          <section className="relative overflow-hidden">
            <GradientOverlay variant="hero" />

            <div className="relative z-10 text-center space-y-8 py-24">
              <h2 className="text-5xl font-bold text-white">
                Ready to{" "}
                <AnimatedGradientText glow colors={{ from: "#6C47FF", to: "#2F80ED" }}>
                  Build Something Amazing?
                </AnimatedGradientText>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Use these components to create premium B2B SaaS experiences
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-purple-500/30 rounded-lg blur-xl" />
                    <GradientAnimatedButton size="lg" className="relative px-12 py-6 text-lg">
                      View Live Site
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GradientAnimatedButton>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </div>
  );
}
