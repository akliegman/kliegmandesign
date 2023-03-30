import { ResumePage } from "./pages/ResumePage";
import { HomePage } from "./pages/HomePage";
import { Error404Page } from "./pages/Error404Page";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { SandboxPage } from "./pages/SandboxPage";

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
    name: "Résumé",
    exact: true,
    protected: false,
    withHeader: true,
    withFooter: true,
    navOrder: 1,
    element: <ResumePage />,
  },
  "/projects": {
    name: "Projects",
    exact: true,
    protected: true,
    withHeader: true,
    withFooter: true,
    navOrder: 2,
    element: <ProjectsPage />,
  },
  "/sandbox": {
    name: "Sandbox",
    exact: true,
    protected: true,
    withHeader: true,
    withFooter: true,
    navOrder: 3,
    element: <SandboxPage />,
  },
  "/login": {
    name: "Log In",
    exact: true,
    protected: false,
    withHeader: false,
    withFooter: true,
    inNav: true,
    element: <LoginPage />,
  },
  "/logout": {
    name: "Log Out",
    exact: true,
    protected: false,
    withHeader: false,
    withFooter: true,
    element: <LogoutPage />,
  },
  "*": {
    name: "404",
    exact: false,
    protected: false,
    withHeader: false,
    withFooter: true,
    inNav: false,
    element: <Error404Page />,
  },
};
