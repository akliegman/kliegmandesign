import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { routes } from "./routes";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { PageHelmet } from "./components/PageHelmet/PageHelmet";
import { CookiesMessage } from "./components/CookiesMessage/CookiesMessage";
import { GoogleAnalytics } from "./components/GoogleAnalytics/GoogleAnalytics";
import { useAuth } from "./context/AuthContext";
import { Spinner } from "./components/reusables";
import "./App.less";

export const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    location && window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <GoogleAnalytics />
      <div className="App">
        {loading && <Spinner />}
        <CSSTransition
          in={!loading}
          classNames="AppPageFadeIn"
          timeout={1200}
          unmountOnExit
        >
          <div className="App__Content">
            <PageHelmet />

            {routes[location.pathname]?.withHeader && (
              <Header location={location} />
            )}
            <TransitionGroup component={null}>
              <CSSTransition
                key={location.key}
                classNames="AppPageTransition"
                timeout={1000}
              >
                <Routes location={location}>
                  {Object.entries(routes).map(([path, route]) => {
                    let element = !route.protected ? (
                      route.element
                    ) : isLoggedIn ? (
                      route.element
                    ) : (
                      <Navigate to="/login" />
                    );

                    return (
                      <Route
                        key={route.name}
                        path={path}
                        exact={route.exact}
                        element={element}
                      />
                    );
                  })}
                </Routes>
              </CSSTransition>
            </TransitionGroup>
            {routes[location.pathname]?.withFooter && <Footer />}
            <CookiesMessage />
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
