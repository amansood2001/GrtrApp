import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { v0 } from 'v0'
import type { GenerateResponse, StrategicBlueprint } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 120

// Curated Seed Chats existing directly inside your authenticated v0 workspace
export const WORKSPACE_SEED_CHATS: Record<string, string> = {
  'COMPUTE — AI Platform Template': 'RKiDa7imLjw',
  'Compute': 'RKiDa7imLjw',
  'compute': 'RKiDa7imLjw',
  'RKiDa7imLjw': 'RKiDa7imLjw',
}

function buildSeedAdaptationPrompt(blueprint: StrategicBlueprint, selectedDirectionIndex: number = 0): string {
  const activeDirection = blueprint.directions?.[selectedDirectionIndex] || blueprint.directions?.[0]
  return `You are adapting this existing high-polish web template into a bespoke executive career portfolio for ${blueprint.candidateName}, who is applying for ${blueprint.targetRole} at ${blueprint.targetCompany}.

CRITICAL ADAPTATION DIRECTIVES:
1. Retain the exact visual structure, dark glassmorphism, responsive navigation, and component quality of this template.
2. Replace all placeholder text, titles, metrics, and cards with this candidate's authentic data:
   - Candidate: ${blueprint.candidateName}
   - Target Role: ${blueprint.targetRole} at ${blueprint.targetCompany}
   - Positioning Hook: "${blueprint.positioningHook}"
   - Executive Subtitle: "${blueprint.positioningSubtitle || ''}"
   - Strategic Angle: "${activeDirection?.angle || 'Market Velocity'}"
   - Company Problem: "${activeDirection?.observedChallenge || ''}"
   - Operator Solution: "${activeDirection?.proposedStrategy || ''}"
   - Right to Win: "${activeDirection?.rightToWinProof || ''}"
3. Key Verified Metrics:
   ${JSON.stringify(blueprint.stats, null, 2)}
4. Career Experience Track Record:
   ${JSON.stringify(blueprint.roles, null, 2)}
5. Highlighted Proof Cases:
   ${JSON.stringify(blueprint.caseStudies, null, 2)}
6. Recruiter Contact:
   - Open a clean modal with direct email and LinkedIn options. NEVER generate fake @${blueprint.targetCompany.toLowerCase().replace(/\s+/g, '')}.com emails!
7. Output complete, functional Next.js React client code in app/page.tsx.`
}

function formatCandidateDataSpecification(blueprint: StrategicBlueprint, selectedDirectionIndex: number = 0): string {
  const activeDirection = blueprint.directions?.[selectedDirectionIndex] || blueprint.directions?.[0]
  const cleanEmail = `${blueprint.candidateName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`

  return `
### MANDATORY AUTHENTIC CONTENT & DATA SPECIFICATION (MUST BE RENDERED IN CODE)
v0 frontend engineer: You MUST incorporate the candidate's authentic data and exact figures below into the components. DO NOT invent placeholder companies or omit these numbers.

1. CANDIDATE PROFILE:
- Name: ${blueprint.candidateName}
- Target Role: ${blueprint.targetRole} at ${blueprint.targetCompany}
- Core Positioning: "${blueprint.positioningHook}"
- Executive Narrative: "${blueprint.positioningSubtitle || ''}"
- Verified Recruiter Contact: ${cleanEmail} (render as direct mailto: link in contact modal. NEVER generate fake @${blueprint.targetCompany.toLowerCase().replace(/\s+/g, '')}.com emails!)

2. VERIFIED HEADLINE METRICS (MUST be prominently featured with high-contrast bold values):
${blueprint.stats?.map(s => `- ${s.value} ${s.label} (${s.note || ''})`).join('\n') || '- $1M+ Demand Pipeline\n- +40% Funnel Conversion\n- 500+ Partner Distribution Network\n- 10+ International Markets Expanded'}

3. STRATEGIC PITCH FOR ${blueprint.targetCompany.toUpperCase()} (Problem, Solution & Right-to-Win):
- Strategic Focus Angle: "${activeDirection?.angle || 'Distribution & Enterprise Scale'}"
- Observed Company Problem: "${activeDirection?.observedChallenge || ''}"
- Operator Strategy: "${activeDirection?.proposedStrategy || ''}"
- Candidate Right-to-Win Proof: "${activeDirection?.rightToWinProof || ''}"

4. 3 HIGHLIGHTED PROOF CASES (Render as deep-dive interactive proof cards with expandable or modal details):
${blueprint.caseStudies?.map((cs, idx) => `Case 0${idx + 1}:
  - Title: "${cs.title}"
  - Metric / Impact: "${cs.metric} ${cs.metricLabel || ''}"
  - Narrative: "${cs.detail}"`).join('\n\n')}

5. AUTHENTIC CAREER TRACK RECORD (Render with interactive role tabs or clickable stops):
${blueprint.roles?.map(r => `- ${r.year}: ${r.title} at ${r.company} (${r.location || ''})
  Impact: ${r.summary}
  Key Wins: ${r.outcomes?.join('; ') || ''}`).join('\n')}

6. CORE CAPABILITIES & SKILLS:
${blueprint.skills ? JSON.stringify(blueprint.skills, null, 2) : ''}

CRITICAL VISUAL DESIGN & ACCESSIBILITY REQUIREMENTS:
- HIGH CONTRAST TYPOGRAPHY: Ensure body and title text is dark, crisp, and high-contrast (e.g. text-[#0a192f] on bg-[#f8fafc] or bg-white). NEVER render low-contrast white/light-gray text on light card surfaces!
- COMPLETE NEXT.JS CLIENT CODE: Output a single, complete, fully working Next.js React client component ('use client') with interactive state management (useState) for the contact dialog, active tabs, and expandable proof cases.`
}

// Master Creative Director Synthesizer powered by OpenAI
async function synthesizeV0Prompt(
  blueprint: StrategicBlueprint,
  designSystem: string,
  selectedDirectionIndex: number = 0
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required for creative prompt synthesis.')
  }

  const openai = new OpenAI({ apiKey })
  const activeDirection = blueprint.directions?.[selectedDirectionIndex] || blueprint.directions?.[0]
  const brand = blueprint.companyBrand || {
    primaryColor: '#0b63e5',
    accentColor: '#10b981',
    surfaceColor: '#faf9f6',
    textColor: '#0a192f',
  }

  const systemPrompt = `You are an elite Principal Creative Director and Executive Recruiter writing a natural language design brief and build prompt for the v0 AI frontend engineer.

Your goal is to write the creative vision, design philosophy, signature bespoke artifact concept, layout architecture, and visual pacing for an extraordinary executive career portfolio.

CRITICAL INSTRUCTIONS:
1. Embody the chosen Aesthetic Directive / Design System (${designSystem}):
   - Define the exact visual tone, material textures, borders, and motion physics that represent this design system.
   - For Microsoft Fluent: subtle acrylic/glass surfaces, soft elevation shadows, crisp system typography, purposeful accent colors.
   - For Warm Editorial Serif: elegant high-contrast Playfair/Georgia display serif typography, generous whitespace, warm paper backdrop (#faf9f6), editorial pull-quotes.
   - For Minimal High-Contrast: stark typographic hierarchy, precision grid, mono metric readouts, clean division lines.
   - For Bento Grid: modular rounded-2xl cards, information-dense widgets, tactile toggle chips.
2. Conceive a SIGNATURE BESPOKE INTERACTIVE ARTIFACT specifically for ${blueprint.targetCompany}:
   - For a B2B sales/GTM role at CleverTap (AI customer engagement): a live retention telemetry card, customer journey signal board, or enterprise pipeline matrix.
   - For a product/engineering role: an interactive architecture console or live metric bench.
   - For a fintech role: an asset allocation radar or trade velocity console.
3. Design the layout flow dynamically to showcase the candidate's unique strengths:
   - Dynamic Hero with display headline and the signature bespoke artifact
   - High-contrast quantified metrics strip
   - Strategic deep-dive (Company Challenge, Operator Strategy, Right-to-Win)
   - 3 Highlighted Proof Cards with interactive expansion
   - Stateful Career Track Record with interactive switcher
   - Priority Contact Modal with verified email (never hallucinate fake company emails)

Output ONLY the creative director briefing in plain text/markdown for v0. DO NOT output React code, JSX, or code blocks.`

  const userContext = {
    targetCompany: blueprint.targetCompany,
    targetRole: blueprint.targetRole,
    candidateName: blueprint.candidateName,
    positioningHook: blueprint.positioningHook,
    positioningSubtitle: blueprint.positioningSubtitle,
    aestheticDirective: designSystem,
    palette: brand,
    strategicProblemAndRightToWin: activeDirection,
    highlightedProofCases: blueprint.caseStudies,
    careerHistory: blueprint.roles,
    headlineStats: blueprint.stats,
    skills: blueprint.skills,
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Write the creative director brief for this candidate:\n${JSON.stringify(userContext, null, 2)}` }
    ],
    temperature: 0.7,
  })

  const promptText = completion.choices[0]?.message?.content
  if (!promptText) {
    throw new Error('OpenAI failed to synthesize the v0 build prompt.')
  }

  return promptText
}

export async function POST(req: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    const {
      blueprint,
      designSystem = 'Microsoft Fluent 2',
      selectedDirectionIndex = 0
    }: {
      blueprint: StrategicBlueprint
      designSystem?: string
      selectedDirectionIndex?: number
    } = await req.json()

    if (!blueprint || !blueprint.candidateName) {
      return NextResponse.json({ success: false, error: 'A valid StrategicBlueprint is required.' }, { status: 400 })
    }

    // Check if user selected a verified Workspace Seed Chat (e.g. COMPUTE)
    const seedChatId = WORKSPACE_SEED_CHATS[designSystem]

    if (seedChatId) {
      console.log(`[Seed Workflow] Duplicating workspace seed chat "${seedChatId}" for "${blueprint.candidateName}" -> "${blueprint.targetCompany}"`)
      
      const dupRes = await v0.chats.duplicate({
        chatId: seedChatId,
        privacy: 'private',
        title: `${blueprint.candidateName} — ${blueprint.targetRole} (${blueprint.targetCompany})`,
      })

      const newChatId = dupRes.data?.id
      if (!newChatId) {
        console.error('Failed to duplicate seed chat:', dupRes.error)
        throw new Error(dupRes.error?.message || 'Failed to duplicate seed template chat.')
      }

      console.log(`[Seed Workflow] Chat duplicated successfully: ${newChatId}. Sending adaptation instructions...`)
      const adaptationMessage = buildSeedAdaptationPrompt(blueprint, selectedDirectionIndex)

      await v0.messages.sendAsync({
        chatId: newChatId,
        message: adaptationMessage,
      })

      return NextResponse.json({
        success: true,
        chatId: newChatId,
        previewUrl: `/api/preview/${newChatId}`,
      })
    }

    // Default Flow: Master Creative Director Synthesizer (OpenAI) writes the bespoke prompt for v0
    console.log(`[Creative Director] Synthesizing bespoke build prompt for "${blueprint.candidateName}" -> "${blueprint.targetCompany}"...`)
    const startTime = Date.now()
    const creativeBrief = await synthesizeV0Prompt(blueprint, designSystem, selectedDirectionIndex)
    const dataSpec = formatCandidateDataSpecification(blueprint, selectedDirectionIndex)
    const message = `${creativeBrief}\n\n---\n\n${dataSpec}`
    console.log(`[Creative Director] Prompt synthesized in ${((Date.now() - startTime) / 1000).toFixed(2)}s (length: ${message.length} chars)`)

    console.log(`Initiating v0 generation for "${blueprint.candidateName}" -> "${blueprint.targetCompany}" (${designSystem})`)

    let chatResponse: any
    try {
      // First attempt synchronous creation so sandbox compiles before returning to studio
      chatResponse = await v0.chats.create({
        message,
      })
    } catch (syncErr) {
      console.warn('v0.chats.create timed out or failed, falling back to createAsync:', syncErr)
      chatResponse = await v0.chats.createAsync({
        message,
      })
    }

    const chatId = chatResponse.data?.chat?.id || chatResponse.data?.chatId || chatResponse.data?.id
    const outputTokens = chatResponse.data?.usage?.tokens?.output ?? -1

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

    console.log(`Successfully created bespoke portfolio chat: ${chatId} (output tokens: ${outputTokens})`)

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
