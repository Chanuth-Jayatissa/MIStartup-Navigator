export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  founder_role?: string;
  founder_location?: string;
  startup_name?: string;
  startup_description?: string;
  startup_industry?: string;
  startup_business_model?: string;
  startup_stage?: string;
  team_size?: string;
  revenue_status?: string;
  product_readiness?: string;
  primary_goals?: string[];
  funding_plans?: string;
  funding_amount_range?: string;
  challenges?: string[];
  onboarding_completed?: boolean;
}

export interface Grant {
  id: string;
  organization: string;
  description: string;
  type: string;
  region: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  bookmarkable: boolean;
  tags: string[];
  // Computed fields for UI
  matchLevel?: number;
  aiMatched?: boolean;
  saved?: boolean;
}

export interface Investor {
  id: string;
  name: string;
  type: string;
  stageFocus: string[];
  checkSize: string;
  sectors: string[];
  location: string;
  matchLevel: number;
  thesis: string;
  michiganPortfolioCount: number;
  saved: boolean;
  // AI matching fields
  aiMatched?: boolean;
  matchReasons?: string[];
}

export interface RoadmapTask {
  id: string;
  bucket: 'this_week' | 'this_month' | 'later';
  category: string;
  title: string;
  description?: string;
  targetDate?: string;
  source: 'intake' | 'ai' | 'manual';
  completed: boolean;
}
