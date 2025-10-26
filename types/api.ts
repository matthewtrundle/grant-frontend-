/**
 * TypeScript types for Grant Automation API
 * Based on backend API models
 */

// Stage 1: Company Profile
export interface Stage1ProfileRequest {
  company_name: string;
  website?: string;
  technology: string;
  description?: string;
  team_info?: string;
}

export interface Stage1ProfileResponse {
  profile_id: number;
  company_name: string;
  trl: number;
  technology_summary: string;
  key_facts: string[];
  mem0_stored: boolean;
  analysis: {
    analysis_id: number;
    cost: number;
    status: string;
  };
}

// Stage 2: Grant Discovery
export interface Stage2DiscoverRequest {
  company_profile_id: number;
  technology: string;
  funding_amount_min?: number;
  funding_amount_max?: number;
  keywords?: string[];
  limit?: number;
}

export interface Grant {
  grant_id: number;
  title: string;
  agency: string;
  funding_amount: number;
  fit_score: number;
  fit_reasons: string[];
  deadline: string;
  url: string;
}

export interface Stage2DiscoverResponse {
  total_found: number;
  grants: Grant[];
}

// Stage 3: Grant Analysis
export interface Stage3AnalyzeRequest {
  grant_id: number;
  company_profile_id: number;
  analysis_depth?: string;
}

export interface Stage3AnalyzeResponse {
  analysis_id: number;
  grant_id: number;
  company_profile_id: number;
  eligibility: {
    eligible: boolean;
    reasons: string[];
    confidence: number;
  };
  timeline: {
    milestones: Array<{
      name: string;
      deadline: string;
      dependencies: string[];
    }>;
  };
  budget: {
    total: number;
    categories: Array<{
      category: string;
      amount: number;
      justification: string;
    }>;
  };
  requirements: string[];
  success_factors: string[];
  risks: Array<{
    risk: string;
    mitigation: string;
  }>;
  recommendations: string[];
  cost: number;
  status: string;
}

// Stage 4: Application Generation
export interface Stage4GenerateRequest {
  company_id: number;
  grant_id: number;
  analysis_id: number;
  max_iterations?: number;
  target_score?: number;
  cost_budget?: number;
}

export interface Stage4GenerateResponse {
  application_id: number;
  status: string;
  sections: Array<{
    section_id: number;
    title: string;
    content: string;
    word_count: number;
    scores: {
      technical: number;
      business: number;
      academic: number;
      average: number;
    };
  }>;
  overall_score: number;
  consistency_check: {
    passed: boolean;
    issues: string[];
  };
  cost: number;
  generation_time: number;
}
