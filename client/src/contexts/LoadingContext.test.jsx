import { render, renderHook, screen, waitFor } from "../setupTests";
import { LoadingContext, LoadingProvider } from "./LoadingContext";
import { useContext } from "react";
import { useMountPage } from "../hooks/useMountPage";

describe("LoadingProvider", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders the page spinner while page is loading", () => {
    const { result } = renderHook(() => useContext(LoadingContext), {
      wrapper: LoadingProvider,
    });

    expect(result.current.pageLoading).toBe(true);
    const spinner = screen.getByTestId("page-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("sets appLoading to false after mounting", async () => {
    const { result } = renderHook(() => useContext(LoadingContext), {
      wrapper: LoadingProvider,
    });

    expect(result.current.appLoading).toBe(false);
  });

  it("sets pageLoading to true before mounting a component", async () => {
    const TestComponent = () => {
      return <div>Page content</div>;
    };
    render(<TestComponent />);
    const spinner = screen.getByTestId("page-spinner");

    await waitFor(() => {
      expect(spinner).toBeInTheDocument();
    });
  });

  it("sets pageLoading to false after mounting a component", async () => {
    const TestComponent = () => {
      useMountPage();
      return <div>Page content</div>;
    };
    render(<TestComponent />);
    const spinner = screen.getByTestId("page-spinner");

    await waitFor(() => {
      expect(spinner).not.toBeInTheDocument();
    });
  });
});
