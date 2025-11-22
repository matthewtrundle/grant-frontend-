import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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
  "/onboarding(.*)",
  "/digilab-test(.*)",
  "/digilab-refined(.*)",
  "/digilab-timeline(.*)",
  "/test-timeline(.*)",
  "/process-timeline-test(.*)",
  "/showcase-timeline(.*)",
  "/test-3d(.*)",
  "/api/webhooks/stripe(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // Public routes don't need authentication
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // Protect non-public routes
  const { userId, sessionClaims } = await auth.protect();

  // Check if user has completed onboarding
  const onboardingComplete = sessionClaims?.publicMetadata?.onboardingComplete as boolean | undefined;
  const isOnboardingRoute = request.nextUrl.pathname.startsWith("/onboarding");

  // Redirect to onboarding if not completed (unless already on onboarding page)
  if (userId && !onboardingComplete && !isOnboardingRoute) {
    const onboardingUrl = new URL("/onboarding", request.url);
    return NextResponse.redirect(onboardingUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
