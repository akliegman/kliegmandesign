import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ResumeLayout } from "./layouts/ResumeLayout";
import { HomeLayout } from "./layouts/HomeLayout";
import { Spinner } from "./components/reusables/Spinner";
// import { Nav } from "./components/Nav/Nav";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.less";

export const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <div className="App">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {/* <Nav location={location} /> */}
            <TransitionGroup component={null}>
              <CSSTransition
                key={location.key}
                classNames="AppPageTransition"
                timeout={300}
              >
                <Routes location={location}>
                  <Route exact path="/" element={<HomeLayout />} />
                  <Route path="/resume" element={<ResumeLayout />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
          </>
        )}
      </div>
    </>
  );
};
