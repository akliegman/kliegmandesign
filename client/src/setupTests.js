import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { AuthContext } from "./context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import SourceMapSupport from "source-map-support";

SourceMapSupport.install({
  environment: "node",
  handleUncaughtExceptions: false,
});

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

const AllTheProviders = ({ children }) => {
  return (
    <AuthContext.Provider value={{}}>
      <MemoryRouter>{children}</MemoryRouter>
    </AuthContext.Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
