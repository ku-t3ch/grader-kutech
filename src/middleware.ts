import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerAuthSession } from "./server/auth";
import { withAuth } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export default withAuth(
  async function middleware(req: NextRequest) {
    // if (req.nextauth.token && req.nextUrl.pathname.startsWith("/staff")) {

    //   if (isStaff) {
    //     return NextResponse.next();
    //   } else {
    //     return NextResponse.rewrite(new URL("/404", req.nextUrl));
    //   }

    //   const token = await getToken({ req, secret: process.env.SECRET });
    //   if (token?.email === "teerut.sr@ku.th") {
    //     return NextResponse.next();
    //   }
    //   return NextResponse.rewrite(new URL("/404", req.url));
    return NextResponse.next();
    // }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (token) {
          return true;
        }
        return false;
      },
    },
  },
);

export const config = {
  matcher: [
    "/",
    "/((?!api|sign-in|error|_next/static|assets|fonts|_next/image|favicon.ico).*)",
  ],
};
