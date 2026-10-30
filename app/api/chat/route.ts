import { NextRequest, NextResponse } from 'next/server'
import { v0 } from 'v0'
import { recordPortfolioEvent } from '@/lib/analytics-tracker'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const maxDuration = 300

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
    const { chatId, message, contextLabel, attachments, attachedSkill, attachedSkills } = await req.json()

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

    // Extract remote skills from attachedSkills array, single attachedSkill, or slash command
    const skillsList: Array<{ id: string }> = []
    if (Array.isArray(attachedSkills) && attachedSkills.length > 0) {
      attachedSkills.forEach((s: any) => {
        const id = s.id || s.skillId || (typeof s === 'string' ? s : '')
        if (id && !skillsList.some(item => item.id === id)) {
          skillsList.push({ id })
        }
      })
    } else if (attachedSkill) {
      const id = attachedSkill.id || attachedSkill.skillId || (typeof attachedSkill === 'string' ? attachedSkill : '')
      if (id) skillsList.push({ id })
    }

    let cleanedMessage = message
    if (skillsList.length === 0) {
      const trimmed = message.trim()
      if (trimmed.startsWith('/')) {
        const potentialSlug = trimmed.slice(1).split(/\s+/)[0]
        if (potentialSlug) {
          skillsList.push({ id: potentialSlug })
          cleanedMessage = trimmed.replace(new RegExp(`^\\/${potentialSlug}\\s*`), '').trim() || `Apply the ${potentialSlug} design system and standards.`
        }
      }
    }

    const v0Skills = skillsList.length > 0
      ? skillsList.slice(0, 3).map(s => ({ type: 'remote' as const, id: s.id }))
      : undefined

    const v0ApiKey = process.env.V0_API_KEY
    if (!v0ApiKey) {
      return NextResponse.json({ success: false, error: 'V0_API_KEY is not configured on server.' }, { status: 500 })
    }

    const payload: Record<string, any> = {
      message: cleanedMessage,
    }
    if (attachments && attachments.length > 0) {
      payload.attachments = attachments
    }
    if (v0Skills && v0Skills.length > 0) {
      payload.skills = v0Skills
    }

    // Call v0 direct streaming endpoint. This guarantees immediate detection of quota limits (403)
    // or plan blocks without falling into the SDK's infinite retry loop.
    const v0Res = await fetch(`https://api.v0.dev/v2/chats/${chatId}/messages/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${v0ApiKey}`,
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify(payload),
    })

    if (!v0Res.ok) {
      const errData = await v0Res.json().catch(() => ({ message: v0Res.statusText }))
      const rawMsg = errData?.message || `v0 API error (${v0Res.status})`
      console.error(`v0 API error ${v0Res.status}:`, rawMsg)

      let friendlyMsg = rawMsg
      if (v0Res.status === 403 || rawMsg.toLowerCase().includes('daily message limit') || rawMsg.toLowerCase().includes('quota')) {
        friendlyMsg = 'You have reached your daily message limit. Please upgrade your plan to continue.'
      }

      return NextResponse.json(
        {
          success: false,
          error: friendlyMsg,
          statusCode: v0Res.status,
        },
        { status: v0Res.status === 403 ? 429 : 502 }
      )
    }

    if (!v0Res.body) {
      return NextResponse.json({ success: false, error: 'No response body stream received from v0.' }, { status: 502 })
    }

    const encoder = new TextEncoder()
    const reader = v0Res.body.getReader()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        // Immediately emit an initial event so client receives headers and establishes the SSE stream instantly
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              status: 'streaming',
              parts: [{ type: 'thinking', text: 'Analyzing inquiry and inspecting workspace...' }],
            })}\n\n`
          )
        )

        // Send keepalive pings every 8 seconds to prevent proxy / Vercel edge idle timeouts
        const keepAliveInterval = setInterval(() => {
          try {
            controller.enqueue(encoder.encode(': keepalive\n\n'))
          } catch {
            clearInterval(keepAliveInterval)
          }
        }, 8000)

        let buffer = ''
        let hasDone = false

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const blocks = buffer.split('\n\n')
            buffer = blocks.pop() || ''

            for (const block of blocks) {
              const lines = block.split('\n')
              let eventType = 'update'
              const dataLines: string[] = []

              for (const line of lines) {
                if (line.startsWith('event:')) {
                  eventType = line.replace(/^event:\s*/, '').trim()
                } else if (line.startsWith('data:')) {
                  dataLines.push(line.replace(/^data:\s*/, ''))
                }
              }

              if (dataLines.length === 0) continue
              const dataStr = dataLines.join('\n')

              let parsed: any
              try {
                parsed = JSON.parse(dataStr)
              } catch {
                parsed = { text: dataStr }
              }

              if (eventType === 'error') {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      status: 'error',
                      error: parsed.message || 'v0 generation error',
                    })}\n\n`
                  )
                )
                continue
              }

              if (eventType === 'done') {
                hasDone = true
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      status: 'done',
                      parts: parsed.parts || [],
                      publicUrl,
                    })}\n\n`
                  )
                )
                continue
              }

              // Normal update event
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    status: parsed.status || 'streaming',
                    parts: parsed.parts || [],
                    title: parsed.title,
                  })}\n\n`
                )
              )
            }
          }

          if (!hasDone) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  status: 'done',
                  parts: [],
                  publicUrl,
                })}\n\n`
              )
            )
          }
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
        } finally {
          clearInterval(keepAliveInterval)
        }
      },
      cancel() {
        reader.cancel().catch(() => {})
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
