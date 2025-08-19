import { NextResponse } from 'next/server'

export function middleware(request) {
    const token = request.cookies.get('access_token')?.value
    const { pathname } = request.nextUrl

    if (!token && pathname === '/') {
        const url = request.nextUrl.clone()
        url.pathname = '/sign-up'
        return NextResponse.redirect(url)
    }


    if (token && (pathname === '/login' || pathname === '/sign-up')) {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login', '/sign-up'],
}
