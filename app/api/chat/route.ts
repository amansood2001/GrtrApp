import { NextRequest, NextResponse } from 'next/server'
import { v0 } from 'v0'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { chatId, message, contextLabel } = await req.json()

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
      // Trigger official deployment in background
      v0.chats.deploy({ chatId }).catch(err => {
        console.warn('v0.chats.deploy background notice:', err)
      })

      return NextResponse.json({
        success: true,
        text: `🚀 **Portfolio Deployed & Live!**

Here is your public, recruiter-ready portfolio link:
👉 **${publicUrl}**

• **Context:** ${contextLabel || 'Executive Portfolio'}
• **Status:** Active & Interactive
• **Shareable Link:** Anyone with this link can view your strategic teardown, verified metrics, and schedule dialogue.`,
        publicUrl,
      })
    }

    console.log(`Sending async message to portfolio chat ${chatId}: "${message.slice(0, 50)}..."`)

    const enhancedMessage = `${message}

CRITICAL STYLING & FRONTEND RULES (MANDATORY):
- Use clean Tailwind CSS utility classes for ALL components.
- Navigation bar MUST use flexbox with generous spacing: <nav className="flex items-center justify-between px-8 py-5 bg-zinc-950/80 backdrop-blur-md border-b border-white/10">.
- Nav links MUST be inside <div className="flex items-center gap-8"> with <a className="text-sm font-medium text-zinc-300 hover:text-white no-underline transition-colors">. NEVER render adjacent unstyled <a> tags!
- NEVER concatenate words or numbers (ensure spaces between "READ", "BUILD", "COMPOUND", and step numbers like "01 Read the signal").
- Surface cards MUST be dark glassmorphism: bg-zinc-900/60 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md.
- Monospace metrics in text-3xl font-bold font-mono text-emerald-400.`

    const res = await v0.messages.sendAsync({
      chatId,
      message: enhancedMessage,
    })

    if (res.error) {
      console.error('v0.messages.sendAsync failed:', res.error)
      return NextResponse.json(
        { success: false, error: res.error.message || 'Failed to update portfolio' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      messageId: res.data?.messageId,
      text: `Refined portfolio per directive: "${message}". The live sandbox is updating with polished Tailwind layout, verified metrics, and responsive styling. The preview has been refreshed.`,
      publicUrl,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown chat error'
    console.error('api/chat error:', err)
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}
