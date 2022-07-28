import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import nookies from 'nookies'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('token')
  if (!cookie) return NextResponse.redirect(new URL('/auth', req.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/lobby/:path*', '/game/:path*'],
}
