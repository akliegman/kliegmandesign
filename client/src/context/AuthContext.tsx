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

interface AuthContextValue {
  session: Session;
  errors: Errors;
  newSession: boolean;
  isLoggedIn: boolean;
  login: Login;
  logout: Logout;
  clearErrors: (errorType: ErrorType) => void;
}

type ErrorType =
  | "loginError"
  | "logoutError"
  | "checkLoginError"
  | "checkSessionError";

type ErrorString = string;

type ErrorObject = {
  [key in ErrorType]: string;
};

type Errors = ErrorObject[];

type AuthProviderProps = {
  children: React.ReactNode;
};

type Logout = () => Promise<void | Error>;

type Login = (LoginProps: LoginProps) => Promise<Session | Error | false>;

type LoginProps = {
  user: string;
  password: string;
  email: string;
};

interface Error {
  error: ErrorString;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
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

  const checkIfNewSession = useCallback(async (): Promise<boolean | Error> => {
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

    return false;
  }, [errors]);

  const login = useCallback(
    async (
      LoginProps: LoginProps
    ): Promise<Session | Error | ErrorString | false> => {
      try {
        const response = await loginUser(LoginProps);
        if (response?.error !== undefined) {
          setErrors([{ loginError: response?.error }, ...errors]);
        } else {
          setSession(response);
          setIsLoggedIn(true);

          return response;
        }
      } catch (error) {
        console.log(error);
        setErrors([{ loginError: error }, ...errors]);
      }
      return false;
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
