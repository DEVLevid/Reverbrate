import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token');
    const isLoginPage = request.nextUrl.pathname === '/login';

    if (!accessToken && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (accessToken && isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};