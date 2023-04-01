import { render, screen, fireEvent, waitFor } from "../../setupTests";
import { act } from "react-dom/test-utils";
import { CookiesMessage } from "./CookiesMessage";
import { useCookies } from "react-cookie";
jest.mock("react-cookie", () => ({
  useCookies: jest.fn(),
}));

describe("CookiesMessage", () => {
  const cookiesMock = {
    cookiesAccepted__adamkliegman: true,
  };
  const setCookieMock = jest.fn();
  const setCookiesMock = jest.fn();

  beforeEach(() => {
    useCookies.mockReturnValue([{}, setCookieMock, setCookiesMock]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with accept button", () => {
    render(<CookiesMessage />);
    const message = screen.getByText(
      /We may use cookies to provide you with a better experience/i
    );
    expect(message).toBeInTheDocument();
    const acceptButton = screen.getByRole("button", { name: "Accept" });
    expect(acceptButton).toBeInTheDocument();
  });

  it("hides the message if cookies have been accepted", async () => {
    useCookies.mockReturnValue([cookiesMock, setCookieMock, setCookiesMock]);

    await act(async () => {
      render(<CookiesMessage />);
    });

    const message = screen.queryByText(
      /We may use cookies to provide you with a better experience/i
    );

    waitFor(() => {
      expect(message).not.toBeInTheDocument();
    });
  });

  it("sets the cookies when accept button is clicked", async () => {
    const cookieOptions = {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: true,
    };

    useCookies.mockReturnValue([{}, setCookieMock, setCookiesMock]);

    await act(async () => {
      render(<CookiesMessage />);
    });

    const acceptButton = screen.getByRole("button", { name: "Accept" });
    fireEvent.click(acceptButton);

    expect(setCookieMock).toHaveBeenCalledWith(
      "cookiesAccepted__adamkliegman",
      true,
      cookieOptions
    );
  });
});
