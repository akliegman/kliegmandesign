import { useMemo, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

export const ScrolltopContext = createContext();

export const ScrolltopProvider = ({ children }) => {
  const location = useLocation();

  useMemo(() => {
    location && window.scrollTo(0, 0);
  }, [location]);

  return (
    <ScrolltopContext.Provider value={{}}>{children}</ScrolltopContext.Provider>
  );
};

export const useScrolltop = () => useContext(ScrolltopContext);
