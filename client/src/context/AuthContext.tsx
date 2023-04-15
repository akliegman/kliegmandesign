import {
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
  createContext,
} from "react";
import {
  loginUser,
  authUser,
  logoutUser,
  checkNewSession,
} from "../hooks/useAuthApi";

import * as AuthTypes from "../types/authTypes";

export const AuthContext = createContext<AuthTypes.AuthContextValue | null>(null);

export const AuthProvider = ({ children }: AuthTypes.AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [newSession, setNewSession] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);

  const clearError = useCallback(
    (errorType: string) => {
      setErrors(errors.filter((error) => error[errorType] === undefined));
    },
    [errors]
  );

  const checkIfNewSession = useCallback(async (): Promise<any> => {
    try {
      const response = await checkNewSession();
      if (response?.error) {
        setErrors([{ checkSessionError: response.error }, ...errors]);
      } else {
        setNewSession(response.isNew);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }, [errors]);

  const login = useCallback(
    async (AuthTypes.LoginProps): Promise<AuthTypes.AuthContext> => {
      try {
        const response = await loginUser(user, password, email);
        if (response?.error) {
          setErrors([{ loginError: response.error }, ...errors]);
        } else {
          setSession(response);
          setIsLoggedIn(true);
          return response;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [errors]
  );

  const logout = useCallback(async (): Promise<any> => {
    try {
      const response = await logoutUser();
      if (response?.error) {
        setErrors([{ logoutError: response.error }, ...errors]);
      }

      setSession(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  }, [errors]);

  const checkLogin = useCallback(async () => {
    try {
      const response = await authUser();
      if (response?.error) {
        setErrors([{ checkLoginError: response.error }, ...errors]);
      } else {
        if (response.user) {
          setSession(response);
          setIsLoggedIn(true);
        } else {
          setSession(null);
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [errors]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    checkIfNewSession();
  }, []);

  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      session,
      newSession,
      login,
      logout,
      errors,
      clearError,
    }),
    [isLoggedIn, login, logout, session, newSession, errors, clearError]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
