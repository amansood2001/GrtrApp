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

Your goal is to write the complete build prompt that will be sent into the v0 chat interface to create an extraordinary, bespoke executive career portfolio for a candidate.

INPUTS YOU RECEIVE:
1. Target Role & Company Context
2. Authentic Candidate CV & Career History
3. Aesthetic Directive & Design System (e.g., Microsoft Fluent, Warm Editorial Serif, Minimal High-Contrast, Bento Grid, Swiss Modernism, etc.)
4. 3 Highlighted Proof Cases (spotlighted case studies crafted specifically for this role)
5. Strategic Angle & Right-to-Win Play (the observed company problem, proposed operator solution, and candidate right-to-win)

GUIDELINES FOR WRITING THE v0 PROMPT:
- Write in plain English as an inspiring, authoritative Creative Director giving a detailed brief to v0.
- Set the visual tone, typographic hierarchy, color palette, and layout philosophy dictated by the candidate's chosen Aesthetic Directive and persona.
- DO NOT force a rigid wireframe (no cookie-cutter templates or arbitrary sliders unless requested). Let v0 architect the layout to match the design system.
- Direct v0 to implement stateful React client interactions using useState (e.g., active tabs, expandable proof cards, contact modal).
- Enforce the candidate's authentic email for the contact modal (never hallucinate fake company emails).
- CRITICAL FORMAT: Output ONLY the written build prompt in plain text/markdown for v0. DO NOT output React code, JSX, or code blocks. You are the Creative Director writing the prompt, v0 is the engineer who writes the code.`

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
      { role: 'user', content: `Generate the complete v0 build prompt for this candidate:\n${JSON.stringify(userContext, null, 2)}` }
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
    const message = await synthesizeV0Prompt(blueprint, designSystem, selectedDirectionIndex)
    console.log(`[Creative Director] Prompt synthesized in ${((Date.now() - startTime) / 1000).toFixed(2)}s`)

    console.log(`Initiating v0 generation for "${blueprint.candidateName}" -> "${blueprint.targetCompany}" (${designSystem})`)

    let chatResponse: any
    try {
      chatResponse = await v0.chats.createAsync({
        message,
      })
    } catch (asyncErr) {
      console.warn('createAsync failed, attempting synchronous fallback:', asyncErr)
      chatResponse = await v0.chats.create({
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
