import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.less";
import { ResumePage } from "./pages/ResumePage";
import { HomePage } from "./pages/HomePage";
import { useEffect, useState } from "react";

export const App = () => {
  const location = useLocation();

  const [apiData, setAPIData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setAPIData(data))
      .catch((err) => console.log(err));
  }, [apiData]);

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
              <Route exact path="/" element={<HomePage data={apiData} />} />
              <Route path="/resume" element={<ResumePage />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
};
