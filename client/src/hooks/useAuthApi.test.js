import { authUser, loginUser, logoutUser, checkNewSession } from "./useAuthApi";
import { api } from "../api/api";

jest.mock("axios");

describe("authUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return authenticated user data", async () => {
    const responseData = { session: { email: "user@user.com" } };

    api.get = jest.fn().mockResolvedValueOnce({
      data: responseData,
    });

    const response = await authUser();

    expect(api.get).toHaveBeenCalledWith("/auth");
    expect(response).toEqual({ session: { email: "user@user.com" } });
  });

  it("should return unauthorized message if no user data", async () => {
    const responseData = { message: "unauthorized message" };

    api.get = jest.fn().mockResolvedValueOnce({
      data: responseData,
    });

    const response = await authUser();

    expect(api.get).toHaveBeenCalledWith("/auth");
    expect(response).toEqual({ message: "unauthorized message" });
  });
});

describe("loginUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data", async () => {
    const responseData = { session: { email: "user@user.com" } };

    const user = "user";
    const password = "password";
    const email = "user@user.com";

    const requestDetails = {
      auth: {
        username: user,
        password: password,
      },
      params: {
        email: email,
      },
    };

    api.get = jest.fn().mockResolvedValueOnce({
      data: responseData,
    });

    const response = await loginUser(user, password, email);

    expect(api.get).toHaveBeenCalledWith("/login", requestDetails);
    expect(response).toEqual({ session: { email: "user@user.com" } });
  });
});

describe("logoutUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should logout", async () => {
    jest.mock("../api/api", () => ({
      get: jest.fn(),
    }));

    api.get = jest.fn().mockResolvedValueOnce({
      data: {},
    });

    await logoutUser();

    expect(api.get).toHaveBeenCalledWith("/logout");
  });
});

describe("checkNewSession", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return new session", async () => {
    const responseData = { newSession: true };

    api.get = jest.fn().mockResolvedValueOnce({
      data: responseData,
    });

    const response = await checkNewSession();

    expect(api.get).toHaveBeenCalledWith("/session");
    expect(response).toEqual({ newSession: true });
  });
});
