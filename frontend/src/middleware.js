import { NextResponse,NextRequest } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ['/'];
const publicRoutes = ['/login','/signup']

export  default async  function middleware(req) {
    const path = req.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = cookies().get('tokenCookie')?.value;



    if(cookie && isPublicRoute)  {
        return NextResponse.redirect(new URL('/', req.nextUrl))

    }

    else if(!cookie && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))

    }

    return NextResponse.next()




}