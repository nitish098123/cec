import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const CERT_CDN_BASE =
  'https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/'

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
    return NextResponse.redirect(`${CERT_CDN_BASE}${cecWithPrefixMatch[1]}`, 308)
  }

  const directFolderMatch = normalizedPathname.match(
    /^\/((?:CEC|CA)-[^/]+\/[^/]+)$/i
  )
  if (directFolderMatch) {
    return NextResponse.redirect(`${CERT_CDN_BASE}${directFolderMatch[1]}`, 308)
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
