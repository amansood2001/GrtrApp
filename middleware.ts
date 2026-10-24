import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const referer = req.headers.get('referer') || ''
  const previewMatch = referer.match(/\/api\/preview\/([a-zA-Z0-9_-]+)/)

  // ONLY proxy assets when the request strictly originates from an active /api/preview/[chatId] iframe
  if (previewMatch) {
    const chatId = previewMatch[1]
    const pathname = req.nextUrl.pathname

    if (pathname.startsWith('/_next/') || pathname === '/v0-runtime-dist.js') {
      const url = req.nextUrl.clone()
      url.pathname = `/api/preview/${chatId}${pathname}`
      return NextResponse.rewrite(url)
    }
  }

  // Pass through cleanly for the main Grtr app
  const response = NextResponse.next()

  // Cleanse any poisoned preview cookies from the client browser
  if (req.cookies.has('v0_preview_chat')) {
    response.cookies.delete('v0_preview_chat')
  }

  return response
}

export const config = {
  matcher: [
    '/_next/:path*',
    '/v0-runtime-dist.js',
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
