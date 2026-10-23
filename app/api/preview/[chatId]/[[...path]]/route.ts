import { NextRequest, NextResponse } from 'next/server'
import { v0, fetchPreview } from 'v0'
import { interactivePreviewSnippet } from '@/lib/preview-interactions'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type RouteContext = {
  params: Promise<{
    chatId: string
    path?: string[]
  }>
}

const previewCache = new Map<string, { data: any; expiry: number }>()

async function getCachedPreview(chatId: string) {
  const cached = previewCache.get(chatId)
  if (cached && cached.expiry > Date.now()) {
    return cached.data
  }
  const previewRes = await v0.chats.getPreview({ chatId })
  if (previewRes.data) {
    previewCache.set(chatId, { data: previewRes, expiry: Date.now() + 5 * 60 * 1000 })
  }
  return previewRes
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { chatId, path = [] } = await context.params

    if (!chatId) {
      return new NextResponse('Chat ID required', { status: 400 })
    }

    const previewRes = await getCachedPreview(chatId)

    if (previewRes.error || !previewRes.data) {
      let isTerminated = false
      let failureReason = ''

      try {
        const [chatRes, msgsRes] = await Promise.all([
          v0.chats.get({ chatId }).catch(() => null),
          v0.messages.list({ chatId, limit: 10 }).catch(() => null),
        ])

        const messages = (msgsRes as any)?.data?.messages || []
        const assistantMsg = messages.find((m: any) => m.role === 'assistant')
        const createdAt = (chatRes as any)?.data?.createdAt ? new Date((chatRes as any).data.createdAt).getTime() : 0
        const elapsedSec = createdAt ? Math.round((Date.now() - createdAt) / 1000) : 0

        if ((chatRes as any)?.error?.message) {
          isTerminated = true
          failureReason = `v0 API Error: ${(chatRes as any).error.message}. This chat does not exist in the active workspace or was created under another API key.`
        } else if (assistantMsg && assistantMsg.finishReason === 'other') {
          isTerminated = true
          failureReason = 'v0 API generation halted with reason "other". This occurs when the v0 account has $0.00 credits remaining or exceeded generation quotas.'
        } else if (elapsedSec > 120) {
          isTerminated = true
          failureReason = `Sandbox compilation timed out after ${elapsedSec}s. v0 did not produce any previewable files.`
        }
      } catch (diagErr) {
        console.error('Error checking chat diagnostics:', diagErr)
      }

      if (isTerminated) {
        const errorHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Generation Alert · Grtr</title>
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
    }
    .error-card {
      background: linear-gradient(145deg, #161118, #0f0c12);
      border: 1px solid rgba(239, 68, 68, 0.25);
      border-radius: 16px;
      padding: 36px 40px;
      text-align: center;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(239, 68, 68, 0.08);
    }
    .error-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ef4444;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: bold;
      margin: 0 auto 20px;
    }
    h2 { font-size: 20px; font-weight: 600; margin: 0 0 10px; color: #fff; letter-spacing: -0.02em; }
    p { font-size: 13.5px; color: #a1a1aa; margin: 0 0 20px; line-height: 1.6; }
    .troubleshoot-box {
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 14px 16px;
      text-align: left;
      font-size: 12px;
      color: #d4d4d8;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    .troubleshoot-box strong { color: #fff; }
    .chat-id {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      color: #a1a1aa;
      background: rgba(255,255,255,0.06);
      padding: 2px 6px;
      border-radius: 4px;
    }
    .btn-group {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    .btn {
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #ef4444;
      color: #fff;
      border: none;
    }
    .btn-primary:hover { background: #dc2626; }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.08);
      color: #f4f4f5;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .btn-secondary:hover { background: rgba(255, 255, 255, 0.12); }
  </style>
</head>
<body>
  <div class="error-card">
    <div class="error-icon">!</div>
    <h2>Portfolio Generation Interrupted</h2>
    <p>${failureReason}</p>
    <div class="troubleshoot-box">
      <strong>Action Required:</strong><br>
      • <strong>v0 Credits:</strong> Check and top up credits at <a href="https://v0.app/settings/billing" target="_blank" style="color: #60a5fa; text-decoration: underline;">v0.app/settings/billing</a>.<br>
      • <strong>API Key:</strong> Ensure your <code>V0_API_KEY</code> has an active balance.<br>
      • <strong>Chat Reference:</strong> <span class="chat-id">${chatId}</span>
    </div>
    <div class="btn-group">
      <button class="btn btn-secondary" onclick="window.location.reload()">Retry Verification</button>
      <a class="btn btn-primary" href="https://v0.app/settings/billing" target="_blank">Open v0 Billing ↗</a>
    </div>
  </div>
</body>
</html>`
        return new NextResponse(errorHtml, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store, max-age=0',
          },
        })
      }

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

    // Disable HMR client in preview proxy so it never hangs HTTP connection sockets
    if (path.some(p => p.includes('hmr'))) {
      return new NextResponse('/* HMR disabled in preview proxy */', {
        status: 200,
        headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
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

    // If serving HTML, inject TURBOPACK_CHUNK_BASE_PATH and rewrite /_next/ asset paths
    if (contentType.includes('text/html')) {
      let html = await previewResponse.text()

      // If sandbox is still compiling, return an animated compiling loader that auto-refreshes every 3s
      if (html.includes('Your v0 generation will show here') || html.includes('v0 generation will show here')) {
        const compilingHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="3">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Assembling Live Sandbox · Grtr</title>
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
    }
    .loader-card {
      background: linear-gradient(145deg, #131418, #0b0c0e);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      max-width: 480px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }
    .spinner {
      width: 44px;
      height: 44px;
      border: 3px solid rgba(255,255,255,0.1);
      border-top-color: #8b5cf6;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 24px;
    }
    h2 { font-size: 19px; font-weight: 600; margin: 0 0 8px; color: #fff; }
    p { font-size: 13px; line-height: 1.5; color: #a1a1aa; margin: 0 0 24px; }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 500;
      color: #8b5cf6;
      background: rgba(139, 92, 246, 0.1);
      border: 1px solid rgba(139, 92, 246, 0.2);
      padding: 6px 14px;
      border-radius: 999px;
    }
    .pulse {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #8b5cf6;
      animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } }
  </style>
</head>
<body>
  <div class="loader-card">
    <div class="spinner"></div>
    <h2>Compiling Live Portfolio Sandbox</h2>
    <p>Assembling React client components, design system tokens & interactive widgets. Auto-refreshing...</p>
    <div class="badge">
      <span class="pulse"></span>
      <span>Compiling code · Auto-refreshing in 3s</span>
    </div>
  </div>
</body>
</html>`
        return new NextResponse(compilingHtml, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store, max-age=0',
          },
        })
      }

      const prefix = `/api/preview/${chatId}`

      // Define Turbopack chunk base path right before any chunks load
      const chunkSetup = `<script>window.TURBOPACK_CHUNK_BASE_PATH = "${prefix}/_next/";</script>`

      // Rewrite /_next/ URLs cleanly with exactly one prefix
      html = html.replaceAll('/_next/', `${prefix}/_next/`)
      html = html.replaceAll(new RegExp(`(${prefix})+/_next/`, 'g'), `${prefix}/_next/`)

      // Rewrite /v0-runtime-dist.js through proxy
      html = html.replaceAll('src="/v0-runtime-dist.js"', `src="${prefix}/v0-runtime-dist.js"`)
      html = html.replaceAll('href="/v0-runtime-dist.js"', `href="${prefix}/v0-runtime-dist.js"`)

      if (html.includes('<head>')) {
        html = html.replace('<head>', `<head>\n  ${chunkSetup}`)
      } else {
        html = `${chunkSetup}\n${html}`
      }

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