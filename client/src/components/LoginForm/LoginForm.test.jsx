import { render, fireEvent, screen, waitFor } from "../../setupTests";
import { LoginForm } from "./LoginForm";
// mock the useAuth hook
jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    login: jest.fn(() => Promise.resolve(true)),
    errors: [],
    clearError: jest.fn(),
  }),
}));

describe("LoginForm", () => {
  it("should render the form fields and submit button", () => {
    render(<LoginForm user="user" />);
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter email (optional)")
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("password input should show error if password is missing", async () => {
    render(<LoginForm user="user" />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      const thisInput = screen.getByPlaceholderText("Enter password");
      expect(thisInput).toHaveClass("TextInput__input--error");
      expect(thisInput).toHaveFocus();
    });
  });

  it("email input should show error if email is invalid", async () => {
    render(<LoginForm user="user" />);

    const thisInput = screen.getByPlaceholderText("Enter email (optional)");

    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "password123" },
    });

    fireEvent.change(thisInput, {
      target: { value: "invalidemail" },
    });

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(thisInput).toHaveClass("TextInput__input--error");
      expect(thisInput).toHaveFocus();
    });
  });

  //   it("should call the login function with the correct arguments", async () => {
  //     const { login } = require("../../context/AuthContext");
  //     render(<LoginForm user="user" />);
  //     fireEvent.change(screen.getByPlaceholderText("Enter password"), {
  //       target: { value: "password123" },
  //     });
  //     fireEvent.change(screen.getByPlaceholderText("Enter email (optional)"), {
  //       target: { value: "user@example.com" },
  //     });
  //     fireEvent.click(screen.getByRole("button"));
  //     await waitFor(() =>
  //       expect(login).toHaveBeenCalledWith(
  //         "user",
  //         "password123",
  //         "user@example.com"
  //       )
  //     );
  //   });

  //   it("should navigate to the correct page after successful login", async () => {
  //     const { login } = require("../../context/AuthContext");
  //     const { useNavigate } = require("react-router-dom");
  //     const navigateMock = jest.fn();
  //     useNavigate.mockReturnValue(navigateMock);
  //     render(<LoginForm user="user" />);
  //     fireEvent.click(screen.getByRole("button"));
  //     await waitFor(() =>
  //       expect(navigateMock).toHaveBeenCalledWith("/", { replace: true })
  //     );
  //   });

  //   it("should not navigate if login fails", async () => {
  //     const { login } = require("../../context/AuthContext");
  //     const { useNavigate } = require("react-router-dom");
  //     const navigateMock = jest.fn();
  //     useNavigate.mockReturnValue(navigateMock);
  //     login.mockImplementation(() => Promise.resolve(false));
  //     render(<LoginForm user="user" />);
  //     fireEvent.click(screen.getByRole("button"));
  //     await waitFor(() => expect(navigateMock).not.toHaveBeenCalled());
  //   });
});
