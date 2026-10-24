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
  selectedDirectionIndex: number = 0,
  resumeText: string = '',
  jobDescription: string = ''
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required for creative prompt synthesis.')
  }

  const openai = new OpenAI({ apiKey })
  const activeDirection = blueprint.directions?.[selectedDirectionIndex] || blueprint.directions?.[0]

  const systemPrompt = `You are ${blueprint.candidateName} writing directly into the v0 chat interface to have it build your executive career portfolio.

CRITICAL VOICE & PERSONA INSTRUCTIONS:
- Write strictly in the FIRST PERSON ("I", "me", "my") directly addressing v0 as "you".
- Opening line must be natural and direct, exactly like an executive talking to an elite designer:
  "Build an extraordinary, bespoke executive career portfolio for me. My name is ${blueprint.candidateName}, and I'm positioning myself for the ${blueprint.targetRole} role at ${blueprint.targetCompany}..."
- NEVER use mechanical labels like "Creative Director Brief for...", "v0 frontend engineer", "Candidate Profile:", or "MANDATORY SPECIFICATION".
- Talk to v0 with authority, taste, and clarity.

HIGH-AGENCY & VISUAL DIRECTION (DO NOT OVER-SPECIFY):
- Avoid walls of plain text. Make this portfolio visually driven, engaging, and interactive with interesting elements.
- DO NOT micromanage or hardcode minute component details, exact pixel dimensions, or rigid borders. Give v0 room to exercise its frontend design reasoning intelligence.
- Clearly set the overarching aesthetic mood, spatial atmosphere, and design language (${designSystem}).

JD & CV SEMANTIC ALIGNMENT (CRITICAL):
- Carefully analyze my attached Full CV in the direct context of the attached Job Description.
- In Section 4 (Authentic Career Track Record & Domain Strengths), craft an authentic, comprehensive narrative of my real career milestones, leadership scope, and domain capabilities extracted directly from my CV. Tailor this presentation specifically to address the employer's core challenges, responsibilities, and required competencies outlined in the JD, demonstrating why my track record makes me the ideal operator for this role.
- NEVER dump raw JSON, curly braces, or bracketed syntax. Describe skills and experience in articulate, natural executive English.
- Extract any verified contact details (email, LinkedIn) directly from my CV for the recruiter contact modal.

DOMAIN-TAILORED DELIGHT (MANDATORY REQUIREMENT):
- Analyze the target company's industry domain and the specific role (${blueprint.targetRole} at ${blueprint.targetCompany}).
- Invent 1-2 subtle, playful micro-interactions or ambient touches uniquely tailored to this role and industry domain (e.g. for fintech: live ticker pulses or balance ledgers; for travel: route maps or flight cursors; for devtools: terminal readouts or deployment pipelines; for data/AI: telemetry graphs or model simulators).
- Instruct v0 to incorporate these domain-specific delight touches into the user experience.

MOTION DESIGN & INTERACTION PHYSICS (INTELLIGENTLY TAILORED VIA CV & JD):
- Analyze the unique intersection of my work style, domain, and seniority from my Full CV against the target company's culture, product caliber, and technical expectations in the Job Description.
- Based on that analysis, dynamically determine the most fitting motion physics, interaction rhythm, and visual transitions for this specific profile:
  * Decide how interactive elements should physically feel and respond (e.g. transition pacing, hover feedback, tab switching dynamics, and visual state changes) so the interactive feel authentically mirrors how an elite operator in this specific discipline works.
  * Explicitly instruct v0 on this bespoke visual rhythm and motion style in Section 7.
- CRITICAL SANDBOX STABILITY & FIRST-PAINT RULE:
  * Hero and all above-the-fold content must be IMMEDIATELY visible on initial page load (never hide hero elements behind opacity:0 or failing scroll observers).
  * Instruct v0 to implement all motion and micro-interactions using standard Tailwind CSS classes (e.g. transition-all, hover:-translate-y-1, active:scale-95) and standard React hooks (useState) so it compiles and animates cleanly in the sandbox without unimported third-party packages.

STRUCTURE OF YOUR PROMPT FOR V0:
1. First-Person Opening & Executive Positioning Thesis
2. My Strategic Operator Thesis for ${blueprint.targetCompany} (The Commercial Opportunity, My 3-Step Playbook, My Right-to-Win)
3. Verified Metrics & Highlighted Proof Cases (rendered as visual, interactive components)
4. Authentic Career Track Record & Domain Strengths (extracted from my CV and tailored in light of the JD)
5. Aesthetic Atmosphere & Signature Interactive Concept (${designSystem})
6. Domain-Tailored Delight: Subtle, playful touches tailored for the ${blueprint.targetRole} role at ${blueprint.targetCompany}
7. Motion Design, Tailored Physics & Visual Effects (bespoke animation pacing and visual transitions dynamically derived from my profile and the JD, with immediate first-paint visibility)
8. Direct Recruiter Contact Modal (using verified contact details from my CV)`

  const userContext = {
    targetCompany: blueprint.targetCompany,
    targetRole: blueprint.targetRole,
    candidateName: blueprint.candidateName,
    approvedPositioningHook: blueprint.positioningHook,
    approvedPositioningSubtitle: blueprint.positioningSubtitle,
    selectedStrategicDirection: activeDirection,
    highlightedProofCases: blueprint.caseStudies,
    selectedDesignSystem: designSystem,
    fullCvText: resumeText || (blueprint.roles ? JSON.stringify(blueprint.roles, null, 2) : ''),
    fullJobDescription: jobDescription || `${blueprint.targetRole} at ${blueprint.targetCompany}`,
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
      designSystem = 'Minimal Monochrome',
      selectedDirectionIndex = 0,
      resumeText = '',
      jobDescription = '',
    }: {
      blueprint: StrategicBlueprint
      designSystem?: string
      selectedDirectionIndex?: number
      resumeText?: string
      jobDescription?: string
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
    const message = await synthesizeV0Prompt(blueprint, designSystem, selectedDirectionIndex, resumeText, jobDescription)
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
