import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]); // (.*) this is to catch all the routes after sign-in and sign-up

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
