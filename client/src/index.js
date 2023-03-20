import React from "react";
import ReactDOM from "react-dom/client";
import { forwardRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.less";

const root = ReactDOM.createRoot(document.getElementById("root"));
const ForwardApp = forwardRef((props, ref) => <App ref={ref} {...props} />);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ForwardApp />
    </BrowserRouter>
  </React.StrictMode>
);
