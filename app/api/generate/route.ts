import { NextRequest, NextResponse } from 'next/server'
import { v0 } from 'v0'
import type { GenerateResponse, StrategicBlueprint } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 120

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

  return `Build a world-class, executive role-tailored portfolio website for ${blueprint.candidateName}, applying for the position of ${blueprint.targetRole} at ${blueprint.targetCompany}.

DESIGN DIRECTION:
- Design Foundation: ${designSystem || blueprint.fitStats?.designFoundation || 'IBM Carbon'}
- Style: Obsidian dark mode, ultra-refined typography, razor-thin subtle glowing borders, Swiss-grid precision, and fluid motion.
- Palette: Deep charcoal & obsidian background (#0a0a0c, #111215), pure white typography (#f8fafc), subtle muted silver text (#94a3b8), brand accent highlights, and subtle glassmorphic surface cards.
- Motion: Use Framer Motion for smooth scroll reveals, active state toggles, and hover states.

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
    const { blueprint, designSystem = 'Carbon' }: { blueprint: StrategicBlueprint; designSystem?: string } = await req.json()

    if (!blueprint || !blueprint.candidateName) {
      return NextResponse.json({ success: false, error: 'A valid StrategicBlueprint is required.' }, { status: 400 })
    }

    const message = buildGenerationPrompt(blueprint, designSystem)

    console.log(`Initiating v0 generation for candidate "${blueprint.candidateName}" -> "${blueprint.targetCompany}"`)

    const chatResponse = await v0.chats.create({
      message,
    })

    if (chatResponse.error || !chatResponse.data?.chat?.id) {
      console.error('v0.chats.create failed:', chatResponse.error)
      return NextResponse.json(
        {
          success: false,
          error: chatResponse.error?.message || 'Failed to initiate portfolio generation on v0.',
        },
        { status: 502 }
      )
    }

    const chatId = chatResponse.data.chat.id
    console.log(`Successfully created v0 chat: ${chatId}`)

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
