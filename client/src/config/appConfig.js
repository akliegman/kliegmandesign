const GOOGLE_ANALYTICS_ID = "G-EQ38B6FGRR";
const BASE_API_DOMAIN =
  process.env.NODE_ENV === "production"
    ? "https://www.adamkliegman.com"
    : "http://localhost:3001";
const COOKIE_NAME = "cookiesAccepted__adamkliegman";
const COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: true,
};

export { GOOGLE_ANALYTICS_ID, BASE_API_DOMAIN, COOKIE_NAME, COOKIE_OPTIONS };
