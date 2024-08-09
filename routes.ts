/**
 * Routes that does not require authentication
 */
export const publicRoutes = ["/", "/settings"];

/**
 * Routes that are used for authentication
 */
export const authRoutes = [];

/**
 * The prefix for api authentication routes
 * Routs that start with this prefix are used for API authentication
 */
export const apiAuthPrefix = "/api/auth";

// TODO: тут надо искать либо последнюю открьітую комнату и подкидьівать ее либо пускать юзера в большую комнату
export const DEFAULT_LOGIN_REDIRECT = "/settings";
