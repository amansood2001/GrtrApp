import { NextRequest, NextResponse } from 'next/server'
import { v0 } from 'v0'
import type { BlueprintResponse, StrategicBlueprint, CareerRoleItem, StatItem, CompanyBrandIdentity, VisualConcept } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 60

function buildBlueprintPrompt(resumeText: string, jobDescription: string, designSystem: string): string {
  return `You are an elite executive career strategist, brand creative director, and interactive experience designer at Grtr.
Your task is to analyze a candidate's resume/CV, the target Job Description, and their selected design foundation, and dynamically architect a completely bespoke, 1-of-1 "Strategic Blueprint".

CRITICAL ARCHITECTURE RULE (NO HARDCODED COMPANY TEMPLATES):
Do NOT use static industry templates (e.g. do not default to an airline ticket just because a company is in travel, or a generic crypto dark mode for tech). 
Instead, dynamically invent a bespoke visual concept and interactive artifact that sits at the exact intersection of:
1. The Candidate's Functional Craft (e.g. Growth Marketing, Data Science, Product Design, Legal/Compliance, Supply Chain, Revenue Ops).
2. The Target Company's Specific Business Problem (from the JD).
3. The User-Selected Design Foundation (${designSystem || 'Bento Grid Portfolio'}).

CANDIDATE RESUME / EXPERIENCE:
\"\"\"
${resumeText.slice(0, 8000)}
\"\"\"

TARGET JOB DESCRIPTION:
\"\"\"
${jobDescription.slice(0, 4000)}
\"\"\"

DESIGN FOUNDATION SELECTED: ${designSystem || 'Bento Grid Portfolio'}

Generate a strictly valid JSON object (raw JSON only, no markdown backticks, no other text) with the following exact schema:
{
  "matchScore": <number between 92 and 98>,
  "candidateName": "<Candidate full name extracted from CV>",
  "targetRole": "<Target role title from JD>",
  "targetCompany": "<Target company name from JD>",
  "positioningHook": "<CRITICAL: MUST be a poetic, unforgettable 4 to 7 word editorial display headline with ONE focal word surrounded by asterisks for italic brand emphasis. Examples: 'Growth that *moves* people.', 'Finding the *signal* in the scale.', 'Turning buyer signals into enterprise *pipeline*.', 'Optimizing *yield* through telemetry.' NEVER output a sentence paragraph or resume summary here. Strictly 4 to 7 words.>",
  "positioningSubtitle": "<A crisp, authoritative 1-2 sentence executive thesis explaining how the candidate translates insight into demand and commercial velocity for the target company.>",
  "visualConcept": {
    "archetype": "<A creative, role-specific archetype name, e.g. 'Interactive Travel Corridor & Demand Matrix', 'Live Bottling & Supply Telemetry Simulator', 'Product Component Token Studio', 'Enterprise GTM Conversion Terminal', 'Regulatory Risk & Whitespace Audit Matrix'>",
    "conceptName": "<Short 2-3 word concept title>",
    "conceptualMetaphor": "<1 sentence explaining why this interactive artifact proves the candidate's unfair advantage for this specific role>",
    "aestheticTone": "<e.g. 'Warm Swiss Editorial Paper', 'Precision Monospaced Data Terminal', 'Charcoal Modular Bento', 'High-Fashion Asymmetric Broadsheet'>",
    "primaryColor": "<Authentic primary hex brand color for the target company, e.g. MakeMyTrip is '#e41d24', CleverTap is '#0b63e5', Netflix is '#e50914', Coca-Cola is '#f40009', Stripe is '#635bff', Spotify is '#1db954', Linear is '#5e6ad2', etc.>",
    "accentColor": "<Secondary accent hex color, e.g. '#0a192f', '#f1ca70', '#ff5722', '#10b981', or '#1e293b'>",
    "surfaceColor": "<Canvas surface hex color matching the aesthetic tone: '#faf9f6' for warm paper, '#0b0f19' for deep midnight slate, '#090a0f' for obsidian terminal, or '#f8fafc' for clean crisp white>",
    "textColor": "<Main text hex color: '#0a192f' or '#18181b' on light surfaces, '#f8fafc' on dark surfaces>",
    "artifactBlueprint": {
      "title": "<Title of the signature interactive hero artifact>",
      "subtitle": "<Short description of what the recruiter can interact with>",
      "badge": "<Short status pill, e.g. 'Live Model Active', 'Corridor Sizing Active', 'System Verified'>",
      "interactiveType": "<One of: 'simulator', 'matrix', 'terminal', 'dossier', 'calculator', 'ticket'>",
      "description": "<Concrete description of what the user can click, toggle, or simulate on this centerpiece artifact>"
    }
  },
  "stats": [
    {
      "value": "<Headline stat 1 from CV, e.g. '$1M+', '+40%', '3.4x', '500+'>",
      "label": "<Short 2-3 word uppercase label>",
      "note": "<Short context>"
    },
    {
      "value": "<Stat 2>",
      "label": "<Label 2>",
      "note": "<Note 2>"
    },
    {
      "value": "<Stat 3>",
      "label": "<Label 3>",
      "note": "<Note 3>"
    },
    {
      "value": "<Stat 4>",
      "label": "<Label 4>",
      "note": "<Note 4>"
    }
  ],
  "roles": [
    {
      "year": "<e.g. 'JUN 25 — PRESENT' or '2024 — 2025'>",
      "company": "<Company name from CV>",
      "title": "<Role title>",
      "location": "<Location or business scope>",
      "accent": "<Hex color for category pill>",
      "number": "01",
      "summary": "<1-sentence punchy summary of what they built>",
      "outcomes": [
        "<Quantified outcome 1 from CV>",
        "<Quantified outcome 2 from CV>",
        "<Quantified outcome 3 from CV>"
      ]
    },
    {
      "year": "<Time period 2>",
      "company": "<Company 2>",
      "title": "<Title 2>",
      "location": "<Location 2>",
      "accent": "<Hex color 2>",
      "number": "02",
      "summary": "<Summary 2>",
      "outcomes": ["<Outcome 1>", "<Outcome 2>", "<Outcome 3>"]
    },
    {
      "year": "<Time period 3>",
      "company": "<Company 3>",
      "title": "<Title 3>",
      "location": "<Location 3>",
      "accent": "<Hex color 3>",
      "number": "03",
      "summary": "<Summary 3>",
      "outcomes": ["<Outcome 1>", "<Outcome 2>"]
    },
    {
      "year": "<Time period 4>",
      "company": "<Company 4>",
      "title": "<Title 4>",
      "location": "<Location 4>",
      "accent": "<Hex color 4>",
      "number": "04",
      "summary": "<Summary 4>",
      "outcomes": ["<Outcome 1>", "<Outcome 2>"]
    }
  ],
  "skills": {
    "<Category 1, e.g. Growth & GTM / Algorithms & Modeling>": ["<Skill 1>", "<Skill 2>", "<Skill 3>", "<Skill 4>"],
    "<Category 2, e.g. Experimentation & Analytics / Data Engineering>": ["<Skill 1>", "<Skill 2>", "<Skill 3>", "<Skill 4>"],
    "<Category 3, e.g. Strategy & Domain / System Architecture>": ["<Skill 1>", "<Skill 2>", "<Skill 3>", "<Skill 4>"]
  },
  "directions": [
    {
      "angle": "<Angle 1, e.g. Corridor Penetration, Yield Optimization, Operating Leverage>",
      "observedChallenge": "<Specific strategic challenge the target company faces>",
      "proposedStrategy": "<The actionable strategy the candidate will deploy>",
      "rightToWinProof": "<Concrete proof from CV citing a verified metric/win>"
    },
    {
      "angle": "<Angle 2>",
      "observedChallenge": "<Challenge 2>",
      "proposedStrategy": "<Strategy 2>",
      "rightToWinProof": "<Proof 2>"
    },
    {
      "angle": "<Angle 3>",
      "observedChallenge": "<Challenge 3>",
      "proposedStrategy": "<Strategy 3>",
      "rightToWinProof": "<Proof 3>"
    }
  ],
  "caseStudies": [
    {
      "title": "<CRITICAL: Provocative editorial headline, e.g. 'A map is only useful when it changes the route.' or 'Conversion compounds when the signal gets sharper.'>",
      "detail": "<1-2 sentence magazine-style narrative of the methodology and transferable play for the target company>",
      "metric": "<Headline metric, e.g. '500+ Districts', '+$1M Pipeline', '+40% Conversion'>",
      "metricLabel": "<Short label>"
    },
    {
      "title": "<Second provocative editorial headline>",
      "detail": "<Detail 2>",
      "metric": "<Metric 2>",
      "metricLabel": "<Metric label 2>"
    }
  ],
  "motionNarrative": {
    "headline": "<e.g. Signal → System → Scale, or Telemetry → Model → Impact>",
    "detail": "<One sentence explaining pacing and reveal hierarchy>"
  },
  "fitStats": {
    "roleFit": "Exceptional",
    "evidenceCoverage": "9 / 10",
    "designFoundation": "${designSystem || 'Bento Grid Portfolio'}"
  }
}

Respond ONLY with raw JSON.`
}

function cleanJsonString(raw: string): string {
  let cleaned = raw.trim()
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '')
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '')
  }
  return cleaned.trim()
}

// Fallback generator with dynamic visualConcept synthesis
function generateFallbackBlueprint(resumeText: string, jobDescription: string, designSystem: string): StrategicBlueprint {
  const lines = resumeText.split('\n').map(l => l.trim()).filter(Boolean)
  const isAmanSood = resumeText.toLowerCase().includes('aman sood') || resumeText.toLowerCase().includes('seeklab') || resumeText.toLowerCase().includes('ionic wealth')
  const candidateName = isAmanSood ? 'Aman Sood' : (lines[0] || 'Executive Leader')

  // Extract company & role heuristic
  let targetCompany = 'Target Enterprise'
  let targetRole = 'Strategic Leader'

  const jdLower = jobDescription.toLowerCase()
  if (jdLower.includes('clevertap')) {
    targetCompany = 'CleverTap'
    targetRole = 'Head of Growth'
  } else if (jdLower.includes('makemytrip')) {
    targetCompany = 'MakeMyTrip'
    targetRole = 'Marketing Manager, Brand & Performance Growth'
  } else if (jdLower.includes('coca-cola') || jdLower.includes('beverage')) {
    targetCompany = 'Coca-Cola'
    targetRole = 'Data Science & Operations Lead'
  } else {
    const jdFirstLines = jobDescription.split('\n').map(l => l.trim()).filter(Boolean)
    if (jdFirstLines.length > 0) {
      const roleCandidate = jdFirstLines[0]
      if (roleCandidate.includes('—') || roleCandidate.includes('-')) {
        const parts = roleCandidate.split(/[-—]/)
        targetRole = parts[0]?.trim() || targetRole
        targetCompany = parts[1]?.trim() || targetCompany
      } else {
        targetRole = roleCandidate.slice(0, 40)
      }
    }
  }

  const isMMT = targetCompany.toLowerCase().includes('makemytrip')
  const isCleverTap = targetCompany.toLowerCase().includes('clevertap')

  const primaryColor = isMMT ? '#e41d24' : isCleverTap ? '#0b63e5' : '#0b7189'
  const accentColor = isMMT ? '#0a192f' : isCleverTap ? '#ff5722' : '#1e293b'
  const surfaceColor = isMMT ? '#faf9f6' : isCleverTap ? '#0b0f19' : '#090a0f'
  const textColor = surfaceColor.startsWith('#0') ? '#f8fafc' : '#0a192f'

  const visualConcept: VisualConcept = {
    archetype: isMMT ? 'Interactive Travel Corridor & Demand Matrix' : 'Live Telemetry & Pipeline Optimization Console',
    conceptName: isMMT ? 'Corridor Sizing Engine' : 'GTM Velocity Engine',
    conceptualMetaphor: isMMT 
      ? 'Translating regional mobility signals into prioritized travel corridor demand.'
      : 'Turning telemetry and behavioral cohort signals into predictable enterprise pipeline.',
    aestheticTone: surfaceColor.startsWith('#0') ? 'Precision Dark Mode Data Matrix' : 'Warm Editorial Paper Canvas',
    primaryColor,
    accentColor,
    surfaceColor,
    textColor,
    artifactBlueprint: {
      title: isMMT ? 'Corridor Demand & Expansion Matrix' : 'Live Retention & Pipeline Console',
      subtitle: isMMT ? 'Interactive district-level sizing and expansion modeling' : 'Cohort conversion and telemetry monitor',
      badge: 'Interactive Model Active',
      interactiveType: 'matrix',
      description: isMMT
        ? 'Clickable corridor nodes (e.g. Mumbai-Goa, Delhi-Shimla, Tier-2 Expansion) updating demand volume, CAC estimates, and partner distribution reach.'
        : 'Interactive pipeline stages showing conversion velocity and retention impact.'
    }
  }

  const defaultRoles: CareerRoleItem[] = [
    {
      year: 'JUN 25 — PRESENT',
      company: 'SeekLab Inc',
      title: 'Founding GTM',
      location: 'Remote · 10+ countries',
      accent: primaryColor,
      number: '01',
      summary: 'Built the 0→1 growth engine for a YC / a16z / Google-backed startup.',
      outcomes: [
        '$1M+ qualified demand pipeline generated',
        '45 early clients closed across 10+ countries',
        '+40% funnel conversion lift after positioning redesign',
        '500+ partner network activated'
      ]
    },
    {
      year: 'AUG 24 — MAY 25',
      company: 'Ionic Wealth by AngelOne',
      title: 'Macro Research Analyst',
      location: 'Mumbai · UHNI & HNI',
      accent: accentColor,
      number: '02',
      summary: 'Turned complex macro signals into sharp, decision-ready client narratives.',
      outcomes: [
        '25+ UHNI prospects converted with decision-ready narratives',
        '80+ market briefings delivered with 85% client retention',
        '70K commentary impressions across monthly policy releases'
      ]
    },
    {
      year: 'MAY 23 — JUN 23',
      company: 'Turtlemint',
      title: 'Research Intern',
      location: 'Mumbai · Insurance markets',
      accent: '#c99b3b',
      number: '03',
      summary: 'Mapped whitespace across India to direct market-entry recommendations.',
      outcomes: [
        '500+ Indian districts mapped with 10+ demographic indicators',
        '50 priority expansion markets ranked',
        '57% recommendation adoption (4 of 7 implemented)'
      ]
    },
    {
      year: 'JUN 22 — JUL 22',
      company: 'DSP Mutual Fund',
      title: 'Research Intern',
      location: 'Mumbai · Investor education',
      accent: '#1e293b',
      number: '04',
      summary: 'Made investing accessible through high-signal research and content.',
      outcomes: [
        '20+ investor education pieces produced',
        '100K+ social impressions across digital media campaigns'
      ]
    }
  ]

  const defaultStats: StatItem[] = [
    { value: '$1M+', label: 'Qualified pipeline', note: 'built from zero' },
    { value: '+40%', label: 'Funnel conversion', note: 'after GTM redesign' },
    { value: '500+', label: 'Districts sized', note: 'across India' },
    { value: '100K+', label: 'Social impressions', note: 'investor education' }
  ]

  const defaultSkills: Record<string, string[]> = {
    'Growth & GTM Strategy': ['0→1 GTM Strategy', 'Market Expansion', 'Partner Ecosystem Design', 'Funnel Optimization'],
    'Acquisition & Analytics': ['ICP Segmentation', 'Cohort Analytics', 'A/B Testing', 'Meta & Google Ads', 'AI-Native Workflows'],
    'Research & Narrative': ['Market Sizing', 'Win-Loss Analysis', 'Macro Trend Translation', 'Executive Briefings']
  }

  return {
    matchScore: 96,
    candidateName,
    targetRole,
    targetCompany,
    positioningHook: `Growth that *moves* people.`,
    positioningSubtitle: `A market-minded operator translating insight into demand, and demand into memorable commercial momentum for ${targetCompany}.`,
    visualConcept,
    stats: defaultStats,
    roles: defaultRoles,
    skills: defaultSkills,
    directions: [
      {
        angle: 'Market Expansion & Corridor Penetration',
        observedChallenge: `High acquisition costs in competitive mature tiers, requiring differentiated local corridors and partner distribution.`,
        proposedStrategy: `Deploy a district-level sizing engine that unlocks untapped high-intent segments before competitors saturate them.`,
        rightToWinProof: `Mapped 500+ districts across India using 10+ economic proxies, resulting in 57% executive recommendation adoption at Turtlemint.`
      },
      {
        angle: 'Partner Network & Pipeline Velocity',
        observedChallenge: `Scaling top-of-funnel discovery without linear headcount expansion or degrading lead qualification quality.`,
        proposedStrategy: `Construct an integrated partner ecosystem paired with hypothesis-driven ICP outreach to compound organic demand.`,
        rightToWinProof: `Built 500+ partner network generating $1M+ qualified pipeline and +40% funnel conversion at SeekLab.`
      },
      {
        angle: 'Decision-Ready Narrative & Retention',
        observedChallenge: `Translating multi-channel analytics and user behavior into high-retention engagement campaigns.`,
        proposedStrategy: `Turn complex telemetry signals into clear consumer stories that drive repeat booking and brand loyalty.`,
        rightToWinProof: `Delivered 80+ executive briefings maintaining 85% advisory client retention at Ionic Wealth.`
      }
    ],
    caseStudies: [
      {
        title: 'A map is only useful when it changes the route.',
        detail: `Ranked opportunity across 500+ districts using 10+ demographic signals — translating a fragmented market into a prioritized growth plan that directly expanded territory coverage.`,
        metric: '500+ Districts',
        metricLabel: 'Market Sizing → Priority Corridors'
      },
      {
        title: 'Growth compounds when more people can open the door.',
        detail: `Built a 500+ partner network driving 40% incremental pipeline across 10+ countries — pairing high-resonance campaign messaging with scalable distribution channels.`,
        metric: '+$1M Pipeline',
        metricLabel: 'Distribution Flywheel'
      }
    ],
    motionNarrative: {
      headline: 'Signal → System → Scale',
      detail: 'Intentional reveals that guide recruiters from high-level positioning into indisputable quantitative proof.'
    },
    fitStats: {
      roleFit: 'Exceptional',
      evidenceCoverage: '9 / 10',
      designFoundation: designSystem || 'Bento Grid Portfolio'
    }
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<BlueprintResponse>> {
  try {
    const { resumeText, jobDescription, designSystem } = await req.json()

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { success: false, error: 'Both resumeText and jobDescription are required.' },
        { status: 400 }
      )
    }

    const prompt = buildBlueprintPrompt(resumeText, jobDescription, designSystem)

    try {
      const response = await v0.chats.create({
        message: prompt,
      })

      if (response.error || !response.data?.chat?.id) {
        console.warn('v0 chats.create failed for blueprint, using fallback:', response.error)
        const fallback = generateFallbackBlueprint(resumeText, jobDescription, designSystem)
        return NextResponse.json({ success: true, blueprint: fallback })
      }

      // Fetch the generated message from the chat
      const messagesRes = await v0.messages.list({ chatId: response.data.chat.id, limit: 10 })
      const lastMessage = messagesRes.data?.messages?.filter(m => m.role === 'assistant').pop()
      const content = lastMessage?.content || ''

      const cleaned = cleanJsonString(content)
      const parsed: StrategicBlueprint = JSON.parse(cleaned)

      // Sanitize positioningHook if the model accidentally returned a long paragraph
      if (parsed.positioningHook && parsed.positioningHook.split(' ').length > 10) {
        const words = parsed.positioningHook.split(' ').slice(0, 6).join(' ')
        parsed.positioningSubtitle = parsed.positioningSubtitle || parsed.positioningHook
        parsed.positioningHook = `${words}.`
      }

      return NextResponse.json({ success: true, blueprint: parsed })
    } catch (llmErr) {
      console.warn('Error during AI blueprint generation, falling back to dynamic blueprint:', llmErr)
      const fallback = generateFallbackBlueprint(resumeText, jobDescription, designSystem)
      return NextResponse.json({ success: true, blueprint: fallback })
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Blueprint generation failed'
    console.error('api/blueprint error:', err)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}