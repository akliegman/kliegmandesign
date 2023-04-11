import { render, screen } from "../setupTests";
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

  // it("scrolls to top when location changes", async () => {
  //   render(
  //     <ScrolltopProvider>
  //       <div data-testid="test-div" style={{ height: "4000px" }}>
  //         Test
  //       </div>
  //     </ScrolltopProvider>
  //   );

  //   // navigate to a new page
  //   useLocation.mockReturnValueOnce({ pathname: "/test" });

  //   const testDiv = screen.getByTestId("test-div");

  //   act(() => {
  //     window.scrollTop = 2000;

  //     testDiv.dispatchEvent(new Event("scroll"));
  //   });

  //   // go to new page
  //   useLocation.mockReturnValueOnce({ pathname: "/test-2" });

  //   await waitFor(() => {
  //     expect(window.scrollTo).toHaveBeenCalledTimes(1);
  //   });

  //   expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  // });

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
