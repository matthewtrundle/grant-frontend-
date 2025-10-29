import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/pricing(.*)",
  "/about(.*)",
  "/contact(.*)",
  "/features(.*)",
  "/solutions(.*)",
  "/docs(.*)",
  "/blog(.*)",
  "/case-studies(.*)",
  "/careers(.*)",
  "/grants(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/stripe(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
