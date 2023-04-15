import * as Page from "./pages";

type Route = {
  id: string;
  name: string;
  exact: boolean;
  protected: boolean;
  withHeader: boolean;
  withFooter: boolean;
  element: JSX.Element;
  navOrder?: number;
  darkenedBackground?: boolean;
};

type Routes = {
  [key: string]: Route;
};

export const routes: Routes = {
  "/": {
    id: "HOME",
    name: "Home",
    exact: true,
    protected: false,
    withHeader: true,
    withFooter: true,
    element: <Page.HomePage />,
  },
  "/resume": {
    id: "RESUME",
    name: "Résumé",
    exact: true,
    protected: false,
    withHeader: true,
    withFooter: true,
    navOrder: 1,
    element: <Page.ResumePage />,
  },
  "/projects": {
    id: "PROJECTS",
    name: "Projects",
    exact: true,
    protected: true,
    withHeader: true,
    withFooter: true,
    navOrder: 2,
    element: <Page.ProjectsPage />,
  },
  "/project/:projectName": {
    id: "PROJECT",
    name: "Project",
    exact: false,
    protected: true,
    withHeader: true,
    withFooter: true,
    element: <Page.ProjectPage />,
  },
  "/login": {
    id: "LOGIN",
    name: "Log In",
    exact: true,
    protected: false,
    withHeader: true,
    withFooter: true,
    darkenedBackground: true,
    element: <Page.LoginPage />,
  },
  "/logout": {
    id: "LOGOUT",
    name: "Log Out",
    exact: true,
    protected: false,
    withHeader: false,
    withFooter: true,
    element: <Page.LogoutPage />,
  },
  "/admin-login": {
    id: "ADMIN_LOGIN",
    name: "Admin Log In",
    exact: true,
    protected: false,
    withHeader: true,
    withFooter: true,
    darkenedBackground: true,
    element: <Page.LoginPage user={"admin"} />,
  },
  "/privacy-policy": {
    id: "PRIVACY_POLICY",
    name: "Privacy Policy",
    exact: true,
    protected: false,
    withHeader: true,
    withFooter: true,
    element: <Page.PrivacyPolicyPage />,
  },
  "/terms-of-use": {
    id: "TERMS_OF_USE",
    name: "Terms of Use",
    exact: true,
    protected: false,
    withHeader: true,
    withFooter: true,
    element: <Page.TermsOfUsePage />,
  },
  "/404": {
    id: "404",
    name: "Error 404",
    exact: true,
    protected: false,
    withHeader: false,
    withFooter: true,
    element: <Page.Error404Page />,
  },
  "*": {
    id: "ALL",
    name: "Catch All",
    exact: false,
    protected: false,
    withHeader: false,
    withFooter: true,
    element: <Page.Error404Page />,
  },
};

export const routeNames: { [key: string]: string } = Object.entries(
  routes
).reduce(
  (acc, [path, route]) => ({
    ...acc,
    [route.id]: path,
  }),
  {}
);
