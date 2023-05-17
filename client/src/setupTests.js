import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ApiContext } from "./contexts/ApiContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { BrowserRouter } from "react-router-dom";
import SourceMapSupport from "source-map-support";
import { createMemoryHistory } from "history";

SourceMapSupport.install({
  environment: "node",
  handleUncaughtExceptions: false,
});

global.XMLHttpRequest = require("xhr2");

const mockedApiContextValue = {
  isLoggedIn: false,
  session: null,
  errors: [],
  login: jest.fn(),
  logout: jest.fn(),
  clearErrors: jest.fn(),
  clearErrorById: jest.fn(),
  envData: {
    REACT_APP_API_URL: "http://localhost:3001/api",
  },
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
      <ApiContext.Provider value={mockedApiContextValue}>
        <BrowserRouter history={history}>{children}</BrowserRouter>
      </ApiContext.Provider>
    </LoadingProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: Root, ...options });

const shallowRender = (component, options) => render(component, { ...options });

export * from "@testing-library/react";
export { customRender as render, shallowRender as shallow };
