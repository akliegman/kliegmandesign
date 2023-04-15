import ReactDOM from "react-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.less";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <LoadingProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </LoadingProvider>
);
