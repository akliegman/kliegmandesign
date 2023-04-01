export const appConfig = {
  googleAnalyticsId: "G-EQ38B6FGRR",
  baseApiDomain:
    process.env.NODE_ENV === "production"
      ? "https://www.adamkliegman.com"
      : "http://localhost:3001",
};
