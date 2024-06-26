import { createContext, useContext, useState, useMemo, useEffect } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);

  const value = useMemo(
    () => ({
      appLoading,
      setAppLoading,
    }),
    [appLoading, setAppLoading],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
