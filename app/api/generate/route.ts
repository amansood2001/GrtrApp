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

// Master First-Person Prompt Synthesizer powered by OpenAI
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
  const cleanEmail = `${blueprint.candidateName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`

  const systemPrompt = `You are ${blueprint.candidateName} writing directly into the v0 chat interface to have it build your executive career portfolio.

CRITICAL VOICE & PERSONA INSTRUCTIONS:
- Write strictly in the FIRST PERSON ("I", "me", "my") directly addressing v0 as "you".
- Opening line must be natural and direct, exactly like an executive talking to an elite designer:
  "Build an extraordinary, bespoke executive career portfolio for me. My name is ${blueprint.candidateName}, and I'm positioning myself for the ${blueprint.targetRole} role at ${blueprint.targetCompany}..."
- NEVER use mechanical labels like "Creative Director Brief for...", "v0 frontend engineer", "Candidate Profile:", or "MANDATORY SPECIFICATION".
- Talk to v0 with authority, taste, and clarity.
- HIGH-AGENCY & VISUAL DIRECTION (DO NOT OVER-SPECIFY):
  * Avoid walls of text. Make this visually driven and interactive with interesting elements.
  * DO NOT micromanage or hardcode minute component details, exact pixel dimensions, or rigid borders. Give v0 room to exercise its frontend and design reasoning intelligence.
  * Clearly set the overarching aesthetic mood, spatial atmosphere, and design language (${designSystem}).
- DOMAIN-TAILORED DELIGHT (MANDATORY REQUIREMENT):
  * You MUST include an explicit section for domain-tailored delight with the following directive:
    "Domain-tailored delight: Bring in subtle, playful touches and micro-interactions that make this feel unmistakably built for the ${blueprint.targetRole} role at ${blueprint.targetCompany} (e.g. travel/flight motifs, ambient cursors, or interactive routes)."
- NEVER dump raw JSON, curly braces, or bracketed syntax. Describe skills and experience in articulate, natural executive English.
- DEDICATED MOTION DESIGN & MICRO-INTERACTIONS:
  * Hero and all above-the-fold content must be IMMEDIATELY visible on initial page load (never hide hero elements behind opacity:0 or failing scroll observers).
  * Use elegant Tailwind CSS hover states and micro-interactions (e.g. subtle card lifts hover:-translate-y-1, tactile button presses, snappy role tab switches, and animated proof accordions).
  * Keep motion restrained, snappy, and executive—feeling like a high-end application (e.g. Linear, Stripe, or Vercel).
- STYLING & COMPONENT ARCHITECTURE: Instruct v0 to implement the complete Next.js React client component ('use client') using Tailwind CSS classes for all styling and high-contrast typography, ensuring full interactivity (useState for tabs, modals, accordions) and immediate visibility on page load.
- ABSOLUTE DATA INTEGRITY: You MUST preserve all exact numbers and metrics from my background (e.g. ${blueprint.stats?.map(s => s.value).join(', ') || '$1M+, +40%, 500+'}), authentic companies (${blueprint.roles?.map(r => r.company).join(', ') || 'SeekLab Inc, Ionic Wealth by AngelOne'}), verified email (${cleanEmail}), and spotlighted proof cases.

STRUCTURE OF YOUR PROMPT:
1. First-Person Opening & Executive Positioning Thesis
2. My Strategic Operator Thesis for ${blueprint.targetCompany} (The Commercial Opportunity, My 3-Step Playbook, My Right-to-Win)
3. Verified Metrics & 3 Spotlighted Proof Cases (with numbers and impact, rendered visually and interactively)
4. Authentic Career Track Record & Domain Strengths (written in natural prose)
5. Aesthetic Atmosphere & Signature Interactive Concept (${designSystem})
6. Domain-Tailored Delight: Subtle, playful touches tailored for the ${blueprint.targetRole} role at ${blueprint.targetCompany}
7. Motion Design, Physics & Micro-Interactions (with immediate first-paint visibility)
8. Direct Contact Modal (mailto:${cleanEmail})`

  const userContext = {
    targetCompany: blueprint.targetCompany,
    targetRole: blueprint.targetRole,
    candidateName: blueprint.candidateName,
    positioningHook: blueprint.positioningHook,
    positioningSubtitle: blueprint.positioningSubtitle,
    aestheticDirective: designSystem,
    strategicProblemAndRightToWin: activeDirection,
    highlightedProofCases: blueprint.caseStudies,
    careerHistory: blueprint.roles,
    headlineStats: blueprint.stats,
    skills: blueprint.skills,
    cleanEmail,
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Generate the first-person v0 build prompt based on my authentic background:\n${JSON.stringify(userContext, null, 2)}` }
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

    // Default Flow: Master First-Person Synthesizer (OpenAI) writes the bespoke prompt for v0
    console.log(`[Prompt Synthesizer] Crafting bespoke first-person build prompt for "${blueprint.candidateName}" -> "${blueprint.targetCompany}"...`)
    const startTime = Date.now()
    const message = await synthesizeV0Prompt(blueprint, designSystem, selectedDirectionIndex)
    console.log(`[Prompt Synthesizer] Prompt crafted in ${((Date.now() - startTime) / 1000).toFixed(2)}s (length: ${message.length} chars)`)

    console.log(`Initiating v0 generation for "${blueprint.candidateName}" -> "${blueprint.targetCompany}" (${designSystem})`)

    let chatResponse: any
    try {
      chatResponse = await v0.chats.createAsync({
        message,
      })
    } catch (asyncErr) {
      console.warn('v0.chats.createAsync failed, attempting synchronous fallback:', asyncErr)
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
