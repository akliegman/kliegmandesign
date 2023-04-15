// @ts-nocheck
import { render, screen } from "../../setupTests";
import { Footer } from "./Footer";

describe("Footer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with copyright, terms, and policy links", () => {
    render(<Footer />);

    const text = screen.getByText(/©/i);

    expect(text).toBeInTheDocument();

    const termsLink = screen.getByText(/Terms of Use/i);
    expect(termsLink).toBeInTheDocument();

    const privacyLink = screen.getByText(/Privacy Policy/i);
    expect(privacyLink).toBeInTheDocument();
  });

  it("renders logged in user email in footer", () => {
    jest
      .spyOn(require("../../context/AuthContext"), "useAuth")
      .mockReturnValue({
        session: { user: { email: "test@example.com" } },
      });

    render(<Footer />);

    const text = screen.getByText(/Logged in as test@example.com/i);
    expect(text).toBeInTheDocument();
  });

  it("does not render user email when user is not logged in", () => {
    jest
      .spyOn(require("../../context/AuthContext"), "useAuth")
      .mockReturnValue({
        session: null,
      });

    render(<Footer />);

    const text = screen.queryByText(/Logged in as/i);
    expect(text).not.toBeInTheDocument();
  });
});
