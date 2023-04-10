import ReactGA from "react-ga4";
import { GoogleAnalytics } from "./GoogleAnalytics";
import { appConfig } from "../../config/appConfig";
import { waitFor, render } from "../../setupTests";

// Mock the ReactGA functions
jest.mock("react-ga4", () => ({
  initialize: jest.fn(),
  send: jest.fn(),
}));

describe("GoogleAnalytics", () => {
  it("should initialize and send a pageview event", () => {
    const wrapper = render(<GoogleAnalytics />);

    waitFor(() => {
      expect(ReactGA.initialize).toHaveBeenCalledWith(
        appConfig.googleAnalyticsId
      );

      expect(ReactGA.send).toHaveBeenCalledWith({
        hitType: "pageview",
        page: window.location.pathname + window.location.search,
      });

      expect(wrapper.type()).toBeNull();
    });
  });
});
