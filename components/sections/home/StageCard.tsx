/**
 * StageCard Component
 *
 * Individual stage card for the SolutionTimeline horizontal scroll section.
 * Displays stage number, title, description, features, and pricing badge.
 *
 * Used in: SolutionTimeline component
 */

'use client';

import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export interface StageCardProps {
  number: number;
  title: string;
  description: string;
  features: string[];
  badge: string;
  badgeColor: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export function StageCard({
  number,
  title,
  description,
  features,
  badge,
  badgeColor,
  icon: Icon,
  isActive = false,
}: StageCardProps) {
  return (
    <div className="min-w-screen h-screen flex items-center justify-center px-12">
      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0.5, scale: 0.95 }}
        animate={{
          opacity: isActive ? 1 : 0.7,
          scale: isActive ? 1 : 0.95,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Card Container */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-lifted border border-gray-200/50 overflow-hidden">
          {/* Gradient Accent */}
          <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${badgeColor}`} />

          {/* Stage Number Badge */}
          <div className="absolute top-8 right-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-400">
                {String(number).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Icon */}
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${badgeColor} flex items-center justify-center mb-6 shadow-accent/30 shadow-lg`}>
            <Icon className="w-10 h-10 text-white" />
          </div>

          {/* Title & Badge */}
          <div className="mb-4">
            <h3 className="text-4xl font-bold text-gray-900 mb-3">{title}</h3>
            <Badge
              className={`bg-gradient-to-r ${badgeColor} text-white border-0 px-4 py-1.5 text-base font-semibold`}
            >
              {badge}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {description}
          </p>

          {/* Features List */}
          <div className="space-y-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  x: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.1,
                  ease: 'easeOut',
                }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                  badge === 'FREE' ? 'text-green-500' : 'text-ocean-600'
                }`} />
                <span className="text-gray-700 text-lg leading-relaxed">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Connecting Line (for visual flow) */}
          {number < 4 && (
            <div className="absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-gray-300 to-transparent" />
          )}
        </div>
      </motion.div>
    </div>
  );
}
