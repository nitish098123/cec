import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Redirect favicon.ico to IIT logo
  if (pathname === '/favicon.ico') {
    return NextResponse.redirect(new URL('/IITR_logo.png', request.url), 301)
  }
  
  // Only process paths that start with '/CA' - early return for all other paths
  if (pathname.startsWith('/CA')) {
    const caPath = pathname.substring(1)
    const cdnUrl = `https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/${caPath}`
    
    return NextResponse.redirect(cdnUrl)
  }
  
  // Fast return for all other routes - no processing needed
  return NextResponse.next()
}

export const config = {
  // Match all routes except static files and API routes
  // The middleware logic will efficiently filter for CA paths only
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     */
    '/((?!api|_next/static|_next/image).*)',
  ],
}
