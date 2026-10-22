import { NextRequest, NextResponse } from 'next/server'
import { v0 } from 'v0'
import type { GenerateResponse, StrategicBlueprint } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 120

export const TEMPLATE_SPECS: Record<string, { id: string; name: string; layoutDirective: string; styleGuide: string }> = {
  'Modern Developer Portfolio': {
    id: 'evBwFXFJcM9',
    name: 'Modern Developer Portfolio',
    layoutDirective: 'Build directly upon the Modern Developer Portfolio template architecture (evBwFXFJcM9). Implement sleek obsidian dark glassmorphism, fluid interactive project cards, smooth spring physics, ambient radial glows, and tech stack badges.',
    styleGuide: 'Deep obsidian backdrop (#08090a), subtle violet/indigo ambient aura (#8b5cf6), frosted glass cards with 1px border highlights, monospace metrics, and smooth Framer Motion reveals.',
  },
  'Executive Impact Showcase': {
    id: 'E3xFlIXCZi4',
    name: 'Executive Impact Showcase',
    layoutDirective: 'Build directly upon the Portfolio Website Design template architecture (E3xFlIXCZi4). Implement bold executive headline positioning, prominent quantified ROI metric callouts, interactive 3-direction teardown tabs, and recruiter conversion CTAs.',
    styleGuide: 'High-impact executive presence, commanding typography, high-contrast metric badges, dark mode with crisp emerald/indigo accents.',
  },
  'Bento Grid Portfolio': {
    id: 'mA8N4h1POSv',
    name: 'Bento Grid Portfolio',
    layoutDirective: 'Build directly upon the Bento Portfolio Template architecture (mA8N4h1POSv). Implement an asymmetric bento grid layout with dynamic metric counters, modular timeline milestones, interactive expandable project cards, and sticky navigation.',
    styleGuide: 'Bento-box modular layout, charcoal surfaces with rounded-2xl radii, soft inner borders, prominent stat chips, and high information density.',
  },
  'Retro Screen Developer Showcase': {
    id: 'JgcWH8Dw9d3',
    name: 'Retro Screen Developer Showcase',
    layoutDirective: 'Build directly upon the Retro Hardware Showcase architecture (JgcWH8Dw9d3). Implement a vintage CRT monitor aesthetic, analog scanline filters, stark monospace displays, and tactile interactive modules.',
    styleGuide: 'Vintage CRT display, analog scanline textures, green/amber phosphor monochrome accents, monospace metrics, and tactile toggle buttons.',
  },
  'Avant-Garde Creative Portfolio': {
    id: 'dmRJapDTzFk',
    name: 'Avant-Garde Creative Portfolio',
    layoutDirective: 'Build directly upon the Avant-Garde Designer Showcase template architecture (dmRJapDTzFk). Implement asymmetric editorial grids, oversized display typography, editorial case study narratives, and artful image/metric placements.',
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
- Canonical Template: "${templateSpec.name}" (Reference ID: ${templateSpec.id})
- Architecture & Section Blueprint: ${templateSpec.layoutDirective}
- Styling & Aesthetic Guide: ${templateSpec.styleGuide}
- Construction Rule: Build directly on top of this template structure. Preserve the layout structure, typography hierarchy, visual rhythm, and component patterns of this template while populating all sections with ${blueprint.candidateName}'s verified executive narrative, teardown angles, and case metrics below.`
    : `DESIGN DIRECTION:
- Design Foundation: ${designSystem || blueprint.fitStats?.designFoundation || 'Modern Executive'}
- Style: Obsidian dark mode, ultra-refined typography, razor-thin subtle glowing borders, Swiss-grid precision, and fluid motion.
- Palette: Deep charcoal & obsidian background (#0a0a0c, #111215), pure white typography (#f8fafc), subtle muted silver text (#94a3b8), brand accent highlights, and subtle glassmorphic surface cards.
- Motion: Use Framer Motion for smooth scroll reveals, active state toggles, and hover states.`

  return `Build a world-class, executive role-tailored portfolio website for ${blueprint.candidateName}, applying for the position of ${blueprint.targetRole} at ${blueprint.targetCompany}.

${templateDirective}

CONTENT & SECTIONS TO INCLUDE:
1. Navigation Bar:
   - Candidate brand mark: "${blueprint.candidateName}."
   - Nav links: "Strategic Teardown", "Proven Impact", "Trajectory", "Contact"
   - Right badge: "Targeting ${blueprint.targetCompany}" + "Schedule Strategic Dialogue" CTA

2. Hero Section:
   - Availability pill: "Available for ${blueprint.targetRole} · ${blueprint.targetCompany}"
   - Executive Positioning Hook: "${blueprint.positioningHook}"
   - Subtitle emphasizing systems-thinking, quantified execution, and high-velocity strategy.
   - Dual CTAs: "Explore Strategic Teardown" and "Download Executive Dossier".

3. Interactive Strategic Teardown Section ("Why ${blueprint.candidateName} for ${blueprint.targetCompany}"):
   - Header: "The Opportunity at ${blueprint.targetCompany}"
   - Subtitle: "A targeted point-of-view on category leadership and execution leverage."
   - Interactive 3-direction pill selector or cards:
${directionsSummary}
   - For each direction, visually display the "Observed Challenge", "Proposed Strategy", and highlight the candidate's "Right to Win" proof point with distinctive accent styling.

4. Verified Case Studies & Proven Track Record:
   - Header: "Quantified Evidence & Systems Built"
   - 3 structured case cards featuring:
${caseStudiesSummary}
   - Highlight the headline metrics prominently in large monospace or editorial numbers.

5. Career Signal & Philosophy:
   - Headline: "${blueprint.motionNarrative?.headline || 'Signal → System → Scale'}"
   - Narrative: "${blueprint.motionNarrative?.detail || 'Architecting compounding advantages through rapid iteration.'}"
   - Core operating principles and leadership philosophy.

6. Recruiter Dialogue / Contact Footer:
   - Executive CTA: "Let's discuss how this strategy applies to ${blueprint.targetCompany}'s upcoming quarters."
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

    console.log(`Initiating generation for candidate "${blueprint.candidateName}" -> "${blueprint.targetCompany}"`)

    const chatResponse = await v0.chats.create({
      message,
    })

    if (chatResponse.error || !chatResponse.data?.chat?.id) {
      console.error('Portfolio generation failed:', chatResponse.error)
      return NextResponse.json(
        {
          success: false,
          error: chatResponse.error?.message || 'Failed to initiate portfolio generation.',
        },
        { status: 502 }
      )
    }

    const chatId = chatResponse.data.chat.id
    console.log(`Successfully created portfolio chat: ${chatId}`)

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
