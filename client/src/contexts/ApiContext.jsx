import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "../api/api";
import { readError } from "../helpers/readError";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState(null);
  const [envData, setEnvData] = useState(null);
  const [errors, setErrors] = useState([]);

  const clearErrorById = (id) => {
    setErrors(errors.filter((error) => error.id !== id));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const getEnvVars = async () => {
    try {
      const { data } = await api.get("/env");
      setEnvData(data);
      return data;
    } catch (error) {
      setErrors([...errors, { ...readError(error), id: uuidv4() }]);
    }
  };

  const login = async (user, password, email) => {
    try {
      const { data } = await api.get("/login", {
        auth: {
          username: user,
          password: password,
        },
        params: {
          email: email,
        },
      });
      setSession(data);
      setIsLoggedIn(true);
      return { ...data, success: true, message: "Login successful" };
    } catch (error) {
      if (error?.response?.status === 400) {
        return { success: false, message: error?.response?.data };
      }
      setErrors([...errors, { ...readError(error), id: uuidv4() }]);
    }
  };

  const logout = async () => {
    try {
      await api.get("/logout");
      setSession(null);
      setIsLoggedIn(false);
    } catch (error) {
      setErrors([...errors, { ...readError(error), id: uuidv4() }]);
    }
  };

  const checkSession = async () => {
    try {
      const { data } = await api.get("/session");
      setSession(data);
      if (data.user) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      setErrors([...errors, { ...readError(error), id: uuidv4() }]);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    getEnvVars();
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      session,
      login,
      logout,
      errors,
      clearErrorById,
      clearErrors,
      envData,
    }),
    [
      isLoggedIn,
      login,
      logout,
      session,
      errors,
      clearErrorById,
      clearErrors,
      envData,
    ]
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
