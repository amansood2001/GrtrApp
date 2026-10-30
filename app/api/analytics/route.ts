import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioAnalytics, getAllPortfolioAnalytics, recordPortfolioEvent } from '@/lib/analytics-tracker'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const chatId = searchParams.get('chatId')
    const chatIdsParam = searchParams.get('chatIds')
    const all = searchParams.get('all')

    if (chatIdsParam || all === 'true') {
      const ids = chatIdsParam ? chatIdsParam.split(',').map(s => s.trim()).filter(Boolean) : undefined
      const events = await getAllPortfolioAnalytics(ids)
      return NextResponse.json({ success: true, events, totalViews: events.length })
    }

    if (!chatId) {
      const events = await getAllPortfolioAnalytics()
      return NextResponse.json({ success: true, events, totalViews: events.length })
    }

    const summary = await getPortfolioAnalytics(chatId)
    return NextResponse.json({ success: true, ...summary })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Analytics fetch failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { chatId, type = 'recruiter_view', title, description } = body

    if (!chatId) {
      return NextResponse.json({ error: 'chatId is required' }, { status: 400 })
    }

    const event = await recordPortfolioEvent(chatId, {
      type,
      title: title || 'Recruiter viewed live portfolio',
      description: description || 'Direct link session',
      timestamp: Date.now(),
    })

    return NextResponse.json({ success: true, event })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to record event' }, { status: 500 })
  }
}
