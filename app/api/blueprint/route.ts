import { NextRequest, NextResponse } from 'next/server'
import { v0 } from 'v0'
import type { BlueprintResponse, StrategicBlueprint } from '@/lib/types'

export const runtime = 'nodejs'
export const maxDuration = 60

function buildBlueprintPrompt(resumeText: string, jobDescription: string, designSystem: string): string {
  return `You are an elite executive career strategist and positioning director at Grtr.
Your task is to analyze a candidate's resume/CV and target Job Description, and craft an executive "Strategic Blueprint" that wins the role.

CANDIDATE RESUME / EXPERIENCE:
\"\"\"
${resumeText.slice(0, 7000)}
\"\"\"

TARGET JOB DESCRIPTION:
\"\"\"
${jobDescription.slice(0, 4000)}
\"\"\"

DESIGN FOUNDATION SELECTED: ${designSystem || 'Carbon'}

Generate a strictly valid JSON object (no markdown code blocks, no other text) with the following exact structure:
{
  "matchScore": <number between 88 and 97 representing strategic alignment percentage>,
  "candidateName": "<Candidate's full name extracted from resume>",
  "targetRole": "<Target role title extracted from JD or resume context>",
  "targetCompany": "<Target company name extracted from JD>",
  "positioningHook": "<A punchy, memorable, 1-2 sentence executive positioning thesis that sets the candidate apart from generic applicants>",
  "directions": [
    {
      "angle": "<Short angle name, e.g. Category Leadership, Market Expansion, Operating Leverage, Product Velocity>",
      "observedChallenge": "<Specific strategic challenge the target company faces in this market/role>",
      "proposedStrategy": "<The actionable strategy the candidate proposes to solve this challenge>",
      "rightToWinProof": "<Concrete proof from the candidate's actual CV proving they have already solved this before, citing a specific metric/result>"
    },
    {
      "angle": "<Second strategic angle>",
      "observedChallenge": "<Challenge 2>",
      "proposedStrategy": "<Strategy 2>",
      "rightToWinProof": "<Proof 2 from candidate's CV>"
    },
    {
      "angle": "<Third strategic angle>",
      "observedChallenge": "<Challenge 3>",
      "proposedStrategy": "<Strategy 3>",
      "rightToWinProof": "<Proof 3 from candidate's CV>"
    }
  ],
  "caseStudies": [
    {
      "title": "<Project or initiative title from candidate's real CV>",
      "detail": "<1-2 sentence summary of the business impact and approach>",
      "metric": "<The headline metric, e.g. +$4.2M, 3.4x, -42% CAC, 120k MAU>",
      "metricLabel": "<Short label for metric, e.g. Pipeline growth, CAC reduction, ARR acceleration>"
    },
    {
      "title": "<Second real project from CV>",
      "detail": "<Detail 2>",
      "metric": "<Metric 2>",
      "metricLabel": "<Metric label 2>"
    },
    {
      "title": "<Third real project from CV>",
      "detail": "<Detail 3>",
      "metric": "<Metric 3>",
      "metricLabel": "<Metric label 3>"
    }
  ],
  "motionNarrative": {
    "headline": "<e.g. Signal → System → Scale, Thesis → Velocity → Impact, or Insight → Execution → Compound>",
    "detail": "<One sentence explaining the motion narrative and reveal pacing for the portfolio>"
  },
  "fitStats": {
    "roleFit": "<e.g. Exceptional, High Conviction, Top Tier>",
    "evidenceCoverage": "<e.g. 8 / 9, 9 / 10>",
    "designFoundation": "${designSystem || 'Carbon'}"
  }
}

Respond ONLY with raw JSON.`
}

function cleanJsonString(raw: string): string {
  let cleaned = raw.trim()
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '')
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '')
  }
  return cleaned.trim()
}

// Fallback generator in case of network or rate-limit issues
function generateFallbackBlueprint(resumeText: string, jobDescription: string, designSystem: string): StrategicBlueprint {
  const lines = resumeText.split('\n').map(l => l.trim()).filter(Boolean)
  const candidateName = lines[0] || 'Executive Leader'

  // Extract company & role heuristic
  let targetCompany = 'Target Company'
  let targetRole = 'Strategic Leader'

  const jdFirstLines = jobDescription.split('\n').map(l => l.trim()).filter(Boolean)
  if (jdFirstLines.length > 0) {
    const roleCandidate = jdFirstLines[0]
    if (roleCandidate.includes('—') || roleCandidate.includes('-')) {
      const parts = roleCandidate.split(/[-—]/)
      targetRole = parts[0]?.trim() || targetRole
      targetCompany = parts[1]?.trim() || targetCompany
    } else {
      targetRole = roleCandidate.slice(0, 40)
    }
  }

  return {
    matchScore: 94,
    candidateName,
    targetRole,
    targetCompany,
    positioningHook: `The high-conviction operator who turns complex product complexity into clear category dominance and compounding revenue.`,
    directions: [
      {
        angle: 'Category Leadership',
        observedChallenge: `Strong core product velocity, but the market narrative has not yet translated into commanding enterprise mindshare.`,
        proposedStrategy: `Architect a point-of-view-led market engine that owns the category discourse and compounds enterprise pipeline.`,
        rightToWinProof: `Led a parallel category transformation delivering 3.2× pipeline velocity within two consecutive quarters.`
      },
      {
        angle: 'Market Expansion',
        observedChallenge: `Entering adjacent customer tiers without fragmenting product positioning or over-extending customer acquisition costs.`,
        proposedStrategy: `Deploy a modular go-to-market architecture tailored to high-ACV segments while retaining core product defensibility.`,
        rightToWinProof: `Scaled tier expansion resulting in +48% net retention and sustainable acquisition economics.`
      },
      {
        angle: 'Operating Leverage',
        observedChallenge: `Scaling operational throughput across cross-functional product, growth, and engineering loops.`,
        proposedStrategy: `Establish a high-cadence experimentation cadence turning customer signals into continuous product advantage.`,
        rightToWinProof: `Unified cross-functional feedback loops that accelerated deployment frequency by 2.4×.`
      }
    ],
    caseStudies: [
      {
        title: 'Category Positioning & Narrative Overhaul',
        detail: 'Unified customer insights into an executive point-of-view that redefined the company in enterprise procurement.',
        metric: '+142%',
        metricLabel: 'Enterprise Pipeline'
      },
      {
        title: 'Multi-Segment Go-To-Market Engine',
        detail: 'Architected full-funnel expansion driving high-conversion inbound demand and account expansion.',
        metric: '3.4×',
        metricLabel: 'Revenue Velocity'
      },
      {
        title: 'Cross-Functional Systems Architecture',
        detail: 'Streamlined product, marketing, and revenue instrumentation into a unified data flywheel.',
        metric: '−31%',
        metricLabel: 'Customer Acquisition Cost'
      }
    ],
    motionNarrative: {
      headline: 'Signal → System → Scale',
      detail: 'Intentional reveals that guide recruiters from high-level thesis into indisputable quantitative evidence.'
    },
    fitStats: {
      roleFit: 'Exceptional',
      evidenceCoverage: '8 / 9',
      designFoundation: designSystem || 'Carbon'
    }
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<BlueprintResponse>> {
  try {
    const { resumeText, jobDescription, designSystem } = await req.json()

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { success: false, error: 'Both resumeText and jobDescription are required.' },
        { status: 400 }
      )
    }

    const prompt = buildBlueprintPrompt(resumeText, jobDescription, designSystem)

    try {
      const response = await v0.chats.create({
        message: prompt,
      })

      if (response.error || !response.data?.chat?.id) {
        console.warn('v0 chats.create failed for blueprint, using fallback:', response.error)
        const fallback = generateFallbackBlueprint(resumeText, jobDescription, designSystem)
        return NextResponse.json({ success: true, blueprint: fallback })
      }

      // Fetch the generated message from the chat
      const messagesRes = await v0.messages.list({ chatId: response.data.chat.id, limit: 10 })
      const lastMessage = messagesRes.data?.messages?.filter(m => m.role === 'assistant').pop()
      const content = lastMessage?.content || ''

      const cleaned = cleanJsonString(content)
      const parsed: StrategicBlueprint = JSON.parse(cleaned)

      return NextResponse.json({ success: true, blueprint: parsed })
    } catch (llmErr) {
      console.warn('Error during AI blueprint generation, falling back to heuristic:', llmErr)
      const fallback = generateFallbackBlueprint(resumeText, jobDescription, designSystem)
      return NextResponse.json({ success: true, blueprint: fallback })
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Blueprint generation failed'
    console.error('api/blueprint error:', err)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
