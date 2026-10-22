import { NextRequest, NextResponse } from 'next/server'
import { v0 } from 'v0'
import type { GenerateResponse, StrategicBlueprint } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 120

export const TEMPLATE_SPECS: Record<string, { id: string; name: string; v0Url: string; layoutDirective: string; styleGuide: string }> = {
  'Modern Developer Portfolio': {
    id: 'evBwFXFJcM9',
    name: 'Modern Developer Portfolio',
    v0Url: 'https://v0.app/templates/evBwFXFJcM9',
    layoutDirective: 'Build directly on top of the canonical v0 template at https://v0.app/templates/evBwFXFJcM9 (ID: evBwFXFJcM9). Implement sleek dark glassmorphism, fluid interactive project cards, smooth spring physics, ambient radial glows, and tech stack badges.',
    styleGuide: 'Deep obsidian backdrop, frosted glass cards with 1px border highlights, monospace metrics, and smooth Framer Motion reveals.',
  },
  'Executive Impact Showcase': {
    id: 'E3xFlIXCZi4',
    name: 'Executive Impact Showcase',
    v0Url: 'https://v0.app/templates/portfolio-website-design-E3xFlIXCZi4',
    layoutDirective: 'Build directly on top of the canonical v0 template at https://v0.app/templates/portfolio-website-design-E3xFlIXCZi4 (ID: E3xFlIXCZi4). Implement bold executive headline positioning, prominent quantified ROI metric callouts, interactive 3-direction teardown tabs, and recruiter conversion CTAs.',
    styleGuide: 'High-impact executive presence, commanding typography, high-contrast metric badges, crisp accents.',
  },
  'Bento Grid Portfolio': {
    id: 'mA8N4h1POSv',
    name: 'Bento Grid Portfolio',
    v0Url: 'https://v0.app/templates/portfolio-template-mA8N4h1POSv',
    layoutDirective: 'Build directly on top of the canonical v0 template at https://v0.app/templates/portfolio-template-mA8N4h1POSv (ID: mA8N4h1POSv). Implement an asymmetric bento grid layout with dynamic metric counters, modular timeline milestones, interactive expandable project cards, and sticky navigation.',
    styleGuide: 'Bento-box modular layout, charcoal or paper surfaces with rounded-2xl radii, soft inner borders, prominent stat chips, and high information density.',
  },
  'Retro Screen Developer Showcase': {
    id: 'JgcWH8Dw9d3',
    name: 'Retro Screen Developer Showcase',
    v0Url: 'https://v0.app/templates/JgcWH8Dw9d3',
    layoutDirective: 'Build directly on top of the canonical v0 template at https://v0.app/templates/JgcWH8Dw9d3 (ID: JgcWH8Dw9d3). Implement a vintage CRT monitor aesthetic, analog scanline filters, stark monospace displays, and tactile interactive modules.',
    styleGuide: 'Vintage CRT display, analog scanline textures, phosphor monochrome accents, monospace metrics, and tactile toggle buttons.',
  },
  'Avant-Garde Creative Portfolio': {
    id: 'dmRJapDTzFk',
    name: 'Avant-Garde Creative Portfolio',
    v0Url: 'https://v0.app/templates/avant-garde-designer-portfolio-showcase-dmRJapDTzFk',
    layoutDirective: 'Build directly on top of the canonical v0 template at https://v0.app/templates/avant-garde-designer-portfolio-showcase-dmRJapDTzFk (ID: dmRJapDTzFk). Implement asymmetric editorial grids, oversized display typography, editorial case study narratives, and artful image/metric placements.',
    styleGuide: 'Avant-garde editorial, high fashion pacing, large display serif headings, and generous margins.',
  },
}

function buildGenerationPrompt(blueprint: StrategicBlueprint, designSystem: string): string {
  const concept = blueprint.visualConcept || {
    archetype: 'Interactive Role & Impact Console',
    conceptName: 'Strategic Impact Console',
    conceptualMetaphor: 'Interactive demonstration of verified commercial impact.',
    aestheticTone: 'Warm Editorial Paper Canvas',
    primaryColor: blueprint.companyBrand?.primaryColor || '#e41d24',
    accentColor: blueprint.companyBrand?.accentColor || '#0a192f',
    surfaceColor: blueprint.companyBrand?.surfaceColor || '#faf9f6',
    textColor: blueprint.companyBrand?.textColor || '#0a192f',
    artifactBlueprint: {
      title: 'Interactive Impact Matrix',
      subtitle: 'Verified career signals and commercial outcomes',
      badge: 'Live Console Active',
      interactiveType: 'matrix',
      description: 'Interactive tabs allowing recruiters to inspect career outcomes and verified metrics.'
    }
  }

  const primaryColor = concept.primaryColor || '#e41d24'
  const accentColor = concept.accentColor || '#0a192f'
  const surfaceColor = concept.surfaceColor || '#faf9f6'
  const textColor = concept.textColor || '#0a192f'
  const isDarkCanvas = surfaceColor.startsWith('#0') || surfaceColor.startsWith('#1')

  // Parse headline emphasis
  let headlineDisplay = blueprint.positioningHook || 'Growth that *moves* people.'
  if (headlineDisplay.includes('*')) {
    headlineDisplay = headlineDisplay.replace(/\*([^*]+)\*/g, `<em class="font-normal text-[${primaryColor}]">$1</em>`)
  }

  // Format roles data
  const rolesJson = JSON.stringify(blueprint.roles || [
    {
      year: 'JUN 25 — PRESENT',
      company: 'SeekLab Inc',
      title: 'Founding GTM',
      location: 'Remote · 10+ countries',
      accent: primaryColor,
      number: '01',
      summary: 'Built the 0→1 growth engine for a YC / a16z / Google-backed startup.',
      outcomes: ['$1M+ qualified demand pipeline', '45 early clients closed', '+40% funnel conversion', '500+ partner network'],
    },
    {
      year: 'AUG 24 — MAY 25',
      company: 'Ionic Wealth by AngelOne',
      title: 'Macro Research Analyst',
      location: 'Mumbai · UHNI & HNI',
      accent: accentColor,
      number: '02',
      summary: 'Turned complex macro signals into sharp, decision-ready client narratives.',
      outcomes: ['25+ UHNI prospects converted', '80+ market briefings delivered', '85% client retention', '70K commentary impressions'],
    },
    {
      year: 'MAY 23 — JUN 23',
      company: 'Turtlemint',
      title: 'Research Intern',
      location: 'Mumbai · Insurance markets',
      accent: '#c99b3b',
      number: '03',
      summary: 'Mapped whitespace across India to direct market-entry recommendations.',
      outcomes: ['500+ Indian districts mapped', '10+ demographic indicators', '4 of 7 recommendations adopted'],
    },
    {
      year: 'JUN 22 — JUL 22',
      company: 'DSP Mutual Fund',
      title: 'Research Intern',
      location: 'Mumbai · Investor education',
      accent: '#1e293b',
      number: '04',
      summary: 'Made investing feel more accessible through useful, high-signal content.',
      outcomes: ['20+ investor education pieces', '100K+ social impressions'],
    },
  ], null, 2)

  // Format stats data
  const statsJson = JSON.stringify(blueprint.stats || [
    { value: '$1M+', label: 'Qualified pipeline', note: 'built from zero' },
    { value: '+40%', label: 'Funnel conversion', note: 'after GTM redesign' },
    { value: '500+', label: 'Districts sized', note: 'across India' },
    { value: '100K+', label: 'Social impressions', note: 'investor education' },
  ], null, 2)

  // Format skills data
  const skillsJson = JSON.stringify(blueprint.skills || {
    'Growth & GTM Strategy': ['0→1 GTM Strategy', 'Market Sizing', 'Funnel Optimization', 'Partner Ecosystem Design'],
    'Acquisition & Analytics': ['Meta & Google Ads', 'Cohort Analytics', 'Clay & Apollo', 'A/B Testing', 'AI-Native Automation'],
    'Research & Narrative': ['Macro Research', 'Win-Loss Analysis', 'Consumer Insights', 'Executive Briefings'],
  }, null, 2)

  // Format case studies
  const caseStudiesJson = JSON.stringify(blueprint.caseStudies || [
    {
      title: 'A map is only useful when it changes the route.',
      detail: `Ranked opportunity across 500+ districts using 10+ demographic signals — translating a fragmented market into a prioritized growth plan. At ${blueprint.targetCompany}, I'd bring that same lens to corridor and customer expansion.`,
      metric: '500+ Districts',
      metricLabel: 'Market Sizing → Opportunity Map',
    },
    {
      title: 'Growth compounds when more people can open the door.',
      detail: `Built a 500+ partner network that drove 40% incremental pipeline — while taking the GTM motion across 10+ countries. The transferable play: pair compelling campaigns with a distribution system built to travel.`,
      metric: '+$1M Pipeline',
      metricLabel: 'Distribution Flywheel',
    },
  ], null, 2)

  const templateSpec = TEMPLATE_SPECS[designSystem] || TEMPLATE_SPECS['Bento Grid Portfolio']

  return `You are an elite creative technologist and design director building a bespoke, 1-of-1 executive portfolio web application for ${blueprint.candidateName}, applying for the position of ${blueprint.targetRole} at ${blueprint.targetCompany}.

LAYOUT FOUNDATION (${designSystem || 'Bento Grid Portfolio'}):
- Base Style Guide: ${templateSpec.styleGuide}
- Layout Directive: ${templateSpec.layoutDirective}

DYNAMIC CONCEPT & BRAND IDENTITY (SYNTHESIZED FOR THIS EXACT CANDIDATE & ROLE):
- Concept Archetype: ${concept.archetype}
- Conceptual Metaphor: "${concept.conceptualMetaphor}"
- Aesthetic Tone: ${concept.aestheticTone}
- Palette:
  * Canvas Background: ${surfaceColor} (${isDarkCanvas ? 'Dark canvas' : 'Warm off-white paper canvas'})
  * Brand Primary: ${primaryColor} (Matches ${blueprint.targetCompany})
  * Secondary Accent: ${accentColor}
  * Text Color: ${textColor}
- Typography:
  * Headings: High-contrast Editorial Serif (font-serif / 'Playfair Display', Georgia, serif) with italicized brand color accents.
  * Body & Navigation: Crisp Modern Sans (font-sans / 'DM Sans', sans-serif).
  * Metrics, Numbers & Kicker Tags: Monospace (font-mono / 'DM Mono', monospace) with wide tracking (tracking-[0.2em]).

CRITICAL FRONTEND ARCHITECTURE & COMPONENTS:

1. Clean Sticky Header:
   - Left brand mark: Initials badge inside a rounded-full pill in ${primaryColor} with white text, followed by "${blueprint.candidateName}." in bold uppercase with tracked kicker.
   - Middle navigation: Uppercase tracked links: "Itinerary", "Case studies", "Stack" with hover transitions.
   - Right CTA: <button type="button" onClick={() => setShowContact(true)}> opening the Priority Contact modal.

2. Hero Section with Bespoke Signature Artifact:
   - Left column:
     * Kicker: "Application / 01" with accent line.
     * Executive Display Headline: Strictly 4 to 7 words in font-serif text-5xl sm:text-7xl lg:text-[6.6rem] leading-[0.96] tracking-[-0.045em]:
       ${blueprint.positioningHook} (focal word in <em className="font-normal text-[${primaryColor}]">...</em>).
     * Subtitle: "${blueprint.positioningSubtitle || 'A market-minded operator translating insight into demand and commercial velocity.'}" in text-lg leading-relaxed text-[${textColor}]/65.
     * CTAs: <button type="button" onClick={() => setShowContact(true)} className="rounded-full bg-[${primaryColor}] text-white px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition hover:opacity-90">Schedule an interview ↗</button>
   - Right column (SIGNATURE ARTIFACT):
     * Construct an interactive centerpiece representing the "${concept.archetype}":
       - Title: "${concept.artifactBlueprint?.title || 'System Matrix'}"
       - Status badge: "${concept.artifactBlueprint?.badge || 'Live System'}"
       - Interactive widget: ${concept.artifactBlueprint?.description || 'Interactive parameter toggles and metric indicators'}
       - Candidate status: "Confirmed Candidate · ${blueprint.matchScore || 96}% role match"

3. Quantified Metrics Bar (Border-Separated Strip):
   - 4 prominent stats displayed in a grid with border-y:
   ${statsJson}

4. Interactive Career Itinerary Section:
   - Stateful Role Tabs:
     * const [activeRole, setActiveRole] = useState(0)
     * const role = roles[activeRole]
     * 4 clickable stop buttons mapping through the career roles:
   ${rolesJson}
     * Clicking any button MUST call setActiveRole(index).
     * Selected impact card below that dynamically updates:
       - Displays: {role.title} at {role.company}
       - Displays: {role.summary}
       - 2-column checklist of outcomes with Check icons (lucide-react) in text-[${primaryColor}].

5. Editorial Case Studies:
   - 2 large feature cards with provocative headlines and headline metric badges:
   ${caseStudiesJson}
   - Action buttons: <button type="button" onClick={() => setShowContact(true)} ...>See the opportunity ↗</button> (NEVER use <a href="#..."> without e.preventDefault()).

6. Directing Tools & Skills (STRICT ANTI-AI-TROPE RULES):
   - 3 clean cards for each skill group:
   ${skillsJson}
   - ICON DIVERSITY: Use DIFFERENT icons for each category from lucide-react! E.g. TrendingUp for Growth, BarChart3 for Analytics, Compass for Research. NEVER repeat the same icon!
   - NO REPETITIVE NUMBERS: Do NOT output 0{index + 1} on every item inside a category! Use subtle dot bullets (<span className="size-1.5 rounded-full bg-[${primaryColor}]" />) or clean unique item tags.

7. Highlight Banner & Recruiter Modals:
   - Banner: "Let's make the next journey count." with <button type="button" onClick={() => setShowContact(true)}>Schedule interview ↗</button>
   - Priority Contact Modal (when showContact is true):
     * Direct mailto:, tel:, and LinkedIn links.
   - Application Manifest Modal (when showDetails is true).

CRITICAL CODE QUALITY REQUIREMENTS:
- Output a single, complete, production-ready React client component ('use client').
- Import icons exclusively from 'lucide-react'.
- Every interactive trigger MUST be a <button type="button" onClick={...}> with functional state management.
- NEVER use bare <a href="#..."> for in-page actions.`
}

export async function POST(req: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    const { blueprint, designSystem = 'Bento Grid Portfolio' }: { blueprint: StrategicBlueprint; designSystem?: string } = await req.json()

    if (!blueprint || !blueprint.candidateName) {
      return NextResponse.json({ success: false, error: 'A valid StrategicBlueprint is required.' }, { status: 400 })
    }

    const message = buildGenerationPrompt(blueprint, designSystem)

    console.log(`Initiating async dynamic archetype generation for "${blueprint.candidateName}" -> "${blueprint.targetCompany}" (${designSystem})`)

    const chatResponse = await v0.chats.createAsync({
      message,
    })

    const chatId = chatResponse.data?.chatId || (chatResponse.data as any)?.chat?.id || (chatResponse.data as any)?.id

    if (chatResponse.error || !chatId) {
      console.error('Portfolio generation failed:', chatResponse.error)
      return NextResponse.json(
        {
          success: false,
          error: chatResponse.error?.message || 'Failed to initiate portfolio generation.',
        },
        { status: 502 }
      )
    }

    console.log(`Successfully created async portfolio chat: ${chatId}`)

    return NextResponse.json({
      success: true,
      chatId,
      previewUrl: `/api/preview/${chatId}`,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown generation error'
    console.error('api/generate error:', err)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}