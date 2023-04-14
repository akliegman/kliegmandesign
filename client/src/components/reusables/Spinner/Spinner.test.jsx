import { screen, shallow } from "../../../setupTests";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it('should render with type "app"', () => {
    shallow(<Spinner type="app" />);
    expect(screen.getByTestId("app-spinner")).toHaveClass("Spinner");
    expect(screen.getByTestId("app-spinner")).toHaveClass("Spinner--app");
    expect(screen.getByTestId("spinner-loading-icon")).toBeInTheDocument();
  });

  it('should render with type "page"', () => {
    shallow(<Spinner type="page" />);
    expect(screen.getByTestId("page-spinner")).toHaveClass("Spinner");
    expect(screen.getByTestId("page-spinner")).toHaveClass("Spinner--page");
  });
});
