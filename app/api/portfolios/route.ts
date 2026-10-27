import { NextRequest, NextResponse } from 'next/server'
import { dbGetPortfolios, dbUpsertPortfolio, dbDeletePortfolio } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId') || undefined

    const portfolios = await dbGetPortfolios(userId)
    return NextResponse.json({ success: true, portfolios })
  } catch (err: any) {
    console.error('Error fetching portfolios:', err)
    return NextResponse.json({ error: err?.message || 'Failed to fetch portfolios' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { chat_id, candidate_name, target_company, target_role, strategic_angle, blueprint, theme, status, user_id } = body

    if (!chat_id || !candidate_name || !target_company || !target_role) {
      return NextResponse.json(
        { error: 'chat_id, candidate_name, target_company, and target_role are required' },
        { status: 400 }
      )
    }

    const saved = await dbUpsertPortfolio({
      chat_id,
      candidate_name,
      target_company,
      target_role,
      strategic_angle,
      blueprint,
      theme,
      status,
      user_id,
    })

    return NextResponse.json({ success: true, portfolio: saved })
  } catch (err: any) {
    console.error('Error saving portfolio:', err)
    return NextResponse.json({ error: err?.message || 'Failed to save portfolio' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const chatId = searchParams.get('chatId')

    if (!chatId) {
      return NextResponse.json({ error: 'chatId is required' }, { status: 400 })
    }

    const ok = await dbDeletePortfolio(chatId)
    return NextResponse.json({ success: ok })
  } catch (err: any) {
    console.error('Error deleting portfolio:', err)
    return NextResponse.json({ error: err?.message || 'Failed to delete portfolio' }, { status: 500 })
  }
}
