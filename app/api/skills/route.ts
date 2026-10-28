import { NextRequest, NextResponse } from 'next/server'
import { CURATED_SKILLS, type AgentSkill } from '@/lib/skills-registry'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface SkillsShItem {
  id: string
  slug: string
  name: string
  source: string
  installs: number
  sourceType: string
  installUrl: string
  url: string
  description?: string
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = (searchParams.get('q') || '').trim().toLowerCase()
    const category = searchParams.get('category') || 'all'
    const id = searchParams.get('id')

    // Direct single skill lookup
    if (id) {
      const found = CURATED_SKILLS.find(s => s.id === id || s.slug === id)
      if (found) {
        return NextResponse.json({ success: true, skill: found })
      }
      return NextResponse.json({ success: false, error: 'Skill not found' }, { status: 404 })
    }

    // Filter curated skills first
    let matchedCurated = CURATED_SKILLS.filter(skill => {
      const matchesCategory = category === 'all' || skill.category === category
      if (!matchesCategory) return false

      if (!query) return true

      const nameMatch = skill.name.toLowerCase().includes(query)
      const descMatch = skill.description.toLowerCase().includes(query)
      const tagMatch = skill.tags.some(t => t.toLowerCase().includes(query))
      const commandMatch = skill.command?.toLowerCase().includes(query)

      return nameMatch || descMatch || tagMatch || commandMatch
    })

    // Try fetching from skills.sh official API if available
    const oidcToken = process.env.VERCEL_OIDC_TOKEN
    let externalSkills: AgentSkill[] = []

    if (query) {
      try {
        const skillsShUrl = `https://skills.sh/api/v1/skills/search?q=${encodeURIComponent(query)}&limit=10`
        const headers: Record<string, string> = {
          'Accept': 'application/json',
        }
        if (oidcToken) {
          headers['Authorization'] = `Bearer ${oidcToken}`
        }

        const res = await fetch(skillsShUrl, {
          headers,
          next: { revalidate: 300 }, // 5 min cache
          signal: AbortSignal.timeout(3000), // 3s timeout
        })

        if (res.ok) {
          const json = await res.json()
          const items: SkillsShItem[] = json.data || json.skills || []

          externalSkills = items
            .filter(item => !matchedCurated.some(c => c.id === item.id || c.slug === item.slug))
            .map(item => ({
              id: item.id || item.slug,
              name: item.name || item.slug,
              slug: item.slug || item.id,
              category: 'design' as const,
              author: item.source || 'skills.sh',
              source: item.source || item.installUrl,
              installs: item.installs || 100,
              description: item.description || `Agent skill from ${item.source} on skills.sh`,
              tags: ['community', 'skills.sh'],
              content: `## SKILL: ${item.name}\nSource: ${item.source}\nStrictly adhere to modern Next.js and Tailwind CSS standards.`,
            }))
        }
      } catch (externalErr) {
        // Silently fallback to curated skills on external network timeout
        console.warn('[skills.sh API search fallback]:', externalErr)
      }
    }

    const combined = [...matchedCurated, ...externalSkills]

    return NextResponse.json({
      success: true,
      skills: combined,
      count: combined.length,
      isLiveConnected: !!oidcToken,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch skills'
    console.error('api/skills error:', err)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
