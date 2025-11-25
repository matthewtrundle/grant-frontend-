"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  FileText,
  Rocket,
  Users,
  Building2,
  Mail,
  Briefcase
} from 'lucide-react';

interface HamburgerMenuProps {
  className?: string;
}

interface MenuItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    label: 'Company Profiler',
    href: '/features/profiler',
    icon: Sparkles,
    description: 'AI-powered tech profile extraction'
  },
  {
    label: 'Grant Discovery',
    href: '/features/discovery',
    icon: Zap,
    description: 'Find matching grant opportunities'
  },
  {
    label: 'Grant Analysis',
    href: '/features/analysis',
    icon: FileText,
    description: 'Deep RFP analysis & timelines',
    badge: '$199'
  },
  {
    label: 'Document Generation',
    href: '/features/generation',
    icon: Rocket,
    description: 'Multi-agent grant writing system',
    badge: '$999'
  },
  {
    label: 'Pricing',
    href: '/pricing',
    icon: Building2,
    description: 'Simple, transparent pricing'
  },
  {
    label: 'About',
    href: '/about',
    icon: Users,
    description: 'Our mission and team'
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: Mail,
    description: 'Get in touch'
  },
  {
    label: 'Careers',
    href: '/careers',
    icon: Briefcase,
    description: 'Join our team',
    badge: "We're hiring"
  }
];

export function HamburgerMenu({ className }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Show menu after scrolling past hero (or immediately if already scrolled)
      setIsVisible(scrollY > 50);

      // Determine color mode based on current section
      // These are approximate breakpoints - adjust based on actual section heights
      if (scrollY < window.innerHeight) {
        // Hero section - dark background
        setColorMode('dark');
      } else if (scrollY < window.innerHeight * 2) {
        // Mission section - light background
        setColorMode('light');
      } else if (scrollY < window.innerHeight * 6) {
        // Process Timeline - light background
        setColorMode('light');
      } else if (scrollY < window.innerHeight * 7) {
        // Grant Circle - dark background
        setColorMode('dark');
      } else {
        // Success Stories & Contact - light background
        setColorMode('light');
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const lineColor = colorMode === 'dark' ? 'bg-white' : 'bg-gray-900';
  const hoverBg = colorMode === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-900/5';

  return (
    <>
      {/* Hamburger Button - Fixed position */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed top-6 right-6 z-[100] p-3 rounded-lg transition-all duration-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none',
          hoverBg,
          className
        )}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <div className="w-6 h-5 flex flex-col justify-between relative">
          <motion.span
            className={cn('h-0.5 w-full rounded-full transition-all duration-300', lineColor)}
            animate={isOpen ? {
              rotate: 45,
              y: 8,
              transition: { duration: 0.3, ease: 'easeInOut' }
            } : {
              rotate: 0,
              y: 0,
              transition: { duration: 0.3, ease: 'easeInOut' }
            }}
          />
          <motion.span
            className={cn('h-0.5 w-full rounded-full transition-all duration-300', lineColor)}
            animate={isOpen ? {
              opacity: 0,
              transition: { duration: 0.2 }
            } : {
              opacity: 1,
              transition: { duration: 0.2 }
            }}
          />
          <motion.span
            className={cn('h-0.5 w-full rounded-full transition-all duration-300', lineColor)}
            animate={isOpen ? {
              rotate: -45,
              y: -8,
              transition: { duration: 0.3, ease: 'easeInOut' }
            } : {
              rotate: 0,
              y: 0,
              transition: { duration: 0.3, ease: 'easeInOut' }
            }}
          />
        </div>
      </button>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-slate-900/95 backdrop-blur-xl"
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900/40 to-teal-900/20" />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative h-full overflow-y-auto"
            >
              <div className="container mx-auto px-6 py-24">
                {/* Logo */}
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="inline-block mb-12"
                >
                  <img
                    src="/logo1.png"
                    alt="FundAid"
                    className="h-16 w-auto"
                  />
                </Link>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1 + (index * 0.05)
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="group block p-6 rounded-2xl border border-slate-700/40 bg-slate-800/30 hover:border-cyan-500/50 hover:bg-slate-800/60 backdrop-blur-sm transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            {Icon && (
                              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20">
                                <Icon className="w-5 h-5" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                                  {item.label}
                                </h3>
                                {item.badge && (
                                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-sm text-slate-400">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="mt-12 flex flex-col sm:flex-row gap-4 max-w-md"
                >
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 rounded-lg border border-slate-600 bg-slate-800/40 text-white text-center font-medium hover:bg-slate-700/60 hover:border-slate-500 backdrop-blur-sm transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-center font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    Start Free TRL Assessment
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}