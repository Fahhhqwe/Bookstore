import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // ตรวจสอบ cookie อย่างปลอดภัย
    const cookie = req.cookies.get("token");
    const token = cookie?.value ?? null;

    // routes ที่ต้องล็อกอิน
    const protectedRoutes = ["/books"];
    const path = req.nextUrl.pathname || "/";

    // ถ้าเข้าหน้า protected แต่ไม่มี token → redirect ไป login
    if (protectedRoutes.some(route => path.startsWith(route)) && !token) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = "/login";
        return NextResponse.redirect(redirectUrl);
    }

    // ถ้าไม่มีปัญหา → next
    return NextResponse.next();
}

// กำหนด matcher ให้ middleware ทำงานกับ /books และ subpath
export const config = {
    matcher: ["/books/:path*"],
};
