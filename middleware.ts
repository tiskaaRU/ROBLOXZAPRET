import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const country = req.geo?.country || 'UNKNOWN';

    // Geo-blocking for Ukraine (UA)
    if (country === 'UA') {
        // Prevent infinite redirect loop
        if (!req.nextUrl.pathname.startsWith('/access-denied')) {
            const url = req.nextUrl.clone();
            url.pathname = '/access-denied';
            url.searchParams.set('reason', 'geo');
            console.log(`Blocking access from ${country}`);
            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
