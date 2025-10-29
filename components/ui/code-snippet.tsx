"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  code: string;
  language?: string;
  /**
   * Show line numbers
   * Default: false
   */
  lineNumbers?: boolean;
  /**
   * Theme variant
   * Default: clerk-dark
   */
  theme?: "clerk-dark" | "minimal-dark" | "glass";
  /**
   * Show language badge
   * Default: true
   */
  showLanguage?: boolean;
  className?: string;
}

/**
 * CodeSnippet - Syntax-highlighted code block with copy functionality
 *
 * Clerk.com-style code snippet featuring:
 * - Clerk-inspired dark theme (purple/blue accents)
 * - Copy-to-clipboard with toast feedback
 * - Language badge
 * - Optional line numbers
 * - Glassmorphic container
 *
 * Note: This is a simplified version. For production, integrate:
 * - prism-react-renderer for syntax highlighting
 * - react-syntax-highlighter (alternative)
 *
 * @example
 * <CodeSnippet
 *   code={`const agent = Agent(...)`}
 *   language="typescript"
 *   lineNumbers
 * />
 */
export function CodeSnippet({
  code,
  language = "typescript",
  lineNumbers = false,
  theme = "clerk-dark",
  showLanguage = true,
  className = ""
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  // Theme configurations
  const themeClasses = {
    "clerk-dark": "bg-[#0A0A0F] border border-white/10",
    "minimal-dark": "bg-black border border-gray-800",
    "glass": "backdrop-blur-xl bg-white/[0.03] border border-white/10"
  };

  // Simple syntax highlighting (basic regex-based)
  const highlightSyntax = (line: string) => {
    // Keywords
    let highlighted = line.replace(
      /\b(const|let|var|function|return|import|export|from|class|interface|type|async|await|if|else|for|while)\b/g,
      '<span class="text-purple-400">$1</span>'
    );

    // Strings
    highlighted = highlighted.replace(
      /(["'`])(.*?)\1/g,
      '<span class="text-green-400">$1$2$1</span>'
    );

    // Comments
    highlighted = highlighted.replace(
      /(\/\/.*$)/g,
      '<span class="text-white/40 italic">$1</span>'
    );

    // Functions
    highlighted = highlighted.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
      '<span class="text-blue-400">$1</span>('
    );

    // Numbers
    highlighted = highlighted.replace(
      /\b(\d+)\b/g,
      '<span class="text-yellow-400">$1</span>'
    );

    return highlighted;
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden", themeClasses[theme], className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        {/* Language badge */}
        {showLanguage && (
          <div className="px-2 py-1 rounded bg-white/5 text-xs font-mono text-white/60 uppercase">
            {language}
          </div>
        )}

        {/* Copy button */}
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="font-mono">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {lineNumbers && (
                  <span className="inline-block w-10 text-right pr-4 select-none text-white/30 font-mono text-xs">
                    {index + 1}
                  </span>
                )}
                <span
                  className="text-white/90"
                  dangerouslySetInnerHTML={{ __html: highlightSyntax(line) || "&nbsp;" }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

/**
 * TypewriterCodeSnippet - Code snippet with typing animation
 *
 * Animates code appearing character by character
 */
export function TypewriterCodeSnippet({
  code,
  speed = 30,
  ...props
}: CodeSnippetProps & { speed?: number }) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useState(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  });

  return (
    <CodeSnippet
      {...props}
      code={displayedCode}
      className={cn(!isComplete && "after:content-['▋'] after:animate-pulse")}
    />
  );
}

/**
 * InlineCode - Inline code snippet for documentation
 */
export function InlineCode({
  children,
  className = ""
}: {
  children: string;
  className?: string;
}) {
  return (
    <code
      className={cn(
        "px-1.5 py-0.5 rounded bg-white/10 border border-white/20",
        "text-sm font-mono text-purple-400",
        className
      )}
    >
      {children}
    </code>
  );
}

/**
 * CodeTabs - Tabbed interface for multiple code examples
 */
export function CodeTabs({
  tabs,
  className = ""
}: {
  tabs: Array<{ label: string; language: string; code: string }>;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Tab buttons */}
      <div className="flex gap-2 border-b border-white/10">
        {tabs.map((tab, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors relative",
              activeTab === index
                ? "text-white"
                : "text-white/60 hover:text-white/80"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}

            {/* Active indicator */}
            {activeTab === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <CodeSnippet
            code={tabs[activeTab].code}
            language={tabs[activeTab].language}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
