import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const session = await auth.api.getSession({
        headers: await headers()
})

    const user = session?.user;

    if(!user){

        const signInUrl = new URL("/sign-in", request.url);

    const callbackUrl =
      request.nextUrl.pathname + request.nextUrl.search;

    signInUrl.searchParams.set("callbackUrl", callbackUrl);

    return NextResponse.redirect(signInUrl);
    }
    
    return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ['/add-studio', '/booking-studio/:path', '/my-listing', '/my-booking'],
}