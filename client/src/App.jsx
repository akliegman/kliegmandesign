import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.less";
import { ResumePage } from "./pages/ResumePage";
import { HomePage } from "./pages/HomePage";

export const App = () => {
  const location = useLocation();

  return (
    <>
      <div className="App">
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.key}
            classNames="AppPageTransition"
            timeout={300}
          >
            <Routes location={location}>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
};
