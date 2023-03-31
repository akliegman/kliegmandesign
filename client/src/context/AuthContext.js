import {
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
  createContext,
} from "react";
import { loginUser, authUser, logoutUser } from "../hooks/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState(null);
  const [errors, setErrors] = useState([]);

  const clearError = useCallback((errorType) => {
    setErrors(errors.filter((error) => error[errorType] === undefined));
  }, []);

  const login = useCallback(async (user, password, email) => {
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
  }, []);

  const logout = useCallback(async () => {
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
  }, []);

  const checkLogin = useCallback(async () => {
    try {
      const response = await authUser();
      if (response?.error) {
        setErrors(response.error);
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
  }, []);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  const authContextValue = useMemo(
    () => ({ isLoggedIn, session, login, logout, errors, clearError }),
    [isLoggedIn, login, logout, session, errors, clearError]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
