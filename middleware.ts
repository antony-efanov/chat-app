import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import {NextAuthRequest} from "next-auth/lib";
import {AppRouteHandlerFnContext} from "next-auth/lib/types";


const { auth } = NextAuth(authConfig);

export default auth((req: NextAuthRequest, ctx: AppRouteHandlerFnContext) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const loginRoute = "/auth/login";
  const registerRoute = "/auth/register"

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  // TODO: проверить почему infinite loop
  if (!isLoggedIn && !isPublicRoute && nextUrl.pathname !== loginRoute && nextUrl.pathname !== registerRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
