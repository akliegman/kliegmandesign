import { useEffect, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

export const ScrolltopContext = createContext();

export const ScrolltopProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    location && window.scrollTo(0, 0);
  }, [location]);

  return (
    <ScrolltopContext.Provider value={{}}>{children}</ScrolltopContext.Provider>
  );
};

export const useScrolltop = () => useContext(ScrolltopContext);
