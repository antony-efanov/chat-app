/**
 * Routes that does not require authentication
 */
export const publicRoutes: string[] = [];

/**
 * Routes that are used for authentication
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for api authentication routes
 * Routs that start with this prefix are used for API authentication
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/chat";

export const DEFAULT_LOGOUT_REDIRECT = "/auth/login";
