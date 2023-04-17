import { api } from "../api/api";

export interface Session {
  cookie: string;
  expiresAt: string;
  ipAddress: string;
  sid: number;
  userAgent: string;
  isNew: boolean;
  user: User;
}

export interface User {
  user: string;
  role: string;
  email: string;
}
type LoginProps = {
  user: string;
  password: string;
  email: string;
};

type ErrorString = string;

interface Error {
  error: ErrorString;
}

const loginUser = async ({
  user,
  password,
  email,
}: LoginProps): Promise<Session | Error> => {
  try {
    const response = await api.get("/login", {
      auth: {
        username: user,
        password: password,
      },
      params: {
        email: email,
      },
    });

    if (response.data.error) {
      return { error: response.data.error };
    }

    return response.data;
  } catch (error: any) {
    return { error: error?.response?.data };
  }
};

const authUser = async (): Promise<Session | Error> => {
  try {
    const response = await api.get("/auth");
    return response.data;
  } catch (error: any) {
    return { error: error?.response?.data };
  }
};

const logoutUser = async (): Promise<Session | Error> => {
  try {
    const logout = await api.get("/logout");

    try {
      if (logout.data.error) {
        return { error: logout.data };
      }
      const response = await api.get("/auth");
      return response.data;
    } catch (error: any) {
      return { error: error?.response?.data };
    }
  } catch (error: any) {
    return { error: error?.response?.data };
  }
};

const checkNewSession = async (): Promise<boolean | Error> => {
  try {
    const response = await api.get("/session");
    return response.data;
  } catch (error) {
    return { error: error?.response?.data };
  }
};

export { authUser, loginUser, logoutUser, checkNewSession };
