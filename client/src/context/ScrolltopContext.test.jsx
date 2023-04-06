import { render, act, waitFor } from "../setupTests";
import { useLocation } from "react-router-dom";
import { ScrolltopProvider, useScrolltop } from "./ScrolltopContext";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("ScrolltopProvider", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });
  afterAll(() => {
    window.scrollTo.mockRestore();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("scrolls to top when location changes", () => {
    const { container } = render(
      <ScrolltopProvider>
        <div data-testid="test-div" style={{ height: "4000px" }}>
          Test
        </div>
      </ScrolltopProvider>
    );

    useLocation.mockReturnValueOnce({ pathname: "/route" });

    const testDiv = container.querySelector('[data-testid="test-div"]');

    act(() => {
      testDiv.dispatchEvent(new Event("scroll", { target: window }));
      window.scrollTop = 2000;
    });

    expect(window.scrollTop).toBe(2000);

    act(() => {
      useLocation.mockReturnValueOnce({ pathname: "/new-route" });
    });

    waitFor(() => {
      expect(window.scrollTop).toBe(0);
    });
  });

  it("provides an empty context to child components", () => {
    const TestComponent = () => {
      const context = useScrolltop();
      return <div data-testid="context">{JSON.stringify(context)}</div>;
    };

    const { container } = render(
      <ScrolltopProvider>
        <TestComponent />
      </ScrolltopProvider>
    );

    const contextDiv = container.querySelector('[data-testid="context"]');
    expect(contextDiv.textContent).toBe("{}");
  });
});
