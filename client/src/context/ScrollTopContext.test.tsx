// @ts-nocheck
import { render, screen, waitFor, fireEvent } from "../setupTests";
import { ScrolltopProvider, useScrolltop } from "./ScrolltopContext";

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

  it("scrolls to top when location changes", async () => {
    const TestComponent = () => {
      return (
        <div data-testid="context" style={{ height: "4000px" }}>
          <a href="/new-route">Link</a>
        </div>
      );
    };

    render(
      <ScrolltopProvider>
        <TestComponent />
      </ScrolltopProvider>
    );

    fireEvent.scroll(window, {
      target: { scrollY: 2000 },
    });

    fireEvent.click(screen.getByText("Link"));

    await waitFor(() => {
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });

  it("provides an empty context to child components", () => {
    const TestComponent = () => {
      const context = useScrolltop();
      return <div data-testid="context">{JSON.stringify(context)}</div>;
    };

    render(
      <ScrolltopProvider>
        <TestComponent />
      </ScrolltopProvider>
    );

    const contextDiv = screen.getByTestId("context");
    expect(contextDiv.textContent).toBe("{}");
  });
});
