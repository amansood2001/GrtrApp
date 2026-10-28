import { NextRequest, NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/api/preview(.*)',
  '/api/analytics(.*)',
  '/api/skills(.*)',
  '/v0-runtime-dist.js',
  '/_next(.*)',
  '/favicon.ico',
])

function handlePreviewRewrite(req: NextRequest) {
  const referer = req.headers.get('referer') || ''
  const previewMatch = referer.match(/\/api\/preview\/([a-zA-Z0-9_-]+)/)
  if (previewMatch) {
    const chatId = previewMatch[1]
    const pathname = req.nextUrl.pathname
    if (pathname.startsWith('/_next/') || pathname === '/v0-runtime-dist.js') {
      const url = req.nextUrl.clone()
      url.pathname = `/api/preview/${chatId}${pathname}`
      return NextResponse.rewrite(url)
    }
  }
  return null
}

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default clerkKey
  ? clerkMiddleware(async (auth, req) => {
      const rewrite = handlePreviewRewrite(req)
      if (rewrite) return rewrite

      // Protect /app and subpaths when Clerk is configured
      if (!isPublicRoute(req)) {
        await auth.protect()
      }

      const response = NextResponse.next()
      if (req.cookies.has('v0_preview_chat')) {
        response.cookies.delete('v0_preview_chat')
      }
      return response
    })
  : function middleware(req: NextRequest) {
      const rewrite = handlePreviewRewrite(req)
      if (rewrite) return rewrite

      const response = NextResponse.next()
      if (req.cookies.has('v0_preview_chat')) {
        response.cookies.delete('v0_preview_chat')
      }
      return response
    }

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/_next/:path*',
    '/v0-runtime-dist.js',
  ],
}
