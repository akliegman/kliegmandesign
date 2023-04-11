import { render, screen, fireEvent, waitFor } from "../../setupTests";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the logo when on the home page", async () => {
    const location = { pathname: "/" };
    const matchProjectPath = jest.fn();

    render(<Header location={location} matchProjectPath={matchProjectPath} />);

    await waitFor(() => {
      expect(screen.getByTestId("logo")).toBeInTheDocument();
    });
  });

  it("renders the 'back' button when not on the home page", async () => {
    const location = { pathname: "/about" };
    const matchProjectPath = jest.fn();

    render(<Header location={location} matchProjectPath={matchProjectPath} />);

    await waitFor(() => {
      const logo = screen.queryByTestId("logo");
      expect(logo).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId("back-button")).toBeInTheDocument();
    });
  });

  it("opens and closes mobile menu on click", async () => {
    const location = { pathname: "/" };
    const matchProjectPath = jest.fn();
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 400,
    });

    // ensure mobile width of document
    Object.defineProperty(document.documentElement, "clientWidth", {
      writable: true,
      configurable: true,
      value: 400,
    });

    // trigger resize event
    window.dispatchEvent(new Event("resize"));

    render(<Header location={location} matchProjectPath={matchProjectPath} />);

    const menuButton = screen.getByTestId("menu-button");

    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByTestId("nav")).toHaveClass("Header__nav--show");
    });

    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByTestId("nav")).not.toHaveClass("Header__nav--show");
    });
  });
});
