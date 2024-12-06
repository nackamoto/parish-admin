import { auth } from "@/auth";
import { NextResponse } from "next/server";

export { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    if (publicRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.next();
    }
    if (privateRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(`/login`, req.nextUrl));
    }
  }
  // if authenticated already and on these route redirect to dashboard
  if ([`/login`, `/signup`].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

const publicRoutes = [`/login`, `/signup`];
const privateRoutes = [
  `/dashboard`,
  `/settings`,
  `/members`,
  `/church/members`,
  `/`,
];
