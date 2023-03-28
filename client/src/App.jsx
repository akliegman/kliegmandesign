import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ResumePage } from "./pages/ResumePage";
import { HomePage } from "./pages/HomePage";
import { Error404Page } from "./pages/Error404Page";
import { Spinner } from "./components/reusables/Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { PageHelmet } from "./components/PageHelmet/PageHelmet";
import { CookiesMessage } from "./components/CookiesMessage/CookiesMessage";
import { GoogleAnalytics } from "./components/GoogleAnalytics/GoogleAnalytics";

import "./App.less";

export const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

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
            <Header location={location} />
            <TransitionGroup component={null}>
              <CSSTransition
                key={location.key}
                classNames="AppPageTransition"
                timeout={1000}
              >
                <Routes location={location}>
                  <Route exact path="/" element={<HomePage />} />
                  <Route path="/resume" element={<ResumePage />} />
                  <Route path="*" element={<Error404Page />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
            <Footer />
            <CookiesMessage />
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
