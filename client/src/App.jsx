import { useMemo, useState, useLayoutEffect, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  matchPath,
} from "react-router-dom";
import clsx from "clsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { routes } from "./routes";
import { ScrolltopProvider } from "./contexts/ScrolltopContext";
import { useLoading } from "./contexts/LoadingContext";
import { useApi } from "./contexts/ApiContext";
import { AppHelmet } from "./components/AppHelmet/AppHelmet";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { PageHelmet } from "./components/PageHelmet/PageHelmet";
import { CookiesMessage } from "./components/CookiesMessage/CookiesMessage";
import { GoogleAnalytics } from "./components/GoogleAnalytics/GoogleAnalytics";
import { Errors } from "./components/Errors/Errors";
import "./App.less";

export const App = () => {
  const location = useLocation();
  const state = { from: { pathname: location.pathname } };
  const { isLoggedIn } = useApi();
  const { appLoading, setPageLoading } = useLoading();
  const [matchProjectPath, setMatchProjectPath] = useState(null);

  const [projectRoute, projectObject] = Object.entries(routes).find(
    ([key, value]) => value.name === "Project"
  );

  useMemo(() => {
    setMatchProjectPath(matchPath({ path: projectRoute }, location.pathname));
  }, [location.pathname, projectRoute, setMatchProjectPath]);

  useLayoutEffect(() => {
    setPageLoading(true);
  }, [location.pathname, setPageLoading]);

  const { pathname } = matchProjectPath || {};
  const { withHeader, withFooter, darkenedBackground } =
    routes[location.pathname] || {};

  const isWithHeader = withHeader || (projectObject?.withHeader && pathname);
  const isWithFooter = withFooter || (projectObject?.withFooter && pathname);
  const isDarkenedBackground =
    darkenedBackground || (projectObject?.darkenedBackground && pathname);

  const appClassNames = clsx("App", {
    "App--noHeader": !isWithHeader,
    "App--noFooter": !isWithFooter,
    "App--darkenedBackground": isDarkenedBackground,
  });

  return (
    <ScrolltopProvider>
      <AppHelmet isDarkenedBackground={isDarkenedBackground} />
      <GoogleAnalytics />
      <div className={appClassNames}>
        <CSSTransition
          in={!appLoading}
          classNames="AppPageFadeIn"
          timeout={800}
          unmountOnExit
        >
          <div className="App__content">
            <PageHelmet />

            {isWithHeader && (
              <Header location={location} matchProjectPath={matchProjectPath} />
            )}

            <TransitionGroup component={null}>
              <CSSTransition
                key={location.key}
                classNames="AppPageTransition"
                timeout={800}
              >
                <Routes location={location}>
                  {Object.entries(routes).map(([path, route]) => (
                    <Route
                      key={path}
                      exact={route.exact}
                      path={path}
                      element={
                        route.protected ? (
                          isLoggedIn ? (
                            route.element
                          ) : (
                            <Navigate to={`/login`} state={state} />
                          )
                        ) : (
                          route.element
                        )
                      }
                    />
                  ))}
                </Routes>
              </CSSTransition>
            </TransitionGroup>

            {isWithFooter && <Footer />}

            <CookiesMessage />
          </div>
        </CSSTransition>
        <Errors />
      </div>
    </ScrolltopProvider>
  );
};
