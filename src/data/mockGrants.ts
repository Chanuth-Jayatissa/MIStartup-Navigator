import { Grant } from '../types';

export const mockGrants: Grant[] = [
  {
    id: '1',
    name: 'Michigan Small Business Development Fund',
    organization: 'Michigan Economic Development Corporation',
    type: 'grant',
    stageFit: ['MVP', 'Early Revenue'],
    region: 'Statewide',
    amount: '$25,000 - $100,000',
    deadline: '2025-12-15',
    status: 'open',
    matchLevel: 95,
    description: 'Provides funding for Michigan-based small businesses to support growth, innovation, and job creation.',
    eligibility: [
      'Must be a Michigan-based business',
      'Must have fewer than 50 employees',
      'Must demonstrate growth potential',
      'Must create or retain jobs'
    ],
    saved: false
  },
  {
    id: '2',
    name: 'Tech Startup Accelerator Program',
    organization: 'Ann Arbor SPARK',
    type: 'accelerator',
    stageFit: ['Idea', 'MVP'],
    region: 'Ann Arbor',
    amount: '$50,000 + mentorship',
    deadline: '2025-11-30',
    status: 'closing_soon',
    matchLevel: 88,
    description: 'Intensive 12-week program providing funding, mentorship, and resources for early-stage tech startups.',
    eligibility: [
      'Tech-focused startup',
      'Early stage (Idea or MVP)',
      'Based in or willing to relocate to Ann Arbor',
      'Full-time commitment during program'
    ],
    saved: false
  },
  {
    id: '3',
    name: 'Detroit Innovation Fund',
    organization: 'TechTown Detroit',
    type: 'grant',
    stageFit: ['Early Revenue', 'Scaling'],
    region: 'Detroit',
    amount: '$10,000 - $50,000',
    deadline: '2026-01-31',
    status: 'upcoming',
    matchLevel: 82,
    description: 'Supports Detroit-based startups with innovative solutions addressing urban challenges.',
    eligibility: [
      'Headquartered in Detroit',
      'Innovative technology or solution',
      'Addressing urban challenges',
      'Diverse founding team preferred'
    ],
    saved: false
  },
  {
    id: '4',
    name: 'Michigan Angel Fund',
    organization: 'Renaissance Venture Capital',
    type: 'loan',
    stageFit: ['Early Revenue', 'Scaling'],
    region: 'Statewide',
    amount: '$100,000 - $500,000',
    deadline: '2025-12-01',
    status: 'open',
    matchLevel: 76,
    description: 'Convertible loan program for Michigan startups showing strong traction and revenue growth.',
    eligibility: [
      'Michigan-based company',
      'Minimum $100K annual revenue',
      'Clear path to profitability',
      'Experienced founding team'
    ],
    saved: false
  },
  {
    id: '5',
    name: 'Women Founders Initiative',
    organization: 'Michigan Women Forward',
    type: 'grant',
    stageFit: ['Idea', 'MVP', 'Early Revenue'],
    region: 'Statewide',
    amount: '$15,000 - $75,000',
    deadline: '2025-11-25',
    status: 'closing_soon',
    matchLevel: 90,
    description: 'Dedicated funding program supporting women-led startups across Michigan.',
    eligibility: [
      'Woman founder or co-founder',
      'Michigan-based business',
      'Any stage welcome',
      'Commitment to diversity and inclusion'
    ],
    saved: false
  },
  {
    id: '6',
    name: 'Clean Energy Startup Grant',
    organization: 'Michigan Clean Energy Coalition',
    type: 'grant',
    stageFit: ['MVP', 'Early Revenue'],
    region: 'Statewide',
    amount: '$50,000 - $200,000',
    deadline: '2026-02-15',
    status: 'upcoming',
    matchLevel: 70,
    description: 'Funding for startups developing clean energy solutions and sustainable technologies.',
    eligibility: [
      'Clean energy or sustainability focus',
      'Proven technology or prototype',
      'Michigan operations',
      'Environmental impact plan'
    ],
    saved: false
  },
  {
    id: '7',
    name: 'Grand Rapids SmartZone Program',
    organization: 'The Right Place Inc.',
    type: 'program',
    stageFit: ['Idea', 'MVP', 'Early Revenue'],
    region: 'Grand Rapids',
    amount: 'Resources + networking',
    deadline: '2025-12-10',
    status: 'open',
    matchLevel: 73,
    description: 'Comprehensive support program offering office space, mentorship, and networking opportunities.',
    eligibility: [
      'Tech or innovation-focused startup',
      'Based in or relocating to Grand Rapids',
      'Early to mid-stage',
      'High growth potential'
    ],
    saved: false
  },
  {
    id: '8',
    name: 'Rural Business Development Grant',
    organization: 'Michigan Rural Development',
    type: 'grant',
    stageFit: ['Early Revenue', 'Scaling'],
    region: 'Rural Michigan',
    amount: '$20,000 - $80,000',
    deadline: '2026-01-20',
    status: 'upcoming',
    matchLevel: 65,
    description: 'Supporting businesses in rural Michigan communities to drive economic development.',
    eligibility: [
      'Located in rural Michigan county',
      'Job creation in rural area',
      'Community impact focus',
      'Sustainable business model'
    ],
    saved: false
  }
];
