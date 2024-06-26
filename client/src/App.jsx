import clsx from "clsx";
import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  matchPath,
} from "react-router-dom";

import { routes } from "./routes";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { PageHelmet } from "./components/PageHelmet/PageHelmet";
import { CookiesMessage } from "./components/CookiesMessage/CookiesMessage";
import { GoogleAnalytics } from "./components/GoogleAnalytics/GoogleAnalytics";
import { useAuth } from "./context/AuthContext";
import { getEnvVars } from "./hooks/useEnv";
import { useLoading } from "./context/LoadingContext";

import styles from "./App.module.less";

export const App = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const [matchProjectPath, setMatchProjectPath] = useState(null);
  const [envData, setEnvData] = useState(null);
  const { appLoading } = useLoading();
  const [projectRoute, projectObject] = Object.entries(routes).filter(
    ([key, value]) => value.name === "Project"
  )[0];

  useMemo(() => {
    setMatchProjectPath(matchPath({ path: projectRoute }, location.pathname));
  }, [location.pathname, projectRoute, setMatchProjectPath]);

  useEffect(() => {
    const setEnv = async () => {
      try {
        const data = await getEnvVars();
        setEnvData(data);
      } catch (err) {
        console.error(err);
      }
    };

    setEnv();
  }, []);

  const isWithHeader =
    routes[location.pathname]?.withHeader ||
    (projectObject?.withHeader && matchProjectPath?.pathname);
  const isWithFooter =
    routes[location.pathname]?.withFooter ||
    (projectObject?.withFooter && matchProjectPath?.pathname);

  const appClassNames = useMemo(
    () => clsx(styles.App, !appLoading && styles.Loaded),
    [appLoading]
  );

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#fff" />
        {envData && (
          <meta name="api-url" content={envData?.REACT_APP_API_URL} />
        )}
      </Helmet>
      <GoogleAnalytics />
      <div className={appClassNames}>
        <PageHelmet />

        {isWithHeader && (
          <Header location={location} matchProjectPath={matchProjectPath} />
        )}

        <Routes location={location}>
          {!appLoading &&
            Object.entries(routes).map(([path, route], index) => {
              let state = { from: { pathname: location.pathname } };
              let element = !route.protected ? (
                route.element
              ) : isLoggedIn ? (
                route.element
              ) : (
                <Navigate to={`/login`} state={state} />
              );

              return (
                <Route
                  key={index}
                  path={path}
                  exact={route.exact}
                  element={element}
                />
              );
            })}
        </Routes>

        {isWithFooter && <Footer />}

        <CookiesMessage />
      </div>
    </>
  );
};
