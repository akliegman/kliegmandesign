import {
  Routes,
  Route,
  useLocation,
  Navigate,
  matchPath,
} from "react-router-dom";
import { routes } from "./routes";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useEffect, useState, useLayoutEffect } from "react";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { PageHelmet } from "./components/PageHelmet/PageHelmet";
import { CookiesMessage } from "./components/CookiesMessage/CookiesMessage";
import { GoogleAnalytics } from "./components/GoogleAnalytics/GoogleAnalytics";
import { useAuth } from "./context/AuthContext";
import { ScrolltopProvider } from "./context/ScrolltopContext";
import { Helmet } from "react-helmet";
import { useLoading } from "./context/LoadingContext";
import clsx from "clsx";
import "./App.less";

export const App = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const { appLoading, setPageLoading } = useLoading();
  const [matchProjectPath, setMatchProjectPath] = useState(null);

  const [projectRoute, projectObject] = Object.entries(routes).filter(
    ([key, value]) => value.name === "Project"
  )[0];

  useEffect(() => {
    setMatchProjectPath(matchPath({ path: projectRoute }, location.pathname));
  }, [location.pathname, projectRoute, setMatchProjectPath]);

  useLayoutEffect(() => {
    setPageLoading(true);
  }, [location.pathname, setPageLoading]);

  const isWithHeader =
    routes[location.pathname]?.withHeader ||
    (projectObject?.withHeader && matchProjectPath?.pathname);
  const isWithFooter =
    routes[location.pathname]?.withFooter ||
    (projectObject?.withFooter && matchProjectPath?.pathname);
  const isDarkenedBackground =
    routes[location.pathname]?.darkenedBackground ||
    (projectObject?.darkenedBackground && matchProjectPath?.pathname);

  const appClassNames = clsx("App", {
    "App--noHeader": !isWithHeader,
    "App--noFooter": !isWithFooter,
    "App--darkenedBackground": isDarkenedBackground,
  });

  return (
    <ScrolltopProvider>
      <Helmet>
        {isDarkenedBackground ? (
          <meta name="theme-color" content="#cccccc" />
        ) : (
          <meta name="theme-color" content="#f7f7f7" />
        )}
      </Helmet>
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
                  {Object.entries(routes).map(([path, route], index) => {
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
              </CSSTransition>
            </TransitionGroup>
            {isWithFooter && <Footer />}
            <CookiesMessage />
          </div>
        </CSSTransition>
      </div>
    </ScrolltopProvider>
  );
};
