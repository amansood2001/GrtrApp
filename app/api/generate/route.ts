import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { v0 } from 'v0'
import type { GenerateResponse, StrategicBlueprint } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 120

// Curated Seed Chats existing directly inside your authenticated v0 workspace
export const WORKSPACE_SEED_CHATS: Record<string, string> = {
  // COMPUTE Template
  'COMPUTE — AI Platform Template': 'RKiDa7imLjw',
  'Compute': 'RKiDa7imLjw',
  'compute': 'RKiDa7imLjw',
  'RKiDa7imLjw': 'RKiDa7imLjw',

  // EinCode Digital Lab
  'EinCode Digital Lab': 'TirCdHf4EQ8',
  'eincode': 'TirCdHf4EQ8',
  'eincode-digital-lab': 'TirCdHf4EQ8',
  'TirCdHf4EQ8': 'TirCdHf4EQ8',

  // Exact Landing Page Clone
  'Exact Landing Page Clone': 'jMO0lvF8j85',
  'exact-landing-page-clone': 'jMO0lvF8j85',
  'landing-page-clone': 'jMO0lvF8j85',
  'jMO0lvF8j85': 'jMO0lvF8j85',
}

export interface CommunityTemplateProfile {
  id: string
  name: string
  archetype: string
  siteUrl: string
  structuralSlots: Record<string, string>
}

export const COMMUNITY_TEMPLATE_PROFILES: Record<string, CommunityTemplateProfile> = {
  'RKiDa7imLjw': {
    id: 'RKiDa7imLjw',
    name: 'COMPUTE — AI Platform Template',
    archetype: 'Dark Glass · High-Tech Velocity',
    siteUrl: 'https://compute-the-platform-to-build-ship-ai-agents-k2gt4ri9.v0.build/',
    structuralSlots: {
      heroSlot: 'Ambient hero visual lockup, headline badge, and deploy agent CTA button',
      metricsSlot: 'Real-time telemetry metric counters, active latency dials, and SLA indicators',
      capabilitySlot: 'Interactive dark glass capability tab cards with glowing border tokens',
      codeTerminalSlot: 'Syntax-highlighted code execution console with copy action',
      footerSlot: 'Deployment status indicators, author watermark, and creator social links',
    },
  },
  'TirCdHf4EQ8': {
    id: 'TirCdHf4EQ8',
    name: 'EinCode Digital Lab',
    archetype: 'Creative Engineering · Interactive Labs',
    siteUrl: 'https://eincode-digital-lab-ro19nmqi.v0.build/',
    structuralSlots: {
      heroSlot: 'Digital laboratory headline, status pill, and interactive ASCII terminal card',
      showcaseSlot: 'Interactive project grid cards with dynamic hover states and tag chips',
      workbenchSlot: 'Experimental digital tools / workbench showcase cards',
      footerSlot: 'Curiosity journal links, GitHub / social icons, and lab status pill',
    },
  },
  'jMO0lvF8j85': {
    id: 'jMO0lvF8j85',
    name: 'Exact Landing Page Clone',
    archetype: 'High-Converting SaaS · Bold Layout',
    siteUrl: 'https://exact-landing-page-clone-2424t1qy.v0.build/',
    structuralSlots: {
      heroSlot: 'High-impact value headline, social proof badge, and primary recruiter conversion CTA',
      metricsSlot: 'Key milestone metric numbers and quantifiable impact counters',
      caseStudySlot: 'Strategic case study breakdown cards with challenges and solutions',
      contactSlot: 'Direct conversion form / recruiter touchpoint modal and clean footer',
    },
  },
}

// ---------------------------------------------------------------------------
// MODE B: Template Adaptation Prompt Synthesizer (Community Templates)
// ---------------------------------------------------------------------------
async function synthesizeV0TemplateAdaptationPrompt(
  blueprint: StrategicBlueprint,
  templateProfile: CommunityTemplateProfile,
  selectedDirectionIndex: number = 0,
  resumeText: string = '',
  jobDescription: string = '',
  userProvidedAssets?: {
    avatarUrl?: string
    projectImages?: string[]
    preferredSocials?: Record<string, string>
  }
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required for creative prompt synthesis.')
  }

  const openai = new OpenAI({ apiKey })
  const activeDirection = blueprint.directions?.[selectedDirectionIndex] || blueprint.directions?.[0]

  const systemPrompt = `You are ${blueprint.candidateName} writing directly into the v0 chat interface. You are not building from an empty canvas. You have chosen an existing, high-polish community template (${templateProfile.name}), which has already been duplicated into this v0 workspace. Your objective is to direct v0 to surgically transform this existing codebase into your authentic executive career portfolio while strictly preserving the template's signature visual DNA and aesthetic excellence.

CRITICAL VOICE & PERSONA INSTRUCTIONS:
- Write strictly in the FIRST PERSON ("I", "me", "my") directly addressing v0 as "you".
- Opening line must be natural, authoritative, and direct, emphasizing that you are building upon the duplicated template:
  "Build an extraordinary, bespoke executive career portfolio for me by surgically adapting this duplicated ${templateProfile.name} template codebase. My name is ${blueprint.candidateName}, and I'm positioning myself for the ${blueprint.targetRole} role at ${blueprint.targetCompany}..."
- NEVER use mechanical labels like "Creative Director Brief for...", "v0 frontend engineer", "Candidate Profile:", or "MANDATORY SPECIFICATION".
- Talk to v0 with authority, taste, and clarity.

DIRECTION & VISUAL PRESERVATION (CRITICAL):
- The visual direction, spatial atmosphere, materials (e.g. dark glassmorphism, border glows, high-contrast layouts), and typography hierarchy must be identical to the chosen community template (${templateProfile.name}) and must NOT deviate, in order to preserve the exact visual originality and appeal that made you choose it as your foundation.
- DO NOT invent a new design system or replace the template's layout. Direct v0 to respect and preserve the existing styling tokens and design language.

MOTION DESIGN & INTERACTION PHYSICS PRESERVATION (CRITICAL):
- The motion design, animation curves, transition pacing, hover feedback, and interaction physics must remain identical to the chosen community template (${templateProfile.name}) and must NOT be meddled with or altered, preserving the signature interactivity of the template.
- All interactions must maintain immediate first-paint visibility on initial page load (never hide hero elements behind opacity:0 or failing scroll observers).

JD & CV SEMANTIC ALIGNMENT (CRITICAL):
- Carefully analyze my attached Full CV in the direct context of the attached Job Description.
- In Section 4 (Authentic Career Track Record & Domain Strengths), craft an authentic, comprehensive narrative of my real career milestones, leadership scope, and domain capabilities extracted directly from my CV. Tailor this presentation specifically to address the employer's core challenges, responsibilities, and required competencies outlined in the JD, demonstrating why my track record makes me the ideal operator for this role.
- NEVER dump raw JSON, curly braces, or bracketed syntax. Describe skills and experience in articulate, natural executive English.

DOMAIN-TAILORED DELIGHT (MANDATORY REQUIREMENT):
- Analyze the target company's industry domain and the specific role (${blueprint.targetRole} at ${blueprint.targetCompany}).
- Invent 1-2 subtle, playful micro-interactions or ambient touches uniquely tailored to this role and industry domain, and instruct v0 to integrate them seamlessly into the existing template's interactive zones without breaking the template's layout.

COMMUNITY TEMPLATE ADAPTATION & ASSET AUDIT PROTOCOL:
You must perform a 3-step audit before crafting the prompt for v0:

Step 1: Identity & Residual Sanitization
- Inspect the template's existing content and metadata:
  * Completely eliminate all placeholder author branding, personal headshots, creator bios, and mock credentials.
  * Purge all template author social handles (e.g. GitHub, Twitter/X, Substack, personal Calendly) and generic mock buttons (e.g. "Sign In", "Deploy Platform").
  * Contact & Social Links Precedence:
    - First Priority: Use any custom social links or preferred contact channels provided in the Progressive Asset Kit.
    - Second Priority: Use verified contact info (email, LinkedIn) extracted directly from my CV.
    - If a specific channel is not provided in either source, instruct v0 to remove that icon entirely rather than linking to a dead "#" or the original template author.

Step 2: Visual Slot Replacement & Asset Priority Hierarchy (CRITICAL)
- The template contains visual media cards, image placeholders, or decorative graphics originally designed for a different project or persona.
- NEVER instruct v0 to output unverified or hallucinated external image URLs (which break or 404), and NEVER retain the original template author's personal photos or assets.
- Apply the following strict Two-Tier Replacement Hierarchy:

  [TIER A — USER-SUPPLIED ASSETS HAVE HIGHEST PRIORITY]:
  * Check the attached context for any user-uploaded media from the "Progressive Asset Kit" (e.g., custom headshot/avatar, verified project screenshots, or specific work links).
  * If custom assets are present, give them absolute priority: instruct v0 to slot these directly into the corresponding hero/project/media sections, replacing incoherent template elements with the candidate's authentic materials.

  [TIER B — FIRST-PRINCIPLES PROCEDURAL REPLACEMENT FOR REMAINING SLOTS]:
  * For any visual slot where no user-supplied asset was provided: do NOT guess or search for random external images.
  * Instead, analyze my authentic profile from my CV against the target role in the JD:
    - Deeply evaluate what constitutes my natural "proof of work" and tangible professional output—regardless of domain, discipline, or seniority.
    - Dynamically determine the most compelling visual vocabulary, interactive UI widgets, data visualizations, process workflows, or functional components that authentically demonstrate my impact in this specific field.
    - Instruct v0 to replace each remaining visual slot with that bespoke, natively rendered React/Tailwind/Lucide/SVG component as you deem best fit for my background.
    - For profile avatars/headshots (if no custom photo was provided in the Asset Kit): instruct v0 to render a refined typographic monogram token or an abstract design-system-aligned visual mark rather than an arbitrary stock portrait.

Step 3: Codebase & Aesthetic Preservation Guardrails
- Instruct v0 to preserve the core structural layout, grid hierarchy, materials (e.g., dark glassmorphism, border glows, or editorial margins), responsive navigation, and motion physics that make this template distinct.
- Direct v0 to surgically adapt the existing component tree in app/page.tsx and associated modules, rather than wiping out the code and rebuilding from scratch.
- Ensure that while all narrative, data, and visual cards are deeply personalized to me and the target role, the visual polish and design integrity of the original template remain 100% intact.

STRUCTURE OF YOUR PROMPT FOR V0:
1. First-Person Opening & Community Template Adaptation Thesis (explicitly emphasize that v0 is building on top of and surgically adapting this duplicated ${templateProfile.name} template codebase)
2. My Strategic Operator Thesis for ${blueprint.targetCompany} (The Commercial Opportunity, My 3-Step Playbook, My Right-to-Win)
3. Verified Metrics & Highlighted Proof Cases (rendered in the template's metric counters, cards, and proof slots)
4. Authentic Career Track Record & Domain Strengths (extracted from my CV and tailored in light of the JD)
5. Aesthetic Atmosphere & Signature Interactive Concept (state explicitly that it must be identical to ${templateProfile.name} and must not be altered)
6. Domain-Tailored Delight: Subtle, playful touches tailored for the ${blueprint.targetRole} role at ${blueprint.targetCompany} integrated into the template
7. Motion Design Physics & Interaction Pacing (state explicitly that it must remain identical to ${templateProfile.name} and should not be meddled with, maintaining immediate first-paint)
8. Direct Recruiter Contact Modal (using verified contact details from the Asset Kit / CV)`

  const userContext = {
    isCommunityTemplate: true,
    templateName: templateProfile.name,
    templateArchetype: templateProfile.archetype,
    templateSiteUrl: templateProfile.siteUrl,
    templateStructuralProfile: templateProfile.structuralSlots,
    userProvidedAssets: userProvidedAssets || null,
    targetCompany: blueprint.targetCompany,
    targetRole: blueprint.targetRole,
    candidateName: blueprint.candidateName,
    approvedPositioningHook: blueprint.positioningHook,
    approvedPositioningSubtitle: blueprint.positioningSubtitle,
    selectedStrategicDirection: activeDirection,
    highlightedProofCases: blueprint.caseStudies,
    stats: blueprint.stats,
    roles: blueprint.roles,
    fullCvText: resumeText || (blueprint.roles ? JSON.stringify(blueprint.roles, null, 2) : ''),
    fullJobDescription: jobDescription || `${blueprint.targetRole} at ${blueprint.targetCompany}`,
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Generate the first-person v0 adaptation prompt based on my authentic background and template profile:\n${JSON.stringify(userContext, null, 2)}` }
    ],
    temperature: 0.7,
  })

  const promptText = completion.choices[0]?.message?.content
  if (!promptText) {
    throw new Error('OpenAI failed to synthesize the template adaptation prompt.')
  }

  return promptText
}

// ---------------------------------------------------------------------------
// MODE A: Blank-Canvas Prompt Synthesizer (Moods & Custom)
// ---------------------------------------------------------------------------
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
      userProvidedAssets,
    }: {
      blueprint: StrategicBlueprint
      designSystem?: string
      selectedDirectionIndex?: number
      resumeText?: string
      jobDescription?: string
      userProvidedAssets?: {
        avatarUrl?: string
        projectImages?: string[]
        preferredSocials?: Record<string, string>
      }
    } = await req.json()

    if (!blueprint || !blueprint.candidateName) {
      return NextResponse.json({ success: false, error: 'A valid StrategicBlueprint is required.' }, { status: 400 })
    }

    // Check if user selected a verified Community Template (Seed Chat)
    const seedChatId = WORKSPACE_SEED_CHATS[designSystem]

    if (seedChatId) {
      const templateProfile = COMMUNITY_TEMPLATE_PROFILES[seedChatId] || {
        id: seedChatId,
        name: designSystem,
        archetype: 'High-Fidelity Verified Template',
        siteUrl: `https://v0.app/chat/${seedChatId}`,
        structuralSlots: {
          heroSlot: 'Hero headline, introduction, and call to action',
          metricsSlot: 'Key performance metric cards and quantitative proof points',
          projectsSlot: 'Showcase grid and case study cards',
          footerSlot: 'Contact modal and social channels',
        },
      }

      console.log(`[Community Template Workflow] Duplicating seed chat "${seedChatId}" (${templateProfile.name}) for "${blueprint.candidateName}" -> "${blueprint.targetCompany}"`)
      
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

      console.log(`[Community Template Workflow] Chat duplicated: ${newChatId}. Synthesizing template adaptation prompt with OpenAI...`)
      const startTime = Date.now()
      const adaptationMessage = await synthesizeV0TemplateAdaptationPrompt(
        blueprint,
        templateProfile,
        selectedDirectionIndex,
        resumeText,
        jobDescription,
        userProvidedAssets
      )
      console.log(`[Community Template Workflow] Adaptation prompt synthesized in ${((Date.now() - startTime) / 1000).toFixed(2)}s (length: ${adaptationMessage.length} chars)`)

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
