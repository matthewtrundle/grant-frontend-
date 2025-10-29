"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingContentCard } from "@/components/ui/abstract-cards";

export default function BlogPage() {
  const posts = [
    {
      title: "How to Win Your First SBIR Grant in 90 Days",
      excerpt: "Step-by-step guide for first-time SBIR applicants. What works, what doesn't, and how to maximize your chances with limited resources.",
      date: "March 15, 2025",
      category: "Grant Strategy",
      readTime: "8 min read"
    },
    {
      title: "TRL Assessment: The Most Common Mistakes",
      excerpt: "87% of rejected applications had TRL mismatches. Learn how to accurately assess your technology readiness level and avoid automatic disqualification.",
      date: "March 10, 2025",
      category: "Technical Guides",
      readTime: "6 min read"
    },
    {
      title: "DOE vs. NSF vs. NIH: Which Grant Program Fits Your Company?",
      excerpt: "Federal agencies have different priorities, timelines, and requirements. Compare the big three to find your best fit.",
      date: "March 5, 2025",
      category: "Grant Programs",
      readTime: "10 min read"
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
            <Badge className="bg-black text-white px-4 py-2 text-sm">Blog</Badge>
            <h1 className="text-5xl md:text-7xl heading-black max-w-4xl">
              Grant Funding <span className="accent-underline">Insights</span>
            </h1>
            <p className="text-xl md:text-2xl body-black max-w-3xl">
              Expert tips, strategies, and guides for winning grant applications. Learn from our team's experience
              helping 500+ companies secure $200M+ in funding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts - Black */}
      <section className="section-dark py-24 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {posts.map((post, index) => (
              <FloatingContentCard key={index} theme="dark" elevation="subtle" className="hover:border-purple-600 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Badge className="bg-purple-950 text-purple-300 border border-purple-600/30">{post.category}</Badge>
                    <span className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold heading-white">{post.title}</h2>
                  <p className="body-white">{post.excerpt}</p>
                  <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-950/50 p-0">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </FloatingContentCard>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400">More posts coming soon. Subscribe to our newsletter for updates.</p>
          </div>
        </div>
      </section>

      {/* CTA - White */}
      <section className="section-light py-24 px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl heading-black">Start Winning Grants Today</h2>
            <p className="text-xl body-black max-w-2xl mx-auto">
              Turn insights into action. Create your free profile and start discovering grants.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-accent hover:bg-accent-hover text-white px-12 py-6 text-lg">
                Create Free Profile<ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
