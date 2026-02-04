import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Proteger rota /admin (páginas apenas, não APIs)
  if (pathname === '/admin' && !pathname.includes('/api')) {
    const token = request.cookies.get('admin_token');

    if (!token) {
      // Redirecionar para login se não houver token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/api/admin/:path*'],
};
