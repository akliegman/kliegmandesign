import ReactGA from "react-ga4";
import { appConfig } from "../../../config/appConfig";

export const GoogleAnalytics = () => {
  ReactGA.initialize(appConfig.googleAnalyticsId);
  ReactGA.pageview(window.location.pathname + window.location.search);
  return null;
};
