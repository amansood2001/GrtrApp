import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { v0 } from 'v0'
import type { GenerateResponse, StrategicBlueprint } from '@/lib/types'
import { recordPortfolioEvent } from '@/lib/analytics-tracker'

export const runtime = 'nodejs'
export const maxDuration = 300

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
    siteUrl: 'https://v0-compute-11.vercel.app',
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
    siteUrl: 'https://v0.app/templates/eincode-digital-lab-NjOUgG6VT7X',
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
    siteUrl: 'https://v0.app/templates/exact-landing-page-clone-TRBFYs8lKCv',
    structuralSlots: {
      heroSlot: 'High-impact value headline, social proof badge, and primary recruiter conversion CTA',
      metricsSlot: 'Key milestone metric numbers and quantifiable impact counters',
      caseStudySlot: 'Strategic case study breakdown cards with challenges and solutions',
      contactSlot: 'Direct conversion form / recruiter touchpoint modal and clean footer',
    },
  },
}

function truncateSafely(str: string | undefined | null, maxChars: number): string {
  if (!str) return ''
  if (str.length <= maxChars) return str
  return str.slice(0, maxChars) + '... [truncated for prompt limits]'
}

// ---------------------------------------------------------------------------
// MODE B: Template Adaptation Prompt Synthesizer (Community Templates)
// ---------------------------------------------------------------------------
async function synthesizeV0TemplateAdaptationPrompt(
  blueprint: StrategicBlueprint,
  templateProfile: CommunityTemplateProfile,
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

  const systemPrompt = `You are ${blueprint.candidateName} writing directly into the v0 chat interface. You are not building from an empty canvas. You have chosen an existing, high-polish community template (${templateProfile.name}), which has already been duplicated into this v0 workspace. Your objective is to direct v0 to surgically transform this existing codebase into your authentic executive career portfolio while strictly preserving the template's signature visual DNA and aesthetic excellence.

CRITICAL VOICE & PERSONA INSTRUCTIONS:
- Write strictly in the FIRST PERSON ("I", "me", "my") directly addressing v0 as "you".
- Opening line must be natural, authoritative, and direct, emphasizing that you are building upon the duplicated template:
  "Build an extraordinary, bespoke executive career portfolio for me by surgically adapting this duplicated ${templateProfile.name} template codebase. My name is ${blueprint.candidateName}, and I'm positioning myself for the ${blueprint.targetRole} role at ${blueprint.targetCompany}..."
- NEVER use mechanical labels like "Creative Director Brief for...", "v0 frontend engineer", "Candidate Profile:", or "MANDATORY SPECIFICATION".
- Talk to v0 with authority, taste, and clarity.

DIRECTION & VISUAL PRESERVATION (CRITICAL):
- CRITICAL ARCHITECTURE & DESIGN PRESERVATION RULE: You must strictly preserve 100% of the duplicated ${templateProfile.name} template's visual architecture, 3D canvas/ASCII scenes (e.g. components/landing/ascii-scene.tsx or procedural backgrounds), layouts, typography, animations, and spatial atmosphere. Do NOT wipe out, replace, or remove signature visual components or canvas elements. Surgically adapt the narrative copy, headline thesis, verified metrics, 3-step playbook, and experience sections with the candidate's authentic background.
- The visual direction, spatial atmosphere, materials (e.g. borders, surface elevations, contrast ratios, and layout margins), and typography hierarchy must be identical to the chosen community template (${templateProfile.name}) and must NOT deviate, in order to preserve the exact visual originality and appeal that made you choose it as your foundation.
- DO NOT invent a new design system or replace the template's layout. Direct v0 to respect and preserve the existing styling tokens and design language.

MOTION DESIGN & INTERACTION PHYSICS PRESERVATION (CRITICAL):
- The motion design, animation curves, transition pacing, hover feedback, and interaction physics must remain identical to the chosen community template (${templateProfile.name}) and must NOT be meddled with or altered, preserving the signature interactivity of the template.
- All interactions must maintain immediate first-paint visibility on initial page load (never hide hero elements behind opacity:0 or failing scroll observers).

JD & CV SEMANTIC ALIGNMENT (CRITICAL):
- Carefully analyze my attached Full CV in the direct context of the attached Job Description.
- In Section 4 (Authentic Career Track Record & Domain Strengths), craft an authentic, comprehensive narrative of my real career milestones, leadership scope, and domain capabilities extracted directly from my CV. Tailor this presentation specifically to address the employer's core challenges, responsibilities, and required competencies outlined in the JD, demonstrating why my track record makes me the ideal operator for this role.
- NEVER dump raw JSON, curly braces, or bracketed syntax. Describe skills and experience in articulate, natural executive English.

STRATEGIC THESIS & COMPANY RESEARCH FOR SECTION 2 (ZERO-COMPRESSION & INTERACTION DIRECTIVE):
- In Section 2 of your prompt for v0 ("My Strategic Operator Thesis for ${blueprint.targetCompany}"), you must output the full, word-for-word text of my selected strategic direction:
  * The Observed Company Challenge (verbatim as provided in selectedStrategicDirection.observedChallenge)
  * The Proposed Operational Strategy / Playbook (verbatim as provided in selectedStrategicDirection.proposedStrategy)
  * My Proven Right-to-Win (verbatim as provided in selectedStrategicDirection.rightToWinProof)
- NEVER summarize, condense, or dilute these points into high-level slogans. They demonstrate my deep preparation, domain insight, and tailored effort for this role.
- Immediately following the verbatim text in Section 2, instruct v0 with this explicit directive:
  "CRITICAL PRESENTATION & INTERACTION DIRECTIVE FOR THIS SECTION: Retain the complete substance, depth, and specific company insights from the text above. Do NOT dilute it into a one-line slogan. However, NEVER render this as a dry, static wall of text. Bring this section to life with engaging visual elements, smooth animations, and interactive touches that blend naturally with the template's aesthetic atmosphere."

DOMAIN-TAILORED DELIGHT (MANDATORY REQUIREMENT):
- Analyze the target company's industry domain and the specific role (${blueprint.targetRole} at ${blueprint.targetCompany}).
- Invent 1-2 subtle, playful micro-interactions or ambient touches uniquely tailored to this role and industry domain, and instruct v0 to integrate them seamlessly into the existing template's interactive zones without breaking the template's layout.

HYDRATION & EXTENSION RESILIENCE:
- Instruct v0 to ensure app/layout.tsx has suppressHydrationWarning on both <html> and <body> so that client browser extensions (password managers, translators) do not cause React hydration mismatch warnings.

COMMUNITY TEMPLATE ADAPTATION & ASSET AUDIT PROTOCOL:
You must perform a 3-step audit before crafting the prompt for v0:

Step 1: Identity & Residual Sanitization
- Inspect the template's existing content and metadata:
  * Completely eliminate all placeholder author branding, personal headshots, creator bios, and mock credentials.
  * Purge all template author social handles (e.g. GitHub, Twitter/X, Substack, personal Calendly) and generic mock buttons (e.g. "Sign In", "Deploy Platform").
  * Contact & Social Links: Use verified contact info (email, LinkedIn) extracted directly from my CV. If a specific channel is not provided in my CV, instruct v0 to remove that icon or link entirely rather than linking to a dead "#" or the original template author.

Step 2: Visual Media and Slot Replacement (CRITICAL)
- The template contains visual media cards, image placeholders, or decorative graphics originally designed for a different project or persona.
- NEVER instruct v0 to output unverified or hallucinated external image URLs (which break or 404), and NEVER retain the original template author's personal photos or assets.
- If the template features procedural visual scenes, 3D canvases, or ASCII art (e.g. ascii-scene.tsx), PRESERVE THEM 100% INTACT. Do NOT replace them with generic photos.
- If the template has an avatar/headshot slot, instruct v0 to render a refined typographic monogram token or an abstract design-system-aligned visual mark rather than an arbitrary stock photo.
- Analyze my authentic profile from my CV against the target role in the JD:
  * Deeply evaluate what constitutes my natural "proof of work" and tangible professional output.
  * Dynamically determine the most compelling visual vocabulary, interactive UI widgets, data visualizations, process workflows, or functional components that authentically demonstrate my impact in this specific field.
  * Instruct v0 to replace each remaining visual slot with that bespoke, natively rendered React/Tailwind/Lucide/SVG component.

Step 3: Codebase & Aesthetic Preservation Guardrails
- Instruct v0 to preserve the core structural layout, grid hierarchy, materials (e.g. borders, surface elevations, and margins), responsive navigation, and motion physics that make this template distinct.
- Direct v0 to surgically adapt the existing component tree in app/page.tsx and associated modules, rather than wiping out the code and rebuilding from scratch.
- Ensure that while all narrative, data, and visual cards are deeply personalized to me and the target role, the visual polish and design integrity of the original template remain 100% intact.

STRUCTURE OF YOUR PROMPT FOR V0:
1. First-Person Opening & Community Template Adaptation Thesis (explicitly emphasize that v0 is building on top of and surgically adapting this duplicated ${templateProfile.name} template codebase)
2. My Strategic Operator Thesis for ${blueprint.targetCompany} (Output the Candidate's Observed Company Challenge, Proposed Strategy, and Right-to-Win VERBATIM without condensing, followed by the explicit directive instructing v0 to render it with interactive elements, animations, and motion rather than plain text)
3. Verified Metrics & Highlighted Proof Cases (rendered in the template's metric counters, cards, and proof slots)
4. Authentic Career Track Record & Domain Strengths (extracted from my CV and tailored in light of the JD)
5. Aesthetic Atmosphere & Signature Interactive Concept (state explicitly that it must be identical to ${templateProfile.name} and must not be altered)
6. Domain-Tailored Delight: Subtle, playful touches tailored for the ${blueprint.targetRole} role at ${blueprint.targetCompany} integrated into the template
7. Motion Design Physics & Interaction Pacing (state explicitly that it must remain identical to ${templateProfile.name} and should not be meddled with, maintaining immediate first-paint)
8. Direct Recruiter Contact Modal (using verified contact details from my CV)`

  const safeResumeText = truncateSafely(resumeText, 25000)
  const safeJobDescription = truncateSafely(jobDescription, 15000)

  const userContext = {
    isCommunityTemplate: true,
    templateName: templateProfile.name,
    templateArchetype: templateProfile.archetype,
    templateSiteUrl: templateProfile.siteUrl,
    templateStructuralProfile: templateProfile.structuralSlots,
    targetCompany: blueprint.targetCompany,
    targetRole: blueprint.targetRole,
    candidateName: blueprint.candidateName,
    approvedPositioningHook: blueprint.positioningHook,
    approvedPositioningSubtitle: blueprint.positioningSubtitle,
    selectedStrategicDirection: activeDirection ? {
      angle: activeDirection.angle,
      observedChallenge: activeDirection.observedChallenge,
      proposedStrategy: activeDirection.proposedStrategy,
      rightToWinProof: activeDirection.rightToWinProof,
    } : undefined,
    highlightedProofCases: blueprint.caseStudies,
    stats: blueprint.stats,
    roles: blueprint.roles,
    fullCvText: safeResumeText || (blueprint.roles ? JSON.stringify(blueprint.roles, null, 2) : ''),
    fullJobDescription: safeJobDescription || `${blueprint.targetRole} at ${blueprint.targetCompany}`,
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
// MODE C: Skill-Driven Architecture Prompt Synthesizer
// ---------------------------------------------------------------------------
async function synthesizeV0SkillDrivenPrompt(
  blueprint: StrategicBlueprint,
  selectedDirectionIndex: number = 0,
  resumeText: string = '',
  jobDescription: string = '',
  attachedSkills: Array<{ id: string; name: string; description?: string; content?: string }> = []
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required for creative prompt synthesis.')
  }

  const openai = new OpenAI({ apiKey })
  const activeDirection = blueprint.directions?.[selectedDirectionIndex] || blueprint.directions?.[0]
  const attachedSkillNames = attachedSkills.map(s => `"${s.name || s.id}"`).join(', ')

  const systemPrompt = `You are ${blueprint.candidateName} writing directly into the v0 chat interface. You are commissioning v0 to build a world-class, bespoke executive career portfolio from scratch, where the visual design system, component grammar, and motion physics are strictly governed by the attached skills.sh skill(s): ${attachedSkillNames}.

CRITICAL VOICE & PERSONA INSTRUCTIONS:
- Write strictly in the FIRST PERSON ("I", "me", "my") directly addressing v0 as "you".
- Opening line must be natural, authoritative, and direct:
  "Build an extraordinary, bespoke executive career portfolio for me using the attached skills.sh design foundation (${attachedSkillNames}). My name is ${blueprint.candidateName}, and I'm positioning myself for the ${blueprint.targetRole} role at ${blueprint.targetCompany}..."
- NEVER use mechanical labels like "Creative Director Brief for...", "v0 frontend engineer", "Candidate Profile:", or "MANDATORY SPECIFICATION".
- Talk to v0 with authority, taste, and clarity.

MODE C: SKILL-DRIVEN DESIGN SYSTEM GOVERNANCE (CRITICAL):
- Explicitly instruct v0 that the entire design foundation, spatial grid hierarchy, typography scales, card density, elevation tokens, border treatments, and motion physics are 100% strictly governed by the attached skill(s): ${attachedSkillNames}.
- Direct v0 to invoke its complete built-in design intelligence for ${attachedSkillNames} and build production-ready, interactive React client components with smooth Framer Motion/CSS transitions, high-contrast surfaces, and full clickability.
- Do NOT allow v0 to fall back to generic, unstyled Tailwind card templates or flat static boxes.

HIGH-AGENCY INTERACTIVE ARCHITECTURE (CRITICAL):
- NEVER output generic flat static cards, dry walls of plain text, or identical non-clickable boxes.
- Exercise your full design intelligence to architect bespoke, highly interactive React client components organically tailored to the specific nature of ${blueprint.targetRole} at ${blueprint.targetCompany}.
- Bring every section to life with fluid transitions, engaging visual craft, interactive states, and responsive depth governed strictly by the design language of ${attachedSkillNames}.

HYDRATION & EXTENSION RESILIENCE:
- Instruct v0 to include suppressHydrationWarning on both <html lang="en" suppressHydrationWarning> and <body suppressHydrationWarning ...> in app/layout.tsx to prevent React hydration warnings.

STRUCTURE OF YOUR PROMPT FOR V0:
1. First-Person Opening & Skill-Driven Architectural Thesis (citing ${attachedSkillNames})
2. My Strategic Operator Thesis for ${blueprint.targetCompany} (Output the Candidate's Observed Company Challenge, Proposed Strategy, and Right-to-Win in full, followed by an explicit directive to bring this strategy to life through dynamic, bespoke interactive components rather than static text)
3. Verified Metrics & Highlighted Proof Cases (rendered through dynamic, highly engaging visual components)
4. Authentic Career Track Record & Domain Strengths (extracted from my CV and tailored in light of the JD)
5. Skill-Driven Design System & Motion Physics (strictly citing ${attachedSkillNames})
6. Domain-Tailored Delight: Subtle, role-tailored micro-interactions for ${blueprint.targetRole} at ${blueprint.targetCompany}
7. Direct Recruiter Contact (using verified contact details from my CV)`

  const safeResumeText = truncateSafely(resumeText, 25000)
  const safeJobDescription = truncateSafely(jobDescription, 15000)

  const userContext = {
    mode: 'Mode C: Pure Skill-Driven Architecture',
    attachedSkills: attachedSkills.map(s => s.name || s.id),
    targetCompany: blueprint.targetCompany,
    targetRole: blueprint.targetRole,
    candidateName: blueprint.candidateName,
    approvedPositioningHook: blueprint.positioningHook,
    approvedPositioningSubtitle: blueprint.positioningSubtitle,
    selectedStrategicDirection: activeDirection ? {
      angle: activeDirection.angle,
      observedChallenge: activeDirection.observedChallenge,
      proposedStrategy: activeDirection.proposedStrategy,
      rightToWinProof: activeDirection.rightToWinProof,
    } : undefined,
    highlightedProofCases: blueprint.caseStudies,
    stats: blueprint.stats,
    roles: blueprint.roles,
    fullCvText: safeResumeText || (blueprint.roles ? JSON.stringify(blueprint.roles, null, 2) : ''),
    fullJobDescription: safeJobDescription || `${blueprint.targetRole} at ${blueprint.targetCompany}`,
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Generate the first-person v0 skill-driven build prompt based on my authentic background:\n${JSON.stringify(userContext, null, 2)}` }
    ],
    temperature: 0.7,
  })

  const promptText = completion.choices[0]?.message?.content
  if (!promptText) {
    throw new Error('OpenAI failed to synthesize the skill-driven v0 prompt.')
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

HIGH-AGENCY INTERACTIVE ARCHITECTURE (CRITICAL - DO NOT GENERATE LINEAR STATIC CARDS):
- Avoid walls of plain text and do NOT output simple 3-card flat grids for the strategy or metrics.
- Clearly set the overarching aesthetic mood and design language (${designSystem}).
- Exercise your full design intelligence to architect bespoke, highly interactive React client components organically tailored to the specific nature of ${blueprint.targetRole} at ${blueprint.targetCompany}.
- Do NOT prescribe rigid component names or fixed layouts (e.g. do not force a fixed bento grid or predefined component paths like components/strategy-console.tsx or components/proof-bento.tsx). Let the candidate's authentic domain, target role, and impact dictate the optimal interactive architecture.
- Bring every section to life with fluid transitions, engaging visual craft, interactive states, and responsive depth.

HYDRATION & EXTENSION RESILIENCE:
- Instruct v0 to include suppressHydrationWarning on both <html lang="en" suppressHydrationWarning> and <body suppressHydrationWarning ...> in app/layout.tsx.

STRUCTURE OF YOUR PROMPT FOR V0:
1. First-Person Opening & Executive Positioning Thesis
2. My Strategic Operator Thesis for ${blueprint.targetCompany} (Output full thesis context, directing v0 to bring this strategy to life through dynamic, bespoke interactive components rather than static text)
3. Verified Metrics & Highlighted Proof Cases (rendered through dynamic, highly engaging visual components tailored to the role)
4. Authentic Career Track Record & Domain Strengths (extracted from my CV and tailored in light of the JD)
5. Aesthetic Atmosphere & Signature Concept (${designSystem})
6. Domain-Tailored Delight: Subtle, playful touches tailored for ${blueprint.targetRole} at ${blueprint.targetCompany}
7. Motion Design, Tailored Physics & Visual Effects
8. Direct Recruiter Contact Modal (using verified contact details from my CV)`

  const safeResumeText = truncateSafely(resumeText, 25000)
  const safeJobDescription = truncateSafely(jobDescription, 15000)

  const userContext = {
    mode: 'Mode A: Moods & Custom Canvas',
    targetCompany: blueprint.targetCompany,
    targetRole: blueprint.targetRole,
    candidateName: blueprint.candidateName,
    approvedPositioningHook: blueprint.positioningHook,
    approvedPositioningSubtitle: blueprint.positioningSubtitle,
    selectedStrategicDirection: activeDirection ? {
      angle: activeDirection.angle,
      observedChallenge: activeDirection.observedChallenge,
      proposedStrategy: activeDirection.proposedStrategy,
      rightToWinProof: activeDirection.rightToWinProof,
    } : undefined,
    highlightedProofCases: blueprint.caseStudies,
    selectedDesignSystem: designSystem,
    fullCvText: safeResumeText || (blueprint.roles ? JSON.stringify(blueprint.roles, null, 2) : ''),
    fullJobDescription: safeJobDescription || `${blueprint.targetRole} at ${blueprint.targetCompany}`,
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
      attachedSkills = [],
    }: {
      blueprint: StrategicBlueprint
      designSystem?: string
      selectedDirectionIndex?: number
      resumeText?: string
      jobDescription?: string
      attachedSkills?: Array<{ id: string; name: string; description?: string; content?: string }>
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
        jobDescription
      )
      console.log(`[Community Template Workflow] Adaptation prompt synthesized in ${((Date.now() - startTime) / 1000).toFixed(2)}s (length: ${adaptationMessage.length} chars)`)

      // Pass skills as native remote skills to v0 (zero synthetic file overrides)
      const v0Skills = (attachedSkills || [])
        .filter(s => s.id)
        .map(s => ({ type: 'remote' as const, id: s.id }))

      const sendRes = await v0.messages.sendAsync({
        chatId: newChatId,
        message: adaptationMessage,
        skills: v0Skills.length > 0 ? v0Skills : undefined,
      })

      if (sendRes?.error) {
        console.error('Failed to send template adaptation message:', sendRes.error)
        const rawMsg = sendRes.error.message || 'Failed to initiate portfolio generation.'
        const friendlyMsg = rawMsg.toLowerCase().includes('daily message limit') || rawMsg.toLowerCase().includes('quota')
          ? 'You have reached your daily v0 message limit. Please upgrade your plan on v0.app (Activate v0 Plus) or wait for your daily quota to reset.'
          : rawMsg
        return NextResponse.json(
          {
            success: false,
            error: friendlyMsg,
          },
          { status: sendRes.error.message?.includes('daily message limit') ? 429 : 502 }
        )
      }

      recordPortfolioEvent(newChatId, {
        type: 'deployed',
        title: 'Portfolio compiled and live sandbox connected',
        description: `Bespoke portfolio synthesized for ${blueprint.candidateName} @ ${blueprint.targetCompany}`,
        timestamp: Date.now(),
      }).catch(() => {})

      return NextResponse.json({
        success: true,
        chatId: newChatId,
        previewUrl: `/api/preview/${newChatId}`,
      })
    }

    // Check if user selected Mode C (Skill-Driven Architecture) or Mode A (Moods & Custom Canvas)
    const hasAttachedSkills = Array.isArray(attachedSkills) && attachedSkills.length > 0
    let message: string

    if (hasAttachedSkills) {
      console.log(`[Mode C: Skill-Driven Synthesizer] Crafting bespoke skill-driven prompt for "${blueprint.candidateName}" -> "${blueprint.targetCompany}" with ${attachedSkills.length} skill(s)...`)
      const startTime = Date.now()
      message = await synthesizeV0SkillDrivenPrompt(blueprint, selectedDirectionIndex, resumeText, jobDescription, attachedSkills)
      console.log(`[Mode C] Prompt crafted in ${((Date.now() - startTime) / 1000).toFixed(2)}s (length: ${message.length} chars)`)
    } else {
      console.log(`[Mode A: Moods & Custom Synthesizer] Crafting bespoke first-person build prompt for "${blueprint.candidateName}" -> "${blueprint.targetCompany}" (${designSystem})...`)
      const startTime = Date.now()
      message = await synthesizeV0Prompt(blueprint, designSystem, selectedDirectionIndex, resumeText, jobDescription)
      console.log(`[Mode A] Prompt crafted in ${((Date.now() - startTime) / 1000).toFixed(2)}s (length: ${message.length} chars)`)
    }

    console.log(`Initiating v0 generation for "${blueprint.candidateName}" -> "${blueprint.targetCompany}" (${hasAttachedSkills ? 'Mode C: Skills' : designSystem}) with ${attachedSkills.length} attached skill(s)`)

    // Pass skills as native remote skills to v0 (zero synthetic file overrides)
    const v0Skills = (attachedSkills || [])
      .filter(s => s.id)
      .map(s => ({ type: 'remote' as const, id: s.id }))

    let chatResponse: any
    try {
      chatResponse = await v0.chats.createAsync({
        message,
        skills: v0Skills.length > 0 ? v0Skills : undefined,
      })
    } catch (asyncErr) {
      console.warn('v0.chats.createAsync failed, attempting synchronous fallback:', asyncErr)
      chatResponse = await v0.chats.create({
        message,
        skills: v0Skills.length > 0 ? v0Skills : undefined,
      })
    }

    const chatId = chatResponse.data?.chat?.id || chatResponse.data?.chatId || chatResponse.data?.id
    const outputTokens = chatResponse.data?.usage?.tokens?.output ?? -1

    if (chatResponse.error || !chatId) {
      console.error('Portfolio generation failed:', chatResponse.error)
      const rawMsg = chatResponse.error?.message || 'Failed to initiate portfolio generation.'
      const friendlyMsg = rawMsg.toLowerCase().includes('daily message limit') || rawMsg.toLowerCase().includes('quota')
        ? 'You have reached your daily v0 message limit. Please upgrade your plan on v0.app (Activate v0 Plus) or wait for your daily quota to reset.'
        : rawMsg
      return NextResponse.json(
        {
          success: false,
          error: friendlyMsg,
        },
        { status: rawMsg.toLowerCase().includes('daily message limit') ? 429 : 502 }
      )
    }

    console.log(`Successfully created bespoke portfolio chat: ${chatId} (output tokens: ${outputTokens})`)

    recordPortfolioEvent(chatId, {
      type: 'deployed',
      title: 'Portfolio compiled and live sandbox connected',
      description: `Bespoke portfolio synthesized for ${blueprint.candidateName} @ ${blueprint.targetCompany}`,
      timestamp: Date.now(),
    }).catch(() => {})

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
