import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = [
  "/dashboard",
  "/dashboard/users",
  "/contentsManagement",
  "/users",
  "/users/manage-roles",
  "/users/manage-roles/add",
  "/settings",
  "/auditLog",
];
const publicRoutes = ["/login", "/setup", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  //   const session = await decrypt(cookie);
  console.log(path);

  //    && !session?.userId
  // 4. Redirect to /login if the user is not authenticated
  if (path === "/" && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (path === "/" && cookie) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isProtectedRoute && (!cookie || cookie === undefined)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
