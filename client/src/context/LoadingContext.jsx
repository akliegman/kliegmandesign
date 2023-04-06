import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { Spinner } from "../components/reusables";
import { CSSTransition } from "react-transition-group";
export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  const value = useMemo(
    () => ({
      appLoading,
      setAppLoading,
      pageLoading,
      setPageLoading,
    }),
    [appLoading, setAppLoading, pageLoading, setPageLoading]
  );

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    setAppLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={value}>
      {appLoading && <Spinner type="app" />}
      <CSSTransition
        in={pageLoading}
        out={!pageLoading}
        unmountOnExit
        classNames="PageFadeIn"
        timeout={150}
      >
        <Spinner type="page" />
      </CSSTransition>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

export const useMountPage = () => {
  const { setPageLoading } = useLoading();

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    setPageLoading(false);
  }, []);

  return;
};
