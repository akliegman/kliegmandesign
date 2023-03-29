import { useState, useContext, createContext, useEffect } from "react";
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

  const logout = () => {
    logoutUser();
    setSession(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const response = await authUser();
      if (response?.error) {
        setError(response.error);
      } else {
        setSession(response);
        setIsLoggedIn(true);
      }
    };
    checkLogin();
  }, []);

  const authContextValue = {
    isLoggedIn,
    session,
    login,
    logout,
    error,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
