import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { Spinner } from "../components/reusables";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const value = useMemo(
    () => ({ isLoading, setIsLoading }),
    [isLoading, setIsLoading]
  );

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <Spinner />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
