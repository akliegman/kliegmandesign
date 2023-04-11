import { render, screen, fireEvent, waitFor } from "../../setupTests";
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

    render(<CookiesMessage />);

    const message = screen.queryByText(
      /We may use cookies to provide you with a better experience/i
    );

    await waitFor(
      () => {
        expect(message).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("sets the cookies when accept button is clicked", async () => {
    const cookieOptions = {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: true,
    };

    useCookies.mockReturnValue([{}, setCookieMock, setCookiesMock]);

    render(<CookiesMessage />);

    const acceptButton = screen.getByRole("button", { name: "Accept" });
    fireEvent.click(acceptButton);

    expect(setCookieMock).toHaveBeenCalledWith(
      "cookiesAccepted__adamkliegman",
      true,
      cookieOptions
    );
  });
});
