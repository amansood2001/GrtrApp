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
    layoutDirective: 'Build directly on top of the canonical v0 template at https://v0.app/templates/evBwFXFJcM9 (ID: evBwFXFJcM9). Implement sleek obsidian dark glassmorphism, fluid interactive project cards, smooth spring physics, ambient radial glows, and tech stack badges.',
    styleGuide: 'Deep obsidian backdrop (#08090a), subtle violet/indigo ambient aura (#8b5cf6), frosted glass cards with 1px border highlights, monospace metrics, and smooth Framer Motion reveals.',
  },
  'Executive Impact Showcase': {
    id: 'E3xFlIXCZi4',
    name: 'Executive Impact Showcase',
    v0Url: 'https://v0.app/templates/portfolio-website-design-E3xFlIXCZi4',
    layoutDirective: 'Build directly on top of the canonical v0 template at https://v0.app/templates/portfolio-website-design-E3xFlIXCZi4 (ID: E3xFlIXCZi4). Implement bold executive headline positioning, prominent quantified ROI metric callouts, interactive 3-direction teardown tabs, and recruiter conversion CTAs.',
    styleGuide: 'High-impact executive presence, commanding typography, high-contrast metric badges, dark mode with crisp emerald/indigo accents.',
  },
  'Bento Grid Portfolio': {
    id: 'mA8N4h1POSv',
    name: 'Bento Grid Portfolio',
    v0Url: 'https://v0.app/templates/portfolio-template-mA8N4h1POSv',
    layoutDirective: 'Build directly on top of the canonical v0 template at https://v0.app/templates/portfolio-template-mA8N4h1POSv (ID: mA8N4h1POSv). Implement an asymmetric bento grid layout with dynamic metric counters, modular timeline milestones, interactive expandable project cards, and sticky navigation.',
    styleGuide: 'Bento-box modular layout, charcoal surfaces with rounded-2xl radii, soft inner borders, prominent stat chips, and high information density.',
  },
  'Retro Screen Developer Showcase': {
    id: 'JgcWH8Dw9d3',
    name: 'Retro Screen Developer Showcase',
    v0Url: 'https://v0.app/templates/JgcWH8Dw9d3',
    layoutDirective: 'Build directly on top of the canonical v0 template at https://v0.app/templates/JgcWH8Dw9d3 (ID: JgcWH8Dw9d3). Implement a vintage CRT monitor aesthetic, analog scanline filters, stark monospace displays, and tactile interactive modules.',
    styleGuide: 'Vintage CRT display, analog scanline textures, green/amber phosphor monochrome accents, monospace metrics, and tactile toggle buttons.',
  },
  'Avant-Garde Creative Portfolio': {
    id: 'dmRJapDTzFk',
    name: 'Avant-Garde Creative Portfolio',
    v0Url: 'https://v0.app/templates/avant-garde-designer-portfolio-showcase-dmRJapDTzFk',
    layoutDirective: 'Build directly on top of the canonical v0 template at https://v0.app/templates/avant-garde-designer-portfolio-showcase-dmRJapDTzFk (ID: dmRJapDTzFk). Implement asymmetric editorial grids, oversized display typography, editorial case study narratives, and artful image/metric placements.',
    styleGuide: 'Avant-garde editorial, high fashion pacing, dark walnut and obsidian tones, large display serif headings, and generous margins.',
  },
}

function buildGenerationPrompt(blueprint: StrategicBlueprint, designSystem: string): string {
  // Brand color determination
  const isMakeMyTrip = blueprint.targetCompany.toLowerCase().includes('makemytrip')
  const isCleverTap = blueprint.targetCompany.toLowerCase().includes('clevertap')

  const primaryColor = blueprint.companyBrand?.primaryColor || (isMakeMyTrip ? '#e41d24' : isCleverTap ? '#0b63e5' : '#e41d24')
  const accentColor = blueprint.companyBrand?.accentColor || (isMakeMyTrip ? '#0a192f' : isCleverTap ? '#ff5722' : '#0a192f')
  const surfaceColor = blueprint.companyBrand?.surfaceColor || (isMakeMyTrip ? '#faf9f6' : isCleverTap ? '#0b0f19' : '#faf9f6')
  const textColor = blueprint.companyBrand?.textColor || (isMakeMyTrip ? '#0a192f' : isCleverTap ? '#f8fafc' : '#0a192f')
  const isDarkCanvas = surfaceColor.startsWith('#0') || surfaceColor.startsWith('#1')

  // Parse headline emphasis: e.g. "Growth that *moves* people." -> "Growth that <em className='font-normal text-[primaryColor]'>moves</em> people."
  let headlineDisplay = blueprint.positioningHook || 'Growth that *moves* people.'
  if (headlineDisplay.includes('*')) {
    headlineDisplay = headlineDisplay.replace(/\*([^*]+)\*/g, `<em class="font-normal text-[${primaryColor}]">$1</em>`)
  }

  // Format roles data
  const rolesJson = JSON.stringify(blueprint.roles || [
    {
      year: 'JUN 25 — JUN 26',
      company: 'SeekLab Inc',
      title: 'Founding GTM',
      location: 'Remote · 10+ countries',
      accent: 'bg-[#e41d24]',
      number: '01',
      summary: 'Built the 0→1 growth engine for a YC / a16z / Google-backed startup.',
      outcomes: ['$1M+ qualified demand pipeline', '45 early clients closed', '+40% funnel conversion', '500+ partner network'],
    },
    {
      year: 'AUG 24 — MAY 25',
      company: 'Ionic Wealth by AngelOne',
      title: 'Macro Research Analyst',
      location: 'Mumbai · UHNI & HNI',
      accent: 'bg-[#0b7189]',
      number: '02',
      summary: 'Turned complex macro signals into sharp, decision-ready client narratives.',
      outcomes: ['25+ UHNI prospects converted', '80+ market briefings delivered', '85% client retention', '70K commentary impressions'],
    },
    {
      year: 'MAY 23 — JUN 23',
      company: 'Turtlemint',
      title: 'Research Intern',
      location: 'Mumbai · Insurance markets',
      accent: 'bg-[#c99b3b]',
      number: '03',
      summary: 'Mapped whitespace across India to direct market-entry recommendations.',
      outcomes: ['500+ Indian districts mapped', '10+ demographic indicators', '4 of 7 recommendations adopted'],
    },
    {
      year: 'JUN 22 — JUL 22',
      company: 'DSP Mutual Fund',
      title: 'Research Intern',
      location: 'Mumbai · Investor education',
      accent: 'bg-[#1e293b]',
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
    'Growth & Strategy': ['GTM Strategy', 'Market Sizing', 'Funnel Optimization', 'Campaign Strategy'],
    'Acquisition & Analytics': ['Meta Ads', 'Google Analytics', 'Clay', 'Apollo', 'Smartlead'],
    'Research & Narrative': ['Bloomberg', 'Macro Research', 'Consumer Insights', 'Executive Briefings'],
  }, null, 2)

  // Format case studies
  const caseStudiesJson = JSON.stringify(blueprint.caseStudies || [
    {
      title: 'A map is only useful when it changes the route.',
      detail: `At Turtlemint, ranked opportunity across 500+ districts using 10+ demographic signals — translating a fragmented market into a prioritized growth plan. At ${blueprint.targetCompany}, I'd bring that same lens to corridor and customer expansion.`,
      metric: '500+ Districts',
      metricLabel: 'Market Sizing → Opportunity Map',
    },
    {
      title: 'Growth compounds when more people can open the door.',
      detail: `At SeekLab, built a 500+ partner network that drove 40% incremental pipeline — while taking the GTM motion across 10+ countries. The transferable play: pair compelling campaigns with a distribution system built to travel.`,
      metric: '+$1M Pipeline',
      metricLabel: 'Distribution Flywheel',
    },
  ], null, 2)

  return `You are building a bespoke, world-class executive portfolio web application for ${blueprint.candidateName}, targeted specifically for the role of ${blueprint.targetRole} at ${blueprint.targetCompany}.

GOLDEN BENCHMARK STANDARD (CRITICAL):
This page MUST achieve the same impeccable taste, editorial layout, and interactive craft as the canonical reference portfolio at https://aman-sood.vercel.app/. 

VISUAL IDENTITY & THEME:
- Canvas Background: ${surfaceColor} (${isDarkCanvas ? 'Deep Midnight / Dark' : 'Warm Off-White Editorial Paper #faf9f6'})
- Primary Brand Accent: ${primaryColor} (Matches ${blueprint.targetCompany}'s signature brand color)
- Secondary Accent: ${accentColor}
- Text Color: ${textColor}
- Typography Hierarchy:
  1. Headlines: High-contrast Editorial Serif (font-serif / 'Playfair Display', Georgia, serif) with italicized brand color accents.
  2. Body & Navigation: Crisp Modern Sans (font-sans / 'DM Sans', sans-serif).
  3. Numbers, Kicker Tags & Codes: Monospace (font-mono / 'DM Mono', monospace) with wide tracking (tracking-[0.2em] to tracking-[0.25em]).

CRITICAL FRONTEND ARCHITECTURE & COMPONENTS:

1. Clean Sticky Header:
   - Left brand mark: Initials badge inside a rounded-full pill in ${primaryColor} with white text, followed by "${blueprint.candidateName}." in bold uppercase with tracked kicker.
   - Middle navigation: Uppercase tracked links: "Itinerary", "Case studies", "Stack" with hover transitions.
   - Right CTA: Rounded-full button "Let's talk ↗" opening the Priority Contact modal.

2. Hero Section with Signature Conceptual Centerpiece:
   - Left column:
     * Section kicker: "Application / 01" with a small accent colored rule line.
     * Executive Display Headline: Render strictly in font-serif text-5xl sm:text-7xl lg:text-[6.6rem] leading-[0.96] tracking-[-0.045em]:
       ${blueprint.positioningHook} (Ensure the focal word is rendered as <em className="font-normal text-[${primaryColor}]">...</em>).
     * Subtitle: "${blueprint.positioningSubtitle || 'A market-minded operator translating insight into demand, and demand into memorable commercial momentum.'}" in text-lg leading-relaxed text-[${textColor}]/65.
     * Action Buttons: Primary pill "Schedule an interview ↗" (bg-[${primaryColor}]) + secondary border pill "View LinkedIn ↗".
   - Right column (SIGNATURE BESPOKE ARTIFACT):
     * Construct an interactive domain artifact (e.g. an authentic Boarding Pass / Ticket for travel/hospitality, or an interactive Retention/GTM Funnel Terminal for SaaS):
       - Tilted ribbon badge at top right: "Boarding now" or "System Active" in bg-[${primaryColor}] text-white text-[9px] font-bold uppercase tracking-[0.14em].
       - Realistic perforation effect on the ticket card:
         style={{ backgroundImage: 'radial-gradient(circle at 0 0, ${surfaceColor} 0 7px, transparent 7.5px), radial-gradient(circle at 100% 0, ${surfaceColor} 0 7px, transparent 7.5px)', backgroundPosition: '-1px -7px, calc(100% + 1px) -7px', backgroundRepeat: 'no-repeat' }}
       - Decorative barcode at bottom:
         style={{ width: '112px', height: '36px', opacity: 0.75, background: 'repeating-linear-gradient(90deg, #fff 0 2px, transparent 2px 4px, #fff 4px 5px, transparent 5px 8px, #fff 8px 11px, transparent 11px 13px)' }}
       - Flight/Code designation: e.g. "${blueprint.targetCompany.toUpperCase().slice(0, 3)}-2026" in font-mono.
       - Origin -> Destination routing:
         Origin: "MU + NMIMS (Mumbai · Economics)" -> Destination: "${blueprint.targetCompany} (${blueprint.targetRole})"
       - Passenger seat status: "Confirmed Candidate · ${blueprint.matchScore || 99}% role match" in font-bold text-[#f1ca70].

3. Quantified Metrics Bar (Border-Separated Strip):
   - 4 prominent stats displayed in a grid (sm:grid-cols-4) with border-y:
   ${statsJson}
   - Large font-serif text-3xl sm:text-4xl numbers, accompanied by bold uppercase tracked labels and context notes.

4. Interactive Career Itinerary Section:
   - Left column:
     * Section kicker: "01 / The career itinerary"
     * Heading: "Every stop adds a <em className='font-normal text-[${primaryColor}]'>new lens.</em>" in font-serif text-5xl sm:text-6xl.
     * Narrative summary & time tracker ("4 stops · 2022 — present").
   - Right column (Interactive State Selector):
     * Manage active role state: const [activeRole, setActiveRole] = useState(0)
     * 4 clickable stop buttons mapping through the career roles:
   ${rolesJson}
     * Clicking a stop sets activeRole.
     * Dynamic "Selected impact" card below the tabs that immediately updates to display:
       - Role Title & Company
       - 1-sentence punchy summary
       - 2-column checklist of outcomes with Check icons (lucide-react) in text-[${primaryColor}].

5. Editorial Magazine Case Studies:
   - Section kicker: "02 / Market expansion & growth"
   - Heading: "I find the <em className='font-normal text-[${primaryColor}]'>signal</em> in the scale."
   - 2 large editorial feature cards (min-h-[460px] rounded-3xl p-8 hover:-translate-y-1 transition-transform):
   ${caseStudiesJson}
     * Card 1: Midnight navy (#0a192f) with gold (#f1ca70) badges, large font-mono "01" number, provocative headline, narrative, and "See the opportunity ↗" link.
     * Card 2: Warm beige (#f0eee8) with brand accent (#e41d24) badges, large font-mono "02" number, provocative headline, narrative, and "Build the flywheel ↗" link.

6. Directing Tools & Skills Section:
   - Section kicker: "03 / Directing tools"
   - Heading: "The stack behind the <em className='font-normal text-[${primaryColor}]'>story.</em>"
   - 3 clean rounded-2xl cards for each category:
   ${skillsJson}

7. Closing Highlight Banner & Footer:
   - Full-bleed rounded-[2rem] banner in bg-[${primaryColor}] text-white px-6 py-14 sm:px-12 lg:px-20 relative overflow-hidden:
     * Headline: "Let's make the next <em className='font-normal text-[#f1ca70]'>journey</em> count." in font-serif text-5xl sm:text-7xl.
     * "Schedule interview ↗" button opening the contact modal.
   - Footer links: "© 2026 ${blueprint.candidateName}", location info, and "View application details →" button opening details modal.

8. Recruiter Modals (Stateful Interactive Overlays):
   - Priority Contact Modal (showContact state):
     * Clickable email: mailto link with Mail icon.
     * Clickable phone: tel link with Phone icon.
     * LinkedIn profile link with Link icon.
   - Application Manifest Modal (showDetails state):
     * Role details, focus, base location, confirmed candidate status.

CRITICAL CODE REQUIREMENTS:
- Output a single, complete, production-ready React client component ('use client').
- Import icons exclusively from 'lucide-react'.
- NEVER concatenate text strings without proper whitespace (e.g. no "READBUILDCOMPOUND").
- Ensure all interactive state works smoothly out of the box.`
}

export async function POST(req: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    const { blueprint, designSystem = 'Modern Developer Portfolio' }: { blueprint: StrategicBlueprint; designSystem?: string } = await req.json()

    if (!blueprint || !blueprint.candidateName) {
      return NextResponse.json({ success: false, error: 'A valid StrategicBlueprint is required.' }, { status: 400 })
    }

    const message = buildGenerationPrompt(blueprint, designSystem)

    console.log(`Initiating async high-taste portfolio generation for "${blueprint.candidateName}" -> "${blueprint.targetCompany}"`)

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