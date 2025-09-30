import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  console.log('Middleware triggered for path:', pathname)
  
  // Check if the path starts with 'CA'
  if (pathname.startsWith('/CA')) {
    // Remove the leading slash to get the CA path
    const caPath = pathname.substring(1)
    
    // Construct the CDN URL
    const cdnUrl = `https://d1bm918zlnq37v.cloudfront.net/CECTemp/Certificates/${caPath}`
    
    console.log('Redirecting to:', cdnUrl)
    
    // Redirect to the CDN URL
    return NextResponse.redirect(cdnUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
