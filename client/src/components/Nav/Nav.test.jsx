import { render, screen, waitFor } from "../../setupTests";
import { Nav } from "./Nav";

describe("Nav", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders the navigation items", () => {
    render(
      <Nav location={{ pathname: "/projects" }} matchProjectPath={null} />
    );

    const navElement = screen.getByTestId("nav");
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass("Nav");

    const navLinks = screen.getAllByTestId("navlink");
    expect(navLinks.length).toEqual(2);

    const navLabels = navLinks.map((link) => link.textContent);
    expect(navLabels).toEqual(["Résumé", "Projects"]);
  });

  it("renders the navigation items with the active class", () => {
    render(
      <Nav location={{ pathname: "/projects" }} matchProjectPath={null} />
    );

    const activeNavLink = screen.getByText("Projects");
    expect(activeNavLink).toHaveClass("Button--active");

    const inactiveNavLink = screen.getByText("Résumé");
    expect(inactiveNavLink).not.toHaveClass("Button--active");
  });

  it("renders the locked icon for protected navigation items when not logged in", async () => {
    jest.spyOn(require("../../contexts/ApiContext"), "useApi").mockReturnValue({
      session: null,
      isLoggedIn: false,
    });

    render(
      <Nav location={{ pathname: "/projects" }} matchProjectPath={null} />
    );

    const lockedIcon = screen.getByTestId("locked-icon");
    expect(lockedIcon).toBeInTheDocument();
  });

  it("renders the correct icon for protected navigation items when logged in", async () => {
    jest.spyOn(require("../../contexts/ApiContext"), "useApi").mockReturnValue({
      session: { user: { email: "user@user.com" } },
      isLoggedIn: true,
    });

    render(
      <Nav location={{ pathname: "/projects" }} matchProjectPath={null} />
    );
    const unlockedIcon = screen.getByTestId("projects-icon");
    await waitFor(() => {
      expect(unlockedIcon).toBeInTheDocument();
    });
  });
});
