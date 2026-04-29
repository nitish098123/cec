import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const CERT_CDN_BASE =
  'https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect favicon.ico to IIT logo
  if (pathname === '/favicon.ico') {
    return NextResponse.redirect(new URL('/IITR_logo.png', request.url), 301)
  }

  // Legacy IITR certificate URLs, e.g.
  // https://iitr.ac.in/cec/CEC-1003-2021-22/cert-CEC-1003-2021-22-72.jpg
  if (pathname.startsWith('/cec/CEC-')) {
    const certPath = pathname.slice('/cec/'.length)
    return NextResponse.redirect(`${CERT_CDN_BASE}${certPath}`)
  }

  if (pathname.startsWith('/CEC-')) {
    const certPath = pathname.slice(1)
    return NextResponse.redirect(`${CERT_CDN_BASE}${certPath}`)
  }

  // Newer certificate paths, e.g. /CA-16-2024-25/02.jpg
  if (pathname.startsWith('/CA')) {
    const caPath = pathname.substring(1)
    return NextResponse.redirect(`${CERT_CDN_BASE}${caPath}`)
  }

  return NextResponse.next()
}

export const config = {
  // Match all routes except static files and API routes; middleware filters cert paths
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
