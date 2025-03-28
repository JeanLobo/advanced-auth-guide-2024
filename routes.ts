/**
 * An array of routes that are publicly accessible.
 * These routes do not require authentication.
 */
export const publicRoutes: string[] = [
  "/auth/new-verification",
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect loged in users to the /settings route.
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for our auth API Route
 * Routes with this prefix are used for API Authentication Purposes.
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in.
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/demo"