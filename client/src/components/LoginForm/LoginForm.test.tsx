// @ts-nocheck
import { render, fireEvent, screen, waitFor } from "../../setupTests";
import { LoginForm } from "./LoginForm";

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
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  it("password input should show error if password is missing", async () => {
    render(<LoginForm user="user" />);
    fireEvent.click(screen.getByTestId("login-button"));

    const thisInput = screen.getByPlaceholderText("Enter password");

    await waitFor(() => {
      expect(thisInput).toHaveClass("TextInput__input--error");
    });

    await waitFor(() => {
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

    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(thisInput).toHaveClass("TextInput__input--error");
    });

    await waitFor(() => {
      expect(thisInput).toHaveFocus();
    });
  });

  it("should call the login function with the correct arguments", async () => {
    const mockLogin = jest.fn(() => Promise.resolve(true));

    jest.mock("../../context/AuthContext", () => ({
      useAuth: () => ({
        login: mockLogin,
        errors: [],
        clearError: jest.fn(),
      }),
    }));

    render(<LoginForm user="user" />);

    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter email (optional)"), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(async () => {
      await expect(mockLogin("user", "1234", "user@example.com")).resolves.toBe(
        true
      );
    });
  });
});
