import { Investor } from "../types";

interface UserProfile {
  full_name: string;
  email: string;
  founder_role: string;
  founder_location: string;
  startup_name: string;
  startup_description: string;
  startup_industry: string;
  startup_business_model: string;
  startup_stage: string;
  team_size: string;
  revenue_status: string;
  product_readiness: string;
  primary_goals: string[];
  funding_plans: string;
  funding_amount_range: string;
  challenges: string[];
}

/**
 * Matches investors to user profile based on various criteria
 * Returns investors sorted by match score
 */
export function matchInvestorsToProfile(investors: Investor[], userProfileString: string): Investor[] {
  try {
    // Parse the user profile from localStorage
    const userProfileData = localStorage.getItem("userProfile");
    if (!userProfileData) {
      return investors;
    }

    const profile: UserProfile = JSON.parse(userProfileData);

    // Score each investor
    const scoredInvestors = investors.map(investor => {
      let score = 0;
      const reasons: string[] = [];

      // Industry/Sector matching (highest weight: 35 points)
      if (profile.startup_industry) {
        const industry = profile.startup_industry.toLowerCase();
        const investorSectors = investor.sectors.map(s => s.toLowerCase());
        const investorThesis = investor.thesis.toLowerCase();

        // Direct sector match
        if (industry === "saas" && investorSectors.includes("saas")) {
          score += 35;
          reasons.push("SaaS sector match");
        } else if (industry === "healthtech" &&
                   (investorSectors.includes("healthtech") || investorSectors.includes("medtech") ||
                    investorSectors.includes("biotech"))) {
          score += 35;
          reasons.push("HealthTech sector match");
        } else if (industry === "fintech" && investorSectors.includes("fintech")) {
          score += 35;
          reasons.push("FinTech sector match");
        } else if (industry === "edtech" && investorSectors.includes("edtech")) {
          score += 35;
          reasons.push("EdTech sector match");
        } else if (industry === "cleantech" &&
                   (investorSectors.includes("cleantech") || investorSectors.includes("social impact"))) {
          score += 35;
          reasons.push("CleanTech sector match");
        } else if (industry === "manufacturing" &&
                   (investorSectors.includes("manufacturing tech") || investorSectors.includes("robotics"))) {
          score += 35;
          reasons.push("Manufacturing Tech sector match");
        } else if (industry === "e-commerce" &&
                   (investorSectors.includes("e-commerce") || investorSectors.includes("marketplace") ||
                    investorSectors.includes("consumer tech"))) {
          score += 35;
          reasons.push("E-commerce sector match");
        }

        // Partial match based on thesis
        if (score === 0) {
          if ((industry.includes("tech") || industry === "saas") &&
              (investorThesis.includes("software") || investorThesis.includes("technology") ||
               investorThesis.includes("tech"))) {
            score += 20;
            reasons.push("Technology focus alignment");
          }
        }
      }

      // Stage matching (high weight: 30 points)
      if (profile.startup_stage) {
        const stage = profile.startup_stage.toLowerCase();
        const investorStages = investor.stageFocus.map(s => s.toLowerCase());

        if (stage === "idea" && investorStages.includes("idea")) {
          score += 30;
          reasons.push("Idea stage match");
        } else if (stage === "mvp" &&
                   (investorStages.includes("mvp") || investorStages.includes("idea"))) {
          score += 30;
          reasons.push("MVP stage match");
        } else if (stage === "early revenue" &&
                   (investorStages.includes("early revenue") || investorStages.includes("mvp"))) {
          score += 30;
          reasons.push("Early revenue stage match");
        } else if (stage === "scaling" &&
                   (investorStages.includes("scaling") || investorStages.includes("early revenue"))) {
          score += 30;
          reasons.push("Scaling stage match");
        }
      }

      // Funding amount matching (20 points)
      if (profile.funding_amount_range && profile.funding_amount_range !== "") {
        const fundingRange = profile.funding_amount_range.toLowerCase();
        const checkSize = investor.checkSize.toLowerCase();

        // Parse ranges and check overlap
        if (fundingRange.includes("0-50k") && checkSize.includes("50k")) {
          score += 15;
          reasons.push("Check size compatible");
        } else if (fundingRange.includes("50-250k") &&
                   (checkSize.includes("100k") || checkSize.includes("250k") || checkSize.includes("500k"))) {
          score += 20;
          reasons.push("Check size match");
        } else if (fundingRange.includes("250k-1m") &&
                   (checkSize.includes("250k") || checkSize.includes("500k") || checkSize.includes("1m"))) {
          score += 20;
          reasons.push("Check size match");
        } else if (fundingRange.includes("1m-5m") &&
                   (checkSize.includes("1m") || checkSize.includes("2m") || checkSize.includes("3m") ||
                    checkSize.includes("5m"))) {
          score += 20;
          reasons.push("Check size match");
        } else if (fundingRange.includes("5m+") &&
                   (checkSize.includes("5m") || checkSize.includes("10m"))) {
          score += 20;
          reasons.push("Check size match");
        }
      }

      // Business model matching (10 points)
      if (profile.startup_business_model) {
        const businessModel = profile.startup_business_model.toLowerCase();
        const investorThesis = investor.thesis.toLowerCase();
        const investorSectors = investor.sectors.map(s => s.toLowerCase()).join(" ");

        if (businessModel === "b2b" &&
            (investorThesis.includes("b2b") || investorSectors.includes("saas"))) {
          score += 10;
          reasons.push("B2B model fit");
        } else if (businessModel === "b2c" &&
                   (investorThesis.includes("consumer") || investorSectors.includes("consumer"))) {
          score += 10;
          reasons.push("B2C model fit");
        } else if (businessModel === "marketplace" && investorSectors.includes("marketplace")) {
          score += 10;
          reasons.push("Marketplace model fit");
        }
      }

      // Location matching (5 points)
      if (profile.founder_location) {
        const location = profile.founder_location.toLowerCase();
        const investorLocation = investor.location.toLowerCase();

        if (location.includes("detroit") && investorLocation.includes("detroit")) {
          score += 5;
          reasons.push("Detroit location match");
        } else if (location.includes("ann arbor") && investorLocation.includes("ann arbor")) {
          score += 5;
          reasons.push("Ann Arbor location match");
        } else if (location.includes("grand rapids") && investorLocation.includes("grand rapids")) {
          score += 5;
          reasons.push("Grand Rapids location match");
        } else if (investorLocation.includes("statewide") || investorLocation.includes("michigan")) {
          score += 3;
          reasons.push("Michigan-based investor");
        }
      }

      // Funding goals matching (bonus points)
      if (profile.primary_goals && profile.primary_goals.length > 0) {
        const goals = profile.primary_goals.map(g => g.toLowerCase());

        if (goals.includes("raise funding")) {
          score += 5;
          reasons.push("Active fundraising");
        }
      }

      return {
        ...investor,
        matchLevel: Math.min(92, Math.round(score * 0.85)), // Scale down and cap at 92
        aiMatched: score >= 70, // Consider it an AI match if score is 70+
        matchReasons: reasons
      };
    });

    // Sort by score (highest first)
    return scoredInvestors.sort((a, b) => b.matchLevel - a.matchLevel);
  } catch (error) {
    console.error("Error matching investors:", error);
    return investors;
  }
}

/**
 * Returns the top 3 AI-matched investors
 */
export function getTopInvestorMatches(investors: Investor[]): Investor[] {
  const matched = investors.filter(i => i.aiMatched && i.matchLevel >= 70);
  return matched.slice(0, 3);
}
