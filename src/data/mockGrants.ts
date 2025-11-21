import { Grant } from "../types";

export const mockGrants: Grant[] = [
  {
    id: "id-001",
    organization: "Michigan Economic Development Corporation (MEDC)",
    description: "Supports Michigan small businesses expanding into international markets through export activities such as trade shows, foreign missions, and sample shipments.",
    type: "Grant",
    region: "Michigan",
    amount: "Up to ~15,000 depending on approved activity",
    deadline: "Rolling / annual cycles",
    eligibility: [
      "Michigan-based small business",
      "Must be new or growing exporter",
      "Activities must align with STEP-approved initiatives",
      "Must meet SBA small business size standards"
    ],
    bookmarkable: true,
    tags: ["export", "international trade", "small business", "grant", "global markets"]
  },
  {
    id: "id-002",
    organization: "Michigan Economic Development Corporation (MEDC)",
    description: "Provides grants to support new or expanding small businesses located in \"Main Street\" or downtown commercial districts across Michigan.",
    type: "Grant",
    region: "Michigan",
    amount: "Up to ~25,000",
    deadline: "Cyclical application windows",
    eligibility: [
      "Business must be within a Michigan Main Street community",
      "Must support startup, expansion, or activation activities",
      "Requires partnership with local DDA/Main Street organization"
    ],
    bookmarkable: true,
    tags: ["downtown", "retail", "small business", "brick-and-mortar", "community development"]
  },
  {
    id: "id-003",
    organization: "Michigan Economic Development Corporation (MEDC)",
    description: "Reimbursement-based grant to help Michigan manufacturers adopt Industry 4.0 technologies such as automation, robotics, cybersecurity, IIoT systems, additive manufacturing, and advanced data tools.",
    type: "Grant",
    region: "Michigan",
    amount: "50% reimbursement up to ~25,000",
    deadline: "Rolling until funds are exhausted",
    eligibility: [
      "Michigan-based manufacturer",
      "Fewer than 500 full-time employees",
      "Must implement qualified Industry 4.0 technology",
      "Must provide matching funds"
    ],
    bookmarkable: true,
    tags: ["manufacturing", "robotics", "automation", "industry4.0", "technology", "modernization"]
  },
  {
    id: "id-004",
    organization: "Michigan Economic Development Corporation (MEDC)",
    description: "State matching fund for SBIR/STTR Phase I and Phase II awardees to accelerate commercialization of early-stage technologies.",
    type: "Grant / Matching Program",
    region: "Michigan",
    amount: "Varies based on SBIR/STTR award category",
    deadline: "Follows SBIR/STTR federal deadlines",
    eligibility: [
      "Must be a Michigan-based technology company",
      "Must have received a federal SBIR or STTR award",
      "Technology must possess commercialization potential",
      "Must comply with federal award requirements"
    ],
    bookmarkable: true,
    tags: ["SBIR", "STTR", "deep tech", "research", "innovation", "commercialization"]
  },
  {
    id: "id-005",
    organization: "MIOSHA (Michigan Occupational Safety and Health Administration)",
    description: "Provides funding for Michigan employers to implement health and safety improvements that reduce workplace injuries and hazards.",
    type: "Grant",
    region: "Michigan",
    amount: "Up to ~5,000",
    deadline: "Annual application cycle",
    eligibility: [
      "Michigan employer with workplace safety improvement need",
      "Must contribute matching funds",
      "Must purchase equipment or improvements that reduce hazards",
      "Must comply with MIOSHA guidelines"
    ],
    bookmarkable: true,
    tags: ["safety", "workplace health", "manufacturing", "compliance", "MIOSHA"]
  },
  {
    id: "id-006",
    organization: "Michigan Economic Development Corporation (MEDC)",
    description: "A credit enhancement program that assists small businesses in obtaining loans from participating lenders.",
    type: "Loan / Program",
    region: "Michigan",
    amount: "Varies by lender and borrower qualifications",
    deadline: "Rolling",
    eligibility: [
      "Michigan small business of any industry",
      "Must apply through a participating bank or lender",
      "Must meet lender underwriting and collateral requirements"
    ],
    bookmarkable: true,
    tags: ["loan", "capital access", "financing", "small business", "lending support"]
  },
  {
    id: "id-007",
    organization: "MEDC",
    description: "Early-stage funding initiative supporting startup companies through programs such as the Business Accelerator Fund and the Michigan Emerging Technologies Fund.",
    type: "Grant / Matching Program",
    region: "Michigan",
    amount: "Up to ~$50,000 in services (BAF); matching funds vary",
    deadline: "Varies by program and accelerator partner",
    eligibility: [
      "Michigan technology or innovation startup",
      "Working with a participating accelerator (for BAF)",
      "Holding or applying for SBIR/STTR awards (for ETF)"
    ],
    bookmarkable: true,
    tags: ["early-stage", "innovation", "accelerator", "tech startup", "commercialization"]
  },
  {
    id: "id-008",
    organization: "MEDC",
    description: "The Michigan Mobility Funding Platform supports companies developing mobility, transportation, and electrification technologies.",
    type: "Grant / Program",
    region: "Michigan",
    amount: "Varies based on project scope",
    deadline: "Rolling",
    eligibility: [
      "Michigan-based company or organization",
      "Mobility, EV, transportation, or infrastructure innovation focus",
      "Deployment or pilot readiness in Michigan"
    ],
    bookmarkable: true,
    tags: ["mobility", "electrification", "clean tech", "automotive", "innovation"]
  },
  {
    id: "id-009",
    organization: "Middle Michigan Development Corporation (MMDC)",
    description: "Regional small business micro-grants through the Great Lakes Bay Business Hub.",
    type: "Grant",
    region: "Michigan (Central / Great Lakes Bay Region)",
    amount: "$250–$5,000 depending on program",
    deadline: "Monthly or quarterly",
    eligibility: [
      "Small business in region",
      "Must meet program-specific criteria"
    ],
    bookmarkable: true,
    tags: ["small business", "regional", "micro-grant", "community development"]
  },
  {
    id: "id-010",
    organization: "MEDC",
    description: "Match on Main provides funding to support new or expanding place-based downtown businesses.",
    type: "Grant",
    region: "Michigan",
    amount: "Up to ~$25,000",
    deadline: "Cyclical",
    eligibility: [
      "Business in a Michigan Main Street or downtown district",
      "Supports startup or expansion",
      "Requires coordination with local EDO"
    ],
    bookmarkable: true,
    tags: ["downtown", "retail", "small business", "place-based"]
  },
  {
    id: "id-011",
    organization: "MEDC",
    description: "MI-STEP supports export activities for Michigan small businesses.",
    type: "Grant",
    region: "Michigan",
    amount: "Up to ~$15,000",
    deadline: "Rolling / annual",
    eligibility: [
      "Michigan small business",
      "Exporting or expanding into global markets"
    ],
    bookmarkable: true,
    tags: ["export", "global markets", "small business"]
  },
  {
    id: "id-012",
    organization: "MIOSHA",
    description: "MI WISH funds workplace safety and health improvements.",
    type: "Grant",
    region: "Michigan",
    amount: "Up to ~$5,000",
    deadline: "Annual",
    eligibility: [
      "Michigan employer",
      "Matching funds required",
      "Project must reduce workplace hazards"
    ],
    bookmarkable: true,
    tags: ["safety", "workplace health", "manufacturing"]
  },
  {
    id: "id-013",
    organization: "MEDC",
    description: "Industry 4.0 Technology Implementation Grant helps manufacturers adopt automation and advanced technologies.",
    type: "Grant",
    region: "Michigan",
    amount: "50% reimbursement up to ~$25,000",
    deadline: "Rolling",
    eligibility: [
      "Michigan manufacturer",
      "Fewer than 500 employees",
      "Approved Industry 4.0 technology",
      "Matching funds required"
    ],
    bookmarkable: true,
    tags: ["manufacturing", "robotics", "automation", "modernization"]
  },
  {
    id: "id-014",
    organization: "MEDC",
    description: "Business Accelerator Fund provides early-stage companies with access to services via SmartZones.",
    type: "Program / Grant-Equivalent Services",
    region: "Michigan",
    amount: "Up to ~$50,000 in services",
    deadline: "Varies by accelerator",
    eligibility: ["Early-stage tech company", "Working with a SmartZone accelerator"],
    bookmarkable: true,
    tags: ["accelerator", "early stage", "tech startup", "services"]
  },
  {
    id: "id-015",
    organization: "MEDC",
    description: "Michigan Innovation Fund provides venture-oriented capital support to high-growth tech startups.",
    type: "Program / Investment",
    region: "Michigan",
    amount: "Varies by venture partner",
    deadline: "Rolling",
    eligibility: ["Tech startup in Michigan", "High growth potential"],
    bookmarkable: true,
    tags: ["venture capital", "tech startup", "investment", "early stage"]
  },
  {
    id: "id-016",
    organization: "Wayne County / Local Development Partners",
    description: "Wayne County Small Business Grants for microbusinesses and early-stage companies.",
    type: "Grant",
    region: "Wayne County, Michigan",
    amount: "$5,000–$25,000",
    deadline: "Varies by cycle",
    eligibility: [
      "Business in Wayne County",
      "Meets small business or microbusiness criteria"
    ],
    bookmarkable: true,
    tags: ["regional", "microbusiness", "community development", "small business"]
  },
  {
    id: "id-017",
    organization: "SBAM Foundation",
    description: "Small Business Support Hub Grant offers monetary grants plus development services.",
    type: "Grant",
    region: "Michigan",
    amount: "Varies",
    deadline: "Varies",
    eligibility: [
      "Michigan small business owner",
      "Must participate in SBAM activities within six months"
    ],
    bookmarkable: true,
    tags: ["small business", "stability", "growth", "Michigan"]
  },
  {
    id: "id-018",
    organization: "Oakland County Community Development (OakGov)",
    description: "County-level grants & loans for Main Street businesses.",
    type: "Grant / Loan",
    region: "Oakland County, Michigan",
    amount: "Varies",
    deadline: "Rotating",
    eligibility: ["Business in Oakland County", "Downtown/Main Street criteria"],
    bookmarkable: true,
    tags: ["regional", "revitalization", "small business", "downtown", "grant"]
  },
  {
    id: "id-019",
    organization: "City of Detroit / Detroit Economic Growth Corporation (DEGC)",
    description: "Detroit Startup Fund provides seed and scale grants to Detroit-based startups.",
    type: "Grant",
    region: "Detroit, Michigan",
    amount: "Seed: ~$15,000, Scale: ~$50,000",
    deadline: "Round 1 closes August 25; more in 2026",
    eligibility: [
      "Detroit-based startup ≤10 years old",
      "Scalable, high-growth potential",
      "Detroit certification required",
      "Scale applicants: raised $100k+ and planning to raise $250k+"
    ],
    bookmarkable: true,
    tags: ["startup", "Detroit", "seed grant", "scale grant", "high growth"]
  },
  {
    id: "id-020",
    organization: "Michigan Economic Development Corporation (MEDC)",
    description: "Early Stage Funding initiative providing investments and service grants via nonprofit fund managers.",
    type: "Grant / Program",
    region: "Michigan",
    amount: "Up to ~$50,000 in services; $150,000+ potential investment",
    deadline: "Varies",
    eligibility: [
      "Michigan-based tech startup",
      "Pre-seed or seed stage",
      "Working with a nonprofit fund manager or accelerator"
    ],
    bookmarkable: true,
    tags: ["pre-seed", "tech startup", "services funding", "innovation", "Michigan"]
  }
];
