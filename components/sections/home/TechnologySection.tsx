/**
 * TechnologySection Component
 *
 * Deep dive into the AI tech stack with 3-layer parallax scrolling.
 * Shows technology badges, code snippets, and architectural details.
 *
 * Animation Pattern:
 * - 3-layer parallax with different speeds (0.3x, 0.6x, 1.0x)
 * - Tech badges fade in with stagger
 * - Code snippet reveals with typing effect simulation
 * - Background elements move at different depths
 *
 * From PAGE_STRUCTURE.md Section 4: "technology"
 */

'use client';

import { useParallaxEffect } from '@/hooks/animations/useParallaxEffect';
import { useStaggerReveal } from '@/hooks/animations/useStaggerReveal';
import { motion } from 'framer-motion';
import { Cpu, Zap, Database, Brain, Code, Sparkles } from 'lucide-react';

const technologies = [
  {
    icon: Brain,
    name: 'Multi-Agent AI',
    description: '12 specialized agents collaborate on your application',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    name: 'RAG Vector Search',
    description: '1000+ winning grants in our semantic database',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Cpu,
    name: '3-Assessor Simulation',
    description: 'Technical, business, and academic scoring in parallel',
    color: 'from-ocean-500 to-blue-500',
  },
  {
    icon: Zap,
    name: 'Real-time Refinement',
    description: 'Iterative improvement until 7+/10 quality threshold',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Code,
    name: 'Compliance Engine',
    description: 'Automatic validation of grant-specific requirements',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Sparkles,
    name: 'Claude 3.5 Sonnet',
    description: 'State-of-the-art reasoning and writing capabilities',
    color: 'from-violet-500 to-purple-500',
  },
];

const codeSnippet = `# Multi-Agent Grant Writing System

async def generate_grant_response(question, context):
    # Retrieve relevant examples
    examples = await rag_search(question, top_k=5)

    # Generate initial draft
    draft = await writer_agent.run(
        question=question,
        examples=examples,
        context=context
    )

    # Simulate 3-assessor scoring
    scores = await simulate_assessors(draft)

    # Refine until quality threshold
    while scores.average < 7.0:
        draft = await refine_response(draft, scores)
        scores = await simulate_assessors(draft)

    return draft`;

export function TechnologySection() {
  // 3-layer parallax setup
  const layer1Ref = useParallaxEffect({ speed: 0.3, direction: 'vertical' });
  const layer2Ref = useParallaxEffect({ speed: 0.6, direction: 'vertical' });
  const layer3Ref = useParallaxEffect({ speed: 1.0, direction: 'vertical' });

  const badgesRef = useStaggerReveal('.tech-badge', {
    stagger: 0.1,
    from: { opacity: 0, scale: 0.9 },
    duration: 0.5,
    ease: 'back.out(1.4)',
    start: 'top 75%',
  });

  return (
    <section className="py-32 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 text-white relative overflow-hidden">
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1 - Slowest (background) */}
        <div ref={layer1Ref} className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        {/* Layer 2 - Medium speed */}
        <div ref={layer2Ref} className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-ocean-500/15 rounded-full blur-2xl" />
        </div>

        {/* Layer 3 - Fastest (foreground) */}
        <div ref={layer3Ref} className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-teal-400 to-ocean-400 bg-clip-text text-transparent">
              Powered by Advanced AI
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Our multi-agent system combines cutting-edge AI with grant writing expertise
          </p>
        </motion.div>

        {/* Technology Grid */}
        <div ref={badgesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="tech-badge group relative"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full overflow-hidden"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <tech.icon className="w-7 h-7 text-white" />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">{tech.description}</p>

                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`} />

                {/* Top Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${tech.color} opacity-50`} />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Code Snippet Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Code Block */}
          <div className="relative bg-gray-950/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lifted">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-6 py-4 bg-gray-900/50 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 text-sm text-gray-400 font-mono">grant_agent.py</span>
            </div>

            {/* Code Content */}
            <pre className="p-6 overflow-x-auto text-sm md:text-base">
              <code className="text-gray-300 font-mono leading-relaxed">
                {codeSnippet}
              </code>
            </pre>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-teal-500/5 pointer-events-none" />
          </div>

          {/* Caption */}
          <p className="text-center text-gray-400 mt-6 text-lg">
            Our AI agents iterate until your application meets the highest quality standards
          </p>
        </motion.div>
      </div>
    </section>
  );
}
