// import { NextResponse } from "next/server";

// export { default } from "next-auth/middleware";

// export function middleware(request) {
//   const path = request.nextUrl.pathname;

//   console.log("Path", path);

//   const isPublicPath = path === "/login" || path === "/" || path === "/signup";

//   const isPrivatePath = path === "/dashboard";

//   const token = request.cookies.get("token")?.value || "";

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
//   }

//   if (isPrivatePath && !token) {
//     return NextResponse.redirect(new URL("/", request.nextUrl));
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
// }

// export const config = {
//   matcher: ["/login", "/", "/signup"],
// };

import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/" || path === "/signup";
  const isDashboard = path.startsWith("/dashboard");

  const token = request.cookies.get("token")?.value;
  const hasToken = !!token;

  // If the user is already authenticated
  if (hasToken) {
    // Prevent access to public paths like login, signup
    if (isPublicPath) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Otherwise allow access to dashboard paths
    else if (isDashboard) {
      return NextResponse.next();
    }
  }
  // If the user is not authenticated
  else {
    // Allow access to public paths
    if (isPublicPath) {
      return NextResponse.next();
    }
    // Redirect to the login page if attempting dashboard access
    else if (isDashboard) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If the path is not covered by our public or dashboard logic, default is next()
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/", "/signup", "/dashboard/:path*"],
};
