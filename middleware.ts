import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = [
  '/dashboard',
  '/exam',
  '/tutor',
  '/analytics',
  '/clinic',
  '/flashcards',
  '/task-list',
  '/profile',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // In Next.js SSR context, we inspect cookie or session header
  const authCookie = request.cookies.get('rbt_ai_auth_session')?.value;

  if (isProtected && !authCookie) {
    // Allows soft client-side AuthContext fallback while providing middleware protection structure
    const response = NextResponse.next();
    response.headers.set('x-rbt-auth-required', 'true');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/exam/:path*',
    '/tutor/:path*',
    '/analytics/:path*',
    '/clinic/:path*',
    '/flashcards/:path*',
    '/task-list/:path*',
    '/profile/:path*',
  ],
};
