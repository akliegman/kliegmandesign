import { waitFor, act, renderHook } from "../setupTests";
import { AuthContext, AuthProvider } from "./AuthContext";
import { useContext } from "react";
import { loginUser } from "../hooks/useAuthApi";

describe("AuthContext", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set initial values", () => {
    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.session).toBe(null);
    expect(result.current.newSession).toBe(false);
    expect(JSON.stringify(result.current.errors)).toBe(JSON.stringify([]));
  });

  it("should set isLoggedIn to true when login is called", async () => {
    const mockResult = {
      cookie: null,
      expiresAt: null,
      ipAddress: null,
      sid: 123456,
      userAgent: null,
      isNew: true,
      user: { user: "user", email: "usesr@user.com", role: "user" },
    };

    const spy = jest
      .spyOn(require("../hooks/useAuthApi"), "loginUser")
      .mockImplementation(() => {
        return Promise.resolve(mockResult);
      });

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.login("user", "1234", "user@user.com");
    });

    expect(loginUser).toHaveBeenCalledTimes(1);
    expect(loginUser).toHaveBeenCalledWith("user", "1234", "user@user.com");

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.session).toBe(mockResult);
    });

    spy.mockRestore();
  });

  it("should set isLoggedIn to false when logout is called after login", async () => {
    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    const mockResult = {
      cookie: null,
      expiresAt: null,
      ipAddress: null,
      sid: 123456,
      userAgent: null,
      isNew: true,
      user: { user: "user", email: "usesr@user.com", role: "user" },
    };

    jest
      .spyOn(require("../hooks/useAuthApi"), "loginUser")
      .mockImplementation(() => {
        return Promise.resolve(mockResult);
      });

    await act(async () => {
      await result.current.login("user", "1234", "user@user.com");
    });

    expect(loginUser).toHaveBeenCalledTimes(1);
    expect(loginUser).toHaveBeenCalledWith("user", "1234", "user@user.com");

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.session).toBe(mockResult);
    });

    await act(async () => {
      await result.current.logout();
    });

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.session).toBe(null);
    });
  });

  it("should set an error when login is called with invalid credentials", async () => {
    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    const mockResult = {
      error: "Invalid credentials",
    };

    jest
      .spyOn(require("../hooks/useAuthApi"), "loginUser")
      .mockImplementation(() => {
        return Promise.resolve(mockResult);
      });

    await act(async () => {
      await result.current.login();
    });

    expect(loginUser).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(result.current.errors).toEqual([
        { loginError: "Invalid credentials" },
      ]);
    });
  });
});
