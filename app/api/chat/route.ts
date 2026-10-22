import { NextRequest, NextResponse } from 'next/server'
import { v0 } from 'v0'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { chatId, message } = await req.json()

    if (!chatId || !message) {
      return NextResponse.json(
        { success: false, error: 'Both chatId and message are required.' },
        { status: 400 }
      )
    }

    console.log(`Sending message to v0 chat ${chatId}: "${message.slice(0, 50)}..."`)

    const res = await v0.messages.send({
      chatId,
      message,
    })

    if (res.error) {
      console.error('v0.messages.send failed:', res.error)
      return NextResponse.json(
        { success: false, error: res.error.message || 'Failed to update portfolio' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      messageId: res.data?.id,
      finishReason: res.data?.finishReason,
      text: res.data?.content || 'Changes applied to live preview.',
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown chat error'
    console.error('api/chat error:', err)
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}
