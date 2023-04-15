import React from "react";
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

export interface LoginProps {
  user: string;
  password: string;
  email: string;
}

export type Login = (
  user: string,
  password: string,
  email: string
) => Promise<AuthContext>;

export type Logout = () => Promise<void | Error>;

export type ErrorType =
  | "loginError"
  | "authError"
  | "logoutError"
  | "checkSessionError";

export type Error = {
  [key in ErrorType]: string;
};

export interface AuthContext = (
  session: Session;
  error: Error;
) => AuthContextValue;

export interface AuthApi {
  authUser: () => Promise<AuthContext>;
  loginUser: Login;
  logoutUser: Logout;
}

export interface AuthApiContext {
  authApi: AuthApi;
}

export interface AuthApiProviderProps {
  children: React.ReactNode;
}

export interface AuthApiProviderState {
  authApi: AuthApi;
}

export interface AuthContextValue {
  session: Session;
  errors: Error;
  newSession: boolean;
  isLoggedIn: boolean;
  login: Login;
  logout: Logout;
  clearErrors: (errorType: ErrorType) => void;
}
