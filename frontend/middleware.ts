import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
    '/login',
]

const isPublicRoute = (path: string) => {
    return publicRoutes.includes(path);
}

function isTokenExpiring(token: string): boolean {
    try {
        const [, payload] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload));
        const expirationTime = decodedPayload.exp * 1000;
        const currentTime = Date.now();

        return expirationTime - currentTime < 15 * 60 * 1000;
    } catch {
        return true;
    }
}

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token');

    if (!accessToken && !isPublicRoute(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (accessToken && isPublicRoute(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (accessToken && !isPublicRoute(request.nextUrl.pathname)) {
        if (isTokenExpiring(accessToken.value)) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};