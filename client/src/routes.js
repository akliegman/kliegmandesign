import { ResumePage } from "./pages/ResumePage";
import { HomePage } from "./pages/HomePage";
import { Error404Page } from "./pages/Error404Page";
import { LoginPage } from "./pages/LoginPage";

export const routes = {
  "/": {
    name: "Home",
    exact: true,
    protected: false,
    withHeader: true,
    withFooter: true,
    element: <HomePage />,
  },
  "/resume": {
    name: "Resume",
    exact: true,
    protected: false,
    withHeader: true,
    withFooter: true,
    element: <ResumePage />,
  },
  "/login": {
    name: "Login",
    exact: true,
    protected: false,
    withHeader: false,
    withFooter: true,
    element: <LoginPage />,
  },
  "*": {
    name: "Error404",
    exact: false,
    protected: false,
    element: <Error404Page />,
  },
};
