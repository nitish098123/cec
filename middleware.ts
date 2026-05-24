import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // Some shared links contain trailing spaces (encoded as %20), which break CDN lookups.
  const normalizedPathname = pathname.replace(/(?:%20|\s)+$/g, '')

  const withPathHeader = (response: NextResponse) => {
    response.headers.set("x-pathname", normalizedPathname)
    return response
  }

  const normalizeLegacyCertPath = (rawPath: string): string | null => {
    const trimmed = rawPath.replace(/^\/+|(?:%20|\s)+$/g, '')
    const parts = trimmed.split('/').filter(Boolean)
    if (parts.length < 2) return null

    const folder = parts[0]
    const file = parts[parts.length - 1]
    if (!/^(CEC|CA)/i.test(folder)) return null

    // Some old shared links replace "-" with spaces/underscores.
    const normalizedFolder = folder
      .replace(/[%\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/-$/g, '')

    return `${normalizedFolder}/${file}`
  }

  // Legacy IITR certificate URLs, e.g.
  // /cec/CEC-1003-2021-22/cert-CEC-1003-2021-22-72.jpg
  // /CEC-1003-2021-22/cert-CEC-1003-2021-22-72.jpg
  const cecWithPrefixMatch = normalizedPathname.match(
    /^\/cec\/((?:CEC|CA)[^/]*\/[^/]+)$/i
  )
  if (cecWithPrefixMatch) {
    const certPath = normalizeLegacyCertPath(cecWithPrefixMatch[1])
    if (!certPath) return withPathHeader(NextResponse.next())
    const rewriteUrl = request.nextUrl.clone()
    // If the app is mounted under `/cec` in production, route must include the prefix.
    rewriteUrl.pathname = '/cec/certificate-view'
    rewriteUrl.searchParams.set('certPath', certPath)
    return withPathHeader(NextResponse.rewrite(rewriteUrl))
  }

  const directFolderMatch = normalizedPathname.match(
    /^\/((?:CEC|CA)[^/]*\/[^/]+)$/i
  )
  if (directFolderMatch) {
    const certPath = normalizeLegacyCertPath(directFolderMatch[1])
    if (!certPath) return withPathHeader(NextResponse.next())
    const rewriteUrl = request.nextUrl.clone()
    // Keep this aligned with `/cec/...` handling so both domains/environments
    // render through the same certificate viewer page.
    rewriteUrl.pathname = '/cec/certificate-view'
    rewriteUrl.searchParams.set('certPath', certPath)
    return withPathHeader(NextResponse.rewrite(rewriteUrl))
  }

  return withPathHeader(NextResponse.next())
}

export const config = {
  // Attach pathname for server layout chrome, but skip Next.js static assets.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
