import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export interface RemoteSkillItem {
  id: string
  skillId: string
  slug: string
  name: string
  source: string
  installs: number
  author: string
  description: string
  url: string
}

// In-memory cache for official descriptions fetched from skills.sh
const descriptionCache = new Map<string, string>()

async function fetchSkillDescription(slug: string): Promise<string> {
  if (descriptionCache.has(slug)) {
    return descriptionCache.get(slug)!
  }

  try {
    const res = await fetch(`https://skills.sh/${slug}`, {
      signal: AbortSignal.timeout(2500),
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GRTR/1.0; +https://grtr.app)',
      },
    })
    if (!res.ok) return ''
    const html = await res.text()
    const match = html.match(/<meta name="description" content="([^"]+)"/)
    if (match && match[1]) {
      const cleaned = match[1]
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim()
      descriptionCache.set(slug, cleaned)
      return cleaned
    }
  } catch {
    // Non-blocking fallback
  }

  return ''
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = (searchParams.get('q') || '').trim()

    // Exactly like v0: If the search query is empty, do not preload any restricted subset.
    // Return an empty list so the user is prompted to type.
    if (!query) {
      return NextResponse.json({
        success: true,
        skills: [],
        count: 0,
      })
    }

    const skillsShUrl = `https://skills.sh/api/search?q=${encodeURIComponent(query)}&limit=25`
    const searchRes = await fetch(skillsShUrl, {
      signal: AbortSignal.timeout(4000),
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!searchRes.ok) {
      return NextResponse.json({
        success: false,
        skills: [],
        error: `skills.sh returned status ${searchRes.status}`,
      })
    }

    const data = await searchRes.json()
    const rawSkills = Array.isArray(data.skills) ? data.skills : []

    // Fetch official creator descriptions for the top matching results in parallel
    const enrichedSkills: RemoteSkillItem[] = await Promise.all(
      rawSkills.map(async (item: any) => {
        const id = item.id || `${item.source}/${item.skillId}`
        const author = item.source ? item.source.split('/')[0] : 'skills.sh'
        const desc = await fetchSkillDescription(id)

        const skillId = item.skillId || item.name || id
        return {
          id,
          skillId,
          slug: skillId,
          name: item.name || item.skillId || id,
          source: item.source || '',
          installs: typeof item.installs === 'number' ? item.installs : 0,
          author,
          description: desc || `Open-source agent skill by ${author} from skills.sh (${(item.installs || 0).toLocaleString()} installs)`,
          url: `https://skills.sh/${id}`,
        }
      })
    )

    return NextResponse.json({
      success: true,
      skills: enrichedSkills,
      count: enrichedSkills.length,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to search skills.sh'
    console.error('api/skills error:', err)
    return NextResponse.json({ success: false, skills: [], error: message }, { status: 500 })
  }
}
