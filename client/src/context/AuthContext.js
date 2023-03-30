import { useState, useMemo, useContext, createContext } from "react";
import { loginUser, authUser, logoutUser } from "../hooks/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  const login = async (user, password, email) => {
    const response = await loginUser(user, password, email);
    if (response?.error) {
      setError(response.error);
    } else {
      setSession(response);
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    const response = await logoutUser();
    if (response?.error) {
      setError(response.error);
    }

    setSession(null);
    setIsLoggedIn(false);
  };

  useMemo(() => {
    const checkLogin = async () => {
      try {
        const response = await authUser();
        if (response?.error) {
          setError(response.error);
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
    };
    checkLogin();
  }, []);

  const authContextValue = useMemo(
    () => ({ isLoggedIn, session, login, logout, error }),
    [isLoggedIn, login, logout, session, error]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
