import ReactGA from "react-ga4";
import { GOOGLE_ANALYTICS_ID } from "../../config/appConfig";

export const GoogleAnalytics = () => {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID);
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
  return null;
};
