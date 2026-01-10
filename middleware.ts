import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // On récupère le cookie d'authentification
  const authCookie = request.cookies.get('supernova_auth');
  const isAuthenticated = authCookie?.value === 'true';

  const isLoginPage = request.nextUrl.pathname === '/login';
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  // Cas 1 : On est sur le dashboard mais sans auth -> Redirection Login
  if (isDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Cas 2 : On est sur le login mais DÉJÀ auth -> Redirection Dashboard
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};