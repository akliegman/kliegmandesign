import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.less";
import { ApiProvider } from "./contexts/ApiContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

reportWebVitals(console.log);

root.render(
  <LoadingProvider>
    <ApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </LoadingProvider>
);

if (process.env.NODE_ENV === "development") reportWebVitals(console.log);
