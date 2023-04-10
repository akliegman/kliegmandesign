import { render, screen, waitFor } from "../setupTests";
import { LoadingProvider, useLoading } from "./LoadingContext";
import { useMountPage } from "../hooks/useMountPage";

describe("LoadingProvider", () => {
  it("renders a spinner while page is loading", () => {
    render(
      <LoadingProvider>
        <div>Page content</div>
      </LoadingProvider>
    );

    const spinner = screen.getByTestId("page-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("sets appLoading to false after mounting", () => {
    render(
      <LoadingProvider>
        <div>App content</div>
      </LoadingProvider>
    );

    waitFor(() => {
      const spinner = screen.getByTestId("app-spinner");
      expect(spinner).not.toBeInTheDocument();
    });
  });

  it("sets pageLoading to false after mounting", () => {
    const TestComponent = () => {
      useMountPage();
      return <div>Page content</div>;
    };

    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    waitFor(() => {
      const spinner = screen.getByTestId("page-spinner");
      expect(spinner).not.toBeInTheDocument();
    });
  });

  it("provides loading context to child components", () => {
    const TestComponent = () => {
      const { appLoading, pageLoading } = useLoading();
      return (
        <div>
          <span data-testid="app-loading">{appLoading.toString()}</span>
          <span data-testid="page-loading">{pageLoading.toString()}</span>
        </div>
      );
    };

    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    waitFor(() => {
      const appLoading = screen.getByTestId("app-loading");
      expect(appLoading.textContent).toBe("false");

      const pageLoading = screen.getByTestId("page-loading");
      expect(pageLoading.textContent).toBe("false");
    });
  });
});
