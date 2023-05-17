import { waitFor, act, renderHook } from "../setupTests";
import { ApiContext, ApiProvider, useApi } from "./ApiContext";
import { useContext } from "react";
import { api } from "../api/api";

jest.mock("../api/api");

describe("ApiContext", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set initial values", () => {
    const { result } = renderHook(() => useContext(ApiContext), {
      wrapper: ApiProvider,
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.session).toBe(null);
    expect(JSON.stringify(result.current.errors)).toBe("[]");
  });

  it("should set isLoggedIn to true when login is called", async () => {
    const mockResult = {
      cookie: null,
      expiresAt: null,
      ipAddress: null,
      sid: 123456,
      userAgent: null,
      isNew: true,
      user: { user: "user", email: "user@user.com", role: "user" },
    };

    api.get.mockResolvedValueOnce({ ...mockResult, success: true });

    const { result } = renderHook(() => useApi(), {
      wrapper: ApiProvider,
    });

    await act(async () => {
      await result.current.login("user", "1234", "user@user.com");
    });

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(true);
    });
  });
});
