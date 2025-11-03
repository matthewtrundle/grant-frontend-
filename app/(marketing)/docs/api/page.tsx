"use client";

import { Code, Zap, Lock, GitBranch } from "lucide-react";
import { motion } from "framer-motion";

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 py-24">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Code className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">API Reference</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              FundAid API Documentation
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Programmatic access to grant automation, discovery, and generation
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Coming Soon Notice */}
        <motion.div
          className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-8 md:p-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                API Under Development
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We're currently engineering our RESTful API and comprehensive documentation
                to provide seamless programmatic access to FundAid's grant automation platform.
              </p>
            </div>
          </div>

          <div className="border-t border-purple-200 pt-6 mt-6">
            <p className="text-gray-700 mb-4">
              <strong className="text-gray-900">Stay tuned</strong> as we finalize our API endpoints,
              authentication protocols, and developer tools. Our API will enable you to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Integrate grant discovery into your existing workflows</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Automate company profile generation and TRL assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Access grant analysis and document generation programmatically</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Build custom integrations with your internal systems</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Feature Preview Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Enterprise Security
            </h3>
            <p className="text-gray-600 text-sm">
              OAuth 2.0 authentication, API key management, and rate limiting for secure access
            </p>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              RESTful Design
            </h3>
            <p className="text-gray-600 text-sm">
              Intuitive endpoints following REST conventions with comprehensive JSON responses
            </p>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <GitBranch className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Webhooks & Events
            </h3>
            <p className="text-gray-600 text-sm">
              Real-time notifications for grant matches, application status, and workflow updates
            </p>
          </motion.div>
        </div>

        {/* Early Access CTA */}
        <motion.div
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Interested in Early API Access?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            We're accepting applications for our API beta program. Get priority access and
            help shape the future of our developer platform.
          </p>
          <a
            href="/contact?subject=API%20Beta%20Access"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Request Beta Access
          </a>
        </motion.div>
      </div>
    </div>
  );
}
