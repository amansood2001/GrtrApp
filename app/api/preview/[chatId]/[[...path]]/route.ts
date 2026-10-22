import { NextRequest, NextResponse } from 'next/server'
import { v0, fetchPreview } from 'v0'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type RouteContext = {
  params: Promise<{
    chatId: string
    path?: string[]
  }>
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { chatId, path = [] } = await context.params

    if (!chatId) {
      return new NextResponse('Chat ID required', { status: 400 })
    }

    const previewRes = await v0.chats.getPreview({ chatId })

    if (previewRes.error || !previewRes.data) {
      return new NextResponse(
        `Preview not available for chat ${chatId}: ${previewRes.error?.message || 'Not ready'}`,
        { status: 404 }
      )
    }

    // Proxy the request through v0's official preview handler
    return await fetchPreview({
      request: req,
      preview: previewRes.data,
      path,
      fallbackUrl: previewRes.data.url,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Preview proxy error'
    console.error('Preview error:', err)
    return new NextResponse(msg, { status: 500 })
  }
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { chatId, path = [] } = await context.params

    const previewRes = await v0.chats.getPreview({ chatId })
    if (previewRes.error || !previewRes.data) {
      return new NextResponse('Preview not available', { status: 404 })
    }

    return await fetchPreview({
      request: req,
      preview: previewRes.data,
      path,
      fallbackUrl: previewRes.data.url,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Preview error'
    return new NextResponse(msg, { status: 500 })
  }
}
