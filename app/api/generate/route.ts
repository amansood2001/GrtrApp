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
  const directionsSummary = blueprint.directions.map((d, i) => `
Angle ${i + 1}: ${d.angle}
- Observed Challenge: ${d.observedChallenge}
- Proposed Strategy: ${d.proposedStrategy}
- Right to Win Proof: ${d.rightToWinProof}
`).join('\n')

  const caseStudiesSummary = blueprint.caseStudies.map((c, i) => `
Project ${i + 1}: ${c.title}
- Impact: ${c.detail}
- Headline Metric: ${c.metric} (${c.metricLabel})
`).join('\n')

  const templateSpec = TEMPLATE_SPECS[designSystem]
  const templateDirective = templateSpec
    ? `BASE CANONICAL TEMPLATE ARCHITECTURE (BUILD DIRECTLY ON TOP OF THIS TEMPLATE):
- Base Canonical v0 Template URL: ${templateSpec.v0Url}
- Base Canonical v0 Template ID: ${templateSpec.id}
- Architecture & Section Blueprint: ${templateSpec.layoutDirective}
- Styling & Aesthetic Guide: ${templateSpec.styleGuide}
- Build Rule: Fork and build directly on top of this exact v0.app template (${templateSpec.v0Url}). Preserve the layout architecture, typography hierarchy, visual rhythm, and component patterns of this template while populating all sections with ${blueprint.candidateName}'s verified executive narrative, teardown angles, and case metrics below.`
    : `DESIGN DIRECTION (${designSystem || 'Modern Executive'}):
- Design Foundation: ${designSystem || blueprint.fitStats?.designFoundation || 'Modern Executive'}
- Style: Obsidian dark mode (#08090a), ultra-refined typography, razor-thin subtle glowing borders, Swiss-grid precision, and fluid motion.
- Palette: Deep charcoal & obsidian background (#08090a, #0e1013), pure white typography (#f8fafc), subtle muted silver text (#94a3b8), brand accent highlights (emerald #34d399, violet #8b5cf6), and frosted glassmorphic surface cards.
- Motion: Use Framer Motion for smooth scroll reveals, active state toggles, and hover states.`

  return `Build a world-class, executive role-tailored portfolio website for ${blueprint.candidateName}, applying for the position of ${blueprint.targetRole} at ${blueprint.targetCompany}.

${templateDirective}

CRITICAL FRONTEND & STYLING SPECIFICATIONS (MANDATORY):
1. Modern Styling & Framework:
   - Use clean, modern Tailwind CSS utility classes on EVERY component and element.
   - Deep obsidian background: bg-[#08090a] min-h-screen text-[#f4f4f5].
   - All surface cards must have visible container borders and glassmorphism:
     className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:border-white/20 transition-all"

2. Navigation Bar (Strict Flexbox & Spacing):
   - Fixed or sticky top bar: <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 bg-zinc-950/80 backdrop-blur-md border-b border-white/10">
   - Candidate brand mark: <span className="font-bold text-lg text-white tracking-tight">${blueprint.candidateName}.</span>
   - Nav links: MUST be inside a flex container with explicit gap: <div className="flex items-center gap-8">.
   - Each link MUST have NO browser default underlines: <a className="text-sm font-medium text-zinc-300 hover:text-white no-underline transition-colors cursor-pointer">
   - NEVER output bare unstyled <a> tags that touch each other or have blue browser underlines!
   - Right CTA: <button className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-600/20 cursor-pointer">Schedule Strategic Dialogue</button>

3. Clean Typography & Word Spacing:
   - NEVER concatenate words or numbers! All tickers, marquee badges, and milestone lists MUST have clear spaces and separators.
   - Ticker marquee must have wide spacing: "STRATEGY  ·  SIGNALS  ·  SYSTEMS  ·  SCALE  ·  POINT OF VIEW". NEVER emit concatenated strings like "READBUILDCOMPOUND".
   - For numbered steps or milestones (01, 02, 03), separate the number from the text cleanly:
     <div className="flex items-start gap-4 mb-4"><span className="font-mono text-purple-400 font-bold text-sm">01</span><span className="text-zinc-300 text-sm">Read the signal: Market curiosity over assumption.</span></div>

4. Hero Section:
   - Availability pill: <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs mb-4">
       <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
       Targeting ${blueprint.targetRole} · ${blueprint.targetCompany}
     </div>
   - Executive Positioning Hook: "${blueprint.positioningHook}" in text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight.
   - Subtitle: text-base text-zinc-400 max-w-2xl mb-8 leading-relaxed.
   - Dual CTAs: "Explore Strategic Teardown" and "Download Executive Dossier".

5. Strategic Teardown Section ("Why ${blueprint.candidateName} for ${blueprint.targetCompany}"):
   - Header: "The Opportunity at ${blueprint.targetCompany}"
   - Subtitle: "A targeted point-of-view on category leadership and execution leverage."
   - 3 interactive angle cards arranged in a responsive grid (grid grid-cols-1 md:grid-cols-3 gap-6):
${directionsSummary}
   - Each card must display:
     - Badge: "Angle 01", "Angle 02", "Angle 03" in font-mono text-xs text-purple-400
     - Observed Challenge (bold title + detailed observation in text-zinc-300)
     - Proposed Strategy (concrete roadmap in text-zinc-400)
     - Right to Win Proof Point (highlighted in an emerald border pill: bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-xs)

6. Verified Case Studies & Proven Track Record:
   - Header: "Quantified Evidence & Systems Built"
   - Subtitle: "Commercial outcomes codified into repeatable operating systems."
   - Responsive grid of 3 case cards (grid grid-cols-1 md:grid-cols-3 gap-6):
${caseStudiesSummary}
   - Highlight the headline metrics prominently in large monospace numbers:
     <span className="text-3xl md:text-4xl font-bold font-mono text-emerald-400">{metric}</span>
     <span className="text-xs uppercase tracking-wider font-mono text-zinc-400">{metricLabel}</span>

7. Career Signal & Philosophy:
   - Headline: "${blueprint.motionNarrative?.headline || 'Signal → System → Scale'}"
   - Narrative: "${blueprint.motionNarrative?.detail || 'Architecting compounding advantages through rapid iteration.'}"
   - 3 distinct operating principles with clear numbered badges (01, 02, 03) and generous padding.

8. Recruiter Dialogue / Contact Footer:
   - Executive CTA box: "Let's discuss how this strategy applies to ${blueprint.targetCompany}'s upcoming quarters."
   - Direct contact buttons: Email, LinkedIn, and Calendar booking.

Make the page feel like an elite, $50,000 custom-engineered executive presence that instantly commands respect from founders, board members, and executive recruiters.`
}

export async function POST(req: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    const { blueprint, designSystem = 'Modern Developer Portfolio' }: { blueprint: StrategicBlueprint; designSystem?: string } = await req.json()

    if (!blueprint || !blueprint.candidateName) {
      return NextResponse.json({ success: false, error: 'A valid StrategicBlueprint is required.' }, { status: 400 })
    }

    const message = buildGenerationPrompt(blueprint, designSystem)

    console.log(`Initiating async generation for candidate "${blueprint.candidateName}" -> "${blueprint.targetCompany}"`)

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
