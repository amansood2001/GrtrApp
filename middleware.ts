import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const referer = req.headers.get('referer') || ''
  const previewMatch = referer.match(/\/api\/preview\/([a-zA-Z0-9_-]+)/)
  
  // Use chatId from referer or fallback to preview session cookie
  const chatId = previewMatch ? previewMatch[1] : req.cookies.get('v0_preview_chat')?.value

  if (chatId) {
    const pathname = req.nextUrl.pathname

    if (pathname.startsWith('/_next/') || pathname === '/v0-runtime-dist.js') {
      const url = req.nextUrl.clone()
      url.pathname = `/api/preview/${chatId}${pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/_next/:path*',
    '/v0-runtime-dist.js',
  ],
}
