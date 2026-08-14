import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth: proxy } = NextAuth(authConfig);

const authRoutes = ["/signin"];
const protectedRoutes = ["/dashboard"];

export default proxy((req) => {
    const path = req.nextUrl.pathname;

    if (req.auth && authRoutes.includes(path)) {
        const newUrl = new URL("/dashboard", req.nextUrl.origin)
        return NextResponse.redirect(newUrl)
    }

    // console.log(req.auth)

    if (!req.auth && protectedRoutes.find((rout) => path.startsWith(rout))) {
        const newUrl = new URL("/signin", req.nextUrl.origin)
        return NextResponse.redirect(newUrl)
    }

});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};