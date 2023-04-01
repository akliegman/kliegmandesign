import { render, screen } from "../../setupTests";
import { Footer } from "./Footer";
import { useAuth } from "../../context/AuthContext";
jest.mock("../../context/AuthContext");

describe("Footer", () => {
  it("renders logged in user email in footer", () => {
    useAuth.mockReturnValue({
      session: { user: { email: "test@example.com" } },
    });
    render(<Footer />);

    const text = screen.getByText(/Logged in as test@example.com/i);
    expect(text).toBeInTheDocument();
  });

  it("does not render user email when user is not logged in", () => {
    useAuth.mockReturnValue({ session: null });
    render(<Footer />);

    const text = screen.queryByText(/Logged in as/i);
    expect(text).not.toBeInTheDocument();
  });
});
