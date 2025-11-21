import { Grant } from "../types";

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
 * Matches grants to user profile based on various criteria
 * Returns top 3 grants with match scores
 */
export function matchGrantsToProfile(grants: Grant[], userProfileString: string): Grant[] {
  try {
    // Parse the user profile from localStorage
    const userProfileData = localStorage.getItem("userProfile");
    if (!userProfileData) {
      return grants;
    }

    const profile: UserProfile = JSON.parse(userProfileData);

    // Score each grant
    const scoredGrants = grants.map(grant => {
      let score = 0;
      const reasons: string[] = [];

      // Industry/Sector matching (high weight: 30 points)
      if (profile.startup_industry) {
        const industry = profile.startup_industry.toLowerCase();
        const grantText = `${grant.description} ${grant.tags.join(" ")} ${grant.eligibility.join(" ")}`.toLowerCase();

        // Tech/SaaS matches
        if ((industry === "saas" || industry.includes("tech")) &&
            (grantText.includes("tech") || grantText.includes("innovation") ||
             grantText.includes("software") || grantText.includes("saas"))) {
          score += 30;
          reasons.push("Tech/Innovation focus");
        }

        // Manufacturing matches
        if (industry === "manufacturing" &&
            (grantText.includes("manufacturing") || grantText.includes("industry 4.0") ||
             grantText.includes("automation") || grantText.includes("robotics"))) {
          score += 30;
          reasons.push("Manufacturing focus");
        }

        // CleanTech/EV matches
        if (industry === "cleantech" &&
            (grantText.includes("clean") || grantText.includes("mobility") ||
             grantText.includes("electrification") || grantText.includes("ev"))) {
          score += 30;
          reasons.push("CleanTech/Mobility focus");
        }

        // E-commerce/Retail matches
        if (industry === "e-commerce" &&
            (grantText.includes("retail") || grantText.includes("downtown") ||
             grantText.includes("main street") || grantText.includes("brick-and-mortar"))) {
          score += 30;
          reasons.push("Retail/E-commerce focus");
        }
      }

      // Stage matching (high weight: 25 points)
      if (profile.startup_stage) {
        const stage = profile.startup_stage.toLowerCase();
        const grantText = `${grant.description} ${grant.tags.join(" ")} ${grant.eligibility.join(" ")}`.toLowerCase();

        if ((stage === "idea" || stage === "mvp") &&
            (grantText.includes("early-stage") || grantText.includes("early stage") ||
             grantText.includes("pre-seed") || grantText.includes("startup") ||
             grantText.includes("accelerator"))) {
          score += 25;
          reasons.push("Early-stage match");
        }

        if ((stage === "early revenue" || stage === "scaling") &&
            (grantText.includes("growth") || grantText.includes("scale") ||
             grantText.includes("expansion") || grantText.includes("revenue"))) {
          score += 25;
          reasons.push("Growth-stage match");
        }
      }

      // Funding goals matching (20 points)
      if (profile.funding_plans) {
        const fundingPlan = profile.funding_plans.toLowerCase();
        const grantText = `${grant.description} ${grant.tags.join(" ")}`.toLowerCase();

        if (fundingPlan.includes("grant") && grant.type.toLowerCase().includes("grant")) {
          score += 20;
          reasons.push("Grant seeker");
        }

        if (fundingPlan.includes("investment") &&
            (grantText.includes("investment") || grantText.includes("venture") ||
             grantText.includes("angel"))) {
          score += 20;
          reasons.push("Investment focus");
        }
      }

      // Primary goals matching (15 points)
      if (profile.primary_goals && profile.primary_goals.length > 0) {
        const goals = profile.primary_goals.map(g => g.toLowerCase());
        const grantText = `${grant.description} ${grant.tags.join(" ")}`.toLowerCase();

        if (goals.includes("raise funding") && grant.type.toLowerCase().includes("grant")) {
          score += 15;
          reasons.push("Funding goal match");
        }

        if (goals.includes("join accelerator") &&
            (grantText.includes("accelerator") || grantText.includes("program"))) {
          score += 15;
          reasons.push("Accelerator goal match");
        }

        if (goals.includes("scale revenue") &&
            (grantText.includes("growth") || grantText.includes("scale"))) {
          score += 15;
          reasons.push("Growth goal match");
        }
      }

      // Location matching (10 points)
      if (profile.founder_location) {
        const location = profile.founder_location.toLowerCase();
        const grantRegion = grant.region.toLowerCase();

        // Check for specific cities
        if (location.includes("detroit") && grantRegion.includes("detroit")) {
          score += 10;
          reasons.push("Detroit location match");
        } else if (location.includes("ann arbor") && grantRegion.includes("michigan")) {
          score += 10;
          reasons.push("Michigan location match");
        } else if (location.includes("grand rapids") && grantRegion.includes("grand rapids")) {
          score += 10;
          reasons.push("Grand Rapids location match");
        } else if (grantRegion.includes("statewide") || grantRegion.includes("michigan")) {
          score += 5;
          reasons.push("Michigan-wide eligibility");
        }
      }

      // Team size eligibility check (bonus 5 points if mentioned)
      if (profile.team_size) {
        const grantText = `${grant.description} ${grant.eligibility.join(" ")}`.toLowerCase();
        const teamSize = profile.team_size.toLowerCase();

        if ((teamSize.includes("solo") || teamSize.includes("2-3")) &&
            (grantText.includes("small business") || grantText.includes("microbusiness"))) {
          score += 5;
          reasons.push("Small business size");
        }
      }

      return {
        ...grant,
        matchLevel: Math.min(92, Math.round(score * 0.85)), // Scale down and cap at 92
        aiMatched: score >= 70, // Consider it an AI match if score is 70+
        matchReasons: reasons
      };
    });

    // Sort by score (highest first) and return top matches
    return scoredGrants.sort((a, b) => (b.matchLevel || 0) - (a.matchLevel || 0));
  } catch (error) {
    console.error("Error matching grants:", error);
    return grants;
  }
}

/**
 * Returns the top 3 AI-matched grants
 */
export function getTopMatches(grants: Grant[]): Grant[] {
  const matched = grants.filter(g => g.aiMatched && (g.matchLevel || 0) >= 70);
  return matched.slice(0, 3);
}
