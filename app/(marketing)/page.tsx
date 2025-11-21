/**
 * Home Page - Marketing Landing
 *
 * DNA Science Aesthetic - Biotech sophistication meets elegant minimalism.
 *
 * Sections:
 * - HeroSectionDNA (pinned, teal/green theme, DNA watermark)
 * - HowItWorksDNA (4-stage hexagonal flow)
 * - ResultsDataDNA (circular progress, scientific metrics)
 * - TeamTrustDNA (testimonials, awards, social proof)
 *
 * Design: Light backgrounds, teal/green accents, molecular patterns, scientific precision.
 */

'use client';

import React from 'react';
import { HeroSectionDNA } from '@/components/sections/home/HeroSectionDNA';
import { HowItWorksDNA } from '@/components/sections/home/HowItWorksDNA';
import { ResultsDataDNA } from '@/components/sections/home/ResultsDataDNA';
import { TeamTrustDNA } from '@/components/sections/home/TeamTrustDNA';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-dna-primary">
      {/* 1. Hero Section - DNA aesthetic with pinned animation */}
      <HeroSectionDNA />

      {/* 2. How It Works - 4-stage hexagonal flow */}
      <HowItWorksDNA />

      {/* 3. Results & Data - Scientific metrics with circular progress */}
      <ResultsDataDNA />

      {/* 4. Team & Trust - Testimonials with hexagonal avatars */}
      <TeamTrustDNA />
    </div>
  );
}
