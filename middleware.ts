import { NextRequest, NextResponse } from "next/server";

const unprotectedRoutes = ["/", "/forgot-password", "/reset-password"];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("prolite-session")?.value;
  const currentPath = request.nextUrl.pathname;

  function isProtectedRoute(path: string) {
    return !unprotectedRoutes.includes(path);
  }

  if (currentUser) {
    // User is authenticated
    if (!isProtectedRoute(currentPath)) {
      // If currentUser and trying to access a non-protected route, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    // User is not authenticated
    if (!unprotectedRoutes.includes(currentPath)) {
      // If no currentUser and trying to access a protected route, redirect to "/"
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
