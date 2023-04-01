// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

const dummySession = {
  user: {
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe",
  },
  token: "123abc",
  isNew: false,
};

const server = setupServer(
  rest.post("/api/login", (req, res, ctx) => {
    return res(ctx.json(dummySession));
  }),
  rest.post("/api/logout", (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const AllTheProviders = ({ children }) => {
  return (
    <AuthContext.Provider value={{}}>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthContext.Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
