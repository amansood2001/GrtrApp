import { NextRequest, NextResponse } from 'next/server'
import { v0 } from 'v0'
import { recordPortfolioEvent } from '@/lib/analytics-tracker'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0
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

    const rawMessages = res.data?.messages || []
    const assistantMsg = rawMessages.find((m: any) => m.role === 'assistant')
    const isReady = !!assistantMsg && (assistantMsg.finishReason === 'stop' || assistantMsg.finishReason === 'length')

    // v0.messages.list returns newest first. Sort chronologically (oldest to newest) with turn stability.
    const sortedRaw = [...rawMessages].sort((a: any, b: any) => {
      const timeDiff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (timeDiff !== 0) return timeDiff
      if (a.role === 'user' && b.role === 'assistant') return -1
      if (a.role === 'assistant' && b.role === 'user') return 1
      return 0
    })

    const messages = sortedRaw.map((m: any) => {
      let content = m.content || ''
      // If content is empty string, extract conversational text from parts
      if (!content && Array.isArray(m.parts)) {
        const textParts = m.parts
          .filter((p: any) => p && (p.type === 'text' || typeof p.text === 'string'))
          .map((p: any) => p.text || '')
          .filter(Boolean)
        if (textParts.length > 0) {
          content = textParts.join('\n\n')
        }
      }

      return {
        id: m.id,
        role: m.role,
        content,
        parts: m.parts || [],
        finishReason: m.finishReason,
        createdAt: m.createdAt,
      }
    })

    return NextResponse.json(
      {
        success: true,
        messages,
        isReady,
        finishReason: assistantMsg?.finishReason || null,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    )
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve messages'
    console.error('api/chat GET error:', err)
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { chatId, message, contextLabel, attachments, attachedSkill } = await req.json()

    if (!chatId || !message) {
      return NextResponse.json(
        { success: false, error: 'Both chatId and message are required.' },
        { status: 400 }
      )
    }

    recordPortfolioEvent(chatId, {
      type: 'studio_update',
      title: 'Studio directive applied',
      description: message.length > 60 ? message.slice(0, 57) + '...' : message,
      timestamp: Date.now(),
    }).catch(() => {})

    const lower = message.toLowerCase().trim()
    // STRICT deployment match: Only intercept if the user explicitly asks solely for deployment or the share link.
    // Never intercept conversational prompts, critique, design requests, or negative phrasing (e.g. "Live reconciliation does not make sense").
    const isDeployRequest =
      lower === 'deploy and share the link on chat' ||
      lower === 'deploy' ||
      lower === 'publish' ||
      lower === 'share link' ||
      lower === 'get link' ||
      lower === 'deploy portfolio'

    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'grtr.app'
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

    // Extract remote skill from attachedSkill or from slash command (e.g. /ui-ux-pro-max)
    let skillId = attachedSkill?.id || attachedSkill?.skillId || ''
    let cleanedMessage = message

    if (!skillId) {
      const trimmed = message.trim()
      if (trimmed.startsWith('/')) {
        const potentialSlug = trimmed.slice(1).split(/\s+/)[0]
        if (potentialSlug) {
          skillId = potentialSlug
          cleanedMessage = trimmed.replace(new RegExp(`^\\/${potentialSlug}\\s*`), '').trim() || `Apply the ${potentialSlug} design system and standards.`
        }
      }
    }

    const v0Skills = skillId
      ? [{ type: 'remote' as const, id: skillId }]
      : undefined

    const streamResult = await v0.messages.sendStream({
      chatId,
      message: cleanedMessage,
      attachments: attachments && attachments.length > 0 ? (attachments as any) : undefined,
      skills: v0Skills,
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
