import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.less";
import { ResumeLayout } from "./layouts/ResumeLayout";
import { HomeLayout } from "./layouts/HomeLayout";
import { Spinner } from "./components/reusables/Spinner";
import { useState, useEffect } from "react";

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
        )}
      </div>
    </>
  );
};
