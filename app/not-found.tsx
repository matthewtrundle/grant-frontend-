"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50/30 px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Animated 404 icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="mb-6"
        >
          <div className="relative inline-block">
            {/* Floating animation */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FileQuestion className="w-24 h-24 text-purple-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* 404 message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-yellow-500 text-transparent bg-clip-text">
            404
          </h1>
          <p className="text-2xl font-semibold text-gray-900 mb-2">
            Page not found
          </p>
        </motion.div>

        <motion.p
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Helpful links */}
        <motion.div
          className="mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="mb-2">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/profile" className="text-purple-600 hover:text-purple-700 underline">
              Profile
            </Link>
            <span>•</span>
            <Link href="/discover" className="text-purple-600 hover:text-purple-700 underline">
              Discover Grants
            </Link>
            <span>•</span>
            <Link href="/pricing" className="text-purple-600 hover:text-purple-700 underline">
              Pricing
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
