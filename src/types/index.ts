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
  name: string;
  organization: string;
  type: string;
  stageFit: string[];
  region: string;
  amount: string;
  deadline: string;
  status: 'open' | 'closing_soon' | 'upcoming';
  matchLevel: number;
  description: string;
  eligibility: string[];
  saved: boolean;
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
