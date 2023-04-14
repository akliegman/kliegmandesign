import ReactGA from "react-ga4";
import { GoogleAnalytics } from "./GoogleAnalytics";
import { appConfig } from "../../config/appConfig";
import { waitFor, shallow } from "../../setupTests";

jest.mock("react-ga4", () => ({
  initialize: jest.fn(),
  send: jest.fn(),
}));

describe("GoogleAnalytics", () => {
  it("should initialize and send a pageview event", async () => {
    shallow(<GoogleAnalytics />);

    await waitFor(() => {
      expect(ReactGA.initialize).toHaveBeenCalledWith(
        appConfig.googleAnalyticsId
      );
    });

    await waitFor(() => {
      expect(ReactGA.send).toHaveBeenCalledWith({
        hitType: "pageview",
        page: window.location.pathname + window.location.search,
      });
    });
  });
});
