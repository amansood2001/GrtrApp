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
  headline?: string
  bullets?: string[]
  description: string
  url: string
}

interface SkillSummaryData {
  headline?: string
  bullets: string[]
  description: string
}

// In-memory cache for official summaries parsed from skills.sh
const summaryCache = new Map<string, SkillSummaryData>()

export async function fetchSkillSummary(slug: string): Promise<SkillSummaryData> {
  if (summaryCache.has(slug)) {
    return summaryCache.get(slug)!
  }

  try {
    const res = await fetch(`https://skills.sh/${slug}`, {
      signal: AbortSignal.timeout(3500),
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GRTR/1.0; +https://grtr.app)',
      },
    })
    if (!res.ok) {
      return { bullets: [], description: '' }
    }
    const html = await res.text()

    // 1. Look for official Summary container on skills.sh
    let summaryHtml = ''
    const boxMatch = html.match(/class="[^"]*rounded-lg border border-border bg-muted[^"]*"[^>]*>([\s\S]*?)<\/div><\/div><\/div><div class="bg-background"/i)
    if (boxMatch) {
      summaryHtml = boxMatch[1]
    } else {
      const sectionMatch = html.match(/text-sm font-mono uppercase text-white mb-2[^>]*><span>SUMMARY<\/span><\/div>([\s\S]*?)<div class="bg-background"/i)
      if (sectionMatch) summaryHtml = sectionMatch[1]
    }

    let headline = ''
    const bullets: string[] = []

    if (summaryHtml) {
      const pMatch = summaryHtml.match(/<p><strong>([\s\S]*?)<\/strong><\/p>/i) || summaryHtml.match(/<p>([\s\S]*?)<\/p>/i)
      if (pMatch) {
        headline = pMatch[1]
          .replace(/<[^>]+>/g, '')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .trim()
      }

      const liMatches = summaryHtml.matchAll(/<li>([\s\S]*?)<\/li>/gi)
      for (const m of liMatches) {
        const text = m[1]
          .replace(/<code>([^<]+)<\/code>/g, '$1')
          .replace(/<[^>]+>/g, '')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .trim()
        if (text) bullets.push(text)
      }
    }

    // Fallback meta description if no summary box is found
    let metaDesc = ''
    const metaMatch = html.match(/<meta name="description" content="([^"]+)"/i)
    if (metaMatch && metaMatch[1]) {
      metaDesc = metaMatch[1]
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim()
    }

    const description = headline || metaDesc || ''
    const result: SkillSummaryData = {
      headline: headline || undefined,
      bullets,
      description,
    }
    summaryCache.set(slug, result)
    return result
  } catch {
    // Non-blocking fallback
  }

  return { bullets: [], description: '' }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const singleId = (searchParams.get('id') || '').trim()

    // Fast Single Skill Detail lookup (for on-demand modal expansion)
    if (singleId) {
      const summary = await fetchSkillSummary(singleId)
      return NextResponse.json({
        success: true,
        skill: {
          id: singleId,
          headline: summary.headline,
          bullets: summary.bullets,
          description: summary.description,
        },
      })
    }

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

    // Fetch official creator summaries for the top matching results in parallel
    const enrichedSkills: RemoteSkillItem[] = await Promise.all(
      rawSkills.map(async (item: any) => {
        const id = item.id || `${item.source}/${item.skillId}`
        const author = item.source ? item.source.split('/')[0] : 'skills.sh'
        const summary = await fetchSkillSummary(id)

        const skillId = item.skillId || item.name || id
        return {
          id,
          skillId,
          slug: id,
          name: item.name || item.skillId || id,
          source: item.source || '',
          installs: typeof item.installs === 'number' ? item.installs : 0,
          author,
          headline: summary.headline,
          bullets: summary.bullets,
          description: summary.description || `Open-source agent skill by ${author} from skills.sh (${(item.installs || 0).toLocaleString()} installs)`,
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
