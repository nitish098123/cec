import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Some shared links contain trailing spaces (encoded as %20), which break CDN lookups.
  const normalizedPathname = pathname.replace(/(?:%20|\s)+$/g, '')

  // Redirect favicon.ico to IIT logo
  if (normalizedPathname === '/favicon.ico') {
    return NextResponse.redirect(new URL('/IITR_logo.png', request.url), 301)
  }

  // Legacy IITR certificate URLs, e.g.
  // /cec/CEC-1003-2021-22/cert-CEC-1003-2021-22-72.jpg
  // /CEC-1003-2021-22/cert-CEC-1003-2021-22-72.jpg
  const cecWithPrefixMatch = normalizedPathname.match(
    /^\/cec\/((?:CEC|CA)-[^/]+\/[^/]+)$/i
  )
  if (cecWithPrefixMatch) {
    const rewriteUrl = request.nextUrl.clone()
    // If the app is mounted under `/cec` in production, route must include the prefix.
    rewriteUrl.pathname = '/cec/certificate-view'
    rewriteUrl.searchParams.set('certPath', cecWithPrefixMatch[1])
    return NextResponse.rewrite(rewriteUrl)
  }

  const directFolderMatch = normalizedPathname.match(
    /^\/((?:CEC|CA)-[^/]+\/[^/]+)$/i
  )
  if (directFolderMatch) {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = '/certificate-view'
    rewriteUrl.searchParams.set('certPath', directFolderMatch[1])
    return NextResponse.rewrite(rewriteUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Explicitly match certificate URL shapes and favicon.
  matcher: [
    '/favicon.ico',
    '/cec/:path*',
    '/CEC-:path*',
    '/CA-:path*',
  ],
}
