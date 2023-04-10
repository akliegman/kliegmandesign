import { render, screen, fireEvent, waitFor } from "../../setupTests";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the logo when on the home page", () => {
    const location = { pathname: "/" };
    const matchProjectPath = jest.fn();

    render(<Header location={location} matchProjectPath={matchProjectPath} />);

    waitFor(() => {
      expect(screen.getByText("Adam Kliegman")).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /home/i })
      ).not.toBeInTheDocument();
    });
  });

  it("renders the 'home' button when not on the home page", () => {
    const location = { pathname: "/about" };
    const matchProjectPath = jest.fn();

    render(<Header location={location} matchProjectPath={matchProjectPath} />);

    waitFor(() => {
      expect(screen.queryByText("Adam Kliegman")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
    });
  });

  it("opens and closes mobile menu on click", () => {
    const location = { pathname: "/" };
    const matchProjectPath = jest.fn();

    render(<Header location={location} matchProjectPath={matchProjectPath} />);

    const menuButton = screen.getByRole("button", { name: /menu/i });

    fireEvent.click(menuButton);
    waitFor(() => {
      expect(
        screen.getByRole("navigation", { name: /main navigation/i })
      ).toBeInTheDocument();
    });

    fireEvent.click(menuButton);
    waitFor(() => {
      expect(
        screen.queryByRole("navigation", { name: /main navigation/i })
      ).not.toBeInTheDocument();
    });
  });
});
