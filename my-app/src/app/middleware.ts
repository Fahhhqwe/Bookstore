import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies?.get("token")?.value;
    const protectedRoutes = ["/books"];
    const path = req.nextUrl.pathname;

    if (protectedRoutes.some((route) => path.startsWith(route)) && !token) {
        const redirectUrl = new URL("/login", req.url);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/books/:path*"],
};
