// @ts-nocheck
import { render, screen } from "./setupTests";
import { App } from "./App";

describe("App", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });
  afterAll(() => {
    window.scrollTo.mockRestore();
  });

  it("renders without crashing", () => {
    render(<App />);
  });

  it("renders the header when isWithHeader is true", () => {
    render(<App />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("renders the footer when isWithFooter is true", () => {
    render(<App />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
