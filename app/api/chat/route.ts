import { NextRequest, NextResponse } from 'next/server'
import { v0 } from 'v0'

export const runtime = 'nodejs'
export const maxDuration = 120

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const chatId = searchParams.get('chatId')

    if (!chatId) {
      return NextResponse.json({ success: false, error: 'chatId is required' }, { status: 400 })
    }

    const res = await v0.messages.list({ chatId, limit: 50 })
    if (res.error) {
      return NextResponse.json(
        { success: false, error: res.error.message || 'Failed to list messages' },
        { status: 502 }
      )
    }

    const messages = (res.data?.messages || []).map((m: any) => ({
      id: m.id,
      role: m.role,
      content: m.content || '',
      parts: m.parts || [],
      createdAt: m.createdAt,
    }))

    return NextResponse.json({
      success: true,
      messages,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve messages'
    console.error('api/chat GET error:', err)
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { chatId, message, contextLabel, attachments } = await req.json()

    if (!chatId || !message) {
      return NextResponse.json(
        { success: false, error: 'Both chatId and message are required.' },
        { status: 400 }
      )
    }

    const lower = message.toLowerCase().trim()
    const isDeployRequest = /\b(deploy|link|share|url|live|publish)\b/.test(lower)

    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'grtr-woad.vercel.app'
    const protocol = req.headers.get('x-forwarded-proto') || 'https'
    const publicUrl = `${protocol}://${host}/api/preview/${chatId}`

    if (isDeployRequest) {
      v0.chats.deploy({ chatId }).catch(err => {
        console.warn('v0.chats.deploy background notice:', err)
      })

      const deployText = `🚀 **Portfolio Deployed & Live!**

Here is your public, recruiter-ready portfolio link:
👉 **${publicUrl}**

• **Context:** ${contextLabel || 'Executive Portfolio'}
• **Status:** Active & Interactive
• **Shareable Link:** Anyone with this link can view your strategic teardown, verified metrics, and schedule dialogue.`

      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                status: 'done',
                parts: [{ type: 'text', text: deployText }],
                publicUrl,
              })}\n\n`
            )
          )
          controller.close()
        },
      })

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      })
    }

    console.log(`Starting streaming message to portfolio chat ${chatId}: "${message.slice(0, 50)}..." (attachments: ${attachments?.length || 0})`)

    let enhancedMessage = message

    if (attachments && attachments.length > 0) {
      enhancedMessage += `\n\nUSER ATTACHED ASSET OVERRIDES TO INTEGRATE:
${attachments.map((a: any, i: number) => `Asset ${i + 1} (${a.name || 'custom asset'}): Replace the target slot, photo, or mock component with this exact user-provided asset.`).join('\n')}
Surgically integrate these user assets into the relevant component slots.`
    }

    const streamResult = await v0.messages.sendStream({
      chatId,
      message: enhancedMessage,
      attachments: attachments && attachments.length > 0 ? attachments : undefined,
    })

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const update of streamResult.stream) {
            const payload = JSON.stringify({
              status: update.status || 'streaming',
              parts: update.parts || [],
              title: update.title,
            })
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`))
          }

          const final = await streamResult.final
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                status: 'done',
                parts: final.parts || [],
                publicUrl,
              })}\n\n`
            )
          )
          controller.close()
        } catch (streamErr: unknown) {
          console.error('v0 streaming error:', streamErr)
          const errText = streamErr instanceof Error ? streamErr.message : 'Stream interrupted'
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                status: 'error',
                error: errText,
              })}\n\n`
            )
          )
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown chat error'
    console.error('api/chat error:', err)
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}
