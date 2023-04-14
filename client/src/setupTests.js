import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { AuthContext } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import { BrowserRouter } from "react-router-dom";
import SourceMapSupport from "source-map-support";
import { createMemoryHistory } from "history";

SourceMapSupport.install({
  environment: "node",
  handleUncaughtExceptions: false,
});

global.XMLHttpRequest = require("xhr2");

const mockedAuthContextValue = {
  isLoggedIn: false,
  session: null,
  newSession: false,
  errors: [],
  login: jest.fn(),
  logout: jest.fn(),
  clearError: jest.fn(),
};

const mockedLoadingContextValue = {
  appLoading: false,
  setAppLoading: jest.fn(),
  pageLoading: true,
  setPageLoading: jest.fn(),
};

const history = createMemoryHistory();

const Root = ({ children }) => {
  return (
    <LoadingProvider value={mockedLoadingContextValue}>
      <AuthContext.Provider value={mockedAuthContextValue}>
        <BrowserRouter history={history}>{children}</BrowserRouter>
      </AuthContext.Provider>
    </LoadingProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: Root, ...options });

const shallowRender = (component, options) => render(component, { ...options });

export * from "@testing-library/react";
export { customRender as render, shallowRender as shallow };
