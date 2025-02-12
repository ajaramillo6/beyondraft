import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that require authentication
  const protectedRoutes = ['/dashboard', '/projects/create', '/workspace'];

  // Check if the current path matches a protected route
  const requiresAuth = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (requiresAuth) {
    // Check if user is authenticated
    const { isAuthenticated } = getKindeServerSession();
    const authenticated = await isAuthenticated();

    // If not authenticated, redirect to login
    if (!authenticated) {
      console.log(`Unauthenticated user, redirecting to login for: ${pathname}`);
      return NextResponse.redirect(
        new URL(
          `/api/auth/login?post_login_redirect_url=${pathname}`,
          request.url
        )
      );
    }

    console.log(`User is authenticated, allowing access to: ${pathname}`);
  }

  // Allow access to public routes like /preview/:fileId
  return NextResponse.next();
}

// Config to match routes for middleware
export const config = {
  matcher: [
    '/dashboard',
    '/projects/create',
    '/workspace/:path*',
    '/preview/:path*', // Include `/preview` to handle published check in middleware
  ],
};
