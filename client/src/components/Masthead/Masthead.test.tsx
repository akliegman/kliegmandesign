// @ts-nocheck
import { render, screen } from "../../setupTests";
import { Masthead } from "./Masthead";

describe("Masthead component", () => {
  const data = {
    image: "https://example.com/image.png",
    header: "Test Header",
    subheader: "Test Subheader",
    description: "Test description",
    ctas: [
      { name: "resume", label: "View Resume", link: "/resume" },
      { name: "portfolio", label: "View Portfolio", link: "/portfolio" },
    ],
    social: [
      { name: "LinkedIn", link: "https://www.linkedin.com/" },
      { name: "GitHub", link: "https://github.com/" },
      { name: "Email", link: "mailto:test@example.com" },
    ],
  };

  it("renders the Masthead component with the correct data", () => {
    render(<Masthead data={data} />);

    expect(screen.getByAltText("Adam Kliegman")).toBeInTheDocument();
    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("Test Subheader")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("View Resume")).toHaveAttribute("href", "/resume");
    expect(screen.getByText("View Portfolio")).toHaveAttribute(
      "href",
      "/portfolio"
    );
    expect(screen.getByTestId("linkedin-icon")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/"
    );
    expect(screen.getByTestId("github-icon")).toHaveAttribute(
      "href",
      "https://github.com/"
    );
    expect(screen.getByTestId("email-icon")).toHaveAttribute(
      "href",
      "mailto:test@example.com"
    );
  });
});
