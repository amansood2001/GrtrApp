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
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="3">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Compiling Executive Sandbox...</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #08090a;
      color: #f4f4f5;
      font-family: Inter, system-ui, -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
      overflow: hidden;
    }
    .loader-card {
      background: linear-gradient(145deg, #12151a, #0b0d10);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 36px 40px;
      text-align: center;
      max-width: 460px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }
    .spinner {
      width: 44px;
      height: 44px;
      border: 3px solid rgba(139, 92, 246, 0.15);
      border-top-color: #8b5cf6;
      border-radius: 50%;
      animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      margin: 0 auto 24px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    h2 { font-size: 19px; font-weight: 600; margin: 0 0 10px; color: #fff; letter-spacing: -0.02em; }
    p { font-size: 13px; color: #8b8e98; margin: 0 0 24px; line-height: 1.6; }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      color: #c4b5fd;
      background: rgba(139, 92, 246, 0.1);
      border: 1px solid rgba(139, 92, 246, 0.25);
      padding: 6px 14px;
      border-radius: 99px;
    }
    .pulse {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #a78bfa;
      box-shadow: 0 0 10px #a78bfa;
      animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } }
  </style>
</head>
<body>
  <div class="loader-card">
    <div class="spinner"></div>
    <h2>Compiling Live Portfolio Sandbox</h2>
    <p>Assembling live interactive components, responsive architecture & spring physics. The sandbox will load automatically in seconds.</p>
    <div class="badge">
      <span class="pulse"></span>
      <span>Live compile in progress · Auto-refreshing</span>
    </div>
  </div>
</body>
</html>`
      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0',
        },
      })
    }

    // Proxy the request through v0's official preview handler
    const previewResponse = await fetchPreview({
      request: req,
      preview: previewRes.data,
      path,
      fallbackUrl: previewRes.data.url,
    })

    const contentType = previewResponse.headers.get('content-type') || ''

    // If serving HTML, rewrite root-relative asset URLs so the browser loads CSS/JS through this proxy
    if (contentType.includes('text/html')) {
      let html = await previewResponse.text()
      const prefix = `/api/preview/${chatId}`

      // Inject base tag & essential reset styling for links
      const injection = `<base href="${prefix}/">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    a { text-decoration: none !important; color: inherit !important; }
    body { background-color: #08090a !important; color: #f4f4f5 !important; font-family: Inter, system-ui, sans-serif !important; margin: 0; }
  </style>`

      if (html.includes('<head>')) {
        html = html.replace('<head>', `<head>\n  ${injection}`)
      }

      // Rewrite /_next/ to proxy prefix so chunks and CSS stylesheets are routed correctly
      html = html.replaceAll('/_next/', `${prefix}/_next/`)

      // Rewrite root-relative src and href for assets
      html = html.replace(/(href|src)=["']\/([a-zA-Z0-9_\-\.\/]+)["']/g, (match, attr, relPath) => {
        if (relPath.startsWith('api/preview') || relPath.startsWith('http://') || relPath.startsWith('https://')) {
          return match
        }
        return `${attr}="${prefix}/${relPath}"`
      })

      return new NextResponse(html, {
        status: previewResponse.status,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0',
        },
      })
    }

    return previewResponse
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
