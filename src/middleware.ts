import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*"], // Only protect routes starting with /admin
};

export function middleware(req: NextRequest) {
  // 1. Check for Basic Auth header
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    // REPLACE 'admin' and 'password123' with strong credentials!
    // Ideally use process.env.ADMIN_USER and process.env.ADMIN_PASS
    if (user === "admin" && pwd === "password123") {
      return NextResponse.next();
    }
  }

  // 2. If no auth or wrong password, ask for it
  const url = req.nextUrl;
  url.pathname = "/api/auth";

  return new NextResponse("Auth Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
